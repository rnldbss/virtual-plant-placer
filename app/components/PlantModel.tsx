import { useGLTF } from "@react-three/drei";

interface PlantModelProps {
  position: [number, number, number];
  url: string;
}

export default function PlantModel({ position, url }: PlantModelProps) {
  const { scene } = useGLTF(url);

  return <primitive object={scene} scale={1} position={position} />;
}
