import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei/native'
import { CapsuleCollider, RigidBody } from '@react-three/rapier';

export default function Char10Hello(props) {
  const char10Hello = useRef()
  const char10Group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/Char10/Char10Hello.glb')
  const { actions, names } = useAnimations(animations, char10Hello)

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play()
  }, [])

  return (
    <group ref={char10Group} {...props} rotation={[0, -1.15, 0]}>
      <RigidBody name="MissionChar2" colliders={false} type="fixed">
      <CapsuleCollider args={[2, 0.5]} position={[0, 1, 0]} />
        <group ref={char10Hello} dispose={null}>
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
//   "./models/Char10/Char10Hello.glb"
// ])