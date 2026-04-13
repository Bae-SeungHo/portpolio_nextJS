// src/components/ContactChallenge.tsx
"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const VISITOR_TYPES = [
  { id: "recruiter",    label: "🏢 채용 담당자",   sub: "좋은 사람 찾는 중" },
  { id: "developer",   label: "💻 개발자 동료",    sub: "같이 만들고 싶어요" },
  { id: "curious",     label: "🤔 궁금한 방문자",  sub: "구경 왔어요" },
  { id: "collaborator",label: "🚀 협업 제안",     sub: "같이 해보고 싶은 게 있어요" },
];

const INTERESTS = [
  "AI / LLM",
  "Kubernetes / 클라우드",
  "풀스택 개발",
  "이 포트폴리오 만드는 법",
  "오픈소스 기여",
  "그냥 인사",
];

type Step = "type" | "interest" | "message" | "done";

export default function ContactChallenge() {
  const [step, setStep] = useState<Step>("type");
  const [visitorType, setVisitorType] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const progressMap: Record<Step, number> = { type: 25, interest: 60, message: 90, done: 100 };

  const handleSubmit = async () => {
    setLoading(true);
    await supabase.from("visitor_messages").insert({
      visitor_type: visitorType,
      interest,
      message: message.trim() || null,
      email: email.trim() || null,
    });
    setLoading(false);
    setStep("done");
  };

  return (
    <div style={{
      background: "var(--background-overlay)",
      border: "0.5px solid var(--neutral-alpha-medium)",
      borderRadius: 16,
      padding: "1.75rem",
      maxWidth: 480,
    }}>
      <p style={{ fontSize: 16, fontWeight: 500, color: "var(--neutral-on-background-strong)", marginBottom: 4 }}>
        잠깐, 어떤 분이세요?
      </p>
      <p style={{ fontSize: 13, color: "var(--neutral-on-background-weak)", marginBottom: "1.25rem" }}>
        맥락 있는 대화가 더 좋아서요. 30초면 충분해요.
      </p>

      {step !== "done" && (
        <div style={{ height: 3, background: "var(--neutral-alpha-weak)", borderRadius: 2, marginBottom: "1.5rem" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: "var(--brand-solid-strong)",
            width: `${progressMap[step]}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      )}

      {step === "type" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {VISITOR_TYPES.map(t => (
            <button key={t.id} onClick={() => { setVisitorType(t.id); setStep("interest"); }} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", borderRadius: 10, cursor: "pointer",
              background: "transparent", border: "0.5px solid var(--neutral-alpha-medium)",
              textAlign: "left", width: "100%",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--neutral-alpha-weak)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--neutral-on-background-strong)" }}>{t.label}</span>
              <span style={{ fontSize: 11, color: "var(--neutral-on-background-weak)" }}>{t.sub}</span>
            </button>
          ))}
        </div>
      )}

      {step === "interest" && (
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--neutral-on-background-medium)", marginBottom: 12 }}>
            어떤 게 궁금하세요?
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {INTERESTS.map(i => (
              <button key={i} onClick={() => { setInterest(i); setStep("message"); }} style={{
                padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12,
                background: "transparent", border: "0.5px solid var(--neutral-alpha-medium)",
                color: "var(--neutral-on-background-medium)",
              }}>
                {i}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "message" && (
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--neutral-on-background-medium)", marginBottom: 8 }}>
            하고 싶은 말 <span style={{ fontWeight: 400, color: "var(--neutral-on-background-weak)" }}>(선택)</span>
          </p>
          <textarea
            value={message} onChange={e => setMessage(e.target.value)}
            placeholder="안녕하세요! 포트폴리오 잘 봤어요 :)"
            rows={3} maxLength={300}
            style={{
              width: "100%", borderRadius: 10, padding: "10px 12px",
              border: "0.5px solid var(--neutral-alpha-medium)",
              background: "var(--background-default)",
              color: "var(--neutral-on-background-strong)",
              fontSize: 13, lineHeight: 1.6, resize: "vertical", outline: "none",
              marginBottom: 10, fontFamily: "inherit",
            }}
          />
          <p style={{ fontSize: 12, color: "var(--neutral-on-background-weak)", marginBottom: 8 }}>
            이메일 남기면 답장 드릴게요 <span style={{ opacity: 0.6 }}>(선택)</span>
          </p>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: "100%", borderRadius: 10, padding: "9px 12px",
              border: "0.5px solid var(--neutral-alpha-medium)",
              background: "var(--background-default)",
              color: "var(--neutral-on-background-strong)",
              fontSize: 13, outline: "none", marginBottom: 14, fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep("interest")} style={{
              padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontSize: 13,
              background: "transparent", border: "0.5px solid var(--neutral-alpha-medium)",
              color: "var(--neutral-on-background-weak)",
            }}>← 뒤로</button>
            <button onClick={handleSubmit} disabled={loading} style={{
              flex: 1, padding: "9px 16px", borderRadius: 10, cursor: "pointer",
              background: "var(--brand-solid-strong)", border: "none",
              fontSize: 13, fontWeight: 500, color: "#fff", opacity: loading ? 0.6 : 1,
            }}>
              {loading ? "전송 중..." : "전달하기 →"}
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
          <p style={{ fontSize: 15, fontWeight: 500, color: "var(--neutral-on-background-strong)", marginBottom: 8 }}>
            감사합니다!
          </p>
          <p style={{ fontSize: 13, color: "var(--neutral-on-background-weak)", lineHeight: 1.7 }}>
            메시지 잘 받았어요.<br />
            {email ? "이메일로 꼭 답장 드릴게요 :)" : "언제든지 doge@kbfg.com 으로도 연락 주세요."}
          </p>
        </div>
      )}
    </div>
  );
}