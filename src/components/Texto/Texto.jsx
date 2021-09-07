import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../data/Store';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import './style.scss'

function Texto(props) {
    const { number } = useContext(AppContext);
    const calc = number - 1;
    const dataLen = props.DataTextoAudio.length - 1;

    useEffect(() => {
        let paragrafo = document.getElementById(`${number}`)

        if (number == paragrafo.id) {
            paragrafo.classList.add('SelectedP')        
        }

        if (number >= 1) {

            let paragrafo1 = document.getElementById(`${calc}`)
            paragrafo1.classList.remove('SelectedP')
        }

        if (number === 0) {
            let paragrafo1 = document.getElementById(`${dataLen}`)
            paragrafo1.classList.remove('SelectedP')
        }

    }, [number])

    return (
        <div className="Texto-container">
            <br /><br /><br /><br /><br /><br />
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
            >
                <SwiperSlide> 
                    {props.DataTextoAudio.map((item, i) =>
                    <div key={i}>
                        <p id={i}>{item.AudioText}</p>
                        <br />
                    </div>
                )}
                </SwiperSlide>

                <SwiperSlide>
                {props.DataTextoAudio.map((item, i) =>
                    <div key={i}>
                        <p >{item.Translate}</p>
                        <br />
                    </div>
                )}
                </SwiperSlide>

            </Swiper>
        </div>
    )
}

export default Texto
