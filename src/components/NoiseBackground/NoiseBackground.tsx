// src/components/NoiseBackground.tsx
import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

import vertexShader from './shaders/noise.vert'
import fragmentShader from './shaders/noise.frag'

// Définition du matériau personnalisé
const NoiseMaterial = shaderMaterial(
  { uTime: 0 },
  vertexShader,
  fragmentShader
)

extend({ NoiseMaterial })

const AnimatedBackground = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime
    }
  })

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <noiseMaterial ref={materialRef} />
    </mesh>
  )
}

export default AnimatedBackground
