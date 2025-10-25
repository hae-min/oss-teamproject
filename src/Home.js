import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import Timer from "./components/Timer";
import DogSelect from "./components/DogSelect";
import './index.css';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); 
  const [id, setId] = useState('');
  const [selectedBreed, setSelectedBreed] = useState("");
  const [studyTime, setStudyTime] = useState(25); // 분
  const [restTime, setRestTime] = useState(5); // 분
  const [sets, setSets] = useState(1);
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userid = params.get('userid'); // 쿼리에서 userid 추출
    
    // localStorage에서도 userId 가져오기 (Timer와 동일한 방식)
    const localUserId = localStorage.getItem("userId");
    
    console.log("URL userid:", userid);
    console.log("localStorage userId:", localUserId);
    
    // userid가 있으면 그것을 사용하고, 없으면 localStorage 사용
    const finalUserId = userid || localUserId;
    setUser(finalUserId);
    console.log("최종 사용자 ID:", finalUserId);
  }, [location]);

  // 공부 시간을 MockAPI에 업데이트하는 함수 (분 단위)
  const updateStudyTime = async (completedMinutes) => {
    console.log("updateStudyTime 호출됨, user:", user, "completedMinutes:", completedMinutes);
    
    if (!user) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    try {
      // 1. 현재 사용자 정보 가져오기
      const url = `https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${user}`;
      console.log("GET 요청 URL:", url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error("GET 요청 실패, 상태 코드:", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      console.log("현재 사용자 데이터:", userData);
      
      // 2. 기존 공부 시간에 새로운 공부 시간 추가 (분 단위)
      const currentStudyTime = Number(userData.study_time) || 0;
      const newStudyTime = currentStudyTime + completedMinutes;
      
      console.log("현재 공부 시간:", currentStudyTime, "→ 새 공부 시간:", newStudyTime);
      
      // 3. 업데이트된 공부 시간 저장
      const putUrl = `https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${user}`;
      console.log("PUT 요청 URL:", putUrl);
      
      const putResponse = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          study_time: newStudyTime
        })
      });
      
      if (!putResponse.ok) {
        console.error("PUT 요청 실패, 상태 코드:", putResponse.status);
        throw new Error(`HTTP error! status: ${putResponse.status}`);
      }
      
      console.log(`공부 시간 업데이트 완료: ${currentStudyTime}분 → ${newStudyTime}분`);
    } catch (error) {
      console.error('공부 시간 업데이트 실패:', error);
    }
  };

  return (
    <div className="home_container" style={{
      maxWidth: '800px',
      minHeight: 'calc(100vh - 40px)',
      margin: '0 auto',
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '30px' }}>
        <h1 className="gamja-flower-regular" style={{ margin: 0, fontSize: '2rem' }}>
          🐶 댕모도로
        </h1>
        <button
          onClick={() => navigate(`/profile?userid=${user}`)}
          className="btn btn-warning gamja-flower-regular"
          style={{
            height: '38px',
            padding: '6px 12px'
          }}
        >
          내 프로필
        </button>
      </div>

      <DogSelect onSelect={setSelectedBreed} />

      <div style={{ marginTop: '30px', marginBottom: '30px', maxWidth: '400px', margin: '30px auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="stminute" className="gamja-flower-regular" style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            공부 시간(분)
          </label>
          <select
            id="stminute"
            value={studyTime}
            onChange={(e) => setStudyTime(Number(e.target.value))}
            className="gamja-flower-regular"
            style={{
              width: '100%',
              height: '45px',
              padding: '6px 12px',
              borderRadius: '10px',
              borderColor: 'gray',
              borderStyle: 'solid',
              borderWidth: '1px',
              fontSize: '1rem'
            }}
          >
            {[0, 1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((m) => (
              <option key={m} value={m}>
                {m}분
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="rsminute" className="gamja-flower-regular" style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            쉬는 시간(분)
          </label>
          <select
            id="rsminute"
            value={restTime}
            onChange={(e) => setRestTime(Number(e.target.value))}
            className="gamja-flower-regular"
            style={{
              width: '100%',
              height: '45px',
              padding: '6px 12px',
              borderRadius: '10px',
              borderColor: 'gray',
              borderStyle: 'solid',
              borderWidth: '1px',
              fontSize: '1rem'
            }}
          >
            {[0, 1, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((m) => (
              <option key={m} value={m}>
                {m}분
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="set" className="gamja-flower-regular" style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            세트 수
          </label>
          <input 
            className="gamja-flower-regular"
            id="set"
            type="number"
            min="1"
            max="10"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            placeholder="세트 수를 입력하세요"
            style={{
              width: '100%',
              height: '45px',
              padding: '6px 12px',
              borderRadius: '10px',
              borderColor: 'gray',
              borderStyle: 'solid',
              borderWidth: '1px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="date" className="gamja-flower-regular" style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            날짜를 입력하세요
          </label>
          <input 
            type="date" 
            id="date"
            className="gamja-flower-regular"
            style={{
              width: '100%',
              height: '45px',
              padding: '6px 12px',
              borderRadius: '10px',
              borderColor: 'gray',
              borderStyle: 'solid',
              borderWidth: '1px',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      <div style={{
        background: '#fff9e6',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px',
        border: '1px solid #ffc107'
      }}>
        <h3 className="gamja-flower-regular" style={{ 
          marginTop: 0, 
          marginBottom: '10px',
          fontSize: '1.3rem'
        }}>
          획득할 사진
        </h3>
        <p className="gamja-flower-regular" style={{
          margin: 0,
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          공부를 완료하면 {selectedBreed || "강아지"} 사진을 획득하고<br />
          프로필에 추가할 수 있어요!
        </p>
      </div>

      <Timer
        studyTime={studyTime}
        restTime={restTime}
        sets={sets}
        breed={selectedBreed}
        onStudyComplete={updateStudyTime}
      />
    </div>
  );
}

export default Home;