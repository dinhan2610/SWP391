import React, { useState, useEffect } from "react";

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // API endpoints
  const API_BASE = "https://ghsm.eposh.io.vn";

  // Fetch all blogs
  const fetchPosts = async () => {
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch(`${API_BASE}/get-blogs`);
      if (!res.ok) throw new Error("Không thể tải danh sách bài viết");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : data.blogs || []);
    } catch (err) {
      setApiError(err.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (post) => {
    setEditing(post);
    setForm(post);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch(`${API_BASE}/delete-blog/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa bài viết thất bại");
      await fetchPosts();
    } catch (err) {
      setApiError(err.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
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
    // Validate 3 trường chính đều trả về cùng 1 thông báo nếu rỗng
    if (["title", "excerpt", "fullText"].includes(field)) {
      if (!value.trim()) return "Không được để trống nội dung!";
      return "";
    }
    return "";
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
    // Nếu đã có lỗi trước đó, validate lại khi nhập
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
  };

  // Xử lý khi rời khỏi input để validate ngay
  const handleBlur = (field) => (e) => {
    const value = e.target.value;
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const valid = validateAll();
    if (!valid) {
      // Focus vào input đầu tiên bị lỗi
      const firstError = ["title", "excerpt", "fullText"].find(
        (f) => errors[f] || !form[f].trim()
      );
      if (firstError) {
        const el = document.getElementById(`blog-${firstError}`);
        if (el) el.focus();
      }
      return;
    }
    setLoading(true);
    setApiError("");
    let success = false;
    try {
      if (editing) {
        // PATCH/PUT update
        const res = await fetch(`${API_BASE}/edit-blog/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Cập nhật bài viết thất bại");
      } else {
        // POST create
        const res = await fetch(`${API_BASE}/create-blog`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Thêm bài viết thất bại");
      }
      success = true;
      setErrors({});
    } catch (err) {
      setApiError(err.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
      if (success) {
        setShowModal(false);
        await fetchPosts();
      }
    }
  };

  // Tìm kiếm bài viết
  const filteredPosts = posts.filter(
    (p) =>
      (p.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.date || "").includes(search)
  );

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        fontFamily: "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
        padding: 16,
        color: "#222",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: "2.8rem",
          marginBottom: 38,
          letterSpacing: 1.5,
          color: "#1976d2",
          textShadow: "0 2px 12px #e3e7ef",
          textTransform: "uppercase",
          fontFamily: "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
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
            fontFamily:
              "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            color: "#222",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "12px 36px",
            borderRadius: 10,
            background: "#615efc",
            color: "#fff",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            fontSize: "1.25rem",
            boxShadow: "0 2px 12px #b3c6e7",
            letterSpacing: 0.8,
            textTransform: "uppercase",
            transition: "background 0.2s,transform 0.1s,scale 0.1s",
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#000";
            e.currentTarget.style.transform = "scale(1.07)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#615efc";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          + Thêm bài viết
        </button>
      </div>
      {apiError && (
        <div
          style={{
            color: "#d32f2f",
            fontWeight: 700,
            marginBottom: 12,
            textAlign: "center",
            fontFamily:
              "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            fontSize: "1.08rem",
          }}
        >
          {apiError}
        </div>
      )}
      {loading && (
        <div
          style={{
            color: "#1976d2",
            fontWeight: 700,
            marginBottom: 12,
            textAlign: "center",
            fontFamily:
              "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
            fontSize: "1.08rem",
          }}
        >
          Đang tải dữ liệu...
        </div>
      )}
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
            <tr
              style={{
                background: "#f5f7ff",
                fontFamily:
                  "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              }}
            >
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#615efc",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #615efc",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                }}
              >
                Tiêu đề
              </th>
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#615efc",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #615efc",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                }}
              >
                Tóm tắt
              </th>
              <th
                style={{
                  padding: 14,
                  fontWeight: 700,
                  color: "#615efc",
                  maxWidth: 220,
                  wordBreak: "break-word",
                  fontFamily:
                    "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  borderBottom: "2.5px solid #615efc",
                }}
              >
                Ngày
              </th>
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#615efc",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #615efc",
                }}
              >
                Ảnh
              </th>
              <th
                style={{
                  padding: 14,
                  fontWeight: 900,
                  fontSize: "1.18rem",
                  color: "#615efc",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: "2.5px solid #615efc",
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
                    color: "#615efc",
                    maxWidth: 220,
                    wordBreak: "break-word",
                  }}
                >
                  {post.title}
                </td>
                <td
                  style={{
                    padding: 14,
                    color: "#615efc",
                    maxWidth: 260,
                    wordBreak: "break-word",
                    fontFamily:
                      "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  }}
                >
                  {post.excerpt}
                </td>
                <td
                  style={{
                    padding: 14,
                    color: "#607d8b",
                    fontWeight: 600,
                    fontFamily:
                      "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  }}
                >
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
                      background: "#615efc",
                      color: "#fff",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background 0.2s,transform 0.1s,scale 0.1s",
                      fontFamily:
                        "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#000";
                      e.currentTarget.style.transform = "scale(1.07)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "#615efc";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 6,
                      border: "none",
                      background: "#ff4d4f",
                      color: "#fff",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background 0.2s,transform 0.1s,scale 0.1s",
                      fontFamily:
                        "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#d32f2f";
                      e.currentTarget.style.transform = "scale(1.07)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "#ff4d4f";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
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
            <form
              onSubmit={handleSave}
              autoComplete="off"
              style={{
                fontFamily:
                  "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                color: "#222",
              }}
            >
              <label
                htmlFor="blog-title"
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                  display: "block",
                  color: "#1976d2",
                  fontSize: "1.08rem",
                  letterSpacing: 0.2,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                }}
              >
                Tiêu đề bài viết <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                id="blog-title"
                value={form.title}
                onChange={handleChange("title")}
                onBlur={handleBlur("title")}
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
                  fontFamily:
                    "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  color: "#222",
                }}
                // required removed to disable browser default validation
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
                  color: "#1976d2",
                  fontSize: "1.08rem",
                  letterSpacing: 0.2,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                }}
              >
                Tóm tắt ngắn <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                id="blog-excerpt"
                value={form.excerpt}
                onChange={handleChange("excerpt")}
                onBlur={handleBlur("excerpt")}
                placeholder="Nhập tóm tắt nội dung bài viết"
                style={{
                  marginBottom: 4,
                  padding: 10,
                  borderRadius: 8,
                  border: "1.5px solid #b3c6e7",
                  width: "100%",
                  fontSize: "1.08rem",
                  outline: "none",
                  fontFamily:
                    "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  color: "#222",
                }}
                // required removed to disable browser default validation
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
                  color: "#1976d2",
                  fontSize: "1.08rem",
                  letterSpacing: 0.2,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                }}
              >
                Nội dung chi tiết <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <textarea
                id="blog-fullText"
                value={form.fullText}
                onChange={handleChange("fullText")}
                onBlur={handleBlur("fullText")}
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
                  fontFamily:
                    "Be Vietnam Pro, Montserrat, Segoe UI, Arial, sans-serif",
                  color: "#222",
                }}
                // required removed to disable browser default validation
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
              <div
                style={{
                  margin: "12px 0 8px 0",
                  color: "#1976d2",
                  fontWeight: 700,
                  fontSize: "1.08rem",
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                }}
              >
                Ngày đăng:{" "}
                <span style={{ color: "#222", fontWeight: 600 }}>
                  {form.date}
                </span>
              </div>
              <label
                htmlFor="blog-image"
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                  display: "block",
                  color: "#1976d2",
                  fontSize: "1.08rem",
                  letterSpacing: 0.2,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
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
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.08rem",
                    transition: "background 0.2s,transform 0.1s,scale 0.1s",
                    fontFamily:
                      "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#d32f2f";
                    e.currentTarget.style.transform = "scale(1.07)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#ff4d4f";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 22px",
                    borderRadius: 8,
                    background: "#615efc",
                    color: "#fff",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.08rem",
                    boxShadow: "0 2px 8px #b3c6e7",
                    letterSpacing: 0.5,
                    transition: "background 0.2s,transform 0.1s,scale 0.1s",
                    fontFamily:
                      "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#000";
                    e.currentTarget.style.transform = "scale(1.07)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#615efc";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
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
