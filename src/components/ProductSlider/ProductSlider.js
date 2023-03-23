import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"

const carousel = (slider) => {
    const z = 300
    function rotate() {
        const deg = 360 * slider.track.details.progress
        slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
    }
    slider.on("created", () => {
        const deg = 360 / slider.slides.length
        slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
        })
        rotate()
    })
    slider.on("detailsChanged", rotate)
}

export default function ProductSlider({ imageUrls }) {
    console.log(imageUrls);
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
        },
        [carousel]
    )

    return (
        <div className="wrapper">
            <div className="scene">
                <div className="carousel keen-slider" ref={sliderRef}>
                    {imageUrls.map((url, idx) => {
                        <div key={idx} className="carousel__cell">
                            1</div>
                    })}
                    {imageUrls.map((url, idx) => {
                        <div key={idx} className="carousel__cell">
                            1</div>
                    })}
                    {imageUrls.map((url, idx) => {
                        <div key={idx} className="carousel__cell">
                            1</div>
                    })}

                </div>
            </div>
        </div>
    )
}
