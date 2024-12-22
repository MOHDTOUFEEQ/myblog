const Footer = () => {
  return (
    <footer
      className="bg-[#FFFAE3] text-black py-8 overflow-hidden"
      style={{ height: "auto", minHeight: "auto" }}
    >
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-3xl font-bold">Blog </h2>
            <h2 className="text-lg font-bold mt-1">Spot</h2>
          </div>

          {/* Social Media Section */}
          <div className="footer__social flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold mb-2 text-center w-full">Social</h2>
            <ul className="flex gap-6">
              <li>
                <a
                  href="https://www.linkedin.com/in/mohammed-toufeeq-956042266/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-blue-600"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MOHDTOUFEEQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-700"
                >
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_toufeeq_17/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-pink-500"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/mohdtou36173459"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-blue-400"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-xs mt-4">
          <p>&copy; 2025 Toufeeq. All rights reserved.</p>
          <p className="mt-1">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms-of-use" className="hover:underline">
              Terms of Use
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
