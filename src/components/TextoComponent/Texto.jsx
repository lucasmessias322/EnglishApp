import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../../Context/AuthContext";
import * as C from "./style";

function Texto({ thema, DataTextoAudio }) {
  const { number } = useContext(AuthContext);
  const calc = (number - 1);
  const dataLen = (DataTextoAudio.length - 1);

  useEffect(() => {
    let paragrafo = document.getElementById(`${number}`);

    if (number == paragrafo.id) {
      paragrafo.classList.add("SelectedP");
    } else if (number >= 1) {
      let paragrafo1 = document.getElementById(`${calc}`);
      paragrafo1.classList.remove("SelectedP");
    } else if (number === 0) {
      let paragrafo1 = document.getElementById(`${dataLen}`);
      paragrafo1.classList.remove("SelectedP");
    }
  }, [number]);

  return (
    <C.TextoContainer thema={thema}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Swiper spaceBetween={0} slidesPerView={1}>
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
      </Swiper>
    </C.TextoContainer>
  );
}

export default Texto;
