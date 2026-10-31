export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  bullets: string[];
  typicalTimeline: string;
  warranty: string;
  recommendedFor: string;
}

export interface RoofingMaterial {
  id: string;
  name: string;
  category: 'asphalt' | 'metal' | 'composite' | 'flat';
  lifespanYears: string;
  windRatingMph: number;
  costTier: '$' | '$$' | '$$$' | '$$$$';
  costPerSqRange: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  tag: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  serviceCategory: string;
  material: string;
  roofPitch: string;
  sizeSquares: number;
  completedDate: string;
  summary: string;
  image: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  projectType: string;
  completedYear: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BallparkInputs {
  squareFootage: number;
  pitch: 'low' | 'moderate' | 'steep';
  stories: 1 | 2 | 3;
  materialId: string;
  includeTearOff: boolean;
}

export interface BallparkResult {
  estimatedSquares: number;
  lowEstimate: number;
  highEstimate: number;
  breakdown: {
    materialCostRange: [number, number];
    laborAndInstallRange: [number, number];
    tearOffAndDisposal: number;
  };
}

export interface EstimateFormData {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  serviceType: string;
  materialInterest: string;
  preferredContact: 'phone' | 'text' | 'email';
  projectTimeline: 'immediate' | '1-3 months' | 'planning';
  description: string;
}
