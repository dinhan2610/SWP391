import React from "react";
import { Form, Input, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./index.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Greeting */}
      <div className="contact-header">
        <h2
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#615efc",
            marginBottom: 10,
            lineHeight: 1.15,
            letterSpacing: 0.5,
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Contact HealthWise Clinic
        </h2>
        <p style={{ fontSize: 20, color: "#333", fontWeight: 500 }}>
          Have questions or need support? Our team is ready to help you book
          consultations, understand your options, and more.
        </p>
      </div>

      {/* Contact Info */}
      <div className="contact-info">
        <div
          className="info-item"
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#222",
            letterSpacing: 0.5,
          }}
        >
          <PhoneOutlined
            style={{ color: "#ff4d4f", fontSize: 30, marginRight: 12 }}
          />
          <span>
            Hotline:{" "}
            <a
              href="tel:+84123456789"
              style={{
                color: "#ff4d4f",
                textDecoration: "underline",
                fontWeight: 800,
                fontSize: 24,
                letterSpacing: 1,
              }}
            >
              (+84) 123 456 789
            </a>
          </span>
        </div>
        <div
          className="info-item"
          style={{ fontSize: 20, fontWeight: 600, color: "#444" }}
        >
          <EnvironmentOutlined
            style={{ color: "#615efc", fontSize: 24, marginRight: 10 }}
          />
          <span>123 Main Street, District 1, Ho Chi Minh City</span>
        </div>
        <div
          className="info-item"
          style={{ fontSize: 20, fontWeight: 600, color: "#444" }}
        >
          <MailOutlined
            style={{ color: "#2563eb", fontSize: 24, marginRight: 10 }}
          />
          <span>contact@healthwise.vn</span>
        </div>
        <div
          className="info-item"
          style={{ fontSize: 20, fontWeight: 600, color: "#444" }}
        >
          <ClockCircleOutlined
            style={{ color: "#52c41a", fontSize: 24, marginRight: 10 }}
          />
          <span>Mon - Sat: 08:00 - 17:30</span>
        </div>
      </div>

      {/* Map */}
      <div className="map-embed" style={{ marginBottom: 36 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.133011003837!2d106.7004233153347!3d10.800995692304073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d2d1b1b1b1%3A0x123456789abcdef!2zMTIzIE1haW4gU3QsIFRow6BuaCBwaOG7kSDEkOG7kWkgMSwgUXXhuq1uIDEsIEjDoCBO4buZaSBDaMOtbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
          width="100%"
          height="340"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
          title="Clinic Location"
        ></iframe>
      </div>
    </div>
  );
}
