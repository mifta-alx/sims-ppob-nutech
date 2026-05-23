interface ValidationError {
  field: string
  message: string
}

export function formatValidationErrors(errors: ValidationError[]) {
  return errors?.reduce<Record<string, string>>((acc, error) => {
    acc[error.field] = error.message

    return acc
  }, {})
}
