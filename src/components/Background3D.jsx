import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarField({ count = 2200, radius = 42, size = 0.075, opacity = 0.7 }) {
  const pointsRef = useRef(null);

  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const nearColor = new THREE.Color('#f5f5f5');
    const farColor = new THREE.Color('#6b7280');
    const mixed = new THREE.Color();

    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      const distance = radius * Math.pow(Math.random(), 0.72);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = distance * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = distance * Math.cos(phi) * 0.65;
      positions[i3 + 2] = distance * Math.sin(phi) * Math.sin(theta);

      mixed.lerpColors(farColor, nearColor, Math.random() * 0.85 + 0.15);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
      scales[index] = Math.random();
    }

    return { positions, colors, scales };
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.01;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      state.pointer.y * 0.08,
      0.04
    );
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      -state.pointer.x * 0.06,
      0.04
    );

    const sizeAttribute = pointsRef.current.geometry.attributes.aScale;
    for (let index = 0; index < count; index += 1) {
      sizeAttribute.array[index] = scales[index] + Math.sin(time * 1.4 + index * 0.13) * 0.08;
    }
    sizeAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        uniforms={{
          uSize: { value: size * window.devicePixelRatio },
          uOpacity: { value: opacity },
        }}
        vertexShader={`
          attribute float aScale;
          uniform float uSize;
          varying vec3 vColor;

          void main() {
            vColor = color;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = uSize * (1.0 + aScale * 0.7);
            gl_PointSize *= (1.0 / -viewPosition.z);
          }
        `}
        fragmentShader={`
          uniform float uOpacity;
          varying vec3 vColor;

          void main() {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float strength = smoothstep(0.5, 0.0, distanceToCenter);
            strength *= smoothstep(0.0, 0.22, strength);
            gl_FragColor = vec4(vColor, strength * uOpacity);
          }
        `}
      />
    </points>
  );
}

function NebulaBands() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = time * 0.025;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 0.9, 0.02);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.pointer.y * 0.45, 0.02);
  });

  return (
    <group ref={groupRef} position={[0, 1.2, -10]}>
      <mesh rotation={[-0.35, 0.15, -0.28]} position={[-3.5, 0.8, 0]}>
        <planeGeometry args={[13, 7.5, 1, 1]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.055} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh rotation={[-0.1, -0.2, 0.55]} position={[3.8, -1.6, -1]}>
        <planeGeometry args={[11.5, 6.2, 1, 1]} />
        <meshBasicMaterial color="#d4d4d8" transparent opacity={0.045} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh rotation={[0.18, 0.24, -0.18]} position={[0.2, -0.8, -2.2]}>
        <planeGeometry args={[16, 6, 1, 1]} />
        <meshBasicMaterial color="#71717a" transparent opacity={0.038} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function OrbitRing() {
  const ringRef = useRef(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.getElapsedTime();
    ringRef.current.rotation.z = time * 0.08;
    ringRef.current.rotation.x = Math.PI / 2.8 + state.pointer.y * 0.08;
  });

  return (
    <mesh ref={ringRef} position={[6.2, -2.8, -14]}>
      <torusGeometry args={[4.8, 0.02, 16, 160]} />
      <meshBasicMaterial color="#d4d4d8" transparent opacity={0.18} />
    </mesh>
  );
}

function DistantPlanet() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 7.5 + state.pointer.x * 0.5, 0.03);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -3.5 + state.pointer.y * 0.3, 0.03);
  });

  return (
    <group ref={groupRef} position={[7.5, -3.5, -15]}>
      <mesh>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshStandardMaterial
          color="#09090b"
          emissive="#111827"
          emissiveIntensity={0.45}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
      <mesh scale={1.15}>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshBasicMaterial color="#e5e7eb" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.55;
    const targetY = state.pointer.y * 0.4;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.025);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.025);
    state.camera.lookAt(0, 0, -8);
  });

  return null;
}

export default function Background3D() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background:
          'radial-gradient(circle at 50% 15%, rgba(255,255,255,0.06), transparent 26%), radial-gradient(circle at 75% 75%, rgba(148,163,184,0.05), transparent 22%)',
      }}
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 16], fov: 52 }}>
        <color attach="background" args={['#030303']} />
        <fog attach="fog" args={['#030303', 10, 34]} />
        <ambientLight intensity={0.22} />
        <directionalLight position={[5, 3, 5]} intensity={0.45} color="#f5f5f5" />
        <pointLight position={[-8, 4, 6]} intensity={0.35} color="#94a3b8" />

        <CameraRig />
        <NebulaBands />
        <StarField count={2000} radius={38} size={0.1} opacity={0.5} />
        <StarField count={900} radius={24} size={0.15} opacity={0.9} />
        <OrbitRing />
        <DistantPlanet />
      </Canvas>
    </div>
  );
}
