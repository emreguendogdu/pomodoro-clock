import React from "react"

export const handleAudio = (value) => {
  const audio = document.getElementById("beep")

  if (value === "play") {
    // Play audio with increased playback rate and loop
    audio.play()
    audio.playbackRate = 1.5
    setTimeout(() => (audio.loop = false), 1000)
  } else if (value === "stop") {
    // Stop and reset audio
    audio.pause()
    audio.currentTime = 0
    return
  }
}

export default function AudioPlayer() {
  return (
    <audio id="beep" loop preload="auto">
      <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </audio>
  )
}
