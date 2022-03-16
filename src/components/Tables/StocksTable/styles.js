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
  background:  ${(props) => !props.disabled 
  ? 'var(--light-primary-color)'
  : '#909090'}; 
  color: #ffffff;
  padding: 6px;
  cursor: ${(props) => !props.disabled 
  ? 'pointer'
  : 'not-allowed'}
`