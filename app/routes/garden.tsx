import { Canvas } from "@react-three/fiber";
import { OrbitControls, useCursor } from "@react-three/drei";
import type { EmblaOptionsType } from "embla-carousel";
import { useState } from "react";
import CameraFeed from "~/components/CameraFeed";
import PlantModel from "~/components/PlantModel";
import * as THREE from "three";
import PlantCarousel from "~/components/PlantCarousel";

const OPTIONS: EmblaOptionsType = {
  align: "center",
  dragFree: true,
  loop: true,
};

const plantList = [
  {
    name: "Heuchera",
    url: "/plants/heuchera.glb",
    thumb: "/plants/heuchera.png",
  },
  {
    name: "Hydrangea",
    url: "/plants/hydrangea.glb",
    thumb: "/plants/hydrangea.png",
  },
  {
    name: "Tree",
    url: "/plants/officeplant.glb",
    thumb: "/plants/officeplant.png",
  },
  {
    name: "Ivy",
    url: "/plants/ivy.glb",
    thumb: "/plants/ivy.png",
  },
  {
    name: "Caladium",
    url: "/plants/caladium.glb",
    thumb: "/plants/caladium.png",
  },
];

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

  const [selectedModel, setSelectedModel] = useState(plantList[0].url);

  const handleClick = (point: THREE.Vector3) => {
    setPlantPos([point.x, -1, point.z]);
  };

  return (
    <div className="relative h-screen w-screen">
      <CameraFeed />
      <Canvas style={{ height: "100%" }}>
        <ambientLight intensity={3} />
        <OrbitControls />

        <PlantModel position={plantPos} url={selectedModel} />
        <Ground onClick={handleClick} />
      </Canvas>
      <PlantCarousel
        plants={plantList}
        selected={selectedModel}
        onSelect={setSelectedModel}
        options={OPTIONS}
      />
    </div>
  );
}
