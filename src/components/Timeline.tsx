// src/components/Timeline.tsx
"use client";
import { useState, useEffect, useRef } from "react";

const SY = 2017, EY = 2026.5, TM = (EY - SY) * 12;
const mo = (y: number, m: number) => (y - SY) * 12 + (m - 1);
const pc = (o: number) => `${(o / TM * 100).toFixed(2)}%`;
const sp = (s: number, e: number) => `${((e - s) / TM * 100).toFixed(2)}%`;
const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

const CATS = [
  { id: "study",  label: "학업",       color: "#378ADD", light: "#85B7EB" },
  { id: "mil",    label: "군복무",     color: "#888780", light: "#B4B2A9" },
  { id: "res",    label: "연구·논문",  color: "#7F77DD", light: "#AFA9EC" },
  { id: "work",   label: "근로장학",   color: "#639922", light: "#97C459" },
  { id: "comp",   label: "공모전",     color: "#EF9F27", light: "#FAC775" },
  { id: "intern", label: "인턴십",     color: "#1D9E75", light: "#5DCAA5" },
  { id: "kb",     label: "KB국민은행", color: "#D85A30", light: "#F0997B" },
];

export const TIMELINE_ACTS = [
  { c:"study",  t:"영남대 정보통신공학과", en:"Yeungnam Univ. ICE",
    sy:2017,sm:3,  ey:2023,em:2,  d:"전공 GPA 4.46/4.5 · 전액장학금",                          g:["장학금","GPA 4.46"] },
  { c:"mil",    t:"대한민국 육군 복무",   en:"Military Service",
    sy:2018,sm:1,  ey:2019,em:10, d:"2019.10 전역",                                            g:["의무"] },
  { c:"res",    t:"MCL 학부연구생",       en:"Undergraduate Researcher",
    sy:2020,sm:1,  ey:2022,em:6,  d:"Mobile Communication Lab · 논문 5편 발표",                 g:["논문 5편"] },
  { c:"work",   t:"교내 근로장학생",      en:"Work-Study Program",
    sy:2020,sm:3,  ey:2022,em:9,  d:"하나테크놀러지 · 학부 병행 근로",                           g:["근로장학"] },
  { c:"comp",   t:"공모전 다수 도전·수상", en:"Multiple Competitions",
    sy:2021,sm:1,  ey:2021,em:12, d:"SK AI Challenge · KB AI Challenge · 임베디드SW 경진대회 외", g:["SK","KB","산업부"] },
  { c:"intern", t:"Qisens AI 인턴십",    en:"AI Startup Internship",
    sy:2022,sm:3,  ey:2022,em:6,  d:"항공 영상 Segmentation · 그림자 제거 GAN 적용",              g:["CV","딥러닝"] },
  { c:"intern", t:"ETRI 연구소 인턴십",  en:"ETRI Research Intern",
    sy:2022,sm:7,  ey:2022,em:8,  d:"의료IT융합연구실 · PPG/ECG 혈압 추정 모델",                  g:["ETRI","생체신호"] },
  { c:"kb",     t:"금융AI센터 — AI 금융비서", en:"AI Financial Assistant",
    sy:2022,sm:12, ey:2024,em:9,  d:"아바타 챗봇 개발·운영 · Lambda/HPA 비용 최적화 · CI/CD",    g:["Python","K8s","AWS"] },
  { c:"kb",     t:"고객컨택혁신부 — 챗봇·콜봇", en:"Chatbot & Callbot Ops",
    sy:2024,sm:9,  ey:2026,em:4,  d:"챗봇·콜봇 통합 운영 · 2025 RDA 에이전트 경진대회 우수상",    g:["LLM","Agent"] },
  { c:"kb",     t:"업무 효율화 플랫폼",   en:"Internal AI Productivity Platform",
    sy:2025,sm:6,  ey:2026,em:4,  d:"다수 챗봇 통합 관리 플랫폼 · 온톨로지 설계 · REST API",      g:["React","Flask","MySQL"] },
  { c:"kb",     t:"ECHO 사회공헌 활동",  en:"KB ECHO Program",
    sy:2025,sm:1,  ey:2025,em:12, d:"KB국민은행 내 청년 사회공헌 문화 선도 그룹 · 2025 수료",     g:["사회공헌"] },
];

type Act = typeof TIMELINE_ACTS[0];

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    } as React.CSSProperties,
  };
}

