import "./index.scss";
import { createVideoNodes, startVideo, initCanvas } from "./init";
import { initPopup } from "./openVideo";
import { audioAnalizeInit } from "./audioAnalize";
import { setControllers } from "./controllers";

// const streamingServer = 'http://19fe4bb6.ngrok.io'
const streamingServer = 'http://localhost:9191'

const urls = [
  `${streamingServer}/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8`,
  `${streamingServer}/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8`,
  `${streamingServer}/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8`,
  `${streamingServer}/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8`
];

// export let activeVideoSelector;

function initVideos() {
  createVideoNodes(urls);

  urls.forEach((url, i) => {
    const selector = document.querySelector(`#video-${i}`);
    startVideo(selector, url);
    audioAnalizeInit(selector, i);
    setControllers(selector);
  });
  initPopup();
}

initVideos();
