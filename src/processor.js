
  //LOOP AND computeFrame
//   const timerCallback=()=> {
//     if (this.videoPlayer.paused || this.videoPlayer.ended) {
//       return;
//     }
//     this.computeFrame();
//     let self = this;
//     const setTimeout(function =()=> {
//       self.timerCallback();
//     }, this.frameInterval);
//   }

//   const changeVideo=()=> {
//     var player = document.getElementById("videoPlayer");
//     var currentVID = document.getElementById("currentVideo");
//     var selectedLocalVID = document.getElementById("newlocalFILE").files[0];
//     currentVID.setAttribute("src", URL.createObjectURL(selectedLocalVID));
//     player.load();
//   }

//   const changePictureInterval=(value)=> {
//     this.frameInterval = value;
//     //console.log(this.frameInterval);
//     // document.getElementById("interval")
//   }

 
  //--- ENTRY POINT
  export const doLoad = () => {
    

 
  }

//   const async computeFrame=()=> {
//     //first frame and background
//     if (this.videoPlayer.currentTime < 0.01) {
//       //console.log(this.videoPlayer.currentTime, "get first");
//       await this.setFirstFrame();
//       await this.getStaticFrame();
//       return;
//     }

//     await this.getMixFrame();
//     await this.displaySingleFrame();
//     await this.compare();
//     await this.paintMix();
//     await this.pushImageToArray();
//   },

//   const setFirstFrame=()=> {
//     return new Promise((res, rej) => {
//       res(
//         this.ctx1.drawImage(
//           this.videoPlayer,
//           0,
//           0,
//           this.c1.width,
//           this.c1.height
//         )
//         //console.log("%c FIRST FRAME", "color: white; background-color: red")
//       );
//       rej("error setFirstFrame");
//     });
//   },

//   const getStaticFrame=()=> {
//     this.ctx1.crossOrigin = "Anonymous";
//     this.ctx2.crossOrigin = "Anonymous";
//     return new Promise((res, rej) => {
//       res(
//         (this.frameStatic = this.ctx1.getImageData(
//           0,
//           0,
//           this.c1.width,
//           this.c1.height
//         ))
//         //console.log("%c STATIC FRAME", "color: white; background-color: red")
//       );
//       rej("error getStaticFrame");
//     });
//   },

//   const getMixFrame=()=> {
//     return new Promise((res, rej) => {
//       res(
//         (this.frameMix = this.ctx2.getImageData(
//           0,
//           0,
//           this.mix.width,
//           this.mix.height
//         ))
//         //console.log("getMixedFrame")
//       );
//       rej("error getMixedFrame");
//     });
//   },

//   const displaySingleFrame=()=> {
//     return new Promise((res, rej) => {
//       var context2 = this.ctx2;
//       var mixContext = this.mix;
//       var canvas2 = this.c2;
//       res(
//         sortItOutNow(context2, mixContext, canvas2)
//         //console.log("displaySingleFrame")
//       );
//       const function sortItOutNow=()=> {
//         context2.drawImage(
//           this.videoPlayer,
//           0,
//           0,
//           mixContext.width,
//           mixContext.height
//         );
//       }
//       rej("error displaySingleFrame");
//     });
//   },

//   const compare=()=> {
//     return new Promise((res, rej) => {
//       var frameMixOp = this.frameMix;

//       var frameStaticOp = this.frameStatic;
//       var thresholdOp = this.threshold;
//       var redOp = this.red;
//       var blueOp = this.blue;
//       var greenOp = this.green;
//       var alphaOp = this.alpha;

//       const function compareOperation=()=> {
//         let l = frameMixOp.data.length / 4;

//         for (let i = 0; i < l; i++) {
//           let r = frameMixOp.data[i * 4 + 0];
//           let g = frameMixOp.data[i * 4 + 1];
//           let b = frameMixOp.data[i * 4 + 2];

//           let r2 = frameStaticOp.data[i * 4 + 0];
//           let g2 = frameStaticOp.data[i * 4 + 1];
//           let b2 = frameStaticOp.data[i * 4 + 2];

