import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, TrendingUp, PlusCircle, Calendar, User, 
  Bell, Search, Map as MapIcon, Camera, Star, 
  Clock, Navigation, ChevronLeft, X, Heart, 
  Share2, Flame, Info, CheckCircle2, ChevronRight,
  Edit2
} from 'lucide-react';
import { VENUES, EVENTS, CHECK_INS, Venue, Event, CheckIn, CrowdLevel } from './types';

// --- Utilities ---

const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy' = 'light') => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 50,
    };
    window.navigator.vibrate(patterns[intensity]);
  }
};

// --- Components ---

const CrowdIndicator = ({ level, size = 'md' }: { level: CrowdLevel, size?: 'sm' | 'md' | 'lg' }) => {
  const config = {
    dead: { color: 'bg-gray-500', label: 'Dead', icon: '⚪' },
    chill: { color: 'bg-yellow-500', label: 'Chill', icon: '🟡' },
    busy: { color: 'bg-orange-500', label: 'Busy', icon: '🟠' },
    poppin: { color: 'bg-neon-pink', label: 'Poppin', icon: '🔥' },
  };

  const { color, label, icon } = config[level];
  const sizeClasses = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : size === 'lg' ? 'text-sm px-3 py-1.5' : 'text-xs px-2 py-1';

  return (
    <div className={`${color} ${sizeClasses} rounded-full flex items-center gap-1 font-bold text-white shadow-lg`}>
      <span>{icon}</span>
      <span>{label.toUpperCase()}</span>
    </div>
  );
};

const NeonButton = ({ 
  children, 
  onClick, 
  variant = 'purple', 
  className = '',
  fullWidth = false 
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'purple' | 'pink' | 'blue' | 'ghost',
  className?: string,
  fullWidth?: boolean
}) => {
  const variants = {
    purple: 'bg-neon-purple/20 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white',
    pink: 'bg-neon-pink/20 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white',
    blue: 'bg-neon-blue/20 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white',
    ghost: 'bg-transparent border-white/20 text-white hover:bg-white/10',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        triggerHaptic('light');
        onClick?.();
      }}
      className={`
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        border-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300
        ${variant !== 'ghost' ? `neon-border-${variant}` : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

const BottomNav = ({ activeTab, onTabChange, hasEventReminders }: { activeTab: string, onTabChange: (tab: string) => void, hasEventReminders: boolean }) => {
  const tabs = [
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'checkin', icon: PlusCircle, label: 'Check-In', special: true },
    { id: 'events', icon: Calendar, label: 'Events', badge: hasEventReminders },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-4 pt-2 pb-8 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            triggerHaptic('light');
            onTabChange(tab.id);
          }}
          className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
            activeTab === tab.id ? 'text-neon-blue' : 'text-white/40'
          }`}
        >
          <div className={`${tab.special ? 'bg-neon-pink p-3 rounded-full -mt-8 shadow-lg shadow-neon-pink/40 text-white' : ''}`}>
            <tab.icon size={tab.special ? 28 : 24} />
            {tab.badge && (
              <div className="absolute top-0 right-0 w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_5px_rgba(0,243,255,0.8)]" />
            )}
          </div>
          {!tab.special && <span className="text-[10px] font-medium">{tab.label}</span>}
        </button>
      ))}
    </div>
  );
};

const Toast = ({ message, onHide }: { message: string, onHide: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 50, opacity: 0, scale: 0.9 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] glass px-6 py-3 rounded-2xl border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.2)] flex items-center gap-3"
    >
      <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
      <span className="text-sm font-bold tracking-wide">{message}</span>
    </motion.div>
  );
};

