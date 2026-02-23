from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('ball/', views.ball, name='ball'),
    path('color/', views.color, name='color'),
    path('dice/', views.dice, name='dice'),
    path('hangman/', views.hangman, name='hangman'),
    path('number/', views.number, name='number'),
    path('rps/', views.rps, name='rps'),
]
