define (require) ->

  $ = require 'jquery'
  _ = require 'underscore'
  Backbone = require 'backbone'

  app = require 'app'
  mixins = require 'core/mixins'
  require 'map.jquery'

  mapElementCache = {}
  class Base extends Backbone.View
    initialize: ->
      window.d = this
      @listenTo app, 'error', @onError

      @mapData ?=
        type: @type
        mapType: 'roadmap'
        zoom: @options.zoom ? 16
        geojson: @options.geojson ? @model?.get('geojson') ? {}
        width: @options.width ? '100%'
        height: @options.height ? '100%'

      if mapElementCache[@type]?
        @mapElement = mapElementCache[@type]
        @loaded = true
      else
        @mapElement = $('<div>')
        @loaded = false
      @mapElement.on 'initialized', =>
        @handleMapEvents?()
        @trigger 'initialize'
      @render()
      window.pm = this

    render: ->
      @mapElement.detach()
      @$el.html """<div class="loading">#{i18n('Loading...')}</div>"""

      @mapElement.one 'initialized', (e) =>
        @mapElement.fadeTo 0, 0
        @$el.empty().css(height: '100%').append @mapElement
        @center().fadeTo 100, 1
        mapElementCache[@type] = @mapElement
        @loaded = true
        @setMode @mode if @mode?

      if not @loaded
        @mapElement.komooMap @mapData
      else
        @$el.empty().css(height: '100%').append @mapElement
        @load @model

      this

    onError: (err) ->
      if not @loaded and err.message.indexOf 'goog!maps' > -1
        @$el.html """<div class="loading">#{i18n('Map unavailable!')}</div>"""

    onOpen: ->
      @refresh()

    remove: ->
      @mapElement.detach().unbind()
      @mapElement.komooMap('clear')
      @stopListening()
      super

    refresh: ->
      @mapElement.komooMap('refresh')

    center: ->
      map = @getMap()
      @refresh()
      @mapElement.komooMap('center')

    load: (@model) ->
      return if not @model?
      @mapElement.one 'features_loaded', (e) => @center()
      @mapElement.komooMap('geojson', @model.get('geojson'))

    clear: ->
      @getMap()?.clear()

    getMap: ->
      @mapElement.data('map')


  class Preview extends Base
    _.extend @prototype, mixins.EditOverlayMixin
    type: 'preview'
    events:
      'click .overlay > .edit': 'edit'

    initialize: ->
      @overlayText = @options.overlayText ? i18n 'Edit'
      @listenTo @model, 'change', @_reloadModel
      @mapData =
        type: @type
        mapType: 'roadmap'
        zoom: @options.zoom ? 16
        geojson: @model.get('geojson')
        width: @options.width ? '100%'
        height: @options.height ? '100%'
      super

    _reloadModel: ->
      @clear()
      @load(@model)

    load: ->
      @clear()
      super

    edit: (e) ->
      e.preventDefault()
      app.editGeometry @model


  class Editor extends Base
    type: 'main'
    initialize: ->
      @mapData =
        type: @type
        mapType: 'roadmap'
        zoom: @options.zoom ? 16
        geojson: @options.geojson ? @model?.get('geojson') ? {}
        width: @options.width ? '100%'
        height: @options.height ? '100%'
      super

    handleMapEvents: ->
      map = @getMap()
      map.subscribe 'drawing_finished', (feature, toSave) =>
        if toSave
          @_onSave feature
        else
          @_onCancel feature

    _onCancel: (feature) ->
      @trigger 'cancel'

    _onSave: (feature) ->
      @trigger 'save', feature.getGeoJson()

    edit: (model) ->
      @load model if model?
      @getMap().editFeature()


  return {
      Preview: Preview
      Editor: Editor
  }
