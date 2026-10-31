import { BallparkInputs, BallparkResult } from '../types';

interface MaterialPricing {
  materialPerSq: [number, number];
  laborPerSq: [number, number];
}

const MATERIAL_RATES: Record<string, MaterialPricing> = {
  arch_shingle: {
    materialPerSq: [210, 260],
    laborPerSq: [190, 240],
  },
  impact_shingle: {
    materialPerSq: [280, 340],
    laborPerSq: [220, 280],
  },
  standing_seam: {
    materialPerSq: [550, 700],
    laborPerSq: [450, 600],
  },
  composite_slate: {
    materialPerSq: [750, 950],
    laborPerSq: [550, 750],
  },
  tpo_flat: {
    materialPerSq: [260, 320],
    laborPerSq: [240, 310],
  },
  designer_asphalt: {
    materialPerSq: [360, 440],
    laborPerSq: [260, 340],
  },
};

const PITCH_MULTIPLIERS: Record<'low' | 'moderate' | 'steep', number> = {
  low: 1.10,
  moderate: 1.22,
  steep: 1.38,
};

const STORY_MULTIPLIERS: Record<1 | 2 | 3, number> = {
  1: 1.0,
  2: 1.12,
  3: 1.25,
};

const TEAR_OFF_RATE_PER_SQ = 125; // includes dumpster, safety tarping, magnet sweep & disposal
const WASTE_FACTOR = 1.10; // standard 10% cutting waste for valleys, rakes, hips

export function calculateBallparkRoofCost(inputs: BallparkInputs): BallparkResult {
  const sqft = Math.max(800, Math.min(8000, inputs.squareFootage));
  const pitchMult = PITCH_MULTIPLIERS[inputs.pitch] || 1.22;
  const storyMult = STORY_MULTIPLIERS[inputs.stories] || 1.0;
  
  // Calculate roof area with pitch multiplier and 10% waste factor
  const totalRoofSqFt = sqft * pitchMult * WASTE_FACTOR;
  const estimatedSquares = Math.round((totalRoofSqFt / 100) * 10) / 10;

  const rate = MATERIAL_RATES[inputs.materialId] || MATERIAL_RATES.arch_shingle;

  const matLow = Math.round((estimatedSquares * rate.materialPerSq[0]) / 100) * 100;
  const matHigh = Math.round((estimatedSquares * rate.materialPerSq[1]) / 100) * 100;

  const laborLow = Math.round((estimatedSquares * rate.laborPerSq[0] * storyMult) / 100) * 100;
  const laborHigh = Math.round((estimatedSquares * rate.laborPerSq[1] * storyMult) / 100) * 100;

  const tearOffTotal = inputs.includeTearOff 
    ? Math.round((estimatedSquares * TEAR_OFF_RATE_PER_SQ) / 100) * 100
    : 0;

  const lowEstimate = matLow + laborLow + tearOffTotal;
  const highEstimate = matHigh + laborHigh + tearOffTotal;

  return {
    estimatedSquares,
    lowEstimate,
    highEstimate,
    breakdown: {
      materialCostRange: [matLow, matHigh],
      laborAndInstallRange: [laborLow, laborHigh],
      tearOffAndDisposal: tearOffTotal,
    },
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
