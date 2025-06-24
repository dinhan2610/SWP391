import React, { useState, useRef, useEffect } from "react";
import { Avatar, Input, Button, List, Typography, Card } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;

export default function ChatWithAdvisor() {
  const [messages, setMessages] = useState([
    {
      from: "advisor",
      text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Scroll về đầu trang khi mount (chuyển route vào chat)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      from: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    // Giả lập phản hồi tư vấn viên
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "advisor",
          text: "Cảm ơn bạn đã chia sẻ. Tôi sẽ hỗ trợ bạn ngay!",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1200);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 16 }}>
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(97,94,252,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title
            level={4}
            style={{
              margin: 0,
              fontWeight: 700,
              color: "#2563eb",
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Cảm ơn bạn đã chọn HealthWise – nơi lắng nghe và đồng hành cùng sức
            khỏe của bạn
          </Title>
          <div
            style={{
              color: "#444",
              fontSize: 12, // giảm size chữ từ 16 xuống 14
              marginTop: 8,
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            }}
          >
            Bạn cần tư vấn? Hãy đặt câu hỏi, chúng tôi luôn sẵn sàng hỗ trợ!
          </div>
        </div>
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 12,

            minHeight: 320,
            maxHeight: 400,
            overflowY: "auto",
            marginBottom: 16,
            boxShadow: "0 2px 8px rgba(97,94,252,0.06)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List
            dataSource={messages}
            renderItem={(msg, idx) => (
              <List.Item
                key={idx}
                style={{
                  justifyContent:
                    msg.from === "user" ? "flex-end" : "flex-start",
                  padding: 0,
                  border: "none",
                  background: "transparent",
                }}
              >
                <div
                  style={{
                    maxWidth: 320,
                    background: msg.from === "user" ? "#2563eb" : "#fff",
                    color: msg.from === "user" ? "#fff" : "#222",
                    borderRadius: 16,
                    padding: "10px 16px",
                    margin: "4px 0",
                    boxShadow:
                      msg.from === "user"
                        ? "0 2px 8px rgba(37,99,235,0.10)"
                        : "0 2px 8px rgba(97,94,252,0.06)",
                    alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                    fontSize: 16,
                    fontFamily:
                      "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  }}
                >
                  {msg.text}
                  <div
                    style={{
                      fontSize: 12,
                      color: msg.from === "user" ? "#e0e7ef" : "#888",
                      marginTop: 4,
                      textAlign: "right",
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              </List.Item>
            )}
            style={{ flex: 1, overflow: "auto", background: "transparent" }}
          />
          <div ref={messagesEndRef} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Nhập tin nhắn..."
            autoSize={{ minRows: 1, maxRows: 3 }}
            style={{
              resize: "none",
              fontSize: 16,
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            style={{ borderRadius: 12, height: 40 }}
            disabled={!input.trim()}
          >
            Gửi
          </Button>
        </div>
      </Card>
    </div>
  );
}
