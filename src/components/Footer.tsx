const Footer = () => {
  return (
    <footer className="bg-foreground py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-display text-2xl text-primary-foreground mb-2">
          L'Auberge <span className="italic font-normal">des Sources</span>
        </p>
        <p className="font-body text-primary-foreground/50 text-sm font-light">
          15 Rue de Chaintréauville, 77140 Saint-Pierre-lès-Nemours
        </p>
        <p className="font-body text-primary-foreground/50 text-sm font-light mt-1">
          01 64 29 11 40
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
