const throttle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  let lastTime = 0;
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastTime >= delay) {
      lastTime = now;
      callback(...args);
    } else if (!timer) {
      timer = setTimeout(
        () => {
          lastTime = Date.now();
          callback(...args);
          timer = null;
        },
        delay - (now - lastTime),
      );
    }
  };
};

export default throttle;
