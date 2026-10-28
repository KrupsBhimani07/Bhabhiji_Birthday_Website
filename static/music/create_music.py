import math
import wave
import struct

SAMPLE_RATE = 44100
DURATION = 0.35
VOLUME = 0.35

# Original simple birthday melody
notes = [
    523.25, 523.25, 587.33, 523.25,
    698.46, 659.25,
    523.25, 523.25, 587.33, 523.25,
    783.99, 698.46,
    523.25, 523.25, 1046.50, 880.00,
    698.46, 659.25, 587.33,
    932.33, 932.33, 880.00, 698.46,
    783.99, 698.46
]

output_file = "static/music/birthday-melody.wav"

with wave.open(output_file, "w") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(SAMPLE_RATE)

    for frequency in notes:
        samples = int(SAMPLE_RATE * DURATION)

        for i in range(samples):
            time = i / SAMPLE_RATE

            # Smooth fade in and fade out
            fade = min(i / 500, (samples - i) / 500, 1)
            fade = max(0, fade)

            value = (
                VOLUME
                * fade
                * math.sin(2 * math.pi * frequency * time)
            )

            data = int(value * 32767)
            wav_file.writeframesraw(struct.pack("<h", data))

print("Birthday melody created successfully!")