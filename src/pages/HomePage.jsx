import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import HostingServices from '../components/hostingservices/HostingServices';
import Blogs from '../components/blogs/Blogs';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const styles = {
    blogSection: {
      marginTop: '2px',
      padding: '0 10px',
      textAlign: 'center',
    },
    blogTitle: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '30px',
    },
    viewAllButton: {
      backgroundColor: 'var(--primary-color)',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: '0.3s ease',
      marginTop: '20px',
      marginBottom:'15px'
    },
  };

  return (
    <div>
      <HeroSection />
      <HostingServices limit={2} />

      {/* ===== Blog Section on Homepage ===== */}
      <section style={styles.blogSection} className="sora">
        <h2 style={styles.blogTitle}>Latest Blogs</h2>
        <Blogs limit={3} />
        <button
          style={styles.viewAllButton}
          onClick={() => navigate('/blogs')}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#333')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#1c1c1c')}
        >
          View All
        </button>
      </section>
    </div>
  );
};

export default HomePage;
