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
    // Check initial session safely
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
        }
      }).catch(err => {
        console.warn('Supabase session check skipped:', err);
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
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      });

      return () => data?.subscription?.unsubscribe();
    } catch (e) {
      console.warn('Supabase auth listener fallback:', e);
    }
  }, []);

  // 1. Register User via Supabase with safe fallback
  const registerUser = async (name, email, password, age, gender) => {
    setAuthError('');
    setAuthSuccess('');
    setIsSendingEmail(true);

    try {
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
    } catch (err) {
      setIsSendingEmail(false);
      setAuthError(err.message || 'Registration failed. Please check your credentials.');
      return false;
    }
  };

  // 2. Confirm Email OTP via Supabase with safe fallback
  const confirmEmailOtp = async (inputOtp) => {
    setAuthError('');
    if (!pendingUser?.email) return false;

    setIsSendingEmail(true);
    try {
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
    } catch (err) {
      setIsSendingEmail(false);
      setAuthError(err.message || 'OTP verification failed.');
      return false;
    }
  };

  // 3. Login User via Supabase with safe fallback
  const loginUser = async (email, password) => {
    setAuthError('');
    setIsSendingEmail(true);

    try {
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
    } catch (err) {
      setIsSendingEmail(false);
      setAuthError(err.message || 'Invalid email or password.');
      return false;
    }
  };

  // 4. Send Forgot Password OTP via Supabase
  const sendForgotPasswordOtp = async (email) => {
    setAuthError('');
    setAuthSuccess('');
    setIsSendingEmail(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      setIsSendingEmail(false);

      if (error) {
        setAuthError(error.message);
        return false;
      }

      setForgotEmail(email);
      setAuthSuccess(`Verification code sent to ${email}`);
      return true;
    } catch (err) {
      setIsSendingEmail(false);
      setAuthError(err.message || 'Failed to dispatch password reset code.');
      return false;
    }
  };

  // 5. Verify Forgot Password OTP
  const verifyForgotPasswordOtp = async (inputCode) => {
    setAuthError('');
    setIsSendingEmail(true);

    try {
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
    } catch (err) {
      setIsSendingEmail(false);
      setAuthError(err.message || 'Invalid reset code.');
      return false;
    }
  };

  // 6. Complete Password Reset
  const resetPassword = async (newPassword) => {
    setAuthError('');
    try {
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
    } catch (err) {
      setAuthError(err.message || 'Failed to update password.');
      return false;
    }
  };

  const resendOtp = async () => {
    if (!pendingUser?.email) return;
    setAuthError('');
    setIsSendingEmail(true);
    try {
      await supabase.auth.resend({
        type: 'signup',
        email: pendingUser.email
      });
    } catch (e) {
      console.warn('Resend OTP error:', e);
    }
    setIsSendingEmail(false);
  };

  const logoutUser = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Logout error:', e);
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (updatedData) => {
    if (!currentUser) return;
    setAuthError('');
    setAuthSuccess('');

    try {
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
    } catch (err) {
      setAuthError(err.message || 'Failed to update profile.');
      return false;
    }
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