// --- Screens ---

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Discover the Vibe!!!!",
      desc: "See what's happening in your city in real-time. No more dead bars.",
      color: "neon-purple",
      icon: Flame
    },
    {
      title: "Live Crowd Levels",
      desc: "Check if it's chill, busy, or absolutely poppin' before you head out.",
      color: "neon-pink",
      icon: MapPin
    },
    {
      title: "Share the Vibe",
      desc: "Check in, post photos, and let your crew know where the party is.",
      color: "neon-blue",
      icon: Camera
    }
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete();
  };

  const CurrentIcon = steps[step].icon;

  return (
    <div className="h-screen w-full bg-dark-bg p-8 flex flex-col justify-between">
      <div className="flex justify-end">
        <button onClick={onComplete} className="text-white/40 font-bold">Skip</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className={`w-32 h-32 rounded-full glass flex items-center justify-center mb-12 neon-border-${steps[step].color.split('-')[1]}`}>
            <CurrentIcon size={64} className={`text-${steps[step].color}`} />
          </div>
          <h2 className={`text-4xl font-black mb-4 tracking-tight neon-text-${steps[step].color.split('-')[1]}`}>
            {steps[step].title}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">{steps[step].desc}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col gap-8">
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-neon-blue' : 'w-2 bg-white/20'}`} />
          ))}
        </div>
        <NeonButton onClick={next} variant={step === 2 ? 'blue' : 'purple'} fullWidth>
          {step === 2 ? "Get Started" : "Next"}
        </NeonButton>
      </div>
    </div>
  );
};

