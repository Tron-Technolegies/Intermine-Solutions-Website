import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiCalendar, BiCommentDetail } from 'react-icons/bi';
import { blogData } from "../../utils/blogs";
import "../blogs/Blogs.css";

const Blogs = ({ limit }) => {
  const navigate = useNavigate();
  
  const displayedBlogs = limit ? blogData.slice(0, limit) : blogData;

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="blogs-container sora">
      <div className="blogs-grid">
        {displayedBlogs.map((blog) => (
          <div 
            key={blog.id} 
            className="blog-card"
            onClick={() => handleBlogClick(blog.id)}
          >
            <div className="blog-image">
              <img src={blog.image} alt={blog.title} />
            </div>
            <div className="blog-content">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-date">
                  <BiCalendar /> {blog.date}
                </span>
                <span className="blog-comments">
                  <BiCommentDetail /> {blog.comments} comments
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;