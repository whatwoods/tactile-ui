/**
 * Skeuomorphic Sound Synthesizer Utility using Web Audio API
 * Generates tactile physical feedback sounds dynamically without loading heavy audio assets.
 */

// Helper to get browser AudioContext safely
const getAudioContext = (): AudioContext | null => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    return new AudioContextClass();
  } catch (e) {
    console.warn('AudioContext is not supported in this browser', e);
    return null;
  }
};

/**
 * Plays a simple physical click sound.
 * Suitable for button presses, switch toggles, etc.
 */
export const playClickSound = (
  enabled: boolean,
  pitch = 800,
  duration = 0.05,
  type: OscillatorType = 'sine'
) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);

    // Fade out exponentially to sound natural
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Failed to play click sound', err);
  }
};

/**
 * Plays a power-up (rising pitch) or power-down (falling pitch) sweep sound.
 */
export const playPowerSound = (enabled: boolean, isPowerUp: boolean) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = 0.12;

    osc.type = 'triangle';
    if (isPowerUp) {
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + duration);
    } else {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + duration);
    }

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Failed to play power sound', err);
  }
};

/**
 * Plays a very short, wooden tick sound.
 * Suitable for rotary knob notches and slider increments.
 */
export const playTickSound = (enabled: boolean, pitch = 1100) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const duration = 0.015;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Failed to play tick sound', err);
  }
};

/**
 * Plays a double error buzzer sound.
 * Suitable for indicating disabled/inactive states when user clicks a powered-off module.
 */
export const playBuzzerSound = (enabled: boolean) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const playTone = (delay: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const duration = 0.08;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, ctx.currentTime + delay);

      // Low pass filter to make it sound muffled/retro
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.05, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };

    // Play double buzz
    playTone(0);
    playTone(0.12);
  } catch (err) {
    console.warn('Failed to play buzzer sound', err);
  }
};
