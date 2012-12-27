# -*- coding: utf-8 -*-
from django.db import models
from jsonfield import JSONField

from komoo_map.models import GeoRefModel
from authentication.models import User
from tags.models import Tag, TagsField

from .utils import BaseDAOMixin


class CommonDataMixin(models.Model):
    """ Common attributes and behavior"""
    name = models.CharField(max_length=512)
    description = models.TextField()

    creator = models.ForeignKey(User, editable=False, null=True,
                        related_name='created_%(class)s')
    creation_date = models.DateTimeField(auto_now_add=True)
    last_editor = models.ForeignKey(User, editable=False, null=True,
                        blank=True, related_name='last_edited_%(class)s')
    last_update = models.DateTimeField(auto_now=True)

    tags = TagsField()

    extra_data = JSONField(null=True, blank=True)

    def __unicode__(self):
        return unicode(self.name)

    class Meta:
        abstract = True

    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'creator': self.creator,
            'creation_date': self.creation_date,
            'last_editor': self.last_editor,
            'last_update': self.last_update,
            'tags': self.tags,
        }


class CommonObject(GeoRefModel, BaseDAOMixin):
    """
    All mapped objects inherit from this object so then can be
    inter-changeable. This model holds the 'true PK'' for a mapped
    object and all references to them should be made through the
    CommonObject's id.
    """
    co_type = models.CharField(max_length=256)

    def to_dict(self):
        d = super(CommonObject, self).to_dict()
        d['id'] = self.id
        return d

    def from_dict(self, data):
        return None

    def __init__(self, *args, **kwargs):
        super(CommonObject, self).__init__(*args, **kwargs)
        if hasattr(self, 'common_object_type') and self.common_object_type:
            self.co_type = self.common_object_type


class TargetAudience(models.Model):
    name = models.CharField(max_length=64, unique=True, blank=False)

    def __unicode__(self):
        return self.name


# class RelationType(models.Model):
#     """ Relation Types """
#     name = models.CharField(max_length=512)
#
#     @property
#     def name(self):
#         if settings.code == 'en-us':
#             return unicode(self.name)
#         else:
#             rel_trans = RelationTypeTranslations.objects.get(
#                     relation_type=self, language_code=settings.code)
#             return unicode(rel_trans.name)
#
#
# class RelationTypeTranslations(models.Model):
#     """ Translations for RelationTypes"""
#     name = models.CharField(max_length=512)
#     language_code = models.CharField(max_length=128)
#     relation_type = models.ForeignKey(RelationType)
#
#     def __unicode__(self):
#         return unicode(self.name)


class GenericRelations(models.Model):
    """ Relations For Common Objects"""
    obj1_id = models.IntegerField(max_length=512)
    obj1_table = models.CharField(max_length=512)

    obj2_id = models.IntegerField(max_length=512)
    obj2_table = models.CharField(max_length=512)

