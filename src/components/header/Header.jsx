import  { useState, useEffect } from "react";
import { SmallScreenHeader } from "./SmallScreenHeader";
import { BigScreenHeader } from "./BigScreenHeader";

export const Header = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isLargeScreen ? (
        <BigScreenHeader /> // Render Large Screen Component
      ) : (
        <SmallScreenHeader /> // Render Small Screen Component
      )}
    </div>
  );
};
