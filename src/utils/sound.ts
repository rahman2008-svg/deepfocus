// High-fidelity synthesized audio using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playButtonClick(volume = 50) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const vol = (volume / 100) * 0.15;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.warn('Audio not allowed yet or not supported', e);
  }
}

export function playTick(type: 'fast' | 'slow', volume = 30) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const vol = (volume / 100) * 0.08;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(type === 'fast' ? 1200 : 800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.02);

    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  } catch (e) {
    console.warn('Audio tick error', e);
  }
}

export function playAlarmSound(type: 'bell' | 'digital' | 'chime' | 'wood' | 'gong', volume = 70) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    const vol = (volume / 100) * 0.4;
    masterGain.gain.setValueAtTime(vol, now);
    masterGain.connect(ctx.destination);

    if (type === 'bell') {
      // Warm resonant brass bell
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5 major
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const decay = 1.2 + idx * 0.2;
        noteGain.gain.setValueAtTime(0.3 / (idx + 1), now);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decay);
      });
    } else if (type === 'digital') {
      // Digital watch double beep
      const notes = [
        { freq: 1046.5, time: 0, dur: 0.1 },
        { freq: 1318.5, time: 0.12, dur: 0.15 },
        { freq: 1046.5, time: 0.35, dur: 0.1 },
        { freq: 1318.5, time: 0.47, dur: 0.2 },
      ];
      notes.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + time);

        noteGain.gain.setValueAtTime(0.15, now + time);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now + time);
        osc.stop(now + time + dur);
      });
    } else if (type === 'chime') {
      // Elegant crystal chime
      const sequence = [
        { freq: 659.25, time: 0 },    // E5
        { freq: 830.61, time: 0.15 }, // G#5
        { freq: 987.77, time: 0.3 },  // B5
        { freq: 1318.51, time: 0.45 }, // E6
      ];
      sequence.forEach(({ freq, time }) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + time);

        noteGain.gain.setValueAtTime(0.25, now + time);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + time + 1.2);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now + time);
        osc.stop(now + time + 1.25);
      });
    } else if (type === 'wood') {
      // Woodblock rhythmic knock
      [0, 0.14, 0.28].forEach((time, i) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700 + i * 150, now + time);
        osc.frequency.exponentialRampToValueAtTime(200, now + time + 0.08);

        noteGain.gain.setValueAtTime(0.4, now + time);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.08);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now + time);
        osc.stop(now + time + 0.09);
      });
    } else if (type === 'gong') {
      // Deep meditative gong
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(146.83, now); // D3
      osc.frequency.exponentialRampToValueAtTime(110, now + 2.0);

      noteGain.gain.setValueAtTime(0.5, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 2.6);
    }
  } catch (err) {
    console.warn('Alarm sound play error', err);
  }
}
