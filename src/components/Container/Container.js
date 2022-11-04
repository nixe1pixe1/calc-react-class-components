import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2rem;

  @media screen and (max-width: 460px) {
    padding: 0 1rem;
  }
`;