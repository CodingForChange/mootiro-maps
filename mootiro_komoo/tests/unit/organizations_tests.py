# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import unittest
from ..test_utils import setup_env, create_test_user, const
setup_env()

from main.utils import filter_dict
from organizations.models import Organization


class OrganizationModelTestCase(unittest.TestCase):

    @classmethod
    def _create_organization(self):
        it3s = Organization()
        # if not it3s:
        #     it3s = Organization(id=1)
        it3s.name = 'IT3S'
        it3s.description = 'Instituto de Fomento a Tec do 3o setor'
        it3s.creator = self.test_user
        it3s.creation_date = const.DATETIME_OBJ
        it3s.organization_type = 'ong'
        it3s.save()
        it3s.creation_date = const.DATETIME_OBJ
        return it3s

    test_user = create_test_user()

    @property
    def expected_dict(self):
        return {
            'name': 'IT3S',
            'description': 'Instituto de Fomento a Tec do 3o setor',
            'creator': self.test_user,
            'creation_date': const.DATETIME_OBJ,
            'last_editor': None,
            'extra_data': None,
            'tags': const.EMPTY_TAGS,
            'organization_type': 'ong',
            'contact': {},
        }

    def to_dict_test(self):
        org = self._create_organization()
        org_dict = filter_dict(org.to_dict(), ['id', 'last_update'])
        self.assertDictEqual(org_dict, self.expected_dict)

    def from_dict_test(self):
        org = Organization()
        org.from_dict(self.expected_dict)
        org.save()
        org_dict = filter_dict(org.to_dict(), ['id', 'last_update'])
        self.assertDictEqual(org_dict, self.expected_dict)

    def is_valid_test(self):
        org = self._create_organization()
        self.assertTrue(org.is_valid())

