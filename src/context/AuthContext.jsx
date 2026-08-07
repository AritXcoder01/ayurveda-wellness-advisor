import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotOtpVerified, setIsForgotOtpVerified] = useState(false);

  useEffect(() => {
    // Check initial Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
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
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 1. Register User via Supabase
  const registerUser = async (name, email, password, age, gender) => {
    setAuthError('');
    setAuthSuccess('');
    setIsSendingEmail(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, age, gender }
      }
    });

    setIsSendingEmail(false);

    if (error) {
      setAuthError(error.message);
      return false;
    }

    setPendingUser({ name, email, password, age, gender });
    setShowOtpModal(true);
    return true;
  };

  // 2. Confirm Email OTP via Supabase
  const confirmEmailOtp = async (inputOtp) => {
    setAuthError('');
    if (!pendingUser?.email) return false;

    setIsSendingEmail(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email: pendingUser.email,
      token: inputOtp,
      type: 'email'
    });
    setIsSendingEmail(false);

    if (error) {
      setAuthError(error.message);
      return false;
    }

    setShowOtpModal(false);
    setPendingUser(null);
    return true;
  };

  // 3. Login User via Supabase
  const loginUser = async (email, password) => {
    setAuthError('');
    setIsSendingEmail(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setIsSendingEmail(false);

    if (error) {
      setAuthError(error.message);
      return false;
    }

    return true;
  };

  // 4. Send Forgot Password OTP via Supabase
  const sendForgotPasswordOtp = async (email) => {
    setAuthError('');
    setAuthSuccess('');
    setIsSendingEmail(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setIsSendingEmail(false);

    if (error) {
      setAuthError(error.message);
      return false;
    }

    setForgotEmail(email);
    setAuthSuccess(`Verification code sent to ${email}`);
    return true;
  };

  // 5. Verify Forgot Password OTP
  const verifyForgotPasswordOtp = async (inputCode) => {
    setAuthError('');
    setIsSendingEmail(true);

    const { error } = await supabase.auth.verifyOtp({
      email: forgotEmail,
      token: inputCode,
      type: 'recovery'
    });

    setIsSendingEmail(false);

    if (error) {
      setAuthError(error.message);
      return false;
    }

    setIsForgotOtpVerified(true);
    setAuthSuccess('Code verified! Set your new password below.');
    return true;
  };

  // 6. Complete Password Reset
  const resetPassword = async (newPassword) => {
    setAuthError('');
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setAuthError(error.message);
      return false;
    }

    setAuthSuccess('Password updated successfully! You can now sign in.');
    setForgotEmail('');
    setIsForgotOtpVerified(false);
    return true;
  };

  const resendOtp = async () => {
    if (!pendingUser?.email) return;
    setAuthError('');
    setIsSendingEmail(true);
    await supabase.auth.resend({
      type: 'signup',
      email: pendingUser.email
    });
    setIsSendingEmail(false);
  };

  const logoutUser = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (updatedData) => {
    if (!currentUser) return;
    setAuthError('');
    setAuthSuccess('');

    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: updatedData.name,
        age: updatedData.age,
        gender: updatedData.gender
      }
    });

    if (error) {
      setAuthError(error.message);
      return false;
    }

    const sessionUser = { ...currentUser, ...updatedData };
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
      pendingUser,
      authError,
      authSuccess,
      isSendingEmail,
      forgotEmail,
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
