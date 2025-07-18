import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent,RootState } from '@react-three/fiber';
import { useGLTF, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

interface GiruModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  autoRotate?: boolean;
  onClick?: () => void;
}

export function GiruModel({
  position = [0, 0, 0],
  scale = 2,
  rotation = [0, 0, 0],
  autoRotate = true,
  onClick,
}: GiruModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/wibots/giru2.glb') as unknown as GLTFResult;
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Efecto para cambiar el cursor cuando se pasa por encima del modelo
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  useFrame((state: RootState, delta: number) => {
    if (modelRef.current) {
      if (autoRotate) {
        modelRef.current.rotation.y += delta * 0.1; 
      }
      
      if (hovered || clicked) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.05 + 1;
        modelRef.current.scale.set(
          scale * pulse,
          scale * pulse,
          scale * pulse
        );
      } else {
        modelRef.current.scale.x = THREE.MathUtils.lerp(
          modelRef.current.scale.x,
          scale,
          0.1
        );
        modelRef.current.scale.y = THREE.MathUtils.lerp(
          modelRef.current.scale.y,
          scale,
          0.1
        );
        modelRef.current.scale.z = THREE.MathUtils.lerp(
          modelRef.current.scale.z,
          scale,
          0.1
        );
      }
    }
  });

  return (
    <group
      ref={modelRef}
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      scale={new THREE.Vector3(scale, scale, scale)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setClicked(!clicked);
        if (onClick) onClick();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {/* Aplicamos un material personalizado al modelo */}
      <group>
        <primitive object={gltf.nodes.Scene || Object.values(gltf.nodes)[0]} />
      </group>
      
      {/* Efecto de resplandor rojo */}
      {(hovered || clicked) && (
        <mesh position={new THREE.Vector3(0, 0, -0.5)} scale={new THREE.Vector3(2, 2, 0.1)}>
          <planeGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#ff0000"
            distort={0.3}
            speed={4}
            transparent
            opacity={0.15}
            roughness={0}
            metalness={1}
          />
        </mesh>
      )}
    </group>
  );
}

// Precarga el modelo para mejorar el rendimiento


// Precarga el modelo para mejorar el rendimiento
useGLTF.preload('/wibots/giru2.glb');