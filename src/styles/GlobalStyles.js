import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    background: none;
    outline: none;
    border: none;
  }

  li {
    list-style: none;
  }
`

export const AppContainer = styled.div`
  background: ${props => props.theme.title === 'light' ? '#fff' : '#000'};
  transition: background .5s ease;
  min-height: 100%;
`

export const MainContainer = styled.div`
  padding-top: 125px;
`

export const ChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding-top: ${props => props.noPadding ? '0' : '16px'};

  @media screen and (min-width: 1200px) {
    padding-top: ${props => props.noPadding ? '0' : '64px'};
  }
`

export const SelectsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 16px;
  border-bottom: 1px solid ${props => props.theme.primary};
  border-top: 1px solid ${props => props.theme.primary};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 1;
  background: ${props => props.theme.title === 'light' ? '#fff' : '#000'};
  transition: background .5s ease;
`

export const LoadingContainer = styled.div`
  min-height: calc(100vh - 125px);
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    text-align: center;
    color: ${props => props.theme.primary};
  }
`

export const ErrorContainer = styled(LoadingContainer)``;
