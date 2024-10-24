import os
from django.conf import settings
from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.views import APIView
from rest_framework import status

from ibm_watson import SpeechToTextV1, TextToSpeechV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

# Create your views here.
class SpeechToText(APIView):
    def post(self, request):
        try:
            audio_file = request.FILES.get('audio_file')
            sttauthenticator = IAMAuthenticator(settings.STT_API_KEY)
            stt = SpeechToTextV1(authenticator=sttauthenticator)
            stt.set_service_url(settings.STT_URL)

            res = stt.recognize(audio=audio_file, content_type='audio/webm').get_result()
            voicetext = res['results'][0]['alternatives'][0]['transcript']
            return Response({"text": voicetext}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.message}, status=status.HTTP_400_BAD_REQUEST)


class TextToSpeech(APIView):
    def post(self, request):
        try:
            ttsauthenticator = IAMAuthenticator(settings.TTS_API_KEY)
            tts = TextToSpeechV1(authenticator=ttsauthenticator)
            tts.set_service_url(settings.TTS_URL)
            text = request.data["text"]
            with open('./speech.mp3', 'wb') as audio_file:
                res = tts.synthesize(text, accept='audio/mp3').get_result()
                audio_file.write(res.content)

            audio_file_path = os.path.join('./speech.mp3')
            response = FileResponse(open(audio_file_path, 'rb'), content_type='audio/mpeg')
            response['Content-Disposition'] = 'inline; filename="audio.mp3"'
            return response
        except Exception as e:
            return Response({"error": e.message}, status=status.HTTP_400_BAD_REQUEST)
