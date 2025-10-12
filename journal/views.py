from rest_framework import viewsets, permissions
from .models import JournalEntry
from .serializers import JournalEntrySerializer
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.authtoken.views import obtain_auth_token

def home(request):
    return HttpResponse("Welcome to the Daily Journal App!")

class JournalEntryViewSet(viewsets.ModelViewSet):
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JournalEntry.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
