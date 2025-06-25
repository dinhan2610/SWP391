
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, List } from 'antd';

const { Title, Text } = Typography;

function STIsDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { category } = location.state || { category: 'Vi khuẩn STIs' };

    const details = {
        'Vi khuẩn STIs': {
            title: '1. STIs do vi khuẩn',
            emoji: '📌',
            items: ['Lậu (Gonorrhea)', 'Chlamydia', 'Giang mai (Syphilis)'],
        },
        'Virus STIs': {
            title: '2. STIs do virus',
            emoji: '🦠',
            items: ['HIV', 'Mụn rộp sinh dục (Herpes - HSV)', 'Sùi mào gà (HPV)'],
        },
        'Ký sinh trùng/Nấm STIs': {
            title: '3. STIs do ký sinh trùng/nấm',
            emoji: '🧪',
            items: ['Trichomonas vaginalis', 'Nấm Candida (viêm âm đạo do nấm)', 'Rận mu (Pthirus pubis)'],
        },
    };

    const detail = details[category] || details['Vi khuẩn STIs'];

    const handleDiseaseClick = (disease) => {
        navigate('/registration', { state: { category, disease } });
    };

    return (
        <div style={{ padding: '40px 20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
            <Card style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2} style={{ color: '#2d3748', textAlign: 'center', marginBottom: '20px' }}>
                    {detail.emoji} {detail.title}
                </Title>
                <List
                    dataSource={detail.items}
                    renderItem={(item) => (
                        <List.Item
                            style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0', cursor: 'pointer' }}
                            onClick={() => handleDiseaseClick(item)}
                        >
                            <Text style={{ color: '#4a5568', fontSize: '16px' }}>{item}</Text>
                        </List.Item>
                    )}
                    style={{ padding: '0 20px' }}
                />
            </Card>
        </div>
    );
}

export default STIsDetail;
