import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const followersMarks = [
  {
    value: 0,
    scaledValue: 1000,
    label: "1k"
  },
  {
    value: 25,
    scaledValue: 5000,
    label: "5k"
  },
  {
    value: 50,
    scaledValue: 10000,
    label: "10k"
  },
  {
    value: 75,
    scaledValue: 25000,
    label: "25k"
  },
  {
    value: 100,
    scaledValue: 50000,
    label: "50k"
  },
  {
    value: 125,
    scaledValue: 100000,
    label: "100k"
  },
  {
    value: 150,
    scaledValue: 250000,
    label: "250k"
  },
  {
    value: 175,
    scaledValue: 500000,
    label: "500k"
  },
  {
    value: 200,
    scaledValue: 1000000,
    label: "1M"
  }
];

const scale = value => {
  const previousMarkIndex = Math.floor(value / 25);
  const previousMark = followersMarks[previousMarkIndex];
  const remainder = value % 25;
  if (remainder === 0) {
    return previousMark.scaledValue;
  }
  const nextMark = followersMarks[previousMarkIndex + 1];
  const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
  return remainder * increment + previousMark.scaledValue;
};

function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}

export default function NonLinearSlider() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography id="non-linear-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        style={{ maxWidth: 500 }}
        value={value}
        min={0}
        step={1}
        max={200}
        valueLabelFormat={numFormatter}
        marks={followersMarks}
        scale={scale}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </div>
  );
}