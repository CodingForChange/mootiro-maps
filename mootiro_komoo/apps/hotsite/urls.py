# -*- coding: utf-8 -*-
from __future__ import unicode_literals  # unicode by default
from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('hotsite.views',
    url(r'^about/?$', 'root', name='hotsite'),
)
