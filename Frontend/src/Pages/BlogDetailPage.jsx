import BlogDetail from "../features/Blogs/components/BlogDetail";
import CommentsSection from "../features/comments/components/CommentsSection";
import CommentsList from "../features/comments/components/CommentsList";
import Footer from "../features/Layouts/Footer";
import Navbar from "../features/Layouts/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogAsync } from "../features/Blogs/blogSlice";
import { useEffect } from "react";

const BlogDetailPage = () => {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const blog = useSelector((state) => state.blog.blog);

  useEffect(() => {
    dispatch(getBlogAsync(blogId));
  }, [dispatch, blogId]);

  return (
    <section className="w-full bg-gray-950 text-white">
      <Navbar />
      <BlogDetail blog={blog} />
      <CommentsSection blogID={blogId} />
      <CommentsList blogId={blogId} />
      <Footer />
    </section>
  );
};

export default BlogDetailPage;
