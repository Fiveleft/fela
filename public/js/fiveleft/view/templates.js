this["fiveleft"] = this["fiveleft"] || {};
this["fiveleft"]["templates"] = this["fiveleft"]["templates"] || {};

this["fiveleft"]["templates"]["partnership-item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <li class=\"partner-item ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.info)),stack1 == null || stack1 === false ? stack1 : stack1.website), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <a class=\"partner-link\" href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.info)),stack1 == null || stack1 === false ? stack1 : stack1.website)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\" data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            <i class=\"icon\"></i><span class=\"label\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </a>\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <span class=\"partner-link\" data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"label\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </span>\n        ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["fiveleft"]["templates"]["project-grid-item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <a href=\"/project/";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"project-grid-item\" data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-index=\"";
  if (helper = helpers.index) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.index); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\n        <span class=\"project-grid-item-inner\">\n            <span class=\"media\">\n                <span class=\"media-inner\">\n                    <span class=\"media-content\">\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.thumb), {hash:{},inverse:self.program(8, program8, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </span>   \n                    <span class=\"media-hover\"></span>             \n                    <span class=\"media-active icon\"></span>             \n                </span>\n            </span>\n            <span class=\"info\">\n                <h1 class=\"title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subtitle), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </span>\n        </span>\n    </a>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.thumb)),stack1 == null || stack1 === false ? stack1 : stack1.info)),stack1 == null || stack1 === false ? stack1 : stack1.sizes)),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.file), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <img class=\"thumbnail\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.thumb)),stack1 == null || stack1 === false ? stack1 : stack1.dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.thumb)),stack1 == null || stack1 === false ? stack1 : stack1.info)),stack1 == null || stack1 === false ? stack1 : stack1.sizes)),stack1 == null || stack1 === false ? stack1 : stack1.thumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.file)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n                            ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.thumb)),stack1 == null || stack1 === false ? stack1 : stack1.info)),stack1 == null || stack1 === false ? stack1 : stack1.file), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <img class=\"thumbnail\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.thumb)),stack1 == null || stack1 === false ? stack1 : stack1.dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.thumb)),stack1 == null || stack1 === false ? stack1 : stack1.info)),stack1 == null || stack1 === false ? stack1 : stack1.file)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n                                ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <img class=\"thumbnail\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.thumb)),stack1 == null || stack1 === false ? stack1 : stack1.dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "fpo-thumbnail.png\" />\n                        ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <h2 class=\"subtitle\">";
  if (helper = helpers.subtitle) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subtitle); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n                ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["fiveleft"]["templates"]["project-item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <article id=\"project-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"project\" data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\n        <div class=\"project-inner\">\n            <div class=\"media\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.media), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <div class=\"media-inner\">\n                    <a href=\"#\" class=\"media-controls\">\n                        <span class=\"inner\">\n                            <i class=\"icon play\">Play</i>\n                            <i class=\"icon pause\">Pause</i>\n                        </span>\n                    </a> \n                    <div class=\"media-container\">\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.gallery), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.video), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                </div>\n                <a class=\"close\" href=\"#\"><i class=\"icon\">Close</i></a>\n            </div>\n            <div class=\"info\">\n                <h1 class=\"title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subtitle), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <div class=\"details\">\n                    <p class=\"project-detail description\">";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n                    <p class=\"project-detail additional\">\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.client), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.agency), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.discipline), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.technology), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.info)),stack1 == null || stack1 === false ? stack1 : stack1.website), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </p>\n                    <a class=\"next project-advance\" href=\"#\">\n                        <span class=\"label\">Next Project</span>\n                        <span class=\"title-wrapper\"><span class=\"project-title\">{project title}</span></span>\n                        <i class=\"icon\"></i>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </article>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "data-media=\"";
  if (helper = helpers.media) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.media); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <ul class=\"gallery-list\">\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.gallery), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </ul>\n                    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <li class=\"gallery-item\" data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"placeholder\" data-src=\"";
  if (helper = helpers.src) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.src); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span></li>\n                        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <video class=\"video\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.video)),stack1 == null || stack1 === false ? stack1 : stack1.poster), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " preload=\"load\" loop=\"loop\">\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.video)),stack1 == null || stack1 === false ? stack1 : stack1.mp4), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.video)),stack1 == null || stack1 === false ? stack1 : stack1.ogg), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.video)),stack1 == null || stack1 === false ? stack1 : stack1.webm), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </video>\n                    ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "poster=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.video)),stack1 == null || stack1 === false ? stack1 : stack1.poster)),stack1 == null || stack1 === false ? stack1 : stack1.src)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<source src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.video)),stack1 == null || stack1 === false ? stack1 : stack1.mp4)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"video/mp4\" />";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<source src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.video)),stack1 == null || stack1 === false ? stack1 : stack1.ogg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"video/ogg\" />";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<source src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.video)),stack1 == null || stack1 === false ? stack1 : stack1.webm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"video/webm\" />";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <h2 class=\"subtitle\">";
  if (helper = helpers.subtitle) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subtitle); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n                ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        <span class=\"participant-info client\">\n                            <span class=\"info-label\">Client: </span> <!--\n                         --><a class=\"client-name info-name\" href=\"/client/";
  if (helper = helpers.clientId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.clientId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.client) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.client); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n                        </span>\n                        ";
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        <span class=\"separator\">/</span>\n                        <span class=\"participant-info agency\">\n                            <span class=\"info-label\">Agency: </span> <!--\n                         --><a class=\"agency-name info-name\" href=\"/agency/";
  if (helper = helpers.agencyId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.agencyId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.agency) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.agency); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n                        </span>\n                        ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <span class=\"separator\">/</span>\n                        <span class=\"disciplines\">\n                            <span class=\"taxonomy-label info-label\">Disciplines: </span>\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.discipline), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </span>\n                        ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <span class=\"discipline taxonomy term-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\n                                <span class=\"label\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span><span class=\"separator\">,</span>\n                            </span>\n                            ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <span class=\"separator\">/</span>\n                        <span class=\"technologies\">\n                            <span class=\"taxonomy-label info-label\">Technology: </span>\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.technology), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </span>\n                        ";
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <span class=\"technology taxonomy term-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\n                                <span class=\"label\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span><span class=\"separator\">,</span>\n                            </span>\n                            ";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        <span class=\"separator\">/</span>\n                        <span class=\"participant-info site\">\n                            <a class=\"project-link info-name\" href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.info)),stack1 == null || stack1 === false ? stack1 : stack1.website)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\" title=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">View Site</a>\n                        </span>\n                        ";
  return buffer;
  }

function program30(depth0,data) {
  
  
  return "\n    <article class=\"project unknown-project\">\n        <div class=\"project-inner\">\n            <div class=\"info\">\n                <h1 class=\"title\">Project not found</h1>\n            </div>\n        </div>\n    </article>\n";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(30, program30, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });