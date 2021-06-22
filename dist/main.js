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
      ctx.lineWidth = 2;
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
        var x = Math.floor(Math.random() * 550) + 64;
        var y = Math.floor(Math.random() * 550) + 64;
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
  0: 50
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9jb2luLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2NvbGxpc2lvbl9ib3guanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW50aXR5LmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZ2FtZV9zdGFydC5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvcm9vbS5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9mdW5jX3V0aWxzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2luc3RhbGxfbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3dhbGwuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzPzg1NTkiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkVudGl0eSIsInBvcyIsIndpZHRoIiwiaGVpZ2h0Iiwic3ByaXRlUGFsZXR0ZSIsImNvbEJveFdpZHRoIiwiY29sQm94SGVpZ2h0IiwiZHJhd09wdGlvbnMiLCJpbWFnZSIsInBhbFgiLCJwYWxZIiwiX3NXaWR0aCIsIl9zSGVpZ2h0IiwieCIsInkiLCJfZFdpZHRoIiwiX2RIZWlnaHQiLCJjb2xCb3giLCJDb2xCb3giLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJjb2xsaXNpb25zIiwiY3giLCJjeSIsInVwZGF0ZVNpZGVzIiwic2lkZSIsIm90aGVyT2JqZWN0Iiwib3RoZXJTaWRlIiwiY29sbGlkZWRXaXRoU2lkZSIsImN0eCIsImRyYXdJbWFnZSIsIk9iamVjdCIsInZhbHVlcyIsImNlbnRlck9uRW50aXR5IiwiZHJhdyIsIkNvaW4iLCJmcmFtZUludGVydmFsIiwiZnJhbWVDb3VudCIsImNvbGxpZGVkT25TaWRlIiwiR2xvYmFsIiwicmFuZENvaW5Tb3VuZCIsInBsYXkiLCJpIiwiYyIsInciLCJlbnRpdHkiLCJvcmlnaW5Qb3MiLCJ0b3BMZWZ0IiwidG9wUmlnaHQiLCJib3R0b21SaWdodCIsImJvdHRvbUxlZnQiLCJjZW50ZXIiLCJzaWRlcyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwic3Ryb2tlUmVjdCIsImV4IiwiZXkiLCJldyIsImVoIiwidHciLCJ0aCIsImNvbEJveEhvb2siLCJFbmVteSIsInR5cGUiLCJkZXRlY3REaXN0Iiwic3BlZWQiLCJzcGVlZE1vZGlmaWVyIiwicGFjZSIsImNoYXNpbmdQbGF5ZXIiLCJpZGxlQ291bnQiLCJpZGxlTWF4IiwibW92ZW1lbnQiLCJ1cCIsImRvd24iLCJwYWxYT2Zmc2V0Iiwic3RyaWRlIiwic3RlcENvdW50IiwiZGlyZWN0aW9uIiwibXgiLCJteSIsImR4IiwiZHkiLCJkaXN0IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJyYW5kQW5nbGUiLCJyYW5kb20iLCJQSSIsImNvcyIsInNpbiIsImFuZ2xlIiwiYXRhbiIsIm55IiwibngiLCJhYnMiLCJzcHJpdGVEaXIiLCJmbG9vciIsIndhbGxzIiwicGxheWVyIiwiZGlzdFRvUGxheWVyIiwid2FsbENoZWNrIiwiaHAiLCJkYW1hZ2UiLCJoaXQiLCJ3YWxsIiwibmV3VmVjdG9ycyIsIm5vcm1hbGl6ZWRWZWN0b3JQb3MiLCJzdHJpZGVQYWxldHRlUG9zIiwiaGl0UGxheWVyIiwiR2FtZSIsInBsYXllclNwcml0ZSIsImZwc0ludGVydmFsIiwidG9QbGF5ZXIiLCJzdGFydGluZ1BvcyIsIlBsYXllciIsInN0YXJ0aW5nUm9vbSIsIlJvb20iLCJyb29tIiwiZ2FtZVN0ZXAiLCJiaW5kIiwic3RvcCIsIndpbiIsImxvc2UiLCJnYW1lT3ZlciIsInJlcXVlc3RTdG9wIiwicmVxdWVzdElkIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibm93IiwiRGF0ZSIsImVsYXBzZWQiLCJ0aGVuIiwiY2xlYXJSZWN0IiwibW92ZSIsImVuZW1pZXMiLCJmb3JFYWNoIiwiZW5lbXkiLCJhbmltYXRlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJmb250RmFtaWx5IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJHYW1lU3RhcnQiLCJ0aGV0YSIsInN0ZXAiLCJyZWQiLCJncmVlbiIsImJsdWUiLCJjb2xvciIsInJlc3RhcnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlQXR0cmlidXRlIiwibmV3R2FtZSIsIm5vcm1hbGl6ZWRTcGVlZCIsInBhcnNlRmxvYXQiLCJzdGFtaW5hIiwiaW52dWxuZXJhYmxlIiwiZGlyIiwic2hpZnQiLCJpbnZ1bHZlcmFibGUiLCJleGl0RGlyIiwibmV3Um9vbVBvcyIsInJvb21DaGFuZ2UiLCJuZWlnaGJvciIsImdlbmVyYXRlQ29pbnMiLCJyYW5kSWR4IiwibmVpZ2hib3JzIiwidW5kZWZpbmVkIiwiZW50cnlEaXIiLCJrZXlzIiwicHJldlJvb20iLCJub2RlUG9zIiwiYWRkVmFsaWROZWlnaGJvcnMiLCJudW1QYXRocyIsInJhbmRQYXRocyIsIm5ld1BhdGhzIiwicGF0aHMiLCJidWlsZFBhdGhzIiwicGF0aHNBcnIiLCJzcGxpdCIsImZpbHRlciIsInBhdGgiLCJyYW5kTnVtUGF0aHMiLCJsZW5ndGgiLCJiYWNrZ3JvdW5kIiwiYXNzaWduQmxvY2tlZFBhdGhzIiwiYnVpbGRSb29tV2FsbHMiLCJwdXNoIiwic2h1ZmZsZSIsInBvcCIsInNvcnQiLCJqb2luIiwiZ2VuZXJhdGVFbmVtaWVzIiwibnVtRW5lbWllcyIsIm51bUNvaW5zIiwicmFuZE51bUNvaW5zIiwiY29pbnMiLCJjb2luIiwiY29sbGVjdCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsIldhbGwiLCJ0aGlzU2lkZSIsImNvbGxpZGVkIiwidXBwZXJEaWZmIiwibG93ZXJEaWZmIiwidXBwZXJCb3VuZHMiLCJsb3dlckJvdW5kcyIsInRoaXNZVmFsIiwidGhpc1hNaW4iLCJ0aGlzWE1heCIsIm90aGVyWVZhbCIsIm90aGVyWE1pbiIsIm90aGVyWE1heCIsInRoaXNYVmFsIiwidGhpc1lNaW4iLCJ0aGlzWU1heCIsIm90aGVyWFZhbCIsIm90aGVyWU1pbiIsIm90aGVyWU1heCIsImN1cnJSb29tIiwibmV4dE5vZGVQb3MiLCJtYXgiLCJ0b1N0cmluZyIsImluY2x1ZGVzIiwid2VpZ2h0ZWROdW1Db2lucyIsImFyciIsImoiLCJub3JtYWxpemVkTW92ZW1lbnQiLCJteXNlbGYiLCJkaXN0YW5jZVRvUGxheWVyIiwicHgiLCJweSIsIldJRFRIIiwiSEVJR0hUIiwiU1BSSVRFX0RJTVMiLCJGUFMiLCJLRVlTIiwiRk9OVCIsIlNFU1NJT04iLCJTUFJJVEVTIiwiQkdfSU1HUyIsIkNPSU5fV0VJR0hUUyIsIkFMTF9QQVRIUyIsIldFSUdIVFMiLCJHQU1FX09QVElPTlMiLCJSRVFVRVNUIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXkiLCJ0b0xvd2VyQ2FzZSIsImhvd1RvIiwiY2xhc3NMaXN0IiwiYWRkIiwicXVlcnlTZWxlY3RvciIsInJlbW92ZSIsInByZXZlbnREZWZhdWx0IiwiY2FudmFzIiwiZ2V0Q29udGV4dCIsImluc3RhbGxMaXN0ZW5lcnMiLCJjb2luU3ByaXRlIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJtb25zdGVyc1Nwcml0ZXMiLCJnYW1lU3RhcnQiLCJwcm9tcHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7Q0FFQTs7SUFFTUEsTTtBQUNKLGtCQUFZQyxHQUFaLEVBQWdCQyxLQUFoQixFQUFzQkMsTUFBdEIsRUFBNkJDLGFBQTdCLEVBQTRDO0FBQUE7O0FBQzFDLFNBQUtILEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFFBQU1FLFdBQVcsR0FBR0gsS0FBcEI7QUFDQSxRQUFNSSxZQUFZLEdBQUdILE1BQXJCO0FBRUEsU0FBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CO0FBQ2pCQyxXQUFLLEVBQUVKLGFBRFU7QUFFakJLLFVBQUksRUFBRSxDQUZXO0FBR2pCQyxVQUFJLEVBQUUsQ0FIVztBQUlqQkMsYUFBTyxFQUFFVCxLQUpRO0FBS2pCVSxjQUFRLEVBQUVULE1BTE87QUFNakJVLE9BQUMsRUFBRVosR0FBRyxDQUFDLENBQUQsQ0FOVztBQU9qQmEsT0FBQyxFQUFFYixHQUFHLENBQUMsQ0FBRCxDQVBXO0FBUWpCYyxhQUFPLEVBQUViLEtBUlE7QUFTakJjLGNBQVEsRUFBRWI7QUFUTyxLQUFuQjtBQVdBLFNBQUtjLE1BQUwsR0FBYyxJQUFJ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QWhDLFNBQXVDL0ksQ0FBdkMsS0FBOENrSixVQUE5QyxDQUR3QixDQUV4QjtBQUNELFNBSEQ7QUFuQzhDOztBQStCaEQsV0FBSyxJQUFJbEosQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUFBLGVBQW5CQSxDQUFtQjtBQVEzQjtBQXZDK0M7O0FBNkJsRCx3REFBbUM7QUFBQTtBQVdsQztBQXhDaUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUEwQ2xELE1BQUlzRSxZQUFZLEdBQUcsSUFBSTJKLEtBQUosRUFBbkI7QUFDQTNKLGNBQVksQ0FBQzRKLEdBQWIsR0FBbUIsMkNBQW5COztBQUVBNUosY0FBWSxDQUFDNkosTUFBYixHQUFzQixZQUFNO0FBQzFCLFFBQUlFLFNBQVMsR0FBRyxJQUFJOUgsd0RBQUosQ0FBY3BILEdBQWQsRUFBbUJtRixZQUFuQixDQUFoQjtBQUNBekUsNEVBQUEsR0FBNkJWLEdBQTdCO0FBQ0FVLHFGQUFBLEdBQXNDeUUsWUFBdEM7QUFDQStKLGFBQVMsQ0FBQ0MsTUFBVjtBQUVELEdBTkQ7QUFRRCxDQXJERCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29sQm94IGZyb20gXCIuL2NvbGxpc2lvbl9ib3hcIjtcbmltcG9ydCB7IGNvbGxpZGVkV2l0aFNpZGUsIHJhbmRDb2luU291bmQgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbi8vIGltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5cbmNsYXNzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb2xCb3hXaWR0aCA9IHdpZHRoO1xuICAgIGNvbnN0IGNvbEJveEhlaWdodCA9IGhlaWdodDtcbiAgICBcbiAgICB0aGlzLnNwcml0ZVBhbGV0dGUgPSBzcHJpdGVQYWxldHRlO1xuICAgIHRoaXMuZHJhd09wdGlvbnMgPSB7XG4gICAgICBpbWFnZTogc3ByaXRlUGFsZXR0ZSxcbiAgICAgIHBhbFg6IDAsXG4gICAgICBwYWxZOiAwLFxuICAgICAgX3NXaWR0aDogd2lkdGgsXG4gICAgICBfc0hlaWdodDogaGVpZ2h0LFxuICAgICAgeDogcG9zWzBdLFxuICAgICAgeTogcG9zWzFdLFxuICAgICAgX2RXaWR0aDogd2lkdGgsXG4gICAgICBfZEhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgdGhpcy5jb2xCb3ggPSBuZXcgQ29sQm94KHRoaXMsY29sQm94V2lkdGgsY29sQm94SGVpZ2h0KTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSB7XG4gICAgICB0b3A6IGZhbHNlLFxuICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgIH07XG4gICAgXG4gIH1cblxuICBjb2xCb3hIb29rKCkgeyAvLyB0aGlzIHdpbGwgY2VudGVyIHRoZSBjb2xCb3ggb24gdGhlIGJvdHRvbVxuICAgIGxldCBbeCx5XSA9IFt0aGlzLnBvc1swXSx0aGlzLnBvc1sxXV07XG4gICAgbGV0IFtjeCxjeV0gPSBbXG4gICAgICB4KygodGhpcy53aWR0aCAtIHRoaXMuY29sQm94LndpZHRoKS8yKSxcbiAgICAgIHkrKHRoaXMuaGVpZ2h0IC0gdGhpcy5jb2xCb3guaGVpZ2h0KSxcbiAgICBdO1xuICAgIHJldHVybiBbY3gsY3ldO1xuICB9XG5cbiAgdXBkYXRlU2lkZXMoKSB7XG4gICAgdGhpcy5jb2xCb3gudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgfVxuXG4gIGNvbGxpZGVkT25TaWRlKHNpZGUsIG90aGVyT2JqZWN0KSB7XG4gICAgbGV0IG90aGVyU2lkZTtcbiAgICBzd2l0Y2goc2lkZSkge1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImJvdHRvbVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJ0b3BcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInJpZ2h0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwibGVmdFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG90aGVyU2lkZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNvbGxpc2lvbnNbc2lkZV0gPSBjb2xsaWRlZFdpdGhTaWRlKHNpZGUsIHRoaXNbc2lkZV0sIG90aGVyT2JqZWN0W290aGVyU2lkZV0pO1xuICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbnNbc2lkZV07XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UoLi4uT2JqZWN0LnZhbHVlcyh0aGlzLmRyYXdPcHRpb25zKSk7XG4gICAgdGhpcy5jb2xCb3guY2VudGVyT25FbnRpdHkoKTtcbiAgICB0aGlzLmNvbEJveC5kcmF3KGN0eCk7XG4gIH1cbn1cblxuY2xhc3MgQ29pbiBleHRlbmRzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCwgc3ByaXRlUGFsZXR0ZSkge1xuICAgIHN1cGVyKHBvcywgd2lkdGgsIGhlaWdodCwgc3ByaXRlUGFsZXR0ZSk7XG4gICAgdGhpcy5mcmFtZUludGVydmFsID0gMTI7XG4gICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSAwO1xuICB9XG5cbiAgY29sbGVjdCgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwidG9wXCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKSB8fFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcImJvdHRvbVwiLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXllcikgfHxcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJsZWZ0XCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKSB8fFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcInJpZ2h0XCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKVxuICAgICkge1xuICAgICAgcmFuZENvaW5Tb3VuZCgpLnBsYXkoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIGNvbnN0IGkgPSB0aGlzLmZyYW1lSW50ZXJ2YWw7XG4gICAgY29uc3QgYyA9IHRoaXMuZnJhbWVDb3VudDtcbiAgICBjb25zdCB3ID0gdGhpcy53aWR0aDtcbiAgICBpZiAoYyA8IGkpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAwO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSoyKSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMTtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqMykge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDI7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjQpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAzO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo1KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNDtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNikge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDU7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjcpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA2O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo4KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNztcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMDtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvaW47IiwiXG5cbmNsYXNzIENvbEJveCB7XG4gIGNvbnN0cnVjdG9yKGVudGl0eSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZW50aXR5ID0gZW50aXR5O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnBvcyA9IHRoaXMub3JpZ2luUG9zKCk7XG5cbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3dpZHRoLHldO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gW3grd2lkdGgseStoZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K2hlaWdodF07XG4gICAgXG4gICAgdGhpcy5jZW50ZXIgPSBbeCsod2lkdGgvMikseSsoaGVpZ2h0LzIpXTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgICB0aGlzLnNpZGVzID0gW3RoaXMudG9wLCB0aGlzLmJvdHRvbSwgdGhpcy5yaWdodCwgdGhpcy5sZWZ0XTtcbiAgICBcbiAgfVxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICBjdHguc3Ryb2tlUmVjdChcbiAgICAgIHRoaXMucG9zWzBdLFxuICAgICAgdGhpcy5wb3NbMV0sXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5oZWlnaHQsXG4gICAgKVxuICB9XG5cbiAgdXBkYXRlU2lkZXMoKSB7XG4gICAgY29uc3QgW3gseV0gPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BMZWZ0ID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wUmlnaHQgPSBbeCt0aGlzLndpZHRoLHldO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gW3grdGhpcy53aWR0aCx5K3RoaXMuaGVpZ2h0XTtcbiAgICBjb25zdCBib3R0b21MZWZ0ID0gW3gseSt0aGlzLmhlaWdodF07XG4gICAgdGhpcy5jZW50ZXIgPSBbeCsodGhpcy53aWR0aC8yKSx5Kyh0aGlzLmhlaWdodC8yKV07XG4gICAgdGhpcy50b3AgPSBbW3RvcExlZnRbMF0sdG9wUmlnaHRbMF1dLCB0b3BMZWZ0WzFdXTtcbiAgICB0aGlzLmJvdHRvbSA9IFtbYm90dG9tTGVmdFswXSxib3R0b21SaWdodFswXV0sIGJvdHRvbUxlZnRbMV1dO1xuICAgIHRoaXMucmlnaHQgPSBbdG9wUmlnaHRbMF0sIFt0b3BSaWdodFsxXSxib3R0b21SaWdodFsxXV1dO1xuICAgIHRoaXMubGVmdCA9IFt0b3BMZWZ0WzBdLCBbdG9wTGVmdFsxXSxib3R0b21MZWZ0WzFdXV07XG4gIH1cblxuICBvcmlnaW5Qb3MoKSB7XG4gICAgY29uc3QgW2V4LGV5XSA9IFt0aGlzLmVudGl0eS5wb3NbMF0sIHRoaXMuZW50aXR5LnBvc1sxXV07XG4gICAgY29uc3QgW2V3LGVoXSA9IFt0aGlzLmVudGl0eS53aWR0aCwgdGhpcy5lbnRpdHkuaGVpZ2h0XTtcbiAgICBjb25zdCBbdHcsdGhdID0gW3RoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTtcbiAgICBjb25zdCB4ID0gZXggKyAoKGV3LXR3KS8yKTtcbiAgICBjb25zdCB5ID0gZXkgKyBlaCAtIHRoO1xuICAgIHJldHVybiBbeCx5XTtcbiAgfVxuXG4gIGNlbnRlck9uRW50aXR5KCkge1xuICAgIHRoaXMucG9zID0gdGhpcy5lbnRpdHkuY29sQm94SG9vaygpO1xuICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbEJveDsiLCIvLyBpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiO1xuaW1wb3J0IENvbEJveCBmcm9tICcuL2NvbGxpc2lvbl9ib3gnO1xuaW1wb3J0IHtcbiAgbm9ybWFsaXplZE1vdmVtZW50LFxuICBjb2xsaWRlZFdpdGhTaWRlLFxufSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcblxuY2xhc3MgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnN0IGNvbEJveFdpZHRoID0gd2lkdGgvMjtcbiAgICBjb25zdCBjb2xCb3hIZWlnaHQgPSBoZWlnaHQvMztcbiAgICBcbiAgICB0aGlzLnNwcml0ZVBhbGV0dGUgPSBzcHJpdGVQYWxldHRlO1xuICAgIHRoaXMuZHJhd09wdGlvbnMgPSB7XG4gICAgICBpbWFnZTogc3ByaXRlUGFsZXR0ZSxcbiAgICAgIHBhbFg6IDAsXG4gICAgICBwYWxZOiAwLFxuICAgICAgX3NXaWR0aDogd2lkdGgsXG4gICAgICBfc0hlaWdodDogaGVpZ2h0LFxuICAgICAgeDogcG9zWzBdLFxuICAgICAgeTogcG9zWzFdLFxuICAgICAgX2RXaWR0aDogd2lkdGgsXG4gICAgICBfZEhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgdGhpcy5jb2xCb3ggPSBuZXcgQ29sQm94KHRoaXMsY29sQm94V2lkdGgsY29sQm94SGVpZ2h0KTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgICB0aGlzLmNlbnRlciA9IHRoaXMuY29sQm94LmNlbnRlcjtcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSB7XG4gICAgICB0b3A6IGZhbHNlLFxuICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgIH07XG5cbiAgfVxuXG4gIGNvbEJveEhvb2soKSB7IC8vIHRoaXMgd2lsbCBjZW50ZXIgdGhlIGNvbEJveCBvbiB0aGUgYm90dG9tXG4gICAgbGV0IFt4LHldID0gW3RoaXMucG9zWzBdLHRoaXMucG9zWzFdXTtcbiAgICBsZXQgW2N4LGN5XSA9IFtcbiAgICAgIHgrKCh0aGlzLndpZHRoIC0gdGhpcy5jb2xCb3gud2lkdGgpLzIpLFxuICAgICAgeSsodGhpcy5oZWlnaHQgLSB0aGlzLmNvbEJveC5oZWlnaHQpLFxuICAgIF07XG4gICAgcmV0dXJuIFtjeCxjeV07XG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICB0aGlzLmNvbEJveC51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY2VudGVyID0gdGhpcy5jb2xCb3guY2VudGVyO1xuICB9XG5cbiAgY29sbGlkZWRPblNpZGUoc2lkZSwgb3RoZXJPYmplY3QpIHtcbiAgICBsZXQgb3RoZXJTaWRlO1xuICAgIHN3aXRjaChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwiYm90dG9tXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInRvcFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwicmlnaHRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJsZWZ0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3RoZXJTaWRlID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sbGlzaW9uc1tzaWRlXSA9IGNvbGxpZGVkV2l0aFNpZGUoc2lkZSwgdGhpc1tzaWRlXSwgb3RoZXJPYmplY3Rbb3RoZXJTaWRlXSk7XG4gICAgcmV0dXJuIHRoaXMuY29sbGlzaW9uc1tzaWRlXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSguLi5PYmplY3QudmFsdWVzKHRoaXMuZHJhd09wdGlvbnMpKTtcbiAgICB0aGlzLmNvbEJveC5jZW50ZXJPbkVudGl0eSgpO1xuICAgIHRoaXMuY29sQm94LmRyYXcoY3R4KTtcbiAgfVxufVxuXG5jbGFzcyBFbmVteSBleHRlbmRzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSwgdHlwZSwgZGV0ZWN0RGlzdCkge1xuICAgIHN1cGVyKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSk7XG4gICAgdGhpcy5zcGVlZCA9IDAuOTtcbiAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAwLjc1O1xuICAgIHRoaXMucGFjZSA9IDI0L3RoaXMuc3BlZWQ7XG4gICAgdGhpcy5jaGFzaW5nUGxheWVyID0gZmFsc2U7XG4gICAgdGhpcy5kZXRlY3REaXN0ID0gZGV0ZWN0RGlzdDtcbiAgICB0aGlzLmlkbGVDb3VudCA9IDA7XG4gICAgdGhpcy5pZGxlTWF4ID0gNjA7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm1vdmVtZW50ID0ge1xuICAgICAgdXA6IGZhbHNlLFxuICAgICAgZG93bjogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuICAgIGxldCB4LCB5O1xuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlIFwiYmxvYlwiOlxuICAgICAgICB4ID0gNDggKiAzO1xuICAgICAgICB5ID0gNDggKiAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJiYXRcIjpcbiAgICAgICAgeCA9IDQ4ICogMDtcbiAgICAgICAgeSA9IDQ4ICogMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZ2hvc3RcIjpcbiAgICAgICAgeCA9IDQ4ICogNjtcbiAgICAgICAgeSA9IDQ4ICogNDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMucGFsWE9mZnNldCA9IHg7XG4gICAgdGhpcy5zdHJpZGUgPSB7XG4gICAgICB1cDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6ICg0OCAqIDMpICsgeSxcbiAgICAgIH0sXG4gICAgICBkb3duOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogKDQ4ICogMCkgKyB5LFxuICAgICAgfSxcbiAgICAgIGxlZnQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiAoNDggKiAxKSArIHksXG4gICAgICB9LFxuICAgICAgcmlnaHQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiAoNDggKiAyKSArIHksXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBzdHJpZGVQYWxldHRlUG9zKGRpcmVjdGlvbikge1xuICAgIHRoaXMucGFjZSA9IDI0IC8gKHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXIpO1xuICAgIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gKDQ4ICogMSkgKyB0aGlzLnBhbFhPZmZzZXQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSAyICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuICg0OCAqIDApICsgdGhpcy5wYWxYT2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gMyAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiAoNDggKiAxKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDQgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gKDQ4ICogMikgKyB0aGlzLnBhbFhPZmZzZXQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA+IDQgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID0gMDtcbiAgICAgIHJldHVybiAoNDggKiAxKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9XG4gIH1cblxuICBkaXN0VG9QbGF5ZXIoKSB7XG4gICAgY29uc3QgbXggPSB0aGlzLmNlbnRlclswXTtcbiAgICBjb25zdCBteSA9IHRoaXMuY2VudGVyWzFdO1xuICAgIGNvbnN0IGV4ID0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmNlbnRlclswXTtcbiAgICBjb25zdCBleSA9IEdsb2JhbC5TRVNTSU9OLnBsYXllci5jZW50ZXJbMV07XG4gICAgbGV0IGR4ID0gbXggLSBleDtcbiAgICBsZXQgZHkgPSBteSAtIGV5O1xuICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5wb3coZHgsIDIpICsgTWF0aC5wb3coZHksIDIpKTtcbiAgICByZXR1cm4gZGlzdDtcbiAgfVxuXG4gIG5vcm1hbGl6ZWRWZWN0b3JQb3MoKSB7XG4gICAgY29uc3QgbXggPSB0aGlzLmNlbnRlclswXTtcbiAgICBjb25zdCBteSA9IHRoaXMuY2VudGVyWzFdO1xuICAgIGNvbnN0IGV4ID0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmNlbnRlclswXTtcbiAgICBjb25zdCBleSA9IEdsb2JhbC5TRVNTSU9OLnBsYXllci5jZW50ZXJbMV07XG4gICAgbGV0IGR4ID0gbXggLSBleDtcbiAgICBsZXQgZHkgPSBteSAtIGV5O1xuXG4gICAgaWYgKCF0aGlzLmNoYXNpbmdQbGF5ZXIgJiYgIXRoaXMuaWRsZUNvdW50KSB7XG4gICAgICBjb25zdCByYW5kQW5nbGUgPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gICAgICB0aGlzLmR4ID0gTWF0aC5jb3MocmFuZEFuZ2xlKSAqIHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB0aGlzLmR5ID0gTWF0aC5zaW4ocmFuZEFuZ2xlKSAqIHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB0aGlzLmlkbGVDb3VudCA9IDE7XG4gICAgfVxuICAgIFxuICAgIGlmICghdGhpcy5jaGFzaW5nUGxheWVyICYmIHRoaXMuaWRsZUNvdW50KSB0aGlzLmlkbGVDb3VudCsrO1xuICAgIFxuICAgIGlmICh0aGlzLmNoYXNpbmdQbGF5ZXIpIHtcbiAgICAgIHRoaXMuZHggPSBkeDtcbiAgICAgIHRoaXMuZHkgPSBkeTtcbiAgICB9XG5cblxuICAgIGlmKHRoaXMuaWRsZUNvdW50ID49IHRoaXMuaWRsZU1heCkgdGhpcy5pZGxlQ291bnQgPSAwO1xuXG4gICAgdGhpcy5hbmdsZSA9IE1hdGguYXRhbih0aGlzLmR5L3RoaXMuZHgpO1xuICAgIGNvbnN0IG55ID0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgIGNvbnN0IG54ID0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgIGlmICh0aGlzLmR5ID4gMCkge1xuICAgICAgdGhpcy5tb3ZlbWVudFtcInVwXCJdID0gdHJ1ZTtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJkb3duXCJdID0gZmFsc2U7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5keSkgPiBNYXRoLmFicyh0aGlzLmR4KSkgdGhpcy5zcHJpdGVEaXIgPSBcInVwXCI7XG4gICAgfVxuICAgIFxuICAgIGlmICh0aGlzLmR5IDwgMCkge1xuICAgICAgdGhpcy5tb3ZlbWVudFtcImRvd25cIl0gPSB0cnVlO1xuICAgICAgdGhpcy5tb3ZlbWVudFtcInVwXCJdID0gZmFsc2U7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5keSkgPiBNYXRoLmFicyh0aGlzLmR4KSkgdGhpcy5zcHJpdGVEaXIgPSBcImRvd25cIjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuZHggPiAwKSB7XG4gICAgICB0aGlzLm1vdmVtZW50W1wibGVmdFwiXSA9IHRydWU7XG4gICAgICB0aGlzLm1vdmVtZW50W1wicmlnaHRcIl0gPSBmYWxzZTtcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmR4KSA+IE1hdGguYWJzKHRoaXMuZHkpKSB0aGlzLnNwcml0ZURpciA9IFwibGVmdFwiO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5keCA8IDApIHtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJyaWdodFwiXSA9IHRydWU7XG4gICAgICB0aGlzLm1vdmVtZW50W1wibGVmdFwiXSA9IGZhbHNlO1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuZHgpID4gTWF0aC5hYnModGhpcy5keSkpIHRoaXMuc3ByaXRlRGlyID0gXCJyaWdodFwiO1xuICAgIH1cblxuICAgIHJldHVybiBbbngsbnldO1xuICB9XG5cbiAgZGFtYWdlKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpKjQpKzEpO1xuICB9XG5cbiAgaGl0UGxheWVyKHdhbGxzKSB7XG5cbiAgICBjb25zdCBwbGF5ZXIgPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXI7XG5cbiAgICBpZiAodGhpcy5kaXN0VG9QbGF5ZXIoKSA8IDMyICYmICFHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuaW52dWxuZXJhYmxlKSB7XG4gICAgICBwbGF5ZXIucG9zWzBdIC09ICgwLjQgKiB0aGlzLmR4KTtcbiAgICAgIHBsYXllci5wb3NbMV0gLT0gKDAuNCAqIHRoaXMuZHkpO1xuICAgICAgcGxheWVyLnVwZGF0ZVNpZGVzKCk7XG4gICAgICBwbGF5ZXIud2FsbENoZWNrKHdhbGxzKTtcbiAgICAgIHBsYXllci51cGRhdGVTaWRlcygpO1xuICAgICAgcGxheWVyLmhwIC09IHRoaXMuZGFtYWdlKCk7XG4gICAgICBpZiAocGxheWVyLmhwIDwgMCkgcGxheWVyLmhwID0gMDtcbiAgICAgIHBsYXllci5oaXQoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHdhbGxDaGVjayh3YWxscykge1xuICAgIGNvbnN0IHtcbiAgICAgIHVwLFxuICAgICAgZG93bixcbiAgICAgIGxlZnQsXG4gICAgICByaWdodFxuICAgIH0gPSB0aGlzLm1vdmVtZW50O1xuXG4gICAgaWYgKHVwKSB7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJ0b3BcIiwgd2FsbCkpIGJyZWFrOyB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnRvcCkge1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy50b3AgLSAodGhpcy5oZWlnaHQtdGhpcy5jb2xCb3guaGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZG93bikge1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwiYm90dG9tXCIsIHdhbGwpKSBicmVhazsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMuYm90dG9tIC0gNDg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxlZnQpIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgd2FsbCkpIGJyZWFrOyB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmxlZnQpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMubGVmdCAtICh0aGlzLmNvbEJveC53aWR0aC8yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmlnaHQpIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInJpZ2h0XCIsIHdhbGwpKSBicmVhazsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5yaWdodCkge1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5yaWdodCAtICh0aGlzLmNvbEJveC53aWR0aCArICh0aGlzLmNvbEJveC53aWR0aC8yKSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG5cbiAgbW92ZSh3YWxscykge1xuXG4gICAgaWYgKHRoaXMuZGlzdFRvUGxheWVyKCkgPCB0aGlzLmRldGVjdERpc3QpIHtcbiAgICAgIHRoaXMuY2hhc2luZ1BsYXllciA9IHRydWU7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYXNpbmdQbGF5ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDAuNzU7XG4gICAgfVxuICAgIFxuICAgIGxldCBuZXdWZWN0b3JzID0gdGhpcy5ub3JtYWxpemVkVmVjdG9yUG9zKCk7XG5cbiAgICBjb25zdCB7XG4gICAgICB1cCxcbiAgICAgIGRvd24sXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHRcbiAgICB9ID0gdGhpcy5tb3ZlbWVudDtcblxuICAgIGlmIChsZWZ0ICYmIHVwKSB7XG4gICAgICB0aGlzLnBvc1swXSAtPSBuZXdWZWN0b3JzWzBdO1xuICAgICAgdGhpcy5wb3NbMV0gLT0gbmV3VmVjdG9yc1sxXTtcbiAgICB9IFxuICAgIFxuICAgIGlmIChsZWZ0ICYmIGRvd24pIHtcbiAgICAgIHRoaXMucG9zWzBdIC09IG5ld1ZlY3RvcnNbMF07XG4gICAgICB0aGlzLnBvc1sxXSAtPSBuZXdWZWN0b3JzWzFdO1xuICAgIH1cbiAgICBcbiAgICBpZiAocmlnaHQgJiYgdXApIHtcbiAgICAgIHRoaXMucG9zWzBdICs9IG5ld1ZlY3RvcnNbMF07XG4gICAgICB0aGlzLnBvc1sxXSArPSBuZXdWZWN0b3JzWzFdO1xuICAgIH0gXG4gICAgXG4gICAgaWYgKHJpZ2h0ICYmIGRvd24pIHtcbiAgICAgIHRoaXMucG9zWzBdICs9IG5ld1ZlY3RvcnNbMF07XG4gICAgICB0aGlzLnBvc1sxXSArPSBuZXdWZWN0b3JzWzFdO1xuICAgIH1cblxuICAgIHRoaXMud2FsbENoZWNrKHdhbGxzKTtcblxuICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcblxuICAgIHN3aXRjaCAodGhpcy5zcHJpdGVEaXIpIHtcbiAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS51cC5wYWxZO1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJ1cFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICBcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUuZG93bi5wYWxZO1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJkb3duXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmxlZnQucGFsWTtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwibGVmdFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUucmlnaHQucGFsWTtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwicmlnaHRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gNDggKiAxO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBcbiAgICB0aGlzLmhpdFBsYXllcih3YWxscyk7XG4gICAgR2xvYmFsLlNFU1NJT04ucGxheWVyLndhbGxDaGVjayh3YWxscyk7XG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMuZHJhd09wdGlvbnMueCA9IHRoaXMucG9zWzBdO1xuICAgIHRoaXMuZHJhd09wdGlvbnMueSA9IHRoaXMucG9zWzFdO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW5lbXk7IiwiaW1wb3J0IENvbEJveCBmcm9tIFwiLi9jb2xsaXNpb25fYm94XCI7XG5pbXBvcnQgeyBjb2xsaWRlZFdpdGhTaWRlIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5jbGFzcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29sQm94V2lkdGggPSB3aWR0aC8yO1xuICAgIGNvbnN0IGNvbEJveEhlaWdodCA9IGhlaWdodC8zO1xuICAgIFxuICAgIHRoaXMuc3ByaXRlUGFsZXR0ZSA9IHNwcml0ZVBhbGV0dGU7XG4gICAgdGhpcy5kcmF3T3B0aW9ucyA9IHtcbiAgICAgIGltYWdlOiBzcHJpdGVQYWxldHRlLFxuICAgICAgcGFsWDogMCxcbiAgICAgIHBhbFk6IDAsXG4gICAgICBfc1dpZHRoOiB3aWR0aCxcbiAgICAgIF9zSGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiBwb3NbMF0sXG4gICAgICB5OiBwb3NbMV0sXG4gICAgICBfZFdpZHRoOiB3aWR0aCxcbiAgICAgIF9kSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICB0aGlzLmNvbEJveCA9IG5ldyBDb2xCb3godGhpcyxjb2xCb3hXaWR0aCxjb2xCb3hIZWlnaHQpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY2VudGVyID0gdGhpcy5jb2xCb3guY2VudGVyO1xuICAgIHRoaXMuY29sbGlzaW9ucyA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcbiAgICBcbiAgfVxuXG4gIGNvbEJveEhvb2soKSB7IC8vIHRoaXMgd2lsbCBjZW50ZXIgdGhlIGNvbEJveCBvbiB0aGUgYm90dG9tXG4gICAgbGV0IFt4LHldID0gW3RoaXMucG9zWzBdLHRoaXMucG9zWzFdXTtcbiAgICBsZXQgW2N4LGN5XSA9IFtcbiAgICAgIHgrKCh0aGlzLndpZHRoIC0gdGhpcy5jb2xCb3gud2lkdGgpLzIpLFxuICAgICAgeSsodGhpcy5oZWlnaHQgLSB0aGlzLmNvbEJveC5oZWlnaHQpLFxuICAgIF07XG4gICAgcmV0dXJuIFtjeCxjeV07XG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICB0aGlzLmNvbEJveC51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMuY2VudGVyID0gdGhpcy5jb2xCb3guY2VudGVyO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICB9XG5cbiAgY29sbGlkZWRPblNpZGUoc2lkZSwgb3RoZXJPYmplY3QpIHtcbiAgICBsZXQgb3RoZXJTaWRlO1xuICAgIHN3aXRjaChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwiYm90dG9tXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInRvcFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwicmlnaHRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJsZWZ0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3RoZXJTaWRlID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sbGlzaW9uc1tzaWRlXSA9IGNvbGxpZGVkV2l0aFNpZGUoc2lkZSwgdGhpc1tzaWRlXSwgb3RoZXJPYmplY3Rbb3RoZXJTaWRlXSk7XG4gICAgcmV0dXJuIHRoaXMuY29sbGlzaW9uc1tzaWRlXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSguLi5PYmplY3QudmFsdWVzKHRoaXMuZHJhd09wdGlvbnMpKTtcbiAgICB0aGlzLmNvbEJveC5jZW50ZXJPbkVudGl0eSgpO1xuICAgIHRoaXMuY29sQm94LmRyYXcoY3R4KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHk7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBSb29tIGZyb20gXCIuL3Jvb21cIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoY3R4LCBwbGF5ZXJTcHJpdGUpIHtcbiAgICB0aGlzLmZwc0ludGVydmFsID0gMTAwMC82MDtcbiAgICB0aGlzLnRvUGxheWVyID0gMTAwO1xuICAgIGNvbnN0IHN0YXJ0aW5nUG9zID0gWzQ4KjcsIDQ4KjddO1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihzdGFydGluZ1BvcywgLi4uR2xvYmFsLlNQUklURV9ESU1TLCBwbGF5ZXJTcHJpdGUpO1xuICAgIEdsb2JhbC5TRVNTSU9OLnBsYXllciA9IHRoaXMucGxheWVyO1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIC8vIGNvbnN0IHJvb20gPSB7IFwibGVmdFwiOiBuZXcgUm9vbSgpIH07IC8vIHRlc3RpbmcgbmV3IFJvb20ocm9vbSlcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tcyA9IHt9O1xuICAgIHRoaXMuc3RhcnRpbmdSb29tID0gbmV3IFJvb20oKTtcbiAgICB0aGlzLnJvb20gPSB0aGlzLnN0YXJ0aW5nUm9vbTtcbiAgICB0aGlzLnBsYXllci5kcmF3KGN0eCk7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZSA9IHRoaXM7XG4gICAgR2xvYmFsLlNFU1NJT04uc3RvcCA9IGZhbHNlO1xuICAgIEdsb2JhbC5TRVNTSU9OLmNvaW5Db3VudCA9IDA7XG4gICAgdGhpcy5nYW1lU3RlcCA9IHRoaXMuZ2FtZVN0ZXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3AgPSB0aGlzLnN0b3AuYmluZCh0aGlzKTtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXkoKTtcbiAgfVxuXG4gIGdhbWVPdmVyKCkge1xuICAgIHJldHVybiB0aGlzLndpbigpIHx8IHRoaXMubG9zZSgpO1xuICB9XG5cbiAgd2luKCl7XG4gICAgcmV0dXJuIEdsb2JhbC5TRVNTSU9OLmNvaW5Db3VudCA+PSAxMDtcbiAgfVxuXG4gIGxvc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWVyLmhwIDw9IDA7XG4gIH1cblxuXG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5nYW1lT3ZlcigpKSB7XG4gICAgICB0aGlzLnJlcXVlc3RTdG9wID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnYW1lU3RlcCgpIHtcbiAgICB0aGlzLnJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVTdGVwKTtcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZWxhcHNlZCA9IG5vdyAtIHRoaXMudGhlbjtcblxuICAgIGlmIChlbGFwc2VkID4gdGhpcy5mcHNJbnRlcnZhbCkge1xuICAgICAgdGhpcy50aGVuID0gbm93IC0gKGVsYXBzZWQgJSB0aGlzLmZwc0ludGVydmFsKTtcbiAgICAgIGNvbnN0IHBsYXllciA9IEdsb2JhbC5TRVNTSU9OLnBsYXllcjtcbiAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLDAsIEdsb2JhbC5XSURUSCwgR2xvYmFsLkhFSUdIVCk7XG4gICAgICBwbGF5ZXIubW92ZSh0aGlzLnJvb20ud2FsbHMpO1xuICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLnJvb20uZW5lbWllcykuZm9yRWFjaChlbmVteSA9PiBlbmVteS5tb3ZlKHRoaXMucm9vbS53YWxscykpO1xuICAgICAgdGhpcy5yb29tLmFuaW1hdGUoKTtcbiAgICAgIHRoaXMucm9vbS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgIHBsYXllci5kcmF3KHRoaXMuY3R4KTtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgaWYgKHRoaXMucmVxdWVzdFN0b3ApIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZXF1ZXN0SWQpO1xuICAgICAgICBjb25zdCBmb250RmFtaWx5ID0gXCJDb3VyaWVyIE5ld1wiO1xuICAgICAgICBpZiAodGhpcy53aW4oKSkge1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgwLDAsMCwwLjUpXCI7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwwLDcyMCw3MjApO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmFmNFwiO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgNDhweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNvbmdyYXR1bGF0aW9ucyFcIiwgNDgqMywgNDgqNCk7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGAyNHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiWW91IGxlYXZlIHdpdGggeW91ciBsaWZlLFwiLCA0OCo0LDQ4KjUpO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiYW5kIHlvdXIgcG9ja2V0cyBmdWxsIVwiLCA0OCo0LjUsNDgqNS41KTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNsaWNrICdSZXN0YXJ0JyB1cCB0b3AgaWZcIiwgNDgqNCw0OCo3KTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcInlvdSdkIGxpa2UgdG8gcGxheSBhZ2FpblwiLCA0OCo0LjIsNDgqNy41KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sb3NlKCkpIHtcbiAgICAgICAgICBjb25zdCBmb250ID0gR2xvYmFsLkZPTlQuZm9udDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDAsMC41KVwiO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsMCw3MjAsNzIwKTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZhZjRcIjtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDQ4cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJHQU1FIE9WRVJcIiwgNDggKiA0Ljc1LCA0OCAqIDQpO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgMzZweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcInlvdSBsb3NlIVwiLCA0OCAqIDUuNjUsIDQ4ICogNSk7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGA5NnB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwi8J+SgFwiLCA0OCAqIDYuMjUsIDQ4ICogNyk7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGAyNHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ2xpY2sgJ1Jlc3RhcnQnIHVwIHRvcCBpZlwiLCA0OCo0LDQ4KjkpO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwieW91J2QgbGlrZSB0byBwbGF5IGFnYWluXCIsIDQ4KjQuMiw0OCo5LjUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgdGhpcy5nYW1lU3RlcCgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVTdGVwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcbmNsYXNzIEdhbWVTdGFydCB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgcGxheWVyU3ByaXRlKSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5wbGF5ZXJTcHJpdGUgPSBwbGF5ZXJTcHJpdGU7XG4gICAgdGhpcy5mcHNJbnRlcnZhbCA9IDEwMDAvNjA7XG4gICAgdGhpcy50aGV0YSA9IDA7XG4gICAgdGhpcy5zdGVwID0gdGhpcy5zdGVwLmJpbmQodGhpcyk7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIHRoaXMucmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc3RlcCk7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGVsYXBzZWQgPSBub3cgLSB0aGlzLnRoZW47XG4gICAgaWYgKGVsYXBzZWQgPiB0aGlzLmZwc0ludGVydmFsKSB7XG4gICAgICBjb25zdCBmb250RmFtaWx5ID0gXCJDb3VyaWVyIE5ld1wiO1xuICAgICAgdGhpcy50aGV0YSArPSAwLjAxO1xuICAgICAgY29uc3QgcmVkID0gTWF0aC5mbG9vcigxMjcgKiBNYXRoLnNpbigxLjEgKiB0aGlzLnRoZXRhKSArIDEpO1xuICAgICAgY29uc3QgZ3JlZW4gPSBNYXRoLmZsb29yKDEyNyAqIE1hdGguc2luKDEuMiAqIHRoaXMudGhldGEpICsgMSk7XG4gICAgICBjb25zdCBibHVlID0gTWF0aC5mbG9vcigxMjcgKiBNYXRoLnNpbigxLjUgKiB0aGlzLnRoZXRhKSArIDEpO1xuICAgICAgY29uc3QgY29sb3IgPSBgcmdiYSgke3JlZH0sJHtncmVlbn0sJHtibHVlfSwgMC43KWA7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwwLDcyMCw3MjApO1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEdsb2JhbC5CR19JTUdTW1wiNERMUlUwXCJdLCAwLCAwKTtcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwwLDcyMCw3MjApO1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjZmZmYWY0XCI7XG4gICAgICB0aGlzLmN0eC5mb250ID0gYGJvbGQgNDhweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUHJlc3MgRU5URVJcIiwgNDggKiA0LCA0OCAqIDQpO1xuICAgICAgdGhpcy5jdHguZm9udCA9IGBib2xkIDI0cHggJHtmb250RmFtaWx5fWA7XG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChcIi4uLnRvIGJlZ2luIGEgbmV3IGNyYXdsIVwiLCA0OCAqIDUsIDQ4ICogNC41NSk7XG5cbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLnBsYXllclNwcml0ZSwgNDgsIDAsIDQ4LCA0OCwgNDggKiA3LCA0OCAqIDcsIDQ4LCA0OCk7XG5cbiAgICAgIGlmIChHbG9iYWwuS0VZU1tcIkVudGVyXCJdKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElkKTtcbiAgICAgICAgY29uc3QgcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKTtcbiAgICAgICAgcmVzdGFydC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgbmV3R2FtZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb21wdCgpIHtcbiAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuc3RlcCgpO1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lU3RhcnQ7IiwiaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IHsgcm9vbUNoYW5nZSB9IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKSB7XG4gICAgc3VwZXIocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKTtcbiAgICB0aGlzLnNwZWVkID0gMS4yNTtcbiAgICB0aGlzLm5vcm1hbGl6ZWRTcGVlZCA9IHBhcnNlRmxvYXQodGhpcy5zcGVlZCkgLyBNYXRoLnNxcnQoMik7XG4gICAgdGhpcy5wYWNlID0gMjQvdGhpcy5zcGVlZDtcbiAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxO1xuICAgIHRoaXMuc3RhbWluYSA9IDEwMDA7XG4gICAgdGhpcy5pbnZ1bG5lcmFibGUgPSAwO1xuICAgIHRoaXMuaHAgPSAyMDtcbiAgICB0aGlzLnN0cmlkZSA9IHtcbiAgICAgIHVwOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiA2LFxuICAgICAgfSxcbiAgICAgIGRvd246IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDAsXG4gICAgICB9LFxuICAgICAgbGVmdDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogMixcbiAgICAgIH0sXG4gICAgICByaWdodDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogNCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG5ld1Jvb21Qb3MoZGlyKSB7XG4gICAgc3dpdGNoKGRpcikge1xuICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgIHRoaXMucG9zWzFdID0gNzIwLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgIHRoaXMucG9zWzFdID0gLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHRoaXMucG9zWzBdID0gNzIwLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB0aGlzLnBvc1swXSA9IC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RyaWRlUGFsZXR0ZVBvcyhkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnBhY2UgPSAyNCAvICh0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyKTtcbiAgICBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDIgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gMyAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSA0ICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID4gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPSAwO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9XG4gIH1cblxuICB3YWxsQ2hlY2sod2FsbHMpIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInRvcFwiLCB3YWxsKSkgYnJlYWsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy50b3ApIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMudG9wIC0gMzI7XG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImJvdHRvbVwiLCB3YWxsKSkgYnJlYWsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMuYm90dG9tIC0gNDg7XG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5sZWZ0IC0gMTI7XG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInJpZ2h0XCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnJpZ2h0KSB7XG4gICAgICAgIHRoaXMucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLnJpZ2h0IC0gMzY7XG4gICAgICB9XG5cbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLmludnVsbmVyYWJsZSA9IDc1O1xuICB9XG5cbiAgbW92ZSh3YWxscykge1xuICAgIGNvbnN0IFtcbiAgICAgIHVwLFxuICAgICAgZG93bixcbiAgICAgIGxlZnQsXG4gICAgICByaWdodCxcbiAgICAgIHNoaWZ0XG4gICAgXSA9IFtcbiAgICAgIEdsb2JhbC5LRVlTW1wid1wiXSxcbiAgICAgIEdsb2JhbC5LRVlTW1wic1wiXSxcbiAgICAgIEdsb2JhbC5LRVlTW1wiYVwiXSxcbiAgICAgIEdsb2JhbC5LRVlTW1wiZFwiXSxcbiAgICAgIEdsb2JhbC5LRVlTW1wiU2hpZnRcIl0sXG4gICAgXTtcbiAgICBpZiAoc2hpZnQgJiYgdGhpcy5zdGFtaW5hID4gMCkge1xuICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMS41O1xuICAgICAgdGhpcy5zdGFtaW5hIC09IDQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhbWluYSA8IDApIHRoaXMuc3RhbWluYSA9IDA7XG4gICAgaWYgKCFzaGlmdCAmJiB0aGlzLnN0YW1pbmEgPCAxMDAwKSB0aGlzLnN0YW1pbmEgKz0gMTtcbiAgICBpZiAodGhpcy5pbnZ1bG5lcmFibGUpIHRoaXMuaW52dWxuZXJhYmxlLS07XG4gICAgaWYgKHRoaXMuaW52dWx2ZXJhYmxlIDwgMCkgdGhpcy5pbnZ1bG5lcmFibGUgPSAwO1xuXG4gICAgdGhpcy53YWxsQ2hlY2sod2FsbHMpO1xuXG4gICAgLy8gVyBrZXkgbW92ZW1lbnRzIGFuZCBzcHJpdGUgZGlyZWN0aW9uXG4gICAgaWYgKHVwKSB7XG4gICAgICBpZiAobGVmdCB8fCByaWdodCAmJiAhdGhpcy5jb2xsaXNpb25zLnRvcCkge1xuICAgICAgICB0aGlzLnBvc1sxXSArPSAtdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc1sxXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLnVwLnBhbFk7XG4gICAgICBpZiAoIWxlZnQgJiYgIXJpZ2h0KSB7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcInVwXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFMga2V5IG1vdmVtZW50cyBhbmQgc3ByaXRlIGRpcmVjdGlvblxuICAgIGlmIChkb3duKSB7XG4gICAgICBpZiAobGVmdCB8fCByaWdodCkge1xuICAgICAgICB0aGlzLnBvc1sxXSArPSB0aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zWzFdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5kb3duLnBhbFk7XG4gICAgICBpZiAoIWxlZnQgJiYgIXJpZ2h0KSB7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImRvd25cIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQSBrZXkgbW92ZW1lbnRcbiAgICBpZiAobGVmdCkge1xuICAgICAgaWYgKHVwIHx8IGRvd24gJiYgIXRoaXMuY29sbGlzaW9ucy5sZWZ0KSB7XG4gICAgICAgIHRoaXMucG9zWzBdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zWzBdICs9IC10aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUubGVmdC5wYWxZO1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwibGVmdFwiKTtcbiAgICB9XG5cbiAgICAvLyBEIGtleSBtb3ZlbWVudFxuICAgIGlmIChyaWdodCkge1xuICAgICAgaWYgKHVwIHx8IGRvd24pIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc1swXSArPSB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUucmlnaHQucGFsWTtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcInJpZ2h0XCIpO1xuICAgIH1cblxuICAgIC8vIGlmIG5vbmUgb2YgdGhlIGtleXMgYXJlIGJlaW5nIHByZXNzZWQsIGdvIHRvIGRlZmF1bHQgc3RhbmNlXG4gICAgaWYgKCF1cCAmJiAhZG93biAmJiAhcmlnaHQgJiYgIWxlZnQpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IDQ4ICogMTtcbiAgICB9XG5cbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGxldCBleGl0RGlyO1xuICAgIGlmICh4IDwgLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJsZWZ0XCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfSBlbHNlIGlmICh4ID4gNzIwLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJyaWdodFwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH0gZWxzZSBpZiAoeSA8IC0yNCkge1xuICAgICAgZXhpdERpciA9IFwidXBcIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9IGVsc2UgaWYgKHkgPiA3MjAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcImRvd25cIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9XG5cbiAgICBcblxuICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnggPSB0aGlzLnBvc1swXTtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnkgPSB0aGlzLnBvc1sxXTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCBXYWxsIGZyb20gXCIuL3dhbGxcIjtcbmltcG9ydCBDb2luIGZyb20gXCIuL2NvaW5cIjtcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9lbmVteVwiO1xuXG5pbXBvcnQge1xuICByYW5kTnVtUGF0aHMsXG4gIGFkZFZhbGlkTmVpZ2hib3JzLFxuICBidWlsZFBhdGhzLFxuICBzaHVmZmxlLFxuICBhc3NpZ25CbG9ja2VkUGF0aHMsXG4gIHJhbmROdW1Db2luc1xufSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cblxuY2xhc3MgUm9vbSB7XG4gIGNvbnN0cnVjdG9yKG5laWdoYm9yKSB7XG4gICAgdGhpcy5nZW5lcmF0ZUNvaW5zKCk7XG4gICAgdGhpcy53YWxscyA9IFtdO1xuICAgIGxldCByYW5kSWR4O1xuICAgIHRoaXMubmVpZ2hib3JzID0ge1xuICAgICAgdXA6IHVuZGVmaW5lZCxcbiAgICAgIGRvd246IHVuZGVmaW5lZCxcbiAgICAgIGxlZnQ6IHVuZGVmaW5lZCxcbiAgICAgIHJpZ2h0OiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICBsZXQgZW50cnlEaXI7XG4gICAgaWYgKG5laWdoYm9yKSB7XG4gICAgICBjb25zdCBleGl0RGlyID0gT2JqZWN0LmtleXMobmVpZ2hib3IpWzBdO1xuICAgICAgY29uc3QgcHJldlJvb20gPSBPYmplY3QudmFsdWVzKG5laWdoYm9yKVswXTtcbiAgICAgIHRoaXMubm9kZVBvcyA9IFsuLi5wcmV2Um9vbS5ub2RlUG9zXTtcbiAgICAgIHN3aXRjaChleGl0RGlyKSB7XG4gICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgIHRoaXMubmVpZ2hib3JzLmRvd24gPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiRFwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1sxXSsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgIHRoaXMubmVpZ2hib3JzLnVwID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIlVcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMV0tLTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5yaWdodCA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJSXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzBdLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgIHRoaXMubmVpZ2hib3JzLmxlZnQgPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiTFwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1swXSsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vZGVQb3MgPSBbMCwwXTtcbiAgICB9XG4gICAgXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7dGhpcy5ub2RlUG9zfWBdID0gdGhpcztcblxuICAgIGFkZFZhbGlkTmVpZ2hib3JzKHRoaXMpO1xuICAgIGxldCB3YWxscywgbnVtUGF0aHMsIHJhbmRQYXRocztcbiAgICBsZXQgbmV3UGF0aHMgPSBbXTtcbiAgICBsZXQgcGF0aHMgPSBidWlsZFBhdGhzKHRoaXMpO1xuICAgIGxldCBwYXRoc0FyciA9IHBhdGhzLnNwbGl0KFwiXCIpO1xuICAgIGlmIChuZWlnaGJvcikge1xuICAgICAgLy8gaWYgbm90IGluaXRpYWwgcm9vbVxuICAgICAgcGF0aHNBcnIgPSBwYXRoc0Fyci5maWx0ZXIocGF0aCA9PiBwYXRoICE9PSBlbnRyeURpcik7IC8vIHJlbW92ZSBlbnRyeURpciBmcm9tIHBhdGhzXG4gICAgICBudW1QYXRocyA9IHJhbmROdW1QYXRocyhwYXRocy5sZW5ndGgpOyAvLyB3ZWlnaHRlZCByYW5kb20gbnVtYmVyIGdlbmVyYXRvciwgcHJlZmVycyBtb3JlIHBhdGhzXG4gICAgICBpZiAobnVtUGF0aHMgPT09IHBhdGhzLmxlbmd0aCkgeyAvLyBpZiBhbGwgNCBwYXRocyBhcmUgYXZhaWxhYmxlXG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzfSR7cGF0aHN9JHtyYW5kSWR4fWBdO1xuICAgICAgICBhc3NpZ25CbG9ja2VkUGF0aHModGhpcywgcGF0aHMpO1xuICAgICAgICB3YWxscyA9IHRoaXMuYnVpbGRSb29tV2FsbHMocGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfSBlbHNlIHsgLy8gbGVzcyB0aGFuIDQgcGF0aHMgYXZhaWxhYmxlXG4gICAgICAgIHNodWZmbGUocGF0aHNBcnIpOyAvLyByYW5kb21pemUgdGhlIHBhdGggY2hvaWNlc1xuICAgICAgICBuZXdQYXRocy5wdXNoKGVudHJ5RGlyKTsgLy8gTVVTVCBBTFdBWVMgaGF2ZSB0aGUgcGF0aCB5b3UgZW50ZXIgZnJvbVxuICAgICAgICBudW1QYXRocy0tO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVBhdGhzOyBpKyspIHsgbmV3UGF0aHMucHVzaChwYXRoc0Fyci5wb3AoKSkgfVxuICAgICAgICBuZXdQYXRocyA9IG5ld1BhdGhzLnNvcnQoKS5qb2luKFwiXCIpO1xuICAgICAgICByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBHbG9iYWwuQkdfSU1HU1tgJHtudW1QYXRocysxfSR7bmV3UGF0aHN9JHtyYW5kSWR4fWBdO1xuICAgICAgICBpZiAoIXRoaXMuYmFja2dyb3VuZCkge1xuICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBuZXdQYXRocyk7XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhuZXdQYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bVBhdGhzID0gcmFuZE51bVBhdGhzKHBhdGhzLmxlbmd0aCk7XG4gICAgICBpZiAobnVtUGF0aHMgPT09IHBhdGhzLmxlbmd0aCkge1xuICAgICAgICByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBHbG9iYWwuQkdfSU1HU1tgJHtudW1QYXRoc30ke3BhdGhzfSR7cmFuZElkeH1gXTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKHBhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7dGhpcy5ub2RlUG9zfWBdID0gdGhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNodWZmbGUocGF0aHNBcnIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVBhdGhzOyBpKyspIHsgbmV3UGF0aHMucHVzaChwYXRoc0Fyci5wb3AoKSkgfVxuICAgICAgICBuZXdQYXRocyA9IG5ld1BhdGhzLnNvcnQoKS5qb2luKFwiXCIpO1xuICAgICAgICByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBHbG9iYWwuQkdfSU1HU1tgJHtudW1QYXRoc30ke25ld1BhdGhzfSR7cmFuZElkeH1gXTtcbiAgICAgICAgYXNzaWduQmxvY2tlZFBhdGhzKHRoaXMsIG5ld1BhdGhzKTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKG5ld1BhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7dGhpcy5ub2RlUG9zfWBdID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5nZW5lcmF0ZUVuZW1pZXMoKTtcbiAgICAvLyB0aGlzLmFuaW1hdGVkT2JqZWN0cyA9IHt9O1xuICAgIC8vIE9iamVjdC52YWx1ZXModGhpcy5jb2lucykuZm9yRWFjaChjb2luID0+IHtcbiAgICAvLyAgIHRoaXMuYW5pbWF0ZWRPYmplY3RzW2Bjb2luLSR7Y29pbi5wb3N9YF0gPSBjb2luO1xuICAgIC8vIH0pO1xuXG4gIH1cblxuICBnZW5lcmF0ZUVuZW1pZXMoKSB7XG4gICAgY29uc3QgbnVtRW5lbWllcyA9IE1hdGguZmxvb3IoT2JqZWN0LmtleXMoR2xvYmFsLlNFU1NJT04ucm9vbXMpLmxlbmd0aC8yKTtcbiAgICB0aGlzLmVuZW1pZXMgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUVuZW1pZXM7IGkrKykge1xuICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTUwKSArIDY0O1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTUwKSArIDY0O1xuICAgICAgbGV0IHBvcyA9IFt4LHldO1xuICAgICAgY29uc3QgZW5lbXkgPSBuZXcgRW5lbXkocG9zLCA0OCw0OCxHbG9iYWwuU1BSSVRFUy5tb25zdGVycywgXCJibG9iXCIsIDIwMCArIChudW1FbmVtaWVzICogNTApKTtcbiAgICAgIHRoaXMuZW5lbWllc1tgJHtlbmVteS5wb3N9YF0gPSBlbmVteTtcbiAgICB9XG4gIH07XG5cbiAgZ2VuZXJhdGVDb2lucygpIHtcbiAgICBjb25zdCBudW1Db2lucyA9IHJhbmROdW1Db2lucygpO1xuICAgIHRoaXMuY29pbnMgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvaW5zOyBpKyspIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIHdoaWxlICh4ID4gMzM2ICYmIHggPCAzODQpIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgd2hpbGUgKHkgPiAzMzYgJiYgeSA8IDM4NCkgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICBsZXQgcG9zID0gW3gseV07XG4gICAgICBjb25zdCBjb2luID0gbmV3IENvaW4ocG9zLCAxNiwxNixHbG9iYWwuU1BSSVRFUy5jb2luKTtcbiAgICAgIHRoaXMuY29pbnNbYCR7Y29pbi5wb3N9YF0gPSBjb2luO1xuICAgIH1cbiAgfTtcblxuICBhbmltYXRlKCkge1xuICAgIHRoaXMuY29sbGVjdCgpO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5jb2lucykuZm9yRWFjaChjb2luID0+IHtcbiAgICAgIGNvaW4uYW5pbWF0ZSgpO1xuICAgIH0pO1xuICAgIC8vIE9iamVjdC52YWx1ZXModGhpcy5hbmltYXRlZE9iamVjdHMpLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5hbmltYXRlKCkpO1xuXG4gIH1cblxuICBjb2xsZWN0KCkge1xuICAgIGZvciAobGV0IGNvaW4gb2YgT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKSkge1xuICAgICAgaWYgKGNvaW4uY29sbGVjdCgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvaW5zW2Ake2NvaW4ucG9zfWBdO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5jb2luQ291bnQrKztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZCwgMCwgMCk7XG4gICAgLy8gdGhpcy53YWxscy5mb3JFYWNoKHdhbGwgPT4gd2FsbC5kcmF3KGN0eCkpO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5jb2lucykuZm9yRWFjaChjb2luID0+IGNvaW4uZHJhdyhjdHgpKTtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuZW5lbWllcykuZm9yRWFjaChlbmVteSA9PiBlbmVteS5kcmF3KGN0eCkpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZhZjRcIjtcbiAgICBjdHguZm9udCA9IFwiMjBweCBhcmlhbFwiO1xuICAgIGN0eC5maWxsVGV4dChgUm9vbSBbICR7dGhpcy5ub2RlUG9zfSBdYCwgMTUsIDMwKTtcbiAgICBjdHguZmlsbFRleHQoYENvaW5zIHggJHtHbG9iYWwuU0VTU0lPTi5jb2luQ291bnR9YCwgNTkwLCAzMCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZiYjAwXCI7XG4gICAgY3R4Lm1vdmVUbygxNSwgNzA1KTtcbiAgICBjdHgubGluZVdpZHRoID0gNTtcbiAgICBjdHgubGluZVRvKDE1ICsgKEdsb2JhbC5TRVNTSU9OLnBsYXllci5zdGFtaW5hLzEwMDApICogMTAwLCA3MDUpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMzM2ZmMDBcIjtcbiAgICBjdHgubW92ZVRvKDE1LCA2OTApO1xuICAgIGN0eC5saW5lV2lkdGggPSAxMDtcbiAgICBjdHgubGluZVRvKDE1ICsgKEdsb2JhbC5TRVNTSU9OLnBsYXllci5ocC8yMCkgKiAxMDAsIDY5MCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmMDAwMFwiO1xuICAgIGN0eC5tb3ZlVG8oMTE1IC0gKDEgLSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuaHAvMjApICogMTAwLCA2OTApO1xuICAgIGN0eC5saW5lV2lkdGggPSAxMDtcbiAgICBjdHgubGluZVRvKDExNSwgNjkwKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDBkZGRkXCI7XG4gICAgY3R4Lm1vdmVUbygxNSwgNjk5KTtcbiAgICBjdHgubGluZVdpZHRoID0gNTtcbiAgICBjdHgubGluZVRvKDE1ICsgKEdsb2JhbC5TRVNTSU9OLnBsYXllci5pbnZ1bG5lcmFibGUvNzUpICogMTAwLCA2OTkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyBjdHguZmlsbFRleHQoYFN0YW1pbmEgPSAke0dsb2JhbC5TRVNTSU9OLnBsYXllci5zdGFtaW5hfWAsIDE1LCA0MDApO1xuICB9XG5cbiAgYnVpbGRSb29tV2FsbHMocGF0aHMpIHtcbiAgICBsZXQgd2FsbHMgPSBbXTtcbiAgICBzd2l0Y2gocGF0aHMpIHtcbiAgICAgIGNhc2UgXCJETFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxSVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRSVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRExSXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRExcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgIH1cbiAgfVxuXG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBSb29tOyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4uL3Jvb21cIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9nYW1lXCI7XG5cblxuZXhwb3J0IGNvbnN0IG5ld0dhbWUgPSAoKSA9PiB7XG4gIGlmIChHbG9iYWwuU0VTU0lPTi5nYW1lKSB7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5yZXF1ZXN0U3RvcCA9IHRydWU7XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wiZ2FtZVwiXTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT05bXCJwbGF5ZXJcIl07XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wiY29pbkNvdW50XCJdO1xuICAgIGRlbGV0ZSBHbG9iYWwuU0VTU0lPTltcInJvb21zXCJdO1xuICB9XG4gIG5ldyBHYW1lKC4uLk9iamVjdC52YWx1ZXMoR2xvYmFsLkdBTUVfT1BUSU9OUykpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbGxpZGVkV2l0aFNpZGUgPSAoc2lkZSwgdGhpc1NpZGUsIG90aGVyU2lkZSkgPT4ge1xuICBsZXQgY29sbGlkZWQgPSBmYWxzZTtcbiAgbGV0IHVwcGVyRGlmZiwgbG93ZXJEaWZmO1xuICBjb25zdCB1cHBlckJvdW5kcyA9IDEwO1xuICBjb25zdCBsb3dlckJvdW5kcyA9IDA7XG4gIGlmIChzaWRlID09PSBcInRvcFwiIHx8IHNpZGUgPT09IFwiYm90dG9tXCIpIHtcbiAgICBjb25zdCB0aGlzWVZhbCA9IHRoaXNTaWRlWzFdO1xuICAgIGNvbnN0IFt0aGlzWE1pbiwgdGhpc1hNYXhdID0gdGhpc1NpZGVbMF07XG4gICAgY29uc3Qgb3RoZXJZVmFsID0gb3RoZXJTaWRlWzFdO1xuICAgIGNvbnN0IFtvdGhlclhNaW4sIG90aGVyWE1heF0gPSBvdGhlclNpZGVbMF07XG4gICAgXG4gICAgc3dpdGNoIChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIHVwcGVyRGlmZiA9IChvdGhlcllWYWwgLSB0aGlzWVZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKG90aGVyWVZhbCAtIHRoaXNZVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWVZhbCA8IG90aGVyWVZhbCkgJiZcbiAgICAgICAgICAodGhpc1hNaW4gPCBvdGhlclhNYXgpICYmXG4gICAgICAgICAgKHRoaXNYTWF4ID4gb3RoZXJYTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICB1cHBlckRpZmYgPSAodGhpc1lWYWwgLSBvdGhlcllWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9ICh0aGlzWVZhbCAtIG90aGVyWVZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1lWYWwgPiBvdGhlcllWYWwpICYmXG4gICAgICAgICAgKHRoaXNYTWluIDwgb3RoZXJYTWF4KSAmJlxuICAgICAgICAgICh0aGlzWE1heCA+IG90aGVyWE1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2xsaWRlZCkgcmV0dXJuIG90aGVyWVZhbDtcblxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHRoaXNYVmFsID0gdGhpc1NpZGVbMF07XG4gICAgY29uc3QgW3RoaXNZTWluLCB0aGlzWU1heF0gPSB0aGlzU2lkZVsxXTtcbiAgICBjb25zdCBvdGhlclhWYWwgPSBvdGhlclNpZGVbMF07XG4gICAgY29uc3QgW290aGVyWU1pbiwgb3RoZXJZTWF4XSA9IG90aGVyU2lkZVsxXTtcbiAgICBcbiAgICBzd2l0Y2ggKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHVwcGVyRGlmZiA9IChvdGhlclhWYWwgLSB0aGlzWFZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKG90aGVyWFZhbCAtIHRoaXNYVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWFZhbCA8IG90aGVyWFZhbCkgJiZcbiAgICAgICAgICAodGhpc1lNaW4gPCBvdGhlcllNYXgpICYmXG4gICAgICAgICAgKHRoaXNZTWF4ID4gb3RoZXJZTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKHRoaXNYVmFsIC0gb3RoZXJYVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAodGhpc1hWYWwgLSBvdGhlclhWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNYVmFsID4gb3RoZXJYVmFsKSAmJlxuICAgICAgICAgICh0aGlzWU1pbiA8IG90aGVyWU1heCkgJiZcbiAgICAgICAgICAodGhpc1lNYXggPiBvdGhlcllNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2xsaWRlZCkgcmV0dXJuIG90aGVyWFZhbDtcbiAgICBcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcblxufTtcblxuZXhwb3J0IGNvbnN0IHJvb21DaGFuZ2UgPSAoZXhpdERpciwgY3VyclJvb20pID0+IHtcbiAgbGV0IG5leHROb2RlUG9zID0gWy4uLmN1cnJSb29tLm5vZGVQb3NdO1xuICBzd2l0Y2goZXhpdERpcikge1xuICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMV0gKz0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICBuZXh0Tm9kZVBvc1sxXSAtPSAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIG5leHROb2RlUG9zWzBdIC09IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgIG5leHROb2RlUG9zWzBdICs9IDE7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7bmV4dE5vZGVQb3N9YF0pIHtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20gPSBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHtuZXh0Tm9kZVBvc31gXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBuZWlnaGJvciA9IHsgW2V4aXREaXJdOiBjdXJyUm9vbSB9O1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSA9IG5ldyBSb29tKG5laWdoYm9yKTtcbiAgICBhZGRWYWxpZE5laWdoYm9ycyhjdXJyUm9vbSk7XG4gICAgYWRkVmFsaWROZWlnaGJvcnMoR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJhbmROdW1QYXRocyA9IG1heCA9PiB7XG4gIGxldCBwYXRocyA9IFtdO1xuICBpZiAobWF4ID4gMykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVs0XTsgaSsrKSB7IHBhdGhzLnB1c2goNCkgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVszXTsgaSsrKSB7IHBhdGhzLnB1c2goMykgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsyXTsgaSsrKSB7IHBhdGhzLnB1c2goMikgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsxXTsgaSsrKSB7IHBhdGhzLnB1c2goMSkgfVxuICB9IGVsc2UgaWYgKG1heCA+IDIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bM107IGkrKykgeyBwYXRocy5wdXNoKDMpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMl07IGkrKykgeyBwYXRocy5wdXNoKDIpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMV07IGkrKykgeyBwYXRocy5wdXNoKDEpIH1cbiAgfSBlbHNlIGlmIChtYXggPiAxKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzJdOyBpKyspIHsgcGF0aHMucHVzaCgyKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzFdOyBpKyspIHsgcGF0aHMucHVzaCgxKSB9XG4gIH0gZWxzZSB7XG4gICAgcGF0aHMucHVzaCgxKTtcbiAgfVxuXG4gIHNodWZmbGUocGF0aHMpO1xuXG4gIHJldHVybiBwYXRoc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcGF0aHMubGVuZ3RoKV07XG4gIFxufTtcblxuZXhwb3J0IGNvbnN0IGFkZFZhbGlkTmVpZ2hib3JzID0gcm9vbSA9PiB7XG4gIGxldCB1cCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICB1cFsxXSArPSAxO1xuICB1cCA9IHVwLnRvU3RyaW5nKCk7XG4gIGxldCBkb3duID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGRvd25bMV0gLT0gMTtcbiAgZG93biA9IGRvd24udG9TdHJpbmcoKTtcbiAgbGV0IGxlZnQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgbGVmdFswXSAtPSAxO1xuICBsZWZ0ID0gbGVmdC50b1N0cmluZygpO1xuICBsZXQgcmlnaHQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgcmlnaHRbMF0gKz0gMTtcbiAgcmlnaHQgPSByaWdodC50b1N0cmluZygpO1xuICBpZiAoXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdICYmIFxuICAgIChHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0ubmVpZ2hib3JzLmRvd24gIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMudXBcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMudXAgPSBHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF07XG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdLm5laWdoYm9ycy5kb3duID0gcm9vbTtcbiAgfVxuICBpZiAoXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl0gJiYgXG4gICAgKEdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dLm5laWdoYm9ycy51cCAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy5kb3duXG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLmRvd24gPSBHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXTtcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXS5uZWlnaGJvcnMudXAgPSByb29tO1xuICB9XG4gIGlmIChcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XSAmJiBcbiAgICAoR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF0ubmVpZ2hib3JzLnJpZ2h0ICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLmxlZnRcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMubGVmdCA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdO1xuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdLm5laWdoYm9ycy5yaWdodCA9IHJvb207XG4gIH1cbiAgaWYgKFxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XSAmJiBcbiAgICAoR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdLm5laWdoYm9ycy5sZWZ0ICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLnJpZ2h0XG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLnJpZ2h0ID0gR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdO1xuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XS5uZWlnaGJvcnMubGVmdCA9IHJvb207XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZFBhdGhzID0gcm9vbSA9PiB7XG4gIGxldCBwYXRocyA9IFtdO1xuICBsZXQgdXAgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgdXBbMV0gKz0gMTtcbiAgdXAgPSB1cC50b1N0cmluZygpO1xuICBsZXQgZG93biA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBkb3duWzFdIC09IDE7XG4gIGRvd24gPSBkb3duLnRvU3RyaW5nKCk7XG4gIGxldCBsZWZ0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGxlZnRbMF0gLT0gMTtcbiAgbGVmdCA9IGxlZnQudG9TdHJpbmcoKTtcbiAgbGV0IHJpZ2h0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHJpZ2h0WzBdICs9IDE7XG4gIHJpZ2h0ID0gcmlnaHQudG9TdHJpbmcoKTtcbiAgaWYgKCFHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0gfHwgKEdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXS5uZWlnaGJvcnMuZG93biAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIlVcIik7XG4gIH1cbiAgaWYgKCFHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXSB8fCAoR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl0ubmVpZ2hib3JzLnVwICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiRFwiKTtcbiAgfVxuICBpZiAoIUdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdIHx8IChHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XS5uZWlnaGJvcnMucmlnaHQgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJMXCIpO1xuICB9XG4gIGlmICghR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdIHx8IChHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF0ubmVpZ2hib3JzLmxlZnQgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJSXCIpO1xuICB9XG4gIHJldHVybiBwYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25CbG9ja2VkUGF0aHMgPSAocm9vbSwgcGF0aHMpID0+IHtcbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIlVcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy51cCA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJEXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMuZG93biA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJMXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMubGVmdCA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJSXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMucmlnaHQgPSBcIlhcIjtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJhbmROdW1Db2lucyA9ICgpID0+IHtcbiAgbGV0IHdlaWdodGVkTnVtQ29pbnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzNdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDMpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzJdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDIpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzFdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDEpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzBdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDApIH1cbiAgY29uc3QgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdlaWdodGVkTnVtQ29pbnMubGVuZ3RoKTtcbiAgc2h1ZmZsZSh3ZWlnaHRlZE51bUNvaW5zKTtcbiAgcmV0dXJuIHdlaWdodGVkTnVtQ29pbnNbcmFuZElkeF07XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZENvaW5Tb3VuZCA9ICgpID0+IHtcbiAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvaW4ke2l9YCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2h1ZmZsZSA9IGFyciA9PiB7XG4gIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgW2FycltpXSwgYXJyW2pdXSA9IFthcnJbal0sIGFycltpXV07XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVkTW92ZW1lbnQgPSAobXlzZWxmLCBlbnRpdHksIGNoYXNpbmdQbGF5ZXIpID0+IHsgXG4gIGNvbnN0IG14ID0gbXlzZWxmLmNlbnRlclswXTtcbiAgY29uc3QgbXkgPSBteXNlbGYuY2VudGVyWzFdO1xuICBjb25zdCBleCA9IGVudGl0eS5jZW50ZXJbMF07XG4gIGNvbnN0IGV5ID0gZW50aXR5LmNlbnRlclsxXTtcbiAgbGV0IGR4ID0gbXggLSBleDtcbiAgbGV0IGR5ID0gbXkgLSBleTtcbiAgXG4gIGlmICghY2hhc2luZ1BsYXllcikge1xuICAgIGNvbnN0IHJhbmRBbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAyICogTWF0aC5QSTtcbiAgICBkeCA9IE1hdGguY29zKHJhbmRBbmdsZSkgKiBteXNlbGYuc3BlZWQ7XG4gICAgZHkgPSBNYXRoLnNpbihyYW5kQW5nbGUpICogbXlzZWxmLnNwZWVkO1xuICB9XG4gIFxuICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbihkeS9keCk7XG4gIGNvbnN0IG55ID0gTWF0aC5zaW4oYW5nbGUpICogbXlzZWxmLnNwZWVkO1xuICBjb25zdCBueCA9IE1hdGguY29zKGFuZ2xlKSAqIG15c2VsZi5zcGVlZDtcblxuICByZXR1cm4ge1xuICAgIGR4LFxuICAgIGR5LFxuICAgIG54LFxuICAgIG55LFxuICAgIHVwOiAoZHkgPiAwKSAmJiAoTWF0aC5hYnMoZHkpID4gTWF0aC5hYnMoZHgpKSxcbiAgICBkb3duOiAoZHkgPCAwKSAmJiAoTWF0aC5hYnMoZHkpID4gTWF0aC5hYnMoZHgpKSxcbiAgICBsZWZ0OiAoZHggPiAwKSAmJiAoTWF0aC5hYnMoZHgpID4gTWF0aC5hYnMoZHkpKSxcbiAgICByaWdodDogKGR4IDwgMCkgJiYgKE1hdGguYWJzKGR4KSA+IE1hdGguYWJzKGR5KSksXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZGlzdGFuY2VUb1BsYXllciA9IChteXNlbGYsIHBsYXllcikgPT4ge1xuICBjb25zdCBteCA9IG15c2VsZi5jZW50ZXJbMF07XG4gIGNvbnN0IG15ID0gbXlzZWxmLmNlbnRlclsxXTtcbiAgY29uc3QgcHggPSBwbGF5ZXIuY2VudGVyWzBdO1xuICBjb25zdCBweSA9IHBsYXllci5jZW50ZXJbMV07XG4gIGxldCBkeCA9IHB4IC0gbXg7XG4gIGxldCBkeSA9IHB5IC0gbXk7XG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coZHgsIDIpICsgTWF0aC5wb3coZHksIDIpKTtcbn07IiwiZXhwb3J0IGNvbnN0IFdJRFRIID0gNzIwO1xuZXhwb3J0IGNvbnN0IEhFSUdIVCA9IDcyMDtcbmV4cG9ydCBjb25zdCBTUFJJVEVfRElNUyA9IFs0OCw0OF07XG5leHBvcnQgY29uc3QgRlBTID0gMTAwMC82MDtcbmV4cG9ydCBjb25zdCBLRVlTID0ge1xuICA4NzogZmFsc2UsIC8vIFdcbiAgNjU6IGZhbHNlLCAvLyBBXG4gIDgzOiBmYWxzZSwgLy8gU1xuICA2ODogZmFsc2UsIC8vIERcbiAgMTY6IGZhbHNlLCAvLyBMLVNoaWZ0XG59O1xuZXhwb3J0IGNvbnN0IEZPTlQgPSB7fTtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT04gPSB7fTtcbmV4cG9ydCBjb25zdCBTUFJJVEVTID0ge307XG5leHBvcnQgY29uc3QgQkdfSU1HUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgQ09JTl9XRUlHSFRTID0ge1xuICAzOiAyLFxuICAyOiA4LFxuICAxOiAzMCxcbiAgMDogNTAsIFxufTtcblxuZXhwb3J0IGNvbnN0IEFMTF9QQVRIUyA9IFtcbiAgXCJETFJVXCIsXG4gIFwiRExSXCIsXG4gIFwiRExVXCIsXG4gIFwiTFJVXCIsXG4gIFwiRFJVXCIsXG4gIFwiRExcIixcbiAgXCJEUlwiLFxuICBcIkRVXCIsXG4gIFwiTFJcIixcbiAgXCJMVVwiLFxuICBcIlJVXCIsXG4gIFwiRFwiLFxuICBcIkxcIixcbiAgXCJSXCIsXG4gIFwiVVwiLFxuXTtcblxuZXhwb3J0IGNvbnN0IFdFSUdIVFMgPSB7XG4gIDQ6IHtcbiAgICA0OiA1NSxcbiAgICAzOiA0NSxcbiAgICAyOiA5LFxuICAgIDE6IDEsXG4gIH0sXG4gIDM6IHtcbiAgICAzOiA4MCxcbiAgICAyOiAyMCxcbiAgICAxOiAzLFxuICB9LFxuICAyOiB7XG4gICAgMjogOTAsXG4gICAgMTogMTAsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgR0FNRV9PUFRJT05TID0ge307XG5leHBvcnQgY29uc3QgUkVRVUVTVCA9IHt9OyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2dhbWVcIjtcbmltcG9ydCB7IG5ld0dhbWUgfSBmcm9tIFwiLi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoS0VZUykgPT4ge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcbiAgICBkZWJ1Z2dlclxuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcIndcIiAmJiAhS0VZU1tcIndcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImFcIiAmJiAhS0VZU1tcImFcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcInNcIiAmJiAhS0VZU1tcInNcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImRcIiAmJiAhS0VZU1tcImRcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleSA9PT0gXCJTaGlmdFwiICYmICFLRVlTW1wiU2hpZnRcIl0pIEtFWVNbZS5rZXldID0gdHJ1ZTtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiAhS0VZU1tcIkVudGVyXCJdKSBLRVlTW2Uua2V5XSA9IHRydWU7XG5cbiAgfSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJ3XCIgJiYgS0VZU1tcIndcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJhXCIgJiYgS0VZU1tcImFcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJzXCIgJiYgS0VZU1tcInNcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJkXCIgJiYgS0VZU1tcImRcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIiAmJiBLRVlTW1wiU2hpZnRcIl0pIEtFWVNbZS5rZXldID0gZmFsc2U7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgJiYgS0VZU1tcIkVudGVyXCJdKSBLRVlTW2Uua2V5XSA9IGZhbHNlO1xuICB9KTtcblxuICBjb25zdCBob3dUbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpO1xuICBcbiAgaG93VG8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tcG9pbnRlclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvLXNvdW5kXCIpLnBsYXkoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10b1wiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG93LXRvID4gdWxcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIGhvd1RvLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tcG9pbnRlclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG93LXRvID4gdWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKTtcbiAgcmVzdGFydC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnQtc291bmRcIikucGxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1wb2ludGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1wb2ludGVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbmV3R2FtZSgpO1xuICB9KTtcblxufVxuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3RoaXMud2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt0aGlzLndpZHRoLHkrdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K3RoaXMuaGVpZ2h0XTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiN0cmFuc3BhcmVudFwiO1xuICAgIGN0eC5maWxsUmVjdCguLi50aGlzLnBvcywgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBpbnN0YWxsTGlzdGVuZXJzIGZyb20gXCIuL3NjcmlwdHMvdXRpbHMvaW5zdGFsbF9saXN0ZW5lcnNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgR2FtZVN0YXJ0IGZyb20gXCIuL3NjcmlwdHMvZ2FtZV9zdGFydFwiO1xuXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKTtcbiAgY2FudmFzLndpZHRoID0gR2xvYmFsLldJRFRIO1xuICBjYW52YXMuaGVpZ2h0ID0gR2xvYmFsLkhFSUdIVDtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBpbnN0YWxsTGlzdGVuZXJzKEdsb2JhbC5LRVlTKTtcblxuICAvLyBsZXQgZm9udCA9IG5ldyBGb250RmFjZShcIlByZXNzIFN0YXJ0IDJQXCIsICd1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QcmVzcytTdGFydCsyUCZkaXNwbGF5PXN3YXApJyk7XG4gIC8vIGZvbnQubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAvLyAgIEdsb2JhbC5GT05UID0gZm9udDtcbiAgLy8gfSk7XG5cbiAgLy8gY29uc3QgZm9udCA9IG5ldyBGb250RmFjZShcIlByZXNzIFN0YXJ0IDJQXCIsICd1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QcmVzcytTdGFydCsyUCZkaXNwbGF5PXN3YXApJyk7XG4gIC8vIGZvbnQubG9hZCgpLnRoZW4oR2xvYmFsLkZPTlRbXCJmb250XCJdID0gZm9udCk7XG5cbiAgbGV0IGNvaW5TcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbiAgY29pblNwcml0ZS5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL2NvaW4vY29pbi5wbmdcIjtcbiAgY29pblNwcml0ZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgR2xvYmFsLlNQUklURVMuY29pbiA9IGNvaW5TcHJpdGU7XG4gIH07XG5cbiAgbGV0IG1vbnN0ZXJzU3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICBtb25zdGVyc1Nwcml0ZXMuc3JjID0gXCIuL2Rpc3QvYXNzZXRzL2ltYWdlcy9lbmVtaWVzL21vbnN0ZXJzLnBuZ1wiO1xuICBtb25zdGVyc1Nwcml0ZXMub25sb2FkID0gKCkgPT4ge1xuICAgIEdsb2JhbC5TUFJJVEVTLm1vbnN0ZXJzID0gbW9uc3RlcnNTcHJpdGVzO1xuICB9O1xuICBcbiAgZm9yIChsZXQgcGF0aCBvZiBHbG9iYWwuQUxMX1BBVEhTKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCJcIikuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGJhY2tncm91bmQuc3JjID0gYC4vZGlzdC9hc3NldHMvaW1hZ2VzL21hcF9pbWdzLyR7cGF0aC5sZW5ndGh9LyR7cGF0aH0vbWFwJHtpfS5wbmdgO1xuICAgICAgXG4gICAgICBiYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgR2xvYmFsLkJHX0lNR1NbYCR7cGF0aC5sZW5ndGh9JHtwYXRofSR7aX1gXSA9IGJhY2tncm91bmQ7XG4gICAgICAgIC8vIEdsb2JhbC5HQl9JTUdTW1wiNERMUlUwXCJdID0gYmFja2dyb3VuZFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBsZXQgcGxheWVyU3ByaXRlID0gbmV3IEltYWdlKCk7XG4gIHBsYXllclNwcml0ZS5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL3JvZ3VlL3JvZ3VlX3dhbGsucG5nXCI7XG4gIFxuICBwbGF5ZXJTcHJpdGUub25sb2FkID0gKCkgPT4ge1xuICAgIGxldCBnYW1lU3RhcnQgPSBuZXcgR2FtZVN0YXJ0KGN0eCwgcGxheWVyU3ByaXRlKTtcbiAgICBHbG9iYWwuR0FNRV9PUFRJT05TW1wiY3R4XCJdID0gY3R4O1xuICAgIEdsb2JhbC5HQU1FX09QVElPTlNbXCJwbGF5ZXJTcHJpdGVcIl0gPSBwbGF5ZXJTcHJpdGU7XG4gICAgZ2FtZVN0YXJ0LnByb21wdCgpO1xuICAgIFxuICB9XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=