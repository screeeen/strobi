export const computeFrame = async ({ video, mix, setMix }) => {
  console.log(video.currentTime);

  //first frame and background
  if (video.currentTime < 0.01) {
    //console.log(videoPlayer.currentTime, "get first");
    // await setFirstFrame(video, mix, setMix);
    // await getStaticFrame();
    return;
  }

  // await getMixFrame();
  // await displaySingleFrame();
  // await compare();
  // await paintMix();
  // await pushImageToArray();
};

export const setFirstFrame = async (video, mix, setMix) => {
  console.log(mix, 'hey');
  return new Promise((res, rej) => {
    res(
      mix.drawImage(video, 0, 0, video.width, video.height),
      (mix.fillStyle = getRandomColor()),
      mix.fillRect(0, 0, video.width, video.height),
      setMix(mix),
      console.log('%c FIRST FRAME', 'color: white; background-color: red'),
    );
    rej('error setFirstFrame');
  });
};

const getStaticFrame = async () => {
  ctx1.crossOrigin = 'Anonymous';
  ctx2.crossOrigin = 'Anonymous';
  return new Promise((res, rej) => {
    res(
      (frameStatic = ctx1.getImageData(0, 0, c1.width, c1.height)),
      //console.log("%c STATIC FRAME", "color: white; background-color: red")
    );
    rej('error getStaticFrame');
  });
};

//   getMixFrame() {
//     return new Promise((res, rej) => {
//       res(
//         (frameMix = ctx2.getImageData(
//           0,
//           0,
//           mix.width,
//           mix.height
//         ))
//         //console.log("getMixedFrame")
//       );
//       rej("error getMixedFrame");
//     });
//   },
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
