var Project,
  ProjectCollection,
  ProjectView,
  ProjectCollectionView,
  Client,
  ClientCollection,
  ClientView,
  ClientCollectionView,
  Agency,
  AgencyCollection,
  AgencyView,
  AgencyCollectionView,
  Page,
  PageCollection,
  PageView;


// Application Models
Project = Backbone.Model.extend({
  // idAttribute: "ID",
  initialize: function() {
    // console.log( this.attributes );
    // this.attributes.info = this.get("post_meta").info;
    // this.attributes.subtitle = this.attributes.info.subtitle || false;
    // this.attributes.gridImage = this.get("featured_image").attachment_meta.file || false;
  }
});
Client = Backbone.Model.extend({
  // idAttribute: "ID",
  initialize: function() {
    this.attributes.partner = "Client";
    // this.attributes.info = JSON.parse(this.attributes.custom_fields._meta);
    // console.log( JSON.parse(this.attributes.custom_fields._meta) );
    var jstr, jprse;
    jstr = JSON.stringify( this.attributes.custom_fields._meta );
    jprse = JSON.parse( jstr );
    jobj = $.parseJSON( jprse[0] );
    console.log( jobj );
    // console.log( jprse );

  }
});
Agency = Backbone.Model.extend({
  // idAttribute: "ID",
  initialize: function() {
    this.attributes.partner = "Agency";
  }
});
Page = Backbone.Model.extend({
  idAttribute: "ID"
});

// Application Model Collections
ProjectCollection = Backbone.Collection.extend({
  model: Project,
  url: "/api/projects"
});
ClientCollection = Backbone.Collection.extend({
  model: Client,
  url: "/api/clients"
});
AgencyCollection = Backbone.Collection.extend({
  model: Agency,
  url: "/api/agencies"
});
PageCollection = Backbone.Collection.extend({
  model: Agency,
  url: "/api/sitepages"
});




ProjectView = Backbone.View.extend({
  tagName: "li",
  className: "project-item",
  render: function() {
    var template = $("#projecttemplate").html(),
        compiled = Handlebars.compile(template),
        html = compiled(this.model.attributes);

// console.log( $.parseJSON( JSON.stringify(this.model.attributes.custom_fields._meta) ) );

    this.$el.html( html );
    return this;
  }
});
ProjectCollectionView = Backbone.View.extend({
  render: function() {
    this.collection.each( function( project ){
      var projectView = new ProjectView({ model:project });
      this.$el.append( projectView.render().el );
    }, this);
    return this;
  }
});



ClientView = Backbone.View.extend({
  tagName: "li",
  className: "client-item",
  render: function() {
    var template = $("#partnertemplate").html(),
        compiled = Handlebars.compile(template),
        html = compiled(this.model.attributes);
    this.$el.html( html );
    return this;
  }
});
ClientCollectionView = Backbone.View.extend({
  render: function() {
    this.collection.each( function( client ){
      var clientView = new ClientView({ model:client });
      this.$el.append( clientView.render().el );
    }, this);
    return this;
  }
});

AgencyView = Backbone.View.extend({
  tagName: "li",
  className: "agency-item",
  render: function() {
    var template = $("#partnertemplate").html(),
        compiled = Handlebars.compile(template),
        html = compiled(this.model.attributes);
    this.$el.html( html );
    return this;
  }
});
AgencyCollectionView = Backbone.View.extend({
  render: function() {
    this.collection.each( function( agency ){
      var agencyView = new AgencyView({ model:agency });
      this.$el.append( agencyView.render().el );
    }, this);
    return this;
  }
});

