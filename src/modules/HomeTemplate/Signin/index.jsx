import React, { useState } from "react";
import { Form, Input, Typography, message as Message, Select } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import BackdropLoader from "../../../components/BackdropLoader";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Signin({ setActiveTab, onSwitchTab }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Xử lý đăng ký
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("https://ghsm.eposh.io.vn/api/Authen/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, roleId: 0 }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        Message.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setTimeout(() => {
          setSuccess(false);
          if (setActiveTab) setActiveTab(0);
        }, 2000);
      } else {
        Message.error(data?.message || "Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch {
      Message.error("Lỗi kết nối máy chủ. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}
    >
      <BackdropLoader open={loading} />
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
            🎉 Đăng ký thành công!
            <br />
            Vui lòng đăng nhập để sử dụng dịch vụ.
          </div>
        </div>
      )}
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          marginTop: 0,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px #2563eb11",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 24px 24px 24px",
          justifyContent: "flex-start",
        }}
      >
        <div className="row justify-content-md-center">
          <div className="col-md-auto mb-3">
            <Title>Đăng ký</Title>
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
          Nhập thông tin để trở thành thành viên mới của HealthWise!
        </Text>
        <div
          style={{
            width: "100%",
            maxHeight: 520,
            overflowY: "auto",
            overflowX: "hidden",
            padding: 0,
          }}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="fullName"
              label={
                <span>
                  <span style={{ color: "#e74c3c" }}>*</span> Họ và tên
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập họ tên!" },
                { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
                {
                  pattern: /^[a-zA-ZÀ-ỹà-ỹ\s]+$/,
                  message: "Họ tên không được chứa số hoặc ký tự đặc biệt!",
                },
              ]}
              style={{ marginBottom: 28 }}
              required={false}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#2563eb" }} />}
                placeholder="Họ và tên"
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={
                <span>
                  <span style={{ color: "#e74c3c" }}>*</span> Email
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
              style={{ marginBottom: 28 }}
              required={false}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#2563eb" }} />}
                placeholder="Email"
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={
                <span>
                  <span style={{ color: "#e74c3c" }}>*</span> Mật khẩu
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt!",
                },
              ]}
              style={{ marginBottom: 28 }}
              required={false}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#2563eb" }} />}
                placeholder="Mật khẩu"
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label={
                <span>
                  <span style={{ color: "#e74c3c" }}>*</span> Số điện thoại
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^0\d{9}$/,
                  message: "Số điện thoại phải bắt đầu bằng 0 và đủ 10 số!",
                },
              ]}
              style={{ marginBottom: 28 }}
              required={false}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: "#2563eb" }} />}
                placeholder="Số điện thoại"
                style={{ height: 50, fontSize: 16 }}
                maxLength={10}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label={
                <span>
                  <span style={{ color: "#e74c3c" }}>*</span> Giới tính
                </span>
              }
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
              style={{ marginBottom: 36 }}
              required={false}
            >
              <Select
                placeholder="Giới tính"
                style={{ height: 50, fontSize: 16 }}
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
                <Option value="Khác">Khác</Option>
              </Select>
            </Form.Item>
            {/* roleId là ẩn, mặc định 0 */}
            <Form.Item
              style={{ display: "none" }}
              name="roleId"
              initialValue={0}
            >
              <Input type="hidden" value={0} />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <button
                  className="rts-btn btn-primary"
                  type="submit"
                  style={{
                    minWidth: 160,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Đăng ký
                </button>
              </div>
            </Form.Item>
          </Form>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text>Bạn đã có tài khoản? </Text>
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
              Đăng nhập ngay!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
