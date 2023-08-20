const videoDimensions = { w: 420, h: 270 };

export const getImageData = (ctx) =>
  ctx.current.getImageData(0, 0, videoDimensions.w, videoDimensions.h);
