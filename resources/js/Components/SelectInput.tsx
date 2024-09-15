import React, {
  forwardRef,
  useRef,
  ForwardedRef,
  SelectHTMLAttributes,
  ReactNode,
} from "react";

// Define the prop types for your component
interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
}

// Define the component with the forwardRef
const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    { className = "", children, ...props },
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    // Use useRef if ref is not provided
    const input =
      (ref as React.RefObject<HTMLSelectElement>) ||
      useRef<HTMLSelectElement>(null);

    return (
      <select
        {...props}
        className={
          "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
          className
        }
        ref={input}
      >
        {children}
      </select>
    );
  }
);

export default SelectInput;
