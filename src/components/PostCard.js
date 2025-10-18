import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>❤️ {post.likes}</p>
      <div className="btn-group">
        <Link to={`/edit/${post.id}`}>수정</Link>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default PostCard;
