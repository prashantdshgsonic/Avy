// Scene light settings
export default function SceneLights() {
  const ambientColor = "white";
  const ambientIntensity = 0.5;

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
        color={directColor}
        intensity={directIntencity}
        position={[-10, 10, 10]}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
    </group>
  );
}
