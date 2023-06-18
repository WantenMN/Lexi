import { getBase } from "@/utils/idb";
import { processArticle } from "@/utils/vocabulary";
import classNames from "classnames";
import { useEffect, useState } from "react";

const Output = () => {
  const [words, setWords] = useState<string[]>([]);
  const [uncommonWords, setUncommonWords] = useState<string[]>([]);

  const init = async () => {
    const article = await getBase("article");
    if (!article) return;

    const { filteredWords, uncommonWords } = await processArticle(article);
    setWords(filteredWords);
    setUncommonWords(uncommonWords);
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
      <ul className="h-full overflow-y-auto">
        {words.map((word, index) => {
          const isUncommon = uncommonWords.includes(word);
          const listItemClassName = classNames({ "text-red-700": isUncommon });

          return (
            <li className={listItemClassName} key={index}>
              {word}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Output;
