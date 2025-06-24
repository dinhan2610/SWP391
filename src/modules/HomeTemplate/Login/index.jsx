import React, { useState } from "react";
import { Form, Input, Typography, message as Message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import LoginBackground from "../../../assets/Login.png";

const { Title, Text } = Typography;

export default function LoginUI({ onSwitchTab }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://swp391ghsmsbe-production.up.railway.app/api/Authen/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );
      const data = await res.json();
      if (res.ok && data?.token) {
        Message.success("Đăng nhập thành công!");
        // Lưu token nếu cần: localStorage.setItem('token', data.token);
        // Chuyển trang hoặc reload nếu cần
      } else {
        setError(data?.message || "Email hoặc mật khẩu không đúng!");
      }
    } catch {
      setError("Lỗi kết nối máy chủ!");
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", height: "100vh" }}>
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
              marginLeft: "24px",
            }}
          >
            Nhập email để đăng nhập vào tài khoản HealthWise của bạn!
          </Text>

          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Email không hợp lệ!" },
                { required: true, message: "Vui lòng nhập email!" },
              ]}
              style={{ marginBottom: 35 }}
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
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              style={{ marginBottom: 20 }}
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
              }}
            >
              Đăng ký ngay!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
