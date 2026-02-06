import styled from 'styled-components'

export const SubHeader = styled.div`
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */

  background-color: #fff;
  border-top: 1px solid #ebedf2;
  /* border-bottom: 1px solid #ebedf2; */

  position: sticky;
  z-index: 9;
  top: 70px;

  @media (max-width: 420px) {
    overflow-x: scroll;
  }
`
