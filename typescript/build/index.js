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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/Fatura.ts":
/*!*******************************!*\
  !*** ./src/classes/Fatura.ts ***!
  \*******************************/
/*! exports provided: Fatura */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fatura\", function() { return Fatura; });\nvar Fatura = /** @class */ (function () {\r\n    function Fatura(cedente, detalhes, valor) {\r\n        this.cedente = cedente;\r\n        this.detalhes = detalhes;\r\n        this.valor = valor;\r\n    }\r\n    Fatura.prototype.format = function () {\r\n        return this.cedente + \" recebe R$\" + this.valor + \" de \" + this.detalhes + \".\";\r\n    };\r\n    return Fatura;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/classes/Fatura.ts?");

/***/ }),

/***/ "./src/classes/ListTemplate.ts":
/*!*************************************!*\
  !*** ./src/classes/ListTemplate.ts ***!
  \*************************************/
/*! exports provided: ListTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ListTemplate\", function() { return ListTemplate; });\nvar ListTemplate = /** @class */ (function () {\r\n    function ListTemplate(container) {\r\n        this.container = container;\r\n    }\r\n    ListTemplate.prototype.render = function (item, titulo, pos) {\r\n        var li = document.createElement(\"li\");\r\n        var h4 = document.createElement(\"h4\");\r\n        var p = document.createElement(\"p\");\r\n        h4.innerText = titulo;\r\n        p.innerText = item.format();\r\n        li.append(h4);\r\n        li.append(p);\r\n        if (pos === 'inicio') {\r\n            this.container.prepend(li);\r\n        }\r\n        else {\r\n            this.container.append(li);\r\n        }\r\n    };\r\n    return ListTemplate;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/classes/ListTemplate.ts?");

/***/ }),

/***/ "./src/classes/Pagamento.ts":
/*!**********************************!*\
  !*** ./src/classes/Pagamento.ts ***!
  \**********************************/
/*! exports provided: Pagamento */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pagamento\", function() { return Pagamento; });\nvar Pagamento = /** @class */ (function () {\r\n    function Pagamento(cliente, detalhes, valor) {\r\n        this.cliente = cliente;\r\n        this.detalhes = detalhes;\r\n        this.valor = valor;\r\n        this.moeda = \"R$\";\r\n    }\r\n    Pagamento.prototype.format = function () {\r\n        return this.cliente + \" deve \" + this.moeda + this.valor + \" por \" + this.detalhes + \".\";\r\n    };\r\n    return Pagamento;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/classes/Pagamento.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Fatura__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Fatura */ \"./src/classes/Fatura.ts\");\n/* harmony import */ var _classes_Pagamento__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Pagamento */ \"./src/classes/Pagamento.ts\");\n/* harmony import */ var _classes_ListTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/ListTemplate */ \"./src/classes/ListTemplate.ts\");\n\r\n\r\n\r\n\r\nvar form = document.querySelector(\".novo-item-form\");\r\nvar tipo = document.querySelector(\"#tipo\");\r\nvar dePara = document.querySelector(\"#dePara\");\r\nvar detalhes = document.querySelector(\"#detalhes\");\r\nvar valor = document.querySelector(\"#valor\");\r\nvar ul = document.querySelector(\".item-list\");\r\nvar listTemplate = new _classes_ListTemplate__WEBPACK_IMPORTED_MODULE_2__[\"ListTemplate\"](ul);\r\nform.addEventListener(\"submit\", function (e) {\r\n    e.preventDefault();\r\n    var doc;\r\n    if (tipo.value === 'fatura') {\r\n        doc = new _classes_Fatura__WEBPACK_IMPORTED_MODULE_0__[\"Fatura\"](dePara.value, detalhes.value, valor.valueAsNumber);\r\n    }\r\n    else {\r\n        doc = new _classes_Pagamento__WEBPACK_IMPORTED_MODULE_1__[\"Pagamento\"](dePara.value, detalhes.value, valor.valueAsNumber);\r\n    }\r\n    listTemplate.render(doc, tipo.value, \"fim\");\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });