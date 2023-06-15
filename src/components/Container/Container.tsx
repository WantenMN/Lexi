import { useEffect, useState } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const [containerWidth, setContainerWidth] = useState("");
  const [containerHeight, setContainerHeight] = useState("");
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    setContainerHeight(
      screenWidth < 840 || screenHeight < 840 ? "h-screen" : "h-container"
    );
    setContainerWidth(screenWidth < 840 ? "w-screen" : "w-container");
  };

  useEffect(() => {
    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main
      className={`flex max-w-5xl flex-col overflow-hidden rounded-md bg-white/60 ${containerWidth} ${containerHeight}`}
    >
      {children}
    </main>
  );
};
export default Container;
