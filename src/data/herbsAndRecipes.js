// Ayurvedic Herbal & Medicinal Recipe Repository
export const HERBS = [
  {
    id: 'h1',
    name: 'Ashwagandha (Indian Ginseng)',
    sanskrit: 'अश्वगंधा',
    category: 'Rasayana (Rejuvenator)',
    doshaEffect: 'Pacifies Vata & Kapha',
    summary: 'A powerful adaptogenic herb that grounds nervous energy, reduces stress, and builds vitality.',
    benefits: [
      'Reduces cortisol and anxiety levels',
      'Enhances stamina and muscle strength',
      'Supports deep, restorative sleep',
      'Strengthens immune system'
    ],
    usage: 'Take 1/2 tsp powder in warm milk or water before bedtime.',
    suitableDoshas: ['Vata', 'Kapha'],
    icon: '🌿'
  },
  {
    id: 'h2',
    name: 'Triphala (Three Fruits)',
    sanskrit: 'त्रिफला',
    category: 'Digestive Cleanser',
    doshaEffect: 'Tridoshic (Balances Vata, Pitta & Kapha)',
    summary: 'Classical formula combining Amalaki, Bibhitaki, and Haritaki to cleanse the digestive tract.',
    benefits: [
      'Gently regulates bowel movements',
      'Detoxifies tissues without depleting energy',
      'Supports healthy digestion and nutrient absorption',
      'Rich in natural antioxidants and Vitamin C'
    ],
    usage: 'Take 1/2 to 1 tsp powder in warm water before sleeping.',
    suitableDoshas: ['Vata', 'Pitta', 'Kapha'],
    icon: '🍇'
  },
  {
    id: 'h3',
    name: 'Brahmi (Gotu Kola / Bacopa)',
    sanskrit: 'ब्राह्मी',
    category: 'Medhya Rasayana (Brain Tonic)',
    doshaEffect: 'Pacifies Pitta & Vata',
    summary: 'Soothes the mind, enhances memory, focus, and reduces mental inflammation.',
    benefits: [
      'Improves concentration and mental clarity',
      'Cools an overworked, intense mind',
      'Reduces stress-induced headache',
      'Supports nervous system health'
    ],
    usage: 'Take 1/2 tsp powder or tea infusion in the morning.',
    suitableDoshas: ['Vata', 'Pitta'],
    icon: '🧠'
  },
  {
    id: 'h4',
    name: 'Tulsi (Holy Basil)',
    sanskrit: 'तुलसी',
    category: 'Prana Expander',
    doshaEffect: 'Pacifies Kapha & Vata',
    summary: 'Revered as the Queen of Herbs for respiratory strength, clarity, and immunity.',
    benefits: [
      'Clears respiratory congestion and cold',
      'Elevates mood and spiritual awareness',
      'Balances blood sugar and stress response',
      'Warming digestive stimulant'
    ],
    usage: 'Infuse fresh or dried leaves in hot water for 5 minutes as herbal tea.',
    suitableDoshas: ['Kapha', 'Vata'],
    icon: '🍃'
  },
  {
    id: 'h5',
    name: 'Shatavari (Wild Asparagus)',
    sanskrit: 'शतावरी',
    category: 'Nourishing Tonic',
    doshaEffect: 'Pacifies Pitta & Vata',
    summary: 'Sweet, cooling herb that hydrates tissues, balances hormones, and rejuvenates.',
    benefits: [
      'Deeply hydrates dry body tissues',
      'Soothes digestive acidity and heat',
      'Supports hormonal balance & vitality',
      'Calms emotional irritability'
    ],
    usage: 'Take 1/2 tsp with warm milk or ghee.',
    suitableDoshas: ['Pitta', 'Vata'],
    icon: '🌸'
  },
  {
    id: 'h6',
    name: 'Turmeric (Haridra)',
    sanskrit: 'हरिद्रा',
    category: 'Natural Anti-inflammatory',
    doshaEffect: 'Tridoshic (Balances all, pacifies Kapha)',
    summary: 'Golden spice renowned for blood purification, joint care, and skin radiance.',
    benefits: [
      'Reduces joint stiffness and inflammation',
      'Purifies blood and enhances skin complexion',
      'Supports liver health & digestion',
      'Strong natural antibacterial properties'
    ],
    usage: 'Cook in food with black pepper and ghee, or drink in golden milk.',
    suitableDoshas: ['Vata', 'Pitta', 'Kapha'],
    icon: '✨'
  }
];

