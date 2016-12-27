/**
 * Created by robbert on 11-11-16.
 */

var KEYCODE_TO_CODE = {
  '37': 'ArrowLeft',
  '39': 'ArrowRight',
  '65': 'KeyA', // left
  '83': 'KeyS' // right
};

var utils = {
  bind: function bind(fn, ctx/* , arg1, arg2 */) {
    return (function (prependedArgs) {
      return function bound() {
        // Concat the bound function arguments with those passed to original bind
        var args = prependedArgs.concat(Array.prototype.slice.call(arguments, 0));
        return fn.apply(ctx, args);
      };
    })(Array.prototype.slice.call(arguments, 2));
  },
  shouldCaptureKeyEvent: function (event) {
    if (event.shiftKey || event.metaKey || event.altKey || event.ctrlKey) {
      return false;
    }
    return document.activeElement === document.body;
  }
};
var bind = utils.bind;
var shouldCaptureKeyEvent = utils.shouldCaptureKeyEvent;

var CLAMP_VELOCITY = 0.00001;
var MAX_DELTA = 0.2;

/**
 * Parachute component to control (steering) entities as a parachute.
 */
var pararchuteComponent = {
  schema: {
    hspeed: {default: 7}, //  horizontal speed m/s
    vspeed: {default: -4}, // vertical speed m/s
    direction: {default: null}, // direction (initial!)
    windspeed: {default: 3},
    winddirection: {default: 0},
    rspeed: {default: 40} // rotation speed (degrees per second)
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    // To keep track of the pressed keys.
    this.keys = {};

    this.direction = data.direction;
    if (this.direction === null) {
      this.direction = Math.random() * 360;
    }
    this.position = el.getAttribute('position');


    this.windVector = new AFRAME.THREE.Vector3(0, 0, -data.windspeed);
    var directionEuler = new THREE.Euler(0, THREE.Math.degToRad(data.winddirection), 0);
    this.windVector.applyEuler(directionEuler);

    var exitVector = new AFRAME.THREE.Vector3(0, 0, data.windspeed);
    exitVector.applyEuler(directionEuler);
    exitVector.multiplyScalar(this.position.y / data.vspeed);
    console.log('exitvector: ' + exitVector.x + ' ' + exitVector.y + ' ' + exitVector.z);
    this.position = {
      x: this.position.x + exitVector.x,
      y: this.position.y + exitVector.y,
      z: this.position.z - exitVector.z
    };

    // Bind methods and add event listeners.
    this.onBlur = bind(this.onBlur, this);
    this.onFocus = bind(this.onFocus, this);
    this.onKeyDown = bind(this.onKeyDown, this);
    this.onKeyUp = bind(this.onKeyUp, this);
    this.onVisibilityChange = bind(this.onVisibilityChange, this);
    this.attachVisibilityEventListeners();
  },

  tick: function (time, delta) {
    var data = this.data;
    var keys = this.keys;
    var el = this.el;
    var movementVector;

    // Use seconds.
    delta = delta / 1000;

    movementVector = new AFRAME.THREE.Vector3(0, data.vspeed, data.hspeed);
    movementVector.multiplyScalar(delta);

    // update direction
    if (keys.KeyD || keys.ArrowRight) {
      this.direction -= data.rspeed * delta;
      if (this.direction < 0) {
        this.direction += 360;
      }
    }
    if (keys.KeyA || keys.ArrowLeft) {
      this.direction += data.rspeed * delta;
      if (this.direction >= 360) {
        this.direction -= 360;
      }
    }
    console.log('dir: ' + this.direction + " (" + (360 - this.direction) + ")");

    // update movementVector
    var directionEuler = new THREE.Euler(0, THREE.Math.degToRad(this.direction), 0);
    movementVector.applyEuler(directionEuler);
    console.log('movementVector: ' + movementVector.x + ' ' + movementVector.y + ' ' + movementVector.z);

    // apply wind
    var windVector = new AFRAME.THREE.Vector3();
    windVector.copy(this.windVector);
    windVector.multiplyScalar(delta);
    movementVector.add(windVector);

    // Set new position
    if (this.position.y > -movementVector.y) {
      this.position = {
        x: this.position.x + movementVector.x,
        y: this.position.y + movementVector.y,
        z: this.position.z + movementVector.z
      };
      // console.log('parachute direction: ' + this.direction + ' ' + movementVector.x + ' ' + movementVector.y + ' ' + movementVector.z);
      // console.log('posx ' + this.position.x + ' posy ' + this.position.y + ' posz ' + this.position.z);
      console.log('alti: ' + this.position.y * 3 + ' feet');
    } else {
      console.log('landed ' + Math.sqrt(this.position.x * this.position.x + this.position.z * this.position.z) + 'm');
    }


    // set position
    var positionVector = new AFRAME.THREE.Vector3(-this.position.x, this.position.y, -this.position.z);
    //positionVector.applyEuler(directionEuler);

    el.setAttribute('position', {
      x: positionVector.x,
      y: positionVector.y,
      z: positionVector.z
    });


    // set new rotation, so we look in the correct direction
    var rotation = el.getAttribute('rotation');
    if (!rotation) {
      rotation = {
        x: 0,
        y: 0,
        z: 0
      }
    }
    el.setAttribute('rotation', {
      x: rotation.x,
      y: this.direction,
      z: rotation.z
    });

    // set altimeter
    var atimeterarrowElement = document.getElementById(data.atimeterarrow);
    if (atimeterarrowElement) {
      var altitude = -this.position.y;
      var altiangle = (altitude / 4000) * 360;
      // console.log('altiangle: ' + altiangle);
      atimeterarrowElement.setAttribute("rotation", "0 " + altiangle + " 0");
    } else {
      // console.log('no altimeterarrowelement found ' + data.atimeterarrow);
    }


  },

  remove: function () {
    this.removeKeyEventListeners();
    this.removeVisibilityEventListeners();
  },

  play: function () {
    this.attachKeyEventListeners();
  },

  pause: function () {
    this.keys = {};
    this.removeKeyEventListeners();
  },

  attachVisibilityEventListeners: function () {
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('focus', this.onFocus);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  },

  removeVisibilityEventListeners: function () {
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('focus', this.onFocus);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  attachKeyEventListeners: function () {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  removeKeyEventListeners: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },

  onBlur: function () {
    this.pause();
  },

  onFocus: function () {
    this.play();
  },

  onVisibilityChange: function () {
    if (document.hidden) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  },

  onKeyDown: function (event) {
    var code;
    if (!shouldCaptureKeyEvent(event)) {
      return;
    }
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    this.keys[code] = true;
  },

  onKeyUp: function (event) {
    var code;
    if (!shouldCaptureKeyEvent(event)) {
      return;
    }
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    this.keys[code] = false;
  }
};

AFRAME.registerComponent('parachute-controls', pararchuteComponent);