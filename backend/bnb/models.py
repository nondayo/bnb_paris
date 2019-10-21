from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    photo = models.URLField(blank=True)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


# class BnbParis(models.Model):
#     bnb_id = models.IntegerField(primary_key=True)
#     name = models.CharField(max_length=100)
#     host_id = models.IntegerField(blank=True)
#     host_name = models.CharField(max_length=100)
#     neighbourhood_group = models.CharField(max_length=100, null=True)
#     neighbourhood = models.CharField(max_length=100)
#     latitude = models.FloatField(blank=True)
#     longitude = models.FloatField(blank=True)
#     room_type = models.CharField(max_length=100)
#     price = models.IntegerField(blank=True)
#     minimum_nights = models.IntegerField(blank=True)
#     number_of_reviews = models.IntegerField(blank=True)
#     last_review = models.DateTimeField(blank=True)
#     reviews_per_month = models.FloatField(blank=True)
#     calculated_host_listings_count = models.IntegerField(blank=True)
#     availability_365 = models.FloatField(blank=True)

class BnbParis(models.Model):
    bnb_id = models.CharField(max_length=100, default="")
    name = models.CharField(max_length=100, null=True, default="")
    host_id = models.CharField(max_length=100, null=True, default="")
    host_name = models.CharField(max_length=100, null=True, default="")
    neighbourhood_group = models.CharField(
        max_length=100, null=True, default="")
    neighbourhood = models.CharField(max_length=100, null=True, default="")
    latitude = models.CharField(max_length=100, null=True, default="")
    longitude = models.CharField(max_length=100, null=True, default="")
    room_type = models.CharField(max_length=100, null=True, default="")
    price = models.CharField(max_length=100, null=True, default="")
    minimum_nights = models.CharField(max_length=100, null=True, default="")
    number_of_reviews = models.CharField(max_length=100, null=True, default="")
    last_review = models.CharField(max_length=100, null=True, default="")
    reviews_per_month = models.CharField(max_length=100, null=True, default="")
    calculated_host_listings_count = models.CharField(
        max_length=100, null=True, default="")
    availability_365 = models.CharField(max_length=100, null=True, default="")
