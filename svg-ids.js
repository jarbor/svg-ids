(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SvgIds"] = factory();
	else
		root["SvgIds"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var URL_REFERENCE = /url\(['"]?#(.+)['"]?\)/;

var Id =
/*#__PURE__*/
function () {
  function Id(id) {
    _classCallCheck(this, Id);

    this.id = id;
    this.elements = [];
    this.references = [];
  }

  _createClass(Id, [{
    key: "trackElement",
    value: function trackElement(element) {
      this.elements.push(element);
    }
  }, {
    key: "caputreReference",
    value: function caputreReference(element, attributeName) {
      this.references.push({
        element: element,
        attributeName: attributeName
      });
    }
  }, {
    key: "makeUnique",
    value: function makeUnique() {
      var _this = this;

      // Set new IDs
      this.elements.forEach(function (element, index) {
        var newId = "".concat(index, "_").concat(_this.id);
        element.setAttribute('data-original-id', _this.id);
        element.setAttribute('id', newId);
      }); // Update references

      this.references.forEach(function (reference) {
        var closest = _this.getClosestElement(reference.element);

        if (closest) {
          var newId = closest.getAttribute('id');
          reference.element.setAttribute(reference.attributeName, "url(#".concat(newId, ")"));
        } else {
          console.error("Failed to locate referenced element in scope for ".concat(reference.element));
        }
      });
    }
  }, {
    key: "getClosestElement",
    value: function getClosestElement(referenceElement) {
      var parent = referenceElement.parentNode; // Stop searching if we've reached the SVG node or have no parent for some reason

      if (!parent || referenceElement.nodeName.toLowerCase() === 'svg') {
        return undefined;
      } // Return the found node or recurse


      return parent.querySelector("[data-original-id='".concat(this.id, "']")) || this.getClosestElement(parent);
    }
  }, {
    key: "elementLength",
    get: function get() {
      return this.elements.length;
    }
  }]);

  return Id;
}();

var SvgIds =
/*#__PURE__*/
function () {
  function SvgIds(elementScope) {
    _classCallCheck(this, SvgIds);

    this.elementScope = elementScope || document;
    this.registry = {};
  }

  _createClass(SvgIds, [{
    key: "makeUnique",
    value: function makeUnique() {
      var _this2 = this;

      // Locate SVGs in the document since some browsers won't search inside SVGs unless searching from an SVG
      var searchScope = this.elementScope.querySelectorAll('svg'); // If no SVGs found in the element scope, assume the element scope is an SVG already and proceed 

      searchScope = searchScope.length ? searchScope : [this.elementScope]; // Track all IDed elements

      searchScope.forEach(function (svg, index) {
        svg.querySelectorAll('[id]').forEach(function (element) {
          return _this2.registerElement(element);
        });
      }); // Track all URL references

      searchScope.forEach(function (svg, index) {
        svg.querySelectorAll('*').forEach(function (element) {
          return _this2.caputreReferences(element);
        });
      }); // Assign new IDs and update references

      this.duplicateIds.forEach(function (id) {
        return id.makeUnique();
      });
    }
  }, {
    key: "registerElement",
    value: function registerElement(element) {
      var idRef = element.getAttribute('id');

      if (!this.registry[idRef]) {
        this.registry[idRef] = new Id(idRef);
      }

      this.registry[idRef].trackElement(element);
    }
  }, {
    key: "caputreReferences",
    value: function caputreReferences(element) {
      var _this3 = this;

      Array.from(element.attributes).forEach(function (attribute) {
        var match = attribute.value.match(URL_REFERENCE);

        if (match && match.length >= 2) {
          var idRef = match[1];

          _this3.registry[idRef].caputreReference(element, attribute.name);
        }
      });
    }
  }, {
    key: "duplicateIds",
    get: function get() {
      return Object.values(this.registry).filter(function (id) {
        return id.elementLength > 1;
      });
    }
  }]);

  return SvgIds;
}();

var _default = SvgIds;
exports.default = _default;

/***/ })
/******/ ])["default"];
});