import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Bot, Check, Download, FileText, Menu, MessageCircle, Send, ShieldCheck, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import heroImage from '../attached_assets/generated_images/mineral-hero.jpg';
import materialImage from '../attached_assets/generated_images/material-detail.jpg';
import portImage from '../attached_assets/generated_images/port-logistics.jpg';
import qaweLogo from '../../../attached_assets/IMG-20260629-WA0007.jpg_1788505924677.jpeg';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Router as WouterRouter, Route, Switch, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const HERO_IMAGE = heroImage;
const MATERIAL_IMAGE = materialImage;
const PORT_IMAGE = portImage;
const QAWE_LOGO = qaweLogo;

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Commodities', 'commodities'],
  ['Services', 'services'],
  ['Operations', 'operations'],
  ['Responsibility', 'responsibility'],
  ['Media', 'media'],
  ['Contact', 'contact'],
];

const commodities = [
  { name: 'Copper Cathode', code: '01', detail: 'Refined material for industrial buyers', tone: 'Copper' },
  { name: 'Copper Concentrate', code: '02', detail: 'Sourced to a defined customer brief', tone: 'Concentrate' },
  { name: 'Copper Wire', code: '03', detail: 'Supply conversations built around use', tone: 'Wire' },
  { name: 'Cobalt', code: '04', detail: 'Requirement-led sourcing and verification', tone: 'Cobalt' },
  { name: 'Tantalite', code: '05', detail: 'Traceable paperwork from origin onward', tone: 'Tantalite' },
  { name: 'Coltan', code: '06', detail: 'A considered route from source to buyer', tone: 'Coltan' },
  { name: 'Gold', code: '07', detail: 'Handled with clarity and discretion', tone: 'Gold' },
  { name: 'Sulfur', code: '08', detail: 'Practical supply for specific requirements', tone: 'Sulfur' },
];

const services = [
  { number: '01', title: 'Sourcing', copy: 'We start with your requirement, then build the right sourcing conversation around material, form, timing and destination.' },
  { number: '02', title: 'Verification', copy: 'Material and documentation are reviewed before the next handover. The brief stays visible throughout.' },
  { number: '03', title: 'Export & shipping', copy: 'A coordinated route from origin through export, shipping and the milestones that matter to your team.' },
  { number: '04', title: 'Final delivery', copy: 'The job is complete when the material arrives where it needs to be, with the right paperwork alongside it.' },
];

