import styled from 'styled-components'

export const P = styled.p` 
  margin: 0;
  
  &.green {
    color: green
  }
  &.red {
    color: red
  }
`
export const DetailsBtn = styled.span`
  font-size: 12px;
  background: var(--light-primary-color);
  color: #ffffff;
  padding: 6px;
  cursor: ${(props) => !props.disabled 
  ? 'pointer'
  : 'not-allowed'};
`
export const Rating = styled.p`
  text-transform: lowercase;
  &::first-letter {
    text-transform: capitalize
  }
  margin-bottom: 0px
`
