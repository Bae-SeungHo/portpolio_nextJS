"use client";

import { useState, useRef, useEffect } from "react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const QUICK = [
  "어떤 기술 스택을 쓰나요?",
  "현재 어디서 일하나요?",
  "대표 프로젝트가 뭔가요?",
  "연락 방법은요?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content: "안녕하세요! 저는 승호에 대한 AI 에이전트예요 😊\n궁금한 것을 물어보세요!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async (text?: string) => {
    const q = text || input;
    if (!q.trim() || loading) return;

    const newMsgs = [...msgs, { role: "user" as const, content: q }];
    setMsgs([...newMsgs, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: newMsgs }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    let full = "";

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      for (const line of decoder.decode(value).split("\n")) {
        if (line.startsWith("data: ") && !line.includes("[DONE]")) {
          full += JSON.parse(line.slice(6)).text;
          setMsgs((prev) => [
            ...prev.slice(0, -1),
            { role: "assistant", content: full },
          ]);
        }
      }
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="chat-widget-button"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="chat-widget-panel">
          {/* Header */}
          <div className="chat-widget-header">
            <div>
              <div style={{ fontWeight: 600 }}>AI Assistant</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                승호에 대해 무엇이든 물어보세요
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-widget-messages">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`chat-bubble ${m.role}`}
              >
                {m.content || (loading && i === msgs.length - 1 ? "..." : "")}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Questions */}
          {msgs.length <= 1 && (
            <div className="quick-buttons">
              {QUICK.map((q) => (
                <button key={q} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-widget-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="질문을 입력하세요..."
            />
            <button onClick={() => send()} disabled={loading}>
              전송
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .chat-widget-button {
          position: fixed;
          z-index: 1000;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);

          background: rgba(20, 20, 20, 0.65);
          color: white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }

        .chat-widget-button:hover {
          transform: translateY(-2px);
        }

        .chat-widget-panel {
          position: fixed;
          z-index: 999;
          display: flex;
          flex-direction: column;
          overflow: hidden;

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);

          background: rgba(15, 15, 15, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
        }

        .chat-widget-header {
          padding: 16px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .chat-widget-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          // background:color-mix(in srgb, var(--background-default) 70%, var(--brand-solid-strong) 30%);
          // backdropFilter: blur(20px);
          // WebkitBackdropFilter: blur(20px);
        }

        .chat-bubble {
          max-width: 82%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .chat-bubble.user {
          align-self: flex-end;
          background: #3b82f6;
          color: white;
          border-radius: 16px 16px 4px 16px;
        }

        .chat-bubble.assistant {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-radius: 16px 16px 16px 4px;
        }

        .quick-buttons {
          padding: 0 12px 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .quick-buttons button {
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: white;
          font-size: 12px;
          cursor: pointer;
        }

        .chat-widget-input {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .chat-widget-input input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 999px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .chat-widget-input button {
          padding: 10px 14px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          background: #3b82f6;
          color: white;
        }

        /* PC */
        @media (min-width: 769px) {
          .chat-widget-button {
            bottom: 28px;
            right: 28px;
            width: 58px;
            height: 58px;
            border-radius: 50%;
            font-size: 24px;
          }

          .chat-widget-panel {
            bottom: 100px;
            right: 28px;
            width: 380px;
            height: 560px;
            border-radius: 20px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .chat-widget-button {
            top: 18px;
            right: 18px;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            font-size: 18px;
          }

          .chat-widget-panel {
            top: 74px;
            right: 12px;
            width: calc(100vw - 24px);
            max-width: 380px;
            height: 72vh;
            border-radius: 18px;
          }
        }
      `}</style>
    </>
  );
}

// // src/components/ChatWidget.tsx
// "use client";
// import { useState, useRef, useEffect } from "react";

// interface Msg { role: "user" | "assistant"; content: string; }

// const QUICK = [
//   "어떤 기술 스택을 쓰나요?",
//   "현재 어디서 일하나요?",
//   "대표 프로젝트가 뭔가요?",
//   "연락 방법은요?",
// ];

// <style>{`
//   @media (max-width: 768px) {
//     .chat-widget-btn {
//       bottom: 80px !important;
//     }
//     .chat-widget-panel {
//       bottom: 140px !important;
//       right: 12px !important;
//       width: calc(100vw - 24px) !important;
//       max-width: 380px !important;
//     }
//   }
// `}</style>

// export default function ChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [msgs, setMsgs] = useState<Msg[]>([
//     {
//       role: "assistant",
//       content: "안녕하세요! 저는 승호에 대한 AI 에이전트예요 😊\n궁금한 것을 뭐든 물어보세요!"
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const endRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [msgs]);

//   const send = async (text?: string) => {
//     const q = text || input;
//     if (!q.trim() || loading) return;

//     const newMsgs = [...msgs, { role: "user" as const, content: q }];
//     setMsgs(newMsgs);
//     setInput("");
//     setLoading(true);

//     setMsgs([...newMsgs, { role: "assistant", content: "" }]);

//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ messages: newMsgs }),
//     });

//     let full = "";
//     const reader = res.body!.getReader();
//     const dec = new TextDecoder();

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       for (const line of dec.decode(value).split("\n")) {
//         if (line.startsWith("data: ") && !line.includes("[DONE]")) {
//           full += JSON.parse(line.slice(6)).text;
//           setMsgs(p => [...p.slice(0, -1), { role: "assistant", content: full }]);
//         }
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       {/* 플로팅 버튼 */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="chat-widget-btn"
//         style={{
//           position: "fixed",
//           top: 28,
//           right: 28,
//           padding: "12px 20px",
//           borderRadius: 50,
//           background: "var(--brand-solid-strong)",
//           color: "var(--brand-on-solid-strong)",
//           border: "none",
//           cursor: "pointer",
//           fontSize: 14,
//           fontWeight: 500,
//           zIndex: 1000,
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
//         }}
//       >
//         {open ? "✕ 닫기" : "💬 승호에게 물어보기"}
//       </button>

//       {/* 챗봇 창 */}
//       {open && (
//         <div
//             style={{
//                 position: "fixed",
//                 top: 80,
//                 right: 28,
//                 width: 360,
//                 height: 520,

//                 // ⭐ 핵심: 글래스 효과
//                 background:
//                 "color-mix(in srgb, var(--background-default) 70%, var(--brand-solid-strong) 30%)",
//                 backdropFilter: "blur(20px)",
//                 WebkitBackdropFilter: "blur(20px)",

//                 border:
//                 "1px solid color-mix(in srgb, var(--brand-solid-strong) 25%, transparent)",

//                 borderRadius: 20,
//                 display: "flex",
//                 flexDirection: "column",
//                 zIndex: 999,
//                 overflow: "hidden",

//                 // ⭐ 부드러운 그림자
//                 boxShadow:
//                 "0 8px 32px rgba(0, 0, 0, 0.15)",
//             }}
//             >
//           {/* 헤더 */}
//           <div
//             style={{
//                 padding: "16px 20px",
//                 borderBottom:
//                 "1px solid color-mix(in srgb, var(--brand-solid-strong) 20%, transparent)",

//                 background:
//                 "color-mix(in srgb, var(--brand-solid-strong) 80%, transparent)",

//                 backdropFilter: "blur(12px)",
//                 WebkitBackdropFilter: "blur(12px)",

//                 color: "var(--brand-on-solid-strong)",
//             }}
//             >
//             <div style={{ fontWeight: 600, fontSize: 15 }}>
//               AI 어시스턴트
//             </div>
//             <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>
//               배승호에 대해 뭐든 물어보세요
//             </div>
//           </div>

//           {/* 메시지 */}
//           <div
//             style={{
//               flex: 1,
//               overflowY: "auto",
//               padding: "16px",
//               display: "flex",
//               flexDirection: "column",
//               gap: 10,
//             }}
//           >
//             {msgs.map((m, i) => (
//               <div
//                 key={i}
//                 style={{
//                   alignSelf:
//                     m.role === "user" ? "flex-end" : "flex-start",
//                   maxWidth: "82%",
//                   padding: "10px 14px",
//                   borderRadius:
//                     m.role === "user"
//                       ? "18px 18px 4px 18px"
//                       : "18px 18px 18px 4px",
//                   background:
//                     m.role === "user"
//                       ? "var(--brand-solid-strong)"
//                       : "var(--neutral-alpha-weak)",
//                   color:
//                     m.role === "user"
//                       ? "var(--brand-on-solid-strong)"
//                       : "var(--neutral-on-background-strong)",
//                   fontSize: 13,
//                   lineHeight: 1.6,
//                   whiteSpace: "pre-wrap",
//                 }}
//               >
//                 {m.content ||
//                   (loading && i === msgs.length - 1 ? "···" : "")}
//               </div>
//             ))}
//             <div ref={endRef} />
//           </div>

//           {/* 빠른 질문 */}
//           {msgs.length <= 1 && (
//             <div
//               style={{
//                 padding: "0 12px 8px",
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: 6,
//               }}
//             >
//               {QUICK.map((q) => (
//                 <button
//                   key={q}
//                   onClick={() => send(q)}
//                   style={{
//                     padding: "5px 10px",
//                     borderRadius: 20,
//                     border: "1px solid var(--neutral-alpha-medium)",
//                     background: "transparent",
//                     fontSize: 12,
//                     color: "var(--neutral-on-background-strong)",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {q}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* 입력창 */}
//           <div
//             style={{
//               padding: "12px 16px",
//               borderTop: "1px solid var(--neutral-alpha-weak)",
//               display: "flex",
//               gap: 8,
//             }}
//           >
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               placeholder="질문을 입력하세요..."
//               style={{
//                 flex: 1,
//                 padding: "9px 14px",
//                 border: "1px solid var(--neutral-alpha-medium)",
//                 borderRadius: 20,
//                 fontSize: 13,
//                 background: "var(--background-default)",
//                 color: "var(--neutral-on-background-strong)",
//                 outline: "none",
//               }}
//             />
//             <button
//               onClick={() => send()}
//               disabled={loading}
//               style={{
//                 padding: "9px 16px",
//                 background: "var(--brand-solid-strong)",
//                 color: "var(--brand-on-solid-strong)",
//                 border: "none",
//                 borderRadius: 20,
//                 fontSize: 13,
//                 cursor: "pointer",
//               }}
//             >
//               전송
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }