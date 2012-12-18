define (require) ->
  'use strict'

  _ = require 'underscore'
  Backbone = require 'backbone'

  pages = require('./pages')

  class UserRouter extends Backbone.Router
    routes:
      'user(/)': 'user'
      'user/:id(/)': 'profile'

    initialize: ->
      _.bindAll this
      @bindExternalEvents()

    bindExternalEvents: ->
      Backbone.on 'user::profile', @profile

    goTo: (page, args...) ->
      page.render(args)
      .fail (e) ->
        Backbone.trigger 'main::error', e.status, e.statusText

    user: ->
      if not KomooNS?.isAuthenticated
        url = window.location
        if url.search and url.search.indexOf('next') > -1
          # get search parameters into a object
          queryString = {}
          url.search.replace new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            ($0, $1, $2, $3) -> queryString[$1] = $3
          next = queryString['next']
        Backbone.trigger 'auth::loginRequired', next

    profile: (id) ->
      @goTo pages.profile, id
      @navigate "user/#{id}"


  new UserRouter()