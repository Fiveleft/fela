define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["page-content"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- page-content.hbs -->\n<div class=\"page-content page-content-"
    + escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug","hash":{},"data":data}) : helper)))
    + "\">\n  <h1 class=\"content-title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n  ";
  stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"useData":true});



this["JST"]["partnership-item"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "<a class=\"partner-link\" href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.website : stack1), depth0))
    + "\" target=\"_blank\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n<i class=\"icon\"></i><span class=\"label\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n</a>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<span class=\"partner-link\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.website : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["JST"]["project-grid-item"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <h2 class=\"subtitle\">"
    + escapeExpression(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</h2>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<a href=\"/project/"
    + escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug","hash":{},"data":data}) : helper)))
    + "\" class=\"project-grid-item\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-index=\""
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "\" >\n  <span class=\"project-grid-item-inner\">\n    <span class=\"media\">\n      <span class=\"media-inner\">\n        <span class=\"media-content\">\n          <img class=\"thumbnail\" src=\""
    + escapeExpression(((helper = (helper = helpers.gridImage || (depth0 != null ? depth0.gridImage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"gridImage","hash":{},"data":data}) : helper)))
    + "\" />\n        </span>   \n        <span class=\"media-hover\"></span>             \n        <span class=\"media-active icon\"></span>             \n      </span>\n    </span>\n    <span class=\"info\">\n      <h1 class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.subtitle : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </span>\n  </span>\n</a>";
},"useData":true});



this["JST"]["project-item"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <article id=\"project-"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"project\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" >\n        <div class=\"project-inner\">\n            <div class=\"media\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.media : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n                <div class=\"media-inner\">\n                    <a href=\"#\" class=\"media-controls\">\n                        <span class=\"inner\">\n                            <i class=\"icon play\">Play</i>\n                            <i class=\"icon pause\">Pause</i>\n                        </span>\n                    </a> \n                    <div class=\"media-container\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.gallery : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.video : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </div>\n                </div>\n                <a class=\"close\" href=\"#\"><i class=\"icon\">Close</i></a>\n            </div>\n            <div class=\"info\">\n                <h1 class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.subtitle : depth0), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                <div class=\"details\">\n                    <p class=\"project-detail description\">"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n                    <p class=\"project-detail additional\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.client : depth0), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.agency : depth0), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.discipline : depth0), {"name":"if","hash":{},"fn":this.program(22, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.technology : depth0), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.website : stack1), {"name":"if","hash":{},"fn":this.program(28, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </p>\n                    <a class=\"next project-advance\" href=\"#\">\n                        <span class=\"label\">Next Project</span>\n                        <span class=\"title-wrapper\"><span class=\"project-title\">{project title}</span></span>\n                        <i class=\"icon\"></i>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </article>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "data-media=\""
    + escapeExpression(((helper = (helper = helpers.media || (depth0 != null ? depth0.media : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"media","hash":{},"data":data}) : helper)))
    + "\"";
},"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "                        <ul class=\"gallery-list\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.gallery : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                        </ul>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            <li class=\"gallery-item\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\"><span class=\"placeholder\" data-src=\""
    + escapeExpression(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"src","hash":{},"data":data}) : helper)))
    + "\"></span></li>\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, buffer = "                        <video class=\"video\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.poster : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " preload=\"load\" loop=\"loop\">\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.mp4 : stack1), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.ogg : stack1), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.webm : stack1), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n                        </video>\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "poster=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.poster : stack1)) != null ? stack1.src : stack1), depth0))
    + "\"";
},"10":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<source src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.mp4 : stack1), depth0))
    + "\" type=\"video/mp4\" />";
},"12":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<source src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.ogg : stack1), depth0))
    + "\" type=\"video/ogg\" />";
},"14":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<source src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.webm : stack1), depth0))
    + "\" type=\"video/webm\" />";
},"16":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <h2 class=\"subtitle\">"
    + escapeExpression(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</h2>\n";
},"18":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <span class=\"participant-info client\">\n                            <span class=\"info-label\">Client: </span> <!--\n                         --><a class=\"client-name info-name\" href=\"/client/"
    + escapeExpression(((helper = (helper = helpers.clientId || (depth0 != null ? depth0.clientId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"clientId","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.client || (depth0 != null ? depth0.client : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"client","hash":{},"data":data}) : helper)))
    + "</a>\n                        </span>\n";
},"20":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <span class=\"separator\">/</span>\n                        <span class=\"participant-info agency\">\n                            <span class=\"info-label\">Agency: </span> <!--\n                         --><a class=\"agency-name info-name\" href=\"/agency/"
    + escapeExpression(((helper = (helper = helpers.agencyId || (depth0 != null ? depth0.agencyId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"agencyId","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.agency || (depth0 != null ? depth0.agency : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"agency","hash":{},"data":data}) : helper)))
    + "</a>\n                        </span>\n";
},"22":function(depth0,helpers,partials,data) {
  var stack1, buffer = "                        <span class=\"separator\">/</span>\n                        <span class=\"disciplines\">\n                            <span class=\"taxonomy-label info-label\">Disciplines: </span>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.discipline : depth0), {"name":"each","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                        </span>\n";
},"23":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            <span class=\"discipline taxonomy term-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" >\n                                <span class=\"label\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span><span class=\"separator\">,</span>\n                            </span>\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, buffer = "                        <span class=\"separator\">/</span>\n                        <span class=\"technologies\">\n                            <span class=\"taxonomy-label info-label\">Technology: </span>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.technology : depth0), {"name":"each","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                        </span>\n";
},"26":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            <span class=\"technology taxonomy term-"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" >\n                                <span class=\"label\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span><span class=\"separator\">,</span>\n                            </span>\n";
},"28":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                        <span class=\"separator\">/</span>\n                        <span class=\"participant-info site\">\n                            <a class=\"project-link info-name\" href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.website : stack1), depth0))
    + "\" target=\"_blank\" title=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">View Site</a>\n                        </span>\n";
},"30":function(depth0,helpers,partials,data) {
  return "    <article class=\"project unknown-project\">\n        <div class=\"project-inner\">\n            <div class=\"info\">\n                <h1 class=\"title\">Project not found</h1>\n            </div>\n        </div>\n    </article>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(30, data),"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});

return this["JST"];

});