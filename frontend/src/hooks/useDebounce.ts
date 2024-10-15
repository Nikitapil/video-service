export const useDebounce = <T>(fn: (args: T) => void, delay = 350) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (arg: T) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(arg);
    }, delay);
  };
};
