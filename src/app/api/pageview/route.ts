import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function POST(req: Request) {
  const { path } = await req.json();
  const userAgent = req.headers.get("user-agent") || "";
  const referrer = req.headers.get("referer") || "";

  // 봇 필터링
  const isBot = /bot|crawler|spider|crawl|headless/i.test(userAgent);
  if (isBot) return Response.json({ ok: false });

  await supabase.from("page_views").insert({ path, user_agent: userAgent, referrer });
  return Response.json({ ok: true });
}

export async function GET() {
  const { data } = await supabase.from("total_views").select("total").single();
  return Response.json({ total: data?.total ?? 0 });
}