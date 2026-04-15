import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Olivia T.",
    text: "Petite auberge de village comme on les aime. Une pépite à découvrir absolument. La cuisine est remarquable et l'ambiance chaleureuse.",
    rating: 5,
    date: "Novembre 2025",
    price: "30–40 €",
  },
  {
    name: "Nicolas M.",
    text: "Très très bon restaurant ! Service par la jeune Louna, adorable et attentionnée, et Anaïs, avec une connaissance exemplaire de son métier.",
    rating: 5,
    date: "Novembre 2025",
    price: "30–40 €",
  },
  {
    name: "A D",
    text: "Inadmissiblement bon ! Produits frais et de saison, plats variés et bien préparés, bonne sélection de vins.",
    rating: 5,
    date: "Mars 2025",
    price: "30–40 €",
  },
  {
    name: "Ruddy D.",
    text: "Première fois sur recommandation, quelle bonne surprise. Accueil très chaleureux, repas excellent des mises en bouches au café !",
    rating: 5,
    date: "Février 2025",
    price: "60–70 €",
  },
  {
    name: "Pascal G.",
    text: "Incroyable, magnifique, quel accueil ! Le feuilleté de St Marcellin, le cassoulet et les rognons étaient succulents. Tout était parfait !",
    rating: 5,
    date: "Novembre 2025",
    price: "30–40 €",
  },
  {
    name: "Murielle S.",
    text: "Un moment exceptionnel pour la Saint-Valentin, tant pour les papilles que pour la chaleur humaine et l'accueil exceptionnel.",
    rating: 5,
    date: "Février 2025",
    price: "50–60 €",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-24 md:py-32 px-6" id="avis">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-auberge-gold tracking-[0.3em] uppercase text-xs mb-4">
            Ce qu'ils en disent
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground">
            Nos <span className="italic font-normal">Avis</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-auberge-gold text-auberge-gold" />
            ))}
            <span className="text-muted-foreground ml-2 font-body">4,7/5 sur 475 avis Google</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card p-8 rounded-sm relative"
            >
              <Quote className="w-8 h-8 text-auberge-gold/30 absolute top-6 right-6" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-auberge-gold text-auberge-gold" />
                ))}
              </div>
              <p className="font-body text-foreground/80 font-light leading-relaxed mb-6 text-sm">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-sm text-foreground">{review.name}</p>
                  <p className="font-body text-muted-foreground text-xs">{review.date}</p>
                </div>
                <span className="font-body text-auberge-olive text-xs">{review.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
