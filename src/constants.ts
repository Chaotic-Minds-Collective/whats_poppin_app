import { Venue, Event, CheckIn, Bartender, User } from './types';

export const VENUES: Venue[] = [
  {
    id: '1',
    name: "Lucky's",
    type: 'Bar & Grill',
    crowdLevel: 'poppin',
    distance: '0.2 mi',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    specials: ['Chaos Hour: $3 Drafts', 'Legend Special: Free Wings'],
    amenities: ['dog-friendly', 'live-music', 'trivia'],
    coordinates: { x: 45, y: 55 }
  },
  {
    id: '2',
    name: "The Velvet Lounge",
    type: 'Cocktail Bar',
    crowdLevel: 'chill',
    distance: '0.5 mi',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    specials: ['Happy Hour: 2-for-1 Martinis'],
    amenities: ['classy', 'cocktails'],
    coordinates: { x: 65, y: 35 }
  },
  {
    id: '3',
    name: "The Mint",
    type: 'Historic Pub',
    crowdLevel: 'busy',
    distance: '1.1 mi',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    rating: 4.2,
    specials: ['Biker Night: 10% Off'],
    amenities: ['biker-friendly', 'historic'],
    coordinates: { x: 30, y: 75 }
  },
  {
    id: '4',
    name: "Maple Valley Taproom",
    type: 'Brewery',
    crowdLevel: 'poppin',
    distance: '4.5 mi',
    image: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    specials: ['New IPA Release'],
    amenities: ['kids-friendly', 'outdoor-patio'],
    coordinates: { x: 80, y: 20 }
  }
];

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Neon Dreams DJ Set',
    venueName: "Lucky's",
    time: '10:00 PM',
    date: 'Tonight',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    category: 'Live Music',
    description: 'The Plateau region’s biggest electronic night. High frequency vibes only.'
  },
  {
    id: 'e2',
    title: 'Trivia Night: 90s Grunge',
    venueName: "The Mint",
    time: '7:00 PM',
    date: 'Wed, Mar 12',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    category: 'Trivia',
    description: 'Test your knowledge of the Seattle sound. Prizes for top 3 teams.'
  }
];

export const CHECK_INS: CheckIn[] = [
  {
    id: 'c1',
    userId: 'u1',
    userName: 'Alex Rivera',
    userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
    venueId: '1',
    venueName: "Lucky's",
    vibe: 'Electric',
    content: 'The energy here is insane! Chaos Hour just started.',
    time: '2m ago',
    media: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'c2',
    userId: 'u2',
    userName: 'Sarah Chen',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    venueId: '2',
    venueName: "The Velvet Lounge",
    vibe: 'Chill',
    content: 'Perfect spot for a quiet drink and good conversation.',
    time: '1h ago'
  }
];

export const BARTENDERS: Bartender[] = [
  {
    id: 'b1',
    name: 'Jax',
    venueId: '1',
    venueName: "Lucky's",
    image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=400&q=80',
    specialty: 'Smoked Old Fashioned'
  },
  {
    id: 'b2',
    name: 'Luna',
    venueId: '2',
    venueName: "The Velvet Lounge",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    specialty: 'Espresso Martini'
  },
  {
    id: 'b3',
    name: 'Mick',
    venueId: '3',
    venueName: "The Mint",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    specialty: 'Local Craft Pours'
  }
];

export const CURRENT_USER: User = {
  id: 'u_me',
  name: 'Chaos Seeker',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  rank: 'Vibe Architect',
  xp: 750,
  nextRankXp: 1000,
  favorites: {
    venues: ['1'],
    bartenders: ['b1'],
    specials: ['Chaos Hour: $3 Drafts']
  },
  checkInHistory: ['c1'],
  preferences: {
    notifications: true,
    incognito: false,
    theme: 'cyber'
  }
};
