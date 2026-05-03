import { motion } from "framer-motion";
import { Phone, MapPin, Star } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const c = useSiteContent();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={c.photos.hero}
          alt="L'Auberge des Sources - Salle de restaurant"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-auberge-gold tracking-[0.3em] uppercase text-sm mb-6"
        >
          {c.heroTagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-primary-foreground mb-6 leading-tight"
        >
          {c.heroTitleLine1}
          <br />
          <span className="italic font-normal">{c.heroTitleLine2}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-1 mb-8"
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < 5 ? "fill-auberge-gold text-auberge-gold" : "text-auberge-stone"}`}
            />
          ))}
          <span className="text-primary-foreground/80 ml-2 font-body text-sm">
            4,7/5 — 475 avis
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          {c.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={`tel:${c.phoneHref}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-auberge-burgundy text-primary-foreground font-body tracking-wider uppercase text-sm rounded-sm hover:bg-auberge-burgundy/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Réserver — {c.phone}
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(c.addressLine1 + " " + c.addressLine2)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-body tracking-wider uppercase text-sm rounded-sm hover:bg-primary-foreground/10 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Itinéraire
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary-foreground/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
