import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Avatar,
  Typography,
  Modal,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../../../components/firebase";

import BackdropLoader from "../../../components/BackdropLoader";
import ChangePassword from "../../../components/ChangePassword";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Profile() {
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    userId: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    address: "",
    email: "",
    createdAt: "",
    url: null,
  });
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  const [success, setSuccess] = useState(false);

  // Giảm tốc độ cuộn riêng cho trang này (chỉ desktop)
  useEffect(() => {
    const handleWheel = (e) => {
      if (window.innerWidth > 600) {
        const el = document.scrollingElement || document.documentElement;
        if (el.scrollHeight > el.clientHeight) {
          e.preventDefault();
          const scrollStep = 30;
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
  // Lấy user từ localStorage và fetch profile từ API khi mount
  useEffect(() => {
    const stored = localStorage.getItem("USER_TOKEN");
    let u = {};
    if (stored) {
      u = JSON.parse(stored);
      setUser((prev) => ({ ...prev, ...u }));
      setAvatarUrl(u.url || undefined);
    }
    // Gọi API lấy profile (fix cứng userId nếu cần demo)
    const userId = u.userId || "fbb7b191-3488-4db1-8b15-3e3d5450bd2f";
    if (userId) {
      setLoading(true);
      fetch(`https://ghsm.eposh.io.vn/api/User/user-profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${u.token || ""}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.userId) {
            setUser(data);
            setAvatarUrl(data.url || undefined);
            form.setFieldsValue({
              fullName: data.fullName || "",
              email: data.email || "",
              phoneNumber: data.phoneNumber || "",
              gender: data.gender || "",
              address: data.address || "",
            });
          }
        })
        .catch(() => message.error("Không lấy được thông tin cá nhân!"))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [form]);

  // Upload ảnh lên Firebase và lấy URL
  const handleUpload = async (info) => {
    if (info.file.status === "removed") return;
    setLoading(true);
    const file = info.file.originFileObj;
    if (!file) return;
    try {
      const storageRef = ref(
        storage,
        `pregnancyCareImages/users/${user.id || user.email}`
      );
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setAvatarUrl(downloadURL);
      setUser((prev) => ({ ...prev, url: downloadURL }));
      message.success("Cập nhật ảnh đại diện thành công!");
    } catch {
      message.error("Lỗi upload ảnh!");
    }
    setLoading(false);
  };

  // Cập nhật thông tin user (gọi API PUT)
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const stored = localStorage.getItem("USER_TOKEN");
      let u = {};
      if (stored) u = JSON.parse(stored);
      const body = {
        ...user,
        ...values,
        url: avatarUrl,
      };
      const res = await fetch(
        "https://ghsm.eposh.io.vn/api/User/user-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${u.token || ""}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        localStorage.setItem("USER_TOKEN", JSON.stringify(updated));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1200);
      } else {
        message.error("Cập nhật thất bại!");
      }
    } catch {
      message.error("Có lỗi khi cập nhật!");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "32px auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 16px #2563eb11",
        padding: "32px 28px 24px 28px",
        fontFamily: "Montserrat, Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <Title
          level={3}
          style={{
            color: "#2563eb",
            fontWeight: 800,
            marginBottom: 4,
            letterSpacing: 0.5,
            fontFamily: "Montserrat, Arial, sans-serif",
            textShadow: "0 2px 8px #2563eb11",
          }}
        >
          Thông tin cá nhân
        </Title>
        <Text
          style={{
            color: "#64748b",
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "Montserrat, Arial, sans-serif",
          }}
        >
          Quản lý và cập nhật tài khoản HealthWise của bạn
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <Avatar
          src={avatarUrl}
          size={96}
          style={{
            marginBottom: 12,
            border: "3px solid #2563eb",
            background: "#fff",
            boxShadow: "0 2px 12px #2563eb22",
          }}
        />
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUpload}
          accept="image/*"
        >
          <Button
            icon={<UploadOutlined />}
            style={{
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              marginTop: 2,
              color: "#2563eb",
              border: "1px solid #2563eb",
              background: "#f5f7ff",
            }}
            loading={loading}
          >
            Đổi ảnh đại diện
          </Button>
        </Upload>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={loading}
        style={{ marginTop: 8, fontFamily: "Montserrat, Arial, sans-serif" }}
      >
        <Form.Item
          name="fullName"
          label={
            <span style={{ fontWeight: 700, fontSize: 15 }}>Họ và tên</span>
          }
          rules={[
            { required: true, message: "Vui lòng nhập họ tên!" },
            { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
            {
              pattern: /^[a-zA-ZÀ-ỹà-ỹ\s]+$/,
              message: "Họ tên không được chứa số hoặc ký tự đặc biệt!",
            },
          ]}
        >
          <Input
            placeholder="Họ và tên"
            style={{
              height: 48,
              fontSize: 16,
              borderRadius: 10,
              fontWeight: 600,
              background: "#f8fafc",
              border: "1.5px solid #e0e7ff",
            }}
          />
        </Form.Item>
        <Form.Item
          name="address"
          label={<span style={{ fontWeight: 700, fontSize: 15 }}>Địa chỉ</span>}
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ!" },
            { min: 5, message: "Địa chỉ không hợp lệ!" },
            { max: 100, message: "Địa chỉ tối đa 100 ký tự!" },
          ]}
        >
          <Input
            placeholder="Địa chỉ liên hệ"
            style={{
              height: 48,
              fontSize: 16,
              borderRadius: 10,
              fontWeight: 600,
              background: "#f8fafc",
              border: "1.5px solid #e0e7ff",
            }}
            maxLength={100}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label={<span style={{ fontWeight: 700, fontSize: 15 }}>Email</span>}
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            placeholder="Email"
            style={{
              height: 48,
              fontSize: 16,
              borderRadius: 10,
              fontWeight: 600,
              background: "#f8fafc",
              border: "1.5px solid #e0e7ff",
              color: "#64748b",
            }}
            disabled
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label={
            <span style={{ fontWeight: 700, fontSize: 15 }}>Số điện thoại</span>
          }
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^0\d{9}$/,
              message: "Số điện thoại phải bắt đầu bằng 0 và đủ 10 số!",
            },
          ]}
        >
          <Input
            placeholder="Số điện thoại"
            style={{
              height: 48,
              fontSize: 16,
              borderRadius: 10,
              fontWeight: 600,
              background: "#f8fafc",
              border: "1.5px solid #e0e7ff",
            }}
            maxLength={10}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label={
            <span style={{ fontWeight: 700, fontSize: 15 }}>Giới tính</span>
          }
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Select
            placeholder="Chọn giới tính"
            style={{ height: 48, fontSize: 16 }}
          >
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
            <Option value="Khác">Khác</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            style={{
              width: "100%",
              height: 48,
              fontWeight: 700,
              borderRadius: 10,
              fontSize: 17,
              background: "linear-gradient(90deg,#2563eb 0%,#0ea5e9 100%)",
              letterSpacing: 0.5,
              boxShadow: "0 2px 12px #2563eb22",
              border: "none",
            }}
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <a
          href="#"
          style={{
            color: "#2563eb",
            fontWeight: 600,
            textDecoration: "underline",
            fontSize: 16,
            letterSpacing: 0.2,
            transition: "color 0.18s",
          }}
          onClick={(e) => {
            e.preventDefault();
            setShowChangePassword(true);
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0ea5e9")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#2563eb")}
        >
          Đổi mật khẩu
        </a>
      </div>
      <ChangePassword
        visible={showChangePassword}
        onCancel={() => setShowChangePassword(false)}
      />
      <Modal
        open={success}
        footer={null}
        closable={false}
        centered
        bodyStyle={{ textAlign: "center", padding: 32 }}
      >
        <div style={{ fontSize: 20, color: "#2563eb", fontWeight: 700 }}>
          ✅ Cập nhật thành công!
        </div>
      </Modal>
      <BackdropLoader open={loading} />
    </div>
  );
}
