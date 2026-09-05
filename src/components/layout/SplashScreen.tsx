import { useEffect, useState } from 'react';

interface SplashScreenProps {
    isLoading: boolean;
}

export function SplashScreen({ isLoading }: SplashScreenProps) {
    const [progress, setProgress] = useState(0);
    const [phaseText, setPhaseText] = useState('INITIALIZING TRADE DESK');
    // Keep DOM alive until exit CSS transition (600ms) fully completes
    const [shouldRender, setShouldRender] = useState(isLoading);
    const [isFadingOut, setIsFadingOut] = useState(false);

    // Manage mount/unmount in sync with the 600ms CSS transition
    useEffect(() => {
        if (!isLoading) {
            setIsFadingOut(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 650);
            return () => clearTimeout(timer);
        }
        setShouldRender(true);
        setIsFadingOut(false);
        return undefined;
    }, [isLoading]);

    // Progress counter timed to match 1.8s hide delay exactly
    useEffect(() => {
        if (!isLoading) return undefined;

        const TOTAL_MS = 1750;
        const STEP_MS = 36;
        const INCREMENT = 100 / (TOTAL_MS / STEP_MS);

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = Math.min(prev + INCREMENT, 100);
                if (next > 70) {
                    setPhaseText('MATERIAL. MOVED WITH CLARITY.');
                } else if (next > 35) {
                    setPhaseText('VERIFYING CORRIDORS & STOCKS');
                } else {
                    setPhaseText('INITIALIZING TRADE DESK');
                }
                if (next >= 100) clearInterval(interval);
                return next;
            });
        }, STEP_MS);

        return () => clearInterval(interval);
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#141311] text-[#f3f0e9]"
            style={{
                opacity: isFadingOut ? 0 : 1,
                transition: 'opacity 0.6s ease-in-out',
                pointerEvents: isFadingOut ? 'none' : 'all',
            }}
            aria-label="Loading Qawe Investment Company Limited"
            aria-live="polite"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,149,50,0.18),transparent_65%)] pointer-events-none" />
            <div className="noise absolute inset-0 opacity-40 pointer-events-none" />

            {/* Center Animated Logo Container */}
            <div
                className="relative z-10 flex flex-col items-center"
                style={{
                    transform: isFadingOut ? 'scale(1.07)' : 'scale(1)',
                    opacity: isFadingOut ? 0 : 1,
                    transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',
                }}
            >
                {/* Keyframe zote zilizosafishwa na kuongezewa imagePulse */}
                <style>{`
    @keyframes spinBorder {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes splashPulse {
      0%, 100% { box-shadow: 0 0 45px rgba(200,149,50,0.30); }
      50%       { box-shadow: 0 0 75px rgba(200,149,50,0.60); }
    }
    @keyframes imagePulse {
      0%, 100% { opacity: 0.85; filter: brightness(0.9); }
      50%       { opacity: 1; filter: brightness(1.1); }
    }
  `}</style>

                {/* Animated Glowing Logo Card */}
                <div
                    className="relative p-[2px] rounded-2xl flex items-center justify-center h-28 w-28 sm:h-32 sm:w-32"
                    style={{ animation: 'splashPulse 2.5s ease-in-out infinite' }}
                >
                    {/* The Moving White/Gold Conic Border Layer */}
                    <span
                        className="absolute inset-0 rounded-2xl overflow-hidden -z-10 flex items-center justify-center pointer-events-none"
                    >
                        <span
                            className="absolute"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 20%, #ffffff 48%, #c89532 52%, transparent 80%)',
                                animation: 'spinBorder 3s linear infinite',
                                width: '260%',
                                height: '260%',
                            }}
                        />
                    </span>

                    {/* Logo Content Container */}
                    <div className="h-full w-full rounded-2xl overflow-hidden bg-[#141311] p-1 flex items-center justify-center">
                        <img
                            src="/media/qawe-brand-logo-rounded.png"
                            alt="Qawe Logo"
                            className="h-full w-full rounded-2xl object-cover"
                            style={{
                                background: '#141311',
                                animation: 'imagePulse 1.5s ease-in-out infinite'
                            }}
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

                {/* Progress bar */}
                <div className="mt-10 w-48 sm:w-56">
                    <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#c89532] to-[#f0c86a] rounded-full"
                            style={{ width: `${progress}%`, transition: 'width 0.07s linear' }}
                        />
                    </div>
                    <p className="mt-3 font-mono-custom text-[8px] uppercase tracking-[.22em] text-[#6b6355] text-center">
                        {phaseText}
                    </p>
                </div>
            </div>
        </div>
    );
}
