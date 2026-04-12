// Post-GLP-1 maintenance dietary guidance tips
// Rotating daily, evidence-based, non-restrictive language

const TIPS = [
  {
    category: 'Protein First',
    tip: 'Starting meals with protein supports satiety signals that may now be less amplified without medication. Aim for 25–30g per meal.',
  },
  {
    category: 'Eating Pace',
    tip: 'Your stomach still takes 15–20 minutes to signal fullness to your brain. Eating slowly remains one of the most effective maintenance tools you have.',
  },
  {
    category: 'Portion Awareness',
    tip: 'Without GLP-1\'s appetite suppression, portions can quietly increase. Using smaller plates isn\'t restriction — it\'s an environmental design choice.',
  },
  {
    category: 'Hydration',
    tip: 'Thirst is frequently misread as hunger. Drinking a glass of water before meals is a simple tool for appetite recalibration.',
  },
  {
    category: 'Fibre',
    tip: 'Vegetables, legumes, and whole grains slow digestion and support the gut microbiome. These effects mirror some of what GLP-1 medications provided.',
  },
  {
    category: 'Meal Timing',
    tip: 'Regular meal timing helps regulate hunger hormones. Skipping meals often leads to overcorrection later — consistent rhythm matters.',
  },
  {
    category: 'Mindful Eating',
    tip: 'Eating without distractions lets you notice hunger and satisfaction cues more clearly. Even one distraction-free meal per day builds the skill.',
  },
  {
    category: 'Protein Quality',
    tip: 'Complete proteins (eggs, fish, poultry, dairy, legumes combined with grains) support muscle retention during maintenance — critical for metabolic rate.',
  },
  {
    category: 'Sleep & Hunger',
    tip: 'Poor sleep increases ghrelin (hunger hormone) and decreases leptin (satiety hormone). Prioritising sleep is a nutrition strategy.',
  },
  {
    category: 'Social Eating',
    tip: 'Food is social. Enjoying meals with others without guilt is part of a sustainable maintenance approach. One enjoyable meal doesn\'t change your trajectory.',
  },
  {
    category: 'Metabolic Adaptation',
    tip: 'Your metabolic rate has adapted during weight loss. Maintenance calorie needs are individual — focus on how you feel and your weight trend, not a fixed number.',
  },
  {
    category: 'Blood Sugar Stability',
    tip: 'Pairing carbohydrates with protein or fat slows glucose absorption — supporting the blood sugar stabilisation that GLP-1 medications helped provide.',
  },
]

export function getDailyTip() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  )
  return TIPS[dayOfYear % TIPS.length]
}

export default TIPS