// ── 교차 배치 세로 타임라인 아이템 ─────────────────────────────
function AltItem({ a, idx, isLast, catMap }: {
  a: Act; idx: number; isLast: boolean;
  catMap: Record<string, typeof CATS[0]>;
}) {
  const c = catMap[a.c];
  const isLeft = idx % 2 === 0;
  const isPulse = a.ey === 2026 && a.em === 4;
  const { ref, style } = useFadeIn(idx * 60);

  const card = (
    <div style={{
      flex: 1,
      padding: "0.9rem 1.1rem",
      borderRadius: 10,
      background: "var(--background-overlay)",
      borderTopWidth: "0.5px",
      borderRightWidth: "0.5px",
      borderBottomWidth: "0.5px",
      borderLeftWidth: isLeft ? "0.5px" : 3,
      borderStyle: "solid",
      borderTopColor: "var(--neutral-alpha-medium)",
      borderRightColor: isLeft ? "var(--neutral-alpha-medium)" : "var(--neutral-alpha-medium)",
      borderBottomColor: "var(--neutral-alpha-medium)",
      borderLeftColor: isLeft ? "var(--neutral-alpha-medium)" : c.color,
      // borderRightWidth: isLeft ? 3 : "0.5px",
      // borderRightColor2: isLeft ? c.color : "var(--neutral-alpha-medium)",
      maxWidth: "calc(50% - 28px)",
      textAlign: isLeft ? "right" : "left",
    }}>
      <div style={{
        fontSize: 10, fontFamily: "monospace",
        color: "var(--neutral-on-background-weak)", marginBottom: 3,
      }}>
        {a.sy}.{String(a.sm).padStart(2,"0")}
        {(a.ey !== a.sy || a.em !== a.sm) && ` — ${a.ey}.${String(a.em).padStart(2,"0")}`}
      </div>
      <div style={{
        display: "inline-block", padding: "1px 7px", borderRadius: 20,
        background: `${c.color}22`, border: `1px solid ${c.color}55`,
        fontSize: 10, fontWeight: 500, color: c.light, marginBottom: 5,
      }}>{c.label}</div>
      <div style={{
        fontSize: 13, fontWeight: 500,
        color: "var(--neutral-on-background-strong)",
        lineHeight: 1.35, marginBottom: 2,
      }}>{a.t}</div>
      {a.en && (
        <div style={{ fontSize: 11, color: "var(--neutral-on-background-weak)", fontStyle: "italic", marginBottom: 5 }}>
          {a.en}
        </div>
      )}
      <div style={{ fontSize: 12, color: "var(--neutral-on-background-medium)", lineHeight: 1.6 }}>
        {a.d}
      </div>
      {a.g && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 4, marginTop: 7,
          justifyContent: isLeft ? "flex-end" : "flex-start",
        }}>
          {a.g.map(tag => (
            <span key={tag} style={{
              fontSize: 10, padding: "2px 7px", borderRadius: 20,
              border: `1px solid ${c.color}44`, color: c.light, background: `${c.color}15`,
            }}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );

  const spacer = <div style={{ flex: 1, maxWidth: "calc(50% - 28px)" }} />;

  return (
    <div ref={ref} style={{ ...style, position: "relative", marginBottom: isLast ? 0 : "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
        {/* 왼쪽 카드 */}
        {isLeft ? card : spacer}

        {/* 중앙 도트 */}
        <div style={{
          width: 56, flexShrink: 0,
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <div style={{
            width: isPulse ? 14 : 10,
            height: isPulse ? 14 : 10,
            borderRadius: "50%",
            background: c.color,
            border: "2px solid var(--background-default)",
            marginTop: 14,
            animation: isPulse ? "tlpulse 2s infinite" : "none",
            zIndex: 1,
            flexShrink: 0,
          }} />
        </div>

        {/* 오른쪽 카드 */}
        {isLeft ? spacer : card}
      </div>
    </div>
  );
}

// ── 교차 세로 타임라인 ────────────────────────────────────────
function AlternatingTimeline() {
  const catMap = Object.fromEntries(CATS.map(c => [c.id, c]));
  const sorted = [...TIMELINE_ACTS].sort((a, b) => mo(a.sy, a.sm) - mo(b.sy, b.sm));

  return (
    <div style={{ position: "relative" }}>
      {/* 중앙 수직선 */}
      <div style={{
        position: "absolute",
        left: "50%", transform: "translateX(-50%)",
        top: 0, bottom: 0, width: 2,
        background: "var(--neutral-alpha-weak)",
      }} />

      {sorted.map((a, idx) => (
        <AltItem
          key={`${a.c}-${a.sy}-${a.sm}-${idx}`}
          a={a} idx={idx}
          isLast={idx === sorted.length - 1}
          catMap={catMap}
        />
      ))}

      {/* 현재 배지 */}
      <div style={{
        display: "flex", justifyContent: "center",
        alignItems: "center", gap: 6,
        marginTop: "1.5rem",
        fontSize: 12, color: "var(--neutral-on-background-weak)",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#E24B4A", animation: "tlpulse 2s infinite",
        }} />
        현재 진행 중
      </div>
      <style>{`@keyframes tlpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.4)}}`}</style>
    </div>
  );
}

// ── 가로 타임라인 매트릭스 ────────────────────────────────────
function TimelineMatrix() {
  const [active, setActive] = useState<Act | null>(null);
  const catMap = Object.fromEntries(CATS.map(c => [c.id, c]));
  const rowMap = Object.fromEntries(CATS.map(c => [c.id, TIMELINE_ACTS.filter(a => a.c === c.id)]));
  const nowOff = mo(2026, 4);
  const { ref, style } = useFadeIn(0);

  return (
    <div ref={ref} style={style}>
      <p style={{
        fontSize: 12, fontWeight: 500, fontFamily: "monospace",
        color: "var(--neutral-on-background-weak)",
        letterSpacing: "0.5px", marginBottom: 14, textTransform: "uppercase",
      }}>
        타임라인 매트릭스
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {CATS.map(c => rowMap[c.id]?.length > 0 && (
          <span key={c.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--neutral-on-background-weak)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: c.color, display: "inline-block" }} />
            {c.label}
          </span>
        ))}
      </div>

      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ marginLeft: 108, position: "relative", height: 22, marginBottom: 4 }}>
            {YEARS.map(y => (
              <span key={y} style={{
                position: "absolute",
                left: `${((y - SY) * 12 / TM * 100).toFixed(1)}%`,
                transform: "translateX(-50%)",
                fontSize: 10, fontWeight: 500, color: "var(--neutral-on-background-weak)",
              }}>{y}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {CATS.map(c => {
              const acts = rowMap[c.id] ?? [];
              if (!acts.length) return null;
              return (
                <div key={c.id} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: 108, flexShrink: 0, fontSize: 11, fontWeight: 500, paddingRight: 10, textAlign: "right", color: c.light }}>
                    <span style={{ display: "inline-block", width: 8, height: 8, background: c.color, borderRadius: 2, marginRight: 4, verticalAlign: "middle" }} />
                    {c.label}
                  </div>
                  <div style={{ position: "relative", flex: 1, height: 26, background: "var(--neutral-alpha-weak)", borderRadius: 3 }}>
                    {YEARS.map(y => (
                      <div key={y} style={{ position: "absolute", left: `${((y - SY) * 12 / TM * 100).toFixed(1)}%`, top: 0, bottom: 0, width: 1, background: "var(--neutral-alpha-weak)", pointerEvents: "none" }} />
                    ))}
                    <div style={{ position: "absolute", left: pc(nowOff), top: -3, bottom: -3, width: 2, background: "#E24B4A", borderRadius: 1, zIndex: 4, pointerEvents: "none" }}>
                      <span style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: "#E24B4A", fontWeight: 500, whiteSpace: "nowrap" }}>현재</span>
                    </div>
                    {acts.map((a, i) => (
                      <div key={i} onClick={() => setActive(active === a ? null : a)} title={a.t} style={{
                        position: "absolute", left: pc(mo(a.sy, a.sm)), width: sp(mo(a.sy, a.sm), mo(a.ey, a.em)),
                        top: 2, height: 22, background: c.color, borderRadius: 3, cursor: "pointer",
                        zIndex: acts.length - i, opacity: acts.length > 1 ? (1 - i * 0.2) : 1,
                        outlineWidth: active === a ? 2 : 0, outlineStyle: "solid", outlineColor: c.light, outlineOffset: 1,
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {active && (() => {
        const c = catMap[active.c];
        return (
          <div style={{
            marginTop: 12,
            borderTopWidth: "0.5px", borderRightWidth: "0.5px",
            borderBottomWidth: "0.5px", borderLeftWidth: 3,
            borderStyle: "solid",
            borderTopColor: "var(--neutral-alpha-medium)",
            borderRightColor: "var(--neutral-alpha-medium)",
            borderBottomColor: "var(--neutral-alpha-medium)",
            borderLeftColor: c.color,
            borderRadius: "0 10px 10px 0",
            padding: "0.85rem 1rem",
            background: "var(--background-overlay)",
          }}>
            <span style={{ display: "inline-block", padding: "1px 7px", borderRadius: 20, background: `${c.color}22`, border: `1px solid ${c.color}55`, fontSize: 10, fontWeight: 500, color: c.light, marginBottom: 6 }}>{c.label}</span>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--neutral-on-background-strong)", marginBottom: 2 }}>{active.t}</div>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--neutral-on-background-weak)", marginBottom: 7 }}>
              {active.sy}.{String(active.sm).padStart(2, "0")} — {active.ey}.{String(active.em).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 12, color: "var(--neutral-on-background-medium)", lineHeight: 1.65 }}>{active.d}</div>
            {active.g && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                {active.g.map(tag => (
                  <span key={tag} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, border: `1px solid ${c.color}44`, color: c.light, background: `${c.color}15` }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

export default function Timeline() {
  const { ref: mRef, style: mStyle } = useFadeIn(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      <AlternatingTimeline />
      <div ref={mRef} style={mStyle}>
        <div style={{ borderTop: "0.5px solid var(--neutral-alpha-weak)", marginBottom: "2rem" }} />
        <TimelineMatrix />
      </div>
    </div>
  );
}