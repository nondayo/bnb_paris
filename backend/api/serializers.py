from rest_framework import serializers
from .models import Hero
from .models import ApiBnbParis


class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')


class ApiBnbParisSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ApiBnbParis
        fields = ("bnb_id", "name", "host_id", "host_name",
                  "neighbourhood_group", "neighbourhood",
                  "latitude", "longitude",
                  "room_type", "price", "minimum_nights",
                  "number_of_reviews", "last_review",
                  "reviews_per_month", "calculated_host_listings_count",
                  "availability_365")
