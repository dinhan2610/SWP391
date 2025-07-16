import React, { useState, useEffect } from "react";
import "./index.css";
import { Modal, Button } from "react-bootstrap";

export default function BlogPages() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPost, setModalPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setApiError("");
      try {
        const res = await fetch("https://ghsm.eposh.io.vn/get-blogs");
        if (!res.ok) throw new Error("Không thể tải danh sách bài viết");
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : data.blogs || []);
      } catch (err) {
        setApiError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleOpenModal = (post) => {
    setModalPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalPost(null);
  };

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

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1
          style={{
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            textAlign: "center",
            lineHeight: 1.2,
            textTransform: "uppercase",
          }}
        >
          Chia sẻ Kiến Thức Về Chăm Sóc Sức Khỏe & Sinh Sản
        </h1>
        <p
          style={{
            fontFamily:
              "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "1.22rem",
            color: "#222",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.04em",
            lineHeight: 1.7,
            maxWidth: 700,
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: 6,
          }}
        ></p>
      </div>

      {apiError && (
        <div
          style={{
            color: "#d32f2f",
            fontWeight: 700,
            textAlign: "center",
            margin: 16,
          }}
        >
          {apiError}
        </div>
      )}
      {loading ? (
        <div
          style={{
            color: "#1976d2",
            fontWeight: 700,
            textAlign: "center",
            margin: 16,
          }}
        >
          Đang tải dữ liệu...
        </div>
      ) : (
        <div className="blog-posts">
          {posts.length === 0 && !loading ? (
            <div
              style={{
                textAlign: "center",
                color: "#888",
                fontStyle: "italic",
                margin: 32,
              }}
            >
              Không có bài viết nào.
            </div>
          ) : (
            posts.map((post) => (
              <div className="blog-card" key={post.id}>
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-date">{post.date}</span>
                  <button
                    className="view-full"
                    onClick={() => handleOpenModal(post)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && modalPost && (
        <Modal show={isModalOpen} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontWeight: 800,
                fontSize: "2rem",
                color: "#0d47a1",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                textShadow: "0 2px 8px #e3e7ef",
                textAlign: "center",
                width: "100%",
                display: "block",
              }}
            >
              {modalPost.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              fontFamily:
                "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
              fontSize: "1.13rem",
              color: "#222",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
              padding: "18px 8px 8px 8px",
              textAlign: "center",
            }}
          >
            <h4
              style={{
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#1976d2",
                marginBottom: 12,
                letterSpacing: 0.2,
                textTransform: "uppercase",
              }}
            >
              Cam kết của chúng tôi
            </h4>
            <div
              style={{
                whiteSpace: "pre-line",
                fontFamily:
                  "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                fontSize: "1.13rem",
                color: "#222",
                lineHeight: 1.7,
                letterSpacing: "0.02em",
                textAlign: "center",
              }}
            >
              {modalPost.fullText}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              style={{
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                fontWeight: 700,
                fontSize: "1.08rem",
                letterSpacing: 0.2,
                borderRadius: 8,
                padding: "8px 24px",
              }}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
