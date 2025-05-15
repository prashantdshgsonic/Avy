import * as THREE from "three";
import { useTexture } from '@react-three/drei';

export default function SkyBox() {
    const map = useTexture("textures/SkyDome02.jpg");

    return (
      <>
        <mesh rotation={[0, 0, 0]} >
          <sphereGeometry args={[300, 16, 16]} />
          {/* <meshStandardMaterial map={map} side={THREE.BackSide}/> */}
          <meshPhysicalMaterial
            map={map} 
            side={THREE.BackSide}
            color={'white'}
            // roughness={0.5}
            // metalness={0.5}
            emissiveMap={map}
            emissive={'#c1f2f7'}
            emissiveIntensity={1}
          />
        </mesh>
      </>
    );
};