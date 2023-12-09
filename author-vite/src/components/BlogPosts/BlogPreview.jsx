import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BlogPreview.css"; // Ensure you have the necessary CSS

export default function BlogPreview({ posts }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {posts.map((post) => (
          <div className="slider-item" key={post.id}>
            <img
              src="../../public/Images/1.png"
              alt={post.title}
              className="slider-image"
            />
            <h1 className="slider-title">{post.title}</h1>
          </div>
        ))}
      </Slider>
    </div>
  );
}
