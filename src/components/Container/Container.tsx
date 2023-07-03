import useWindowInnerSize from "@/hooks/useWindowInnerSize";
import { useCallback, useEffect, useState } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const [containerWidth, setContainerWidth] = useState("");
  const [containerHeight, setContainerHeight] = useState("");
  const [innerWidth, innerHeight] = useWindowInnerSize();

  const handleResize = useCallback(() => {
    setContainerHeight(
      innerWidth < 840 || innerHeight < 840 ? "h-screen" : "h-container"
    );
    setContainerWidth(innerWidth < 840 ? "w-screen" : "w-container");
  }, [innerWidth, innerHeight]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <main
      className={`flex max-w-5xl flex-col overflow-hidden rounded-md bg-white/60 ${containerWidth} ${containerHeight}`}
    >
      {children}
    </main>
  );
};
export default Container;
