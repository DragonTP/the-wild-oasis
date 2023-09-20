import { css, styled } from "styled-components"

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  background-color: var(--color-grey-0);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-brand-600);
  }
  ${($isBooking => $isBooking && css`
    &:disabled {
      color: var(--color-grey-700);
    }
  `)}
`
export default Input