//           if (
//             r < r2 + thresholdOp &&
//             r > r2 - thresholdOp &&
//             g < g2 + thresholdOp &&
//             g > g2 - thresholdOp &&
//             b < b2 + thresholdOp &&
//             b > b2 - thresholdOp
//           ) {
//             frameMixOp.data[i * 4 + 0] = redOp;
//             frameMixOp.data[i * 4 + 1] = greenOp;
//             frameMixOp.data[i * 4 + 2] = blueOp;
//             frameMixOp.data[i * 4 + 3] = alphaOp;
//           }
//         }
//       }

//       compareOperation(
//         frameMixOp,
//         frameStaticOp,
//         thresholdOp,
//         redOp,
//         blueOp,
//         greenOp,
//         alphaOp
//       ),
//         //console.log("compare");

//         res();

//       rej("error compare");
//     });
//   },

//   const paintMix=()=> {
//     return new Promise((res, rej) => {
//       res(
//         this.ctxMix.putImageData(this.frameMix, 0, 0)
//         //console.log("paint mix")
//       );
//       rej("error compare");
//     });
//   },

//   const pushImageToArray=()=> {
//     return new Promise((res, rej) => {
//       var mixOp = this.mix;
//       var finalImageOp = this.finalImage;
//       res(
//         pushToFinalOperation(mixOp, finalImageOp)
//         //console.log("pushToFinal")
//       );
//       const function pushToFinalOperation=()=> {
//         let pic = new Image();
//         pic = mixOp.toDataURL();
//         finalImageOp.push(pic);
//       }
//       rej("error pushToFinal");
//     });
//   },
//   //FINAL OPS
//   const async finalOps=()=> {
//     // await this.logfinal();
//     await this.mixfinal();
//     await this.mixFinalDif();
//   },

//   // VISUAL LOG
//   const logfinal=()=> {
//     return new Promise((res, rej) => {
//       var finalImageOp = this.finalImage;
//       res(logFinalOperation(), console.log("logFinalOperation"));
//       const function logFinalOperation=()=> {
//         for (let i = 1; i < finalImageOp.length; i += 2) {
//           img = new Image();
//           img.src = finalImageOp[i].toString();
//           document.getElementById("canvasGroup").appendChild(img);
//         }
//       }
//       rej("error logFinalOperation");
//     });
//   },

//   const mixFinalDif=()=> {
//     return new Promise((res, rej) => {
//       //console.log("lenght of images array", this.finalImage.length);
//       var finalImageOp = this.finalImage;

//       var secondCanvas = this.c2;
//       var secondCanvasCtx = secondCanvas.getContext("2d");
//       var thirdCanvas = this.mix;
//       var thirdCanvasCtx = thirdCanvas.getContext("2d");

//       var imageDataMix = thirdCanvasCtx.getImageData(
//         0,
//         0,
//         thirdCanvas.width,
//         thirdCanvas.height
//       );

//       res(mixfinalOperationD(), console.log("mixFinalDiff"));

//       const function mixfinalOperationD=()=> {
//         var cv = document.createElement("canvas");
//         cv.id = "final_mix";
//         var cvx = cv.getContext("2d");

//         for (let x = 0; x < finalImageOp.length; x += 1) {
//           var img = new Image();
//           img.src = finalImageOp[x];
//           secondCanvasCtx.drawImage(img, 0, 0);

//           var imageDataSecond = secondCanvasCtx.getImageData(
//             0,
//             0,
//             secondCanvas.width,
//             secondCanvas.height
//           );
//           var pixelsSecond = imageDataSecond.data;
//           // var imgxx = new Image();
//           // imgxx.src = finalImageOp[x];
//           // cvx.drawImage(imgxx, 0, 0);
//           // document.getElementById("canvasGroup").appendChild(cv);

//           for (let i = 1; i < pixelsSecond.length; i += 1) {
//             let r = pixelsSecond[i];
//             let rp = pixelsSecond[0];
//             if (r === rp) {
//               continue;
//             } else {
//               imageDataMix.data[i] = r;
//             }
//           }
//         }
//         //console.log(imageDataMix.data);
//         thirdCanvasCtx.putImageData(imageDataMix, 0, 0);
//       }
//       rej("error mixFinalOperation");
//     });
//   },

