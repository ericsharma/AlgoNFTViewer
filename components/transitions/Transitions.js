/** @jsxImportSource theme-ui */

import { forwardRef, useImperativeHandle, useRef } from "react"
import { Alert } from "@theme-ui/components"
import { Transition } from "react-transition-group"

export function FancyInput({ triggerTransition, alertMessage, error }, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  // return <input ref={inputRef} ... />;

  return (
    <Fade
      ref={inputRef}
      in={triggerTransition}
      message={alertMessage}
      error={error}
    />
  )
}

export const Fade = ({ in: inProp, message, error }) => {
  const duration = 500
  const transition = `opacity ${duration}ms ease-in-out`

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }

  const transitionStyles = {
    entered: {
      transition,
      opacity: 1,
    },
    exiting: {
      transition,
      opacity: 0,
    },
    exited: {
      transition,
      opacity: 0,
    },
  }
  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <Alert
            sx={{
              borderRadius: "3",
              mt: 3,
              bg: error ? "red" : "blue",
              // visibility: ` ${visibile}`,
            }}
          >
            {message}
          </Alert>
        </div>
      )}
    </Transition>
  )
}
FancyInput = forwardRef(FancyInput)
