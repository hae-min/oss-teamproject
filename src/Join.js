import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Join() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            userid: '',
            password: '',
            nickname: ''
        }
    });

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setMessage('');

        try {
            const response = await fetch('https://68db330123ebc87faa323a7c.mockapi.io/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: data.userid,
                    password: data.password,
                    nickname: data.nickname,
                    lastdate: 0,
                    study_time: 0,
                    message: "",
                    dogPic: "",
                })
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('회원가입이 완료되었습니다!');
                reset(); // 폼 초기화
                setTimeout(() => {
                    navigate('/login'); // ✅ React Router 방식으로 이동
                }, 1000);
            } else {
                setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            setMessage('오류가 발생했습니다: ' + error.message);
        }
    };

    return (
        <div>
            <h1 className='gamja-flower-regular'>🐶회원가입</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="gamja-flower-regular">
                    아이디 입력
                    <input
                        type="text"
                        className="join_id"
                        placeholder='3자 이상 입력'
                        {...register("userid", {
                            required: "아이디를 입력해주세요",
                            minLength: {
                                value: 3,
                                message: "아이디는 3자 이상이어야 합니다"
                            }
                        })}
                        disabled={isSubmitting}
                    />
                    {errors.userid && (
                        <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
                            {errors.userid.message}
                        </p>
                    )}
                </div>

                <div className="input_password gamja-flower-regular">
                    비밀번호 입력
                    <input
                        type="password"
                        className="join_password"
                        placeholder='6자 이상 입력'
                        {...register("password", {
                            required: "비밀번호를 입력해주세요",
                            minLength: {
                                value: 6,
                                message: "비밀번호는 6자 이상이어야 합니다"
                            }
                        })}
                        disabled={isSubmitting}
                    />
                    {errors.password && (
                        <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="input_nickname gamja-flower-regular">
                    닉네임 입력
                    <input
                        type="text"
                        className="join_nickname"
                        {...register("nickname", {
                            required: "닉네임을 입력해주세요",
                            minLength: {
                                value: 2,
                                message: "닉네임은 2자 이상이어야 합니다"
                            }
                        })}
                        disabled={isSubmitting}
                    />
                    {errors.nickname && (
                        <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
                            {errors.nickname.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-warning gamja-flower-regular"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '처리중...' : '회원가입하기'}
                </button>
            </form>

            {message && (
                <p style={{
                    marginTop: '10px',
                    color: message.includes('완료') ? 'green' : 'red'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default Join;