import { customElement } from 'solid-element'
import { createSignal } from 'solid-js'

export interface WebComponentProps {
  size?: number
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'resizable-button': WebComponentProps
    }
  }
}

export const styles = (size: number) => `
:host button {
  background-color: light-dark(white, indigo);
  color: light-dark(indigo, white);
  border: 1px solid light-dark(indigo, white);
  border-radius: ${size * 0.5}px;
  cursor: pointer;
  padding: ${size}px ${size * 1.5}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${size * 1.5}px;
}
`

customElement(
  'resizable-button',
  { size: 6 },
  (props: WebComponentProps, { element }) => {
    // noShadowDOM()

    const { size } = props

    const [buttonSize, setButtonSize] = createSignal(size!)

    const handleButtonClick = async () => {
      setButtonSize((s) => s + 1)
    }

    return (
      <div>
        <style>{styles(buttonSize())}</style>
        <button onClick={handleButtonClick}>Click to Enlarge</button>
      </div>
    )
  }
)