export const RECIPES = [
  {
    id: 'r1',
    title: 'Classical Ayurvedic Kitchari',
    doshaTag: 'Tridoshic Healing Meal',
    prepTime: '25 Mins',
    summary: 'The ultimate cleansing meal made with yellow mung dal, basmati rice, ghee, and warming spices.',
    ingredients: [
      '1/2 cup Split Yellow Mung Dal',
      '1/2 cup Organic Basmati Rice',
      '1 tbsp Ghee',
      '1 tsp Cumin & Mustard seeds',
      '1/2 tsp Turmeric & Ginger',
      '4 cups Water & Pinch of Mineral Salt'
    ],
    instructions: [
      'Rinse rice and mung dal thoroughly until water runs clear.',
      'Heat ghee in a pot over medium flame, add cumin and mustard seeds until they pop.',
      'Add turmeric, grated ginger, rice, and mung dal. Stir for 1 minute.',
      'Pour in water, bring to boil, then cover and simmer on low for 20 minutes until creamy.',
      'Garnish with fresh cilantro and lime juice. Serve warm.'
    ],
    suitableDoshas: ['Vata', 'Pitta', 'Kapha'],
    icon: '🍲'
  },
  {
    id: 'r2',
    title: 'Golden Turmeric Night Milk',
    doshaTag: 'Soothes Vata & Pitta',
    prepTime: '8 Mins',
    summary: 'Warming, relaxing bedtime tonic that promotes deep sleep and joint comfort.',
    ingredients: [
      '1 cup Milk (Almond, Oat, or Cow milk)',
      '1/2 tsp Turmeric powder',
      '1/4 tsp Cinnamon powder',
      'Pinch of Cardamom & Black pepper',
      '1 tsp Honey or Maple syrup'
    ],
    instructions: [
      'Combine milk, turmeric, cinnamon, cardamom, and black pepper in a small saucepan.',
      'Warm over low heat for 5 minutes without boiling.',
      'Pour into a mug, stir in honey once lukewarm, and sip slowly before sleep.'
    ],
    suitableDoshas: ['Vata', 'Pitta'],
    icon: '🥛'
  },
  {
    id: 'r3',
    title: 'Cooling Mint & Cucumber Elixir',
    doshaTag: 'Pacifies Pitta Heat',
    prepTime: '5 Mins',
    summary: 'Refreshing hydration drink to cool digestive heat, soothe acidity, and refresh skin.',
    ingredients: [
      '1 cup Cool Water or Coconut Water',
      '1/2 cup Chopped Cucumber',
      '8-10 Fresh Mint leaves',
      '1 tsp Lime juice',
      'Pinch of Rock salt & Cumin powder'
    ],
    instructions: [
      'Blend cucumber, mint leaves, lime juice, and water until smooth.',
      'Strain if desired, sprinkle roasted cumin powder and rock salt on top.',
      'Drink at room temperature during warm afternoons.'
    ],
    suitableDoshas: ['Pitta'],
    icon: '🥒'
  },
  {
    id: 'r4',
    title: 'CCF Digestive Tea (Cumin, Coriander, Fennel)',
    doshaTag: 'Gentle Detox Tea',
    prepTime: '10 Mins',
    summary: 'The gold standard Ayurvedic tea for bloating, digestion, and metabolic detox.',
    ingredients: [
      '1/3 tsp Cumin seeds',
      '1/3 tsp Coriander seeds',
      '1/3 tsp Fennel seeds',
      '3 cups Water'
    ],
    instructions: [
      'Bring 3 cups of water to a boil in a saucepan.',
      'Add cumin, coriander, and fennel seeds.',
      'Simmer on low heat for 5-8 minutes until fragrant.',
      'Strain into a flask and sip warm throughout the day.'
    ],
    suitableDoshas: ['Vata', 'Pitta', 'Kapha'],
    icon: '☕'
  }
];
