import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, LayoutDashboard, ClipboardList, CheckSquare, BookOpen, Wind, Zap, FileText, User, LogOut, Menu, X } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { currentUser, logoutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!currentUser) return null;

  // Exact navigation item order requested
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
      {/* Top Navigation Bar */}
      <header className="no-print" style={{
        background: 'rgba(5, 31, 32, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(142, 182, 155, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          {/* Logo Branding */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flexShrink: 0 }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #FF9500 0%, #FFB84D 100%)',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 149, 0, 0.35)'
            }}>
              <Leaf size={24} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, color: '#FFFFFF', lineHeight: 1.1 }}>
                AyurVeda<span style={{ color: '#FF9500' }}>Life</span>
              </h2>
              <span style={{ fontSize: '0.68rem', color: '#8EB69B', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
                Wellness Advisor
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links with custom color-grade ultra-thin scrollbar */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            overflowX: 'auto',
            padding: '0.3rem 0.5rem',
            maxWidth: 'calc(100% - 180px)',
            scrollbarWidth: 'thin',
            scrollbarColor: '#235347 #051F20'
          }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              // Shortened labels for top bar on desktop for clean look
              const shortLabel = item.id === 'tracker' ? 'Daily Habits' :
                                 item.id === 'herbs' ? 'Herbs & Recipes' :
                                 item.id === 'breathwork' ? 'Breathing Timer' :
                                 item.id === 'reset' ? 'Imbalance Reset' : item.label;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    background: isActive ? 'rgba(35, 83, 71, 0.85)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#B8D8C2',
                    border: isActive ? '1px solid #8EB69B' : '1px solid transparent',
                    borderRadius: '10px',
                    padding: '0.45rem 0.85rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <Icon size={16} color={isActive ? '#FF9500' : '#8EB69B'} />
                  {shortLabel}
                </button>
              );
            })}

            <button
              onClick={logoutUser}
              title="Logout"
              style={{
                background: 'rgba(255, 149, 0, 0.15)',
                color: '#FFB84D',
                border: '1px solid rgba(255, 149, 0, 0.4)',
                borderRadius: '10px',
                padding: '0.45rem 0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.8rem',
                fontWeight: 600,
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
              background: 'rgba(35, 83, 71, 0.6)',
              border: '1px solid #8EB69B',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '0.55rem 0.85rem',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 31, 32, 0.75)',
            backdropFilter: 'blur(8px)',
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
              background: '#0B2B26',
              borderRight: '1px solid #8EB69B',
              padding: '1.25rem 1rem',
              boxShadow: '10px 0 30px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflowY: 'auto'
            }}
          >
            {/* Top-to-bottom Left-aligned Nav Menu List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#8EB69B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.4rem',
                paddingLeft: '0.5rem'
              }}>
                Navigation Menu
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
                      background: isActive ? 'linear-gradient(135deg, rgba(35,83,71,0.9) 0%, rgba(11,43,38,0.95) 100%)' : 'rgba(5, 31, 32, 0.6)',
                      color: isActive ? '#FFFFFF' : '#DAF1DE',
                      border: isActive ? '1px solid #FF9500' : '1px solid rgba(142, 182, 155, 0.2)',
                      borderRadius: '14px',
                      padding: '0.85rem 1rem',
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      textAlign: 'left',
                      width: '100%',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 4px 15px rgba(255,149,0,0.2)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      background: isActive ? '#FF9500' : 'rgba(35, 83, 71, 0.5)',
                      borderRadius: '10px',
                      padding: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={18} color={isActive ? '#FFFFFF' : '#8EB69B'} />
                    </div>
                    
                    <span style={{ lineHeight: '1.2' }}>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Logout at bottom of drawer */}
            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(142, 182, 155, 0.2)', marginTop: '1rem' }}>
              <button
                onClick={logoutUser}
                style={{
                  background: 'rgba(255, 149, 0, 0.15)',
                  color: '#FFB84D',
                  border: '1px solid #FF9500',
                  borderRadius: '14px',
                  padding: '0.85rem 1rem',
                  fontWeight: 600,
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

      {/* Media Query Styles */}
      <style>{`
        /* Custom sleek thin scrollbar for top desktop nav */
        .desktop-nav::-webkit-scrollbar {
          height: 4px;
        }
        .desktop-nav::-webkit-scrollbar-track {
          background: rgba(5, 31, 32, 0.9);
        }
        .desktop-nav::-webkit-scrollbar-thumb {
          background: rgba(35, 83, 71, 0.8);
          border-radius: 10px;
        }
        .desktop-nav::-webkit-scrollbar-thumb:hover {
          background: #FF9500;
        }

        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
};
