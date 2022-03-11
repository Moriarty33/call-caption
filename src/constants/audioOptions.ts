export const audioOptions = {
  sampleRate: 32000, // default is 44100 but 32000 is adequate for accurate voice recognition
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 1, // android only (see below)
  bufferSize: 32768, // default is 2048
  wavFile: "rec.wav",
};
