import { Icon, InlineIcon } from "@iconify/react";
import grinningCat from "@iconify-icons/twemoji/grinning-cat";
import catWithWrySmile from "@iconify-icons/twemoji/cat-with-wry-smile";
import ReactStars from "react-rating-stars-component";

const RatingBox = ({ title, rating }) => {
  return (
    <div className="ratingBox">
      <div className="label">{title}</div>
      <ReactStars
        className="rating"
        count={4}
        // onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
        isHalf={true}
        edit={false}
        value={rating}
      />
    </div>
  );
};

export default RatingBox;
