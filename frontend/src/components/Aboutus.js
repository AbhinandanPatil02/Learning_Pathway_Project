import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import teamAnimation from '../assets/team-animation.json'; // Make sure this path is correct
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About Our Learning Platform</h1>
          <p className="hero-subtitle">
            Empowering learners with cutting-edge technology education
          </p>
        </div>
        <div className="hero-animation">
          <Lottie animationData={teamAnimation} loop={true} />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>
            We're dedicated to making technology education accessible, engaging, and effective
            for everyone. Our platform combines interactive learning pathways with practical
            assessments to ensure real skill development.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Comprehensive Courses</h3>
            <p>
              Curated learning paths covering the latest technologies and frameworks.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Interactive Learning</h3>
            <p>
              Hands-on exercises, quizzes, and real-world projects to reinforce concepts.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Career Focused</h3>
            <p>
              Content designed to help you gain job-ready skills in today's market.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-title">Meet The Team</h2>
        <div className="team-grid">
          <div className="team-card">

            <div className="team-avatar">👨‍💻</div>
            <p>Founder & Lead Developer</p>
            <p>Abhinandan Patil</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to start learning?</h2>
        <Link to="/" className="cta-button">
          Browse Courses
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
