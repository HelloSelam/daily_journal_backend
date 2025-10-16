from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet, home, CustomRegisterView

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journalentry')

urlpatterns = [
    path('auth/registration/', CustomRegisterView.as_view(), name='rest_register'),
    path('', home, name='home'),
    path('api/', include(router.urls)),
]
