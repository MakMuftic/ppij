/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (document) {
  var switchRegister = document.querySelector('.js-switch-register');
  var switchLogin = document.querySelector('.js-switch-login');

  var loginForm = document.querySelector('.js-form-login');
  var registerForm = document.querySelector('.js-form-register');

  if (switchRegister) {
    switchRegister.addEventListener('click', function () {
      loginForm.classList.add('u-animation--fade-out-down');

      registerForm.classList.remove('u-display-none');
      registerForm.classList.add('u-animation--fade-in-up');

      setTimeout(function () {
        loginForm.classList.remove('u-display-block');
        loginForm.classList.remove('u-opacity-1');
        loginForm.classList.add('u-display-none');
        loginForm.classList.add('u-opacity-0');
        loginForm.classList.remove('u-animation--fade-out-down');

        registerForm.classList.add('u-display-block');
        registerForm.classList.add('u-opacity-1');
        registerForm.classList.remove('u-opacity-0');
        registerForm.classList.remove('u-animation--fade-in-up');
      }, 500);
    });
  }

  if (switchLogin) {
    switchLogin.addEventListener('click', function () {
      registerForm.classList.add('u-animation--fade-out-down');

      loginForm.classList.remove('u-display-none');
      loginForm.classList.add('u-animation--fade-in-up');

      setTimeout(function () {
        registerForm.classList.remove('u-display-block');
        registerForm.classList.remove('u-opacity-1');
        registerForm.classList.add('u-display-none');
        registerForm.classList.add('u-opacity-0');
        registerForm.classList.remove('u-animation--fade-out-down');

        loginForm.classList.add('u-display-block');
        loginForm.classList.add('u-opacity-1');
        loginForm.classList.remove('u-opacity-0');
        loginForm.classList.remove('u-animation--fade-in-up');
      }, 500);
    });
  }
})(window.document);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);