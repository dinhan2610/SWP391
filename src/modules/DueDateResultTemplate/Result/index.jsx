import React from "react";
import avatarImage from "../../../assets/images/avatar.png";
import DueDateCalculatorImage from "../../../assets/DueDateCalculator.jpg";
import LightImage from "../../../assets/light.jpg";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import HealthWiseTimeline from "../HealthWise";

export default function Result() {
  return (
    <Box mt={5}>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Ngày dự sinh của bé là
      </Typography>

      <Box display="flex" alignItems="center" mb={3}>
        <div className="row">
          <div className="col-2">
            <img className="w-15" src={avatarImage} alt="Tác giả" />
          </div>
          <div className="col">
            <Typography variant="subtile-1">
              Được biên soạn bởi đội ngũ Pregnancy Care | 12/12/2024
            </Typography>
          </div>
        </div>
      </Box>

      <Card sx={{ bgcolor: "#E3F2FD", p: 3, borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src={DueDateCalculatorImage}
              alt="Công cụ tính ngày dự sinh"
              width={80}
            />
          </Box>

          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Chúc mừng! Ngày dự sinh của bạn là
          </Typography>

          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            color="primary"
            gutterBottom
          >
            24/11/2025
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <img src={LightImage} alt="Đèn sáng" width={30} />
          </Box>

          <Typography variant="h5" textAlign="center">
            Tải ứng dụng miễn phí để theo dõi thai kỳ và sự phát triển của bé!
          </Typography>
        </CardContent>
      </Card>

      <Box textAlign="center" my={2}>
        <Button
          component={Link}
          to="/dueDate"
          color="primary"
          className="fs-5 text-decoration-underline"
        >
          Tính lại ngày dự sinh
        </Button>
      </Box>

      <PregnancyTimeline />
    </Box>
  );
}
