# Westbroek VR

This project is a VR simulation of a parachute flight above the dropzone 'Westbroek' of PCMN
(Paracentrum Midden Nederland) in the Netherlands.

## Technologies / libraries

- Aframe: the VR library
- AngularJS: for some client-side controls (1.5)
- NodeJS: for the server (using Express)
- Socket.io: using websockets for tranfering stering input and canopy position

Javascript all the way

## Start and run

clone the repo

```bash
git clone https://github.com/digitalica/wbvr.git
cd wbvr
```

Install dependencies

```bash
npm install
```

Start the server

```bash
node server.js
```


Now browse to the app at `http://localhost:3000`.

## Coordinates

For now we use the more or less default Aframe coordinate system:
- x: positive to the east (right)
- y: positive up
- z: positive to viewer (south)

It may make sense to change this to be z up, but then the 'depth', 'width'  and 'height' properties of the 
Aframe objects wont work any more.

## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet (nothing much so far...)
  components/           --> all app specific modules (so far, just the default ones from the angular template)
    version/              --> version related components
      version.js                 --> version module declaration and basic "version" value service
      version_test.js            --> "version" value service tests
      version-directive.js       --> custom directive that returns the current app version
      version-directive_test.js  --> version directive tests
      interpolate-filter.js      --> custom interpolation filter
      interpolate-filter_test.js --> interpolate filter tests
  viewMain              --> main view, select your role (fly or watch)
    viewMain.html           --> the partial template
    viewMain.js             --> the controller logic
  viewFly               --> fly view, full 3d / vr screen to fly
    viewFly.html            --> the partial template
    viewFly.js              --> the controller logic
  viewWatch             --> watch view, to see connected flyer(s) and control them
    viewWatch.html          --> the partial template
    viewWatch.js            --> the controller logic
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
```

