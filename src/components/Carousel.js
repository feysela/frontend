import "../styles/carousel.css";
import bg1 from "../images/Image1.jpg";
import bg2 from "../images/Image2.jpg";
import bg3 from "../images/Image3.jpg";
import bg4 from "../images/Image4.jpg";
import bg5 from "../images/Image5.jpg";
export default function Carousel() {
  const images = [bg1,bg2,bg3,bg4,bg5];
  return (
      <div className="page-container">
        <div className="content">
          <div className="prev"></div>
          <div className="slide-panel">
            {images.map(image=>{
              return(<img src={image} alt="Carousel"/>)
            })}
          </div>
          <div className="next"></div>
        </div>
      </div>
  )
}
