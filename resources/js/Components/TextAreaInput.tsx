import React, {
  forwardRef,
  useEffect,
  useRef,
  ForwardedRef,
  TextareaHTMLAttributes,
} from "react";

// Define the prop types for your component
interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isFocused?: boolean;
}

// Define the component with the forwardRef
const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    { className = "", isFocused = false, ...props },
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    // Use useRef if ref is not provided
    const input =
      (ref as React.RefObject<HTMLTextAreaElement>) ||
      useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (isFocused && input.current) {
        input.current.focus();
      }
    }, [isFocused]);

    return (
      <textarea
        {...props}
        className={
          "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
          className
        }
        ref={input}
      />
    );
  }
);

export default TextAreaInput;
