var {Application} = require('stick');
var {html,json} = require('ringo/jsgi/response');

var {Context} = net.tangrui.shenjs.ringossh.web.SpringAwareJsgiServlet;

exports.router = (function() {
  var app = new Application();
  app.configure('params', 'route');

  app.get('/hello', function() {
    return html("<h1>Hello World!</h1>");
  });

  app.get('/tasks', function() {
    var context = Context.getInstance();
    var emf = context.getBean('entityManagerFactory');
    var em = emf.createEntityManager();
    var query = em.createQuery('from Task');
    var tasks = query.getResultList();
    var result = [];
    for (var i = 0; i < tasks.size(); i++) {
      var task = tasks.get(i);
      var taskObj = {};
      taskObj.name = task.name;
      taskObj.description = task.description;
      result.push(taskObj);
    }
    em.close();

    return json(result);
  });

  return app;
})();
