import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, title: 'Palestra Corporativa', category: 'Eventos', size: 'large' },
  { id: 2, title: 'Workshop de Liderança', category: 'Workshops', size: 'small' },
  { id: 3, title: 'Congresso Nacional', category: 'Congressos', size: 'small' },
  { id: 4, title: 'Mentoria em Grupo', category: 'Mentorias', size: 'medium' },
  { id: 5, title: 'Evento Empresarial', category: 'Eventos', size: 'medium' },
  { id: 6, title: 'Treinamento Executivo', category: 'Workshops', size: 'small' },
  { id: 7, title: 'Palestra Motivacional', category: 'Eventos', size: 'small' },
  { id: 8, title: 'Conferência de Líderes', category: 'Congressos', size: 'medium' },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate the CTA card
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Animate gallery items
      const items = gridRef.current?.children;
      if (!items) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-1 row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <section id="galeria" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-xs font-heading tracking-widest text-primary border border-primary/30 rounded-full mb-4">
            GALERIA
          </span>
          <h2 className="section-heading mb-4">Momentos Marcantes</h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Confira alguns dos eventos e palestras onde Andréa compartilhou sua mensagem transformadora
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left side - CTA Card */}
          <div ref={cardRef} className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="glass-card p-8 rounded-2xl neon-border relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
              
              <span className="text-xs font-heading tracking-widest text-primary/80 uppercase">
                Convite
              </span>
              
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-4 mb-4 leading-tight">
                Quer transformar a forma como sua equipe aprende e evolui?
              </h3>
              
              <p className="text-muted-foreground font-body mb-6">
                Junte-se às empresas que já transformaram seus resultados com palestras impactantes.
              </p>
              
              <a
                href="#contato"
                className="btn-neon inline-flex items-center gap-2 group"
              >
                <span>Entre em contato</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right side - Photo Grid */}
          <div className="lg:col-span-8">
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[140px]"
            >
              {galleryItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer ${getSizeClasses(item.size)}`}
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
                  
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-3 left-3 w-8 h-8 border border-primary/40 rounded-full" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 bg-primary/30 rounded-full" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                      <span className="text-lg md:text-2xl font-heading font-bold text-primary">
                        {item.id}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-heading font-semibold text-foreground mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <span className="text-xs text-muted-foreground font-body">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                  
                  {/* Border effect */}
                  <div className="absolute inset-0 border border-glass-border group-hover:border-primary/50 rounded-xl transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-4xl mx-4"
          >
            <div className="aspect-[16/9] rounded-2xl overflow-hidden glass-card neon-glow bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-6">
                  <span className="text-4xl font-heading font-bold text-primary">
                    {galleryItems[currentIndex].id}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                  {galleryItems[currentIndex].title}
                </h3>
                <span className="text-lg text-muted-foreground font-body">
                  {galleryItems[currentIndex].category}
                </span>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
