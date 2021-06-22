/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/coin.js":
/*!*****************************!*\
  !*** ./src/scripts/coin.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _collision_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collision_box */ "./src/scripts/collision_box.js");
/* harmony import */ var _utils_func_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/func_utils */ "./src/scripts/utils/func_utils.js");
/* harmony import */ var _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/global_vars */ "./src/scripts/utils/global_vars.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



 // import Entity from "./entity";

var Entity = /*#__PURE__*/function () {
  function Entity(pos, width, height, spritePalette) {
    _classCallCheck(this, Entity);

    this.pos = pos;
    this.width = width;
    this.height = height;
    var colBoxWidth = width;
    var colBoxHeight = height;
    this.spritePalette = spritePalette;
    this.drawOptions = {
      image: spritePalette,
      palX: 0,
      palY: 0,
      _sWidth: width,
      _sHeight: height,
      x: pos[0],
      y: pos[1],
      _dWidth: width,
      _dHeight: height
    };
    this.colBox = new _collision_box__WEBPACK_IMPORTED_MODULE_0__.default(this, colBoxWidth, colBoxHeight);
    this.top = this.colBox.top;
    this.bottom = this.colBox.bottom;
    this.left = this.colBox.left;
    this.right = this.colBox.right;
    this.collisions = {
      top: false,
      bottom: false,
      left: false,
      right: false
    };
  }

  _createClass(Entity, [{
    key: "colBoxHook",
    value: function colBoxHook() {
      // this will center the colBox on the bottom
      var _ref = [this.pos[0], this.pos[1]],
          x = _ref[0],
          y = _ref[1];
      var cx = x + (this.width - this.colBox.width) / 2,
          cy = y + (this.height - this.colBox.height);
      return [cx, cy];
    }
  }, {
    key: "updateSides",
    value: function updateSides() {
      this.colBox.updateSides();
      this.top = this.colBox.top;
      this.bottom = this.colBox.bottom;
      this.left = this.colBox.left;
      this.right = this.colBox.right;
    }
  }, {
    key: "collidedOnSide",
    value: function collidedOnSide(side, otherObject) {
      var otherSide;

      switch (side) {
        case "top":
          otherSide = "bottom";
          break;

        case "bottom":
          otherSide = "top";
          break;

        case "left":
          otherSide = "right";
          break;

        case "right":
          otherSide = "left";
          break;

        default:
          otherSide = null;
          break;
      }

      this.collisions[side] = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.collidedWithSide)(side, this[side], otherObject[otherSide]);
      return this.collisions[side];
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage.apply(ctx, _toConsumableArray(Object.values(this.drawOptions)));
      this.colBox.centerOnEntity();
      this.colBox.draw(ctx);
    }
  }]);

  return Entity;
}();

var Coin = /*#__PURE__*/function (_Entity) {
  _inherits(Coin, _Entity);

  var _super = _createSuper(Coin);

  function Coin(pos, width, height, spritePalette) {
    var _this;

    _classCallCheck(this, Coin);

    _this = _super.call(this, pos, width, height, spritePalette);
    _this.frameInterval = 12;
    _this.frameCount = 0;
    _this.drawOptions.palY = 0;
    return _this;
  }

  _createClass(Coin, [{
    key: "collect",
    value: function collect() {
      if (this.collidedOnSide("top", _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.game.player) || this.collidedOnSide("bottom", _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.game.player) || this.collidedOnSide("left", _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.game.player) || this.collidedOnSide("right", _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.game.player)) {
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.randCoinSound)().play();
        return true;
      }

      return false;
    }
  }, {
    key: "animate",
    value: function animate() {
      var i = this.frameInterval;
      var c = this.frameCount;
      var w = this.width;

      if (c < i) {
        this.drawOptions.palX = w * 0;
        this.frameCount++;
      } else if (c < i * 2) {
        this.drawOptions.palX = w * 1;
        this.frameCount++;
      } else if (c < i * 3) {
        this.drawOptions.palX = w * 2;
        this.frameCount++;
      } else if (c < i * 4) {
        this.drawOptions.palX = w * 3;
        this.frameCount++;
      } else if (c < i * 5) {
        this.drawOptions.palX = w * 4;
        this.frameCount++;
      } else if (c < i * 6) {
        this.drawOptions.palX = w * 5;
        this.frameCount++;
      } else if (c < i * 7) {
        this.drawOptions.palX = w * 6;
        this.frameCount++;
      } else if (c < i * 8) {
        this.drawOptions.palX = w * 7;
        this.frameCount++;
      } else {
        this.drawOptions.palX = w * 0;
        this.frameCount = 0;
      }
    }
  }]);

  return Coin;
}(Entity);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Coin);

/***/ }),

/***/ "./src/scripts/collision_box.js":
/*!**************************************!*\
  !*** ./src/scripts/collision_box.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColBox = /*#__PURE__*/function () {
  function ColBox(entity, width, height) {
    _classCallCheck(this, ColBox);

    this.entity = entity;
    this.width = width;
    this.height = height;
    this.pos = this.originPos();

    var _this$pos = _slicedToArray(this.pos, 2),
        x = _this$pos[0],
        y = _this$pos[1];

    var topLeft = this.pos;
    var topRight = [x + width, y];
    var bottomRight = [x + width, y + height];
    var bottomLeft = [x, y + height];
    this.center = [x + width / 2, y + height / 2];
    this.top = [[topLeft[0], topRight[0]], topLeft[1]];
    this.bottom = [[bottomLeft[0], bottomRight[0]], bottomLeft[1]];
    this.right = [topRight[0], [topRight[1], bottomRight[1]]];
    this.left = [topLeft[0], [topLeft[1], bottomLeft[1]]];
    this.sides = [this.top, this.bottom, this.right, this.left];
  }

  _createClass(ColBox, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "transparent";
      ctx.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
    }
  }, {
    key: "updateSides",
    value: function updateSides() {
      var _this$pos2 = _slicedToArray(this.pos, 2),
          x = _this$pos2[0],
          y = _this$pos2[1];

      var topLeft = this.pos;
      var topRight = [x + this.width, y];
      var bottomRight = [x + this.width, y + this.height];
      var bottomLeft = [x, y + this.height];
      this.center = [x + this.width / 2, y + this.height / 2];
      this.top = [[topLeft[0], topRight[0]], topLeft[1]];
      this.bottom = [[bottomLeft[0], bottomRight[0]], bottomLeft[1]];
      this.right = [topRight[0], [topRight[1], bottomRight[1]]];
      this.left = [topLeft[0], [topLeft[1], bottomLeft[1]]];
    }
  }, {
    key: "originPos",
    value: function originPos() {
      var _ref = [this.entity.pos[0], this.entity.pos[1]],
          ex = _ref[0],
          ey = _ref[1];
      var _ref2 = [this.entity.width, this.entity.height],
          ew = _ref2[0],
          eh = _ref2[1];
      var _ref3 = [this.width, this.height],
          tw = _ref3[0],
          th = _ref3[1];
      var x = ex + (ew - tw) / 2;
      var y = ey + eh - th;
      return [x, y];
    }
  }, {
    key: "centerOnEntity",
    value: function centerOnEntity() {
      this.pos = this.entity.colBoxHook();
      this.updateSides();
    }
  }]);

  return ColBox;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColBox);

/***/ }),

/***/ "./src/scripts/enemy.js":
/*!******************************!*\
  !*** ./src/scripts/enemy.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _collision_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collision_box */ "./src/scripts/collision_box.js");
/* harmony import */ var _utils_func_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/func_utils */ "./src/scripts/utils/func_utils.js");
/* harmony import */ var _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/global_vars */ "./src/scripts/utils/global_vars.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import Entity from "./entity";




var Entity = /*#__PURE__*/function () {
  function Entity(pos, width, height, spritePalette) {
    _classCallCheck(this, Entity);

    this.pos = pos;
    this.width = width;
    this.height = height;
    var colBoxWidth = width / 2;
    var colBoxHeight = height / 3;
    this.spritePalette = spritePalette;
    this.drawOptions = {
      image: spritePalette,
      palX: 0,
      palY: 0,
      _sWidth: width,
      _sHeight: height,
      x: pos[0],
      y: pos[1],
      _dWidth: width,
      _dHeight: height
    };
    this.colBox = new _collision_box__WEBPACK_IMPORTED_MODULE_0__.default(this, colBoxWidth, colBoxHeight);
    this.top = this.colBox.top;
    this.bottom = this.colBox.bottom;
    this.left = this.colBox.left;
    this.right = this.colBox.right;
    this.center = this.colBox.center;
    this.collisions = {
      top: false,
      bottom: false,
      left: false,
      right: false
    };
  }

  _createClass(Entity, [{
    key: "colBoxHook",
    value: function colBoxHook() {
      // this will center the colBox on the bottom
      var _ref = [this.pos[0], this.pos[1]],
          x = _ref[0],
          y = _ref[1];
      var cx = x + (this.width - this.colBox.width) / 2,
          cy = y + (this.height - this.colBox.height);
      return [cx, cy];
    }
  }, {
    key: "updateSides",
    value: function updateSides() {
      this.colBox.updateSides();
      this.top = this.colBox.top;
      this.bottom = this.colBox.bottom;
      this.left = this.colBox.left;
      this.right = this.colBox.right;
      this.center = this.colBox.center;
    }
  }, {
    key: "collidedOnSide",
    value: function collidedOnSide(side, otherObject) {
      var otherSide;

      switch (side) {
        case "top":
          otherSide = "bottom";
          break;

        case "bottom":
          otherSide = "top";
          break;

        case "left":
          otherSide = "right";
          break;

        case "right":
          otherSide = "left";
          break;

        default:
          otherSide = null;
          break;
      }

      this.collisions[side] = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.collidedWithSide)(side, this[side], otherObject[otherSide]);
      return this.collisions[side];
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage.apply(ctx, _toConsumableArray(Object.values(this.drawOptions)));
      this.colBox.centerOnEntity();
      this.colBox.draw(ctx);
    }
  }]);

  return Entity;
}();

var Enemy = /*#__PURE__*/function (_Entity) {
  _inherits(Enemy, _Entity);

  var _super = _createSuper(Enemy);

  function Enemy(pos, width, height, spritePalette, type, detectDist) {
    var _this;

    _classCallCheck(this, Enemy);

    _this = _super.call(this, pos, width, height, spritePalette);
    _this.speed = 0.9;
    _this.speedModifier = 0.75;
    _this.pace = 24 / _this.speed;
    _this.chasingPlayer = false;
    _this.detectDist = detectDist;
    _this.idleCount = 0;
    _this.idleMax = 60;
    _this.type = type;
    _this.movement = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    var x, y;

    switch (type) {
      case "blob":
        x = 48 * 3;
        y = 48 * 0;
        break;

      case "bat":
        x = 48 * 0;
        y = 48 * 0;
        break;

      case "ghost":
        x = 48 * 6;
        y = 48 * 4;
        break;
    }

    _this.palXOffset = x;
    _this.stride = {
      up: {
        stepCount: 0,
        palY: 48 * 3 + y
      },
      down: {
        stepCount: 0,
        palY: 48 * 0 + y
      },
      left: {
        stepCount: 0,
        palY: 48 * 1 + y
      },
      right: {
        stepCount: 0,
        palY: 48 * 2 + y
      }
    };
    return _this;
  }

  _createClass(Enemy, [{
    key: "stridePalettePos",
    value: function stridePalettePos(direction) {
      this.pace = 24 / (this.speed * this.speedModifier);

      if (this.stride[direction].stepCount <= this.pace) {
        this.stride[direction].stepCount++;
        return 48 * 1 + this.palXOffset;
      } else if (this.stride[direction].stepCount <= 2 * this.pace) {
        this.stride[direction].stepCount++;
        return 48 * 0 + this.palXOffset;
      } else if (this.stride[direction].stepCount <= 3 * this.pace) {
        this.stride[direction].stepCount++;
        return 48 * 1 + this.palXOffset;
      } else if (this.stride[direction].stepCount <= 4 * this.pace) {
        this.stride[direction].stepCount++;
        return 48 * 2 + this.palXOffset;
      } else if (this.stride[direction].stepCount > 4 * this.pace) {
        this.stride[direction].stepCount = 0;
        return 48 * 1 + this.palXOffset;
      }
    }
  }, {
    key: "distToPlayer",
    value: function distToPlayer() {
      var mx = this.center[0];
      var my = this.center[1];
      var ex = _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player.center[0];
      var ey = _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player.center[1];
      var dx = mx - ex;
      var dy = my - ey;
      var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      return dist;
    }
  }, {
    key: "normalizedVectorPos",
    value: function normalizedVectorPos() {
      var mx = this.center[0];
      var my = this.center[1];
      var ex = _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player.center[0];
      var ey = _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player.center[1];
      var dx = mx - ex;
      var dy = my - ey;

      if (!this.chasingPlayer && !this.idleCount) {
        var randAngle = Math.random() * 2 * Math.PI;
        this.dx = Math.cos(randAngle) * this.speed * this.speedModifier;
        this.dy = Math.sin(randAngle) * this.speed * this.speedModifier;
        this.idleCount = 1;
      }

      if (!this.chasingPlayer && this.idleCount) this.idleCount++;

      if (this.chasingPlayer) {
        this.dx = dx;
        this.dy = dy;
      }

      if (this.idleCount >= this.idleMax) this.idleCount = 0;
      this.angle = Math.atan(this.dy / this.dx);
      var ny = Math.sin(this.angle) * this.speed * this.speedModifier;
      var nx = Math.cos(this.angle) * this.speed * this.speedModifier;

      if (this.dy > 0) {
        this.movement["up"] = true;
        this.movement["down"] = false;
        if (Math.abs(this.dy) > Math.abs(this.dx)) this.spriteDir = "up";
      }

      if (this.dy < 0) {
        this.movement["down"] = true;
        this.movement["up"] = false;
        if (Math.abs(this.dy) > Math.abs(this.dx)) this.spriteDir = "down";
      }

      if (this.dx > 0) {
        this.movement["left"] = true;
        this.movement["right"] = false;
        if (Math.abs(this.dx) > Math.abs(this.dy)) this.spriteDir = "left";
      }

      if (this.dx < 0) {
        this.movement["right"] = true;
        this.movement["left"] = false;
        if (Math.abs(this.dx) > Math.abs(this.dy)) this.spriteDir = "right";
      }

      return [nx, ny];
    }
  }, {
    key: "damage",
    value: function damage() {
      return Math.floor(Math.random() * 4 + 1);
    }
  }, {
    key: "hitPlayer",
    value: function hitPlayer(walls) {
      var player = _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player;

      if (this.distToPlayer() < 32 && !_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player.invulnerable) {
        player.pos[0] -= 0.4 * this.dx;
        player.pos[1] -= 0.4 * this.dy;
        player.updateSides();
        player.wallCheck(walls);
        player.updateSides();
        player.hp -= this.damage();
        if (player.hp < 0) player.hp = 0;
        player.hit();
      }
    }
  }, {
    key: "wallCheck",
    value: function wallCheck(walls) {
      var _this$movement = this.movement,
          up = _this$movement.up,
          down = _this$movement.down,
          left = _this$movement.left,
          right = _this$movement.right;

      if (up) {
        var _iterator = _createForOfIteratorHelper(walls),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var wall = _step.value;
            if (this.collidedOnSide("top", wall)) break;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (this.collisions.top) {
          this.pos[1] = this.collisions.top - (this.height - this.colBox.height);
        }
      }

      if (down) {
        var _iterator2 = _createForOfIteratorHelper(walls),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _wall = _step2.value;
            if (this.collidedOnSide("bottom", _wall)) break;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (this.collisions.bottom) {
          this.pos[1] = this.collisions.bottom - 48;
        }
      }

      if (left) {
        var _iterator3 = _createForOfIteratorHelper(walls),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _wall2 = _step3.value;
            if (this.collidedOnSide("left", _wall2)) break;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (this.collisions.left) {
          this.pos[0] = this.collisions.left - this.colBox.width / 2;
        }
      }

      if (right) {
        var _iterator4 = _createForOfIteratorHelper(walls),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _wall3 = _step4.value;
            if (this.collidedOnSide("right", _wall3)) break;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (this.collisions.right) {
          this.pos[0] = this.collisions.right - (this.colBox.width + this.colBox.width / 2);
        }
      }
    }
  }, {
    key: "move",
    value: function move(walls) {
      if (this.distToPlayer() < this.detectDist) {
        this.chasingPlayer = true;
        this.speedModifier = 1;
      } else {
        this.chasingPlayer = false;
        this.speedModifier = 0.75;
      }

      var newVectors = this.normalizedVectorPos();
      var _this$movement2 = this.movement,
          up = _this$movement2.up,
          down = _this$movement2.down,
          left = _this$movement2.left,
          right = _this$movement2.right;

      if (left && up) {
        this.pos[0] -= newVectors[0];
        this.pos[1] -= newVectors[1];
      }

      if (left && down) {
        this.pos[0] -= newVectors[0];
        this.pos[1] -= newVectors[1];
      }

      if (right && up) {
        this.pos[0] += newVectors[0];
        this.pos[1] += newVectors[1];
      }

      if (right && down) {
        this.pos[0] += newVectors[0];
        this.pos[1] += newVectors[1];
      }

      this.wallCheck(walls);
      this.updateSides();

      switch (this.spriteDir) {
        case "up":
          this.drawOptions.palY = this.stride.up.palY;
          this.drawOptions.palX = this.stridePalettePos("up");
          break;

        case "down":
          this.drawOptions.palY = this.stride.down.palY;
          this.drawOptions.palX = this.stridePalettePos("down");
          break;

        case "left":
          this.drawOptions.palY = this.stride.left.palY;
          this.drawOptions.palX = this.stridePalettePos("left");
          break;

        case "right":
          this.drawOptions.palY = this.stride.right.palY;
          this.drawOptions.palX = this.stridePalettePos("right");
          break;

        default:
          this.drawOptions.palX = 48 * 1;
          break;
      }

      this.hitPlayer(walls);
      _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player.wallCheck(walls);
      this.updateSides();
      this.drawOptions.x = this.pos[0];
      this.drawOptions.y = this.pos[1];
    }
  }]);

  return Enemy;
}(Entity);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enemy);

/***/ }),

/***/ "./src/scripts/entity.js":
/*!*******************************!*\
  !*** ./src/scripts/entity.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _collision_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collision_box */ "./src/scripts/collision_box.js");
