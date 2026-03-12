import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, TrendingUp, PlusCircle, Calendar, User as UserIcon, 
  Bell, Search, Map as MapIcon, Camera, Star, 
  Clock, Navigation, ChevronLeft, X, Heart, 
  Share2, Flame, Info, CheckCircle2, ChevronRight,
  Edit2, Dog, Baby, ShieldCheck, Bike, Car, Music,
  Users, Shield, Zap, QrCode, Layout, Smartphone
} from 'lucide-react';
import { Venue, Event, CheckIn, CrowdLevel, User } from './types';
import { VENUES, EVENTS, CHECK_INS, BARTENDERS } from './constants';

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

const AmenityIcon = ({ type, size = 16 }: { type: string, size?: number }) => {
  const config: Record<string, { icon: any, color: string, label: string }> = {
    'dog-friendly': { icon: Dog, color: 'text-orange-400', label: 'Dog Friendly' },
    'kids-friendly': { icon: Baby, color: 'text-blue-400', label: 'Kids Friendly' },
    'veteran-owned': { icon: ShieldCheck, color: 'text-emerald-400', label: 'Veteran Owned' },
    'biker-friendly': { icon: Bike, color: 'text-red-400', label: 'Biker Friendly' },
    'classic-cars': { icon: Car, color: 'text-yellow-400', label: 'Classic Cars' },
    'live-music': { icon: Music, color: 'text-neon-pink', label: 'Live Music' },
    'trivia': { icon: Zap, color: 'text-neon-blue', label: 'Trivia' },
    'classy': { icon: Star, color: 'text-neon-purple', label: 'Classy' },
    'cocktails': { icon: Flame, color: 'text-neon-pink', label: 'Cocktails' },
    'historic': { icon: Clock, color: 'text-white/60', label: 'Historic' },
    'outdoor-patio': { icon: Navigation, color: 'text-emerald-400', label: 'Outdoor Patio' },
  };

  const item = config[type] || { icon: Info, color: 'text-white/40', label: type };
  const { icon: Icon, color, label } = item;
  return (
    <div className="flex items-center gap-1.5" title={label}>
      <Icon size={size} className={color} />
    </div>
  );
};

const LegendBadge = () => (
  <div className="flex items-center gap-1 bg-chaos-green/20 text-chaos-green px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-chaos-green/30 neon-border-green">
    <Star size={8} fill="currentColor" /> LEGEND
  </div>
);

const HeatZones = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Enumclaw Zone */}
      <motion.div 
        initial={{ scale: 1, opacity: 0.3 }}
        className="absolute top-[40%] left-[40%] w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 heat-zone rounded-full"
      />
      {/* Buckley Zone */}
      <motion.div 
        initial={{ scale: 1, opacity: 0.2 }}
        className="absolute top-[65%] left-[25%] w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 heat-zone rounded-full"
      />
      {/* Maple Valley Zone */}
      <motion.div 
        initial={{ scale: 1, opacity: 0.1 }}
        className="absolute top-[25%] left-[75%] w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 heat-zone rounded-full"
      />
    </div>
  );
};

