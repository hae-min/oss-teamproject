function Join(){
    return(
        <div>
            <h1>회원가입</h1>
            <form>
                <div className="input_id">
                    아이디 입력
                    <input type="text" name="join_id" className="join_id"></input>
                </div>

                <div className="input_password">
                    비밀번호 입력
                    <input type="password" name="join_password" className="join_password"></input>
                </div>

                <div className="input_password">
                    닉네임 입력
                    <input type="password" name="join_password" className="join_password"></input>
                </div>
            </form>
        </div>
    );
}

export default Join;