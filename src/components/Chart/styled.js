import styled from 'styled-components';

export default styled.div`
  position: relative;
  width: 95vw;
  margin-bottom: 24px;

  @media screen and (min-width: 800px) {
    width: 45vw;
  }

  @media screen and (min-width: 1200px) {
    width: 30vw;
    margin-bottom: 48px;
  }
`
