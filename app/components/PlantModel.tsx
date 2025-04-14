import { useGLTF } from "@react-three/drei";

interface PlantModelProps {
  position: [number, number, number];
}

export default function PlantModel({ position }: PlantModelProps) {
  const { scene } = useGLTF("/plant.glb");

  return <primitive object={scene} scale={1} position={position} />;
}
