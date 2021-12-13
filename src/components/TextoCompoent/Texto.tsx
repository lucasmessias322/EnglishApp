import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../../Context/Store";
import * as C from "./style";

function Texto({ DataTextoAudio }: any) {
  const { number } = useContext(AppContext);
  const calc = number - 1;
  const dataLen = DataTextoAudio.length - 1;

  useEffect(() => {
    let paragrafo: any = document.getElementById(`${number}`);

    if (number == paragrafo.id) {
      paragrafo.classList.add("SelectedP");
    }

    if (number >= 1) {
      let paragrafo1: any = document.getElementById(`${calc}`);
      paragrafo1.classList.remove("SelectedP");
    }
    if (number === 0) {
      let paragrafo1: any = document.getElementById(`${dataLen}`);
      paragrafo1.classList.remove("SelectedP");
    }
  }, [number]);

  return (
    <C.TextoContainer>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Swiper spaceBetween={0} slidesPerView={1}>
        <SwiperSlide>
          {DataTextoAudio.map((item: any, i: any) => (
            <div key={i}>
              <p id={i}>{item.AudioText}</p>
              <br />
            </div>
          ))}
        </SwiperSlide>

        <SwiperSlide>
          {DataTextoAudio.map((item: any, i: any) => (
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
