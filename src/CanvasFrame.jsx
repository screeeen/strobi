import React, { forwardRef, useRef, useEffect } from 'react';

export const CanvasFrame = forwardRef(
  ({ w = 800, h = 600, mix, setMix }, ref) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      setMix(ctx);
      ctx.fillStyle = 'blue';
      ctx.fillRect(0, 0, w, h);
      // ctx.drawImage(mix, 0, 0);
    }, [w, h, ref]);

    return <canvas ref={canvasRef} width={w} height={h} />;
  },
);
