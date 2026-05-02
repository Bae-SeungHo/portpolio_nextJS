"use client";

const CARDS = [
  {
    emoji: "🏦",
    label: "빠르고 풍부한 실무 경험",
    content:
      "학부 과정 2년간 연구실과 외부 근로기관에서 근무하고\n25살에 AI 스타트업과 ETRI에서 인턴을 마친 뒤\n26살부터 현재까지 KB국민은행에서 AI 서비스를 개발·운영하고 있어요.",
    accent: "#378ADD",
    accentBg: "#E6F1FB",
  },
  {
    emoji: "🤖",
    label: "대규모 고객 핸들링 경험",
    content:
      "수백만 고객들이 사용하는 봇 시스템들을 운영하며 사용자 데이터를 분석하였고\n기존 Rule-based ML 챗봇을 Generative AI와 RAG 아키텍처로 고도화했어요.",
    accent: "#7F77DD",
    accentBg: "#EEEDFE",
  },
  {
    emoji: "🏆",
    label: "A Passionate Challenger",
    content:
      "목표가 생기면 악착같이 이루는 개발자에요.\n저를 꺽지 못하는 실패는 저를 더 강하게 합니다.",
    accent: "#EF9F27",
    accentBg: "#FAEEDA",
  },
  {
    emoji: "🎸",
    label: "커뮤니케이터",
    content:
      "주위 사람들과 좋은 관계를 유지하는것을 중요시하는 INFP 입니다.\n스터디 모임과 사내 밴드 동호회를 운영하고 있고 봉사활동과 사이드 프로젝트까지 꾸준하게 하고 있어요.\n(제 포지션은 일렉기타 입니다.)",
    accent: "#D85A30",
    accentBg: "#FAECE7",
  },
  {
    emoji: "🌱",
    label: "아슬아슬하게 20대",
    content:
      "젊은 아이디어와 에너지는 누구보다 넘칩니다.\n새로운 기술을 빠르게 흡수하고, 실무에 바로 적용하는 데에 자신 있어요.",
    accent: "#1D9E75",
    accentBg: "#E1F5EE",
  },
];

export default function CasualIntroSection() {
  return (
    <div style={{ width: "100%" }}>
      {/* 섹션 헤더 */}
      <div style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 12,
          color: "var(--neutral-on-background-weak)",
          letterSpacing: "0.4px",
          textTransform: "uppercase",
          marginBottom: 6,
        }}>
          저의 어떤 점이 특징인가요?
        </p>
        <p style={{
          fontSize: 15,
          fontWeight: 500,
          color: "var(--neutral-on-background-strong)",
          lineHeight: 1.5,
        }}>
          배승호의 5가지 매력 포인트.
        </p>
      </div>

      {/* 카드 그리드 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 10,
        width: "100%",
      }}>
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
              borderLeftWidth: 3,
              borderStyle: "solid",
              borderTopColor: "var(--neutral-alpha-medium)",
              borderRightColor: "var(--neutral-alpha-medium)",
              borderBottomColor: "var(--neutral-alpha-medium)",
              borderLeftColor: card.accent,
              transition: "box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                `inset 0 0 0 0.5px ${card.accent}44`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            {/* 라벨 */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 16 }}>{card.emoji}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: card.accent,
                letterSpacing: "0.2px",
              }}>
                {card.label}
              </span>
            </div>

            {/* 내용 */}
            <p style={{
              fontSize: 13,
              color: "var(--neutral-on-background-medium)",
              lineHeight: 1.75,
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