import React, { useContext, useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../../Context/AuthContext";
import * as C from "./style";

function Texto({
  thema,
  DataTexto,
  currentTexto,
  currentParagraph,
  AudioIndex,
}) {
  const dataTextoAudio = DataTexto[currentTexto].textos;
  const dataLen = dataTextoAudio.length - 1;
  const calc = AudioIndex - 1;

  useEffect(() => {
    let paragrafo = document.getElementById(`${AudioIndex}`);

    if (AudioIndex == paragrafo.id) {
      paragrafo.classList.add("SelectedP");
    }

    if (AudioIndex >= 1) {
      let previousParagraph = document.getElementById(`${calc}`);
      previousParagraph.classList.remove("SelectedP");
    }
    if (AudioIndex === 0) {
      let previousParagraph = document.getElementById(`${dataLen}`);
      previousParagraph.classList.remove("SelectedP");
    }
  }, [AudioIndex, dataTextoAudio]);

  return (
    <C.TextoContainer thema={thema}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {dataTextoAudio.map((item, i) => (
        <div key={i}>
          <p id={i}>{item.AudioText}</p>
          <br />
        </div>
      ))}
      {/* <Swiper spaceBetween={0} slidesPerView={1}>
        <SwiperSlide>
          {DataTextoAudio.map((item, i) => (
            <div key={i}>
              <p id={i}>{item.AudioText}</p>
              <br />
            </div>
          ))}
        </SwiperSlide>

        <SwiperSlide>
          {DataTextoAudio.map((item, i) => (
            <div key={i}>
              <p>{item.Translate}</p>
              <br />
            </div>
          ))}
        </SwiperSlide>
      </Swiper> */}
    </C.TextoContainer>
  );
}

export default Texto;
