"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface MercedesCar3DProps {
  theme?: "dark" | "light";
  className?: string;
  autoRotateSpeed?: number;
  framingScale?: number;
}

export default function MercedesCar3D({
  theme = "dark",
  className = "",
  autoRotateSpeed = 1.0,
  framingScale = 0.70,
}: MercedesCar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const isLight = theme === "light";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || 700;
    let height = container.clientHeight || 500;

    // 1. Scene with pure transparent background
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Camera with pleasant perspective FOV
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);

    // 3. WebGL Renderer: 100% transparent, zero bounding box, zero clear color
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLight ? 1.25 : 1.4;
    renderer.domElement.style.background = "transparent";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.overflow = "visible";

    container.appendChild(renderer.domElement);

    // 4. Orbit Controls (Smooth rotation, drag to inspect, zoom-safe)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Prevent hijack of page scroll
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.minPolarAngle = Math.PI / 10;
    controls.maxPolarAngle = Math.PI / 2.05;

    // 5. Studio Lighting for the Mercedes AMG One
    const ambientLight = new THREE.AmbientLight(
      isLight ? 0xffffff : 0xd5f3ff,
      isLight ? 2.5 : 1.8
    );
    scene.add(ambientLight);

    // Main Key Light from above-front
    const keyLight = new THREE.DirectionalLight(0xffffff, isLight ? 3.0 : 2.6);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    // Cyber Turquoise Rim Light from back-left
    const rimLight = new THREE.DirectionalLight(
      isLight ? 0x00bfa5 : 0x2de1c2,
      isLight ? 2.5 : 3.2
    );
    rimLight.position.set(-8, 6, -8);
    scene.add(rimLight);

    // Soft Fill Light from front-left
    const fillLight = new THREE.DirectionalLight(
      isLight ? 0xe2e8f0 : 0x243b4f,
      1.5
    );
    fillLight.position.set(-6, 4, 6);
    scene.add(fillLight);

    // Top Down Skylight
    const topLight = new THREE.DirectionalLight(0xffffff, 1.4);
    topLight.position.set(0, 12, 0);
    scene.add(topLight);

    // 6. Car Pivot for centering and smooth 360-degree rotation
    const carPivot = new THREE.Group();
    scene.add(carPivot);

    const loader = new GLTFLoader();

    loader.load(
      "/models/mercedes_amg_one.glb",
      (gltf) => {
        const rawModel = gltf.scene;

        // Clean any potential internal bounding planes
        rawModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.Material;
              mat.transparent = mat.opacity < 1.0;
            }
          }
        });

        // Compute exact bounding box and bounding sphere
        const box = new THREE.Box3().setFromObject(rawModel);
        const center = box.getCenter(new THREE.Vector3());
        const sphere = box.getBoundingSphere(new THREE.Sphere());

        // Center car model within its parent pivot so rotation is perfectly symmetrical
        rawModel.position.x = -center.x;
        rawModel.position.y = -center.y;
        rawModel.position.z = -center.z;
        carPivot.add(rawModel);

        // Compute safe camera distance using the bounding sphere radius
        // This guarantees that the ENTIRE car is 100% visible from ANY angle without clipping!
        const radius = sphere.radius;
        const fovRad = (camera.fov * Math.PI) / 180;
        const aspect = width / height;

        const vDistance = radius / Math.sin(fovRad / 2);
        const hFovRad = 2 * Math.atan(Math.tan(fovRad / 2) * aspect);
        const hDistance = radius / Math.sin(hFovRad / 2);

        // Optimal framing distance: framingScale (default 0.65) provides a bold, large car view
        const optimalDistance = Math.max(vDistance, hDistance) * framingScale;

        // Position camera at a 3/4 beauty angle to showcase the Mercedes AMG ONE body lines
        camera.position.set(
          optimalDistance * 0.72,
          optimalDistance * 0.28,
          optimalDistance * 0.72
        );
        camera.near = 0.1;
        camera.far = optimalDistance * 15;
        camera.updateProjectionMatrix();

        controls.target.set(0, 0, 0);
        controls.maxDistance = optimalDistance * 2.2;
        controls.minDistance = optimalDistance * 0.5;
        controls.update();

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error("Error loading 3D car model:", error);
        setLoading(false);
      }
    );

    // 7. Resize Handler using ResizeObserver for precision flexbox tracking
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 50 && h > 50) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    const ro = new ResizeObserver(() => handleResize());
    ro.observe(container);
    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isLight, autoRotateSpeed, framingScale]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center bg-transparent border-none outline-none shadow-none ${className}`}
    >
      {/* 3D Canvas mount container: 100% transparent, no borders, no clipping */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none bg-transparent overflow-visible"
      />

      {/* High-Tech Loading HUD */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono pointer-events-none">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-3.5 h-3.5 border-2 ${
                isLight ? "border-[#00897B]" : "border-cyan"
              } border-t-transparent rounded-full animate-spin`}
            />
            <span
              className={`text-xs font-cyber tracking-widest ${
                isLight ? "text-[#00897B]" : "text-cyan"
              }`}
            >
              [ INITIALIZING MERCEDES AMG ONE 3D ]
            </span>
          </div>
          <div className="w-52 h-1.5 bg-black/30 rounded-full overflow-hidden border border-cyan/20">
            <div
              className={`h-full ${
                isLight ? "bg-[#00897B]" : "bg-cyan"
              } transition-all duration-200`}
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="text-[10px] text-gray-500 mt-2">
            TELEMETRY // {loadProgress}%
          </div>
        </div>
      )}

      {/* 3D Orbit Drag Hint */}
      {!loading && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest opacity-60 hover:opacity-100 transition-opacity pointer-events-none text-center select-none whitespace-nowrap">
          <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
            [ 3D ORBIT ACTIVE // DRAG TO ROTATE ]
          </span>
        </div>
      )}
    </div>
  );
}
