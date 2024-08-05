"use client";
import React, { useState, useEffect } from "react";

const FollowShadow: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setPosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-all duration-300 ease-out"
      style={{
        background: `radial-gradient(circle 200px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.25), rgba(29, 78, 216, 0.05) 50%, transparent 70%)`,
      }}
    />
  );
};

export default FollowShadow;
