import React from 'react'
import { useEffect } from 'react'
import Blogs from '../components/blogs/Blogs'
import BlogPageHeader from '../components/blogs/BlogPageHeader'

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
       <BlogPageHeader/>
      <Blogs/>
    </div>
  )
}

export default BlogPage
