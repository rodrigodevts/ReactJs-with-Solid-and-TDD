const makeApiUrl = (path: string): string => {
  return `${String(import.meta.env.VITE_TEST_API_URL)}${path}`;
};

export { makeApiUrl };
