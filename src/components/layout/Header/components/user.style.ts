import styled from 'styled-components'

export const CardUserContainer = styled.div`
  width: 280px;
  position: fixed;
  top: 70px;
  right: 0px;
  flex-direction: column;
  transition: 0.5s;

  border: 1px solid #e5e9f2;

  height: 0;
  transition: 0.5s;
`

export const CardUser = styled.div`
  background: #fff;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 18px 28px;
  border: 1px solid #e5e9f2;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;

  cursor: default;

  div:nth-child(1) {
    display: flex;
    flex-direction: row;
    gap: 20px;

    span:nth-child(1) {
      font-size: 14px;
      font-weight: 700;
    }
  }

  .user {
    border-radius: 50%;
    background-color: #559bfb !important;
    font-weight: 500;
    text-align: center;
    font-size: 20px;
    width: 38px;
    height: 38px;
    color: #fff;
    justify-content: center;
    align-items: center !important;
    display: flex;
  }
`

export const CardLogout = styled.div`
  background: #fff;
  cursor: pointer;
  filter: brightness(0.97);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  padding: 18px 28px;
  border: 1px solid #e5e9f2;
  border-top: none;
  transition: 0.5s;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;

  span {
    font-weight: 600;
  }

  &:hover {
    color: #559bfb;
  }
`
