import React, { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GltfModel = ({ modelPath, scale = 40, position = [0, 0, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  // const [hovered, hover] = useState(false);
  const [hovered] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.003));
  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        // onPointerOver={(event) => hover(true)} // 마우스 오버시 커지는 효과
        // onPointerOut={(event) => hover(false)} // 마우스 떠날시 원래크기로 돌아가는 효과
      />
    </>
  );
};

export default GltfModel;