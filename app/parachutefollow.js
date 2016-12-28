/**
 * Created by robbert on 28-12-16.
 */
/**
 * Created by robbert on 11-11-16.
 */


/**
 * Parachute component to follow a parachute.
 */
var parachuteFollowComponent = {

  init: function () {
    var self = this;
    var data = this.data;
    var el = this.el;

    this.socket = io();

    this.socket.on('position', function (positiondata) {
      console.log('received pos data');
      self.positiondata = positiondata;
    });

  },

  tick: function (time, delta) {
    var self = this;
    var data = this.data;
    var el = this.el;

    if (self.positiondata) {
      el.setAttribute('position', {
        x: self.positiondata.x,
        y: self.positiondata.y,
        z: self.positiondata.z
      });
      var rotation = el.getAttribute('rotation');
      el.setAttribute('rotation', {
        x: rotation.x,
        y: self.positiondata.d,
        z: rotation.z
      });
    } else {
      console.log('no positiondata');
    }
  }

};

AFRAME.registerComponent('parachute-follow', parachuteFollowComponent);