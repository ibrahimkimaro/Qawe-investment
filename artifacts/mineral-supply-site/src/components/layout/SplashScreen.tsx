import { useEffect, useState } from 'react';

interface SplashScreenProps {
  isLoading: boolean;
  onFinish?: () => void;
}

export function SplashScreen({ isLoading, onFinish }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING TRADE DESK');
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timer);
    }
    setShouldRender(true);
    return undefined;
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return undefined;

    // Smooth progress counter over ~1.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 2.7;
        if (next > 70) {
          setPhaseText('MATERIAL. MOVED WITH CLARITY.');
        } else if (next > 35) {
          setPhaseText('VERIFYING CORRIDORS & STOCKS');
        } else {
          setPhaseText('INITIALIZING TRADE DESK');
        }
        return next > 100 ? 100 : next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#141311] text-[#f3f0e9] transition-all duration-500 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      aria-label="Loading Qawe Investment Company Limited"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,149,50,0.18),transparent_65%)] pointer-events-none" />
      <div className="noise absolute inset-0 opacity-40 pointer-events-none" />

      {/* Center Animated Logo Container */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-500 ease-in-out ${isLoading ? 'scale-100 opacity-100' : 'scale-110 opacity-0 blur-sm'
          }`}
      >
        {/* Animated Glowing Logo Card */}
        <div
          className={`relative p-[2px] overflow-hidden rounded-2xl flex items-center justify-center h-28 w-28 sm:h-32 sm:w-32 shadow-[0_0_50px_rgba(200,149,50,0.35)] transition-all duration-300 ${isLoading ? 'animate-[pulse_2.5s_infinite_ease-in-out]' : ''
            }`}
        >
          {/* Keyframe animation injected inline */}
          <style>{`
        @keyframes spinBorder {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

          {/* The Moving White/Gold Conic Border Layer */}
          <span
            className="absolute -z-10"
            style={{
              background: 'conic-gradient(from 0deg, transparent 20%, #ffffff 48%, #c89532 52%, transparent 80%)',
              animation: 'spinBorder 3s linear infinite',
              width: '260%',
              height: '260%',
            }}
          />

          {/* Logo Content */}
          <div className="h-full w-full rounded-2xl overflow-hidden bg-[#141311] p-1 flex items-center justify-center">
            <img
              src="/media/qawe-brand-logo-rounded.png"
              alt="Qawe Logo"
              className="h-full w-full rounded-2xl object-cover"
              style={{ background: '#141311' }}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.includes('qawe-brand-logo.jpeg')) {
                  target.src = '/media/qawe-brand-logo.jpeg';
                }
              }}
            />
          </div>
        </div>

        {/* Brand Title */}
        <div className="mt-7 text-center">
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-[.18em] uppercase text-[#f3f0e9]">
            Qawe Investment
          </h1>
          <p className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.25em] text-[#c89532]">
            Company Limited
          </p>

        </div>
      </div>
    </div>

  );
}
