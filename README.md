# Westbroek VR

This project is a VR simulation of a parachute flight above the dropzone 'Westbroek' of PCMN
(Paracentrum Midden Nederland) in the Netherlands.

## Technologies / libraries

Aframe: the VR library
AngularJS: for some client-side controls (1.5)
NodeJS: for the server (using Express)
Socket.io: using websockets for tranfering stering input and canopy position

Javascript all the way

### Start and run

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



## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    version/              --> version related components
      version.js                 --> version module declaration and basic "version" value service
      version_test.js            --> "version" value service tests
      version-directive.js       --> custom directive that returns the current app version
      version-directive_test.js  --> version directive tests
      interpolate-filter.js      --> custom interpolation filter
      interpolate-filter_test.js --> interpolate filter tests
  view1/                --> the view1 view template and logic
    view1.html            --> the partial template
    view1.js              --> the controller logic
    view1_test.js         --> tests of the controller
  view2/                --> the view2 view template and logic
    view2.html            --> the partial template
    view2.js              --> the controller logic
    view2_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

