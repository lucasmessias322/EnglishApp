import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaFighterJet, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import * as C from "./style";

function Player({
  thema,
  currentTexto,
  DataTexto,
  IsPlayng,
  setIsPlayng = false,
  setCurrentParagraph,
  AudioIndex,
  setAudioIndex,
}) {
  const DataTextoAudio = DataTexto[currentTexto].textos;
  const [Slow, setSlow] = useState(false);
  const [Fast, setFast] = useState(false);
  // const [AudioIndex, setAudioIndex] = useState(0);

  const Audio = useRef(null);
  const FastButton = useRef(null);
  const SlowButton = useRef(null);

  useEffect(() => {
    if (DataTextoAudio) {
      if (AudioIndex === DataTextoAudio.length) {
        setAudioIndex(0);
        // setCurrentParagraph(0);
        setIsPlayng(false);
        console.log(`Index: ${AudioIndex}`);
      } else {
        if (IsPlayng) {
          Audio.current.play();
        } else {
          Audio.current.pause();
        }
        // setIsPlayng(true);

        // setCurrentParagraph(AudioIndex);
      }
    }
  }, [AudioIndex]);

  useEffect(() => {
    let audio = Audio.current;
    let PlayPauseButton = document.getElementById("PlayPauseButton");
    if (IsPlayng) {
      audio.play();
      PlayPauseButton.style.backgroundColor = thema ? "#FF006B" : "#55a4ff";
    } else {
      audio.pause();
      PlayPauseButton.style.backgroundColor = thema ? "#C20052" : "#005AC5";
    }
  }, [IsPlayng, thema]);

  function VelocidadeLnta() {
    if (Slow) {
      Audio.current.playbackRate = 0.7;
      SlowButton.current.style.backgroundColor = thema ? "#FF006B" : "#55a4ff";
    } else if (Slow === false) {
      Audio.current.playbackRate = 1;
      SlowButton.current.style.backgroundColor = thema ? "#C20052" : "#005AC5";
    }
  }

  function VelocidadeRpida() {
    if (Fast) {
      Audio.current.playbackRate = 2;
      FastButton.current.style.backgroundColor = thema ? "#FF006B" : "#55a4ff";
    } else if (Fast === false) {
      Audio.current.playbackRate = 1;
      FastButton.current.style.backgroundColor = thema ? "#C20052" : "#005AC5";
    }
  }

  useEffect(() => {
    VelocidadeLnta();
    VelocidadeRpida();
  });

  useEffect(() => {
    VelocidadeLnta();
  }, [Slow, thema]);

  useEffect(() => {
    VelocidadeRpida();
  }, [Fast, thema]);

  return (
    <C.PlayerComponent thema={thema}>
      <audio
        crossOrigin="anonymous"
        ref={Audio}
        onEnded={() =>
          setAudioIndex((AudioIndex) => {
            if (AudioIndex >= DataTextoAudio.length - 1) {
              setIsPlayng(false);
              return 0;
            } else {
              return AudioIndex + 1;
            }
          })
        }
        src={DataTextoAudio ? DataTextoAudio[AudioIndex].AudioPathData : ""}
      />

      <li></li>
      <li id="SlowButton" ref={SlowButton} onClick={() => setSlow(!Slow)}>
        <img
          src="/assets/logo-area-turtle-silhouette-tortoise 1 1.png"
          alt="slowButton"
        />
      </li>
      <li id="PlayPauseButton" onClick={() => setIsPlayng(!IsPlayng)}>
        {IsPlayng ? <FaPause /> : <FaPlay />}
      </li>
      <li id="FastButton" ref={FastButton} onClick={() => setFast(!Fast)}>
        <FaFighterJet />
      </li>
      <li id="homeBtn">
        <Link to="/">
          <FaHome />
        </Link>
      </li>
    </C.PlayerComponent>
  );
}

export default Player;
