const Footer: React.FC = () => {
  return (
    <footer className="text-center  py-6 bg-orange-100 text-orange-800">
      © {new Date().getFullYear()} Derma AI. Your skin’s smart companion.
    </footer>
  );
};

export default Footer;
