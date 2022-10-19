import Tabs from "../components/tabs/Tabs";
import styles from "./app.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import Counter from "../components/counter/Counter";
import Settings from "../components/settings/Settings";

const defaultTimes = {
  pomodoro: 25 * 60000,
  short_break: 5 * 60000,
  long_break: 20 * 60000,
};
const defaultTheme = {
  font: "'Kumbh Sans', sans-serif",
  color: "#F87070",
};

function App() {
  const [activeTab, setActiveTab] = useState<
    "pomodoro" | "short_break" | "long_break"
  >("pomodoro");
  const changeTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };
  const [theme, setTheme] = useState<{ font: string; color: string }>(
    JSON.parse(localStorage.getItem("pafeo-theme") as string) || {}
  );
  const handleTheme = (value: typeof theme) => setTheme(value);

  const [setTimes, setSetTimes] = useState<{
    pomodoro: number;
    long_break: number;
    short_break: number;
  }>(JSON.parse(localStorage.getItem("pafeo-set-times") as string) || {});

  const [currentTimes, setCurrentTimes] = useState<{
    pomodoro: number;
    long_break: number;
    short_break: number;
  }>(JSON.parse(localStorage.getItem("pafeo-current-times") as string) || {});
  const handleSetTimes = (value: typeof setTimes) => {
    setSetTimes(value);
    setCurrentTimes(value);
  };
  const handleCurrentTimes = (value: typeof setTimes) => setCurrentTimes(value);

  useEffect(() => {
    const storedTheme = localStorage.getItem("pafeo-theme");
    const storedSetTimes = localStorage.getItem("pafeo-set-times");
    if (!storedTheme) {
      localStorage.setItem("pafeo-theme", JSON.stringify(defaultTheme));
      setTheme(defaultTheme);
    }
    if (!storedSetTimes) {
      localStorage.setItem("pafeo-set-times", JSON.stringify(defaultTimes));
      setSetTimes(defaultTimes);
    }
    setCurrentTimes(storedSetTimes ? JSON.parse(storedSetTimes) : defaultTimes);
  }, []);

  const style = {
    "--accent-color": theme.color,
    fontFamily: theme.font,
  } as CSSProperties;

  const [openModal, setOpenModal] = useState(false);
  const handleModal = (value: boolean) => setOpenModal(value);
  return (
    <section className={styles.app} style={style}>
      <h1 className={styles.title}>pomodoro</h1>
      <Tabs activeTab={activeTab} changeTab={changeTab} />
      <Counter
        storedTimes={setTimes}
        times={currentTimes}
        handleTimes={handleCurrentTimes}
        activeTab={activeTab}
      />
      <button className={styles.settings} onClick={() => handleModal(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
          <path
            fill="#D7E0FF"
            d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
            opacity=".5"
          />
        </svg>
      </button>
      {openModal && (
        <Settings
          handleModal={handleModal}
          times={setTimes}
          theme={theme}
          handleTheme={handleTheme}
          handleTimes={handleSetTimes}
        />
      )}
    </section>
  );
}

export default App;
