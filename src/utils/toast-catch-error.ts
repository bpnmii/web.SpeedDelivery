import SweetAlerts, { SweetAlertResult } from 'sweetalert2'
import get from 'lodash/get'
import { IErrorCatch } from '../@types'

const swal = SweetAlerts.mixin({
  confirmButtonColor: '#af5bf1',
  cancelButtonText: 'Cancelar',
  reverseButtons: true,
})

const error = swal.mixin({
  icon: 'error',
  toast: true,
  timer: 5000,
  showConfirmButton: false,
  position: 'top-end',
})

const errorCatch = error.mixin({
  position: 'bottom',
  timer: 10000,
})

export const notifyErrorCatch = (
  e: unknown,
  message = 'Algo deu errado, tente novamente mais tarde',
): Promise<SweetAlertResult> => {
  const err = e as IErrorCatch

  if (err?.response && err.response.data.validation) {
    return errorCatch.fire(
      get(err, 'response.data.validation.body.message', message),
    )
  }

  return errorCatch.fire(get(err, 'response.data.message', message))
}
