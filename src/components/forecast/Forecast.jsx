import { useAppContext } from "../../context/AppContext";
import styles from "./Forecast.module.css";

function Forecast() {
  const { forecastData } = useAppContext();
  let fiveDaysForecast = [];

  for (let i = 7; i < forecastData?.list.length; i += 8) {
    const forecastItem = forecastData?.list[i];
    const date = new Date(forecastItem?.dt * 1000);
    const options = { day: "numeric", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    fiveDaysForecast.push({
      formattedDate: formattedDate,
      dayName: dayName,
      forecastItem: forecastItem,
    });
  }

  return (
    <section className={`${styles.forecast} glass-card`} aria-label="forecast">
      <div className="glass-highlight"></div>
      <div className="glass-content">
        <h2> 5 Days Forecast: </h2>
        <div className={styles.cardWrapper}>
          {fiveDaysForecast.map((item) => (
            <div className={`${styles.card} glass-card`} key={item.forecastItem.dt}>
              <div className="glass-highlight"></div>
              <div className="glass-content">
                <img
                  src={`https://openweathermap.org/img/wn/${item.forecastItem.weather[0].icon}@2x.png`}
                  alt={item.forecastItem.weather[0].description}
                  title={item.forecastItem.weather[0].description}
                  className="weather-icon"
                  loading="lazy"
                />
                <span>{parseInt(item.forecastItem.main.temp_max)}°c</span>
                <p className={styles.label}>{item.formattedDate}</p>
                <p className={styles.label}>{item.dayName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Forecast;
