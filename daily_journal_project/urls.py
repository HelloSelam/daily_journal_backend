from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('journal.urls')),             # for home route
    path('api/', include('journal.api_urls')),     # for API endpoints
    path('auth/', include('journal.auth_urls')),   # for authentication routes
    path('api/auth/', views.obtain_auth_token),    # login endpoint 
]