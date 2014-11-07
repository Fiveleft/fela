define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["page-content"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- page-content.hbs -->\n<div class=\"page-content page-content-"
    + escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug","hash":{},"data":data}) : helper)))
    + "\">\n  <h1 class=\"content-title\">";
  stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</h1>\n  ";
  stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"useData":true});



this["JST"]["partnership-item"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<a class=\"partner-link\" href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.website : stack1), depth0))
    + "\" target=\"_blank\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n<i class=\"icon\"></i><span class=\"label\">";
  stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n</a>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<span class=\"partner-link\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">";
  stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.website : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["JST"]["project-grid-item"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "        <h2 class=\"subtitle\">";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.subtitle : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</h2>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<a href=\"/project/"
    + escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug","hash":{},"data":data}) : helper)))
    + "\" class=\"project-item\" data-index=\""
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "\" >\n  <span class=\"project-grid-item-inner\">\n    <span class=\"media\">\n      <span class=\"media-inner\">\n        <span class=\"media-content\" style=\"background-image: url('"
    + escapeExpression(((helper = (helper = helpers.gridImage || (depth0 != null ? depth0.gridImage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"gridImage","hash":{},"data":data}) : helper)))
    + "');\">\n          <!-- <img class=\"thumbnail\" src=\""
    + escapeExpression(((helper = (helper = helpers.gridImage || (depth0 != null ? depth0.gridImage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"gridImage","hash":{},"data":data}) : helper)))
    + "\" /> -->\n        </span>   \n        <span class=\"media-hover\"></span>             \n        <span class=\"media-active icon\"></span>             \n      </span>\n    </span>\n    <span class=\"info\">\n      <span class=\"info-inner\">\n        <h1 class=\"title\">";
  stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</h1>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.subtitle : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </span>\n    </span>\n  </span>\n</a>";
},"useData":true});



this["JST"]["project-item"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <div class=\"media-container gallery\">\n          <ul class=\"gallery-list\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.gallery : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </ul>\n        </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <li class=\"gallery-item\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n              <span class=\"placeholder\" data-src=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\"></span>\n            </li>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <div class=\"media-container video\">\n          <video ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.poster : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " preload=\"load\" loop=\"loop\">\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.source : stack1)) != null ? stack1.mp4 : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.source : stack1)) != null ? stack1.ogg : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.source : stack1)) != null ? stack1.webm : stack1), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n          </video>\n        </div>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "poster=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.poster : stack1)) != null ? stack1.url : stack1), depth0))
    + "\"";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<source src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.source : stack1)) != null ? stack1.mp4 : stack1), depth0))
    + "\" type=\"video/mp4\" />";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<source src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.source : stack1)) != null ? stack1.ogg : stack1), depth0))
    + "\" type=\"video/ogg\" />";
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<source src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.video : depth0)) != null ? stack1.source : stack1)) != null ? stack1.webm : stack1), depth0))
    + "\" type=\"video/webm\" />";
},"13":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "      <h2 class=\"subtitle\">";
  stack1 = ((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subtitle","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</h2>\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, buffer = "          <span class=\"participant-info client\">\n            <span class=\"info-label\">Client:&nbsp;</span>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.client : stack1)) != null ? stack1.info : stack1)) != null ? stack1.website : stack1), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </span>\n";
},"16":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <a class=\"info-name\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.client : depth0)) != null ? stack1.info : stack1)) != null ? stack1.website : stack1), depth0))
    + "\">";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.client : stack1)) != null ? stack1.title : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "            <span class=\"info-name\">";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.client : stack1)) != null ? stack1.title : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"20":function(depth0,helpers,partials,data) {
  var stack1, buffer = "          <span class=\"separator\">/</span>\n          <span class=\"participant-info agency\">\n            <span class=\"info-label\">Agency:&nbsp;</span>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.agency : stack1)) != null ? stack1.info : stack1)) != null ? stack1.website : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </span>\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <a class=\"info-name\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.agency : depth0)) != null ? stack1.info : stack1)) != null ? stack1.website : stack1), depth0))
    + "\">";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.agency : stack1)) != null ? stack1.title : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "            <span class=\"info-name\">";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.agency : stack1)) != null ? stack1.title : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, buffer = "          <span class=\"separator\">/</span>\n          <span class=\"taxonomy disciplines\">\n            <span class=\"info-label\">Disciplines: </span>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.disciplines : depth0), {"name":"each","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </span>\n";
},"26":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "            <span class=\"taxonomy-item\" data-term-\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n              <span class=\"label\">";
  stack1 = ((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span><span class=\"separator\">,</span>\n            </span>\n";
},"28":function(depth0,helpers,partials,data) {
  var stack1, buffer = "          <span class=\"separator\">/</span>\n          <span class=\"taxonomy technologies\">\n            <span class=\"info-label\">Technology: </span>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.technologies : depth0), {"name":"each","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </span>\n";
},"30":function(depth0,helpers,partials,data) {
  var stack1, buffer = "          <span class=\"separator\">/</span>\n          <span class=\"taxonomy tools\">\n            <span class=\"info-label\">Tools: </span>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.tools : depth0), {"name":"each","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </span>\n";
},"32":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "          <span class=\"separator\">/</span>\n          <span class=\"participant-info site\">\n            <a class=\"project-link info-name\" href=\""
    + escapeExpression(((helper = (helper = helpers.website || (depth0 != null ? depth0.website : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"website","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" title=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">View Site</a>\n          </span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"project\" data-slug=\""
    + escapeExpression(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug","hash":{},"data":data}) : helper)))
    + "\" >\n  <div class=\"project-inner\">\n    <div class=\"media\">\n      <div class=\"media-inner\">\n        <a href=\"#\" class=\"media-controls\">\n          <span class=\"inner\">\n            <i class=\"icon play\">Play</i>\n            <i class=\"icon pause\">Pause</i>\n          </span>\n        </a> \n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.gallery : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.video : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </div>\n      <a class=\"close\" href=\"\"><i class=\"icon\">Close</i></a>\n    </div>\n    <div class=\"info\">\n      <h1 class=\"title\">";
  stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.subtitle : depth0), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <div class=\"details\">\n        <p class=\"project-content\">";
  stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</p>\n        <p class=\"additional\">\n          \n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.client : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          \n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.agency : stack1), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          \n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.disciplines : depth0), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          \n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.technologies : depth0), {"name":"if","hash":{},"fn":this.program(28, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          \n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tools : depth0), {"name":"if","hash":{},"fn":this.program(30, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.website : depth0), {"name":"if","hash":{},"fn":this.program(32, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </p>\n        <!--\n        <a class=\"next project-advance\" href=\"#\">\n          <span class=\"label\">Next Project</span>\n          <span class=\"title-wrapper\"><span class=\"project-title\">{project title}</span></span>\n          <i class=\"icon\"></i>\n        </a>\n        -->\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});

return this["JST"];

});