import styled, { css } from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  ${({$breakpoint = [870, 670]}) => css`
    @media screen and (min-width: 797px) and (max-width: ${$breakpoint[0]}px), (max-width: ${$breakpoint[1]}px) {
      flex-direction: column;
      align-items: end;
    }
  `}

`;

export default TableOperations;
