import React, { useEffect, useState } from "react";
import axios from "axios";

function Timer({ studyTime, restTime, sets, breed }) {
  const [timeLeft, setTimeLeft] = useState(studyTime * 60);
  const [isStudy, setIsStudy] = useState(true);
  const [currentSet, setCurrentSet] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [rewardImage, setRewardImage] = useState("");

  const toggleTimer = () => setIsRunning((prev) => !prev);

  // ✅ 보상 저장 함수
  const giveDogReward = async () => {
    if (!breed) return;
    try {
      // 1️⃣ 강아지 이미지 가져오기
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await res.json();
      const dogImageUrl = data.message;

      // 2️⃣ 현재 로그인한 사용자 id 가져오기
      const userId = localStorage.getItem("userId");

      // 3️⃣ 사용자 데이터 불러오기
      const userRes = await axios.get(
        `https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${userId}`
      );
      const userData = userRes.data;

      // 4️⃣ 보상 배열 업데이트
      const updatedRewards = [...(userData.rewards || []), dogImageUrl];

      // 5️⃣ MockAPI에 업데이트 요청
      await axios.put(
        `https://68db330123ebc87faa323a7c.mockapi.io/userinfo/${userId}`,
        {
          ...userData,
          rewards: updatedRewards,
        }
      );

      alert("🎉 보상 강아지 사진이 프로필에 저장되었습니다!");
    } catch (err) {
      console.error("보상 저장 실패:", err);
    }
  };

  // ✅ 보상 이미지를 화면에 표시
  const fetchRewardImage = async () => {
    if (!breed) return;
    try {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await res.json();
      setRewardImage(data.message);
    } catch (err) {
      console.error("보상 이미지 로드 실패:", err);
    }
  };

  // ✅ 타이머 초기화
  useEffect(() => {
    setTimeLeft(studyTime * 60);
    setIsStudy(true);
    setCurrentSet(1);
    setRewardImage("");
    setIsRunning(false);
  }, [studyTime, restTime, sets, breed]);

  // ✅ 타이머 동작
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;

        if (isStudy) {
          setIsStudy(false);
          return restTime * 60;
        } else {
          if (currentSet < sets) {
            setCurrentSet((s) => s + 1);
            setIsStudy(true);
            return studyTime * 60;
          } else {
            // ✅ 모든 세트 완료 시 호출
            clearInterval(timer);
            setIsRunning(false);
            fetchRewardImage(); // 화면에 표시
            giveDogReward(); // MockAPI에 저장
            return 0;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isStudy, currentSet, studyTime, restTime, sets]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="gamja-flower-regular">
        {isStudy ? "공부 중 ⏰" : "휴식 중 ☕"} | 세트 {currentSet}/{sets}
      </h2>
      <h1 style={{ fontSize: "48px" }}>{formatTime(timeLeft)}</h1>
      <button className="btn btn-warning" onClick={toggleTimer}>
        {isRunning ? "일시정지" : "시작"}
      </button>

      {rewardImage && (
        <div style={{ marginTop: "20px" }}>
          <h3 className="gamja-flower-regular">🎉 모든 세트 완료!</h3>
          <img src={rewardImage} alt={breed} width="300" />
        </div>
      )}
    </div>
  );
}

export default Timer;



