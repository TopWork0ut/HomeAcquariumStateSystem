import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import LiquidFillGauge from "react-liquid-gauge";
import "./../App.css";
import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";

const Acquarium = ({ data }) => {
  const [value, setValue] = useState(50);
  const lastData = data[data.length - 1];
  const waterLevel = lastData ? lastData.distance : 0;

  // console.log("Water level");
  // console.log(waterLevel);
  // if (value != waterLevel) {

  useEffect(() => {
    if (value != waterLevel) {
      setValue(waterLevel);
    }
  }, [waterLevel]);
  // }

  // const [value, setValue] = useState(waterLevel);

  const startColor = "#4071f7";

  // "#6495ed"; // cornflowerblue
  const endColor = "#1244e6";
  // "#dc143c"; // crimson

  const radius = 200;
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(value / 100);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "25%",
      stopColor: fillColor,
      stopOpacity: 0.85,
      offset: "25%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "75%",
      stopColor: fillColor,
      stopOpacity: 0.63,
      offset: "75%",
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  // const handleRefresh = () => {
  //   setValue(Math.random() * 100);
  // };

  return (
    <div>
      <LiquidFillGauge
        key={value}
        style={{ margin: "0 auto" }}
        width={radius * 2}
        height={radius * 2}
        value={value * 3.6}
        percent="%"
        cm="cm"
        textSize={1}
        textOffsetX={0}
        textOffsetY={0}
        textRenderer={(props) => {
          const value = Math.round(props.value);
          const radius = Math.min(props.height / 2, props.width / 2);
          const textPixels = (0.5 * (props.textSize * radius)) / 2;
          const valueStyle = {
            fontSize: textPixels,
          };
          const percentStyle = {
            fontSize: textPixels * 0.6,
          };

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>
                {value}
              </tspan>
              <tspan style={percentStyle}>{props.percent}</tspan>
              {/* Add spaces here */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <tspan className="value" style={valueStyle}>
                {Math.round(value / 3.6)}
              </tspan>
              <tspan style={percentStyle}>{props.cm}</tspan>
            </tspan>
          );
        }}
        riseAnimation
        animate={true}
        waveAnimation
        // waveAnimation={true}
        waveAnimationTime={3000}
        waveFrequency={2}
        waveAmplitude={3}
        gradient
        gradientStops={gradientStops}
        circleStyle={{
          fill: fillColor,
        }}
        waveStyle={{
          fill: fillColor,
        }}
        textStyle={{
          fill: color("#444").toString(),
          fontFamily: "Source Code Pro",
          fontWeight: 900,
        }}
        waveTextStyle={{
          fill: color("#fff").toString(),
          fontFamily: "Source Code Pro",
          fontWeight: 900,
        }}
        // onClick={() => {
        //   setValue(Math.random() * 100);
        // }}
      />
      <div
        style={{
          margin: "20px auto",
          width: 120,
        }}>
        {/* <button
          type="button"
          className="btn btn-default btn-block"
          onClick={handleRefresh}>
          Refresh
        </button> */}
      </div>
    </div>
  );
};

export default Acquarium;
