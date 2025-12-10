import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, title: 'Palestra Corporativa', category: 'Eventos', color: 'from-primary/40 to-accent/40' },
  { id: 2, title: 'Workshop de Liderança', category: 'Workshops', color: 'from-secondary/40 to-primary/40' },
  { id: 3, title: 'Congresso Nacional', category: 'Congressos', color: 'from-accent/40 to-secondary/40' },
  { id: 4, title: 'Mentoria em Grupo', category: 'Mentorias', color: 'from-primary/40 to-secondary/40' },
  { id: 5, title: 'Evento Empresarial', category: 'Eventos', color: 'from-secondary/40 to-accent/40' },
  { id: 6, title: 'Treinamento Executivo', category: 'Workshops', color: 'from-accent/40 to-primary/40' },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.children;
      if (!items) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
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

  return (
    <section id="galeria" ref={sectionRef} className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-xs font-heading tracking-widest text-primary border border-primary/30 rounded-full mb-4">
            GALERIA
          </span>
          <h2 className="section-heading mb-4">Momentos Marcantes</h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Confira alguns dos eventos e palestras onde Andréa compartilhou sua mensagem transformadora
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
              
              {/* Glass overlay */}
              <div className="absolute inset-0 glass-card opacity-60" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {item.id}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <span className="text-sm text-muted-foreground font-body">
                  {item.category}
                </span>
              </div>

              {/* Hover effects */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-all duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 neon-glow rounded-2xl" />
            </div>
          ))}
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
            <div className={`aspect-[16/9] rounded-2xl overflow-hidden glass-card neon-glow bg-gradient-to-br ${galleryItems[currentIndex].color}`}>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6">
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
