import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultSiteContent, mergeSiteContent, type SiteContent } from "@/lib/siteDefaults";

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    let mounted = true;

    supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (mounted && data?.data) setContent(mergeSiteContent(data.data));
      });

    const channel = supabase.channel("site_content_changes");
    channel
      .on(
        "postgres_changes" as any,
        { event: "*", schema: "public", table: "site_content" },
        (payload: any) => {
          if (payload.new?.data) setContent(mergeSiteContent(payload.new.data));
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return content;
}
