"use client";

const CARDS = [
  {
    emoji: "🏦",
    label: "빠른 실전 성장",
    content:
      "25살에 AI 스타트업과 국책 연구소(ETRI)에서 인턴을 마치고,\n26살부터 KB국민은행에서 수백만 고객의 AI 서비스를 직접 개발·운영하고 있어요.",
    accent: "#378ADD",
    accentBg: "#E6F1FB",
  },
  {
    emoji: "🤖",
    label: "AI 서비스 현대화 경험",
    content:
      "기존 룰 기반 ML 챗봇을 생성형 AI와 RAG 아키텍처로 직접 고도화했어요.\n이론이 아니라, 실제 고객 트래픽 위에서 검증한 경험입니다.",
    accent: "#7F77DD",
    accentBg: "#EEEDFE",
  },
  {
    emoji: "🏆",
    label: "열정적인 도전자",
    content:
      "대학 시절 1년 동안 공모전 30회 도전, 10회 수상.\n연구실·인턴을 병행하면서도 멈추지 않았어요.\n취업 이후에도 사내 공모전과 자격증 취득을 꾸준히 이어가고 있습니다.",
    accent: "#EF9F27",
    accentBg: "#FAEEDA",
  },
  {
    emoji: "🎸",
    label: "취미 부자 INFP",
    content:
      "사내 밴드 동호회 회장 (2년째, 일렉기타).\n클라이밍, 러닝, 스터디, 봉사활동, 사이드 프로젝트까지.\n일과 삶 모두 전력으로 살고 있어요.",
    accent: "#D85A30",
    accentBg: "#FAECE7",
  },
  {
    emoji: "🌱",
    label: "그래도 아직 20대",
    content:
      "아슬아슬하지만, 젊은 아이디어와 에너지는 누구보다 넘칩니다.\n새로운 기술을 빠르게 흡수하고, 당장 실전에 적용하는 게 자신 있어요.",
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
          왜 저를 뽑아야 할까요?
        </p>
        <p style={{
          fontSize: 15,
          fontWeight: 500,
          color: "var(--neutral-on-background-strong)",
          lineHeight: 1.5,
        }}>
          실무 경험, 기술 깊이, 그리고 멈추지 않는 도전.
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