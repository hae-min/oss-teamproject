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
                await response.json();
                setMessage('회원가입이 완료되었습니다!');
                reset();
                navigate('/');
            }
            else {
                setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            setMessage('오류가 발생했습니다: ' + error.message);
        }
    };

    return (
        <div className="join_container" style={{
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
            <h1 className='gamja-flower-regular' style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                fontSize: '2.5rem'
            }}>
                🐶회원가입
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                <div className="gamja-flower-regular" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '1rem' }}>
                        아이디 입력
                    </label>
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
                    {errors.userid && (
                        <p className="gamja-flower-regular" style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
                            {errors.userid.message}
                        </p>
                    )}
                </div>

                <div className="input_password gamja-flower-regular" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '1rem' }}>
                        비밀번호 입력
                    </label>
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
                    {errors.password && (
                        <p className="gamja-flower-regular" style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="input_nickname gamja-flower-regular" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '1rem' }}>
                        닉네임 입력
                    </label>
                    <input
                        type="text"
                        className="join_nickname"
                        placeholder='2자 이상 입력'
                        {...register("nickname", {
                            required: "닉네임을 입력해주세요",
                            minLength: {
                                value: 2,
                                message: "닉네임은 2자 이상이어야 합니다"
                            }
                        })}
                        disabled={isSubmitting}
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
                    {errors.nickname && (
                        <p className="gamja-flower-regular" style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
                            {errors.nickname.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-warning gamja-flower-regular"
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        height: '50px',
                        fontSize: '1.1rem',
                        marginTop: '10px'
                    }}
                >
                    {isSubmitting ? '처리중...' : '회원가입하기'}
                </button>
            </form>

            {message && (
                <p className="gamja-flower-regular" style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    fontSize: '1rem',
                    color: message.includes('완료') ? 'green' : 'red'
                }}>
                    {message}
                </p>
            )}

        </div>
    );
}

export default Join;