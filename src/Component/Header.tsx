import logo from "../assets/icons/DermaLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-orange-400 w-full h-16 flex items-center justify-between px-4">
      <img
        src={logo}
        alt="DermaAI Logo"
        className="h-[10rem] pt-2 w-auto object-contain"
      />
      <div className="flex gap-6 text-white">
        <Link to="/signup" className="cursor-pointer hover:text-gray-200">
          Sign up
        </Link>
        <Link to="/login" className="cursor-pointer hover:text-gray-200">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
