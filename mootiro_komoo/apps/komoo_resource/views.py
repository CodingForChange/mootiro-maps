# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import logging
from django.views.generic import View
from django.shortcuts import (render_to_response, RequestContext,
        HttpResponseRedirect, get_object_or_404)
from django.core.urlresolvers import reverse
from annoying.decorators import render_to
from komoo_resource.models import Resource
from komoo_resource.forms import FormResource


logger = logging.getLogger(__name__)


@render_to('resource/list.html')
def index(request):
    resources = Resource.objects.all()
    return dict(resources=resources)


class Edit(View):
    """ Class based view for editing a Resource """
    def get(self, request, *args, **kwargs):
        logger.debug('acessing komoo_resource > Edit with GET')
        form_resource = FormResource()
        return render_to_response('resource/edit.html',
            dict(form_resource=form_resource),
            context_instance=RequestContext(request))

    def post(self, request, *args, **kwargs):
        logger.debug('acessing komoo_resource > Edit with POST\n'
                     'request : {}'.format(request.POST))
        if request.POST.get('id', None):
            resource = get_object_or_404(Resource, pk=request.POST['id'])
            form_resource = FormResource(request.POST, instance=resource)
        else:
            form_resource = FormResource(request.POST)
        if form_resource.is_valid():
            form_resource.save()
            return HttpResponseRedirect(reverse(index))
        else:
            logger.debug('Form erros: {}'.format(dict(form_resource.__errors)))
            return render_to_response('resource/edit.html',
                dict(form_resource=form_resource),
                context_instance=RequestContext(request))