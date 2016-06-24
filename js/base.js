/*------------------------------------------------------------------------------
 JS Document (https://developer.mozilla.org/en/JavaScript)

 project:    project name
 created:    YYYY-MM-DD
 author:     johdoe

 ----------------------------------------------------------------------------- */
'use strict';

require('./base/ready.js');
require('./base/load.js');

/*  =CONSTANTES
 ----------------------------------------------------------------------------- */
//jQuery.noConflict();
var d = document;
var w = window;
window.pm = window.pm || {};
pm.debug = /equesto|local|nextdeploy/.test(document.location.host) && typeof console != 'undefined';

/* END */