'use client'
import { useCallback, useState } from 'react';

const usePosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async (id: ID) => {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    posts,
    fetchPosts,
    loading,
  }
};

export default usePosts;