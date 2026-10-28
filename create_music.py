import math
import wave
import struct
import os

os.makedirs("static/music", exist_ok=True)

sample_rate = 44100
duration = 0.35
volume = 0.35

notes = [
    523.25, 523.25, 587.33, 523.25, 698.46, 659.25,
    523.25, 523.25, 587.33, 523.25, 783.99, 698.46,
    523.25, 523.25, 1046.50, 880.00, 698.46, 659.25,
    587.33, 932.33, 932.33, 880.00, 698.46, 783.99, 698.46
]

with wave.open("static/music/birthday-melody.wav", "w") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(sample_rate)

    for frequency in notes:
        samples = int(sample_rate * duration)

        frames = bytearray()

        for i in range(samples):
            t = i / sample_rate
            fade = min(i / 500, (samples - i) / 500, 1)
            fade = max(0, fade)

            value = volume * fade * math.sin(2 * math.pi * frequency * t)
            frames.extend(struct.pack("<h", int(value * 32767)))

        wav_file.writeframes(frames)

print("Birthday melody created successfully!")
