export type CrowdLevel = 'dead' | 'chill' | 'busy' | 'poppin';

export interface Venue {
  id: string;
  name: string;
  type: string;
  crowdLevel: CrowdLevel;
  distance: string;
  image: string;
  rating: number;
  specials: string[];
  amenities: string[];
  coordinates: { x: number, y: number }; // Mock coordinates for the prototype map
}

export interface Event {
  id: string;
  title: string;
  venueName: string;
  time: string;
  date: string;
  image: string;
  category: string;
  description: string;
}

export interface Bartender {
  id: string;
  name: string;
  venueId: string;
  venueName: string;
  image: string;
  specialty: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  rank: 'Newbie' | 'Regular' | 'Vibe Architect' | 'LEGEND';
  xp: number;
  nextRankXp: number;
  favorites: {
    venues: string[]; // venue IDs
    bartenders: string[]; // bartender IDs
    specials: string[]; // special strings or IDs
  };
  checkInHistory: string[]; // check-in IDs
  preferences: {
    notifications: boolean;
    incognito: boolean;
    theme: 'cyber' | 'dark' | 'neon';
  };
}

export interface CheckIn {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  venueId: string;
  venueName: string;
  vibe: string;
  content?: string;
  time: string;
  media?: string;
}
