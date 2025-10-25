import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = 'https://68db330123ebc87faa323a7c.mockapi.io';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 아이디로만 사용자 조회
      const response = await fetch(`${API_BASE}/userinfo?userid=${encodeURIComponent(id)}`);

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const users = await response.json();

      if (users.length > 0) {
        // 로그인 성공 → 자기 정보 페이지로 이동
        console.log('로그인 성공', users[0]);
        navigate(`/profile?userid=${encodeURIComponent(id)}`);
      } else {
        setError('존재하지 않는 아이디입니다.');
      }
    } catch (err) {
      console.error('로그인 에러:', err);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="gamja-flower-regular">🐶댕모도로</h1>
      <form onSubmit={handleSubmit}>
        <div className="login_info">
          <input
            type="text"
            name="id"
            className="id"
            placeholder="아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        {error && <div className="error_message" style={{ color: 'red' }}>{error}</div>}

        <button
          type="submit"
          className="btn btn-warning gamja-flower-regular"
          disabled={loading}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
}

export default Login;
