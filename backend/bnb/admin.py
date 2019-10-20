from django.contrib import admin
from .models import Post
from .models import BnbParis

# Post is defined in models.py
admin.site.register(Post)
admin.site.register(BnbParis)
# admin.site.register(Firstdataapp, Firstdataappadmin)
