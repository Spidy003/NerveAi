"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface AirportTruck3DProps {
  theme?: "dark" | "light";
  className?: string;
  autoRotateSpeed?: number;
  framingScale?: number;
}

export default function AirportTruck3D({
  theme = "dark",
  className = "",
  autoRotateSpeed = 1.4,
  framingScale = 0.76,
}: AirportTruck3DProps) {
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

    // 1. Three.js Scene with 100% transparent background (no scene background)
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Perspective Camera with balanced field of view
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);

    // 3. WebGL Renderer with full alpha transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0); // 0 alpha = 100% transparent background
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLight ? 1.25 : 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.background = "transparent";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.appendChild(renderer.domElement);

    // 4. Orbit Controls with auto-rotation animation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Never hijack page scroll
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.minPolarAngle = Math.PI / 10;
    controls.maxPolarAngle = Math.PI / 2.05;

    // 5. Studio Lighting Setup Matching Nerve AI UI Aesthetics
    // Balanced ambient light
    const ambientLight = new THREE.AmbientLight(
      isLight ? 0xffffff : 0xecf8ff,
      isLight ? 2.0 : 1.8
    );
    scene.add(ambientLight);

    // Main Sunlight Key Light from top-front-right
    const keyLight = new THREE.DirectionalLight(0xffffff, isLight ? 2.6 : 2.4);
    keyLight.position.set(10, 14, 10);
    scene.add(keyLight);

    // Cyber Cyan Rim Light (Accents the truck silhouette to match UI cyan)
    const rimLight = new THREE.DirectionalLight(
      isLight ? 0x00bfa5 : 0x2de1c2,
      isLight ? 2.4 : 3.0
    );
    rimLight.position.set(-10, 8, -10);
    scene.add(rimLight);

    // Cool Daylight Fill Light from front-left
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.4);
    fillLight.position.set(-8, 6, 8);
    scene.add(fillLight);

    // Subtle Cyan Ground Bounce Light
    const bounceLight = new THREE.DirectionalLight(
      isLight ? 0x99f6e4 : 0x0e3b4d,
      0.9
    );
    bounceLight.position.set(0, -8, 0);
    scene.add(bounceLight);

    // 6. Truck Pivot for symmetric rotation
    const truckPivot = new THREE.Group();
    scene.add(truckPivot);

    const loader = new GLTFLoader();

    loader.load(
      "/airport_catering_truck.glb",
      (gltf) => {
        const rawModel = gltf.scene;

        // Realistic PBR materials tuned to match the Nerve AI interface
        rawModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const name = mesh.name.toLowerCase();
            const origMat = mesh.material as THREE.MeshStandardMaterial;

            // Clone material so individual parts can be tuned independently
            const mat = origMat.clone ? origMat.clone() : origMat;

            if (mat.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
            }
            if (mat.normalMap) {
              mat.normalScale = new THREE.Vector2(1.0, 1.0);
            }

            // Headlights & Driving Spotlights: High-intensity cyber cyan LED glow
            if (
              name.includes("frontlight") ||
              name.includes("highbeam") ||
              name.includes("spotlight")
            ) {
              mat.color = new THREE.Color(0xffffff);
              mat.emissive = new THREE.Color(0x38bdf8);
              mat.emissiveIntensity = 2.4;
              mat.roughness = 0.1;
              mat.metalness = 0.2;
            }
            // Indicators & Orange Contour Lamps: Amber warning contour lights
            else if (
              name.includes("indicator") ||
              name.includes("orange") ||
              name.includes("contour")
            ) {
              mat.color = new THREE.Color(0xfbbf24);
              mat.emissive = new THREE.Color(0xf59e0b);
              mat.emissiveIntensity = 2.0;
              mat.roughness = 0.15;
            }
            // Rear Brake Lights: Glowing red automotive tail lamps
            else if (
              name.includes("brakelight") ||
              name.includes("rearlight") ||
              name.includes("reardrive")
            ) {
              mat.color = new THREE.Color(0xef4444);
              mat.emissive = new THREE.Color(0xdc2626);
              mat.emissiveIntensity = 1.8;
              mat.roughness = 0.2;
            }
            // Windows / Windshield: Smoked automotive glass with dark tint
            else if (name.includes("windows") || name.includes("glass")) {
              mesh.material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(0x0f172a),
                metalness: 0.15,
                roughness: 0.05,
                transparent: true,
                opacity: 0.72,
              });
              return;
            }
            // Side Mirrors: High reflectivity polished chrome
            else if (name.includes("mirror")) {
              mat.color = new THREE.Color(0xe2e8f0);
              mat.metalness = 0.95;
              mat.roughness = 0.05;
            }
            // Cabin Body: Clean commercial fleet white with smooth automotive reflections
            else if (
              name.includes("cabin") &&
              !name.includes("plastic") &&
              !name.includes("trim")
            ) {
              mat.color = new THREE.Color(0xf8fafc);
              mat.roughness = 0.25;
              mat.metalness = 0.18;
            }
            // Container (Catering Box): Realistic industrial white fleet panels
            else if (
              name.includes("container") &&
              !name.includes("chassis") &&
              !name.includes("lights")
            ) {
              mat.color = new THREE.Color(0xf1f5f9);
              mat.roughness = 0.32;
              mat.metalness = 0.12;
            }
            // Scissor Lift & Hydraulics: Industrial titanium / gunmetal steel
            else if (
              name.includes("liftingframe") ||
              name.includes("hydraulics") ||
              name.includes("lift_gate") ||
              name.includes("gangway")
            ) {
              mat.color = new THREE.Color(0x475569);
              mat.roughness = 0.28;
              mat.metalness = 0.85;
            }
            // Wheel Rims: Polished alloy silver rims
            else if (name.includes("wheel") && name.includes("0_0")) {
              mat.color = new THREE.Color(0xcbd5e1);
              mat.roughness = 0.22;
              mat.metalness = 0.88;
            }
            // Wheels / Tires: Realistic automotive matte black vulcanized rubber
            else if (
              name.includes("wheel") &&
              (name.includes("0_1") ||
                name.includes("rubber") ||
                name.includes("chock"))
            ) {
              mat.color = new THREE.Color(0x181a1d);
              mat.roughness = 0.88;
              mat.metalness = 0.02;
            }
            // Chassis & Underbody: Heavy industrial structural steel
            else if (name.includes("chassis") || name.includes("bumber_guard")) {
              mat.color = new THREE.Color(0x1e293b);
              mat.roughness = 0.45;
              mat.metalness = 0.65;
            }
            // Metal Trims: Sleek brushed aluminum
            else if (name.includes("metal_trim")) {
              mat.color = new THREE.Color(0xe2e8f0);
              mat.metalness = 0.85;
              mat.roughness = 0.2;
            } else {
              mat.roughness = Math.min(mat.roughness || 0.35, 0.45);
              mat.metalness = Math.max(mat.metalness || 0.15, 0.1);
            }

            mesh.material = mat;
          }
        });

        // Compute exact bounding box and center
        const box = new THREE.Box3().setFromObject(rawModel);
        const center = box.getCenter(new THREE.Vector3());
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        const size = box.getSize(new THREE.Vector3());

        rawModel.position.x = -center.x;
        rawModel.position.y = -center.y;
        rawModel.position.z = -center.z;
        truckPivot.add(rawModel);

        // Ground Contact Shadow: Soft radial shadow disc directly underneath tires
        const shadowCanvas = document.createElement("canvas");
        shadowCanvas.width = 256;
        shadowCanvas.height = 256;
        const ctx = shadowCanvas.getContext("2d");
        if (ctx) {
          const gradient = ctx.createRadialGradient(128, 128, 15, 128, 128, 120);
          gradient.addColorStop(0, isLight ? "rgba(0, 0, 0, 0.35)" : "rgba(0, 0, 0, 0.7)");
          gradient.addColorStop(0.5, isLight ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.35)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 256, 256);

          const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
          const shadowGeo = new THREE.PlaneGeometry(size.x * 1.5, size.z * 1.3);
          const shadowMat = new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            depthWrite: false,
          });
          const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
          shadowMesh.rotation.x = -Math.PI / 2;
          shadowMesh.position.y = -size.y / 2 + 0.03;
          truckPivot.add(shadowMesh);
        }

        const radius = sphere.radius;
        const fovRad = (camera.fov * Math.PI) / 180;
        const aspect = width / height;

        const vDistance = radius / Math.sin(fovRad / 2);
        const hFovRad = 2 * Math.atan(Math.tan(fovRad / 2) * aspect);
        const hDistance = radius / Math.sin(hFovRad / 2);

        // Optimal framing: slightly elevated 3/4 view
        const effectiveScale = framingScale || 0.76;
        const optimalDistance = Math.max(vDistance, hDistance) * effectiveScale;

        camera.position.set(
          optimalDistance * 0.76,
          optimalDistance * 0.32,
          optimalDistance * 0.76
        );
        camera.near = 0.1;
        camera.far = optimalDistance * 15;
        camera.updateProjectionMatrix();

        controls.target.set(0, 0, 0);
        controls.maxDistance = optimalDistance * 2.5;
        controls.minDistance = optimalDistance * 0.4;
        controls.update();

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error("Error loading 3D catering truck model:", error);
        setLoading(false);
      }
    );

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 700;
      height = container.clientHeight || 500;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Animation Loop with continuous smooth rotation
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, autoRotateSpeed, isLight]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none bg-transparent ${className}`}>
      {/* 3D WebGL Canvas: 100% transparent, floating freely on the page background */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent" />

      {/* Subtle Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-20 pointer-events-none">
          <div className="w-10 h-10 border-4 border-cyan/20 border-t-cyan rounded-full animate-spin mb-2" />
          <span className="font-mono text-[11px] font-bold text-cyan tracking-widest uppercase">
            LOADING 3D TRUCK ({loadProgress}%)
          </span>
        </div>
      )}

      {/* Subtle floating 360 badge */}
      <div className="absolute bottom-2 right-4 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-cyan/20 text-cyan text-[10px] font-mono font-bold flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
        <span>360° ROTATING MODEL • DRAG TO ROTATE</span>
      </div>
    </div>
  );
}