const leadership = [
  { role: 'Director', name: 'Tshepo Zwelibanzi', initials: 'TZ' },
  { role: 'PR', name: 'Dan Guguka', initials: 'DG' },
  { role: 'Financial', name: 'Hans Mtui', initials: 'HM' },
];

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enquiry, setEnquiry] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [brochureNotice, setBrochureNotice] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Welcome to Qawe Investment Company Limited. I can direct you to our commodities, services, delivery process, or enquiry team.',
    },
  ]);

  useEffect(() => {
    document.title = 'Qawe Investment Company Limited — Material. Moved with clarity.';
    const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', 'Qawe Investment Company Limited connects verified mineral sourcing to export, shipping and final delivery.');
    document.head.appendChild(description);
  }, []);

  const waHref = useMemo(
    () => `https://wa.me/?text=${encodeURIComponent('Hello Qawe Investment Company Limited, I would like to discuss a mineral supply requirement.')}`,
    [],
  );

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openEnquiry = (commodity = '') => {
    setEnquiry(commodity ? `I am enquiring about ${commodity}.` : '');
    setSubmitted(false);
    setModalOpen(true);
  };

  const submitEnquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const getChatResponse = (message: string) => {
    const normalized = message.toLowerCase();

    if (normalized.includes('commodity') || normalized.includes('supply') || normalized.includes('material') || normalized.includes('miner')) {
      return 'We work with Copper Cathode, Copper Concentrate, Copper Wire, Cobalt, Tantalite, Coltan, Gold, Sulfur, and other customer-requested minerals.';
    }
    if (normalized.includes('service') || normalized.includes('process') || normalized.includes('deliver') || normalized.includes('logistic')) {
      return 'Our route is sourcing, quality verification, documentation, logistics, export, shipping, and final delivery. Share your material, destination, and timing to start.';
    }
    if (normalized.includes('responsib') || normalized.includes('compliance') || normalized.includes('certificate') || normalized.includes('license')) {
      return 'We keep responsibility and verification factual. Approved documentation can be discussed directly with the team as part of a specific supply conversation.';
    }
    if (normalized.includes('location') || normalized.includes('port') || normalized.includes('country') || normalized.includes('origin')) {
      return 'Operating locations and origin details are confirmed requirement by requirement. Tell us the destination and material you need, and the team can direct the next step.';
    }
    if (normalized.includes('contact') || normalized.includes('whatsapp') || normalized.includes('enquir') || normalized.includes('quote') || normalized.includes('rfq')) {
      return 'The quickest route is to start an enquiry or continue on WhatsApp. I can open the short enquiry form for you now.';
    }
    return 'I can direct you to commodities, services, delivery, responsibility, or a business enquiry. What would you like to know?';
  };

  const sendChatMessage = (message = chatInput) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    if (trimmedMessage.toLowerCase().includes('enquir') || trimmedMessage.toLowerCase().includes('quote') || trimmedMessage.toLowerCase().includes('rfq')) {
      setChatMessages((current) => [...current, { role: 'user', text: trimmedMessage }]);
      setChatInput('');
      setChatOpen(false);
      openEnquiry();
      return;
    }

    setChatMessages((current) => [
      ...current,
      { role: 'user', text: trimmedMessage },
      { role: 'assistant', text: getChatResponse(trimmedMessage) },
    ]);
    setChatInput('');
  };

  const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage();
  };

  const downloadBrief = () => {
    const brief = `QAWE INVESTMENT COMPANY LIMITED\nCapability brief\n\nSOURCING / VERIFICATION / LOGISTICS / DELIVERY\n\nCommodities\nCopper Cathode, Copper Concentrate, Copper Wire, Cobalt, Tantalite, Coltan, Gold, Sulfur, and other customer-requested minerals.\n\nWe source and supply to customer requirements, with quality verification, documentation, logistics, export, shipping and final delivery.\n\nContact Qawe Investment Company Limited to begin a requirement-led conversation.`;
    const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qawe-investment-company-capability-brief.txt';
    link.click();
    URL.revokeObjectURL(url);
    setBrochureNotice(true);
    window.setTimeout(() => setBrochureNotice(false), 3500);
  };

  return (
    <div className="site-shell noise min-h-[100dvh] bg-[#efede7] text-[#211f1b]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#1b1a17]/90 text-[#f3f0e9] backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <a href="#home" onClick={() => scrollTo('home')} className="group flex items-center gap-3" data-testid="link-logo">
            <span className="flex h-9 w-9 items-center justify-center border border-[#c89532] text-[#d09b30]">
              <span className="font-display text-lg font-bold">Q</span>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[13px] font-bold uppercase tracking-[.16em]">Qawe</span>
              <span className="mt-1 block font-mono-custom text-[8px] uppercase tracking-[.2em] text-[#c5c0b6]">Investment Company</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => scrollTo(id)} className="nav-link text-[10px] font-semibold uppercase tracking-[.13em] text-[#d2cec5]" data-testid={`link-nav-${id}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-[#d09b30]" data-testid="link-header-whatsapp">
              <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp
            </a>
            <button onClick={() => openEnquiry()} className="line-button flex items-center gap-2 border border-[#c89532] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#f5f0e6] hover:bg-[#c89532] hover:text-[#211f1b]" data-testid="button-header-contact">
              Start a conversation <ArrowUpRight size={14} />
            </button>
          </div>

          <button onClick={() => setMobileOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center border border-white/20 lg:hidden" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="border-t border-white/10 bg-[#1b1a17] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => scrollTo(id)} className="block border-b border-white/10 py-3 text-[11px] font-semibold uppercase tracking-[.16em] text-[#d2cec5]" data-testid={`link-mobile-nav-${id}`}>
                {label}
              </a>
            ))}
            <button onClick={() => { setMobileOpen(false); openEnquiry(); }} className="mt-5 flex w-full items-center justify-center gap-2 bg-[#c89532] px-4 py-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#211f1b]" data-testid="button-mobile-contact">
              Start a conversation <ArrowUpRight size={14} />
            </button>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[760px] items-end overflow-hidden bg-[#1b1a17] text-[#f3f0e9] lg:min-h-[850px]">
          <img src={HERO_IMAGE} alt="Aerial view of terraced mineral terrain at dawn" className="image-wash absolute inset-0 h-full w-full object-cover opacity-75" />
          <div className="hero-gradient absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(208,155,48,.22),transparent_26%)]" />
          <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-20 pt-40 lg:px-8 lg:pb-28">
            <div className="max-w-[820px]">
              <div className="reveal eyebrow mb-7 flex items-center gap-3 text-[#d09b30]"><span className="h-px w-10 bg-[#d09b30]" /> International minerals & commodities</div>
              <h1 className="reveal reveal-delay-1 font-display text-[clamp(3.6rem,9vw,8.2rem)] font-semibold leading-[.87] tracking-[-.075em]">Material.<br /><span className="text-[#d09b30]">Moved</span> with<br />clarity.</h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-[500px] text-[15px] leading-7 text-[#d1cdc5] lg:text-[17px]">
                Qawe Investment Company Limited connects customer requirements to capable sourcing, verified material and a clear route to final delivery.
              </p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <button onClick={() => openEnquiry()} className="line-button flex items-center gap-3 bg-[#d09b30] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#211f1b] hover:bg-[#e2b04c]" data-testid="button-hero-enquiry">
                  Discuss your requirement <ArrowUpRight size={15} />
                </button>
                <a href="#commodities" onClick={() => scrollTo('commodities')} className="line-button flex items-center gap-3 border border-white/35 px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#f3f0e9] hover:border-[#d09b30] hover:text-[#d09b30]" data-testid="link-hero-commodities">
                  Explore materials <ArrowDown size={14} />
                </a>
              </div>
            </div>
            <div className="mt-20 grid max-w-[760px] grid-cols-2 border-t border-white/20 pt-5 sm:grid-cols-4">
              {['Source-led', 'Requirement-built', 'Documented', 'Delivery-minded'].map((item, index) => (
                <div key={item} className={`reveal reveal-delay-${index + 1} border-r border-white/15 px-4 first:pl-0 last:border-0`}>
                  <span className="font-mono-custom text-[9px] text-[#c89532]">0{index + 1}</span>
                  <p className="mt-2 text-[11px] uppercase tracking-[.12em] text-[#d2cec5]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-orbit absolute right-[6%] top-[28%] hidden h-32 w-32 rounded-full border border-[#d09b30]/45 lg:block">
            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#d09b30]" />
            <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#d09b30]" />
          </div>
          <a href="#about" onClick={() => scrollTo('about')} className="absolute bottom-7 right-8 hidden items-center gap-3 text-[9px] uppercase tracking-[.2em] text-[#c5c0b6] lg:flex" data-testid="link-scroll-about">
            Scroll to know us <span className="h-px w-12 bg-[#c89532]" />
          </a>
        </section>

        <section className="overflow-hidden bg-[#c89532] text-[#211f1b]" aria-label="Company focus">
          <div className="marquee-track flex min-w-max items-center gap-0 py-4">
            {[...Array(2)].flatMap((_, repeat) => ['COPPER', 'COBALT', 'TANTALITE', 'COLTAN', 'GOLD', 'SULFUR', 'CUSTOM REQUIREMENTS'].map((item, index) => (
              <div key={`${repeat}-${item}`} className="flex items-center">
                <span className="px-8 font-mono-custom text-[10px] font-medium uppercase tracking-[.2em]">{item}</span>
                <span className="h-1 w-1 rounded-full bg-[#211f1b]/50" />
              </div>
            )))}
          </div>
        </section>

        <section id="about" className="section-pad grid-lines bg-[#efede7]">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
            <div className="reveal">
              <div className="eyebrow flex items-center gap-3 text-[#8b651e]"><span className="h-px w-9 bg-[#c89532]" /> 01 / About</div>
              <p className="mt-8 max-w-[260px] font-display text-3xl font-semibold leading-[1.05] tracking-[-.04em] text-[#28241e]">The trade desk behind the material.</p>
              <img src={QAWE_LOGO} alt="Qawe Investment Company Limited elephant emblem and wordmark" className="mt-12 w-full max-w-[260px] border border-[#c9bea8] bg-[#1b1a17] p-2 shadow-[0_20px_50px_rgba(41,37,31,.12)]" />
              <div className="mt-14 hidden lg:block">
                <span className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#8f897f]">A working principle</span>
                <p className="mt-3 max-w-[210px] text-sm leading-6 text-[#625d55]">Make the route visible. Keep the requirement in view. Deliver the next clear step.</p>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <h2 className="font-display text-[clamp(2.5rem,5vw,5.1rem)] font-semibold leading-[.96] tracking-[-.065em] text-[#29251f]">From material origin<br />to the final handover.</h2>
              <div className="mt-10 grid gap-8 border-t border-[#cfc8bd] pt-8 md:grid-cols-[1.2fr_.8fr]">
                <p className="text-[16px] leading-8 text-[#554f47]">Qawe Investment Company Limited is built around a straightforward proposition: source and supply to customer requirements, then stay close to the details that make delivery dependable.</p>
                <p className="text-sm leading-6 text-[#777066]">Quality verification, documentation, logistics, export, shipping and final delivery are not separate promises. They are one considered path.</p>
              </div>
              <button onClick={() => openEnquiry()} className="mt-10 flex items-center gap-3 border-b border-[#8b651e] pb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#705115] hover:text-[#c89532]" data-testid="button-about-conversation">
                Talk through a requirement <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <section id="commodities" className="section-pad bg-[#211f1b] text-[#f1ede5]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="reveal">
              <div className="eyebrow flex items-center gap-3 text-[#d09b30]"><span className="h-px w-9 bg-[#c89532]" /> 02 / Commodities</div>
              <h2 className="mt-7 max-w-[680px] font-display text-[clamp(2.8rem,5vw,5.7rem)] font-semibold leading-[.9] tracking-[-.07em]">The material<br /><span className="text-[#d09b30]">in focus.</span></h2>
            </div>
            <p className="reveal max-w-[300px] text-sm leading-6 text-[#aaa39a]">A focused catalogue for serious enquiries. Tell us what you need; we will shape the right conversation around it.</p>
          </div>
          <div className="mt-14 grid gap-px bg-[#5a5145]/45 md:grid-cols-2 lg:grid-cols-4">
            {commodities.map((commodity, index) => (
              <button key={commodity.name} onClick={() => openEnquiry(commodity.name)} className="commodity-card group relative min-h-[190px] border border-[#5a5145]/45 bg-[#211f1b] p-6 text-left" data-testid={`button-commodity-${commodity.name.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="flex items-start justify-between">
                  <span className="font-mono-custom text-[10px] text-[#c89532]">{commodity.code}</span>
                  <ArrowUpRight className="commodity-arrow text-[#837b6e]" size={19} strokeWidth={1.25} />
                </div>
                <div className="mt-12">
                  <h3 className="font-display text-[21px] font-semibold tracking-[-.03em] text-[#f1ede5]">{commodity.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#9c958b]">{commodity.detail}</p>
                </div>
                {index === 7 && <span className="absolute bottom-6 right-6 h-1.5 w-1.5 rounded-full bg-[#d09b30]" />}
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-col justify-between gap-4 border-t border-[#5a5145]/60 pt-5 md:flex-row md:items-center">
            <p className="text-xs text-[#8f887e]">Also sourcing other customer-requested minerals.</p>
            <button onClick={() => openEnquiry('Other customer-requested minerals')} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#d09b30]" data-testid="button-other-minerals">Ask about a specific material <ArrowRight size={14} /></button>
          </div>
        </section>

        <section id="services" className="section-pad bg-[#e4e0d8]">
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <div className="reveal">
              <div className="eyebrow flex items-center gap-3 text-[#8b651e]"><span className="h-px w-9 bg-[#c89532]" /> 03 / Services</div>
              <h2 className="mt-7 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[.92] tracking-[-.065em]">The route is<br /><span className="text-[#a77520]">the service.</span></h2>
              <p className="mt-8 max-w-[320px] text-sm leading-7 text-[#6b645b]">A supply relationship should make the next step easier to see. Our role is to hold the thread from the first brief to the final delivery.</p>
            </div>
            <div className="grid gap-0 border-t border-[#beb6a9]">
              {services.map((service) => (
                <div key={service.number} className="group grid gap-4 border-b border-[#beb6a9] py-7 md:grid-cols-[60px_180px_1fr] md:items-start">
                  <span className="font-mono-custom text-[10px] text-[#a77520]">{service.number}</span>
                  <h3 className="font-display text-2xl font-semibold tracking-[-.04em] text-[#2a261f]">{service.title}</h3>
                  <p className="max-w-[360px] text-sm leading-6 text-[#6b645b]">{service.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="operations" className="section-pad overflow-hidden bg-[#181715] text-[#f1ede5]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
            <div className="reveal order-2 lg:order-1">
              <div className="eyebrow flex items-center gap-3 text-[#d09b30]"><span className="h-px w-9 bg-[#c89532]" /> 04 / Operations</div>
              <h2 className="mt-7 font-display text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[.91] tracking-[-.07em]">A clear line<br />through the <span className="text-[#d09b30]">chain.</span></h2>
              <p className="mt-8 max-w-[470px] text-[15px] leading-7 text-[#b2aba0]">Our operating view is simple: origin, verification, paperwork, movement and arrival should feel like connected parts of the same decision.</p>
              <div className="mt-12">
                <div className="relative h-px w-full journey-line">
                  <div className="absolute -top-1.5 left-[0%] h-3 w-3 rounded-full border-2 border-[#d09b30] bg-[#181715]" />
                  <div className="absolute -top-1.5 left-[31%] h-3 w-3 rounded-full border-2 border-[#d09b30] bg-[#181715]" />
                  <div className="absolute -top-1.5 left-[62%] h-3 w-3 rounded-full border-2 border-[#d09b30] bg-[#181715]" />
                  <div className="absolute -top-1.5 right-0 h-3 w-3 rounded-full bg-[#d09b30]" />
                </div>
                <div className="mt-5 grid grid-cols-4 gap-2">
                  {['Origin', 'Verify', 'Move', 'Arrive'].map((label, index) => <span key={label} className={`font-mono-custom text-[9px] uppercase tracking-[.12em] ${index === 3 ? 'text-[#d09b30]' : 'text-[#8c857b]'}`}>{label}</span>)}
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-1 order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#4b453c]">
                <img src={PORT_IMAGE} alt="Stacked shipping containers and a cargo vessel at an industrial port" className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#181715]/75 via-transparent to-[#c89532]/10" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/25 pt-4">
                  <span className="eyebrow text-[#d5d0c7]">Operations / field note</span>
                  <span className="font-mono-custom text-[9px] text-[#d09b30]">04 — 04</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#efede7]">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div className="reveal">
              <div className="eyebrow flex items-center gap-3 text-[#8b651e]"><span className="h-px w-9 bg-[#c89532]" /> 05 / The difference</div>
              <h2 className="mt-7 max-w-[800px] font-display text-[clamp(2.7rem,6vw,6.2rem)] font-semibold leading-[.88] tracking-[-.075em] text-[#25221d]">Serious buyers<br />need <span className="text-[#a77520]">signal,</span><br />not noise.</h2>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="text-[17px] leading-8 text-[#514b43]">We believe credibility lives in the handoffs: a clear brief, a checked material, the right documents, a visible route and no unnecessary theatre.</p>
              <div className="mt-9 grid gap-3 border-t border-[#cfc8bd] pt-6">
                {['A requirement-led starting point', 'One view across material and movement', 'A practical path to business conversation'].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm text-[#625d55]"><Check size={16} className="text-[#a77520]" /> {point}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-20 grid gap-5 md:grid-cols-[1.25fr_.75fr]">
            <div className="relative min-h-[350px] overflow-hidden bg-[#2b2925]">
              <img src={MATERIAL_IMAGE} alt="Raw mineral specimens and refined copper sheets on a workbench" className="h-full w-full object-cover opacity-85 transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211f1b]/75 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="eyebrow text-[#d09b30]">Material study / 01</span>
                <p className="mt-2 font-display text-xl font-semibold text-[#f1ede5]">The physical detail matters.</p>
              </div>
            </div>
            <div className="grid bg-[#d9d3c9] p-7 sm:p-9">
              <ShieldCheck size={29} strokeWidth={1.1} className="text-[#a77520]" />
              <div className="self-end">
                <span className="eyebrow text-[#8b651e]">Why work with us</span>
                <p className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-.04em] text-[#2e2a23]">A partner that respects the procurement process.</p>
                <button onClick={() => openEnquiry()} className="mt-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#785919]" data-testid="button-why-us">Start with a brief <ArrowUpRight size={14} /></button>
              </div>
            </div>
          </div>
        </section>

        <section id="responsibility" className="section-pad bg-[#c89532] text-[#211f1b]">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-28">
            <div className="reveal">
              <div className="eyebrow flex items-center gap-3 text-[#5f4617]"><span className="h-px w-9 bg-[#5f4617]" /> 06 / Responsibility</div>
              <h2 className="mt-7 font-display text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[.9] tracking-[-.07em]">Keep the<br />chain <span className="text-[#f1ede5]">legible.</span></h2>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="max-w-[560px] text-[17px] leading-8 text-[#403015]">Responsibility begins with being clear about what is known, what is being checked and what happens next. We keep documentation and movement in the conversation, because trust is built in the details.</p>
              <div className="mt-10 grid gap-0 border-t border-[#765816]/40 sm:grid-cols-2">
                {['Clear documentation', 'Quality verification', 'Practical communication', 'Considered movement'].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 border-b border-[#765816]/40 py-5 text-sm font-semibold"><span className="font-mono-custom text-[10px] text-[#765816]">0{index + 1}</span>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="media" className="section-pad bg-[#211f1b] text-[#f1ede5]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="reveal">
              <div className="eyebrow flex items-center gap-3 text-[#d09b30]"><span className="h-px w-9 bg-[#c89532]" /> 07 / Media & notes</div>
              <h2 className="mt-7 font-display text-[clamp(2.8rem,5vw,5.3rem)] font-semibold leading-[.9] tracking-[-.07em]">What sits<br />behind the <span className="text-[#d09b30]">deal.</span></h2>
            </div>
            <button onClick={downloadBrief} className="line-button flex w-fit items-center gap-3 border border-[#786f61] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#d7d1c8] hover:border-[#d09b30] hover:text-[#d09b30]" data-testid="button-download-brief">
              <Download size={14} /> Download capability brief
            </button>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
            <article className="group border-t border-[#5a5145] pt-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[#d09b30]">Field note / 01</span>
                <ArrowUpRight className="text-[#7d7467] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
              </div>
              <h3 className="mt-16 max-w-[650px] font-display text-[clamp(2rem,4vw,4rem)] font-semibold leading-[.95] tracking-[-.055em]">A better supply conversation starts before the quote.</h3>
              <p className="mt-7 max-w-[460px] text-sm leading-6 text-[#9e968b]">The right requirement makes every later decision more useful — from sourcing through documentation and movement.</p>
            </article>
            <div className="grid gap-5">
              {['The requirement is the starting material.', 'Origin is only useful when the route is clear.', 'A handover should never feel like a black box.'].map((note, index) => (
                <article key={note} className="border-t border-[#5a5145] pt-5">
                  <span className="font-mono-custom text-[10px] text-[#d09b30]">0{index + 2}</span>
                  <p className="mt-8 font-display text-xl font-medium leading-tight tracking-[-.03em] text-[#ddd7cd]">{note}</p>
                  <span className="mt-8 block text-[9px] uppercase tracking-[.14em] text-[#81786c]">Qawe Investment / Notes</span>
                </article>
              ))}
            </div>
          </div>
          {brochureNotice && <div className="mt-7 flex items-center gap-2 text-xs text-[#d09b30]" role="status" data-testid="status-download"><Check size={15} /> Capability brief prepared for download.</div>}
        </section>

        <section className="section-pad bg-[#e4e0d8]">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
            <div className="reveal">
              <div className="eyebrow flex items-center gap-3 text-[#8b651e]"><span className="h-px w-9 bg-[#c89532]" /> 08 / Leadership</div>
              <h2 className="mt-7 font-display text-[clamp(2.7rem,5vw,5.2rem)] font-semibold leading-[.9] tracking-[-.07em]">People at<br />the <span className="text-[#a77520]">desk.</span></h2>
              <p className="mt-8 max-w-[260px] text-sm leading-6 text-[#6b645b]">A direct line into the people responsible for keeping the conversation moving.</p>
            </div>
            <div className="grid border-t border-[#beb6a9]">
              {leadership.map((person) => (
                <div key={person.name} className="flex items-center justify-between border-b border-[#beb6a9] py-7">
                  <div className="flex items-center gap-5">
                    <span className="flex h-12 w-12 items-center justify-center border border-[#b88a2a] font-mono-custom text-xs text-[#8b651e]">{person.initials}</span>
                    <div><span className="eyebrow text-[#8e867a]">{person.role}</span><h3 className="mt-2 font-display text-2xl font-semibold tracking-[-.04em] text-[#2a261f]">{person.name}</h3></div>
                  </div>
                  <button onClick={() => openEnquiry(`A conversation with ${person.name}`)} className="flex h-9 w-9 items-center justify-center border border-[#bdb5a9] text-[#7b5c1d] hover:border-[#a77520] hover:bg-[#d9d3c9]" aria-label={`Contact ${person.name}`} data-testid={`button-contact-${person.initials}`}><ArrowUpRight size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad bg-[#181715] text-[#f1ede5]">
          <div className="grid gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
            <div className="reveal">
              <div className="eyebrow flex items-center gap-3 text-[#d09b30]"><span className="h-px w-9 bg-[#c89532]" /> 09 / Contact</div>
              <h2 className="mt-7 max-w-[560px] font-display text-[clamp(3rem,6vw,6.8rem)] font-semibold leading-[.87] tracking-[-.08em]">Bring us<br />the <span className="text-[#d09b30]">brief.</span></h2>
              <p className="mt-8 max-w-[430px] text-[15px] leading-7 text-[#aca49a]">Tell us the material, the requirement and where it needs to go. The first step is a clear conversation.</p>
              <div className="mt-10 flex flex-col items-start gap-4">
                <a href="mailto:enquiries@mineralsupply.co" className="flex items-center gap-3 text-sm text-[#d8d1c7] hover:text-[#d09b30]" data-testid="link-email"><FileText size={16} className="text-[#d09b30]" /> enquiries@mineralsupply.co</a>
                <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-[#d8d1c7] hover:text-[#d09b30]" data-testid="link-whatsapp"><MessageCircle size={16} className="text-[#d09b30]" /> Continue on WhatsApp</a>
              </div>
            </div>
            <form onSubmit={submitEnquiry} className="reveal reveal-delay-1 border border-[#4a443b] bg-[#211f1b] p-6 sm:p-8" aria-label="Business enquiry form">
              {submitted ? (
                <div className="flex min-h-[390px] flex-col items-start justify-center">
                  <span className="flex h-12 w-12 items-center justify-center bg-[#c89532] text-[#211f1b]"><Check size={22} /></span>
                  <span className="eyebrow mt-8 text-[#d09b30]">Enquiry received</span>
                  <h3 className="mt-4 max-w-[430px] font-display text-4xl font-semibold leading-none tracking-[-.06em]">Thank you. The next step is a conversation.</h3>
                  <p className="mt-5 max-w-[400px] text-sm leading-6 text-[#aaa196]">Your request has been captured in this frontend demonstration. Use WhatsApp or email for a direct business conversation.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-8 border-b border-[#c89532] pb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#d09b30]" data-testid="button-new-enquiry">Send another enquiry</button>
                </div>
              ) : (
                <>
                  <div className="mb-8 flex items-center justify-between border-b border-[#4a443b] pb-5">
                    <span className="eyebrow text-[#d09b30]">Requirement form</span>
                    <span className="font-mono-custom text-[10px] text-[#82796e]">MS / 09</span>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block"><span className="eyebrow text-[#8f877c]">Name</span><input required name="name" type="text" placeholder="Your name" className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]" data-testid="input-name" /></label>
                    <label className="block"><span className="eyebrow text-[#8f877c]">Company</span><input required name="company" type="text" placeholder="Company name" className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]" data-testid="input-company" /></label>
                    <label className="block sm:col-span-2"><span className="eyebrow text-[#8f877c]">Work email</span><input required name="email" type="email" placeholder="name@company.com" className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]" data-testid="input-email" /></label>
                    <label className="block sm:col-span-2"><span className="eyebrow text-[#8f877c]">What are you sourcing?</span><textarea required name="message" value={enquiry} onChange={(event) => setEnquiry(event.target.value)} rows={4} placeholder="Material, specification, destination, timing..." className="mt-3 w-full resize-none border-b border-[#5a5145] bg-transparent py-3 text-sm leading-6 text-[#f1ede5] placeholder:text-[#70685e] outline-none transition-colors focus:border-[#d09b30]" data-testid="textarea-requirement" /></label>
                  </div>
                  <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <p className="max-w-[260px] text-[11px] leading-5 text-[#81796f]">We use your details to respond to this business enquiry.</p>
                    <button type="submit" className="line-button flex items-center justify-center gap-3 bg-[#c89532] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#211f1b] hover:bg-[#e2b04c]" data-testid="button-submit-enquiry">Send enquiry <ArrowUpRight size={15} /></button>
                  </div>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#37332d] bg-[#181715] px-5 pb-10 pt-7 text-[#f1ede5] lg:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <a href="#home" onClick={() => scrollTo('home')} className="flex items-center gap-3" data-testid="link-footer-logo">
              <span className="flex h-8 w-8 items-center justify-center border border-[#c89532] font-display text-sm font-bold text-[#d09b30]">M</span>
              <span className="font-display text-sm font-bold uppercase tracking-[.16em]">Qawe Investment Company Limited</span>
            </a>
            <p className="mt-4 text-xs text-[#827a6f]">Sourcing-led. Operationally grounded. Clear about the route.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-semibold uppercase tracking-[.13em] text-[#aaa197]">
            <button onClick={downloadBrief} className="flex items-center gap-2 hover:text-[#d09b30]" data-testid="button-footer-download"><Download size={13} /> Capability brief</button>
            <a href="mailto:enquiries@mineralsupply.co" className="hover:text-[#d09b30]" data-testid="link-footer-email">Email us</a>
            <a href={waHref} target="_blank" rel="noreferrer" className="hover:text-[#d09b30]" data-testid="link-footer-whatsapp">WhatsApp</a>
          </div>
        </div>
        <div className="mx-auto mt-9 flex max-w-[1280px] justify-between border-t border-[#37332d] pt-5 font-mono-custom text-[9px] uppercase tracking-[.13em] text-[#6f685e]">
          <span>© Qawe Investment Company Limited</span><span>Material / moved with clarity</span>
        </div>
      </footer>

      {chatOpen && (
        <div id="qawe-direct-chat" className="chat-panel fixed bottom-[8.5rem] right-5 z-40 flex w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden border border-[#5a5145] bg-[#211f1b] text-[#f1ede5] shadow-[0_24px_80px_rgba(0,0,0,.35)]" role="dialog" aria-label="Qawe direct chat">
          <div className="flex items-center justify-between border-b border-[#4a443b] px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-[#c89532] text-[#d09b30]"><Bot size={16} strokeWidth={1.5} /></span>
              <div>
                <p className="font-display text-sm font-semibold tracking-[-.02em]">Qawe direct</p>
                <p className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#8f877c]">Direct answers · No waiting</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="flex h-8 w-8 items-center justify-center border border-[#5a5145] text-[#bab2a7] hover:border-[#d09b30] hover:text-[#d09b30]" aria-label="Close chat" data-testid="button-close-chat"><X size={16} /></button>
          </div>

          <div className="chat-scrollbar flex max-h-[310px] flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {chatMessages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] border px-3 py-2.5 text-[12px] leading-5 ${message.role === 'user' ? 'border-[#a87820] bg-[#c89532] text-[#211f1b]' : 'border-[#4a443b] bg-[#181715] text-[#d5cec3]'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#4a443b] px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {[
                ['What do you supply?', 'What commodities do you supply?'],
                ['How does delivery work?', 'How does your delivery process work?'],
                ['Start an enquiry', 'I want to start an enquiry'],
              ].map(([label, prompt]) => (
                <button key={label} onClick={() => sendChatMessage(prompt)} className="border border-[#5a5145] px-2.5 py-1.5 font-mono-custom text-[9px] uppercase tracking-[.08em] text-[#c6bfb4] transition-colors hover:border-[#d09b30] hover:text-[#d09b30]" data-testid={`button-chat-prompt-${label.toLowerCase().replaceAll(' ', '-')}`}>
                  {label}
                </button>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="flex items-center gap-2 border-b border-[#5a5145]">
              <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} type="text" placeholder="Ask a direct question..." className="min-w-0 flex-1 bg-transparent py-2 text-[12px] text-[#f1ede5] placeholder:text-[#70685e] outline-none" aria-label="Chat message" data-testid="input-chat-message" />
              <button type="submit" className="flex h-8 w-8 shrink-0 items-center justify-center text-[#d09b30] transition-colors hover:text-[#f1ede5]" aria-label="Send chat message" data-testid="button-send-chat"><Send size={15} /></button>
            </form>
            <p className="mt-3 font-mono-custom text-[9px] uppercase tracking-[.09em] text-[#70685e]">Website guidance only · Connect with the team for a quote</p>
          </div>
        </div>
      )}

      <button onClick={() => setChatOpen((value) => !value)} className="fixed bottom-20 right-5 z-30 flex items-center gap-2 border border-[#211f1b] bg-[#f1ede5] px-4 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#211f1b] shadow-lg transition-transform hover:-translate-y-1" aria-expanded={chatOpen} aria-controls="qawe-direct-chat" data-testid="button-chat-toggle">
        {chatOpen ? <X size={15} /> : <Bot size={15} />} {chatOpen ? 'Close chat' : 'Ask QAWE'}
      </button>

      <a href={waHref} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 flex items-center gap-2 border border-[#211f1b] bg-[#c89532] px-4 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#211f1b] shadow-lg transition-transform hover:-translate-y-1" data-testid="link-floating-whatsapp">
        <MessageCircle size={15} /> WhatsApp
      </a>

      {modalOpen && (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#12110f]/80 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
          <div className="relative max-h-[90vh] w-full max-w-[620px] overflow-auto border border-[#5a5145] bg-[#211f1b] p-6 text-[#f1ede5] sm:p-9">
            <button onClick={() => setModalOpen(false)} className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-[#5a5145] text-[#bab2a7] hover:border-[#d09b30] hover:text-[#d09b30]" aria-label="Close enquiry dialog" data-testid="button-close-enquiry"><X size={18} /></button>
            <span className="eyebrow text-[#d09b30]">Direct conversation</span>
            <h2 id="enquiry-title" className="mt-5 max-w-[470px] font-display text-4xl font-semibold leading-[.93] tracking-[-.06em]">Tell us what needs to move.</h2>
            <form onSubmit={(event) => { submitEnquiry(event); setModalOpen(false); scrollTo('contact'); }} className="mt-8 grid gap-5">
              <label><span className="eyebrow text-[#8f877c]">Work email</span><input required type="email" placeholder="name@company.com" className="mt-3 w-full border-b border-[#5a5145] bg-transparent py-3 text-sm text-[#f1ede5] placeholder:text-[#70685e] outline-none focus:border-[#d09b30]" data-testid="modal-input-email" /></label>
              <label><span className="eyebrow text-[#8f877c]">Requirement</span><textarea required value={enquiry} onChange={(event) => setEnquiry(event.target.value)} rows={4} placeholder="Material, destination, timing..." className="mt-3 w-full resize-none border-b border-[#5a5145] bg-transparent py-3 text-sm leading-6 text-[#f1ede5] placeholder:text-[#70685e] outline-none focus:border-[#d09b30]" data-testid="modal-textarea-requirement" /></label>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
                <span className="text-[11px] leading-5 text-[#81796f]">Or use <a href={waHref} target="_blank" rel="noreferrer" className="text-[#d09b30] underline underline-offset-4" data-testid="link-modal-whatsapp">WhatsApp</a>.</span>
                <button type="submit" className="flex items-center gap-3 bg-[#c89532] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#211f1b] hover:bg-[#e2b04c]" data-testid="button-modal-submit">Send enquiry <ArrowUpRight size={15} /></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
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

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default Root;