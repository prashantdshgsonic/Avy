import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei/native'
import { CapsuleCollider, RigidBody } from '@react-three/rapier';

export default function Char05Hello(props) {
  const char05Hello = useRef()
  const char05Group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/Char05/Char05Hello.glb')
  const { actions, names } = useAnimations(animations, char05Hello)

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play()
  }, [])

  return (
    <group ref={char05Group} {...props} rotation={[0, -0.619, 0]}>
      <RigidBody name="MissionChar2" colliders={false} type="fixed">
      <CapsuleCollider args={[2, 0.5]} position={[0, 1, 0]} />
        <group ref={char05Hello} dispose={null}>
          <group name="Scene">
            <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <primitive object={nodes.mixamorigHips} />
              <skinnedMesh name="Object_2001" geometry={nodes.Object_2001.geometry} material={materials.palette} skeleton={nodes.Object_2001.skeleton} castShadow receiveShadow/>
            </group>
          </group>
        </group>
      </RigidBody>
    </group>
  )
}

// useGLTF.preload([
//   "./models/Char05/Char05Hello.glb"
// ])