'use client'
import React, { useEffect, useMemo, useState } from 'react'
import usePosts from '../../hooks/usePosts'
import Loading from '../../components/Loading'
import PostCard from '../../components/PostCard'
import useUsers from '../../hooks/useUsers'

type UserDetailsProps = {
  params: {
    id: string
  }
}

const UserDetails: React.FC<UserDetailsProps> = ({ params }) => {
  const { id } = params;
  const { selectedUser, fetchUser } = useUsers();
  const { posts, fetchPosts, loading } = usePosts();

  useEffect(() => {
    (async () => {
      const modifiedId = parseInt(id);
      await Promise.all([
        fetchUser(modifiedId),
        fetchPosts(modifiedId)
      ])
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50 z-50">
          <Loading />
        </div>
      ) : (
        <div className="mt-2">
          <h3 className="text-3xl font-bold border-b pb-4 mb-4">Posts of @{selectedUser?.username}</h3>
          {posts.length > 0 ? (
            posts.map((post: Post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}
    </>
  )
}

export default UserDetails