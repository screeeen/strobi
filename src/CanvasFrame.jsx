import React, { useRef, useEffect } from 'react';

export const CanvasFrame = ({ w = 800, h = 600 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Aquí puedes realizar tus operaciones de dibujo
    ctx.fillStyle = 'blue';

    ctx.fillRect(0, 0, w, h);
  }, [w, h]);

  return <canvas ref={canvasRef} width={w} height={h} />;
};
