import { Suspense, useState } from 'react';
import './GiruViewer.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { GiruModel } from './GiruModel';

interface GiruViewerProps {
  className?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  cameraPosition?: [number, number, number];
  modelPosition?: [number, number, number];
  modelScale?: number;
  modelRotation?: [number, number, number];
  onModelClick?: () => void;
}

export function GiruViewer({
  className = '',
  width = '100%',
  height = '500px',
  backgroundColor = 'transparent',
  autoRotate = true,
  enableZoom = true,
  enablePan = false,
  cameraPosition = [0, 0, 5],
  modelPosition = [0, -1, 0],
  modelScale = 1,
  modelRotation = [0, 3, 0],
  onModelClick,
}: GiruViewerProps) {
  const [isRotating, setIsRotating] = useState(autoRotate);

  const handleModelClick = () => {
    if (!onModelClick) {
      setIsRotating(!isRotating);
    } else {
      onModelClick();
    }
  };

  return (
    <div
      className={`giru-viewer-container ${className}`}
      style={{
        width,
        height,
        backgroundColor,
      }}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
        <ambientLight intensity={1} color="#330000" />
        <directionalLight
          position={[10, 0, 5]}
          intensity={1.5}
          color="#ff0000"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[0, 10, 10]}
          intensity={0.5}
          color="#fff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -10]} color="#000000" intensity={2} />

        <Suspense fallback={null}>
          <GiruModel
            position={modelPosition}
            scale={modelScale}
            rotation={modelRotation}
            autoRotate={isRotating}
            onClick={handleModelClick}
          />
          <Environment preset="night" />
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.7}
            scale={10}
            blur={2.5}
            far={1}
            color="#ff0000"
          />
        </Suspense>

        <OrbitControls
          enableZoom={enableZoom}
          enablePan={enablePan}
          enableRotate
          autoRotate={false} // Manejamos la rotación en el componente GiruModel
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>


    </div>
  );
}