const SquadAlerts = ({ onBack }: { onBack: () => void }) => {
  const alerts = [
    { id: 1, user: 'Alex Rivera', action: 'Check-in', venue: "Lucky's", time: '2m ago', isLegend: true },
    { id: 2, user: 'The Crew', action: 'Signal', venue: 'The Mint', time: '15m ago', isLegend: false },
    { id: 3, user: 'Staff Alert', action: 'Chaos Hour', venue: "Lucky's", time: 'Just Now', isStaff: true },
  ];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-dark-bg z-[80] p-6 safe-top"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="glass p-3 rounded-2xl"><ChevronLeft /></button>
        <h2 className="text-2xl font-black neon-text-blue uppercase tracking-tighter italic">Squad Signal</h2>
      </div>

      <div className="flex flex-col gap-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`glass p-4 rounded-3xl border-l-4 ${alert.isStaff ? 'border-neon-pink' : 'border-neon-blue'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <p className="font-black text-sm uppercase">{alert.user}</p>
                {alert.isLegend && <LegendBadge />}
                {alert.isStaff && <div className="bg-neon-pink text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Staff</div>}
              </div>
              <p className="text-[10px] text-white/40 font-bold">{alert.time}</p>
            </div>
            <p className="text-xs text-white/60">
              <span className="text-neon-blue font-bold">{alert.action}</span> at <span className="text-white font-bold italic">{alert.venue}</span>
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const StaffView = ({ onBack, onTriggerChaos }: { onBack: () => void, onTriggerChaos: () => void }) => {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 bg-dark-bg z-[80] p-6 safe-top overflow-y-auto no-scrollbar"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="glass p-3 rounded-2xl"><ChevronLeft /></button>
          <h2 className="text-2xl font-black neon-text-pink uppercase tracking-tighter italic">Grid Control</h2>
        </div>
        <div className="bg-neon-pink/20 text-neon-pink px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-neon-pink/30">Staff Access</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass p-4 rounded-3xl">
          <p className="text-[10px] font-black text-white/40 uppercase mb-1">Live Traffic</p>
          <p className="text-2xl font-black neon-text-blue">1,243</p>
          <p className="text-[10px] text-emerald-400 font-bold mt-1">↑ 12% vs Last Sat</p>
        </div>
        <div className="glass p-4 rounded-3xl">
          <p className="text-[10px] font-black text-white/40 uppercase mb-1">Active Legends</p>
          <p className="text-2xl font-black neon-text-green">42</p>
          <p className="text-[10px] text-white/40 font-bold mt-1">Plateau Region</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Venue Heatmap</h3>
        {VENUES.map(v => (
          <div key={v.id} className="glass p-4 rounded-3xl flex items-center justify-between">
            <div>
              <p className="font-black text-sm uppercase">{v.name}</p>
              <p className="text-[10px] text-white/40 font-bold uppercase">{v.type}</p>
            </div>
            <div className="text-right">
              <p className={`text-xs font-black uppercase ${v.crowdLevel === 'poppin' ? 'text-neon-pink' : 'text-white/60'}`}>{v.crowdLevel}</p>
              <div className="h-1 w-24 bg-white/5 rounded-full mt-1 overflow-hidden">
                <div className={`h-full ${v.crowdLevel === 'poppin' ? 'bg-neon-pink' : 'bg-neon-blue'}`} style={{ width: v.crowdLevel === 'poppin' ? '90%' : v.crowdLevel === 'busy' ? '60%' : '20%' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <NeonButton variant="pink" fullWidth onClick={() => triggerHaptic('heavy')}>
        Trigger Chaos Hour
      </NeonButton>
    </motion.div>
  );
};

const ChaosHour = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed inset-0 bg-neon-pink/10 backdrop-blur-2xl z-[90] flex items-center justify-center p-6"
    >
      <div className="glass rounded-[40px] p-8 w-full max-w-sm border-2 border-neon-pink neon-border-pink relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-pink opacity-50" />
        <button onClick={onBack} className="absolute top-4 right-4 text-white/40"><X /></button>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-neon-pink/20 flex items-center justify-center mb-6 neon-border-pink">
            <Zap size={40} className="text-neon-pink" />
          </div>
          <h2 className="text-4xl font-black neon-text-pink italic uppercase tracking-tighter mb-2">Chaos Hour</h2>
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8">Flash Specials Active Now</p>
          
          <div className="w-full flex flex-col gap-3 mb-8">
            <div className="glass p-4 rounded-2xl flex justify-between items-center">
              <p className="font-black text-sm uppercase">PBR Tall Boys</p>
              <p className="text-neon-pink font-black">$2.00</p>
            </div>
            <div className="glass p-4 rounded-2xl flex justify-between items-center">
              <p className="font-black text-sm uppercase">Chaos Shots</p>
              <p className="text-neon-pink font-black">$4.00</p>
            </div>
          </div>

          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">Ends in 42:15</p>
          
          <NeonButton variant="pink" fullWidth onClick={onBack}>
            Claim Vibe
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
};

const BrandMockups = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-dark-bg z-[80] p-6 safe-top overflow-y-auto no-scrollbar"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="glass p-3 rounded-2xl"><ChevronLeft /></button>
        <h2 className="text-2xl font-black neon-text-green uppercase tracking-tighter italic">Brand Kit</h2>
      </div>

      <div className="flex flex-col gap-12">
        {/* Merch Mockups */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
            <Zap size={14} className="text-neon-pink" /> Merch Mockups
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-3xl p-4 aspect-square flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border-4 border-neon-blue neon-border-blue flex items-center justify-center mb-2">
                <span className="text-[8px] font-black text-neon-blue uppercase tracking-tighter italic">What's Poppin?</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase">Coaster</p>
            </div>
            <div className="glass rounded-3xl p-4 aspect-square flex flex-col items-center justify-center text-center">
              <div className="w-20 h-10 bg-neon-pink/20 border-2 border-neon-pink neon-border-pink rounded-lg flex items-center justify-center mb-2">
                <span className="text-[8px] font-black text-neon-pink uppercase tracking-tighter italic">VIBE CHECK</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase">Bar Mat</p>
            </div>
            <div className="glass rounded-3xl p-4 aspect-square flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-chaos-green/20 border-2 border-chaos-green neon-border-green rounded-full flex items-center justify-center mb-2">
                <Star size={16} className="text-chaos-green" />
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase">Legend Sticker</p>
            </div>
            <div className="glass rounded-3xl p-4 aspect-square flex flex-col items-center justify-center text-center">
              <div className="w-16 h-20 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center mb-2">
                <QrCode size={24} className="text-neon-blue mb-1" />
                <span className="text-[6px] font-black text-white/40 uppercase">Scan the Vibe</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase">Table Plaque</p>
            </div>
          </div>
        </section>

        {/* Social Media Posts */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
            <Share2 size={14} className="text-neon-blue" /> Social Assets
          </h3>
          <div className="flex flex-col gap-4">
            <div className="glass rounded-3xl overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center p-8 text-center">
                <h4 className="text-2xl font-black italic uppercase tracking-tighter neon-text-pink">Tonight at Lucky's: Chaos Hour 10PM</h4>
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-[10px] font-bold text-white/40 uppercase">Instagram Story Template</p>
                <button className="text-neon-blue"><Smartphone size={16} /></button>
              </div>
            </div>
            <div className="glass rounded-3xl overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-dark-bg to-neon-blue/20 flex flex-col items-center justify-center p-8 text-center border-b border-white/5">
                <Star size={32} className="text-chaos-green mb-2 neon-text-green" />
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white">New Legend Spotted in Buckley</h4>
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-[10px] font-bold text-white/40 uppercase">Facebook Post Asset</p>
                <button className="text-neon-blue"><Smartphone size={16} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* QR Placement */}
        <section className="mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
            <QrCode size={14} className="text-chaos-green" /> QR Placement
          </h3>
          <div className="glass rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="relative w-full h-48 bg-white/5 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="relative z-10 glass p-4 rounded-xl border-2 border-neon-blue neon-border-blue">
                <QrCode size={48} className="text-neon-blue" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-[8px] font-black text-white/60 uppercase tracking-widest">Mockup: Bar Counter Placement</div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">Place QR codes on coasters and bar mats to trigger the <span className="text-neon-pink font-bold italic">Vibe Check</span> instantly.</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

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
    { id: 'profile', icon: UserIcon, label: 'Profile' },
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
      <div className="w-2 h-2 bg-neon-blue rounded-full opacity-80" />
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

const MapScreen = ({ 
  onVenueSelect, 
  onShowNotifications, 
  onShowSquad, 
  onShowStaff,
  weather,
  setWeather,
  isSoberCaptain,
  setIsSoberCaptain
}: { 
  onVenueSelect: (v: Venue) => void, 
  onShowNotifications: () => void,
  onShowSquad: () => void,
  onShowStaff: () => void,
  weather: 'sunny' | 'rain',
  setWeather: (w: 'sunny' | 'rain') => void,
  isSoberCaptain: boolean,
  setIsSoberCaptain: (s: boolean) => void
}) => {
  const [showMystery, setShowMystery] = useState(false);
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
      case 'poppin': return '255, 105, 180';
      case 'busy': return '249, 115, 22';
      case 'chill': return '234, 179, 8';
      default: return '107, 114, 128';
    }
  };

  return (
    <div className="h-screen w-full bg-dark-bg relative">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[#000000] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {weather === 'rain' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 1, opacity: 0.1 }}
                className="absolute w-8 h-4 border border-white/10 rounded-[50%]"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        )}

        <HeatZones />
        
        {/* Mystery Pin */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => {
            triggerHaptic('heavy');
            setShowMystery(true);
          }}
          className="absolute z-20 left-[20%] top-[30%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-neon-pink blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative glass p-3 rounded-full border-2 border-neon-pink neon-border-pink">
              <QrCode size={24} className="text-neon-pink blur-[2px] group-hover:blur-0 transition-all" />
            </div>
          </div>
        </motion.button>

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
                {/* Static Background Radial Glow */}
                <motion.div 
                  variants={{
                    hover: { scale: 1.4, opacity: 0.4 },
                  }}
                  className={`absolute w-32 h-32 rounded-full blur-[40px] bg-${color} opacity-20`} 
                />

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
                  className={`relative p-3 rounded-full glass border-2 z-10 border-${color} opacity-90`}
                  style={{
                    boxShadow: `0 0 30px rgba(${rgb}, 0.9), inset 0 0 15px rgba(${rgb}, 0.5)`
                  }}
                >
                  <MapPin size={24} className={`text-${color}`} style={{ filter: `drop-shadow(0 0 10px rgba(${rgb}, 1))` }} />
                </motion.div>
                
                {/* Town Takeover Crown */}
                {venue.id === '1' && (
                  <motion.div
                    className="absolute -top-12 z-20"
                  >
                    <div className="bg-yellow-500 p-1.5 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.6)] border border-yellow-400">
                      <Star size={16} className="text-dark-bg fill-dark-bg" />
                    </div>
                  </motion.div>
                )}
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
            <input type="text" placeholder="Scan the Frequency..." className="bg-transparent border-none outline-none text-sm w-full" />
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

      {/* Quick Actions */}
      <div className="absolute top-24 right-6 z-20 flex flex-col gap-3">
        <button 
          onClick={() => {
            triggerHaptic('medium');
            setWeather(weather === 'sunny' ? 'rain' : 'sunny');
          }} 
          className="glass p-3 rounded-2xl text-white/60"
        >
          {weather === 'sunny' ? <Zap size={20} className="text-yellow-400" /> : <Flame size={20} className="text-neon-blue" />}
        </button>
        <button 
          onClick={() => {
            triggerHaptic('heavy');
            setIsSoberCaptain(!isSoberCaptain);
          }} 
          className={`glass p-3 rounded-2xl transition-all ${isSoberCaptain ? 'text-chaos-green neon-border-green border-chaos-green' : 'text-white/40'}`}
        >
          <ShieldCheck size={20} />
        </button>
        <button onClick={onShowSquad} className="glass p-3 rounded-2xl text-neon-blue neon-border-blue"><Users size={20} /></button>
        <button onClick={onShowStaff} className="glass p-3 rounded-2xl text-neon-pink neon-border-pink"><Shield size={20} /></button>
      </div>

      <AnimatePresence>
        {showMystery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          >
            <div className="glass p-8 rounded-[40px] border-2 border-neon-pink neon-border-pink text-center max-w-xs">
              <div className="w-20 h-20 rounded-full bg-neon-pink/20 flex items-center justify-center mx-auto mb-6">
                <QrCode size={40} className="text-neon-pink" />
              </div>
              <h2 className="text-2xl font-black neon-text-pink uppercase italic mb-2">Mystery Reward</h2>
              <p className="text-white/60 text-sm mb-8">You found a hidden vibe! Scan at the bar to reveal your LEGEND reward.</p>
              <NeonButton variant="pink" fullWidth onClick={() => setShowMystery(false)}>
                COLLECT XP
              </NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trending Spots Section */}
      <div className="absolute bottom-32 left-0 right-0 z-20 pointer-events-none">
        {/* Vibe Ticker */}
        <div className="bg-black/60 backdrop-blur-md border-y border-white/5 py-2 mb-4 overflow-hidden pointer-events-auto">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap px-6"
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-8">
                <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="text-neon-blue">SIGNAL:</span> Alex Rivera checked in at Lucky's <span className="text-white/20">•</span>
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="text-neon-pink">CHAOS:</span> Flash Specials active at The Mint <span className="text-white/20">•</span>
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="text-chaos-green">VIBE:</span> The Velvet Lounge is hitting a 9/10 frequency <span className="text-white/20">•</span>
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="px-6 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-neon-pink" />
              <h3 className="text-xs font-black uppercase tracking-widest italic neon-text-pink">Vibe Check</h3>
            </div>
            <button className="text-[10px] font-bold text-white/40 uppercase tracking-widest">See All</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pointer-events-auto pb-4">
            {VENUES.filter(v => v.crowdLevel === 'poppin' || v.crowdLevel === 'busy').map((venue) => (
              <motion.div
                key={venue.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  triggerHaptic('light');
                  onVenueSelect(venue);
                }}
                className="glass min-w-[200px] rounded-2xl overflow-hidden flex-shrink-0 border-neon-blue/20"
              >
                <div className="h-24 relative">
                  <img src={venue.image} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <CrowdIndicator level={venue.crowdLevel} size="sm" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-black truncate uppercase tracking-tighter italic">{venue.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={10} className="text-neon-blue" />
                    <p className="text-[10px] text-white/40 font-bold uppercase">{venue.type} • {venue.distance}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Safety Status Widget (Inspired by Reference Image) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-4 pointer-events-auto max-w-[280px] mx-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chaos-green rounded-full opacity-80" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Trusted Crew Active</span>
            </div>
            <Info size={14} className="text-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 border border-white/10 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="text-xs font-bold">Legend @alex_vibe</span>
              </div>
              <CheckCircle2 size={14} className="text-chaos-green" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-neon-blue/20 text-neon-blue">
                <Navigation size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase">Home Safe</p>
                <p className="text-xs font-black italic">ETA: 11m 5s</p>
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
                    <p className="text-white/40 text-[10px]">at <span className="text-neon-blue font-bold">{checkin.venueName}</span> • {checkin.time}</p>
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

const ProfileScreen = ({ user, onUpdate, onShowMockups }: { 
  user: User, 
  onUpdate: (data: Partial<User>) => void,
  onShowMockups: () => void
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [activeProfileTab, setActiveProfileTab] = useState<'favorites' | 'history' | 'settings'>('favorites');
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

  const xpPercentage = (user.xp / user.nextRankXp) * 100;

  const favoriteVenues = VENUES.filter(v => user.favorites.venues.includes(v.id));
  const favoriteBartenders = BARTENDERS.filter(b => user.favorites.bartenders.includes(b.id));

  return (
    <div className="h-screen w-full bg-dark-bg overflow-y-auto no-scrollbar pb-32 pt-16 px-6">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
          <img 
            src={user.avatar} 
            className="w-24 h-24 rounded-full object-cover border-4 border-chaos-green shadow-[0_0_20px_rgba(173,255,47,0.3)] transition-transform group-hover:scale-105" 
          />
          <div className="absolute -top-2 -right-2">
            <LegendBadge />
          </div>
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
            <p className="text-chaos-green text-sm font-black tracking-widest uppercase italic">{user.rank}</p>
          </div>
        )}
      </div>

      {/* XP Progress Bar */}
      <div className="glass p-6 rounded-3xl mb-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Experience Points</p>
            <p className="text-2xl font-black neon-text-blue">{user.xp.toLocaleString()} <span className="text-xs text-white/40">XP</span></p>
          </div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Next Rank: {user.nextRankXp.toLocaleString()}</p>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(0,206,209,0.5)]"
          />
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex gap-2 mb-8 glass p-1 rounded-2xl">
        {(['favorites', 'history', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              triggerHaptic('light');
              setActiveProfileTab(tab);
            }}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeProfileTab === tab ? 'bg-neon-blue text-dark-bg' : 'text-white/40 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeProfileTab === 'favorites' && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-8"
          >
            {/* Favorite Spots */}
            <section>
              <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">Favorite Spots</h3>
              <div className="flex flex-col gap-3">
                {favoriteVenues.length > 0 ? favoriteVenues.map(v => (
                  <div key={v.id} className="glass p-4 rounded-2xl flex items-center gap-4">
                    <img src={v.image} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-black italic uppercase tracking-tighter">{v.name}</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase">{v.type}</p>
                    </div>
                    <Heart size={18} className="text-neon-pink fill-neon-pink" />
                  </div>
                )) : (
                  <p className="text-xs text-white/20 italic text-center py-4">No favorite spots yet.</p>
                )}
              </div>
            </section>

            {/* Favorite Bartenders */}
            <section>
              <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">Favorite Bartenders</h3>
              <div className="flex flex-col gap-3">
                {favoriteBartenders.length > 0 ? favoriteBartenders.map(b => (
                  <div key={b.id} className="glass p-4 rounded-2xl flex items-center gap-4">
                    <img src={b.image} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                    <div className="flex-1">
                      <p className="font-black italic uppercase tracking-tighter">{b.name}</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase">at {b.venueName}</p>
                    </div>
                    <div className="bg-neon-purple/20 text-neon-purple px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                      {b.specialty}
                    </div>
                  </div>
                )) : (
                  <p className="text-xs text-white/20 italic text-center py-4">No favorite bartenders yet.</p>
                )}
              </div>
            </section>

            {/* Saved Specials */}
            <section>
              <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">Saved Specials</h3>
              <div className="flex flex-col gap-3">
                {user.favorites.specials.length > 0 ? user.favorites.specials.map((s, i) => (
                  <div key={i} className="glass p-4 rounded-2xl border-l-4 border-neon-blue">
                    <p className="font-bold text-sm">{s}</p>
                  </div>
                )) : (
                  <p className="text-xs text-white/20 italic text-center py-4">No saved specials yet.</p>
                )}
              </div>
            </section>
          </motion.div>
        )}

        {activeProfileTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-black text-sm uppercase tracking-widest text-white/40">Check-in History</h3>
            <div className="flex flex-col gap-3">
              {CHECK_INS.filter(c => user.checkInHistory.includes(c.id)).map(checkin => (
                <div key={checkin.id} className="glass p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                    <img src={VENUES.find(v => v.id === checkin.venueId)?.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black uppercase italic tracking-tighter">{checkin.venueName}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-white/40 font-bold uppercase">{checkin.time}</p>
                      <span className="text-white/20">•</span>
                      <p className="text-[10px] text-neon-pink font-black uppercase italic">{checkin.vibe}</p>
                    </div>
                  </div>
                  <div className="bg-neon-blue/20 text-neon-blue px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                    +50 XP
                  </div>
                </div>
              ))}
            </div>
            <button className="glass p-4 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
              View Full History
            </button>
          </motion.div>
        )}

        {activeProfileTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            <section>
              <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">Preferences</h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'notifications', label: 'Push Notifications', icon: Bell },
                  { id: 'incognito', label: 'Incognito Mode', icon: Shield },
                ].map((pref) => (
                  <button
                    key={pref.id}
                    onClick={() => {
                      triggerHaptic('light');
                      onUpdate({ 
                        preferences: { 
                          ...user.preferences, 
                          [pref.id]: !user.preferences[pref.id as keyof typeof user.preferences] 
                        } 
                      });
                    }}
                    className="glass p-4 rounded-2xl flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <pref.icon size={18} className="text-white/40 group-hover:text-neon-blue transition-colors" />
                      <span className="font-bold text-sm">{pref.label}</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${user.preferences[pref.id as keyof typeof user.preferences] ? 'bg-neon-blue' : 'bg-white/10'}`}>
                      <motion.div 
                        animate={{ x: user.preferences[pref.id as keyof typeof user.preferences] ? 22 : 2 }}
                        className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-lg"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">UI Theme</h3>
              <div className="grid grid-cols-3 gap-3">
                {(['cyber', 'dark', 'neon'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      triggerHaptic('medium');
                      onUpdate({ preferences: { ...user.preferences, theme: t } });
                    }}
                    className={`glass p-3 rounded-2xl text-center border-2 transition-all ${
                      user.preferences.theme === t ? 'border-neon-blue bg-neon-blue/10' : 'border-transparent'
                    }`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest">{t}</p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">Grid Assets</h3>
              <button 
                onClick={onShowMockups}
                className="glass p-6 rounded-3xl border-neon-pink/30 flex items-center justify-between group hover:border-neon-pink transition-all w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-neon-pink/20 text-neon-pink group-hover:scale-110 transition-transform">
                    <Layout size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-black italic uppercase tracking-tighter">Digital Mockups</p>
                    <p className="text-[10px] text-white/40 font-bold uppercase">Merch, Socials, QR Previews</p>
                  </div>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-neon-pink transition-colors" />
              </button>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VenueDetailScreen = ({ 
  venue, 
  onBack, 
  user, 
  onUpdate 
}: { 
  venue: Venue, 
  onBack: () => void,
  user: User,
  onUpdate: (data: Partial<User>) => void
}) => {
  const isFavorite = user.favorites.venues.includes(venue.id);
  const venueBartenders = BARTENDERS.filter(b => b.venueId === venue.id);

  const toggleFavoriteVenue = () => {
    triggerHaptic('heavy');
    const newVenues = isFavorite 
      ? user.favorites.venues.filter(id => id !== venue.id)
      : [...user.favorites.venues, venue.id];
    onUpdate({ favorites: { ...user.favorites, venues: newVenues } });
  };

  const toggleFavoriteSpecial = (special: string) => {
    triggerHaptic('medium');
    const isFav = user.favorites.specials.includes(special);
    const newSpecials = isFav
      ? user.favorites.specials.filter(s => s !== special)
      : [...user.favorites.specials, special];
    onUpdate({ favorites: { ...user.favorites, specials: newSpecials } });
  };

  const toggleFavoriteBartender = (bartenderId: string) => {
    triggerHaptic('medium');
    const isFav = user.favorites.bartenders.includes(bartenderId);
    const newBartenders = isFav
      ? user.favorites.bartenders.filter(id => id !== bartenderId)
      : [...user.favorites.bartenders, bartenderId];
    onUpdate({ favorites: { ...user.favorites, bartenders: newBartenders } });
  };

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
              onClick={toggleFavoriteVenue}
              className={`glass p-3 rounded-2xl transition-all ${isFavorite ? 'text-neon-pink border-neon-pink' : 'text-white'}`}
            >
              <Heart fill={isFavorite ? "currentColor" : "none"} />
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
            <span className="font-bold text-sm">Open until 2AM</span>
          </div>
          {venue.amenities.map((amenity) => (
            <div key={amenity} className="glass px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
              <AmenityIcon type={amenity} size={16} />
              <span className="font-bold text-sm capitalize">{amenity.replace('-', ' ')}</span>
            </div>
          ))}
        </div>

        <section className="mb-8">
          <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">Tonight's Specials</h3>
          <div className="flex flex-col gap-3">
            {venue.specials.map((special, i) => {
              const isFav = user.favorites.specials.includes(special);
              return (
                <div key={i} className="glass p-4 rounded-2xl border-l-4 border-neon-blue flex items-center justify-between">
                  <p className="font-bold text-sm">{special}</p>
                  <button 
                    onClick={() => toggleFavoriteSpecial(special)}
                    className={`p-2 rounded-xl transition-all ${isFav ? 'text-neon-pink' : 'text-white/20'}`}
                  >
                    <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {venueBartenders.length > 0 && (
          <section className="mb-8">
            <h3 className="font-black text-sm uppercase tracking-widest text-white/40 mb-4">On the Stick Tonight</h3>
            <div className="flex flex-col gap-3">
              {venueBartenders.map((bartender) => {
                const isFav = user.favorites.bartenders.includes(bartender.id);
                return (
                  <div key={bartender.id} className="glass p-4 rounded-2xl flex items-center gap-4">
                    <img src={bartender.image} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                    <div className="flex-1">
                      <p className="font-black italic uppercase tracking-tighter">{bartender.name}</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase">Specialty: {bartender.specialty}</p>
                    </div>
                    <button 
                      onClick={() => toggleFavoriteBartender(bartender.id)}
                      className={`p-2 rounded-xl transition-all ${isFav ? 'text-neon-pink' : 'text-white/20'}`}
                    >
                      <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

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
  const [showSquad, setShowSquad] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [showChaos, setShowChaos] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [weather, setWeather] = useState<'sunny' | 'rain'>('sunny');
  const [isSoberCaptain, setIsSoberCaptain] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [remindedEvents, setRemindedEvents] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<User>({
    id: 'u1',
    name: 'MARCUS VIBE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rank: 'Vibe Architect',
    xp: 1250,
    nextRankXp: 2500,
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
  });

  // Simulate Chaos Hour trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChaos(true);
      triggerHaptic('heavy');
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

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
              onShowSquad={() => setShowSquad(true)}
              onShowStaff={() => setShowStaff(true)}
              weather={weather}
              setWeather={setWeather}
              isSoberCaptain={isSoberCaptain}
              setIsSoberCaptain={setIsSoberCaptain}
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
              onShowMockups={() => setShowBrand(true)}
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
            user={userProfile}
            onUpdate={(data) => setUserProfile(prev => ({ ...prev, ...data }))}
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
        {showSquad && (
          <SquadAlerts onBack={() => setShowSquad(false)} />
        )}
        {showStaff && (
          <StaffView onBack={() => setShowStaff(false)} onTriggerChaos={() => setShowChaos(true)} />
        )}
        {showChaos && (
          <ChaosHour onBack={() => setShowChaos(false)} />
        )}
        {showBrand && (
          <BrandMockups onBack={() => setShowBrand(false)} />
        )}
        {toast && (
          <Toast message={toast} onHide={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