/* harmony import */ var _utils_func_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/func_utils */ "./src/scripts/utils/func_utils.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Entity = /*#__PURE__*/function () {
  function Entity(pos, width, height, spritePalette) {
    _classCallCheck(this, Entity);

    this.pos = pos;
    this.width = width;
    this.height = height;
    var colBoxWidth = width / 2;
    var colBoxHeight = height / 3;
    this.spritePalette = spritePalette;
    this.drawOptions = {
      image: spritePalette,
      palX: 0,
      palY: 0,
      _sWidth: width,
      _sHeight: height,
      x: pos[0],
      y: pos[1],
      _dWidth: width,
      _dHeight: height
    };
    this.colBox = new _collision_box__WEBPACK_IMPORTED_MODULE_0__.default(this, colBoxWidth, colBoxHeight);
    this.top = this.colBox.top;
    this.bottom = this.colBox.bottom;
    this.left = this.colBox.left;
    this.right = this.colBox.right;
    this.center = this.colBox.center;
    this.collisions = {
      top: false,
      bottom: false,
      left: false,
      right: false
    };
  }

  _createClass(Entity, [{
    key: "colBoxHook",
    value: function colBoxHook() {
      // this will center the colBox on the bottom
      var _ref = [this.pos[0], this.pos[1]],
          x = _ref[0],
          y = _ref[1];
      var cx = x + (this.width - this.colBox.width) / 2,
          cy = y + (this.height - this.colBox.height);
      return [cx, cy];
    }
  }, {
    key: "updateSides",
    value: function updateSides() {
      this.colBox.updateSides();
      this.center = this.colBox.center;
      this.top = this.colBox.top;
      this.bottom = this.colBox.bottom;
      this.left = this.colBox.left;
      this.right = this.colBox.right;
    }
  }, {
    key: "collidedOnSide",
    value: function collidedOnSide(side, otherObject) {
      var otherSide;

      switch (side) {
        case "top":
          otherSide = "bottom";
          break;

        case "bottom":
          otherSide = "top";
          break;

        case "left":
          otherSide = "right";
          break;

        case "right":
          otherSide = "left";
          break;

        default:
          otherSide = null;
          break;
      }

      this.collisions[side] = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.collidedWithSide)(side, this[side], otherObject[otherSide]);
      return this.collisions[side];
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage.apply(ctx, _toConsumableArray(Object.values(this.drawOptions)));
      this.colBox.centerOnEntity();
      this.colBox.draw(ctx);
    }
  }]);

  return Entity;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Entity);

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./room */ "./src/scripts/room.js");
/* harmony import */ var _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/global_vars */ "./src/scripts/utils/global_vars.js");
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Game = /*#__PURE__*/function () {
  function Game(ctx, playerSprite) {
    _classCallCheck(this, Game);

    this.fpsInterval = 1000 / 60;
    this.toPlayer = 100;
    var startingPos = [48 * 7, 48 * 7];
    this.player = _construct(_player__WEBPACK_IMPORTED_MODULE_0__.default, [startingPos].concat(_toConsumableArray(_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SPRITE_DIMS), [playerSprite]));
    _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player = this.player;
    this.ctx = ctx; // const room = { "left": new Room() }; // testing new Room(room)

    _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.rooms = {};
    this.startingRoom = new _room__WEBPACK_IMPORTED_MODULE_1__.default();
    this.room = this.startingRoom;
    this.player.draw(ctx);
    _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.game = this;
    _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.stop = false;
    _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.coinCount = 0;
    this.gameStep = this.gameStep.bind(this);
    this.stop = this.stop.bind(this);
    _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.game.play();
  }

  _createClass(Game, [{
    key: "gameOver",
    value: function gameOver() {
      return this.win() || this.lose();
    }
  }, {
    key: "win",
    value: function win() {
      return _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.coinCount >= 20;
    }
  }, {
    key: "lose",
    value: function lose() {
      return this.player.hp <= 0;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.gameOver()) {
        this.requestStop = true;
      }
    }
  }, {
    key: "gameStep",
    value: function gameStep() {
      var _this = this;

      this.requestId = requestAnimationFrame(this.gameStep);
      var now = Date.now();
      var elapsed = now - this.then;

      if (elapsed > this.fpsInterval) {
        this.then = now - elapsed % this.fpsInterval;
        var player = _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player;
        this.ctx.clearRect(0, 0, _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.WIDTH, _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.HEIGHT);
        player.move(this.room.walls);
        Object.values(this.room.enemies).forEach(function (enemy) {
          return enemy.move(_this.room.walls);
        });
        this.room.animate();
        this.room.draw(this.ctx);
        player.draw(this.ctx);
        this.stop();

        if (this.requestStop) {
          cancelAnimationFrame(this.requestId);
          var fontFamily = "Courier New";

          if (this.win()) {
            this.ctx.fillStyle = "rgba(0,0,0,0.5)";
            this.ctx.fillRect(0, 0, 720, 720);
            this.ctx.fillStyle = "#fffaf4";
            this.ctx.font = "48px ".concat(fontFamily);
            this.ctx.fillText("Congratulations!", 48 * 3, 48 * 4);
            this.ctx.font = "24px ".concat(fontFamily);
            this.ctx.fillText("You leave with your life,", 48 * 4, 48 * 5);
            this.ctx.fillText("and your pockets full!", 48 * 4.5, 48 * 5.5);
            this.ctx.fillText("Click 'Restart' up top if", 48 * 4, 48 * 7);
            this.ctx.fillText("you'd like to play again", 48 * 4.2, 48 * 7.5);
          }

          if (this.lose()) {
            var font = _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.FONT.font;
            this.ctx.fillStyle = "rgba(0,0,0,0.5)";
            this.ctx.fillRect(0, 0, 720, 720);
            this.ctx.fillStyle = "#fffaf4";
            this.ctx.font = "48px ".concat(fontFamily);
            this.ctx.fillText("GAME OVER", 48 * 4.75, 48 * 4);
            this.ctx.font = "36px ".concat(fontFamily);
            this.ctx.fillText("you lose!", 48 * 5.65, 48 * 5);
            this.ctx.font = "96px ".concat(fontFamily);
            this.ctx.fillText("💀", 48 * 6.25, 48 * 7);
            this.ctx.font = "24px ".concat(fontFamily);
            this.ctx.fillText("Click 'Restart' up top if", 48 * 4, 48 * 9);
            this.ctx.fillText("you'd like to play again", 48 * 4.2, 48 * 9.5);
          }

          return;
        }
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.then = Date.now();
      this.gameStep();
      requestAnimationFrame(this.gameStep);
    }
  }]);

  return Game;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/scripts/game_start.js":
/*!***********************************!*\
  !*** ./src/scripts/game_start.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/global_vars */ "./src/scripts/utils/global_vars.js");
/* harmony import */ var _utils_func_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/func_utils */ "./src/scripts/utils/func_utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var GameStart = /*#__PURE__*/function () {
  function GameStart(ctx, playerSprite) {
    _classCallCheck(this, GameStart);

    this.ctx = ctx;
    this.playerSprite = playerSprite;
    this.fpsInterval = 1000 / 60;
    this.theta = 0;
    this.step = this.step.bind(this);
  }

  _createClass(GameStart, [{
    key: "step",
    value: function step() {
      this.requestId = requestAnimationFrame(this.step);
      var now = Date.now();
      var elapsed = now - this.then;

      if (elapsed > this.fpsInterval) {
        var fontFamily = "Courier New";
        this.theta += 0.01;
        var red = Math.floor(127 * Math.sin(1.1 * this.theta) + 1);
        var green = Math.floor(127 * Math.sin(1.2 * this.theta) + 1);
        var blue = Math.floor(127 * Math.sin(1.5 * this.theta) + 1);
        var color = "rgba(".concat(red, ",").concat(green, ",").concat(blue, ", 0.7)");
        this.ctx.clearRect(0, 0, 720, 720);
        this.ctx.drawImage(_utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["4DLRU0"], 0, 0);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, 720, 720);
        this.ctx.fillStyle = "#fffaf4";
        this.ctx.font = "bold 48px ".concat(fontFamily);
        this.ctx.fillText("Press ENTER", 48 * 4, 48 * 4);
        this.ctx.font = "bold 24px ".concat(fontFamily);
        this.ctx.fillText("...to begin a new crawl!", 48 * 5, 48 * 4.55);
        this.ctx.drawImage(this.playerSprite, 48, 0, 48, 48, 48 * 7, 48 * 7, 48, 48);

        if (_utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.KEYS.Enter) {
          cancelAnimationFrame(this.requestId);
          var restart = document.getElementById("restart");
          restart.removeAttribute("disabled");
          (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.newGame)();
        }
      }
    }
  }, {
    key: "prompt",
    value: function prompt() {
      this.then = Date.now();
      this.step();
    }
  }]);

  return GameStart;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameStart);

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/scripts/entity.js");
/* harmony import */ var _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/global_vars */ "./src/scripts/utils/global_vars.js");
/* harmony import */ var _utils_func_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/func_utils */ "./src/scripts/utils/func_utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var Player = /*#__PURE__*/function (_Entity) {
  _inherits(Player, _Entity);

  var _super = _createSuper(Player);

  function Player(pos, width, height, spritePalette) {
    var _this;

    _classCallCheck(this, Player);

    _this = _super.call(this, pos, width, height, spritePalette);
    _this.speed = 1.25;
    _this.normalizedSpeed = parseFloat(_this.speed) / Math.sqrt(2);
    _this.pace = 24 / _this.speed;
    _this.speedModifier = 1;
    _this.stamina = 1000;
    _this.invulnerable = 0;
    _this.hp = 20;
    _this.stride = {
      up: {
        stepCount: 0,
        palY: 48 * 6
      },
      down: {
        stepCount: 0,
        palY: 48 * 0
      },
      left: {
        stepCount: 0,
        palY: 48 * 2
      },
      right: {
        stepCount: 0,
        palY: 48 * 4
      }
    };
    return _this;
  }

  _createClass(Player, [{
    key: "newRoomPos",
    value: function newRoomPos(dir) {
      switch (dir) {
        case "up":
          this.pos[1] = 720 - 24;
          break;

        case "down":
          this.pos[1] = -24;
          break;

        case "left":
          this.pos[0] = 720 - 24;
          break;

        case "right":
          this.pos[0] = -24;
          break;
      }
    }
  }, {
    key: "stridePalettePos",
    value: function stridePalettePos(direction) {
      this.pace = 24 / (this.speed * this.speedModifier);

      if (this.stride[direction].stepCount <= this.pace) {
        this.stride[direction].stepCount++;
        return 48 * 1;
      } else if (this.stride[direction].stepCount <= 2 * this.pace) {
        this.stride[direction].stepCount++;
        return 48 * 0;
      } else if (this.stride[direction].stepCount <= 3 * this.pace) {
        this.stride[direction].stepCount++;
        return 48 * 1;
      } else if (this.stride[direction].stepCount <= 4 * this.pace) {
        this.stride[direction].stepCount++;
        return 48 * 2;
      } else if (this.stride[direction].stepCount > 4 * this.pace) {
        this.stride[direction].stepCount = 0;
        return 48 * 1;
      }
    }
  }, {
    key: "wallCheck",
    value: function wallCheck(walls) {
      var _iterator = _createForOfIteratorHelper(walls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var wall = _step.value;
          if (this.collidedOnSide("top", wall)) break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (this.collisions.top) {
        this.pos[1] = this.collisions.top - 32;
      }

      var _iterator2 = _createForOfIteratorHelper(walls),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _wall = _step2.value;
          if (this.collidedOnSide("bottom", _wall)) break;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (this.collisions.bottom) {
        this.pos[1] = this.collisions.bottom - 48;
      }

      var _iterator3 = _createForOfIteratorHelper(walls),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _wall2 = _step3.value;
          if (this.collidedOnSide("left", _wall2)) break;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (this.collisions.left) {
        this.pos[0] = this.collisions.left - 12;
      }

      var _iterator4 = _createForOfIteratorHelper(walls),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _wall3 = _step4.value;
          if (this.collidedOnSide("right", _wall3)) break;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (this.collisions.right) {
        this.pos[0] = this.collisions.right - 36;
      }
    }
  }, {
    key: "hit",
    value: function hit() {
      this.invulnerable = 75;
    }
  }, {
    key: "move",
    value: function move(walls) {
      var _ref = [_utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS.w, _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS.s, _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS.a, _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS.d, _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS.Shift],
          up = _ref[0],
          down = _ref[1],
          left = _ref[2],
          right = _ref[3],
          shift = _ref[4];

      if (shift && this.stamina > 0) {
        this.speedModifier = 1.5;
        this.stamina -= 4;
      } else {
        this.speedModifier = 1;
      }

      if (this.stamina < 0) this.stamina = 0;
      if (!shift && this.stamina < 1000) this.stamina += 1;
      if (this.invulnerable) this.invulnerable--;
      if (this.invulverable < 0) this.invulnerable = 0;
      this.wallCheck(walls); // W key movements and sprite direction

      if (up) {
        if (left || right && !this.collisions.top) {
          this.pos[1] += -this.normalizedSpeed * this.speedModifier;
        } else {
          this.pos[1] += -this.speed * this.speedModifier;
        }

        this.drawOptions.palY = this.stride.up.palY;

        if (!left && !right) {
          this.drawOptions.palX = this.stridePalettePos("up");
        }
      } // S key movements and sprite direction


      if (down) {
        if (left || right) {
          this.pos[1] += this.normalizedSpeed * this.speedModifier;
        } else {
          this.pos[1] += this.speed * this.speedModifier;
        }

        this.drawOptions.palY = this.stride.down.palY;

        if (!left && !right) {
          this.drawOptions.palX = this.stridePalettePos("down");
        }
      } // A key movement


      if (left) {
        if (up || down && !this.collisions.left) {
          this.pos[0] += -this.normalizedSpeed * this.speedModifier;
        } else {
          this.pos[0] += -this.speed * this.speedModifier;
        }

        this.drawOptions.palY = this.stride.left.palY;
        this.drawOptions.palX = this.stridePalettePos("left");
      } // D key movement


      if (right) {
        if (up || down) {
          this.pos[0] += this.normalizedSpeed * this.speedModifier;
        } else {
          this.pos[0] += this.speed * this.speedModifier;
        }

        this.drawOptions.palY = this.stride.right.palY;
        this.drawOptions.palX = this.stridePalettePos("right");
      } // if none of the keys are being pressed, go to default stance


      if (!up && !down && !right && !left) {
        this.drawOptions.palX = 48 * 1;
      }

      var _this$pos = _slicedToArray(this.pos, 2),
          x = _this$pos[0],
          y = _this$pos[1];

      var exitDir;

      if (x < -24) {
        exitDir = "left";
        this.newRoomPos(exitDir);
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.roomChange)(exitDir, _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.SESSION.game.room);
      } else if (x > 720 - 24) {
        exitDir = "right";
        this.newRoomPos(exitDir);
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.roomChange)(exitDir, _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.SESSION.game.room);
      } else if (y < -24) {
        exitDir = "up";
        this.newRoomPos(exitDir);
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.roomChange)(exitDir, _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.SESSION.game.room);
      } else if (y > 720 - 24) {
        exitDir = "down";
        this.newRoomPos(exitDir);
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.roomChange)(exitDir, _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.SESSION.game.room);
      }

      this.updateSides();
      this.drawOptions.x = this.pos[0];
      this.drawOptions.y = this.pos[1];
    }
  }]);

  return Player;
}(_entity__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/scripts/room.js":
/*!*****************************!*\
  !*** ./src/scripts/room.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/global_vars */ "./src/scripts/utils/global_vars.js");
