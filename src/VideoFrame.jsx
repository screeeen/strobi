import React, { forwardRef, useState } from 'react';

export const VideoFrame = forwardRef((props, ref) => {
  const { setVideoDimensions, videoDimensions } = props;
  const [videoFile, setVideoFile] = useState(null);
  const [videoSize, setVideoSize] = useState('');
  //   const [videoDimensions, setVideoDimensions] = useState('');

  const formatSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) {
      return sizeInBytes + ' B';
    } else if (sizeInBytes < 1024 * 1024) {
      return (sizeInBytes / 1024).toFixed(2) + ' KB';
    } else {
      return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);

    if (file) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        const dimensions = `${video.videoWidth}x${video.videoHeight}`;
        setVideoDimensions({ w: video.videoWidth, h: video.videoHeight });

        setVideoSize(formatSize(file.size));
      };
    } else {
      setVideoDimensions('');
      setVideoSize('');
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      {videoFile && (
        <div>
          <video ref={ref} controls src={URL.createObjectURL(videoFile)} />
          {/* <p>Video Dimensions: {videoDimensions}</p> */}
          <p>Video Size: {videoSize}</p>
        </div>
      )}
    </div>
  );
});
