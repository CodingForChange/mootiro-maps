(function() {

  define(function(require) {
    'use strict';
    var $, Page, PageManager, _;
    $ = require('jquery');
    _ = require('underscore');
    Page = (function() {

      Page.prototype.actionBar = null;

      Page.prototype.sidebar = null;

      Page.prototype.mainContent = null;

      function Page(views) {
        if (views == null) views = {};
        this.actionBar = views.actionBar;
        this.sidebar = views.sidebar;
        this.mainContent = views.mainContent;
      }

      Page.prototype.open = function() {
        var onOpen, _ref, _ref2, _ref3;
        $('#action-bar').append((_ref = this.actionBar) != null ? _ref.$el : void 0);
        $('#sidebar').append((_ref2 = this.sidebar) != null ? _ref2.$el : void 0);
        $('#main-content').append((_ref3 = this.mainContent) != null ? _ref3.$el : void 0);
        onOpen = function(view) {
          if (!view) return;
          if (view.subViews) _.each(view.subViews, onOpen);
          return typeof view.onOpen === "function" ? view.onOpen() : void 0;
        };
        return _([this.actionBar, this.sidebar, this.mainContent]).each(onOpen);
      };

      Page.prototype.canClose = function() {
        var _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
        return (_ref = ((_ref2 = ((_ref3 = (_ref4 = this.actionBar) != null ? typeof _ref4.canClose === "function" ? _ref4.canClose() : void 0 : void 0) != null ? _ref3 : true) && ((_ref5 = this.sidebar) != null ? typeof _ref5.conClose === "function" ? _ref5.conClose() : void 0 : void 0)) != null ? _ref2 : true) && ((_ref6 = this.mainContent) != null ? typeof _ref6.canClose === "function" ? _ref6.canClose() : void 0 : void 0)) != null ? _ref : true;
      };

      Page.prototype.close = function() {
        var clear;
        clear = function(view) {
          if (!view) return;
          if (view.subViews) {
            _.each(view.subViews, clear);
            delete view.subViews;
            _.each(view.instances, clear);
            delete view.instances;
          }
          if (typeof view.onClose === "function") view.onClose();
          view.unbind();
          view.remove();
          delete view.$el;
          delete view.el;
          delete view.model;
          return delete view.collection;
        };
        return _([this.actionBar, this.sidebar, this.mainContent]).each(clear);
      };

      return Page;

    })();
    PageManager = (function() {

      function PageManager() {}

      PageManager.prototype.Page = Page;

      PageManager.prototype.currentPage = null;

      PageManager.prototype.canClose = function() {
        var dfd, _ref, _ref2;
        dfd = new $.Deferred();
        if ((_ref = (_ref2 = this.currentPage) != null ? typeof _ref2.canClose === "function" ? _ref2.canClose() : void 0 : void 0) != null ? _ref : true) {
          dfd.resolve();
        } else {
          if (window.confirm("You haven't saved your changes yet. Do you want to leave without finishing?")) {
            dfd.resolve();
          } else {
            dfd.reject();
          }
        }
        return dfd.promise();
      };

      PageManager.prototype.open = function(page) {
        if (!page || page === this.currentPage) return;
        this.close(this.currentPage);
        this.currentPage = page;
        return this.currentPage.open();
      };

      PageManager.prototype.close = function(page) {
        if (!page) return;
        page.close();
        if (this.currentPage === page) return this.currentPage = null;
      };

      return PageManager;

    })();
    return new PageManager();
  });

}).call(this);
