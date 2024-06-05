import React from "react";
import "./css/loader.css";

export default function Loader() {
  return (
    <>
      <div class="flex justify-center items-center h-screen">
        <div class="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
      </div>

      <svg width="0" height="0" className="jelly-maker">
        <defs>
          <filter id="uib-jelly-triangle-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="7.3"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="ooze"></feBlend>
          </filter>
        </defs>
      </svg>
    </>
  );
}
