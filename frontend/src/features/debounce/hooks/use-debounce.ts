import { useEffect, useState } from "react";

/* 
This is a custom hook to bring in a debounce behaviour to setting up the value of any variable.
This takes in the variable which has to be set and the delay after which the variable value to be set as arguments
 */
function useDebounce(value: any, delay: number) {
  // initialise a state varibale with the value as intial value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      // the value of the variable is set only after delay ms
      setDebouncedValue(value);
    }, delay);
    return () => {
      // if a change comes before this delay ms in the value or delay, the timer function is cleared and the value is not set to the variable. This ensures that the value is set only if there is no change in value or delay for the supplied delay ms
      clearTimeout(handler);
    };
  }, [value, delay]);

  // return the set value
  return { debouncedValue };
}

export default useDebounce;
