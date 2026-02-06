import styled from 'styled-components'

interface IconHeaderProps {
  noHover?: boolean
}

export const IconHeader = styled.div<IconHeaderProps>`
  background: #fff;
  height: 80% !important;
  border-radius: 4px;

  &:hover {
    filter: ${({ noHover }) => (noHover ? '' : 'brightness(0.8)')};
  }

  i {
    color: ${({ theme }) => theme.blue};
  }

  &:has(.active) {
    i {
      color: #fff;
    }
  }
`

export const TextHeader = styled.div`
  background: #f3f6f8;
  height: 60% !important;
  cursor: default !important;

  font-weight: 500;
  color: var(--kt-primary);

  border-radius: 60px;
  transition: all 0.2s ease;
`
