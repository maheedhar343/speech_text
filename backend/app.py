from flask import Flask, jsonify
import speech_recognition as sr
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

recognizer = sr.Recognizer()
microphone = sr.Microphone()

@app.route('/convert', methods=['GET'])
def speech_to_text():
    try:
        with microphone as source:
            print("Listening for audio...")
            recognizer.adjust_for_ambient_noise(source)
            audio_data = recognizer.listen(source)

            try:
                text = recognizer.recognize_google(audio_data)
                return jsonify({"text": text}), 200
            except sr.UnknownValueError:
                return jsonify({"error": "Could not understand audio"}), 400
            except sr.RequestError as e:
                return jsonify({"error": f"Google Speech Recognition service error: {e}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
