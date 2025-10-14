from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

User = get_user_model()

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="entries")
    title = models.CharField(max_length=255)
    content = models.TextField()
    mood = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} by {self.user.username}"
