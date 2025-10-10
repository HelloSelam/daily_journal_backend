from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet, home

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journalentry')

urlpatterns = [
    path('', home, name='home'),
    path('api/', include(router.urls)),
]
