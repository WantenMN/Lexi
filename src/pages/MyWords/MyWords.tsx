import LoadingIcon from "@/components/icons/LoadingIcon";
import { getAllWords } from "@/utils/idb";

import { useEffect, useState } from "react";

const MyWords = () => {
  const [words, setWords] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const init = async () => {
    const words = await getAllWords();
    setWords(words);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      init();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="h-full p-4">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <span className="animate-spin">
            <LoadingIcon className="text-red-400" />
          </span>
        </div>
      ) : (
        <ul className="h-full overflow-y-auto">
          {words.map((word, index) => {
            return <li key={index}>{word}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
export default MyWords;
