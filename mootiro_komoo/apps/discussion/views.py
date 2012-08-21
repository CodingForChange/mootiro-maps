#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals  # unicode by default

from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse

import logging
from annoying.decorators import render_to, ajax_request
from annoying.functions import get_object_or_None
from ajaxforms import ajax_form

from .models import Discussion
from community.models import Community
from need.models import Need
# from komoo_resource.models import Resource
# from organization.models import OrganizationBranch, Organization
# from proposal.models import Proposal
from .forms import DiscussionForm

logger = logging.getLogger(__name__)


def _discussion_for (identifier):
    ent_model = {
        'c': Community,
        'n': Need,
    }
    ent, id_ = identifier[0], identifier[1:]
    ent_content_type = ContentType.objects.get_for_model(ent_model[ent])

    discussion = get_object_or_None(Discussion, object_id=id_,
                    content_type=ent_content_type)

    if not discussion:
        discussion = Discussion(object_id=id_, content_type=ent_content_type)
        discussion.save()
    else:

    return discussion


@render_to('discussion/view.html')
def view_discussion(request, identifier=''):
    discussion = _discussion_for(identifier)
    obj = discussion.content_object
    return dict(discussion=discussion, obj=obj, section=obj._meta.verbose_name)


@login_required
@ajax_form('discussion/edit.html', DiscussionForm)
def edit_discussion(request, identifier='', *args, **kwargs):
    logger.debug('acessing discussion > edit_discussion : identifier={}'
        ''.format(identifier))

    discussion = _discussion_for(identifier)
    obj = discussion.content_object
    
    def on_get(request, form_discussion):
        return DiscussionForm(instance=discussion)

    def on_after_save(request, disc):
        url = reverse('view_discussion', args=(disc.content_object.perm_id,))
        return {'redirect': url}

    return {'on_get': on_get, 'on_after_save': on_after_save, 'obj': obj,
            'discussion': discussion, 'section': obj._meta.verbose_name}
