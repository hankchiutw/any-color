
export function toPromise<T>(callback) {
  return (...args): Promise<T> => {
    return new Promise(resolve => {
      callback(...args, resolve);
    });
  };
}

