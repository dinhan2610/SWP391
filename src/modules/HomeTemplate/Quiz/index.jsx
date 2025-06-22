import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./index.css";

const quizData = [
  {
    question: "Bạn có sử dụng biện pháp bảo vệ khi quan hệ tình dục không?",

    image: "/quiz/01.jpg",
    options: ["Có", "Không"],
  },
  {
    question: "Bạn có gặp phải các triệu chứng nào sau đây?",

    image: "/quiz/02.jpg",
    options: ["Ngứa", "Khí hư bất thường", "Không có triệu chứng"],
  },
  {
    question: "Bạn có nhiều bạn tình trong 6 tháng gần đây không?",

    image: "/quiz/03.jpg",
    options: ["Có", "Không"],
  },
  {
    question: "Bạn đã từng dùng chung đồ cá nhân (khăn, đồ lót, dao cạo) chưa?",

    image: "/quiz/04.jpg",
    options: ["Có", "Không", "Không nhớ"],
  },
  {
    question: "Bạn có kiểm tra sức khỏe sinh dục định kỳ không?",

    image: "/quiz/05.jpg",
    options: ["Có – mỗi 6 tháng", "Có – nhưng không đều", "Chưa bao giờ"],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const renderResult = () => {
    const risky =
      answers.includes("Có") && !answers.includes("Không có triệu chứng");

    return (
      <motion.div
        className="quiz-result"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="quiz-title"
          style={{
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            fontWeight: 900,
            fontSize: 32,
            color: "#0ea5e9",
            letterSpacing: 0.2,
            textAlign: "center",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Kết quả đánh giá sơ bộ
        </h2>
        <p
          className="quiz-result-text"
          style={{
            fontFamily:
              "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
            fontSize: 18,
            color: "#222",
            textAlign: "center",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {risky ? (
            <>
              <span
                style={{
                  color: "#ff4d4f",
                  fontWeight: 700,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                }}
              >
                ⚠️ Câu trả lời của bạn cho thấy có nguy cơ mắc các bệnh lây
                truyền qua đường tình dục.
              </span>{" "}
              Chúng tôi khuyến nghị bạn nên đặt lịch kiểm tra càng sớm càng tốt.
            </>
          ) : (
            <>
              <span
                style={{
                  color: "#52c41a",
                  fontWeight: 700,
                  fontFamily:
                    "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
                }}
              >
                ✅ Nguy cơ hiện tại của bạn có vẻ thấp.
              </span>{" "}
              Tuy nhiên, kiểm tra sức khỏe sinh dục định kỳ vẫn rất quan trọng
              để bảo vệ sức khỏe của bạn.
            </>
          )}
        </p>
        <div className="quiz-buttons">
          <button
            onClick={() => (window.location.href = "/booking-consultation")}
          >
            Đặt lịch tư vấn
          </button>
          <button onClick={() => (window.location.href = "/")}>
            Về trang chủ
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1
            className="quiz-title"
            style={{
              fontFamily:
                "Montserrat, Be Vietnam Pro, Segoe UI, Arial, sans-serif",
              fontWeight: 800,
              fontSize: "2.6rem",
              letterSpacing: 0.5,
              textAlign: "center",
              color: "#615efc",
              lineHeight: 1.15,
              marginBottom: 18,
              textShadow: "0 2px 8px rgba(14,165,233,0.10)",
            }}
          >
            Trắc nghiệm nhanh: Kiểm tra sức khỏe sinh sản
          </h1>
          <p className="quiz-intro">
            Chỉ mất 1 phút để biết bạn có nên kiểm tra các bệnh lây truyền qua
            đường tình dục không. 100% ẩn danh và bảo mật.
          </p>

          {showResult ? (
            renderResult()
          ) : (
            <div className="quiz-question">
              <img
                src={quizData[currentQuestion]?.image}
                alt="illustration"
                className="quiz-image"
              />
              <h2 className="quiz-question-title">
                Câu hỏi {currentQuestion + 1}/{quizData.length}
              </h2>
              <p className="quiz-question-text">
                {quizData[currentQuestion]?.question}
              </p>
              <div className="quiz-options">
                {quizData[currentQuestion]?.options?.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    onBlur={(e) => {
                      e.target.blur();
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {/* Nút quay lại nằm dưới nút trả lời, góc trái, chỉ có mũi tên */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: 18,
                }}
              >
                {/* Nút back */}
                {!showResult && currentQuestion > 0 ? (
                  <button
                    className="quiz-back-btn"
                    style={{
                      background: "transparent",
                      border: "none",
                      boxShadow: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      outline: "none",
                      transition: "filter 0.18s cubic-bezier(.4,2,.6,1.2)",
                    }}
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    aria-label="Quay lại"
                    onMouseOver={(e) =>
                      (e.currentTarget.firstChild.style.filter =
                        "brightness(0)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.firstChild.style.filter = "none")
                    }
                  >
                    {/* Mũi tên SVG trái */}
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="18" cy="18" r="18" fill="none" />
                      <path
                        d="M21.5 27L13 18L21.5 9"
                        stroke="#888"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <div style={{ width: 36 }} />
                )}

                {/* Nút next */}
                {!showResult && currentQuestion < quizData.length - 1 ? (
                  <button
                    className="quiz-next-btn"
                    style={{
                      background: "transparent",
                      border: "none",
                      boxShadow: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      outline: "none",
                      transition: "filter 0.18s cubic-bezier(.4,2,.6,1.2)",
                    }}
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    aria-label="Tiếp theo"
                    onMouseOver={(e) =>
                      (e.currentTarget.firstChild.style.filter =
                        "brightness(0)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.firstChild.style.filter = "none")
                    }
                  >
                    {/* Mũi tên SVG phải */}
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="18" cy="18" r="18" fill="none" />
                      <path
                        d="M14.5 9L23 18L14.5 27"
                        stroke="#888"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <div style={{ width: 36 }} />
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
