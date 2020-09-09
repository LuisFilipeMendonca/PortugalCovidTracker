import styled from 'styled-components';

export const SelectContainer = styled.div`
  position: relative;
  width: 200px;

  &:first-of-type {
    margin-right: 20px;
  }
`

export const DefaultValue = styled.button`
  width: 100%;
  padding: 4px 0;
  background: ${props => props.theme.primary};
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
`

export const SelectOptionsContainer = styled.ul`
  width: 100%;
  border: 1px solid ${props => props.theme.primary};
  position: absolute;
  z-index: 1;
  transition: transform .5s ease;
  transform-origin: 50% 0;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0)'};
`

export const ListOption = styled.li`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.primary};

  &:last-of-type {
    border-bottom: none;
  }
`

export const Option = styled.button`
  width: 100%;
  padding: 4px 0;
  background: ${props => props.theme.secondary};
  text-transform: uppercase;

  &:hover,
  &.selected {
    color: #fff;
    background: ${props => props.theme.primary};
  }
`
