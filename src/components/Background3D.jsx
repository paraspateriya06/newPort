import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarField({ count = 2200, radius = 38, depth = 1, drift = 0.02, opacity = 0.8, size = 0.09 }) {
  const pointsRef = useRef(null);

  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const near = new THREE.Color('#ffffff');
    const far = new THREE.Color('#64748b');
    const mixed = new THREE.Color();

    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      const distance = radius * Math.pow(Math.random(), 0.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = distance * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = distance * Math.cos(phi) * 0.72;
      positions[i3 + 2] = distance * Math.sin(phi) * Math.sin(theta) * depth;

      mixed.lerpColors(far, near, Math.random() * 0.9 + 0.1);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
      scales[index] = Math.random();
    }

    return { positions, colors, scales };
  }, [count, depth, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * drift;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, state.pointer.y * 0.06, 0.02);
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, -state.pointer.x * 0.04, 0.02);

    const scaleAttribute = pointsRef.current.geometry.attributes.aScale;
    for (let index = 0; index < count; index += 1) {
      scaleAttribute.array[index] = scales[index] + Math.sin(time * 1.2 + index * 0.11) * 0.06;
    }
    scaleAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={scales.length} array={scales} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        uniforms={{
          uSize: { value: size * Math.min(window.devicePixelRatio, 1.7) },
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
            gl_PointSize = uSize * (1.0 + aScale * 0.85);
            gl_PointSize *= (1.0 / -viewPosition.z);
          }
        `}
        fragmentShader={`
          uniform float uOpacity;
          varying vec3 vColor;

          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            float glow = smoothstep(0.52, 0.0, d);
            glow += smoothstep(0.25, 0.0, d) * 0.35;
            gl_FragColor = vec4(vColor, glow * uOpacity);
          }
        `}
      />
    </points>
  );
}

function NebulaClouds() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = time * 0.018;
    groupRef.current.rotation.y = Math.sin(time * 0.12) * 0.08;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 1.4, 0.015);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.pointer.y * 0.8, 0.015);
  });

  return (
    <group ref={groupRef} position={[0, 0.8, -10]}>
      <mesh rotation={[-0.4, 0.2, -0.2]} position={[-4.5, 2.4, 0]}>
        <planeGeometry args={[18, 10]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh rotation={[0.18, -0.2, 0.35]} position={[4.8, -1.4, -1.5]}>
        <planeGeometry args={[15, 9]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh rotation={[0.04, 0.12, -0.58]} position={[0.2, -0.8, -3]}>
        <planeGeometry args={[22, 7.2]} />
        <meshBasicMaterial color="#71717a" transparent opacity={0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function EnergyRibbons() {
  const groupRef = useRef(null);

  const ribbons = useMemo(() => {
    return [0, 1, 2].map((index) => {
      const points = [];
      for (let step = 0; step < 12; step += 1) {
        const x = -11 + step * 2.1;
        const y = Math.sin(step * 0.7 + index * 1.2) * (1.6 + index * 0.4);
        const z = -11 + index * -1.2 + Math.cos(step * 0.45) * 0.4;
        points.push(new THREE.Vector3(x, y, z));
      }

      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(time * 0.12) * 0.08;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 0.55, 0.02);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {ribbons.map((curve, index) => (
        <mesh key={index} rotation={[0.08 * index, 0.05 * index, -0.18 + index * 0.08]}>
          <tubeGeometry args={[curve, 160, 0.028 + index * 0.008, 12, false]} />
          <meshBasicMaterial
            color={index === 0 ? '#f5f5f5' : index === 1 ? '#cbd5e1' : '#71717a'}
            transparent
            opacity={index === 0 ? 0.38 : 0.22}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function MeteorTrails() {
  const trailRefs = useRef([]);

  const trails = useMemo(() => {
    return Array.from({ length: 4 }, (_, index) => ({
      offset: index * 1.7,
      amplitude: 2.8 + index * 0.4,
      depth: -7 - index * 1.8,
      speed: 0.08 + index * 0.016,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    trailRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const trail = trails[index];
      const progress = (time * trail.speed + trail.offset) % 1;
      mesh.position.x = 14 - progress * 28;
      mesh.position.y = Math.sin(progress * Math.PI * 2 + trail.offset) * trail.amplitude;
      mesh.position.z = trail.depth;
      mesh.rotation.z = -0.72;
      mesh.material.opacity = 0.11 + Math.sin(time * 2 + index) * 0.02;
    });
  });

  return (
    <group>
      {trails.map((trail, index) => (
        <mesh
          key={trail.offset}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
        >
          <planeGeometry args={[4.8, 0.08]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitalSystem() {
  const planetRef = useRef(null);
  const ringRef = useRef(null);
  const moonRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.09;
      planetRef.current.position.x = THREE.MathUtils.lerp(planetRef.current.position.x, 7.2 + state.pointer.x * 0.65, 0.02);
      planetRef.current.position.y = THREE.MathUtils.lerp(planetRef.current.position.y, -2.5 + state.pointer.y * 0.45, 0.02);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.11;
      ringRef.current.rotation.x = Math.PI / 2.85 + state.pointer.y * 0.08;
    }

    if (moonRef.current && planetRef.current) {
      moonRef.current.position.x = planetRef.current.position.x + Math.cos(time * 0.5) * 3.8;
      moonRef.current.position.y = planetRef.current.position.y + Math.sin(time * 0.5) * 1.15;
      moonRef.current.position.z = -15 + Math.sin(time * 0.35) * 1.3;
    }
  });

  return (
    <group>
      <group ref={planetRef} position={[7.2, -2.5, -15]}>
        <mesh>
          <sphereGeometry args={[2.35, 64, 64]} />
          <meshStandardMaterial color="#08090b" emissive="#0f172a" emissiveIntensity={0.6} roughness={0.96} metalness={0.04} />
        </mesh>
        <mesh scale={1.16}>
          <sphereGeometry args={[2.35, 64, 64]} />
          <meshBasicMaterial color="#e2e8f0" transparent opacity={0.045} side={THREE.BackSide} />
        </mesh>
      </group>

      <mesh ref={ringRef} position={[7.2, -2.5, -15]}>
        <torusGeometry args={[5.3, 0.03, 16, 220]} />
        <meshBasicMaterial color="#d4d4d8" transparent opacity={0.2} />
      </mesh>

      <mesh ref={moonRef}>
        <sphereGeometry args={[0.42, 28, 28]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const targetX = state.pointer.x * 0.9;
    const targetY = state.pointer.y * 0.6 + Math.sin(time * 0.18) * 0.18;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.02);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 15.4 + Math.sin(time * 0.15) * 0.2, 0.025);
    state.camera.lookAt(-0.8, 0, -8.5);
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
          'radial-gradient(circle at 50% 8%, rgba(255,255,255,0.1), transparent 22%), radial-gradient(circle at 82% 74%, rgba(148,163,184,0.08), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.018), transparent 18%)',
      }}
    >
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 15.5], fov: 48 }}>
        <color attach="background" args={['#020304']} />
        <fog attach="fog" args={['#020304', 8, 36]} />
        <ambientLight intensity={0.24} />
        <directionalLight position={[6, 3, 4]} intensity={0.52} color="#f8fafc" />
        <pointLight position={[-10, 3, 7]} intensity={0.55} color="#cbd5e1" />
        <pointLight position={[8, -2, -4]} intensity={0.35} color="#475569" />

        <CameraRig />
        <NebulaClouds />
        <EnergyRibbons />
        <MeteorTrails />
        <StarField count={2300} radius={42} depth={1.2} drift={0.008} opacity={0.3} size={0.08} />
        <StarField count={1300} radius={28} depth={1} drift={0.018} opacity={0.75} size={0.11} />
        <StarField count={160} radius={16} depth={0.9} drift={0.03} opacity={1} size={0.24} />
        <OrbitalSystem />
      </Canvas>
    </div>
  );
}
