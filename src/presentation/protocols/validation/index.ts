interface Validation {
  validate: (fieldName: string, input: object) => string;
}

export { Validation };
