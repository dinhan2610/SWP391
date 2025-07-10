import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

export default function ChangePassword({ visible, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Reset form when modal close
  React.useEffect(() => {
    if (!visible) form.resetFields();
  }, [visible, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const stored = localStorage.getItem("USER_TOKEN");
      let u = {};
      if (stored) u = JSON.parse(stored);
      const body = {
        id: u.id || u.userId,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
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
        message.success("Đổi mật khẩu thành công!");
        form.resetFields();
        onCancel();
      } else {
        const err = await res.json();
        message.error(err?.message || "Đổi mật khẩu thất bại!");
      }
    } catch {
      message.error("Có lỗi khi đổi mật khẩu!");
    }
    setLoading(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      title={
        <span
          style={{
            color: "#2563eb",
            fontWeight: 700,
            fontFamily: "Montserrat,Arial,sans-serif",
          }}
        >
          Đổi mật khẩu
        </span>
      }
      centered
      bodyStyle={{ padding: 28 }}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={loading}
        style={{ fontFamily: "Montserrat,Arial,sans-serif" }}
      >
        <Form.Item
          name="oldPassword"
          label={<span style={{ fontWeight: 600 }}>Mật khẩu cũ</span>}
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu cũ"
            size="large"
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={<span style={{ fontWeight: 600 }}>Mật khẩu mới</span>}
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
              message:
                "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt!",
            },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            size="large"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={<span style={{ fontWeight: 600 }}>Xác nhận mật khẩu mới</span>}
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Nhập lại mật khẩu mới"
            size="large"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
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
              marginTop: 8,
              fontFamily: "Montserrat,Arial,sans-serif",
            }}
          >
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