const MapScreen = ({ onVenueSelect, onShowNotifications }: { onVenueSelect: (v: Venue) => void, onShowNotifications: () => void }) => {
  const getCrowdColor = (level: CrowdLevel) => {
    switch (level) {
      case 'poppin': return 'neon-pink';
      case 'busy': return 'orange-500';
      case 'chill': return 'yellow-500';
      default: return 'gray-500';
    }
  };

  const getCrowdRGB = (level: CrowdLevel) => {
    switch (level) {
      case 'poppin': return '255, 0, 255';
      case 'busy': return '249, 115, 22';
      case 'chill': return '234, 179, 8';
      default: return '107, 114, 128';
    }
  };

  return (
    <div className="h-screen w-full bg-dark-bg relative">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[#1a1a24] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Map Pins */}
        {VENUES.map((venue) => {
          const color = getCrowdColor(venue.crowdLevel);
          const rgb = getCrowdRGB(venue.crowdLevel);

          return (
            <motion.button
              key={venue.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                triggerHaptic('medium');
                onVenueSelect(venue);
              }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${venue.coordinates.x}%`, top: `${venue.coordinates.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                {/* Pulsating Background Radial Glow */}
                <motion.div 
                  variants={{
                    hover: { scale: 1.4, opacity: 0.4 },
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className={`absolute w-32 h-32 rounded-full blur-[40px] bg-${color}`} 
                />

                {/* Concentric Pulse Rings (Radar/Signal Style) */}
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ 
                      scale: [0.5, 2.8], 
                      opacity: [0.8, 0] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: i * 0.7,
                      ease: "linear"
                    }}
                    className={`absolute rounded-full border-[2px] border-${color}`}
                    style={{ 
                      width: '30px', 
                      height: '30px',
                      boxShadow: `0 0 15px rgba(${rgb}, 0.8)`
                    }}
                  />
                ))}

                {/* Static Glowing Rings (Neon Sign Look) */}
                <div className="absolute flex items-center justify-center">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      variants={{
                        hover: { scale: 1.1, opacity: (1 - (i * 0.25)) * 1.5 }
                      }}
                      className={`absolute rounded-full border-[2px] border-${color}/50`}
                      style={{ 
                        width: `${25 + i * 20}px`, 
                        height: `${25 + i * 20}px`,
                        opacity: 1 - (i * 0.25),
                        boxShadow: `0 0 15px rgba(${rgb}, 0.5), inset 0 0 5px rgba(${rgb}, 0.3)`
                      }}
                    />
                  ))}
                </div>

                {/* Map Surface Reflection Glow */}
                <motion.div 
                  variants={{
                    hover: { scale: 1.3, opacity: 0.2 }
                  }}
                  className={`absolute w-40 h-40 rounded-full blur-[50px] opacity-10 -z-10 bg-${color}`} 
                />

                {/* Main Pin Icon (Neon Tube Style) */}
                <motion.div 
                  variants={{
                    hover: { scale: 1.15 }
                  }}
                  animate={{ 
                    opacity: [1, 0.9, 1, 0.95, 1],
                    filter: [
                      `brightness(1) contrast(1) drop-shadow(0 0 10px rgba(${rgb}, 0.2))`,
                      `brightness(1.2) contrast(1.1) drop-shadow(0 0 15px rgba(${rgb}, 0.4))`,
                      `brightness(1) contrast(1) drop-shadow(0 0 10px rgba(${rgb}, 0.2))`,
                      `brightness(1.1) contrast(1.05) drop-shadow(0 0 12px rgba(${rgb}, 0.3))`,
                      `brightness(1) contrast(1) drop-shadow(0 0 10px rgba(${rgb}, 0.2))`
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 4, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 1], ease: "easeInOut" },
                    filter: { duration: 4, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 1], ease: "easeInOut" },
                    scale: { duration: 0.2 }
                  }}
                  className={`relative p-3 rounded-full glass border-2 z-10 border-${color}`}
                  style={{
                    boxShadow: `0 0 30px rgba(${rgb}, 0.9), inset 0 0 15px rgba(${rgb}, 0.5)`
                  }}
                >
                  <MapPin size={24} className={`text-${color}`} style={{ filter: `drop-shadow(0 0 10px rgba(${rgb}, 1))` }} />
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 safe-top z-20">
        <div className="flex items-center gap-4">
          <div className="flex-1 glass rounded-2xl px-4 py-3 flex items-center gap-3">
            <Search size={20} className="text-white/40" />
            <input type="text" placeholder="Search venues, events..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <button 
            onClick={() => {
              triggerHaptic('light');
              onShowNotifications();
            }} 
            className="glass p-3 rounded-2xl relative"
          >
            <Bell size={24} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-neon-pink rounded-full" />
          </button>
        </div>
      </div>

      {/* Safety Status Widget (Inspired by Reference Image) */}
      <div className="absolute bottom-32 left-4 right-4 z-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-4 pointer-events-auto max-w-[280px]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Trusted Crew Active</span>
            </div>
            <Info size={14} className="text-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 border border-white/10" />
                <span className="text-xs font-bold">Legend @sath_sa_porer</span>
              </div>
              <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 border border-white/10" />
                <span className="text-xs font-bold">Scene Scout @nite_so_nat</span>
              </div>
              <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-neon-blue/20 text-neon-blue">
                <Navigation size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase">Home Safe</p>
                <p className="text-xs font-black">ETA: 11m 5s</p>
              </div>
            </div>
            <button className="bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-colors">
              <PlusCircle size={16} className="text-white/40" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TrendingScreen = ({ onVenueSelect }: { onVenueSelect: (v: Venue) => void }) => {
  return (
    <div className="h-screen w-full bg-dark-bg overflow-y-auto no-scrollbar pb-32 pt-16 px-6">
      <h1 className="text-3xl font-black mb-8 tracking-tight">TRENDING <span className="text-neon-pink">NOW</span></h1>
      
      <div className="flex flex-col gap-6">
        {CHECK_INS.map((checkin) => {
          const venue = VENUES.find(v => v.id === checkin.venueId)!;
          return (
            <motion.div 
              key={checkin.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl overflow-hidden"
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={checkin.userImage} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                  <div>
                    <p className="font-bold text-sm">{checkin.userName}</p>
                    <p className="text-white/40 text-[10px]">at <span className="text-neon-blue font-bold">{checkin.venueName}</span> • {checkin.timestamp}</p>
                  </div>
                </div>
                <CrowdIndicator level={venue.crowdLevel} size="sm" />
              </div>
              
              {checkin.media && (
                <div className="px-4 pb-4">
                  <img src={checkin.media} className="w-full aspect-video rounded-2xl object-cover" />
                </div>
              )}
              
              <div className="px-4 pb-4">
                <p className="text-sm text-white/80">{checkin.content}</p>
                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Heart size={16} /> 124
                  </button>
                  <button className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Share2 size={16} /> Share
                  </button>
                  <button 
                    onClick={() => onVenueSelect(venue)}
                    className="ml-auto text-neon-blue text-xs font-bold flex items-center gap-1"
                  >
                    Go to Venue <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const CheckInScreen = ({ onComplete, onSuccess }: { onComplete: () => void, onSuccess: (msg: string) => void }) => {
  const [step, setStep] = useState(1);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const handlePost = () => {
    onSuccess('Check-in successful!');
    onComplete();
  };

  return (
    <div className="h-screen w-full bg-dark-bg p-6 safe-top flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => {
            triggerHaptic('light');
            onComplete();
          }} 
          className="text-white/40"
        >
          <X size={24} />
        </button>
        <h2 className="font-black text-xl">CHECK-IN</h2>
        <div className="w-6" />
      </div>

      {step === 1 ? (
        <div className="flex-1 flex flex-col">
          <p className="text-white/60 mb-6">Confirm your location:</p>
          <div className="flex flex-col gap-4">
            {VENUES.map((venue) => (
              <button
                key={venue.id}
                onClick={() => { 
                  triggerHaptic('medium');
                  setSelectedVenue(venue); 
                  setStep(2); 
                }}
                className={`glass p-4 rounded-2xl flex items-center gap-4 text-left transition-all ${selectedVenue?.id === venue.id ? 'border-neon-blue' : ''}`}
              >
                <img src={venue.image} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold">{venue.name}</h3>
                  <p className="text-xs text-white/40">{venue.distance} away</p>
                </div>
                <CrowdIndicator level={venue.crowdLevel} size="sm" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-3 glass p-3 rounded-2xl">
            <CheckCircle2 className="text-neon-blue" />
            <p className="text-sm font-bold">Checked in at {selectedVenue?.name}</p>
          </div>

          <div className="flex-1 glass rounded-3xl p-6 flex flex-col items-center justify-center border-dashed border-white/20">
            <Camera size={48} className="text-white/20 mb-4" />
            <p className="text-white/40 font-bold">Add Photo or Video</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">How's the vibe?</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {['Electric', 'Chill', 'Wild', 'Classy', 'Crowded'].map(vibe => (
                <button key={vibe} className="glass px-4 py-2 rounded-xl text-sm whitespace-nowrap hover:border-neon-pink">
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          <textarea 
            placeholder="What's poppin' here?" 
            className="glass w-full rounded-2xl p-4 text-sm min-h-[100px] outline-none border-none"
          />

          <NeonButton onClick={handlePost} variant="pink" fullWidth className="mt-auto mb-8">
            POST CHECK-IN
          </NeonButton>
        </div>
      )}
    </div>
  );
};

const EventsScreen = ({ onEventSelect, remindedEvents }: { onEventSelect: (e: Event) => void, remindedEvents: string[] }) => {
  return (
    <div className="h-screen w-full bg-dark-bg overflow-y-auto no-scrollbar pb-32 pt-16 px-6">
      <h1 className="text-3xl font-black mb-8 tracking-tight">UPCOMING <span className="text-neon-purple">EVENTS</span></h1>
      
      <div className="flex flex-col gap-6">
        {EVENTS.map((event) => {
          const hasReminder = remindedEvents.includes(event.id);
          return (
            <motion.button 
              key={event.id}
              onClick={() => {
                triggerHaptic('medium');
                onEventSelect(event);
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl overflow-hidden text-left relative"
            >
              {hasReminder && (
                <div className="absolute top-4 right-4 z-20 bg-neon-blue p-1.5 rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                  <Bell size={12} className="text-dark-bg" fill="currentColor" />
                </div>
              )}
              <div className="relative h-48">
                <img src={event.image} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-dark-bg/80 backdrop-blur-md px-3 py-1 rounded-lg">
                  <p className="text-neon-blue font-black text-xs">{event.date.toUpperCase()}</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass px-3 py-1 rounded-full inline-block mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest">{event.category}</p>
                  </div>
                  <h3 className="text-xl font-black text-white drop-shadow-lg">{event.title}</h3>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-bold flex items-center gap-1">
                    <MapPin size={12} /> {event.venueName}
                  </p>
                  <p className="text-white/40 text-[10px] mt-1 flex items-center gap-1">
                    <Clock size={12} /> {event.time}
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border border-dark-bg bg-gray-700" />
                  ))}
                  <div className="w-6 h-6 rounded-full border border-dark-bg bg-neon-purple flex items-center justify-center text-[8px] font-bold">
                    +42
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

const ProfileScreen = ({ user, onUpdate }: { user: { name: string, avatar: string }, onUpdate: (data: Partial<{ name: string, avatar: string }>) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ avatar: reader.result as string });
        triggerHaptic('medium');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempName.trim()) {
      onUpdate({ name: tempName });
      setIsEditing(false);
      triggerHaptic('heavy');
    }
  };

  return (
    <div className="h-screen w-full bg-dark-bg overflow-y-auto no-scrollbar pb-32 pt-16 px-6">
      <div className="flex flex-col items-center mb-12">
        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
          <img 
            src={user.avatar} 
            className="w-24 h-24 rounded-full object-cover border-4 border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-transform group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={24} className="text-white" />
          </div>
          <button className="absolute bottom-0 right-0 bg-neon-pink p-2 rounded-full border-2 border-dark-bg">
            <Camera size={16} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>

        {isEditing ? (
          <div className="mt-4 flex flex-col items-center gap-3 w-full max-w-[240px]">
            <input 
              type="text" 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center font-black text-xl w-full focus:outline-none focus:border-neon-blue text-white"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <div className="flex gap-2 w-full">
              <button 
                onClick={handleSave}
                className="flex-1 bg-neon-blue text-dark-bg font-black py-2 rounded-xl text-[10px] uppercase tracking-widest"
              >
                Save
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setTempName(user.name);
                }}
                className="flex-1 glass font-black py-2 rounded-xl text-[10px] uppercase tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mt-4">
              <h2 className="text-2xl font-black">{user.name}</h2>
              <button 
                onClick={() => {
                  triggerHaptic('light');
                  setIsEditing(true);
                }}
                className="text-white/40 hover:text-neon-blue transition-colors"
              >
                <Edit2 size={18} />
              </button>
            </div>
            <p className="text-white/40 text-sm font-bold tracking-widest">LEVEL 12 PARTY ANIMAL</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="glass p-4 rounded-2xl text-center">
          <p className="text-xl font-black text-neon-blue">24</p>
          <p className="text-[10px] text-white/40 font-bold uppercase">Check-ins</p>
        </div>
        <div className="glass p-4 rounded-2xl text-center">
          <p className="text-xl font-black text-neon-pink">12</p>
          <p className="text-[10px] text-white/40 font-bold uppercase">Saved</p>
        </div>
        <div className="glass p-4 rounded-2xl text-center">
          <p className="text-xl font-black text-neon-purple">1.2k</p>
          <p className="text-[10px] text-white/40 font-bold uppercase">Points</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-12">
        <h3 className="font-black text-sm uppercase tracking-widest text-white/40">Badges</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 1, name: 'Early Bird', icon: Clock, color: 'text-neon-blue', bg: 'bg-neon-blue/10', desc: 'Pre-party pro', progress: 100 },
            { id: 2, name: 'Night Owl', icon: Star, color: 'text-neon-purple', bg: 'bg-neon-purple/10', desc: 'Last one standing', progress: 75 },
            { id: 3, name: 'Vibe Master', icon: TrendingUp, color: 'text-neon-pink', bg: 'bg-neon-pink/10', desc: '10+ check-ins', progress: 40 },
            { id: 4, name: 'Trendsetter', icon: PlusCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', desc: 'First to the spot', progress: 90 },
          ].map((badge) => (
            <div key={badge.id} className="glass p-4 rounded-2xl flex flex-col items-center text-center gap-2 relative overflow-hidden">
              <div className={`w-12 h-12 rounded-full ${badge.bg} flex items-center justify-center ${badge.color}`}>
                <badge.icon size={24} />
              </div>
              <div className="mb-1">
                <p className="text-xs font-black uppercase tracking-tight">{badge.name}</p>
                <p className="text-[10px] text-white/40 font-bold">{badge.desc}</p>
              </div>
              
              {badge.progress < 100 ? (
                <div className="w-full mt-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[8px] font-bold text-white/40 uppercase">Progress</p>
                    <p className="text-[8px] font-bold text-white/60">{badge.progress}%</p>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${badge.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${badge.color.replace('text-', 'bg-')}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-black text-sm uppercase tracking-widest text-white/40">Recent Activity</h3>
        {CHECK_INS.slice(0, 2).map(checkin => (
          <div key={checkin.id} className="glass p-4 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center text-neon-blue">
              <MapPin size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Checked in at {checkin.venueName}</p>
              <p className="text-[10px] text-white/40">{checkin.timestamp}</p>
            </div>
            <ChevronRight size={20} className="text-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};

const VenueDetailScreen = ({ venue, onBack }: { venue: Venue, onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-dark-bg z-[60] overflow-y-auto no-scrollbar pb-12"
    >
      <div className="relative h-[40vh]">
        <img src={venue.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 p-6 safe-top flex justify-between">
          <button 
            onClick={() => {
              triggerHaptic('light');
              onBack();
            }} 
            className="glass p-3 rounded-2xl"
          >
            <ChevronLeft />
          </button>
          <div className="flex gap-3">
            <button 
              onClick={() => triggerHaptic('light')}
              className="glass p-3 rounded-2xl"
            >
              <Heart />
            </button>
            <button 
              onClick={() => triggerHaptic('light')}
              className="glass p-3 rounded-2xl"
            >
              <Share2 />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight">{venue.name}</h1>
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs mt-1">{venue.type} • {venue.distance}</p>
          </div>
          <CrowdIndicator level={venue.crowdLevel} size="lg" />
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-sm">{venue.rating}</span>
          </div>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
            <Clock size={16} className="text-neon-blue" />
            <span className="font-bold text-sm">Open until 4AM</span>
          </div>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
            <Navigation size={16} className="text-neon-pink" />
            <span className="font-bold text-sm">Directions</span>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">Tonight's Specials</h3>
          <div className="flex flex-col gap-3">
            {venue.specials.map((special, i) => (
              <div key={i} className="glass p-4 rounded-2xl border-l-4 border-neon-blue">
                <p className="font-bold text-sm">{special}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-sm uppercase tracking-widest text-white/40">Recent Check-ins</h3>
            <button className="text-neon-blue text-xs font-bold">View Gallery</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {CHECK_INS.map((c, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden aspect-square relative">
                <img src={c.media || c.userImage} className="w-full h-full object-cover opacity-60" />
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <img src={c.userImage} className="w-6 h-6 rounded-full border border-white/20" />
                  <span className="text-[10px] font-bold">{c.userName.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <NeonButton variant="blue" fullWidth className="mb-8">
          CHECK IN HERE
        </NeonButton>
      </div>
    </motion.div>
  );
};

const EventDetailScreen = ({ event, onBack, isReminded, onToggleReminder }: { event: Event, onBack: () => void, isReminded: boolean, onToggleReminder: () => void }) => {
  const [isAttending, setIsAttending] = useState(false);
  const [showReminderMenu, setShowReminderMenu] = useState(false);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-dark-bg z-[65] overflow-y-auto no-scrollbar pb-12"
    >
      <div className="relative h-[40vh]">
        <img src={event.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 p-6 safe-top flex justify-between">
          <button 
            onClick={() => {
              triggerHaptic('light');
              onBack();
            }} 
            className="glass p-3 rounded-2xl"
          >
            <ChevronLeft />
          </button>
          <div className="flex gap-3">
            <div className="relative">
              <button 
                onClick={() => {
                  triggerHaptic('light');
                  setShowReminderMenu(!showReminderMenu);
                }}
                className={`glass p-3 rounded-2xl transition-colors ${isReminded ? 'text-neon-blue border-neon-blue' : ''}`}
              >
                <Bell fill={isReminded ? "currentColor" : "none"} />
              </button>
              
              <AnimatePresence>
                {showReminderMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 glass rounded-2xl p-2 z-50 border border-white/10 shadow-2xl"
                  >
                    <div className="p-2 border-b border-white/5 mb-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Remind Me</p>
                    </div>
                    {[
                      { label: '15m before', id: '15m' },
                      { label: '1h before', id: '1h' },
                      { label: '1 day before', id: '1d' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          triggerHaptic('medium');
                          onToggleReminder();
                          setShowReminderMenu(false);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-sm font-bold flex justify-between items-center"
                      >
                        {opt.label}
                        {isReminded && <CheckCircle2 size={14} className="text-neon-blue" />}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        triggerHaptic('light');
                        if (isReminded) onToggleReminder();
                        setShowReminderMenu(false);
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-sm font-bold text-neon-pink mt-1"
                    >
                      {isReminded ? 'Remove Reminder' : 'Cancel'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={() => triggerHaptic('light')}
              className="glass p-3 rounded-2xl"
            >
              <Share2 />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="glass px-3 py-1 rounded-full inline-block mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neon-purple">{event.category}</p>
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-2">{event.title}</h1>
        
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-3 text-white/60">
            <Calendar size={18} className="text-neon-purple" />
            <span className="font-bold text-sm">{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <MapPin size={18} className="text-neon-blue" />
            <span className="font-bold text-sm">{event.venueName}</span>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">About the Event</h3>
          <p className="text-white/70 leading-relaxed">
            {event.description}
          </p>
        </section>

        <section className="mb-12">
          <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">Who's Going</h3>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-dark-bg bg-gray-700 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-white/40">+128 others attending</p>
          </div>
        </section>

        <NeonButton 
          variant={isAttending ? 'ghost' : 'purple'} 
          fullWidth 
          onClick={() => {
            triggerHaptic('heavy');
            setIsAttending(!isAttending);
          }}
          className="mb-8"
        >
          {isAttending ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 size={20} /> ATTENDING
            </div>
          ) : 'RSVP NOW'}
        </NeonButton>
      </div>
    </motion.div>
  );
};

const NotificationsScreen = ({ onBack, onVenueSelect }: { onBack: () => void, onVenueSelect: (v: Venue) => void }) => {
  const notifications = [
    { id: 1, title: '🔥 Neon Dreams is POPPIN!', desc: 'Crowd levels just hit peak. Get there now!', venueId: '1', time: '2m ago' },
    { id: 2, title: 'Sarah Chen checked in', desc: 'at The Velvet Lounge: "Perfect spot for a chill Saturday."', venueId: '2', time: '1h ago' },
    { id: 3, title: 'New Event: Jazz & Gin', desc: 'Starts tomorrow at 8:00 PM at The Velvet Lounge.', venueId: '2', time: '3h ago' },
  ];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-dark-bg z-[70] p-6 safe-top"
    >
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => {
            triggerHaptic('light');
            onBack();
          }} 
          className="glass p-3 rounded-2xl"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-2xl font-black">NOTIFICATIONS</h2>
      </div>

      <div className="flex flex-col gap-4">
        {notifications.map((n) => (
          <button 
            key={n.id} 
            onClick={() => {
              triggerHaptic('medium');
              const v = VENUES.find(v => v.id === n.venueId);
              if (v) onVenueSelect(v);
              onBack();
            }}
            className="glass p-4 rounded-2xl text-left border-l-4 border-neon-blue"
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-sm">{n.title}</h3>
              <span className="text-[10px] text-white/40">{n.time}</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{n.desc}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [remindedEvents, setRemindedEvents] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState({
    name: 'MARCUS VIBE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  });

  const toggleReminder = (eventId: string) => {
    setRemindedEvents(prev => {
      const isReminded = prev.includes(eventId);
      if (isReminded) {
        setToast('Reminder removed');
        return prev.filter(id => id !== eventId);
      } else {
        setToast('Reminder set!');
        return [...prev, eventId];
      }
    });
  };

  if (!onboarded) return <Onboarding onComplete={() => setOnboarded(true)} />;

  return (
    <div className="h-screen w-full bg-dark-bg relative overflow-hidden">
      <AnimatePresence mode="wait">
        {activeTab === 'map' && (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <MapScreen 
              onVenueSelect={setSelectedVenue} 
              onShowNotifications={() => setShowNotifications(true)}
            />
          </motion.div>
        )}
        {activeTab === 'trending' && (
          <motion.div key="trending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <TrendingScreen onVenueSelect={setSelectedVenue} />
          </motion.div>
        )}
        {activeTab === 'checkin' && (
          <motion.div key="checkin" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="h-full z-50 fixed inset-0">
            <CheckInScreen 
              onComplete={() => setActiveTab('map')} 
              onSuccess={(msg) => setToast(msg)}
            />
          </motion.div>
        )}
        {activeTab === 'events' && (
          <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <EventsScreen 
              onEventSelect={(e) => {
                setSelectedEvent(e);
              }} 
              remindedEvents={remindedEvents}
            />
          </motion.div>
        )}
        {activeTab === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <ProfileScreen 
              user={userProfile} 
              onUpdate={(data) => setUserProfile(prev => ({ ...prev, ...data }))} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        hasEventReminders={remindedEvents.length > 0}
      />

      <AnimatePresence>
        {selectedVenue && (
          <VenueDetailScreen 
            venue={selectedVenue} 
            onBack={() => {
              setSelectedVenue(null);
            }} 
          />
        )}
        {selectedEvent && (
          <EventDetailScreen 
            event={selectedEvent} 
            isReminded={remindedEvents.includes(selectedEvent.id)}
            onToggleReminder={() => toggleReminder(selectedEvent.id)}
            onBack={() => {
              setSelectedEvent(null);
            }} 
          />
        )}
        {showNotifications && (
          <NotificationsScreen 
            onBack={() => setShowNotifications(false)} 
            onVenueSelect={setSelectedVenue}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <Toast message={toast} onHide={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
