import { useAppContext } from "../../context/AppContext";
import styles from "./Today.module.css";
import windSpeed from "../../assets/windSpeed.png";

function Today() {
  const { forecastData } = useAppContext();
  let todayAtArr = [];

  for (let i = 0; i < 8; i++) {
    const forecastItem = forecastData?.list[i];
    const date = new Date(forecastItem?.dt * 1000);
    const options = { hour: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString([], options);
    todayAtArr.push({
      formattedTime: formattedTime,
      forecastItem: forecastItem,
    });
  }

  /**
   * Converts meters per second to kilometers per hour.
   * @param {number} mps - Speed in meters per second.
   * @returns {number} - Speed in kilometers per hour.
   */
  function mps_to_kmh(mps) {
    return mps * 3.6;
  }

  return (
    <section
      className={`${styles.hourlyForecast} glass-card`}
      aria-label="hourly forecast"
      data-hourly-forecast
    >
      <div className="glass-highlight"></div>
      <div className="glass-content">
        <h2>Today at</h2>
        <div className={styles.sliderContainer}>
          <ul className={styles.sliderList} data-temp>
            {todayAtArr.map((item, index) => (
              <li className={`${styles.sliderItem} glass-card`} key={index}>
                <div className="glass-highlight"></div>
                <div className="glass-content">
                  <p>{item.formattedTime}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.forecastItem?.weather[0].icon}@2x.png`}
                    alt={item.forecastItem?.weather[0].description}
                    title={item.forecastItem?.weather[0].description}
                    loading="lazy"
                  />
                  <p>{parseInt(item.forecastItem?.main.temp)} °C</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className={styles.sliderList} data-temp>
            {todayAtArr.map((item, index) => (
              <li className={`${styles.sliderItem} glass-card`} key={index}>
                <div className="glass-highlight"></div>
                <div className="glass-content">
                  <p>{item.formattedTime}</p>
                  <img
                    src={windSpeed}
                    alt="direction"
                    title="direction"
                    loading="lazy"
                    style={{
                      transform: `rotate(${item.forecastItem?.wind.deg - 180}deg)`,
                    }}
                  />
                  <p>{parseInt(mps_to_kmh(item.forecastItem?.wind.speed))} Km/h</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Today;
