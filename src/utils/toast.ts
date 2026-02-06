import SweetAlerts, { SweetAlertPosition, SweetAlertResult } from 'sweetalert2'

interface ErrorsParams {
  message: string
  timer?: number
  position?: SweetAlertPosition
}

const swal = SweetAlerts.mixin({
  confirmButtonColor: '#af5bf1',
  cancelButtonText: 'Cancelar',
  reverseButtons: true,
})

const success = (timer = 5000, position = 'top-end' as SweetAlertPosition) =>
  swal.mixin({
    icon: 'success',
    toast: true,
    timer,
    showConfirmButton: false,
    position,
  })

const error = (timer = 5000, position = 'top-end' as SweetAlertPosition) =>
  swal.mixin({
    icon: 'error',
    toast: true,
    timer,
    showConfirmButton: false,
    position,
  })

const warn = (timer = 5000, position = 'top-end' as SweetAlertPosition) =>
  swal.mixin({
    icon: 'warning',
    toast: true,
    timer,
    showConfirmButton: false,
    position,
  })

export const notifySuccess = (
  params: ErrorsParams,
): Promise<SweetAlertResult> =>
  success(params.timer, params.position).fire(params.message)

export const notifyWarning = (
  params: ErrorsParams,
): Promise<SweetAlertResult> =>
  warn(params.timer, params.position).fire(params.message)

export const notifyError = (params: ErrorsParams): Promise<SweetAlertResult> =>
  error(params.timer, params.position).fire(params.message)
