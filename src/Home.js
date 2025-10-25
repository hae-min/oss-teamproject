import React, { useState } from "react";
import Timer from "./components/Timer";
import DogSelect from "./components/DogSelect";
import './index.css';

function Home() {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [studyTime, setStudyTime] = useState(25); // 분
  const [restTime, setRestTime] = useState(5); // 분
  const [sets, setSets] = useState(1);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="gamja-flower-regular">🐶 댕모도로</h1>

      <DogSelect onSelect={setSelectedBreed} />

      <div>
        <label htmlFor="stminute" className="gamja-flower-regular">공부 시간(분)</label>
        <select
          id="stminute"
          value={studyTime}
          onChange={(e) => setStudyTime(Number(e.target.value))}
        >
          {[0, 1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor="rsminute" className="gamja-flower-regular">쉬는 시간(분)</label>
        <select
          id="rsminute"
          value={restTime}
          onChange={(e) => setRestTime(Number(e.target.value))}
        >
          {[0, 1, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <br />
        <label htmlFor="set" className="gamja-flower-regular">세트 수</label>
        <br />
        <input className="gamja-flower-regular"
          id="set"
          type="number"
          min="1"
          max="10"
          value={sets}
          onChange={(e) => setSets(Number(e.target.value))}
          placeholder="세트 수를 입력하세요"
        />
      </div>

      <h3 className="gamja-flower-regular">획득할 사진</h3>
      <pre className="gamja-flower-regular">
        공부를 완료하면 {selectedBreed || "강아지"} 사진을 획득하고{"\n"}
        프로필에 추가할 수 있어요!
      </pre>

      <Timer
        studyTime={studyTime}
        restTime={restTime}
        sets={sets}
        breed={selectedBreed}
      />
    </div>
  );
}

export default Home;



