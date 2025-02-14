from django.shortcuts import render
from rest_framework import viewsets

from .serializers import HeroSerializer
from .models import Hero

from .serializers import ApiBnbParisSerializer
from .models import ApiBnbParis


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all().order_by('name')
    serializer_class = HeroSerializer


class ApiBnbParisViewSet(viewsets.ModelViewSet):
    queryset = ApiBnbParis.objects.all().order_by('name')
    serializer_class = ApiBnbParisSerializer
