import React from 'react';
import BlogPost from './BlogPost'; // Adjust the import path as necessary

const MainPage = () => {
  const blogContent = `
    Welcome to my blog! Here is some content.
    **code**
    const example = 'This is a code block';
    **code**
    More content follows here.
  `;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl mb-4">My Blog</h1>
      <BlogPost content={blogContent} />
    </div>
  );
};

export default MainPage;
