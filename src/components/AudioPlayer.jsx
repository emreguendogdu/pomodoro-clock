import React from "react"

export const playAudio = () => {
  const audio = document.getElementById("beep")
  audio.play()
  audio.playbackRate = 1.5
  setTimeout(() => (audio.loop = false), 1000)
}
export const stopAudio = () => {
  const audio = document.getElementById("beep")
  audio.pause()
  audio.currentTime = 0
}

export default function AudioPlayer() {
  return (
    <audio id="beep" loop preload="auto">
      <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </audio>
  )
}
