import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: '2010',
    title: 'Início da Jornada',
    description: 'Começou sua carreira como palestrante motivacional após superar grandes desafios pessoais.',
  },
  {
    year: '2015',
    title: 'Primeiro Grande Evento',
    description: 'Palestrante principal em um congresso com mais de 5.000 participantes.',
  },
  {
    year: '2018',
    title: 'Mentoria Executiva',
    description: 'Lançou programa de mentoria para executivos e líderes empresariais.',
  },
  {
    year: '2021',
    title: 'Publicação do Livro',
    description: '"Vai Encarar?" se torna bestseller nacional com milhares de cópias vendidas.',
  },
  {
    year: '2024',
    title: 'Expansão Internacional',
    description: 'Palestras e workshops em diversos países da América Latina e Europa.',
  },
];

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (!items) return;

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
          }
        );
      });

      // Animate the line
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-xs font-heading tracking-widest text-primary border border-primary/30 rounded-full mb-4">
            TRAJETÓRIA
          </span>
          <h2 className="section-heading mb-4">Sobre Andréa Krug</h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Uma jornada de transformação, superação e impacto positivo na vida de milhares de pessoas
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary origin-top" />

          {timelineEvents.map((event, index) => (
            <div
              key={event.year}
              className={`timeline-item relative flex items-start gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-1.5">
                <div className="w-full h-full rounded-full bg-primary animate-pulse-glow" />
                <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
              </div>

              {/* Content card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}
              >
                <div className="glass-card p-6 rounded-2xl hover:neon-border transition-all duration-300 group">
                  <span className="inline-block px-3 py-1 text-xs font-heading font-bold text-primary bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
