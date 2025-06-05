import React, { useState } from "react";
import "./index.css"; // Import CSS từ file index.css

export default function BlogPages() {
  const [activePost, setActivePost] = useState(null);

  const posts = [
    {
      id: 1,
      title: "Sex Education for Teenagers",
      excerpt:
        "Sex education helps teenagers understand their bodies and health better.",
      fullText:
        "This post explains how sex education provides essential information for teenagers. It covers topics like body changes, consent, and sexual health awareness.",
      date: "12/06/2025",
      image: "/blog/01.png",
    },
    {
      id: 2,
      title: "Reproductive Health Care for Women",
      excerpt:
        "Explore methods for reproductive health care for women at different ages.",
      fullText:
        "This article discusses reproductive health care methods women should be aware of throughout different life stages. It covers fertility, birth control, and menopause.",
      date: "05/06/2025",
      image: "/blog/02.png",
    },
    {
      id: 3,
      title: "STI Testing and Prevention",
      excerpt:
        "Learn about STI testing methods and how to prevent them effectively.",
      fullText:
        "This post covers STI testing methods available and the importance of early detection. It also discusses prevention guidelines and maintaining sexual health.",
      date: "01/06/2025",
      image: "/blog/03.png",
    },
    {
      id: 4,
      title: "Understanding Ovulation and Fertility",
      excerpt:
        "An introduction to ovulation and how it relates to fertility and conception.",
      fullText:
        "In this post, we explain the science of ovulation, its relation to fertility, and how understanding your cycle can help with conception. The article also includes tips for tracking ovulation.",
      date: "20/05/2025",
      image: "/blog/04.png",
    },
    {
      id: 5,
      title: "Birth Control Methods Explained",
      excerpt: "A guide to different birth control methods available to women.",
      fullText:
        "This article outlines birth control options, from hormonal to non-hormonal methods, explaining their effectiveness and potential side effects.",
      date: "15/05/2025",
      image: "/blog/05.png",
    },
    {
      id: 6,
      title: "Menstrual Health Awareness",
      excerpt:
        "Learn about menstrual health and the importance of regular check-ups.",
      fullText:
        "Menstrual health is crucial for overall well-being. This post discusses understanding menstrual cycles and recognizing signs of irregularities.",
      date: "10/05/2025",
      image: "/blog/06.png",
    },
    {
      id: 7,
      title: "The Importance of Sexual Consent",
      excerpt: "Why understanding and practicing sexual consent is essential.",
      fullText:
        "This article dives deep into the concept of sexual consent, its importance, and how to ensure mutual agreement between partners before engaging in sexual activity.",
      date: "02/05/2025",
      image: "/blog/07.png",
    },
    {
      id: 8,
      title: "Mental Health and Sexual Wellness",
      excerpt: "How mental health affects sexual wellness and vice versa.",
      fullText:
        "This post explores the link between mental health and sexual wellness, discussing how anxiety and depression can impact relationships and sexual health.",
      date: "25/04/2025",
      image: "/blog/08.png",
    },
  ];

  const handleToggle = (id) => {
    setActivePost(activePost === id ? null : id);
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Blog Sharing Knowledge</h1>
        <p>
          Sharing insights about sex education, reproductive health care, and
          sexual wellness.
        </p>
      </div>

      <div className="blog-posts">
        {posts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-date">{post.date}</span>
              <button
                className="read-more"
                onClick={() => handleToggle(post.id)}
              >
                {activePost === post.id ? "Show Less" : "Read More"}
              </button>
              {activePost === post.id && (
                <p className="full-text">{post.fullText}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
