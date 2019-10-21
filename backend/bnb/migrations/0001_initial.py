# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2019-10-21 09:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BnbParis',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bnb_id', models.CharField(default='', max_length=100)),
                ('name', models.CharField(default='', max_length=100, null=True)),
                ('host_id', models.CharField(default='', max_length=100, null=True)),
                ('host_name', models.CharField(default='', max_length=100, null=True)),
                ('neighbourhood_group', models.CharField(default='', max_length=100, null=True)),
                ('neighbourhood', models.CharField(default='', max_length=100, null=True)),
                ('latitude', models.CharField(default='', max_length=100, null=True)),
                ('longitude', models.CharField(default='', max_length=100, null=True)),
                ('room_type', models.CharField(default='', max_length=100, null=True)),
                ('price', models.CharField(default='', max_length=100, null=True)),
                ('minimum_nights', models.CharField(default='', max_length=100, null=True)),
                ('number_of_reviews', models.CharField(default='', max_length=100, null=True)),
                ('last_review', models.CharField(default='', max_length=100, null=True)),
                ('reviews_per_month', models.CharField(default='', max_length=100, null=True)),
                ('calculated_host_listings_count', models.CharField(default='', max_length=100, null=True)),
                ('availability_365', models.CharField(default='', max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField(blank=True)),
                ('photo', models.URLField(blank=True)),
                ('location', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
