import { useState } from 'react';
import { ArrowUpRight, Check, Download, Eye, FileText, Film, Image as ImageIcon, Play, Sparkles } from 'lucide-react';
import { MediaItem, mediaItems, fieldNotes } from '@/data/media';
import { trackEvent } from '@/lib/analytics';

interface MediaSectionProps {
  onOpenVideo: (video: MediaItem) => void;
  onOpenImage: (image: MediaItem) => void;
  onDownloadBrief: () => void;
  brochureNotice: boolean;
}

export function MediaSection({
  onOpenVideo,
  onOpenImage,
  onDownloadBrief,
  brochureNotice,
}: MediaSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'verification' | 'stocks' | 'notes'>('all');

  const filteredMedia = mediaItems.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'verification') return item.category === 'verification';
    if (activeTab === 'stocks') return item.category === 'stocks' || item.category === 'operations';
    return true;
  });

  return (
    <section id="media" className="section-pad bg-[#211f1b] text-[#f1ede5]">
      <div className="mx-auto max-w-[1280px]">
        {/* Header with Title and PDF Download */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="reveal">
            <div className="eyebrow flex items-center gap-3 text-[#d09b30]">
              <span className="h-px w-9 bg-[#c89532]" /> 07 / Media & Field Proof
            </div>
            <h2 className="mt-7 font-display text-[clamp(2.8rem,5vw,5.3rem)] font-semibold leading-[.9] tracking-[-.07em]">
              What sits<br />
              behind the <span className="text-[#d09b30]">deal.</span>
            </h2>
            <p className="mt-4 max-w-[480px] text-sm leading-6 text-[#a8a195]">
              Real warehouse footage, physical lot verifications, and operational photography from our primary African mineral transit corridors.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href="/media/qawe-company-profile.pdf"
              download="Qawe-Investment-Company-Profile.pdf"
              onClick={onDownloadBrief}
              className="line-button flex items-center gap-3 border border-[#c89532]/70 bg-[#2b2721] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#f1ede5] transition-all hover:bg-[#c89532] hover:text-[#211f1b] hover:shadow-[0_0_20px_rgba(200,149,50,0.3)]"
              data-testid="button-download-brief"
            >
              <FileText size={15} className="text-[#d09b30]" /> Download Company Profile PDF
            </a>
            <span className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#81796e]">
              Official Corporate Brief & Scope
            </span>
          </div>
        </div>

        {brochureNotice && (
          <div
            className="mt-6 flex items-center gap-3 border border-[#c89532]/50 bg-[#28231a] px-4 py-3 text-xs text-[#d09b30] animate-in fade-in"
            role="status"
            data-testid="status-download"
          >
            <Check size={16} /> Official Qawe Investment Company Limited Profile is downloading.
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-[#433c32] pb-4">
          {[
            { id: 'all', label: 'All Media & Stocks' },
            { id: 'verification', label: 'Physical Verification Videos (2)' },
            { id: 'stocks', label: 'Warehouse & Field Stocks (5)' },
            { id: 'notes', label: 'Field Trading Notes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.12em] transition-all duration-200 border ${
                activeTab === tab.id
                  ? 'border-[#c89532] bg-[#c89532] text-[#211f1b] font-bold shadow-sm'
                  : 'border-white/10 bg-[#191815] text-[#b4ada2] hover:border-white/25 hover:text-[#f1ede5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Media Grid: Videos and Photos */}
        {activeTab !== 'notes' && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden border border-[#4a4338] bg-[#181715] transition-all duration-300 hover:border-[#c89532]/80 hover:shadow-2xl"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#100f0d]">
                  <img
                    src={item.type === 'video' ? item.thumbnail : item.src}
                    alt={item.title}
                    className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181715] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute left-3 top-3 right-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 rounded-sm bg-[#12110f]/90 px-2 py-1 font-mono-custom text-[8px] uppercase tracking-[.14em] text-[#d09b30] border border-[#d09b30]/30 backdrop-blur-sm">
                      {item.type === 'video' ? <Film size={11} /> : <ImageIcon size={11} />}
                      {item.categoryLabel}
                    </span>
                    {item.duration && (
                      <span className="rounded-sm bg-black/80 px-2 py-1 font-mono-custom text-[8px] uppercase tracking-[.1em] text-white">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  {/* Video Play Button Overlay */}
                  {item.type === 'video' ? (
                    <button
                      onClick={() => {
                        onOpenVideo(item);
                        trackEvent('video_viewed', { title: item.title, lot: item.lotInfo || '' });
                      }}
                      className="absolute inset-0 flex items-center justify-center group/btn"
                      aria-label={`Play video: ${item.title}`}
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c89532] bg-[#1b1a17]/90 text-[#d09b30] shadow-[0_0_25px_rgba(200,149,50,0.4)] transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-[#c89532] group-hover/btn:text-[#211f1b]">
                        <Play size={22} className="ml-1 fill-current" />
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onOpenImage(item);
                        trackEvent('image_inspected', { title: item.title });
                      }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
                      aria-label={`Inspect image: ${item.title}`}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c89532] bg-[#1b1a17]/90 text-[#d09b30]">
                        <Eye size={18} />
                      </span>
                    </button>
                  )}
                </div>

                {/* Card Content Details */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    {item.lotInfo && (
                      <span className="font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#c89532] block">
                        {item.lotInfo}
                      </span>
                    )}
                    <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-tight text-[#f1ede5] group-hover:text-[#d09b30] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#9e968b] line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#373229] pt-3 text-[10px] font-mono-custom text-[#7f776a]">
                    <span>{item.location}</span>
                    <button
                      onClick={() => {
                        if (item.type === 'video') onOpenVideo(item);
                        else onOpenImage(item);
                      }}
                      className="flex items-center gap-1 text-[#d09b30] hover:underline"
                    >
                      {item.type === 'video' ? 'Watch Proof' : 'Inspect Detail'} <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section 07.B Field Notes & Trading Philosophy */}
        <div className="mt-16 border-t border-[#433c32] pt-12">
          <div className="flex items-center gap-2 text-[#d09b30] font-mono-custom text-[10px] uppercase tracking-[.18em]">
            <Sparkles size={14} /> Desk Insights & Verifiable Handover
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {fieldNotes.map((note) => (
              <article
                key={note.number}
                className="border border-[#453e34] bg-[#191815] p-6 transition-all duration-200 hover:border-[#c89532]/60"
              >
                <div className="flex items-center justify-between border-b border-[#352f27] pb-3">
                  <span className="font-mono-custom text-[10px] font-bold text-[#d09b30]">
                    FIELD NOTE / {note.number}
                  </span>
                  <span className="font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#787063]">
                    Qawe Mineral Desk
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-[#f1ede5]">
                  {note.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-[#9e968b]">
                  {note.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
