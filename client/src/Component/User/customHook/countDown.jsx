import React from 'react';

export default function useCountDown() {
  const [secondLeft, setSecondLeft] = React.useState(0);

  React.useEffect(() => {
    if (secondLeft <= 0) return;

    const timeOut = setTimeout(() => {
      setSecondLeft(secondLeft - 1);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [secondLeft]);

  function start(second) {
    setSecondLeft(second);
  }

  return { secondLeft, start };
}
