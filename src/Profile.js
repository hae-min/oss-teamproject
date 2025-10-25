import { useState, useEffect } from 'react';

function Profile() {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // 사용자 정보 상태 추가

  // 컴포넌트 마운트 시 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const fetchMyInfo = async () => {
      setLoading(true);
      try {
        // 로그인한 사용자의 id (실제로는 로그인 정보에서 가져와야 함)
        const loggedInUserId = '1'; // 여기를 실제 로그인한 사용자 id로 변경
        
        // id로 직접 사용자 정보 가져오기
        const response = await fetch(`https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${loggedInUserId}`);
        
        if (!response.ok) {
          alert('데이터를 불러올 수 없습니다');
          setLoading(false);
          return;
        }
        
        const myUser = await response.json();
        setUser(myUser);
        
      } catch (err) {
        console.error('정보 불러오기 오류:', err);
        alert('정보를 불러오는 중 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://68db330123ebc87faa323a7c.mockapi.io/userinfo');
      
      if (!response.ok) {
        setLoading(false);
        alert('데이터를 불러올 수 없습니다');
        return;
      }
      
      const users = await response.json();
      const searchedUser = users.find(u => u.nickname === nickname.trim());
      
      if (!searchedUser) {
        setLoading(false);
        alert('사용자를 찾을 수 없습니다');
        return;
      }
      
      const newWindow = window.open('', '_blank');
      
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>사용자 정보 - ${searchedUser.nickname}</title>
        </head>
        <body>
          <div class="container">
            <h1>댕모도로 - 사용자 정보</h1>
            <div class="info">
              <span class="label">닉네임:</span> ${searchedUser.nickname}
            </div>
            <div class="info">
              <span class="label">총 공부 시간:</span> ${searchedUser.study || 0}시간
            </div>
          </div>
        </body>
        </html>
      `);
      
      newWindow.document.close();
      
    } catch (err) {
      console.error('검색 오류:', err);
      alert('검색 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile_container">
      <h1 className="title">댕모도로</h1>
      <div>내 정보</div>

      <form onSubmit={handleSearch}>
        <div className="search">
          <input 
            type="text" 
            name="nickname" 
            placeholder="사용자 nickname입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="submit" className="search_button" disabled={loading}>
            {loading ? '검색 중...' : '검색'}
          </button>
        </div>
      </form>

      <div className="user_info">
        {loading ? (
          <div>로딩 중...</div>
        ) : user ? (
          <>
            <div className="user_nickname">{user.nickname}</div>
            <div className="user_studytime">총 공부 시간: {user.study || 0}시간</div>
            <div className="user_img"></div>
          </>
        ) : (
          <div>사용자 정보를 불러올 수 없습니다</div>
        )}
      </div>
    </div>
  );
}

export default Profile;

/* 
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Profile() {
  return (
    <div className="profile_container">
      <h1 className="title">댕모도로</h1>
      <div>내 정보</div>

      <form>
        <div className="search">
          <input type="text" name="nickname" placeholder="사용자 nickname입력"></input>
          <button type="submit" className="search_button" onClick={}>검색</button>
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

export default Profile;
*/