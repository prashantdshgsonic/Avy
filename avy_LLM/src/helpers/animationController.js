import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";

export const AnimationControl = ({ isAnimationActive }) => {
    useFrame((state, time) => {
      if (!isAnimationActive) {
        state.gl.render(state.scene, state.camera);
        return false; // Stops the render loop
      }
    }, 1);
  
    return null; // This component does not render anything
  };
