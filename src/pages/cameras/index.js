import { createVideoNodes, startVideo, initCanvas } from "./init";

const urls = [
  "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8",
  "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8",
  "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8",
  "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8"
];

function initVideos() {
  createVideoNodes(urls);

  urls.forEach((url, i) => {
    const selector = document.querySelector(`#video-${i}`);
    startVideo(selector, url);
    initCanvas(selector, i);
  });
}

initVideos();
