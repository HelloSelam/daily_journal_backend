from rest_framework import serializers
from .models import JournalEntry
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):
    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        # Remove anything related to token if needed
        return data

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']