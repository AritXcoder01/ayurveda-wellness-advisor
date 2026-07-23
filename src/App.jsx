import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DoshaProvider } from './context/DoshaContext';
import { Navbar } from './components/Navbar';
import { EmailVerificationModal } from './components/EmailVerificationModal';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { DashboardPage } from './pages/DashboardPage';
import { DailyTrackerPage } from './pages/DailyTrackerPage';
import { HerbsPage } from './pages/HerbsPage';
import { BreathingTimer } from './components/BreathingTimer';
import { VikritiResetPage } from './pages/VikritiResetPage';
import { WellnessReportPage } from './pages/WellnessReportPage';
import { ProfilePage } from './pages/ProfilePage';
import { Leaf } from 'lucide-react';

const MainApp = () => {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {authView === 'login' ? (
          <LoginPage onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <RegisterPage onSwitchToLogin={() => setAuthView('login')} />
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
        background: 'rgba(5, 31, 32, 0.95)',
        borderTop: '1px solid rgba(142, 182, 155, 0.2)',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        color: '#8EB69B',
        fontSize: '0.85rem'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={16} color="#FF9500" />
            <strong style={{ color: '#DAF1DE' }}>AyurVeda Life</strong> — Personalized Holistic Health & Dosha Advisor
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
  return (
    <AuthProvider>
      <DoshaProvider>
        <MainApp />
      </DoshaProvider>
    </AuthProvider>
  );
}
