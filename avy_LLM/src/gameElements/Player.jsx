import { Suspense, useMemo, useRef, useState } from 'react'
import { Vector3, Euler, Quaternion, Matrix4 } from 'three'
import Teddy from './Teddy'
import { useCompoundBody, useContactMaterial } from '@react-three/cannon'
import useKeyboard from './useKeyboard'
import { act, useFrame } from '@react-three/fiber'
import { Vec3 } from 'cannon-es'
import useFollowCam from './useFollowCam'
import { useStore } from '../helpers/useStore'
import { useNavigate } from 'react-router-dom'
import ManIdle from './ManIdle'
import ModalWindow from '../widgets/modalWindow/ModalWindow'
import VideoPlayer from '../widgets/videoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { setUserPosition } from '../store/slice/userSlice'
import { getModelById } from '../helpers/models'

const mockData = {
  "id": 2,
  "title": "The Data Science Course",
  "description": "Complete Data Science Training: Mathematics, Statistics, Python, Advanced Statistics in Python, Machine & Deep Learning",
  "courseImage": "/images/ba698a34-ff9a-4594-94d1-37018c0e8cbb.png",
  "category": "Development",
  "level": "Advanced",
  "status": null,
  "creator": {
      "id": 1,
      "firstName": "Mia",
      "email": "user1@mail.com",
      "coursesInProgress": 0,
      "coursesCompleted": 0,
      "coursesRecommended": 0,
      "coins": null,
      "achievements": [],
      "awards": [],
      "roles": [
          "ROLE_ADMIN"
      ]
  },
  "creationDate": "2023-12-17",
  "lastUpdateDate": null,
  "modules": [
      {
          "id": 2,
          "title": "Complete Data Science Bootcamp 2023",
          "description": "Complete Data Science Bootcamp 2023",
          "moduleOrder": 0,
          "courseId": 2,
          "items": [
              {
                  "id": 2,
                  "title": "Complete Data Science Bootcamp 2023",
                  "itemType": "video",
                  "itemOrder": 0,
                  "moduleId": 2,
                  "fileName": "Recording 2023-04-28 214950.mp4",
                  "fileType": "video/mp4",
                  "linkToVideo": "/video/81394d38-641f-44e5-a797-be9c22330033.mp4"
              }
          ]
      }
  ],
  "participants": [
      2
  ]
}

