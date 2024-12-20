const Footer = () => {
  return (
    <footer className="bg-[#FFFAE3] text-black py-12 overflow-x-hidden">
      <div className="container flex flex-col md:flex-row justify-between items-center mx-auto px-6">
        {/* Left Section */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl font-bold">TOUFEEQ</h2>
          <h2 className="text-2xl font-bold mt-2">PORTFOLIO</h2>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Social</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/mohammed-toufeeq-956042266/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
            >
              <img
                src="/path/to/linkedin-icon.png"
                alt="LinkedIn"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://github.com/MOHDTOUFEEQ"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
            >
              <img
                src="/path/to/github-icon.png"
                alt="GitHub"
                className="h-6 w-6"
              />
            </a>
            <a
              href="#"
              className="hover:text-gray-700"
            >
              <img
                src="/path/to/instagram-icon.png"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
            <a
              href="#"
              className="hover:text-gray-700"
            >
              <img
                src="/path/to/twitter-icon.png"
                alt="Twitter"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-sm">
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
    </footer>
  );
};

export default Footer;
