import { forwardRef } from "react";
import styled, { css } from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
    props.type === "white"
      ? "var(--color-grey-100)"
      : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm); 
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  width: 100%;
  
  ${({ $isModal }) => !$isModal && css`
    max-width: 14rem; 
  `}
`;

function RawSelect({ options, value, onChange, isModal, label = 'Select to sort', ...props }, ref) {
  return (
    <StyledSelect $isModal={isModal} onChange={onChange} ref={ref} defaultValue='' {...props}>
      <option disabled hidden value=''>{label}</option>
      {options.map(({ value, label }) =>
        <option key={value} value={value}>{label}</option>)}
    </StyledSelect>
  )
}

const Select = forwardRef(RawSelect);

export default Select

