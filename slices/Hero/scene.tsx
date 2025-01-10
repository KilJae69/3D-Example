"use client"

import { Environment, ContactShadows } from "@react-three/drei";
import {Geometries} from "./Shapes";

const Scene = () => {
    return (
      <>
        <ambientLight intensity={1.5} />
        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.65}
          scale={40}
          blur={1}
          far={9}
        />
        <Environment preset="studio" />
        <Geometries />
      </>
    );
  };
  
  export default Scene;