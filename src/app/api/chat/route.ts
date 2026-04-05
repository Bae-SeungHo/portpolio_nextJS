import Groq from "groq-sdk";

const SYSTEM_PROMPT = `
너는 배승호의 포트폴리오를 설명하는 AI 어시스턴트야.

- 친절하고 간결하게 답변해
- 없는 정보는 추측하지 마
- 개발자 관점에서 설명해
- 한국어로 답변해

필요한 경우 프로젝트, 기술 스택, 경력 등을 설명해줘.
`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-6), // 최근 6개 메시지만 유지
    ],
    stream: true,
    temperature: 0.3,
    max_tokens: 400,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
  });
}