/* harmony import */ var _wall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wall */ "./src/scripts/wall.js");
/* harmony import */ var _coin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coin */ "./src/scripts/coin.js");
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemy */ "./src/scripts/enemy.js");
/* harmony import */ var _utils_func_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/func_utils */ "./src/scripts/utils/func_utils.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var Room = /*#__PURE__*/function () {
  function Room(neighbor) {
    _classCallCheck(this, Room);

    this.generateCoins();
    this.walls = [];
    var randIdx;
    this.neighbors = {
      up: undefined,
      down: undefined,
      left: undefined,
      right: undefined
    };
    var entryDir;

    if (neighbor) {
      var exitDir = Object.keys(neighbor)[0];
      var prevRoom = Object.values(neighbor)[0];
      this.nodePos = _toConsumableArray(prevRoom.nodePos);

      switch (exitDir) {
        case "up":
          this.neighbors.down = prevRoom;
          entryDir = "D";
          this.nodePos[1]++;
          break;

        case "down":
          this.neighbors.up = prevRoom;
          entryDir = "U";
          this.nodePos[1]--;
          break;

        case "left":
          this.neighbors.right = prevRoom;
          entryDir = "R";
          this.nodePos[0]--;
          break;

        case "right":
          this.neighbors.left = prevRoom;
          entryDir = "L";
          this.nodePos[0]++;
          break;
      }
    } else {
      this.nodePos = [0, 0];
    }

    _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms["".concat(this.nodePos)] = this;
    (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.addValidNeighbors)(this);
    var walls, numPaths, randPaths;
    var newPaths = [];
    var paths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.buildPaths)(this);
    var pathsArr = paths.split("");

    if (neighbor) {
      // if not initial room
      pathsArr = pathsArr.filter(function (path) {
        return path !== entryDir;
      }); // remove entryDir from paths

      numPaths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.randNumPaths)(paths.length); // weighted random number generator, prefers more paths

      if (numPaths === paths.length) {
        var _this$walls;

        // if all 4 paths are available
        randIdx = Math.floor(Math.random() * 3);
        this.background = _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["".concat(numPaths).concat(paths).concat(randIdx)];
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.assignBlockedPaths)(this, paths);
        walls = this.buildRoomWalls(paths);

        (_this$walls = this.walls).push.apply(_this$walls, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms["".concat(this.nodePos)] = this;
      } else {
        var _this$walls2;

        // less than 4 paths available
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.shuffle)(pathsArr); // randomize the path choices

        newPaths.push(entryDir); // MUST ALWAYS have the path you enter from

        numPaths--;

        for (var i = 0; i < numPaths; i++) {
          newPaths.push(pathsArr.pop());
        }

        newPaths = newPaths.sort().join("");
        randIdx = Math.floor(Math.random() * 3);
        this.background = _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["".concat(numPaths + 1).concat(newPaths).concat(randIdx)];

        if (!this.background) {}

        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.assignBlockedPaths)(this, newPaths);
        walls = this.buildRoomWalls(newPaths);

        (_this$walls2 = this.walls).push.apply(_this$walls2, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms["".concat(this.nodePos)] = this;
      }
    } else {
      numPaths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.randNumPaths)(paths.length);

      if (numPaths === paths.length) {
        var _this$walls3;

        randIdx = Math.floor(Math.random() * 3);
        this.background = _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["".concat(numPaths).concat(paths).concat(randIdx)];
        walls = this.buildRoomWalls(paths);

        (_this$walls3 = this.walls).push.apply(_this$walls3, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms["".concat(this.nodePos)] = this;
      } else {
        var _this$walls4;

        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.shuffle)(pathsArr);

        for (var _i = 0; _i < numPaths; _i++) {
          newPaths.push(pathsArr.pop());
        }

        newPaths = newPaths.sort().join("");
        randIdx = Math.floor(Math.random() * 3);
        this.background = _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["".concat(numPaths).concat(newPaths).concat(randIdx)];
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.assignBlockedPaths)(this, newPaths);
        walls = this.buildRoomWalls(newPaths);

        (_this$walls4 = this.walls).push.apply(_this$walls4, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms["".concat(this.nodePos)] = this;
      }
    }

    this.generateEnemies(); // this.animatedObjects = {};
    // Object.values(this.coins).forEach(coin => {
    //   this.animatedObjects[`coin-${coin.pos}`] = coin;
    // });
  }

  _createClass(Room, [{
    key: "generateEnemies",
    value: function generateEnemies() {
      var numEnemies = Math.floor(Object.keys(_utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms).length / 2);
      this.enemies = {};

      for (var i = 0; i < numEnemies; i++) {
        var x = Math.floor(Math.random() * 592) + 64;

        while (x > 336 && x < 384) {
          x = Math.floor(Math.random() * 592) + 64;
        }

        var y = Math.floor(Math.random() * 592) + 64;

        while (y > 336 && y < 384) {
          y = Math.floor(Math.random() * 592) + 64;
        }

        var pos = [x, y];
        var enemy = new _enemy__WEBPACK_IMPORTED_MODULE_3__.default(pos, 48, 48, _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SPRITES.monsters, "blob", 200 + numEnemies * 50);
        this.enemies["".concat(enemy.pos)] = enemy;
      }
    }
  }, {
    key: "generateCoins",
    value: function generateCoins() {
      var numCoins = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_4__.randNumCoins)();
      this.coins = {};

      for (var i = 0; i < numCoins; i++) {
        var x = Math.floor(Math.random() * 592) + 64;

        while (x > 336 && x < 384) {
          x = Math.floor(Math.random() * 592) + 64;
        }

        var y = Math.floor(Math.random() * 592) + 64;

        while (y > 336 && y < 384) {
          y = Math.floor(Math.random() * 592) + 64;
        }

        var pos = [x, y];
        var coin = new _coin__WEBPACK_IMPORTED_MODULE_2__.default(pos, 16, 16, _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SPRITES.coin);
        this.coins["".concat(coin.pos)] = coin;
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      this.collect();
      Object.values(this.coins).forEach(function (coin) {
        coin.animate();
      }); // Object.values(this.animatedObjects).forEach(object => object.animate());
    }
  }, {
    key: "collect",
    value: function collect() {
      for (var _i2 = 0, _Object$values = Object.values(this.coins); _i2 < _Object$values.length; _i2++) {
        var coin = _Object$values[_i2];

        if (coin.collect()) {
          delete this.coins["".concat(coin.pos)];
          _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.coinCount++;
          return;
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.background, 0, 0); // this.walls.forEach(wall => wall.draw(ctx));

      Object.values(this.coins).forEach(function (coin) {
        return coin.draw(ctx);
      });
      Object.values(this.enemies).forEach(function (enemy) {
        return enemy.draw(ctx);
      });
      ctx.fillStyle = "#fffaf4";
      ctx.font = "20px arial";
      ctx.fillText("Room [ ".concat(this.nodePos, " ]"), 15, 30);
      ctx.fillText("Coins x ".concat(_utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.coinCount), 590, 30);
      ctx.beginPath();
      ctx.strokeStyle = "#ffbb00";
      ctx.moveTo(15, 705);
      ctx.lineWidth = 5;
      ctx.lineTo(15 + _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.player.stamina / 1000 * 100, 705);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#33ff00";
      ctx.moveTo(15, 690);
      ctx.lineWidth = 10;
      ctx.lineTo(15 + _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.player.hp / 20 * 100, 690);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#ff0000";
      ctx.moveTo(115 - (1 - _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.player.hp / 20) * 100, 690);
      ctx.lineWidth = 10;
      ctx.lineTo(115, 690);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#00dddd";
      ctx.moveTo(15, 699);
      ctx.lineWidth = 5;
      ctx.lineTo(15 + _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.player.invulnerable / 75 * 100, 699);
      ctx.stroke(); // ctx.fillText(`Stamina = ${Global.SESSION.player.stamina}`, 15, 400);
    }
  }, {
    key: "buildRoomWalls",
    value: function buildRoomWalls(paths) {
      var walls = [];

      switch (paths) {
        case "DLRU":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48 * 6, 48)); // up left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 0], 48 * 6, 48)); // up right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 48 * 6, 48)); // down left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 720 - 48], 48 * 6, 48)); // down right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 48 * 6)); // left up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 48 * 9], 48, 48 * 6)); // left down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 48 * 6)); // right up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 48 * 9], 48, 48 * 6)); // right down

          return walls;

        case "DLU":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48 * 6, 48)); // up left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 0], 48 * 6, 48)); // up right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 48 * 6, 48)); // down left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 720 - 48], 48 * 6, 48)); // down right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 48 * 6)); // left up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 48 * 9], 48, 48 * 6)); // left down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 720)); // right blocked

          return walls;

        case "LRU":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48 * 6, 48)); // up left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 0], 48 * 6, 48)); // up right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 48 * 6)); // left up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 48 * 9], 48, 48 * 6)); // left down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 48 * 6)); // right up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 48 * 9], 48, 48 * 6)); // right down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 720, 48)); // down blocked

          return walls;

        case "DRU":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48 * 6, 48)); // up left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 0], 48 * 6, 48)); // up right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 48 * 6, 48)); // down left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 720 - 48], 48 * 6, 48)); // down right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 48 * 6)); // right up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 48 * 9], 48, 48 * 6)); // right down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 720)); // left blocked

          return walls;

        case "DLR":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 48 * 6, 48)); // down left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 720 - 48], 48 * 6, 48)); // down right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 48 * 6)); // left up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 48 * 9], 48, 48 * 6)); // left down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 48 * 6)); // right up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 48 * 9], 48, 48 * 6)); // right down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 720, 48)); // up blocked

          return walls;

        case "LU":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 48 * 6)); // left up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 48 * 9], 48, 48 * 6)); // left down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48 * 6, 48)); // up left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 0], 48 * 6, 48)); // up right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 720)); // right blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 720, 48)); // down blocked

          return walls;

        case "DU":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48 * 6, 48)); // up left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 0], 48 * 6, 48)); // up right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 48 * 6, 48)); // down left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 720 - 48], 48 * 6, 48)); // down right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 720)); // left blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 720)); // right blocked

          return walls;

        case "RU":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 48 * 6)); // right up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 48 * 9], 48, 48 * 6)); // right down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48 * 6, 48)); // up left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 0], 48 * 6, 48)); // up right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 720, 48)); // down blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 720)); // left blocked

          return walls;

        case "DL":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 48 * 6)); // left up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 48 * 9], 48, 48 * 6)); // left down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 48 * 6, 48)); // down left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 720 - 48], 48 * 6, 48)); // down right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 720, 48)); // up blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 720)); // right blocked

          return walls;

        case "DR":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 48 * 6)); // right up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 48 * 9], 48, 48 * 6)); // right down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 48 * 6, 48)); // down left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 720 - 48], 48 * 6, 48)); // down right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 720)); // left blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 720, 48)); // up blocked

          return walls;

        case "LR":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 48 * 6)); // left up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 48 * 9], 48, 48 * 6)); // left down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 48 * 6)); // right up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 48 * 9], 48, 48 * 6)); // right down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 720, 48)); // down blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 720, 48)); // up blocked

          return walls;

        case "L":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 48 * 6)); // left up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 48 * 9], 48, 48 * 6)); // left down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 720)); // right blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 720, 48)); // down blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 720, 48)); // up blocked

          return walls;

        case "R":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 48 * 6)); // right up

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 48 * 9], 48, 48 * 6)); // right down

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 720, 48)); // down blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 720)); // left blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 720, 48)); // up blocked

          return walls;

        case "U":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48 * 6, 48)); // up left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 0], 48 * 6, 48)); // up right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 720)); // right blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 720, 48)); // down blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 720)); // left blocked

          return walls;

        case "D":
          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 720 - 48], 48 * 6, 48)); // down left

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([48 * 9, 720 - 48], 48 * 6, 48)); // down right

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([720 - 48, 0], 48, 720)); // right blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 48, 720)); // left blocked

          walls.push(new _wall__WEBPACK_IMPORTED_MODULE_1__.default([0, 0], 720, 48)); // up blocked

          return walls;
      }
    }
  }]);

  return Room;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);

/***/ }),

/***/ "./src/scripts/utils/func_utils.js":
/*!*****************************************!*\
  !*** ./src/scripts/utils/func_utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newGame": () => (/* binding */ newGame),
/* harmony export */   "collidedWithSide": () => (/* binding */ collidedWithSide),
/* harmony export */   "roomChange": () => (/* binding */ roomChange),
/* harmony export */   "randNumPaths": () => (/* binding */ randNumPaths),
/* harmony export */   "addValidNeighbors": () => (/* binding */ addValidNeighbors),
/* harmony export */   "buildPaths": () => (/* binding */ buildPaths),
/* harmony export */   "assignBlockedPaths": () => (/* binding */ assignBlockedPaths),
/* harmony export */   "randNumCoins": () => (/* binding */ randNumCoins),
/* harmony export */   "randCoinSound": () => (/* binding */ randCoinSound),
/* harmony export */   "shuffle": () => (/* binding */ shuffle),
/* harmony export */   "normalizedMovement": () => (/* binding */ normalizedMovement),
/* harmony export */   "distanceToPlayer": () => (/* binding */ distanceToPlayer)
/* harmony export */ });
/* harmony import */ var _global_vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global_vars */ "./src/scripts/utils/global_vars.js");
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../room */ "./src/scripts/room.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game */ "./src/scripts/game.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var newGame = function newGame() {
  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game) {
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game.requestStop = true;
    delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game;
    delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.player;
    delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.coinCount;
    delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms;
  }

  _construct(_game__WEBPACK_IMPORTED_MODULE_2__.default, _toConsumableArray(Object.values(_global_vars__WEBPACK_IMPORTED_MODULE_0__.GAME_OPTIONS)));
};
var collidedWithSide = function collidedWithSide(side, thisSide, otherSide) {
  var collided = false;
  var upperDiff, lowerDiff;
  var upperBounds = 10;
  var lowerBounds = 0;

  if (side === "top" || side === "bottom") {
    var thisYVal = thisSide[1];

    var _thisSide$ = _slicedToArray(thisSide[0], 2),
        thisXMin = _thisSide$[0],
        thisXMax = _thisSide$[1];

    var otherYVal = otherSide[1];

    var _otherSide$ = _slicedToArray(otherSide[0], 2),
        otherXMin = _otherSide$[0],
        otherXMax = _otherSide$[1];

    switch (side) {
      case "top":
        upperDiff = otherYVal - thisYVal < upperBounds;
        lowerDiff = otherYVal - thisYVal > lowerBounds;
        collided = thisYVal < otherYVal && thisXMin < otherXMax && thisXMax > otherXMin && upperDiff && lowerDiff;
        break;

      case "bottom":
        upperDiff = thisYVal - otherYVal < upperBounds;
        lowerDiff = thisYVal - otherYVal > lowerBounds;
        collided = thisYVal > otherYVal && thisXMin < otherXMax && thisXMax > otherXMin && upperDiff && lowerDiff;
        break;

      default:
        break;
    }

    if (collided) return otherYVal;
  } else {
    var thisXVal = thisSide[0];

    var _thisSide$2 = _slicedToArray(thisSide[1], 2),
        thisYMin = _thisSide$2[0],
        thisYMax = _thisSide$2[1];

    var otherXVal = otherSide[0];

    var _otherSide$2 = _slicedToArray(otherSide[1], 2),
        otherYMin = _otherSide$2[0],
        otherYMax = _otherSide$2[1];

    switch (side) {
      case "left":
        upperDiff = otherXVal - thisXVal < upperBounds;
        lowerDiff = otherXVal - thisXVal > lowerBounds;
        collided = thisXVal < otherXVal && thisYMin < otherYMax && thisYMax > otherYMin && upperDiff && lowerDiff;
        break;

      case "right":
        upperDiff = thisXVal - otherXVal < upperBounds;
        lowerDiff = thisXVal - otherXVal > lowerBounds;
        collided = thisXVal > otherXVal && thisYMin < otherYMax && thisYMax > otherYMin && upperDiff && lowerDiff;
        break;

      default:
        break;
    }

    if (collided) return otherXVal;
  }

  return false;
};
var roomChange = function roomChange(exitDir, currRoom) {
  var nextNodePos = _toConsumableArray(currRoom.nodePos);

  switch (exitDir) {
    case "up":
      nextNodePos[1] += 1;
      break;

    case "down":
      nextNodePos[1] -= 1;
      break;

    case "left":
      nextNodePos[0] -= 1;
      break;

    case "right":
      nextNodePos[0] += 1;
      break;
  }

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms["".concat(nextNodePos)]) {
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game.room = _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms["".concat(nextNodePos)];
  } else {
    var neighbor = _defineProperty({}, exitDir, currRoom);

    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game.room = new _room__WEBPACK_IMPORTED_MODULE_1__.default(neighbor);
    addValidNeighbors(currRoom);
    addValidNeighbors(_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game.room);
  }
};
var randNumPaths = function randNumPaths(max) {
  var paths = [];

  if (max > 3) {
    for (var i = 0; i < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][4]; i++) {
      paths.push(4);
    }

    for (var _i2 = 0; _i2 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][3]; _i2++) {
      paths.push(3);
    }

    for (var _i3 = 0; _i3 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][2]; _i3++) {
      paths.push(2);
    }

    for (var _i4 = 0; _i4 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][1]; _i4++) {
      paths.push(1);
    }
  } else if (max > 2) {
    for (var _i5 = 0; _i5 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][3]; _i5++) {
      paths.push(3);
    }

    for (var _i6 = 0; _i6 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][2]; _i6++) {
      paths.push(2);
    }

    for (var _i7 = 0; _i7 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][1]; _i7++) {
      paths.push(1);
    }
  } else if (max > 1) {
    for (var _i8 = 0; _i8 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][2]; _i8++) {
      paths.push(2);
    }

    for (var _i9 = 0; _i9 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.WEIGHTS[max][1]; _i9++) {
      paths.push(1);
    }
  } else {
    paths.push(1);
  }

  shuffle(paths);
  return paths[Math.floor(Math.random() * paths.length)];
};
var addValidNeighbors = function addValidNeighbors(room) {
  var up = _toConsumableArray(room.nodePos);

  up[1] += 1;
  up = up.toString();

  var down = _toConsumableArray(room.nodePos);

  down[1] -= 1;
  down = down.toString();

  var left = _toConsumableArray(room.nodePos);

  left[0] -= 1;
  left = left.toString();

  var right = _toConsumableArray(room.nodePos);

  right[0] += 1;
  right = right.toString();

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[up] && _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[up].neighbors.down !== "X" && !room.neighbors.up) {
    room.neighbors.up = _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[up];
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[up].neighbors.down = room;
  }

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[down] && _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[down].neighbors.up !== "X" && !room.neighbors.down) {
    room.neighbors.down = _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[down];
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[down].neighbors.up = room;
  }

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[left] && _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[left].neighbors.right !== "X" && !room.neighbors.left) {
    room.neighbors.left = _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[left];
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[left].neighbors.right = room;
  }

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[right] && _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[right].neighbors.left !== "X" && !room.neighbors.right) {
    room.neighbors.right = _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[right];
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[right].neighbors.left = room;
  }
};
var buildPaths = function buildPaths(room) {
  var paths = [];

  var up = _toConsumableArray(room.nodePos);

  up[1] += 1;
  up = up.toString();

  var down = _toConsumableArray(room.nodePos);

  down[1] -= 1;
  down = down.toString();

  var left = _toConsumableArray(room.nodePos);

  left[0] -= 1;
  left = left.toString();

  var right = _toConsumableArray(room.nodePos);

  right[0] += 1;
  right = right.toString();

  if (!_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[up] || _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[up].neighbors.down !== "X") {
    paths.push("U");
  }

  if (!_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[down] || _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[down].neighbors.up !== "X") {
    paths.push("D");
  }

  if (!_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[left] || _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[left].neighbors.right !== "X") {
    paths.push("L");
  }

  if (!_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[right] || _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.rooms[right].neighbors.left !== "X") {
    paths.push("R");
  }

  return paths.sort().join("");
};
var assignBlockedPaths = function assignBlockedPaths(room, paths) {
  if (!paths.includes("U")) {
    room.neighbors.up = "X";
  }

  if (!paths.includes("D")) {
    room.neighbors.down = "X";
  }

  if (!paths.includes("L")) {
    room.neighbors.left = "X";
  }

  if (!paths.includes("R")) {
    room.neighbors.right = "X";
  }
};
var randNumCoins = function randNumCoins() {
  var weightedNumCoins = [];

  for (var i = 0; i < _global_vars__WEBPACK_IMPORTED_MODULE_0__.COIN_WEIGHTS[3]; i++) {
    weightedNumCoins.push(3);
  }

  for (var _i10 = 0; _i10 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.COIN_WEIGHTS[2]; _i10++) {
    weightedNumCoins.push(2);
  }

  for (var _i11 = 0; _i11 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.COIN_WEIGHTS[1]; _i11++) {
    weightedNumCoins.push(1);
  }

  for (var _i12 = 0; _i12 < _global_vars__WEBPACK_IMPORTED_MODULE_0__.COIN_WEIGHTS[0]; _i12++) {
    weightedNumCoins.push(0);
  }

  var randIdx = Math.floor(Math.random() * weightedNumCoins.length);
  shuffle(weightedNumCoins);
  return weightedNumCoins[randIdx];
};
var randCoinSound = function randCoinSound() {
  var i = Math.floor(Math.random() * 9);
  return document.getElementById("coin".concat(i));
};
var shuffle = function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
  }
};
var normalizedMovement = function normalizedMovement(myself, entity, chasingPlayer) {
  var mx = myself.center[0];
  var my = myself.center[1];
  var ex = entity.center[0];
  var ey = entity.center[1];
  var dx = mx - ex;
  var dy = my - ey;

  if (!chasingPlayer) {
    var randAngle = Math.random() * 2 * Math.PI;
    dx = Math.cos(randAngle) * myself.speed;
    dy = Math.sin(randAngle) * myself.speed;
  }

  var angle = Math.atan(dy / dx);
  var ny = Math.sin(angle) * myself.speed;
  var nx = Math.cos(angle) * myself.speed;
  return {
    dx: dx,
    dy: dy,
    nx: nx,
    ny: ny,
    up: dy > 0 && Math.abs(dy) > Math.abs(dx),
    down: dy < 0 && Math.abs(dy) > Math.abs(dx),
    left: dx > 0 && Math.abs(dx) > Math.abs(dy),
    right: dx < 0 && Math.abs(dx) > Math.abs(dy)
  };
};
var distanceToPlayer = function distanceToPlayer(myself, player) {
  var mx = myself.center[0];
  var my = myself.center[1];
  var px = player.center[0];
  var py = player.center[1];
  var dx = px - mx;
  var dy = py - my;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

/***/ }),

/***/ "./src/scripts/utils/global_vars.js":
/*!******************************************!*\
  !*** ./src/scripts/utils/global_vars.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WIDTH": () => (/* binding */ WIDTH),
/* harmony export */   "HEIGHT": () => (/* binding */ HEIGHT),
/* harmony export */   "SPRITE_DIMS": () => (/* binding */ SPRITE_DIMS),
/* harmony export */   "FPS": () => (/* binding */ FPS),
/* harmony export */   "KEYS": () => (/* binding */ KEYS),
/* harmony export */   "FONT": () => (/* binding */ FONT),
/* harmony export */   "SESSION": () => (/* binding */ SESSION),
/* harmony export */   "SPRITES": () => (/* binding */ SPRITES),
/* harmony export */   "BG_IMGS": () => (/* binding */ BG_IMGS),
/* harmony export */   "COIN_WEIGHTS": () => (/* binding */ COIN_WEIGHTS),
/* harmony export */   "ALL_PATHS": () => (/* binding */ ALL_PATHS),
/* harmony export */   "WEIGHTS": () => (/* binding */ WEIGHTS),
/* harmony export */   "GAME_OPTIONS": () => (/* binding */ GAME_OPTIONS),
/* harmony export */   "REQUEST": () => (/* binding */ REQUEST)
/* harmony export */ });
var WIDTH = 720;
var HEIGHT = 720;
var SPRITE_DIMS = [48, 48];
var FPS = 1000 / 60;
var KEYS = {
  87: false,
  // W
  65: false,
  // A
  83: false,
  // S
  68: false,
  // D
  16: false // L-Shift

};
var FONT = {};
var SESSION = {};
var SPRITES = {};
var BG_IMGS = {};
var COIN_WEIGHTS = {
  3: 2,
  2: 8,
  1: 30,
  0: 75
};
var ALL_PATHS = ["DLRU", "DLR", "DLU", "LRU", "DRU", "DL", "DR", "DU", "LR", "LU", "RU", "D", "L", "R", "U"];
var WEIGHTS = {
  4: {
    4: 55,
    3: 45,
    2: 9,
    1: 1
  },
  3: {
    3: 80,
    2: 20,
    1: 3
  },
  2: {
    2: 90,
    1: 10
  }
};
var GAME_OPTIONS = {};
var REQUEST = {};

