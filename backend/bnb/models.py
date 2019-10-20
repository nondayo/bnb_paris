from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    photo = models.URLField(blank=True)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


class BnbParis(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    host_id = models.IntegerField()
    host_name = models.CharField(max_length=100)
    neighbourhood_group = models.CharField(max_length=100)
    neighbourhood = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    room_type = models.CharField(max_length=100)
    price = models.IntegerField()
    minimum_nights = models.IntegerField()
    number_of_reviews = models.IntegerField()
    last_review = models.DateTimeField()
    reviews_per_month = models.FloatField()
    calculated_host_listings_count = models.IntegerField()
    availability_365 = models.FloatField()
