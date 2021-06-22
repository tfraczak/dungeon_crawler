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
      return _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.coinCount >= 10;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9jb2luLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2NvbGxpc2lvbl9ib3guanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW50aXR5LmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZ2FtZV9zdGFydC5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvcm9vbS5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9mdW5jX3V0aWxzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2luc3RhbGxfbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3dhbGwuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwb3MiLCJ3aWR0aCIsImhlaWdodCIsInNwcml0ZVBhbGV0dGUiLCJjb2xCb3hXaWR0aCIsImNvbEJveEhlaWdodCIsImRyYXdPcHRpb25zIiwiaW1hZ2UiLCJwYWxYIiwicGFsWSIsIl9zV2lkdGgiLCJfc0hlaWdodCIsIngiLCJ5IiwiX2RXaWR0aCIsIl9kSGVpZ2h0IiwiY29sQm94IiwiQ29sQm94IiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiY29sbGlzaW9ucyIsImN4IiwiY3kiLCJ1cGRhdGVTaWRlcyIsInNpZGUiLCJvdGhlck9iamVjdCIsIm90aGVyU2lkZSIsImNvbGxpZGVkV2l0aFNpZGUiLCJjdHgiLCJkcmF3SW1hZ2UiLCJPYmplY3QiLCJ2YWx1ZXMiLCJjZW50ZXJPbkVudGl0eSIsImRyYXciLCJDb2luIiwiZnJhbWVJbnRlcnZhbCIsImZyYW1lQ291bnQiLCJjb2xsaWRlZE9uU2lkZSIsIkdsb2JhbCIsInJhbmRDb2luU291bmQiLCJwbGF5IiwiaSIsImMiLCJ3IiwiZW50aXR5Iiwib3JpZ2luUG9zIiwidG9wTGVmdCIsInRvcFJpZ2h0IiwiYm90dG9tUmlnaHQiLCJib3R0b21MZWZ0IiwiY2VudGVyIiwic2lkZXMiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsInN0cm9rZVJlY3QiLCJleCIsImV5IiwiZXciLCJlaCIsInR3IiwidGgiLCJjb2xCb3hIb29rIiwiRW5lbXkiLCJ0eXBlIiwiZGV0ZWN0RGlzdCIsInNwZWVkIiwic3BlZWRNb2RpZmllciIsInBhY2UiLCJjaGFzaW5nUGxheWVyIiwiaWRsZUNvdW50IiwiaWRsZU1heCIsIm1vdmVtZW50IiwidXAiLCJkb3duIiwicGFsWE9mZnNldCIsInN0cmlkZSIsInN0ZXBDb3VudCIsImRpcmVjdGlvbiIsIm14IiwibXkiLCJkeCIsImR5IiwiZGlzdCIsIk1hdGgiLCJzcXJ0IiwicG93IiwicmFuZEFuZ2xlIiwicmFuZG9tIiwiUEkiLCJjb3MiLCJzaW4iLCJhbmdsZSIsImF0YW4iLCJueSIsIm54IiwiYWJzIiwic3ByaXRlRGlyIiwiZmxvb3IiLCJ3YWxscyIsInBsYXllciIsImRpc3RUb1BsYXllciIsIndhbGxDaGVjayIsImhwIiwiZGFtYWdlIiwiaGl0Iiwid2FsbCIsIm5ld1ZlY3RvcnMiLCJub3JtYWxpemVkVmVjdG9yUG9zIiwic3RyaWRlUGFsZXR0ZVBvcyIsImhpdFBsYXllciIsIkdhbWUiLCJwbGF5ZXJTcHJpdGUiLCJmcHNJbnRlcnZhbCIsInRvUGxheWVyIiwic3RhcnRpbmdQb3MiLCJQbGF5ZXIiLCJzdGFydGluZ1Jvb20iLCJSb29tIiwicm9vbSIsImdhbWVTdGVwIiwiYmluZCIsInN0b3AiLCJ3aW4iLCJsb3NlIiwiZ2FtZU92ZXIiLCJyZXF1ZXN0U3RvcCIsInJlcXVlc3RJZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm5vdyIsIkRhdGUiLCJlbGFwc2VkIiwidGhlbiIsImNsZWFyUmVjdCIsIm1vdmUiLCJlbmVtaWVzIiwiZm9yRWFjaCIsImVuZW15IiwiYW5pbWF0ZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZm9udEZhbWlseSIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZm9udCIsImZpbGxUZXh0IiwiR2FtZVN0YXJ0IiwidGhldGEiLCJzdGVwIiwicmVkIiwiZ3JlZW4iLCJibHVlIiwiY29sb3IiLCJyZXN0YXJ0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZUF0dHJpYnV0ZSIsIm5ld0dhbWUiLCJub3JtYWxpemVkU3BlZWQiLCJwYXJzZUZsb2F0Iiwic3RhbWluYSIsImludnVsbmVyYWJsZSIsImRpciIsInNoaWZ0IiwiaW52dWx2ZXJhYmxlIiwiZXhpdERpciIsIm5ld1Jvb21Qb3MiLCJyb29tQ2hhbmdlIiwibmVpZ2hib3IiLCJnZW5lcmF0ZUNvaW5zIiwicmFuZElkeCIsIm5laWdoYm9ycyIsInVuZGVmaW5lZCIsImVudHJ5RGlyIiwia2V5cyIsInByZXZSb29tIiwibm9kZVBvcyIsImFkZFZhbGlkTmVpZ2hib3JzIiwibnVtUGF0aHMiLCJyYW5kUGF0aHMiLCJuZXdQYXRocyIsInBhdGhzIiwiYnVpbGRQYXRocyIsInBhdGhzQXJyIiwic3BsaXQiLCJmaWx0ZXIiLCJwYXRoIiwicmFuZE51bVBhdGhzIiwibGVuZ3RoIiwiYmFja2dyb3VuZCIsImFzc2lnbkJsb2NrZWRQYXRocyIsImJ1aWxkUm9vbVdhbGxzIiwicHVzaCIsInNodWZmbGUiLCJwb3AiLCJzb3J0Iiwiam9pbiIsImdlbmVyYXRlRW5lbWllcyIsIm51bUVuZW1pZXMiLCJudW1Db2lucyIsInJhbmROdW1Db2lucyIsImNvaW5zIiwiY29pbiIsImNvbGxlY3QiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJXYWxsIiwidGhpc1NpZGUiLCJjb2xsaWRlZCIsInVwcGVyRGlmZiIsImxvd2VyRGlmZiIsInVwcGVyQm91bmRzIiwibG93ZXJCb3VuZHMiLCJ0aGlzWVZhbCIsInRoaXNYTWluIiwidGhpc1hNYXgiLCJvdGhlcllWYWwiLCJvdGhlclhNaW4iLCJvdGhlclhNYXgiLCJ0aGlzWFZhbCIsInRoaXNZTWluIiwidGhpc1lNYXgiLCJvdGhlclhWYWwiLCJvdGhlcllNaW4iLCJvdGhlcllNYXgiLCJjdXJyUm9vbSIsIm5leHROb2RlUG9zIiwibWF4IiwidG9TdHJpbmciLCJpbmNsdWRlcyIsIndlaWdodGVkTnVtQ29pbnMiLCJhcnIiLCJqIiwibm9ybWFsaXplZE1vdmVtZW50IiwibXlzZWxmIiwiZGlzdGFuY2VUb1BsYXllciIsInB4IiwicHkiLCJXSURUSCIsIkhFSUdIVCIsIlNQUklURV9ESU1TIiwiRlBTIiwiS0VZUyIsIkZPTlQiLCJTRVNTSU9OIiwiU1BSSVRFUyIsIkJHX0lNR1MiLCJDT0lOX1dFSUdIVFMiLCJBTExfUEFUSFMiLCJXRUlHSFRTIiwiR0FNRV9PUFRJT05TIiwiUkVRVUVTVCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5IiwidG9Mb3dlckNhc2UiLCJob3dUbyIsImNsYXNzTGlzdCIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmUiLCJwcmV2ZW50RGVmYXVsdCIsImNhbnZhcyIsImdldENvbnRleHQiLCJpbnN0YWxsTGlzdGVuZXJzIiwiY29pblNwcml0ZSIsIkltYWdlIiwic3JjIiwib25sb2FkIiwibW9uc3RlcnNTcHJpdGVzIiwiZ2FtZVN0YXJ0IiwicHJvbXB0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0NBRUE7O0lBRU1BLE07QUFDSixrQkFBWUMsR0FBWixFQUFnQkMsS0FBaEIsRUFBc0JDLE1BQXRCLEVBQTZCQyxhQUE3QixFQUE0QztBQUFBOztBQUMxQyxTQUFLSCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxRQUFNRSxXQUFXLEdBQUdILEtBQXBCO0FBQ0EsUUFBTUksWUFBWSxHQUFHSCxNQUFyQjtBQUVBLFNBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsU0FBS0csV0FBTCxHQUFtQjtBQUNqQkMsV0FBSyxFQUFFSixhQURVO0FBRWpCSyxVQUFJLEVBQUUsQ0FGVztBQUdqQkMsVUFBSSxFQUFFLENBSFc7QUFJakJDLGFBQU8sRUFBRVQsS0FKUTtBQUtqQlUsY0FBUSxFQUFFVCxNQUxPO0FBTWpCVSxPQUFDLEVBQUVaLEdBQUcsQ0FBQyxDQUFELENBTlc7QUFPakJhLE9BQUMsRUFBRWIsR0FBRyxDQUFDLENBQUQsQ0FQVztBQVFqQmMsYUFBTyxFQUFFYixLQVJRO0FBU2pCYyxjQUFRLEVBQUViO0FBVE8sS0FBbkI7QUFXQSxTQUFLYyxNQUFMLEdBQWMsSUFBSUMsbURB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ZVcsSUFBZixHQUFzQkMsSUFBdEIsQ0FBMkIsRUFBM0IsQ0FBUDs7QUE5QmdELG1DQStCdkN6SixDQS9CdUM7QUFnQzlDLFlBQU1rSixVQUFVLEdBQUcsSUFBSStFLEtBQUosRUFBbkI7QUFDQS9FLGtCQUFVLENBQUNnRixHQUFYLDJDQUFrRG5GLElBQUksQ0FBQ0UsTUFBdkQsY0FBaUVGLElBQWpFLGlCQUE0RS9JLENBQTVFOztBQUVBa0osa0JBQVUsQ0FBQ2lGLE1BQVgsR0FBb0IsWUFBTTtBQUN4QnRPLHlFQUFBLFdBQWtCa0osSUFBSSxDQUFDRSxNQUF2QixTQUFnQ0YsSUFBaEMsU0FBdUMvSSxDQUF2QyxLQUE4Q2tKLFVBQTlDLENBRHdCLENBRXhCO0FBQ0QsU0FIRDtBQW5DOEM7O0FBK0JoRCxXQUFLLElBQUlsSixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQTRCO0FBQUEsZUFBbkJBLENBQW1CO0FBUTNCO0FBdkMrQzs7QUE2QmxELHdEQUFtQztBQUFBO0FBV2xDO0FBeENpRDtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTBDbEQsTUFBSXNFLFlBQVksR0FBRyxJQUFJMkosS0FBSixFQUFuQjtBQUNBM0osY0FBWSxDQUFDNEosR0FBYixHQUFtQiwyQ0FBbkI7O0FBRUE1SixjQUFZLENBQUM2SixNQUFiLEdBQXNCLFlBQU07QUFDMUIsUUFBSUUsU0FBUyxHQUFHLElBQUk5SCx3REFBSixDQUFjcEgsR0FBZCxFQUFtQm1GLFlBQW5CLENBQWhCO0FBQ0F6RSw0RUFBQSxHQUE2QlYsR0FBN0I7QUFDQVUscUZBQUEsR0FBc0N5RSxZQUF0QztBQUNBK0osYUFBUyxDQUFDQyxNQUFWO0FBRUQsR0FORDtBQVFELENBckRELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xCb3ggZnJvbSBcIi4vY29sbGlzaW9uX2JveFwiO1xuaW1wb3J0IHsgY29sbGlkZWRXaXRoU2lkZSwgcmFuZENvaW5Tb3VuZCB9IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuLy8gaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcblxuY2xhc3MgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnN0IGNvbEJveFdpZHRoID0gd2lkdGg7XG4gICAgY29uc3QgY29sQm94SGVpZ2h0ID0gaGVpZ2h0O1xuICAgIFxuICAgIHRoaXMuc3ByaXRlUGFsZXR0ZSA9IHNwcml0ZVBhbGV0dGU7XG4gICAgdGhpcy5kcmF3T3B0aW9ucyA9IHtcbiAgICAgIGltYWdlOiBzcHJpdGVQYWxldHRlLFxuICAgICAgcGFsWDogMCxcbiAgICAgIHBhbFk6IDAsXG4gICAgICBfc1dpZHRoOiB3aWR0aCxcbiAgICAgIF9zSGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiBwb3NbMF0sXG4gICAgICB5OiBwb3NbMV0sXG4gICAgICBfZFdpZHRoOiB3aWR0aCxcbiAgICAgIF9kSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICB0aGlzLmNvbEJveCA9IG5ldyBDb2xCb3godGhpcyxjb2xCb3hXaWR0aCxjb2xCb3hIZWlnaHQpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY29sbGlzaW9ucyA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcbiAgICBcbiAgfVxuXG4gIGNvbEJveEhvb2soKSB7IC8vIHRoaXMgd2lsbCBjZW50ZXIgdGhlIGNvbEJveCBvbiB0aGUgYm90dG9tXG4gICAgbGV0IFt4LHldID0gW3RoaXMucG9zWzBdLHRoaXMucG9zWzFdXTtcbiAgICBsZXQgW2N4LGN5XSA9IFtcbiAgICAgIHgrKCh0aGlzLndpZHRoIC0gdGhpcy5jb2xCb3gud2lkdGgpLzIpLFxuICAgICAgeSsodGhpcy5oZWlnaHQgLSB0aGlzLmNvbEJveC5oZWlnaHQpLFxuICAgIF07XG4gICAgcmV0dXJuIFtjeCxjeV07XG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICB0aGlzLmNvbEJveC51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICB9XG5cbiAgY29sbGlkZWRPblNpZGUoc2lkZSwgb3RoZXJPYmplY3QpIHtcbiAgICBsZXQgb3RoZXJTaWRlO1xuICAgIHN3aXRjaChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwiYm90dG9tXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInRvcFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwicmlnaHRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJsZWZ0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3RoZXJTaWRlID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sbGlzaW9uc1tzaWRlXSA9IGNvbGxpZGVkV2l0aFNpZGUoc2lkZSwgdGhpc1tzaWRlXSwgb3RoZXJPYmplY3Rbb3RoZXJTaWRlXSk7XG4gICAgcmV0dXJuIHRoaXMuY29sbGlzaW9uc1tzaWRlXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSguLi5PYmplY3QudmFsdWVzKHRoaXMuZHJhd09wdGlvbnMpKTtcbiAgICB0aGlzLmNvbEJveC5jZW50ZXJPbkVudGl0eSgpO1xuICAgIHRoaXMuY29sQm94LmRyYXcoY3R4KTtcbiAgfVxufVxuXG5jbGFzcyBDb2luIGV4dGVuZHMgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGVQYWxldHRlKSB7XG4gICAgc3VwZXIocG9zLCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGVQYWxldHRlKTtcbiAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMjtcbiAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IDA7XG4gIH1cblxuICBjb2xsZWN0KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJ0b3BcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpIHx8XG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwiYm90dG9tXCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKSB8fFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpIHx8XG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwicmlnaHRcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpXG4gICAgKSB7XG4gICAgICByYW5kQ29pblNvdW5kKCkucGxheSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgY29uc3QgaSA9IHRoaXMuZnJhbWVJbnRlcnZhbDtcbiAgICBjb25zdCBjID0gdGhpcy5mcmFtZUNvdW50O1xuICAgIGNvbnN0IHcgPSB0aGlzLndpZHRoO1xuICAgIGlmIChjIDwgaSkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDA7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjIpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAxO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSozKSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMjtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDM7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjUpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA0O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo2KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNTtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNykge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDY7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjgpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA3O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAwO1xuICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29pbjsiLCJcblxuY2xhc3MgQ29sQm94IHtcbiAgY29uc3RydWN0b3IoZW50aXR5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbnRpdHkgPSBlbnRpdHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucG9zID0gdGhpcy5vcmlnaW5Qb3MoKTtcblxuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grd2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt3aWR0aCx5K2hlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkraGVpZ2h0XTtcbiAgICBcbiAgICB0aGlzLmNlbnRlciA9IFt4Kyh3aWR0aC8yKSx5KyhoZWlnaHQvMildO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICAgIHRoaXMuc2lkZXMgPSBbdGhpcy50b3AsIHRoaXMuYm90dG9tLCB0aGlzLnJpZ2h0LCB0aGlzLmxlZnRdO1xuICAgIFxuICB9XG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIGN0eC5zdHJva2VSZWN0KFxuICAgICAgdGhpcy5wb3NbMF0sXG4gICAgICB0aGlzLnBvc1sxXSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodCxcbiAgICApXG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3RoaXMud2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt0aGlzLndpZHRoLHkrdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K3RoaXMuaGVpZ2h0XTtcbiAgICB0aGlzLmNlbnRlciA9IFt4Kyh0aGlzLndpZHRoLzIpLHkrKHRoaXMuaGVpZ2h0LzIpXTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgfVxuXG4gIG9yaWdpblBvcygpIHtcbiAgICBjb25zdCBbZXgsZXldID0gW3RoaXMuZW50aXR5LnBvc1swXSwgdGhpcy5lbnRpdHkucG9zWzFdXTtcbiAgICBjb25zdCBbZXcsZWhdID0gW3RoaXMuZW50aXR5LndpZHRoLCB0aGlzLmVudGl0eS5oZWlnaHRdO1xuICAgIGNvbnN0IFt0dyx0aF0gPSBbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IHggPSBleCArICgoZXctdHcpLzIpO1xuICAgIGNvbnN0IHkgPSBleSArIGVoIC0gdGg7XG4gICAgcmV0dXJuIFt4LHldO1xuICB9XG5cbiAgY2VudGVyT25FbnRpdHkoKSB7XG4gICAgdGhpcy5wb3MgPSB0aGlzLmVudGl0eS5jb2xCb3hIb29rKCk7XG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sQm94OyIsIi8vIGltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5pbXBvcnQgQ29sQm94IGZyb20gJy4vY29sbGlzaW9uX2JveCc7XG5pbXBvcnQge1xuICBub3JtYWxpemVkTW92ZW1lbnQsXG4gIGNvbGxpZGVkV2l0aFNpZGUsXG59IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuXG5jbGFzcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29sQm94V2lkdGggPSB3aWR0aC8yO1xuICAgIGNvbnN0IGNvbEJveEhlaWdodCA9IGhlaWdodC8zO1xuICAgIFxuICAgIHRoaXMuc3ByaXRlUGFsZXR0ZSA9IHNwcml0ZVBhbGV0dGU7XG4gICAgdGhpcy5kcmF3T3B0aW9ucyA9IHtcbiAgICAgIGltYWdlOiBzcHJpdGVQYWxldHRlLFxuICAgICAgcGFsWDogMCxcbiAgICAgIHBhbFk6IDAsXG4gICAgICBfc1dpZHRoOiB3aWR0aCxcbiAgICAgIF9zSGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiBwb3NbMF0sXG4gICAgICB5OiBwb3NbMV0sXG4gICAgICBfZFdpZHRoOiB3aWR0aCxcbiAgICAgIF9kSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICB0aGlzLmNvbEJveCA9IG5ldyBDb2xCb3godGhpcyxjb2xCb3hXaWR0aCxjb2xCb3hIZWlnaHQpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY2VudGVyID0gdGhpcy5jb2xCb3guY2VudGVyO1xuICAgIHRoaXMuY29sbGlzaW9ucyA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcblxuICB9XG5cbiAgY29sQm94SG9vaygpIHsgLy8gdGhpcyB3aWxsIGNlbnRlciB0aGUgY29sQm94IG9uIHRoZSBib3R0b21cbiAgICBsZXQgW3gseV0gPSBbdGhpcy5wb3NbMF0sdGhpcy5wb3NbMV1dO1xuICAgIGxldCBbY3gsY3ldID0gW1xuICAgICAgeCsoKHRoaXMud2lkdGggLSB0aGlzLmNvbEJveC53aWR0aCkvMiksXG4gICAgICB5Kyh0aGlzLmhlaWdodCAtIHRoaXMuY29sQm94LmhlaWdodCksXG4gICAgXTtcbiAgICByZXR1cm4gW2N4LGN5XTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIHRoaXMuY29sQm94LnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNvbEJveC5jZW50ZXI7XG4gIH1cblxuICBjb2xsaWRlZE9uU2lkZShzaWRlLCBvdGhlck9iamVjdCkge1xuICAgIGxldCBvdGhlclNpZGU7XG4gICAgc3dpdGNoKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJib3R0b21cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwidG9wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJyaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImxlZnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvdGhlclNpZGUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb25zW3NpZGVdID0gY29sbGlkZWRXaXRoU2lkZShzaWRlLCB0aGlzW3NpZGVdLCBvdGhlck9iamVjdFtvdGhlclNpZGVdKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zW3NpZGVdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKC4uLk9iamVjdC52YWx1ZXModGhpcy5kcmF3T3B0aW9ucykpO1xuICAgIHRoaXMuY29sQm94LmNlbnRlck9uRW50aXR5KCk7XG4gICAgdGhpcy5jb2xCb3guZHJhdyhjdHgpO1xuICB9XG59XG5cbmNsYXNzIEVuZW15IGV4dGVuZHMgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlLCB0eXBlLCBkZXRlY3REaXN0KSB7XG4gICAgc3VwZXIocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKTtcbiAgICB0aGlzLnNwZWVkID0gMC45O1xuICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDAuNzU7XG4gICAgdGhpcy5wYWNlID0gMjQvdGhpcy5zcGVlZDtcbiAgICB0aGlzLmNoYXNpbmdQbGF5ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmRldGVjdERpc3QgPSBkZXRlY3REaXN0O1xuICAgIHRoaXMuaWRsZUNvdW50ID0gMDtcbiAgICB0aGlzLmlkbGVNYXggPSA2MDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMubW92ZW1lbnQgPSB7XG4gICAgICB1cDogZmFsc2UsXG4gICAgICBkb3duOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgIH07XG4gICAgbGV0IHgsIHk7XG4gICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgIHggPSA0OCAqIDM7XG4gICAgICAgIHkgPSA0OCAqIDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJhdFwiOlxuICAgICAgICB4ID0gNDggKiAwO1xuICAgICAgICB5ID0gNDggKiAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJnaG9zdFwiOlxuICAgICAgICB4ID0gNDggKiA2O1xuICAgICAgICB5ID0gNDggKiA0O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5wYWxYT2Zmc2V0ID0geDtcbiAgICB0aGlzLnN0cmlkZSA9IHtcbiAgICAgIHVwOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogKDQ4ICogMykgKyB5LFxuICAgICAgfSxcbiAgICAgIGRvd246IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiAoNDggKiAwKSArIHksXG4gICAgICB9LFxuICAgICAgbGVmdDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6ICg0OCAqIDEpICsgeSxcbiAgICAgIH0sXG4gICAgICByaWdodDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6ICg0OCAqIDIpICsgeSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHN0cmlkZVBhbGV0dGVQb3MoZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5wYWNlID0gMjQgLyAodGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcik7XG4gICAgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiAoNDggKiAxKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDIgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gKDQ4ICogMCkgKyB0aGlzLnBhbFhPZmZzZXQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSAzICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuICg0OCAqIDEpICsgdGhpcy5wYWxYT2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiAoNDggKiAyKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID4gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPSAwO1xuICAgICAgcmV0dXJuICg0OCAqIDEpICsgdGhpcy5wYWxYT2Zmc2V0O1xuICAgIH1cbiAgfVxuXG4gIGRpc3RUb1BsYXllcigpIHtcbiAgICBjb25zdCBteCA9IHRoaXMuY2VudGVyWzBdO1xuICAgIGNvbnN0IG15ID0gdGhpcy5jZW50ZXJbMV07XG4gICAgY29uc3QgZXggPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuY2VudGVyWzBdO1xuICAgIGNvbnN0IGV5ID0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmNlbnRlclsxXTtcbiAgICBsZXQgZHggPSBteCAtIGV4O1xuICAgIGxldCBkeSA9IG15IC0gZXk7XG4gICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChNYXRoLnBvdyhkeCwgMikgKyBNYXRoLnBvdyhkeSwgMikpO1xuICAgIHJldHVybiBkaXN0O1xuICB9XG5cbiAgbm9ybWFsaXplZFZlY3RvclBvcygpIHtcbiAgICBjb25zdCBteCA9IHRoaXMuY2VudGVyWzBdO1xuICAgIGNvbnN0IG15ID0gdGhpcy5jZW50ZXJbMV07XG4gICAgY29uc3QgZXggPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuY2VudGVyWzBdO1xuICAgIGNvbnN0IGV5ID0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmNlbnRlclsxXTtcbiAgICBsZXQgZHggPSBteCAtIGV4O1xuICAgIGxldCBkeSA9IG15IC0gZXk7XG5cbiAgICBpZiAoIXRoaXMuY2hhc2luZ1BsYXllciAmJiAhdGhpcy5pZGxlQ291bnQpIHtcbiAgICAgIGNvbnN0IHJhbmRBbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAyICogTWF0aC5QSTtcbiAgICAgIHRoaXMuZHggPSBNYXRoLmNvcyhyYW5kQW5nbGUpICogdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIHRoaXMuZHkgPSBNYXRoLnNpbihyYW5kQW5nbGUpICogdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIHRoaXMuaWRsZUNvdW50ID0gMTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCF0aGlzLmNoYXNpbmdQbGF5ZXIgJiYgdGhpcy5pZGxlQ291bnQpIHRoaXMuaWRsZUNvdW50Kys7XG4gICAgXG4gICAgaWYgKHRoaXMuY2hhc2luZ1BsYXllcikge1xuICAgICAgdGhpcy5keCA9IGR4O1xuICAgICAgdGhpcy5keSA9IGR5O1xuICAgIH1cblxuXG4gICAgaWYodGhpcy5pZGxlQ291bnQgPj0gdGhpcy5pZGxlTWF4KSB0aGlzLmlkbGVDb3VudCA9IDA7XG5cbiAgICB0aGlzLmFuZ2xlID0gTWF0aC5hdGFuKHRoaXMuZHkvdGhpcy5keCk7XG4gICAgY29uc3QgbnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgY29uc3QgbnggPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgaWYgKHRoaXMuZHkgPiAwKSB7XG4gICAgICB0aGlzLm1vdmVtZW50W1widXBcIl0gPSB0cnVlO1xuICAgICAgdGhpcy5tb3ZlbWVudFtcImRvd25cIl0gPSBmYWxzZTtcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmR5KSA+IE1hdGguYWJzKHRoaXMuZHgpKSB0aGlzLnNwcml0ZURpciA9IFwidXBcIjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuZHkgPCAwKSB7XG4gICAgICB0aGlzLm1vdmVtZW50W1wiZG93blwiXSA9IHRydWU7XG4gICAgICB0aGlzLm1vdmVtZW50W1widXBcIl0gPSBmYWxzZTtcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmR5KSA+IE1hdGguYWJzKHRoaXMuZHgpKSB0aGlzLnNwcml0ZURpciA9IFwiZG93blwiO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5keCA+IDApIHtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJsZWZ0XCJdID0gdHJ1ZTtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJyaWdodFwiXSA9IGZhbHNlO1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuZHgpID4gTWF0aC5hYnModGhpcy5keSkpIHRoaXMuc3ByaXRlRGlyID0gXCJsZWZ0XCI7XG4gICAgfVxuICAgIFxuICAgIGlmICh0aGlzLmR4IDwgMCkge1xuICAgICAgdGhpcy5tb3ZlbWVudFtcInJpZ2h0XCJdID0gdHJ1ZTtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJsZWZ0XCJdID0gZmFsc2U7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5keCkgPiBNYXRoLmFicyh0aGlzLmR5KSkgdGhpcy5zcHJpdGVEaXIgPSBcInJpZ2h0XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtueCxueV07XG4gIH1cblxuICBkYW1hZ2UoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkqNCkrMSk7XG4gIH1cblxuICBoaXRQbGF5ZXIod2FsbHMpIHtcblxuICAgIGNvbnN0IHBsYXllciA9IEdsb2JhbC5TRVNTSU9OLnBsYXllcjtcblxuICAgIGlmICh0aGlzLmRpc3RUb1BsYXllcigpIDwgMzIgJiYgIUdsb2JhbC5TRVNTSU9OLnBsYXllci5pbnZ1bG5lcmFibGUpIHtcbiAgICAgIHBsYXllci5wb3NbMF0gLT0gKDAuNCAqIHRoaXMuZHgpO1xuICAgICAgcGxheWVyLnBvc1sxXSAtPSAoMC40ICogdGhpcy5keSk7XG4gICAgICBwbGF5ZXIudXBkYXRlU2lkZXMoKTtcbiAgICAgIHBsYXllci53YWxsQ2hlY2sod2FsbHMpO1xuICAgICAgcGxheWVyLnVwZGF0ZVNpZGVzKCk7XG4gICAgICBwbGF5ZXIuaHAgLT0gdGhpcy5kYW1hZ2UoKTtcbiAgICAgIGlmIChwbGF5ZXIuaHAgPCAwKSBwbGF5ZXIuaHAgPSAwO1xuICAgICAgcGxheWVyLmhpdCgpO1xuICAgIH1cblxuICB9XG5cbiAgd2FsbENoZWNrKHdhbGxzKSB7XG4gICAgY29uc3Qge1xuICAgICAgdXAsXG4gICAgICBkb3duLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0XG4gICAgfSA9IHRoaXMubW92ZW1lbnQ7XG5cbiAgICBpZiAodXApIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInRvcFwiLCB3YWxsKSkgYnJlYWs7IH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMudG9wKSB7XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLnRvcCAtICh0aGlzLmhlaWdodC10aGlzLmNvbEJveC5oZWlnaHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb3duKSB7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJib3R0b21cIiwgd2FsbCkpIGJyZWFrOyB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmJvdHRvbSkge1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy5ib3R0b20gLSA0ODtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobGVmdCkge1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwibGVmdFwiLCB3YWxsKSkgYnJlYWs7IH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5sZWZ0IC0gKHRoaXMuY29sQm94LndpZHRoLzIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyaWdodCkge1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwicmlnaHRcIiwgd2FsbCkpIGJyZWFrOyB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnJpZ2h0KSB7XG4gICAgICAgIHRoaXMucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLnJpZ2h0IC0gKHRoaXMuY29sQm94LndpZHRoICsgKHRoaXMuY29sQm94LndpZHRoLzIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG5cblxuICBtb3ZlKHdhbGxzKSB7XG5cbiAgICBpZiAodGhpcy5kaXN0VG9QbGF5ZXIoKSA8IHRoaXMuZGV0ZWN0RGlzdCkge1xuICAgICAgdGhpcy5jaGFzaW5nUGxheWVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhc2luZ1BsYXllciA9IGZhbHNlO1xuICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMC43NTtcbiAgICB9XG4gICAgXG4gICAgbGV0IG5ld1ZlY3RvcnMgPSB0aGlzLm5vcm1hbGl6ZWRWZWN0b3JQb3MoKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIHVwLFxuICAgICAgZG93bixcbiAgICAgIGxlZnQsXG4gICAgICByaWdodFxuICAgIH0gPSB0aGlzLm1vdmVtZW50O1xuXG4gICAgaWYgKGxlZnQgJiYgdXApIHtcbiAgICAgIHRoaXMucG9zWzBdIC09IG5ld1ZlY3RvcnNbMF07XG4gICAgICB0aGlzLnBvc1sxXSAtPSBuZXdWZWN0b3JzWzFdO1xuICAgIH0gXG4gICAgXG4gICAgaWYgKGxlZnQgJiYgZG93bikge1xuICAgICAgdGhpcy5wb3NbMF0gLT0gbmV3VmVjdG9yc1swXTtcbiAgICAgIHRoaXMucG9zWzFdIC09IG5ld1ZlY3RvcnNbMV07XG4gICAgfVxuICAgIFxuICAgIGlmIChyaWdodCAmJiB1cCkge1xuICAgICAgdGhpcy5wb3NbMF0gKz0gbmV3VmVjdG9yc1swXTtcbiAgICAgIHRoaXMucG9zWzFdICs9IG5ld1ZlY3RvcnNbMV07XG4gICAgfSBcbiAgICBcbiAgICBpZiAocmlnaHQgJiYgZG93bikge1xuICAgICAgdGhpcy5wb3NbMF0gKz0gbmV3VmVjdG9yc1swXTtcbiAgICAgIHRoaXMucG9zWzFdICs9IG5ld1ZlY3RvcnNbMV07XG4gICAgfVxuXG4gICAgdGhpcy53YWxsQ2hlY2sod2FsbHMpO1xuXG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuXG4gICAgc3dpdGNoICh0aGlzLnNwcml0ZURpcikge1xuICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLnVwLnBhbFk7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcInVwXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5kb3duLnBhbFk7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImRvd25cIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUubGVmdC5wYWxZO1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJsZWZ0XCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5yaWdodC5wYWxZO1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJyaWdodFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSA0OCAqIDE7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIFxuICAgIHRoaXMuaGl0UGxheWVyKHdhbGxzKTtcbiAgICBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIud2FsbENoZWNrKHdhbGxzKTtcbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy5kcmF3T3B0aW9ucy54ID0gdGhpcy5wb3NbMF07XG4gICAgdGhpcy5kcmF3T3B0aW9ucy55ID0gdGhpcy5wb3NbMV07XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmVteTsiLCJpbXBvcnQgQ29sQm94IGZyb20gXCIuL2NvbGxpc2lvbl9ib3hcIjtcbmltcG9ydCB7IGNvbGxpZGVkV2l0aFNpZGUgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmNsYXNzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb2xCb3hXaWR0aCA9IHdpZHRoLzI7XG4gICAgY29uc3QgY29sQm94SGVpZ2h0ID0gaGVpZ2h0LzM7XG4gICAgXG4gICAgdGhpcy5zcHJpdGVQYWxldHRlID0gc3ByaXRlUGFsZXR0ZTtcbiAgICB0aGlzLmRyYXdPcHRpb25zID0ge1xuICAgICAgaW1hZ2U6IHNwcml0ZVBhbGV0dGUsXG4gICAgICBwYWxYOiAwLFxuICAgICAgcGFsWTogMCxcbiAgICAgIF9zV2lkdGg6IHdpZHRoLFxuICAgICAgX3NIZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHBvc1swXSxcbiAgICAgIHk6IHBvc1sxXSxcbiAgICAgIF9kV2lkdGg6IHdpZHRoLFxuICAgICAgX2RIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIHRoaXMuY29sQm94ID0gbmV3IENvbEJveCh0aGlzLGNvbEJveFdpZHRoLGNvbEJveEhlaWdodCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNvbEJveC5jZW50ZXI7XG4gICAgdGhpcy5jb2xsaXNpb25zID0ge1xuICAgICAgdG9wOiBmYWxzZSxcbiAgICAgIGJvdHRvbTogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuICAgIFxuICB9XG5cbiAgY29sQm94SG9vaygpIHsgLy8gdGhpcyB3aWxsIGNlbnRlciB0aGUgY29sQm94IG9uIHRoZSBib3R0b21cbiAgICBsZXQgW3gseV0gPSBbdGhpcy5wb3NbMF0sdGhpcy5wb3NbMV1dO1xuICAgIGxldCBbY3gsY3ldID0gW1xuICAgICAgeCsoKHRoaXMud2lkdGggLSB0aGlzLmNvbEJveC53aWR0aCkvMiksXG4gICAgICB5Kyh0aGlzLmhlaWdodCAtIHRoaXMuY29sQm94LmhlaWdodCksXG4gICAgXTtcbiAgICByZXR1cm4gW2N4LGN5XTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIHRoaXMuY29sQm94LnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNvbEJveC5jZW50ZXI7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gIH1cblxuICBjb2xsaWRlZE9uU2lkZShzaWRlLCBvdGhlck9iamVjdCkge1xuICAgIGxldCBvdGhlclNpZGU7XG4gICAgc3dpdGNoKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJib3R0b21cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwidG9wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJyaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImxlZnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvdGhlclNpZGUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb25zW3NpZGVdID0gY29sbGlkZWRXaXRoU2lkZShzaWRlLCB0aGlzW3NpZGVdLCBvdGhlck9iamVjdFtvdGhlclNpZGVdKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zW3NpZGVdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKC4uLk9iamVjdC52YWx1ZXModGhpcy5kcmF3T3B0aW9ucykpO1xuICAgIHRoaXMuY29sQm94LmNlbnRlck9uRW50aXR5KCk7XG4gICAgdGhpcy5jb2xCb3guZHJhdyhjdHgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudGl0eTsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4vcm9vbVwiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihjdHgsIHBsYXllclNwcml0ZSkge1xuICAgIHRoaXMuZnBzSW50ZXJ2YWwgPSAxMDAwLzYwO1xuICAgIHRoaXMudG9QbGF5ZXIgPSAxMDA7XG4gICAgY29uc3Qgc3RhcnRpbmdQb3MgPSBbNDgqNywgNDgqN107XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHN0YXJ0aW5nUG9zLCAuLi5HbG9iYWwuU1BSSVRFX0RJTVMsIHBsYXllclNwcml0ZSk7XG4gICAgR2xvYmFsLlNFU1NJT04ucGxheWVyID0gdGhpcy5wbGF5ZXI7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgLy8gY29uc3Qgcm9vbSA9IHsgXCJsZWZ0XCI6IG5ldyBSb29tKCkgfTsgLy8gdGVzdGluZyBuZXcgUm9vbShyb29tKVxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zID0ge307XG4gICAgdGhpcy5zdGFydGluZ1Jvb20gPSBuZXcgUm9vbSgpO1xuICAgIHRoaXMucm9vbSA9IHRoaXMuc3RhcnRpbmdSb29tO1xuICAgIHRoaXMucGxheWVyLmRyYXcoY3R4KTtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lID0gdGhpcztcbiAgICBHbG9iYWwuU0VTU0lPTi5zdG9wID0gZmFsc2U7XG4gICAgR2xvYmFsLlNFU1NJT04uY29pbkNvdW50ID0gMDtcbiAgICB0aGlzLmdhbWVTdGVwID0gdGhpcy5nYW1lU3RlcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcCA9IHRoaXMuc3RvcC5iaW5kKHRoaXMpO1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheSgpO1xuICB9XG5cbiAgZ2FtZU92ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMud2luKCkgfHwgdGhpcy5sb3NlKCk7XG4gIH1cblxuICB3aW4oKXtcbiAgICByZXR1cm4gR2xvYmFsLlNFU1NJT04uY29pbkNvdW50ID49IDEwO1xuICB9XG5cbiAgbG9zZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXIuaHAgPD0gMDtcbiAgfVxuXG5cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLmdhbWVPdmVyKCkpIHtcbiAgICAgIHRoaXMucmVxdWVzdFN0b3AgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdhbWVTdGVwKCkge1xuICAgIHRoaXMucmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZ2FtZVN0ZXApO1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBlbGFwc2VkID0gbm93IC0gdGhpcy50aGVuO1xuXG4gICAgaWYgKGVsYXBzZWQgPiB0aGlzLmZwc0ludGVydmFsKSB7XG4gICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZWxhcHNlZCAlIHRoaXMuZnBzSW50ZXJ2YWwpO1xuICAgICAgY29uc3QgcGxheWVyID0gR2xvYmFsLlNFU1NJT04ucGxheWVyO1xuICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsMCwgR2xvYmFsLldJRFRILCBHbG9iYWwuSEVJR0hUKTtcbiAgICAgIHBsYXllci5tb3ZlKHRoaXMucm9vbS53YWxscyk7XG4gICAgICBPYmplY3QudmFsdWVzKHRoaXMucm9vbS5lbmVtaWVzKS5mb3JFYWNoKGVuZW15ID0+IGVuZW15Lm1vdmUodGhpcy5yb29tLndhbGxzKSk7XG4gICAgICB0aGlzLnJvb20uYW5pbWF0ZSgpO1xuICAgICAgdGhpcy5yb29tLmRyYXcodGhpcy5jdHgpO1xuICAgICAgcGxheWVyLmRyYXcodGhpcy5jdHgpO1xuICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICBpZiAodGhpcy5yZXF1ZXN0U3RvcCkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZCk7XG4gICAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSBcIkNvdXJpZXIgTmV3XCI7XG4gICAgICAgIGlmICh0aGlzLndpbigpKSB7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwwLDAuNSlcIjtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLDAsNzIwLDcyMCk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjZmZmYWY0XCI7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGA0OHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ29uZ3JhdHVsYXRpb25zIVwiLCA0OCozLCA0OCo0KTtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDI0cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJZb3UgbGVhdmUgd2l0aCB5b3VyIGxpZmUsXCIsIDQ4KjQsNDgqNSk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJhbmQgeW91ciBwb2NrZXRzIGZ1bGwhXCIsIDQ4KjQuNSw0OCo1LjUpO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ2xpY2sgJ1Jlc3RhcnQnIHVwIHRvcCBpZlwiLCA0OCo0LDQ4KjcpO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwieW91J2QgbGlrZSB0byBwbGF5IGFnYWluXCIsIDQ4KjQuMiw0OCo3LjUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvc2UoKSkge1xuICAgICAgICAgIGNvbnN0IGZvbnQgPSBHbG9iYWwuRk9OVC5mb250O1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgwLDAsMCwwLjUpXCI7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwwLDcyMCw3MjApO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmFmNFwiO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgNDhweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkdBTUUgT1ZFUlwiLCA0OCAqIDQuNzUsIDQ4ICogNCk7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGAzNnB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwieW91IGxvc2UhXCIsIDQ4ICogNS42NSwgNDggKiA1KTtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDk2cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCLwn5KAXCIsIDQ4ICogNi4yNSwgNDggKiA3KTtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDI0cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDbGljayAnUmVzdGFydCcgdXAgdG9wIGlmXCIsIDQ4KjQsNDgqOSk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJ5b3UnZCBsaWtlIHRvIHBsYXkgYWdhaW5cIiwgNDgqNC4yLDQ4KjkuNSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmdhbWVTdGVwKCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZ2FtZVN0ZXApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgeyBuZXdHYW1lIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuY2xhc3MgR2FtZVN0YXJ0IHtcbiAgY29uc3RydWN0b3IoY3R4LCBwbGF5ZXJTcHJpdGUpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLnBsYXllclNwcml0ZSA9IHBsYXllclNwcml0ZTtcbiAgICB0aGlzLmZwc0ludGVydmFsID0gMTAwMC82MDtcbiAgICB0aGlzLnRoZXRhID0gMDtcbiAgICB0aGlzLnN0ZXAgPSB0aGlzLnN0ZXAuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zdGVwKTtcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZWxhcHNlZCA9IG5vdyAtIHRoaXMudGhlbjtcbiAgICBpZiAoZWxhcHNlZCA+IHRoaXMuZnBzSW50ZXJ2YWwpIHtcbiAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSBcIkNvdXJpZXIgTmV3XCI7XG4gICAgICB0aGlzLnRoZXRhICs9IDAuMDE7XG4gICAgICBjb25zdCByZWQgPSBNYXRoLmZsb29yKDEyNyAqIE1hdGguc2luKDEuMSAqIHRoaXMudGhldGEpICsgMSk7XG4gICAgICBjb25zdCBncmVlbiA9IE1hdGguZmxvb3IoMTI3ICogTWF0aC5zaW4oMS4yICogdGhpcy50aGV0YSkgKyAxKTtcbiAgICAgIGNvbnN0IGJsdWUgPSBNYXRoLmZsb29yKDEyNyAqIE1hdGguc2luKDEuNSAqIHRoaXMudGhldGEpICsgMSk7XG4gICAgICBjb25zdCBjb2xvciA9IGByZ2JhKCR7cmVkfSwke2dyZWVufSwke2JsdWV9LCAwLjcpYDtcbiAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLDAsNzIwLDcyMCk7XG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoR2xvYmFsLkJHX0lNR1NbXCI0RExSVTBcIl0sIDAsIDApO1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLDAsNzIwLDcyMCk7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZhZjRcIjtcbiAgICAgIHRoaXMuY3R4LmZvbnQgPSBgYm9sZCA0OHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJQcmVzcyBFTlRFUlwiLCA0OCAqIDQsIDQ4ICogNCk7XG4gICAgICB0aGlzLmN0eC5mb250ID0gYGJvbGQgMjRweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiLi4udG8gYmVnaW4gYSBuZXcgY3Jhd2whXCIsIDQ4ICogNSwgNDggKiA0LjU1KTtcblxuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucGxheWVyU3ByaXRlLCA0OCwgMCwgNDgsIDQ4LCA0OCAqIDcsIDQ4ICogNywgNDgsIDQ4KTtcblxuICAgICAgaWYgKEdsb2JhbC5LRVlTW1wiRW50ZXJcIl0pIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZXF1ZXN0SWQpO1xuICAgICAgICBjb25zdCByZXN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpO1xuICAgICAgICByZXN0YXJ0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICBuZXdHYW1lKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvbXB0KCkge1xuICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgdGhpcy5zdGVwKCk7XG5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVTdGFydDsiLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgeyByb29tQ2hhbmdlIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICBzdXBlcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpO1xuICAgIHRoaXMuc3BlZWQgPSAxLjI1O1xuICAgIHRoaXMubm9ybWFsaXplZFNwZWVkID0gcGFyc2VGbG9hdCh0aGlzLnNwZWVkKSAvIE1hdGguc3FydCgyKTtcbiAgICB0aGlzLnBhY2UgPSAyNC90aGlzLnNwZWVkO1xuICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDE7XG4gICAgdGhpcy5zdGFtaW5hID0gMTAwMDtcbiAgICB0aGlzLmludnVsbmVyYWJsZSA9IDA7XG4gICAgdGhpcy5ocCA9IDIwO1xuICAgIHRoaXMuc3RyaWRlID0ge1xuICAgICAgdXA6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDYsXG4gICAgICB9LFxuICAgICAgZG93bjoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogMCxcbiAgICAgIH0sXG4gICAgICBsZWZ0OiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiAyLFxuICAgICAgfSxcbiAgICAgIHJpZ2h0OiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiA0LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgbmV3Um9vbVBvcyhkaXIpIHtcbiAgICBzd2l0Y2goZGlyKSB7XG4gICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgdGhpcy5wb3NbMV0gPSA3MjAtMjQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgdGhpcy5wb3NbMV0gPSAtMjQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5wb3NbMF0gPSA3MjAtMjQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIHRoaXMucG9zWzBdID0gLTI0O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdHJpZGVQYWxldHRlUG9zKGRpcmVjdGlvbikge1xuICAgIHRoaXMucGFjZSA9IDI0IC8gKHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXIpO1xuICAgIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gMiAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSAzICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDQgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAyO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPiA0ICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA9IDA7XG4gICAgICByZXR1cm4gNDggKiAxO1xuICAgIH1cbiAgfVxuXG4gIHdhbGxDaGVjayh3YWxscykge1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwidG9wXCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnRvcCkge1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy50b3AgLSAzMjtcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwiYm90dG9tXCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmJvdHRvbSkge1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy5ib3R0b20gLSA0ODtcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwibGVmdFwiLCB3YWxsKSkgYnJlYWsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5sZWZ0KSB7XG4gICAgICAgIHRoaXMucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLmxlZnQgLSAxMjtcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwicmlnaHRcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMucmlnaHQpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMucmlnaHQgLSAzNjtcbiAgICAgIH1cblxuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaW52dWxuZXJhYmxlID0gNzU7XG4gIH1cblxuICBtb3ZlKHdhbGxzKSB7XG4gICAgY29uc3QgW1xuICAgICAgdXAsXG4gICAgICBkb3duLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0LFxuICAgICAgc2hpZnRcbiAgICBdID0gW1xuICAgICAgR2xvYmFsLktFWVNbXCJ3XCJdLFxuICAgICAgR2xvYmFsLktFWVNbXCJzXCJdLFxuICAgICAgR2xvYmFsLktFWVNbXCJhXCJdLFxuICAgICAgR2xvYmFsLktFWVNbXCJkXCJdLFxuICAgICAgR2xvYmFsLktFWVNbXCJTaGlmdFwiXSxcbiAgICBdO1xuICAgIGlmIChzaGlmdCAmJiB0aGlzLnN0YW1pbmEgPiAwKSB7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxLjU7XG4gICAgICB0aGlzLnN0YW1pbmEgLT0gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGFtaW5hIDwgMCkgdGhpcy5zdGFtaW5hID0gMDtcbiAgICBpZiAoIXNoaWZ0ICYmIHRoaXMuc3RhbWluYSA8IDEwMDApIHRoaXMuc3RhbWluYSArPSAxO1xuICAgIGlmICh0aGlzLmludnVsbmVyYWJsZSkgdGhpcy5pbnZ1bG5lcmFibGUtLTtcbiAgICBpZiAodGhpcy5pbnZ1bHZlcmFibGUgPCAwKSB0aGlzLmludnVsbmVyYWJsZSA9IDA7XG5cbiAgICB0aGlzLndhbGxDaGVjayh3YWxscyk7XG5cbiAgICAvLyBXIGtleSBtb3ZlbWVudHMgYW5kIHNwcml0ZSBkaXJlY3Rpb25cbiAgICBpZiAodXApIHtcbiAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0ICYmICF0aGlzLmNvbGxpc2lvbnMudG9wKSB7XG4gICAgICAgIHRoaXMucG9zWzFdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zWzFdICs9IC10aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUudXAucGFsWTtcbiAgICAgIGlmICghbGVmdCAmJiAhcmlnaHQpIHtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwidXBcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUyBrZXkgbW92ZW1lbnRzIGFuZCBzcHJpdGUgZGlyZWN0aW9uXG4gICAgaWYgKGRvd24pIHtcbiAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0KSB7XG4gICAgICAgIHRoaXMucG9zWzFdICs9IHRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gKz0gdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmRvd24ucGFsWTtcbiAgICAgIGlmICghbGVmdCAmJiAhcmlnaHQpIHtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwiZG93blwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBIGtleSBtb3ZlbWVudFxuICAgIGlmIChsZWZ0KSB7XG4gICAgICBpZiAodXAgfHwgZG93biAmJiAhdGhpcy5jb2xsaXNpb25zLmxlZnQpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gLXRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gLXRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5sZWZ0LnBhbFk7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIEQga2V5IG1vdmVtZW50XG4gICAgaWYgKHJpZ2h0KSB7XG4gICAgICBpZiAodXAgfHwgZG93bikge1xuICAgICAgICB0aGlzLnBvc1swXSArPSB0aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zWzBdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5yaWdodC5wYWxZO1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwicmlnaHRcIik7XG4gICAgfVxuXG4gICAgLy8gaWYgbm9uZSBvZiB0aGUga2V5cyBhcmUgYmVpbmcgcHJlc3NlZCwgZ28gdG8gZGVmYXVsdCBzdGFuY2VcbiAgICBpZiAoIXVwICYmICFkb3duICYmICFyaWdodCAmJiAhbGVmdCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gNDggKiAxO1xuICAgIH1cblxuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgbGV0IGV4aXREaXI7XG4gICAgaWYgKHggPCAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcImxlZnRcIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9IGVsc2UgaWYgKHggPiA3MjAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcInJpZ2h0XCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfSBlbHNlIGlmICh5IDwgLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJ1cFwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH0gZWxzZSBpZiAoeSA+IDcyMC0yNCkge1xuICAgICAgZXhpdERpciA9IFwiZG93blwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH1cblxuICAgIFxuXG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMuZHJhd09wdGlvbnMueCA9IHRoaXMucG9zWzBdO1xuICAgIHRoaXMuZHJhd09wdGlvbnMueSA9IHRoaXMucG9zWzFdO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IFdhbGwgZnJvbSBcIi4vd2FsbFwiO1xuaW1wb3J0IENvaW4gZnJvbSBcIi4vY29pblwiO1xuaW1wb3J0IEVuZW15IGZyb20gXCIuL2VuZW15XCI7XG5cbmltcG9ydCB7XG4gIHJhbmROdW1QYXRocyxcbiAgYWRkVmFsaWROZWlnaGJvcnMsXG4gIGJ1aWxkUGF0aHMsXG4gIHNodWZmbGUsXG4gIGFzc2lnbkJsb2NrZWRQYXRocyxcbiAgcmFuZE51bUNvaW5zXG59IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuXG5jbGFzcyBSb29tIHtcbiAgY29uc3RydWN0b3IobmVpZ2hib3IpIHtcbiAgICB0aGlzLmdlbmVyYXRlQ29pbnMoKTtcbiAgICB0aGlzLndhbGxzID0gW107XG4gICAgbGV0IHJhbmRJZHg7XG4gICAgdGhpcy5uZWlnaGJvcnMgPSB7XG4gICAgICB1cDogdW5kZWZpbmVkLFxuICAgICAgZG93bjogdW5kZWZpbmVkLFxuICAgICAgbGVmdDogdW5kZWZpbmVkLFxuICAgICAgcmlnaHQ6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGxldCBlbnRyeURpcjtcbiAgICBpZiAobmVpZ2hib3IpIHtcbiAgICAgIGNvbnN0IGV4aXREaXIgPSBPYmplY3Qua2V5cyhuZWlnaGJvcilbMF07XG4gICAgICBjb25zdCBwcmV2Um9vbSA9IE9iamVjdC52YWx1ZXMobmVpZ2hib3IpWzBdO1xuICAgICAgdGhpcy5ub2RlUG9zID0gWy4uLnByZXZSb29tLm5vZGVQb3NdO1xuICAgICAgc3dpdGNoKGV4aXREaXIpIHtcbiAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMuZG93biA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJEXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzFdKys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMudXAgPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiVVwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1sxXS0tO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgIHRoaXMubmVpZ2hib3JzLnJpZ2h0ID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIlJcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMF0tLTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMubGVmdCA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJMXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzBdKys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9kZVBvcyA9IFswLDBdO1xuICAgIH1cbiAgICBcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuXG4gICAgYWRkVmFsaWROZWlnaGJvcnModGhpcyk7XG4gICAgbGV0IHdhbGxzLCBudW1QYXRocywgcmFuZFBhdGhzO1xuICAgIGxldCBuZXdQYXRocyA9IFtdO1xuICAgIGxldCBwYXRocyA9IGJ1aWxkUGF0aHModGhpcyk7XG4gICAgbGV0IHBhdGhzQXJyID0gcGF0aHMuc3BsaXQoXCJcIik7XG4gICAgaWYgKG5laWdoYm9yKSB7XG4gICAgICAvLyBpZiBub3QgaW5pdGlhbCByb29tXG4gICAgICBwYXRoc0FyciA9IHBhdGhzQXJyLmZpbHRlcihwYXRoID0+IHBhdGggIT09IGVudHJ5RGlyKTsgLy8gcmVtb3ZlIGVudHJ5RGlyIGZyb20gcGF0aHNcbiAgICAgIG51bVBhdGhzID0gcmFuZE51bVBhdGhzKHBhdGhzLmxlbmd0aCk7IC8vIHdlaWdodGVkIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLCBwcmVmZXJzIG1vcmUgcGF0aHNcbiAgICAgIGlmIChudW1QYXRocyA9PT0gcGF0aHMubGVuZ3RoKSB7IC8vIGlmIGFsbCA0IHBhdGhzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtwYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBwYXRocyk7XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhwYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9IGVsc2UgeyAvLyBsZXNzIHRoYW4gNCBwYXRocyBhdmFpbGFibGVcbiAgICAgICAgc2h1ZmZsZShwYXRoc0Fycik7IC8vIHJhbmRvbWl6ZSB0aGUgcGF0aCBjaG9pY2VzXG4gICAgICAgIG5ld1BhdGhzLnB1c2goZW50cnlEaXIpOyAvLyBNVVNUIEFMV0FZUyBoYXZlIHRoZSBwYXRoIHlvdSBlbnRlciBmcm9tXG4gICAgICAgIG51bVBhdGhzLS07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGF0aHM7IGkrKykgeyBuZXdQYXRocy5wdXNoKHBhdGhzQXJyLnBvcCgpKSB9XG4gICAgICAgIG5ld1BhdGhzID0gbmV3UGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzKzF9JHtuZXdQYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGlmICghdGhpcy5iYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgYXNzaWduQmxvY2tlZFBhdGhzKHRoaXMsIG5ld1BhdGhzKTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKG5ld1BhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7dGhpcy5ub2RlUG9zfWBdID0gdGhpcztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbnVtUGF0aHMgPSByYW5kTnVtUGF0aHMocGF0aHMubGVuZ3RoKTtcbiAgICAgIGlmIChudW1QYXRocyA9PT0gcGF0aHMubGVuZ3RoKSB7XG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzfSR7cGF0aHN9JHtyYW5kSWR4fWBdO1xuICAgICAgICB3YWxscyA9IHRoaXMuYnVpbGRSb29tV2FsbHMocGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2h1ZmZsZShwYXRoc0Fycik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGF0aHM7IGkrKykgeyBuZXdQYXRocy5wdXNoKHBhdGhzQXJyLnBvcCgpKSB9XG4gICAgICAgIG5ld1BhdGhzID0gbmV3UGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzfSR7bmV3UGF0aHN9JHtyYW5kSWR4fWBdO1xuICAgICAgICBhc3NpZ25CbG9ja2VkUGF0aHModGhpcywgbmV3UGF0aHMpO1xuICAgICAgICB3YWxscyA9IHRoaXMuYnVpbGRSb29tV2FsbHMobmV3UGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmdlbmVyYXRlRW5lbWllcygpO1xuICAgIC8vIHRoaXMuYW5pbWF0ZWRPYmplY3RzID0ge307XG4gICAgLy8gT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKS5mb3JFYWNoKGNvaW4gPT4ge1xuICAgIC8vICAgdGhpcy5hbmltYXRlZE9iamVjdHNbYGNvaW4tJHtjb2luLnBvc31gXSA9IGNvaW47XG4gICAgLy8gfSk7XG5cbiAgfVxuXG4gIGdlbmVyYXRlRW5lbWllcygpIHtcbiAgICBjb25zdCBudW1FbmVtaWVzID0gTWF0aC5mbG9vcihPYmplY3Qua2V5cyhHbG9iYWwuU0VTU0lPTi5yb29tcykubGVuZ3RoLzIpO1xuICAgIHRoaXMuZW5lbWllcyA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtRW5lbWllczsgaSsrKSB7XG4gICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICB3aGlsZSAoeCA+IDMzNiAmJiB4IDwgMzg0KSB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIHdoaWxlICh5ID4gMzM2ICYmIHkgPCAzODQpIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgbGV0IHBvcyA9IFt4LHldO1xuICAgICAgY29uc3QgZW5lbXkgPSBuZXcgRW5lbXkocG9zLCA0OCw0OCxHbG9iYWwuU1BSSVRFUy5tb25zdGVycywgXCJibG9iXCIsIDIwMCArIChudW1FbmVtaWVzICogNTApKTtcbiAgICAgIHRoaXMuZW5lbWllc1tgJHtlbmVteS5wb3N9YF0gPSBlbmVteTtcbiAgICB9XG4gIH07XG5cbiAgZ2VuZXJhdGVDb2lucygpIHtcbiAgICBjb25zdCBudW1Db2lucyA9IHJhbmROdW1Db2lucygpO1xuICAgIHRoaXMuY29pbnMgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvaW5zOyBpKyspIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIHdoaWxlICh4ID4gMzM2ICYmIHggPCAzODQpIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgd2hpbGUgKHkgPiAzMzYgJiYgeSA8IDM4NCkgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICBsZXQgcG9zID0gW3gseV07XG4gICAgICBjb25zdCBjb2luID0gbmV3IENvaW4ocG9zLCAxNiwxNixHbG9iYWwuU1BSSVRFUy5jb2luKTtcbiAgICAgIHRoaXMuY29pbnNbYCR7Y29pbi5wb3N9YF0gPSBjb2luO1xuICAgIH1cbiAgfTtcblxuICBhbmltYXRlKCkge1xuICAgIHRoaXMuY29sbGVjdCgpO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5jb2lucykuZm9yRWFjaChjb2luID0+IHtcbiAgICAgIGNvaW4uYW5pbWF0ZSgpO1xuICAgIH0pO1xuICAgIC8vIE9iamVjdC52YWx1ZXModGhpcy5hbmltYXRlZE9iamVjdHMpLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5hbmltYXRlKCkpO1xuXG4gIH1cblxuICBjb2xsZWN0KCkge1xuICAgIGZvciAobGV0IGNvaW4gb2YgT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKSkge1xuICAgICAgaWYgKGNvaW4uY29sbGVjdCgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvaW5zW2Ake2NvaW4ucG9zfWBdO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5jb2luQ291bnQrKztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZCwgMCwgMCk7XG4gICAgLy8gdGhpcy53YWxscy5mb3JFYWNoKHdhbGwgPT4gd2FsbC5kcmF3KGN0eCkpO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5jb2lucykuZm9yRWFjaChjb2luID0+IGNvaW4uZHJhdyhjdHgpKTtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuZW5lbWllcykuZm9yRWFjaChlbmVteSA9PiBlbmVteS5kcmF3KGN0eCkpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZhZjRcIjtcbiAgICBjdHguZm9udCA9IFwiMjBweCBhcmlhbFwiO1xuICAgIGN0eC5maWxsVGV4dChgUm9vbSBbICR7dGhpcy5ub2RlUG9zfSBdYCwgMTUsIDMwKTtcbiAgICBjdHguZmlsbFRleHQoYENvaW5zIHggJHtHbG9iYWwuU0VTU0lPTi5jb2luQ291bnR9YCwgNTkwLCAzMCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZiYjAwXCI7XG4gICAgY3R4Lm1vdmVUbygxNSwgNzA1KTtcbiAgICBjdHgubGluZVdpZHRoID0gNTtcbiAgICBjdHgubGluZVRvKDE1ICsgKEdsb2JhbC5TRVNTSU9OLnBsYXllci5zdGFtaW5hLzEwMDApICogMTAwLCA3MDUpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMzM2ZmMDBcIjtcbiAgICBjdHgubW92ZVRvKDE1LCA2OTApO1xuICAgIGN0eC5saW5lV2lkdGggPSAxMDtcbiAgICBjdHgubGluZVRvKDE1ICsgKEdsb2JhbC5TRVNTSU9OLnBsYXllci5ocC8yMCkgKiAxMDAsIDY5MCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmMDAwMFwiO1xuICAgIGN0eC5tb3ZlVG8oMTE1IC0gKDEgLSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuaHAvMjApICogMTAwLCA2OTApO1xuICAgIGN0eC5saW5lV2lkdGggPSAxMDtcbiAgICBjdHgubGluZVRvKDExNSwgNjkwKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDBkZGRkXCI7XG4gICAgY3R4Lm1vdmVUbygxNSwgNjk5KTtcbiAgICBjdHgubGluZVdpZHRoID0gNTtcbiAgICBjdHgubGluZVRvKDE1ICsgKEdsb2JhbC5TRVNTSU9OLnBsYXllci5pbnZ1bG5lcmFibGUvNzUpICogMTAwLCA2OTkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyBjdHguZmlsbFRleHQoYFN0YW1pbmEgPSAke0dsb2JhbC5TRVNTSU9OLnBsYXllci5zdGFtaW5hfWAsIDE1LCA0MDApO1xuICB9XG5cbiAgYnVpbGRSb29tV2FsbHMocGF0aHMpIHtcbiAgICBsZXQgd2FsbHMgPSBbXTtcbiAgICBzd2l0Y2gocGF0aHMpIHtcbiAgICAgIGNhc2UgXCJETFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxSVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRSVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRExSXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRExcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgIH1cbiAgfVxuXG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBSb29tOyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4uL3Jvb21cIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9nYW1lXCI7XG5cblxuZXhwb3J0IGNvbnN0IG5ld0dhbWUgPSAoKSA9PiB7XG4gIGlmIChHbG9iYWwuU0VTU0lPTi5nYW1lKSB7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5yZXF1ZXN0U3RvcCA9IHRydWU7XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wiZ2FtZVwiXTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT05bXCJwbGF5ZXJcIl07XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wiY29pbkNvdW50XCJdO1xuICAgIGRlbGV0ZSBHbG9iYWwuU0VTU0lPTltcInJvb21zXCJdO1xuICB9XG4gIG5ldyBHYW1lKC4uLk9iamVjdC52YWx1ZXMoR2xvYmFsLkdBTUVfT1BUSU9OUykpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbGxpZGVkV2l0aFNpZGUgPSAoc2lkZSwgdGhpc1NpZGUsIG90aGVyU2lkZSkgPT4ge1xuICBsZXQgY29sbGlkZWQgPSBmYWxzZTtcbiAgbGV0IHVwcGVyRGlmZiwgbG93ZXJEaWZmO1xuICBjb25zdCB1cHBlckJvdW5kcyA9IDEwO1xuICBjb25zdCBsb3dlckJvdW5kcyA9IDA7XG4gIGlmIChzaWRlID09PSBcInRvcFwiIHx8IHNpZGUgPT09IFwiYm90dG9tXCIpIHtcbiAgICBjb25zdCB0aGlzWVZhbCA9IHRoaXNTaWRlWzFdO1xuICAgIGNvbnN0IFt0aGlzWE1pbiwgdGhpc1hNYXhdID0gdGhpc1NpZGVbMF07XG4gICAgY29uc3Qgb3RoZXJZVmFsID0gb3RoZXJTaWRlWzFdO1xuICAgIGNvbnN0IFtvdGhlclhNaW4sIG90aGVyWE1heF0gPSBvdGhlclNpZGVbMF07XG4gICAgXG4gICAgc3dpdGNoIChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIHVwcGVyRGlmZiA9IChvdGhlcllWYWwgLSB0aGlzWVZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKG90aGVyWVZhbCAtIHRoaXNZVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWVZhbCA8IG90aGVyWVZhbCkgJiZcbiAgICAgICAgICAodGhpc1hNaW4gPCBvdGhlclhNYXgpICYmXG4gICAgICAgICAgKHRoaXNYTWF4ID4gb3RoZXJYTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICB1cHBlckRpZmYgPSAodGhpc1lWYWwgLSBvdGhlcllWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9ICh0aGlzWVZhbCAtIG90aGVyWVZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1lWYWwgPiBvdGhlcllWYWwpICYmXG4gICAgICAgICAgKHRoaXNYTWluIDwgb3RoZXJYTWF4KSAmJlxuICAgICAgICAgICh0aGlzWE1heCA+IG90aGVyWE1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2xsaWRlZCkgcmV0dXJuIG90aGVyWVZhbDtcblxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHRoaXNYVmFsID0gdGhpc1NpZGVbMF07XG4gICAgY29uc3QgW3RoaXNZTWluLCB0aGlzWU1heF0gPSB0aGlzU2lkZVsxXTtcbiAgICBjb25zdCBvdGhlclhWYWwgPSBvdGhlclNpZGVbMF07XG4gICAgY29uc3QgW290aGVyWU1pbiwgb3RoZXJZTWF4XSA9IG90aGVyU2lkZVsxXTtcbiAgICBcbiAgICBzd2l0Y2ggKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHVwcGVyRGlmZiA9IChvdGhlclhWYWwgLSB0aGlzWFZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKG90aGVyWFZhbCAtIHRoaXNYVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWFZhbCA8IG90aGVyWFZhbCkgJiZcbiAgICAgICAgICAodGhpc1lNaW4gPCBvdGhlcllNYXgpICYmXG4gICAgICAgICAgKHRoaXNZTWF4ID4gb3RoZXJZTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKHRoaXNYVmFsIC0gb3RoZXJYVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAodGhpc1hWYWwgLSBvdGhlclhWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNYVmFsID4gb3RoZXJYVmFsKSAmJlxuICAgICAgICAgICh0aGlzWU1pbiA8IG90aGVyWU1heCkgJiZcbiAgICAgICAgICAodGhpc1lNYXggPiBvdGhlcllNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2xsaWRlZCkgcmV0dXJuIG90aGVyWFZhbDtcbiAgICBcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcblxufTtcblxuZXhwb3J0IGNvbnN0IHJvb21DaGFuZ2UgPSAoZXhpdERpciwgY3VyclJvb20pID0+IHtcbiAgbGV0IG5leHROb2RlUG9zID0gWy4uLmN1cnJSb29tLm5vZGVQb3NdO1xuICBzd2l0Y2goZXhpdERpcikge1xuICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMV0gKz0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICBuZXh0Tm9kZVBvc1sxXSAtPSAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIG5leHROb2RlUG9zWzBdIC09IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgIG5leHROb2RlUG9zWzBdICs9IDE7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7bmV4dE5vZGVQb3N9YF0pIHtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20gPSBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHtuZXh0Tm9kZVBvc31gXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBuZWlnaGJvciA9IHsgW2V4aXREaXJdOiBjdXJyUm9vbSB9O1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSA9IG5ldyBSb29tKG5laWdoYm9yKTtcbiAgICBhZGRWYWxpZE5laWdoYm9ycyhjdXJyUm9vbSk7XG4gICAgYWRkVmFsaWROZWlnaGJvcnMoR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJhbmROdW1QYXRocyA9IG1heCA9PiB7XG4gIGxldCBwYXRocyA9IFtdO1xuICBpZiAobWF4ID4gMykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVs0XTsgaSsrKSB7IHBhdGhzLnB1c2goNCkgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVszXTsgaSsrKSB7IHBhdGhzLnB1c2goMykgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsyXTsgaSsrKSB7IHBhdGhzLnB1c2goMikgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsxXTsgaSsrKSB7IHBhdGhzLnB1c2goMSkgfVxuICB9IGVsc2UgaWYgKG1heCA+IDIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bM107IGkrKykgeyBwYXRocy5wdXNoKDMpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMl07IGkrKykgeyBwYXRocy5wdXNoKDIpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMV07IGkrKykgeyBwYXRocy5wdXNoKDEpIH1cbiAgfSBlbHNlIGlmIChtYXggPiAxKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzJdOyBpKyspIHsgcGF0aHMucHVzaCgyKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzFdOyBpKyspIHsgcGF0aHMucHVzaCgxKSB9XG4gIH0gZWxzZSB7XG4gICAgcGF0aHMucHVzaCgxKTtcbiAgfVxuXG4gIHNodWZmbGUocGF0aHMpO1xuXG4gIHJldHVybiBwYXRoc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcGF0aHMubGVuZ3RoKV07XG4gIFxufTtcblxuZXhwb3J0IGNvbnN0IGFkZFZhbGlkTmVpZ2hib3JzID0gcm9vbSA9PiB7XG4gIGxldCB1cCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICB1cFsxXSArPSAxO1xuICB1cCA9IHVwLnRvU3RyaW5nKCk7XG4gIGxldCBkb3duID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGRvd25bMV0gLT0gMTtcbiAgZG93biA9IGRvd24udG9TdHJpbmcoKTtcbiAgbGV0IGxlZnQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgbGVmdFswXSAtPSAxO1xuICBsZWZ0ID0gbGVmdC50b1N0cmluZygpO1xuICBsZXQgcmlnaHQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgcmlnaHRbMF0gKz0gMTtcbiAgcmlnaHQgPSByaWdodC50b1N0cmluZygpO1xuICBpZiAoXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdICYmIFxuICAgIChHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0ubmVpZ2hib3JzLmRvd24gIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMudXBcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMudXAgPSBHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF07XG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdLm5laWdoYm9ycy5kb3duID0gcm9vbTtcbiAgfVxuICBpZiAoXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl0gJiYgXG4gICAgKEdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dLm5laWdoYm9ycy51cCAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy5kb3duXG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLmRvd24gPSBHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXTtcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXS5uZWlnaGJvcnMudXAgPSByb29tO1xuICB9XG4gIGlmIChcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XSAmJiBcbiAgICAoR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF0ubmVpZ2hib3JzLnJpZ2h0ICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLmxlZnRcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMubGVmdCA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdO1xuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdLm5laWdoYm9ycy5yaWdodCA9IHJvb207XG4gIH1cbiAgaWYgKFxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XSAmJiBcbiAgICAoR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdLm5laWdoYm9ycy5sZWZ0ICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLnJpZ2h0XG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLnJpZ2h0ID0gR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdO1xuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XS5uZWlnaGJvcnMubGVmdCA9IHJvb207XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZFBhdGhzID0gcm9vbSA9PiB7XG4gIGxldCBwYXRocyA9IFtdO1xuICBsZXQgdXAgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgdXBbMV0gKz0gMTtcbiAgdXAgPSB1cC50b1N0cmluZygpO1xuICBsZXQgZG93biA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBkb3duWzFdIC09IDE7XG4gIGRvd24gPSBkb3duLnRvU3RyaW5nKCk7XG4gIGxldCBsZWZ0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGxlZnRbMF0gLT0gMTtcbiAgbGVmdCA9IGxlZnQudG9TdHJpbmcoKTtcbiAgbGV0IHJpZ2h0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHJpZ2h0WzBdICs9IDE7XG4gIHJpZ2h0ID0gcmlnaHQudG9TdHJpbmcoKTtcbiAgaWYgKCFHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0gfHwgKEdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXS5uZWlnaGJvcnMuZG93biAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIlVcIik7XG4gIH1cbiAgaWYgKCFHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXSB8fCAoR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl0ubmVpZ2hib3JzLnVwICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiRFwiKTtcbiAgfVxuICBpZiAoIUdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdIHx8IChHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XS5uZWlnaGJvcnMucmlnaHQgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJMXCIpO1xuICB9XG4gIGlmICghR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdIHx8IChHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF0ubmVpZ2hib3JzLmxlZnQgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJSXCIpO1xuICB9XG4gIHJldHVybiBwYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25CbG9ja2VkUGF0aHMgPSAocm9vbSwgcGF0aHMpID0+IHtcbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIlVcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy51cCA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJEXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMuZG93biA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJMXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMubGVmdCA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJSXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMucmlnaHQgPSBcIlhcIjtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJhbmROdW1Db2lucyA9ICgpID0+IHtcbiAgbGV0IHdlaWdodGVkTnVtQ29pbnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzNdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDMpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzJdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDIpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzFdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDEpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzBdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDApIH1cbiAgY29uc3QgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdlaWdodGVkTnVtQ29pbnMubGVuZ3RoKTtcbiAgc2h1ZmZsZSh3ZWlnaHRlZE51bUNvaW5zKTtcbiAgcmV0dXJuIHdlaWdodGVkTnVtQ29pbnNbcmFuZElkeF07XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZENvaW5Tb3VuZCA9ICgpID0+IHtcbiAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvaW4ke2l9YCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2h1ZmZsZSA9IGFyciA9PiB7XG4gIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgW2FycltpXSwgYXJyW2pdXSA9IFthcnJbal0sIGFycltpXV07XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVkTW92ZW1lbnQgPSAobXlzZWxmLCBlbnRpdHksIGNoYXNpbmdQbGF5ZXIpID0+IHsgXG4gIGNvbnN0IG14ID0gbXlzZWxmLmNlbnRlclswXTtcbiAgY29uc3QgbXkgPSBteXNlbGYuY2VudGVyWzFdO1xuICBjb25zdCBleCA9IGVudGl0eS5jZW50ZXJbMF07XG4gIGNvbnN0IGV5ID0gZW50aXR5LmNlbnRlclsxXTtcbiAgbGV0IGR4ID0gbXggLSBleDtcbiAgbGV0IGR5ID0gbXkgLSBleTtcbiAgXG4gIGlmICghY2hhc2luZ1BsYXllcikge1xuICAgIGNvbnN0IHJhbmRBbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAyICogTWF0aC5QSTtcbiAgICBkeCA9IE1hdGguY29zKHJhbmRBbmdsZSkgKiBteXNlbGYuc3BlZWQ7XG4gICAgZHkgPSBNYXRoLnNpbihyYW5kQW5nbGUpICogbXlzZWxmLnNwZWVkO1xuICB9XG4gIFxuICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbihkeS9keCk7XG4gIGNvbnN0IG55ID0gTWF0aC5zaW4oYW5nbGUpICogbXlzZWxmLnNwZWVkO1xuICBjb25zdCBueCA9IE1hdGguY29zKGFuZ2xlKSAqIG15c2VsZi5zcGVlZDtcblxuICByZXR1cm4ge1xuICAgIGR4LFxuICAgIGR5LFxuICAgIG54LFxuICAgIG55LFxuICAgIHVwOiAoZHkgPiAwKSAmJiAoTWF0aC5hYnMoZHkpID4gTWF0aC5hYnMoZHgpKSxcbiAgICBkb3duOiAoZHkgPCAwKSAmJiAoTWF0aC5hYnMoZHkpID4gTWF0aC5hYnMoZHgpKSxcbiAgICBsZWZ0OiAoZHggPiAwKSAmJiAoTWF0aC5hYnMoZHgpID4gTWF0aC5hYnMoZHkpKSxcbiAgICByaWdodDogKGR4IDwgMCkgJiYgKE1hdGguYWJzKGR4KSA+IE1hdGguYWJzKGR5KSksXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZGlzdGFuY2VUb1BsYXllciA9IChteXNlbGYsIHBsYXllcikgPT4ge1xuICBjb25zdCBteCA9IG15c2VsZi5jZW50ZXJbMF07XG4gIGNvbnN0IG15ID0gbXlzZWxmLmNlbnRlclsxXTtcbiAgY29uc3QgcHggPSBwbGF5ZXIuY2VudGVyWzBdO1xuICBjb25zdCBweSA9IHBsYXllci5jZW50ZXJbMV07XG4gIGxldCBkeCA9IHB4IC0gbXg7XG4gIGxldCBkeSA9IHB5IC0gbXk7XG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coZHgsIDIpICsgTWF0aC5wb3coZHksIDIpKTtcbn07IiwiZXhwb3J0IGNvbnN0IFdJRFRIID0gNzIwO1xuZXhwb3J0IGNvbnN0IEhFSUdIVCA9IDcyMDtcbmV4cG9ydCBjb25zdCBTUFJJVEVfRElNUyA9IFs0OCw0OF07XG5leHBvcnQgY29uc3QgRlBTID0gMTAwMC82MDtcbmV4cG9ydCBjb25zdCBLRVlTID0ge1xuICA4NzogZmFsc2UsIC8vIFdcbiAgNjU6IGZhbHNlLCAvLyBBXG4gIDgzOiBmYWxzZSwgLy8gU1xuICA2ODogZmFsc2UsIC8vIERcbiAgMTY6IGZhbHNlLCAvLyBMLVNoaWZ0XG59O1xuZXhwb3J0IGNvbnN0IEZPTlQgPSB7fTtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT04gPSB7fTtcbmV4cG9ydCBjb25zdCBTUFJJVEVTID0ge307XG5leHBvcnQgY29uc3QgQkdfSU1HUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgQ09JTl9XRUlHSFRTID0ge1xuICAzOiAyLFxuICAyOiA4LFxuICAxOiAzMCxcbiAgMDogNzUsIFxufTtcblxuZXhwb3J0IGNvbnN0IEFMTF9QQVRIUyA9IFtcbiAgXCJETFJVXCIsXG4gIFwiRExSXCIsXG4gIFwiRExVXCIsXG4gIFwiTFJVXCIsXG4gIFwiRFJVXCIsXG4gIFwiRExcIixcbiAgXCJEUlwiLFxuICBcIkRVXCIsXG4gIFwiTFJcIixcbiAgXCJMVVwiLFxuICBcIlJVXCIsXG4gIFwiRFwiLFxuICBcIkxcIixcbiAgXCJSXCIsXG4gIFwiVVwiLFxuXTtcblxuZXhwb3J0IGNvbnN0IFdFSUdIVFMgPSB7XG4gIDQ6IHtcbiAgICA0OiA1NSxcbiAgICAzOiA0NSxcbiAgICAyOiA5LFxuICAgIDE6IDEsXG4gIH0sXG4gIDM6IHtcbiAgICAzOiA4MCxcbiAgICAyOiAyMCxcbiAgICAxOiAzLFxuICB9LFxuICAyOiB7XG4gICAgMjogOTAsXG4gICAgMTogMTAsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgR0FNRV9PUFRJT05TID0ge307XG5leHBvcnQgY29uc3QgUkVRVUVTVCA9IHt9OyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2dhbWVcIjtcbmltcG9ydCB7IG5ld0dhbWUgfSBmcm9tIFwiLi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoS0VZUykgPT4ge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcbiAgICBkZWJ1Z2dlclxuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcIndcIiAmJiAhS0VZU1tcIndcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImFcIiAmJiAhS0VZU1tcImFcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcInNcIiAmJiAhS0VZU1tcInNcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImRcIiAmJiAhS0VZU1tcImRcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleSA9PT0gXCJTaGlmdFwiICYmICFLRVlTW1wiU2hpZnRcIl0pIEtFWVNbZS5rZXldID0gdHJ1ZTtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiAhS0VZU1tcIkVudGVyXCJdKSBLRVlTW2Uua2V5XSA9IHRydWU7XG5cbiAgfSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJ3XCIgJiYgS0VZU1tcIndcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJhXCIgJiYgS0VZU1tcImFcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJzXCIgJiYgS0VZU1tcInNcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJkXCIgJiYgS0VZU1tcImRcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIiAmJiBLRVlTW1wiU2hpZnRcIl0pIEtFWVNbZS5rZXldID0gZmFsc2U7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgJiYgS0VZU1tcIkVudGVyXCJdKSBLRVlTW2Uua2V5XSA9IGZhbHNlO1xuICB9KTtcblxuICBjb25zdCBob3dUbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpO1xuICBcbiAgaG93VG8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tcG9pbnRlclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvLXNvdW5kXCIpLnBsYXkoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10b1wiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG93LXRvID4gdWxcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIGhvd1RvLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tcG9pbnRlclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG93LXRvID4gdWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKTtcbiAgcmVzdGFydC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnQtc291bmRcIikucGxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1wb2ludGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1wb2ludGVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbmV3R2FtZSgpO1xuICB9KTtcblxufVxuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3RoaXMud2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt0aGlzLndpZHRoLHkrdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K3RoaXMuaGVpZ2h0XTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiN0cmFuc3BhcmVudFwiO1xuICAgIGN0eC5maWxsUmVjdCguLi50aGlzLnBvcywgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBpbnN0YWxsTGlzdGVuZXJzIGZyb20gXCIuL3NjcmlwdHMvdXRpbHMvaW5zdGFsbF9saXN0ZW5lcnNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgR2FtZVN0YXJ0IGZyb20gXCIuL3NjcmlwdHMvZ2FtZV9zdGFydFwiO1xuXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKTtcbiAgY2FudmFzLndpZHRoID0gR2xvYmFsLldJRFRIO1xuICBjYW52YXMuaGVpZ2h0ID0gR2xvYmFsLkhFSUdIVDtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBpbnN0YWxsTGlzdGVuZXJzKEdsb2JhbC5LRVlTKTtcblxuICAvLyBsZXQgZm9udCA9IG5ldyBGb250RmFjZShcIlByZXNzIFN0YXJ0IDJQXCIsICd1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QcmVzcytTdGFydCsyUCZkaXNwbGF5PXN3YXApJyk7XG4gIC8vIGZvbnQubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAvLyAgIEdsb2JhbC5GT05UID0gZm9udDtcbiAgLy8gfSk7XG5cbiAgLy8gY29uc3QgZm9udCA9IG5ldyBGb250RmFjZShcIlByZXNzIFN0YXJ0IDJQXCIsICd1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QcmVzcytTdGFydCsyUCZkaXNwbGF5PXN3YXApJyk7XG4gIC8vIGZvbnQubG9hZCgpLnRoZW4oR2xvYmFsLkZPTlRbXCJmb250XCJdID0gZm9udCk7XG5cbiAgbGV0IGNvaW5TcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbiAgY29pblNwcml0ZS5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL2NvaW4vY29pbi5wbmdcIjtcbiAgY29pblNwcml0ZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgR2xvYmFsLlNQUklURVMuY29pbiA9IGNvaW5TcHJpdGU7XG4gIH07XG5cbiAgbGV0IG1vbnN0ZXJzU3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICBtb25zdGVyc1Nwcml0ZXMuc3JjID0gXCIuL2Rpc3QvYXNzZXRzL2ltYWdlcy9lbmVtaWVzL21vbnN0ZXJzLnBuZ1wiO1xuICBtb25zdGVyc1Nwcml0ZXMub25sb2FkID0gKCkgPT4ge1xuICAgIEdsb2JhbC5TUFJJVEVTLm1vbnN0ZXJzID0gbW9uc3RlcnNTcHJpdGVzO1xuICB9O1xuICBcbiAgZm9yIChsZXQgcGF0aCBvZiBHbG9iYWwuQUxMX1BBVEhTKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCJcIikuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGJhY2tncm91bmQuc3JjID0gYC4vZGlzdC9hc3NldHMvaW1hZ2VzL21hcF9pbWdzLyR7cGF0aC5sZW5ndGh9LyR7cGF0aH0vbWFwJHtpfS5wbmdgO1xuICAgICAgXG4gICAgICBiYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgR2xvYmFsLkJHX0lNR1NbYCR7cGF0aC5sZW5ndGh9JHtwYXRofSR7aX1gXSA9IGJhY2tncm91bmQ7XG4gICAgICAgIC8vIEdsb2JhbC5HQl9JTUdTW1wiNERMUlUwXCJdID0gYmFja2dyb3VuZFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBsZXQgcGxheWVyU3ByaXRlID0gbmV3IEltYWdlKCk7XG4gIHBsYXllclNwcml0ZS5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL3JvZ3VlL3JvZ3VlX3dhbGsucG5nXCI7XG4gIFxuICBwbGF5ZXJTcHJpdGUub25sb2FkID0gKCkgPT4ge1xuICAgIGxldCBnYW1lU3RhcnQgPSBuZXcgR2FtZVN0YXJ0KGN0eCwgcGxheWVyU3ByaXRlKTtcbiAgICBHbG9iYWwuR0FNRV9PUFRJT05TW1wiY3R4XCJdID0gY3R4O1xuICAgIEdsb2JhbC5HQU1FX09QVElPTlNbXCJwbGF5ZXJTcHJpdGVcIl0gPSBwbGF5ZXJTcHJpdGU7XG4gICAgZ2FtZVN0YXJ0LnByb21wdCgpO1xuICAgIFxuICB9XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=