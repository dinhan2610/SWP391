import React, { useState } from "react";
import { Form, Input, Typography, message as Message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import SigninBackground from "../../../assets/Signin.png";
// import { useRegister } from "../../../apis/CallAPIUser";
import BackdropLoader from "../../../components/BackdropLoader";

const { Title, Text } = Typography;

export default function Signin({ setActiveTab, onSwitchTab }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  // Xử lý đăng ký
  const handleSubmit = () => {
    setLoading(true);
    // TODO: Thay thế bằng API thật khi có
    setTimeout(() => {
      Message.success("Sign in successfully (Mock)");
      if (setActiveTab) setActiveTab(0);
      setLoading(false);
    }, 1500);

    // Giả lập success
    /*
    useRegister(user.email, user.password, user.fullname)
      .then((res) => {
        Message.success("Sign in successfully");
        setActiveTab(0);
        setLoading(false);
      })
      .catch((error) => {
        Message.error("Failed sign in: " + error.message);
        setLoading(false);
      });
    */
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Ảnh nền bên trái */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <img
          src={SigninBackground}
          alt="Signin background"
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
      {/* Form bên phải */}
      <div
        style={{
          flex: 1,
          marginTop: -180,
          padding: "40px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BackdropLoader open={loading} />
        <div style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
          <div className="row justify-content-md-center">
            <div className="col-md-auto mb-3">
              <Title>Sign in</Title>
            </div>
          </div>
          <Text
            style={{
              display: "block",
              marginBottom: "20px",
              marginLeft: "24px",
            }}
          >
            Enter your email to become a new HealthWise member!
          </Text>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="fullname"
              rules={[
                { required: true, message: "Please enter full name!" },
                {
                  pattern: /^[^\d]+$/,
                  message: "Full name must not contain numbers!",
                },
              ]}
              style={{ marginBottom: 35 }}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#2563eb" }} />}
                placeholder="Full name"
                value={user.fullname}
                onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Email is incorrect!" },
                { required: true, message: "Please enter email!" },
              ]}
              style={{ marginBottom: 35 }}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#2563eb" }} />}
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character!",
                },
              ]}
              style={{ marginBottom: 50 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#2563eb" }} />}
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{ height: 50, fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item>
              <div className="row justify-content-md-center">
                <div className="col-md-auto">
                  <button className="rts-btn btn-primary" type="submit">
                    Sign in
                  </button>
                </div>
              </div>
            </Form.Item>
          </Form>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text>Already have an account? </Text>
            <a
              href="#"
              onClick={onSwitchTab}
              style={{ color: "#2563eb", fontWeight: 500 }}
            >
              Log in now!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
