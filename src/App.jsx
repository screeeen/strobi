import { useEffect, useState, useRef } from 'react';
import './App.css';
import { CanvasFrame } from './CanvasFrame';
import { VideoFrame } from './VideoFrame';
import { FRAMEINTERVAL, red, green, blue, alpha, threshold } from './Constants';
import { computeFrame } from './utils';

function App() {
  const [videoDimensions, setVideoDimensions] = useState({ w: 420, h: 270 });

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
  }, []);

  const compare = () => {
    let thresholdOp = threshold;
    let redOp = red;
    let blueOp = green;
    let greenOp = blue;
    let alphaOp = alpha;

    // runner
    refRunner.current.drawImage(
      refVideo.current,
      0,
      0,
      videoDimensions.w,
      videoDimensions.h,
    );
    refImageDataRunner.current = refRunner.current.getImageData(
      0,
      0,
      videoDimensions.w,
      videoDimensions.h,
    );

    refRunner.current.putImageData(refImageDataRunner.current, 0, 0);

    // mix
    refImageDataMix.current = refRunner.current.getImageData(
      0,
      0,
      videoDimensions.w,
      videoDimensions.h,
    );

    // compute
    let l = refImageDataMix.current.data.length / 4;
    console.log(l);

    for (let i = 0; i < l; i++) {
      let r = refImageDataMix.current.data[i * 4 + 0];
      let g = refImageDataMix.current.data[i * 4 + 1];
      let b = refImageDataMix.current.data[i * 4 + 2];

      let r2 = refImageDataStatic.current.data[i * 4 + 0];
      let g2 = refImageDataStatic.current.data[i * 4 + 1];
      let b2 = refImageDataStatic.current.data[i * 4 + 2];

      if (
        r < r2 + thresholdOp &&
        r > r2 - thresholdOp &&
        g < g2 + thresholdOp &&
        g > g2 - thresholdOp &&
        b < b2 + thresholdOp &&
        b > b2 - thresholdOp
      ) {
        refImageDataMix.current.data[i * 4 + 0] = redOp;
        refImageDataMix.current.data[i * 4 + 1] = greenOp;
        refImageDataMix.current.data[i * 4 + 2] = blueOp;
        refImageDataMix.current.data[i * 4 + 3] = alphaOp;
      }
    }
    refMix.current.putImageData(refImageDataMix.current, 0, 0);
  };

  // looping and computing
  const timerCallback = () => {
    if (refVideo.current.paused || refVideo.current.ended) {
      return;
    }
    refTimerId.current = setTimeout(timerCallback, FRAMEINTERVAL);
    console.log(refVideo.current.currentTime);
    compare();
  };

  const setBackground = () => {
    //pinta primer frame
    refStatic.current.drawImage(
      refVideo.current,
      0,
      0,
      videoDimensions.w,
      videoDimensions.h,
    );
    //saca image data static
    refImageDataStatic.current = refStatic.current.getImageData(
      0,
      0,
      videoDimensions.w,
      videoDimensions.h,
    );
  };

  const setDimensions = () => {
    setVideoDimensions({
      w: refVideo.current.videoWidth,
      h: refVideo.current.videoHeight,
    });
  };

  const handlePause = () => {
    clearTimeout(refTimerId.current);
  };

  useEffect(() => {
    if (!refVideo.current) return;
    const videoPlayer = refVideo.current;

    // videoPlayer.addEventListener('loadedmetadata', setDimensions);
    videoPlayer.addEventListener('play', setBackground);
    videoPlayer.addEventListener('play', timerCallback);
    videoPlayer.addEventListener('pause', handlePause);
    videoPlayer.addEventListener('ended', clearTimeout(refTimerId.current));

    return () => clearTimeout(refTimerId.current);
  }, [refTimerId.current, refVideo.current]);

  return (
    <>
      <header>
        <p>VIDEO SEQUENCER</p>
        <p>A digital tool for those who like sequences</p>
      </header>
      <video ref={refVideo} src="skate.mov" controls />
      <canvas
        ref={refCanvasStatic}
        width={videoDimensions.w}
        height={videoDimensions.h}
      />
      <canvas
        ref={refCanvasRunner}
        width={videoDimensions.w}
        height={videoDimensions.h}
      />
      <canvas
        ref={refCanvasMix}
        width={videoDimensions.w}
        height={videoDimensions.h}
      />

      <button>save picture</button>
      <script type="text/javascript" src="processor.js"></script>
    </>
  );
}

export default App;
