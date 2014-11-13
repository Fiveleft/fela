// categoryCollection.js
define(
  ['backbone','app/models/category'], 
  function( Backbone, CategoryModel ){

    var disciplinesID = -1,
      technologiesID = -1,
      toolsID = -1;


    var CategoryCollection = Backbone.Collection.extend({

      model : CategoryModel,

      initialize : function(){

        this._disciplines = [];
        this._technologies = [];
        this._tools = [];
      },

      _getCategoryID : function( name ) {
        var cat = this.findWhere({slug : name});
        return cat ? cat.id : -1;
      },

      getTools : function(){
        if( !this._tools.length ) {
          toolsID = (toolsID<0) ? this._getCategoryID("tools") : toolsID;
          this._tools = this.where( {parent : toolsID} );
        }
        return this._tools;
      },

      getDisiciplines : function(){
        if( !this._disciplines.length ) {
          disciplinesID = (disciplinesID<0) ? this._getCategoryID("discipline") : disciplinesID;
          this._disciplines = this.where( {parent : disciplinesID} );
        }
        return this._disciplines;
      },

      getTechnologies : function(){
        if( !this._technologies.length ) {
          technologiesID = (technologiesID<0) ? this._getCategoryID("technology") : technologiesID;
          this._technologies = this.where( {parent : technologiesID} );
        }
        return this._technologies;
      }
    });
    return CategoryCollection;
  });