import "./index.css";
export default function AboutHealthWise() {
  return (
    <div className="about-us-page">
      {" "}
      {/* Thêm lớp này */}
      {/* About Section */}
      <div className="about-section">
        <div className="container">
          <div className="row">
            {/* Image Section */}
            <div className="col-lg-6 image-section">
              <div className="image-wrapper">
                {
                  <img
                    src="/abouthealthwise/01.png"
                    alt="About Us"
                    className="about-image"
                  />
                }
              </div>
            </div>

            {/* Text Content Section */}
            <div className="col-lg-6 content-section">
              <div className="content-wrapper">
                <h2 className="about-title">
                  Providing top-tier healthcare with a patient-centered focus.
                </h2>
                <p className="about-description">
                  At HealthWish, we are committed to delivering outstanding
                  healthcare services, prioritizing the needs of our patients.
                  Our goal is to enhance the health and quality of life for our
                  community.
                </p>
                <a href="/about" className="about-link">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mission Section */}
      <div className="mission-section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-description">
            Our mission is to provide accessible, compassionate, and top-quality
            healthcare services to individuals and families, ensuring better
            health outcomes for everyone.
          </p>
        </div>
      </div>
      {/* Vision Section */}
      <div className="vision-section">
        <div className="container">
          <h2 className="section-title">Our Vision</h2>
          <p className="section-description">
            Our vision is to be the leading healthcare provider in our region,
            promoting wellness through patient-centered care, cutting-edge
            technology, and a focus on preventive medicine.
          </p>
        </div>
      </div>
      {/* Values Section */}
      <div className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <ul className="values-list">
            <li>
              <strong>Compassion:</strong> We believe in treating every patient
              with kindness, dignity, and respect.
            </li>
            <li>
              <strong>Integrity:</strong> We act with honesty and transparency
              in all our interactions.
            </li>
            <li>
              <strong>Innovation:</strong> We embrace the latest advancements in
              healthcare to provide the best care possible.
            </li>
            <li>
              <strong>Collaboration:</strong> We work together as a team, both
              within our organization and with our patients, to achieve optimal
              health outcomes.
            </li>
          </ul>
        </div>
      </div>
      {/* Team Section */}
      <div className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="row">
            <div className="col-md-4 team-member">
              <div className="team-member-photo">
                <img
                  src="/abouthealthwise/02.png"
                  className="about-image-doctor"
                  alt="Dr. John Dion"
                />
              </div>
              <h3 className="team-member-name">Dr. John Dion</h3>
              <p className="team-member-position">Chief Medical Officer</p>
            </div>
            <div className="col-md-4 team-member">
              <div className="team-member-photo">
                <img
                  src="/abouthealthwise/03.png"
                  className="about-image-doctor"
                  alt="James Taylor"
                />
              </div>
              <h3 className="team-member-name">Dr. James Taylor</h3>
              <p className="team-member-position">Nurse Practitioner</p>
            </div>
            <div className="col-md-4 team-member">
              <div className="team-member-photo">
                <img
                  src="/abouthealthwise/04.png"
                  className="about-image-doctor"
                  alt="Michael Johnson"
                />
              </div>
              <h3 className="team-member-name">Dr. Michael Johnson</h3>
              <p className="team-member-position">Healthcare Administrator</p>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-description">
            Have any questions? Feel free to reach out to us, and our team will
            be happy to assist you.
          </p>
          <button className="contact-button">Contact Us</button>
        </div>
      </div>
    </div>
  );
}
