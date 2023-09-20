import styled from "styled-components";

const Tag = styled.span`
  width: max-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  @media screen and (min-width: 797px) and (max-width: 1000px), (min-width: 645px) and (max-width: 670px) {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }
`;

export default Tag;
