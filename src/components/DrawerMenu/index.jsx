/* eslint-disable no-unused-vars */
import React from "react";
import { Drawer, Avatar, Divider, Typography } from "antd";
import StyledButton from "../StyleButton";
import avatar from "../../assets/PregnantAvatar.jpg";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

// Các biến variants cho animation của container và các item
const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const DrawerMenu = ({
  drawerOpen,
  handleCloseDrawer,
  user,
  url,
  handleLogout,
}) => {
  return (
    <Drawer
      placement="right"
      closable={true}
      onClose={handleCloseDrawer}
      open={drawerOpen}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          style={{
            textAlign: "center",
            padding: "32px 0 16px 0",
            background: "linear-gradient(90deg,#e0e7ff 0%,#f0fdfa 100%)",
            borderRadius: "0 0 24px 24px",
            marginBottom: 8,
            boxShadow: "0 2px 12px #2563eb11",
          }}
        >
          <Avatar
            src={url || avatar}
            size={90}
            style={{
              marginBottom: 12,
              border: "3px solid #2563eb",
              background: "#fff",
            }}
          />
          <Typography
            style={{
              fontSize: 22,
              color: "#2563eb",
              fontWeight: 700,
              fontFamily: "Montserrat, Arial, sans-serif",
              marginBottom: 2,
            }}
          >
            {user?.fullName || user?.email || "User"}
          </Typography>
          <Typography
            style={{
              fontSize: 15,
              color: "#64748b",
              fontFamily: "Montserrat, Arial, sans-serif",
            }}
          >
            {user?.email}
          </Typography>
        </motion.div>
        <Divider style={{ margin: 0, marginBottom: 12 }} />
        <motion.div variants={itemVariants}>
          <StyledButton
            to="/profile"
            className="mb-3 p-4 fs-5"
            onCloseDrawer={handleCloseDrawer}
            style={{
              borderRadius: 12,
              background: "#f5f7ff",
              color: "#2563eb",
              fontWeight: 600,
              boxShadow: "0 2px 8px #2563eb22",
              marginBottom: 18,
            }}
          >
            Thông tin cá nhân
          </StyledButton>
        </motion.div>
        <motion.div variants={itemVariants}>
          <StyledButton
            to="/history"
            className="mb-3 p-4 fs-5"
            onCloseDrawer={handleCloseDrawer}
            style={{
              borderRadius: 12,
              background: "#e6f7fa",
              color: "#0e7490",
              fontWeight: 600,
              boxShadow: "0 2px 8px #0e749022",
              marginBottom: 18,
            }}
          >
            Lịch sử xét nghiệm
          </StyledButton>
        </motion.div>
        <motion.div variants={itemVariants}>
          <StyledButton
            to="/"
            className="mb-3 p-4 fs-5"
            type="danger"
            onClick={handleLogout}
            style={{
              borderRadius: 12,
              background: "#fff0f0",
              color: "#e74c3c",
              fontWeight: 600,
              boxShadow: "0 2px 8px #e74c3c22",
              marginBottom: 8,
            }}
          >
            Đăng xuất
          </StyledButton>
        </motion.div>
      </motion.div>
    </Drawer>
  );
};

export default DrawerMenu;
