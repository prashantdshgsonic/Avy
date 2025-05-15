// Scene light settings
export default function SceneLights() {
    const ambientColor = "white";
    const ambientIntensity = 0.7;

    const directColor = "#e9ecef";
    const directIntencity = 5;

    return (
        <group>
            <ambientLight 
                key={"ambient_light"}
                color={ambientColor} 
                intensity={ambientIntensity}
                />
            <directionalLight
                key={"direct_light"}
                castShadow
                color={directColor} 
                intensity={directIntencity}
                position={[-80, 100, 50]} 
            
                shadow-camera-near={1}
                shadow-camera-far={400}
                shadow-camera-left={200}
                shadow-camera-right={-200}
                shadow-camera-top={200}
                shadow-camera-bottom={-200}
                // Shadow map 
                shadow-mapSize-width={8000}
                shadow-mapSize-height={8000}
                shadow-bias={-0.001}
                >
                {/* <axesHelper args={[300]}/> */}
            </directionalLight>
        </group>
    )
}