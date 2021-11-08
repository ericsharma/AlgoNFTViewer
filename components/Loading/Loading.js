/** @jsxImportSource theme-ui */
import {
  SwitchTransition as ReactSwitchTransition,
  Transition,
} from "react-transition-group"
import { Text } from "@theme-ui/components"
import { useState } from "react"
import { useInterval } from "../../public/hooks/useInterval"

const loadingMessages = [
  "Your request is being processed",
  "Please be patient, the more nft's in your wallet the longer the query",
  "It can take upwards of 30 seconds to return",
  "Enjoy life, don't focus too much on digital art",
]

const TitleTransition = ({ titles = loadingMessages, interval }) => {
  const [index, setIndex] = useState(0)

  useInterval(() => {
    if (index === titles.length - 1) {
      setIndex(0)
    } else {
      setIndex((idx) => idx + 1)
    }
  }, interval)

  return (
    <SwitchTransition tKey={index} translateY={10} speed={700}>
      <Text as="div" sx={{ mt: 4 }}>
        {titles[index]}
      </Text>
    </SwitchTransition>
  )
}

const SwitchTransition = ({
  tKey,
  speed = 300,
  translateY = null,
  mode = "out-in",
  onEnter = () => null,
  children,
}) => {
  const transform = translateY ? `translateY(${translateY}px)` : null
  const transition =
    `opacity ${speed}ms ease-out` +
    (transform ? `, transform ${speed}ms ease-out` : "")

  const fade = {
    entering: {
      transform,
      opacity: 0,
    },
    entered: {
      transition,
      transform: translateY ? `translateY(0px)` : null,
      opacity: 1,
    },
    exiting: {
      transition,
      transform,
      opacity: 0,
    },
  }

  return (
    <ReactSwitchTransition mode={mode}>
      <Transition
        key={tKey}
        timeout={{ enter: speed, exit: speed }}
        onEnter={onEnter}
      >
        {(status) => <div style={{ ...fade[status] }}>{children}</div>}
      </Transition>
    </ReactSwitchTransition>
  )
}

export default TitleTransition
