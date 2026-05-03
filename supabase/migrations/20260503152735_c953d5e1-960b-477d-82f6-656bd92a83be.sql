-- Site content singleton table
CREATE TABLE public.site_content (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT singleton CHECK (id = 1)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site content"
  ON public.site_content FOR SELECT
  USING (true);

-- No insert/update/delete policies => only service_role (edge functions) can write

-- Seed singleton row
INSERT INTO public.site_content (id, data) VALUES (1, '{}'::jsonb);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
ALTER TABLE public.site_content REPLICA IDENTITY FULL;

-- Storage bucket for admin-uploaded photos
INSERT INTO storage.buckets (id, name, public) VALUES ('site-photos', 'site-photos', true);

CREATE POLICY "Public read site-photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-photos');
-- writes restricted to service_role (edge function)
