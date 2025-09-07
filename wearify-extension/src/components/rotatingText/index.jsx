import React, { useState, useEffect, useRef } from "react";
import { WordsWrapper, Words, WordSpan } from './styles';


const RotatingText = ({ messages, speed = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const wrapperRef = useRef(null);
  const [currentWidth, setCurrentWidth] = useState("auto");
  const [currentColor, setCurrentColor] = useState("#000");
  const [currentBgColor, setCurrentBgColor] = useState("#ffc703");

  // 🎨 Color schemes
  const colorSchemes = [
    { bg: "#ffc703", color: "#000" }, // yellow
    { bg: "#004e98", color: "#fff" }, // blue
    { bg: "#8cb369", color: "#000" }, // green
    { bg: "#104911", color: "#fff" }, // dark green
    { bg: "#b8c0ff", color: "#000" }, // light blue
    { bg: "#e71d36", color: "#fff" }, // red
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setExitingIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, speed);

    return () => clearInterval(interval);
  }, [messages.length, speed, currentIndex]);

  useEffect(() => {
    if (wrapperRef.current) {
      const activeSpan = wrapperRef.current.querySelector(".active");
      if (activeSpan) {
        const colorScheme = colorSchemes[currentIndex % colorSchemes.length];
        setCurrentColor(colorScheme.color);
        setCurrentBgColor(colorScheme.bg);
        setCurrentWidth(`${activeSpan.offsetWidth}px`);
      }
    }
  }, [currentIndex]);

  return (
    <WordsWrapper>
      <Words ref={wrapperRef} style={{ color: '#000000' }}>
        {messages.map((msg, idx) => (
          <WordSpan
            key={idx}
            className={idx === currentIndex ? 'active' : idx === exitingIndex ? 'exit' : ''}
          >
            {msg}
          </WordSpan>
        ))}
      </Words>
    </WordsWrapper>
  );
};

export default RotatingText;
