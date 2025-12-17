import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import brand logos
import martinsLogo from '@/assets/brands/martins.png';
import rpcLogo from '@/assets/brands/rpc.png';
import millsLogo from '@/assets/brands/mills.png';
import suzanoLogo from '@/assets/brands/suzano.png';
import globoLogo from '@/assets/brands/globo.png';
import playGamificationLogo from '@/assets/brands/play-gamification.webp';
import logo99 from '@/assets/brands/99.png';
import alpargatasLogo from '@/assets/brands/alpargatas.png';
import dhlLogo from '@/assets/brands/dhl.png';
import finiLogo from '@/assets/brands/fini.png';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'Martins', logo: martinsLogo },
  { name: 'RPC', logo: rpcLogo },
  { name: 'Mills', logo: millsLogo },
  { name: 'Suzano', logo: suzanoLogo },
  { name: 'Globo', logo: globoLogo },
  { name: 'Play Gamification', logo: playGamificationLogo },
  { name: '99', logo: logo99 },
  { name: 'Alpargatas', logo: alpargatasLogo },
  { name: 'DHL', logo: dhlLogo },
  { name: 'Fini', logo: finiLogo },
];

const BrandCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden">
      <div className="container mb-12">
        <div ref={titleRef} className="text-center">
          <span className="inline-block px-4 py-1 text-xs font-heading tracking-widest text-primary/70 border border-primary/20 rounded-full mb-4">
            PARCERIAS
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
            Empresas que Confiam
          </h2>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling content */}
        <div className="flex animate-scroll">
          {/* First set */}
          {brands.map((brand, index) => (
            <div
              key={`brand-1-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              <div className="glass-card w-36 h-24 md:w-44 md:h-28 flex items-center justify-center rounded-xl hover:neon-border transition-all duration-300 group cursor-pointer p-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              <div className="glass-card w-36 h-24 md:w-44 md:h-28 flex items-center justify-center rounded-xl hover:neon-border transition-all duration-300 group cursor-pointer p-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
