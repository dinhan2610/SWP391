
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Modal, Button, Typography, Row, Col } from 'antd';
import './STIsTest.css';

const { Title, Text } = Typography;

function STIsTest() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const showModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    navigate('/detail', { state: { category: selectedCategory } });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const symptoms = {
    'Vi khuẩn STIs': (
      <div>
        <strong>Triệu chứng đặc trưng:</strong>
        <ul className="symptom-list">
          <li>Tiết dịch bất thường ở âm đạo hoặc dương vật (thường có màu vàng, xanh, hoặc mủ)</li>
          <li>Tiểu buốt, tiểu rát, tiểu nhiều lần</li>
          <li>Đau bụng dưới hoặc đau khi quan hệ tình dục</li>
        </ul>
      </div>
    ),
    'Virus STIs': (
      <div>
        <strong>Triệu chứng đặc trưng:</strong>
        <ul className="symptom-list">
          <li>Mụn nước, mụn cóc, vết loét ở vùng sinh dục, hậu môn, miệng (thường đau hoặc tái phát)</li>
          <li>Sốt nhẹ, mệt mỏi, nổi hạch (giai đoạn đầu của HIV)</li>
          <li>Không có triệu chứng rõ ràng trong thời gian dài (HPV có thể âm thầm gây ung thư cổ tử cung)</li>
        </ul>
      </div>
    ),
    'Ký sinh trùng/Nấm STIs': (
      <div>
        <strong>Triệu chứng đặc trưng:</strong>
        <ul className="symptom-list">
          <li>Ngứa ngáy, rát, mùi hôi khó chịu ở vùng sinh dục</li>
          <li>Dịch tiết màu trắng đục hoặc vàng xanh (thường có mùi tanh hoặc nồng)</li>
          <li>Đau khi quan hệ, sưng đỏ vùng kín</li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="sti-container">
      <Title level={2} className="sti-title">
        🧬 Đăng ký xét nghiệm STIs tại HealthWise
      </Title>

      <Row gutter={[16, 16]} justify="center" className="sti-row">
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Vi khuẩn STIs"
            hoverable
            onClick={() => showModal('Vi khuẩn STIs')}
            className="sti-card"
          >
            <Text>Nhiễm trùng do vi khuẩn gây ra.</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Virus STIs"
            hoverable
            onClick={() => showModal('Virus STIs')}
            className="sti-card"
          >
            <Text>Các bệnh do virus gây ra.</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Ký sinh trùng/Nấm STIs"
            hoverable
            onClick={() => showModal('Ký sinh trùng/Nấm STIs')}
            className="sti-card"
          >
            <Text>Nhiễm trùng do ký sinh trùng hoặc nấm.</Text>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Triệu chứng đặc trưng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Bạn có muốn xem chi tiết?
          </Button>,
        ]}
        className="sti-modal"
      >
        {symptoms[selectedCategory || 'Vi khuẩn STIs']}
      </Modal>
    </div>
  );
}

export default STIsTest;
