import React, { useState } from 'react';
import { HERBS, RECIPES } from '../data/herbsAndRecipes';
import { Search, Utensils, Leaf, X, Clock } from 'lucide-react';

export const HerbsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredHerbs = HERBS.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          h.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredRecipes = RECIPES.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '1020px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="font-serif-title" style={{ fontSize: '1.85rem', color: '#1A3323', marginBottom: '0.4rem', fontWeight: 800 }}>
          Ayurvedic Herbal & Recipe Repository
        </h1>
        <p style={{ color: '#567360', fontSize: '0.96rem', fontWeight: 500 }}>
          Discover classical Ayurvedic herbs, rejuvenators, and healing recipes tailored to Vata, Pitta, and Kapha
        </p>
      </div>

      {/* Controls Bar: Search & Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              background: activeTab === 'all' ? 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)' : 'rgba(253, 255, 249, 0.8)',
              color: activeTab === 'all' ? '#FEFEFE' : '#1A3323',
              border: activeTab === 'all' ? '1.5px solid #BAE164' : '1.5px solid rgba(26, 51, 35, 0.15)',
              borderRadius: '14px',
              padding: '0.65rem 1.25rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'all' ? '0 4px 14px rgba(26, 51, 35, 0.25)' : 'none'
            }}
          >
            All Collection
          </button>

          <button
            onClick={() => setActiveTab('herbs')}
            style={{
              background: activeTab === 'herbs' ? 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)' : 'rgba(253, 255, 249, 0.8)',
              color: activeTab === 'herbs' ? '#FEFEFE' : '#1A3323',
              border: activeTab === 'herbs' ? '1.5px solid #BAE164' : '1.5px solid rgba(26, 51, 35, 0.15)',
              borderRadius: '14px',
              padding: '0.65rem 1.25rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'herbs' ? '0 4px 14px rgba(26, 51, 35, 0.25)' : 'none'
            }}
          >
            🌿 Herbs & Rasayanas ({HERBS.length})
          </button>

          <button
            onClick={() => setActiveTab('recipes')}
            style={{
              background: activeTab === 'recipes' ? 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)' : 'rgba(253, 255, 249, 0.8)',
              color: activeTab === 'recipes' ? '#FEFEFE' : '#1A3323',
              border: activeTab === 'recipes' ? '1.5px solid #BAE164' : '1.5px solid rgba(26, 51, 35, 0.15)',
              borderRadius: '14px',
              padding: '0.65rem 1.25rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'recipes' ? '0 4px 14px rgba(26, 51, 35, 0.25)' : 'none'
            }}
          >
            🍲 Healing Recipes ({RECIPES.length})
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', minWidth: '260px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search herbs or recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.6rem' }}
          />
          <Search size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Herbs Grid */}
      {(activeTab === 'all' || activeTab === 'herbs') && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="font-serif-title" style={{ fontSize: '1.4rem', color: '#1A3323', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}>
            <Leaf size={24} color="#B86B18" /> Sacred Ayurvedic Herbs (Aushadhi)
          </h2>

          <div className="grid-3">
            {filteredHerbs.map((herb) => (
              <div
                key={herb.id}
                onClick={() => setSelectedItem({ type: 'herb', data: herb })}
                className="glass-card glass-card-interactive"
                style={{ borderRadius: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{herb.icon}</div>
                  <h3 style={{ fontSize: '1.18rem', color: '#1A3323', marginBottom: '0.2rem', fontWeight: 800 }}>
                    {herb.name}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#B86B18', fontWeight: 800, display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    {herb.sanskrit} • {herb.category}
                  </span>
                  <p style={{ fontSize: '0.88rem', color: '#567360', lineHeight: '1.4', marginBottom: '1rem', fontWeight: 500 }}>
                    {herb.summary}
                  </p>
                </div>

                <div style={{
                  paddingTop: '0.75rem',
                  borderTop: '1.5px solid rgba(26, 51, 35, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem'
                }}>
                  <span style={{ color: '#1A3323', fontWeight: 700 }}>{herb.doshaEffect}</span>
                  <span style={{ color: '#B86B18', fontWeight: 800 }}>View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      {(activeTab === 'all' || activeTab === 'recipes') && (
        <div>
          <h2 className="font-serif-title" style={{ fontSize: '1.4rem', color: '#1A3323', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}>
            <Utensils size={24} color="#B86B18" /> Healing Culinary Recipes (Ahara)
          </h2>

          <div className="grid-2">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedItem({ type: 'recipe', data: recipe })}
                className="glass-card glass-card-interactive"
                style={{ borderRadius: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2.2rem' }}>{recipe.icon}</span>
                    <span style={{
                      background: 'rgba(186, 225, 100, 0.3)',
                      color: '#1A3323',
                      border: '1.5px solid #BAE164',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '50px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      textTransform: 'uppercase'
                    }}>
                      {recipe.doshaTag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.22rem', color: '#1A3323', marginBottom: '0.4rem', fontWeight: 800 }}>
                    {recipe.title}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B86B18', fontSize: '0.82rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                    <Clock size={15} /> Prep: <strong>{recipe.prepTime}</strong>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#567360', lineHeight: '1.4', marginBottom: '1rem', fontWeight: 500 }}>
                    {recipe.summary}
                  </p>
                </div>

                <div style={{
                  paddingTop: '0.75rem',
                  borderTop: '1.5px solid rgba(26, 51, 35, 0.12)',
                  textAlign: 'right',
                  fontSize: '0.82rem',
                  color: '#B86B18',
                  fontWeight: 800
                }}>
                  View Preparation Steps →
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Detail View */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#1A3323',
                cursor: 'pointer'
              }}
            >
              <X size={26} />
            </button>

            {selectedItem.type === 'herb' ? (
              <div>
                <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{selectedItem.data.icon}</div>
                <h2 className="font-serif-title" style={{ fontSize: '1.6rem', color: '#1A3323', marginBottom: '0.2rem', fontWeight: 800 }}>
                  {selectedItem.data.name}
                </h2>
                <span style={{ fontSize: '0.9rem', color: '#B86B18', fontWeight: 800, display: 'block', marginBottom: '1rem', textTransform: 'uppercase' }}>
                  Sanskrit: {selectedItem.data.sanskrit} • {selectedItem.data.doshaEffect}
                </span>

                <p style={{ color: '#2B4534', fontSize: '0.95rem', marginBottom: '1.25rem', fontWeight: 500 }}>
                  {selectedItem.data.summary}
                </p>

                <h4 style={{ color: '#1A3323', fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 800 }}>
                  Key Health Benefits
                </h4>
                <ul style={{ paddingLeft: '1.2rem', color: '#2B4534', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  {selectedItem.data.benefits.map((b, i) => (
                    <li key={i} style={{ marginBottom: '0.35rem', fontWeight: 500 }}>{b}</li>
                  ))}
                </ul>

                <div style={{ background: 'rgba(240, 247, 232, 0.95)', padding: '0.9rem 1.1rem', borderRadius: '14px', borderLeft: '5px solid #BAE164', border: '1px solid rgba(26,51,35,0.1)' }}>
                  <strong style={{ color: '#1A3323', fontSize: '0.88rem', display: 'block', marginBottom: '0.2rem' }}>
                    Recommended Usage:
                  </strong>
                  <span style={{ color: '#2B4534', fontSize: '0.9rem', fontWeight: 500 }}>{selectedItem.data.usage}</span>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{selectedItem.data.icon}</div>
                <h2 className="font-serif-title" style={{ fontSize: '1.6rem', color: '#1A3323', marginBottom: '0.2rem', fontWeight: 800 }}>
                  {selectedItem.data.title}
                </h2>
                <span style={{ fontSize: '0.9rem', color: '#B86B18', fontWeight: 800, display: 'block', marginBottom: '1rem', textTransform: 'uppercase' }}>
                  {selectedItem.data.doshaTag} • Prep Time: {selectedItem.data.prepTime}
                </span>

                <h4 style={{ color: '#1A3323', fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 800 }}>
                  Ingredients
                </h4>
                <ul style={{ paddingLeft: '1.2rem', color: '#2B4534', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  {selectedItem.data.ingredients.map((ing, i) => (
                    <li key={i} style={{ marginBottom: '0.3rem', fontWeight: 500 }}>{ing}</li>
                  ))}
                </ul>

                <h4 style={{ color: '#1A3323', fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 800 }}>
                  Preparation Instructions
                </h4>
                <ol style={{ paddingLeft: '1.2rem', color: '#2B4534', fontSize: '0.9rem' }}>
                  {selectedItem.data.instructions.map((step, i) => (
                    <li key={i} style={{ marginBottom: '0.45rem', fontWeight: 500 }}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
