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
  const [studyTime, setStudyTime] = useState(25); 
  const [restTime, setRestTime] = useState(5);
  const [sets, setSets] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const localUserId = localStorage.getItem("userId");
    const params = new URLSearchParams(location.search);
    const urlUserId = params.get('userid');
   
    const finalUserId = localUserId || urlUserId;
    setUser(finalUserId);
    console.log("최종 사용자 ID:", finalUserId);
  }, [location]);


  const updateStudyTime = async (completedMinutes) => {
    console.log("updateStudyTime 호출됨, user:", user, "completedMinutes:", completedMinutes);
    
    if (!user) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    try {
   
      const url = `https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${user}`;
      console.log("GET 요청 URL:", url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error("GET 요청 실패, 상태 코드:", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      console.log("현재 사용자 데이터:", userData);
  
      const currentStudyTime = Number(userData.study_time) || 0;
      const newStudyTime = currentStudyTime + completedMinutes;
      
      console.log("현재 공부 시간:", currentStudyTime, "→ 새 공부 시간:", newStudyTime);
      
      // 3. 업데이트할 데이터 준비
      const updateData = {
        study_time: newStudyTime
      };
      
      // 4. 날짜가 선택되어 있으면 lastdate도 함께 업데이트
      if (selectedDate) {
        updateData.lastdate = selectedDate;
        console.log("마지막 접속일 업데이트:", selectedDate);
      }
      
      // 5. MockAPI에 업데이트 요청
      const putUrl = `https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${user}`;
      console.log("PUT 요청 URL:", putUrl);
      console.log("업데이트 데이터:", updateData);
      
      const putResponse = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      
      if (!putResponse.ok) {
        console.error("PUT 요청 실패, 상태 코드:", putResponse.status);
        throw new Error(`HTTP error! status: ${putResponse.status}`);
      }
      
      console.log(`공부 시간 업데이트 완료: ${currentStudyTime}분 → ${newStudyTime}분`);
      if (selectedDate) {
        console.log(`마지막 접속일 업데이트 완료: ${selectedDate}`);
        alert(`✅ 공부 시간이 업데이트되었습니다! (${newStudyTime}분)\n마지막 접속일: ${selectedDate}`);
      } else {
        alert(`✅ 공부 시간이 업데이트되었습니다! (${newStudyTime}분)`);
      }
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
  onClick={() => {
    console.log("내가 보낼 user.userid:", user);
    navigate(`/profile?userid=${user}`);
  }}
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
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