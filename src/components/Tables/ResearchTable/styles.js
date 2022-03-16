import styled from 'styled-components'

export const RowTitle = styled.p`
  color: #FFFFFF;
  padding: 4px;
  margin: 0 !important;
`
export const RowData = styled.p`
  color: var(--light-primary-color);
  padding: 4px;
  margin: 0 !important;
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
  : 'not-allowed'};
`
export const Rating = styled.p`
  text-transform: lowercase;
  &::first-letter {
    text-transform: capitalize
  }
  margin-bottom: 0px
`