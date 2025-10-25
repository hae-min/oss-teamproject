import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE = 'https://68db330123ebc87faa323a7c.mockapi.io';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/userinfo?userid=${encodeURIComponent(id)}`);
            if (!response.ok) throw new Error('서버 응답 오류');

            const users = await response.json();

            if (users.length > 0) {
                const user = users[0];
                if (user.password === password) {
                    console.log('로그인 성공', user);
                    localStorage.setItem("userId", user.id);
                    navigate(`/home?userid=${encodeURIComponent(id)}`);
                } else {
                    setError('비밀번호가 올바르지 않습니다.');
                }
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
        <div className="login_container" style={{
            maxWidth: '800px',
            minHeight: 'calc(100vh - 40px)',
            margin: '0 auto',
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <h1 className="gamja-flower-regular" style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                fontSize: '2.5rem'
            }}>
                🐶댕모도로
            </h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                <div className="login_info" style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        name="id"
                        className="id gamja-flower-regular"
                        placeholder="아이디 입력"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            height: '50px',
                            padding: '6px 12px',
                            borderRadius: '10px',
                            borderColor: 'gray',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div className="login_info" style={{ marginBottom: '20px' }}>
                    <input
                        type="password"
                        name="password"
                        className="password gamja-flower-regular"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            height: '50px',
                            padding: '6px 12px',
                            borderRadius: '10px',
                            borderColor: 'gray',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                {error && (
                    <div className="error_message gamja-flower-regular" style={{ 
                        color: 'red', 
                        textAlign: 'center', 
                        marginBottom: '15px' 
                    }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-warning gamja-flower-regular"
                    disabled={loading}
                    style={{
                        width: '100%',
                        height: '50px',
                        fontSize: '1.1rem',
                        marginBottom: '15px'
                    }}
                >
                    {loading ? '로그인 중...' : '로그인'}
                </button>
            </form>

            {/* 회원가입 버튼을 form 밖으로 분리하고 중앙 정렬 */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button
                    type="button"
                    className="btn btn-link gamja-flower-regular"
                    onClick={() => navigate('/join')}
                    style={{
                        color:'gray'
                    }}
                >
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default Login;