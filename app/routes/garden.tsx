import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useCursor, useGLTF } from "@react-three/drei";
import { useState } from "react";
import CameraFeed from "~/components/CameraFeed";
import PlantModel from "~/components/PlantModel";

import * as THREE from "three";

interface GroundProps {
  onClick: (point: THREE.Vector3) => void;
}

function Ground({ onClick }: GroundProps) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <mesh
      onPointerMove={(e) => e.stopPropagation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e.point);
      }}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
    >
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial visible={false} />
    </mesh>
  );
}

export default function Garden() {
  const [plantPos, setPlantPos] = useState<[number, number, number]>([
    0, -1, 0,
  ]);

  const handleClick = (point: THREE.Vector3) => {
    setPlantPos([point.x, -1, point.z]);
  };

  return (
    <>
      <CameraFeed />
      <Canvas style={{ height: "100vh" }}>
        <ambientLight intensity={3} />
        <OrbitControls />

        <PlantModel position={plantPos} />
        <Ground onClick={handleClick} />
      </Canvas>
    </>
  );
}
