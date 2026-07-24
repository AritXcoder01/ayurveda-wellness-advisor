import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, LayoutDashboard, ClipboardList, CheckSquare, BookOpen, Wind, Zap, FileText, User, LogOut, Menu, X } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { currentUser, logoutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!currentUser) return null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assessment', label: 'Assessment', icon: ClipboardList },
    { id: 'tracker', label: 'Daily Dinacharya Habit Tracker', icon: CheckSquare },
    { id: 'herbs', label: 'Ayurvedic Herbal & Recipe Repository', icon: BookOpen },
    { id: 'breathwork', label: 'Guided Ayurvedic Pranayama Breathing', icon: Wind },
    { id: 'reset', label: '24-Hour Acute Imbalance Reset Protocol', icon: Zap },
    { id: 'report', label: 'Wellness Report', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Top Header Navigation Bar */}
      <header className="no-print" style={{
        background: 'rgba(249, 251, 242, 0.85)',
        backdropFilter: 'blur(24px) saturate(190%)',
        WebkitBackdropFilter: 'blur(24px) saturate(190%)',
        borderBottom: '1.5px solid rgba(186, 225, 100, 0.4)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(26, 51, 35, 0.06)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px'
        }}>
          {/* Logo Branding - Organic Luxury Pine Sparkle */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #1A3323 0%, #2B5738 50%, #BAE164 100%)',
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(26, 51, 35, 0.25)',
              border: '1px solid #BAE164'
            }}>
              <Leaf size={24} color="#FEFEFE" />
            </div>
            <div>
              <h2 className="font-serif-title" style={{ fontSize: '1.3rem', margin: 0, color: '#1A3323', lineHeight: 1.1, fontWeight: 800 }}>
                AyurVeda<span style={{ color: '#B86B18' }}>Life</span>
              </h2>
              <span style={{ fontSize: '0.65rem', color: '#1A3323', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 800 }}>
                Organic Wellness Advisor
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            overflowX: 'auto',
            padding: '0.3rem 0.5rem',
            maxWidth: 'calc(100% - 190px)'
          }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const shortLabel = item.id === 'tracker' ? 'Daily Habits' :
                                 item.id === 'herbs' ? 'Herbs & Recipes' :
                                 item.id === 'breathwork' ? 'Breathing Timer' :
                                 item.id === 'reset' ? 'Imbalance Reset' : item.label;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)' : 'transparent',
                    color: isActive ? '#FEFEFE' : '#1A3323',
                    border: isActive ? '1.5px solid #BAE164' : '1.5px solid transparent',
                    borderRadius: '12px',
                    padding: '0.48rem 0.9rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.22s ease',
                    boxShadow: isActive ? '0 4px 14px rgba(26, 51, 35, 0.25)' : 'none',
                    flexShrink: 0
                  }}
                >
                  <Icon size={16} color={isActive ? '#BAE164' : '#B86B18'} />
                  {shortLabel}
                </button>
              );
            })}

            <button
              onClick={logoutUser}
              title="Logout"
              style={{
                background: 'rgba(184, 107, 24, 0.12)',
                color: '#B86B18',
                border: '1.5px solid rgba(184, 107, 24, 0.35)',
                borderRadius: '12px',
                padding: '0.48rem 0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                flexShrink: 0
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'var(--ceramic)',
              border: '1.5px solid #BAE164',
              color: '#1A3323',
              borderRadius: '14px',
              padding: '0.55rem 0.85rem',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          >
            {mobileMenuOpen ? <X size={22} color="#1A3323" /> : <Menu size={22} color="#1A3323" />}
            <span>Menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Left-Side Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          className="no-print"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(26, 51, 35, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 99,
            display: 'flex',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              background: 'rgba(253, 255, 249, 0.96)',
              backdropFilter: 'blur(28px)',
              borderRight: '1.5px solid #BAE164',
              padding: '1.25rem 1rem',
              boxShadow: '10px 0 35px rgba(26, 51, 35, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#1A3323',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem',
                paddingLeft: '0.5rem'
              }}>
                Ayurvedic Menu
              </div>

              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)' : 'rgba(240, 247, 232, 0.7)',
                      color: isActive ? '#FEFEFE' : '#1A3323',
                      border: isActive ? '1.5px solid #BAE164' : '1.5px solid rgba(26, 51, 35, 0.15)',
                      borderRadius: '16px',
                      padding: '0.85rem 1rem',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      textAlign: 'left',
                      width: '100%',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 6px 18px rgba(26, 51, 35, 0.25)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      background: isActive ? 'rgba(186, 225, 100, 0.25)' : 'rgba(184, 107, 24, 0.12)',
                      borderRadius: '10px',
                      padding: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={18} color={isActive ? '#BAE164' : '#B86B18'} />
                    </div>
                    
                    <span style={{ lineHeight: '1.2' }}>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1.5px solid rgba(26, 51, 35, 0.15)', marginTop: '1rem' }}>
              <button
                onClick={logoutUser}
                style={{
                  background: 'rgba(184, 107, 24, 0.12)',
                  color: '#B86B18',
                  border: '1.5px solid #B86B18',
                  borderRadius: '14px',
                  padding: '0.85rem 1rem',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
};
