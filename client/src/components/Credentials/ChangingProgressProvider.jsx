import { useState, useEffect } from "react";

const ChangingProgressProvider = ({ values, interval = 1000, children }) => {
  const [valuesIndex, setValuesIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValuesIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex === values.length) {
          clearInterval(intervalId);
          setCompleted(true);
        } else {
          setCompleted(false);
        }
        return nextIndex;
      });
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval, values]);

  return completed ? children(100) : children(values[valuesIndex]);
};

export default ChangingProgressProvider;
