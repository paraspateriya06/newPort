import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// An elegant, flowing particle wave pattern
function WaveParticles({ count = 2000 }) {
  const mesh = useRef();
  
  // Create an array of positions
  const { positions, basicColors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basicColors = new Float32Array(count * 3);
    
    const color1 = new THREE.Color('#f5f5f5');
    const color2 = new THREE.Color('#525252');
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
        // Distribute particles in a grid/cylinder-like flow
        const x = (Math.random() - 0.5) * 40; 
        const z = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 10;
        
        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Mix colors based on position
        const mixRatio = Math.random();
        tempColor.lerpColors(color1, color2, mixRatio);
        basicColors[i * 3 + 0] = tempColor.r;
        basicColors[i * 3 + 1] = tempColor.g;
        basicColors[i * 3 + 2] = tempColor.b;
    }
    return { positions, basicColors };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    
    // Wave animation logic
    const positionsArray = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positionsArray[i3 + 0];
      const z = positionsArray[i3 + 2];
      
      // Sophisticated wave math (Sine + Cosine interference)
      positionsArray[i3 + 1] = Math.sin(time * 0.5 + x * 0.2) * 2 + Math.cos(time * 0.3 + z * 0.2) * 2;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Smooth camera/object movement based on mouse + scroll
    const mouseX = (state.pointer.x * Math.PI) / 8;
    const mouseY = (state.pointer.y * Math.PI) / 8;
    
    // Parallax scrolling
    mesh.current.position.y = (scrollY * -0.005) - 5;
    
    // Interactivity
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouseY * 0.5, 0.05);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, time * 0.05 + mouseX * 0.5, 0.05);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={basicColors.length / 3}
          array={basicColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.36}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        {/* Deep, dark fog to fade things seamlessly into the background */}
        <fog attach="fog" args={['#030303', 10, 40]} />
        <ambientLight intensity={0.14} />
        
        {/* Core flowing particle wave */}
        <WaveParticles count={4000} />
      </Canvas>
    </div>
  );
}
