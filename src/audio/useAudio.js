import { useRef, useCallback, useEffect, useState } from 'react';

let sharedAudioCtx = null;

function getAudioContext() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return sharedAudioCtx;
}

function playTone(ctx, freq, type, duration, gain = 0.3, startTime = ctx.currentTime) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gainNode.gain.setValueAtTime(gain, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

// Background music - simple arpeggiated melody
function startBGMusic(ctx, masterGain) {
  const notes = [261, 329, 392, 523, 392, 329, 261, 220, 277, 349, 440, 554, 440, 349, 277, 220];
  let step = 0;
  const interval = 0.18;
  let nextTime = ctx.currentTime + 0.1;
  let stopped = false;

  function scheduleNext() {
    if (stopped) return;
    const now = ctx.currentTime;
    while (nextTime < now + 0.4) {
      const freq = notes[step % notes.length];
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, nextTime);
      g.gain.setValueAtTime(0.08, nextTime);
      g.gain.exponentialRampToValueAtTime(0.001, nextTime + interval * 0.9);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(nextTime);
      osc.stop(nextTime + interval);
      nextTime += interval;
      step++;
    }
    if (!stopped) {
      setTimeout(scheduleNext, 200);
    }
  }

  scheduleNext();
  return () => { stopped = true; };
}

export function useAudio() {
  const musicStopRef = useRef(null);
  const masterGainRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  const initAudio = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    if (!masterGainRef.current) {
      const g = ctx.createGain();
      g.gain.setValueAtTime(1, ctx.currentTime);
      g.connect(ctx.destination);
      masterGainRef.current = g;
    }
  }, []);

  const startMusic = useCallback(() => {
    initAudio();
    if (musicStopRef.current) {
      musicStopRef.current();
    }
    const ctx = getAudioContext();
    musicStopRef.current = startBGMusic(ctx, masterGainRef.current);
  }, [initAudio]);

  const stopMusic = useCallback(() => {
    if (musicStopRef.current) {
      musicStopRef.current();
      musicStopRef.current = null;
    }
  }, []);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    if (masterGainRef.current) {
      const ctx = getAudioContext();
      masterGainRef.current.gain.setValueAtTime(
        mutedRef.current ? 0 : 1,
        ctx.currentTime
      );
    }
  }, []);

  const playMove = useCallback(() => {
    if (mutedRef.current) return;
    initAudio();
    const ctx = getAudioContext();
    playTone(ctx, 220, 'square', 0.05, 0.08);
  }, [initAudio]);

  const playRotate = useCallback(() => {
    if (mutedRef.current) return;
    initAudio();
    const ctx = getAudioContext();
    playTone(ctx, 440, 'sine', 0.07, 0.12);
    playTone(ctx, 660, 'sine', 0.07, 0.1, ctx.currentTime + 0.04);
  }, [initAudio]);

  const playDrop = useCallback(() => {
    if (mutedRef.current) return;
    initAudio();
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(g);
    g.connect(masterGainRef.current || ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }, [initAudio]);

  const playClear = useCallback((lines) => {
    if (mutedRef.current) return;
    initAudio();
    const ctx = getAudioContext();
    const freqs = lines >= 4
      ? [523, 659, 784, 1047]
      : lines >= 3
        ? [523, 659, 784]
        : lines >= 2
          ? [523, 659]
          : [523];
    freqs.forEach((f, i) => {
      playTone(ctx, f, 'sine', 0.3, 0.25, ctx.currentTime + i * 0.08);
    });
  }, [initAudio]);

  const playGameOver = useCallback(() => {
    if (mutedRef.current) return;
    initAudio();
    const ctx = getAudioContext();
    [440, 370, 311, 261].forEach((f, i) => {
      playTone(ctx, f, 'sawtooth', 0.3, 0.3, ctx.currentTime + i * 0.15);
    });
  }, [initAudio]);

  return { startMusic, stopMusic, playMove, playRotate, playDrop, playClear, playGameOver, toggleMute, muted, initAudio };
}
