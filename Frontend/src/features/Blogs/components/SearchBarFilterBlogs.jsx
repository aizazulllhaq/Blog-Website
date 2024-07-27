import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsTagsAsync, getFilterBlogsAsync } from "../blogSlice";
import { Link, useNavigate } from "react-router-dom";

const SearchBarFilterBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);
  const dispatch = useDispatch();
  const { blogs, blogsTags } = useSelector((state) => state.blog);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlogsTagsAsync());
  }, [dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.length) {
      if (blogsTags.includes(searchTerm.toUpperCase())) {
        dispatch(getFilterBlogsAsync(searchTerm));
      } else {
        setNoResults(true);
      }
    }
  };

  useEffect(() => {
    setNoResults(blogs && blogs.length === 0);
  }, [blogs]);

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(getFilterBlogsAsync(searchTerm));
    }
  }, [searchTerm]);

  return (
    <section className="w-full min-h-screen flex flex-col">
      {/* Search Bar Section Start  */}
      <div className="max-w-[800px] mx-auto text-center">
        <div className="heading">
          <h1 className="md:text-4xl text-3xl font-bold text-white my-[30px]">
            Discover the Best Coding Blogs
          </h1>
        </div>

        <div className="searchbar">
          <form
            onSubmit={(e) => handleSearch(e)}
            className="flex justify-center items-center flex-col md:flex-row"
          >
            <input
              type="search"
              placeholder="Serach for coding topics , tutorials or languages ... "
              className="px-[15px] py-[10px] bg-transparent border border-red-400 rounded-[4px] mb-[10px] md:mb-0 md:mr-[10px] sm:w-[430px] text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="px-4 py-2.5 text-white bg-red-400 rounded-[4px]">
              Serach
            </button>
          </form>
        </div>
      </div>
      {/* Search Bar Section End  */}

      {/* Filter Blogs Section Start  */}
      <div className="max-w-[1200px] mx-auto">
        <div className="blogs grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-[60px]">
          {noResults ? (
            <p className="text-white text-2xl text-center">No Blogs Found.</p>
          ) : (
            blogs &&
            blogs.map((blog, index) => (
              <div
                key={index}
                onClick={() => navigate(`/blogs/${blog._id}`)}
                className="blog grid grid-rows-[1fr,auto,auto] gap-4 text-white p-5 max-w-[460px] bg-gray-950 border-[1px] border-gray-900 hover:bg-blue-950 hover:opacity-80 rounded-[7px]"
              >
                <div className="img-title">
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="absolute top-0 left-0 w-full h-full rounded-[4px]"
                    />
                  </div>
                  <div className="py-[10px]">
                    <Link
                      to={`blogs/${blog._id}`}
                      className="title text-2xl font-bold"
                    >
                      {blog.title}
                    </Link>
                  </div>
                </div>
                <div className="author-uploadTime flex justify-between">
                  <h3 className="author font-thin opacity-60">{blog.author}</h3>
                  <p className="uploadTime opacity-40">{blog.uploadTime}</p>
                </div>
                <div className="category opacity-60 space-x-[10px] flex flex-wrap space-y-[5px] text-center  items-center">
                  {blog.tags.map((item, index) => (
                    <span
                      key={index}
                      className="font-thin bg-gray-900 opacity-80 py-[5px] px-[6px] rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Filter Blogs Section End  */}
    </section>
  );
};

export default SearchBarFilterBlogs;
