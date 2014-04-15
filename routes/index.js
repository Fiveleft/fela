function init(app) {

  var data = {
    content : app.get("pageContent")
    ,config : app.get("config")
  };

  // Index Sections: "work", "work/{project-name}", "info", "info/{info-section}", "connect"
  app.get(/\/|\/work(\/\w+)*|\/info(\/\w+)*|\/connect/, function (req, res){
    res.render('index', data);
  });
}

module.exports.init = init;