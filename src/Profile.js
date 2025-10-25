import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(''); // 프로필 메시지 상태
  const [isSaving, setIsSaving] = useState(false); // 저장 중 상태

  // 컴포넌트 마운트 시 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const fetchMyInfo = async () => {
      const params = new URLSearchParams(window.location.search);
      const loggedInUserId = params.get('userid');

      if (!loggedInUserId) {
        alert('로그인 후 이용해주세요');
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://68db330123ebc87faa323a7c.mockapi.io/userinfo?userid=${loggedInUserId}`);

        if (!response.ok) {
          alert('데이터를 불러올 수 없습니다');
          setLoading(false);
          return;
        }

        const users = await response.json();

        if (users.length === 0) {
          alert('사용자를 찾을 수 없습니다');
          setLoading(false);
          return;
        }

        const myUser = users[0]; // 첫 번째 결과 사용
        setUser(myUser);
        setMessage(myUser.message || '');
      } catch (err) {
        console.error('정보 불러오기 오류:', err);
        alert('정보를 불러오는 중 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, [navigate]);

  // 프로필 메시지 저장
  const handleSaveMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('사용자 정보를 불러오지 못했습니다');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, message })
      });

      if (!response.ok) {
        alert('메시지 저장에 실패했습니다');
        setIsSaving(false);
        return;
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      alert('프로필 메시지가 저장되었습니다');
    } catch (err) {
      console.error('메시지 저장 오류:', err);
      alert('메시지 저장 중 오류가 발생했습니다');
    } finally {
      setIsSaving(false);
    }
  };

  // 닉네임 검색
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://68db330123ebc87faa323a7c.mockapi.io/userinfo?nickname=${nickname.trim()}`
      );

      if (!response.ok) {
        setLoading(false);
        alert('데이터를 불러올 수 없습니다');
        return;
      }

      const users = await response.json();
      if (users.length === 0) {
        setLoading(false);
        alert('사용자를 찾을 수 없습니다');
        return;
      }

      const searchedUser = users[0];

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
            <div class="info"><span class="label">닉네임:</span> ${searchedUser.nickname}</div>
            <div class="info"><span class="label">프로필 메시지:</span> ${searchedUser.message || '메시지가 없습니다'}</div>
            <div class="info"><span class="label">총 공부 시간:</span> ${searchedUser.study || 0}시간</div>
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
      <h1 className="gamja-flower-regular">🐶댕모도로</h1>
      <div className='btn btn-warning gamja-flower-regular' onClick={() => navigate('/')}>home</div>
      <div className='gamja-flower-regular'>내 정보</div>

      <form onSubmit={handleSearch}>
        <div className="search">
          <input
            type="text"
            placeholder="사용자 nickname입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="submit" className="btn btn-warning gamja-flower-regular" disabled={loading}>
            {loading ? '검색 중...' : '검색'}
          </button>
        </div>
      </form>

      <div className="user_info">
        {loading ? (
          <div>로딩 중...</div>
        ) : user ? (
          <>
            <div className="gamja-flower-regular">{user.nickname}</div>

            <form onSubmit={handleSaveMessage}>
              <div className='profile_messege'>
                <input
                  type='text'
                  className="gamja-flower-regular"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="프로필 메시지를 입력하세요"
                />
                <button type='submit' className='btn btn-warning gamja-flower-regular' disabled={isSaving}>
                  {isSaving ? '저장 중...' : '저장'}
                </button>
              </div>
            </form>

            <div className="gamja-flower-regular">총 공부 시간: {user.study || 0}시간</div>
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
