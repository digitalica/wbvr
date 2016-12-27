'use strict';

angular.module('wbvr.version', [
  'wbvr.version.interpolate-filter',
  'wbvr.version.version-directive'
])

.value('version', '0.1');
