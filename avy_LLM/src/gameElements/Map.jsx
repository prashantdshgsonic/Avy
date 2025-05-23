import { useGLTF } from "@react-three/drei/native"
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

export const Map = () => {
  const map = useGLTF("./models/CityMap.glb")

  useEffect(() => {
    map.scene.traverse((child) => {
      if(child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

  }, []);

  return (
    <RigidBody colliders='trimesh' type="fixed">
      <primitive object={map.scene} />
    </RigidBody>
  )
}
