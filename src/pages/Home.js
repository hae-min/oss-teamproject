import { useState } from "react";
import PostCard from "../components/PostCard";
import AdBanner from "../components/AdBanner";
import postsData from "../data/posts";

function Home() {
  const [posts, setPosts] = useState(postsData);

  const handleSort = () => {
    const sorted = [...posts].sort((a, b) => b.likes - a.likes);
    setPosts(sorted);
  };

  return (
    <div className="home-container">
      <button onClick={handleSort}>좋아요 순 정렬</button>
      <AdBanner />
      <div className="feed">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
