// src/components/ContactChallenge.tsx
"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const VISITOR_TYPES = [
  { id: "recruiter",   label: "🏢 채용 담당자",    sub: "좋은 사람 찾는 중" },
  { id: "developer",  label: "💻 개발자 동료",     sub: "같이 만들고 싶은 게 있어요" },
  { id: "curious",    label: "🤔 궁금한 방문자",   sub: "포트폴리오 구경 왔어요" },
  { id: "collaborator",label: "🚀 협업 제안",      sub: "같이 해보고 싶은 프로젝트가 있어요" },
];

const INTERESTS = [
  "AI / LLM 프로젝트",
  "Kubernetes / 클라우드",
  "풀스택 개발",
  "오픈소스 기여",
  "이 포트폴리오 만드는 법",
  "그냥 인사 하러 왔어요",
];

type Step = "type" | "interest" | "message" | "done";

export default function ContactChallenge() {
  const [step, setStep] = useState<Step>("type");
  const [visitorType, setVisitorType] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await supabase.from("visitor_messages").insert({
      visitor_type: visitorType,
      interest,
      message: message.trim(),
      email: email.trim() || null,
    });
    setLoading(false);
    setStep("done");
  };

  const progressPct = step === "type" ? 33 : step === "interest" ? 66 : step === "message" ? 90 : 100;

  return (
    <div style={{
      background: "var(--background-overlay)",
      border: "0.5px solid var(--neutral-alpha-medium)",
      borderRadius: 16, padding: "1.75rem",
      maxWidth: 520,
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{
          fontSize: 16, fontWeight: 500,
          color: "var(--neutral-on-background-strong)",
          marginBottom: 4,
        }}>
          안녕하세요, 잠깐 소개해 주시겠어요?
        </div>
        <div style={{ fontSize: 13, color: "var(--neutral-on-background-weak)" }}>
          30초면 충분해요. 맥락 있는 대화가 더 좋아서요.
        </div>
      </div>

      {/* 진행바 */}
      {step !== "done" && (
        <div style={{
          height: 3, background: "var(--neutral-alpha-weak)",
          borderRadius: 2, marginBottom: "1.5rem",
        }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: "var(--brand-solid-strong)",
            width: `${progressPct}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      )}

      {/* Step 1: 어떤 분이세요? */}
      {step === "type" && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12,
            color: "var(--neutral-on-background-medium)" }}>
            어떤 분이세요?
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {VISITOR_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => { setVisitorType(t.id); setStep("interest"); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                  background: "transparent",
                  border: "0.5px solid var(--neutral-alpha-medium)",
                  textAlign: "left", width: "100%",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--neutral-alpha-strong)";
                  e.currentTarget.style.background = "var(--neutral-alpha-weak)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "";
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 500,
                  color: "var(--neutral-on-background-strong)" }}>{t.label}</span>
                <span style={{ fontSize: 11, color: "var(--neutral-on-background-weak)" }}>
                  {t.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: 관심 분야 */}
      {step === "interest" && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12,
            color: "var(--neutral-on-background-medium)" }}>
            어떤 부분이 궁금하세요?
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {INTERESTS.map(i => (
              <button
                key={i}
                onClick={() => { setInterest(i); setStep("message"); }}
                style={{
                  padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                  background: "transparent",
                  border: interest === i
                    ? "1px solid var(--brand-solid-strong)"
                    : "0.5px solid var(--neutral-alpha-medium)",
                  fontSize: 12,
                  color: interest === i
                    ? "var(--brand-on-background-strong)"
                    : "var(--neutral-on-background-medium)",
                }}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: 메시지 */}
      {step === "message" && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4,
            color: "var(--neutral-on-background-medium)" }}>
            하고 싶은 말 한 마디
            <span style={{ fontWeight: 400, color: "var(--neutral-on-background-weak)", marginLeft: 6 }}>
              (선택 — 비워도 괜찮아요)
            </span>
          </div>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="안녕하세요! 포트폴리오 잘 봤어요 :)"
            maxLength={300}
            rows={3}
            style={{
              width: "100%", borderRadius: 10, padding: "10px 12px",
              border: "0.5px solid var(--neutral-alpha-medium)",
              background: "var(--background-default)",
              color: "var(--neutral-on-background-strong)",
              fontSize: 13, lineHeight: 1.6, resize: "vertical",
              outline: "none", marginBottom: 12,
              fontFamily: "inherit",
            }}
          />
          <div style={{ fontSize: 12, color: "var(--neutral-on-background-weak)", marginBottom: 10 }}>
            이메일 남기면 답장 드릴게요
            <span style={{ marginLeft: 6 }}>(선택)</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: "100%", borderRadius: 10, padding: "9px 12px",
              border: "0.5px solid var(--neutral-alpha-medium)",
              background: "var(--background-default)",
              color: "var(--neutral-on-background-strong)",
              fontSize: 13, outline: "none", marginBottom: 16,
              fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setStep("interest")}
              style={{
                padding: "8px 18px", borderRadius: 10, cursor: "pointer",
                background: "transparent",
                border: "0.5px solid var(--neutral-alpha-medium)",
                fontSize: 13, color: "var(--neutral-on-background-weak)",
              }}
            >
              ← 뒤로
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                flex: 1, padding: "9px 18px", borderRadius: 10, cursor: "pointer",
                background: "var(--brand-solid-strong)",
                border: "none", fontSize: 13, fontWeight: 500,
                color: "#fff", opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "전송 중..." : "전달하기 →"}
            </button>
          </div>
        </div>
      )}

      {/* Done */}
      {step === "done" && (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
          <div style={{ fontSize: 15, fontWeight: 500,
            color: "var(--neutral-on-background-strong)", marginBottom: 8 }}>
            감사합니다!
          </div>
          <div style={{ fontSize: 13, color: "var(--neutral-on-background-weak)", lineHeight: 1.7 }}>
            소중한 메시지 잘 받았어요.<br />
            {email ? "이메일로 꼭 답장 드릴게요 :)" : "언제든지 doge@kbfg.com 으로도 연락 주세요."}
          </div>
        </div>
      )}
    </div>
  );
}