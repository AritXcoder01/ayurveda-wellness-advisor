import React, { createContext, useState, useEffect, useContext } from 'react';
import { sendOtpEmail, fetchEmailDirectory } from '../services/emailService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  
  // Real Email Dispatch & Directory state
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailPreviewUrl, setEmailPreviewUrl] = useState(null);
  const [isRealInboxSent, setIsRealInboxSent] = useState(false);
  const [emailLogs, setEmailLogs] = useState([]);

  // Forgot Password Flow State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtpCode, setForgotOtpCode] = useState('');
  const [isForgotOtpVerified, setIsForgotOtpVerified] = useState(false);

  // Load existing session on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('ayurveda_session');
      if (savedSession) {
        const user = JSON.parse(savedSession);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Error reading session from localStorage:', e);
    }
  }, []);

  const refreshEmailLogs = async () => {
    const logs = await fetchEmailDirectory();
    setEmailLogs(logs);
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // 1. Register User (Dispatches Real Email OTP)
  const registerUser = async (name, email, password, age, gender) => {
    setAuthError('');
    setAuthSuccess('');
    setEmailPreviewUrl(null);
    setIsRealInboxSent(false);

    // Check if email already registered
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      setAuthError('Email is already registered. Please sign in instead or reset your password.');
      return false;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password,
      age: parseInt(age, 10),
      gender,
      createdAt: new Date().toISOString()
    };

    const otp = generateOTP();
    setPendingUser(newUser);
    setVerificationCode(otp);
    setShowOtpModal(true);

    setIsSendingEmail(true);
    const result = await sendOtpEmail(email, name, otp, 'Account Verification');
    setIsSendingEmail(false);

    if (result.success) {
      setIsRealInboxSent(result.isRealInboxSent);
      if (result.previewUrl) {
        setEmailPreviewUrl(result.previewUrl);
      }
    }
    refreshEmailLogs();
    return true;
  };

  // 2. Confirm Email OTP for Register & Login
  const confirmEmailOtp = (inputOtp) => {
    setAuthError('');
    
    if (inputOtp !== verificationCode) {
      setAuthError(`Invalid verification code. Please check the code sent to ${pendingUser?.email}.`);
      return false;
    }

    if (pendingUser) {
      const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
      const existingIdx = users.findIndex(u => u.email.toLowerCase() === pendingUser.email.toLowerCase());
      
      if (existingIdx === -1) {
        users.push(pendingUser);
        localStorage.setItem('ayurveda_users', JSON.stringify(users));
      } else {
        // Update user record if logging in
        users[existingIdx] = { ...users[existingIdx], ...pendingUser };
        localStorage.setItem('ayurveda_users', JSON.stringify(users));
      }

      const sessionUser = {
        id: pendingUser.id,
        name: pendingUser.name,
        email: pendingUser.email,
        age: pendingUser.age,
        gender: pendingUser.gender
      };
      localStorage.setItem('ayurveda_session', JSON.stringify(sessionUser));
      
      setCurrentUser(sessionUser);
      setIsAuthenticated(true);
      setPendingUser(null);
      setShowOtpModal(false);
      return true;
    }

    setShowOtpModal(false);
    return true;
  };

  // 3. Login User
  const loginUser = async (email, password) => {
    setAuthError('');
    setAuthSuccess('');
    setEmailPreviewUrl(null);
    setIsRealInboxSent(false);
    
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      setAuthError('Invalid email or password. Please check your credentials or click Forgot Password.');
      return false;
    }

    const otp = generateOTP();
    setPendingUser(user);
    setVerificationCode(otp);
    setShowOtpModal(true);

    setIsSendingEmail(true);
    const result = await sendOtpEmail(email, user.name, otp, 'Login Security Check');
    setIsSendingEmail(false);

    if (result.success) {
      setIsRealInboxSent(result.isRealInboxSent);
      if (result.previewUrl) {
        setEmailPreviewUrl(result.previewUrl);
      }
    }
    refreshEmailLogs();
    return true;
  };

  // 4. Send Forgot Password OTP
  const sendForgotPasswordOtp = async (email) => {
    setAuthError('');
    setAuthSuccess('');
    setEmailPreviewUrl(null);
    setIsRealInboxSent(false);
    setIsForgotOtpVerified(false);

    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setAuthError('No registered user account found with this email address.');
      return false;
    }

    const otp = generateOTP();
    setForgotEmail(email);
    setForgotOtpCode(otp);

    setIsSendingEmail(true);
    const result = await sendOtpEmail(email, user.name, otp, 'Password Reset');
    setIsSendingEmail(false);

    if (result.success) {
      setIsRealInboxSent(result.isRealInboxSent);
      if (result.previewUrl) {
        setEmailPreviewUrl(result.previewUrl);
      }
      setAuthSuccess(`Verification code dispatched to ${email}`);
    }
    refreshEmailLogs();
    return true;
  };

  // 5. Verify Forgot Password OTP
  const verifyForgotPasswordOtp = (inputCode) => {
    setAuthError('');
    if (inputCode.trim() !== forgotOtpCode) {
      setAuthError('Invalid reset code. Please check your email inbox or directory.');
      return false;
    }
    setIsForgotOtpVerified(true);
    setAuthSuccess('Code verified! You can now set your new password.');
    return true;
  };

  // 6. Complete Password Reset
  const resetPassword = (newPassword) => {
    setAuthError('');
    if (!forgotEmail || !isForgotOtpVerified) {
      setAuthError('Unauthorized reset attempt. Please restart the forgot password process.');
      return false;
    }

    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const index = users.findIndex(u => u.email.toLowerCase() === forgotEmail.toLowerCase());

    if (index === -1) {
      setAuthError('User record not found.');
      return false;
    }

    users[index].password = newPassword;
    localStorage.setItem('ayurveda_users', JSON.stringify(users));

    setAuthSuccess('Password updated successfully! You can now sign in with your new password.');
    setForgotEmail('');
    setForgotOtpCode('');
    setIsForgotOtpVerified(false);
    return true;
  };

  const resendOtp = async () => {
    if (!pendingUser) return;
    setAuthError('');
    const otp = generateOTP();
    setVerificationCode(otp);
    setIsSendingEmail(true);
    const result = await sendOtpEmail(pendingUser.email, pendingUser.name, otp, 'Security Verification');
    setIsSendingEmail(false);
    if (result.success) {
      setIsRealInboxSent(result.isRealInboxSent);
      if (result.previewUrl) {
        setEmailPreviewUrl(result.previewUrl);
      }
    }
    refreshEmailLogs();
  };

  const logoutUser = () => {
    localStorage.removeItem('ayurveda_session');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setPendingUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const sessionUser = { ...currentUser, ...updatedData };
    
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const index = users.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      localStorage.setItem('ayurveda_users', JSON.stringify(users));
    }

    localStorage.setItem('ayurveda_session', JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);
    setAuthSuccess('Profile updated successfully.');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      showOtpModal,
      setShowOtpModal,
      verificationCode,
      pendingUser,
      authError,
      authSuccess,
      isSendingEmail,
      emailPreviewUrl,
      isRealInboxSent,
      emailLogs,
      forgotEmail,
      forgotOtpCode,
      isForgotOtpVerified,
      registerUser,
      confirmEmailOtp,
      loginUser,
      sendForgotPasswordOtp,
      verifyForgotPasswordOtp,
      resetPassword,
      resendOtp,
      logoutUser,
      updateProfile,
      setAuthError,
      setAuthSuccess,
      refreshEmailLogs
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
