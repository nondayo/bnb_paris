from django.db import models


class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)

    def __str__(self):
        return self.name


class ApiBnbParis(models.Model):
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

    def __str__(self):
        return self.name
