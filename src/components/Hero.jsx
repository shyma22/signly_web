import "../styles/Hero.css";
import cloud from "../assets/cloud.png";
import star from "../assets/star.png";

function Hero() {
  return (
    <section className="hero">
      <img src={cloud} className="cloud cloud-left" />
      <img src={cloud} className="cloud cloud-right" />
      <img src={star} className="star star-top" />
      <img src={star} className="star star-bottom" />

      <h1 className="title">Signly</h1>
      <p className="subtitle">Your sign language learning partner</p>
    </section>
  );
}

export default Hero;
