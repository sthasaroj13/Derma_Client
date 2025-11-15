import { Link } from "react-router-dom";
import error from "../assets/icons/4041.jpg";
const NotFound = () => {
  return (
    <>
      <>
        <div className="flex justify-center">
          <img src={error} alt="" />
        </div>
        <Link to="/">
          <span className="flex justify-center text-xl font-semibold text-customBlue underline">
            Go to Dashboard
          </span>
        </Link>
      </>
    </>
  );
};

export default NotFound;
