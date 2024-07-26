import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminManageComments = ({ blogId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/admin/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white">{comment.name}</h3>
            <p className="text-white mb-2">{comment.comment}</p>
            <p className="text-gray-400 text-sm">{new Date(comment.uploadTime).toLocaleString()}</p>
            <div className="flex items-center mt-2">
              <button className="bg-green-600 text-white py-2 px-4 rounded-md mr-2">Edit</button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-md">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminManageComments;
