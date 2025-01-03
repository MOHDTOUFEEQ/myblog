import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";

export const BigScreenHeader = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const headerRef = useRef(null);

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
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full bg-white shadow-md z-50"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-gray-800 cursor-pointer"
        >
          Blog
        </div>

        {/* Navigation Items */}
        {isLargeScreen && (
          <nav>
            <ul className="flex gap-6">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <Link
                        to={item.slug}
                        className="text-gray-700 text-lg font-semibold hover:text-blue-500 transition duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
              <li >
                <Link to={"/trail"}>
                  Test
                </Link>
                  </li>
              {authStatus && (
                <li>
                  <Logout />
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
