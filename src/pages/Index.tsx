import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BookSection from '@/components/BookSection';
import BrandCarousel from '@/components/BrandCarousel';
import Gallery from '@/components/Gallery';
import Timeline from '@/components/Timeline';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Andréa Krug | Palestrante, Escritora e Mentora</title>
        <meta
          name="description"
          content="Andréa Krug - Palestrante motivacional, autora do bestseller 'Vai Encarar?' e mentora de líderes. Transformando vidas através da coragem e ação."
        />
        <meta
          name="keywords"
          content="Andréa Krug, palestrante, motivacional, vai encarar, livro, mentoria, liderança, desenvolvimento pessoal"
        />
        <meta property="og:title" content="Andréa Krug | Palestrante, Escritora e Mentora" />
        <meta
          property="og:description"
          content="Transformando vidas através da coragem, da ação e da reinvenção pessoal. Conheça o livro 'Vai Encarar?'"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <link rel="canonical" href="https://andreakrug.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Andréa Krug",
            jobTitle: "Palestrante e Escritora",
            description: "Palestrante motivacional e autora do bestseller 'Vai Encarar?'",
            url: "https://andreakrug.com",
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <BookSection />
        <BrandCarousel />
        <Gallery />
        <Timeline />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
};

export default Index;
