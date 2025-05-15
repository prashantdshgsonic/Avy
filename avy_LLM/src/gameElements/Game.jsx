import Char01Hello from "./Char01Hello";
import Char02Hello from "./Char02Hello";
import Char03Hello from "./Char03Hello";
import Char04Hello from "./Char04Hello";
import Char05Hello from "./Char05Hello";
import Char06Hello from "./Char06Hello";
import Char07Hello from "./Char07Hello";
import Char08Hello from "./Char08Hello";
import Char09Hello from "./Char09Hello";
import Char10Hello from "./Char10Hello";
import { Map } from "./Map";
import PlayerController from "./PlayerController";
import charHelloPositions from "../helpers/positions";

export default function Game({ playerApproach, setPlayerApproach, setHelpButton }) {
  return (
    <>
      <group dispose={null}>

        {/* Map */}
        <Map position={[0, 0, 0]}/>

        {/* Player */}
        <PlayerController position={[30, 5, -40]} playerApproach={playerApproach} setPlayerApproach={setPlayerApproach} setHelpButton={setHelpButton}/>
        
        {/* Mission characters */}
        {/* Char 1 */}
        <Char01Hello position={[charHelloPositions[0].x, charHelloPositions[0].y, charHelloPositions[0].z]}/>

        {/* Char 2 */}
        <Char02Hello position={[charHelloPositions[1].x, charHelloPositions[1].y, charHelloPositions[1].z]}/>
        
        {/* Char 3 */}
        <Char03Hello position={[charHelloPositions[2].x, charHelloPositions[2].y, charHelloPositions[2].z]}/>

        {/* Char 4 */}
        <Char04Hello position={[charHelloPositions[3].x, charHelloPositions[3].y, charHelloPositions[3].z]}/>

        {/* Char 5 */}
        <Char05Hello position={[charHelloPositions[4].x, charHelloPositions[4].y, charHelloPositions[4].z]}/>

        {/* Char 6 */}
        <Char06Hello position={[charHelloPositions[5].x, charHelloPositions[5].y, charHelloPositions[5].z]}/>

        {/* Char 7 */}
        <Char07Hello position={[charHelloPositions[6].x, charHelloPositions[6].y, charHelloPositions[6].z]}/>

        {/* Char 8 */}
        <Char08Hello position={[charHelloPositions[7].x, charHelloPositions[7].y, charHelloPositions[7].z]}/>

        {/* Char 9 */}
        <Char09Hello position={[charHelloPositions[8].x, charHelloPositions[8].y, charHelloPositions[8].z]}/>

        {/* Char 10 */}
        <Char10Hello position={[charHelloPositions[9].x, charHelloPositions[9].y, charHelloPositions[9].z]}/>

      </group>
    </>
  )
}