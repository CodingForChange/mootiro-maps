(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, Backbone, Base, Editor, Preview, app, mapElementCache, mixins, _;
    $ = require('jquery');
    _ = require('underscore');
    Backbone = require('backbone');
    app = require('app');
    mixins = require('core/mixins');
    require('map.jquery');
    mapElementCache = {};
    Base = (function(_super) {

      __extends(Base, _super);

      function Base() {
        Base.__super__.constructor.apply(this, arguments);
      }

      Base.prototype.initialize = function() {
        var _ref, _ref2, _ref3, _ref4, _ref5, _ref6,
          _this = this;
        window.d = this;
        this.listenTo(app, 'error', this.onError);
        if (this.mapData == null) {
          this.mapData = {
            type: this.type
          };
        }
        ({
          mapType: 'roadmap',
          zoom: (_ref = this.options.zoom) != null ? _ref : 16,
          geojson: (_ref2 = (_ref3 = this.options.geojson) != null ? _ref3 : (_ref4 = this.model) != null ? _ref4.get('geojson') : void 0) != null ? _ref2 : {},
          width: (_ref5 = this.options.width) != null ? _ref5 : '100%',
          height: (_ref6 = this.options.height) != null ? _ref6 : '100%'
        });
        if (mapElementCache[this.type] != null) {
          this.mapElement = mapElementCache[this.type];
          this.loaded = true;
        } else {
          this.mapElement = $('<div>');
          this.loaded = false;
        }
        this.mapElement.on('initialized', function() {
          if (typeof _this.handleMapEvents === "function") _this.handleMapEvents();
          return _this.trigger('initialize');
        });
        this.render();
        return window.pm = this;
      };

      Base.prototype.render = function() {
        var _this = this;
        this.mapElement.detach();
        this.$el.html("<div class=\"loading\">" + (i18n('Loading...')) + "</div>");
        this.mapElement.one('initialized', function(e) {
          _this.mapElement.fadeTo(0, 0);
          _this.$el.empty().css({
            height: '100%'
          }).append(_this.mapElement);
          _this.center().fadeTo(100, 1);
          mapElementCache[_this.type] = _this.mapElement;
          _this.loaded = true;
          if (_this.mode != null) return _this.setMode(_this.mode);
        });
        if (!this.loaded) {
          this.mapElement.komooMap(this.mapData);
        } else {
          this.$el.empty().css({
            height: '100%'
          }).append(this.mapElement);
          this.load(this.model);
        }
        return this;
      };

      Base.prototype.onError = function(err) {
        if (!this.loaded && err.message.indexOf('goog!maps' > -1)) {
          return this.$el.html("<div class=\"loading\">" + (i18n('Map unavailable!')) + "</div>");
        }
      };

      Base.prototype.onOpen = function() {
        return this.refresh();
      };

      Base.prototype.remove = function() {
        this.mapElement.detach().unbind();
        this.mapElement.komooMap('clear');
        this.stopListening();
        return Base.__super__.remove.apply(this, arguments);
      };

      Base.prototype.refresh = function() {
        return this.mapElement.komooMap('refresh');
      };

      Base.prototype.center = function() {
        var map;
        map = this.getMap();
        this.refresh();
        return this.mapElement.komooMap('center');
      };

      Base.prototype.load = function(model) {
        var _this = this;
        this.model = model;
        if (!(this.model != null)) return;
        this.mapElement.one('features_loaded', function(e) {
          return _this.center();
        });
        return this.mapElement.komooMap('geojson', this.model.get('geojson'));
      };

      Base.prototype.clear = function() {
        var _ref;
        return (_ref = this.getMap()) != null ? _ref.clear() : void 0;
      };

      Base.prototype.getMap = function() {
        return this.mapElement.data('map');
      };

      return Base;

    })(Backbone.View);
    Preview = (function(_super) {

      __extends(Preview, _super);

      function Preview() {
        Preview.__super__.constructor.apply(this, arguments);
      }

      _.extend(Preview.prototype, mixins.EditOverlayMixin);

      Preview.prototype.type = 'preview';

      Preview.prototype.events = {
        'click .overlay > .edit': 'edit'
      };

      Preview.prototype.initialize = function() {
        var _ref, _ref2, _ref3, _ref4;
        this.overlayText = (_ref = this.options.overlayText) != null ? _ref : i18n('Edit');
        this.listenTo(this.model, 'change', this._reloadModel);
        this.mapData = {
          type: this.type,
          mapType: 'roadmap',
          zoom: (_ref2 = this.options.zoom) != null ? _ref2 : 16,
          geojson: this.model.get('geojson'),
          width: (_ref3 = this.options.width) != null ? _ref3 : '100%',
          height: (_ref4 = this.options.height) != null ? _ref4 : '100%'
        };
        return Preview.__super__.initialize.apply(this, arguments);
      };

      Preview.prototype._reloadModel = function() {
        this.clear();
        return this.load(this.model);
      };

      Preview.prototype.load = function() {
        this.clear();
        return Preview.__super__.load.apply(this, arguments);
      };

      Preview.prototype.edit = function(e) {
        e.preventDefault();
        return app.editGeometry(this.model);
      };

      return Preview;

    })(Base);
    Editor = (function(_super) {

      __extends(Editor, _super);

      function Editor() {
        Editor.__super__.constructor.apply(this, arguments);
      }

      Editor.prototype.type = 'main';

      Editor.prototype.initialize = function() {
        var _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
        this.mapData = {
          type: this.type,
          mapType: 'roadmap',
          zoom: (_ref = this.options.zoom) != null ? _ref : 16,
          geojson: (_ref2 = (_ref3 = this.options.geojson) != null ? _ref3 : (_ref4 = this.model) != null ? _ref4.get('geojson') : void 0) != null ? _ref2 : {},
          width: (_ref5 = this.options.width) != null ? _ref5 : '100%',
          height: (_ref6 = this.options.height) != null ? _ref6 : '100%'
        };
        return Editor.__super__.initialize.apply(this, arguments);
      };

      Editor.prototype.handleMapEvents = function() {
        var map,
          _this = this;
        map = this.getMap();
        return map.subscribe('drawing_finished', function(feature, toSave) {
          if (toSave) {
            return _this._onSave(feature);
          } else {
            return _this._onCancel(feature);
          }
        });
      };

      Editor.prototype._onCancel = function(feature) {
        return this.trigger('cancel');
      };

      Editor.prototype._onSave = function(feature) {
        return this.trigger('save', feature.getGeoJson());
      };

      Editor.prototype.edit = function(model) {
        if (model != null) this.load(model);
        return this.getMap().editFeature();
      };

      return Editor;

    })(Base);
    return {
      Preview: Preview,
      Editor: Editor
    };
  });

}).call(this);
