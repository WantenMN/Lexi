import LoadingIcon from "@/components/icons/LoadingIcon";
import { addNewWords, getBase } from "@/utils/idb";
import { processArticle } from "@/utils/vocabulary";
import classNames from "classnames";
import { useEffect, useState } from "react";

const Output = () => {
  const [words, setWords] = useState<string[]>([]);
  const [uncommonWords, setUncommonWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const init = async () => {
    const article = await getBase("article");
    if (!article || typeof article !== "string") {
      setIsLoading(false);
      return;
    }
    const { filteredWords, uncommonWords } = await processArticle(article);
    setWords(filteredWords);
    setUncommonWords(uncommonWords);
    setIsLoading(false);

    await addNewWords(filteredWords);
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
            const isUncommon = uncommonWords.includes(word);
            const listItemClassName = classNames({
              "text-red-700": isUncommon,
            });

            return (
              <li className={listItemClassName} key={index}>
                {word}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Output;
