import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function NotificationBell({
  notiOpen,
  setNotiOpen,
  notifications,
  handleReadAllNoti,
  setNotifications,
}) {
  // Bell icon with badge, using motion if available
  const BellIcon = typeof motion !== "undefined" ? motion.div : "div";
  return (
    <div style={{ position: "relative", marginRight: 18 }}>
      <BellIcon
        whileHover={typeof motion !== "undefined" ? { scale: 1.15 } : undefined}
        style={{ cursor: "pointer", display: "inline-block" }}
        onClick={() => setNotiOpen((v) => !v)}
      >
        <FontAwesomeIcon icon={faBell} size="lg" color="#615efc" />
        {notifications.some((n) => !n.read) && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -6,
              background: "#ff4d4f",
              color: "#fff",
              borderRadius: "50%",
              fontSize: 12,
              minWidth: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              padding: "0 5px",
              zIndex: 2,
              boxShadow: "0 1px 4px #ff4d4f44",
            }}
          >
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </BellIcon>
      {/* Popup danh sách thông báo */}
      {notiOpen && (
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 0,
            width: 340,
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 4px 24px #615efc22",
            zIndex: 100,
            padding: 0,
            minHeight: 60,
            maxHeight: 400,
            overflowY: "auto",
            fontFamily: "Montserrat, Arial, sans-serif",
            fontSize: 15,
            letterSpacing: 0.01,
          }}
          onMouseLeave={() => setNotiOpen(false)}
        >
          <div
            style={{
              padding: "14px 22px 10px 22px",
              borderBottom: "1px solid #f0f0f0",
              fontWeight: 700,
              color: "#615efc",
              fontSize: 18,
              background: "#f7f8fa",
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Thông báo</span>
            <span
              style={{
                color: "#888",
                fontWeight: 400,
                fontSize: 13,
                cursor: "pointer",
                marginLeft: 12,
              }}
              onClick={handleReadAllNoti}
            >
              Đánh dấu đã đọc
            </span>
          </div>
          {notifications.length === 0 ? (
            <div
              style={{
                padding: 22,
                color: "#888",
                textAlign: "center",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Không có thông báo nào.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: "14px 22px 10px 22px",
                  background: n.read ? "#fff" : "#f3f6ff",
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderLeft: n.read ? "none" : "4px solid #615efc",
                  fontSize: 15.2,
                }}
                onClick={() => {
                  setNotifications((prev) =>
                    prev.map((x) => (x.id === n.id ? { ...x, read: true } : x))
                  );
                  setNotiOpen(false);
                }}
              >
                <div
                  style={{
                    fontWeight: n.read ? 500 : 700,
                    color: n.read ? "#444" : "#615efc",
                    fontSize: 15.5,
                    marginBottom: 2,
                  }}
                >
                  {n.title}
                </div>
                <div
                  style={{
                    color: n.read ? "#666" : "#222",
                    fontSize: 14.2,
                    margin: "2px 0 0 0",
                    fontWeight: n.read ? 400 : 500,
                  }}
                >
                  {n.content}
                </div>
                <div
                  style={{
                    color: "#aaa",
                    fontSize: 12.5,
                    marginTop: 2,
                    fontStyle: "italic",
                  }}
                >
                  {n.time}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
