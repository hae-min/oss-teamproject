function Login(){
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
            <button type="submit" className="join_button">회원가입</button>
        </div>
    );
}

export default Login;