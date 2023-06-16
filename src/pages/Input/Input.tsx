import { useEffect, useRef } from "react";
import { getBase, setBase } from "@/utils/idb";

const Input = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const textareaGetFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const saveArticle = async () => {
    if (!textareaRef.current) return;

    const article = textareaRef.current.value;
    await setBase("article", article);
  };

  const readArticle = async () => {
    const article = await getBase("article");
    if (!textareaRef.current || !article) return;

    textareaRef.current.value = article;
  };

  let timer: NodeJS.Timeout;
  const handleTextareaChange = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      saveArticle();
    }, 250);
  };

  useEffect(() => {
    readArticle();
    textareaGetFocus();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      onChange={handleTextareaChange}
      onPaste={saveArticle}
      className="h-full w-full resize-none bg-inherit p-4 text-lg leading-normal focus:outline-none "
      placeholder="Please paste article here"
    ></textarea>
  );
};
export default Input;
