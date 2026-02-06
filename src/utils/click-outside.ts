/* eslint-disable no-undef */
export const clickOutside = (
  element: string,
  state: boolean,
  setState: (x: boolean) => void,
) => {
  if (!state) {
    $(document).on('click', (event: any) => {
      const obj = $(element)
      if (!obj.is(event.target) && !obj.has(event.target).length) {
        setState(false)
      }
    })
  }

  setTimeout(() => {
    setState(!state)
  }, 100)
}
