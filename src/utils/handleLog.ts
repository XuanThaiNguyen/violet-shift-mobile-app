import { IS_DEV } from '@themes/constant';

const devFunction = (func: () => void) => {
  if (IS_DEV && typeof func === 'function') {
    func();
  }
};

export const devLog = {
  error: (...args: any) => devFunction(() => console.error(...args)),
  log: (...args: any) => devFunction(() => console.log(...args)),
  warn: (...args: any) => devFunction(() => console.warn(...args)),
};
