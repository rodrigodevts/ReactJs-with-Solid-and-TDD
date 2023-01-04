interface Validation {
  validate: (fieldName: string, fieldValue: string) => string;
}

export { Validation };
