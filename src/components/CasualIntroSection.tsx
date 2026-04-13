// src/components/CasualIntroSection.tsx
// 기존 코드에서 grid 부분만 확인 — minmax 값이 너무 크면 세로로 쌓임
"use client";

const CARDS = [
  { emoji: "⚙️", label: "요즘 만들고 있는 것",
    content: "AI 에이전트들이 서로 일을 나눠서 처리하는 자동화 시스템.\n아직 삽질 중이지만 조금씩 되고 있어요.", accent: "#378ADD" },
  { emoji: "📖", label: "최근 꽂힌 주제",
    content: "LLM을 프로덕션에서 안정적으로 운영하는 방법.\n만드는 것보다 유지하는 게 훨씬 어렵더라고요.", accent: "#7F77DD" },
  { emoji: "☕", label: "없으면 안 되는 것",
    content: "아이스 아메리카노. 코드가 잘 안 풀릴 때 커피 한 모금이면\n대부분 해결됩니다 (거짓말 아님).", accent: "#D85A30" },
  { emoji: "🤔", label: "요즘 드는 생각",
    content: "AI 도구를 잘 쓰는 게 이제 필수 역량이 된 것 같아요.\n어떻게 더 잘 활용할 수 있을지 계속 실험 중입니다.", accent: "#1D9E75" },
  { emoji: "🎯", label: "다음 목표",
    content: "내가 매일 쓰는 오픈소스에 PR을 한 번 올려보는 것.\n작더라도 직접 기여해보고 싶어요.", accent: "#EF9F27" },
  { emoji: "🌱", label: "천천히 배우는 중",
    content: "더 나은 코드를 작성하는 방법.\n기능이 돌아가는 것과 잘 만든 것은 다른 것 같더라고요.", accent: "#639922" },
];

export default function CasualIntroSection() {
  return (
    <div style={{ width: "100%" }}>
      <p style={{
        fontSize: 12, color: "var(--neutral-on-background-weak)",
        marginBottom: 16, letterSpacing: "0.3px", textTransform: "uppercase",
        margin: "0 0 16px 0",
      }}>
        요즘의 나
      </p>

      {/* ↓ minmax를 180px로 낮춰서 3열 이상 가로 배치 가능하게 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 10,
          width: "100%",
        }}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            style={{
              padding: "1rem 1.1rem",
              borderRadius: 12,
              background: "var(--background-overlay)",
              borderTopWidth: "0.5px",
              borderRightWidth: "0.5px",
              borderBottomWidth: "0.5px",
              borderLeftWidth: 2,
              borderStyle: "solid",
              borderTopColor: "var(--neutral-alpha-medium)",
              borderRightColor: "var(--neutral-alpha-medium)",
              borderBottomColor: "var(--neutral-alpha-medium)",
              borderLeftColor: card.accent,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
              <span style={{ fontSize: 15 }}>{card.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: card.accent }}>
                {card.label}
              </span>
            </div>
            <p style={{
              fontSize: 13,
              color: "var(--neutral-on-background-medium)",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
              margin: 0,
            }}>
              {card.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}