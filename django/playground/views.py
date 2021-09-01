from django.http.response import Http404
from django.shortcuts import render
from django.http import HttpResponse, Http404

def say_hello(request):
    return render(request, 'hello.html', { 'name': 'Alexandre' })

def teste(request):
    raise Http404("Teste")
