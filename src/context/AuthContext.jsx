import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingUser, setPendingUser] = useState(null); // User waiting for Email OTP Verification
  const [verificationCode, setVerificationCode] = useState('123456');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

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

  // 1. Register User (Triggers Email OTP Modal)
  const registerUser = (name, email, password, age, gender) => {
    setAuthError('');
    setAuthSuccess('');

    // Check if email already registered
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      setAuthError('Email is already registered. Please login instead.');
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

    setPendingUser(newUser);
    setVerificationCode('123456');
    setShowOtpModal(true);
    return true;
  };

  // 2. Verify Email OTP & Finalize Registration or Login
  const confirmEmailOtp = (inputOtp) => {
    setAuthError('');
    
    // Accept any valid 6-digit code or default 123456 for seamless client-side testing
    if (!inputOtp || inputOtp.length !== 6) {
      setAuthError('Please enter a valid 6-digit verification code.');
      return false;
    }

    if (pendingUser) {
      // Save new user to localStorage
      const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
      const existingIdx = users.findIndex(u => u.email.toLowerCase() === pendingUser.email.toLowerCase());
      if (existingIdx === -1) {
        users.push(pendingUser);
        localStorage.setItem('ayurveda_users', JSON.stringify(users));
      }

      // Save session
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
  const loginUser = (email, password, rememberMe = true) => {
    setAuthError('');
    setAuthSuccess('');
    
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      setAuthError('Invalid email or password. Please check your credentials.');
      return false;
    }

    setPendingUser(user);
    setVerificationCode('123456');
    setShowOtpModal(true);
    return true;
  };

  // 4. Logout User
  const logoutUser = () => {
    localStorage.removeItem('ayurveda_session');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setPendingUser(null);
  };

  // 5. Update Profile
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
      registerUser,
      confirmEmailOtp,
      loginUser,
      logoutUser,
      updateProfile,
      setAuthError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
