import BlogDetail from "../features/Blogs/components/BlogDetail";
import CommentsSection from "../features/comments/components/CommentsSection";
import CommentsList from "../features/comments/components/CommentsList";
import Footer from "../features/Layouts/Footer";
import Navbar from "../features/Layouts/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogAsync } from "../features/Blogs/blogSlice";
import { useEffect } from "react";
import { commentsListAsync } from "../features/comments/commentsSlice";

const BlogDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blog);
  const comments = useSelector((state) => state.comment.comments);

  useEffect(() => {
    dispatch(getBlogAsync(id));
    dispatch(commentsListAsync(id));
  }, [dispatch, id]);

  return (
    <section className="w-full bg-gray-950 text-white">
      <Navbar />
      <BlogDetail blog={blog} />
      <CommentsSection />
      <CommentsList comments={comments} />
      <Footer />
    </section>
  );
};

export default BlogDetailPage;
