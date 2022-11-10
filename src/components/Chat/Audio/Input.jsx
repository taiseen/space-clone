import React, { Fragment, useState } from "react";
import Button from "../../Button";
import { BsMic, BsMicFill } from "react-icons/bs";

let recorder;
let gumStream;

const AudioRender = ({ setAudioURL }) => {
  const [recorderState, setRecorderState] = useState(false);

  function toggleRecording() {
    if (recorder && recorder.state === "recording") {
      setRecorderState(false);
      recorder.stop();
      gumStream.getAudioTracks()[0].stop();
    } else {
      setRecorderState(true);
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(function (stream) {
          gumStream = stream;
          recorder = new MediaRecorder(stream);
          recorder.ondataavailable = function (e) {
            let url = URL.createObjectURL(e.data);
            setAudioURL(url);
          };
          recorder.start();
        });
    }
  }
  return (
    <Fragment>
      {/* <Button
        id="recordButton"
        onClick={() => {
          toggleRecording();
        }}
      >
        Record
      </Button> */}
      {recorderState ? (
        <BsMicFill
          size={20}
          className="text-red-500 animate-pulse"
          onClick={() => toggleRecording()}
        />
      ) : (
        <BsMic
          size={20}
          className="duration-300 hover:text-teal-400"
          onClick={() => toggleRecording()}
        />
      )}
      {/* <div id="preview" /> */}
    </Fragment>
  );
};

export default AudioRender;
