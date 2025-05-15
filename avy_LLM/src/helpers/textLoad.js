import Overlay from "../gameElements/Overlay";
import React from "react";
import { useSelector } from "react-redux";

export const TextLoad = ({playerApproach, helpButton}) => {
  const { visitedCharsArray } = useSelector(state => state.user)

  if (!visitedCharsArray.includes(playerApproach)) {
    return <Overlay text={'Press E to open your next task.'} isVisible={true}/>
  }
  if (helpButton) {
    return <Overlay text={'Search for characters on the map to participate in the lesson. Click on the screen to interact. Press W, A, S, D to move. Space to jump. Esc to release the cursor. Press H to hide this text.'} isVisible={true}/>
  } else {
    return <Overlay text={'Press H for help.'} isVisible={true}/>
  }
}