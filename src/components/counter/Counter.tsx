import { useEffect, useState } from "react";
import styles from "./counter.module.scss";

const Counter = ({
  times,
  activeTab,
  handleTimes,
}: {
  times: { pomodoro: number; short_break: number; long_break: number };
  handleTimes: (value: typeof times) => void;
  activeTab: "pomodoro" | "short_break" | "long_break";
}) => {
  const [time, setTime] = useState(times[activeTab]);
  const getMinutes = (value: number) =>
    Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
  const getSeconds = (value: number) =>
    Math.floor((value % (1000 * 60)) / 1000);
  const [counterState, setCounterState] = useState<
    "pause" | "restart" | "resume" | "start"
  >(time === 0 ? "restart" : time < times[activeTab] ? "resume" : "start");

  const [counterInterval, setCounterInterval] = useState<number | undefined>(
    undefined
  );
  const stopCounter = () => {
    if (startCounter !== undefined) {
      clearInterval(counterInterval);
    }
    handleTimes({
      ...times,
      [activeTab]: time,
    });
  };
  const startCounter = () => {
    const counterInterval = setInterval(() => {
      setTime((prev) => prev - 1000);
    }, 1000);

    setCounterInterval(counterInterval);
  };
  const storedTimes = JSON.parse(
    localStorage.getItem("pafeo-set-times") as string
  ) as typeof times;
  useEffect(() => {
    setTime(times[activeTab]);
  }, [times, activeTab]);
  useEffect(() => {
    setCounterState(
      time === 0
        ? "restart"
        : times[activeTab] < storedTimes[activeTab]
        ? "resume"
        : "start"
    );
    if (startCounter !== undefined) {
      clearInterval(counterInterval);
    }
  }, [activeTab]);
  useEffect(() => {
    if (time === 0) {
      stopCounter();
      setCounterState("restart");
    }
  }, [time]);

  return (
    <div className={styles.counter}>
      <div className={styles.wrapper}>
        <svg
          className={styles.progress}
          viewBox="2 -2 28 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles["progress-background"]}
            r="16"
            cx="16"
            cy="16"
          ></circle>
          <circle
            className={styles["progress-main"]}
            r="16"
            cx="16"
            cy="16"
            style={{
              strokeDashoffset: (time / storedTimes[activeTab]) * 100,
              strokeLinecap: time === 0 ? "square" : "round",
            }}
          ></circle>
        </svg>
        <section className={styles.text}>
          <h2 className={styles.time}>{`${String(getMinutes(time)).padStart(
            2,
            "0"
          )}:${String(getSeconds(time)).padStart(2, "0")}`}</h2>
          <button
            className={styles.control}
            onClick={() => {
              if (counterState === "pause") {
                stopCounter();
                setCounterState("resume");
              } else if (counterState === "restart") {
                handleTimes({
                  ...times,
                  [activeTab]: storedTimes[activeTab],
                });
                setCounterState("start");
              } else {
                startCounter();
                setCounterState("pause");
              }
            }}
          >
            {counterState}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Counter;
