from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet, CustomRegisterView

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journalentry')

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/',  CustomRegisterView.as_view(), name='rest_register'),
    path('', include(router.urls)),
]
