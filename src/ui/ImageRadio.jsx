import { forwardRef } from "react"
import styled from "styled-components"


const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  gap: 2rem;
  padding: 2rem 1.5rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-100);
`
const Label = styled.label`
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const ButtonRadio = styled.div.attrs({ role: 'button' })`
  width: 100px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-md);
  gap: 0.8rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`
const InputRadio = styled.input.attrs({ type: 'radio' })`
  display: none;

  &:checked + ${ButtonRadio} {
    outline: 2px solid var(--color-brand-600);
  }
`

const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`
const P = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  text-align: center;
  flex: 1;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

function ImageRadioRaw({ datas, ...props }, ref) {
  return (
    <Container>
      {datas.map(data => (
        <Label ref={ref} key={data.id} htmlFor={data.id}>
          <InputRadio {...props} id={data.id} value={data.id} />
          <ButtonRadio>
            <Img src={data.image} />
            <P>{data.name}</P>
          </ButtonRadio>
        </Label>
      ))}
    </Container>
  )
}

const ImageRadio = forwardRef(ImageRadioRaw);

export default ImageRadio
