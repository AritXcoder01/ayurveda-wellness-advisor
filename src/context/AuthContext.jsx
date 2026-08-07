import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';
import { sendOtpEmail, fetchEmailDirectory } from '../services/emailService';

const AuthContext = createContext();

const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtpCode, setForgotOtpCode] = useState('');
  const [isForgotOtpVerified, setIsForgotOtpVerified] = useState(false);

  // Initial session restoration
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('ayurveda_session');
      if (savedSession) {
        const user = JSON.parse(savedSession);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Session load error:', e);
    }

    if (isSupabaseConfigured) {
      try {
        supabase.auth.getSession().then(({ data }) => {
          const session = data?.session;
          if (session?.user) {
            const userObj = {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
              age: session.user.user_metadata?.age || 25,
              gender: session.user.user_metadata?.gender || 'Other'
            };
            setCurrentUser(userObj);
            setIsAuthenticated(true);
            localStorage.setItem('ayurveda_session', JSON.stringify(userObj));
          }
        }).catch(err => {
          console.warn('Supabase getSession fallback:', err);
        });

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            const userObj = {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
              age: session.user.user_metadata?.age || 25,
              gender: session.user.user_metadata?.gender || 'Other'
            };
            setCurrentUser(userObj);
            setIsAuthenticated(true);
            localStorage.setItem('ayurveda_session', JSON.stringify(userObj));
          }
        });

        return () => data?.subscription?.unsubscribe();
      } catch (e) {
        console.warn('Supabase auth listener error:', e);
      }
    }
  }, []);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // 1. Register User
  const registerUser = async (name, email, password, age, gender) => {
    setAuthError('');
    setAuthSuccess('');
    setIsSendingEmail(true);

    const otp = generateOTP();
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password,
      age: parseInt(age, 10),
      gender,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, age, gender }
          }
        });

        if (!error && data?.user) {
          setIsSendingEmail(false);
          setPendingUser(newUser);
          setVerificationCode(otp);
          setShowOtpModal(true);
          return true;
        }

        if (error && !error.message.includes('fetch')) {
          setIsSendingEmail(false);
          setAuthError(error.message);
          return false;
        }
      } catch (err) {
        console.warn('Supabase signUp network error, falling back to local dispatch:', err);
      }
    }

    // Local Registration Fallback (Zero Network Fetch Errors)
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setIsSendingEmail(false);
      setAuthError('Email is already registered. Please sign in instead.');
      return false;
    }

    setPendingUser(newUser);
    setVerificationCode(otp);
    setShowOtpModal(true);

    await sendOtpEmail(email, name, otp, 'Account Verification');
    setIsSendingEmail(false);
    return true;
  };

  // 2. Confirm Email OTP
  const confirmEmailOtp = async (inputOtp) => {
    setAuthError('');
    if (!pendingUser?.email) return false;
    setIsSendingEmail(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          email: pendingUser.email,
          token: inputOtp,
          type: 'email'
        });

        if (!error && data?.user) {
          const sessionUser = {
            id: data.user.id,
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
          setIsSendingEmail(false);
          return true;
        }

        if (error && !error.message.includes('fetch')) {
          setIsSendingEmail(false);
          setAuthError(error.message);
          return false;
        }
      } catch (err) {
        console.warn('Supabase verifyOtp fallback:', err);
      }
    }

    // Local OTP Verification Fallback
    if (inputOtp !== verificationCode) {
      setIsSendingEmail(false);
      setAuthError(`Invalid 6-digit verification code. Please check the code sent to ${pendingUser.email}.`);
      return false;
    }

    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const existingIdx = users.findIndex(u => u.email.toLowerCase() === pendingUser.email.toLowerCase());
    if (existingIdx === -1) {
      users.push(pendingUser);
    } else {
      users[existingIdx] = { ...users[existingIdx], ...pendingUser };
    }
    localStorage.setItem('ayurveda_users', JSON.stringify(users));

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
    setIsSendingEmail(false);
    return true;
  };

  // 3. Login User
  const loginUser = async (email, password) => {
    setAuthError('');
    setAuthSuccess('');
    setIsSendingEmail(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data?.user) {
          const sessionUser = {
            id: data.user.id,
            name: data.user.user_metadata?.full_name || email.split('@')[0],
            email: data.user.email,
            age: data.user.user_metadata?.age || 25,
            gender: data.user.user_metadata?.gender || 'Other'
          };
          localStorage.setItem('ayurveda_session', JSON.stringify(sessionUser));
          setCurrentUser(sessionUser);
          setIsAuthenticated(true);
          setIsSendingEmail(false);
          return true;
        }

        if (error && !error.message.includes('fetch')) {
          setIsSendingEmail(false);
          setAuthError(error.message);
          return false;
        }
      } catch (err) {
        console.warn('Supabase login fallback:', err);
      }
    }

    // Local Login Fallback
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      setIsSendingEmail(false);
      setAuthError('Invalid email or password. Please check your credentials or register a new account.');
      return false;
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender
    };
    localStorage.setItem('ayurveda_session', JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);
    setIsAuthenticated(true);
    setIsSendingEmail(false);
    return true;
  };

  // 4. Send Forgot Password OTP
  const sendForgotPasswordOtp = async (email) => {
    setAuthError('');
    setAuthSuccess('');
    setIsSendingEmail(true);

    const otp = generateOTP();

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (!error) {
          setForgotEmail(email);
          setAuthSuccess(`Verification code sent to ${email}`);
          setIsSendingEmail(false);
          return true;
        }
      } catch (err) {
        console.warn('Supabase resetPasswordForEmail fallback:', err);
      }
    }

    // Local Forgot Password Fallback
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setIsSendingEmail(false);
      setAuthError('No registered user account found with this email address.');
      return false;
    }

    setForgotEmail(email);
    setForgotOtpCode(otp);

    await sendOtpEmail(email, user.name, otp, 'Password Reset');
    setIsSendingEmail(false);
    setAuthSuccess(`Verification code dispatched to ${email}`);
    return true;
  };

  // 5. Verify Forgot Password OTP
  const verifyForgotPasswordOtp = async (inputCode) => {
    setAuthError('');
    setIsSendingEmail(true);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.verifyOtp({
          email: forgotEmail,
          token: inputCode,
          type: 'recovery'
        });
        if (!error) {
          setIsForgotOtpVerified(true);
          setAuthSuccess('Code verified! Set your new password below.');
          setIsSendingEmail(false);
          return true;
        }
      } catch (err) {
        console.warn('Supabase verifyOtp recovery fallback:', err);
      }
    }

    // Local Verify OTP Fallback
    if (inputCode.trim() !== forgotOtpCode) {
      setIsSendingEmail(false);
      setAuthError('Invalid 6-digit reset code. Please check your email inbox.');
      return false;
    }

    setIsForgotOtpVerified(true);
    setAuthSuccess('Code verified! Set your new password below.');
    setIsSendingEmail(false);
    return true;
  };

  // 6. Complete Password Reset
  const resetPassword = async (newPassword) => {
    setAuthError('');
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });
        if (!error) {
          setAuthSuccess('Password updated successfully! You can now sign in.');
          setForgotEmail('');
          setIsForgotOtpVerified(false);
          return true;
        }
      } catch (err) {
        console.warn('Supabase updateUser password fallback:', err);
      }
    }

    // Local Reset Password Fallback
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const index = users.findIndex(u => u.email.toLowerCase() === forgotEmail.toLowerCase());

    if (index !== -1) {
      users[index].password = newPassword;
      localStorage.setItem('ayurveda_users', JSON.stringify(users));
    }

    setAuthSuccess('Password updated successfully! You can now sign in.');
    setForgotEmail('');
    setForgotOtpCode('');
    setIsForgotOtpVerified(false);
    return true;
  };

  const resendOtp = async () => {
    if (!pendingUser?.email) return;
    setAuthError('');
    setIsSendingEmail(true);

    const otp = generateOTP();
    setVerificationCode(otp);

    await sendOtpEmail(pendingUser.email, pendingUser.name, otp, 'Security Verification');
    setIsSendingEmail(false);
  };

  const logoutUser = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    localStorage.removeItem('ayurveda_session');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setPendingUser(null);
  };

  const updateProfile = async (updatedData) => {
    if (!currentUser) return;
    setAuthError('');
    setAuthSuccess('');

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.updateUser({
          data: {
            full_name: updatedData.name,
            age: updatedData.age,
            gender: updatedData.gender
          }
        });
      } catch (e) {}
    }

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
    return true;
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
      setAuthSuccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
