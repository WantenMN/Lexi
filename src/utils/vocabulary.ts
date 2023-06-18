import wordList from "@/assets/words.txt";
import { removeDuplicates } from "./utils";
import { getBase, setBase } from "./idb";

export const checkCommonWords = async (
  words: string[]
): Promise<{ commonWords: string[]; uncommonWords: string[] }> => {
  let commonWordsList: string[] | undefined = await getBase("common-words");

  if (!commonWordsList) {
    const response = await fetch(wordList);
    const wordListText = await response.text();
    const wordListArray = wordListText.split("\n");
    await setBase("common-words", wordListArray);
    commonWordsList = wordListArray;
  }

  const commonWords: string[] = [];
  const uncommonWords: string[] = [];

  words.forEach((word) => {
    if (commonWordsList!.includes(word.toLowerCase())) {
      commonWords.push(word);
    } else {
      uncommonWords.push(word);
    }
  });

  return {
    commonWords,
    uncommonWords,
  };
};

export const extractWords = (article: string): string[] => {
  const cleanedArticle = article
    .replace(/[^a-zA-Z' ]/g, " ") // Remove all punctuation and special characters but keep spaces and single quotes
    .replace(/(^'|'$|'\s|\s'+)/g, " ") // Remove all single quotes that are not part of a word
    .replace(/\b\w*'\w*\b/g, " ") // Remove all words that contain a single quote
    // remove all single letters
    .replace(/\b[a-zA-Z]\b/g, " ")
    .trim();

  // Split the cleaned article into an array of words
  const words = cleanedArticle.split(/\s+/);

  return removeDuplicates(words);
};

export const processArticle = async (article: string) => {
  const words = extractWords(article);
  const { commonWords, uncommonWords } = await checkCommonWords(words);

  // Remove duplicate words
  const filteredWords = Array.from(
    new Set(
      words.map((word) =>
        commonWords.includes(word) ? word.toLowerCase() : word
      )
    )
  );
  return {
    filteredWords,
    commonWords,
    uncommonWords,
  };
};
