// 15 Comprehensive Ayurvedic Assessment Questions
export const QUESTIONS = [
  {
    id: 1,
    category: 'Body Frame & Physical Build',
    text: 'How would you describe your natural physical body structure and frame?',
    options: [
      { key: 'A', text: 'Slender, thin, light frame; hard to gain weight or muscle', dosha: 'Vata' },
      { key: 'B', text: 'Medium build, athletic, well-proportioned; easy to gain or lose weight', dosha: 'Pitta' },
      { key: 'C', text: 'Large, broad frame, sturdy & strong build; tends to gain weight easily', dosha: 'Kapha' }
    ]
  },
  {
    id: 2,
    category: 'Skin Texture & Qualities',
    text: 'What is your skin generally like without applying moisturizers?',
    options: [
      { key: 'A', text: 'Dry, thin, cool, prone to roughness, flakiness or chapping', dosha: 'Vata' },
      { key: 'B', text: 'Warm, oily T-zone, reddish tone, sensitive or prone to breakouts', dosha: 'Pitta' },
      { key: 'C', text: 'Thick, smooth, soft, naturally moist and cool to the touch', dosha: 'Kapha' }
    ]
  },
  {
    id: 3,
    category: 'Hair Characteristics',
    text: 'Which best describes your natural hair quality?',
    options: [
      { key: 'A', text: 'Dry, coarse, thin, wavy or frizzy, split ends', dosha: 'Vata' },
      { key: 'B', text: 'Fine, straight, soft, early graying or thinning hair', dosha: 'Pitta' },
      { key: 'C', text: 'Thick, lustrous, wavy or curly, strong and abundant', dosha: 'Kapha' }
    ]
  },
  {
    id: 4,
    category: 'Digestion & Appetite',
    text: 'How does your stomach and digestion typically function?',
    options: [
      { key: 'A', text: 'Irregular appetite, prone to bloating, gas, or constipation', dosha: 'Vata' },
      { key: 'B', text: 'Strong, intense hunger; gets irritable if meals are missed; prone to acidity', dosha: 'Pitta' },
      { key: 'C', text: 'Slow, steady digestion; can skip meals easily without discomfort', dosha: 'Kapha' }
    ]
  },
  {
    id: 5,
    category: 'Sleep Patterns',
    text: 'How is the depth and consistency of your sleep?',
    options: [
      { key: 'A', text: 'Light, restless, easily awakened; tends to dream actively', dosha: 'Vata' },
      { key: 'B', text: 'Moderate, sound sleep; usually 6-7 hours is sufficient', dosha: 'Pitta' },
      { key: 'C', text: 'Deep, heavy, prolonged sleep; difficulty waking up early morning', dosha: 'Kapha' }
    ]
  },
  {
    id: 6,
    category: 'Stamina & Energy',
    text: 'How would you rate your daily physical energy levels?',
    options: [
      { key: 'A', text: 'Comes in quick energetic bursts, but tires out quickly', dosha: 'Vata' },
      { key: 'B', text: 'Moderate and purposeful energy; driven, intense focus', dosha: 'Pitta' },
      { key: 'C', text: 'High endurance and steady stamina; slow to start but long-lasting', dosha: 'Kapha' }
    ]
  },
  {
    id: 7,
    category: 'Temperature Preference',
    text: 'What climate or ambient temperature do you feel most comfortable in?',
    options: [
      { key: 'A', text: 'Prefer warm climates; strongly dislike cold, windy weather', dosha: 'Vata' },
      { key: 'B', text: 'Prefer cool climates; strongly dislike intense heat and humidity', dosha: 'Pitta' },
      { key: 'C', text: 'Prefer warm, dry climates; dislike cold, damp, rainy weather', dosha: 'Kapha' }
    ]
  },
  {
    id: 8,
    category: 'Mental Learning Style',
    text: 'How do you learn new information and process thoughts?',
    options: [
      { key: 'A', text: 'Grasp concepts very quickly, but tend to forget quickly as well', dosha: 'Vata' },
      { key: 'B', text: 'Analytical, sharp, precise; grasp concepts clearly and logically', dosha: 'Pitta' },
      { key: 'C', text: 'Take time to absorb concepts, but retain information permanently', dosha: 'Kapha' }
    ]
  },
  {
    id: 9,
    category: 'Stress & Emotional Response',
    text: 'When facing unexpected high-stress situations, how do you react?',
    options: [
      { key: 'A', text: 'Become anxious, fearful, worried, or overwhelmed', dosha: 'Vata' },
      { key: 'B', text: 'Become impatient, irritable, angry, or critical', dosha: 'Pitta' },
      { key: 'C', text: 'Remain calm, silent, serene, or become complacent/withdrawn', dosha: 'Kapha' }
    ]
  },
  {
    id: 10,
    category: 'Communication Style',
    text: 'How do friends and family describe your manner of speaking?',
    options: [
      { key: 'A', text: 'Fast, animated, talkative, idea-filled, enthusiastic', dosha: 'Vata' },
      { key: 'B', text: 'Direct, clear, articulate, persuasive, commanding', dosha: 'Pitta' },
      { key: 'C', text: 'Slow, gentle, melodious, thoughtful, calm', dosha: 'Kapha' }
    ]
  },
  {
    id: 11,
    category: 'Exercise & Movement Preference',
    text: 'Which physical activities do you naturally enjoy the most?',
    options: [
      { key: 'A', text: 'Light movement, dance, brisk walking, flexibility stretches', dosha: 'Vata' },
      { key: 'B', text: 'Competitive sports, cycling, hiking, martial arts, fitness challenges', dosha: 'Pitta' },
      { key: 'C', text: 'Heavy strength training, long cardio sessions, endurance sports', dosha: 'Kapha' }
    ]
  },
  {
    id: 12,
    category: 'Weather Sensitivity',
    text: 'Which weather condition affects your mood or body most negatively?',
    options: [
      { key: 'A', text: 'Dry, freezing cold, windy weather', dosha: 'Vata' },
      { key: 'B', text: 'Hot, scorching sun, hot humid days', dosha: 'Pitta' },
      { key: 'C', text: 'Cloudy, overcast, wet, damp, chilly weather', dosha: 'Kapha' }
    ]
  },
  {
    id: 13,
    category: 'Financial & Spending Habits',
    text: 'How do you handle money and financial management?',
    options: [
      { key: 'A', text: 'Spend money impulsively on creative or spontaneous items', dosha: 'Vata' },
      { key: 'B', text: 'Spend methodically on high-value, purposeful, or luxury investments', dosha: 'Pitta' },
      { key: 'C', text: 'Save consistently, accumulate wealth, hesitant to spend unnecessarily', dosha: 'Kapha' }
    ]
  },
  {
    id: 14,
    category: 'Taste & Food Cravings',
    text: 'Which flavors and food textures do you crave most frequently?',
    options: [
      { key: 'A', text: 'Warm, rich, sweet, sour, salty, and buttery foods', dosha: 'Vata' },
      { key: 'B', text: 'Cooling, refreshing, sweet, bitter, and astringent foods', dosha: 'Pitta' },
      { key: 'C', text: 'Pungent, spicy, warm, bitter, light, and crispy foods', dosha: 'Kapha' }
    ]
  },
  {
    id: 15,
    category: 'Overall Nature & Core Disposition',
    text: 'In essence, what best describes your primary disposition?',
    options: [
      { key: 'A', text: 'Vibrant, creative, adaptable, free-spirited, imaginative', dosha: 'Vata' },
      { key: 'B', text: 'Ambitious, passionate, organized, leader, goal-oriented', dosha: 'Pitta' },
      { key: 'C', text: 'Nurturing, steady, loyal, peaceful, grounded, patient', dosha: 'Kapha' }
    ]
  }
];