/***/ }),

/***/ "./src/scripts/utils/install_listeners.js":
/*!************************************************!*\
  !*** ./src/scripts/utils/install_listeners.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global_vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global_vars */ "./src/scripts/utils/global_vars.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game */ "./src/scripts/game.js");
/* harmony import */ var _utils_func_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/func_utils */ "./src/scripts/utils/func_utils.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (KEYS) {
  document.addEventListener("keydown", function (e) {
    debugger;
    if (e.key.toLowerCase() === "w" && !KEYS["w"]) KEYS[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "a" && !KEYS["a"]) KEYS[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "s" && !KEYS["s"]) KEYS[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "d" && !KEYS["d"]) KEYS[e.key.toLowerCase()] = true;
    if (e.key === "Shift" && !KEYS["Shift"]) KEYS[e.key] = true;
    if (e.key === "Enter" && !KEYS["Enter"]) KEYS[e.key] = true;
  });
  document.addEventListener("keyup", function (e) {
    if (e.key.toLowerCase() === "w" && KEYS["w"]) KEYS[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "a" && KEYS["a"]) KEYS[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "s" && KEYS["s"]) KEYS[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "d" && KEYS["d"]) KEYS[e.key.toLowerCase()] = false;
    if (e.key === "Shift" && KEYS["Shift"]) KEYS[e.key] = false;
    if (e.key === "Enter" && KEYS["Enter"]) KEYS[e.key] = false;
  });
  var howTo = document.getElementById("how-to");
  howTo.addEventListener("mouseenter", function (e) {
    document.getElementById("how-to-pointer").classList.add("active");
    document.getElementById("how-to-sound").play();
    document.getElementById("how-to").classList.add("active");
    document.querySelector("#how-to > ul").classList.add("active");
  });
  howTo.addEventListener("mouseleave", function (e) {
    document.getElementById("how-to").classList.remove("active");
    document.getElementById("how-to-pointer").classList.remove("active");
    document.querySelector("#how-to > ul").classList.remove("active");
  });
  var restart = document.getElementById("restart");
  restart.addEventListener("mouseenter", function (e) {
    document.getElementById("restart-sound").play();
    document.getElementById("restart").classList.add("active");
    document.getElementById("restart-pointer").classList.add("active");
  });
  restart.addEventListener("mouseleave", function (e) {
    document.getElementById("restart").classList.remove("active");
    document.getElementById("restart-pointer").classList.remove("active");
  });
  restart.addEventListener("click", function (e) {
    e.preventDefault();
    (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.newGame)();
  });
});

/***/ }),

