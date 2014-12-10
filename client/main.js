if (Meteor.isClient) {
  
  // Rig some famo.us deps
  famous.polyfills;
  famous.core.famous;
  FastClick = famous.inputs.FastClick;

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

