"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveTruckCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(5.5, 3.5, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for the entire vehicle assembly
    const vehicleGroup = new THREE.Group();
    scene.add(vehicleGroup);

    // Materials - Dark Cybernetic Wireframe + Illuminated Glass
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x2DE1C2,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0B0F14,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });

    const glowingCyanMat = new THREE.MeshBasicMaterial({
      color: 0x2DE1C2,
    });

    const glowVioletMat = new THREE.MeshBasicMaterial({
      color: 0x7B61FF,
    });

    const alertMat = new THREE.MeshBasicMaterial({
      color: 0xFF5D5D,
    });

    // 1. Truck Cargo Body
    const cargoGeo = new THREE.BoxGeometry(3.6, 2.2, 1.8);
    const cargoMesh = new THREE.Mesh(cargoGeo, darkMetalMat);
    cargoMesh.position.set(-0.6, 1.3, 0);
    vehicleGroup.add(cargoMesh);

    const cargoEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(cargoGeo),
      new THREE.LineBasicMaterial({ color: 0x2DE1C2, transparent: true, opacity: 0.8 })
    );
    cargoEdges.position.copy(cargoMesh.position);
    vehicleGroup.add(cargoEdges);

    // 2. Truck Cab (Front)
    const cabGeo = new THREE.BoxGeometry(1.6, 1.8, 1.7);
    const cabMesh = new THREE.Mesh(cabGeo, darkMetalMat);
    cabMesh.position.set(1.7, 1.1, 0);
    vehicleGroup.add(cabMesh);

    const cabEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(cabGeo),
      new THREE.LineBasicMaterial({ color: 0x2DE1C2, transparent: true, opacity: 0.9 })
    );
    cabEdges.position.copy(cabMesh.position);
    vehicleGroup.add(cabEdges);

    // Windshield
    const glassGeo = new THREE.BoxGeometry(0.8, 0.7, 1.6);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x2DE1C2,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.35,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.set(2.1, 1.4, 0);
    vehicleGroup.add(glassMesh);

    // 3. Chassis / Under-carriage (Data Backbone)
    const chassisGeo = new THREE.BoxGeometry(5.2, 0.25, 1.6);
    const chassisMesh = new THREE.Mesh(chassisGeo, darkMetalMat);
    chassisMesh.position.set(0.6, 0.3, 0);
    vehicleGroup.add(chassisMesh);

    // 4. Glowing CAN-Bus Spine running through vehicle
    const spineCurve = new THREE.LineCurve3(
      new THREE.Vector3(-2.2, 0.45, 0),
      new THREE.Vector3(2.5, 0.45, 0)
    );
    const spineGeo = new THREE.TubeGeometry(spineCurve, 20, 0.04, 8, false);
    const spineMesh = new THREE.Mesh(spineGeo, glowingCyanMat);
    vehicleGroup.add(spineMesh);

    // 5. Wheels with illuminated rims
    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.35, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x05070A, roughness: 0.5 });
    const wheelRimMat = new THREE.MeshBasicMaterial({ color: 0x2DE1C2 });

    const wheelPositions = [
      [-1.6, 0, 0.95],
      [-0.4, 0, 0.95],
      [1.8, 0, 0.95],
      [-1.6, 0, -0.95],
      [-0.4, 0, -0.95],
      [1.8, 0, -0.95],
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, y, z);
      vehicleGroup.add(wheel);

      // Glowing rim edge
      const rim = new THREE.LineSegments(
        new THREE.EdgesGeometry(wheelGeo),
        new THREE.LineBasicMaterial({ color: 0x2DE1C2, transparent: true, opacity: 0.5 })
      );
      rim.rotation.copy(wheel.rotation);
      rim.position.copy(wheel.position);
      vehicleGroup.add(rim);
    });

    // 6. Neural Sensor Nodes (HUD Anchors on the vehicle)
    // Battery Node (Violet)
    const batteryNode = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), glowVioletMat);
    batteryNode.position.set(-0.2, 0.45, 0.7);
    vehicleGroup.add(batteryNode);

    // Engine/Alternator Node (Amber Alert)
    const engineNode = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), alertMat);
    engineNode.position.set(2.0, 0.65, 0);
    vehicleGroup.add(engineNode);

    // OBD Device Connector Node (Cyan)
    const obdNode = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.15), glowingCyanMat);
    obdNode.position.set(1.4, 0.75, 0.6);
    vehicleGroup.add(obdNode);

    // 7. Ground Grid Plane with circular pulse rings
    const groundGrid = new THREE.GridHelper(14, 28, 0x2DE1C2, 0x1E2633);
    groundGrid.position.y = -0.45;
    (groundGrid.material as THREE.Material).transparent = true;
    (groundGrid.material as THREE.Material).opacity = 0.35;
    scene.add(groundGrid);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x2DE1C2, 2.0);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const violetLight = new THREE.PointLight(0x7B61FF, 3.5, 10);
    violetLight.position.set(-2, 2, -2);
    scene.add(violetLight);

    const cyanPoint = new THREE.PointLight(0x2DE1C2, 4, 8);
    cyanPoint.position.set(2, 2, 2);
    scene.add(cyanPoint);

    // Mouse Parallax Interaction
    let targetRotY = -0.35;
    let targetRotX = 0.05;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
      targetRotY = -0.35 + mouseX * 0.45;
      targetRotX = 0.05 - mouseY * 0.2;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth parallax damping + gentle idle float
      vehicleGroup.rotation.y += (targetRotY - vehicleGroup.rotation.y) * 0.05;
      vehicleGroup.rotation.x += (targetRotX - vehicleGroup.rotation.x) * 0.05;
      vehicleGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

      // Pulsing nodes
      const pulseScale = 1 + Math.sin(elapsed * 4) * 0.2;
      engineNode.scale.set(pulseScale, pulseScale, pulseScale);
      batteryNode.scale.set(1.2 - pulseScale * 0.2, 1.2 - pulseScale * 0.2, 1.2 - pulseScale * 0.2);

      camera.lookAt(0.5, 0.8, 0);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}
