import { useState } from 'react';

function Login(){
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://68db330123ebc87faa323a7c.mockapi.io/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // 로그인 성공
                console.log('로그인 성공!', data);
                
                // 토큰이 있다면 저장 (예시)
                if (data.token) {
                    sessionStorage.setItem('authToken', data.token);
                }
                
                // 로그인 후 페이지 이동 (React Router 사용 시)
                // navigate('/dashboard');
                
                alert('로그인 성공!');
            } else {
                // 로그인 실패
                setError(data.message || '아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (err) {
            console.error('로그인 에러:', err);
            setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div>
            <h1>댕모도로</h1>
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

                <div className="login_info">
                    <input 
                        type="password" 
                        name="password" 
                        className="password" 
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="error_message" style={{color: 'red'}}>{error}</div>}

                <button 
                    type="submit" 
                    className="login_button"
                    disabled={loading}
                >
                    {loading ? '로그인 중...' : 'log in'}
                </button>
            </form>

            <button type="button" className="login_join_button">회원가입</button>
        </div>
    );
}

export default Login;

/*function Login(){
    return(
        <div>
            <h1>댕모도로</h1>
            <form>
                <div className="login_info">
                    <input type="text" name="id" className="id" placeholder="아이디 입력"></input>
                </div>

                <div className="login_info">
                    <input type="text" name="password" className="password" placeholder="비밀번호 입력"></input>
                </div>

                <button type="submit" className="login_button">log in</button>
            </form>

            <button type="submit" className="login_join_button">회원가입</button>
        </div>
    );
}

export default Login;*/