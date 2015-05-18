(function() {
  function format(template, json) {
    return template.replace(/#\{(.*?)\}/g, function(all, key) {
      return json && (key in json) ? json[key] : '';
    });
  }
  var canvas = document.querySelector('#canvas');

  function rendVector(v, color) {
    jpaths.create({
      parent: canvas,
      stroke: color || 'blue',
      path: format('M #{x},#{y} m -10,0 h 20 m -10,-10 v 20', v)
    });
  }

  var v1 = jvects.create(100, 100);
  var v2 = jvects.create(200, 100);
  rendVector(v1);
  rendVector(v2, 'red');

  v3 = v1.project(v2);
  rendVector(v3, 'green');
})();


