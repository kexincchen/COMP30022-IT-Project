import requests

# URL of your Flask server
filename = "uploaded_audio.mp3"  # replace with your own audio file name
url = 'http://127.0.0.1:5000/api/audio-to-command' 

header = {'Content-Type': 'multipart/form-data'}
data = {
    "model": "whisper",  # choose the model you want to use ("whisper" / "google")
    "api": "api_key",
    "username": "admin"
}
# Open file in binary mode
with open(filename, 'rb') as f:
    files = {'file': f}
    print(files)
    response = requests.post(url, files=files, data=data)

# Print response
print(response.status_code)  # Should print 200 for success
print(response.text)  # Response content
