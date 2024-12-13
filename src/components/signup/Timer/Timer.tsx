import { formattedTime } from "@/utils/formatter/time";
import { useEffect, useState } from "react";

export interface ITimerProps {
  timeout: number;
  onTimeout: () => void;
}

const Timer = ({ timeout, onTimeout }: ITimerProps) => {
  // 남은 시간
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainigTime) => {
        const newRemainingTime = prevRemainigTime - 1000;
        if (newRemainingTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newRemainingTime;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>{formattedTime(remainingTime)} 안에 인증 코드를 입력해주세요!</p>
    </div>
  );
};

export default Timer;
