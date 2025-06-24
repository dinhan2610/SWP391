import React, { useState } from "react";
import { Card, Typography, Input, Button, message, Row, Col } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const customStars = [1, 2, 3, 4, 5];

const styles = {
  feedbackBg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0e7ff 0%, #fff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackCard: {
    maxWidth: 440,
    width: "100%",
    borderRadius: 18,
    boxShadow: "0 8px 32px #615efc22, 0 1.5px 4px #615efc11",
    padding: 0,
  },
  feedbackStar: {
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
    outline: "none",
    boxShadow: "none",
    border: "none",
    background: "transparent",
    padding: 0,
    position: "relative",
    zIndex: 1,
    display: "inline-block",
    margin: "0 2px",
  },
  starBgAnim: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#faad1440",
    opacity: 0,
    transition: "opacity 0.2s cubic-bezier(.4,2,.6,1)",
    zIndex: 0,
  },
  feedbackStarSelected: {
    filter: "drop-shadow(0 2px 8px #faad1440)",
  },
};

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    if (!rating) {
      message.error("Vui lòng chọn số sao để đánh giá!");
      return;
    }
    setSubmitted(true);
    message.success("Cảm ơn bạn đã gửi phản hồi!");
    // TODO: Gửi feedback lên server tại đây
  };

  return (
    <div style={styles.feedbackBg}>
      <Card style={styles.feedbackCard}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8, color: "#615efc" }}>
            Chúng tôi trân trọng ý kiến của bạn
          </Title>
          <Paragraph type="secondary">
            Trải nghiệm của bạn với chúng tôi như thế nào?
          </Paragraph>
        </div>
        {submitted ? (
          <div style={{ textAlign: "center" }}>
            <StarFilled style={{ fontSize: 48, color: "#faad14" }} />
            <Title level={4} style={{ marginTop: 16 }}>
              Cảm ơn bạn!
            </Title>
            <Paragraph>
              Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ.
            </Paragraph>
          </div>
        ) : (
          <>
            <Row justify="center" style={{ marginBottom: 16 }}>
              {customStars.map((star, idx) => {
                const isActive = hoveredStar
                  ? star <= hoveredStar
                  : star <= rating;
                return (
                  <Col key={idx}>
                    <span
                      style={{
                        ...styles.feedbackStar,
                        ...(isActive ? styles.feedbackStarSelected : {}),
                      }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      tabIndex={0}
                    >
                      <span
                        style={{
                          ...styles.starBgAnim,
                          opacity: isActive ? 0.18 : 0,
                        }}
                      />
                      {isActive ? (
                        <StarFilled
                          style={{
                            color: "#faad14",
                            fontSize: 36,
                            transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                            zIndex: 2,
                            position: "relative",
                          }}
                        />
                      ) : (
                        <StarOutlined
                          style={{
                            color: "#faad14",
                            fontSize: 36,
                            transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                            zIndex: 2,
                            position: "relative",
                          }}
                        />
                      )}
                    </span>
                  </Col>
                );
              })}
            </Row>
            <div
              style={{
                textAlign: "center",
                marginBottom: 8,
                fontWeight: 500,
                color: rating ? "#faad14" : "#888",
              }}
            >
              {rating
                ? `Bạn đã đánh giá ${rating} sao`
                : "Vui lòng chọn số sao để đánh giá"}
            </div>
            <Input.TextArea
              rows={4}
              maxLength={300}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập ý kiến của bạn"
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
