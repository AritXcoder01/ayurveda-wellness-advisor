import React, { useState } from 'react';
import { HERBS, RECIPES } from '../data/herbsAndRecipes';
import { Search, Sparkles, BookOpen, Clock, Utensils, Leaf, X } from 'lucide-react';

export const HerbsPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'herbs' | 'recipes'
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
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
          Ayurvedic Herbal & Recipe Repository
        </h1>
        <p style={{ color: '#B8D8C2', fontSize: '0.95rem' }}>
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
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              background: activeTab === 'all' ? '#FF9500' : 'rgba(35, 83, 71, 0.5)',
              color: '#FFFFFF',
              border: activeTab === 'all' ? 'none' : '1px solid rgba(142, 182, 155, 0.3)',
              borderRadius: '12px',
              padding: '0.65rem 1.2rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            All Collection
          </button>

          <button
            onClick={() => setActiveTab('herbs')}
            style={{
              background: activeTab === 'herbs' ? '#FF9500' : 'rgba(35, 83, 71, 0.5)',
              color: '#FFFFFF',
              border: activeTab === 'herbs' ? 'none' : '1px solid rgba(142, 182, 155, 0.3)',
              borderRadius: '12px',
              padding: '0.65rem 1.2rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            🌿 Herbs & Rasayanas ({HERBS.length})
          </button>

          <button
            onClick={() => setActiveTab('recipes')}
            style={{
              background: activeTab === 'recipes' ? '#FF9500' : 'rgba(35, 83, 71, 0.5)',
              color: '#FFFFFF',
              border: activeTab === 'recipes' ? 'none' : '1px solid rgba(142, 182, 155, 0.3)',
              borderRadius: '12px',
              padding: '0.65rem 1.2rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
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
            style={{ width: '100%', paddingLeft: '2.5rem' }}
          />
          <Search size={18} color="#8EB69B" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Herbs Grid */}
      {(activeTab === 'all' || activeTab === 'herbs') && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: '#8EB69B', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={22} color="#FF9500" /> Sacred Ayurvedic Herbs (Aushadhi)
          </h2>

          <div className="grid-3">
            {filteredHerbs.map((herb) => (
              <div
                key={herb.id}
                onClick={() => setSelectedItem({ type: 'herb', data: herb })}
                className="glass-card glass-card-interactive"
                style={{ borderRadius: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{herb.icon}</div>
                  <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>
                    {herb.name}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#FFB84D', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                    {herb.sanskrit} • {herb.category}
                  </span>
                  <p style={{ fontSize: '0.88rem', color: '#B8D8C2', lineHeight: '1.4', marginBottom: '1rem' }}>
                    {herb.summary}
                  </p>
                </div>

                <div style={{
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(142, 182, 155, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem'
                }}>
                  <span style={{ color: '#8EB69B', fontWeight: 600 }}>{herb.doshaEffect}</span>
                  <span style={{ color: '#FF9500', fontWeight: 700 }}>View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      {(activeTab === 'all' || activeTab === 'recipes') && (
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#8EB69B', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Utensils size={22} color="#FF9500" /> Healing Culinary Recipes (Ahara)
          </h2>

          <div className="grid-2">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedItem({ type: 'recipe', data: recipe })}
                className="glass-card glass-card-interactive"
                style={{ borderRadius: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>{recipe.icon}</span>
                    <span style={{
                      background: 'rgba(255, 149, 0, 0.15)',
                      color: '#FFB84D',
                      border: '1px solid rgba(255, 149, 0, 0.4)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      {recipe.doshaTag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
                    {recipe.title}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8EB69B', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    <Clock size={14} /> Prep: <strong>{recipe.prepTime}</strong>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#B8D8C2', lineHeight: '1.4', marginBottom: '1rem' }}>
                    {recipe.summary}
                  </p>
                </div>

                <div style={{
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(142, 182, 155, 0.2)',
                  textAlign: 'right',
                  fontSize: '0.8rem',
                  color: '#FF9500',
                  fontWeight: 700
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
                color: '#8EB69B',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            {selectedItem.type === 'herb' ? (
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{selectedItem.data.icon}</div>
                <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>
                  {selectedItem.data.name}
                </h2>
                <span style={{ fontSize: '0.9rem', color: '#FFB84D', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
                  Sanskrit: {selectedItem.data.sanskrit} • {selectedItem.data.doshaEffect}
                </span>

                <p style={{ color: '#DAF1DE', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  {selectedItem.data.summary}
                </p>

                <h4 style={{ color: '#8EB69B', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Key Health Benefits
                </h4>
                <ul style={{ paddingLeft: '1.2rem', color: '#DAF1DE', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  {selectedItem.data.benefits.map((b, i) => (
                    <li key={i} style={{ marginBottom: '0.3rem' }}>{b}</li>
                  ))}
                </ul>

                <div style={{ background: 'rgba(5, 31, 32, 0.6)', padding: '0.85rem 1rem', borderRadius: '12px', borderLeft: '4px solid #FF9500' }}>
                  <strong style={{ color: '#FFB84D', fontSize: '0.85rem', display: 'block', marginBottom: '0.2rem' }}>
                    Recommended Usage:
                  </strong>
                  <span style={{ color: '#DAF1DE', fontSize: '0.88rem' }}>{selectedItem.data.usage}</span>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{selectedItem.data.icon}</div>
                <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>
                  {selectedItem.data.title}
                </h2>
                <span style={{ fontSize: '0.9rem', color: '#FFB84D', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
                  {selectedItem.data.doshaTag} • Prep Time: {selectedItem.data.prepTime}
                </span>

                <h4 style={{ color: '#8EB69B', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Ingredients
                </h4>
                <ul style={{ paddingLeft: '1.2rem', color: '#DAF1DE', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  {selectedItem.data.ingredients.map((ing, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{ing}</li>
                  ))}
                </ul>

                <h4 style={{ color: '#8EB69B', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Preparation Instructions
                </h4>
                <ol style={{ paddingLeft: '1.2rem', color: '#DAF1DE', fontSize: '0.88rem' }}>
                  {selectedItem.data.instructions.map((step, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{step}</li>
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
