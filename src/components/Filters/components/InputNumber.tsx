import { getColor, Input } from 'maxscalla-lib'

interface IInputNumber {
  value: string | number | undefined
  setValue: (newValue: string) => void
}

export const InputNumber = ({ value, setValue }: IInputNumber) => {
  return (
    <Input
      id="filter-input"
      type="number"
      name="value"
      placeholder="Digite aqui..."
      focusColor={getColor('blue')}
      value={value || ''}
      onChange={(e: any) => setValue(e.target.value)}
      style={{ minWidth: 200 }}
    />
  )
}
