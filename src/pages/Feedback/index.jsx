import React, { useState, useEffect } from "react";
import { Card, Typography, Rate, Input, Button, message, Row, Col } from "antd";
import {
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  HeartOutlined,
  StarFilled,
} from "@ant-design/icons";
import "./index.css";

const { Title, Paragraph, Text } = Typography;

const customIcons = [
  {
    icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
    label: "Rất không hài lòng",
    color: "#ff4d4f",
    bg: "#fff1f0",
  },
  {
    icon: <MehOutlined style={{ color: "#faad14" }} />,
    label: "Không hài lòng",
    color: "#faad14",
    bg: "#fffbe6",
  },
  {
    icon: <StarFilled style={{ color: "#1890ff" }} />,
    label: "Bình thường",
    color: "#1890ff",
    bg: "#e6f7ff",
  },
  {
    icon: <SmileOutlined style={{ color: "#52c41a" }} />,
    label: "Hài lòng",
    color: "#52c41a",
    bg: "#f6ffed",
  },
  {
    icon: <HeartOutlined style={{ color: "#eb2f96" }} />,
    label: "Rất hài lòng",
    color: "#eb2f96",
    bg: "#fff0f6",
  },
];

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating) {
      message.error("Vui lòng chọn mức độ hài lòng!");
      return;
    }
    setSubmitted(true);
    message.success("Cảm ơn bạn đã gửi phản hồi!");
    // TODO: Gửi feedback lên server tại đây
  };
  useEffect(() => {
    // Giảm tốc độ cuộn riêng cho trang này (chỉ desktop)
    const handleWheel = (e) => {
      if (window.innerWidth > 600) {
        const el = document.scrollingElement || document.documentElement;
        if (el.scrollHeight > el.clientHeight) {
          e.preventDefault();
          const scrollStep = 130;
          el.scrollBy({
            top: e.deltaY > 0 ? scrollStep : -scrollStep,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);
  return (
    <div
      className="feedback-bg d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #fff 100%)",
      }}
    >
      <Card
        className="shadow-lg feedback-card"
        style={{ maxWidth: 44, width: "200%", borderRadius: 18 }}
      >
        <div className="text-center mb-4">
          <Title level={2} style={{ marginBottom: 8, color: "#615efc" }}>
            Chúng tôi trân trọng ý kiến của bạn
          </Title>
          <Paragraph type="secondary">
            Trải nghiệm của bạn với chúng tôi như thế nào?
          </Paragraph>
        </div>
        {submitted ? (
          <div className="text-center">
            <HeartOutlined style={{ fontSize: 48, color: "#eb2f96" }} />
            <Title level={4} className="mt-3">
              Cảm ơn bạn!
            </Title>
            <Paragraph>
              Phản hồi của bạn giúp chúng tôi nâng cao chất lượng dịch vụ.
            </Paragraph>
          </div>
        ) : (
          <>
            <Row justify="center" className="mb-3">
              {customIcons.map((item, idx) => (
                <Col key={idx}>
                  <div
                    className={`feedback-icon-wrapper${
                      rating === idx + 1 ? " selected" : ""
                    }`}
                    style={{
                      background: rating === idx + 1 ? item.bg : "#fff",
                      borderColor: rating === idx + 1 ? item.color : "#eee",
                    }}
                    onClick={() => setRating(idx + 1)}
                  >
                    {item.icon}
                  </div>
                  <div
                    className="text-center"
                    style={{
                      fontSize: 12,
                      color: rating === idx + 1 ? item.color : "#888",
                    }}
                  >
                    {item.label}
                  </div>
                </Col>
              ))}
            </Row>
            <Input.TextArea
              rows={4}
              maxLength={300}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Để lại nhận xét (không bắt buộc)"
              style={{ borderRadius: 8, marginBottom: 16 }}
            />
            <Button
              type="primary"
              block
              size="large"
              style={{
                background: "#615efc",
                borderRadius: 8,
                fontWeight: 600,
              }}
              onClick={handleSubmit}
            >
              Gửi phản hồi
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
