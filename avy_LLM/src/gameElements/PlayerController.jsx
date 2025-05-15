import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react"
import { Vector3 } from "three";
import useKeyboard from './useKeyboard'
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useStore } from '../helpers/useStore'
import PlayerCamera from "./PlayerCamera";
import { useDispatch, useSelector } from "react-redux";
import { getModelById } from "../helpers/models";
import { getUserData, startLesson } from "../store/slice/userActions";
import { setLessonWindow, addVisitedChar } from "../store/slice/userSlice";
import charHelloPositions from "../helpers/positions";

export default function PlayerController(props) {
    // Refs
    const group = useRef()
    const rigidBody = useRef()
    const player = useRef()

    // Checkapproach to mission characters
    let counter = 0;
    const { playerApproach } = props;
    const { setPlayerApproach } = props;
    const playerInterractDist = 2

    //Help Button
    const isHKeyPressedRef = useRef(false);
    const { setHelpButton } = props;

    // Controls
    const { camera } = useThree()
    const keyboard = useKeyboard()

    // For player position
    const dispatch = useDispatch();
    const { currentProgress, currentLesson, lessonWindow, userInfo, visitedCharsArray } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const [lessonStarted, setLessonStarted] = useState(false);
    const resetPosition = new Vector3(props.position[0], props.position[1], props.position[2]);

    // Set user avatar
    let playerChoosed = getModelById(userInfo.avatarId)

    // Controller state
    let playerState = 0

    useEffect(() => {
        dispatch(getUserData(userToken));
      }, [userToken]);

    useEffect(() => {
        if (lessonStarted && currentProgress.status === "COMPLETED") {
            if (!visitedCharsArray.includes(playerApproach)) {
                dispatch(addVisitedChar(playerApproach))
                setLessonStarted(false)
            }
            setLessonStarted(false)

            playerState = 1
        }
        setLessonStarted(false)

    }, [lessonStarted, currentProgress, playerApproach, addVisitedChar, playerState]);

    // Movement
    let movementVelocity = new Vector3(0, 0, 0)
    let movementDirection = new Vector3(0, 0, 0)
    let lastDirection = new Vector3(0, 0, 0)
    let rotationDir = 0
    let targetAngle = 0
    const moveSpeed = 1000
    let isJumping = false
    let jumpCooldown = false;

    // Camera vars
    PlayerCamera(player)

    // Animations
    const { actions, mixer } = useStore((state) => state)
    let activeAction = 0
    let prevActiveAction = 0

    function getForwardVector() {
        camera.getWorldDirection(movementDirection)
        movementDirection.y = 0
        movementDirection.normalize()
        return movementDirection
    }

    function getSideVector() {
        camera.getWorldDirection(movementDirection)
        movementDirection.y = 0
        movementDirection.normalize()
        movementDirection.cross(camera.up)
        return movementDirection
    }

    function calculateRotateParameters() {
        // Calculate final angle position
        lastDirection.copy(movementVelocity)
        lastDirection = lastDirection.normalize()
        targetAngle = Math.atan2(lastDirection.x, lastDirection.z)

        // Calculate rotate direction
        if (player.current.rotation.y > targetAngle) {
            rotationDir = -1
        } else {
            rotationDir = 1
        }

        // Change direction if there is smaller angle to rotate
        const isMoreThanPi = Math.abs(player.current.rotation.y - targetAngle) > Math.PI
        if (isMoreThanPi) {
            rotationDir *= -1
        }
    }

    function rotatePlayer(delta) {
        if ((player.current.rotation.y < targetAngle - 0.1) || (player.current.rotation.y > targetAngle + 0.1)) {
            const step = delta * 7
            const diff = step * rotationDir
            player.current.rotation.y += diff
        }

        if (player.current.rotation.y > Math.PI) {
            player.current.rotation.y = (Math.PI - (player.current.rotation.y - Math.PI)) * -1
        }
        if (player.current.rotation.y < -Math.PI) {
            player.current.rotation.y = (Math.PI + (player.current.rotation.y + Math.PI))
        }
    }

    //old controls. reading play error
    // function controls(delta) {
    //     switch (playerState) {
    //         // Reset active vectors state
    //         case 0:
    //             actions['idle'].play()
    //         // Check buttons
    //         case 1:
    //             movementVelocity.set(0, 0, 0)
    //             isJumping = false
    //             activeAction = 0
    //             if (keyboard['KeyW'] || keyboard['ArrowUp']) {
    //                 movementVelocity.add(
    //                     getForwardVector().multiplyScalar(moveSpeed * delta)
    //                 )
    //                 activeAction = 1
    //                 playerState = 2
    //             }
    //             if (keyboard['KeyS'] || keyboard['ArrowDown']) {
    //                 movementVelocity.add(
    //                     getForwardVector().multiplyScalar(-moveSpeed * delta)
    //                 )
    //                 activeAction = 1
    //                 playerState = 2
    //             }
    //             if (keyboard['KeyA'] || keyboard['ArrowLeft']) {
    //                 movementVelocity.add(
    //                     getSideVector().multiplyScalar(-moveSpeed * delta)
    //                 )
    //                 activeAction = 1
    //                 playerState = 2
    //             }
    //             if (keyboard['KeyD'] || keyboard['ArrowRight']) {
    //                 movementVelocity.add(
    //                     getSideVector().multiplyScalar(moveSpeed * delta)
    //                 )
    //                 activeAction = 1
    //                 playerState = 2
    //             }
    //             if (keyboard['Space'] && !isJumping) {
    //                 activeAction = 2
    //                 playerState = 3
    //             }
    //             if (keyboard['KeyT']) {
    //                 activeAction = 3
    //                 playerState = 5
    //             }
    //             if (keyboard['KeyE'] && playerApproach > 0) {
    //                 if(!visitedCharsArray.includes(playerApproach)) {
    //                     playerState = 6
    //                 }
    //             }
    //             if (keyboard['KeyH']) {
    //                 playerState = 8
    //             }
    //             if (!keyboard['KeyH']) {
    //                 isHKeyPressedRef.current = false;
    //             }
    //             break;
    //         // Move player
    //         case 2:
    //             movementVelocity.setLength(1)
    //             movementVelocity.multiplyScalar(6)
    //             calculateRotateParameters()
    //             rotatePlayer(delta)
    //             rigidBody.current.setLinvel(movementVelocity, true)
    //             playerState = 1
    //             break;
    //         // Player jump
    //         case 3:
    //             movementVelocity.setLength(7)
    //             movementVelocity.y = 20
    //             rigidBody.current.setLinvel(movementVelocity, true)
    //             playerState = 4
    //             break;
    //         case 4:
    //             if (rigidBody.current.isMoving() && !jumpCooldown) {
    //                 isJumping = true
    //                 jumpCooldown = true

    //                 setTimeout(() => {
    //                     jumpCooldown = false;
    //                 }, 800);

    //                 playerState = 1
    //             }
    //             break;
    //         case 5:
    //             if (keyboard['KeyW'] === true || keyboard['ArrowUp'] ||
    //                 keyboard['KeyS'] === true || keyboard['ArrowDown'] ||
    //                 keyboard['KeyA'] === true || keyboard['ArrowLeft'] ||
    //                 keyboard['KeyD'] === true || keyboard['ArrowRight'] ||
    //                 keyboard['Space'] === true) {
    //                 playerState = 1
    //             }
    //             break;
    //         case 6:
    //             // when modal window open
    //             if (!lessonStarted) {
    //                 dispatch(startLesson({ lessonId: currentProgress.nextLessonId, userToken: userToken }));
    //                 setLessonStarted(true);
    //                 dispatch(setLessonWindow(true));
    //                 if (!visitedCharsArray.includes(playerApproach)) {
    //                     dispatch(addVisitedChar(playerApproach))
    //                 }
    //                 playerState = 7
    //             } 
    //             break;
    //         case 7:
    //             if (lessonStarted && currentProgress.status === "COMPLETED") {
    //                 visitedCharsArray[playerApproach] = playerApproach;
    //                 setLessonStarted(false)

    //                 playerState = 1 // return game
    //             }
    //             break;
    //         case 8:
    //             if (!isHKeyPressedRef.current) {
    //                 isHKeyPressedRef.current = true;
    //                 setHelpButton((prev) => !prev)
    //             }
    //             playerState = 1
    //             break;
    //     }
    // }

    //new
    function controls(delta) {
        switch (playerState) {
            // Reset active vectors state
            case 0:
                if (actions['idle']) {
                    actions['idle'].play();
                } else {
                    console.warn("Action 'idle' is not defined or not loaded yet.");
                }
                playerState = 1;  // return to state playerState1 
                break; //break bloks rest movements, so needs to be add playerState = 1
    
            // Check buttons
            case 1:
                movementVelocity.set(0, 0, 0);
                isJumping = false;
                activeAction = 0;
    
                if (keyboard['KeyW'] || keyboard['ArrowUp']) {
                    movementVelocity.add(
                        getForwardVector().multiplyScalar(moveSpeed * delta)
                    );
                    activeAction = 1;
                    playerState = 2;
                }
                if (keyboard['KeyS'] || keyboard['ArrowDown']) {
                    movementVelocity.add(
                        getForwardVector().multiplyScalar(-moveSpeed * delta)
                    );
                    activeAction = 1;
                    playerState = 2;
                }
                if (keyboard['KeyA'] || keyboard['ArrowLeft']) {
                    movementVelocity.add(
                        getSideVector().multiplyScalar(-moveSpeed * delta)
                    );
                    activeAction = 1;
                    playerState = 2;
                }
                if (keyboard['KeyD'] || keyboard['ArrowRight']) {
                    movementVelocity.add(
                        getSideVector().multiplyScalar(moveSpeed * delta)
                    );
                    activeAction = 1;
                    playerState = 2;
                }
                if (keyboard['Space'] && !isJumping) {
                    activeAction = 2;
                    playerState = 3;
                }
                if (keyboard['KeyT']) {
                    activeAction = 3;
                    playerState = 5;
                }
                if (keyboard['KeyE'] && playerApproach > 0) {
                    if (!visitedCharsArray.includes(playerApproach)) {
                        playerState = 6;
                    }
                }
                if (keyboard['KeyH']) {
                    playerState = 8;
                }
                if (!keyboard['KeyH']) {
                    isHKeyPressedRef.current = false;
                }
                break;
    
            // Move player
            case 2:
                movementVelocity.setLength(1);
                movementVelocity.multiplyScalar(6);
                calculateRotateParameters();
                rotatePlayer(delta);
                rigidBody.current.setLinvel(movementVelocity, true);
                playerState = 1; 
                break;
    
            // Player jump
            case 3:
                movementVelocity.setLength(7);
                movementVelocity.y = 20;
                rigidBody.current.setLinvel(movementVelocity, true);
                playerState = 4;
                break;
    
            case 4:
                if (rigidBody.current.isMoving() && !jumpCooldown) {
                    isJumping = true;
                    jumpCooldown = true;
    
                    setTimeout(() => {
                        jumpCooldown = false;
                    }, 800);
    
                    playerState = 1; // return  after jump
                }
                break;
    
            case 5:
                if (
                    keyboard['KeyW'] === true ||
                    keyboard['ArrowUp'] ||
                    keyboard['KeyS'] === true ||
                    keyboard['ArrowDown'] ||
                    keyboard['KeyA'] === true ||
                    keyboard['ArrowLeft'] ||
                    keyboard['KeyD'] === true ||
                    keyboard['ArrowRight'] ||
                    keyboard['Space'] === true
                ) {
                    playerState = 1; // return if other buttons pressed
                }
                break;
    
            case 6:
                // when modal window open
                if (!lessonStarted) {
                    dispatch(startLesson({ lessonId: currentProgress.nextLessonId, userToken: userToken }));
                    setLessonStarted(true);
                    dispatch(setLessonWindow(true));
                    if (!visitedCharsArray.includes(playerApproach)) {
                        dispatch(addVisitedChar(playerApproach));
                    }
                    playerState = 7;
                }
                break;
    
            case 7:
                if (lessonStarted && currentProgress.status === "COMPLETED") {
                    visitedCharsArray[playerApproach] = playerApproach;
                    setLessonStarted(false);
    
                    playerState = 1; // return to game
                }
                break;
    
            case 8:
                if (!isHKeyPressedRef.current) {
                    isHKeyPressedRef.current = true;
                    setHelpButton((prev) => !prev);
                }
                playerState = 1; // return to game after H button
                break;
    
            default:
                break;
        }
    }

    function playerFell() {
        if (rigidBody.current?.translation().y < -0.5) {
            if(rigidBody.current.translation().x >= 0 && rigidBody.current.translation().x < 120 &&
                rigidBody.current.translation().z > -129 && rigidBody.current.translation().z <= 0) {
                // Player stock in the map
                // Push up the player
                movementVelocity.set(0, 0, 0)
                rigidBody.current.resetForces(true)
                const x = rigidBody.current.translation().x
                const z = rigidBody.current.translation().z
                const stockPosition = new Vector3(x, 3, z)
                rigidBody.current.setTranslation(stockPosition)
            } else {
                // Player drop out of map
                // Reset player
                movementVelocity.set(0, 0, 0)
                rigidBody.current.resetForces(true)
                rigidBody.current.setTranslation(resetPosition)
            }
            
        }
    }

    function playerAnimation(delta) {
        if (activeAction !== prevActiveAction) {
            switch (prevActiveAction) {
                case 0:
                    actions['idle'].fadeOut(0.3)
                    break;
                case 1:
                    actions['walk'].fadeOut(0.3)
                    break;
                case 2:
                    actions['jump'].fadeOut(0.3)
                    break;
                case 3:
                    actions['dance'].fadeOut(0.3)
                    break;
            }
            switch (activeAction) {
                case 0:
                    actions['idle'].reset().fadeIn(0.1).play()
                    break;
                case 1:
                    actions['walk'].reset().fadeIn(0.1).play()
                    break;
                case 2:
                    actions['jump'].reset().fadeIn(0.1).setDuration(1.2).play()
                    break;
                case 3:
                    actions['dance'].reset().fadeIn(0.1).play()
                    break;
            }
            prevActiveAction = activeAction
        }
        mixer.update(delta)
    }

    function checkApproach() {
        if (rigidBody.current === null) {
            return
        }
        if ((Math.abs(rigidBody.current.translation().x - charHelloPositions[counter].x) < playerInterractDist &&
            Math.abs(rigidBody.current.translation().z - charHelloPositions[counter].z) < playerInterractDist)) {
            setPlayerApproach(counter + 1)
        } else if (playerApproach === counter + 1) {
            setPlayerApproach(0)
        }
        if (counter >= charHelloPositions.length - 1) {
            counter = 0;
        } else {
            ++counter
        }
    }

    useFrame((_, delta) => {
        controls(delta)
        playerAnimation(delta)
        playerFell()
        checkApproach()
    })

    return (
        <group {...props} ref={group} >
            <RigidBody ref={rigidBody}
                colliders={false}
                gravityScale={8}
                friction={0}
                linearDamping={1}
                lockRotations
            >
                <group ref={player} >
                    {playerChoosed}
                </group >
                <CapsuleCollider args={[0.8, 0.5]} position={[0, 1.3, 0]} />
            </RigidBody >
        </group>
    )
}


