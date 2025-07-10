import { customElement } from 'solid-element'
import { createSignal } from 'solid-js'

export interface ResizableButtonProps {
  defaultSize?: number
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'resizable-button': ResizableButtonProps
    }
  }
}

const styles = (size: number) => `
:host button {
  background-color: light-dark(indigo, white);
  color: light-dark(white, indigo);
  border: 1px solid light-dark(white, indigo);
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
  { defaultSize: 10 },
  (props: ResizableButtonProps) => {
    const { defaultSize } = props

    const [buttonSize, setButtonSize] = createSignal(defaultSize!)

    const handleButtonClick = async () => {
      setButtonSize((currentSize) => ++currentSize)
    }

    return (
      <div>
        <style>{styles(buttonSize())}</style>
        <button onClick={handleButtonClick}>Click to Enlarge</button>
      </div>
    )
  }
)
