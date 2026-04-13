// src/components/MiniTerminal.tsx
"use client";
import { useState, useEffect, useRef } from "react";

const COMMANDS: Record<string, string> = {
  help: `사용 가능한 명령어:
  name       이름
  age        나이
  mbti       MBTI
  hobby      취미
  music      좋아하는 음악
  food       좋아하는 음식
  dream      꿈
  fun        재미있는 사실
  contact    연락처
  clear      초기화`,

  name:    "배승호 (Bae Seung-Ho) 🇰🇷",
  age:     "만 27세 — 1998년생",
  mbti:    "INTJ\n계획 세우는 걸 좋아하고, 혼자 깊이 생각하는 타입이에요.\n근데 일 얘기 나오면 갑자기 ENTJ 됩니다.",
  hobby:   "커피 마시기 ☕  |  산책 🚶  |  유튜브 보기 📺\n새로운 AI 툴 써보기 🤖  |  가끔 영화 보기 🎬",
  music:   "장르 가리지 않아요.\n코딩할 때는 Lo-fi, 집중 안 될 때는 아이유.",
  food:    "마라탕 🥵  |  삼겹살 🥩  |  카레 🍛\n매운 거 잘 못 먹는데 마라탕은 예외입니다.",
  dream:   "내가 만든 AI 서비스를 수백만 명이 쓰는 것.\n사실 이미 조금 이루고 있는 중이에요.",
  fun:     "재미있는 사실들:\n• 대학 4년 동안 공모전을 30번 넘게 도전했어요\n• 이 포트폴리오도 AI로 반쯤 만들었어요\n• 터미널이 그냥 멋있어서 넣었습니다",
  contact: "이메일: doge@kbfg.com\nGitHub: github.com/Bae-SeungHo\n포트폴리오: 지금 보고 계신 이 사이트",
};

const BOOT_SEQUENCE = [
  { delay: 200,  text: "$ whoami" },
  { delay: 600,  text: "배승호 — AI Platform Engineer" },
  { delay: 1000, text: "" },
  { delay: 1100, text: "$ 'help' 로 더 알아보기" },
];

interface Line { type: "input" | "output" | "system"; text: string }

// src/components/MiniTerminal.tsx — 수정 부분만
// 출력 영역 div에 ref를 걸고, scrollIntoView 대신 scrollTop 사용

export default function MiniTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  // bottomRef 대신 scrollContainerRef로 컨테이너 자체를 참조
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    BOOT_SEQUENCE.forEach(({ delay, text }) => {
      setTimeout(() => {
        if (!mounted) return;
        if (text) setLines(p => [...p, { type: text.startsWith("$") ? "input" : "output", text }]);
        if (delay === 1100) setBooted(true);
      }, delay);
    });
    return () => { mounted = false; };
  }, []);

  // ← 핵심 수정: scrollIntoView 대신 컨테이너 내부만 스크롤
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (cmd: string) => {
    const t = cmd.trim().toLowerCase();
    if (!t) return;
    setLines(p => [...p, { type: "input", text: `$ ${t}` }]);
    setHistory(h => [t, ...h].slice(0, 30));
    setHistIdx(-1);
    if (t === "clear") { setLines([]); return; }
    const result = COMMANDS[t];
    if (result) setLines(p => [...p, { type: "output", text: result }]);
    else setLines(p => [...p, { type: "system", text: `command not found: ${t} — 'help' 를 입력해보세요` }]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = Object.keys(COMMANDS);
      const m = cmds.find(c => c.startsWith(input));
      if (m) setInput(m);
    }
  };

// MiniTerminal.tsx — return 부분 최외곽 div만 수정
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: "#0f0f0f",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        // ↓ 부모 높이를 100% 채움 — 절대 늘어나지 않음
        height: "100%",
        cursor: "text",
        fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
      }}
    >
      {/* 타이틀바 — flex-shrink:0 으로 높이 고정 */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 12px",
        background: "#1a1a1a",
        borderBottom: "1px solid #222",
        flexShrink: 0,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: "#555" }}>seungho@portfolio:~</span>
      </div>

      {/* 출력 영역 — flex:1 로 남은 공간 차지, overflow:auto 로 내부 스크롤 */}
      <div
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowY: "auto",      // ← 내부만 스크롤
          overflowX: "hidden",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          // ↓ 이 div가 늘어나지 않도록 min-height 0 필수
          minHeight: 0,
        }}
      >
        {lines.map((l, i) => (
          <pre key={i} style={{
            margin: 0, fontSize: 12, lineHeight: 1.75,
            whiteSpace: "pre-wrap", wordBreak: "break-word",
            flexShrink: 0,   // ← pre가 줄어들지 않게
            color: l.type === "input" ? "#5DCAA5"
              : l.type === "system" ? "#F09595"
              : "#C5C5C0",
          }}>{l.text}</pre>
        ))}
      </div>

      {/* 입력 — flex-shrink:0 으로 높이 고정 */}
      {booted && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 14px",
          borderTop: "1px solid #1e1e1e",
          flexShrink: 0,
        }}>
          <span style={{ color: "#5DCAA5", fontSize: 12, flexShrink: 0 }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            spellCheck={false}
            placeholder="명령어 입력... (help)"
            style={{
              flex: 1, background: "transparent", border: "none",
              color: "#C5C5C0", fontSize: 12, fontFamily: "inherit",
              outline: "none", caretColor: "#5DCAA5",
            }}
          />
        </div>
      )}
    </div>
  );
}