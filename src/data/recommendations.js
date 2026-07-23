// Comprehensive Ayurvedic Wellness Recommendations Engine
export const DOSHA_PROFILES = {
  Vata: {
    title: 'Vata Dosha (Air & Ether)',
    element: 'Air & Space',
    qualities: 'Dry, Light, Cold, Rough, Subtle, Mobile',
    summary: 'Vata governs movement, breathing, nerve impulses, and enthusiasm. When balanced, Vata individuals are creative, energetic, and adaptable.',
    color: '#8EB69B',
    accentColor: '#4E8564',
    diet: {
      favor: ['Warm, cooked, nourishing meals', 'Rice, oats, wheat', 'Healthy fats: Ghee, sesame oil, olive oil', 'Sweet fruits: Bananas, avocados, dates, mangoes', 'Warm spices: Ginger, cinnamon, cardamom, cumin'],
      avoid: ['Raw vegetables and cold salads', 'Iced drinks and cold water', 'Excess caffeine & dry snacks (chips, crackers)', 'Bitter or astringent unripe fruits'],
      mealRoutine: 'Eat regular, unhurried meals at consistent times daily (8 AM Breakfast, 1 PM Lunch, 7 PM Dinner).'
    },
    yoga: [
      { name: 'Balasana (Child\'s Pose)', benefit: 'Grounds the nervous system and calms anxious energy.' },
      { name: 'Tadasana (Mountain Pose)', benefit: 'Builds stability, root strength, and physical balance.' },
      { name: 'Virabhadrasana I & II (Warrior Poses)', benefit: 'Strengthens legs and brings steady grounding.' },
      { name: 'Paschimottanasana (Seated Forward Bend)', benefit: 'Calms mind and stretches lower spine smoothly.' },
      { name: 'Savasana (Corpse Pose)', benefit: 'Essential deep rest to restore nervous system balance.' }
    ],
    dinacharya: {
      morning: 'Wake up by 6:00 AM. Drink warm water with lemon. Practice Abhyanga (warm sesame oil self-massage).',
      afternoon: 'Enjoy a warm, substantial lunch in a peaceful, quiet environment.',
      evening: 'Unwind by 8:30 PM. Enjoy warm golden turmeric milk with nutmeg before sleeping by 10:00 PM.'
    },
    meditation: 'Focus on Root Chakra (Muladhara) grounding visualizer. Practice Nadi Shodhana (Alternate Nostril Breathing) for 10 minutes.',
    sleep: 'Aim for 8 hours of restorative sleep in a cozy, warm, draft-free bedroom.',
    lifestyle: 'Maintain a calm daily routine, stay warm, practice warm oil bath massage, and avoid over-scheduling.',
    seasonal: 'In Autumn/Early Winter, increase intake of warm soups, stews, and warming spices.'
  },

  Pitta: {
    title: 'Pitta Dosha (Fire & Water)',
    element: 'Fire & Water',
    qualities: 'Hot, Sharp, Light, Oily, Liquid, Spreading',
    summary: 'Pitta governs metabolism, digestion, body temperature, and intelligence. When balanced, Pitta individuals are warm, insightful, organized, and charismatic.',
    color: '#FF9500',
    accentColor: '#D97706',
    diet: {
      favor: ['Cooling, refreshing, sweet & bitter foods', 'Coconut water, cucumber, sweet melons, apples', 'Basmati rice, quinoa, mung dal', 'Ghee and coconut oil', 'Cooling herbs: Mint, cilantro, fennel, coriander'],
      avoid: ['Pungent spicy peppers, hot sauces, garlic', 'Fried, greasy, or salty foods', 'Alcohol, excessive coffee, and fermented foods', 'Sour citrus fruits like lemons & vinegar'],
      mealRoutine: 'Never skip meals, especially lunch when digestive fire (Agni) peaks at noon.'
    },
    yoga: [
      { name: 'Chandra Namaskar (Moon Salutation)', benefit: 'Cools the body heat and calms competitive intensity.' },
      { name: 'Matsyasana (Fish Pose)', benefit: 'Opens chest & heart chakra, releases abdominal heat.' },
      { name: 'Padmasana (Lotus Pose)', benefit: 'Centers focus, cools mental agitation.' },
      { name: 'Bhujangasana (Cobra Pose)', benefit: 'Soothes digestive organs gently.' },
      { name: 'Savasana with Sheetali Pranayama', benefit: 'Cooling breath practice to release internal heat.' }
    ],
    dinacharya: {
      morning: 'Wake up by 5:30 AM. Splash face with cool rose water. Practice self-massage with cooling coconut oil.',
      afternoon: 'Eat a hearty, vibrant cooling lunch at 12:30 PM. Take a brief 10-minute relaxing walk in nature.',
      evening: 'Enjoy a calm evening. Avoid high-stress work or intense screen light after 8:30 PM. Sleep by 10:30 PM.'
    },
    meditation: 'Focus on Third Eye & Heart Chakra. Practice Sheetali / Sitkari cooling breath and loving-kindness meditation.',
    sleep: 'Aim for 7-8 hours in a well-ventilated, cool bedroom with light cotton sheets.',
    lifestyle: 'Practice moderation, take leisurely walks near water or green parks, avoid overheating, and foster patience.',
    seasonal: 'In Summer & Sun season, stay out of midday sun, wear natural fibers, and drink herbal teas.'
  },

  Kapha: {
    title: 'Kapha Dosha (Earth & Water)',
    element: 'Earth & Water',
    qualities: 'Heavy, Slow, Cool, Oily, Smooth, Dense, Soft',
    summary: 'Kapha governs structure, lubrication, immunity, and stability. When balanced, Kapha individuals are loving, compassionate, steady, and resilient.',
    color: '#235347',
    accentColor: '#163832',
    diet: {
      favor: ['Light, warm, dry, spicy, and bitter foods', 'Steamed green vegetables, leafy greens, legumes', 'Millets, buckwheat, barley, rye', 'Spices: Black pepper, ginger, cayenne, mustard seeds, turmeric', 'Honey (raw, unheated) as sweetener'],
      avoid: ['Heavy dairy, cream, ice cream, cheese', 'Sweet, sugary desserts and cold sodas', 'Excessive oils, deep-fried snacks, & heavy meats', 'Napping immediately after eating'],
      mealRoutine: 'Eat light meals. Make lunch the main meal, and enjoy a light soup or salad for dinner.'
    },
    yoga: [
      { name: 'Surya Namaskar (Sun Salutations - Dynamic)', benefit: 'Builds internal heat, burns lethargy, energizes metabolism.' },
      { name: 'Dhanurasana (Bow Pose)', benefit: 'Stimulates abdominal organs and fires up Agni.' },
      { name: 'Utkatasana (Chair Pose)', benefit: 'Builds lower body warmth and invigorating stamina.' },
      { name: 'Adho Mukha Svanasana (Downward Dog)', benefit: 'Increases circulation to head and upper body.' },
      { name: 'Kapalabhati Pranayama', benefit: 'Skull-shining breath to invigorate respiratory system.' }
    ],
    dinacharya: {
      morning: 'Wake up early before 6:00 AM (avoid sleeping past sunrise). Practice dry skin brushing (Garshana).',
      afternoon: 'Enjoy a light, spiced lunch at 1:00 PM. Avoid afternoon naps.',
      evening: 'Engage in brisk evening walking or exercise. Eat light dinner by 7:00 PM. Sleep by 10:30 PM.'
    },
    meditation: 'Focus on Solar Plexus Chakra (Manipura) for inner heat and drive. Practice active, dynamic meditation.',
    sleep: 'Aim for 6-7 hours. Avoid over-sleeping or lingering in bed after waking.',
    lifestyle: 'Seek variety, physical activity, warm environments, dry steam baths, and dynamic new experiences.',
    seasonal: 'In Spring (Kapha season), undergo light cleansing, drink warm ginger tea, and engage in daily vigorous exercise.'
  }
};

export const getDoshaRecommendations = (vata, pitta, kapha) => {
  const scores = { Vata: vata, Pitta: pitta, Kapha: kapha };
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  
  const dominant = sorted[0][0];
  const secondary = sorted[1][0];
  const diff = sorted[0][1] - sorted[1][1];

  // If top 2 are within 8% difference, treat as dual-dosha
  let doshaType = dominant;
  let isDual = false;
  if (diff <= 8) {
    isDual = true;
    doshaType = `${dominant}-${secondary}`;
  }

  const primaryProfile = DOSHA_PROFILES[dominant];
  const secondaryProfile = DOSHA_PROFILES[secondary];

  return {
    dominant,
    secondary,
    isDual,
    doshaType,
    primaryProfile,
    secondaryProfile,
    combinedSummary: isDual 
      ? `Your constitution is dual-dominant (${doshaType}). You possess the qualities of both ${dominant} and ${secondary}. Focus primarily on pacifying ${dominant} while keeping ${secondary} in balance.`
      : `Your dominant constitution is ${dominant} (${scores[dominant]}%). Balance this dosha with regular routine, tailored diet, and mindful lifestyle.`
  };
};
