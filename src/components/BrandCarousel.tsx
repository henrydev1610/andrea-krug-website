import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'TechCorp', initials: 'TC' },
  { name: 'Innovate', initials: 'IN' },
  { name: 'FutureX', initials: 'FX' },
  { name: 'GlobalTech', initials: 'GT' },
  { name: 'NextGen', initials: 'NG' },
  { name: 'Synergy', initials: 'SY' },
  { name: 'Elevate', initials: 'EL' },
  { name: 'Quantum', initials: 'QT' },
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
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              <div className="glass-card w-32 h-20 md:w-40 md:h-24 flex items-center justify-center rounded-xl hover:neon-border transition-all duration-300 group cursor-pointer">
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-heading font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {brand.initials}
                  </span>
                  <p className="text-xs text-muted-foreground/60 font-body mt-1 group-hover:text-muted-foreground transition-colors duration-300">
                    {brand.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              <div className="glass-card w-32 h-20 md:w-40 md:h-24 flex items-center justify-center rounded-xl hover:neon-border transition-all duration-300 group cursor-pointer">
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-heading font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {brand.initials}
                  </span>
                  <p className="text-xs text-muted-foreground/60 font-body mt-1 group-hover:text-muted-foreground transition-colors duration-300">
                    {brand.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
