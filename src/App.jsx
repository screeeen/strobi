import { useEffect, useState, useRef } from 'react';
import { FRAMEINTERVAL, red, green, blue, alpha, threshold } from './Constants';
import { getImageData } from './utils';
import './App.css';

function App() {
  const [videoDimensions, setVideoDimensions] = useState({ w: 320, h: 240 });

  const refVideo = useRef();
  const refTimerId = useRef();

  const refCanvasStatic = useRef();
  const refStatic = useRef();
  const refImageDataStatic = useRef();

  const refCanvasRunner = useRef();
  const refRunner = useRef();
  const refImageDataRunner = useRef();

  const refCanvasMix = useRef();
  const refMix = useRef();
  const refImageDataMix = useRef();

  const refCanvasFinal = useRef();
  const refFinal = useRef();
  const refImageDataFinal = useRef();

  const refImage = useRef();
  const finalImage = [];
  let sourceImg;

  useEffect(() => {
    const canvas = refCanvasStatic.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, videoDimensions.w, videoDimensions.h);
    refStatic.current = ctx;

    const canvasRunner = refCanvasRunner.current;
    const ctxRunner = canvasRunner.getContext('2d');
    ctxRunner.fillStyle = 'pink';
    ctxRunner.fillRect(0, 0, videoDimensions.w, videoDimensions.h);
    refRunner.current = ctxRunner;

    const canvasMix = refCanvasMix.current;
    const ctxMix = canvasMix.getContext('2d');
    ctxMix.fillStyle = 'red';
    ctxMix.fillRect(0, 0, videoDimensions.w, videoDimensions.h);
    refMix.current = ctxMix;

    const canvasFinal = refCanvasFinal.current;
    const ctxFinal = canvasFinal.getContext('2d');
    ctxFinal.fillStyle = 'cyan';
    ctxFinal.fillRect(0, 0, videoDimensions.w, videoDimensions.h);
    refFinal.current = ctxFinal;
  }, []);

  const compare = () => {
    // runner
    refRunner.current.drawImage(
      refVideo.current,
      0,
      0,
      videoDimensions.w,
      videoDimensions.h,
    );
    refImageDataRunner.current = getImageData(refRunner);
    refRunner.current.putImageData(refImageDataRunner.current, 0, 0);

    // mix
    refImageDataRunner.current = getImageData(refRunner);

    // compute
    let l = refImageDataRunner.current.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = refImageDataRunner.current.data[i * 4 + 0];
      let g = refImageDataRunner.current.data[i * 4 + 1];
      let b = refImageDataRunner.current.data[i * 4 + 2];

      let r2 = refImageDataStatic.current.data[i * 4 + 0];
      let g2 = refImageDataStatic.current.data[i * 4 + 1];
      let b2 = refImageDataStatic.current.data[i * 4 + 2];

      if (
        r < r2 + threshold &&
        r > r2 - threshold &&
        g < g2 + threshold &&
        g > g2 - threshold &&
        b < b2 + threshold &&
        b > b2 - threshold
      ) {
        refImageDataRunner.current.data[i * 4 + 0] = red;
        refImageDataRunner.current.data[i * 4 + 1] = green;
        refImageDataRunner.current.data[i * 4 + 2] = blue;
        refImageDataRunner.current.data[i * 4 + 3] = alpha;
      }
    }
    refFinal.current.putImageData(refImageDataRunner.current, 0, 0);
  };

  const pushToFinalOperation = () => {
    let pic = new Image();
    pic = refCanvasMix.current.toDataURL();
    finalImage.push(pic);
  };

  const mixFinal = () => {
    let imageDataFirst = getImageData(refStatic);
    let imageDataMix = getImageData(refFinal);

    let count = 0;
    for (let x = 0; x < finalImage.length; x += 4) {
      sourceImg = new Image();
      sourceImg.src = finalImage[x];
      refRunner.current.drawImage(sourceImg, 0, 0);

      const imageDataSecond = getImageData(refRunner);
      const pixelsSecond = imageDataSecond.data;

      for (let i = count; i < pixelsSecond.length; i += 1) {
        let rMix = imageDataFirst.data[i * 4 + 0];
        let gMix = imageDataFirst.data[i * 4 + 1];
        let bMix = imageDataFirst.data[i * 4 + 2];

        let r2 = pixelsSecond[i * 4 + 0];
        let g2 = pixelsSecond[i * 4 + 1];
        let b2 = pixelsSecond[i * 4 + 2];

        if (
          r2 < rMix + threshold &&
          r2 > rMix - threshold &&
          g2 < gMix + threshold &&
          g2 > gMix - threshold &&
          b2 < bMix + threshold &&
          b2 > bMix - threshold
        ) {
          imageDataMix.data[i * 4 + 0] = r2;
          imageDataMix.data[i * 4 + 1] = 0;
          imageDataMix.data[i * 4 + 2] = 0;
          imageDataMix.data[i * 4 + 3] = 255;
        }
        count++;
      }
    }
    refFinal.current.putImageData(imageDataMix, 0, 0);
  };

  const mixFinalDiff = () => {
    console.log('mixFinalDiff');

    const imageDataMix = getImageData(refFinal);

    for (let x = 0; x < finalImage.length; x += 1) {
      const img = new Image();
      img.src = finalImage[x];
      refRunner.current.drawImage(img, 0, 0);

      const imageDataSecond = getImageData(refRunner);
      const pixelsSecond = imageDataSecond.data;

      for (let i = 1; i < pixelsSecond.length; i += 1) {
        let r = pixelsSecond[i];
        let rp = pixelsSecond[0];
        if (r === rp) {
          continue;
        } else {
          imageDataMix.data[i] = r;
        }
      }
    }

    refFinal.current.putImageData(imageDataMix, 0, 0);
  };

  // looping and computing
  const timerCallback = () => {
    if (refVideo.current.paused || refVideo.current.ended) {
      return;
    }
    refTimerId.current = setTimeout(timerCallback, FRAMEINTERVAL);
    console.log(refVideo.current.currentTime);
    compare();
    pushToFinalOperation();
  };

  const setBackground = () => {
    //pinta primer frame
    refStatic.current.drawImage(refVideo.current, 0, 0);
    //saca image data static
    refImageDataStatic.current = getImageData(refStatic);
  };

  const handlePause = () => {
    clearTimeout(refTimerId.current);
    mixFinal();
    // mixFinalDiff();
  };

  useEffect(() => {
    if (!refVideo.current) return;
    const videoPlayer = refVideo.current;

    // videoPlayer.addEventListener('loadedmetadata', setDimensions);
    videoPlayer.addEventListener('play', setBackground);
    videoPlayer.addEventListener('play', timerCallback);
    videoPlayer.addEventListener('pause', handlePause);
    videoPlayer.addEventListener('ended', handlePause);

    return () => clearTimeout(refTimerId.current);
  }, [refTimerId.current, refVideo.current]);

  return (
    <>
      <header>
        <p>VIDEO SEQUENCER</p>
        <p>A digital tool for those who like sequences</p>
      </header>
      <video ref={refVideo} src="skate.mov" controls width={320} height={240} />
      {/* static */}
      <canvas
        hidden
        ref={refCanvasStatic}
        width={videoDimensions.w}
        height={videoDimensions.h}
      />
      {/* runner */}
      <canvas
        hidden
        ref={refCanvasRunner}
        width={videoDimensions.w}
        height={videoDimensions.h}
      />
      {/* mix */}
      <canvas
        hidden
        ref={refCanvasMix}
        width={videoDimensions.w}
        height={videoDimensions.h}
      />
      {/* final */}
      <canvas
        ref={refCanvasFinal}
        width={videoDimensions.w}
        height={videoDimensions.h}
      />

      {/* <img
        src={sourceImg}
        ref={refImage}
        width={videoDimensions.w}
        height={videoDimensions.h}
      /> */}

      {/* <button>save picture</button> */}
    </>
  );
}

export default App;
