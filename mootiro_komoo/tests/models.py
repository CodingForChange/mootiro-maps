# -*- coding: utf-8 -*-
from django.db import models
from tags.models import TagField
from main.models import BaseModel, RelationsField, CommonObject


class TestTaggedClass(models.Model):
    tags = TagField()


class TestModelA(BaseModel):
    name = models.CharField(max_length=100)
    relations = RelationsField()


class TestModelB(BaseModel):
    name = models.CharField(max_length=100)
    relations = RelationsField()


class TestCommonObjectModel(CommonObject):
    common_object_type = 'test_common_object_model'



