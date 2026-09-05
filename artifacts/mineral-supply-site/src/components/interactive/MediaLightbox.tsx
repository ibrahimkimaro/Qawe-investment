import { useEffect } from 'react';
import { Film, Image as ImageIcon, MapPin, X } from 'lucide-react';
import { MediaItem } from '@/data/media';

interface MediaLightboxProps {
  mediaItem: MediaItem | null;
  onClose: () => void;
}

export function MediaLightbox({ mediaItem, onClose }: MediaLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (mediaItem) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mediaItem, onClose]);

  if (!mediaItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-title"
    >
      <div className="relative flex max-h-[95vh] w-full max-w-[960px] flex-col overflow-hidden border border-[#5a5145] bg-[#161513] text-[#f1ede5] shadow-[0_25px_90px_rgba(0,0,0,0.8)]">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-[#3d372e] bg-[#12110f] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded bg-[#211f1b] px-2.5 py-1 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#d09b30] border border-[#d09b30]/40">
              {mediaItem.type === 'video' ? <Film size={12} /> : <ImageIcon size={12} />}
              {mediaItem.categoryLabel}
            </span>
            {mediaItem.lotInfo && (
              <span className="font-mono-custom text-[10px] text-[#b8b1a4] hidden sm:inline">
                {mediaItem.lotInfo}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center border border-white/10 text-[#bab2a7] transition-colors hover:border-[#d09b30] hover:text-[#d09b30]"
            aria-label="Close media player"
          >
            <X size={18} />
          </button>
        </div>

        {/* Media Player / Image Area */}
        <div className="relative flex items-center justify-center bg-black min-h-[300px] max-h-[62vh] overflow-hidden">
          {mediaItem.type === 'video' ? (
            <video
              src={mediaItem.src}
              controls
              autoPlay
              playsInline
              className="max-h-[62vh] w-full object-contain"
            >
              Your browser does not support HTML5 video playback.
            </video>
          ) : (
            <img
              src={mediaItem.src}
              alt={mediaItem.title}
              className="max-h-[62vh] w-full object-contain"
            />
          )}
        </div>

        {/* Bottom Details */}
        <div className="border-t border-[#3d372e] bg-[#181715] p-5">
          <h2 id="media-title" className="font-display text-xl font-semibold tracking-tight text-[#f1ede5]">
            {mediaItem.title}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-[#a8a195] max-w-[840px]">
            {mediaItem.summary}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#2d2821] pt-3 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#7d7568]">
            <span className="flex items-center gap-1.5 text-[#b5ada0]">
              <MapPin size={12} className="text-[#d09b30]" /> {mediaItem.location}
            </span>
            {mediaItem.date && <span>Date / Lot: {mediaItem.date}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
