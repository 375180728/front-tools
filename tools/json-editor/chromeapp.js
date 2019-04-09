/**
 * load the chrome application on body load
 */
window.onload = function () {
  app.load();
  app.resize();

  document.getElementById('contents').style.visibility = 'visible';
};
