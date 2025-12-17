import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import foto1 from '@/assets/gallery/foto1.jpeg';
import foto2 from '@/assets/gallery/foto2.jpeg';
import foto3 from '@/assets/gallery/foto3.jpeg';
import foto4 from '@/assets/gallery/foto4.jpeg';
import foto5 from '@/assets/gallery/foto5.jpeg';
import foto6 from '@/assets/gallery/foto6.jpeg';
import foto7 from '@/assets/gallery/foto7.jpeg';
import foto8 from '@/assets/gallery/foto8.jpeg';
import foto9 from '@/assets/gallery/foto9.jpeg';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, title: 'Grande Evento', category: 'Palco', image: foto5, gridClass: 'col-span-1 row-span-2 md:col-span-2 md:row-span-2' },
  { id: 2, title: 'Domingão com Krug', category: 'Evento', image: foto8, gridClass: 'col-span-1 row-span-2 md:col-span-1 md:row-span-2' },
  { id: 3, title: 'Momento Especial', category: 'Encontros', image: foto2, gridClass: 'col-span-1 row-span-2 md:col-span-1 md:row-span-1' },
  { id: 4, title: 'Lançamento do Livro', category: 'Eventos', image: foto3, gridClass: 'col-span-1 row-span-2 md:col-span-2 md:row-span-1' },
  { id: 5, title: 'Parceria', category: 'Networking', image: foto1, gridClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
  { id: 6, title: 'Palestra Ao Vivo', category: 'Palco', image: foto6, gridClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-2' },
  { id: 7, title: 'Think Tank AI', category: 'Premiação', image: foto7, gridClass: 'col-span-1 row-span-2 md:col-span-1 md:row-span-2' },
  { id: 8, title: 'Domingão', category: 'TV', image: foto4, gridClass: 'col-span-1 row-span-2 md:col-span-1 md:row-span-1' },
  { id: 9, title: 'A Vida Não Tá Fácil', category: 'Palestra', image: foto9, gridClass: 'col-span-2 row-span-1 md:col-span-3 md:row-span-1' },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

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

      // Pin the card on desktop only
      if (isDesktop && cardWrapperRef.current && gridRef.current) {
        const cardHeight = cardRef.current?.offsetHeight || 0;
        const gridHeight = gridRef.current.offsetHeight;
        
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 120px',
          end: () => `+=${gridHeight - cardHeight}`,
          pin: cardWrapperRef.current,
          pinSpacing: false,
        });
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

  const getGridClasses = (gridClass: string) => {
    return `min-h-[160px] md:min-h-0 ${gridClass}`;
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
          <div ref={cardWrapperRef} className="lg:col-span-4">
            <div ref={cardRef} className="glass-card p-8 rounded-2xl neon-border relative overflow-hidden">
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
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[180px]"
            >
              {galleryItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer ${getGridClasses(item.gridClass)}`}
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

          {/* Navigation - Mobile optimized */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-12 md:h-12 flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 active:scale-95"
          >
            <ChevronLeft className="w-10 h-10 md:w-8 md:h-8 drop-shadow-lg" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-12 md:h-12 flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 active:scale-95"
          >
            <ChevronRight className="w-10 h-10 md:w-8 md:h-8 drop-shadow-lg" />
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
