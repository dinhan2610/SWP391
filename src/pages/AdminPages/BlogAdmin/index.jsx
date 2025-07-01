import React, { useState, useEffect } from "react";

// Lưu trữ blog vào localStorage để CRUD không mất khi reload
const BLOG_KEY = "blog_admin_posts";

const getInitialPosts = () => {
  const local = localStorage.getItem(BLOG_KEY);
  if (local) return JSON.parse(local);
  // Dữ liệu mẫu lấy từ BlogPages
  return [
    {
      id: 1,
      title: "Giáo Dục Giới Tính Cho Thanh Thiếu Niên",
      excerpt:
        "Giáo dục giới tính giúp thanh thiếu niên hiểu biết về cơ thể và sức khỏe của mình.",
      fullText: "Giáo dục giới tính đóng vai trò quan trọng...",
      date: "12/06/2025",
      image: "/blog/01.png",
    },
    // ... Thêm các bài viết mẫu khác nếu muốn ...
  ];
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState(getInitialPosts());
  const [editing, setEditing] = useState(null); // null hoặc post đang sửa
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    fullText: "",
    date: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleEdit = (post) => {
    setEditing(post);
    setForm(post);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };
  const handleAdd = () => {
    setEditing(null);
    // Tự động lấy ngày hiện tại theo định dạng dd/mm/yyyy
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const today = `${day}/${month}/${year}`;
    setForm({ title: "", excerpt: "", fullText: "", date: today, image: "" });
    setShowModal(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate từng trường
  const validate = (field, value) => {
    switch (field) {
      case "title":
        if (!value.trim()) return "Tiêu đề không được để trống.";
        return "";
      case "excerpt":
        if (!value.trim()) return "Tóm tắt không được để trống.";
        return "";
      case "fullText":
        if (!value.trim()) return "Nội dung không được để trống.";
        return "";
      // case "date":
      //   if (!value.trim()) return "Ngày đăng không được để trống.";
      //   if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value.trim()))
      //     return "Ngày đăng phải đúng định dạng dd/mm/yyyy.";
      //   return "";
      default:
        return "";
    }
  };

  // Validate toàn bộ form
  const validateAll = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (["title", "excerpt", "fullText", "date"].includes(key)) {
        const err = validate(key, form[key]);
        if (err) newErrors[key] = err;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý thay đổi input
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    // Nếu có file ảnh mới, đã set form.image là base64 ở handleImageChange
    if (editing) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...form, id: editing.id } : p))
      );
    } else {
      setPosts((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
    setErrors({});
  };

  // Tìm kiếm bài viết
  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.date.includes(search)
  );

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        fontFamily: "Montserrat, Arial, sans-serif",
        padding: 16,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: "2.8rem",
          marginBottom: 38,
          letterSpacing: 1.5,
          color: "#0d47a1",
          textShadow: "0 2px 12px #e3e7ef",
          textTransform: "uppercase",
        }}
      >
        Quản trị Blog
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm bài viết..."
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1.5px solid #b3c6e7",
            fontSize: "1.08rem",
            minWidth: 220,
            outline: "none",
            boxShadow: "0 1px 4px #e3e7ef",
            transition: "border 0.2s",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "12px 36px",
            borderRadius: 10,
            background: "linear-gradient(90deg,#1976d2,#42a5f5)",
            color: "#fff",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            fontSize: "1.25rem",
            boxShadow: "0 2px 12px #b3c6e7",
            letterSpacing: 0.8,
            textTransform: "uppercase",
            transition: "background 0.2s,transform 0.1s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg,#0d47a1,#64b5f6)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg,#1976d2,#42a5f5)")
          }
        >
          + Thêm bài viết
        </button>
      </div>
      <div
        style={{
          overflowX: "auto",
          borderRadius: 12,
          boxShadow: "0 2px 8px #e3e7ef",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: 12,
          }}
        >
          <thead>
            <tr style={{ background: "#f5f7ff" }}>
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#0d47a1",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #1976d2",
                }}
              >
                Tiêu đề
              </th>
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#0d47a1",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #1976d2",
                }}
              >
                Tóm tắt
              </th>
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#0d47a1",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #1976d2",
                }}
              >
                Ngày
              </th>
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#0d47a1",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #1976d2",
                }}
              >
                Ảnh
              </th>
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#0d47a1",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #1976d2",
                }}
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: 32,
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  Không có bài viết nào.
                </td>
              </tr>
            )}
            {filteredPosts.map((post) => (
              <tr
                key={post.id}
                style={{
                  borderBottom: "1px solid #eee",
                  transition: "background 0.2s",
                }}
              >
                <td
                  style={{
                    padding: 14,
                    fontWeight: 700,
                    color: "#1a237e",
                    maxWidth: 220,
                    wordBreak: "break-word",
                  }}
                >
                  {post.title}
                </td>
                <td
                  style={{
                    padding: 14,
                    color: "#333",
                    maxWidth: 260,
                    wordBreak: "break-word",
                  }}
                >
                  {post.excerpt}
                </td>
                <td style={{ padding: 14, color: "#607d8b", fontWeight: 600 }}>
                  {post.date}
                </td>
                <td style={{ padding: 14 }}>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="img"
                      style={{
                        width: 60,
                        borderRadius: 6,
                        boxShadow: "0 1px 4px #b3c6e7",
                      }}
                    />
                  )}
                </td>
                <td style={{ padding: 14 }}>
                  <button
                    onClick={() => handleEdit(post)}
                    style={{
                      marginRight: 8,
                      padding: "6px 16px",
                      borderRadius: 6,
                      border: "none",
                      background: "#e3f2fd",
                      color: "#1565c0",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background 0.2s,transform 0.1s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#bbdefb")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "#e3f2fd")
                    }
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 6,
                      border: "none",
                      background: "#ffebee",
                      color: "#d32f2f",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background 0.2s,transform 0.1s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#ffcdd2")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "#ffebee")
                    }
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal thêm/sửa */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.18)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeInBg 0.2s",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 36,
              minWidth: 400,
              maxWidth: 540,
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 4px 24px #b3c6e7",
              animation: "fadeInModal 0.25s",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: 900,
                  fontSize: "2rem",
                  color: "#0d47a1",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  textShadow: "0 2px 8px #e3e7ef",
                }}
              >
                {editing ? "Chỉnh sửa bài viết" : "Thêm bài viết"}
              </span>
            </div>
            <form onSubmit={handleSave} autoComplete="off">
              <label
                htmlFor="blog-title"
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                  display: "block",
                  color: "#0d47a1",
                  fontSize: "1.08rem",
                  letterSpacing: 0.2,
                }}
              >
                Tiêu đề bài viết <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                id="blog-title"
                value={form.title}
                onChange={handleChange("title")}
                placeholder="Nhập tiêu đề bài viết"
                style={{
                  marginBottom: 4,
                  padding: 10,
                  borderRadius: 8,
                  border: "1.5px solid #b3c6e7",
                  width: "100%",
                  fontSize: "1.08rem",
                  fontWeight: 600,
                  outline: "none",
                }}
                required
                autoFocus
              />
              {errors.title && (
                <div
                  style={{
                    color: "#d32f2f",
                    fontSize: 13,
                    marginBottom: 8,
                  }}
                >
                  {errors.title}
                </div>
              )}
              <label
                htmlFor="blog-excerpt"
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                  display: "block",
                  color: "#0d47a1",
                  fontSize: "1.08rem",
                  letterSpacing: 0.2,
                }}
              >
                Tóm tắt ngắn <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                id="blog-excerpt"
                value={form.excerpt}
                onChange={handleChange("excerpt")}
                placeholder="Nhập tóm tắt nội dung bài viết"
                style={{
                  marginBottom: 4,
                  padding: 10,
                  borderRadius: 8,
                  border: "1.5px solid #b3c6e7",
                  width: "100%",
                  fontSize: "1.08rem",
                  outline: "none",
                }}
                required
              />
              {errors.excerpt && (
                <div
                  style={{
                    color: "#d32f2f",
                    fontSize: 13,
                    marginBottom: 8,
                  }}
                >
                  {errors.excerpt}
                </div>
              )}
              <label
                htmlFor="blog-fullText"
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                  display: "block",
                  color: "#0d47a1",
                  fontSize: "1.08rem",
                  letterSpacing: 0.2,
                }}
              >
                Nội dung chi tiết <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <textarea
                id="blog-fullText"
                value={form.fullText}
                onChange={handleChange("fullText")}
                placeholder="Nhập nội dung chi tiết bài viết"
                style={{
                  marginBottom: 4,
                  padding: 10,
                  borderRadius: 8,
                  border: "1.5px solid #b3c6e7",
                  width: "100%",
                  minHeight: 120,
                  fontSize: "1.08rem",
                  outline: "none",
                }}
                required
              />
              {errors.fullText && (
                <div
                  style={{
                    color: "#d32f2f",
                    fontSize: 13,
                    marginBottom: 8,
                  }}
                >
                  {errors.fullText}
                </div>
              )}
              {/* XÓA label và input ngày đăng, chỉ hiển thị ngày đăng tự động */}
              <div
                style={{
                  margin: "12px 0 8px 0",
                  color: "#1976d2",
                  fontWeight: 700,
                  fontSize: "1.08rem",
                }}
              >
                Ngày đăng:{" "}
                <span style={{ color: "#333", fontWeight: 600 }}>
                  {form.date}
                </span>
              </div>
              <label
                htmlFor="blog-image"
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                  display: "block",
                  color: "#0d47a1",
                  fontSize: "1.08rem",
                  letterSpacing: 0.2,
                }}
              >
                Ảnh đại diện
              </label>
              <input
                id="blog-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: 10 }}
              />
              {form.image && (
                <div style={{ marginBottom: 16 }}>
                  <img
                    src={form.image}
                    alt="preview"
                    style={{
                      maxWidth: 120,
                      borderRadius: 8,
                      boxShadow: "0 1px 4px #b3c6e7",
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "flex-end",
                  marginTop: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 22px",
                    borderRadius: 8,
                    background: "#eee",
                    color: "#333",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.08rem",
                    transition: "background 0.2s,transform 0.1s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#e3e7ef")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#eee")
                  }
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 22px",
                    borderRadius: 8,
                    background: "linear-gradient(90deg,#1565c0,#42a5f5)",
                    color: "#fff",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.08rem",
                    boxShadow: "0 2px 8px #b3c6e7",
                    letterSpacing: 0.5,
                    transition: "background 0.2s,transform 0.1s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg,#1976d2,#64b5f6)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(90deg,#1565c0,#42a5f5)")
                  }
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Hiệu ứng modal */}
      <style>{`
        @keyframes fadeInBg { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInModal { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        ::-webkit-scrollbar { height: 8px; width: 8px; background: #f5f7ff; border-radius: 8px; }
        ::-webkit-scrollbar-thumb { background: #b3c6e7; border-radius: 8px; }
        ::selection { background: #bbdefb; }
      `}</style>
    </div>
  );
}