/***/ "./src/scripts/wall.js":
/*!*****************************!*\
  !*** ./src/scripts/wall.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Wall = /*#__PURE__*/function () {
  function Wall(pos, width, height) {
    _classCallCheck(this, Wall);

    this.width = width;
    this.height = height;
    this.pos = pos;

    var _this$pos = _slicedToArray(this.pos, 2),
        x = _this$pos[0],
        y = _this$pos[1];

    var topLeft = this.pos;
    var topRight = [x + this.width, y];
    var bottomRight = [x + this.width, y + this.height];
    var bottomLeft = [x, y + this.height];
    this.top = [[topLeft[0], topRight[0]], topLeft[1]];
    this.bottom = [[bottomLeft[0], bottomRight[0]], bottomLeft[1]];
    this.right = [topRight[0], [topRight[1], bottomRight[1]]];
    this.left = [topLeft[0], [topLeft[1], bottomLeft[1]]];
  }

  _createClass(Wall, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = "#transparent";
      ctx.fillRect.apply(ctx, _toConsumableArray(this.pos).concat([this.width, this.height]));
    }
  }]);

  return Wall;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wall);

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _scripts_utils_install_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/utils/install_listeners */ "./src/scripts/utils/install_listeners.js");
/* harmony import */ var _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/utils/global_vars */ "./src/scripts/utils/global_vars.js");
/* harmony import */ var _scripts_game_start__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/game_start */ "./src/scripts/game_start.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("display");
  canvas.width = _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.WIDTH;
  canvas.height = _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.HEIGHT;
  var ctx = canvas.getContext("2d");
  (0,_scripts_utils_install_listeners__WEBPACK_IMPORTED_MODULE_1__.default)(_scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.KEYS); // let font = new FontFace("Press Start 2P", 'url(https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap)');
  // font.load().then(() => {
  //   Global.FONT = font;
  // });
  // const font = new FontFace("Press Start 2P", 'url(https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap)');
  // font.load().then(Global.FONT["font"] = font);

  var coinSprite = new Image();
  coinSprite.src = "./dist/assets/images/coin/coin.png";

  coinSprite.onload = function () {
    _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SPRITES.coin = coinSprite;
  };

  var monstersSprites = new Image();
  monstersSprites.src = "./dist/assets/images/enemies/monsters.png";

  monstersSprites.onload = function () {
    _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SPRITES.monsters = monstersSprites;
  };

  var _iterator = _createForOfIteratorHelper(_scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.ALL_PATHS),
      _step;

  try {
    var _loop = function _loop() {
      var path = _step.value;
      path = path.split("").sort().join("");

      var _loop2 = function _loop2(i) {
        var background = new Image();
        background.src = "./dist/assets/images/map_imgs/".concat(path.length, "/").concat(path, "/map").concat(i, ".png");

        background.onload = function () {
          _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.BG_IMGS["".concat(path.length).concat(path).concat(i)] = background; // Global.GB_IMGS["4DLRU0"] = background
        };
      };

      for (var i = 0; i < 3; i++) {
        _loop2(i);
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var playerSprite = new Image();
  playerSprite.src = "./dist/assets/images/rogue/rogue_walk.png";

  playerSprite.onload = function () {
    var gameStart = new _scripts_game_start__WEBPACK_IMPORTED_MODULE_3__.default(ctx, playerSprite);
    _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.GAME_OPTIONS.ctx = ctx;
    _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.GAME_OPTIONS.playerSprite = playerSprite;
    gameStart.prompt();
  };
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9jb2luLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2NvbGxpc2lvbl9ib3guanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW50aXR5LmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZ2FtZV9zdGFydC5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvcm9vbS5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9mdW5jX3V0aWxzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2luc3RhbGxfbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3dhbGwuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzPzg1NTkiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkVudGl0eSIsInBvcyIsIndpZHRoIiwiaGVpZ2h0Iiwic3ByaXRlUGFsZXR0ZSIsImNvbEJveFdpZHRoIiwiY29sQm94SGVpZ2h0IiwiZHJhd09wdGlvbnMiLCJpbWFnZSIsInBhbFgiLCJwYWxZIiwiX3NXaWR0aCIsIl9zSGVpZ2h0IiwieCIsInkiLCJfZFdpZHRoIiwiX2RIZWlnaHQiLCJjb2xCb3giLCJDb2xCb3giLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJjb2xsaXNpb25zIiwiY3giLCJjeSIsInVwZGF0ZVNpZGVzIiwic2lkZSIsIm90aGVyT2JqZWN0Iiwib3RoZXJTaWRlIiwiY29sbGlkZWRXaXRoU2lkZSIsImN0eCIsImRyYXdJbWFnZSIsIk9iamVjdCIsInZhbHVlcyIsImNlbnRlck9uRW50aXR5IiwiZHJhdyIsIkNvaW4iLCJmcmFtZUludGVydmFsIiwiZnJhbWVDb3VudCIsImNvbGxpZGVkT25TaWRlIiwiR2xvYmFsIiwicmFuZENvaW5Tb3VuZCIsInBsYXkiLCJpIiwiYyIsInciLCJlbnRpdHkiLCJvcmlnaW5Qb3MiLCJ0b3BMZWZ0IiwidG9wUmlnaHQiLCJib3R0b21SaWdodCIsImJvdHRvbUxlZnQiLCJjZW50ZXIiLCJzaWRlcyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwic3Ryb2tlUmVjdCIsImV4IiwiZXkiLCJldyIsImVoIiwidHciLCJ0aCIsImNvbEJveEhvb2siLCJFbmVteSIsInR5cGUiLCJkZXRlY3REaXN0Iiwic3BlZWQiLCJzcGVlZE1vZGlmaWVyIiwicGFjZSIsImNoYXNpbmdQbGF5ZXIiLCJpZGxlQ291bnQiLCJpZGxlTWF4IiwibW92ZW1lbnQiLCJ1cCIsImRvd24iLCJwYWxYT2Zmc2V0Iiwic3RyaWRlIiwic3RlcENvdW50IiwiZGlyZWN0aW9uIiwibXgiLCJteSIsImR4IiwiZHkiLCJkaXN0IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJyYW5kQW5nbGUiLCJyYW5kb20iLCJQSSIsImNvcyIsInNpbiIsImFuZ2xlIiwiYXRhbiIsIm55IiwibngiLCJhYnMiLCJzcHJpdGVEaXIiLCJmbG9vciIsIndhbGxzIiwicGxheWVyIiwiZGlzdFRvUGxheWVyIiwid2FsbENoZWNrIiwiaHAiLCJkYW1hZ2UiLCJoaXQiLCJ3YWxsIiwibmV3VmVjdG9ycyIsIm5vcm1hbGl6ZWRWZWN0b3JQb3MiLCJzdHJpZGVQYWxldHRlUG9zIiwiaGl0UGxheWVyIiwiR2FtZSIsInBsYXllclNwcml0ZSIsImZwc0ludGVydmFsIiwidG9QbGF5ZXIiLCJzdGFydGluZ1BvcyIsIlBsYXllciIsInN0YXJ0aW5nUm9vbSIsIlJvb20iLCJyb29tIiwiZ2FtZVN0ZXAiLCJiaW5kIiwic3RvcCIsIndpbiIsImxvc2UiLCJnYW1lT3ZlciIsInJlcXVlc3RTdG9wIiwicmVxdWVzdElkIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibm93IiwiRGF0ZSIsImVsYXBzZWQiLCJ0aGVuIiwiY2xlYXJSZWN0IiwibW92ZSIsImVuZW1pZXMiLCJmb3JFYWNoIiwiZW5lbXkiLCJhbmltYXRlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJmb250RmFtaWx5IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJHYW1lU3RhcnQiLCJ0aGV0YSIsInN0ZXAiLCJyZWQiLCJncmVlbiIsImJsdWUiLCJjb2xvciIsInJlc3RhcnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlQXR0cmlidXRlIiwibmV3R2FtZSIsIm5vcm1hbGl6ZWRTcGVlZCIsInBhcnNlRmxvYXQiLCJzdGFtaW5hIiwiaW52dWxuZXJhYmxlIiwiZGlyIiwic2hpZnQiLCJpbnZ1bHZlcmFibGUiLCJleGl0RGlyIiwibmV3Um9vbVBvcyIsInJvb21DaGFuZ2UiLCJuZWlnaGJvciIsImdlbmVyYXRlQ29pbnMiLCJyYW5kSWR4IiwibmVpZ2hib3JzIiwidW5kZWZpbmVkIiwiZW50cnlEaXIiLCJrZXlzIiwicHJldlJvb20iLCJub2RlUG9zIiwiYWRkVmFsaWROZWlnaGJvcnMiLCJudW1QYXRocyIsInJhbmRQYXRocyIsIm5ld1BhdGhzIiwicGF0aHMiLCJidWlsZFBhdGhzIiwicGF0aHNBcnIiLCJzcGxpdCIsImZpbHRlciIsInBhdGgiLCJyYW5kTnVtUGF0aHMiLCJsZW5ndGgiLCJiYWNrZ3JvdW5kIiwiYXNzaWduQmxvY2tlZFBhdGhzIiwiYnVpbGRSb29tV2FsbHMiLCJwdXNoIiwic2h1ZmZsZSIsInBvcCIsInNvcnQiLCJqb2luIiwiZ2VuZXJhdGVFbmVtaWVzIiwibnVtRW5lbWllcyIsIm51bUNvaW5zIiwicmFuZE51bUNvaW5zIiwiY29pbnMiLCJjb2luIiwiY29sbGVjdCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsIldhbGwiLCJ0aGlzU2lkZSIsImNvbGxpZGVkIiwidXBwZXJEaWZmIiwibG93ZXJEaWZmIiwidXBwZXJCb3VuZHMiLCJsb3dlckJvdW5kcyIsInRoaXNZVmFsIiwidGhpc1hNaW4iLCJ0aGlzWE1heCIsIm90aGVyWVZhbCIsIm90aGVyWE1pbiIsIm90aGVyWE1heCIsInRoaXNYVmFsIiwidGhpc1lNaW4iLCJ0aGlzWU1heCIsIm90aGVyWFZhbCIsIm90aGVyWU1pbiIsIm90aGVyWU1heCIsImN1cnJSb29tIiwibmV4dE5vZGVQb3MiLCJtYXgiLCJ0b1N0cmluZyIsImluY2x1ZGVzIiwid2VpZ2h0ZWROdW1Db2lucyIsImFyciIsImoiLCJub3JtYWxpemVkTW92ZW1lbnQiLCJteXNlbGYiLCJkaXN0YW5jZVRvUGxheWVyIiwicHgiLCJweSIsIldJRFRIIiwiSEVJR0hUIiwiU1BSSVRFX0RJTVMiLCJGUFMiLCJLRVlTIiwiRk9OVCIsIlNFU1NJT04iLCJTUFJJVEVTIiwiQkdfSU1HUyIsIkNPSU5fV0VJR0hUUyIsIkFMTF9QQVRIUyIsIldFSUdIVFMiLCJHQU1FX09QVElPTlMiLCJSRVFVRVNUIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXkiLCJ0b0xvd2VyQ2FzZSIsImhvd1RvIiwiY2xhc3NMaXN0IiwiYWRkIiwicXVlcnlTZWxlY3RvciIsInJlbW92ZSIsInByZXZlbnREZWZhdWx0IiwiY2FudmFzIiwiZ2V0Q29udGV4dCIsImluc3RhbGxMaXN0ZW5lcnMiLCJjb2luU3ByaXRlIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJtb25zdGVyc1Nwcml0ZXMiLCJnYW1lU3RhcnQiLCJwcm9tcHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7Q0FFQTs7SUFFTUEsTTtBQUNKLGtCQUFZQyxHQUFaLEVBQWdCQyxLQUFoQixFQUFzQkMsTUFBdEIsRUFBNkJDLGFBQTdCLEVBQTRDO0FBQUE7O0FBQzFDLFNBQUtILEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFFBQU1FLFdBQVcsR0FBR0gsS0FBcEI7QUFDQSxRQUFNSSxZQUFZLEdBQUdILE1BQXJCO0FBRUEsU0FBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CO0FBQ2pCQyxXQUFLLEVBQUVKLGFBRFU7QUFFakJLLFVBQUksRUFBRSxDQUZXO0FBR2pCQyxVQUFJLEVBQUUsQ0FIVztBQUlqQkMsYUFBTyxFQUFFVCxLQUpRO0FBS2pCVSxjQUFRLEVBQUVULE1BTE87QUFNakJVLE9BQUMsRUFBRVosR0FBRyxDQUFDLENBQUQsQ0FOVztBQU9qQmEsT0FBQyxFQUFFYixHQUFHLENBQUMsQ0FBRCxDQVBXO0FBUWpCYyxhQUFPLEVBQUViLEtBUlE7QUFTakJjLGNBQVEsRUFBRWI7QUFUTyxLQUFuQjtBQVdBLFNBQUtjLE1BQUwsR0FBYyxJQUFJ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WCxFQUFlVyxJQUFmLEdBQXNCQyxJQUF0QixDQUEyQixFQUEzQixDQUFQOztBQTlCZ0QsbUNBK0J2Q3pKLENBL0J1QztBQWdDOUMsWUFBTWtKLFVBQVUsR0FBRyxJQUFJK0UsS0FBSixFQUFuQjtBQUNBL0Usa0JBQVUsQ0FBQ2dGLEdBQVgsMkNBQWtEbkYsSUFBSSxDQUFDRSxNQUF2RCxjQUFpRUYsSUFBakUsaUJBQTRFL0ksQ0FBNUU7O0FBRUFrSixrQkFBVSxDQUFDaUYsTUFBWCxHQUFvQixZQUFNO0FBQ3hCdE8seUVBQUEsV0FBa0JrSixJQUFJLENBQUNFLE1BQXZCLFNBQWdDRixJQUFoQyxTQUF1Qy9JLENBQXZDLEtBQThDa0osVUFBOUMsQ0FEd0IsQ0FFeEI7QUFDRCxTQUhEO0FBbkM4Qzs7QUErQmhELFdBQUssSUFBSWxKLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFBQSxlQUFuQkEsQ0FBbUI7QUFRM0I7QUF2QytDOztBQTZCbEQsd0RBQW1DO0FBQUE7QUFXbEM7QUF4Q2lEO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBMENsRCxNQUFJc0UsWUFBWSxHQUFHLElBQUkySixLQUFKLEVBQW5CO0FBQ0EzSixjQUFZLENBQUM0SixHQUFiLEdBQW1CLDJDQUFuQjs7QUFFQTVKLGNBQVksQ0FBQzZKLE1BQWIsR0FBc0IsWUFBTTtBQUMxQixRQUFJRSxTQUFTLEdBQUcsSUFBSTlILHdEQUFKLENBQWNwSCxHQUFkLEVBQW1CbUYsWUFBbkIsQ0FBaEI7QUFDQXpFLDRFQUFBLEdBQTZCVixHQUE3QjtBQUNBVSxxRkFBQSxHQUFzQ3lFLFlBQXRDO0FBQ0ErSixhQUFTLENBQUNDLE1BQVY7QUFFRCxHQU5EO0FBUUQsQ0FyREQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbEJveCBmcm9tIFwiLi9jb2xsaXNpb25fYm94XCI7XG5pbXBvcnQgeyBjb2xsaWRlZFdpdGhTaWRlLCByYW5kQ29pblNvdW5kIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG4vLyBpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiO1xuXG5jbGFzcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29sQm94V2lkdGggPSB3aWR0aDtcbiAgICBjb25zdCBjb2xCb3hIZWlnaHQgPSBoZWlnaHQ7XG4gICAgXG4gICAgdGhpcy5zcHJpdGVQYWxldHRlID0gc3ByaXRlUGFsZXR0ZTtcbiAgICB0aGlzLmRyYXdPcHRpb25zID0ge1xuICAgICAgaW1hZ2U6IHNwcml0ZVBhbGV0dGUsXG4gICAgICBwYWxYOiAwLFxuICAgICAgcGFsWTogMCxcbiAgICAgIF9zV2lkdGg6IHdpZHRoLFxuICAgICAgX3NIZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHBvc1swXSxcbiAgICAgIHk6IHBvc1sxXSxcbiAgICAgIF9kV2lkdGg6IHdpZHRoLFxuICAgICAgX2RIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIHRoaXMuY29sQm94ID0gbmV3IENvbEJveCh0aGlzLGNvbEJveFdpZHRoLGNvbEJveEhlaWdodCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jb2xsaXNpb25zID0ge1xuICAgICAgdG9wOiBmYWxzZSxcbiAgICAgIGJvdHRvbTogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuICAgIFxuICB9XG5cbiAgY29sQm94SG9vaygpIHsgLy8gdGhpcyB3aWxsIGNlbnRlciB0aGUgY29sQm94IG9uIHRoZSBib3R0b21cbiAgICBsZXQgW3gseV0gPSBbdGhpcy5wb3NbMF0sdGhpcy5wb3NbMV1dO1xuICAgIGxldCBbY3gsY3ldID0gW1xuICAgICAgeCsoKHRoaXMud2lkdGggLSB0aGlzLmNvbEJveC53aWR0aCkvMiksXG4gICAgICB5Kyh0aGlzLmhlaWdodCAtIHRoaXMuY29sQm94LmhlaWdodCksXG4gICAgXTtcbiAgICByZXR1cm4gW2N4LGN5XTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIHRoaXMuY29sQm94LnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gIH1cblxuICBjb2xsaWRlZE9uU2lkZShzaWRlLCBvdGhlck9iamVjdCkge1xuICAgIGxldCBvdGhlclNpZGU7XG4gICAgc3dpdGNoKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJib3R0b21cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwidG9wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJyaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImxlZnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvdGhlclNpZGUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb25zW3NpZGVdID0gY29sbGlkZWRXaXRoU2lkZShzaWRlLCB0aGlzW3NpZGVdLCBvdGhlck9iamVjdFtvdGhlclNpZGVdKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zW3NpZGVdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKC4uLk9iamVjdC52YWx1ZXModGhpcy5kcmF3T3B0aW9ucykpO1xuICAgIHRoaXMuY29sQm94LmNlbnRlck9uRW50aXR5KCk7XG4gICAgdGhpcy5jb2xCb3guZHJhdyhjdHgpO1xuICB9XG59XG5cbmNsYXNzIENvaW4gZXh0ZW5kcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3MsIHdpZHRoLCBoZWlnaHQsIHNwcml0ZVBhbGV0dGUpIHtcbiAgICBzdXBlcihwb3MsIHdpZHRoLCBoZWlnaHQsIHNwcml0ZVBhbGV0dGUpO1xuICAgIHRoaXMuZnJhbWVJbnRlcnZhbCA9IDEyO1xuICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XG4gICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gMDtcbiAgfVxuXG4gIGNvbGxlY3QoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcInRvcFwiLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXllcikgfHxcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJib3R0b21cIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpIHx8XG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwibGVmdFwiLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXllcikgfHxcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJyaWdodFwiLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXllcilcbiAgICApIHtcbiAgICAgIHJhbmRDb2luU291bmQoKS5wbGF5KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICBjb25zdCBpID0gdGhpcy5mcmFtZUludGVydmFsO1xuICAgIGNvbnN0IGMgPSB0aGlzLmZyYW1lQ291bnQ7XG4gICAgY29uc3QgdyA9IHRoaXMud2lkdGg7XG4gICAgaWYgKGMgPCBpKSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMDtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqMikge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDE7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjMpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAyO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo0KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMztcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNSkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDQ7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjYpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA1O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo3KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNjtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqOCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDc7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDA7XG4gICAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2luOyIsIlxuXG5jbGFzcyBDb2xCb3gge1xuICBjb25zdHJ1Y3RvcihlbnRpdHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVudGl0eSA9IGVudGl0eTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5wb3MgPSB0aGlzLm9yaWdpblBvcygpO1xuXG4gICAgY29uc3QgW3gseV0gPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BMZWZ0ID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wUmlnaHQgPSBbeCt3aWR0aCx5XTtcbiAgICBjb25zdCBib3R0b21SaWdodCA9IFt4K3dpZHRoLHkraGVpZ2h0XTtcbiAgICBjb25zdCBib3R0b21MZWZ0ID0gW3gseStoZWlnaHRdO1xuICAgIFxuICAgIHRoaXMuY2VudGVyID0gW3grKHdpZHRoLzIpLHkrKGhlaWdodC8yKV07XG4gICAgdGhpcy50b3AgPSBbW3RvcExlZnRbMF0sdG9wUmlnaHRbMF1dLCB0b3BMZWZ0WzFdXTtcbiAgICB0aGlzLmJvdHRvbSA9IFtbYm90dG9tTGVmdFswXSxib3R0b21SaWdodFswXV0sIGJvdHRvbUxlZnRbMV1dO1xuICAgIHRoaXMucmlnaHQgPSBbdG9wUmlnaHRbMF0sIFt0b3BSaWdodFsxXSxib3R0b21SaWdodFsxXV1dO1xuICAgIHRoaXMubGVmdCA9IFt0b3BMZWZ0WzBdLCBbdG9wTGVmdFsxXSxib3R0b21MZWZ0WzFdXV07XG4gICAgdGhpcy5zaWRlcyA9IFt0aGlzLnRvcCwgdGhpcy5ib3R0b20sIHRoaXMucmlnaHQsIHRoaXMubGVmdF07XG4gICAgXG4gIH1cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgY3R4LnN0cm9rZVJlY3QoXG4gICAgICB0aGlzLnBvc1swXSxcbiAgICAgIHRoaXMucG9zWzFdLFxuICAgICAgdGhpcy53aWR0aCxcbiAgICAgIHRoaXMuaGVpZ2h0LFxuICAgIClcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grdGhpcy53aWR0aCx5XTtcbiAgICBjb25zdCBib3R0b21SaWdodCA9IFt4K3RoaXMud2lkdGgseSt0aGlzLmhlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkrdGhpcy5oZWlnaHRdO1xuICAgIHRoaXMuY2VudGVyID0gW3grKHRoaXMud2lkdGgvMikseSsodGhpcy5oZWlnaHQvMildO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICB9XG5cbiAgb3JpZ2luUG9zKCkge1xuICAgIGNvbnN0IFtleCxleV0gPSBbdGhpcy5lbnRpdHkucG9zWzBdLCB0aGlzLmVudGl0eS5wb3NbMV1dO1xuICAgIGNvbnN0IFtldyxlaF0gPSBbdGhpcy5lbnRpdHkud2lkdGgsIHRoaXMuZW50aXR5LmhlaWdodF07XG4gICAgY29uc3QgW3R3LHRoXSA9IFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07XG4gICAgY29uc3QgeCA9IGV4ICsgKChldy10dykvMik7XG4gICAgY29uc3QgeSA9IGV5ICsgZWggLSB0aDtcbiAgICByZXR1cm4gW3gseV07XG4gIH1cblxuICBjZW50ZXJPbkVudGl0eSgpIHtcbiAgICB0aGlzLnBvcyA9IHRoaXMuZW50aXR5LmNvbEJveEhvb2soKTtcbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xCb3g7IiwiLy8gaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcbmltcG9ydCBDb2xCb3ggZnJvbSAnLi9jb2xsaXNpb25fYm94JztcbmltcG9ydCB7XG4gIG5vcm1hbGl6ZWRNb3ZlbWVudCxcbiAgY29sbGlkZWRXaXRoU2lkZSxcbn0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5cbmNsYXNzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb2xCb3hXaWR0aCA9IHdpZHRoLzI7XG4gICAgY29uc3QgY29sQm94SGVpZ2h0ID0gaGVpZ2h0LzM7XG4gICAgXG4gICAgdGhpcy5zcHJpdGVQYWxldHRlID0gc3ByaXRlUGFsZXR0ZTtcbiAgICB0aGlzLmRyYXdPcHRpb25zID0ge1xuICAgICAgaW1hZ2U6IHNwcml0ZVBhbGV0dGUsXG4gICAgICBwYWxYOiAwLFxuICAgICAgcGFsWTogMCxcbiAgICAgIF9zV2lkdGg6IHdpZHRoLFxuICAgICAgX3NIZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHBvc1swXSxcbiAgICAgIHk6IHBvc1sxXSxcbiAgICAgIF9kV2lkdGg6IHdpZHRoLFxuICAgICAgX2RIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIHRoaXMuY29sQm94ID0gbmV3IENvbEJveCh0aGlzLGNvbEJveFdpZHRoLGNvbEJveEhlaWdodCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNvbEJveC5jZW50ZXI7XG4gICAgdGhpcy5jb2xsaXNpb25zID0ge1xuICAgICAgdG9wOiBmYWxzZSxcbiAgICAgIGJvdHRvbTogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuXG4gIH1cblxuICBjb2xCb3hIb29rKCkgeyAvLyB0aGlzIHdpbGwgY2VudGVyIHRoZSBjb2xCb3ggb24gdGhlIGJvdHRvbVxuICAgIGxldCBbeCx5XSA9IFt0aGlzLnBvc1swXSx0aGlzLnBvc1sxXV07XG4gICAgbGV0IFtjeCxjeV0gPSBbXG4gICAgICB4KygodGhpcy53aWR0aCAtIHRoaXMuY29sQm94LndpZHRoKS8yKSxcbiAgICAgIHkrKHRoaXMuaGVpZ2h0IC0gdGhpcy5jb2xCb3guaGVpZ2h0KSxcbiAgICBdO1xuICAgIHJldHVybiBbY3gsY3ldO1xuICB9XG5cbiAgdXBkYXRlU2lkZXMoKSB7XG4gICAgdGhpcy5jb2xCb3gudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgICB0aGlzLmNlbnRlciA9IHRoaXMuY29sQm94LmNlbnRlcjtcbiAgfVxuXG4gIGNvbGxpZGVkT25TaWRlKHNpZGUsIG90aGVyT2JqZWN0KSB7XG4gICAgbGV0IG90aGVyU2lkZTtcbiAgICBzd2l0Y2goc2lkZSkge1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImJvdHRvbVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJ0b3BcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInJpZ2h0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwibGVmdFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG90aGVyU2lkZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNvbGxpc2lvbnNbc2lkZV0gPSBjb2xsaWRlZFdpdGhTaWRlKHNpZGUsIHRoaXNbc2lkZV0sIG90aGVyT2JqZWN0W290aGVyU2lkZV0pO1xuICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbnNbc2lkZV07XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UoLi4uT2JqZWN0LnZhbHVlcyh0aGlzLmRyYXdPcHRpb25zKSk7XG4gICAgdGhpcy5jb2xCb3guY2VudGVyT25FbnRpdHkoKTtcbiAgICB0aGlzLmNvbEJveC5kcmF3KGN0eCk7XG4gIH1cbn1cblxuY2xhc3MgRW5lbXkgZXh0ZW5kcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUsIHR5cGUsIGRldGVjdERpc3QpIHtcbiAgICBzdXBlcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpO1xuICAgIHRoaXMuc3BlZWQgPSAwLjk7XG4gICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMC43NTtcbiAgICB0aGlzLnBhY2UgPSAyNC90aGlzLnNwZWVkO1xuICAgIHRoaXMuY2hhc2luZ1BsYXllciA9IGZhbHNlO1xuICAgIHRoaXMuZGV0ZWN0RGlzdCA9IGRldGVjdERpc3Q7XG4gICAgdGhpcy5pZGxlQ291bnQgPSAwO1xuICAgIHRoaXMuaWRsZU1heCA9IDYwO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5tb3ZlbWVudCA9IHtcbiAgICAgIHVwOiBmYWxzZSxcbiAgICAgIGRvd246IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcbiAgICBsZXQgeCwgeTtcbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgY2FzZSBcImJsb2JcIjpcbiAgICAgICAgeCA9IDQ4ICogMztcbiAgICAgICAgeSA9IDQ4ICogMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYmF0XCI6XG4gICAgICAgIHggPSA0OCAqIDA7XG4gICAgICAgIHkgPSA0OCAqIDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImdob3N0XCI6XG4gICAgICAgIHggPSA0OCAqIDY7XG4gICAgICAgIHkgPSA0OCAqIDQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnBhbFhPZmZzZXQgPSB4O1xuICAgIHRoaXMuc3RyaWRlID0ge1xuICAgICAgdXA6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiAoNDggKiAzKSArIHksXG4gICAgICB9LFxuICAgICAgZG93bjoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6ICg0OCAqIDApICsgeSxcbiAgICAgIH0sXG4gICAgICBsZWZ0OiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogKDQ4ICogMSkgKyB5LFxuICAgICAgfSxcbiAgICAgIHJpZ2h0OiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogKDQ4ICogMikgKyB5LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgc3RyaWRlUGFsZXR0ZVBvcyhkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnBhY2UgPSAyNCAvICh0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyKTtcbiAgICBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuICg0OCAqIDEpICsgdGhpcy5wYWxYT2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gMiAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiAoNDggKiAwKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDMgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gKDQ4ICogMSkgKyB0aGlzLnBhbFhPZmZzZXQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSA0ICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuICg0OCAqIDIpICsgdGhpcy5wYWxYT2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPiA0ICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA9IDA7XG4gICAgICByZXR1cm4gKDQ4ICogMSkgKyB0aGlzLnBhbFhPZmZzZXQ7XG4gICAgfVxuICB9XG5cbiAgZGlzdFRvUGxheWVyKCkge1xuICAgIGNvbnN0IG14ID0gdGhpcy5jZW50ZXJbMF07XG4gICAgY29uc3QgbXkgPSB0aGlzLmNlbnRlclsxXTtcbiAgICBjb25zdCBleCA9IEdsb2JhbC5TRVNTSU9OLnBsYXllci5jZW50ZXJbMF07XG4gICAgY29uc3QgZXkgPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuY2VudGVyWzFdO1xuICAgIGxldCBkeCA9IG14IC0gZXg7XG4gICAgbGV0IGR5ID0gbXkgLSBleTtcbiAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGgucG93KGR4LCAyKSArIE1hdGgucG93KGR5LCAyKSk7XG4gICAgcmV0dXJuIGRpc3Q7XG4gIH1cblxuICBub3JtYWxpemVkVmVjdG9yUG9zKCkge1xuICAgIGNvbnN0IG14ID0gdGhpcy5jZW50ZXJbMF07XG4gICAgY29uc3QgbXkgPSB0aGlzLmNlbnRlclsxXTtcbiAgICBjb25zdCBleCA9IEdsb2JhbC5TRVNTSU9OLnBsYXllci5jZW50ZXJbMF07XG4gICAgY29uc3QgZXkgPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuY2VudGVyWzFdO1xuICAgIGxldCBkeCA9IG14IC0gZXg7XG4gICAgbGV0IGR5ID0gbXkgLSBleTtcblxuICAgIGlmICghdGhpcy5jaGFzaW5nUGxheWVyICYmICF0aGlzLmlkbGVDb3VudCkge1xuICAgICAgY29uc3QgcmFuZEFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJO1xuICAgICAgdGhpcy5keCA9IE1hdGguY29zKHJhbmRBbmdsZSkgKiB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgdGhpcy5keSA9IE1hdGguc2luKHJhbmRBbmdsZSkgKiB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgdGhpcy5pZGxlQ291bnQgPSAxO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIXRoaXMuY2hhc2luZ1BsYXllciAmJiB0aGlzLmlkbGVDb3VudCkgdGhpcy5pZGxlQ291bnQrKztcbiAgICBcbiAgICBpZiAodGhpcy5jaGFzaW5nUGxheWVyKSB7XG4gICAgICB0aGlzLmR4ID0gZHg7XG4gICAgICB0aGlzLmR5ID0gZHk7XG4gICAgfVxuXG5cbiAgICBpZih0aGlzLmlkbGVDb3VudCA+PSB0aGlzLmlkbGVNYXgpIHRoaXMuaWRsZUNvdW50ID0gMDtcblxuICAgIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4odGhpcy5keS90aGlzLmR4KTtcbiAgICBjb25zdCBueSA9IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICBjb25zdCBueCA9IE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICBpZiAodGhpcy5keSA+IDApIHtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJ1cFwiXSA9IHRydWU7XG4gICAgICB0aGlzLm1vdmVtZW50W1wiZG93blwiXSA9IGZhbHNlO1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuZHkpID4gTWF0aC5hYnModGhpcy5keCkpIHRoaXMuc3ByaXRlRGlyID0gXCJ1cFwiO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5keSA8IDApIHtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJkb3duXCJdID0gdHJ1ZTtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJ1cFwiXSA9IGZhbHNlO1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuZHkpID4gTWF0aC5hYnModGhpcy5keCkpIHRoaXMuc3ByaXRlRGlyID0gXCJkb3duXCI7XG4gICAgfVxuICAgIFxuICAgIGlmICh0aGlzLmR4ID4gMCkge1xuICAgICAgdGhpcy5tb3ZlbWVudFtcImxlZnRcIl0gPSB0cnVlO1xuICAgICAgdGhpcy5tb3ZlbWVudFtcInJpZ2h0XCJdID0gZmFsc2U7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5keCkgPiBNYXRoLmFicyh0aGlzLmR5KSkgdGhpcy5zcHJpdGVEaXIgPSBcImxlZnRcIjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuZHggPCAwKSB7XG4gICAgICB0aGlzLm1vdmVtZW50W1wicmlnaHRcIl0gPSB0cnVlO1xuICAgICAgdGhpcy5tb3ZlbWVudFtcImxlZnRcIl0gPSBmYWxzZTtcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmR4KSA+IE1hdGguYWJzKHRoaXMuZHkpKSB0aGlzLnNwcml0ZURpciA9IFwicmlnaHRcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gW254LG55XTtcbiAgfVxuXG4gIGRhbWFnZSgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSo0KSsxKTtcbiAgfVxuXG4gIGhpdFBsYXllcih3YWxscykge1xuXG4gICAgY29uc3QgcGxheWVyID0gR2xvYmFsLlNFU1NJT04ucGxheWVyO1xuXG4gICAgaWYgKHRoaXMuZGlzdFRvUGxheWVyKCkgPCAzMiAmJiAhR2xvYmFsLlNFU1NJT04ucGxheWVyLmludnVsbmVyYWJsZSkge1xuICAgICAgcGxheWVyLnBvc1swXSAtPSAoMC40ICogdGhpcy5keCk7XG4gICAgICBwbGF5ZXIucG9zWzFdIC09ICgwLjQgKiB0aGlzLmR5KTtcbiAgICAgIHBsYXllci51cGRhdGVTaWRlcygpO1xuICAgICAgcGxheWVyLndhbGxDaGVjayh3YWxscyk7XG4gICAgICBwbGF5ZXIudXBkYXRlU2lkZXMoKTtcbiAgICAgIHBsYXllci5ocCAtPSB0aGlzLmRhbWFnZSgpO1xuICAgICAgaWYgKHBsYXllci5ocCA8IDApIHBsYXllci5ocCA9IDA7XG4gICAgICBwbGF5ZXIuaGl0KCk7XG4gICAgfVxuXG4gIH1cblxuICB3YWxsQ2hlY2sod2FsbHMpIHtcbiAgICBjb25zdCB7XG4gICAgICB1cCxcbiAgICAgIGRvd24sXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHRcbiAgICB9ID0gdGhpcy5tb3ZlbWVudDtcblxuICAgIGlmICh1cCkge1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwidG9wXCIsIHdhbGwpKSBicmVhazsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy50b3ApIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMudG9wIC0gKHRoaXMuaGVpZ2h0LXRoaXMuY29sQm94LmhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRvd24pIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImJvdHRvbVwiLCB3YWxsKSkgYnJlYWs7IH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMuYm90dG9tKSB7XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLmJvdHRvbSAtIDQ4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsZWZ0KSB7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJsZWZ0XCIsIHdhbGwpKSBicmVhazsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5sZWZ0KSB7XG4gICAgICAgIHRoaXMucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLmxlZnQgLSAodGhpcy5jb2xCb3gud2lkdGgvMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJpZ2h0KSB7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJyaWdodFwiLCB3YWxsKSkgYnJlYWs7IH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMucmlnaHQpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMucmlnaHQgLSAodGhpcy5jb2xCb3gud2lkdGggKyAodGhpcy5jb2xCb3gud2lkdGgvMikpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuXG4gIG1vdmUod2FsbHMpIHtcblxuICAgIGlmICh0aGlzLmRpc3RUb1BsYXllcigpIDwgdGhpcy5kZXRlY3REaXN0KSB7XG4gICAgICB0aGlzLmNoYXNpbmdQbGF5ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGFzaW5nUGxheWVyID0gZmFsc2U7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAwLjc1O1xuICAgIH1cbiAgICBcbiAgICBsZXQgbmV3VmVjdG9ycyA9IHRoaXMubm9ybWFsaXplZFZlY3RvclBvcygpO1xuXG4gICAgY29uc3Qge1xuICAgICAgdXAsXG4gICAgICBkb3duLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0XG4gICAgfSA9IHRoaXMubW92ZW1lbnQ7XG5cbiAgICBpZiAobGVmdCAmJiB1cCkge1xuICAgICAgdGhpcy5wb3NbMF0gLT0gbmV3VmVjdG9yc1swXTtcbiAgICAgIHRoaXMucG9zWzFdIC09IG5ld1ZlY3RvcnNbMV07XG4gICAgfSBcbiAgICBcbiAgICBpZiAobGVmdCAmJiBkb3duKSB7XG4gICAgICB0aGlzLnBvc1swXSAtPSBuZXdWZWN0b3JzWzBdO1xuICAgICAgdGhpcy5wb3NbMV0gLT0gbmV3VmVjdG9yc1sxXTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHJpZ2h0ICYmIHVwKSB7XG4gICAgICB0aGlzLnBvc1swXSArPSBuZXdWZWN0b3JzWzBdO1xuICAgICAgdGhpcy5wb3NbMV0gKz0gbmV3VmVjdG9yc1sxXTtcbiAgICB9IFxuICAgIFxuICAgIGlmIChyaWdodCAmJiBkb3duKSB7XG4gICAgICB0aGlzLnBvc1swXSArPSBuZXdWZWN0b3JzWzBdO1xuICAgICAgdGhpcy5wb3NbMV0gKz0gbmV3VmVjdG9yc1sxXTtcbiAgICB9XG5cbiAgICB0aGlzLndhbGxDaGVjayh3YWxscyk7XG5cbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG5cbiAgICBzd2l0Y2ggKHRoaXMuc3ByaXRlRGlyKSB7XG4gICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUudXAucGFsWTtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwidXBcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmRvd24ucGFsWTtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwiZG93blwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5sZWZ0LnBhbFk7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImxlZnRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLnJpZ2h0LnBhbFk7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcInJpZ2h0XCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IDQ4ICogMTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgXG4gICAgdGhpcy5oaXRQbGF5ZXIod2FsbHMpO1xuICAgIEdsb2JhbC5TRVNTSU9OLnBsYXllci53YWxsQ2hlY2sod2FsbHMpO1xuICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnggPSB0aGlzLnBvc1swXTtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnkgPSB0aGlzLnBvc1sxXTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVuZW15OyIsImltcG9ydCBDb2xCb3ggZnJvbSBcIi4vY29sbGlzaW9uX2JveFwiO1xuaW1wb3J0IHsgY29sbGlkZWRXaXRoU2lkZSB9IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuY2xhc3MgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnN0IGNvbEJveFdpZHRoID0gd2lkdGgvMjtcbiAgICBjb25zdCBjb2xCb3hIZWlnaHQgPSBoZWlnaHQvMztcbiAgICBcbiAgICB0aGlzLnNwcml0ZVBhbGV0dGUgPSBzcHJpdGVQYWxldHRlO1xuICAgIHRoaXMuZHJhd09wdGlvbnMgPSB7XG4gICAgICBpbWFnZTogc3ByaXRlUGFsZXR0ZSxcbiAgICAgIHBhbFg6IDAsXG4gICAgICBwYWxZOiAwLFxuICAgICAgX3NXaWR0aDogd2lkdGgsXG4gICAgICBfc0hlaWdodDogaGVpZ2h0LFxuICAgICAgeDogcG9zWzBdLFxuICAgICAgeTogcG9zWzFdLFxuICAgICAgX2RXaWR0aDogd2lkdGgsXG4gICAgICBfZEhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgdGhpcy5jb2xCb3ggPSBuZXcgQ29sQm94KHRoaXMsY29sQm94V2lkdGgsY29sQm94SGVpZ2h0KTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgICB0aGlzLmNlbnRlciA9IHRoaXMuY29sQm94LmNlbnRlcjtcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSB7XG4gICAgICB0b3A6IGZhbHNlLFxuICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgIH07XG4gICAgXG4gIH1cblxuICBjb2xCb3hIb29rKCkgeyAvLyB0aGlzIHdpbGwgY2VudGVyIHRoZSBjb2xCb3ggb24gdGhlIGJvdHRvbVxuICAgIGxldCBbeCx5XSA9IFt0aGlzLnBvc1swXSx0aGlzLnBvc1sxXV07XG4gICAgbGV0IFtjeCxjeV0gPSBbXG4gICAgICB4KygodGhpcy53aWR0aCAtIHRoaXMuY29sQm94LndpZHRoKS8yKSxcbiAgICAgIHkrKHRoaXMuaGVpZ2h0IC0gdGhpcy5jb2xCb3guaGVpZ2h0KSxcbiAgICBdO1xuICAgIHJldHVybiBbY3gsY3ldO1xuICB9XG5cbiAgdXBkYXRlU2lkZXMoKSB7XG4gICAgdGhpcy5jb2xCb3gudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLmNlbnRlciA9IHRoaXMuY29sQm94LmNlbnRlcjtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgfVxuXG4gIGNvbGxpZGVkT25TaWRlKHNpZGUsIG90aGVyT2JqZWN0KSB7XG4gICAgbGV0IG90aGVyU2lkZTtcbiAgICBzd2l0Y2goc2lkZSkge1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImJvdHRvbVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJ0b3BcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInJpZ2h0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwibGVmdFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG90aGVyU2lkZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNvbGxpc2lvbnNbc2lkZV0gPSBjb2xsaWRlZFdpdGhTaWRlKHNpZGUsIHRoaXNbc2lkZV0sIG90aGVyT2JqZWN0W290aGVyU2lkZV0pO1xuICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbnNbc2lkZV07XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UoLi4uT2JqZWN0LnZhbHVlcyh0aGlzLmRyYXdPcHRpb25zKSk7XG4gICAgdGhpcy5jb2xCb3guY2VudGVyT25FbnRpdHkoKTtcbiAgICB0aGlzLmNvbEJveC5kcmF3KGN0eCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW50aXR5OyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgUm9vbSBmcm9tIFwiLi9yb29tXCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgcGxheWVyU3ByaXRlKSB7XG4gICAgdGhpcy5mcHNJbnRlcnZhbCA9IDEwMDAvNjA7XG4gICAgdGhpcy50b1BsYXllciA9IDEwMDtcbiAgICBjb25zdCBzdGFydGluZ1BvcyA9IFs0OCo3LCA0OCo3XTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoc3RhcnRpbmdQb3MsIC4uLkdsb2JhbC5TUFJJVEVfRElNUywgcGxheWVyU3ByaXRlKTtcbiAgICBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIgPSB0aGlzLnBsYXllcjtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAvLyBjb25zdCByb29tID0geyBcImxlZnRcIjogbmV3IFJvb20oKSB9OyAvLyB0ZXN0aW5nIG5ldyBSb29tKHJvb20pXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXMgPSB7fTtcbiAgICB0aGlzLnN0YXJ0aW5nUm9vbSA9IG5ldyBSb29tKCk7XG4gICAgdGhpcy5yb29tID0gdGhpcy5zdGFydGluZ1Jvb207XG4gICAgdGhpcy5wbGF5ZXIuZHJhdyhjdHgpO1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUgPSB0aGlzO1xuICAgIEdsb2JhbC5TRVNTSU9OLnN0b3AgPSBmYWxzZTtcbiAgICBHbG9iYWwuU0VTU0lPTi5jb2luQ291bnQgPSAwO1xuICAgIHRoaXMuZ2FtZVN0ZXAgPSB0aGlzLmdhbWVTdGVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdG9wID0gdGhpcy5zdG9wLmJpbmQodGhpcyk7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5KCk7XG4gIH1cblxuICBnYW1lT3ZlcigpIHtcbiAgICByZXR1cm4gdGhpcy53aW4oKSB8fCB0aGlzLmxvc2UoKTtcbiAgfVxuXG4gIHdpbigpe1xuICAgIHJldHVybiBHbG9iYWwuU0VTU0lPTi5jb2luQ291bnQgPj0gMjA7XG4gIH1cblxuICBsb3NlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXllci5ocCA8PSAwO1xuICB9XG5cblxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuZ2FtZU92ZXIoKSkge1xuICAgICAgdGhpcy5yZXF1ZXN0U3RvcCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2FtZVN0ZXAoKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lU3RlcCk7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGVsYXBzZWQgPSBub3cgLSB0aGlzLnRoZW47XG5cbiAgICBpZiAoZWxhcHNlZCA+IHRoaXMuZnBzSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChlbGFwc2VkICUgdGhpcy5mcHNJbnRlcnZhbCk7XG4gICAgICBjb25zdCBwbGF5ZXIgPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXI7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwwLCBHbG9iYWwuV0lEVEgsIEdsb2JhbC5IRUlHSFQpO1xuICAgICAgcGxheWVyLm1vdmUodGhpcy5yb29tLndhbGxzKTtcbiAgICAgIE9iamVjdC52YWx1ZXModGhpcy5yb29tLmVuZW1pZXMpLmZvckVhY2goZW5lbXkgPT4gZW5lbXkubW92ZSh0aGlzLnJvb20ud2FsbHMpKTtcbiAgICAgIHRoaXMucm9vbS5hbmltYXRlKCk7XG4gICAgICB0aGlzLnJvb20uZHJhdyh0aGlzLmN0eCk7XG4gICAgICBwbGF5ZXIuZHJhdyh0aGlzLmN0eCk7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICAgIGlmICh0aGlzLnJlcXVlc3RTdG9wKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElkKTtcbiAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IFwiQ291cmllciBOZXdcIjtcbiAgICAgICAgaWYgKHRoaXMud2luKCkpIHtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDAsMC41KVwiO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsMCw3MjAsNzIwKTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZhZjRcIjtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDQ4cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDb25ncmF0dWxhdGlvbnMhXCIsIDQ4KjMsIDQ4KjQpO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgMjRweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIllvdSBsZWF2ZSB3aXRoIHlvdXIgbGlmZSxcIiwgNDgqNCw0OCo1KTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcImFuZCB5b3VyIHBvY2tldHMgZnVsbCFcIiwgNDgqNC41LDQ4KjUuNSk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDbGljayAnUmVzdGFydCcgdXAgdG9wIGlmXCIsIDQ4KjQsNDgqNyk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJ5b3UnZCBsaWtlIHRvIHBsYXkgYWdhaW5cIiwgNDgqNC4yLDQ4KjcuNSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubG9zZSgpKSB7XG4gICAgICAgICAgY29uc3QgZm9udCA9IEdsb2JhbC5GT05ULmZvbnQ7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwwLDAuNSlcIjtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLDAsNzIwLDcyMCk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjZmZmYWY0XCI7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGA0OHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR0FNRSBPVkVSXCIsIDQ4ICogNC43NSwgNDggKiA0KTtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDM2cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJ5b3UgbG9zZSFcIiwgNDggKiA1LjY1LCA0OCAqIDUpO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgOTZweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIvCfkoBcIiwgNDggKiA2LjI1LCA0OCAqIDcpO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgMjRweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNsaWNrICdSZXN0YXJ0JyB1cCB0b3AgaWZcIiwgNDgqNCw0OCo5KTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcInlvdSdkIGxpa2UgdG8gcGxheSBhZ2FpblwiLCA0OCo0LjIsNDgqOS41KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuZ2FtZVN0ZXAoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lU3RlcCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCB7IG5ld0dhbWUgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5jbGFzcyBHYW1lU3RhcnQge1xuICBjb25zdHJ1Y3RvcihjdHgsIHBsYXllclNwcml0ZSkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMucGxheWVyU3ByaXRlID0gcGxheWVyU3ByaXRlO1xuICAgIHRoaXMuZnBzSW50ZXJ2YWwgPSAxMDAwLzYwO1xuICAgIHRoaXMudGhldGEgPSAwO1xuICAgIHRoaXMuc3RlcCA9IHRoaXMuc3RlcC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICB0aGlzLnJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnN0ZXApO1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBlbGFwc2VkID0gbm93IC0gdGhpcy50aGVuO1xuICAgIGlmIChlbGFwc2VkID4gdGhpcy5mcHNJbnRlcnZhbCkge1xuICAgICAgY29uc3QgZm9udEZhbWlseSA9IFwiQ291cmllciBOZXdcIjtcbiAgICAgIHRoaXMudGhldGEgKz0gMC4wMTtcbiAgICAgIGNvbnN0IHJlZCA9IE1hdGguZmxvb3IoMTI3ICogTWF0aC5zaW4oMS4xICogdGhpcy50aGV0YSkgKyAxKTtcbiAgICAgIGNvbnN0IGdyZWVuID0gTWF0aC5mbG9vcigxMjcgKiBNYXRoLnNpbigxLjIgKiB0aGlzLnRoZXRhKSArIDEpO1xuICAgICAgY29uc3QgYmx1ZSA9IE1hdGguZmxvb3IoMTI3ICogTWF0aC5zaW4oMS41ICogdGhpcy50aGV0YSkgKyAxKTtcbiAgICAgIGNvbnN0IGNvbG9yID0gYHJnYmEoJHtyZWR9LCR7Z3JlZW59LCR7Ymx1ZX0sIDAuNylgO1xuICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsMCw3MjAsNzIwKTtcbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShHbG9iYWwuQkdfSU1HU1tcIjRETFJVMFwiXSwgMCwgMCk7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsMCw3MjAsNzIwKTtcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmFmNFwiO1xuICAgICAgdGhpcy5jdHguZm9udCA9IGBib2xkIDQ4cHggJHtmb250RmFtaWx5fWA7XG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlByZXNzIEVOVEVSXCIsIDQ4ICogNCwgNDggKiA0KTtcbiAgICAgIHRoaXMuY3R4LmZvbnQgPSBgYm9sZCAyNHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCIuLi50byBiZWdpbiBhIG5ldyBjcmF3bCFcIiwgNDggKiA1LCA0OCAqIDQuNTUpO1xuXG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5wbGF5ZXJTcHJpdGUsIDQ4LCAwLCA0OCwgNDgsIDQ4ICogNywgNDggKiA3LCA0OCwgNDgpO1xuXG4gICAgICBpZiAoR2xvYmFsLktFWVNbXCJFbnRlclwiXSkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZCk7XG4gICAgICAgIGNvbnN0IHJlc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnRcIik7XG4gICAgICAgIHJlc3RhcnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIG5ld0dhbWUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm9tcHQoKSB7XG4gICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnN0ZXAoKTtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZVN0YXJ0OyIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCB7IHJvb21DaGFuZ2UgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHN1cGVyKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSk7XG4gICAgdGhpcy5zcGVlZCA9IDEuMjU7XG4gICAgdGhpcy5ub3JtYWxpemVkU3BlZWQgPSBwYXJzZUZsb2F0KHRoaXMuc3BlZWQpIC8gTWF0aC5zcXJ0KDIpO1xuICAgIHRoaXMucGFjZSA9IDI0L3RoaXMuc3BlZWQ7XG4gICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMTtcbiAgICB0aGlzLnN0YW1pbmEgPSAxMDAwO1xuICAgIHRoaXMuaW52dWxuZXJhYmxlID0gMDtcbiAgICB0aGlzLmhwID0gMjA7XG4gICAgdGhpcy5zdHJpZGUgPSB7XG4gICAgICB1cDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogNixcbiAgICAgIH0sXG4gICAgICBkb3duOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiAwLFxuICAgICAgfSxcbiAgICAgIGxlZnQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDIsXG4gICAgICB9LFxuICAgICAgcmlnaHQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDQsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBuZXdSb29tUG9zKGRpcikge1xuICAgIHN3aXRjaChkaXIpIHtcbiAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICB0aGlzLnBvc1sxXSA9IDcyMC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICB0aGlzLnBvc1sxXSA9IC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICB0aGlzLnBvc1swXSA9IDcyMC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5wb3NbMF0gPSAtMjQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0cmlkZVBhbGV0dGVQb3MoZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5wYWNlID0gMjQgLyAodGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcik7XG4gICAgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSAyICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDMgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDI7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA+IDQgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID0gMDtcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfVxuICB9XG5cbiAgd2FsbENoZWNrKHdhbGxzKSB7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJ0b3BcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMudG9wKSB7XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLnRvcCAtIDMyO1xuICAgICAgfVxuXG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJib3R0b21cIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMuYm90dG9tKSB7XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLmJvdHRvbSAtIDQ4O1xuICAgICAgfVxuXG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJsZWZ0XCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmxlZnQpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMubGVmdCAtIDEyO1xuICAgICAgfVxuXG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJyaWdodFwiLCB3YWxsKSkgYnJlYWsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5yaWdodCkge1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5yaWdodCAtIDM2O1xuICAgICAgfVxuXG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5pbnZ1bG5lcmFibGUgPSA3NTtcbiAgfVxuXG4gIG1vdmUod2FsbHMpIHtcbiAgICBjb25zdCBbXG4gICAgICB1cCxcbiAgICAgIGRvd24sXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHQsXG4gICAgICBzaGlmdFxuICAgIF0gPSBbXG4gICAgICBHbG9iYWwuS0VZU1tcIndcIl0sXG4gICAgICBHbG9iYWwuS0VZU1tcInNcIl0sXG4gICAgICBHbG9iYWwuS0VZU1tcImFcIl0sXG4gICAgICBHbG9iYWwuS0VZU1tcImRcIl0sXG4gICAgICBHbG9iYWwuS0VZU1tcIlNoaWZ0XCJdLFxuICAgIF07XG4gICAgaWYgKHNoaWZ0ICYmIHRoaXMuc3RhbWluYSA+IDApIHtcbiAgICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDEuNTtcbiAgICAgIHRoaXMuc3RhbWluYSAtPSA0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YW1pbmEgPCAwKSB0aGlzLnN0YW1pbmEgPSAwO1xuICAgIGlmICghc2hpZnQgJiYgdGhpcy5zdGFtaW5hIDwgMTAwMCkgdGhpcy5zdGFtaW5hICs9IDE7XG4gICAgaWYgKHRoaXMuaW52dWxuZXJhYmxlKSB0aGlzLmludnVsbmVyYWJsZS0tO1xuICAgIGlmICh0aGlzLmludnVsdmVyYWJsZSA8IDApIHRoaXMuaW52dWxuZXJhYmxlID0gMDtcblxuICAgIHRoaXMud2FsbENoZWNrKHdhbGxzKTtcblxuICAgIC8vIFcga2V5IG1vdmVtZW50cyBhbmQgc3ByaXRlIGRpcmVjdGlvblxuICAgIGlmICh1cCkge1xuICAgICAgaWYgKGxlZnQgfHwgcmlnaHQgJiYgIXRoaXMuY29sbGlzaW9ucy50b3ApIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gKz0gLXRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gKz0gLXRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS51cC5wYWxZO1xuICAgICAgaWYgKCFsZWZ0ICYmICFyaWdodCkge1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJ1cFwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTIGtleSBtb3ZlbWVudHMgYW5kIHNwcml0ZSBkaXJlY3Rpb25cbiAgICBpZiAoZG93bikge1xuICAgICAgaWYgKGxlZnQgfHwgcmlnaHQpIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gKz0gdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc1sxXSArPSB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUuZG93bi5wYWxZO1xuICAgICAgaWYgKCFsZWZ0ICYmICFyaWdodCkge1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJkb3duXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEEga2V5IG1vdmVtZW50XG4gICAgaWYgKGxlZnQpIHtcbiAgICAgIGlmICh1cCB8fCBkb3duICYmICF0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICB0aGlzLnBvc1swXSArPSAtdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc1swXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmxlZnQucGFsWTtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gRCBrZXkgbW92ZW1lbnRcbiAgICBpZiAocmlnaHQpIHtcbiAgICAgIGlmICh1cCB8fCBkb3duKSB7XG4gICAgICAgIHRoaXMucG9zWzBdICs9IHRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLnJpZ2h0LnBhbFk7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJyaWdodFwiKTtcbiAgICB9XG5cbiAgICAvLyBpZiBub25lIG9mIHRoZSBrZXlzIGFyZSBiZWluZyBwcmVzc2VkLCBnbyB0byBkZWZhdWx0IHN0YW5jZVxuICAgIGlmICghdXAgJiYgIWRvd24gJiYgIXJpZ2h0ICYmICFsZWZ0KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSA0OCAqIDE7XG4gICAgfVxuXG4gICAgY29uc3QgW3gseV0gPSB0aGlzLnBvcztcbiAgICBsZXQgZXhpdERpcjtcbiAgICBpZiAoeCA8IC0yNCkge1xuICAgICAgZXhpdERpciA9IFwibGVmdFwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH0gZWxzZSBpZiAoeCA+IDcyMC0yNCkge1xuICAgICAgZXhpdERpciA9IFwicmlnaHRcIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9IGVsc2UgaWYgKHkgPCAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcInVwXCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfSBlbHNlIGlmICh5ID4gNzIwLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJkb3duXCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfVxuXG4gICAgXG5cbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy5kcmF3T3B0aW9ucy54ID0gdGhpcy5wb3NbMF07XG4gICAgdGhpcy5kcmF3T3B0aW9ucy55ID0gdGhpcy5wb3NbMV07XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgV2FsbCBmcm9tIFwiLi93YWxsXCI7XG5pbXBvcnQgQ29pbiBmcm9tIFwiLi9jb2luXCI7XG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vZW5lbXlcIjtcblxuaW1wb3J0IHtcbiAgcmFuZE51bVBhdGhzLFxuICBhZGRWYWxpZE5laWdoYm9ycyxcbiAgYnVpbGRQYXRocyxcbiAgc2h1ZmZsZSxcbiAgYXNzaWduQmxvY2tlZFBhdGhzLFxuICByYW5kTnVtQ29pbnNcbn0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5cbmNsYXNzIFJvb20ge1xuICBjb25zdHJ1Y3RvcihuZWlnaGJvcikge1xuICAgIHRoaXMuZ2VuZXJhdGVDb2lucygpO1xuICAgIHRoaXMud2FsbHMgPSBbXTtcbiAgICBsZXQgcmFuZElkeDtcbiAgICB0aGlzLm5laWdoYm9ycyA9IHtcbiAgICAgIHVwOiB1bmRlZmluZWQsXG4gICAgICBkb3duOiB1bmRlZmluZWQsXG4gICAgICBsZWZ0OiB1bmRlZmluZWQsXG4gICAgICByaWdodDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgbGV0IGVudHJ5RGlyO1xuICAgIGlmIChuZWlnaGJvcikge1xuICAgICAgY29uc3QgZXhpdERpciA9IE9iamVjdC5rZXlzKG5laWdoYm9yKVswXTtcbiAgICAgIGNvbnN0IHByZXZSb29tID0gT2JqZWN0LnZhbHVlcyhuZWlnaGJvcilbMF07XG4gICAgICB0aGlzLm5vZGVQb3MgPSBbLi4ucHJldlJvb20ubm9kZVBvc107XG4gICAgICBzd2l0Y2goZXhpdERpcikge1xuICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5kb3duID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIkRcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMV0rKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy51cCA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJVXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzFdLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMucmlnaHQgPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiUlwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1swXS0tO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5sZWZ0ID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIkxcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMF0rKztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub2RlUG9zID0gWzAsMF07XG4gICAgfVxuICAgIFxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG5cbiAgICBhZGRWYWxpZE5laWdoYm9ycyh0aGlzKTtcbiAgICBsZXQgd2FsbHMsIG51bVBhdGhzLCByYW5kUGF0aHM7XG4gICAgbGV0IG5ld1BhdGhzID0gW107XG4gICAgbGV0IHBhdGhzID0gYnVpbGRQYXRocyh0aGlzKTtcbiAgICBsZXQgcGF0aHNBcnIgPSBwYXRocy5zcGxpdChcIlwiKTtcbiAgICBpZiAobmVpZ2hib3IpIHtcbiAgICAgIC8vIGlmIG5vdCBpbml0aWFsIHJvb21cbiAgICAgIHBhdGhzQXJyID0gcGF0aHNBcnIuZmlsdGVyKHBhdGggPT4gcGF0aCAhPT0gZW50cnlEaXIpOyAvLyByZW1vdmUgZW50cnlEaXIgZnJvbSBwYXRoc1xuICAgICAgbnVtUGF0aHMgPSByYW5kTnVtUGF0aHMocGF0aHMubGVuZ3RoKTsgLy8gd2VpZ2h0ZWQgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IsIHByZWZlcnMgbW9yZSBwYXRoc1xuICAgICAgaWYgKG51bVBhdGhzID09PSBwYXRocy5sZW5ndGgpIHsgLy8gaWYgYWxsIDQgcGF0aHMgYXJlIGF2YWlsYWJsZVxuICAgICAgICByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBHbG9iYWwuQkdfSU1HU1tgJHtudW1QYXRoc30ke3BhdGhzfSR7cmFuZElkeH1gXTtcbiAgICAgICAgYXNzaWduQmxvY2tlZFBhdGhzKHRoaXMsIHBhdGhzKTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKHBhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7dGhpcy5ub2RlUG9zfWBdID0gdGhpcztcbiAgICAgIH0gZWxzZSB7IC8vIGxlc3MgdGhhbiA0IHBhdGhzIGF2YWlsYWJsZVxuICAgICAgICBzaHVmZmxlKHBhdGhzQXJyKTsgLy8gcmFuZG9taXplIHRoZSBwYXRoIGNob2ljZXNcbiAgICAgICAgbmV3UGF0aHMucHVzaChlbnRyeURpcik7IC8vIE1VU1QgQUxXQVlTIGhhdmUgdGhlIHBhdGggeW91IGVudGVyIGZyb21cbiAgICAgICAgbnVtUGF0aHMtLTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXRoczsgaSsrKSB7IG5ld1BhdGhzLnB1c2gocGF0aHNBcnIucG9wKCkpIH1cbiAgICAgICAgbmV3UGF0aHMgPSBuZXdQYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHMrMX0ke25ld1BhdGhzfSR7cmFuZElkeH1gXTtcbiAgICAgICAgaWYgKCF0aGlzLmJhY2tncm91bmQpIHtcbiAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBhc3NpZ25CbG9ja2VkUGF0aHModGhpcywgbmV3UGF0aHMpO1xuICAgICAgICB3YWxscyA9IHRoaXMuYnVpbGRSb29tV2FsbHMobmV3UGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBudW1QYXRocyA9IHJhbmROdW1QYXRocyhwYXRocy5sZW5ndGgpO1xuICAgICAgaWYgKG51bVBhdGhzID09PSBwYXRocy5sZW5ndGgpIHtcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtwYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhwYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaHVmZmxlKHBhdGhzQXJyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXRoczsgaSsrKSB7IG5ld1BhdGhzLnB1c2gocGF0aHNBcnIucG9wKCkpIH1cbiAgICAgICAgbmV3UGF0aHMgPSBuZXdQYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtuZXdQYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBuZXdQYXRocyk7XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhuZXdQYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZ2VuZXJhdGVFbmVtaWVzKCk7XG4gICAgLy8gdGhpcy5hbmltYXRlZE9iamVjdHMgPSB7fTtcbiAgICAvLyBPYmplY3QudmFsdWVzKHRoaXMuY29pbnMpLmZvckVhY2goY29pbiA9PiB7XG4gICAgLy8gICB0aGlzLmFuaW1hdGVkT2JqZWN0c1tgY29pbi0ke2NvaW4ucG9zfWBdID0gY29pbjtcbiAgICAvLyB9KTtcblxuICB9XG5cbiAgZ2VuZXJhdGVFbmVtaWVzKCkge1xuICAgIGNvbnN0IG51bUVuZW1pZXMgPSBNYXRoLmZsb29yKE9iamVjdC5rZXlzKEdsb2JhbC5TRVNTSU9OLnJvb21zKS5sZW5ndGgvMik7XG4gICAgdGhpcy5lbmVtaWVzID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1FbmVtaWVzOyBpKyspIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIHdoaWxlICh4ID4gMzM2ICYmIHggPCAzODQpIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgd2hpbGUgKHkgPiAzMzYgJiYgeSA8IDM4NCkgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICBsZXQgcG9zID0gW3gseV07XG4gICAgICBjb25zdCBlbmVteSA9IG5ldyBFbmVteShwb3MsIDQ4LDQ4LEdsb2JhbC5TUFJJVEVTLm1vbnN0ZXJzLCBcImJsb2JcIiwgMjAwICsgKG51bUVuZW1pZXMgKiA1MCkpO1xuICAgICAgdGhpcy5lbmVtaWVzW2Ake2VuZW15LnBvc31gXSA9IGVuZW15O1xuICAgIH1cbiAgfTtcblxuICBnZW5lcmF0ZUNvaW5zKCkge1xuICAgIGNvbnN0IG51bUNvaW5zID0gcmFuZE51bUNvaW5zKCk7XG4gICAgdGhpcy5jb2lucyA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29pbnM7IGkrKykge1xuICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgd2hpbGUgKHggPiAzMzYgJiYgeCA8IDM4NCkgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICB3aGlsZSAoeSA+IDMzNiAmJiB5IDwgMzg0KSB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIGxldCBwb3MgPSBbeCx5XTtcbiAgICAgIGNvbnN0IGNvaW4gPSBuZXcgQ29pbihwb3MsIDE2LDE2LEdsb2JhbC5TUFJJVEVTLmNvaW4pO1xuICAgICAgdGhpcy5jb2luc1tgJHtjb2luLnBvc31gXSA9IGNvaW47XG4gICAgfVxuICB9O1xuXG4gIGFuaW1hdGUoKSB7XG4gICAgdGhpcy5jb2xsZWN0KCk7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKS5mb3JFYWNoKGNvaW4gPT4ge1xuICAgICAgY29pbi5hbmltYXRlKCk7XG4gICAgfSk7XG4gICAgLy8gT2JqZWN0LnZhbHVlcyh0aGlzLmFuaW1hdGVkT2JqZWN0cykuZm9yRWFjaChvYmplY3QgPT4gb2JqZWN0LmFuaW1hdGUoKSk7XG5cbiAgfVxuXG4gIGNvbGxlY3QoKSB7XG4gICAgZm9yIChsZXQgY29pbiBvZiBPYmplY3QudmFsdWVzKHRoaXMuY29pbnMpKSB7XG4gICAgICBpZiAoY29pbi5jb2xsZWN0KCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY29pbnNbYCR7Y29pbi5wb3N9YF07XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLmNvaW5Db3VudCsrO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iYWNrZ3JvdW5kLCAwLCAwKTtcbiAgICAvLyB0aGlzLndhbGxzLmZvckVhY2god2FsbCA9PiB3YWxsLmRyYXcoY3R4KSk7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKS5mb3JFYWNoKGNvaW4gPT4gY29pbi5kcmF3KGN0eCkpO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5lbmVtaWVzKS5mb3JFYWNoKGVuZW15ID0+IGVuZW15LmRyYXcoY3R4KSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmFmNFwiO1xuICAgIGN0eC5mb250ID0gXCIyMHB4IGFyaWFsXCI7XG4gICAgY3R4LmZpbGxUZXh0KGBSb29tIFsgJHt0aGlzLm5vZGVQb3N9IF1gLCAxNSwgMzApO1xuICAgIGN0eC5maWxsVGV4dChgQ29pbnMgeCAke0dsb2JhbC5TRVNTSU9OLmNvaW5Db3VudH1gLCA1OTAsIDMwKTtcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmJiMDBcIjtcbiAgICBjdHgubW92ZVRvKDE1LCA3MDUpO1xuICAgIGN0eC5saW5lV2lkdGggPSA1O1xuICAgIGN0eC5saW5lVG8oMTUgKyAoR2xvYmFsLlNFU1NJT04ucGxheWVyLnN0YW1pbmEvMTAwMCkgKiAxMDAsIDcwNSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzMzZmYwMFwiO1xuICAgIGN0eC5tb3ZlVG8oMTUsIDY5MCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEwO1xuICAgIGN0eC5saW5lVG8oMTUgKyAoR2xvYmFsLlNFU1NJT04ucGxheWVyLmhwLzIwKSAqIDEwMCwgNjkwKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmYwMDAwXCI7XG4gICAgY3R4Lm1vdmVUbygxMTUgLSAoMSAtIEdsb2JhbC5TRVNTSU9OLnBsYXllci5ocC8yMCkgKiAxMDAsIDY5MCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEwO1xuICAgIGN0eC5saW5lVG8oMTE1LCA2OTApO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMGRkZGRcIjtcbiAgICBjdHgubW92ZVRvKDE1LCA2OTkpO1xuICAgIGN0eC5saW5lV2lkdGggPSA1O1xuICAgIGN0eC5saW5lVG8oMTUgKyAoR2xvYmFsLlNFU1NJT04ucGxheWVyLmludnVsbmVyYWJsZS83NSkgKiAxMDAsIDY5OSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIC8vIGN0eC5maWxsVGV4dChgU3RhbWluYSA9ICR7R2xvYmFsLlNFU1NJT04ucGxheWVyLnN0YW1pbmF9YCwgMTUsIDQwMCk7XG4gIH1cblxuICBidWlsZFJvb21XYWxscyhwYXRocykge1xuICAgIGxldCB3YWxscyA9IFtdO1xuICAgIHN3aXRjaChwYXRocykge1xuICAgICAgY2FzZSBcIkRMUlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRMVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiUlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJMUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgfVxuICB9XG5cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFJvb207IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgUm9vbSBmcm9tIFwiLi4vcm9vbVwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2dhbWVcIjtcblxuXG5leHBvcnQgY29uc3QgbmV3R2FtZSA9ICgpID0+IHtcbiAgaWYgKEdsb2JhbC5TRVNTSU9OLmdhbWUpIHtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnJlcXVlc3RTdG9wID0gdHJ1ZTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT05bXCJnYW1lXCJdO1xuICAgIGRlbGV0ZSBHbG9iYWwuU0VTU0lPTltcInBsYXllclwiXTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT05bXCJjb2luQ291bnRcIl07XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wicm9vbXNcIl07XG4gIH1cbiAgbmV3IEdhbWUoLi4uT2JqZWN0LnZhbHVlcyhHbG9iYWwuR0FNRV9PUFRJT05TKSk7XG59O1xuXG5leHBvcnQgY29uc3QgY29sbGlkZWRXaXRoU2lkZSA9IChzaWRlLCB0aGlzU2lkZSwgb3RoZXJTaWRlKSA9PiB7XG4gIGxldCBjb2xsaWRlZCA9IGZhbHNlO1xuICBsZXQgdXBwZXJEaWZmLCBsb3dlckRpZmY7XG4gIGNvbnN0IHVwcGVyQm91bmRzID0gMTA7XG4gIGNvbnN0IGxvd2VyQm91bmRzID0gMDtcbiAgaWYgKHNpZGUgPT09IFwidG9wXCIgfHwgc2lkZSA9PT0gXCJib3R0b21cIikge1xuICAgIGNvbnN0IHRoaXNZVmFsID0gdGhpc1NpZGVbMV07XG4gICAgY29uc3QgW3RoaXNYTWluLCB0aGlzWE1heF0gPSB0aGlzU2lkZVswXTtcbiAgICBjb25zdCBvdGhlcllWYWwgPSBvdGhlclNpZGVbMV07XG4gICAgY29uc3QgW290aGVyWE1pbiwgb3RoZXJYTWF4XSA9IG90aGVyU2lkZVswXTtcbiAgICBcbiAgICBzd2l0Y2ggKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKG90aGVyWVZhbCAtIHRoaXNZVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAob3RoZXJZVmFsIC0gdGhpc1lWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNZVmFsIDwgb3RoZXJZVmFsKSAmJlxuICAgICAgICAgICh0aGlzWE1pbiA8IG90aGVyWE1heCkgJiZcbiAgICAgICAgICAodGhpc1hNYXggPiBvdGhlclhNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIHVwcGVyRGlmZiA9ICh0aGlzWVZhbCAtIG90aGVyWVZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKHRoaXNZVmFsIC0gb3RoZXJZVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWVZhbCA+IG90aGVyWVZhbCkgJiZcbiAgICAgICAgICAodGhpc1hNaW4gPCBvdGhlclhNYXgpICYmXG4gICAgICAgICAgKHRoaXNYTWF4ID4gb3RoZXJYTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvbGxpZGVkKSByZXR1cm4gb3RoZXJZVmFsO1xuXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdGhpc1hWYWwgPSB0aGlzU2lkZVswXTtcbiAgICBjb25zdCBbdGhpc1lNaW4sIHRoaXNZTWF4XSA9IHRoaXNTaWRlWzFdO1xuICAgIGNvbnN0IG90aGVyWFZhbCA9IG90aGVyU2lkZVswXTtcbiAgICBjb25zdCBbb3RoZXJZTWluLCBvdGhlcllNYXhdID0gb3RoZXJTaWRlWzFdO1xuICAgIFxuICAgIHN3aXRjaCAoc2lkZSkge1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKG90aGVyWFZhbCAtIHRoaXNYVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAob3RoZXJYVmFsIC0gdGhpc1hWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNYVmFsIDwgb3RoZXJYVmFsKSAmJlxuICAgICAgICAgICh0aGlzWU1pbiA8IG90aGVyWU1heCkgJiZcbiAgICAgICAgICAodGhpc1lNYXggPiBvdGhlcllNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB1cHBlckRpZmYgPSAodGhpc1hWYWwgLSBvdGhlclhWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9ICh0aGlzWFZhbCAtIG90aGVyWFZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1hWYWwgPiBvdGhlclhWYWwpICYmXG4gICAgICAgICAgKHRoaXNZTWluIDwgb3RoZXJZTWF4KSAmJlxuICAgICAgICAgICh0aGlzWU1heCA+IG90aGVyWU1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvbGxpZGVkKSByZXR1cm4gb3RoZXJYVmFsO1xuICAgIFxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xuXG59O1xuXG5leHBvcnQgY29uc3Qgcm9vbUNoYW5nZSA9IChleGl0RGlyLCBjdXJyUm9vbSkgPT4ge1xuICBsZXQgbmV4dE5vZGVQb3MgPSBbLi4uY3VyclJvb20ubm9kZVBvc107XG4gIHN3aXRjaChleGl0RGlyKSB7XG4gICAgY2FzZSBcInVwXCI6XG4gICAgICBuZXh0Tm9kZVBvc1sxXSArPSAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd25cIjpcbiAgICAgIG5leHROb2RlUG9zWzFdIC09IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMF0gLT0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMF0gKz0gMTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHtuZXh0Tm9kZVBvc31gXSkge1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake25leHROb2RlUG9zfWBdO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG5laWdoYm9yID0geyBbZXhpdERpcl06IGN1cnJSb29tIH07XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tID0gbmV3IFJvb20obmVpZ2hib3IpO1xuICAgIGFkZFZhbGlkTmVpZ2hib3JzKGN1cnJSb29tKTtcbiAgICBhZGRWYWxpZE5laWdoYm9ycyhHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZE51bVBhdGhzID0gbWF4ID0+IHtcbiAgbGV0IHBhdGhzID0gW107XG4gIGlmIChtYXggPiAzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzRdOyBpKyspIHsgcGF0aHMucHVzaCg0KSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzNdOyBpKyspIHsgcGF0aHMucHVzaCgzKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzJdOyBpKyspIHsgcGF0aHMucHVzaCgyKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzFdOyBpKyspIHsgcGF0aHMucHVzaCgxKSB9XG4gIH0gZWxzZSBpZiAobWF4ID4gMikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVszXTsgaSsrKSB7IHBhdGhzLnB1c2goMykgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsyXTsgaSsrKSB7IHBhdGhzLnB1c2goMikgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsxXTsgaSsrKSB7IHBhdGhzLnB1c2goMSkgfVxuICB9IGVsc2UgaWYgKG1heCA+IDEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMl07IGkrKykgeyBwYXRocy5wdXNoKDIpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMV07IGkrKykgeyBwYXRocy5wdXNoKDEpIH1cbiAgfSBlbHNlIHtcbiAgICBwYXRocy5wdXNoKDEpO1xuICB9XG5cbiAgc2h1ZmZsZShwYXRocyk7XG5cbiAgcmV0dXJuIHBhdGhzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpwYXRocy5sZW5ndGgpXTtcbiAgXG59O1xuXG5leHBvcnQgY29uc3QgYWRkVmFsaWROZWlnaGJvcnMgPSByb29tID0+IHtcbiAgbGV0IHVwID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHVwWzFdICs9IDE7XG4gIHVwID0gdXAudG9TdHJpbmcoKTtcbiAgbGV0IGRvd24gPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgZG93blsxXSAtPSAxO1xuICBkb3duID0gZG93bi50b1N0cmluZygpO1xuICBsZXQgbGVmdCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBsZWZ0WzBdIC09IDE7XG4gIGxlZnQgPSBsZWZ0LnRvU3RyaW5nKCk7XG4gIGxldCByaWdodCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICByaWdodFswXSArPSAxO1xuICByaWdodCA9IHJpZ2h0LnRvU3RyaW5nKCk7XG4gIGlmIChcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0gJiYgXG4gICAgKEdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXS5uZWlnaGJvcnMuZG93biAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy51cFxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy51cCA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXTtcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0ubmVpZ2hib3JzLmRvd24gPSByb29tO1xuICB9XG4gIGlmIChcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXSAmJiBcbiAgICAoR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl0ubmVpZ2hib3JzLnVwICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLmRvd25cbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMuZG93biA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dO1xuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dLm5laWdoYm9ycy51cCA9IHJvb207XG4gIH1cbiAgaWYgKFxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdICYmIFxuICAgIChHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XS5uZWlnaGJvcnMucmlnaHQgIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMubGVmdFxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy5sZWZ0ID0gR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF07XG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF0ubmVpZ2hib3JzLnJpZ2h0ID0gcm9vbTtcbiAgfVxuICBpZiAoXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdICYmIFxuICAgIChHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF0ubmVpZ2hib3JzLmxlZnQgIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMucmlnaHRcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMucmlnaHQgPSBHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF07XG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdLm5laWdoYm9ycy5sZWZ0ID0gcm9vbTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkUGF0aHMgPSByb29tID0+IHtcbiAgbGV0IHBhdGhzID0gW107XG4gIGxldCB1cCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICB1cFsxXSArPSAxO1xuICB1cCA9IHVwLnRvU3RyaW5nKCk7XG4gIGxldCBkb3duID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGRvd25bMV0gLT0gMTtcbiAgZG93biA9IGRvd24udG9TdHJpbmcoKTtcbiAgbGV0IGxlZnQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgbGVmdFswXSAtPSAxO1xuICBsZWZ0ID0gbGVmdC50b1N0cmluZygpO1xuICBsZXQgcmlnaHQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgcmlnaHRbMF0gKz0gMTtcbiAgcmlnaHQgPSByaWdodC50b1N0cmluZygpO1xuICBpZiAoIUdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXSB8fCAoR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdLm5laWdoYm9ycy5kb3duICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiVVwiKTtcbiAgfVxuICBpZiAoIUdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dIHx8IChHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXS5uZWlnaGJvcnMudXAgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJEXCIpO1xuICB9XG4gIGlmICghR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF0gfHwgKEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdLm5laWdoYm9ycy5yaWdodCAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIkxcIik7XG4gIH1cbiAgaWYgKCFHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF0gfHwgKEdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XS5uZWlnaGJvcnMubGVmdCAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIlJcIik7XG4gIH1cbiAgcmV0dXJuIHBhdGhzLnNvcnQoKS5qb2luKFwiXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJsb2NrZWRQYXRocyA9IChyb29tLCBwYXRocykgPT4ge1xuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiVVwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLnVwID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIkRcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5kb3duID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIkxcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5sZWZ0ID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIlJcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5yaWdodCA9IFwiWFwiO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZE51bUNvaW5zID0gKCkgPT4ge1xuICBsZXQgd2VpZ2h0ZWROdW1Db2lucyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5DT0lOX1dFSUdIVFNbM107IGkrKykgeyB3ZWlnaHRlZE51bUNvaW5zLnB1c2goMykgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5DT0lOX1dFSUdIVFNbMl07IGkrKykgeyB3ZWlnaHRlZE51bUNvaW5zLnB1c2goMikgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5DT0lOX1dFSUdIVFNbMV07IGkrKykgeyB3ZWlnaHRlZE51bUNvaW5zLnB1c2goMSkgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5DT0lOX1dFSUdIVFNbMF07IGkrKykgeyB3ZWlnaHRlZE51bUNvaW5zLnB1c2goMCkgfVxuICBjb25zdCByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2VpZ2h0ZWROdW1Db2lucy5sZW5ndGgpO1xuICBzaHVmZmxlKHdlaWdodGVkTnVtQ29pbnMpO1xuICByZXR1cm4gd2VpZ2h0ZWROdW1Db2luc1tyYW5kSWR4XTtcbn07XG5cbmV4cG9ydCBjb25zdCByYW5kQ29pblNvdW5kID0gKCkgPT4ge1xuICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY29pbiR7aX1gKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaHVmZmxlID0gYXJyID0+IHtcbiAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICBbYXJyW2ldLCBhcnJbal1dID0gW2FycltqXSwgYXJyW2ldXTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZWRNb3ZlbWVudCA9IChteXNlbGYsIGVudGl0eSwgY2hhc2luZ1BsYXllcikgPT4geyBcbiAgY29uc3QgbXggPSBteXNlbGYuY2VudGVyWzBdO1xuICBjb25zdCBteSA9IG15c2VsZi5jZW50ZXJbMV07XG4gIGNvbnN0IGV4ID0gZW50aXR5LmNlbnRlclswXTtcbiAgY29uc3QgZXkgPSBlbnRpdHkuY2VudGVyWzFdO1xuICBsZXQgZHggPSBteCAtIGV4O1xuICBsZXQgZHkgPSBteSAtIGV5O1xuICBcbiAgaWYgKCFjaGFzaW5nUGxheWVyKSB7XG4gICAgY29uc3QgcmFuZEFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJO1xuICAgIGR4ID0gTWF0aC5jb3MocmFuZEFuZ2xlKSAqIG15c2VsZi5zcGVlZDtcbiAgICBkeSA9IE1hdGguc2luKHJhbmRBbmdsZSkgKiBteXNlbGYuc3BlZWQ7XG4gIH1cbiAgXG4gIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuKGR5L2R4KTtcbiAgY29uc3QgbnkgPSBNYXRoLnNpbihhbmdsZSkgKiBteXNlbGYuc3BlZWQ7XG4gIGNvbnN0IG54ID0gTWF0aC5jb3MoYW5nbGUpICogbXlzZWxmLnNwZWVkO1xuXG4gIHJldHVybiB7XG4gICAgZHgsXG4gICAgZHksXG4gICAgbngsXG4gICAgbnksXG4gICAgdXA6IChkeSA+IDApICYmIChNYXRoLmFicyhkeSkgPiBNYXRoLmFicyhkeCkpLFxuICAgIGRvd246IChkeSA8IDApICYmIChNYXRoLmFicyhkeSkgPiBNYXRoLmFicyhkeCkpLFxuICAgIGxlZnQ6IChkeCA+IDApICYmIChNYXRoLmFicyhkeCkgPiBNYXRoLmFicyhkeSkpLFxuICAgIHJpZ2h0OiAoZHggPCAwKSAmJiAoTWF0aC5hYnMoZHgpID4gTWF0aC5hYnMoZHkpKSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXN0YW5jZVRvUGxheWVyID0gKG15c2VsZiwgcGxheWVyKSA9PiB7XG4gIGNvbnN0IG14ID0gbXlzZWxmLmNlbnRlclswXTtcbiAgY29uc3QgbXkgPSBteXNlbGYuY2VudGVyWzFdO1xuICBjb25zdCBweCA9IHBsYXllci5jZW50ZXJbMF07XG4gIGNvbnN0IHB5ID0gcGxheWVyLmNlbnRlclsxXTtcbiAgbGV0IGR4ID0gcHggLSBteDtcbiAgbGV0IGR5ID0gcHkgLSBteTtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhkeCwgMikgKyBNYXRoLnBvdyhkeSwgMikpO1xufTsiLCJleHBvcnQgY29uc3QgV0lEVEggPSA3MjA7XG5leHBvcnQgY29uc3QgSEVJR0hUID0gNzIwO1xuZXhwb3J0IGNvbnN0IFNQUklURV9ESU1TID0gWzQ4LDQ4XTtcbmV4cG9ydCBjb25zdCBGUFMgPSAxMDAwLzYwO1xuZXhwb3J0IGNvbnN0IEtFWVMgPSB7XG4gIDg3OiBmYWxzZSwgLy8gV1xuICA2NTogZmFsc2UsIC8vIEFcbiAgODM6IGZhbHNlLCAvLyBTXG4gIDY4OiBmYWxzZSwgLy8gRFxuICAxNjogZmFsc2UsIC8vIEwtU2hpZnRcbn07XG5leHBvcnQgY29uc3QgRk9OVCA9IHt9O1xuXG5leHBvcnQgY29uc3QgU0VTU0lPTiA9IHt9O1xuZXhwb3J0IGNvbnN0IFNQUklURVMgPSB7fTtcbmV4cG9ydCBjb25zdCBCR19JTUdTID0ge307XG5cbmV4cG9ydCBjb25zdCBDT0lOX1dFSUdIVFMgPSB7XG4gIDM6IDIsXG4gIDI6IDgsXG4gIDE6IDMwLFxuICAwOiA3NSwgXG59O1xuXG5leHBvcnQgY29uc3QgQUxMX1BBVEhTID0gW1xuICBcIkRMUlVcIixcbiAgXCJETFJcIixcbiAgXCJETFVcIixcbiAgXCJMUlVcIixcbiAgXCJEUlVcIixcbiAgXCJETFwiLFxuICBcIkRSXCIsXG4gIFwiRFVcIixcbiAgXCJMUlwiLFxuICBcIkxVXCIsXG4gIFwiUlVcIixcbiAgXCJEXCIsXG4gIFwiTFwiLFxuICBcIlJcIixcbiAgXCJVXCIsXG5dO1xuXG5leHBvcnQgY29uc3QgV0VJR0hUUyA9IHtcbiAgNDoge1xuICAgIDQ6IDU1LFxuICAgIDM6IDQ1LFxuICAgIDI6IDksXG4gICAgMTogMSxcbiAgfSxcbiAgMzoge1xuICAgIDM6IDgwLFxuICAgIDI6IDIwLFxuICAgIDE6IDMsXG4gIH0sXG4gIDI6IHtcbiAgICAyOiA5MCxcbiAgICAxOiAxMCxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBHQU1FX09QVElPTlMgPSB7fTtcbmV4cG9ydCBjb25zdCBSRVFVRVNUID0ge307IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChLRVlTKSA9PiB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xuICAgIGRlYnVnZ2VyXG4gICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwid1wiICYmICFLRVlTW1wid1wiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwiYVwiICYmICFLRVlTW1wiYVwiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwic1wiICYmICFLRVlTW1wic1wiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwiZFwiICYmICFLRVlTW1wiZFwiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgaWYgKGUua2V5ID09PSBcIlNoaWZ0XCIgJiYgIUtFWVNbXCJTaGlmdFwiXSkgS0VZU1tlLmtleV0gPSB0cnVlO1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiICYmICFLRVlTW1wiRW50ZXJcIl0pIEtFWVNbZS5rZXldID0gdHJ1ZTtcblxuICB9KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT4ge1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcIndcIiAmJiBLRVlTW1wid1wiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImFcIiAmJiBLRVlTW1wiYVwiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcInNcIiAmJiBLRVlTW1wic1wiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImRcIiAmJiBLRVlTW1wiZFwiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleSA9PT0gXCJTaGlmdFwiICYmIEtFWVNbXCJTaGlmdFwiXSkgS0VZU1tlLmtleV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiBLRVlTW1wiRW50ZXJcIl0pIEtFWVNbZS5rZXldID0gZmFsc2U7XG4gIH0pO1xuXG4gIGNvbnN0IGhvd1RvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG9cIik7XG4gIFxuICBob3dUby5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10by1wb2ludGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tc291bmRcIikucGxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3ctdG8gPiB1bFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9KTtcbiAgaG93VG8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10by1wb2ludGVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3ctdG8gPiB1bFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9KTtcblxuICBjb25zdCByZXN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1zb3VuZFwiKS5wbGF5KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0LXBvaW50ZXJcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIHJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0LXBvaW50ZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIHJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBuZXdHYW1lKCk7XG4gIH0pO1xuXG59XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IocG9zLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grdGhpcy53aWR0aCx5XTtcbiAgICBjb25zdCBib3R0b21SaWdodCA9IFt4K3RoaXMud2lkdGgseSt0aGlzLmhlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkrdGhpcy5oZWlnaHRdO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI3RyYW5zcGFyZW50XCI7XG4gICAgY3R4LmZpbGxSZWN0KC4uLnRoaXMucG9zLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IGluc3RhbGxMaXN0ZW5lcnMgZnJvbSBcIi4vc2NyaXB0cy91dGlscy9pbnN0YWxsX2xpc3RlbmVyc1wiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3NjcmlwdHMvdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCBHYW1lU3RhcnQgZnJvbSBcIi4vc2NyaXB0cy9nYW1lX3N0YXJ0XCI7XG5cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5XCIpO1xuICBjYW52YXMud2lkdGggPSBHbG9iYWwuV0lEVEg7XG4gIGNhbnZhcy5oZWlnaHQgPSBHbG9iYWwuSEVJR0hUO1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gIGluc3RhbGxMaXN0ZW5lcnMoR2xvYmFsLktFWVMpO1xuXG4gIC8vIGxldCBmb250ID0gbmV3IEZvbnRGYWNlKFwiUHJlc3MgU3RhcnQgMlBcIiwgJ3VybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVByZXNzK1N0YXJ0KzJQJmRpc3BsYXk9c3dhcCknKTtcbiAgLy8gZm9udC5sb2FkKCkudGhlbigoKSA9PiB7XG4gIC8vICAgR2xvYmFsLkZPTlQgPSBmb250O1xuICAvLyB9KTtcblxuICAvLyBjb25zdCBmb250ID0gbmV3IEZvbnRGYWNlKFwiUHJlc3MgU3RhcnQgMlBcIiwgJ3VybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVByZXNzK1N0YXJ0KzJQJmRpc3BsYXk9c3dhcCknKTtcbiAgLy8gZm9udC5sb2FkKCkudGhlbihHbG9iYWwuRk9OVFtcImZvbnRcIl0gPSBmb250KTtcblxuICBsZXQgY29pblNwcml0ZSA9IG5ldyBJbWFnZSgpO1xuICBjb2luU3ByaXRlLnNyYyA9IFwiLi9kaXN0L2Fzc2V0cy9pbWFnZXMvY29pbi9jb2luLnBuZ1wiO1xuICBjb2luU3ByaXRlLm9ubG9hZCA9ICgpID0+IHtcbiAgICBHbG9iYWwuU1BSSVRFUy5jb2luID0gY29pblNwcml0ZTtcbiAgfTtcblxuICBsZXQgbW9uc3RlcnNTcHJpdGVzID0gbmV3IEltYWdlKCk7XG4gIG1vbnN0ZXJzU3ByaXRlcy5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL2VuZW1pZXMvbW9uc3RlcnMucG5nXCI7XG4gIG1vbnN0ZXJzU3ByaXRlcy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgR2xvYmFsLlNQUklURVMubW9uc3RlcnMgPSBtb25zdGVyc1Nwcml0ZXM7XG4gIH07XG4gIFxuICBmb3IgKGxldCBwYXRoIG9mIEdsb2JhbC5BTExfUEFUSFMpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIlwiKS5zb3J0KCkuam9pbihcIlwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xuICAgICAgYmFja2dyb3VuZC5zcmMgPSBgLi9kaXN0L2Fzc2V0cy9pbWFnZXMvbWFwX2ltZ3MvJHtwYXRoLmxlbmd0aH0vJHtwYXRofS9tYXAke2l9LnBuZ2A7XG4gICAgICBcbiAgICAgIGJhY2tncm91bmQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBHbG9iYWwuQkdfSU1HU1tgJHtwYXRoLmxlbmd0aH0ke3BhdGh9JHtpfWBdID0gYmFja2dyb3VuZDtcbiAgICAgICAgLy8gR2xvYmFsLkdCX0lNR1NbXCI0RExSVTBcIl0gPSBiYWNrZ3JvdW5kXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGxldCBwbGF5ZXJTcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbiAgcGxheWVyU3ByaXRlLnNyYyA9IFwiLi9kaXN0L2Fzc2V0cy9pbWFnZXMvcm9ndWUvcm9ndWVfd2Fsay5wbmdcIjtcbiAgXG4gIHBsYXllclNwcml0ZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgbGV0IGdhbWVTdGFydCA9IG5ldyBHYW1lU3RhcnQoY3R4LCBwbGF5ZXJTcHJpdGUpO1xuICAgIEdsb2JhbC5HQU1FX09QVElPTlNbXCJjdHhcIl0gPSBjdHg7XG4gICAgR2xvYmFsLkdBTUVfT1BUSU9OU1tcInBsYXllclNwcml0ZVwiXSA9IHBsYXllclNwcml0ZTtcbiAgICBnYW1lU3RhcnQucHJvbXB0KCk7XG4gICAgXG4gIH1cblxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==