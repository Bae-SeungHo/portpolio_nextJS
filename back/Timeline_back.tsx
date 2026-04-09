"use client";

export interface TimelineItem {
  period: string;          // "2017.03"  또는  "2021.01 – 2021.12"
  title: string;           // 한글 제목
  titleEn?: string;        // 영문 제목 (선택)
  description: string;     // 한글 설명
  tags?: string[];         // 뱃지 태그
  highlight?: boolean;     // 강조 표시 여부
  link?: string;           // 링크 (선택)
}

export const TIMELINE_DATA: TimelineItem[] = [
  {
    period: "2017.03",
    title: "영남대학교 입학",
    titleEn: "Enrolled at Yeungnam University",
    description: "정보통신공학과 입학. 전액장학금 수혜.",
    tags: ["학업", "장학금"],
  },
  {
    period: "2018 – 2019.10",
    title: "군 복무",
    titleEn: "Military Service",
    description: "대한민국 육군 복무 후 2019년 10월 전역.",
    tags: ["군복무"],
  },
  {
    period: "2020.01 – 2022.06",
    title: "MCL 연구실 학부연구생",
    titleEn: "Undergraduate Researcher, MCL",
    description: "Mobile Communication Lab에서 학술대회 및 연구과제 수행. 한국통신학회·대한임베디드공학회 논문 5편 발표.",
    tags: ["연구", "논문 5편"],
  },
  {
    period: "2020.03 – 2022.09",
    title: "교내 근로장학생",
    titleEn: "Campus Work-Study Program",
    description: "하나테크놀러지(대학 부속 전산지원 기업)에서 학부 병행 교외근로 수행.",
    tags: ["근로장학"],
  },
  {
    period: "2021",
    title: "공모전 폭풍 도전의 해",
    titleEn: "Year of Relentless Competition",
    description: "30회 이상 도전, 10회 이상 수상. SK AI Challenge 우수상, KB AI Challenge 우수상, 임베디드SW 경진대회 우수상 등.",
    tags: ["수상 10+", "SK", "KB", "산업통상자원부"],
    highlight: true,
  },
  {
    period: "2022.03 – 2022.06",
    title: "Qisens AI 인턴십",
    titleEn: "AI Startup Internship",
    description: "AI 영상인식 스타트업. 항공 영상 객체 Segmentation 모델 개발 및 그림자 제거 모델 적용.",
    tags: ["인턴", "Computer Vision", "딥러닝"],
  },
  {
    period: "2022.07 – 2022.08",
    title: "ETRI 연구소 인턴십",
    titleEn: "ETRI Research Intern",
    description: "한국전자통신연구원 의료IT융합연구실. PPG/ECG 기반 혈압 추정 딥러닝 모델 개발.",
    tags: ["인턴", "생체신호", "ETRI"],
  },
  {
    period: "2022.12",
    title: "KB국민은행 입행",
    titleEn: "Joined KB Kookmin Bank",
    description: "금융AI센터 고객컨택혁신부 합격. 학부 졸업 전 조기 입행.",
    tags: ["취업", "KB국민은행"],
    highlight: true,
  },
  {
    period: "2023.02",
    title: "영남대학교 졸업",
    titleEn: "Graduated — Yeungnam University",
    description: "정보통신공학과 학사 졸업. 전공 GPA 4.46 / 4.5. 입행 후 졸업.",
    tags: ["졸업", "GPA 4.46"],
  },
  {
    period: "2022.12 – 2024.09",
    title: "AI 금융비서 서비스 개발·운영",
    titleEn: "AI Financial Assistant Platform",
    description: "금융AI센터. 실사 아바타 기반 대고객 챗봇 서비스 개발 및 운영. Lambda scheduling, HPA로 클라우드 비용 최적화. CI/CD 구축.",
    tags: ["Python", "Kubernetes", "AWS", "DevOps"],
    link: "https://www.etnews.com/20240306000220",
  },
  {
    period: "2024.04",
    title: "금융권 직무 자격 4종 취득",
    titleEn: "4 Financial Licensing Exams",
    description: "금융 직무 필수 자격 4종 (상품판매, 집합투자, AI·데이터 등) 한 번에 취득.",
    tags: ["자격증", "금융"],
  },
  {
    period: "2024.09 – 현재",
    title: "고객컨택혁신부 — 챗봇·콜봇 운영",
    titleEn: "Customer Contact Innovation — Chatbot & Callbot",
    description: "대고객 챗봇·콜봇 서비스 통합 운영. 2025년 RDA 에이전트 개발 경진대회 우수상 수상.",
    tags: ["운영", "LLM", "Agent"],
    highlight: true,
  },
  {
    period: "2025.01 – 2025.12",
    title: "ECHO 활동",
    titleEn: "KB ECHO Program",
    description: "KB국민은행 기업 청년 사회공헌 문화 선도 그룹 ECHO 활동 수료.",
    tags: ["사회공헌", "KB"],
  },
  {
    period: "2025.06 – 현재",
    title: "직원 업무 효율화 플랫폼 개발",
    titleEn: "Internal AI Productivity Platform",
    description: "다수 챗봇 통합 운영 비효율을 해결하는 AI 학습관리 플랫폼 설계·개발. 온톨로지 구조 설계, REST API, 데이터 시각화.",
    tags: ["플랫폼 개발", "React", "Flask", "MySQL"],
    highlight: true,
  },
];

