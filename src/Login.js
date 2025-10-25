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
            const response = await fetch('https://68db330123ebc87faa323a7c.mockapi.io/userinfo');
            
            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            const users = await response.json();
            const user = users.find(u => u.userid === id && u.password === password);

            if (user) {
                console.log('로그인 성공!', user);
                window.location.href = '/home';
            } else {
                setError('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (err) {
            console.error('로그인 에러:', err);
            setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignupClick = () => {
        window.location.href = '/join';
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
                    className="btn btn-warning"
                    disabled={loading}
                >{/*login_button*/}
                    {loading ? '로그인 중...' : 'log in'}
                </button>
            </form>

            <button 
                type="button" 
                className="btn btn-warning"
                onClick={handleSignupClick}
            >{/*login_join_button*/}
                회원가입
            </button>
        </div>
    );
}

export default Login;
