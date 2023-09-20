import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.2rem 0;

  ${({$addBorder}) => $addBorder && css`
    &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
    }
  `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children, addBorder }) {
  return (
    <StyledFormRow $addBorder={addBorder}>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;