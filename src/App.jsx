import { useEffect, useState, useRef } from 'react';
// import './App.css';
import { doLoad } from './processor';
import { CanvasFrame } from './CanvasFrame';
import { VideoFrame } from './VideoFrame';
import { FRAMEINTERVAL } from './Constants';

function App() {
  const [videoDimensions, setVideoDimensions] = useState('');
  const [videoSize, setVideoSize] = useState('');

  const refVideo = useRef();
  const refTimerId = useRef();

  const handlePause = () => {
    if (refTimerId.current) {
      clearTimeout(refTimerId.current);
    }
  };

  const handleEnded = () => {
    if (refTimerId.current) {
      clearTimeout(refTimerId.current);
    }
  };

  const timerCallback = () => {
    computeFrame();
    refTimerId.current = setTimeout(timerCallback, FRAMEINTERVAL);
  };

  const computeFrame = async () => {
    console.log(refVideo.current?.currentTime);

    //first frame and background
    if (refVideo.current.currentTime < 0.01) {
      //console.log(videoPlayer.currentTime, "get first");
      // await setFirstFrame();
      // await getStaticFrame();
      return;
    }

    // await getMixFrame();
    // await displaySingleFrame();
    // await compare();
    // await paintMix();
    // await pushImageToArray();
  };

  useEffect(() => {
    if (!refVideo.current) return;
    const videoPlayer = refVideo.current;

    videoPlayer.addEventListener('play', timerCallback);
    videoPlayer.addEventListener('pause', handlePause);
    videoPlayer.addEventListener('ended', handleEnded);

    return () => {
      if (refTimerId.current) {
        clearTimeout(refTimerId.current);
      }
    };
  }, [refTimerId.current, refVideo.current]);

  return (
    <>
      <div id="app">
        <header>
          <h1>VIDEO SEQUENCER</h1>
          <p>A digital tool for those who like sequences</p>
        </header>

        <p>VIDEO</p>
        <VideoFrame
          ref={refVideo}
          setVideoDimensions={setVideoDimensions}
          setVideoSize={setVideoSize}
          videoSize={videoSize}
        />
        <CanvasFrame w={videoDimensions.w} h={videoDimensions.h} />
        <button>save picture</button>
      </div>

      <script type="text/javascript" src="processor.js"></script>
    </>
  );
}

export default App;
