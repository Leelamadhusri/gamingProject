from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('games.urls')),     # games app
    path('users/', include('users.urls')),  # users app
]