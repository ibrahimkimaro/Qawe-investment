import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router as WouterRouter, Route, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

// Modular Layout & Section Components
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { About } from '@/components/sections/About';
import { Commodities } from '@/components/sections/Commodities';
import { Services } from '@/components/sections/Services';
import { Operations } from '@/components/sections/Operations';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { Responsibility } from '@/components/sections/Responsibility';
import { MediaSection } from '@/components/sections/MediaSection';
import { Leadership } from '@/components/sections/Leadership';
import { Contact } from '@/components/sections/Contact';

// Interactive Widgets & Modals
import { ChatWidget } from '@/components/interactive/ChatWidget';
import { CommodityModal } from '@/components/interactive/CommodityModal';
import { EnquiryModal } from '@/components/interactive/EnquiryModal';
import { MediaLightbox } from '@/components/interactive/MediaLightbox';

import { SplashScreen } from '@/components/layout/SplashScreen';

// Data & Pages
import { Commodity } from '@/data/commodities';
import { MediaItem } from '@/data/media';
import { OFFICIAL_EMAIL } from '@/data/company';
import { trackEvent } from '@/lib/analytics';
import CommodityDetailPage from '@/pages/CommodityDetail';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

export function App() {
  const [enquiryText, setEnquiryText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [brochureNotice, setBrochureNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Qawe Investment Company Limited — Material. Moved with clarity.';
    const metaDesc = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'Qawe Investment Company Limited connects verified mineral sourcing to export, shipping and final delivery from Dar es Salaam, Tanzania.');
    document.head.appendChild(metaDesc);

    // Hold splash until progress bar completes (1.8s) + a tiny buffer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1850);

    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openEnquiry = (commodityName = '') => {
    setEnquiryText(commodityName ? `I am enquiring about ${commodityName}.` : '');
    setModalOpen(true);
    trackEvent('rfq_started', { source: commodityName ? 'commodity' : 'site_cta' });
  };

  const handleModalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const getValue = (name: string) => String(formData.get(name) ?? '').trim();
    const subject = `Mineral enquiry from ${getValue('company') || 'website visitor'}`;
    const body = [
      `Name: ${getValue('name')}`,
      `Company: ${getValue('company')}`,
      `Work email: ${getValue('email')}`,
      '',
      'Requirement:',
      getValue('message') || enquiryText,
    ].join('\n');

    trackEvent('rfq_submitted', { channel: 'email_modal' });
    window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const downloadBrief = () => {
    trackEvent('brochure_requested', { status: 'downloaded' });
    setBrochureNotice(true);
    window.setTimeout(() => setBrochureNotice(false), 4500);
  };

  return (
    <div
      className="site-shell noise min-h-[100dvh] text-[#211f1b]"
      style={{
        background: isLoading ? '#141311' : '#efede7',
        transition: 'background 0.5s ease-in-out',
      }}
    >
      {/* Fullscreen Initial Splash Loader with Rotating Conic Border */}
      <SplashScreen isLoading={isLoading} />

      {/* Fixed Luxury Navigation Header */}
      <Header onOpenEnquiry={openEnquiry} onScrollTo={scrollTo} />

      {/* Main Content Flow */}
      <main>
        <Hero onOpenEnquiry={() => openEnquiry()} onScrollTo={scrollTo} />
        <Marquee />
        <About onOpenEnquiry={() => openEnquiry()} />
        <Commodities onSelectCommodity={setSelectedCommodity} onOpenEnquiry={openEnquiry} />
        <Services />
        <Operations />
        <ValueProposition onOpenEnquiry={() => openEnquiry()} />
        <Responsibility />
        <MediaSection
          onOpenVideo={setSelectedMedia}
          onOpenImage={setSelectedMedia}
          onDownloadBrief={downloadBrief}
          brochureNotice={brochureNotice}
        />
        <Leadership onOpenEnquiry={openEnquiry} />
        <Contact enquiryText={enquiryText} setEnquiryText={setEnquiryText} />
      </main>

      {/* Site Footer */}
      <Footer onScrollTo={scrollTo} onDownloadBrief={downloadBrief} />

      {/* Interactive Chatbot Desk */}
      <ChatWidget onOpenEnquiry={openEnquiry} />

      {/* Commodity Specifications Modal */}
      <CommodityModal
        commodity={selectedCommodity}
        onClose={() => setSelectedCommodity(null)}
        onOpenEnquiry={openEnquiry}
      />

      {/* Direct RFQ Modal Dialog */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        enquiryText={enquiryText}
        setEnquiryText={setEnquiryText}
        onSubmit={handleModalSubmit}
      />

      {/* Real Video Player & Image Lightbox */}
      <MediaLightbox
        mediaItem={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/commodities/:slug" component={CommodityDetailPage} />
        <Route path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

export default function Root() {
  const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={base}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}