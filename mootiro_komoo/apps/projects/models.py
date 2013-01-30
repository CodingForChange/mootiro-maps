# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.urlresolvers import reverse
from jsonfield import JSONField

from main.models import BaseModel, CommonDataMixin
from main.utils import get_model_from_table_ref, build_obj_from_dict
from authentication.models import User
from regions.models import Region


class ProjectRelatedObject(models.Model):
    project = models.ForeignKey('Project')

    object_table = models.CharField(max_length=100)
    object_id = models.IntegerField()

    def _set_object(self, obj):
        self.object_id = obj.id
        self.object_table = obj.table_ref

    def _get_object(self):
        model = get_model_from_table_ref(self.object_table)
        obj = model.get_by_id(self.object_id)
        return obj

    object = property(_get_object, _set_object)

    @classmethod
    def get_for_project(cls, project):
        return cls.objects.filter(project=project)


class Project(BaseModel, CommonDataMixin):

    contributors = models.ManyToManyField(User, null=True, blank=True,
            related_name='project_contributors')
    contact = JSONField(null=True, blank=True)

    public = models.BooleanField(default=True)
    public_discussion = models.BooleanField(default=True)

    region = models.ForeignKey(Region, null=True, blank=True)
    # field = models.??

    # logo = models.ForeignKey(UploadedFile, null=True, blank=True)

    # def partners_logo(self):
    #     """ pseudo-reverse query for retrieving the partners logo"""
     #     return UploadedFile.get_files_for(self)

    def user_can_edit(self, user):
        return self.public or \
               user == self.creator or \
               user in self.contributors.all()

    def user_can_discuss(self, user):
        return self.public_discussion or \
               user == self.creator or \
               user in self.contributors.all()

    @property
    def url(self):
        return reverse('project_view', kwargs={'id_': self.id})

    @property
    def related_objects(self):
        """Returns a queryset for the objects for a given project"""
        return ProjectRelatedObject.get_for_project(self)

    def save_related_object(self, related_object):
        obj, created = ProjectRelatedObject.get_or_create(
            project=self,
            object_table=related_object.table_ref,
            object_id=related_object.id
        )

    # ================== Utils =============================

    def to_dict(self):
        data = super(Project, self).to_dict()
        data.update({
            'contributors': [cont.id for cont in self.contributors.all()],
            'contact': getattr(self, 'contact', {}),
            'public': self.public,
            'public_discussion': self.public_discussion,
            'region': self.region_id,
        })
        return data

    def from_dict(self, data):
        keys = ['contact', 'public', 'public_discussion', 'region']
        ignore_keys = []

        if self.id:
            keys.append('contributors')
        else:
            self._postponed = getattr(self, '_postponed', [])

            self._postponed.append(
                    ('contributors', data.get('contributors', [])))
            ignore_keys.append('contributors')

        build_obj_from_dict(self, data, keys, ignore_keys=ignore_keys)

    def is_valid(self):
        validates = super(Project, self).is_valid()
        # custom validations
        return validates

    def save(self, *args, **kwargs):
        r = super(Project, self).save(*args, **kwargs)
        if self.id and hasattr(self, '_postponed'):
            for item in self._postponed:
                if item[0] == 'contributors':
                    for contrib in item[1]:
                        self.contributors.add(contrib)
                else:
                    setattr(self, item[0], item[1])
        return r
