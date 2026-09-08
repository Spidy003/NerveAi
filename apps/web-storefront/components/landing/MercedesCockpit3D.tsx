"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type ViewAngle = "orbit" | "front" | "side" | "back" | "top";

interface MercedesCockpit3DProps {
  theme?: "dark" | "light";
  className?: string;
}

export default function MercedesCockpit3D({
  theme = "dark",
  className = "",
}: MercedesCockpit3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeAngle, setActiveAngle] = useState<ViewAngle>("orbit");

  const isLight = theme === "light";

  // References to communicate with Three.js animation loop
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(3.2, 1.7, 3.2));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.1, 0));
  const isTransitioningRef = useRef(false);

  // Preset angle targets (calibrated for a compact, elegantly framed car with clean breathing room)
  const angleConfigs: Record<
    ViewAngle,
    { cam: [number, number, number]; lookAt: [number, number, number]; label: string }
  > = {
    orbit: {
      cam: [3.8, 2.0, 3.8],
      lookAt: [0, 0.1, 0],
      label: "3/4 PERSPECTIVE",
    },
    front: {
      cam: [0.05, 1.45, 4.6],
      lookAt: [0, 0.2, 0.3],
      label: "FRONT BUMPER & SUSPENSION",
    },
    side: {
      cam: [4.8, 1.25, 0.0],
      lookAt: [0, 0.15, 0],
      label: "SIDE PROFILE & WHEELBASE",
    },
    back: {
      cam: [0.05, 1.55, -4.6],
      lookAt: [0, 0.2, -0.3],
      label: "BACK SIDE & REAR DIFFUSER",
    },
    top: {
      cam: [0.05, 5.4, 0.1],
      lookAt: [0, 0, 0],
      label: "TOP-DOWN CHASSIS SCAN",
    },
  };

  // Handler for selecting an angle with smooth camera transition
  const handleSelectAngle = (angle: ViewAngle) => {
    setActiveAngle(angle);
    const cfg = angleConfigs[angle];
    targetCamPosRef.current.set(...cfg.cam);
    targetLookAtRef.current.set(...cfg.lookAt);
    isTransitioningRef.current = true;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;
    let animationFrameId: number;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Camera - Scaled to make car compact with generous breathing room
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.05, 100);
    camera.position.set(3.8, 2.0, 3.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLight ? 1.25 : 1.45;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls - NO AUTO ROTATION (User can freely drag)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.autoRotate = false; // Strictly NO auto-rotation
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.target.set(0, 0.1, 0);
    controls.minDistance = 1.0;
    controls.maxDistance = 8.0;
    controlsRef.current = controls;

    // 5. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      isLight ? 0xffffff : 0xd0f5ff,
      isLight ? 1.6 : 1.2
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isLight ? 3.0 : 3.8);
    keyLight.position.set(2.0, 5.0, 3.0);
    scene.add(keyLight);

    // Front/Cockpit glow
    const cockpitGlow = new THREE.PointLight(
      isLight ? 0x00bfa5 : 0x2de1c2,
      4.5,
      3.2
    );
    cockpitGlow.position.set(0.1, 0.65, 0.25);
    scene.add(cockpitGlow);

    // Rear engine bay glow (illuminates back side)
    const rearGlow = new THREE.PointLight(
      isLight ? 0x00897b : 0x00e5ff,
      4.0,
      3.0
    );
    rearGlow.position.set(0, 0.6, -0.6);
    scene.add(rearGlow);

    const cabinLight = new THREE.PointLight(0xffffff, 2.5, 2.5);
    cabinLight.position.set(-0.15, 0.6, 0.1);
    scene.add(cabinLight);

    const rimLight = new THREE.DirectionalLight(
      isLight ? 0x00897b : 0x00e5ff,
      isLight ? 1.4 : 2.2
    );
    rimLight.position.set(-4.0, 2.5, -2.5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topLight.position.set(0, 6.0, 0);
    scene.add(topLight);

    // 6. Car Pivot
    const carPivot = new THREE.Group();
    scene.add(carPivot);

    // 7. Load Mercedes GLB & Apply X-Ray Scan Materials
    const loader = new GLTFLoader();
    const modelUrl = "/models/mercedes_amg_one.glb";

    loader.load(
      modelUrl,
      (gltf) => {
        const rawModel = gltf.scene;

        // Exact Holographic X-Ray Shader Logic
        rawModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              const name = (mesh.name || "").toLowerCase();

              const isGlass =
                name.includes("glass") || name.includes("windshield");
              const isInterior =
                name.includes("interior") ||
                name.includes("steer") ||
                name.includes("seat") ||
                name.includes("belt") ||
                name.includes("dash");

              if (!isInterior) {
                // Body panels become translucent holographic cyan tint (X-Ray)
                mat.transparent = true;
                mat.opacity = isGlass ? 0.08 : 0.28;
                mat.depthWrite = false;
                if (mat.color) {
                  mat.color.setHex(0x1dd3b0);
                }
              } else {
                // Interior components stay 100% solid & illuminated
                mat.transparent = false;
                mat.opacity = 1.0;
                mat.depthWrite = true;
              }
              mat.needsUpdate = true;
            }
          }
        });

        // Center car model
        const box = new THREE.Box3().setFromObject(rawModel);
        const center = box.getCenter(new THREE.Vector3());

        rawModel.position.x = -center.x;
        rawModel.position.y = -center.y;
        rawModel.position.z = -center.z;
        carPivot.add(rawModel);

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error("Error loading X-Ray model:", err);
        setLoading(false);
      }
    );

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop with Smooth Camera Lerp on Click
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smoothly glide camera position and target when an angle is clicked
      if (isTransitioningRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.06);
        controls.target.lerp(targetLookAtRef.current, 0.06);

        if (
          camera.position.distanceTo(targetCamPosRef.current) < 0.02 &&
          controls.target.distanceTo(targetLookAtRef.current) < 0.02
        ) {
          camera.position.copy(targetCamPosRef.current);
          controls.target.copy(targetLookAtRef.current);
          isTransitioningRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isLight]);

  return (
    <div
      className={`relative w-full h-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center bg-transparent border-none outline-none select-none ${className}`}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent overflow-visible"
      />

      {/* Cyber Angle Selection Buttons Bar */}
      <div className="absolute top-2 left-2 right-2 sm:left-4 sm:right-auto z-20 flex flex-wrap items-center gap-2 font-mono text-[10px]">
        {/* Option 1: 3/4 Orbit */}
        <button
          onClick={() => handleSelectAngle("orbit")}
          className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all cursor-pointer font-bold border ${
            activeAngle === "orbit"
              ? isLight
                ? "bg-[#00897B] text-white border-[#00897B] shadow-sm"
                : "bg-cyan text-black border-cyan shadow-[0_0_12px_#2DE1C2]"
              : isLight
              ? "bg-white/80 text-[#334E68] border-[#D1DCE5] hover:bg-white"
              : "bg-black/60 text-white/70 border-white/15 hover:text-cyan hover:border-cyan/50 backdrop-blur-sm"
          }`}
        >
          // 3/4 ANGLE
        </button>

        {/* Option 2: Front Side */}
        <button
          onClick={() => handleSelectAngle("front")}
          className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all cursor-pointer font-bold border ${
            activeAngle === "front"
              ? isLight
                ? "bg-[#00897B] text-white border-[#00897B] shadow-sm"
                : "bg-cyan text-black border-cyan shadow-[0_0_12px_#2DE1C2]"
              : isLight
              ? "bg-white/80 text-[#334E68] border-[#D1DCE5] hover:bg-white"
              : "bg-black/60 text-white/70 border-white/15 hover:text-cyan hover:border-cyan/50 backdrop-blur-sm"
          }`}
        >
          // FRONT
        </button>

        {/* Option 3: Side Profile */}
        <button
          onClick={() => handleSelectAngle("side")}
          className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all cursor-pointer font-bold border ${
            activeAngle === "side"
              ? isLight
                ? "bg-[#00897B] text-white border-[#00897B] shadow-sm"
                : "bg-cyan text-black border-cyan shadow-[0_0_12px_#2DE1C2]"
              : isLight
              ? "bg-white/80 text-[#334E68] border-[#D1DCE5] hover:bg-white"
              : "bg-black/60 text-white/70 border-white/15 hover:text-cyan hover:border-cyan/50 backdrop-blur-sm"
          }`}
        >
          // SIDE
        </button>

        {/* Option 4: Back Side */}
        <button
          onClick={() => handleSelectAngle("back")}
          className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all cursor-pointer font-bold border ${
            activeAngle === "back"
              ? isLight
                ? "bg-[#00897B] text-white border-[#00897B] shadow-sm"
                : "bg-cyan text-black border-cyan shadow-[0_0_12px_#2DE1C2]"
              : isLight
              ? "bg-white/80 text-[#334E68] border-[#D1DCE5] hover:bg-white"
              : "bg-black/60 text-white/70 border-white/15 hover:text-cyan hover:border-cyan/50 backdrop-blur-sm"
          }`}
        >
          // BACK SIDE
        </button>

        {/* Option 5: Top-Down */}
        <button
          onClick={() => handleSelectAngle("top")}
          className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all cursor-pointer font-bold border ${
            activeAngle === "top"
              ? isLight
                ? "bg-[#00897B] text-white border-[#00897B] shadow-sm"
                : "bg-cyan text-black border-cyan shadow-[0_0_12px_#2DE1C2]"
              : isLight
              ? "bg-white/80 text-[#334E68] border-[#D1DCE5] hover:bg-white"
              : "bg-black/60 text-white/70 border-white/15 hover:text-cyan hover:border-cyan/50 backdrop-blur-sm"
          }`}
        >
          // TOP-DOWN
        </button>
      </div>

      {/* Loading HUD */}
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
              [ INITIALIZING 3D X-RAY SCAN ]
            </span>
          </div>
          <div className="w-48 h-1.5 bg-black/30 rounded-full overflow-hidden border border-cyan/20">
            <div
              className={`h-full ${
                isLight ? "bg-[#00897B]" : "bg-cyan"
              } transition-all duration-200`}
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="text-[10px] text-gray-500 mt-2">
            TELEMETRY SCAN // {loadProgress}%
          </div>
        </div>
      )}

      {/* Status HUD indicating active angle */}
      {!loading && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest opacity-75 hover:opacity-100 transition-opacity pointer-events-none text-center select-none whitespace-nowrap">
          <span className={isLight ? "text-[#00897B]" : "text-cyan"}>
            [ X-RAY VIEW // {angleConfigs[activeAngle].label} // CLICK OR DRAG TO ROTATE ]
          </span>
        </div>
      )}
    </div>
  );
}
