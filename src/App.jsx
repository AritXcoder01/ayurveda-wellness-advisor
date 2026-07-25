import React, { useState } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DoshaProvider } from './context/DoshaContext';
import { Navbar } from './components/Navbar';
import { EmailVerificationModal } from './components/EmailVerificationModal';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { DashboardPage } from './pages/DashboardPage';
import { DailyTrackerPage } from './pages/DailyTrackerPage';
import { HerbsPage } from './pages/HerbsPage';
import { BreathingTimer } from './components/BreathingTimer';
import { VikritiResetPage } from './pages/VikritiResetPage';
import { WellnessReportPage } from './pages/WellnessReportPage';
import { ProfilePage } from './pages/ProfilePage';
import { Leaf } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const MainApp = () => {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register' | 'forgot-password'
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {authView === 'login' && (
          <LoginPage
            onSwitchToRegister={() => setAuthView('register')}
            onSwitchToForgotPassword={() => setAuthView('forgot-password')}
          />
        )}
        {authView === 'register' && (
          <RegisterPage
            onSwitchToLogin={() => setAuthView('login')}
          />
        )}
        {authView === 'forgot-password' && (
          <ForgotPasswordPage
            onSwitchToLogin={() => setAuthView('login')}
          />
        )}
        
        <EmailVerificationModal />
      </main>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <DashboardPage
            onStartQuiz={() => setActiveTab('assessment')}
            onViewReport={() => setActiveTab('report')}
            onEditProfile={() => setActiveTab('profile')}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentPage
            onComplete={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'tracker' && (
          <DailyTrackerPage />
        )}

        {activeTab === 'herbs' && (
          <HerbsPage />
        )}

        {activeTab === 'breathwork' && (
          <BreathingTimer />
        )}

        {activeTab === 'reset' && (
          <VikritiResetPage />
        )}

        {activeTab === 'report' && (
          <WellnessReportPage
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage />
        )}
      </main>

      <EmailVerificationModal />

      {/* Footer */}
      <footer className="no-print" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(13, 148, 136, 0.2)',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        color: '#496862',
        fontSize: '0.85rem'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={16} color="#0D9488" />
            <strong style={{ color: '#0F2925' }}>AyurVeda Life</strong> — Personalized Mind-Body Health & Dosha Advisor
          </div>

          <div>
            © {new Date().getFullYear()} AyurVeda Life. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  if (CLERK_KEY) {
    return (
      <ClerkProvider publishableKey={CLERK_KEY}>
        <AuthProvider>
          <DoshaProvider>
            <MainApp />
            <Analytics />
          </DoshaProvider>
        </AuthProvider>
      </ClerkProvider>
    );
  }

  return (
    <AuthProvider>
      <DoshaProvider>
        <MainApp />
        <Analytics />
      </DoshaProvider>
    </AuthProvider>
  );
}
