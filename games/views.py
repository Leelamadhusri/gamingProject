from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def home(request):
    return render(request, "games/home.html")
@login_required
def ball(request):
    return render(request, "games/ball.html")
@login_required
def color(request):
    return render(request, "games/color.html")
@login_required
def dice(request):
    return render(request, "games/dice.html")
@login_required
def hangman(request):
    return render(request, "games/hangman.html")
@login_required
def number(request):
    return render(request, "games/text.html")
@login_required
def rps(request):
    return render(request, "games/rps.html")
