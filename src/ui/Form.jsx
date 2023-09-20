import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media screen and (max-width: 425px){
        padding: 2rem 2rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      padding: 1rem 0.25rem;

      & > div:not(:has(button):last-child) > *:not(label) {
        min-width: 196.8px;
      }

      @media screen and (max-width: 1000px) {
        max-width: 60rem;
      }
      @media screen and (max-width: 712px)  {
        max-width: 100%;
        margin-inline: auto;
        
        & > div {
          grid-template-columns: 20rem .8fr;
        }
      }
    `}
    
  overflow: auto;
  font-size: 1.4rem;
`;
Form.defaultProps = {
  type: 'regular'
}

export default Form;
