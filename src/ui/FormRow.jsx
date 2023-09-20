import { css, styled } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ $disabledError }) => $disabledError ? '24rem 1fr' : '24rem 1fr 1.2fr'};
  gap: 2.4rem;

  padding: 1.2rem 0;
  
  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button):last-child {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  ${({ $validatePassword }) => $validatePassword && css`
    row-gap: 0.6rem;

    & ${Error} {
      grid-column: 1 / span 2
    }
  `}

  @media screen and (max-width: 1000px) {
    grid-template-columns: ${({$disabledError}) => $disabledError ? '10rem 1fr': '17.9rem 1fr'};
    grid-template-rows: repeat(2, auto);
    gap: 1rem;
    padding: 1rem;

    & > img {
      grid-column: 2;
    }
  }
  @media screen and (max-width: 545px) {
    &:not(:has(button):last-child) {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
      padding: 1.4rem 0;

      & > :not(button:last-child) {
        align-self: stretch;
        min-width: auto;
      }
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  grid-column: 3;

  @media screen and (max-width: 1000px) {
    grid-column: 2;
  }
`;

function FormRow({ children, label, error, controllLabel, validatePassword, disabledError }) {
  return (
    <StyledFormRow $validatePassword={validatePassword} $disabledError={disabledError}>
      {label && <Label htmlFor={children.props?.id || children[0]?.props?.id || controllLabel}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRow
