import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiCalendar, BiCommentDetail, BiArrowBack, BiUser, BiTag } from 'react-icons/bi';
import { blogData } from "../../utils/blogs"
import "../blogs/BlogDetails.css"

const BlogDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  const blog = blogData.find(blog => blog.id === parseInt(id));

  // Get recommended blogs (3 random blogs excluding current one)
  const getRecommendedBlogs = () => {
    const otherBlogs = blogData.filter(b => b.id !== parseInt(id));
    const shuffled = [...otherBlogs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const recommendedBlogs = getRecommendedBlogs();

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
    window.scrollTo(0, 0);
  };

  if (!blog) {
    return (
      <div className="blog-not-found">
        <h2>Blog not found</h2>
        <button onClick={() => navigate('/blogs')}>Back to Blogs</button>
      </div>
    );
  }

  return (
    <div className="blog-detail-container sora">
      <button className="back-button" onClick={() => navigate('/blogs')}>
        <BiArrowBack /> Back to Blogs
      </button>

      <article className="blog-detail-content">
        <div className="blog-detail-header">
          <h1 className="blog-detail-title">{blog.title}</h1>
          
          <div className="blog-detail-meta">
            <span className="meta-item">
              <BiUser /> {blog.author}
            </span>
            <span className="meta-item">
              <BiCalendar /> {blog.date}
            </span>
            <span className="meta-item">
              <BiCommentDetail /> {blog.comments} Comments
            </span>
          </div>
        </div>

        <div className="blog-detail-image">
          <img src={blog.image} alt={blog.title} />
        </div>

        <div 
          className="blog-detail-body"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="blog-detail-footer">
          <div className="blog-tags">
            <BiTag className="tag-icon" />
            {blog.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </article>

      {/* Recommended Blogs Section */}
      <div className="recommended-section">
        <h2 className="recommended-title">Recommended Blogs for you</h2>
        <div className="recommended-grid">
          {recommendedBlogs.map((recBlog) => (
            <div 
              key={recBlog.id} 
              className="recommended-card"
              onClick={() => handleBlogClick(recBlog.id)}
            >
              <div className="recommended-image">
                <img src={recBlog.image} alt={recBlog.title} />
              </div>
              <div className="recommended-content">
                <h3 className="recommended-blog-title">{recBlog.title}</h3>
                <p className="recommended-excerpt">{recBlog.excerpt}</p>
                <div className="recommended-meta">
                  <span className="recommended-date">
                    <BiCalendar /> {recBlog.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;