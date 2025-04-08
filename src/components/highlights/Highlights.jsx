import styles from "./Highlights.module.css";
import { useAppContext } from "../../context/AppContext";
import { IoMdSunny } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWaterDrop, MdOutlineVisibility } from "react-icons/md";
import { FaWater, FaTemperatureLow } from "react-icons/fa";

function Highlights() {
  const { currentWeatherData } = useAppContext();

  function formatTime(timestamp, timezone) {
    if (!timestamp) return "--";
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  return (
    <section className={`${styles.highlights} glass-card`} aria-label="Highlights">
      <div className="glass-highlight"></div>
      <div className="glass-content">
        <h2 className={styles.tH}>Today's Highlights</h2>
        <div>
          <div className={styles.row}>
            <div className={`${styles.box} glass-card`}>
              <div className="glass-highlight"></div>
              <div className="glass-content">
                <h3>Sunrise</h3>
                <div className={styles.bottom}>
                  <IoMdSunny />
                  <p>
                    {formatTime(
                      currentWeatherData?.sys.sunrise,
                      currentWeatherData?.timezone,
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles.box} glass-card`}>
              <div className="glass-highlight"></div>
              <div className="glass-content">
                <h3>Sunset</h3>
                <div className={styles.bottom}>
                  <IoMoonOutline />
                  <p>
                    {formatTime(
                      currentWeatherData?.sys.sunset,
                      currentWeatherData?.timezone,
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.box} glass-card`}>
              <div className="glass-highlight"></div>
              <div className="glass-content">
                <h3>Humidity</h3>
                <div className={styles.bottom}>
                  <MdOutlineWaterDrop />
                  <p>
                    {currentWeatherData?.main.humidity}
                    <small>%</small>
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles.box} glass-card`}>
              <div className="glass-highlight"></div>
              <div className="glass-content">
                <h3>pressure</h3>
                <div className={styles.bottom}>
                  <FaWater />
                  <p>
                    {currentWeatherData?.main.pressure}
                    <small>hPa</small>
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles.box} glass-card`}>
              <div className="glass-highlight"></div>
              <div className="glass-content">
                <h3>Visibility</h3>
                <div className={styles.bottom}>
                  <MdOutlineVisibility />
                  <p>
                    {currentWeatherData?.visibility / 1000}
                    <small>km</small>
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles.box} glass-card`}>
              <div className="glass-highlight"></div>
              <div className="glass-content">
                <h3>Feels Like</h3>
                <div className={styles.bottom}>
                  <FaTemperatureLow />
                  <p>{currentWeatherData?.main.feels_like.toFixed(1)}°c</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
