var ctx = new AudioContext();

export function audioAnalizeInit(video, i) {
  const korrectValue = 0.5;

  var source = ctx.createMediaElementSource(video);
  var analyser = ctx.createAnalyser();
  var processor = ctx.createScriptProcessor(2048, 1, 1);

  source.connect(analyser);
  source.connect(processor);
  analyser.connect(ctx.destination);
  processor.connect(ctx.destination);

  analyser.fftSize = 32;

  var data = new Uint8Array(analyser.frequencyBinCount);
  processor.onaudioprocess = function() {
    analyser.getByteFrequencyData(data);
    let maxVal = Math.max.apply(Math, data);
    maxVal *= korrectValue;
    video.parentNode.querySelector(".volumeIndicator").style.height =
      maxVal + "px";
  };
}
