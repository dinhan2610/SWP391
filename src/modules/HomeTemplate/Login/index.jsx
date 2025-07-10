import React, { useState } from "react";
import { Form, Input, Typography, message as Message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import LoginBackground from "../../../assets/Login.png";

const { Title, Text } = Typography;

export default function LoginUI({ onSwitchTab }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://ghsm.eposh.io.vn/api/Authen/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (res.ok && data?.token) {
        setSuccess(true);
        Message.success("Đăng nhập thành công!");
        // Đồng bộ với Header: lưu user vào USER_TOKEN
        const userData = data.user
          ? { ...data.user, token: data.token }
          : { token: data.token };
        localStorage.setItem("USER_TOKEN", JSON.stringify(userData));
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 800);
      } else {
        setError(data?.message || "Email hoặc mật khẩu không đúng!");
        Message.error(data?.message || "Email hoặc mật khẩu không đúng!");
      }
    } catch {
      setError("Lỗi kết nối máy chủ!");
      Message.error("Lỗi kết nối máy chủ!");
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Thông báo đăng nhập thành công */}
        {success && (
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
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "32px 48px",
                boxShadow: "0 2px 12px #2563eb22",
                fontSize: 20,
                color: "#1976d2",
                fontWeight: 700,
                textAlign: "center",
                fontFamily: "Montserrat, Arial, sans-serif",
              }}
            >
              🎉 Đăng nhập thành công!
            </div>
          </div>
        )}

        {/* Image */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <img
            src={LoginBackground}
            alt="Login background"
            style={{
              width: "100%",
              height: 380,
              objectFit: "contain",
              display: "block",
              borderRadius: "12px",
              minHeight: 320,
              minWidth: 200,
              maxHeight: 420,
              maxWidth: 420,
              margin: "32px auto 0 auto",
              background: "#f8fafc",
            }}
          />
        </div>

        {/* Login form */}
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="row justify-content-md-center">
            <div className="col-md-auto mb-3">
              <Title>Đăng nhập</Title>
            </div>
          </div>

          <Text
            style={{
              display: "block",
              marginBottom: "20px",
              marginLeft: 0,
              textAlign: "center",
            }}
          >
            Nhập email để đăng nhập vào tài khoản HealthWise của bạn!
          </Text>

          <Form layout="vertical" onFinish={handleLogin} disabled={loading}>
            <Form.Item
              name="email"
              label={
                <span>
                  <span style={{ color: "#e74c3c" }}>*</span> Email
                </span>
              }
              rules={[
                { type: "email", message: "Email không hợp lệ!" },
                { required: true, message: "Vui lòng nhập email!" },
              ]}
              style={{ marginBottom: 35 }}
              required={false}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#2563eb" }} />}
                placeholder="Email"
                style={{ height: 50, fontSize: 16 }}
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span>
                  <span style={{ color: "#e74c3c" }}>*</span> Mật khẩu
                </span>
              }
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              style={{ marginBottom: 20 }}
              required={false}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#2563eb" }} />}
                placeholder="Mật khẩu"
                style={{ height: 50, fontSize: 16 }}
                autoComplete="current-password"
              />
            </Form.Item>

            {error && (
              <div
                style={{
                  color: "#e74c3c",
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <Form.Item>
              <div className="row justify-content-md-center">
                <div className="col-md-auto">
                  <button
                    className="rts-btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </button>
                </div>
              </div>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text>Bạn mới sử dụng HealthWise? </Text>
            <a
              href="#"
              onClick={onSwitchTab}
              style={{
                color: "#2563eb",
                fontWeight: 500,
                textDecoration: "none",
                transition: "text-decoration 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Đăng ký ngay!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
