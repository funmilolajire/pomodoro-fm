import styles from "./settings.module.scss";
const colorThemes: { [key: number]: string } = {
  1: "#F87070",
  2: "#70F3F8",
  3: "#D881F8",
};

const fontThemes: { [key: number]: string } = {
  1: "'Kumbh Sans', sans-serif",
  2: "'Roboto Slab', serif",
  3: "'Space Mono', monospace",
};
const Settings = ({
  times,
  handleTimes,
  theme,
  handleTheme,
  handleModal,
}: {
  handleModal: (value: boolean) => void;
  theme: { font: string; color: string };
  handleTheme: (value: typeof theme) => void;
  handleTimes: (value: typeof times) => void;
  times: { pomodoro: number; short_break: number; long_break: number };
}) => {
  const saveSettings = () => {
    localStorage.setItem("pafeo-set-times", JSON.stringify(times));
    localStorage.setItem("pafeo-current-times", JSON.stringify(times));
    localStorage.setItem("pafeo-theme", JSON.stringify(theme));
    handleTimes(times);
  };
  const getMinutes = (value: number) =>
    Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className={styles["settings-overlay"]}>
      <div className={styles.settings}>
        <header className={styles.header}>
          <h2>Settings</h2>
          <button onClick={() => handleModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
              <path
                fill="#1E213F"
                fillRule="evenodd"
                d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
                opacity=".5"
              />
            </svg>
          </button>
        </header>
        <div className={styles.body}>
          <section className={styles.time}>
            <h3>Time (minutes)</h3>
            <ul className={styles.options}>
              <li>
                <label htmlFor="pomodoro">pomodoro</label>
                <div className={styles.display}>
                  {getMinutes(times.pomodoro)}
                  <div className={styles.controls}>
                    <button
                      onClick={() =>
                        handleTimes({
                          ...times,
                          pomodoro: times.pomodoro + 60000,
                        })
                      }
                      className={styles.increase}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                      >
                        <path
                          fill="none"
                          stroke="#1E213F"
                          strokeOpacity=".25"
                          strokeWidth="2"
                          d="M1 6l6-4 6 4"
                        />
                      </svg>
                    </button>
                    <button
                      className={styles.decrease}
                      onClick={() =>
                        handleTimes({
                          ...times,
                          pomodoro:
                            getMinutes(times.pomodoro) !== 1
                              ? times.pomodoro - 60000
                              : times.pomodoro,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                      >
                        <path
                          fill="none"
                          stroke="#1E213F"
                          strokeOpacity=".25"
                          strokeWidth="2"
                          d="M1 1l6 4 6-4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <label htmlFor="short-break">short break</label>
                <div className={styles.display}>
                  {getMinutes(times.short_break)}
                  <div className={styles.controls}>
                    <button
                      className={styles.increase}
                      onClick={() =>
                        handleTimes({
                          ...times,
                          short_break: times.short_break + 60000,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                      >
                        <path
                          fill="none"
                          stroke="#1E213F"
                          strokeOpacity=".25"
                          strokeWidth="2"
                          d="M1 6l6-4 6 4"
                        />
                      </svg>
                    </button>
                    <button
                      className={styles.decrease}
                      onClick={() =>
                        handleTimes({
                          ...times,
                          short_break:
                            getMinutes(times.short_break) !== 1
                              ? times.short_break - 60000
                              : times.short_break,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                      >
                        <path
                          fill="none"
                          stroke="#1E213F"
                          strokeOpacity=".25"
                          strokeWidth="2"
                          d="M1 1l6 4 6-4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <label htmlFor="long-break">long break</label>
                <div className={styles.display}>
                  {getMinutes(times.long_break)}
                  <div className={styles.controls}>
                    <button
                      className={styles.increase}
                      onClick={() =>
                        handleTimes({
                          ...times,
                          long_break: times.long_break + 60000,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                      >
                        <path
                          fill="none"
                          stroke="#1E213F"
                          strokeOpacity=".25"
                          strokeWidth="2"
                          d="M1 6l6-4 6 4"
                        />
                      </svg>
                    </button>
                    <button
                      className={styles.decrease}
                      onClick={() =>
                        handleTimes({
                          ...times,
                          long_break:
                            getMinutes(times.long_break) !== 1
                              ? times.long_break - 60000
                              : times.long_break,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                      >
                        <path
                          fill="none"
                          stroke="#1E213F"
                          strokeOpacity=".25"
                          strokeWidth="2"
                          d="M1 1l6 4 6-4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <section className={styles.font}>
            <h3>Font</h3>
            <ul className={styles.options}>
              <li
                className={theme.font === fontThemes[1] ? styles.active : ""}
                onClick={() => handleTheme({ ...theme, font: fontThemes[1] })}
              >
                Aa
              </li>
              <li
                className={theme.font === fontThemes[2] ? styles.active : ""}
                onClick={() => handleTheme({ ...theme, font: fontThemes[2] })}
              >
                Aa
              </li>
              <li
                className={theme.font === fontThemes[3] ? styles.active : ""}
                onClick={() => handleTheme({ ...theme, font: fontThemes[3] })}
              >
                Aa
              </li>
            </ul>
          </section>
          <section className={styles.color}>
            <h3>Color</h3>
            <ul className={styles.options}>
              <li
                className={theme.color === colorThemes[1] ? styles.active : ""}
                onClick={() => handleTheme({ ...theme, color: colorThemes[1] })}
              ></li>
              <li
                className={theme.color === colorThemes[2] ? styles.active : ""}
                onClick={() => handleTheme({ ...theme, color: colorThemes[2] })}
              ></li>
              <li
                className={theme.color === colorThemes[3] ? styles.active : ""}
                onClick={() => handleTheme({ ...theme, color: colorThemes[3] })}
              ></li>
            </ul>
          </section>
        </div>
        <button
          className={styles.apply}
          onClick={() => {
            saveSettings();
            handleModal(false);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Settings;
