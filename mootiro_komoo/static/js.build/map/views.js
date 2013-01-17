(function(){var e=Object.prototype.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["require","jquery","underscore","backbone","text!templates/map/_searchbox.html","map.jquery"],function(e){var n,r,i,s,o,u;return n=e("jquery"),u=e("underscore"),r=e("backbone"),s=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.events={"click .search":"onSearchBtnClick","change .location-type":"onTypeChange"},r.prototype.initialize=function(){return this.template=u.template(e("text!templates/map/_searchbox.html"))},r.prototype.render=function(){var e;return e=this.template(),this.$el.html(e),this},r.prototype.onTypeChange=function(){var e;return e=this.$(".location-type").val(),e==="address"?(this.$(".latLng-container").hide(),this.$(".address-container").show()):(this.$(".address-container").hide(),this.$(".latLng-container").show())},r.prototype.onSearchBtnClick=function(){var e,t;return t=this.$(".location-type").val(),e=t==="address"?this.$(".address").val():[parseFloat(this.$(".lat").val().replace(",",".")),parseFloat(this.$(".lng").val().replace(",","."))],this.search(t,e),!1},r.prototype.search=function(e,t){return e==null&&(e="address"),this.trigger("search",{type:e,position:t}),this},r}(r.View),o=null,e("map.jquery"),i=function(e){function i(){i.__super__.constructor.apply(this,arguments)}return t(i,e),i.prototype.initialize=function(){return u.bindAll(this),this.listenTo(r,"module::error",this.onError),o?(this.map=o,this.loaded=!0):(this.map=n("<div>"),this.loaded=!1),this.render(),window.pm=this},i.prototype.onError=function(e){if(!this.loaded&&e.message.indexOf(!1))return this.$el.html('<div class="loading">'+i18n("Map unavailable!")+"</div>")},i.prototype.onOpen=function(){return this.refresh()},i.prototype.remove=function(){return this.map.detach().unbind(),this.map.komooMap("clear"),this.stopListening(),i.__super__.remove.apply(this,arguments)},i.prototype.refresh=function(){return this.map.komooMap("refresh").komooMap("center")},i.prototype.render=function(){var e,t,n=this;return this.map.detach(),this.$el.html('<div class="loading">'+i18n("Loading...")+"</div>"),this.map.one("features_loaded",function(e){return n.map.fadeTo(0,0),n.$el.empty().css({height:"100%"}).append(n.map),n.refresh().fadeTo(100,1),o=n.map,n.loaded=!0}),this.loaded?this.map.komooMap("geojson",this.model.get("geojson")):this.map.komooMap({type:"preview",mapType:"roadmap",zoom:16,geojson:this.model.get("geojson"),width:(e=this.options.width)!=null?e:"244px",height:(t=this.options.height)!=null?t:"150px"}),this},i}(r.View),{internal:{SearchBoxView:s},Preview:i}})}).call(this);