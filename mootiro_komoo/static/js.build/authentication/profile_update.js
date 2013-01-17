(function(){var e;e=jQuery,window.Signature=Backbone.Model.extend({imageName:function(){var e;return this.model_name==="organizationbranch"?e="organization":e=this.model_name,"/static/img/updates-page/"+e+"-feed.png"},toJSON:function(e){var t;return t=Backbone.Model.prototype.toJSON.call(this,e),_.extend(t,{imageName:this.imageName})},deleteSignature:function(){var t;if(confirm(gettext("Are you sure you want to delete your signature for this object?")))return t=this,e.post(dutils.urls.resolve("signature_delete"),{id:this.get("signature_id")},function(e){return t.trigger("deleteSignature",t)},"json")}}),window.SignatureView=Backbone.View.extend({className:"signature",events:{"click .cancel-subscription-btn":"cancelSubscription"},initialize:function(){return _.bindAll(this,"render","cancelSubscription","remove"),this.template=_.template(e("#signature-template").html()),this.model.bind("deleteSignature",this.remove)},render:function(){var t;return t=this.template(this.model.toJSON()),e(this.el).html(t),this},cancelSubscription:function(){return this.model.deleteSignature(),this},remove:function(){return e(this.el).slideUp(300,function(){return e(this).remove()}),this}}),window.SignaturesList=Backbone.Collection.extend({model:Signature}),window.SignaturesListView=Backbone.View.extend({events:{"click #signatures-manage-btn":"digestOptions","click #digest-options-save":"digestOptionsSave"},initialize:function(){return _.bindAll(this,"render","digestOptions"),this.template=_.template(e("#signatures-list-collection").html()),this.collection.bind("reset",this.render)},render:function(){var t,n,r;return e(this.el).html(this.template({})),t=this.$(".signatures-list"),this.digestModal=this.$("#digest-options-modal"),this.digestForm=this.$("#form-digest"),n=this.collection,n.each(function(e){var n;return n=new SignatureView({model:e}),t.append(n.render().el)}),r=this,this.digestForm.ajaxform({clean:!1,onSuccess:function(){return r.digestModal.modal("hide")}}),this},digestOptions:function(){return this.digestModal.modal("show"),this},digestOptionsSave:function(){return this.digestForm.submit()}}),e(function(){var t,n;return e("#form-profile").ajaxform({clean:!1,onSuccess:function(t){var n,r,i;return n=e(".form-message-box"),n.length&&n.remove(),r=_.template(e("#form-message-box").html()),i=r({msg:gettext("Seus dados públicos foram salvos com sucesso!")}),e("#form-profile .form-actions").before(i),e("#form-profile .alert").fadeIn(),!1}}),e("#form-profile").komooFormHintBoxes({contact:{hint:"Este Contanto ficará visível para outros usuários do MootiroMaps!",top:"30%"}}),e(".alert .close").live("click",function(){return e(this).parent().slideUp()}),e("#form-personal").ajaxform({clean:!1,onSuccess:function(t){var n,r,i;return n=e(".form-message-box"),n.length&&n.remove(),r=_.template(e("#form-message-box").html()),i=r({msg:gettext("Seus dados pessoais foram salvos com sucesso!")}),e("#form-personal .form-actions").before(i),e("#form-personal .alert").fadeIn(),!1}}),t=new SignaturesList,t.reset(window.KomooNS.signatures),n=new SignaturesListView({collection:t}),e(".signatures-list-wrapper").append(n.render().el)})}).call(this)