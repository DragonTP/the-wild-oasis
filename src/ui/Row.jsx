import { css, styled } from "styled-components";

const Row = styled.div`
  display: flex;
  ${({ type }) => type === 'horizontal' ? css`
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  `: css`
    flex-direction: column;
    gap: 20px;
  `}
`
Row.defaultProps = {
  type: 'vertical'
}

export default Row