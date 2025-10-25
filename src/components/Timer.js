import React, { useEffect, useState } from "react";

function Timer({ studyTime, restTime, sets, breed }) {
  const [timeLeft, setTimeLeft] = useState(studyTime * 60);
  const [isStudy, setIsStudy] = useState(true);
  const [currentSet, setCurrentSet] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [rewardImage, setRewardImage] = useState("");


  const toggleTimer = () => setIsRunning((prev) => !prev);

  useEffect(() => {
    setTimeLeft(studyTime * 60);
    setIsStudy(true);
    setCurrentSet(1);
    setRewardImage("");
    setIsRunning(false);
  }, [studyTime, restTime, sets, breed]);

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
           
            clearInterval(timer);
            setIsRunning(false);
            fetchRewardImage();
            return 0;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isStudy, currentSet, studyTime, restTime, sets]);

  
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

