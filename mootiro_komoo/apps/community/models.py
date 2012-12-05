#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import simplejson

from django.contrib.contenttypes.models import ContentType
from django.contrib.gis.db import models
from django.contrib.gis.measure import Distance
from django.core.urlresolvers import reverse

from django.utils.translation import ugettext as _

from django.template.defaultfilters import slugify
from komoo_map.models import GeoRefModel, POLYGON
from authentication.models import User


class Community(GeoRefModel):
    name = models.CharField(max_length=256, blank=False)
    # Auto-generated url slug. It's not editable via ModelForm.
    slug = models.SlugField(max_length=256, blank=False, db_index=True)
    population = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    # Meta info
    creator = models.ForeignKey(User, editable=False, null=True,
                                related_name='created_communities')
    creation_date = models.DateTimeField(auto_now_add=True)
    last_editor = models.ForeignKey(User, editable=False, null=True,
                                    blank=True)
    last_update = models.DateTimeField(auto_now=True)

    # tags = TaggableManager()

    def __unicode__(self):
        return self.name

    class Map:
        title = _('Community')
        editable = True
        background_color = '#ffc166'
        border_color = '#ff2e2e'
        geometries = (POLYGON, )
        form_view_name = 'new_community'
        min_zoom_geometry = 10
        max_zoom_geometry = 100
        min_zoom_point = 0
        max_zoom_point = 0
        min_zoom_icon = 0
        max_zoom_icon = 0
        zindex = 5

    class Meta:
        verbose_name = "community"
        verbose_name_plural = "communities"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Community, self).save(*args, **kwargs)

    image = "img/community.png"
    image_off = "img/community-off.png"

    # TODO: order communities from the database
    def closest_communities(self, max=3, radius=Distance(km=25)):
        center = self.geometry.centroid
        unordered = Community.objects.filter(
                        polys__distance_lte=(center, radius))
        closest = sorted(unordered, key=lambda c: c.geometry.distance(center))
        return closest[1:(max + 1)]

    # url aliases
    @property
    def view_url(self):
        return reverse('view_community', kwargs={'id': self.id})

    @property
    def edit_url(self):
        return reverse('edit_community', kwargs={'id': self.id})

    @property
    def admin_url(self):
        return reverse('admin:{}_{}_change'.format(self._meta.app_label,
            self._meta.module_name), args=[self.id])

    @property
    def perm_id(self):
        return 'c%d' % self.id

    @property
    def as_dict(self):
        ct = ContentType.objects.get_for_model(self)
        return {
            'id': self.id,
            'content_type': ct.id,
            'name': self.name,
            'view_url': self.view_url,
            'population': self.population,
            'projects': [],
        }

    @property
    def json(self):
        return simplejson.dumps(self.as_dict)



## =================== New implementation ================================== ##
from main.models import CommonObject, CommonDataMixin


class Community_CO(CommonObject, CommonDataMixin):
    """ Common Object inherited Community"""
    common_object_type = 'community'

    population = models.IntegerField(null=True, blank=True)

    class Map:
        title = _('Community')
        editable = True
        background_color = '#ffc166'
        border_color = '#ff2e2e'
        geometries = (POLYGON, )
        form_view_name = 'new_community'
        min_zoom_geometry = 10
        max_zoom_geometry = 100
        min_zoom_point = 0
        max_zoom_point = 0
        min_zoom_icon = 0
        max_zoom_icon = 0
        zindex = 5

    def to_json(self):
        data = super(Community_CO, self).to_json()
        data.update({
            'population': self.population,
        })
        return data

    def is_valid(self):
        res = super(Community_CO, self).is_valid()
        return res
