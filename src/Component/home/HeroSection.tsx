import useAppSelector from "../../Hooks/useAppSelector";

const HeroSection: React.FC = () => {
  const { isAuthenticated, name } = useAppSelector((state) => state.auth);
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 to-white flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-4xl md:text-6xl capitalize font-bold text-orange-600 mb-6">
        {isAuthenticated
          ? `    Welcome to Derma AI  ${name}`
          : "Welcome to Derma AI"}
      </h1>
      <p className="text-orange-900 text-lg md:text-xl max-w-2xl">
        Your AI-powered skin health companion. Detect, learn, and glow
        confidently.
      </p>
      <button className="mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
        Start Skin Scan
      </button>
    </section>
  );
};

export default HeroSection;
