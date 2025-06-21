import React, { useState } from "react";
import { Card, Typography, Input, Button, message, Row, Col } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import "./index.css";

const { Title, Paragraph } = Typography;

const customStars = [1, 2, 3, 4, 5];

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    if (!rating) {
      message.error("Please select a rating!");
      return;
    }
    setSubmitted(true);
    message.success("Thank you for your feedback!");
    // TODO: Gửi feedback lên server tại đây
  };

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
        style={{ maxWidth: 440, width: "100%", borderRadius: 18 }}
      >
        <div className="text-center mb-4">
          <Title level={2} style={{ marginBottom: 8, color: "#615efc" }}>
            We Value Your Feedback
          </Title>
          <Paragraph type="secondary">
            How was your experience with us?
          </Paragraph>
        </div>
        {submitted ? (
          <div className="text-center">
            <StarFilled style={{ fontSize: 48, color: "#faad14" }} />
            <Title level={4} className="mt-3">
              Thank you!
            </Title>
            <Paragraph>Your feedback helps us improve our service.</Paragraph>
          </div>
        ) : (
          <>
            <Row justify="center" className="mb-3">
              {customStars.map((star, idx) => {
                const isActive = hoveredStar
                  ? star <= hoveredStar
                  : star <= rating;
                return (
                  <Col key={idx}>
                    <span
                      className={`feedback-star${isActive ? " selected" : ""}`}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                        outline: "none",
                        boxShadow: "none",
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        position: "relative",
                        zIndex: 1,
                      }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      tabIndex={0}
                    >
                      <span className="star-bg-anim" />
                      {isActive ? (
                        <StarFilled
                          style={{
                            color: isActive ? "#faad14" : "#faad14",
                            fontSize: 36,
                            transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                            filter: isActive
                              ? "drop-shadow(0 2px 8px #faad1440)"
                              : "none",
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
              className="text-center mb-2"
              style={{
                fontWeight: 500,
                color: rating ? "#faad14" : "#888",
              }}
            >
              {rating
                ? `You rated us ${rating} star${rating > 1 ? "s" : ""}`
                : "Please select a rating"}
            </div>
            <Input.TextArea
              rows={4}
              maxLength={300}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your feedback"
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
              Submit Feedback
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
