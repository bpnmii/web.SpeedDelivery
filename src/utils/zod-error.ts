import { ZodError } from 'zod'
import { notifyError } from './toast'

interface Errors {
  [key: string]: string
}

export const getValidationError = (err: ZodError): Errors => {
  const validatedErrors: Errors = {}

  if (!err || !err.errors) return {} as Errors

  err.errors.forEach((error) => {
    if (error.path[0]) {
      validatedErrors[error.path[0]] = error.message
    }
  })

  return validatedErrors
}

export const notifyErrorCatchZod = (err: ZodError) => {
  // <div style="text-align: center">

  let errors = ''

  err.errors.forEach((error) => {
    errors += error.message + '<br />'
  })

  // errors += '</div>'

  notifyError({
    message: errors,
    timer: 2000,
    position: 'bottom',
  })
}
