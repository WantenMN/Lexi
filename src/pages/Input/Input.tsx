import { useEffect, useRef } from "react";

const Input = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const textareaGetFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    textareaGetFocus();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className="h-full w-full resize-none bg-inherit p-4 text-lg leading-normal focus:outline-none "
      placeholder="Please paste article here"
    ></textarea>
  );
};
export default Input;
