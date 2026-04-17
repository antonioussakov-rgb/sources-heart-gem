import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Utensils } from "lucide-react";

const InfoSection = () => {
  return (
    <section className="py-24 md:py-32 bg-auberge-forest px-6" id="infos">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-auberge-gold tracking-[0.3em] uppercase text-xs mb-4">
            Venez nous voir
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-primary-foreground">
            Informations <span className="italic font-normal">Pratiques</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: MapPin,
              title: "Adresse",
              lines: ["15 Rue de Chaintréauville", "77140 Saint-Pierre-lès-Nemours"],
            },
            {
              icon: Phone,
              title: "Réservation",
              lines: ["01 64 29 11 40", "Réservation conseillée"],
            },
            {
              icon: Clock,
              title: "Horaires",
              lines: [
                "Lun : 09:00–14:00",
                "Mar – Mer : Fermé",
                "Jeu : 09:00–14:00",
                "Ven : 09:00–14:00 · 17:30–21:00",
                "Sam : 09:00–14:00 · 18:00–21:00",
                "Dim : 10:00–13:00",
              ],
            },
            {
              icon: Utensils,
              title: "Services",
              lines: ["Terrasse", "Cocktails · Menu enfant"],
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <item.icon className="w-6 h-6 text-auberge-gold mx-auto mb-4" />
              <h3 className="font-display text-lg text-primary-foreground mb-2">
                {item.title}
              </h3>
              {item.lines.map((line) => (
                <p key={line} className="font-body text-primary-foreground/60 text-sm font-light">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="tel:0164291140"
            className="inline-flex items-center gap-2 px-10 py-4 bg-auberge-burgundy text-primary-foreground font-body tracking-wider uppercase text-sm rounded-sm hover:bg-auberge-burgundy/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Réserver une table
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoSection;
