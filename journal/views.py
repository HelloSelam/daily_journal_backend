from rest_framework import viewsets, permissions
from .models import JournalEntry
from .serializers import JournalEntrySerializer, CustomRegisterSerializer
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.authtoken.views import obtain_auth_token
from dj_rest_auth.registration.views import RegisterView
from rest_framework.response import Response
from rest_framework import status

def home(request):
    return HttpResponse("""
        <h1>Welcome to the Daily Journal API</h1>
        <p>Here are some available endpoints you can explore:</p>
        <ul>
            <li><a href="/api/auth/registration/">/api/auth/registration/</a> — User registration</li>
            <li><a href="/api/auth/login/">/api/auth/login/</a> — User login</li>
            <li><a href="/api/auth/logout/">/api/auth/logout/</a> — User logout</li>
            <li><a href="/api/entries/">/api/entries/</a> — Journal entries</li>
        </ul>
        <p>Built with ❤️ using Django REST Framework</p>
    """)
class JournalEntryViewSet(viewsets.ModelViewSet):
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JournalEntry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({"detail": "Registration successful! Please login."}, status=status.HTTP_201_CREATED)
