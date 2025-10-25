function MyProfile() {
  return (
    <div className="profile_container">
      <h1 className="title">댕모도로</h1>
      <div>내 정보</div>
      <form>
        <div>
          <input type="text" name="nickname" placeholder="사용자 nickname입력"></input>
          <button type="submit">검색</button>
        </div>
      </form>
      <div className="user_info">
        <div className="user_nickname">000</div>
        <div className="user_studytime">총 공부 시간: 20시간</div>
        <div className="user_img"></div>
      </div>
    </div>
  );
}

export default MyProfile;