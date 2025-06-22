import React, { useState } from "react";
import { Modal, Form, Input, Button, Typography, message } from "antd";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { changePassword as changePasswordAPI } from "../../../../../apis/CallAPIUser";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ChangePassword = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Call API
  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      const res = await changePasswordAPI(oldPassword, newPassword);

      if (res.code === 200) {
        message.success(res.message || "Đổi mật khẩu thành công");
        form.resetFields();
        localStorage.removeItem("USER_TOKEN"); // Xóa token để bắt buộc đăng nhập lại
        navigate("/");
        onCancel(); // Đóng modal
      } else {
        message.error("Không thể đổi mật khẩu");
      }
    } catch (error) {
      message.error(error.message || "Lỗi khi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }
    setLoading(true);
    handleChangePassword(values.oldPassword, values.newPassword);
  };

  // Các variants cho hiệu ứng framer-motion
  const contentVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null} width={450}>
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={4}>Đổi mật khẩu</Title>
          <Text type="secondary">
            Vì lý do bảo mật, vui lòng xác thực thông tin của bạn
          </Text>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="oldPassword"
            label="Mật khẩu hiện tại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu hiện tại",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới",
              },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
            ]}
            extra="Sử dụng ít nhất 8 ký tự bao gồm chữ, số và ký tự đặc biệt."
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu mới",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Hai mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={loading}
              block
              style={{ backgroundColor: "#615EFC", color: "white" }}
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={onCancel} block>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </Modal>
  );
};

export default ChangePassword;
