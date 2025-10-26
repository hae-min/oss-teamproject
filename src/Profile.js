import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchMyInfo = async () => {
      const params = new URLSearchParams(window.location.search);
      const loggedInUserId = params.get('userid');

      if (!loggedInUserId) {
        alert('로그인 후 이용해주세요');
        navigate('/login');
        return;
      }

      setUserId(loggedInUserId);
      setLoading(true);
      try {
        const response = await fetch(`https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${loggedInUserId}`);

        if (!response.ok) {
          alert('데이터를 불러올 수 없습니다');
          setLoading(false);
          return;
        }

       const myUser = await response.json(); 

if (!myUser) { 
  alert('사용자를 찾을 수 없습니다');
  setLoading(false);
  return;
}

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

      const rewardsHTML = searchedUser.rewards && searchedUser.rewards.length > 0
        ? searchedUser.rewards.map((url, i) =>
          `<img src="${url}" alt="reward-${i}" style="width: 150px; margin: 10px; border-radius: 10px;" />`
        ).join('')
        : '<p>아직 받은 강아지 사진이 없어요 🐾 공부를 시작하고 귀여운 강아지로 채워주세요!🐾</p>';

      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>사용자 정보 - ${searchedUser.nickname}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet">
          <style>
            body {
              padding: 20px;
              font-family: 'Gamja Flower', cursive;
              background-color: #fbf5d9 ;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              padding: 30px;
              border-radius: 15px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            h1 {
              text-align: center;
              color: #ffc107;
              margin-bottom: 30px;
            }
            .info {
              margin: 15px 0;
              padding: 15px;
              background-color: #fbf5d9 ;
              border-radius: 8px;
              border-left: 4px solid #ffc107;
              font-size: 18px;
            }
            .label {
              font-weight: bold;
              color: #ff9800;
              margin-right: 10px;
            }
            .rewards-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🐶 댕모도로 - 사용자 정보</h1>
            <div class="info"><span class="label">닉네임:</span> ${searchedUser.nickname}</div>
            <div class="info"><span class="label">프로필 메시지:</span> ${searchedUser.message || '메시지가 없습니다'}</div>
            <div class="info"><span class="label">총 공부 시간:</span> ${searchedUser.study || 0}시간</div>
            <div class="info">
              <span class="label">수집한 사진:</span>
              <div class="rewards-container">
                ${rewardsHTML}
              </div>
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
    <div className="profile_container" style={{
      maxWidth: '800px',
      minHeight: 'calc(100vh - 40px)',
      margin: '0 auto',
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="gamja-flower-regular" style={{ margin: 0 }}>🐶댕모도로</h1>
        <div className='btn btn-warning gamja-flower-regular' onClick={() => navigate(`/home?userid=${userId}`)}>home</div>
      </div>


      <form onSubmit={handleSearch}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className='gamja-flower-regular'>내 정보</h2>
          <div className="search" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              placeholder="사용자 nickname입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{ height: '38px', padding: '6px 12px' , flex: 1, borderRadius: '10px' , borderColor: 'gray', borderStyle: 'solid', borderWidth:'1px'}}
            />
            <button type="submit" className="btn btn-warning gamja-flower-regular" disabled={loading} style={{ height: '38px', padding: '6px 12px' }}>
              {loading ? '검색 중...' : '검색'}
            </button>
          </div>
        </div>
      </form>

      <br></br>

      <div className="user_info">
        {loading ? (
          <div>로딩 중...</div>
        ) : user ? (
          <>
            <h5 className="gamja-flower-regular">닉네임: {user.nickname}</h5>

            <form onSubmit={handleSaveMessage}>
              <div className='profile_messege' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type='text'
                  className="gamja-flower-regular"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="프로필 메시지를 입력하세요"
                  style={{ height: '38px', padding: '6px 12px', flex: 1, borderRadius: '10px' , borderColor: 'gray', borderStyle: 'solid', borderWidth:'1px'}}
                />
                <button type='submit' className='btn btn-warning gamja-flower-regular' disabled={isSaving} style={{ height: '38px', padding: '6px 12px' }}>
                  {isSaving ? '저장 중...' : '저장'}
                </button>
              </div>
            </form>
<br></br>
            <h5 className="gamja-flower-regular">총 공부 시간: {user.study || 0}시간</h5>
            <div className="user_img"></div>



            <div className="rewards_section" style={{ marginTop: '30px' }}>
              <h5 className="gamja-flower-regular">내 컬렉션 🐶</h5>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {user.rewards && user.rewards.length > 0 ? (
                  user.rewards.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`reward-${i}`}
                      style={{ width: "150px", margin: "10px", borderRadius: "10px" }}
                    />
                  ))
                ) : (
                  <p className="gamja-flower-regular">아직 받은 강아지 사진이 없어요 🐾</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div>사용자 정보를 불러올 수 없습니다</div>
        )}
      </div>
    </div>
  );
}

export default Profile;