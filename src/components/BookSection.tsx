import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bookImage from '@/assets/vai_encarar.jpeg';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  decimals?: number;
}

const Counter = ({ end, suffix = '', decimals = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el || hasAnimated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        
        gsap.to({ value: 0 }, {
          value: end,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            setCount(this.targets()[0].value);
          }
        });
      }
    });

    return () => trigger.kill();
  }, [end]);

  return (
    <div ref={counterRef} className="text-2xl md:text-3xl font-heading font-bold text-primary neon-text">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </div>
  );
};

const BookSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Book floating animation
      gsap.to(bookRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scroll-triggered animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        bookRef.current,
        { x: -100, opacity: 0, rotateY: -30 },
        { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          contentRef.current?.children || [],
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="livro"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      {/* Glowing orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Book mockup */}
          <div
            ref={bookRef}
            className="relative flex justify-center"
            style={{ perspective: '1000px' }}
          >
            <div className="relative group">
              {/* Book glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              
              {/* Book container */}
              <div className="relative glass-card p-6 rounded-2xl neon-glow">
                <img 
                  src={bookImage} 
                  alt="Andréa Krug segurando o livro Vai Encarar?" 
                  className="w-64 md:w-80 rounded-lg object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="text-center lg:text-left">
            <span className="inline-block px-4 py-1 text-xs font-heading tracking-widest text-secondary border border-secondary/30 rounded-full mb-6">
              BESTSELLER
            </span>

            <h2 className="section-heading mb-6">
              VAI ENCARAR?
            </h2>

            <p className="text-xl md:text-2xl text-foreground/90 font-body leading-relaxed mb-6">
              Um convite à coragem, à ação e à reinvenção pessoal.
            </p>

            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
              Descubra o poder transformador guiado por Andréa Krug. Este livro é um 
              chamado para você enfrentar seus medos, abraçar suas vulnerabilidades 
              e se tornar a melhor versão de si mesmo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#"
                className="btn-neon animate-pulse-glow"
              >
                Comprar Agora
              </a>
              <a
                href="#"
                className="px-8 py-4 rounded-xl font-heading font-semibold text-lg border border-glass-border text-foreground hover:bg-card/50 transition-all duration-300 backdrop-blur-sm"
              >
                Saiba Mais
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-glass-border">
              <div className="text-center">
                <Counter end={10} suffix="K+" />
                <div className="text-sm text-muted-foreground font-body mt-1">
                  Leitores
                </div>
              </div>
              <div className="text-center">
                <Counter end={4.9} decimals={1} />
                <div className="text-sm text-muted-foreground font-body mt-1">
                  Avaliação
                </div>
              </div>
              <div className="text-center">
                <Counter end={50} suffix="+" />
                <div className="text-sm text-muted-foreground font-body mt-1">
                  Palestras
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
