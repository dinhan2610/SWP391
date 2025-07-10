import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Rate,
  Input,
  Button,
  message,
  Row,
  Col,
  Spin,
  List,
} from "antd";
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
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Lấy feedbacks từ API khi load trang
  useEffect(() => {
    setFetching(true);
    fetch("https://ghsm.eposh.io.vn/api/Feedbacks/get-feedbacks")
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (Array.isArray(data?.data)) arr = data.data;
        else arr = [];
        setFeedbacks(arr);
        console.log("[Feedback API] feedbacks:", arr);
      })
      .catch(() => {
        setFeedbacks([]);
        console.log("[Feedback API] fetch error");
      })
      .finally(() => setFetching(false));
  }, []);

  // Giảm tốc độ cuộn riêng cho trang này (chỉ desktop)
  useEffect(() => {
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

  const handleSubmit = () => {
    if (!rating) {
      message.error("Vui lòng chọn mức độ hài lòng!");
      return;
    }
    setLoading(true);
    fetch("https://ghsm.eposh.io.vn/api/Feedbacks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    })
      .then((res) => res.json())
      .then(() => {
        setSubmitted(true);
        message.success("Cảm ơn bạn đã gửi phản hồi!");
        // Sau khi gửi thành công, reload lại feedbacks
        setFetching(true);
        fetch("https://ghsm.eposh.io.vn/api/Feedbacks/get-feedbacks")
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) setFeedbacks(data);
            else if (Array.isArray(data?.data)) setFeedbacks(data.data);
            else setFeedbacks([]);
          })
          .catch(() => setFeedbacks([]))
          .finally(() => setFetching(false));
      })
      .catch(() => {
        message.error("Gửi phản hồi thất bại. Vui lòng thử lại!");
      })
      .finally(() => setLoading(false));
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
          <div>
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
              disabled={loading}
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
              loading={loading}
              disabled={loading}
            >
              Gửi phản hồi
            </Button>
          </div>
        )}
        <div style={{ marginTop: 32 }}>
          <div>
            <Title level={4} style={{ color: "#615efc", marginBottom: 12 }}>
              Phản hồi gần đây
            </Title>
            {fetching ? (
              <div className="text-center" style={{ padding: 24 }}>
                <Spin /> Đang tải phản hồi...
              </div>
            ) : feedbacks.length === 0 ? (
              <div style={{ color: "#888", textAlign: "center" }}>
                Chưa có phản hồi nào.
              </div>
            ) : (
              <List
                dataSource={feedbacks.slice(0, 6)}
                renderItem={(item) => (
                  <List.Item style={{ border: "none", padding: "8px 0" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ fontSize: 20, marginRight: 8 }}>
                        {customIcons[(item.rating || 1) - 1]?.icon}
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: customIcons[(item.rating || 1) - 1]?.color,
                        }}
                      >
                        {customIcons[(item.rating || 1) - 1]?.label}
                      </span>
                      <span
                        style={{ marginLeft: 12, color: "#888", fontSize: 13 }}
                      >
                        {item.comment || <i>Không có nhận xét</i>}
                      </span>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </div>
          <div style={{ marginTop: 40 }}>
            <Title level={4} style={{ color: "#615efc", marginBottom: 12 }}>
              Tất cả đánh giá của khách hàng
            </Title>
            {fetching ? (
              <div className="text-center" style={{ padding: 24 }}>
                <Spin /> Đang tải tất cả đánh giá...
              </div>
            ) : feedbacks.length === 0 ? (
              <div style={{ color: "#888", textAlign: "center" }}>
                Chưa có đánh giá nào.
              </div>
            ) : (
              <List
                dataSource={feedbacks}
                pagination={{ pageSize: 8, showSizeChanger: false }}
                renderItem={(item, idx) => (
                  <List.Item
                    style={{
                      border: "none",
                      padding: "12px 0",
                      background: idx % 2 === 0 ? "#f8fafc" : "#fff",
                      borderRadius: 10,
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span style={{ fontSize: 22, marginRight: 12 }}>
                        {customIcons[(item.rating || 1) - 1]?.icon}
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: customIcons[(item.rating || 1) - 1]?.color,
                          fontSize: 16,
                          marginRight: 16,
                        }}
                      >
                        {customIcons[(item.rating || 1) - 1]?.label}
                      </span>
                      <span
                        style={{
                          color: "#444",
                          fontSize: 15,
                          marginLeft: 8,
                          flex: 1,
                          fontStyle: item.comment ? "normal" : "italic",
                        }}
                      >
                        {item.comment || "Không có nhận xét"}
                      </span>
                      <span
                        style={{ color: "#aaa", fontSize: 13, marginLeft: 16 }}
                      >
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString("vi-VN")
                          : ""}
                      </span>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
