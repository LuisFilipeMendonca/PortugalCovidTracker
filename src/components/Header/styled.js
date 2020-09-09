import styled from 'styled-components';

export const Header = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`

export const HeaderTitle = styled.h1`
  color: ${props => props.theme.primary};
`

export const InputCheckbox = styled.input`
  visibility: hidden;
`

export const Label = styled.label`
  position: relative;
  width: 35px;
  height: 10px;
  margin-right: 10px;
`

export const ThemeToggler = styled.span`
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.primary};
  top: 0;
  left: 0;

  &::before {
    content: '';
    position: absolute;
    height: 20px;
    width: 20px;
    background: #fff;
    top: -6px;
    border-radius: 50%;
    transform: translateX(-50%);
    transition: transform .5s ease;
    border: 1px solid ${props => props.theme.primary};
  }

  ${InputCheckbox}:checked + &::before {
    transform: translateX(calc(100% + 5px));
  }
`
