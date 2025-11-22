"use client";
import { useEffect, useState } from "react";

interface TypingTextProps {
  words: string[];
  speed?: number; // base speed in ms
  pause?: number; // pause between words in ms
  className?: string; // optional Tailwind classes
}

const TypingText: React.FC<TypingTextProps> = ({
  words,
  speed = 120,
  pause = 1000,
  className = "",
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const type = () => {
      const updatedText = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);

      setText(updatedText);

      const baseSpeed = isDeleting ? speed / 2 : speed;
      const randomOffset = Math.floor(Math.random() * 40);
      setTypingSpeed(baseSpeed + randomOffset);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }

      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, speed, pause, typingSpeed]);

  return (
    <span className={`inline-block ${className}`}>
      {text}
      <span className="ml-1 inline-block w-[1px] bg-[var(--color-primary)] animate-blink h-[1em]" />
    </span>
  );
};

export default TypingText;