//   const mixfinal=()=> {
//     return new Promise((res, rej) => {
//       //console.log("lenght of images array", this.finalImage.length);

//       var finalImageOp = this.finalImage;
//       var firstCanvas = this.c1;
//       var secondCanvas = this.c2;
//       var thirdCanvas = this.mix;
//       var thresholdOp = this.threshold; //this.threshold;

//       res(mixfinalOperation(), console.log("mixFinal"));

//       const function mixfinalOperation=()=> {
//         var firstCanvasCtx = firstCanvas.getContext("2d");
//         var secondCanvasCtx = secondCanvas.getContext("2d");
//         var thirdCanvasCtx = thirdCanvas.getContext("2d");

//         //grab fixed image mix canvas
//         var imageDataFirst = firstCanvasCtx.getImageData(
//           0,
//           0,
//           firstCanvas.width,
//           firstCanvas.height
//         );
//         var imageDataMix = thirdCanvasCtx.getImageData(
//           0,
//           0,
//           thirdCanvas.width,
//           thirdCanvas.height
//         );

//         var count = 0;
//         for (let x = 0; x < finalImageOp.length; x += 4) {
//           // console.log(x, "-------------------------------------------------")

//           //grab dinamic image
//           var img = new Image();
//           img.src = finalImageOp[x];
//           secondCanvasCtx.drawImage(img, 0, 0);
//           var imageDataSecond = secondCanvasCtx.getImageData(
//             0,
//             0,
//             secondCanvas.width,
//             secondCanvas.height
//           );
//           var pixelsSecond = imageDataSecond.data;

//           for (let i = count; i < pixelsSecond.length; i += 1) {
//             let rMix = imageDataFirst.data[i * 4 + 0];
//             let gMix = imageDataFirst.data[i * 4 + 1];
//             let bMix = imageDataFirst.data[i * 4 + 2];

//             let r2 = pixelsSecond[i * 4 + 0];
//             let g2 = pixelsSecond[i * 4 + 1];
//             let b2 = pixelsSecond[i * 4 + 2];

//             if (
//               r2 < rMix + thresholdOp &&
//               r2 > rMix - thresholdOp &&
//               g2 < gMix + thresholdOp &&
//               g2 > gMix - thresholdOp &&
//               b2 < bMix + thresholdOp &&
//               b2 > bMix - thresholdOp
//             ) {
//               // console.log("dif",rMix,r2);

//               imageDataMix.data[i * 4 + 0] = r2;
//               imageDataMix.data[i * 4 + 1] = 0;
//               imageDataMix.data[i * 4 + 2] = 0;
//               imageDataMix.data[i * 4 + 3] = 255;
//               // console.log("count f", count);
//             }
//             count++;
//           }
//           thirdCanvasCtx.putImageData(imageDataMix, 0, 0);
//         }
//       }
//       rej("error mixFinalOperation");
//     });
//   },

//   const savePicture=()=> {
//     const dataURL = this.mix.toDataURL("image/png");
//     var element = document.createElement("a");
//     element.setAttribute("href", dataURL);
//     element.setAttribute("download", "picture_thing.png");
//     element.style.display = "none";
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   },

// // *************** LISTENTERS ******************



// //   processor.doLoad();
// // });

// document.getElementById("videoPlayer").addEventListener("ended", () => {
//   //console.log("video ended ----------- ");
//   processor.finalOps();
// });

// document.querySelector("button").addEventListener("click", () => {
//   //console.log("save picture");
//   processor.savePicture();
// });

// document.getElementById("pic-interval").addEventListener("change", () => {
//   processor.changePictureInterval(
//     document.getElementById("pic-interval").value
//   );
//   processor.videoPlayer.play();
//   console.log(document.getElementById("pic-interval").value);
//   processor.timerCallback();
//   console.log(processor);
// });
