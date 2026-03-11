import { MapPin, TrendingUp, PlusCircle, Calendar, User, Bell, Search, Map as MapIcon, Camera, Star, Clock, Navigation, ChevronLeft, X, Heart, Share2 } from 'lucide-react';

export type CrowdLevel = 'dead' | 'chill' | 'busy' | 'poppin';

export interface Venue {
  id: string;
  name: string;
  type: string;
  crowdLevel: CrowdLevel;
  image: string;
  distance: string;
  address: string;
  specials: string[];
  rating: number;
  coordinates: { x: number; y: number };
}

export interface Event {
  id: string;
  title: string;
  venueId: string;
  venueName: string;
  time: string;
  date: string;
  description: string;
  image: string;
  category: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  venueId: string;
  venueName: string;
  content: string;
  media?: string;
  timestamp: string;
  vibe: string;
}

export const VENUES: Venue[] = [
  {
    id: '1',
    name: 'Neon Dreams',
    type: 'Nightclub',
    crowdLevel: 'poppin',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
    distance: '0.4 mi',
    address: '123 Electric Ave',
    specials: ['2-for-1 Cocktails', 'No Cover before 11PM'],
    rating: 4.8,
    coordinates: { x: 30, y: 40 }
  },
  {
    id: '2',
    name: 'The Velvet Lounge',
    type: 'Cocktail Bar',
    crowdLevel: 'busy',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    distance: '0.8 mi',
    address: '456 Silk Rd',
    specials: ['Happy Hour until 9PM'],
    rating: 4.5,
    coordinates: { x: 60, y: 25 }
  },
  {
    id: '3',
    name: 'Bassment',
    type: 'Underground Club',
    crowdLevel: 'chill',
    image: 'https://images.unsplash.com/photo-1574391884720-bbc37aa05d32?auto=format&fit=crop&w=800&q=80',
    distance: '1.2 mi',
    address: '789 Low End St',
    specials: ['Craft Beer Flight $15'],
    rating: 4.2,
    coordinates: { x: 45, y: 70 }
  },
  {
    id: '4',
    name: 'Skyline Rooftop',
    type: 'Lounge',
    crowdLevel: 'dead',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    distance: '1.5 mi',
    address: '101 High Rise Way',
    specials: ['Sunset Specials'],
    rating: 4.7,
    coordinates: { x: 75, y: 55 }
  }
];

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Electric Summer Night',
    venueId: '1',
    venueName: 'Neon Dreams',
    time: '10:00 PM',
    date: 'Tonight',
    description: 'The biggest house party of the season with DJ Spark.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    category: 'Music'
  },
  {
    id: 'e2',
    title: 'Jazz & Gin',
    venueId: '2',
    venueName: 'The Velvet Lounge',
    time: '8:00 PM',
    date: 'Tomorrow',
    description: 'Smooth jazz and premium gin tastings.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    category: 'Live Music'
  }
];

export const CHECK_INS: CheckIn[] = [
  {
    id: 'c1',
    userId: 'u1',
    userName: 'Alex Rivera',
    userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    venueId: '1',
    venueName: 'Neon Dreams',
    content: 'The vibe is insane tonight! 🔥',
    media: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    timestamp: '15m ago',
    vibe: 'Electric'
  },
  {
    id: 'c2',
    userId: 'u2',
    userName: 'Sarah Chen',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    venueId: '2',
    venueName: 'The Velvet Lounge',
    content: 'Perfect spot for a chill Saturday.',
    timestamp: '1h ago',
    vibe: 'Sophisticated'
  }
];
