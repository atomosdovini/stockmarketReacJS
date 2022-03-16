import styled from "styled-components";

export const Container = styled.header`
  z-index: 10;
  width: 100%;

`;

export const Content = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background: #6D3B9E!important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);


  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;  

  button {
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9)
    };
  }
`;