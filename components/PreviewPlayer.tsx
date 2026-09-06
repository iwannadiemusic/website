"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./Icons";

export function PreviewPlayer({ src, title }: { src: string; title: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onError = () => {
      setFailed(true);
      setPlaying(false);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onError);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onError);
    };
  }, []);

  async function toggle() {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
      } catch {
        setFailed(true);
      }
    } else {
      a.pause();
    }
  }

  const r = 16;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex flex-col gap-2">
      <audio ref={audio} src={src} preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="group inline-flex h-11 items-center gap-3 rounded-full bg-accent-fill pl-1.5 pr-5 text-sm font-semibold text-accent-fg transition-[filter] hover:brightness-110"
      >
        <span className="relative grid size-8 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 size-8 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
            <circle
              cx="18"
              cy="18"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - progress)}
            />
          </svg>
          {playing ? <PauseIcon /> : <PlayIcon className="size-4 translate-x-px" />}
        </span>
        <span>{playing ? "Pause" : `Play 30 seconds of ${title}`}</span>
      </button>
      {failed ? (
        <p role="status" className="text-sm text-muted">
          The preview didn&rsquo;t load. Listen on Spotify or Apple Music instead.
        </p>
      ) : null}
    </div>
  );
}
