import styled from 'styled-components'

export const Container = styled.div`
  @media (max-width: 990px) {
    .w-mobile-100 {
      width: 100%;
    }
  }
`

interface ButtonProps {
  focusColor?: string
}

export const Button = styled.button<ButtonProps>`
  &:focus {
    border-color: ${({ focusColor }) => focusColor && focusColor} !important;
  }
`
