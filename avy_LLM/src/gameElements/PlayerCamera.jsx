// import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Object3D } from "three";
import { useMemo, useEffect } from "react";

export default function PlayerCamera(playerRef) {    
    let fov = 75
    // let aspect = 2.6
    const near = 0.1
    const far = 200

    const { scene, camera } = useThree()
    const offset = [2, 2, 3]
    const pivot = useMemo(() => new Object3D(), [])
    const alt = useMemo(() => new Object3D(), [])
    const yaw = useMemo(() => new Object3D(), [])
    const pitch = useMemo(() => new Object3D(), [])
    const worldPosition = useMemo(() => new Vector3(), [])
    const mouseSpeedX = 0.004
    const mouseSpeedY = 0.008

    // let isLookAt = false;
    // let delta = new Vector3(0, 0, 0)
    // let pos = [0, 5, 20]
    // let rot = [0, 0, 0]
    // let lookAt = [0, 2, 0]

    function onDocumentMouseMove(e) {
        if(document.pointerLockElement) {            
            e.preventDefault()
            yaw.rotation.y -= e.movementX * mouseSpeedX
            const v = pitch.rotation.x - e.movementY * mouseSpeedY
            // Limit vertical camera angles
            if (v > -1 && v < 0.7) {
                pitch.rotation.x = v
            }
        }
    }

    useEffect(() => {
        scene.add(pivot)
        pivot.add(alt)
        // Camera point of view y
        alt.position.y = offset[1]
        alt.add(yaw)
        yaw.add(pitch)
        pitch.add(camera)
        // Camera poin of view x and z
        camera.position.set(offset[0], 0, offset[2])

        document.addEventListener('mousemove', onDocumentMouseMove)
        return () => {
            document.removeEventListener('mousemove', onDocumentMouseMove)
        }
    })

    useFrame((_, delta) => {
        // Get player current position
        playerRef.current.getWorldPosition(worldPosition)
        // Set new camera position with delay
        const delay = 7
        pivot.position.lerp(worldPosition, delta * delay)
      })

    return { pivot, alt, yaw, pitch }
}