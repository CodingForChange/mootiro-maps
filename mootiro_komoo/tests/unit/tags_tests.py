# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import unittest
from ..test_utils import setup_env
setup_env()

from django.db import IntegrityError
from tags.models import Tag, TaggedObject
from tests.models import TestTaggedClass, TestNamespaceTaggedClass


class TagTest(unittest.TestCase):

    def _clean_all_tags(self):
        Tag.objects.all().delete()
        TaggedObject.objects.all().delete()

    def tag_unique_name_test(self):
        self._clean_all_tags()
        Tag(name='A').save()
        with self.assertRaises(IntegrityError):
            Tag(name='A').save()

    def tag_descriptor_test(self):
        self._clean_all_tags()
        obj = TestTaggedClass()
        obj.save()

        # tags start empty
        self.assertEqual([], obj.tags)

        # implicitly create and set tags
        obj.tags = ['A', 'B']
        self.assertEqual(['A', 'B'], obj.tags)
        tagA = Tag.get_by_name('A')
        tagB = Tag.get_by_name('B')
        self.assertTrue(tagA)
        self.assertTrue(tagB)

        # check for implicit creation of TaggedObjects
        obj_tags = TaggedObject.get_tags_for_object(obj)
        self.assertIn(tagA, obj_tags)
        self.assertIn(tagB, obj_tags)

        # tag add and tag remove (tag remove should not delete the tag)
        obj.tags.add('C')
        obj.tags.remove('A')
        self.assertEqual(3, Tag.objects.all().count())
        self.assertIn('A', [tag.name for tag in Tag.objects.all()])
        self.assertEqual(['B', 'C'], obj.tags)

    def namespaced_tags_test(self):
        self._clean_all_tags()
        tg = TestNamespaceTaggedClass()
        tg.save()

        self.assertEqual([], tg.tags)
        self.assertEqual([], tg.target_audience)

        tg.tags = ['A', 'B']
        tg.target_audience = ['A', 'C']

        self.assertEqual(['A', 'B'], tg.tags)
        self.assertEqual(['A', 'C'], tg.target_audience)

        A_tags = Tag.objects.filter(name='A')
        self.assertEqual(2, A_tags.count())
        self.assertTrue('tag' in [tag.namespace for tag in A_tags])
        self.assertTrue('target_audience' in [tag.namespace for tag in A_tags])

        tg.target_audience.remove('A')
        self.assertEqual(['C'], tg.target_audience)
        self.assertEqual(['A', 'B'], tg.tags)


