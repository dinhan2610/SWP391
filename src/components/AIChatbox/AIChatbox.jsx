import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Spin, message } from "antd";
import {
  SendOutlined,
  CommentOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function AIChatbox() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Lưu lịch sử chat vào localStorage
    try {
      return JSON.parse(localStorage.getItem("ai_chat_history") || "[]");
    } catch {
      return [];
    }
  });
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      // TODO: Gọi API AI thực tế ở đây
      // const res = await fetch("/api/ai-chat", { method: "POST", body: JSON.stringify({ question: input }) });
      // const data = await res.json();
      // const aiMsg = { role: "ai", content: data.answer };
      // Demo trả lời mẫu:
      const aiMsg = {
        role: "ai",
        content:
          "Cảm ơn bạn đã hỏi! Hiện tại đây là demo, hãy tích hợp API AI thực tế.",
      };
      setMessages((prev) => {
        const newMsgs = [...prev, aiMsg];
        localStorage.setItem("ai_chat_history", JSON.stringify(newMsgs));
        return newMsgs;
      });
    } catch {
      message.error("Có lỗi khi gửi câu hỏi. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Nút nổi mở chatbox */}
      {!open && (
        <Button
          type="primary"
          shape="circle"
          icon={<CommentOutlined />}
          size="large"
          style={{ position: "fixed", right: 32, bottom: 56, zIndex: 1000 }} // bottom: 56px ~ 1.5cm
          onClick={() => setOpen(true)}
        />
      )}
      {/* Chatbox */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 32,
            bottom: 56, // bottom: 56px ~ 1.5cm
            width: 350,
            height: 480,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: 12,
              borderBottom: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <b>AI Chatbox</b>
            <Button
              icon={<CloseOutlined />}
              size="small"
              onClick={() => setOpen(false)}
            />
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 12,
              background: "#f9f9f9",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{ color: "#aaa", textAlign: "center", marginTop: 40 }}
              >
                Hỏi AI bất cứ điều gì về sức khỏe, dịch vụ, v.v.
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 12,
                  textAlign: msg.role === "user" ? "right" : "left",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: msg.role === "user" ? "#e6f7ff" : "#f0f0f0",
                    color: "#222",
                    borderRadius: 8,
                    padding: "8px 12px",
                    maxWidth: "80%",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && <Spin style={{ margin: 8 }} />}
            <div ref={chatEndRef} />
          </div>
          <div
            style={{
              padding: 12,
              borderTop: "1px solid #eee",
              background: "#fff",
            }}
          >
            <Input
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={sendMessage}
              disabled={loading}
              style={{ width: "calc(100% - 40px)", marginRight: 8 }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={sendMessage}
              loading={loading}
              disabled={!input.trim()}
            />
          </div>
        </div>
      )}
    </>
  );
}
