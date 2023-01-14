interface SaveAccessToken {
  save: (accessToken: string) => Promise<void>;
}

export { SaveAccessToken };
