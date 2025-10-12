from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journalentry')

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('', include(router.urls)),
]
