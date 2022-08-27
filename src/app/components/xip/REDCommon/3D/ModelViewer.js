import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from "./GltfModel";

const ModelViewer = ({ modelPath, scale = 40, position = [0, 0, 0] }) => {
  return (
    <Canvas>
      {/* <ambientLight intensity={0.3} /> */}
      <ambientLight intensity={-1} />
      {/* 조명 */}
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={10} />
      {/* 조명 */}
      {/* <pointLight position={[-10, -10, -10]} /> */}
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <GltfModel modelPath={modelPath} scale={scale} position={position} />
        {/* 스크롤 확대 */}
        <OrbitControls />  
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;