export default function Timeline() {
  return (
    <div style={{
      position: "relative",
      padding: "2rem 0",
    }}>
      {/* 중앙 수직선 */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: "1px",
        background: "var(--neutral-alpha-medium)",
        transform: "translateX(-50%)",
      }} />
  {/* return (
    <div style={{
      position: "relative",
      padding: "2rem 0",
    }}>
      <div style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: "1px",
        background: "var(--neutral-alpha-medium)",
        transform: "translateX(-50%)",
      }} /> */}

      {TIMELINE_DATA.map((item, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: isLeft ? "flex-end" : "flex-start",
              paddingRight: isLeft ? "calc(50% + 24px)" : "0",
              paddingLeft: isLeft ? "0" : "calc(50% + 24px)",
              marginBottom: "2rem",
              position: "relative",
            }}
          >
            {/* 중앙 도트 */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: "1.2rem",
              width: item.highlight ? "14px" : "10px",
              height: item.highlight ? "14px" : "10px",
              borderRadius: "50%",
              background: item.highlight
                ? "var(--brand-solid-strong)"
                : "var(--neutral-alpha-strong)",
              border: "2px solid var(--background-default)",
              transform: "translateX(-50%)",
              zIndex: 2,
              boxSizing: "border-box",
            }} />

            {/* 카드 */}
            <div
              style={{
                background: "var(--background-overlay)",
                border: item.highlight
                  ? "1px solid var(--brand-alpha-medium)"
                  : "0.5px solid var(--neutral-alpha-medium)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                maxWidth: "340px",
                width: "100%",
                cursor: item.link ? "pointer" : "default",
              }}
              onClick={() => item.link && window.open(item.link, "_blank")}
            >
              {/* 기간 */}
              <div style={{
                fontSize: "11px",
                color: item.highlight
                  ? "var(--brand-on-background-medium)"
                  : "var(--neutral-on-background-weak)",
                fontFamily: "var(--font-mono)",
                marginBottom: "4px",
                letterSpacing: "0.5px",
              }}>
                {item.period}
              </div>

              {/* 제목 */}
              <div style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--neutral-on-background-strong)",
                marginBottom: item.titleEn ? "2px" : "6px",
                lineHeight: 1.4,
              }}>
                {item.title}
              </div>

              {/* 영문 제목 */}
              {item.titleEn && (
                <div style={{
                  fontSize: "11px",
                  color: "var(--neutral-on-background-weak)",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}>
                  {item.titleEn}
                </div>
              )}

              {/* 설명 */}
              <div style={{
                fontSize: "12px",
                color: "var(--neutral-on-background-medium)",
                lineHeight: 1.65,
                marginBottom: item.tags?.length ? "8px" : "0",
              }}>
                {item.description}
              </div>

              {/* 태그 */}
              {item.tags && item.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "10px",
                      padding: "2px 7px",
                      borderRadius: "20px",
                      border: "0.5px solid var(--neutral-alpha-medium)",
                      color: "var(--neutral-on-background-weak)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 링크 아이콘 */}
              {item.link && (
                <div style={{
                  fontSize: "10px",
                  color: "var(--brand-on-background-medium)",
                  marginTop: "6px",
                }}>
                  언론 보도 보기 →
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* 현재 진행 중 표시 */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem",
        gap: "8px",
        alignItems: "center",
      }}>
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "var(--brand-solid-strong)",
          animation: "pulse 2s infinite",
        }} />
        <span style={{
          fontSize: "12px",
          color: "var(--neutral-on-background-weak)",
        }}>
          현재 진행 중
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @media (max-width: 640px) {
          .timeline-center-line { display: none; }
        }
      `}</style>
    </div>
  );
}




"use client";
import { useState } from "react";

const S_YEAR = 2017;
const E_YEAR = 2026.5;
const TOTAL_MONTHS = (E_YEAR - S_YEAR) * 12;

function mo(y: number, m: number) { return (y - S_YEAR) * 12 + (m - 1); }
function pct(o: number) { return `${(o / TOTAL_MONTHS * 100).toFixed(2)}%`; }
function span(s: number, e: number) { return `${((e - s) / TOTAL_MONTHS * 100).toFixed(2)}%`; }

const CATS = [
  { id:"study",  label:"학업",       color:"#378ADD", fg:"#0C447C" },
  { id:"mil",    label:"군복무",     color:"#888780", fg:"#444441" },
  { id:"res",    label:"연구·논문",  color:"#7F77DD", fg:"#3C3489" },
  { id:"work",   label:"근로장학",   color:"#639922", fg:"#27500A" },
  { id:"comp",   label:"공모전",     color:"#EF9F27", fg:"#633806" },
  { id:"intern", label:"인턴십",     color:"#1D9E75", fg:"#085041" },
  { id:"kb",     label:"KB국민은행", color:"#D85A30", fg:"#712B13" },
  { id:"extra",  label:"기타활동",   color:"#D4537E", fg:"#72243E" },
];

// ← 이 배열만 수정하면 타임라인 업데이트됨!
export const TIMELINE_ACTS = [
  { cat:"study",  label:"영남대학교 정보통신공학과", sy:2017,sm:3, ey:2023,em:2,
    desc:"전공 GPA 4.46/4.5 · 전액장학금 · 전체 GPA 4.2/4.5", tags:["장학금","GPA 4.46"] },
  { cat:"mil",    label:"군 복무", sy:2018,sm:1, ey:2019,em:10,
    desc:"대한민국 육군 복무 후 2019.10 전역", tags:["군복무"] },
  { cat:"res",    label:"MCL 학부연구생", sy:2020,sm:1, ey:2022,em:6,
    desc:"Mobile Communication Lab · 논문 5편 발표 · 한국통신학회 · 임베디드공학회", tags:["논문 5편"] },
  { cat:"work",   label:"교내 근로장학생", sy:2020,sm:3, ey:2022,em:9,
    desc:"하나테크놀러지 교외근로 · 학부 수업 병행", tags:["근로장학"] },
  { cat:"comp",   label:"공모전 폭풍 (30회+ 도전, 10회+ 수상)", sy:2021,sm:1, ey:2021,em:12,
    desc:"SK AI Challenge · KB AI Challenge · 임베디드SW 경진대회 · 경북 공공데이터 공모전 외", tags:["수상 10+","SK","KB","산업부"] },
  { cat:"intern", label:"Qisens AI 인턴십", sy:2022,sm:3, ey:2022,em:6,
    desc:"항공 영상 Segmentation · 그림자 제거 GAN · ICT 학부인턴십", tags:["CV","딥러닝"] },
  { cat:"intern", label:"ETRI 연구소 인턴십", sy:2022,sm:7, ey:2022,em:8,
    desc:"의료IT융합연구실 · PPG/ECG 혈압 추정 모델 · Skeleton Detection", tags:["ETRI","생체신호"] },
  { cat:"kb",     label:"금융AI센터 — AI 금융비서", sy:2022,sm:12, ey:2024,em:9,
    desc:"아바타 챗봇 개발·운영 · Lambda/HPA 비용 최적화 · CI/CD 구축", tags:["Python","Kubernetes","AWS"] },
  { cat:"kb",     label:"고객컨택혁신부 — 챗봇·콜봇 운영", sy:2024,sm:9, ey:2026,em:4,
    desc:"대고객 챗봇·콜봇 통합 운영 · 2025 RDA 에이전트 경진대회 우수상", tags:["LLM","Agent"] },
  { cat:"kb",     label:"업무 효율화 플랫폼 개발", sy:2025,sm:6, ey:2026,em:4,
    desc:"다수 챗봇 통합 관리 플랫폼 · 온톨로지 설계 · REST API · 데이터 시각화", tags:["React","Flask","MySQL"] },
  { cat:"extra",  label:"ECHO 청년 사회공헌 활동", sy:2025,sm:1, ey:2025,em:12,
    desc:"KB국민은행 기업 청년 문화 선도 그룹 · 2025 수료", tags:["사회공헌"] },
];

const YEARS = [2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];

export default function Timeline() {
  const [active, setActive] = useState<typeof TIMELINE_ACTS[0] | null>(null);
  const catMap = Object.fromEntries(CATS.map(c => [c.id, c]));
  const rowMap: Record<string, typeof TIMELINE_ACTS> = {};
  CATS.forEach(c => { rowMap[c.id] = TIMELINE_ACTS.filter(a => a.cat === c.id); });
  const nowOff = mo(2026, 4);

  return (
    <div style={{ overflowX: "auto" }}>
      {/* 범례 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {CATS.map(c => rowMap[c.id].length > 0 && (
          <span key={c.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--neutral-on-background-weak)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: c.color, display: "inline-block" }} />
            {c.label}
          </span>
        ))}
      </div>

      <div style={{ minWidth: 580, position: "relative" }}>
        {/* 연도 라벨 */}
        <div style={{ marginLeft: 108, position: "relative", height: 22, marginBottom: 6 }}>
          {YEARS.map(y => (
            <span key={y} style={{
              position: "absolute", left: `${((y-S_YEAR)*12/TOTAL_MONTHS*100).toFixed(1)}%`,
              transform: "translateX(-50%)", fontSize: 10, fontWeight: 500,
              color: "var(--neutral-on-background-weak)",
            }}>{y}</span>
          ))}
        </div>

        {/* 카테고리 행 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {CATS.map(c => {
            const acts = rowMap[c.id];
            if (!acts.length) return null;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 108, flexShrink: 0, fontSize: 11, fontWeight: 500,
                  paddingRight: 10, textAlign: "right", color: c.fg }}>
                  <span style={{ display: "inline-block", width: 8, height: 8,
                    background: c.color, borderRadius: 2, marginRight: 4, verticalAlign: "middle" }} />
                  {c.label}
                </div>
                <div style={{ position: "relative", flex: 1, height: 28,
                  background: "var(--neutral-alpha-weak)", borderRadius: 4 }}>
                  {/* 연도 격자선 */}
                  {YEARS.map(y => (
                    <div key={y} style={{
                      position: "absolute", left: `${((y-S_YEAR)*12/TOTAL_MONTHS*100).toFixed(1)}%`,
                      top: 0, bottom: 0, width: 1,
                      background: "var(--neutral-alpha-weak)", pointerEvents: "none",
                    }} />
                  ))}
                  {/* 현재 선 */}
                  <div style={{
                    position: "absolute", left: pct(nowOff), top: -4, bottom: -4,
                    width: 2, background: "#E24B4A", borderRadius: 1, zIndex: 3, pointerEvents: "none",
                  }} />
                  {/* 활동 바 */}
                  {acts.map((a, i) => (
                    <div key={i}
                      onClick={() => setActive(active === a ? null : a)}
                      style={{
                        position: "absolute",
                        left: pct(mo(a.sy, a.sm)),
                        width: span(mo(a.sy, a.sm), mo(a.ey, a.em)),
                        height: acts.length > 1 ? 14 : 20,
                        top: acts.length > 1 ? 4 + i * 7 : 4,
                        background: c.color,
                        borderRadius: 3, cursor: "pointer",
                        opacity: active === a ? 0.75 : 1,
                        outline: active === a ? `2px solid ${c.color}` : "none",
                        outlineOffset: 1,
                      }}
                      title={a.label}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 클릭 상세 카드 */}
        {active && (
          <div style={{
            marginTop: 14, borderLeft: `3px solid ${catMap[active.cat].color}`,
            borderRadius: "0 10px 10px 0",
            border: `0.5px solid var(--neutral-alpha-medium)`,
            borderLeft: `3px solid ${catMap[active.cat].color}`,
            padding: "0.85rem 1rem",
            background: "var(--background-overlay)",
          }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: catMap[active.cat].fg, marginBottom: 2 }}>
              {active.label}
            </div>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--neutral-on-background-weak)", marginBottom: 6 }}>
              {active.sy}.{String(active.sm).padStart(2,"0")} — {active.ey}.{String(active.em).padStart(2,"0")}
            </div>
            <div style={{ fontSize: 12, color: "var(--neutral-on-background-medium)", lineHeight: 1.65 }}>
              {active.desc}
            </div>
            {active.tags && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                {active.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 10, padding: "2px 7px", borderRadius: 20,
                    border: "0.5px solid var(--neutral-alpha-medium)",
                    color: "var(--neutral-on-background-weak)",
                  }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}