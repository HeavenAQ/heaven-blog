---
categories:
- Math
- Fourier Analysis
createdAt: '2025-09-05'
description: '```python'
tags:
- Fourier Analysis
- Math
title: 2. Introduction to Sound Waves
---
# Intro - Sound Wave

## C Major Chord

```python
import numpy as np
import wave

fs = 44100
duration = 2.0
t = np.linspace(0, duration, int(fs * duration), endpoint=False)

freqs = [261.63, 329.63, 392.00] # C4, E4, G4
y = sum(np.sin(2 * np.pi * f * t) for f in freqs)

# Fade in/out to avoid clicks
fade = int(0.02 * fs)
y[:fade] *= np.linspace(0, 1, fade)
y[-fade:] *= np.linspace(1, 0, fade)

# Normalize to -3 dBFS and write 16-bit WAV
y = y / np.max(np.abs(y)) * (10 ** (-3 / 20))
y16 = (np.clip(y, -1, 1) * 32767).astype(np.int16)

with wave.open("c_major_chord.wav", "wb") as wf:
 wf.setnchannels(1)
 wf.setsampwidth(2)
 wf.setframerate(fs)
 wf.writeframes(y16.tobytes())
```

---

## What Fourier Transform does here

When you generate a chord:

$$
y(t) = \sin(2\pi f_C t) + \sin(2\pi f_E t) + \sin(2\pi f_G t)
$$

that’s just a **sum of three sinusoids** at different frequencies (C, E, G).

- In the **time domain** → you see a complicated-looking waveform.
- In the **frequency domain (via Fourier Transform)** → you don’t see “complicated”; instead, you see **three clean spikes** at the frequencies 261.63 Hz, 329.63 Hz, and 392.00 Hz.

---

## About Wave File Production

### Step 1: Normalize to –3 dBFS

```python
y = y / np.max(np.abs(y)) * (10 ** (-3 / 20))
```

- `np.max(np.abs(y))` → finds the largest absolute value in your waveform. This tells you the **peak amplitude**.

- `y / np.max(np.abs(y))` → scales the entire signal so that the peak is **exactly 1.0** (full scale).

- `(10 ** (-3 / 20))` → converts **–3 dB** into a linear gain factor.

 - Recall: `gain_linear = 10^(dB/20)`.

 - For –3 dB: `10^(-3/20) ≈ 0.7079`.

- So after this line:

 - The peak amplitude is set to about **0.707 of full scale**, i.e. –3 dBFS (decibels relative to full scale).

 - Why –3 dB? It avoids clipping when you mix/play the file on real systems, leaving a bit of **headroom**.

---

### Step 2: Convert to 16-bit integer PCM

```python
y16 = (np.clip(y, -1, 1) * 32767).astype(np.int16)
```

- `np.clip(y, -1, 1)` → ensures values are in the valid audio range \[–1.0, +1.0].

 - If a sample accidentally overshot (e.g., rounding), it gets clipped.

- `* 32767` → maps the normalized floating point (–1.0…+1.0) into signed 16-bit integer range.

 - A 16-bit signed integer can store values from –32768 to +32767.

 - We use 32767 for scaling because it’s the maximum positive value.

- `.astype(np.int16)` → converts the NumPy array into actual 16-bit integers that WAV expects.

So now `y16` is an array of **16-bit PCM samples**.

---

### Step 3: Write the WAV file

```python
with wave.open("c_major_chord.wav", "wb") as wf:
 wf.setnchannels(1)
 wf.setsampwidth(2)
 wf.setframerate(fs)
 wf.writeframes(y16.tobytes())
```

- `wave.open("c_major_chord.wav", "wb")` → open a WAV file for writing (`"wb"` = write binary).

- `wf.setnchannels(1)` → mono (1 channel). Use `2` for stereo.

- `wf.setsampwidth(2)` → 2 bytes per sample = **16-bit audio**.

- `wf.setframerate(fs)` → sampling rate in Hz (e.g., 44100).

- `wf.writeframes(y16.tobytes())` → write all samples to file.

 - `.tobytes()` converts the NumPy array into raw byte data that WAV expects.
