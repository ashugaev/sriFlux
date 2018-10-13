export function createVideoNodes(urls) {
  const videoNode = document.querySelector("template");

  urls.forEach((video, i) => {
    var clon = videoNode.content.cloneNode(true);
    clon.querySelector(".camerasVideo").id = `video-${i}`;
    clon.querySelector(".canvasVideo").id = `canvas-${i}`;
    document.querySelector(".videosBox").appendChild(clon);
  });
}

export function startVideo(video, url) {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      video.play();
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8";
    video.addEventListener("loadedmetadata", function() {
      video.play();
    });
  }
}

export function initCanvas(selectorVideo, i) {
  var v = document.getElementById("video-1");
  var canvas = document.getElementById(`canvas-${i}`);
  var context = canvas.getContext("2d");

  var cw = 640;
  var ch = 480;
  canvas.width = cw;
  canvas.height = ch;

  selectorVideo.addEventListener(
    "play",
    function() {
      draw(this, context, cw, ch);
    },
    false
  );

  function draw(selectorVideo, c, w, h) {
    if (selectorVideo.paused || v.ended) return false;
    c.drawImage(selectorVideo, 0, 0, w, h);
    setTimeout(draw, 20, selectorVideo, c, w, h);
  }
}
