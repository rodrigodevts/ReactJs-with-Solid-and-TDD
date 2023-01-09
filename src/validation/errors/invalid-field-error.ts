class InvalidFieldError extends Error {
  constructor() {
    super(`Valor inválido`);
  }
}

export { InvalidFieldError };
