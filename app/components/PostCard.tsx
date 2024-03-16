import React from 'react';

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600 mt-2">{post.body}</p>
    </div>
  );
};

export default PostCard;
