import styles from "./tabs.module.scss";

const Tabs = ({
  activeTab,
  changeTab,
}: {
  activeTab: "pomodoro" | "short_break" | "long_break";
  changeTab: (tab: "pomodoro" | "short_break" | "long_break") => void;
}) => {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.pomodoro} ${
          activeTab === "pomodoro" ? styles.active : ""
        }`}
        onClick={() => changeTab("pomodoro")}
      >
        pomodoro
      </button>
      <button
        className={`${styles["short-break"]} ${
          activeTab === "short_break" ? styles.active : ""
        }`}
        onClick={() => changeTab("short_break")}
      >
        short break
      </button>
      <button
        className={`${styles["long-break"]} ${
          activeTab === "long_break" ? styles.active : ""
        }`}
        onClick={() => changeTab("long_break")}
      >
        long break
      </button>
    </div>
  );
};

export default Tabs;
