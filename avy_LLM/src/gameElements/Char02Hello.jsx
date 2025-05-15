import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei/native'
import { CapsuleCollider, RigidBody } from '@react-three/rapier';

export default function Char02Hello(props) {
  const char02Hello = useRef()
  const char02Group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/Char02/Char02Hello.glb')
  const { actions, names } = useAnimations(animations, char02Hello)

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play()
  }, [])

  return (
    <group ref={char02Group} {...props} rotation={[0, 0, 0]}>
      <RigidBody name="MissionChar2" colliders={false} type="fixed">
      <CapsuleCollider args={[2, 0.5]} position={[0, 1, 0]} />
        <group ref={char02Hello} dispose={null}>
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
//   "./models/Char02/Char02Hello.glb"
// ])