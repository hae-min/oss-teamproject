import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import postsData from "../data/posts";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = postsData.find(p => p.id === parseInt(id));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("수정된 게시물:", { id, title, content });
    navigate("/");
  };

  return (
    <div>
      <h2>게시물 수정</h2>
      <form onSubmit={handleUpdate}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default Edit;
