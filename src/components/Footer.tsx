import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const c = useSiteContent();
  return (
    <footer className="bg-foreground py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-display text-2xl text-primary-foreground mb-2">
          L'Auberge <span className="italic font-normal">des Sources</span>
        </p>
        <p className="font-body text-primary-foreground/50 text-sm font-light">
          {c.addressLine1}, {c.addressLine2}
        </p>
        <p className="font-body text-primary-foreground/50 text-sm font-light mt-1">
          {c.phone}
        </p>
        <div className="w-12 h-px bg-auberge-gold/30 mx-auto my-6" />
        <p className="font-body text-primary-foreground/30 text-xs">
          © {new Date().getFullYear()} L'Auberge des Sources — Tous droits réservés
        </p>
      </div>
    </footer>
  );
};

export default Footer;
