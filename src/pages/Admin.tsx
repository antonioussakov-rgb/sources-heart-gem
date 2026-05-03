import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { defaultSiteContent, mergeSiteContent, type SiteContent } from "@/lib/siteDefaults";
import { Loader2, Save, Upload, Trash2, Plus, LogOut } from "lucide-react";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-update`;
const PASS_KEY = "auberge_admin_pw";

async function callFn(password: string, body: any) {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": password,
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "Erreur");
  return json;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const s = r.result as string;
      resolve(s.split(",")[1]);
    };
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

const Admin = () => {
  const [password, setPassword] = useState(() => sessionStorage.getItem(PASS_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Admin — L'Auberge des Sources";
    if (password) tryLogin(password, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authed) return;
    supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.data) setContent(mergeSiteContent(data.data));
      });
  }, [authed]);

  async function tryLogin(pw: string, silent = false) {
    setLoading(true);
    try {
      await callFn(pw, { action: "verify" });
      sessionStorage.setItem(PASS_KEY, pw);
      setAuthed(true);
      if (!silent) toast.success("Connecté");
    } catch (e: any) {
      if (!silent) toast.error(e.message || "Mot de passe incorrect");
      sessionStorage.removeItem(PASS_KEY);
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    setSaving(true);
    try {
      await callFn(password, { action: "update", data: content });
      toast.success("Modifications enregistrées");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function uploadAndSet(file: File, setter: (url: string) => void) {
    try {
      const contentBase64 = await fileToBase64(file);
      const { url } = await callFn(password, {
        action: "upload",
        filename: file.name,
        contentType: file.type,
        contentBase64,
      });
      setter(url);
      toast.success("Photo téléversée");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm space-y-4 border rounded-lg p-8 shadow-sm">
          <h1 className="font-display text-2xl text-center">Administration</h1>
          <p className="text-sm text-muted-foreground text-center">
            L'Auberge des Sources
          </p>
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && tryLogin(password)}
          />
          <Button onClick={() => tryLogin(password)} disabled={loading || !password} className="w-full">
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl">Administration</h1>
            <p className="text-sm text-muted-foreground">Modifications visibles en direct sur le site</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                sessionStorage.removeItem(PASS_KEY);
                setAuthed(false);
                setPassword("");
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Déconnexion
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Enregistrer
            </Button>
          </div>
        </div>

        {/* Coordonnées */}
        <Section title="Coordonnées">
          <Field label="Téléphone (affiché)">
            <Input value={content.phone} onChange={(e) => setContent({ ...content, phone: e.target.value })} />
          </Field>
          <Field label="Téléphone (lien tel:, sans espaces)">
            <Input value={content.phoneHref} onChange={(e) => setContent({ ...content, phoneHref: e.target.value })} />
          </Field>
          <Field label="Adresse — ligne 1">
            <Input value={content.addressLine1} onChange={(e) => setContent({ ...content, addressLine1: e.target.value })} />
          </Field>
          <Field label="Adresse — ligne 2">
            <Input value={content.addressLine2} onChange={(e) => setContent({ ...content, addressLine2: e.target.value })} />
          </Field>
        </Section>

        {/* Horaires */}
        <Section title="Horaires d'ouverture">
          {content.hours.map((h, i) => (
            <div key={i} className="grid grid-cols-[140px_1fr_auto] gap-2 items-center">
              <Input
                value={h.day}
                onChange={(e) => {
                  const arr = [...content.hours];
                  arr[i] = { ...arr[i], day: e.target.value };
                  setContent({ ...content, hours: arr });
                }}
              />
              <Input
                value={h.value}
                onChange={(e) => {
                  const arr = [...content.hours];
                  arr[i] = { ...arr[i], value: e.target.value };
                  setContent({ ...content, hours: arr });
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setContent({ ...content, hours: content.hours.filter((_, j) => j !== i) })}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setContent({ ...content, hours: [...content.hours, { day: "", value: "" }] })}
          >
            <Plus className="w-4 h-4 mr-1" /> Ajouter une ligne
          </Button>
        </Section>

        {/* Hero */}
        <Section title="Page d'accueil (Hero)">
          <Field label="Tagline (au-dessus du titre)">
            <Input value={content.heroTagline} onChange={(e) => setContent({ ...content, heroTagline: e.target.value })} />
          </Field>
          <Field label="Titre — ligne 1">
            <Input value={content.heroTitleLine1} onChange={(e) => setContent({ ...content, heroTitleLine1: e.target.value })} />
          </Field>
          <Field label="Titre — ligne 2 (italique)">
            <Input value={content.heroTitleLine2} onChange={(e) => setContent({ ...content, heroTitleLine2: e.target.value })} />
          </Field>
          <Field label="Sous-titre">
            <Textarea value={content.heroSubtitle} onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })} />
          </Field>
          <PhotoField
            label="Photo de fond (Hero)"
            url={content.photos.hero}
            onUpload={(f) => uploadAndSet(f, (url) => setContent({ ...content, photos: { ...content.photos, hero: url } }))}
          />
        </Section>

        {/* About */}
        <Section title="Section « Notre histoire »">
          <Field label="Tagline">
            <Input value={content.aboutTagline} onChange={(e) => setContent({ ...content, aboutTagline: e.target.value })} />
          </Field>
          <Field label="Titre — ligne 1">
            <Input value={content.aboutTitleLine1} onChange={(e) => setContent({ ...content, aboutTitleLine1: e.target.value })} />
          </Field>
          <Field label="Titre — ligne 2 (italique)">
            <Input value={content.aboutTitleLine2} onChange={(e) => setContent({ ...content, aboutTitleLine2: e.target.value })} />
          </Field>
          {content.aboutParagraphs.map((p, i) => (
            <Field key={i} label={`Paragraphe ${i + 1}`}>
              <div className="flex gap-2">
                <Textarea
                  value={p}
                  onChange={(e) => {
                    const arr = [...content.aboutParagraphs];
                    arr[i] = e.target.value;
                    setContent({ ...content, aboutParagraphs: arr });
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setContent({ ...content, aboutParagraphs: content.aboutParagraphs.filter((_, j) => j !== i) })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Field>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setContent({ ...content, aboutParagraphs: [...content.aboutParagraphs, ""] })}
          >
            <Plus className="w-4 h-4 mr-1" /> Ajouter un paragraphe
          </Button>
          <PhotoField
            label="Photo de la terrasse"
            url={content.photos.terrasse}
            onUpload={(f) => uploadAndSet(f, (url) => setContent({ ...content, photos: { ...content.photos, terrasse: url } }))}
          />
        </Section>

        {/* Dishes */}
        <Section title="Photos des plats">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {content.photos.dishes.map((d, i) => (
              <div key={i} className="border rounded-md p-3 space-y-2">
                <img src={d.src} alt={d.alt} className="w-full h-32 object-cover rounded" />
                <Input
                  placeholder="Légende"
                  value={d.alt}
                  onChange={(e) => {
                    const arr = [...content.photos.dishes];
                    arr[i] = { ...arr[i], alt: e.target.value };
                    setContent({ ...content, photos: { ...content.photos, dishes: arr } });
                  }}
                />
                <div className="flex gap-2">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f)
                          uploadAndSet(f, (url) => {
                            const arr = [...content.photos.dishes];
                            arr[i] = { ...arr[i], src: url };
                            setContent({ ...content, photos: { ...content.photos, dishes: arr } });
                          });
                      }}
                    />
                    <span className="inline-flex items-center justify-center w-full px-3 py-1.5 text-xs border rounded cursor-pointer hover:bg-accent">
                      <Upload className="w-3 h-3 mr-1" /> Remplacer
                    </span>
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const arr = content.photos.dishes.filter((_, j) => j !== i);
                      setContent({ ...content, photos: { ...content.photos, dishes: arr } });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f)
                  uploadAndSet(f, (url) => {
                    setContent({
                      ...content,
                      photos: { ...content.photos, dishes: [...content.photos.dishes, { src: url, alt: "Nouveau plat" }] },
                    });
                  });
              }}
            />
            <span className="inline-flex items-center px-3 py-2 text-sm border rounded cursor-pointer hover:bg-accent mt-2">
              <Plus className="w-4 h-4 mr-1" /> Ajouter une photo
            </span>
          </label>
        </Section>

        <div className="flex justify-end pb-12">
          <Button onClick={save} disabled={saving} size="lg">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer toutes les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="border rounded-lg p-6 space-y-4 bg-card">
    <h2 className="font-display text-xl">{title}</h2>
    {children}
  </section>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    {children}
  </div>
);

const PhotoField = ({
  label,
  url,
  onUpload,
}: {
  label: string;
  url: string;
  onUpload: (f: File) => void;
}) => (
  <Field label={label}>
    <div className="flex items-center gap-4">
      <img src={url} alt="" className="w-32 h-20 object-cover rounded border" />
      <label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload(f);
          }}
        />
        <span className="inline-flex items-center px-3 py-2 text-sm border rounded cursor-pointer hover:bg-accent">
          <Upload className="w-4 h-4 mr-1" /> Téléverser
        </span>
      </label>
    </div>
  </Field>
);

export default Admin;
