import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import foto1 from '@/assets/gallery/foto1.jpeg';
import foto2 from '@/assets/gallery/foto2.jpeg';
import foto3 from '@/assets/gallery/foto3.jpeg';
import foto4 from '@/assets/gallery/foto4.jpeg';
import foto5 from '@/assets/gallery/foto5.jpeg';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, title: 'Grande Evento', category: 'Palco', size: 'large', image: foto5 },
  { id: 2, title: 'Domingão', category: 'TV', size: 'medium', image: foto4 },
  { id: 3, title: 'Momento Especial', category: 'Encontros', size: 'small', image: foto2 },
  { id: 4, title: 'Lançamento do Livro', category: 'Eventos', size: 'large', image: foto3 },
  { id: 5, title: 'Parceria', category: 'Networking', size: 'small', image: foto1 },
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

  const getSizeClasses = (size: string, index: number) => {
    // Mobile: simpler grid with alternating sizes
    // Desktop: original masonry layout
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-1 md:row-span-2 min-h-[180px] md:min-h-0';
      case 'medium':
        return 'col-span-1 row-span-1 md:row-span-2 min-h-[180px] md:min-h-0';
      default:
        return 'col-span-1 row-span-1 min-h-[180px] md:min-h-0';
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
          <div className="lg:col-span-8 order-first lg:order-last">
            <div
              ref={gridRef}
              className="grid grid-cols-2 gap-3 md:gap-4 auto-rows-auto md:auto-rows-[140px]"
            >
              {galleryItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer ${getSizeClasses(item.size, index)}`}
                >
                  {/* Real image */}
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm md:text-base font-heading font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <span className="text-xs text-primary font-body">
                      {item.category}
                    </span>
                  </div>

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
            <div className="aspect-[16/10] rounded-2xl overflow-hidden neon-glow">
              <img 
                src={galleryItems[currentIndex].image} 
                alt={galleryItems[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
                  {galleryItems[currentIndex].title}
                </h3>
                <span className="text-base text-primary font-body">
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
