import styles from "./Footer.module.css";
import openWeatherLogo from "../../assets/openweatherImg.png";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.openWeather}>
        <p>Data provided by </p>
        <a
          href="https://openweathermap.org/api"
          title="OpenWeather API"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={openWeatherLogo} alt="openWeather" loading="lazy" />
        </a>
      </div>
      <p className={styles.info}>Designed and Developed by:</p>
      <p>
        <sup>&#169; </sup>
        {currentYear} <span className={styles.myName}>Ankush</span>
      </p>
      <div className={styles.links}>
        <a
          href="https://www.linkedin.com/in/ankush2992/"
          title="LinkedIn Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/ankush2992"
          title="GitHub Profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        
      </div>
    </footer>
  );
}

export default Footer;
