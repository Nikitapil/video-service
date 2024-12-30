export const getMockedObject = <T extends object>(mockedObject: T, override: Partial<T> = {}): T => {
  return {
    ...mockedObject,
    ...override
  };
};
