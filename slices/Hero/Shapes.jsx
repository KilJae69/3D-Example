"use client";

import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
import { 
 // ContactShadows,
   Float, 
 //  Environment 
  } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState,lazy } from "react";
import { gsap } from "gsap";

import { Canvas } from "@react-three/offscreen";

const Scene = lazy(() => import("./scene"));
const worker = new Worker(new URL("./worker.tsx", import.meta.url), { type: "module" });


export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          worker={worker}
          fallback={<Scene />}
          shadows
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
        />
      </Suspense>
    </div>
    
  );
}

export function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(3), // GEM
    },
    {
      position: [1, -0.75, 4],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // PILL
    },
    {
      position: [-1.4, 2, -4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5), // Soccer Ball
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut
    },
    {
      position: [1.6, 1.6, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // Diamond
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0,
      metalness: 0.7,
    }),
    new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0 }),
    new THREE.MeshStandardMaterial({
      roughness: 0.2,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.7,
      color: 0x2c3e50,
    }),
  ];

  const soundEffects = [
    new Audio("/sounds/knock1.ogg"),
    new Audio("/sounds/knock2.ogg"),
    new Audio("/sounds/knock3.ogg"),
  ];

  // pass to Geometry
  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      soundEffects={soundEffects}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, materials, soundEffects }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }
  const startingMaterial = getRandomMaterial();

  function handleClick(e) {
    const mesh = e.object;
    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });
    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1,0.3)",
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}
