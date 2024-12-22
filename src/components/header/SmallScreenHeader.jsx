import { useEffect, useRef, useState } from "react";
import { Navbar } from "keep-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import IntroJs from "intro.js";
import 'intro.js/minified/introjs.min.css'; // Import Intro.js styles

export const SmallScreenHeader = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null); // Ref for the entire header
  const svgRef = useRef(null); // Ref for the specific SVG to target for Intro.js

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Sign Up", slug: "/sign-up", active: !authStatus },
    { name: "My Posts", slug: "/all-blog", active: authStatus },
    { name: "Make Post", slug: "/create-post", active: authStatus },
  ];

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.matchMedia("(min-width: 1024px)").matches;
      setIsLargeScreen(isLarge);
      if (isLarge) {
        setIsMenuOpen(false); // Close menu on larger screens
      }
    };

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    const intro = IntroJs();
    const hasArrived = document.cookie.split(";").some((item) => item.trim().startsWith("hasArrived=true"));

    if (!hasArrived) {
      document.cookie = "hasArrived=true; path=/; max-age=31536000"; // Set cookie for 1 year
      intro.setOptions({
        showStepNumbers: false, 
        highlightClass: 'highlight-intro', 
        overlayOpacity: 0.5, 
        exitOnEsc: false, 
        steps: [
          {
            element: svgRef.current,
            intro: "This is the toggle button! Click here to open the menu.",
            position: "bottom",
          },
          {
            element:svgRef.current, // Target the Login/Sign Up link
            intro: "You need to log in or sign up to create your own blogs.",
            position: "top", // Adjust position based on the UI layout
          },
        ],
      });

      intro.start(); // Start Intro.js tutorial
    }

    // Cleanup event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, []); // This effect runs once on component mount

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div ref={headerRef} className="fixed z-50 top-0 w-full bg-white shadow-lg" style={{ height: "8vh" }}>
      <Navbar fluid={true} style={{ height: "100%" }}>
        <Navbar.Container className="flex items-center justify-between px-[1.15rem]">
          <p
            onClick={() => navigate("/")}
            className="text-xl font-semibold cursor-pointer text-gray-800"
          >
            Blog
          </p>

          <Navbar.Container className="flex gap-2 lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none menu-toggle-button"
              ref={svgRef} // Attach the ref to the toggle button SVG
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6 text-gray-800"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </Navbar.Container>

          {isLargeScreen && (
            <Navbar.Container tag="ul" className="flex gap-6">
              {navItems.map(
                (item) =>
                  item.active && (
                    <Link
                      key={item.name}
                      to={item.slug}
                      className={`text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-200 border-b-2 border-transparent hover:border-blue-500 ${item.name === "Login" || item.name === "Sign Up" ? "login-signup" : ""}`}
                    >
                      {item.name}
                    </Link>
                  )
              )}
              {authStatus && <Logout />}
            </Navbar.Container>
          )}
        </Navbar.Container>

        {isMenuOpen && (
          <div
            style={{
              borderRadius: "30px",
              transition: "all 2s ease-in-out",
            }}
            className={`absolute top-14 left-0 w-full bg-white shadow-lg z-40 py-4 transform ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <Navbar.Container
              tag="ul"
              className="flex flex-col items-start gap-4 px-6 pt-1 pl-14 pr-6"
            >
              {navItems.map(
                (item) =>
                  item.active && (
                    <li
                      key={item.name}
                      className="w-full hover:bg-gray-100 rounded-md transition duration-200"
                    >
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setIsMenuOpen(false);
                        }}
                        className="text-lg font-semibold w-full text-left text-gray-800 py-2 hover:text-blue-500"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <div className="mt-4 w-full border-t border-gray-300 pt-4">
                  <Logout />
                </div>
              )}
            </Navbar.Container>
          </div>
        )}
      </Navbar>
    </div>
  );
};
