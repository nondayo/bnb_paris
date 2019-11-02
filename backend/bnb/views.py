from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from bnb.models import BnbParis
from api.models import ApiBnbParis
import csv


def hello_world(request):
    return render(request, 'hello_world.html', {
        'current_time': str(datetime.now()),
    })


def index(request):
    return render(request, 'index.html')


# def index(request):
#     with open("csv/listings.csv") as f:
#         reader = csv.reader(f)
#         for row in reader:
#             # _, created = BnbParis.objects.get_or_create(
#             _, created = ApiBnbParis.objects.get_or_create(
#                 bnb_id=row[0],
#                 name=row[1],
#                 host_id=row[2],
#                 host_name=row[3],
#                 neighbourhood_group=row[4],
#                 neighbourhood=row[5],
#                 latitude=row[6],
#                 longitude=row[7],
#                 room_type=row[8],
#                 price=row[9],
#                 minimum_nights=row[10],
#                 number_of_reviews=row[11],
#                 last_review=row[12],
#                 reviews_per_month=row[13],
#                 calculated_host_listings_count=row[14],
#                 availability_365=row[15],
#             )
#     print("ok!")
#     return render(request, 'index.html')