export default function PlayerCollider({ position }) {
  const playerGrounded = useRef(false)
  const inJumpAction = useRef(false)
  const group = useRef()
  const { yaw } = useFollowCam(group, [0, 1, 1.5])
  const velocity = useMemo(() => new Vector3(), [])
  const inputVelocity = useMemo(() => new Vector3(), [])
  const euler = useMemo(() => new Euler(), [])
  const quat = useMemo(() => new Quaternion(), [])
  const targetQuaternion = useMemo(() => new Quaternion(), [])
  const worldPosition = useMemo(() => new Vector3(), [])
  const raycasterOffset = useMemo(() => new Vector3(), [])
  const contactNormal = useMemo(() => new Vec3(0, 0, 0), [])
  const down = useMemo(() => new Vec3(0, -1, 0), [])
  const rotationMatrix = useMemo(() => new Matrix4(), [])
  const prevActiveAction = useRef(0) // 0:idle, 1:walking, 2:jumping
  const keyboard = useKeyboard()
 const dispatch = useDispatch()

  //Test 
  const { currentAvatar } = useSelector((state) => state.user)
  //console.log("Avatar in player", currentAvatar);
  let player = getModelById(currentAvatar ?? 0)
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/secondPage');
  };

  const { groundObjects, actions, mixer } = useStore((state) => state)

  useContactMaterial('ground', 'slippery', {
    friction: 0,
    restitution: 0.01,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3
  })

  const [ref, body] = useCompoundBody(
    () => ({
      mass: 1,
      shapes: [
        { args: [0.25], position: [0, 0.25, 0], type: 'Sphere' },
        { args: [0.25], position: [0, 0.75, 0], type: 'Sphere' },
        { args: [0.25], position: [0, 1.25, 0], type: 'Sphere' }
      ],
      onCollide: (e) => {
        if (e.contact.bi.id !== e.body.id) {
          contactNormal.set(...e.contact.ni)
        }
        if (contactNormal.dot(down) > 0.5) {
          if (inJumpAction.current) {
            inJumpAction.current = false
            actions['jump'].fadeOut(0.1)
            actions['idle'].reset().fadeIn(0.1).play()
          }
        }
      },
      material: 'slippery',
      linearDamping: 0,
      position: position
    }),
    useRef()
  )

  useFrame(({ raycaster }, delta) => {
    let activeAction = 0 // 0:idle, 1:walking, 2:jumping, 3:dancing

    body.angularFactor.set(0, 0, 0)

    ref.current.getWorldPosition(worldPosition)

    playerGrounded.current = false
    raycasterOffset.copy(worldPosition)
    raycasterOffset.y += 0.01
    raycaster.set(raycasterOffset, down)
    raycaster.intersectObjects(Object.values(groundObjects), false).forEach((i) => {
      //console.log(i.distance)
      if (i.distance < 0.021) {
        playerGrounded.current = true
      }
    })
    if (!playerGrounded.current) {
      //console.log('in air')
      body.linearDamping.set(0)
    } else {
      body.linearDamping.set(0.9999999)
    }

    const distance = worldPosition.distanceTo(group.current.position)

    rotationMatrix.lookAt(worldPosition, group.current.position, group.current.up)
    targetQuaternion.setFromRotationMatrix(rotationMatrix)
    if (distance > 0.0001 && !group.current.quaternion.equals(targetQuaternion)) {
      targetQuaternion.z = 0
      targetQuaternion.x = 0
      targetQuaternion.normalize()
      group.current.quaternion.rotateTowards(targetQuaternion, delta * 2)
    }
    if (document.pointerLockElement) {
      inputVelocity.set(0, 0, 0)
      if (playerGrounded.current) {
        if (keyboard['KeyW'] || keyboard['ArrowUp']) {
          activeAction = 1
          inputVelocity.z = -10 * delta
        }
        if (keyboard['KeyS'] || keyboard['ArrowDown']) {
          activeAction = 1
          inputVelocity.z = 10 * delta
        }
        if (keyboard['KeyA'] || keyboard['ArrowLeft']) {
          activeAction = 1
          inputVelocity.x = -10 * delta
        }
        if (keyboard['KeyD'] || keyboard['ArrowRight']) {
          activeAction = 1
          inputVelocity.x = 10 * delta
        }
      }
      inputVelocity.setLength(0.3) // clamps walking speed

      if (activeAction !== prevActiveAction.current) {
        //console.log('active action changed')
        if (prevActiveAction.current !== 1 && activeAction === 1) {
          //console.log('idle --> walking')
          actions['idle'].fadeOut(0.8)
          actions['walk'].reset().fadeIn(0.8).play()
        }
        if (prevActiveAction.current !== 0 && activeAction === 0) {
          //console.log('walking --> idle')
          actions['walk'].fadeOut(0.8)
          actions['idle'].reset().fadeIn(0.8).play()
        }
        if (prevActiveAction.current !== 3 && activeAction === 3) {
          actions['walk'].fadeOut(0.8)
          actions['dance'].reset().fadeIn(0.8).play()
        }
        if (prevActiveAction.current !== 1 && activeAction === 1) {
          actions['dance'].fadeOut(0.8)
          actions['walk'].reset().fadeIn(0.8).play()
        }
        prevActiveAction.current = activeAction
      }

      if (keyboard['Space']) {
        if (playerGrounded.current && !inJumpAction.current) {
          //console.log('jump')
          activeAction = 2
          inJumpAction.current = true
          actions['walk'].fadeOut(0.1)
          actions['idle'].fadeOut(0.1)
          actions['jump'].reset().fadeIn(0).play()
          inputVelocity.y = 10
        }
      }

      if (keyboard['KeyE']) {
        activeAction = 3
        actions['idle'].fadeOut(0.3)
        actions['dance'].reset().fadeIn(0.5).play()
        // actions['idle'].reset().fadeIn(0.3).play()
      }

      // Test
      if (keyboard['KeyT']) {
        // handleRedirect()
        let x = group.current.position.toArray()
        
          
        
        dispatch(setUserPosition(x))

        // console.log("Teleportated!!!");
      }

      euler.y = yaw.rotation.y
      quat.setFromEuler(euler)
      inputVelocity.applyQuaternion(quat)
      // ***************
      // Default values
      //velocity.set(inputVelocity.x, inputVelocity.y, inputVelocity.z)
      // ***************
      velocity.set(inputVelocity.x * 2, inputVelocity.y, inputVelocity.z * 2)

      body.applyImpulse([velocity.x, velocity.y, velocity.z], [0, 0, 0])
      //body.applyImpulse([velocity.x * 4, velocity.y, velocity.z * 4], [0, 0, 0])
    }

    if (activeAction === 1) {
      // mixer.update(delta * distance * 15)
      mixer.update(delta)
    } else {
      mixer.update(delta)
    }

    group.current.position.lerp(worldPosition, 0.3)
    
  })

  

  return (
    <>
      <group ref={group} position={position}>
        <Suspense fallback={null}>
          {/* <Teddy /> */}
          {/* <ManIdle position={[0, -0.25, 0]}/> */}
          {/* here will be choosed avatar */}
          {player}
        </Suspense>
      </group>
      
    </>
  )
}