import { useState } from 'react';

function Join() {
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        nickname: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 입력값 검증
        if (!formData.userid || !formData.password || !formData.nickname) {
            setMessage('모든 필드를 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('https://68db330123ebc87faa323a7c.mockapi.io/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: formData.userid,
                    password: formData.password,
                    nickname: formData.nickname,
                    minute_study: 0,
                    minute_rest: 0,
                    dog: "0",
                    study: "0"
                })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('회원가입이 완료되었습니다!');
                // 폼 초기화
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            } else {
                setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            setMessage('오류가 발생했습니다: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <div className="input_id">
                    아이디 입력
                    <input
                        type="text"
                        name="userid"
                        className="join_id"
                        value={formData.userid}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="input_password">
                    비밀번호 입력
                    <input
                        type="password"
                        name="password"
                        className="join_password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="input_nickname">
                    닉네임 입력
                    <input
                        type="text"
                        name="nickname"
                        className="join_nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={isLoading}
                >
                    {isLoading ? '처리중...' : '회원가입하기'}
                </button>{/*join_button*/}
            </form>

            {message && <p style={{ marginTop: '10px', color: message.includes('완료') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
}

export default Join;