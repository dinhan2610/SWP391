import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
  Card,
  Spin,
} from "antd";

export default function ManagerConsultant() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [addForm] = Form.useForm();
  const [adding, setAdding] = useState(false);

  // Lấy danh sách consultant từ API
  const fetchConsultants = () => {
    setLoading(true);
    fetch("https://ghsm.eposh.io.vn/api/v1/consultants/get-Consultants")
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (Array.isArray(data?.data)) arr = data.data;
        setConsultants(arr);
      })
      .catch(() => {
        setConsultants([]);
        message.error("Không lấy được danh sách consultant!");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  // Xóa consultant
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa tư vấn viên này?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        fetch(
          `https://ghsm.eposh.io.vn/api/v1/consultants/delete-Consultant/${id}`,
          { method: "DELETE" }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.success || res.status === 200) {
              message.success("Đã xóa tư vấn viên!");
              fetchConsultants();
            } else {
              message.error(res.message || "Xóa thất bại!");
            }
          })
          .catch(() => message.error("Xóa thất bại!"));
      },
    });
  };

  // Thêm consultant mới
  const handleAdd = (values) => {
    setAdding(true);
    fetch("https://ghsm.eposh.io.vn/api/v1/consultants/create-Consultant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success || res.status === 200) {
          message.success("Thêm tư vấn viên thành công!");
          setAddModal(false);
          addForm.resetFields();
          fetchConsultants();
        } else {
          message.error(res.message || "Thêm thất bại!");
        }
      })
      .catch(() => message.error("Thêm thất bại!"))
      .finally(() => setAdding(false));
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chuyên môn",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Xác nhận xóa?"
          onConfirm={() => handleDelete(record.id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button
            danger
            size="small"
            style={{
              background: "#fff",
              color: "#ff4d4f",
              outline: "none",
              boxShadow: "none",
              fontWeight: 600,
              borderRadius: 6,
              border: "1px solid #ff4d4f",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#ff4d4f";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#ff4d4f";
              e.currentTarget.style.boxShadow = "0 2px 8px #ff4d4f33";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#ff4d4f";
              e.currentTarget.style.borderColor = "#ff4d4f";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Card
        title={
          <span style={{ color: "#615efc", fontWeight: 700 }}>
            Danh sách Tư vấn viên
          </span>
        }
        extra={
          <Button
            type="default"
            onClick={() => setAddModal(true)}
            style={{
              borderRadius: 12,
              fontWeight: 700,
              background: "#615efc",
              color: "#fff",
              border: "none",
              fontSize: 18,
              padding: "8px 28px",

              transition: "all 0.2s",
              letterSpacing: 0.5,
              textTransform: "uppercase",
              outline: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "0 2px 12px #2225";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#615efc";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "0 2px 8px #e0e7ff";
            }}
          >
            Thêm Tư vấn viên
          </Button>
        }
        style={{ borderRadius: 16, boxShadow: "0 2px 16px #e0e7ff" }}
      >
        <Table
          columns={columns}
          dataSource={consultants}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          bordered
        />
      </Card>
      <Modal
        open={addModal}
        onCancel={() => setAddModal(false)}
        title="Thêm Tư vấn viên mới"
        footer={null}
        destroyOnClose
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAdd}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label="Tên"
            name="fullName"
            rules={[
              { required: true, message: "Nhập tên!" },
              { min: 2, message: "Tên phải có ít nhất 2 ký tự!" },
              {
                pattern: /^[a-zA-ZÀ-ỹà-ỹ\s]+$/,
                message: "Tên không được chứa số hoặc ký tự đặc biệt!",
              },
            ]}
          >
            <Input placeholder="Nhập tên" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                pattern: /^0\d{9}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Chuyên môn"
            name="specialty"
            rules={[{ required: true, message: "Nhập chuyên môn!" }]}
          >
            <Input placeholder="Nhập chuyên môn" />
          </Form.Item>
          {/* Có thể thêm trường ngày giờ làm việc nếu muốn */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={adding}
              style={{ borderRadius: 8, fontWeight: 600, width: "100%" }}
            >
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
