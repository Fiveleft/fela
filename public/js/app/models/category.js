// model/category.js
define(
  ["backbone"],
  function(){
    var CategoryModel = Backbone.Model.extend({
      initialize: function() {
        this.name = this.attributes.title;
      }
    });
    return CategoryModel;
  });
