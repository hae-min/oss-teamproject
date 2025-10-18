import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("새 게시물 업로드:", { title, content });
    navigate("/");
  };

  return (
    <div>
      <h2>게시물 업로드</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용"></textarea>
        <button type="submit">업로드</button>
      </form>
    </div>
  );
}

export default Upload;
