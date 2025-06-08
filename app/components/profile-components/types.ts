export interface Badge {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  date?: string;
  category:
    | 'code'
    | 'bugs'
    | 'languages'
    | 'mentor'
    | 'ci'
    | 'creative'
    | 'mastery';
  position: number;
  requires?: number[];
  progress?: number;
}

// Category Interface
export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Connection Interface for badge connections
export interface Connection {
  from: number;
  to: number;
  unlocked: boolean;
}

// Tier Styles Interface
export interface TierStyles {
  bronze: string;
  silver: string;
  gold: string;
  diamond: string;
}
