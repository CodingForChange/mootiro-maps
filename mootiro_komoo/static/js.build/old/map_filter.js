function checkFilterFormIsReady(e){var t=$("#filter-form"),n=Boolean($("#filter-center",t).val()),r=Boolean($(".geo-objects-listing input",t).serialize()),i=n&&r;return i?$("#filter-submit").addClass("button").removeClass("button-off"):$("#filter-submit").addClass("button-off").removeClass("button"),!1}$("#set-center").click(function(){editor.selectCenter(parseInt($("#filter-radius").val()),function(e,t){$("#filter-center").val(e.toUrlValue()).change(),$("#filter-radius").on("change",function(){var e=parseInt($(this).val());t.setRadius(e)}),$("#filter-helper").hide(),$("#filter-radius").focus()}),$("#filter-slider-container").hide(),$("#filter-radius").parent().removeClass("highlight"),$("#filter-helper").show()}),$("#filter-slider").slider({range:"min",min:100,max:1e4,value:1e3,slide:function(e,t){$("#filter-radius").val(t.value).trigger("change")}}),$("#filter-radius").val($("#filter-slider").slider("value")),$("#filter-radius").on("change",function(){var e=$("#filter-slider").slider("value"),t=parseInt($(this).val()),n=$("#filter-slider").slider("option","min"),r=$("#filter-slider").slider("option","max");isNaN(t)?t=e:t<n?t=n:t>r&&(t=r),$("#filter-radius").val(t),$("#filter-slider").slider("value",t)}),$("#filter-radius").focus(function(){$("#filter-slider-container").show(),$("#filter-radius").parent().addClass("highlight")}),$("#filter-slider-container .icon-ok").on("click",function(){$("#filter-slider-container").hide(),$("#filter-radius").parent().removeClass("highlight")}),$("#filter-back, #filter-results .icon-remove").live("click",function(e){$("#filter-results-container").hide(),$("#filter-form").show()}),$("#filter-center").on("change",checkFilterFormIsReady),$("#filter-form ul.geo-objects-listing").on("click",checkFilterFormIsReady),$("#filter-form").on("submit",function(e){e.preventDefault();var t=$("#filter-form");if($("#filter-submit",t).hasClass("button-off"))return!1;var n=$("input[name=need_categories]").serializeArray().map(function(e){return e.value}).join(","),r="";r+=$("input[name=center], input[name=radius], input[name=communities], input[name=needs], input[name=organizations], input[name=resources]",t).serialize(),r+="&need_categories="+n;var i=dutils.urls.resolve("radial_search");return $.ajax({type:"GET",url:dutils.urls.resolve("radial_search"),data:r}).success(function(e){$("#filter-form").hide(),$("#filter-results-container").show(),$("#filter-results").html(e)}),!1}),$("#filter-results .sublist ul li").live("mouseover",function(e){var t=parseInt($(this).attr("id").match(/[0-9]+$/)[0]);t=parseInt(t);var n=$(this).attr("id").match(/^(.+)-/)[1];editor.highlightFeature(n,t)}),$(function(){geoObjectsListing("#map-panel-filter ul.geo-objects-listing"),geoObjectsListing("#map-panel-layers ul.geo-objects-listing"),geoObjectsListing("#map-panel-add ul.geo-objects-listing")}),$("#map-panel-layers div.img-holder > img").trigger("click"),$("#map-panel-layers div.img-holder input[type=checkbox]").attr("checked","checked"),$("#map-panel-layers .need.sublist").hide(),$("#map-panel-layers > ul > li:not(.needs) div.img-holder > img").bind("click",function(){alert;var e=$(this),t=e.parent(),n=t.attr("data-object-type");n&&($("input[type=checkbox]",t).attr("checked")?editor.showFeaturesByType(n):editor.hideFeaturesByType(n))}),$("#map-panel-layers > ul > li.sublist > ul > li > div.img-holder > img").bind("click",function(){var e=$(this),t=e.parent(),n="Need",r=t.attr("data-original-label"),i=["uncategorized"];$.each($("input:checked",t.parent().parent()).parent(),function(e,t){var n=$(t);n&&i.push(n.attr("data-original-label"))}),$("input[type=checkbox]",t).attr("checked")?editor.showFeaturesByType(n,[r]):editor.hideFeaturesByType(n,[r]),i.length==1?editor.hideFeaturesByType(n,["uncategorized"]):editor.showFeaturesByType(n,i)}),$("#map-panel-add .sublist").hide(),$(function(){var e=$("#map-panel-add .geo-objects-listing > li");$.each(e,function(e,t){var n=$(t),r=n.attr("data-object-type"),i=n.attr("data-geometry-type");i;if(n.hasClass("sublist")){var s=$(".add",n);$.each(s,function(e,t){var n=$(t),i=n.attr("data-geometry-type");n.click(function(e){if(editor.addPanel.is(":visible"))return;editor.setDrawingMode(r,i),$("#map-panel-add .selected").removeClass("selected"),n.addClass("selected")})})}})});