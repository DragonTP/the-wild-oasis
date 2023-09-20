import { useEffect, useState } from "react";
import styled from "styled-components";

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);
  min-width: 196.8px;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

const Image = styled.img`
  width: 6.4rem;
  object-fit: cover;
  object-position: center;
`

const useFileInput = () => {
  const [image, setImage] = useState('');

  useEffect(() => {
    return () => URL.revokeObjectURL(image);
  }, [image])

  const handlePreview = e => {
    const [file] = e.target.files;
    if (!file) return setImage('');
    setImage(URL.createObjectURL(file));
  }
  const handleClear = () => setImage('');

  return { image, handlePreview, handleClear }
}

// eslint-disable-next-line react-refresh/only-export-components
export { FileInput as default, Image, useFileInput };
