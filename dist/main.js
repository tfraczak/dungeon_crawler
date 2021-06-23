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
    _this.speed = 1;
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
      return _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.coinCount > 9;
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
    key: "invulCheck",
    value: function invulCheck() {
      return Math.floor(this.invulnerable / 5) % 2 === 0;
    }
  }, {
    key: "hit",
    value: function hit() {
      this.invulnerable = 60;
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

      if (!shift && this.stamina < 1000) {
        if (!up && !down && !right && !left) {
          this.stamina += 2;
        } else {
          this.stamina += 1;
        }
      }

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

      if (!this.invulCheck()) {
        debugger;
        this.drawOptions.palX = 48 * 3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9jb2luLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2NvbGxpc2lvbl9ib3guanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW50aXR5LmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZ2FtZV9zdGFydC5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvcm9vbS5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9mdW5jX3V0aWxzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2luc3RhbGxfbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3dhbGwuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzPzg1NTkiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkVudGl0eSIsInBvcyIsIndpZHRoIiwiaGVpZ2h0Iiwic3ByaXRlUGFsZXR0ZSIsImNvbEJveFdpZHRoIiwiY29sQm94SGVpZ2h0IiwiZHJhd09wdGlvbnMiLCJpbWFnZSIsInBhbFgiLCJwYWxZIiwiX3NXaWR0aCIsIl9zSGVpZ2h0IiwieCIsInkiLCJfZFdpZHRoIiwiX2RIZWlnaHQiLCJjb2xCb3giLCJDb2xCb3giLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJjb2xsaXNpb25zIiwiY3giLCJjeSIsInVwZGF0ZVNpZGVzIiwic2lkZSIsIm90aGVyT2JqZWN0Iiwib3RoZXJTaWRlIiwiY29sbGlkZWRXaXRoU2lkZSIsImN0eCIsImRyYXdJbWFnZSIsIk9iamVjdCIsInZhbHVlcyIsImNlbnRlck9uRW50aXR5IiwiZHJhdyIsIkNvaW4iLCJmcmFtZUludGVydmFsIiwiZnJhbWVDb3VudCIsImNvbGxpZGVkT25TaWRlIiwiR2xvYmFsIiwicmFuZENvaW5Tb3VuZCIsInBsYXkiLCJpIiwiYyIsInciLCJlbnRpdHkiLCJvcmlnaW5Qb3MiLCJ0b3BMZWZ0IiwidG9wUmlnaHQiLCJib3R0b21SaWdodCIsImJvdHRvbUxlZnQiLCJjZW50ZXIiLCJzaWRlcyIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwic3Ryb2tlUmVjdCIsImV4IiwiZXkiLCJldyIsImVoIiwidHciLCJ0aCIsImNvbEJveEhvb2siLCJFbmVteSIsInR5cGUiLCJkZXRlY3REaXN0Iiwic3BlZWQiLCJzcGVlZE1vZGlmaWVyIiwicGFjZSIsImNoYXNpbmdQbGF5ZXIiLCJpZGxlQ291bnQiLCJpZGxlTWF4IiwibW92ZW1lbnQiLCJ1cCIsImRvd24iLCJwYWxYT2Zmc2V0Iiwic3RyaWRlIiwic3RlcENvdW50IiwiZGlyZWN0aW9uIiwibXgiLCJteSIsImR4IiwiZHkiLCJkaXN0IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJyYW5kQW5nbGUiLCJyYW5kb20iLCJQSSIsImNvcyIsInNpbiIsImFuZ2xlIiwiYXRhbiIsIm55IiwibngiLCJhYnMiLCJzcHJpdGVEaXIiLCJmbG9vciIsIndhbGxzIiwicGxheWVyIiwiZGlzdFRvUGxheWVyIiwid2FsbENoZWNrIiwiaHAiLCJkYW1hZ2UiLCJoaXQiLCJ3YWxsIiwibmV3VmVjdG9ycyIsIm5vcm1hbGl6ZWRWZWN0b3JQb3MiLCJzdHJpZGVQYWxldHRlUG9zIiwiaGl0UGxheWVyIiwiR2FtZSIsInBsYXllclNwcml0ZSIsImZwc0ludGVydmFsIiwidG9QbGF5ZXIiLCJzdGFydGluZ1BvcyIsIlBsYXllciIsInN0YXJ0aW5nUm9vbSIsIlJvb20iLCJyb29tIiwiZ2FtZVN0ZXAiLCJiaW5kIiwic3RvcCIsIndpbiIsImxvc2UiLCJnYW1lT3ZlciIsInJlcXVlc3RTdG9wIiwicmVxdWVzdElkIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibm93IiwiRGF0ZSIsImVsYXBzZWQiLCJ0aGVuIiwiY2xlYXJSZWN0IiwibW92ZSIsImVuZW1pZXMiLCJmb3JFYWNoIiwiZW5lbXkiLCJhbmltYXRlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJmb250RmFtaWx5IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJHYW1lU3RhcnQiLCJ0aGV0YSIsInN0ZXAiLCJyZWQiLCJncmVlbiIsImJsdWUiLCJjb2xvciIsInJlc3RhcnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlQXR0cmlidXRlIiwibmV3R2FtZSIsIm5vcm1hbGl6ZWRTcGVlZCIsInBhcnNlRmxvYXQiLCJzdGFtaW5hIiwiaW52dWxuZXJhYmxlIiwiZGlyIiwic2hpZnQiLCJpbnZ1bHZlcmFibGUiLCJleGl0RGlyIiwibmV3Um9vbVBvcyIsInJvb21DaGFuZ2UiLCJpbnZ1bENoZWNrIiwibmVpZ2hib3IiLCJnZW5lcmF0ZUNvaW5zIiwicmFuZElkeCIsIm5laWdoYm9ycyIsInVuZGVmaW5lZCIsImVudHJ5RGlyIiwia2V5cyIsInByZXZSb29tIiwibm9kZVBvcyIsImFkZFZhbGlkTmVpZ2hib3JzIiwibnVtUGF0aHMiLCJyYW5kUGF0aHMiLCJuZXdQYXRocyIsInBhdGhzIiwiYnVpbGRQYXRocyIsInBhdGhzQXJyIiwic3BsaXQiLCJmaWx0ZXIiLCJwYXRoIiwicmFuZE51bVBhdGhzIiwibGVuZ3RoIiwiYmFja2dyb3VuZCIsImFzc2lnbkJsb2NrZWRQYXRocyIsImJ1aWxkUm9vbVdhbGxzIiwicHVzaCIsInNodWZmbGUiLCJwb3AiLCJzb3J0Iiwiam9pbiIsImdlbmVyYXRlRW5lbWllcyIsIm51bUVuZW1pZXMiLCJudW1Db2lucyIsInJhbmROdW1Db2lucyIsImNvaW5zIiwiY29pbiIsImNvbGxlY3QiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJXYWxsIiwidGhpc1NpZGUiLCJjb2xsaWRlZCIsInVwcGVyRGlmZiIsImxvd2VyRGlmZiIsInVwcGVyQm91bmRzIiwibG93ZXJCb3VuZHMiLCJ0aGlzWVZhbCIsInRoaXNYTWluIiwidGhpc1hNYXgiLCJvdGhlcllWYWwiLCJvdGhlclhNaW4iLCJvdGhlclhNYXgiLCJ0aGlzWFZhbCIsInRoaXNZTWluIiwidGhpc1lNYXgiLCJvdGhlclhWYWwiLCJvdGhlcllNaW4iLCJvdGhlcllNYXgiLCJjdXJyUm9vbSIsIm5leHROb2RlUG9zIiwibWF4IiwidG9TdHJpbmciLCJpbmNsdWRlcyIsIndlaWdodGVkTnVtQ29pbnMiLCJhcnIiLCJqIiwibm9ybWFsaXplZE1vdmVtZW50IiwibXlzZWxmIiwiZGlzdGFuY2VUb1BsYXllciIsInB4IiwicHkiLCJXSURUSCIsIkhFSUdIVCIsIlNQUklURV9ESU1TIiwiRlBTIiwiS0VZUyIsIkZPTlQiLCJTRVNTSU9OIiwiU1BSSVRFUyIsIkJHX0lNR1MiLCJDT0lOX1dFSUdIVFMiLCJBTExfUEFUSFMiLCJXRUlHSFRTIiwiR0FNRV9PUFRJT05TIiwiUkVRVUVTVCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5IiwidG9Mb3dlckNhc2UiLCJob3dUbyIsImNsYXNzTGlzdCIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmUiLCJwcmV2ZW50RGVmYXVsdCIsImNhbnZhcyIsImdldENvbnRleHQiLCJpbnN0YWxsTGlzdGVuZXJzIiwiY29pblNwcml0ZSIsIkltYWdlIiwic3JjIiwib25sb2FkIiwibW9uc3RlcnNTcHJpdGVzIiwiZ2FtZVN0YXJ0IiwicHJvbXB0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0NBRUE7O0lBRU1BLE07QUFDSixrQkFBWUMsR0FBWixFQUFnQkMsS0FBaEIsRUFBc0JDLE1BQXRCLEVBQTZCQyxhQUE3QixFQUE0QztBQUFBOztBQUMxQyxTQUFLSCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxRQUFNRSxXQUFXLEdBQUdILEtBQXBCO0FBQ0EsUUFBTUksWUFBWSxHQUFHSCxNQUFyQjtBQUVBLFNBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsU0FBS0csV0FBTCxHQUFtQjtBQUNqQkMsV0FBSyxFQUFFSixhQURVO0FBRWpCSyxVQUFJLEVBQUUsQ0FGVztBQUdqQkMsVUFBSSxFQUFFLENBSFc7QUFJakJDLGFBQU8sRUFBRVQsS0FKUTtBQUtqQlUsY0FBUSxFQUFFVCxNQUxPO0FBTWpCVSxPQUFDLEVBQUVaLEdBQUcsQ0FBQyxDQUFELENBTlc7QUFPakJhLE9BQUMsRUFBRWIsR0FBRyxDQUFDLENBQUQsQ0FQVztBQVFqQmMsYUFBTyxFQUFFYixLQVJRO0FBU2pCYyxjQUFRLEVBQUViO0FBVE8sS0FBbkI7QUFXQSxTQUFLYyxNQUFMLEdBQWMsSUFBSUMsbURBQUosQ0FBVyxJQUFYLEVBQWdCYixXQUFoQixFQUE0QkMsWUFBNUIsQ0FBZDtBQUNBLFNBQUthLEdBQUwsR0FBVyxLQUFLRixNQUFMLENBQVlFLEdBQXZCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEtBQUtILE1BQUwsQ0FBWUcsTUFBMUI7QUFDQSxTQUFLQyxJQUFMLEdBQVksS0FBS0osTUFBTCxDQUFZSSxJQUF4QjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLTCxNQUFMLENBQVlLLEtBQXpCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQjtBQUNoQkosU0FBRyxFQUFFLEtBRFc7QUFFaEJDLFlBQU0sRUFBRSxLQUZRO0FBR2hCQyxVQUFJLEVBQUUsS0FIVTtBQUloQkMsV0FBSyxFQUFFO0FBSlMsS0FBbEI7QUFPRDs7OztXQUVELHNCQUFhO0FBQUU7QUFDYixpQkFBWSxDQUFDLEtBQUtyQixHQUFMLENBQVMsQ0FBVCxDQUFELEVBQWEsS0FBS0EsR0FBTCxDQUFTLENBQVQsQ0FBYixDQUFaO0FBQUEsVUFBS1ksQ0FBTDtBQUFBLFVBQU9DLENBQVA7QUFDQSxVQUFLVSxFQUFMLEdBQ0VYLENBQUMsR0FBRSxDQUFDLEtBQUtYLEtBQUwsR0FBYSxLQUFLZSxNQUFMLENBQVlmLEtBQTFCLElBQWlDLENBRHRDO0FBQUEsVUFBUXVCLEVBQVIsR0FFRVgsQ0FBQyxJQUFFLEtBQUtYLE1BQUwsR0FBYyxLQUFLYyxNQUFMLENBQVlkLE1BQTVCLENBRkg7QUFJQSxhQUFPLENBQUNxQixFQUFELEVBQUlDLEVBQUosQ0FBUDtBQUNEOzs7V0FFRCx1QkFBYztBQUNaLFdBQUtSLE1BQUwsQ0FBWVMsV0FBWjtBQUNBLFdBQUtQLEdBQUwsR0FBVyxLQUFLRixNQUFMLENBQVlFLEdBQXZCO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLEtBQUtILE1BQUwsQ0FBWUcsTUFBMUI7QUFDQSxXQUFLQyxJQUFMLEdBQVksS0FBS0osTUFBTCxDQUFZSSxJQUF4QjtBQUNBLFdBQUtDLEtBQUwsR0FBYSxLQUFLTCxNQUFMLENBQVlLLEtBQXpCO0FBQ0Q7OztXQUVELHdCQUFlSyxJQUFmLEVBQXFCQyxXQUFyQixFQUFrQztBQUNoQyxVQUFJQyxTQUFKOztBQUNBLGNBQU9GLElBQVA7QUFDRSxhQUFLLEtBQUw7QUFDRUUsbUJBQVMsR0FBRyxRQUFaO0FBQ0E7O0FBQ0YsYUFBSyxRQUFMO0FBQ0VBLG1CQUFTLEdBQUcsS0FBWjtBQUNBOztBQUNGLGFBQUssTUFBTDtBQUNFQSxtQkFBUyxHQUFHLE9BQVo7QUFDQTs7QUFDRixhQUFLLE9BQUw7QUFDRUEsbUJBQVMsR0FBRyxNQUFaO0FBQ0E7O0FBQ0Y7QUFDRUEsbUJBQVMsR0FBRyxJQUFaO0FBQ0E7QUFmSjs7QUFpQkEsV0FBS04sVUFBTCxDQUFnQkksSUFBaEIsSUFBd0JHLG1FQUFnQixDQUFDSCxJQUFELEVBQU8sS0FBS0EsSUFBTCxDQUFQLEVBQW1CQyxXQUFXLENBQUNDLFNBQUQsQ0FBOUIsQ0FBeEM7QUFDQSxhQUFPLEtBQUtOLFVBQUwsQ0FBZ0JJLElBQWhCLENBQVA7QUFDRDs7O1dBRUQsY0FBS0ksR0FBTCxFQUFVO0FBQ1JBLFNBQUcsQ0FBQ0MsU0FBSixPQUFBRCxHQUFHLHFCQUFjRSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxLQUFLM0IsV0FBbkIsQ0FBZCxFQUFIO0FBQ0EsV0FBS1UsTUFBTCxDQUFZa0IsY0FBWjtBQUNBLFdBQUtsQixNQUFMLENBQVltQixJQUFaLENBQWlCTCxHQUFqQjtBQUNEOzs7Ozs7SUFHR00sSTs7Ozs7QUFDSixnQkFBWXBDLEdBQVosRUFBaUJDLEtBQWpCLEVBQXdCQyxNQUF4QixFQUFnQ0MsYUFBaEMsRUFBK0M7QUFBQTs7QUFBQTs7QUFDN0MsOEJBQU1ILEdBQU4sRUFBV0MsS0FBWCxFQUFrQkMsTUFBbEIsRUFBMEJDLGFBQTFCO0FBQ0EsVUFBS2tDLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS2hDLFdBQUwsQ0FBaUJHLElBQWpCLEdBQXdCLENBQXhCO0FBSjZDO0FBSzlDOzs7O1dBRUQsbUJBQVU7QUFDUixVQUNFLEtBQUs4QixjQUFMLENBQW9CLEtBQXBCLEVBQTJCQyxtRUFBM0IsS0FDQSxLQUFLRCxjQUFMLENBQW9CLFFBQXBCLEVBQThCQyxtRUFBOUIsQ0FEQSxJQUVBLEtBQUtELGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEJDLG1FQUE1QixDQUZBLElBR0EsS0FBS0QsY0FBTCxDQUFvQixPQUFwQixFQUE2QkMsbUVBQTdCLENBSkYsRUFLRTtBQUNBQyx3RUFBYSxHQUFHQyxJQUFoQjtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNEOzs7V0FFRCxtQkFBVTtBQUNSLFVBQU1DLENBQUMsR0FBRyxLQUFLTixhQUFmO0FBQ0EsVUFBTU8sQ0FBQyxHQUFHLEtBQUtOLFVBQWY7QUFDQSxVQUFNTyxDQUFDLEdBQUcsS0FBSzVDLEtBQWY7O0FBQ0EsVUFBSTJDLENBQUMsR0FBR0QsQ0FBUixFQUFXO0FBQ1QsYUFBS3JDLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCcUMsQ0FBQyxHQUFHLENBQTVCO0FBQ0EsYUFBS1AsVUFBTDtBQUNELE9BSEQsTUFHTyxJQUFJTSxDQUFDLEdBQUdELENBQUMsR0FBQyxDQUFWLEVBQWE7QUFDbEIsYUFBS3JDLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCcUMsQ0FBQyxHQUFHLENBQTVCO0FBQ0EsYUFBS1AsVUFBTDtBQUNELE9BSE0sTUFHQSxJQUFJTSxDQUFDLEdBQUdELENBQUMsR0FBQyxDQUFWLEVBQWE7QUFDbEIsYUFBS3JDLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCcUMsQ0FBQyxHQUFHLENBQTVCO0FBQ0EsYUFBS1AsVUFBTDtBQUNELE9BSE0sTUFHQSxJQUFJTSxDQUFDLEdBQUdELENBQUMsR0FBQyxDQUFWLEVBQWE7QUFDbEIsYUFBS3JDLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCcUMsQ0FBQyxHQUFHLENBQTVCO0FBQ0EsYUFBS1AsVUFBTDtBQUNELE9BSE0sTUFHQSxJQUFJTSxDQUFDLEdBQUdELENBQUMsR0FBQyxDQUFWLEVBQWE7QUFDbEIsYUFBS3JDLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCcUMsQ0FBQyxHQUFHLENBQTVCO0FBQ0EsYUFBS1AsVUFBTDtBQUNELE9BSE0sTUFHQSxJQUFJTSxDQUFDLEdBQUdELENBQUMsR0FBQyxDQUFWLEVBQWE7QUFDbEIsYUFBS3JDLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCcUMsQ0FBQyxHQUFHLENBQTVCO0FBQ0EsYUFBS1AsVUFBTDtBQUNELE9BSE0sTUFHQSxJQUFJTSxDQUFDLEdBQUdELENBQUMsR0FBQyxDQUFWLEVBQWE7QUFDbEIsYUFBS3JDLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCcUMsQ0FBQyxHQUFHLENBQTVCO0FBQ0EsYUFBS1AsVUFBTDtBQUNELE9BSE0sTUFHQSxJQUFJTSxDQUFDLEdBQUdELENBQUMsR0FBQyxDQUFWLEVBQWE7QUFDbEIsYUFBS3JDLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCcUMsQ0FBQyxHQUFHLENBQTVCO0FBQ0EsYUFBS1AsVUFBTDtBQUNELE9BSE0sTUFHQTtBQUNMLGFBQUtoQyxXQUFMLENBQWlCRSxJQUFqQixHQUF3QnFDLENBQUMsR0FBRyxDQUE1QjtBQUNBLGFBQUtQLFVBQUwsR0FBa0IsQ0FBbEI7QUFDRDtBQUNGOzs7O0VBckRnQnZDLE07O0FBd0RuQixpRUFBZXFDLElBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM1SU1uQixNO0FBQ0osa0JBQVk2QixNQUFaLEVBQW9CN0MsS0FBcEIsRUFBMkJDLE1BQTNCLEVBQW1DO0FBQUE7O0FBQ2pDLFNBQUs0QyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLN0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0YsR0FBTCxHQUFXLEtBQUsrQyxTQUFMLEVBQVg7O0FBRUEsbUNBQWMsS0FBSy9DLEdBQW5CO0FBQUEsUUFBT1ksQ0FBUDtBQUFBLFFBQVNDLENBQVQ7O0FBQ0EsUUFBTW1DLE9BQU8sR0FBRyxLQUFLaEQsR0FBckI7QUFDQSxRQUFNaUQsUUFBUSxHQUFHLENBQUNyQyxDQUFDLEdBQUNYLEtBQUgsRUFBU1ksQ0FBVCxDQUFqQjtBQUNBLFFBQU1xQyxXQUFXLEdBQUcsQ0FBQ3RDLENBQUMsR0FBQ1gsS0FBSCxFQUFTWSxDQUFDLEdBQUNYLE1BQVgsQ0FBcEI7QUFDQSxRQUFNaUQsVUFBVSxHQUFHLENBQUN2QyxDQUFELEVBQUdDLENBQUMsR0FBQ1gsTUFBTCxDQUFuQjtBQUVBLFNBQUtrRCxNQUFMLEdBQWMsQ0FBQ3hDLENBQUMsR0FBRVgsS0FBSyxHQUFDLENBQVYsRUFBYVksQ0FBQyxHQUFFWCxNQUFNLEdBQUMsQ0FBdkIsQ0FBZDtBQUNBLFNBQUtnQixHQUFMLEdBQVcsQ0FBQyxDQUFDOEIsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFZQyxRQUFRLENBQUMsQ0FBRCxDQUFwQixDQUFELEVBQTJCRCxPQUFPLENBQUMsQ0FBRCxDQUFsQyxDQUFYO0FBQ0EsU0FBSzdCLE1BQUwsR0FBYyxDQUFDLENBQUNnQyxVQUFVLENBQUMsQ0FBRCxDQUFYLEVBQWVELFdBQVcsQ0FBQyxDQUFELENBQTFCLENBQUQsRUFBaUNDLFVBQVUsQ0FBQyxDQUFELENBQTNDLENBQWQ7QUFDQSxTQUFLOUIsS0FBTCxHQUFhLENBQUM0QixRQUFRLENBQUMsQ0FBRCxDQUFULEVBQWMsQ0FBQ0EsUUFBUSxDQUFDLENBQUQsQ0FBVCxFQUFhQyxXQUFXLENBQUMsQ0FBRCxDQUF4QixDQUFkLENBQWI7QUFDQSxTQUFLOUIsSUFBTCxHQUFZLENBQUM0QixPQUFPLENBQUMsQ0FBRCxDQUFSLEVBQWEsQ0FBQ0EsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFZRyxVQUFVLENBQUMsQ0FBRCxDQUF0QixDQUFiLENBQVo7QUFDQSxTQUFLRSxLQUFMLEdBQWEsQ0FBQyxLQUFLbkMsR0FBTixFQUFXLEtBQUtDLE1BQWhCLEVBQXdCLEtBQUtFLEtBQTdCLEVBQW9DLEtBQUtELElBQXpDLENBQWI7QUFFRDs7OztXQUNELGNBQUtVLEdBQUwsRUFBVTtBQUNSQSxTQUFHLENBQUN3QixTQUFKLEdBQWdCLENBQWhCO0FBQ0F4QixTQUFHLENBQUN5QixXQUFKLEdBQWtCLGFBQWxCO0FBQ0F6QixTQUFHLENBQUMwQixVQUFKLENBQ0UsS0FBS3hELEdBQUwsQ0FBUyxDQUFULENBREYsRUFFRSxLQUFLQSxHQUFMLENBQVMsQ0FBVCxDQUZGLEVBR0UsS0FBS0MsS0FIUCxFQUlFLEtBQUtDLE1BSlA7QUFNRDs7O1dBRUQsdUJBQWM7QUFDWixzQ0FBYyxLQUFLRixHQUFuQjtBQUFBLFVBQU9ZLENBQVA7QUFBQSxVQUFTQyxDQUFUOztBQUNBLFVBQU1tQyxPQUFPLEdBQUcsS0FBS2hELEdBQXJCO0FBQ0EsVUFBTWlELFFBQVEsR0FBRyxDQUFDckMsQ0FBQyxHQUFDLEtBQUtYLEtBQVIsRUFBY1ksQ0FBZCxDQUFqQjtBQUNBLFVBQU1xQyxXQUFXLEdBQUcsQ0FBQ3RDLENBQUMsR0FBQyxLQUFLWCxLQUFSLEVBQWNZLENBQUMsR0FBQyxLQUFLWCxNQUFyQixDQUFwQjtBQUNBLFVBQU1pRCxVQUFVLEdBQUcsQ0FBQ3ZDLENBQUQsRUFBR0MsQ0FBQyxHQUFDLEtBQUtYLE1BQVYsQ0FBbkI7QUFDQSxXQUFLa0QsTUFBTCxHQUFjLENBQUN4QyxDQUFDLEdBQUUsS0FBS1gsS0FBTCxHQUFXLENBQWYsRUFBa0JZLENBQUMsR0FBRSxLQUFLWCxNQUFMLEdBQVksQ0FBakMsQ0FBZDtBQUNBLFdBQUtnQixHQUFMLEdBQVcsQ0FBQyxDQUFDOEIsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFZQyxRQUFRLENBQUMsQ0FBRCxDQUFwQixDQUFELEVBQTJCRCxPQUFPLENBQUMsQ0FBRCxDQUFsQyxDQUFYO0FBQ0EsV0FBSzdCLE1BQUwsR0FBYyxDQUFDLENBQUNnQyxVQUFVLENBQUMsQ0FBRCxDQUFYLEVBQWVELFdBQVcsQ0FBQyxDQUFELENBQTFCLENBQUQsRUFBaUNDLFVBQVUsQ0FBQyxDQUFELENBQTNDLENBQWQ7QUFDQSxXQUFLOUIsS0FBTCxHQUFhLENBQUM0QixRQUFRLENBQUMsQ0FBRCxDQUFULEVBQWMsQ0FBQ0EsUUFBUSxDQUFDLENBQUQsQ0FBVCxFQUFhQyxXQUFXLENBQUMsQ0FBRCxDQUF4QixDQUFkLENBQWI7QUFDQSxXQUFLOUIsSUFBTCxHQUFZLENBQUM0QixPQUFPLENBQUMsQ0FBRCxDQUFSLEVBQWEsQ0FBQ0EsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFZRyxVQUFVLENBQUMsQ0FBRCxDQUF0QixDQUFiLENBQVo7QUFDRDs7O1dBRUQscUJBQVk7QUFDVixpQkFBZ0IsQ0FBQyxLQUFLTCxNQUFMLENBQVk5QyxHQUFaLENBQWdCLENBQWhCLENBQUQsRUFBcUIsS0FBSzhDLE1BQUwsQ0FBWTlDLEdBQVosQ0FBZ0IsQ0FBaEIsQ0FBckIsQ0FBaEI7QUFBQSxVQUFPeUQsRUFBUDtBQUFBLFVBQVVDLEVBQVY7QUFDQSxrQkFBZ0IsQ0FBQyxLQUFLWixNQUFMLENBQVk3QyxLQUFiLEVBQW9CLEtBQUs2QyxNQUFMLENBQVk1QyxNQUFoQyxDQUFoQjtBQUFBLFVBQU95RCxFQUFQO0FBQUEsVUFBVUMsRUFBVjtBQUNBLGtCQUFnQixDQUFDLEtBQUszRCxLQUFOLEVBQWEsS0FBS0MsTUFBbEIsQ0FBaEI7QUFBQSxVQUFPMkQsRUFBUDtBQUFBLFVBQVVDLEVBQVY7QUFDQSxVQUFNbEQsQ0FBQyxHQUFHNkMsRUFBRSxHQUFJLENBQUNFLEVBQUUsR0FBQ0UsRUFBSixJQUFRLENBQXhCO0FBQ0EsVUFBTWhELENBQUMsR0FBRzZDLEVBQUUsR0FBR0UsRUFBTCxHQUFVRSxFQUFwQjtBQUNBLGFBQU8sQ0FBQ2xELENBQUQsRUFBR0MsQ0FBSCxDQUFQO0FBQ0Q7OztXQUVELDBCQUFpQjtBQUNmLFdBQUtiLEdBQUwsR0FBVyxLQUFLOEMsTUFBTCxDQUFZaUIsVUFBWixFQUFYO0FBQ0EsV0FBS3RDLFdBQUw7QUFDRDs7Ozs7O0FBSUgsaUVBQWVSLE1BQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBSUE7O0lBRU1sQixNO0FBQ0osa0JBQVlDLEdBQVosRUFBZ0JDLEtBQWhCLEVBQXNCQyxNQUF0QixFQUE2QkMsYUFBN0IsRUFBNEM7QUFBQTs7QUFDMUMsU0FBS0gsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsUUFBTUUsV0FBVyxHQUFHSCxLQUFLLEdBQUMsQ0FBMUI7QUFDQSxRQUFNSSxZQUFZLEdBQUdILE1BQU0sR0FBQyxDQUE1QjtBQUVBLFNBQUtDLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsU0FBS0csV0FBTCxHQUFtQjtBQUNqQkMsV0FBSyxFQUFFSixhQURVO0FBRWpCSyxVQUFJLEVBQUUsQ0FGVztBQUdqQkMsVUFBSSxFQUFFLENBSFc7QUFJakJDLGFBQU8sRUFBRVQsS0FKUTtBQUtqQlUsY0FBUSxFQUFFVCxNQUxPO0FBTWpCVSxPQUFDLEVBQUVaLEdBQUcsQ0FBQyxDQUFELENBTlc7QUFPakJhLE9BQUMsRUFBRWIsR0FBRyxDQUFDLENBQUQsQ0FQVztBQVFqQmMsYUFBTyxFQUFFYixLQVJRO0FBU2pCYyxjQUFRLEVBQUViO0FBVE8sS0FBbkI7QUFXQSxTQUFLYyxNQUFMLEdBQWMsSUFBSUMsbURBQUosQ0FBVyxJQUFYLEVBQWdCYixXQUFoQixFQUE0QkMsWUFBNUIsQ0FBZDtBQUNBLFNBQUthLEdBQUwsR0FBVyxLQUFLRixNQUFMLENBQVlFLEdBQXZCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEtBQUtILE1BQUwsQ0FBWUcsTUFBMUI7QUFDQSxTQUFLQyxJQUFMLEdBQVksS0FBS0osTUFBTCxDQUFZSSxJQUF4QjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLTCxNQUFMLENBQVlLLEtBQXpCO0FBQ0EsU0FBSytCLE1BQUwsR0FBYyxLQUFLcEMsTUFBTCxDQUFZb0MsTUFBMUI7QUFDQSxTQUFLOUIsVUFBTCxHQUFrQjtBQUNoQkosU0FBRyxFQUFFLEtBRFc7QUFFaEJDLFlBQU0sRUFBRSxLQUZRO0FBR2hCQyxVQUFJLEVBQUUsS0FIVTtBQUloQkMsV0FBSyxFQUFFO0FBSlMsS0FBbEI7QUFPRDs7OztXQUVELHNCQUFhO0FBQUU7QUFDYixpQkFBWSxDQUFDLEtBQUtyQixHQUFMLENBQVMsQ0FBVCxDQUFELEVBQWEsS0FBS0EsR0FBTCxDQUFTLENBQVQsQ0FBYixDQUFaO0FBQUEsVUFBS1ksQ0FBTDtBQUFBLFVBQU9DLENBQVA7QUFDQSxVQUFLVSxFQUFMLEdBQ0VYLENBQUMsR0FBRSxDQUFDLEtBQUtYLEtBQUwsR0FBYSxLQUFLZSxNQUFMLENBQVlmLEtBQTFCLElBQWlDLENBRHRDO0FBQUEsVUFBUXVCLEVBQVIsR0FFRVgsQ0FBQyxJQUFFLEtBQUtYLE1BQUwsR0FBYyxLQUFLYyxNQUFMLENBQVlkLE1BQTVCLENBRkg7QUFJQSxhQUFPLENBQUNxQixFQUFELEVBQUlDLEVBQUosQ0FBUDtBQUNEOzs7V0FFRCx1QkFBYztBQUNaLFdBQUtSLE1BQUwsQ0FBWVMsV0FBWjtBQUNBLFdBQUtQLEdBQUwsR0FBVyxLQUFLRixNQUFMLENBQVlFLEdBQXZCO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLEtBQUtILE1BQUwsQ0FBWUcsTUFBMUI7QUFDQSxXQUFLQyxJQUFMLEdBQVksS0FBS0osTUFBTCxDQUFZSSxJQUF4QjtBQUNBLFdBQUtDLEtBQUwsR0FBYSxLQUFLTCxNQUFMLENBQVlLLEtBQXpCO0FBQ0EsV0FBSytCLE1BQUwsR0FBYyxLQUFLcEMsTUFBTCxDQUFZb0MsTUFBMUI7QUFDRDs7O1dBRUQsd0JBQWUxQixJQUFmLEVBQXFCQyxXQUFyQixFQUFrQztBQUNoQyxVQUFJQyxTQUFKOztBQUNBLGNBQU9GLElBQVA7QUFDRSxhQUFLLEtBQUw7QUFDRUUsbUJBQVMsR0FBRyxRQUFaO0FBQ0E7O0FBQ0YsYUFBSyxRQUFMO0FBQ0VBLG1CQUFTLEdBQUcsS0FBWjtBQUNBOztBQUNGLGFBQUssTUFBTDtBQUNFQSxtQkFBUyxHQUFHLE9BQVo7QUFDQTs7QUFDRixhQUFLLE9BQUw7QUFDRUEsbUJBQVMsR0FBRyxNQUFaO0FBQ0E7O0FBQ0Y7QUFDRUEsbUJBQVMsR0FBRyxJQUFaO0FBQ0E7QUFmSjs7QUFpQkEsV0FBS04sVUFBTCxDQUFnQkksSUFBaEIsSUFBd0JHLG1FQUFnQixDQUFDSCxJQUFELEVBQU8sS0FBS0EsSUFBTCxDQUFQLEVBQW1CQyxXQUFXLENBQUNDLFNBQUQsQ0FBOUIsQ0FBeEM7QUFDQSxhQUFPLEtBQUtOLFVBQUwsQ0FBZ0JJLElBQWhCLENBQVA7QUFDRDs7O1dBRUQsY0FBS0ksR0FBTCxFQUFVO0FBQ1JBLFNBQUcsQ0FBQ0MsU0FBSixPQUFBRCxHQUFHLHFCQUFjRSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxLQUFLM0IsV0FBbkIsQ0FBZCxFQUFIO0FBQ0EsV0FBS1UsTUFBTCxDQUFZa0IsY0FBWjtBQUNBLFdBQUtsQixNQUFMLENBQVltQixJQUFaLENBQWlCTCxHQUFqQjtBQUNEOzs7Ozs7SUFHR2tDLEs7Ozs7O0FBQ0osaUJBQVloRSxHQUFaLEVBQWdCQyxLQUFoQixFQUFzQkMsTUFBdEIsRUFBNkJDLGFBQTdCLEVBQTRDOEQsSUFBNUMsRUFBa0RDLFVBQWxELEVBQThEO0FBQUE7O0FBQUE7O0FBQzVELDhCQUFNbEUsR0FBTixFQUFVQyxLQUFWLEVBQWdCQyxNQUFoQixFQUF1QkMsYUFBdkI7QUFDQSxVQUFLZ0UsS0FBTCxHQUFhLENBQWI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLEtBQUcsTUFBS0YsS0FBcEI7QUFDQSxVQUFLRyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsVUFBS0osVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxVQUFLSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsVUFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxVQUFLUCxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLUSxRQUFMLEdBQWdCO0FBQ2RDLFFBQUUsRUFBRSxLQURVO0FBRWRDLFVBQUksRUFBRSxLQUZRO0FBR2R2RCxVQUFJLEVBQUUsS0FIUTtBQUlkQyxXQUFLLEVBQUU7QUFKTyxLQUFoQjtBQU1BLFFBQUlULENBQUosRUFBT0MsQ0FBUDs7QUFDQSxZQUFPb0QsSUFBUDtBQUNFLFdBQUssTUFBTDtBQUNFckQsU0FBQyxHQUFHLEtBQUssQ0FBVDtBQUNBQyxTQUFDLEdBQUcsS0FBSyxDQUFUO0FBQ0E7O0FBQ0YsV0FBSyxLQUFMO0FBQ0VELFNBQUMsR0FBRyxLQUFLLENBQVQ7QUFDQUMsU0FBQyxHQUFHLEtBQUssQ0FBVDtBQUNBOztBQUNGLFdBQUssT0FBTDtBQUNFRCxTQUFDLEdBQUcsS0FBSyxDQUFUO0FBQ0FDLFNBQUMsR0FBRyxLQUFLLENBQVQ7QUFDQTtBQVpKOztBQWNBLFVBQUsrRCxVQUFMLEdBQWtCaEUsQ0FBbEI7QUFDQSxVQUFLaUUsTUFBTCxHQUFjO0FBQ1pILFFBQUUsRUFBRTtBQUNGSSxpQkFBUyxFQUFFLENBRFQ7QUFFRnJFLFlBQUksRUFBRyxLQUFLLENBQU4sR0FBV0k7QUFGZixPQURRO0FBS1o4RCxVQUFJLEVBQUU7QUFDSkcsaUJBQVMsRUFBRSxDQURQO0FBRUpyRSxZQUFJLEVBQUcsS0FBSyxDQUFOLEdBQVdJO0FBRmIsT0FMTTtBQVNaTyxVQUFJLEVBQUU7QUFDSjBELGlCQUFTLEVBQUUsQ0FEUDtBQUVKckUsWUFBSSxFQUFHLEtBQUssQ0FBTixHQUFXSTtBQUZiLE9BVE07QUFhWlEsV0FBSyxFQUFFO0FBQ0x5RCxpQkFBUyxFQUFFLENBRE47QUFFTHJFLFlBQUksRUFBRyxLQUFLLENBQU4sR0FBV0k7QUFGWjtBQWJLLEtBQWQ7QUFoQzREO0FBa0Q3RDs7OztXQUVELDBCQUFpQmtFLFNBQWpCLEVBQTRCO0FBQzFCLFdBQUtWLElBQUwsR0FBWSxNQUFNLEtBQUtGLEtBQUwsR0FBYSxLQUFLQyxhQUF4QixDQUFaOztBQUNBLFVBQUksS0FBS1MsTUFBTCxDQUFZRSxTQUFaLEVBQXVCRCxTQUF2QixJQUFvQyxLQUFLVCxJQUE3QyxFQUFtRDtBQUNqRCxhQUFLUSxNQUFMLENBQVlFLFNBQVosRUFBdUJELFNBQXZCO0FBQ0EsZUFBUSxLQUFLLENBQU4sR0FBVyxLQUFLRixVQUF2QjtBQUNELE9BSEQsTUFHTyxJQUFJLEtBQUtDLE1BQUwsQ0FBWUUsU0FBWixFQUF1QkQsU0FBdkIsSUFBb0MsSUFBSSxLQUFLVCxJQUFqRCxFQUF1RDtBQUM1RCxhQUFLUSxNQUFMLENBQVlFLFNBQVosRUFBdUJELFNBQXZCO0FBQ0EsZUFBUSxLQUFLLENBQU4sR0FBVyxLQUFLRixVQUF2QjtBQUNELE9BSE0sTUFHQSxJQUFJLEtBQUtDLE1BQUwsQ0FBWUUsU0FBWixFQUF1QkQsU0FBdkIsSUFBb0MsSUFBSSxLQUFLVCxJQUFqRCxFQUF1RDtBQUM1RCxhQUFLUSxNQUFMLENBQVlFLFNBQVosRUFBdUJELFNBQXZCO0FBQ0EsZUFBUSxLQUFLLENBQU4sR0FBVyxLQUFLRixVQUF2QjtBQUNELE9BSE0sTUFHQSxJQUFJLEtBQUtDLE1BQUwsQ0FBWUUsU0FBWixFQUF1QkQsU0FBdkIsSUFBb0MsSUFBSSxLQUFLVCxJQUFqRCxFQUF1RDtBQUM1RCxhQUFLUSxNQUFMLENBQVlFLFNBQVosRUFBdUJELFNBQXZCO0FBQ0EsZUFBUSxLQUFLLENBQU4sR0FBVyxLQUFLRixVQUF2QjtBQUNELE9BSE0sTUFHQSxJQUFJLEtBQUtDLE1BQUwsQ0FBWUUsU0FBWixFQUF1QkQsU0FBdkIsR0FBbUMsSUFBSSxLQUFLVCxJQUFoRCxFQUFzRDtBQUMzRCxhQUFLUSxNQUFMLENBQVlFLFNBQVosRUFBdUJELFNBQXZCLEdBQW1DLENBQW5DO0FBQ0EsZUFBUSxLQUFLLENBQU4sR0FBVyxLQUFLRixVQUF2QjtBQUNEO0FBQ0Y7OztXQUVELHdCQUFlO0FBQ2IsVUFBTUksRUFBRSxHQUFHLEtBQUs1QixNQUFMLENBQVksQ0FBWixDQUFYO0FBQ0EsVUFBTTZCLEVBQUUsR0FBRyxLQUFLN0IsTUFBTCxDQUFZLENBQVosQ0FBWDtBQUNBLFVBQU1LLEVBQUUsR0FBR2pCLHdFQUFYO0FBQ0EsVUFBTWtCLEVBQUUsR0FBR2xCLHdFQUFYO0FBQ0EsVUFBSTBDLEVBQUUsR0FBR0YsRUFBRSxHQUFHdkIsRUFBZDtBQUNBLFVBQUkwQixFQUFFLEdBQUdGLEVBQUUsR0FBR3ZCLEVBQWQ7QUFDQSxVQUFNMEIsSUFBSSxHQUFHQyxJQUFJLENBQUNDLElBQUwsQ0FBVUQsSUFBSSxDQUFDRSxHQUFMLENBQVNMLEVBQVQsRUFBYSxDQUFiLElBQWtCRyxJQUFJLENBQUNFLEdBQUwsQ0FBU0osRUFBVCxFQUFhLENBQWIsQ0FBNUIsQ0FBYjtBQUNBLGFBQU9DLElBQVA7QUFDRDs7O1dBRUQsK0JBQXNCO0FBQ3BCLFVBQU1KLEVBQUUsR0FBRyxLQUFLNUIsTUFBTCxDQUFZLENBQVosQ0FBWDtBQUNBLFVBQU02QixFQUFFLEdBQUcsS0FBSzdCLE1BQUwsQ0FBWSxDQUFaLENBQVg7QUFDQSxVQUFNSyxFQUFFLEdBQUdqQix3RUFBWDtBQUNBLFVBQU1rQixFQUFFLEdBQUdsQix3RUFBWDtBQUNBLFVBQUkwQyxFQUFFLEdBQUdGLEVBQUUsR0FBR3ZCLEVBQWQ7QUFDQSxVQUFJMEIsRUFBRSxHQUFHRixFQUFFLEdBQUd2QixFQUFkOztBQUVBLFVBQUksQ0FBQyxLQUFLWSxhQUFOLElBQXVCLENBQUMsS0FBS0MsU0FBakMsRUFBNEM7QUFDMUMsWUFBTWlCLFNBQVMsR0FBR0gsSUFBSSxDQUFDSSxNQUFMLEtBQWdCLENBQWhCLEdBQW9CSixJQUFJLENBQUNLLEVBQTNDO0FBQ0EsYUFBS1IsRUFBTCxHQUFVRyxJQUFJLENBQUNNLEdBQUwsQ0FBU0gsU0FBVCxJQUFzQixLQUFLckIsS0FBM0IsR0FBbUMsS0FBS0MsYUFBbEQ7QUFDQSxhQUFLZSxFQUFMLEdBQVVFLElBQUksQ0FBQ08sR0FBTCxDQUFTSixTQUFULElBQXNCLEtBQUtyQixLQUEzQixHQUFtQyxLQUFLQyxhQUFsRDtBQUNBLGFBQUtHLFNBQUwsR0FBaUIsQ0FBakI7QUFDRDs7QUFFRCxVQUFJLENBQUMsS0FBS0QsYUFBTixJQUF1QixLQUFLQyxTQUFoQyxFQUEyQyxLQUFLQSxTQUFMOztBQUUzQyxVQUFJLEtBQUtELGFBQVQsRUFBd0I7QUFDdEIsYUFBS1ksRUFBTCxHQUFVQSxFQUFWO0FBQ0EsYUFBS0MsRUFBTCxHQUFVQSxFQUFWO0FBQ0Q7O0FBR0QsVUFBRyxLQUFLWixTQUFMLElBQWtCLEtBQUtDLE9BQTFCLEVBQW1DLEtBQUtELFNBQUwsR0FBaUIsQ0FBakI7QUFFbkMsV0FBS3NCLEtBQUwsR0FBYVIsSUFBSSxDQUFDUyxJQUFMLENBQVUsS0FBS1gsRUFBTCxHQUFRLEtBQUtELEVBQXZCLENBQWI7QUFDQSxVQUFNYSxFQUFFLEdBQUdWLElBQUksQ0FBQ08sR0FBTCxDQUFTLEtBQUtDLEtBQWQsSUFBdUIsS0FBSzFCLEtBQTVCLEdBQW9DLEtBQUtDLGFBQXBEO0FBQ0EsVUFBTTRCLEVBQUUsR0FBR1gsSUFBSSxDQUFDTSxHQUFMLENBQVMsS0FBS0UsS0FBZCxJQUF1QixLQUFLMUIsS0FBNUIsR0FBb0MsS0FBS0MsYUFBcEQ7O0FBQ0EsVUFBSSxLQUFLZSxFQUFMLEdBQVUsQ0FBZCxFQUFpQjtBQUNmLGFBQUtWLFFBQUwsQ0FBYyxJQUFkLElBQXNCLElBQXRCO0FBQ0EsYUFBS0EsUUFBTCxDQUFjLE1BQWQsSUFBd0IsS0FBeEI7QUFDQSxZQUFJWSxJQUFJLENBQUNZLEdBQUwsQ0FBUyxLQUFLZCxFQUFkLElBQW9CRSxJQUFJLENBQUNZLEdBQUwsQ0FBUyxLQUFLZixFQUFkLENBQXhCLEVBQTJDLEtBQUtnQixTQUFMLEdBQWlCLElBQWpCO0FBQzVDOztBQUVELFVBQUksS0FBS2YsRUFBTCxHQUFVLENBQWQsRUFBaUI7QUFDZixhQUFLVixRQUFMLENBQWMsTUFBZCxJQUF3QixJQUF4QjtBQUNBLGFBQUtBLFFBQUwsQ0FBYyxJQUFkLElBQXNCLEtBQXRCO0FBQ0EsWUFBSVksSUFBSSxDQUFDWSxHQUFMLENBQVMsS0FBS2QsRUFBZCxJQUFvQkUsSUFBSSxDQUFDWSxHQUFMLENBQVMsS0FBS2YsRUFBZCxDQUF4QixFQUEyQyxLQUFLZ0IsU0FBTCxHQUFpQixNQUFqQjtBQUM1Qzs7QUFFRCxVQUFJLEtBQUtoQixFQUFMLEdBQVUsQ0FBZCxFQUFpQjtBQUNmLGFBQUtULFFBQUwsQ0FBYyxNQUFkLElBQXdCLElBQXhCO0FBQ0EsYUFBS0EsUUFBTCxDQUFjLE9BQWQsSUFBeUIsS0FBekI7QUFDQSxZQUFJWSxJQUFJLENBQUNZLEdBQUwsQ0FBUyxLQUFLZixFQUFkLElBQW9CRyxJQUFJLENBQUNZLEdBQUwsQ0FBUyxLQUFLZCxFQUFkLENBQXhCLEVBQTJDLEtBQUtlLFNBQUwsR0FBaUIsTUFBakI7QUFDNUM7O0FBRUQsVUFBSSxLQUFLaEIsRUFBTCxHQUFVLENBQWQsRUFBaUI7QUFDZixhQUFLVCxRQUFMLENBQWMsT0FBZCxJQUF5QixJQUF6QjtBQUNBLGFBQUtBLFFBQUwsQ0FBYyxNQUFkLElBQXdCLEtBQXhCO0FBQ0EsWUFBSVksSUFBSSxDQUFDWSxHQUFMLENBQVMsS0FBS2YsRUFBZCxJQUFvQkcsSUFBSSxDQUFDWSxHQUFMLENBQVMsS0FBS2QsRUFBZCxDQUF4QixFQUEyQyxLQUFLZSxTQUFMLEdBQWlCLE9BQWpCO0FBQzVDOztBQUVELGFBQU8sQ0FBQ0YsRUFBRCxFQUFJRCxFQUFKLENBQVA7QUFDRDs7O1dBRUQsa0JBQVM7QUFDUCxhQUFPVixJQUFJLENBQUNjLEtBQUwsQ0FBWWQsSUFBSSxDQUFDSSxNQUFMLEtBQWMsQ0FBZixHQUFrQixDQUE3QixDQUFQO0FBQ0Q7OztXQUVELG1CQUFVVyxLQUFWLEVBQWlCO0FBRWYsVUFBTUMsTUFBTSxHQUFHN0QsOERBQWY7O0FBRUEsVUFBSSxLQUFLOEQsWUFBTCxLQUFzQixFQUF0QixJQUE0QixDQUFDOUQsMkVBQWpDLEVBQXFFO0FBQ25FNkQsY0FBTSxDQUFDckcsR0FBUCxDQUFXLENBQVgsS0FBa0IsTUFBTSxLQUFLa0YsRUFBN0I7QUFDQW1CLGNBQU0sQ0FBQ3JHLEdBQVAsQ0FBVyxDQUFYLEtBQWtCLE1BQU0sS0FBS21GLEVBQTdCO0FBQ0FrQixjQUFNLENBQUM1RSxXQUFQO0FBQ0E0RSxjQUFNLENBQUNFLFNBQVAsQ0FBaUJILEtBQWpCO0FBQ0FDLGNBQU0sQ0FBQzVFLFdBQVA7QUFDQTRFLGNBQU0sQ0FBQ0csRUFBUCxJQUFhLEtBQUtDLE1BQUwsRUFBYjtBQUNBLFlBQUlKLE1BQU0sQ0FBQ0csRUFBUCxHQUFZLENBQWhCLEVBQW1CSCxNQUFNLENBQUNHLEVBQVAsR0FBWSxDQUFaO0FBQ25CSCxjQUFNLENBQUNLLEdBQVA7QUFDRDtBQUVGOzs7V0FFRCxtQkFBVU4sS0FBVixFQUFpQjtBQUNmLDJCQUtJLEtBQUszQixRQUxUO0FBQUEsVUFDRUMsRUFERixrQkFDRUEsRUFERjtBQUFBLFVBRUVDLElBRkYsa0JBRUVBLElBRkY7QUFBQSxVQUdFdkQsSUFIRixrQkFHRUEsSUFIRjtBQUFBLFVBSUVDLEtBSkYsa0JBSUVBLEtBSkY7O0FBT0EsVUFBSXFELEVBQUosRUFBUTtBQUFBLG1EQUNVMEIsS0FEVjtBQUFBOztBQUFBO0FBQ04sOERBQXVCO0FBQUEsZ0JBQWZPLElBQWU7QUFBRSxnQkFBSSxLQUFLcEUsY0FBTCxDQUFvQixLQUFwQixFQUEyQm9FLElBQTNCLENBQUosRUFBc0M7QUFBUTtBQURqRTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVOLFlBQUksS0FBS3JGLFVBQUwsQ0FBZ0JKLEdBQXBCLEVBQXlCO0FBQ3ZCLGVBQUtsQixHQUFMLENBQVMsQ0FBVCxJQUFjLEtBQUtzQixVQUFMLENBQWdCSixHQUFoQixJQUF1QixLQUFLaEIsTUFBTCxHQUFZLEtBQUtjLE1BQUwsQ0FBWWQsTUFBL0MsQ0FBZDtBQUNEO0FBQ0Y7O0FBRUQsVUFBSXlFLElBQUosRUFBVTtBQUFBLG9EQUNReUIsS0FEUjtBQUFBOztBQUFBO0FBQ1IsaUVBQXVCO0FBQUEsZ0JBQWZPLEtBQWU7QUFBRSxnQkFBSSxLQUFLcEUsY0FBTCxDQUFvQixRQUFwQixFQUE4Qm9FLEtBQTlCLENBQUosRUFBeUM7QUFBUTtBQURsRTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVSLFlBQUksS0FBS3JGLFVBQUwsQ0FBZ0JILE1BQXBCLEVBQTRCO0FBQzFCLGVBQUtuQixHQUFMLENBQVMsQ0FBVCxJQUFjLEtBQUtzQixVQUFMLENBQWdCSCxNQUFoQixHQUF5QixFQUF2QztBQUNEO0FBQ0Y7O0FBRUQsVUFBSUMsSUFBSixFQUFVO0FBQUEsb0RBQ1FnRixLQURSO0FBQUE7O0FBQUE7QUFDUixpRUFBdUI7QUFBQSxnQkFBZk8sTUFBZTtBQUFFLGdCQUFJLEtBQUtwRSxjQUFMLENBQW9CLE1BQXBCLEVBQTRCb0UsTUFBNUIsQ0FBSixFQUF1QztBQUFRO0FBRGhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRVIsWUFBSSxLQUFLckYsVUFBTCxDQUFnQkYsSUFBcEIsRUFBMEI7QUFDeEIsZUFBS3BCLEdBQUwsQ0FBUyxDQUFULElBQWMsS0FBS3NCLFVBQUwsQ0FBZ0JGLElBQWhCLEdBQXdCLEtBQUtKLE1BQUwsQ0FBWWYsS0FBWixHQUFrQixDQUF4RDtBQUNEO0FBQ0Y7O0FBRUQsVUFBSW9CLEtBQUosRUFBVztBQUFBLG9EQUNPK0UsS0FEUDtBQUFBOztBQUFBO0FBQ1QsaUVBQXVCO0FBQUEsZ0JBQWZPLE1BQWU7QUFBRSxnQkFBSSxLQUFLcEUsY0FBTCxDQUFvQixPQUFwQixFQUE2Qm9FLE1BQTdCLENBQUosRUFBd0M7QUFBUTtBQURoRTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVULFlBQUksS0FBS3JGLFVBQUwsQ0FBZ0JELEtBQXBCLEVBQTJCO0FBQ3pCLGVBQUtyQixHQUFMLENBQVMsQ0FBVCxJQUFjLEtBQUtzQixVQUFMLENBQWdCRCxLQUFoQixJQUF5QixLQUFLTCxNQUFMLENBQVlmLEtBQVosR0FBcUIsS0FBS2UsTUFBTCxDQUFZZixLQUFaLEdBQWtCLENBQWhFLENBQWQ7QUFDRDtBQUNGO0FBRUY7OztXQUlELGNBQUttRyxLQUFMLEVBQVk7QUFFVixVQUFJLEtBQUtFLFlBQUwsS0FBc0IsS0FBS3BDLFVBQS9CLEVBQTJDO0FBQ3pDLGFBQUtJLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxhQUFLRixhQUFMLEdBQXFCLENBQXJCO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsYUFBS0UsYUFBTCxHQUFxQixLQUFyQjtBQUNBLGFBQUtGLGFBQUwsR0FBcUIsSUFBckI7QUFDRDs7QUFFRCxVQUFJd0MsVUFBVSxHQUFHLEtBQUtDLG1CQUFMLEVBQWpCO0FBRUEsNEJBS0ksS0FBS3BDLFFBTFQ7QUFBQSxVQUNFQyxFQURGLG1CQUNFQSxFQURGO0FBQUEsVUFFRUMsSUFGRixtQkFFRUEsSUFGRjtBQUFBLFVBR0V2RCxJQUhGLG1CQUdFQSxJQUhGO0FBQUEsVUFJRUMsS0FKRixtQkFJRUEsS0FKRjs7QUFPQSxVQUFJRCxJQUFJLElBQUlzRCxFQUFaLEVBQWdCO0FBQ2QsYUFBSzFFLEdBQUwsQ0FBUyxDQUFULEtBQWU0RyxVQUFVLENBQUMsQ0FBRCxDQUF6QjtBQUNBLGFBQUs1RyxHQUFMLENBQVMsQ0FBVCxLQUFlNEcsVUFBVSxDQUFDLENBQUQsQ0FBekI7QUFDRDs7QUFFRCxVQUFJeEYsSUFBSSxJQUFJdUQsSUFBWixFQUFrQjtBQUNoQixhQUFLM0UsR0FBTCxDQUFTLENBQVQsS0FBZTRHLFVBQVUsQ0FBQyxDQUFELENBQXpCO0FBQ0EsYUFBSzVHLEdBQUwsQ0FBUyxDQUFULEtBQWU0RyxVQUFVLENBQUMsQ0FBRCxDQUF6QjtBQUNEOztBQUVELFVBQUl2RixLQUFLLElBQUlxRCxFQUFiLEVBQWlCO0FBQ2YsYUFBSzFFLEdBQUwsQ0FBUyxDQUFULEtBQWU0RyxVQUFVLENBQUMsQ0FBRCxDQUF6QjtBQUNBLGFBQUs1RyxHQUFMLENBQVMsQ0FBVCxLQUFlNEcsVUFBVSxDQUFDLENBQUQsQ0FBekI7QUFDRDs7QUFFRCxVQUFJdkYsS0FBSyxJQUFJc0QsSUFBYixFQUFtQjtBQUNqQixhQUFLM0UsR0FBTCxDQUFTLENBQVQsS0FBZTRHLFVBQVUsQ0FBQyxDQUFELENBQXpCO0FBQ0EsYUFBSzVHLEdBQUwsQ0FBUyxDQUFULEtBQWU0RyxVQUFVLENBQUMsQ0FBRCxDQUF6QjtBQUNEOztBQUVELFdBQUtMLFNBQUwsQ0FBZUgsS0FBZjtBQUVBLFdBQUszRSxXQUFMOztBQUVBLGNBQVEsS0FBS3lFLFNBQWI7QUFDRSxhQUFLLElBQUw7QUFDRSxlQUFLNUYsV0FBTCxDQUFpQkcsSUFBakIsR0FBd0IsS0FBS29FLE1BQUwsQ0FBWUgsRUFBWixDQUFlakUsSUFBdkM7QUFDQSxlQUFLSCxXQUFMLENBQWlCRSxJQUFqQixHQUF3QixLQUFLc0csZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBeEI7QUFDQTs7QUFDRixhQUFLLE1BQUw7QUFFRSxlQUFLeEcsV0FBTCxDQUFpQkcsSUFBakIsR0FBd0IsS0FBS29FLE1BQUwsQ0FBWUYsSUFBWixDQUFpQmxFLElBQXpDO0FBQ0EsZUFBS0gsV0FBTCxDQUFpQkUsSUFBakIsR0FBd0IsS0FBS3NHLGdCQUFMLENBQXNCLE1BQXRCLENBQXhCO0FBQ0E7O0FBQ0YsYUFBSyxNQUFMO0FBQ0UsZUFBS3hHLFdBQUwsQ0FBaUJHLElBQWpCLEdBQXdCLEtBQUtvRSxNQUFMLENBQVl6RCxJQUFaLENBQWlCWCxJQUF6QztBQUNBLGVBQUtILFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCLEtBQUtzRyxnQkFBTCxDQUFzQixNQUF0QixDQUF4QjtBQUNBOztBQUNGLGFBQUssT0FBTDtBQUNFLGVBQUt4RyxXQUFMLENBQWlCRyxJQUFqQixHQUF3QixLQUFLb0UsTUFBTCxDQUFZeEQsS0FBWixDQUFrQlosSUFBMUM7QUFDQSxlQUFLSCxXQUFMLENBQWlCRSxJQUFqQixHQUF3QixLQUFLc0csZ0JBQUwsQ0FBc0IsT0FBdEIsQ0FBeEI7QUFDQTs7QUFDRjtBQUNFLGVBQUt4RyxXQUFMLENBQWlCRSxJQUFqQixHQUF3QixLQUFLLENBQTdCO0FBQ0E7QUFwQko7O0FBd0JBLFdBQUt1RyxTQUFMLENBQWVYLEtBQWY7QUFDQTVELDhFQUFBLENBQWdDNEQsS0FBaEM7QUFDQSxXQUFLM0UsV0FBTDtBQUNBLFdBQUtuQixXQUFMLENBQWlCTSxDQUFqQixHQUFxQixLQUFLWixHQUFMLENBQVMsQ0FBVCxDQUFyQjtBQUNBLFdBQUtNLFdBQUwsQ0FBaUJPLENBQWpCLEdBQXFCLEtBQUtiLEdBQUwsQ0FBUyxDQUFULENBQXJCO0FBQ0Q7Ozs7RUFoUmlCRCxNOztBQW9ScEIsaUVBQWVpRSxLQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvV0E7QUFDQTs7SUFFTWpFLE07QUFDSixrQkFBWUMsR0FBWixFQUFnQkMsS0FBaEIsRUFBc0JDLE1BQXRCLEVBQTZCQyxhQUE3QixFQUE0QztBQUFBOztBQUMxQyxTQUFLSCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxRQUFNRSxXQUFXLEdBQUdILEtBQUssR0FBQyxDQUExQjtBQUNBLFFBQU1JLFlBQVksR0FBR0gsTUFBTSxHQUFDLENBQTVCO0FBRUEsU0FBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CO0FBQ2pCQyxXQUFLLEVBQUVKLGFBRFU7QUFFakJLLFVBQUksRUFBRSxDQUZXO0FBR2pCQyxVQUFJLEVBQUUsQ0FIVztBQUlqQkMsYUFBTyxFQUFFVCxLQUpRO0FBS2pCVSxjQUFRLEVBQUVULE1BTE87QUFNakJVLE9BQUMsRUFBRVosR0FBRyxDQUFDLENBQUQsQ0FOVztBQU9qQmEsT0FBQyxFQUFFYixHQUFHLENBQUMsQ0FBRCxDQVBXO0FBUWpCYyxhQUFPLEVBQUViLEtBUlE7QUFTakJjLGNBQVEsRUFBRWI7QUFUTyxLQUFuQjtBQVdBLFNBQUtjLE1BQUwsR0FBYyxJQUFJQyxtREFBSixDQUFXLElBQVgsRUFBZ0JiLFdBQWhCLEVBQTRCQyxZQUE1QixDQUFkO0FBQ0EsU0FBS2EsR0FBTCxHQUFXLEtBQUtGLE1BQUwsQ0FBWUUsR0FBdkI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsS0FBS0gsTUFBTCxDQUFZRyxNQUExQjtBQUNBLFNBQUtDLElBQUwsR0FBWSxLQUFLSixNQUFMLENBQVlJLElBQXhCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtMLE1BQUwsQ0FBWUssS0FBekI7QUFDQSxTQUFLK0IsTUFBTCxHQUFjLEtBQUtwQyxNQUFMLENBQVlvQyxNQUExQjtBQUNBLFNBQUs5QixVQUFMLEdBQWtCO0FBQ2hCSixTQUFHLEVBQUUsS0FEVztBQUVoQkMsWUFBTSxFQUFFLEtBRlE7QUFHaEJDLFVBQUksRUFBRSxLQUhVO0FBSWhCQyxXQUFLLEVBQUU7QUFKUyxLQUFsQjtBQU9EOzs7O1dBRUQsc0JBQWE7QUFBRTtBQUNiLGlCQUFZLENBQUMsS0FBS3JCLEdBQUwsQ0FBUyxDQUFULENBQUQsRUFBYSxLQUFLQSxHQUFMLENBQVMsQ0FBVCxDQUFiLENBQVo7QUFBQSxVQUFLWSxDQUFMO0FBQUEsVUFBT0MsQ0FBUDtBQUNBLFVBQUtVLEVBQUwsR0FDRVgsQ0FBQyxHQUFFLENBQUMsS0FBS1gsS0FBTCxHQUFhLEtBQUtlLE1BQUwsQ0FBWWYsS0FBMUIsSUFBaUMsQ0FEdEM7QUFBQSxVQUFRdUIsRUFBUixHQUVFWCxDQUFDLElBQUUsS0FBS1gsTUFBTCxHQUFjLEtBQUtjLE1BQUwsQ0FBWWQsTUFBNUIsQ0FGSDtBQUlBLGFBQU8sQ0FBQ3FCLEVBQUQsRUFBSUMsRUFBSixDQUFQO0FBQ0Q7OztXQUVELHVCQUFjO0FBQ1osV0FBS1IsTUFBTCxDQUFZUyxXQUFaO0FBQ0EsV0FBSzJCLE1BQUwsR0FBYyxLQUFLcEMsTUFBTCxDQUFZb0MsTUFBMUI7QUFDQSxXQUFLbEMsR0FBTCxHQUFXLEtBQUtGLE1BQUwsQ0FBWUUsR0FBdkI7QUFDQSxXQUFLQyxNQUFMLEdBQWMsS0FBS0gsTUFBTCxDQUFZRyxNQUExQjtBQUNBLFdBQUtDLElBQUwsR0FBWSxLQUFLSixNQUFMLENBQVlJLElBQXhCO0FBQ0EsV0FBS0MsS0FBTCxHQUFhLEtBQUtMLE1BQUwsQ0FBWUssS0FBekI7QUFDRDs7O1dBRUQsd0JBQWVLLElBQWYsRUFBcUJDLFdBQXJCLEVBQWtDO0FBQ2hDLFVBQUlDLFNBQUo7O0FBQ0EsY0FBT0YsSUFBUDtBQUNFLGFBQUssS0FBTDtBQUNFRSxtQkFBUyxHQUFHLFFBQVo7QUFDQTs7QUFDRixhQUFLLFFBQUw7QUFDRUEsbUJBQVMsR0FBRyxLQUFaO0FBQ0E7O0FBQ0YsYUFBSyxNQUFMO0FBQ0VBLG1CQUFTLEdBQUcsT0FBWjtBQUNBOztBQUNGLGFBQUssT0FBTDtBQUNFQSxtQkFBUyxHQUFHLE1BQVo7QUFDQTs7QUFDRjtBQUNFQSxtQkFBUyxHQUFHLElBQVo7QUFDQTtBQWZKOztBQWlCQSxXQUFLTixVQUFMLENBQWdCSSxJQUFoQixJQUF3QkcsbUVBQWdCLENBQUNILElBQUQsRUFBTyxLQUFLQSxJQUFMLENBQVAsRUFBbUJDLFdBQVcsQ0FBQ0MsU0FBRCxDQUE5QixDQUF4QztBQUNBLGFBQU8sS0FBS04sVUFBTCxDQUFnQkksSUFBaEIsQ0FBUDtBQUNEOzs7V0FFRCxjQUFLSSxHQUFMLEVBQVU7QUFDUkEsU0FBRyxDQUFDQyxTQUFKLE9BQUFELEdBQUcscUJBQWNFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEtBQUszQixXQUFuQixDQUFkLEVBQUg7QUFDQSxXQUFLVSxNQUFMLENBQVlrQixjQUFaO0FBQ0EsV0FBS2xCLE1BQUwsQ0FBWW1CLElBQVosQ0FBaUJMLEdBQWpCO0FBQ0Q7Ozs7OztBQUdILGlFQUFlL0IsTUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUNBO0FBQ0E7O0lBRU1pSCxJO0FBQ0osZ0JBQVlsRixHQUFaLEVBQWlCbUYsWUFBakIsRUFBK0I7QUFBQTs7QUFDN0IsU0FBS0MsV0FBTCxHQUFtQixPQUFLLEVBQXhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixHQUFoQjtBQUNBLFFBQU1DLFdBQVcsR0FBRyxDQUFDLEtBQUcsQ0FBSixFQUFPLEtBQUcsQ0FBVixDQUFwQjtBQUNBLFNBQUtmLE1BQUwsY0FBa0JnQiw0Q0FBbEIsR0FBeUJELFdBQXpCLDRCQUF5QzVFLDJEQUF6QyxJQUE2RHlFLFlBQTdEO0FBQ0F6RSxrRUFBQSxHQUF3QixLQUFLNkQsTUFBN0I7QUFDQSxTQUFLdkUsR0FBTCxHQUFXQSxHQUFYLENBTjZCLENBTzdCOztBQUNBVSxpRUFBQSxHQUF1QixFQUF2QjtBQUNBLFNBQUs4RSxZQUFMLEdBQW9CLElBQUlDLDBDQUFKLEVBQXBCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEtBQUtGLFlBQWpCO0FBQ0EsU0FBS2pCLE1BQUwsQ0FBWWxFLElBQVosQ0FBaUJMLEdBQWpCO0FBQ0FVLGdFQUFBLEdBQXNCLElBQXRCO0FBQ0FBLGdFQUFBLEdBQXNCLEtBQXRCO0FBQ0FBLHFFQUFBLEdBQTJCLENBQTNCO0FBQ0EsU0FBS2lGLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFjQyxJQUFkLENBQW1CLElBQW5CLENBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEtBQUtBLElBQUwsQ0FBVUQsSUFBVixDQUFlLElBQWYsQ0FBWjtBQUNBbEYscUVBQUE7QUFDRDs7OztXQUVELG9CQUFXO0FBQ1QsYUFBTyxLQUFLb0YsR0FBTCxNQUFjLEtBQUtDLElBQUwsRUFBckI7QUFDRDs7O1dBRUQsZUFBSztBQUNILGFBQU9yRixpRUFBQSxHQUEyQixDQUFsQztBQUNEOzs7V0FFRCxnQkFBTztBQUNMLGFBQU8sS0FBSzZELE1BQUwsQ0FBWUcsRUFBWixJQUFrQixDQUF6QjtBQUNEOzs7V0FJRCxnQkFBTztBQUNMLFVBQUksS0FBS3NCLFFBQUwsRUFBSixFQUFxQjtBQUNuQixhQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0Q7QUFDRjs7O1dBRUQsb0JBQVc7QUFBQTs7QUFDVCxXQUFLQyxTQUFMLEdBQWlCQyxxQkFBcUIsQ0FBQyxLQUFLUixRQUFOLENBQXRDO0FBQ0EsVUFBSVMsR0FBRyxHQUFHQyxJQUFJLENBQUNELEdBQUwsRUFBVjtBQUNBLFVBQUlFLE9BQU8sR0FBR0YsR0FBRyxHQUFHLEtBQUtHLElBQXpCOztBQUVBLFVBQUlELE9BQU8sR0FBRyxLQUFLbEIsV0FBbkIsRUFBZ0M7QUFDOUIsYUFBS21CLElBQUwsR0FBWUgsR0FBRyxHQUFJRSxPQUFPLEdBQUcsS0FBS2xCLFdBQWxDO0FBQ0EsWUFBTWIsTUFBTSxHQUFHN0QsOERBQWY7QUFDQSxhQUFLVixHQUFMLENBQVN3RyxTQUFULENBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXdCOUYscURBQXhCLEVBQXNDQSxzREFBdEM7QUFDQTZELGNBQU0sQ0FBQ2tDLElBQVAsQ0FBWSxLQUFLZixJQUFMLENBQVVwQixLQUF0QjtBQUNBcEUsY0FBTSxDQUFDQyxNQUFQLENBQWMsS0FBS3VGLElBQUwsQ0FBVWdCLE9BQXhCLEVBQWlDQyxPQUFqQyxDQUF5QyxVQUFBQyxLQUFLO0FBQUEsaUJBQUlBLEtBQUssQ0FBQ0gsSUFBTixDQUFXLEtBQUksQ0FBQ2YsSUFBTCxDQUFVcEIsS0FBckIsQ0FBSjtBQUFBLFNBQTlDO0FBQ0EsYUFBS29CLElBQUwsQ0FBVW1CLE9BQVY7QUFDQSxhQUFLbkIsSUFBTCxDQUFVckYsSUFBVixDQUFlLEtBQUtMLEdBQXBCO0FBQ0F1RSxjQUFNLENBQUNsRSxJQUFQLENBQVksS0FBS0wsR0FBakI7QUFDQSxhQUFLNkYsSUFBTDs7QUFDQSxZQUFJLEtBQUtJLFdBQVQsRUFBc0I7QUFDcEJhLDhCQUFvQixDQUFDLEtBQUtaLFNBQU4sQ0FBcEI7QUFDQSxjQUFNYSxVQUFVLEdBQUcsYUFBbkI7O0FBQ0EsY0FBSSxLQUFLakIsR0FBTCxFQUFKLEVBQWdCO0FBQ2QsaUJBQUs5RixHQUFMLENBQVNnSCxTQUFULEdBQXFCLGlCQUFyQjtBQUNBLGlCQUFLaEgsR0FBTCxDQUFTaUgsUUFBVCxDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUFzQixHQUF0QixFQUEwQixHQUExQjtBQUNBLGlCQUFLakgsR0FBTCxDQUFTZ0gsU0FBVCxHQUFxQixTQUFyQjtBQUNBLGlCQUFLaEgsR0FBTCxDQUFTa0gsSUFBVCxrQkFBd0JILFVBQXhCO0FBQ0EsaUJBQUsvRyxHQUFMLENBQVNtSCxRQUFULENBQWtCLGtCQUFsQixFQUFzQyxLQUFHLENBQXpDLEVBQTRDLEtBQUcsQ0FBL0M7QUFDQSxpQkFBS25ILEdBQUwsQ0FBU2tILElBQVQsa0JBQXdCSCxVQUF4QjtBQUNBLGlCQUFLL0csR0FBTCxDQUFTbUgsUUFBVCxDQUFrQiwyQkFBbEIsRUFBK0MsS0FBRyxDQUFsRCxFQUFvRCxLQUFHLENBQXZEO0FBQ0EsaUJBQUtuSCxHQUFMLENBQVNtSCxRQUFULENBQWtCLHdCQUFsQixFQUE0QyxLQUFHLEdBQS9DLEVBQW1ELEtBQUcsR0FBdEQ7QUFDQSxpQkFBS25ILEdBQUwsQ0FBU21ILFFBQVQsQ0FBa0IsMkJBQWxCLEVBQStDLEtBQUcsQ0FBbEQsRUFBb0QsS0FBRyxDQUF2RDtBQUNBLGlCQUFLbkgsR0FBTCxDQUFTbUgsUUFBVCxDQUFrQiwwQkFBbEIsRUFBOEMsS0FBRyxHQUFqRCxFQUFxRCxLQUFHLEdBQXhEO0FBQ0Q7O0FBQ0QsY0FBSSxLQUFLcEIsSUFBTCxFQUFKLEVBQWlCO0FBQ2YsZ0JBQU1tQixJQUFJLEdBQUd4Ryx5REFBYjtBQUNBLGlCQUFLVixHQUFMLENBQVNnSCxTQUFULEdBQXFCLGlCQUFyQjtBQUNBLGlCQUFLaEgsR0FBTCxDQUFTaUgsUUFBVCxDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUFzQixHQUF0QixFQUEwQixHQUExQjtBQUNBLGlCQUFLakgsR0FBTCxDQUFTZ0gsU0FBVCxHQUFxQixTQUFyQjtBQUNBLGlCQUFLaEgsR0FBTCxDQUFTa0gsSUFBVCxrQkFBd0JILFVBQXhCO0FBQ0EsaUJBQUsvRyxHQUFMLENBQVNtSCxRQUFULENBQWtCLFdBQWxCLEVBQStCLEtBQUssSUFBcEMsRUFBMEMsS0FBSyxDQUEvQztBQUNBLGlCQUFLbkgsR0FBTCxDQUFTa0gsSUFBVCxrQkFBd0JILFVBQXhCO0FBQ0EsaUJBQUsvRyxHQUFMLENBQVNtSCxRQUFULENBQWtCLFdBQWxCLEVBQStCLEtBQUssSUFBcEMsRUFBMEMsS0FBSyxDQUEvQztBQUNBLGlCQUFLbkgsR0FBTCxDQUFTa0gsSUFBVCxrQkFBd0JILFVBQXhCO0FBQ0EsaUJBQUsvRyxHQUFMLENBQVNtSCxRQUFULENBQWtCLElBQWxCLEVBQXdCLEtBQUssSUFBN0IsRUFBbUMsS0FBSyxDQUF4QztBQUNBLGlCQUFLbkgsR0FBTCxDQUFTa0gsSUFBVCxrQkFBd0JILFVBQXhCO0FBQ0EsaUJBQUsvRyxHQUFMLENBQVNtSCxRQUFULENBQWtCLDJCQUFsQixFQUErQyxLQUFHLENBQWxELEVBQW9ELEtBQUcsQ0FBdkQ7QUFDQSxpQkFBS25ILEdBQUwsQ0FBU21ILFFBQVQsQ0FBa0IsMEJBQWxCLEVBQThDLEtBQUcsR0FBakQsRUFBcUQsS0FBRyxHQUF4RDtBQUNEOztBQUNEO0FBQ0Q7QUFDRjtBQUNGOzs7V0FFRCxnQkFBTztBQUNMLFdBQUtaLElBQUwsR0FBWUYsSUFBSSxDQUFDRCxHQUFMLEVBQVo7QUFDQSxXQUFLVCxRQUFMO0FBQ0FRLDJCQUFxQixDQUFDLEtBQUtSLFFBQU4sQ0FBckI7QUFDRDs7Ozs7O0FBR0gsaUVBQWVULElBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUNBOztJQUNNa0MsUztBQUNKLHFCQUFZcEgsR0FBWixFQUFpQm1GLFlBQWpCLEVBQStCO0FBQUE7O0FBQzdCLFNBQUtuRixHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLbUYsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLE9BQUssRUFBeEI7QUFDQSxTQUFLaUMsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVksS0FBS0EsSUFBTCxDQUFVMUIsSUFBVixDQUFlLElBQWYsQ0FBWjtBQUNEOzs7O1dBRUQsZ0JBQU87QUFDTCxXQUFLTSxTQUFMLEdBQWlCQyxxQkFBcUIsQ0FBQyxLQUFLbUIsSUFBTixDQUF0QztBQUNBLFVBQUlsQixHQUFHLEdBQUdDLElBQUksQ0FBQ0QsR0FBTCxFQUFWO0FBQ0EsVUFBSUUsT0FBTyxHQUFHRixHQUFHLEdBQUcsS0FBS0csSUFBekI7O0FBQ0EsVUFBSUQsT0FBTyxHQUFHLEtBQUtsQixXQUFuQixFQUFnQztBQUM5QixZQUFNMkIsVUFBVSxHQUFHLGFBQW5CO0FBQ0EsYUFBS00sS0FBTCxJQUFjLElBQWQ7QUFDQSxZQUFNRSxHQUFHLEdBQUdoRSxJQUFJLENBQUNjLEtBQUwsQ0FBVyxNQUFNZCxJQUFJLENBQUNPLEdBQUwsQ0FBUyxNQUFNLEtBQUt1RCxLQUFwQixDQUFOLEdBQW1DLENBQTlDLENBQVo7QUFDQSxZQUFNRyxLQUFLLEdBQUdqRSxJQUFJLENBQUNjLEtBQUwsQ0FBVyxNQUFNZCxJQUFJLENBQUNPLEdBQUwsQ0FBUyxNQUFNLEtBQUt1RCxLQUFwQixDQUFOLEdBQW1DLENBQTlDLENBQWQ7QUFDQSxZQUFNSSxJQUFJLEdBQUdsRSxJQUFJLENBQUNjLEtBQUwsQ0FBVyxNQUFNZCxJQUFJLENBQUNPLEdBQUwsQ0FBUyxNQUFNLEtBQUt1RCxLQUFwQixDQUFOLEdBQW1DLENBQTlDLENBQWI7QUFDQSxZQUFNSyxLQUFLLGtCQUFXSCxHQUFYLGNBQWtCQyxLQUFsQixjQUEyQkMsSUFBM0IsV0FBWDtBQUNBLGFBQUt6SCxHQUFMLENBQVN3RyxTQUFULENBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLEdBQXZCLEVBQTJCLEdBQTNCO0FBQ0EsYUFBS3hHLEdBQUwsQ0FBU0MsU0FBVCxDQUFtQlMsaUVBQW5CLEVBQTZDLENBQTdDLEVBQWdELENBQWhEO0FBQ0EsYUFBS1YsR0FBTCxDQUFTZ0gsU0FBVCxHQUFxQlUsS0FBckI7QUFDQSxhQUFLMUgsR0FBTCxDQUFTaUgsUUFBVCxDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUFzQixHQUF0QixFQUEwQixHQUExQjtBQUNBLGFBQUtqSCxHQUFMLENBQVNnSCxTQUFULEdBQXFCLFNBQXJCO0FBQ0EsYUFBS2hILEdBQUwsQ0FBU2tILElBQVQsdUJBQTZCSCxVQUE3QjtBQUNBLGFBQUsvRyxHQUFMLENBQVNtSCxRQUFULENBQWtCLGFBQWxCLEVBQWlDLEtBQUssQ0FBdEMsRUFBeUMsS0FBSyxDQUE5QztBQUNBLGFBQUtuSCxHQUFMLENBQVNrSCxJQUFULHVCQUE2QkgsVUFBN0I7QUFDQSxhQUFLL0csR0FBTCxDQUFTbUgsUUFBVCxDQUFrQiwwQkFBbEIsRUFBOEMsS0FBSyxDQUFuRCxFQUFzRCxLQUFLLElBQTNEO0FBRUEsYUFBS25ILEdBQUwsQ0FBU0MsU0FBVCxDQUFtQixLQUFLa0YsWUFBeEIsRUFBc0MsRUFBdEMsRUFBMEMsQ0FBMUMsRUFBNkMsRUFBN0MsRUFBaUQsRUFBakQsRUFBcUQsS0FBSyxDQUExRCxFQUE2RCxLQUFLLENBQWxFLEVBQXFFLEVBQXJFLEVBQXlFLEVBQXpFOztBQUVBLFlBQUl6RSwwREFBSixFQUEwQjtBQUN4Qm9HLDhCQUFvQixDQUFDLEtBQUtaLFNBQU4sQ0FBcEI7QUFDQSxjQUFNeUIsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBaEI7QUFDQUYsaUJBQU8sQ0FBQ0csZUFBUixDQUF3QixVQUF4QjtBQUNBQyxvRUFBTztBQUNSO0FBQ0Y7QUFDRjs7O1dBRUQsa0JBQVM7QUFDUCxXQUFLeEIsSUFBTCxHQUFZRixJQUFJLENBQUNELEdBQUwsRUFBWjtBQUNBLFdBQUtrQixJQUFMO0FBRUQ7Ozs7OztBQUlILGlFQUFlRixTQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTs7SUFFTTdCLE07Ozs7O0FBQ0osa0JBQVlySCxHQUFaLEVBQWdCQyxLQUFoQixFQUFzQkMsTUFBdEIsRUFBNkJDLGFBQTdCLEVBQTRDO0FBQUE7O0FBQUE7O0FBQzFDLDhCQUFNSCxHQUFOLEVBQVVDLEtBQVYsRUFBZ0JDLE1BQWhCLEVBQXVCQyxhQUF2QjtBQUNBLFVBQUtnRSxLQUFMLEdBQWEsSUFBYjtBQUNBLFVBQUsyRixlQUFMLEdBQXVCQyxVQUFVLENBQUMsTUFBSzVGLEtBQU4sQ0FBVixHQUF5QmtCLElBQUksQ0FBQ0MsSUFBTCxDQUFVLENBQVYsQ0FBaEQ7QUFDQSxVQUFLakIsSUFBTCxHQUFZLEtBQUcsTUFBS0YsS0FBcEI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsVUFBSzRGLE9BQUwsR0FBZSxJQUFmO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFVBQUt6RCxFQUFMLEdBQVUsRUFBVjtBQUNBLFVBQUszQixNQUFMLEdBQWM7QUFDWkgsUUFBRSxFQUFFO0FBQ0ZJLGlCQUFTLEVBQUUsQ0FEVDtBQUVGckUsWUFBSSxFQUFFLEtBQUs7QUFGVCxPQURRO0FBS1prRSxVQUFJLEVBQUU7QUFDSkcsaUJBQVMsRUFBRSxDQURQO0FBRUpyRSxZQUFJLEVBQUUsS0FBSztBQUZQLE9BTE07QUFTWlcsVUFBSSxFQUFFO0FBQ0owRCxpQkFBUyxFQUFFLENBRFA7QUFFSnJFLFlBQUksRUFBRSxLQUFLO0FBRlAsT0FUTTtBQWFaWSxXQUFLLEVBQUU7QUFDTHlELGlCQUFTLEVBQUUsQ0FETjtBQUVMckUsWUFBSSxFQUFFLEtBQUs7QUFGTjtBQWJLLEtBQWQ7QUFUMEM7QUEyQjNDOzs7O1dBRUQsb0JBQVd5SixHQUFYLEVBQWdCO0FBQ2QsY0FBT0EsR0FBUDtBQUNFLGFBQUssSUFBTDtBQUNFLGVBQUtsSyxHQUFMLENBQVMsQ0FBVCxJQUFjLE1BQUksRUFBbEI7QUFDQTs7QUFDRixhQUFLLE1BQUw7QUFDRSxlQUFLQSxHQUFMLENBQVMsQ0FBVCxJQUFjLENBQUMsRUFBZjtBQUNBOztBQUNGLGFBQUssTUFBTDtBQUNFLGVBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsTUFBSSxFQUFsQjtBQUNBOztBQUNGLGFBQUssT0FBTDtBQUNFLGVBQUtBLEdBQUwsQ0FBUyxDQUFULElBQWMsQ0FBQyxFQUFmO0FBQ0E7QUFaSjtBQWNEOzs7V0FFRCwwQkFBaUIrRSxTQUFqQixFQUE0QjtBQUMxQixXQUFLVixJQUFMLEdBQVksTUFBTSxLQUFLRixLQUFMLEdBQWEsS0FBS0MsYUFBeEIsQ0FBWjs7QUFDQSxVQUFJLEtBQUtTLE1BQUwsQ0FBWUUsU0FBWixFQUF1QkQsU0FBdkIsSUFBb0MsS0FBS1QsSUFBN0MsRUFBbUQ7QUFDakQsYUFBS1EsTUFBTCxDQUFZRSxTQUFaLEVBQXVCRCxTQUF2QjtBQUNBLGVBQU8sS0FBSyxDQUFaO0FBQ0QsT0FIRCxNQUdPLElBQUksS0FBS0QsTUFBTCxDQUFZRSxTQUFaLEVBQXVCRCxTQUF2QixJQUFvQyxJQUFJLEtBQUtULElBQWpELEVBQXVEO0FBQzVELGFBQUtRLE1BQUwsQ0FBWUUsU0FBWixFQUF1QkQsU0FBdkI7QUFDQSxlQUFPLEtBQUssQ0FBWjtBQUNELE9BSE0sTUFHQSxJQUFJLEtBQUtELE1BQUwsQ0FBWUUsU0FBWixFQUF1QkQsU0FBdkIsSUFBb0MsSUFBSSxLQUFLVCxJQUFqRCxFQUF1RDtBQUM1RCxhQUFLUSxNQUFMLENBQVlFLFNBQVosRUFBdUJELFNBQXZCO0FBQ0EsZUFBTyxLQUFLLENBQVo7QUFDRCxPQUhNLE1BR0EsSUFBSSxLQUFLRCxNQUFMLENBQVlFLFNBQVosRUFBdUJELFNBQXZCLElBQW9DLElBQUksS0FBS1QsSUFBakQsRUFBdUQ7QUFDNUQsYUFBS1EsTUFBTCxDQUFZRSxTQUFaLEVBQXVCRCxTQUF2QjtBQUNBLGVBQU8sS0FBSyxDQUFaO0FBQ0QsT0FITSxNQUdBLElBQUksS0FBS0QsTUFBTCxDQUFZRSxTQUFaLEVBQXVCRCxTQUF2QixHQUFtQyxJQUFJLEtBQUtULElBQWhELEVBQXNEO0FBQzNELGFBQUtRLE1BQUwsQ0FBWUUsU0FBWixFQUF1QkQsU0FBdkIsR0FBbUMsQ0FBbkM7QUFDQSxlQUFPLEtBQUssQ0FBWjtBQUNEO0FBQ0Y7OztXQUVELG1CQUFVc0IsS0FBVixFQUFpQjtBQUFBLGlEQUNHQSxLQURIO0FBQUE7O0FBQUE7QUFDYiw0REFBdUI7QUFBQSxjQUFmTyxJQUFlO0FBQUUsY0FBSSxLQUFLcEUsY0FBTCxDQUFvQixLQUFwQixFQUEyQm9FLElBQTNCLENBQUosRUFBc0M7QUFBTztBQUR6RDtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUViLFVBQUksS0FBS3JGLFVBQUwsQ0FBZ0JKLEdBQXBCLEVBQXlCO0FBQ3ZCLGFBQUtsQixHQUFMLENBQVMsQ0FBVCxJQUFjLEtBQUtzQixVQUFMLENBQWdCSixHQUFoQixHQUFzQixFQUFwQztBQUNEOztBQUpZLGtEQU1Ha0YsS0FOSDtBQUFBOztBQUFBO0FBTWIsK0RBQXVCO0FBQUEsY0FBZk8sS0FBZTtBQUFFLGNBQUksS0FBS3BFLGNBQUwsQ0FBb0IsUUFBcEIsRUFBOEJvRSxLQUE5QixDQUFKLEVBQXlDO0FBQU87QUFONUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPYixVQUFJLEtBQUtyRixVQUFMLENBQWdCSCxNQUFwQixFQUE0QjtBQUMxQixhQUFLbkIsR0FBTCxDQUFTLENBQVQsSUFBYyxLQUFLc0IsVUFBTCxDQUFnQkgsTUFBaEIsR0FBeUIsRUFBdkM7QUFDRDs7QUFUWSxrREFXR2lGLEtBWEg7QUFBQTs7QUFBQTtBQVdiLCtEQUF1QjtBQUFBLGNBQWZPLE1BQWU7QUFBRSxjQUFJLEtBQUtwRSxjQUFMLENBQW9CLE1BQXBCLEVBQTRCb0UsTUFBNUIsQ0FBSixFQUF1QztBQUFPO0FBWDFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBWWIsVUFBSSxLQUFLckYsVUFBTCxDQUFnQkYsSUFBcEIsRUFBMEI7QUFDeEIsYUFBS3BCLEdBQUwsQ0FBUyxDQUFULElBQWMsS0FBS3NCLFVBQUwsQ0FBZ0JGLElBQWhCLEdBQXVCLEVBQXJDO0FBQ0Q7O0FBZFksa0RBZ0JHZ0YsS0FoQkg7QUFBQTs7QUFBQTtBQWdCYiwrREFBdUI7QUFBQSxjQUFmTyxNQUFlO0FBQUUsY0FBSSxLQUFLcEUsY0FBTCxDQUFvQixPQUFwQixFQUE2Qm9FLE1BQTdCLENBQUosRUFBd0M7QUFBTztBQWhCM0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpQmIsVUFBSSxLQUFLckYsVUFBTCxDQUFnQkQsS0FBcEIsRUFBMkI7QUFDekIsYUFBS3JCLEdBQUwsQ0FBUyxDQUFULElBQWMsS0FBS3NCLFVBQUwsQ0FBZ0JELEtBQWhCLEdBQXdCLEVBQXRDO0FBQ0Q7QUFFSjs7O1dBRUQsc0JBQWE7QUFDWCxhQUFPZ0UsSUFBSSxDQUFDYyxLQUFMLENBQVcsS0FBSzhELFlBQUwsR0FBb0IsQ0FBL0IsSUFBb0MsQ0FBcEMsS0FBMEMsQ0FBakQ7QUFDRDs7O1dBRUQsZUFBTTtBQUNKLFdBQUtBLFlBQUwsR0FBb0IsRUFBcEI7QUFDRDs7O1dBRUQsY0FBSzdELEtBQUwsRUFBWTtBQUNWLGlCQU1JLENBQ0Y1RCxzREFERSxFQUVGQSxzREFGRSxFQUdGQSxzREFIRSxFQUlGQSxzREFKRSxFQUtGQSwwREFMRSxDQU5KO0FBQUEsVUFDRWtDLEVBREY7QUFBQSxVQUVFQyxJQUZGO0FBQUEsVUFHRXZELElBSEY7QUFBQSxVQUlFQyxLQUpGO0FBQUEsVUFLRThJLEtBTEY7O0FBYUEsVUFBSUEsS0FBSyxJQUFJLEtBQUtILE9BQUwsR0FBZSxDQUE1QixFQUErQjtBQUM3QixhQUFLNUYsYUFBTCxHQUFxQixHQUFyQjtBQUNBLGFBQUs0RixPQUFMLElBQWdCLENBQWhCO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsYUFBSzVGLGFBQUwsR0FBcUIsQ0FBckI7QUFDRDs7QUFFRCxVQUFJLEtBQUs0RixPQUFMLEdBQWUsQ0FBbkIsRUFBc0IsS0FBS0EsT0FBTCxHQUFlLENBQWY7O0FBQ3RCLFVBQUksQ0FBQ0csS0FBRCxJQUFVLEtBQUtILE9BQUwsR0FBZSxJQUE3QixFQUFtQztBQUNqQyxZQUFJLENBQUN0RixFQUFELElBQU8sQ0FBQ0MsSUFBUixJQUFnQixDQUFDdEQsS0FBakIsSUFBMEIsQ0FBQ0QsSUFBL0IsRUFBcUM7QUFDbkMsZUFBSzRJLE9BQUwsSUFBZ0IsQ0FBaEI7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLQSxPQUFMLElBQWdCLENBQWhCO0FBQ0Q7QUFDRjs7QUFDRCxVQUFJLEtBQUtDLFlBQVQsRUFBdUIsS0FBS0EsWUFBTDtBQUN2QixVQUFJLEtBQUtHLFlBQUwsR0FBb0IsQ0FBeEIsRUFBMkIsS0FBS0gsWUFBTCxHQUFvQixDQUFwQjtBQUUzQixXQUFLMUQsU0FBTCxDQUFlSCxLQUFmLEVBaENVLENBa0NWOztBQUNBLFVBQUkxQixFQUFKLEVBQVE7QUFDTixZQUFJdEQsSUFBSSxJQUFJQyxLQUFLLElBQUksQ0FBQyxLQUFLQyxVQUFMLENBQWdCSixHQUF0QyxFQUEyQztBQUN6QyxlQUFLbEIsR0FBTCxDQUFTLENBQVQsS0FBZSxDQUFDLEtBQUs4SixlQUFOLEdBQXdCLEtBQUsxRixhQUE1QztBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtwRSxHQUFMLENBQVMsQ0FBVCxLQUFlLENBQUMsS0FBS21FLEtBQU4sR0FBYyxLQUFLQyxhQUFsQztBQUNEOztBQUNELGFBQUs5RCxXQUFMLENBQWlCRyxJQUFqQixHQUF3QixLQUFLb0UsTUFBTCxDQUFZSCxFQUFaLENBQWVqRSxJQUF2Qzs7QUFDQSxZQUFJLENBQUNXLElBQUQsSUFBUyxDQUFDQyxLQUFkLEVBQXFCO0FBQ25CLGVBQUtmLFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCLEtBQUtzRyxnQkFBTCxDQUFzQixJQUF0QixDQUF4QjtBQUNEO0FBQ0YsT0E3Q1MsQ0ErQ1Y7OztBQUNBLFVBQUluQyxJQUFKLEVBQVU7QUFDUixZQUFJdkQsSUFBSSxJQUFJQyxLQUFaLEVBQW1CO0FBQ2pCLGVBQUtyQixHQUFMLENBQVMsQ0FBVCxLQUFlLEtBQUs4SixlQUFMLEdBQXVCLEtBQUsxRixhQUEzQztBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtwRSxHQUFMLENBQVMsQ0FBVCxLQUFlLEtBQUttRSxLQUFMLEdBQWEsS0FBS0MsYUFBakM7QUFDRDs7QUFDRCxhQUFLOUQsV0FBTCxDQUFpQkcsSUFBakIsR0FBd0IsS0FBS29FLE1BQUwsQ0FBWUYsSUFBWixDQUFpQmxFLElBQXpDOztBQUNBLFlBQUksQ0FBQ1csSUFBRCxJQUFTLENBQUNDLEtBQWQsRUFBcUI7QUFDbkIsZUFBS2YsV0FBTCxDQUFpQkUsSUFBakIsR0FBd0IsS0FBS3NHLGdCQUFMLENBQXNCLE1BQXRCLENBQXhCO0FBQ0Q7QUFDRixPQTFEUyxDQTREVjs7O0FBQ0EsVUFBSTFGLElBQUosRUFBVTtBQUNSLFlBQUlzRCxFQUFFLElBQUlDLElBQUksSUFBSSxDQUFDLEtBQUtyRCxVQUFMLENBQWdCRixJQUFuQyxFQUF5QztBQUN2QyxlQUFLcEIsR0FBTCxDQUFTLENBQVQsS0FBZSxDQUFDLEtBQUs4SixlQUFOLEdBQXdCLEtBQUsxRixhQUE1QztBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtwRSxHQUFMLENBQVMsQ0FBVCxLQUFlLENBQUMsS0FBS21FLEtBQU4sR0FBYyxLQUFLQyxhQUFsQztBQUNEOztBQUNELGFBQUs5RCxXQUFMLENBQWlCRyxJQUFqQixHQUF3QixLQUFLb0UsTUFBTCxDQUFZekQsSUFBWixDQUFpQlgsSUFBekM7QUFDQSxhQUFLSCxXQUFMLENBQWlCRSxJQUFqQixHQUF3QixLQUFLc0csZ0JBQUwsQ0FBc0IsTUFBdEIsQ0FBeEI7QUFDRCxPQXJFUyxDQXVFVjs7O0FBQ0EsVUFBSXpGLEtBQUosRUFBVztBQUNULFlBQUlxRCxFQUFFLElBQUlDLElBQVYsRUFBZ0I7QUFDZCxlQUFLM0UsR0FBTCxDQUFTLENBQVQsS0FBZSxLQUFLOEosZUFBTCxHQUF1QixLQUFLMUYsYUFBM0M7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLcEUsR0FBTCxDQUFTLENBQVQsS0FBZSxLQUFLbUUsS0FBTCxHQUFhLEtBQUtDLGFBQWpDO0FBQ0Q7O0FBQ0QsYUFBSzlELFdBQUwsQ0FBaUJHLElBQWpCLEdBQXdCLEtBQUtvRSxNQUFMLENBQVl4RCxLQUFaLENBQWtCWixJQUExQztBQUNBLGFBQUtILFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCLEtBQUtzRyxnQkFBTCxDQUFzQixPQUF0QixDQUF4QjtBQUNELE9BaEZTLENBa0ZWOzs7QUFDQSxVQUFJLENBQUNwQyxFQUFELElBQU8sQ0FBQ0MsSUFBUixJQUFnQixDQUFDdEQsS0FBakIsSUFBMEIsQ0FBQ0QsSUFBL0IsRUFBcUM7QUFDbkMsYUFBS2QsV0FBTCxDQUFpQkUsSUFBakIsR0FBd0IsS0FBSyxDQUE3QjtBQUNEOztBQUVELHFDQUFjLEtBQUtSLEdBQW5CO0FBQUEsVUFBT1ksQ0FBUDtBQUFBLFVBQVNDLENBQVQ7O0FBQ0EsVUFBSXdKLE9BQUo7O0FBQ0EsVUFBSXpKLENBQUMsR0FBRyxDQUFDLEVBQVQsRUFBYTtBQUNYeUosZUFBTyxHQUFHLE1BQVY7QUFDQSxhQUFLQyxVQUFMLENBQWdCRCxPQUFoQjtBQUNBRSxxRUFBVSxDQUFDRixPQUFELEVBQVU3SCxpRUFBVixDQUFWO0FBQ0QsT0FKRCxNQUlPLElBQUk1QixDQUFDLEdBQUcsTUFBSSxFQUFaLEVBQWdCO0FBQ3JCeUosZUFBTyxHQUFHLE9BQVY7QUFDQSxhQUFLQyxVQUFMLENBQWdCRCxPQUFoQjtBQUNBRSxxRUFBVSxDQUFDRixPQUFELEVBQVU3SCxpRUFBVixDQUFWO0FBQ0QsT0FKTSxNQUlBLElBQUkzQixDQUFDLEdBQUcsQ0FBQyxFQUFULEVBQWE7QUFDbEJ3SixlQUFPLEdBQUcsSUFBVjtBQUNBLGFBQUtDLFVBQUwsQ0FBZ0JELE9BQWhCO0FBQ0FFLHFFQUFVLENBQUNGLE9BQUQsRUFBVTdILGlFQUFWLENBQVY7QUFDRCxPQUpNLE1BSUEsSUFBSTNCLENBQUMsR0FBRyxNQUFJLEVBQVosRUFBZ0I7QUFDckJ3SixlQUFPLEdBQUcsTUFBVjtBQUNBLGFBQUtDLFVBQUwsQ0FBZ0JELE9BQWhCO0FBQ0FFLHFFQUFVLENBQUNGLE9BQUQsRUFBVTdILGlFQUFWLENBQVY7QUFDRDs7QUFFRCxVQUFJLENBQUMsS0FBS2dJLFVBQUwsRUFBTCxFQUF3QjtBQUN0QjtBQUNBLGFBQUtsSyxXQUFMLENBQWlCRSxJQUFqQixHQUF3QixLQUFLLENBQTdCO0FBQ0Q7O0FBRUQsV0FBS2lCLFdBQUw7QUFDQSxXQUFLbkIsV0FBTCxDQUFpQk0sQ0FBakIsR0FBcUIsS0FBS1osR0FBTCxDQUFTLENBQVQsQ0FBckI7QUFDQSxXQUFLTSxXQUFMLENBQWlCTyxDQUFqQixHQUFxQixLQUFLYixHQUFMLENBQVMsQ0FBVCxDQUFyQjtBQUNEOzs7O0VBck5rQkQsNEM7O0FBeU5yQixpRUFBZXNILE1BQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztJQVVNRSxJO0FBQ0osZ0JBQVlrRCxRQUFaLEVBQXNCO0FBQUE7O0FBQ3BCLFNBQUtDLGFBQUw7QUFDQSxTQUFLdEUsS0FBTCxHQUFhLEVBQWI7QUFDQSxRQUFJdUUsT0FBSjtBQUNBLFNBQUtDLFNBQUwsR0FBaUI7QUFDZmxHLFFBQUUsRUFBRW1HLFNBRFc7QUFFZmxHLFVBQUksRUFBRWtHLFNBRlM7QUFHZnpKLFVBQUksRUFBRXlKLFNBSFM7QUFJZnhKLFdBQUssRUFBRXdKO0FBSlEsS0FBakI7QUFNQSxRQUFJQyxRQUFKOztBQUNBLFFBQUlMLFFBQUosRUFBYztBQUNaLFVBQU1KLE9BQU8sR0FBR3JJLE1BQU0sQ0FBQytJLElBQVAsQ0FBWU4sUUFBWixFQUFzQixDQUF0QixDQUFoQjtBQUNBLFVBQU1PLFFBQVEsR0FBR2hKLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjd0ksUUFBZCxFQUF3QixDQUF4QixDQUFqQjtBQUNBLFdBQUtRLE9BQUwsc0JBQW1CRCxRQUFRLENBQUNDLE9BQTVCOztBQUNBLGNBQU9aLE9BQVA7QUFDRSxhQUFLLElBQUw7QUFDRSxlQUFLTyxTQUFMLENBQWVqRyxJQUFmLEdBQXNCcUcsUUFBdEI7QUFDQUYsa0JBQVEsR0FBRyxHQUFYO0FBQ0EsZUFBS0csT0FBTCxDQUFhLENBQWI7QUFDQTs7QUFDRixhQUFLLE1BQUw7QUFDRSxlQUFLTCxTQUFMLENBQWVsRyxFQUFmLEdBQW9Cc0csUUFBcEI7QUFDQUYsa0JBQVEsR0FBRyxHQUFYO0FBQ0EsZUFBS0csT0FBTCxDQUFhLENBQWI7QUFDQTs7QUFDRixhQUFLLE1BQUw7QUFDRSxlQUFLTCxTQUFMLENBQWV2SixLQUFmLEdBQXVCMkosUUFBdkI7QUFDQUYsa0JBQVEsR0FBRyxHQUFYO0FBQ0EsZUFBS0csT0FBTCxDQUFhLENBQWI7QUFDQTs7QUFDRixhQUFLLE9BQUw7QUFDRSxlQUFLTCxTQUFMLENBQWV4SixJQUFmLEdBQXNCNEosUUFBdEI7QUFDQUYsa0JBQVEsR0FBRyxHQUFYO0FBQ0EsZUFBS0csT0FBTCxDQUFhLENBQWI7QUFDQTtBQXBCSjtBQXNCRCxLQTFCRCxNQTBCTztBQUNMLFdBQUtBLE9BQUwsR0FBZSxDQUFDLENBQUQsRUFBRyxDQUFILENBQWY7QUFDRDs7QUFFRHpJLGlFQUFBLFdBQXdCLEtBQUt5SSxPQUE3QixLQUEwQyxJQUExQztBQUVBQyx3RUFBaUIsQ0FBQyxJQUFELENBQWpCO0FBQ0EsUUFBSTlFLEtBQUosRUFBVytFLFFBQVgsRUFBcUJDLFNBQXJCO0FBQ0EsUUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxRQUFJQyxLQUFLLEdBQUdDLDZEQUFVLENBQUMsSUFBRCxDQUF0QjtBQUNBLFFBQUlDLFFBQVEsR0FBR0YsS0FBSyxDQUFDRyxLQUFOLENBQVksRUFBWixDQUFmOztBQUNBLFFBQUloQixRQUFKLEVBQWM7QUFDWjtBQUNBZSxjQUFRLEdBQUdBLFFBQVEsQ0FBQ0UsTUFBVCxDQUFnQixVQUFBQyxJQUFJO0FBQUEsZUFBSUEsSUFBSSxLQUFLYixRQUFiO0FBQUEsT0FBcEIsQ0FBWCxDQUZZLENBRTJDOztBQUN2REssY0FBUSxHQUFHUywrREFBWSxDQUFDTixLQUFLLENBQUNPLE1BQVAsQ0FBdkIsQ0FIWSxDQUcyQjs7QUFDdkMsVUFBSVYsUUFBUSxLQUFLRyxLQUFLLENBQUNPLE1BQXZCLEVBQStCO0FBQUE7O0FBQUU7QUFDL0JsQixlQUFPLEdBQUd0RixJQUFJLENBQUNjLEtBQUwsQ0FBV2QsSUFBSSxDQUFDSSxNQUFMLEtBQWMsQ0FBekIsQ0FBVjtBQUNBLGFBQUtxRyxVQUFMLEdBQWtCdEosdURBQUEsV0FBa0IySSxRQUFsQixTQUE2QkcsS0FBN0IsU0FBcUNYLE9BQXJDLEVBQWxCO0FBQ0FvQiw2RUFBa0IsQ0FBQyxJQUFELEVBQU9ULEtBQVAsQ0FBbEI7QUFDQWxGLGFBQUssR0FBRyxLQUFLNEYsY0FBTCxDQUFvQlYsS0FBcEIsQ0FBUjs7QUFDQSw0QkFBS2xGLEtBQUwsRUFBVzZGLElBQVgsdUNBQW1CN0YsS0FBbkI7O0FBQ0E1RCxxRUFBQSxXQUF3QixLQUFLeUksT0FBN0IsS0FBMEMsSUFBMUM7QUFDRCxPQVBELE1BT087QUFBQTs7QUFBRTtBQUNQaUIsa0VBQU8sQ0FBQ1YsUUFBRCxDQUFQLENBREssQ0FDYzs7QUFDbkJILGdCQUFRLENBQUNZLElBQVQsQ0FBY25CLFFBQWQsRUFGSyxDQUVvQjs7QUFDekJLLGdCQUFROztBQUNSLGFBQUssSUFBSXhJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd3SSxRQUFwQixFQUE4QnhJLENBQUMsRUFBL0IsRUFBbUM7QUFBRTBJLGtCQUFRLENBQUNZLElBQVQsQ0FBY1QsUUFBUSxDQUFDVyxHQUFULEVBQWQ7QUFBK0I7O0FBQ3BFZCxnQkFBUSxHQUFHQSxRQUFRLENBQUNlLElBQVQsR0FBZ0JDLElBQWhCLENBQXFCLEVBQXJCLENBQVg7QUFDQTFCLGVBQU8sR0FBR3RGLElBQUksQ0FBQ2MsS0FBTCxDQUFXZCxJQUFJLENBQUNJLE1BQUwsS0FBYyxDQUF6QixDQUFWO0FBQ0EsYUFBS3FHLFVBQUwsR0FBa0J0Six1REFBQSxXQUFrQjJJLFFBQVEsR0FBQyxDQUEzQixTQUErQkUsUUFBL0IsU0FBMENWLE9BQTFDLEVBQWxCOztBQUNBLFlBQUksQ0FBQyxLQUFLbUIsVUFBVixFQUFzQixDQUVyQjs7QUFDREMsNkVBQWtCLENBQUMsSUFBRCxFQUFPVixRQUFQLENBQWxCO0FBQ0FqRixhQUFLLEdBQUcsS0FBSzRGLGNBQUwsQ0FBb0JYLFFBQXBCLENBQVI7O0FBQ0EsNkJBQUtqRixLQUFMLEVBQVc2RixJQUFYLHdDQUFtQjdGLEtBQW5COztBQUNBNUQscUVBQUEsV0FBd0IsS0FBS3lJLE9BQTdCLEtBQTBDLElBQTFDO0FBQ0Q7QUFDRixLQTNCRCxNQTJCTztBQUNMRSxjQUFRLEdBQUdTLCtEQUFZLENBQUNOLEtBQUssQ0FBQ08sTUFBUCxDQUF2Qjs7QUFDQSxVQUFJVixRQUFRLEtBQUtHLEtBQUssQ0FBQ08sTUFBdkIsRUFBK0I7QUFBQTs7QUFDN0JsQixlQUFPLEdBQUd0RixJQUFJLENBQUNjLEtBQUwsQ0FBV2QsSUFBSSxDQUFDSSxNQUFMLEtBQWMsQ0FBekIsQ0FBVjtBQUNBLGFBQUtxRyxVQUFMLEdBQWtCdEosdURBQUEsV0FBa0IySSxRQUFsQixTQUE2QkcsS0FBN0IsU0FBcUNYLE9BQXJDLEVBQWxCO0FBQ0F2RSxhQUFLLEdBQUcsS0FBSzRGLGNBQUwsQ0FBb0JWLEtBQXBCLENBQVI7O0FBQ0EsNkJBQUtsRixLQUFMLEVBQVc2RixJQUFYLHdDQUFtQjdGLEtBQW5COztBQUNBNUQscUVBQUEsV0FBd0IsS0FBS3lJLE9BQTdCLEtBQTBDLElBQTFDO0FBQ0QsT0FORCxNQU1PO0FBQUE7O0FBQ0xpQixrRUFBTyxDQUFDVixRQUFELENBQVA7O0FBQ0EsYUFBSyxJQUFJN0ksRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBR3dJLFFBQXBCLEVBQThCeEksRUFBQyxFQUEvQixFQUFtQztBQUFFMEksa0JBQVEsQ0FBQ1ksSUFBVCxDQUFjVCxRQUFRLENBQUNXLEdBQVQsRUFBZDtBQUErQjs7QUFDcEVkLGdCQUFRLEdBQUdBLFFBQVEsQ0FBQ2UsSUFBVCxHQUFnQkMsSUFBaEIsQ0FBcUIsRUFBckIsQ0FBWDtBQUNBMUIsZUFBTyxHQUFHdEYsSUFBSSxDQUFDYyxLQUFMLENBQVdkLElBQUksQ0FBQ0ksTUFBTCxLQUFjLENBQXpCLENBQVY7QUFDQSxhQUFLcUcsVUFBTCxHQUFrQnRKLHVEQUFBLFdBQWtCMkksUUFBbEIsU0FBNkJFLFFBQTdCLFNBQXdDVixPQUF4QyxFQUFsQjtBQUNBb0IsNkVBQWtCLENBQUMsSUFBRCxFQUFPVixRQUFQLENBQWxCO0FBQ0FqRixhQUFLLEdBQUcsS0FBSzRGLGNBQUwsQ0FBb0JYLFFBQXBCLENBQVI7O0FBQ0EsNkJBQUtqRixLQUFMLEVBQVc2RixJQUFYLHdDQUFtQjdGLEtBQW5COztBQUNBNUQscUVBQUEsV0FBd0IsS0FBS3lJLE9BQTdCLEtBQTBDLElBQTFDO0FBQ0Q7QUFDRjs7QUFDRCxTQUFLcUIsZUFBTCxHQS9Gb0IsQ0FnR3BCO0FBQ0E7QUFDQTtBQUNBO0FBRUQ7Ozs7V0FFRCwyQkFBa0I7QUFDaEIsVUFBTUMsVUFBVSxHQUFHbEgsSUFBSSxDQUFDYyxLQUFMLENBQVduRSxNQUFNLENBQUMrSSxJQUFQLENBQVl2SSw2REFBWixFQUFrQ3FKLE1BQWxDLEdBQXlDLENBQXBELENBQW5CO0FBQ0EsV0FBS3JELE9BQUwsR0FBZSxFQUFmOztBQUNBLFdBQUssSUFBSTdGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc0SixVQUFwQixFQUFnQzVKLENBQUMsRUFBakMsRUFBcUM7QUFDbkMsWUFBSS9CLENBQUMsR0FBR3lFLElBQUksQ0FBQ2MsS0FBTCxDQUFXZCxJQUFJLENBQUNJLE1BQUwsS0FBYyxHQUF6QixJQUFnQyxFQUF4QztBQUNBLFlBQUk1RSxDQUFDLEdBQUd3RSxJQUFJLENBQUNjLEtBQUwsQ0FBV2QsSUFBSSxDQUFDSSxNQUFMLEtBQWMsR0FBekIsSUFBZ0MsRUFBeEM7QUFDQSxZQUFJekYsR0FBRyxHQUFHLENBQUNZLENBQUQsRUFBR0MsQ0FBSCxDQUFWO0FBQ0EsWUFBTTZILEtBQUssR0FBRyxJQUFJMUUsMkNBQUosQ0FBVWhFLEdBQVYsRUFBZSxFQUFmLEVBQWtCLEVBQWxCLEVBQXFCd0MsZ0VBQXJCLEVBQThDLE1BQTlDLEVBQXNELE1BQU8rSixVQUFVLEdBQUcsRUFBMUUsQ0FBZDtBQUNBLGFBQUsvRCxPQUFMLFdBQWdCRSxLQUFLLENBQUMxSSxHQUF0QixLQUErQjBJLEtBQS9CO0FBQ0Q7QUFDRjs7O1dBRUQseUJBQWdCO0FBQ2QsVUFBTThELFFBQVEsR0FBR0MsK0RBQVksRUFBN0I7QUFDQSxXQUFLQyxLQUFMLEdBQWEsRUFBYjs7QUFDQSxXQUFLLElBQUkvSixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNkosUUFBcEIsRUFBOEI3SixDQUFDLEVBQS9CLEVBQW1DO0FBQ2pDLFlBQUkvQixDQUFDLEdBQUd5RSxJQUFJLENBQUNjLEtBQUwsQ0FBV2QsSUFBSSxDQUFDSSxNQUFMLEtBQWMsR0FBekIsSUFBZ0MsRUFBeEM7O0FBQ0EsZUFBTzdFLENBQUMsR0FBRyxHQUFKLElBQVdBLENBQUMsR0FBRyxHQUF0QjtBQUEyQkEsV0FBQyxHQUFHeUUsSUFBSSxDQUFDYyxLQUFMLENBQVdkLElBQUksQ0FBQ0ksTUFBTCxLQUFjLEdBQXpCLElBQWdDLEVBQXBDO0FBQTNCOztBQUNBLFlBQUk1RSxDQUFDLEdBQUd3RSxJQUFJLENBQUNjLEtBQUwsQ0FBV2QsSUFBSSxDQUFDSSxNQUFMLEtBQWMsR0FBekIsSUFBZ0MsRUFBeEM7O0FBQ0EsZUFBTzVFLENBQUMsR0FBRyxHQUFKLElBQVdBLENBQUMsR0FBRyxHQUF0QjtBQUEyQkEsV0FBQyxHQUFHd0UsSUFBSSxDQUFDYyxLQUFMLENBQVdkLElBQUksQ0FBQ0ksTUFBTCxLQUFjLEdBQXpCLElBQWdDLEVBQXBDO0FBQTNCOztBQUNBLFlBQUl6RixHQUFHLEdBQUcsQ0FBQ1ksQ0FBRCxFQUFHQyxDQUFILENBQVY7QUFDQSxZQUFNOEwsSUFBSSxHQUFHLElBQUl2SywwQ0FBSixDQUFTcEMsR0FBVCxFQUFjLEVBQWQsRUFBaUIsRUFBakIsRUFBb0J3Qyw0REFBcEIsQ0FBYjtBQUNBLGFBQUtrSyxLQUFMLFdBQWNDLElBQUksQ0FBQzNNLEdBQW5CLEtBQTRCMk0sSUFBNUI7QUFDRDtBQUNGOzs7V0FFRCxtQkFBVTtBQUNSLFdBQUtDLE9BQUw7QUFDQTVLLFlBQU0sQ0FBQ0MsTUFBUCxDQUFjLEtBQUt5SyxLQUFuQixFQUEwQmpFLE9BQTFCLENBQWtDLFVBQUFrRSxJQUFJLEVBQUk7QUFDeENBLFlBQUksQ0FBQ2hFLE9BQUw7QUFDRCxPQUZELEVBRlEsQ0FLUjtBQUVEOzs7V0FFRCxtQkFBVTtBQUNSLHlDQUFpQjNHLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEtBQUt5SyxLQUFuQixDQUFqQixzQ0FBNEM7QUFBdkMsWUFBSUMsSUFBSSxzQkFBUjs7QUFDSCxZQUFJQSxJQUFJLENBQUNDLE9BQUwsRUFBSixFQUFvQjtBQUNsQixpQkFBTyxLQUFLRixLQUFMLFdBQWNDLElBQUksQ0FBQzNNLEdBQW5CLEVBQVA7QUFDQXdDLDJFQUFBO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7OztXQUdELGNBQUtWLEdBQUwsRUFBVTtBQUNSQSxTQUFHLENBQUNDLFNBQUosQ0FBYyxLQUFLK0osVUFBbkIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFEUSxDQUVSOztBQUNBOUosWUFBTSxDQUFDQyxNQUFQLENBQWMsS0FBS3lLLEtBQW5CLEVBQTBCakUsT0FBMUIsQ0FBa0MsVUFBQWtFLElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUN4SyxJQUFMLENBQVVMLEdBQVYsQ0FBSjtBQUFBLE9BQXRDO0FBQ0FFLFlBQU0sQ0FBQ0MsTUFBUCxDQUFjLEtBQUt1RyxPQUFuQixFQUE0QkMsT0FBNUIsQ0FBb0MsVUFBQUMsS0FBSztBQUFBLGVBQUlBLEtBQUssQ0FBQ3ZHLElBQU4sQ0FBV0wsR0FBWCxDQUFKO0FBQUEsT0FBekM7QUFDQUEsU0FBRyxDQUFDZ0gsU0FBSixHQUFnQixTQUFoQjtBQUNBaEgsU0FBRyxDQUFDa0gsSUFBSixHQUFXLFlBQVg7QUFDQWxILFNBQUcsQ0FBQ21ILFFBQUosa0JBQXVCLEtBQUtnQyxPQUE1QixTQUF5QyxFQUF6QyxFQUE2QyxFQUE3QztBQUNBbkosU0FBRyxDQUFDbUgsUUFBSixtQkFBd0J6RyxpRUFBeEIsR0FBb0QsR0FBcEQsRUFBeUQsRUFBekQ7QUFDQVYsU0FBRyxDQUFDK0ssU0FBSjtBQUNBL0ssU0FBRyxDQUFDeUIsV0FBSixHQUFrQixTQUFsQjtBQUNBekIsU0FBRyxDQUFDZ0wsTUFBSixDQUFXLEVBQVgsRUFBZSxHQUFmO0FBQ0FoTCxTQUFHLENBQUN3QixTQUFKLEdBQWdCLENBQWhCO0FBQ0F4QixTQUFHLENBQUNpTCxNQUFKLENBQVcsS0FBTXZLLHNFQUFBLEdBQThCLElBQS9CLEdBQXVDLEdBQXZELEVBQTRELEdBQTVEO0FBQ0FWLFNBQUcsQ0FBQ2tMLE1BQUo7QUFDQWxMLFNBQUcsQ0FBQytLLFNBQUo7QUFDQS9LLFNBQUcsQ0FBQ3lCLFdBQUosR0FBa0IsU0FBbEI7QUFDQXpCLFNBQUcsQ0FBQ2dMLE1BQUosQ0FBVyxFQUFYLEVBQWUsR0FBZjtBQUNBaEwsU0FBRyxDQUFDd0IsU0FBSixHQUFnQixFQUFoQjtBQUNBeEIsU0FBRyxDQUFDaUwsTUFBSixDQUFXLEtBQU12SyxpRUFBQSxHQUF5QixFQUExQixHQUFnQyxHQUFoRCxFQUFxRCxHQUFyRDtBQUNBVixTQUFHLENBQUNrTCxNQUFKO0FBQ0FsTCxTQUFHLENBQUMrSyxTQUFKO0FBQ0EvSyxTQUFHLENBQUN5QixXQUFKLEdBQWtCLFNBQWxCO0FBQ0F6QixTQUFHLENBQUNnTCxNQUFKLENBQVcsTUFBTSxDQUFDLElBQUl0SyxpRUFBQSxHQUF5QixFQUE5QixJQUFvQyxHQUFyRCxFQUEwRCxHQUExRDtBQUNBVixTQUFHLENBQUN3QixTQUFKLEdBQWdCLEVBQWhCO0FBQ0F4QixTQUFHLENBQUNpTCxNQUFKLENBQVcsR0FBWCxFQUFnQixHQUFoQjtBQUNBakwsU0FBRyxDQUFDa0wsTUFBSjtBQUNBbEwsU0FBRyxDQUFDK0ssU0FBSjtBQUNBL0ssU0FBRyxDQUFDeUIsV0FBSixHQUFrQixTQUFsQjtBQUNBekIsU0FBRyxDQUFDZ0wsTUFBSixDQUFXLEVBQVgsRUFBZSxHQUFmO0FBQ0FoTCxTQUFHLENBQUN3QixTQUFKLEdBQWdCLENBQWhCO0FBQ0F4QixTQUFHLENBQUNpTCxNQUFKLENBQVcsS0FBTXZLLDJFQUFBLEdBQW1DLEVBQXBDLEdBQTBDLEdBQTFELEVBQStELEdBQS9EO0FBQ0FWLFNBQUcsQ0FBQ2tMLE1BQUosR0FoQ1EsQ0FpQ1I7QUFDRDs7O1dBRUQsd0JBQWUxQixLQUFmLEVBQXNCO0FBQ3BCLFVBQUlsRixLQUFLLEdBQUcsRUFBWjs7QUFDQSxjQUFPa0YsS0FBUDtBQUNFLGFBQUssTUFBTDtBQUNFbEYsZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixLQUFHLENBQW5CLEVBQXNCLEVBQXRCLENBQVgsRUFERixDQUN5Qzs7QUFDdkM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxLQUFHLENBQUosRUFBTSxDQUFOLENBQVQsRUFBbUIsS0FBRyxDQUF0QixFQUF5QixFQUF6QixDQUFYLEVBRkYsQ0FFNEM7O0FBQzFDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLE1BQUksRUFBUCxDQUFULEVBQXFCLEtBQUcsQ0FBeEIsRUFBMkIsRUFBM0IsQ0FBWCxFQUhGLENBRzhDOztBQUM1QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLEtBQUcsQ0FBSixFQUFNLE1BQUksRUFBVixDQUFULEVBQXdCLEtBQUcsQ0FBM0IsRUFBOEIsRUFBOUIsQ0FBWCxFQUpGLENBSWlEOztBQUMvQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsRUFBaEIsRUFBb0IsS0FBRyxDQUF2QixDQUFYLEVBTEYsQ0FLeUM7O0FBQ3ZDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLEtBQUcsQ0FBTixDQUFULEVBQW1CLEVBQW5CLEVBQXVCLEtBQUcsQ0FBMUIsQ0FBWCxFQU5GLENBTTRDOztBQUMxQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLE1BQUksRUFBTCxFQUFRLENBQVIsQ0FBVCxFQUFxQixFQUFyQixFQUF5QixLQUFHLENBQTVCLENBQVgsRUFQRixDQU84Qzs7QUFDNUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxNQUFJLEVBQUwsRUFBUSxLQUFHLENBQVgsQ0FBVCxFQUF3QixFQUF4QixFQUE0QixLQUFHLENBQS9CLENBQVgsRUFSRixDQVFpRDs7QUFDL0MsaUJBQU83RyxLQUFQOztBQUNGLGFBQUssS0FBTDtBQUNFQSxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEtBQUcsQ0FBbkIsRUFBc0IsRUFBdEIsQ0FBWCxFQURGLENBQ3lDOztBQUN2QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLEtBQUcsQ0FBSixFQUFNLENBQU4sQ0FBVCxFQUFtQixLQUFHLENBQXRCLEVBQXlCLEVBQXpCLENBQVgsRUFGRixDQUU0Qzs7QUFDMUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsTUFBSSxFQUFQLENBQVQsRUFBcUIsS0FBRyxDQUF4QixFQUEyQixFQUEzQixDQUFYLEVBSEYsQ0FHOEM7O0FBQzVDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsS0FBRyxDQUFKLEVBQU0sTUFBSSxFQUFWLENBQVQsRUFBd0IsS0FBRyxDQUEzQixFQUE4QixFQUE5QixDQUFYLEVBSkYsQ0FJaUQ7O0FBQy9DN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixFQUFoQixFQUFvQixLQUFHLENBQXZCLENBQVgsRUFMRixDQUt5Qzs7QUFDdkM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsS0FBRyxDQUFOLENBQVQsRUFBbUIsRUFBbkIsRUFBdUIsS0FBRyxDQUExQixDQUFYLEVBTkYsQ0FNNEM7O0FBQzFDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsTUFBSSxFQUFMLEVBQVEsQ0FBUixDQUFULEVBQXFCLEVBQXJCLEVBQXlCLEdBQXpCLENBQVgsRUFQRixDQU82Qzs7QUFDM0MsaUJBQU83RyxLQUFQOztBQUNGLGFBQUssS0FBTDtBQUNFQSxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEtBQUcsQ0FBbkIsRUFBc0IsRUFBdEIsQ0FBWCxFQURGLENBQ3lDOztBQUN2QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLEtBQUcsQ0FBSixFQUFNLENBQU4sQ0FBVCxFQUFtQixLQUFHLENBQXRCLEVBQXlCLEVBQXpCLENBQVgsRUFGRixDQUU0Qzs7QUFDMUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEVBQWhCLEVBQW9CLEtBQUcsQ0FBdkIsQ0FBWCxFQUhGLENBR3lDOztBQUN2QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxLQUFHLENBQU4sQ0FBVCxFQUFtQixFQUFuQixFQUF1QixLQUFHLENBQTFCLENBQVgsRUFKRixDQUk0Qzs7QUFDMUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxNQUFJLEVBQUwsRUFBUSxDQUFSLENBQVQsRUFBcUIsRUFBckIsRUFBeUIsS0FBRyxDQUE1QixDQUFYLEVBTEYsQ0FLOEM7O0FBQzVDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsTUFBSSxFQUFMLEVBQVEsS0FBRyxDQUFYLENBQVQsRUFBd0IsRUFBeEIsRUFBNEIsS0FBRyxDQUEvQixDQUFYLEVBTkYsQ0FNaUQ7O0FBQy9DN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLE1BQUksRUFBUCxDQUFULEVBQXFCLEdBQXJCLEVBQTBCLEVBQTFCLENBQVgsRUFQRixDQU82Qzs7QUFDM0MsaUJBQU83RyxLQUFQOztBQUNGLGFBQUssS0FBTDtBQUNFQSxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEtBQUcsQ0FBbkIsRUFBc0IsRUFBdEIsQ0FBWCxFQURGLENBQ3lDOztBQUN2QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLEtBQUcsQ0FBSixFQUFNLENBQU4sQ0FBVCxFQUFtQixLQUFHLENBQXRCLEVBQXlCLEVBQXpCLENBQVgsRUFGRixDQUU0Qzs7QUFDMUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsTUFBSSxFQUFQLENBQVQsRUFBcUIsS0FBRyxDQUF4QixFQUEyQixFQUEzQixDQUFYLEVBSEYsQ0FHOEM7O0FBQzVDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsS0FBRyxDQUFKLEVBQU0sTUFBSSxFQUFWLENBQVQsRUFBd0IsS0FBRyxDQUEzQixFQUE4QixFQUE5QixDQUFYLEVBSkYsQ0FJaUQ7O0FBQy9DN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsTUFBSSxFQUFMLEVBQVEsQ0FBUixDQUFULEVBQXFCLEVBQXJCLEVBQXlCLEtBQUcsQ0FBNUIsQ0FBWCxFQUxGLENBSzhDOztBQUM1QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLE1BQUksRUFBTCxFQUFRLEtBQUcsQ0FBWCxDQUFULEVBQXdCLEVBQXhCLEVBQTRCLEtBQUcsQ0FBL0IsQ0FBWCxFQU5GLENBTWlEOztBQUMvQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsQ0FBWCxFQVBGLENBT3dDOztBQUN0QyxpQkFBTzdHLEtBQVA7O0FBQ0YsYUFBSyxLQUFMO0FBQ0VBLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxNQUFJLEVBQVAsQ0FBVCxFQUFxQixLQUFHLENBQXhCLEVBQTJCLEVBQTNCLENBQVgsRUFERixDQUM4Qzs7QUFDNUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxLQUFHLENBQUosRUFBTSxNQUFJLEVBQVYsQ0FBVCxFQUF3QixLQUFHLENBQTNCLEVBQThCLEVBQTlCLENBQVgsRUFGRixDQUVpRDs7QUFDL0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEVBQWhCLEVBQW9CLEtBQUcsQ0FBdkIsQ0FBWCxFQUhGLENBR3lDOztBQUN2QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxLQUFHLENBQU4sQ0FBVCxFQUFtQixFQUFuQixFQUF1QixLQUFHLENBQTFCLENBQVgsRUFKRixDQUk0Qzs7QUFDMUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxNQUFJLEVBQUwsRUFBUSxDQUFSLENBQVQsRUFBcUIsRUFBckIsRUFBeUIsS0FBRyxDQUE1QixDQUFYLEVBTEYsQ0FLOEM7O0FBQzVDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsTUFBSSxFQUFMLEVBQVEsS0FBRyxDQUFYLENBQVQsRUFBd0IsRUFBeEIsRUFBNEIsS0FBRyxDQUEvQixDQUFYLEVBTkYsQ0FNaUQ7O0FBQy9DN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixHQUFoQixFQUFxQixFQUFyQixDQUFYLEVBUEYsQ0FPd0M7O0FBQ3RDLGlCQUFPN0csS0FBUDs7QUFDRixhQUFLLElBQUw7QUFDRUEsZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixFQUFoQixFQUFvQixLQUFHLENBQXZCLENBQVgsRUFERixDQUN5Qzs7QUFDdkM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsS0FBRyxDQUFOLENBQVQsRUFBbUIsRUFBbkIsRUFBdUIsS0FBRyxDQUExQixDQUFYLEVBRkYsQ0FFNEM7O0FBQzFDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixLQUFHLENBQW5CLEVBQXNCLEVBQXRCLENBQVgsRUFIRixDQUd5Qzs7QUFDdkM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxLQUFHLENBQUosRUFBTSxDQUFOLENBQVQsRUFBbUIsS0FBRyxDQUF0QixFQUF5QixFQUF6QixDQUFYLEVBSkYsQ0FJNEM7O0FBQzFDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsTUFBSSxFQUFMLEVBQVEsQ0FBUixDQUFULEVBQXFCLEVBQXJCLEVBQXlCLEdBQXpCLENBQVgsRUFMRixDQUs2Qzs7QUFDM0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsTUFBSSxFQUFQLENBQVQsRUFBcUIsR0FBckIsRUFBMEIsRUFBMUIsQ0FBWCxFQU5GLENBTTZDOztBQUMzQyxpQkFBTzdHLEtBQVA7O0FBQ0YsYUFBSyxJQUFMO0FBQ0VBLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsS0FBRyxDQUFuQixFQUFzQixFQUF0QixDQUFYLEVBREYsQ0FDeUM7O0FBQ3ZDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsS0FBRyxDQUFKLEVBQU0sQ0FBTixDQUFULEVBQW1CLEtBQUcsQ0FBdEIsRUFBeUIsRUFBekIsQ0FBWCxFQUZGLENBRTRDOztBQUMxQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxNQUFJLEVBQVAsQ0FBVCxFQUFxQixLQUFHLENBQXhCLEVBQTJCLEVBQTNCLENBQVgsRUFIRixDQUc4Qzs7QUFDNUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxLQUFHLENBQUosRUFBTSxNQUFJLEVBQVYsQ0FBVCxFQUF3QixLQUFHLENBQTNCLEVBQThCLEVBQTlCLENBQVgsRUFKRixDQUlpRDs7QUFDL0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLENBQVgsRUFMRixDQUt3Qzs7QUFDdEM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxNQUFJLEVBQUwsRUFBUSxDQUFSLENBQVQsRUFBcUIsRUFBckIsRUFBeUIsR0FBekIsQ0FBWCxFQU5GLENBTTZDOztBQUMzQyxpQkFBTzdHLEtBQVA7O0FBQ0YsYUFBSyxJQUFMO0FBQ0VBLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLE1BQUksRUFBTCxFQUFRLENBQVIsQ0FBVCxFQUFxQixFQUFyQixFQUF5QixLQUFHLENBQTVCLENBQVgsRUFERixDQUM4Qzs7QUFDNUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxNQUFJLEVBQUwsRUFBUSxLQUFHLENBQVgsQ0FBVCxFQUF3QixFQUF4QixFQUE0QixLQUFHLENBQS9CLENBQVgsRUFGRixDQUVpRDs7QUFDL0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEtBQUcsQ0FBbkIsRUFBc0IsRUFBdEIsQ0FBWCxFQUhGLENBR3lDOztBQUN2QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLEtBQUcsQ0FBSixFQUFNLENBQU4sQ0FBVCxFQUFtQixLQUFHLENBQXRCLEVBQXlCLEVBQXpCLENBQVgsRUFKRixDQUk0Qzs7QUFDMUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsTUFBSSxFQUFQLENBQVQsRUFBcUIsR0FBckIsRUFBMEIsRUFBMUIsQ0FBWCxFQUxGLENBSzZDOztBQUMzQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsQ0FBWCxFQU5GLENBTXdDOztBQUN0QyxpQkFBTzdHLEtBQVA7O0FBQ0YsYUFBSyxJQUFMO0FBQ0VBLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsRUFBaEIsRUFBb0IsS0FBRyxDQUF2QixDQUFYLEVBREYsQ0FDeUM7O0FBQ3ZDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLEtBQUcsQ0FBTixDQUFULEVBQW1CLEVBQW5CLEVBQXVCLEtBQUcsQ0FBMUIsQ0FBWCxFQUZGLENBRTRDOztBQUMxQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxNQUFJLEVBQVAsQ0FBVCxFQUFxQixLQUFHLENBQXhCLEVBQTJCLEVBQTNCLENBQVgsRUFIRixDQUc4Qzs7QUFDNUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxLQUFHLENBQUosRUFBTSxNQUFJLEVBQVYsQ0FBVCxFQUF3QixLQUFHLENBQTNCLEVBQThCLEVBQTlCLENBQVgsRUFKRixDQUlpRDs7QUFDL0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEdBQWhCLEVBQXFCLEVBQXJCLENBQVgsRUFMRixDQUt3Qzs7QUFDdEM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxNQUFJLEVBQUwsRUFBUSxDQUFSLENBQVQsRUFBcUIsRUFBckIsRUFBeUIsR0FBekIsQ0FBWCxFQU5GLENBTTZDOztBQUMzQyxpQkFBTzdHLEtBQVA7O0FBQ0YsYUFBSyxJQUFMO0FBQ0VBLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLE1BQUksRUFBTCxFQUFRLENBQVIsQ0FBVCxFQUFxQixFQUFyQixFQUF5QixLQUFHLENBQTVCLENBQVgsRUFERixDQUM4Qzs7QUFDNUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxNQUFJLEVBQUwsRUFBUSxLQUFHLENBQVgsQ0FBVCxFQUF3QixFQUF4QixFQUE0QixLQUFHLENBQS9CLENBQVgsRUFGRixDQUVpRDs7QUFDL0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsTUFBSSxFQUFQLENBQVQsRUFBcUIsS0FBRyxDQUF4QixFQUEyQixFQUEzQixDQUFYLEVBSEYsQ0FHOEM7O0FBQzVDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsS0FBRyxDQUFKLEVBQU0sTUFBSSxFQUFWLENBQVQsRUFBd0IsS0FBRyxDQUEzQixFQUE4QixFQUE5QixDQUFYLEVBSkYsQ0FJaUQ7O0FBQy9DN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixFQUFoQixFQUFvQixHQUFwQixDQUFYLEVBTEYsQ0FLd0M7O0FBQ3RDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixHQUFoQixFQUFxQixFQUFyQixDQUFYLEVBTkYsQ0FNd0M7O0FBQ3RDLGlCQUFPN0csS0FBUDs7QUFDRixhQUFLLElBQUw7QUFDRUEsZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixFQUFoQixFQUFvQixLQUFHLENBQXZCLENBQVgsRUFERixDQUN5Qzs7QUFDdkM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsS0FBRyxDQUFOLENBQVQsRUFBbUIsRUFBbkIsRUFBdUIsS0FBRyxDQUExQixDQUFYLEVBRkYsQ0FFNEM7O0FBQzFDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsTUFBSSxFQUFMLEVBQVEsQ0FBUixDQUFULEVBQXFCLEVBQXJCLEVBQXlCLEtBQUcsQ0FBNUIsQ0FBWCxFQUhGLENBRzhDOztBQUM1QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLE1BQUksRUFBTCxFQUFRLEtBQUcsQ0FBWCxDQUFULEVBQXdCLEVBQXhCLEVBQTRCLEtBQUcsQ0FBL0IsQ0FBWCxFQUpGLENBSWlEOztBQUMvQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxNQUFJLEVBQVAsQ0FBVCxFQUFxQixHQUFyQixFQUEwQixFQUExQixDQUFYLEVBTEYsQ0FLNkM7O0FBQzNDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixHQUFoQixFQUFxQixFQUFyQixDQUFYLEVBTkYsQ0FNd0M7O0FBQ3RDLGlCQUFPN0csS0FBUDs7QUFDRixhQUFLLEdBQUw7QUFDRUEsZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVCxFQUFnQixFQUFoQixFQUFvQixLQUFHLENBQXZCLENBQVgsRUFERixDQUN5Qzs7QUFDdkM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsS0FBRyxDQUFOLENBQVQsRUFBbUIsRUFBbkIsRUFBdUIsS0FBRyxDQUExQixDQUFYLEVBRkYsQ0FFNEM7O0FBQzFDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsTUFBSSxFQUFMLEVBQVEsQ0FBUixDQUFULEVBQXFCLEVBQXJCLEVBQXlCLEdBQXpCLENBQVgsRUFIRixDQUc2Qzs7QUFDM0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsTUFBSSxFQUFQLENBQVQsRUFBcUIsR0FBckIsRUFBMEIsRUFBMUIsQ0FBWCxFQUpGLENBSTZDOztBQUMzQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsR0FBaEIsRUFBcUIsRUFBckIsQ0FBWCxFQUxGLENBS3dDOztBQUN0QyxpQkFBTzdHLEtBQVA7O0FBQ0YsYUFBSyxHQUFMO0FBQ0VBLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLE1BQUksRUFBTCxFQUFRLENBQVIsQ0FBVCxFQUFxQixFQUFyQixFQUF5QixLQUFHLENBQTVCLENBQVgsRUFERixDQUM4Qzs7QUFDNUM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxNQUFJLEVBQUwsRUFBUSxLQUFHLENBQVgsQ0FBVCxFQUF3QixFQUF4QixFQUE0QixLQUFHLENBQS9CLENBQVgsRUFGRixDQUVpRDs7QUFDL0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsTUFBSSxFQUFQLENBQVQsRUFBcUIsR0FBckIsRUFBMEIsRUFBMUIsQ0FBWCxFQUhGLENBRzZDOztBQUMzQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsQ0FBWCxFQUpGLENBSXdDOztBQUN0QzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsR0FBaEIsRUFBcUIsRUFBckIsQ0FBWCxFQUxGLENBS3dDOztBQUN0QyxpQkFBTzdHLEtBQVA7O0FBQ0YsYUFBSyxHQUFMO0FBQ0VBLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVQsRUFBZ0IsS0FBRyxDQUFuQixFQUFzQixFQUF0QixDQUFYLEVBREYsQ0FDeUM7O0FBQ3ZDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsS0FBRyxDQUFKLEVBQU0sQ0FBTixDQUFULEVBQW1CLEtBQUcsQ0FBdEIsRUFBeUIsRUFBekIsQ0FBWCxFQUZGLENBRTRDOztBQUMxQzdHLGVBQUssQ0FBQzZGLElBQU4sQ0FBVyxJQUFJZ0IsMENBQUosQ0FBUyxDQUFDLE1BQUksRUFBTCxFQUFRLENBQVIsQ0FBVCxFQUFxQixFQUFyQixFQUF5QixHQUF6QixDQUFYLEVBSEYsQ0FHNkM7O0FBQzNDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsQ0FBRCxFQUFHLE1BQUksRUFBUCxDQUFULEVBQXFCLEdBQXJCLEVBQTBCLEVBQTFCLENBQVgsRUFKRixDQUk2Qzs7QUFDM0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLENBQVgsRUFMRixDQUt3Qzs7QUFDdEMsaUJBQU83RyxLQUFQOztBQUNGLGFBQUssR0FBTDtBQUNFQSxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsTUFBSSxFQUFQLENBQVQsRUFBcUIsS0FBRyxDQUF4QixFQUEyQixFQUEzQixDQUFYLEVBREYsQ0FDOEM7O0FBQzVDN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsS0FBRyxDQUFKLEVBQU0sTUFBSSxFQUFWLENBQVQsRUFBd0IsS0FBRyxDQUEzQixFQUE4QixFQUE5QixDQUFYLEVBRkYsQ0FFaUQ7O0FBQy9DN0csZUFBSyxDQUFDNkYsSUFBTixDQUFXLElBQUlnQiwwQ0FBSixDQUFTLENBQUMsTUFBSSxFQUFMLEVBQVEsQ0FBUixDQUFULEVBQXFCLEVBQXJCLEVBQXlCLEdBQXpCLENBQVgsRUFIRixDQUc2Qzs7QUFDM0M3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLENBQVgsRUFKRixDQUl3Qzs7QUFDdEM3RyxlQUFLLENBQUM2RixJQUFOLENBQVcsSUFBSWdCLDBDQUFKLENBQVMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFULEVBQWdCLEdBQWhCLEVBQXFCLEVBQXJCLENBQVgsRUFMRixDQUt3Qzs7QUFDdEMsaUJBQU83RyxLQUFQO0FBMUhKO0FBNEhEOzs7Ozs7QUFNSCxpRUFBZW1CLElBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3VUE7QUFDQTtBQUNBO0FBR08sSUFBTXNDLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07QUFDM0IsTUFBSXJILHNEQUFKLEVBQXlCO0FBQ3ZCQSxzRUFBQSxHQUFrQyxJQUFsQztBQUNBLFdBQU9BLHNEQUFQO0FBQ0EsV0FBT0Esd0RBQVA7QUFDQSxXQUFPQSwyREFBUDtBQUNBLFdBQU9BLHVEQUFQO0FBQ0Q7O0FBQ0QsYUFBSXdFLDBDQUFKLHFCQUFZaEYsTUFBTSxDQUFDQyxNQUFQLENBQWNPLHNEQUFkLENBQVo7QUFDRCxDQVRNO0FBV0EsSUFBTVgsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDSCxJQUFELEVBQU93TCxRQUFQLEVBQWlCdEwsU0FBakIsRUFBK0I7QUFDN0QsTUFBSXVMLFFBQVEsR0FBRyxLQUFmO0FBQ0EsTUFBSUMsU0FBSixFQUFlQyxTQUFmO0FBQ0EsTUFBTUMsV0FBVyxHQUFHLEVBQXBCO0FBQ0EsTUFBTUMsV0FBVyxHQUFHLENBQXBCOztBQUNBLE1BQUk3TCxJQUFJLEtBQUssS0FBVCxJQUFrQkEsSUFBSSxLQUFLLFFBQS9CLEVBQXlDO0FBQ3ZDLFFBQU04TCxRQUFRLEdBQUdOLFFBQVEsQ0FBQyxDQUFELENBQXpCOztBQUNBLG9DQUE2QkEsUUFBUSxDQUFDLENBQUQsQ0FBckM7QUFBQSxRQUFPTyxRQUFQO0FBQUEsUUFBaUJDLFFBQWpCOztBQUNBLFFBQU1DLFNBQVMsR0FBRy9MLFNBQVMsQ0FBQyxDQUFELENBQTNCOztBQUNBLHFDQUErQkEsU0FBUyxDQUFDLENBQUQsQ0FBeEM7QUFBQSxRQUFPZ00sU0FBUDtBQUFBLFFBQWtCQyxTQUFsQjs7QUFFQSxZQUFRbk0sSUFBUjtBQUNFLFdBQUssS0FBTDtBQUNFMEwsaUJBQVMsR0FBSU8sU0FBUyxHQUFHSCxRQUFiLEdBQXlCRixXQUFyQztBQUNBRCxpQkFBUyxHQUFJTSxTQUFTLEdBQUdILFFBQWIsR0FBeUJELFdBQXJDO0FBQ0FKLGdCQUFRLEdBQ0xLLFFBQVEsR0FBR0csU0FBWixJQUNDRixRQUFRLEdBQUdJLFNBRFosSUFFQ0gsUUFBUSxHQUFHRSxTQUZaLElBR0FSLFNBSEEsSUFHYUMsU0FKZjtBQUtBOztBQUNGLFdBQUssUUFBTDtBQUNFRCxpQkFBUyxHQUFJSSxRQUFRLEdBQUdHLFNBQVosR0FBeUJMLFdBQXJDO0FBQ0FELGlCQUFTLEdBQUlHLFFBQVEsR0FBR0csU0FBWixHQUF5QkosV0FBckM7QUFDQUosZ0JBQVEsR0FDTEssUUFBUSxHQUFHRyxTQUFaLElBQ0NGLFFBQVEsR0FBR0ksU0FEWixJQUVDSCxRQUFRLEdBQUdFLFNBRlosSUFHQVIsU0FIQSxJQUdhQyxTQUpmO0FBS0E7O0FBQ0Y7QUFDRTtBQXBCSjs7QUF1QkEsUUFBSUYsUUFBSixFQUFjLE9BQU9RLFNBQVA7QUFFZixHQS9CRCxNQStCTztBQUNMLFFBQU1HLFFBQVEsR0FBR1osUUFBUSxDQUFDLENBQUQsQ0FBekI7O0FBQ0EscUNBQTZCQSxRQUFRLENBQUMsQ0FBRCxDQUFyQztBQUFBLFFBQU9hLFFBQVA7QUFBQSxRQUFpQkMsUUFBakI7O0FBQ0EsUUFBTUMsU0FBUyxHQUFHck0sU0FBUyxDQUFDLENBQUQsQ0FBM0I7O0FBQ0Esc0NBQStCQSxTQUFTLENBQUMsQ0FBRCxDQUF4QztBQUFBLFFBQU9zTSxTQUFQO0FBQUEsUUFBa0JDLFNBQWxCOztBQUVBLFlBQVF6TSxJQUFSO0FBQ0UsV0FBSyxNQUFMO0FBQ0UwTCxpQkFBUyxHQUFJYSxTQUFTLEdBQUdILFFBQWIsR0FBeUJSLFdBQXJDO0FBQ0FELGlCQUFTLEdBQUlZLFNBQVMsR0FBR0gsUUFBYixHQUF5QlAsV0FBckM7QUFDQUosZ0JBQVEsR0FDTFcsUUFBUSxHQUFHRyxTQUFaLElBQ0NGLFFBQVEsR0FBR0ksU0FEWixJQUVDSCxRQUFRLEdBQUdFLFNBRlosSUFHQWQsU0FIQSxJQUdhQyxTQUpmO0FBS0U7O0FBQ0osV0FBSyxPQUFMO0FBQ0VELGlCQUFTLEdBQUlVLFFBQVEsR0FBR0csU0FBWixHQUF5QlgsV0FBckM7QUFDQUQsaUJBQVMsR0FBSVMsUUFBUSxHQUFHRyxTQUFaLEdBQXlCVixXQUFyQztBQUNBSixnQkFBUSxHQUNMVyxRQUFRLEdBQUdHLFNBQVosSUFDQ0YsUUFBUSxHQUFHSSxTQURaLElBRUNILFFBQVEsR0FBR0UsU0FGWixJQUdBZCxTQUhBLElBR2FDLFNBSmY7QUFLRTs7QUFDSjtBQUNFO0FBcEJKOztBQXVCQSxRQUFJRixRQUFKLEVBQWMsT0FBT2MsU0FBUDtBQUVmOztBQUVELFNBQU8sS0FBUDtBQUVELENBdkVNO0FBeUVBLElBQU0xRCxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDRixPQUFELEVBQVUrRCxRQUFWLEVBQXVCO0FBQy9DLE1BQUlDLFdBQVcsc0JBQU9ELFFBQVEsQ0FBQ25ELE9BQWhCLENBQWY7O0FBQ0EsVUFBT1osT0FBUDtBQUNFLFNBQUssSUFBTDtBQUNFZ0UsaUJBQVcsQ0FBQyxDQUFELENBQVgsSUFBa0IsQ0FBbEI7QUFDQTs7QUFDRixTQUFLLE1BQUw7QUFDRUEsaUJBQVcsQ0FBQyxDQUFELENBQVgsSUFBa0IsQ0FBbEI7QUFDQTs7QUFDRixTQUFLLE1BQUw7QUFDRUEsaUJBQVcsQ0FBQyxDQUFELENBQVgsSUFBa0IsQ0FBbEI7QUFDQTs7QUFDRixTQUFLLE9BQUw7QUFDRUEsaUJBQVcsQ0FBQyxDQUFELENBQVgsSUFBa0IsQ0FBbEI7QUFDQTtBQVpKOztBQWNBLE1BQUk3TCx1REFBQSxXQUF3QjZMLFdBQXhCLEVBQUosRUFBNEM7QUFDMUM3TCwrREFBQSxHQUEyQkEsdURBQUEsV0FBd0I2TCxXQUF4QixFQUEzQjtBQUNELEdBRkQsTUFFTztBQUNMLFFBQU01RCxRQUFRLHVCQUFNSixPQUFOLEVBQWdCK0QsUUFBaEIsQ0FBZDs7QUFDQTVMLCtEQUFBLEdBQTJCLElBQUkrRSwwQ0FBSixDQUFTa0QsUUFBVCxDQUEzQjtBQUNBUyxxQkFBaUIsQ0FBQ2tELFFBQUQsQ0FBakI7QUFDQWxELHFCQUFpQixDQUFDMUksMkRBQUQsQ0FBakI7QUFDRDtBQUNGLENBeEJNO0FBMEJBLElBQU1vSixZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFBMEMsR0FBRyxFQUFJO0FBQ2pDLE1BQUloRCxLQUFLLEdBQUcsRUFBWjs7QUFDQSxNQUFJZ0QsR0FBRyxHQUFHLENBQVYsRUFBYTtBQUNYLFNBQUssSUFBSTNMLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILGlEQUFBLENBQWU4TCxHQUFmLEVBQW9CLENBQXBCLENBQXBCLEVBQTRDM0wsQ0FBQyxFQUE3QyxFQUFpRDtBQUFFMkksV0FBSyxDQUFDVyxJQUFOLENBQVcsQ0FBWDtBQUFlOztBQUNsRSxTQUFLLElBQUl0SixHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHSCxpREFBQSxDQUFlOEwsR0FBZixFQUFvQixDQUFwQixDQUFwQixFQUE0QzNMLEdBQUMsRUFBN0MsRUFBaUQ7QUFBRTJJLFdBQUssQ0FBQ1csSUFBTixDQUFXLENBQVg7QUFBZTs7QUFDbEUsU0FBSyxJQUFJdEosR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR0gsaURBQUEsQ0FBZThMLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBcEIsRUFBNEMzTCxHQUFDLEVBQTdDLEVBQWlEO0FBQUUySSxXQUFLLENBQUNXLElBQU4sQ0FBVyxDQUFYO0FBQWU7O0FBQ2xFLFNBQUssSUFBSXRKLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUdILGlEQUFBLENBQWU4TCxHQUFmLEVBQW9CLENBQXBCLENBQXBCLEVBQTRDM0wsR0FBQyxFQUE3QyxFQUFpRDtBQUFFMkksV0FBSyxDQUFDVyxJQUFOLENBQVcsQ0FBWDtBQUFlO0FBQ25FLEdBTEQsTUFLTyxJQUFJcUMsR0FBRyxHQUFHLENBQVYsRUFBYTtBQUNsQixTQUFLLElBQUkzTCxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHSCxpREFBQSxDQUFlOEwsR0FBZixFQUFvQixDQUFwQixDQUFwQixFQUE0QzNMLEdBQUMsRUFBN0MsRUFBaUQ7QUFBRTJJLFdBQUssQ0FBQ1csSUFBTixDQUFXLENBQVg7QUFBZTs7QUFDbEUsU0FBSyxJQUFJdEosR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR0gsaURBQUEsQ0FBZThMLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBcEIsRUFBNEMzTCxHQUFDLEVBQTdDLEVBQWlEO0FBQUUySSxXQUFLLENBQUNXLElBQU4sQ0FBVyxDQUFYO0FBQWU7O0FBQ2xFLFNBQUssSUFBSXRKLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUdILGlEQUFBLENBQWU4TCxHQUFmLEVBQW9CLENBQXBCLENBQXBCLEVBQTRDM0wsR0FBQyxFQUE3QyxFQUFpRDtBQUFFMkksV0FBSyxDQUFDVyxJQUFOLENBQVcsQ0FBWDtBQUFlO0FBQ25FLEdBSk0sTUFJQSxJQUFJcUMsR0FBRyxHQUFHLENBQVYsRUFBYTtBQUNsQixTQUFLLElBQUkzTCxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHSCxpREFBQSxDQUFlOEwsR0FBZixFQUFvQixDQUFwQixDQUFwQixFQUE0QzNMLEdBQUMsRUFBN0MsRUFBaUQ7QUFBRTJJLFdBQUssQ0FBQ1csSUFBTixDQUFXLENBQVg7QUFBZTs7QUFDbEUsU0FBSyxJQUFJdEosR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR0gsaURBQUEsQ0FBZThMLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBcEIsRUFBNEMzTCxHQUFDLEVBQTdDLEVBQWlEO0FBQUUySSxXQUFLLENBQUNXLElBQU4sQ0FBVyxDQUFYO0FBQWU7QUFDbkUsR0FITSxNQUdBO0FBQ0xYLFNBQUssQ0FBQ1csSUFBTixDQUFXLENBQVg7QUFDRDs7QUFFREMsU0FBTyxDQUFDWixLQUFELENBQVA7QUFFQSxTQUFPQSxLQUFLLENBQUNqRyxJQUFJLENBQUNjLEtBQUwsQ0FBV2QsSUFBSSxDQUFDSSxNQUFMLEtBQWM2RixLQUFLLENBQUNPLE1BQS9CLENBQUQsQ0FBWjtBQUVELENBdEJNO0FBd0JBLElBQU1YLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQTFELElBQUksRUFBSTtBQUN2QyxNQUFJOUMsRUFBRSxzQkFBTzhDLElBQUksQ0FBQ3lELE9BQVosQ0FBTjs7QUFDQXZHLElBQUUsQ0FBQyxDQUFELENBQUYsSUFBUyxDQUFUO0FBQ0FBLElBQUUsR0FBR0EsRUFBRSxDQUFDNkosUUFBSCxFQUFMOztBQUNBLE1BQUk1SixJQUFJLHNCQUFPNkMsSUFBSSxDQUFDeUQsT0FBWixDQUFSOztBQUNBdEcsTUFBSSxDQUFDLENBQUQsQ0FBSixJQUFXLENBQVg7QUFDQUEsTUFBSSxHQUFHQSxJQUFJLENBQUM0SixRQUFMLEVBQVA7O0FBQ0EsTUFBSW5OLElBQUksc0JBQU9vRyxJQUFJLENBQUN5RCxPQUFaLENBQVI7O0FBQ0E3SixNQUFJLENBQUMsQ0FBRCxDQUFKLElBQVcsQ0FBWDtBQUNBQSxNQUFJLEdBQUdBLElBQUksQ0FBQ21OLFFBQUwsRUFBUDs7QUFDQSxNQUFJbE4sS0FBSyxzQkFBT21HLElBQUksQ0FBQ3lELE9BQVosQ0FBVDs7QUFDQTVKLE9BQUssQ0FBQyxDQUFELENBQUwsSUFBWSxDQUFaO0FBQ0FBLE9BQUssR0FBR0EsS0FBSyxDQUFDa04sUUFBTixFQUFSOztBQUNBLE1BQ0UvTCx1REFBQSxDQUFxQmtDLEVBQXJCLEtBQ0NsQyx1REFBQSxDQUFxQmtDLEVBQXJCLEVBQXlCa0csU0FBekIsQ0FBbUNqRyxJQUFuQyxLQUE0QyxHQUQ3QyxJQUVBLENBQUM2QyxJQUFJLENBQUNvRCxTQUFMLENBQWVsRyxFQUhsQixFQUlFO0FBQ0E4QyxRQUFJLENBQUNvRCxTQUFMLENBQWVsRyxFQUFmLEdBQW9CbEMsdURBQUEsQ0FBcUJrQyxFQUFyQixDQUFwQjtBQUNBbEMsMkRBQUEsQ0FBcUJrQyxFQUFyQixFQUF5QmtHLFNBQXpCLENBQW1DakcsSUFBbkMsR0FBMEM2QyxJQUExQztBQUNEOztBQUNELE1BQ0VoRix1REFBQSxDQUFxQm1DLElBQXJCLEtBQ0NuQyx1REFBQSxDQUFxQm1DLElBQXJCLEVBQTJCaUcsU0FBM0IsQ0FBcUNsRyxFQUFyQyxLQUE0QyxHQUQ3QyxJQUVBLENBQUM4QyxJQUFJLENBQUNvRCxTQUFMLENBQWVqRyxJQUhsQixFQUlFO0FBQ0E2QyxRQUFJLENBQUNvRCxTQUFMLENBQWVqRyxJQUFmLEdBQXNCbkMsdURBQUEsQ0FBcUJtQyxJQUFyQixDQUF0QjtBQUNBbkMsMkRBQUEsQ0FBcUJtQyxJQUFyQixFQUEyQmlHLFNBQTNCLENBQXFDbEcsRUFBckMsR0FBMEM4QyxJQUExQztBQUNEOztBQUNELE1BQ0VoRix1REFBQSxDQUFxQnBCLElBQXJCLEtBQ0NvQix1REFBQSxDQUFxQnBCLElBQXJCLEVBQTJCd0osU0FBM0IsQ0FBcUN2SixLQUFyQyxLQUErQyxHQURoRCxJQUVBLENBQUNtRyxJQUFJLENBQUNvRCxTQUFMLENBQWV4SixJQUhsQixFQUlFO0FBQ0FvRyxRQUFJLENBQUNvRCxTQUFMLENBQWV4SixJQUFmLEdBQXNCb0IsdURBQUEsQ0FBcUJwQixJQUFyQixDQUF0QjtBQUNBb0IsMkRBQUEsQ0FBcUJwQixJQUFyQixFQUEyQndKLFNBQTNCLENBQXFDdkosS0FBckMsR0FBNkNtRyxJQUE3QztBQUNEOztBQUNELE1BQ0VoRix1REFBQSxDQUFxQm5CLEtBQXJCLEtBQ0NtQix1REFBQSxDQUFxQm5CLEtBQXJCLEVBQTRCdUosU0FBNUIsQ0FBc0N4SixJQUF0QyxLQUErQyxHQURoRCxJQUVBLENBQUNvRyxJQUFJLENBQUNvRCxTQUFMLENBQWV2SixLQUhsQixFQUlFO0FBQ0FtRyxRQUFJLENBQUNvRCxTQUFMLENBQWV2SixLQUFmLEdBQXVCbUIsdURBQUEsQ0FBcUJuQixLQUFyQixDQUF2QjtBQUNBbUIsMkRBQUEsQ0FBcUJuQixLQUFyQixFQUE0QnVKLFNBQTVCLENBQXNDeEosSUFBdEMsR0FBNkNvRyxJQUE3QztBQUNEO0FBQ0YsQ0E3Q007QUErQ0EsSUFBTStELFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUEvRCxJQUFJLEVBQUk7QUFDaEMsTUFBSThELEtBQUssR0FBRyxFQUFaOztBQUNBLE1BQUk1RyxFQUFFLHNCQUFPOEMsSUFBSSxDQUFDeUQsT0FBWixDQUFOOztBQUNBdkcsSUFBRSxDQUFDLENBQUQsQ0FBRixJQUFTLENBQVQ7QUFDQUEsSUFBRSxHQUFHQSxFQUFFLENBQUM2SixRQUFILEVBQUw7O0FBQ0EsTUFBSTVKLElBQUksc0JBQU82QyxJQUFJLENBQUN5RCxPQUFaLENBQVI7O0FBQ0F0RyxNQUFJLENBQUMsQ0FBRCxDQUFKLElBQVcsQ0FBWDtBQUNBQSxNQUFJLEdBQUdBLElBQUksQ0FBQzRKLFFBQUwsRUFBUDs7QUFDQSxNQUFJbk4sSUFBSSxzQkFBT29HLElBQUksQ0FBQ3lELE9BQVosQ0FBUjs7QUFDQTdKLE1BQUksQ0FBQyxDQUFELENBQUosSUFBVyxDQUFYO0FBQ0FBLE1BQUksR0FBR0EsSUFBSSxDQUFDbU4sUUFBTCxFQUFQOztBQUNBLE1BQUlsTixLQUFLLHNCQUFPbUcsSUFBSSxDQUFDeUQsT0FBWixDQUFUOztBQUNBNUosT0FBSyxDQUFDLENBQUQsQ0FBTCxJQUFZLENBQVo7QUFDQUEsT0FBSyxHQUFHQSxLQUFLLENBQUNrTixRQUFOLEVBQVI7O0FBQ0EsTUFBSSxDQUFDL0wsdURBQUEsQ0FBcUJrQyxFQUFyQixDQUFELElBQThCbEMsdURBQUEsQ0FBcUJrQyxFQUFyQixFQUF5QmtHLFNBQXpCLENBQW1DakcsSUFBbkMsS0FBNEMsR0FBOUUsRUFBb0Y7QUFDbEYyRyxTQUFLLENBQUNXLElBQU4sQ0FBVyxHQUFYO0FBQ0Q7O0FBQ0QsTUFBSSxDQUFDekosdURBQUEsQ0FBcUJtQyxJQUFyQixDQUFELElBQWdDbkMsdURBQUEsQ0FBcUJtQyxJQUFyQixFQUEyQmlHLFNBQTNCLENBQXFDbEcsRUFBckMsS0FBNEMsR0FBaEYsRUFBc0Y7QUFDcEY0RyxTQUFLLENBQUNXLElBQU4sQ0FBVyxHQUFYO0FBQ0Q7O0FBQ0QsTUFBSSxDQUFDekosdURBQUEsQ0FBcUJwQixJQUFyQixDQUFELElBQWdDb0IsdURBQUEsQ0FBcUJwQixJQUFyQixFQUEyQndKLFNBQTNCLENBQXFDdkosS0FBckMsS0FBK0MsR0FBbkYsRUFBeUY7QUFDdkZpSyxTQUFLLENBQUNXLElBQU4sQ0FBVyxHQUFYO0FBQ0Q7O0FBQ0QsTUFBSSxDQUFDekosdURBQUEsQ0FBcUJuQixLQUFyQixDQUFELElBQWlDbUIsdURBQUEsQ0FBcUJuQixLQUFyQixFQUE0QnVKLFNBQTVCLENBQXNDeEosSUFBdEMsS0FBK0MsR0FBcEYsRUFBMEY7QUFDeEZrSyxTQUFLLENBQUNXLElBQU4sQ0FBVyxHQUFYO0FBQ0Q7O0FBQ0QsU0FBT1gsS0FBSyxDQUFDYyxJQUFOLEdBQWFDLElBQWIsQ0FBa0IsRUFBbEIsQ0FBUDtBQUNELENBM0JNO0FBNkJBLElBQU1OLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQ3ZFLElBQUQsRUFBTzhELEtBQVAsRUFBaUI7QUFDakQsTUFBSSxDQUFDQSxLQUFLLENBQUNrRCxRQUFOLENBQWUsR0FBZixDQUFMLEVBQTBCO0FBQ3hCaEgsUUFBSSxDQUFDb0QsU0FBTCxDQUFlbEcsRUFBZixHQUFvQixHQUFwQjtBQUNEOztBQUNELE1BQUksQ0FBQzRHLEtBQUssQ0FBQ2tELFFBQU4sQ0FBZSxHQUFmLENBQUwsRUFBMEI7QUFDeEJoSCxRQUFJLENBQUNvRCxTQUFMLENBQWVqRyxJQUFmLEdBQXNCLEdBQXRCO0FBQ0Q7O0FBQ0QsTUFBSSxDQUFDMkcsS0FBSyxDQUFDa0QsUUFBTixDQUFlLEdBQWYsQ0FBTCxFQUEwQjtBQUN4QmhILFFBQUksQ0FBQ29ELFNBQUwsQ0FBZXhKLElBQWYsR0FBc0IsR0FBdEI7QUFDRDs7QUFDRCxNQUFJLENBQUNrSyxLQUFLLENBQUNrRCxRQUFOLENBQWUsR0FBZixDQUFMLEVBQTBCO0FBQ3hCaEgsUUFBSSxDQUFDb0QsU0FBTCxDQUFldkosS0FBZixHQUF1QixHQUF2QjtBQUNEO0FBQ0YsQ0FiTTtBQWVBLElBQU1vTCxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ2hDLE1BQUlnQyxnQkFBZ0IsR0FBRyxFQUF2Qjs7QUFDQSxPQUFLLElBQUk5TCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCx5REFBcEIsRUFBNENHLENBQUMsRUFBN0MsRUFBaUQ7QUFBRThMLG9CQUFnQixDQUFDeEMsSUFBakIsQ0FBc0IsQ0FBdEI7QUFBMEI7O0FBQzdFLE9BQUssSUFBSXRKLElBQUMsR0FBRyxDQUFiLEVBQWdCQSxJQUFDLEdBQUdILHlEQUFwQixFQUE0Q0csSUFBQyxFQUE3QyxFQUFpRDtBQUFFOEwsb0JBQWdCLENBQUN4QyxJQUFqQixDQUFzQixDQUF0QjtBQUEwQjs7QUFDN0UsT0FBSyxJQUFJdEosSUFBQyxHQUFHLENBQWIsRUFBZ0JBLElBQUMsR0FBR0gseURBQXBCLEVBQTRDRyxJQUFDLEVBQTdDLEVBQWlEO0FBQUU4TCxvQkFBZ0IsQ0FBQ3hDLElBQWpCLENBQXNCLENBQXRCO0FBQTBCOztBQUM3RSxPQUFLLElBQUl0SixJQUFDLEdBQUcsQ0FBYixFQUFnQkEsSUFBQyxHQUFHSCx5REFBcEIsRUFBNENHLElBQUMsRUFBN0MsRUFBaUQ7QUFBRThMLG9CQUFnQixDQUFDeEMsSUFBakIsQ0FBc0IsQ0FBdEI7QUFBMEI7O0FBQzdFLE1BQU10QixPQUFPLEdBQUd0RixJQUFJLENBQUNjLEtBQUwsQ0FBV2QsSUFBSSxDQUFDSSxNQUFMLEtBQWdCZ0osZ0JBQWdCLENBQUM1QyxNQUE1QyxDQUFoQjtBQUNBSyxTQUFPLENBQUN1QyxnQkFBRCxDQUFQO0FBQ0EsU0FBT0EsZ0JBQWdCLENBQUM5RCxPQUFELENBQXZCO0FBQ0QsQ0FUTTtBQVdBLElBQU1sSSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDakMsTUFBTUUsQ0FBQyxHQUFHMEMsSUFBSSxDQUFDYyxLQUFMLENBQVdkLElBQUksQ0FBQ0ksTUFBTCxLQUFnQixDQUEzQixDQUFWO0FBQ0EsU0FBT2lFLFFBQVEsQ0FBQ0MsY0FBVCxlQUErQmhILENBQS9CLEVBQVA7QUFDRCxDQUhNO0FBS0EsSUFBTXVKLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUF3QyxHQUFHLEVBQUk7QUFDNUIsT0FBSyxJQUFJL0wsQ0FBQyxHQUFHK0wsR0FBRyxDQUFDN0MsTUFBSixHQUFhLENBQTFCLEVBQTZCbEosQ0FBQyxHQUFHLENBQWpDLEVBQW9DQSxDQUFDLEVBQXJDLEVBQXlDO0FBQ3ZDLFFBQUlnTSxDQUFDLEdBQUd0SixJQUFJLENBQUNjLEtBQUwsQ0FBV2QsSUFBSSxDQUFDSSxNQUFMLE1BQWlCOUMsQ0FBQyxHQUFHLENBQXJCLENBQVgsQ0FBUjtBQUR1QyxlQUVwQixDQUFDK0wsR0FBRyxDQUFDQyxDQUFELENBQUosRUFBU0QsR0FBRyxDQUFDL0wsQ0FBRCxDQUFaLENBRm9CO0FBRXRDK0wsT0FBRyxDQUFDL0wsQ0FBRCxDQUZtQztBQUU5QitMLE9BQUcsQ0FBQ0MsQ0FBRCxDQUYyQjtBQUd4QztBQUNGLENBTE07QUFPQSxJQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUNDLE1BQUQsRUFBUy9MLE1BQVQsRUFBaUJ3QixhQUFqQixFQUFtQztBQUNuRSxNQUFNVSxFQUFFLEdBQUc2SixNQUFNLENBQUN6TCxNQUFQLENBQWMsQ0FBZCxDQUFYO0FBQ0EsTUFBTTZCLEVBQUUsR0FBRzRKLE1BQU0sQ0FBQ3pMLE1BQVAsQ0FBYyxDQUFkLENBQVg7QUFDQSxNQUFNSyxFQUFFLEdBQUdYLE1BQU0sQ0FBQ00sTUFBUCxDQUFjLENBQWQsQ0FBWDtBQUNBLE1BQU1NLEVBQUUsR0FBR1osTUFBTSxDQUFDTSxNQUFQLENBQWMsQ0FBZCxDQUFYO0FBQ0EsTUFBSThCLEVBQUUsR0FBR0YsRUFBRSxHQUFHdkIsRUFBZDtBQUNBLE1BQUkwQixFQUFFLEdBQUdGLEVBQUUsR0FBR3ZCLEVBQWQ7O0FBRUEsTUFBSSxDQUFDWSxhQUFMLEVBQW9CO0FBQ2xCLFFBQU1rQixTQUFTLEdBQUdILElBQUksQ0FBQ0ksTUFBTCxLQUFnQixDQUFoQixHQUFvQkosSUFBSSxDQUFDSyxFQUEzQztBQUNBUixNQUFFLEdBQUdHLElBQUksQ0FBQ00sR0FBTCxDQUFTSCxTQUFULElBQXNCcUosTUFBTSxDQUFDMUssS0FBbEM7QUFDQWdCLE1BQUUsR0FBR0UsSUFBSSxDQUFDTyxHQUFMLENBQVNKLFNBQVQsSUFBc0JxSixNQUFNLENBQUMxSyxLQUFsQztBQUNEOztBQUVELE1BQU0wQixLQUFLLEdBQUdSLElBQUksQ0FBQ1MsSUFBTCxDQUFVWCxFQUFFLEdBQUNELEVBQWIsQ0FBZDtBQUNBLE1BQU1hLEVBQUUsR0FBR1YsSUFBSSxDQUFDTyxHQUFMLENBQVNDLEtBQVQsSUFBa0JnSixNQUFNLENBQUMxSyxLQUFwQztBQUNBLE1BQU02QixFQUFFLEdBQUdYLElBQUksQ0FBQ00sR0FBTCxDQUFTRSxLQUFULElBQWtCZ0osTUFBTSxDQUFDMUssS0FBcEM7QUFFQSxTQUFPO0FBQ0xlLE1BQUUsRUFBRkEsRUFESztBQUVMQyxNQUFFLEVBQUZBLEVBRks7QUFHTGEsTUFBRSxFQUFGQSxFQUhLO0FBSUxELE1BQUUsRUFBRkEsRUFKSztBQUtMckIsTUFBRSxFQUFHUyxFQUFFLEdBQUcsQ0FBTixJQUFhRSxJQUFJLENBQUNZLEdBQUwsQ0FBU2QsRUFBVCxJQUFlRSxJQUFJLENBQUNZLEdBQUwsQ0FBU2YsRUFBVCxDQUwzQjtBQU1MUCxRQUFJLEVBQUdRLEVBQUUsR0FBRyxDQUFOLElBQWFFLElBQUksQ0FBQ1ksR0FBTCxDQUFTZCxFQUFULElBQWVFLElBQUksQ0FBQ1ksR0FBTCxDQUFTZixFQUFULENBTjdCO0FBT0w5RCxRQUFJLEVBQUc4RCxFQUFFLEdBQUcsQ0FBTixJQUFhRyxJQUFJLENBQUNZLEdBQUwsQ0FBU2YsRUFBVCxJQUFlRyxJQUFJLENBQUNZLEdBQUwsQ0FBU2QsRUFBVCxDQVA3QjtBQVFMOUQsU0FBSyxFQUFHNkQsRUFBRSxHQUFHLENBQU4sSUFBYUcsSUFBSSxDQUFDWSxHQUFMLENBQVNmLEVBQVQsSUFBZUcsSUFBSSxDQUFDWSxHQUFMLENBQVNkLEVBQVQ7QUFSOUIsR0FBUDtBQVVELENBNUJNO0FBOEJBLElBQU0ySixnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNELE1BQUQsRUFBU3hJLE1BQVQsRUFBb0I7QUFDbEQsTUFBTXJCLEVBQUUsR0FBRzZKLE1BQU0sQ0FBQ3pMLE1BQVAsQ0FBYyxDQUFkLENBQVg7QUFDQSxNQUFNNkIsRUFBRSxHQUFHNEosTUFBTSxDQUFDekwsTUFBUCxDQUFjLENBQWQsQ0FBWDtBQUNBLE1BQU0yTCxFQUFFLEdBQUcxSSxNQUFNLENBQUNqRCxNQUFQLENBQWMsQ0FBZCxDQUFYO0FBQ0EsTUFBTTRMLEVBQUUsR0FBRzNJLE1BQU0sQ0FBQ2pELE1BQVAsQ0FBYyxDQUFkLENBQVg7QUFDQSxNQUFJOEIsRUFBRSxHQUFHNkosRUFBRSxHQUFHL0osRUFBZDtBQUNBLE1BQUlHLEVBQUUsR0FBRzZKLEVBQUUsR0FBRy9KLEVBQWQ7QUFDQSxTQUFPSSxJQUFJLENBQUNDLElBQUwsQ0FBVUQsSUFBSSxDQUFDRSxHQUFMLENBQVNMLEVBQVQsRUFBYSxDQUFiLElBQWtCRyxJQUFJLENBQUNFLEdBQUwsQ0FBU0osRUFBVCxFQUFhLENBQWIsQ0FBNUIsQ0FBUDtBQUNELENBUk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM1JBLElBQU04SixLQUFLLEdBQUcsR0FBZDtBQUNBLElBQU1DLE1BQU0sR0FBRyxHQUFmO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBcEI7QUFDQSxJQUFNQyxHQUFHLEdBQUcsT0FBSyxFQUFqQjtBQUNBLElBQU1DLElBQUksR0FBRztBQUNsQixNQUFJLEtBRGM7QUFDUDtBQUNYLE1BQUksS0FGYztBQUVQO0FBQ1gsTUFBSSxLQUhjO0FBR1A7QUFDWCxNQUFJLEtBSmM7QUFJUDtBQUNYLE1BQUksS0FMYyxDQUtQOztBQUxPLENBQWI7QUFPQSxJQUFNQyxJQUFJLEdBQUcsRUFBYjtBQUVBLElBQU1DLE9BQU8sR0FBRyxFQUFoQjtBQUNBLElBQU1DLE9BQU8sR0FBRyxFQUFoQjtBQUNBLElBQU1DLE9BQU8sR0FBRyxFQUFoQjtBQUVBLElBQU1DLFlBQVksR0FBRztBQUMxQixLQUFHLENBRHVCO0FBRTFCLEtBQUcsQ0FGdUI7QUFHMUIsS0FBRyxFQUh1QjtBQUkxQixLQUFHO0FBSnVCLENBQXJCO0FBT0EsSUFBTUMsU0FBUyxHQUFHLENBQ3ZCLE1BRHVCLEVBRXZCLEtBRnVCLEVBR3ZCLEtBSHVCLEVBSXZCLEtBSnVCLEVBS3ZCLEtBTHVCLEVBTXZCLElBTnVCLEVBT3ZCLElBUHVCLEVBUXZCLElBUnVCLEVBU3ZCLElBVHVCLEVBVXZCLElBVnVCLEVBV3ZCLElBWHVCLEVBWXZCLEdBWnVCLEVBYXZCLEdBYnVCLEVBY3ZCLEdBZHVCLEVBZXZCLEdBZnVCLENBQWxCO0FBa0JBLElBQU1DLE9BQU8sR0FBRztBQUNyQixLQUFHO0FBQ0QsT0FBRyxFQURGO0FBRUQsT0FBRyxFQUZGO0FBR0QsT0FBRyxDQUhGO0FBSUQsT0FBRztBQUpGLEdBRGtCO0FBT3JCLEtBQUc7QUFDRCxPQUFHLEVBREY7QUFFRCxPQUFHLEVBRkY7QUFHRCxPQUFHO0FBSEYsR0FQa0I7QUFZckIsS0FBRztBQUNELE9BQUcsRUFERjtBQUVELE9BQUc7QUFGRjtBQVprQixDQUFoQjtBQWtCQSxJQUFNQyxZQUFZLEdBQUcsRUFBckI7QUFDQSxJQUFNQyxPQUFPLEdBQUcsRUFBaEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RFA7QUFDQTtBQUNBO0FBRUEsaUVBQWUsVUFBQ1QsSUFBRCxFQUFVO0FBQ3ZCM0YsVUFBUSxDQUFDcUcsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsVUFBQUMsQ0FBQyxFQUFJO0FBRXhDLFFBQUlBLENBQUMsQ0FBQ0MsR0FBRixDQUFNQyxXQUFOLE9BQXdCLEdBQXhCLElBQStCLENBQUNiLElBQUksQ0FBQyxHQUFELENBQXhDLEVBQStDQSxJQUFJLENBQUNXLENBQUMsQ0FBQ0MsR0FBRixDQUFNQyxXQUFOLEVBQUQsQ0FBSixHQUE0QixJQUE1QjtBQUMvQyxRQUFJRixDQUFDLENBQUNDLEdBQUYsQ0FBTUMsV0FBTixPQUF3QixHQUF4QixJQUErQixDQUFDYixJQUFJLENBQUMsR0FBRCxDQUF4QyxFQUErQ0EsSUFBSSxDQUFDVyxDQUFDLENBQUNDLEdBQUYsQ0FBTUMsV0FBTixFQUFELENBQUosR0FBNEIsSUFBNUI7QUFDL0MsUUFBSUYsQ0FBQyxDQUFDQyxHQUFGLENBQU1DLFdBQU4sT0FBd0IsR0FBeEIsSUFBK0IsQ0FBQ2IsSUFBSSxDQUFDLEdBQUQsQ0FBeEMsRUFBK0NBLElBQUksQ0FBQ1csQ0FBQyxDQUFDQyxHQUFGLENBQU1DLFdBQU4sRUFBRCxDQUFKLEdBQTRCLElBQTVCO0FBQy9DLFFBQUlGLENBQUMsQ0FBQ0MsR0FBRixDQUFNQyxXQUFOLE9BQXdCLEdBQXhCLElBQStCLENBQUNiLElBQUksQ0FBQyxHQUFELENBQXhDLEVBQStDQSxJQUFJLENBQUNXLENBQUMsQ0FBQ0MsR0FBRixDQUFNQyxXQUFOLEVBQUQsQ0FBSixHQUE0QixJQUE1QjtBQUMvQyxRQUFJRixDQUFDLENBQUNDLEdBQUYsS0FBVSxPQUFWLElBQXFCLENBQUNaLElBQUksQ0FBQyxPQUFELENBQTlCLEVBQXlDQSxJQUFJLENBQUNXLENBQUMsQ0FBQ0MsR0FBSCxDQUFKLEdBQWMsSUFBZDtBQUN6QyxRQUFJRCxDQUFDLENBQUNDLEdBQUYsS0FBVSxPQUFWLElBQXFCLENBQUNaLElBQUksQ0FBQyxPQUFELENBQTlCLEVBQXlDQSxJQUFJLENBQUNXLENBQUMsQ0FBQ0MsR0FBSCxDQUFKLEdBQWMsSUFBZDtBQUUxQyxHQVREO0FBVUF2RyxVQUFRLENBQUNxRyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFBQyxDQUFDLEVBQUk7QUFDdEMsUUFBSUEsQ0FBQyxDQUFDQyxHQUFGLENBQU1DLFdBQU4sT0FBd0IsR0FBeEIsSUFBK0JiLElBQUksQ0FBQyxHQUFELENBQXZDLEVBQThDQSxJQUFJLENBQUNXLENBQUMsQ0FBQ0MsR0FBRixDQUFNQyxXQUFOLEVBQUQsQ0FBSixHQUE0QixLQUE1QjtBQUM5QyxRQUFJRixDQUFDLENBQUNDLEdBQUYsQ0FBTUMsV0FBTixPQUF3QixHQUF4QixJQUErQmIsSUFBSSxDQUFDLEdBQUQsQ0FBdkMsRUFBOENBLElBQUksQ0FBQ1csQ0FBQyxDQUFDQyxHQUFGLENBQU1DLFdBQU4sRUFBRCxDQUFKLEdBQTRCLEtBQTVCO0FBQzlDLFFBQUlGLENBQUMsQ0FBQ0MsR0FBRixDQUFNQyxXQUFOLE9BQXdCLEdBQXhCLElBQStCYixJQUFJLENBQUMsR0FBRCxDQUF2QyxFQUE4Q0EsSUFBSSxDQUFDVyxDQUFDLENBQUNDLEdBQUYsQ0FBTUMsV0FBTixFQUFELENBQUosR0FBNEIsS0FBNUI7QUFDOUMsUUFBSUYsQ0FBQyxDQUFDQyxHQUFGLENBQU1DLFdBQU4sT0FBd0IsR0FBeEIsSUFBK0JiLElBQUksQ0FBQyxHQUFELENBQXZDLEVBQThDQSxJQUFJLENBQUNXLENBQUMsQ0FBQ0MsR0FBRixDQUFNQyxXQUFOLEVBQUQsQ0FBSixHQUE0QixLQUE1QjtBQUM5QyxRQUFJRixDQUFDLENBQUNDLEdBQUYsS0FBVSxPQUFWLElBQXFCWixJQUFJLENBQUMsT0FBRCxDQUE3QixFQUF3Q0EsSUFBSSxDQUFDVyxDQUFDLENBQUNDLEdBQUgsQ0FBSixHQUFjLEtBQWQ7QUFDeEMsUUFBSUQsQ0FBQyxDQUFDQyxHQUFGLEtBQVUsT0FBVixJQUFxQlosSUFBSSxDQUFDLE9BQUQsQ0FBN0IsRUFBd0NBLElBQUksQ0FBQ1csQ0FBQyxDQUFDQyxHQUFILENBQUosR0FBYyxLQUFkO0FBQ3pDLEdBUEQ7QUFTQSxNQUFNRSxLQUFLLEdBQUd6RyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUVBd0csT0FBSyxDQUFDSixnQkFBTixDQUF1QixZQUF2QixFQUFxQyxVQUFBQyxDQUFDLEVBQUk7QUFDeEN0RyxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLEVBQTBDeUcsU0FBMUMsQ0FBb0RDLEdBQXBELENBQXdELFFBQXhEO0FBQ0EzRyxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsRUFBd0NqSCxJQUF4QztBQUNBZ0gsWUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDeUcsU0FBbEMsQ0FBNENDLEdBQTVDLENBQWdELFFBQWhEO0FBQ0EzRyxZQUFRLENBQUM0RyxhQUFULENBQXVCLGNBQXZCLEVBQXVDRixTQUF2QyxDQUFpREMsR0FBakQsQ0FBcUQsUUFBckQ7QUFDRCxHQUxEO0FBTUFGLE9BQUssQ0FBQ0osZ0JBQU4sQ0FBdUIsWUFBdkIsRUFBcUMsVUFBQUMsQ0FBQyxFQUFJO0FBQ3hDdEcsWUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDeUcsU0FBbEMsQ0FBNENHLE1BQTVDLENBQW1ELFFBQW5EO0FBQ0E3RyxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLEVBQTBDeUcsU0FBMUMsQ0FBb0RHLE1BQXBELENBQTJELFFBQTNEO0FBQ0E3RyxZQUFRLENBQUM0RyxhQUFULENBQXVCLGNBQXZCLEVBQXVDRixTQUF2QyxDQUFpREcsTUFBakQsQ0FBd0QsUUFBeEQ7QUFDRCxHQUpEO0FBTUEsTUFBTTlHLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQWhCO0FBQ0FGLFNBQU8sQ0FBQ3NHLGdCQUFSLENBQXlCLFlBQXpCLEVBQXVDLFVBQUFDLENBQUMsRUFBSTtBQUMxQ3RHLFlBQVEsQ0FBQ0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q2pILElBQXpDO0FBQ0FnSCxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUN5RyxTQUFuQyxDQUE2Q0MsR0FBN0MsQ0FBaUQsUUFBakQ7QUFDQTNHLFlBQVEsQ0FBQ0MsY0FBVCxDQUF3QixpQkFBeEIsRUFBMkN5RyxTQUEzQyxDQUFxREMsR0FBckQsQ0FBeUQsUUFBekQ7QUFDRCxHQUpEO0FBS0E1RyxTQUFPLENBQUNzRyxnQkFBUixDQUF5QixZQUF6QixFQUF1QyxVQUFBQyxDQUFDLEVBQUk7QUFDMUN0RyxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUN5RyxTQUFuQyxDQUE2Q0csTUFBN0MsQ0FBb0QsUUFBcEQ7QUFDQTdHLFlBQVEsQ0FBQ0MsY0FBVCxDQUF3QixpQkFBeEIsRUFBMkN5RyxTQUEzQyxDQUFxREcsTUFBckQsQ0FBNEQsUUFBNUQ7QUFDRCxHQUhEO0FBSUE5RyxTQUFPLENBQUNzRyxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxVQUFBQyxDQUFDLEVBQUk7QUFDckNBLEtBQUMsQ0FBQ1EsY0FBRjtBQUNBM0csOERBQU87QUFDUixHQUhEO0FBS0QsQ0FqREQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0pNb0QsSTtBQUNKLGdCQUFZak4sR0FBWixFQUFpQkMsS0FBakIsRUFBd0JDLE1BQXhCLEVBQWdDO0FBQUE7O0FBQzlCLFNBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtGLEdBQUwsR0FBV0EsR0FBWDs7QUFDQSxtQ0FBYyxLQUFLQSxHQUFuQjtBQUFBLFFBQU9ZLENBQVA7QUFBQSxRQUFTQyxDQUFUOztBQUNBLFFBQU1tQyxPQUFPLEdBQUcsS0FBS2hELEdBQXJCO0FBQ0EsUUFBTWlELFFBQVEsR0FBRyxDQUFDckMsQ0FBQyxHQUFDLEtBQUtYLEtBQVIsRUFBY1ksQ0FBZCxDQUFqQjtBQUNBLFFBQU1xQyxXQUFXLEdBQUcsQ0FBQ3RDLENBQUMsR0FBQyxLQUFLWCxLQUFSLEVBQWNZLENBQUMsR0FBQyxLQUFLWCxNQUFyQixDQUFwQjtBQUNBLFFBQU1pRCxVQUFVLEdBQUcsQ0FBQ3ZDLENBQUQsRUFBR0MsQ0FBQyxHQUFDLEtBQUtYLE1BQVYsQ0FBbkI7QUFDQSxTQUFLZ0IsR0FBTCxHQUFXLENBQUMsQ0FBQzhCLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBWUMsUUFBUSxDQUFDLENBQUQsQ0FBcEIsQ0FBRCxFQUEyQkQsT0FBTyxDQUFDLENBQUQsQ0FBbEMsQ0FBWDtBQUNBLFNBQUs3QixNQUFMLEdBQWMsQ0FBQyxDQUFDZ0MsVUFBVSxDQUFDLENBQUQsQ0FBWCxFQUFlRCxXQUFXLENBQUMsQ0FBRCxDQUExQixDQUFELEVBQWlDQyxVQUFVLENBQUMsQ0FBRCxDQUEzQyxDQUFkO0FBQ0EsU0FBSzlCLEtBQUwsR0FBYSxDQUFDNEIsUUFBUSxDQUFDLENBQUQsQ0FBVCxFQUFjLENBQUNBLFFBQVEsQ0FBQyxDQUFELENBQVQsRUFBYUMsV0FBVyxDQUFDLENBQUQsQ0FBeEIsQ0FBZCxDQUFiO0FBQ0EsU0FBSzlCLElBQUwsR0FBWSxDQUFDNEIsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhLENBQUNBLE9BQU8sQ0FBQyxDQUFELENBQVIsRUFBWUcsVUFBVSxDQUFDLENBQUQsQ0FBdEIsQ0FBYixDQUFaO0FBQ0Q7Ozs7V0FFRCxjQUFLckIsR0FBTCxFQUFVO0FBQ1JBLFNBQUcsQ0FBQytLLFNBQUo7QUFDQS9LLFNBQUcsQ0FBQ2dILFNBQUosR0FBZ0IsY0FBaEI7QUFDQWhILFNBQUcsQ0FBQ2lILFFBQUosT0FBQWpILEdBQUcscUJBQWEsS0FBSzlCLEdBQWxCLFVBQXVCLEtBQUtDLEtBQTVCLEVBQW1DLEtBQUtDLE1BQXhDLEdBQUg7QUFDRDs7Ozs7O0FBSUgsaUVBQWUrTSxJQUFmLEU7Ozs7Ozs7Ozs7O0FDeEJBOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUlBdkQsUUFBUSxDQUFDcUcsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFFbEQsTUFBTVUsTUFBTSxHQUFHL0csUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQWY7QUFDQThHLFFBQU0sQ0FBQ3hRLEtBQVAsR0FBZXVDLDZEQUFmO0FBQ0FpTyxRQUFNLENBQUN2USxNQUFQLEdBQWdCc0MsOERBQWhCO0FBQ0EsTUFBTVYsR0FBRyxHQUFHMk8sTUFBTSxDQUFDQyxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFFQUMsMkVBQWdCLENBQUNuTyw0REFBRCxDQUFoQixDQVBrRCxDQVNsRDtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUEsTUFBSW9PLFVBQVUsR0FBRyxJQUFJQyxLQUFKLEVBQWpCO0FBQ0FELFlBQVUsQ0FBQ0UsR0FBWCxHQUFpQixvQ0FBakI7O0FBQ0FGLFlBQVUsQ0FBQ0csTUFBWCxHQUFvQixZQUFNO0FBQ3hCdk8sd0VBQUEsR0FBc0JvTyxVQUF0QjtBQUNELEdBRkQ7O0FBSUEsTUFBSUksZUFBZSxHQUFHLElBQUlILEtBQUosRUFBdEI7QUFDQUcsaUJBQWUsQ0FBQ0YsR0FBaEIsR0FBc0IsMkNBQXRCOztBQUNBRSxpQkFBZSxDQUFDRCxNQUFoQixHQUF5QixZQUFNO0FBQzdCdk8sNEVBQUEsR0FBMEJ3TyxlQUExQjtBQUNELEdBRkQ7O0FBekJrRCw2Q0E2QmpDeE8saUVBN0JpQztBQUFBOztBQUFBO0FBQUE7QUFBQSxVQTZCekNtSixJQTdCeUM7QUE4QmhEQSxVQUFJLEdBQUdBLElBQUksQ0FBQ0YsS0FBTCxDQUFXLEVBQVgsRUFBZVcsSUFBZixHQUFzQkMsSUFBdEIsQ0FBMkIsRUFBM0IsQ0FBUDs7QUE5QmdELG1DQStCdkMxSixDQS9CdUM7QUFnQzlDLFlBQU1tSixVQUFVLEdBQUcsSUFBSStFLEtBQUosRUFBbkI7QUFDQS9FLGtCQUFVLENBQUNnRixHQUFYLDJDQUFrRG5GLElBQUksQ0FBQ0UsTUFBdkQsY0FBaUVGLElBQWpFLGlCQUE0RWhKLENBQTVFOztBQUVBbUosa0JBQVUsQ0FBQ2lGLE1BQVgsR0FBb0IsWUFBTTtBQUN4QnZPLHlFQUFBLFdBQWtCbUosSUFBSSxDQUFDRSxNQUF2QixTQUFnQ0YsSUFBaEMsU0FBdUNoSixDQUF2QyxLQUE4Q21KLFVBQTlDLENBRHdCLENBRXhCO0FBQ0QsU0FIRDtBQW5DOEM7O0FBK0JoRCxXQUFLLElBQUluSixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQTRCO0FBQUEsZUFBbkJBLENBQW1CO0FBUTNCO0FBdkMrQzs7QUE2QmxELHdEQUFtQztBQUFBO0FBV2xDO0FBeENpRDtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTBDbEQsTUFBSXNFLFlBQVksR0FBRyxJQUFJNEosS0FBSixFQUFuQjtBQUNBNUosY0FBWSxDQUFDNkosR0FBYixHQUFtQiwyQ0FBbkI7O0FBRUE3SixjQUFZLENBQUM4SixNQUFiLEdBQXNCLFlBQU07QUFDMUIsUUFBSUUsU0FBUyxHQUFHLElBQUkvSCx3REFBSixDQUFjcEgsR0FBZCxFQUFtQm1GLFlBQW5CLENBQWhCO0FBQ0F6RSw0RUFBQSxHQUE2QlYsR0FBN0I7QUFDQVUscUZBQUEsR0FBc0N5RSxZQUF0QztBQUNBZ0ssYUFBUyxDQUFDQyxNQUFWO0FBRUQsR0FORDtBQVFELENBckRELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xCb3ggZnJvbSBcIi4vY29sbGlzaW9uX2JveFwiO1xuaW1wb3J0IHsgY29sbGlkZWRXaXRoU2lkZSwgcmFuZENvaW5Tb3VuZCB9IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuLy8gaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcblxuY2xhc3MgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnN0IGNvbEJveFdpZHRoID0gd2lkdGg7XG4gICAgY29uc3QgY29sQm94SGVpZ2h0ID0gaGVpZ2h0O1xuICAgIFxuICAgIHRoaXMuc3ByaXRlUGFsZXR0ZSA9IHNwcml0ZVBhbGV0dGU7XG4gICAgdGhpcy5kcmF3T3B0aW9ucyA9IHtcbiAgICAgIGltYWdlOiBzcHJpdGVQYWxldHRlLFxuICAgICAgcGFsWDogMCxcbiAgICAgIHBhbFk6IDAsXG4gICAgICBfc1dpZHRoOiB3aWR0aCxcbiAgICAgIF9zSGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiBwb3NbMF0sXG4gICAgICB5OiBwb3NbMV0sXG4gICAgICBfZFdpZHRoOiB3aWR0aCxcbiAgICAgIF9kSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICB0aGlzLmNvbEJveCA9IG5ldyBDb2xCb3godGhpcyxjb2xCb3hXaWR0aCxjb2xCb3hIZWlnaHQpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY29sbGlzaW9ucyA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcbiAgICBcbiAgfVxuXG4gIGNvbEJveEhvb2soKSB7IC8vIHRoaXMgd2lsbCBjZW50ZXIgdGhlIGNvbEJveCBvbiB0aGUgYm90dG9tXG4gICAgbGV0IFt4LHldID0gW3RoaXMucG9zWzBdLHRoaXMucG9zWzFdXTtcbiAgICBsZXQgW2N4LGN5XSA9IFtcbiAgICAgIHgrKCh0aGlzLndpZHRoIC0gdGhpcy5jb2xCb3gud2lkdGgpLzIpLFxuICAgICAgeSsodGhpcy5oZWlnaHQgLSB0aGlzLmNvbEJveC5oZWlnaHQpLFxuICAgIF07XG4gICAgcmV0dXJuIFtjeCxjeV07XG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICB0aGlzLmNvbEJveC51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICB9XG5cbiAgY29sbGlkZWRPblNpZGUoc2lkZSwgb3RoZXJPYmplY3QpIHtcbiAgICBsZXQgb3RoZXJTaWRlO1xuICAgIHN3aXRjaChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwiYm90dG9tXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInRvcFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwicmlnaHRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJsZWZ0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3RoZXJTaWRlID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sbGlzaW9uc1tzaWRlXSA9IGNvbGxpZGVkV2l0aFNpZGUoc2lkZSwgdGhpc1tzaWRlXSwgb3RoZXJPYmplY3Rbb3RoZXJTaWRlXSk7XG4gICAgcmV0dXJuIHRoaXMuY29sbGlzaW9uc1tzaWRlXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSguLi5PYmplY3QudmFsdWVzKHRoaXMuZHJhd09wdGlvbnMpKTtcbiAgICB0aGlzLmNvbEJveC5jZW50ZXJPbkVudGl0eSgpO1xuICAgIHRoaXMuY29sQm94LmRyYXcoY3R4KTtcbiAgfVxufVxuXG5jbGFzcyBDb2luIGV4dGVuZHMgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGVQYWxldHRlKSB7XG4gICAgc3VwZXIocG9zLCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGVQYWxldHRlKTtcbiAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMjtcbiAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IDA7XG4gIH1cblxuICBjb2xsZWN0KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJ0b3BcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpIHx8XG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwiYm90dG9tXCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKSB8fFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpIHx8XG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwicmlnaHRcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpXG4gICAgKSB7XG4gICAgICByYW5kQ29pblNvdW5kKCkucGxheSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgY29uc3QgaSA9IHRoaXMuZnJhbWVJbnRlcnZhbDtcbiAgICBjb25zdCBjID0gdGhpcy5mcmFtZUNvdW50O1xuICAgIGNvbnN0IHcgPSB0aGlzLndpZHRoO1xuICAgIGlmIChjIDwgaSkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDA7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjIpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAxO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSozKSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMjtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDM7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjUpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA0O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo2KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNTtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNykge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDY7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjgpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA3O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAwO1xuICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29pbjsiLCJcblxuY2xhc3MgQ29sQm94IHtcbiAgY29uc3RydWN0b3IoZW50aXR5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbnRpdHkgPSBlbnRpdHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucG9zID0gdGhpcy5vcmlnaW5Qb3MoKTtcblxuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grd2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt3aWR0aCx5K2hlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkraGVpZ2h0XTtcbiAgICBcbiAgICB0aGlzLmNlbnRlciA9IFt4Kyh3aWR0aC8yKSx5KyhoZWlnaHQvMildO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICAgIHRoaXMuc2lkZXMgPSBbdGhpcy50b3AsIHRoaXMuYm90dG9tLCB0aGlzLnJpZ2h0LCB0aGlzLmxlZnRdO1xuICAgIFxuICB9XG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIGN0eC5zdHJva2VSZWN0KFxuICAgICAgdGhpcy5wb3NbMF0sXG4gICAgICB0aGlzLnBvc1sxXSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodCxcbiAgICApXG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3RoaXMud2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt0aGlzLndpZHRoLHkrdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K3RoaXMuaGVpZ2h0XTtcbiAgICB0aGlzLmNlbnRlciA9IFt4Kyh0aGlzLndpZHRoLzIpLHkrKHRoaXMuaGVpZ2h0LzIpXTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgfVxuXG4gIG9yaWdpblBvcygpIHtcbiAgICBjb25zdCBbZXgsZXldID0gW3RoaXMuZW50aXR5LnBvc1swXSwgdGhpcy5lbnRpdHkucG9zWzFdXTtcbiAgICBjb25zdCBbZXcsZWhdID0gW3RoaXMuZW50aXR5LndpZHRoLCB0aGlzLmVudGl0eS5oZWlnaHRdO1xuICAgIGNvbnN0IFt0dyx0aF0gPSBbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IHggPSBleCArICgoZXctdHcpLzIpO1xuICAgIGNvbnN0IHkgPSBleSArIGVoIC0gdGg7XG4gICAgcmV0dXJuIFt4LHldO1xuICB9XG5cbiAgY2VudGVyT25FbnRpdHkoKSB7XG4gICAgdGhpcy5wb3MgPSB0aGlzLmVudGl0eS5jb2xCb3hIb29rKCk7XG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sQm94OyIsIi8vIGltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5pbXBvcnQgQ29sQm94IGZyb20gJy4vY29sbGlzaW9uX2JveCc7XG5pbXBvcnQge1xuICBub3JtYWxpemVkTW92ZW1lbnQsXG4gIGNvbGxpZGVkV2l0aFNpZGUsXG59IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuXG5jbGFzcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29sQm94V2lkdGggPSB3aWR0aC8yO1xuICAgIGNvbnN0IGNvbEJveEhlaWdodCA9IGhlaWdodC8zO1xuICAgIFxuICAgIHRoaXMuc3ByaXRlUGFsZXR0ZSA9IHNwcml0ZVBhbGV0dGU7XG4gICAgdGhpcy5kcmF3T3B0aW9ucyA9IHtcbiAgICAgIGltYWdlOiBzcHJpdGVQYWxldHRlLFxuICAgICAgcGFsWDogMCxcbiAgICAgIHBhbFk6IDAsXG4gICAgICBfc1dpZHRoOiB3aWR0aCxcbiAgICAgIF9zSGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiBwb3NbMF0sXG4gICAgICB5OiBwb3NbMV0sXG4gICAgICBfZFdpZHRoOiB3aWR0aCxcbiAgICAgIF9kSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICB0aGlzLmNvbEJveCA9IG5ldyBDb2xCb3godGhpcyxjb2xCb3hXaWR0aCxjb2xCb3hIZWlnaHQpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY2VudGVyID0gdGhpcy5jb2xCb3guY2VudGVyO1xuICAgIHRoaXMuY29sbGlzaW9ucyA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcblxuICB9XG5cbiAgY29sQm94SG9vaygpIHsgLy8gdGhpcyB3aWxsIGNlbnRlciB0aGUgY29sQm94IG9uIHRoZSBib3R0b21cbiAgICBsZXQgW3gseV0gPSBbdGhpcy5wb3NbMF0sdGhpcy5wb3NbMV1dO1xuICAgIGxldCBbY3gsY3ldID0gW1xuICAgICAgeCsoKHRoaXMud2lkdGggLSB0aGlzLmNvbEJveC53aWR0aCkvMiksXG4gICAgICB5Kyh0aGlzLmhlaWdodCAtIHRoaXMuY29sQm94LmhlaWdodCksXG4gICAgXTtcbiAgICByZXR1cm4gW2N4LGN5XTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIHRoaXMuY29sQm94LnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNvbEJveC5jZW50ZXI7XG4gIH1cblxuICBjb2xsaWRlZE9uU2lkZShzaWRlLCBvdGhlck9iamVjdCkge1xuICAgIGxldCBvdGhlclNpZGU7XG4gICAgc3dpdGNoKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJib3R0b21cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwidG9wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJyaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImxlZnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvdGhlclNpZGUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb25zW3NpZGVdID0gY29sbGlkZWRXaXRoU2lkZShzaWRlLCB0aGlzW3NpZGVdLCBvdGhlck9iamVjdFtvdGhlclNpZGVdKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zW3NpZGVdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKC4uLk9iamVjdC52YWx1ZXModGhpcy5kcmF3T3B0aW9ucykpO1xuICAgIHRoaXMuY29sQm94LmNlbnRlck9uRW50aXR5KCk7XG4gICAgdGhpcy5jb2xCb3guZHJhdyhjdHgpO1xuICB9XG59XG5cbmNsYXNzIEVuZW15IGV4dGVuZHMgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlLCB0eXBlLCBkZXRlY3REaXN0KSB7XG4gICAgc3VwZXIocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKTtcbiAgICB0aGlzLnNwZWVkID0gMTtcbiAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAwLjc1O1xuICAgIHRoaXMucGFjZSA9IDI0L3RoaXMuc3BlZWQ7XG4gICAgdGhpcy5jaGFzaW5nUGxheWVyID0gZmFsc2U7XG4gICAgdGhpcy5kZXRlY3REaXN0ID0gZGV0ZWN0RGlzdDtcbiAgICB0aGlzLmlkbGVDb3VudCA9IDA7XG4gICAgdGhpcy5pZGxlTWF4ID0gNjA7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm1vdmVtZW50ID0ge1xuICAgICAgdXA6IGZhbHNlLFxuICAgICAgZG93bjogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuICAgIGxldCB4LCB5O1xuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlIFwiYmxvYlwiOlxuICAgICAgICB4ID0gNDggKiAzO1xuICAgICAgICB5ID0gNDggKiAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJiYXRcIjpcbiAgICAgICAgeCA9IDQ4ICogMDtcbiAgICAgICAgeSA9IDQ4ICogMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZ2hvc3RcIjpcbiAgICAgICAgeCA9IDQ4ICogNjtcbiAgICAgICAgeSA9IDQ4ICogNDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMucGFsWE9mZnNldCA9IHg7XG4gICAgdGhpcy5zdHJpZGUgPSB7XG4gICAgICB1cDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6ICg0OCAqIDMpICsgeSxcbiAgICAgIH0sXG4gICAgICBkb3duOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogKDQ4ICogMCkgKyB5LFxuICAgICAgfSxcbiAgICAgIGxlZnQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiAoNDggKiAxKSArIHksXG4gICAgICB9LFxuICAgICAgcmlnaHQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiAoNDggKiAyKSArIHksXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBzdHJpZGVQYWxldHRlUG9zKGRpcmVjdGlvbikge1xuICAgIHRoaXMucGFjZSA9IDI0IC8gKHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXIpO1xuICAgIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gKDQ4ICogMSkgKyB0aGlzLnBhbFhPZmZzZXQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSAyICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuICg0OCAqIDApICsgdGhpcy5wYWxYT2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gMyAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiAoNDggKiAxKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDQgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gKDQ4ICogMikgKyB0aGlzLnBhbFhPZmZzZXQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA+IDQgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID0gMDtcbiAgICAgIHJldHVybiAoNDggKiAxKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9XG4gIH1cblxuICBkaXN0VG9QbGF5ZXIoKSB7XG4gICAgY29uc3QgbXggPSB0aGlzLmNlbnRlclswXTtcbiAgICBjb25zdCBteSA9IHRoaXMuY2VudGVyWzFdO1xuICAgIGNvbnN0IGV4ID0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmNlbnRlclswXTtcbiAgICBjb25zdCBleSA9IEdsb2JhbC5TRVNTSU9OLnBsYXllci5jZW50ZXJbMV07XG4gICAgbGV0IGR4ID0gbXggLSBleDtcbiAgICBsZXQgZHkgPSBteSAtIGV5O1xuICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5wb3coZHgsIDIpICsgTWF0aC5wb3coZHksIDIpKTtcbiAgICByZXR1cm4gZGlzdDtcbiAgfVxuXG4gIG5vcm1hbGl6ZWRWZWN0b3JQb3MoKSB7XG4gICAgY29uc3QgbXggPSB0aGlzLmNlbnRlclswXTtcbiAgICBjb25zdCBteSA9IHRoaXMuY2VudGVyWzFdO1xuICAgIGNvbnN0IGV4ID0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmNlbnRlclswXTtcbiAgICBjb25zdCBleSA9IEdsb2JhbC5TRVNTSU9OLnBsYXllci5jZW50ZXJbMV07XG4gICAgbGV0IGR4ID0gbXggLSBleDtcbiAgICBsZXQgZHkgPSBteSAtIGV5O1xuXG4gICAgaWYgKCF0aGlzLmNoYXNpbmdQbGF5ZXIgJiYgIXRoaXMuaWRsZUNvdW50KSB7XG4gICAgICBjb25zdCByYW5kQW5nbGUgPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gICAgICB0aGlzLmR4ID0gTWF0aC5jb3MocmFuZEFuZ2xlKSAqIHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB0aGlzLmR5ID0gTWF0aC5zaW4ocmFuZEFuZ2xlKSAqIHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB0aGlzLmlkbGVDb3VudCA9IDE7XG4gICAgfVxuICAgIFxuICAgIGlmICghdGhpcy5jaGFzaW5nUGxheWVyICYmIHRoaXMuaWRsZUNvdW50KSB0aGlzLmlkbGVDb3VudCsrO1xuICAgIFxuICAgIGlmICh0aGlzLmNoYXNpbmdQbGF5ZXIpIHtcbiAgICAgIHRoaXMuZHggPSBkeDtcbiAgICAgIHRoaXMuZHkgPSBkeTtcbiAgICB9XG5cblxuICAgIGlmKHRoaXMuaWRsZUNvdW50ID49IHRoaXMuaWRsZU1heCkgdGhpcy5pZGxlQ291bnQgPSAwO1xuXG4gICAgdGhpcy5hbmdsZSA9IE1hdGguYXRhbih0aGlzLmR5L3RoaXMuZHgpO1xuICAgIGNvbnN0IG55ID0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgIGNvbnN0IG54ID0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgIGlmICh0aGlzLmR5ID4gMCkge1xuICAgICAgdGhpcy5tb3ZlbWVudFtcInVwXCJdID0gdHJ1ZTtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJkb3duXCJdID0gZmFsc2U7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5keSkgPiBNYXRoLmFicyh0aGlzLmR4KSkgdGhpcy5zcHJpdGVEaXIgPSBcInVwXCI7XG4gICAgfVxuICAgIFxuICAgIGlmICh0aGlzLmR5IDwgMCkge1xuICAgICAgdGhpcy5tb3ZlbWVudFtcImRvd25cIl0gPSB0cnVlO1xuICAgICAgdGhpcy5tb3ZlbWVudFtcInVwXCJdID0gZmFsc2U7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5keSkgPiBNYXRoLmFicyh0aGlzLmR4KSkgdGhpcy5zcHJpdGVEaXIgPSBcImRvd25cIjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuZHggPiAwKSB7XG4gICAgICB0aGlzLm1vdmVtZW50W1wibGVmdFwiXSA9IHRydWU7XG4gICAgICB0aGlzLm1vdmVtZW50W1wicmlnaHRcIl0gPSBmYWxzZTtcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmR4KSA+IE1hdGguYWJzKHRoaXMuZHkpKSB0aGlzLnNwcml0ZURpciA9IFwibGVmdFwiO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5keCA8IDApIHtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJyaWdodFwiXSA9IHRydWU7XG4gICAgICB0aGlzLm1vdmVtZW50W1wibGVmdFwiXSA9IGZhbHNlO1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuZHgpID4gTWF0aC5hYnModGhpcy5keSkpIHRoaXMuc3ByaXRlRGlyID0gXCJyaWdodFwiO1xuICAgIH1cblxuICAgIHJldHVybiBbbngsbnldO1xuICB9XG5cbiAgZGFtYWdlKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpKjQpKzEpO1xuICB9XG5cbiAgaGl0UGxheWVyKHdhbGxzKSB7XG5cbiAgICBjb25zdCBwbGF5ZXIgPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXI7XG5cbiAgICBpZiAodGhpcy5kaXN0VG9QbGF5ZXIoKSA8IDMyICYmICFHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuaW52dWxuZXJhYmxlKSB7XG4gICAgICBwbGF5ZXIucG9zWzBdIC09ICgwLjQgKiB0aGlzLmR4KTtcbiAgICAgIHBsYXllci5wb3NbMV0gLT0gKDAuNCAqIHRoaXMuZHkpO1xuICAgICAgcGxheWVyLnVwZGF0ZVNpZGVzKCk7XG4gICAgICBwbGF5ZXIud2FsbENoZWNrKHdhbGxzKTtcbiAgICAgIHBsYXllci51cGRhdGVTaWRlcygpO1xuICAgICAgcGxheWVyLmhwIC09IHRoaXMuZGFtYWdlKCk7XG4gICAgICBpZiAocGxheWVyLmhwIDwgMCkgcGxheWVyLmhwID0gMDtcbiAgICAgIHBsYXllci5oaXQoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHdhbGxDaGVjayh3YWxscykge1xuICAgIGNvbnN0IHtcbiAgICAgIHVwLFxuICAgICAgZG93bixcbiAgICAgIGxlZnQsXG4gICAgICByaWdodFxuICAgIH0gPSB0aGlzLm1vdmVtZW50O1xuXG4gICAgaWYgKHVwKSB7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJ0b3BcIiwgd2FsbCkpIGJyZWFrOyB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnRvcCkge1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy50b3AgLSAodGhpcy5oZWlnaHQtdGhpcy5jb2xCb3guaGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZG93bikge1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwiYm90dG9tXCIsIHdhbGwpKSBicmVhazsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMuYm90dG9tIC0gNDg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxlZnQpIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgd2FsbCkpIGJyZWFrOyB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmxlZnQpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMubGVmdCAtICh0aGlzLmNvbEJveC53aWR0aC8yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmlnaHQpIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInJpZ2h0XCIsIHdhbGwpKSBicmVhazsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5yaWdodCkge1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5yaWdodCAtICh0aGlzLmNvbEJveC53aWR0aCArICh0aGlzLmNvbEJveC53aWR0aC8yKSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG5cbiAgbW92ZSh3YWxscykge1xuXG4gICAgaWYgKHRoaXMuZGlzdFRvUGxheWVyKCkgPCB0aGlzLmRldGVjdERpc3QpIHtcbiAgICAgIHRoaXMuY2hhc2luZ1BsYXllciA9IHRydWU7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYXNpbmdQbGF5ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDAuNzU7XG4gICAgfVxuICAgIFxuICAgIGxldCBuZXdWZWN0b3JzID0gdGhpcy5ub3JtYWxpemVkVmVjdG9yUG9zKCk7XG5cbiAgICBjb25zdCB7XG4gICAgICB1cCxcbiAgICAgIGRvd24sXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHRcbiAgICB9ID0gdGhpcy5tb3ZlbWVudDtcblxuICAgIGlmIChsZWZ0ICYmIHVwKSB7XG4gICAgICB0aGlzLnBvc1swXSAtPSBuZXdWZWN0b3JzWzBdO1xuICAgICAgdGhpcy5wb3NbMV0gLT0gbmV3VmVjdG9yc1sxXTtcbiAgICB9IFxuICAgIFxuICAgIGlmIChsZWZ0ICYmIGRvd24pIHtcbiAgICAgIHRoaXMucG9zWzBdIC09IG5ld1ZlY3RvcnNbMF07XG4gICAgICB0aGlzLnBvc1sxXSAtPSBuZXdWZWN0b3JzWzFdO1xuICAgIH1cbiAgICBcbiAgICBpZiAocmlnaHQgJiYgdXApIHtcbiAgICAgIHRoaXMucG9zWzBdICs9IG5ld1ZlY3RvcnNbMF07XG4gICAgICB0aGlzLnBvc1sxXSArPSBuZXdWZWN0b3JzWzFdO1xuICAgIH0gXG4gICAgXG4gICAgaWYgKHJpZ2h0ICYmIGRvd24pIHtcbiAgICAgIHRoaXMucG9zWzBdICs9IG5ld1ZlY3RvcnNbMF07XG4gICAgICB0aGlzLnBvc1sxXSArPSBuZXdWZWN0b3JzWzFdO1xuICAgIH1cblxuICAgIHRoaXMud2FsbENoZWNrKHdhbGxzKTtcblxuICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcblxuICAgIHN3aXRjaCAodGhpcy5zcHJpdGVEaXIpIHtcbiAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS51cC5wYWxZO1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJ1cFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICBcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUuZG93bi5wYWxZO1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJkb3duXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmxlZnQucGFsWTtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwibGVmdFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUucmlnaHQucGFsWTtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwicmlnaHRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gNDggKiAxO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBcbiAgICB0aGlzLmhpdFBsYXllcih3YWxscyk7XG4gICAgR2xvYmFsLlNFU1NJT04ucGxheWVyLndhbGxDaGVjayh3YWxscyk7XG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMuZHJhd09wdGlvbnMueCA9IHRoaXMucG9zWzBdO1xuICAgIHRoaXMuZHJhd09wdGlvbnMueSA9IHRoaXMucG9zWzFdO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW5lbXk7IiwiaW1wb3J0IENvbEJveCBmcm9tIFwiLi9jb2xsaXNpb25fYm94XCI7XG5pbXBvcnQgeyBjb2xsaWRlZFdpdGhTaWRlIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5jbGFzcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29sQm94V2lkdGggPSB3aWR0aC8yO1xuICAgIGNvbnN0IGNvbEJveEhlaWdodCA9IGhlaWdodC8zO1xuICAgIFxuICAgIHRoaXMuc3ByaXRlUGFsZXR0ZSA9IHNwcml0ZVBhbGV0dGU7XG4gICAgdGhpcy5kcmF3T3B0aW9ucyA9IHtcbiAgICAgIGltYWdlOiBzcHJpdGVQYWxldHRlLFxuICAgICAgcGFsWDogMCxcbiAgICAgIHBhbFk6IDAsXG4gICAgICBfc1dpZHRoOiB3aWR0aCxcbiAgICAgIF9zSGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiBwb3NbMF0sXG4gICAgICB5OiBwb3NbMV0sXG4gICAgICBfZFdpZHRoOiB3aWR0aCxcbiAgICAgIF9kSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICB0aGlzLmNvbEJveCA9IG5ldyBDb2xCb3godGhpcyxjb2xCb3hXaWR0aCxjb2xCb3hIZWlnaHQpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY2VudGVyID0gdGhpcy5jb2xCb3guY2VudGVyO1xuICAgIHRoaXMuY29sbGlzaW9ucyA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcbiAgICBcbiAgfVxuXG4gIGNvbEJveEhvb2soKSB7IC8vIHRoaXMgd2lsbCBjZW50ZXIgdGhlIGNvbEJveCBvbiB0aGUgYm90dG9tXG4gICAgbGV0IFt4LHldID0gW3RoaXMucG9zWzBdLHRoaXMucG9zWzFdXTtcbiAgICBsZXQgW2N4LGN5XSA9IFtcbiAgICAgIHgrKCh0aGlzLndpZHRoIC0gdGhpcy5jb2xCb3gud2lkdGgpLzIpLFxuICAgICAgeSsodGhpcy5oZWlnaHQgLSB0aGlzLmNvbEJveC5oZWlnaHQpLFxuICAgIF07XG4gICAgcmV0dXJuIFtjeCxjeV07XG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICB0aGlzLmNvbEJveC51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMuY2VudGVyID0gdGhpcy5jb2xCb3guY2VudGVyO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICB9XG5cbiAgY29sbGlkZWRPblNpZGUoc2lkZSwgb3RoZXJPYmplY3QpIHtcbiAgICBsZXQgb3RoZXJTaWRlO1xuICAgIHN3aXRjaChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwiYm90dG9tXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInRvcFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwicmlnaHRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJsZWZ0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3RoZXJTaWRlID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sbGlzaW9uc1tzaWRlXSA9IGNvbGxpZGVkV2l0aFNpZGUoc2lkZSwgdGhpc1tzaWRlXSwgb3RoZXJPYmplY3Rbb3RoZXJTaWRlXSk7XG4gICAgcmV0dXJuIHRoaXMuY29sbGlzaW9uc1tzaWRlXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSguLi5PYmplY3QudmFsdWVzKHRoaXMuZHJhd09wdGlvbnMpKTtcbiAgICB0aGlzLmNvbEJveC5jZW50ZXJPbkVudGl0eSgpO1xuICAgIHRoaXMuY29sQm94LmRyYXcoY3R4KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHk7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBSb29tIGZyb20gXCIuL3Jvb21cIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoY3R4LCBwbGF5ZXJTcHJpdGUpIHtcbiAgICB0aGlzLmZwc0ludGVydmFsID0gMTAwMC82MDtcbiAgICB0aGlzLnRvUGxheWVyID0gMTAwO1xuICAgIGNvbnN0IHN0YXJ0aW5nUG9zID0gWzQ4KjcsIDQ4KjddO1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihzdGFydGluZ1BvcywgLi4uR2xvYmFsLlNQUklURV9ESU1TLCBwbGF5ZXJTcHJpdGUpO1xuICAgIEdsb2JhbC5TRVNTSU9OLnBsYXllciA9IHRoaXMucGxheWVyO1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIC8vIGNvbnN0IHJvb20gPSB7IFwibGVmdFwiOiBuZXcgUm9vbSgpIH07IC8vIHRlc3RpbmcgbmV3IFJvb20ocm9vbSlcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tcyA9IHt9O1xuICAgIHRoaXMuc3RhcnRpbmdSb29tID0gbmV3IFJvb20oKTtcbiAgICB0aGlzLnJvb20gPSB0aGlzLnN0YXJ0aW5nUm9vbTtcbiAgICB0aGlzLnBsYXllci5kcmF3KGN0eCk7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZSA9IHRoaXM7XG4gICAgR2xvYmFsLlNFU1NJT04uc3RvcCA9IGZhbHNlO1xuICAgIEdsb2JhbC5TRVNTSU9OLmNvaW5Db3VudCA9IDA7XG4gICAgdGhpcy5nYW1lU3RlcCA9IHRoaXMuZ2FtZVN0ZXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3AgPSB0aGlzLnN0b3AuYmluZCh0aGlzKTtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXkoKTtcbiAgfVxuXG4gIGdhbWVPdmVyKCkge1xuICAgIHJldHVybiB0aGlzLndpbigpIHx8IHRoaXMubG9zZSgpO1xuICB9XG5cbiAgd2luKCl7XG4gICAgcmV0dXJuIEdsb2JhbC5TRVNTSU9OLmNvaW5Db3VudCA+IDk7XG4gIH1cblxuICBsb3NlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXllci5ocCA8PSAwO1xuICB9XG5cblxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuZ2FtZU92ZXIoKSkge1xuICAgICAgdGhpcy5yZXF1ZXN0U3RvcCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2FtZVN0ZXAoKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lU3RlcCk7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGVsYXBzZWQgPSBub3cgLSB0aGlzLnRoZW47XG5cbiAgICBpZiAoZWxhcHNlZCA+IHRoaXMuZnBzSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChlbGFwc2VkICUgdGhpcy5mcHNJbnRlcnZhbCk7XG4gICAgICBjb25zdCBwbGF5ZXIgPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXI7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwwLCBHbG9iYWwuV0lEVEgsIEdsb2JhbC5IRUlHSFQpO1xuICAgICAgcGxheWVyLm1vdmUodGhpcy5yb29tLndhbGxzKTtcbiAgICAgIE9iamVjdC52YWx1ZXModGhpcy5yb29tLmVuZW1pZXMpLmZvckVhY2goZW5lbXkgPT4gZW5lbXkubW92ZSh0aGlzLnJvb20ud2FsbHMpKTtcbiAgICAgIHRoaXMucm9vbS5hbmltYXRlKCk7XG4gICAgICB0aGlzLnJvb20uZHJhdyh0aGlzLmN0eCk7XG4gICAgICBwbGF5ZXIuZHJhdyh0aGlzLmN0eCk7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICAgIGlmICh0aGlzLnJlcXVlc3RTdG9wKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElkKTtcbiAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IFwiQ291cmllciBOZXdcIjtcbiAgICAgICAgaWYgKHRoaXMud2luKCkpIHtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDAsMC41KVwiO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsMCw3MjAsNzIwKTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZhZjRcIjtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDQ4cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDb25ncmF0dWxhdGlvbnMhXCIsIDQ4KjMsIDQ4KjQpO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgMjRweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIllvdSBsZWF2ZSB3aXRoIHlvdXIgbGlmZSxcIiwgNDgqNCw0OCo1KTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcImFuZCB5b3VyIHBvY2tldHMgZnVsbCFcIiwgNDgqNC41LDQ4KjUuNSk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJDbGljayAnUmVzdGFydCcgdXAgdG9wIGlmXCIsIDQ4KjQsNDgqNyk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJ5b3UnZCBsaWtlIHRvIHBsYXkgYWdhaW5cIiwgNDgqNC4yLDQ4KjcuNSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubG9zZSgpKSB7XG4gICAgICAgICAgY29uc3QgZm9udCA9IEdsb2JhbC5GT05ULmZvbnQ7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwwLDAuNSlcIjtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLDAsNzIwLDcyMCk7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjZmZmYWY0XCI7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGA0OHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR0FNRSBPVkVSXCIsIDQ4ICogNC43NSwgNDggKiA0KTtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDM2cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJ5b3UgbG9zZSFcIiwgNDggKiA1LjY1LCA0OCAqIDUpO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgOTZweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIvCfkoBcIiwgNDggKiA2LjI1LCA0OCAqIDcpO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgMjRweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNsaWNrICdSZXN0YXJ0JyB1cCB0b3AgaWZcIiwgNDgqNCw0OCo5KTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcInlvdSdkIGxpa2UgdG8gcGxheSBhZ2FpblwiLCA0OCo0LjIsNDgqOS41KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuZ2FtZVN0ZXAoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lU3RlcCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCB7IG5ld0dhbWUgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5jbGFzcyBHYW1lU3RhcnQge1xuICBjb25zdHJ1Y3RvcihjdHgsIHBsYXllclNwcml0ZSkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMucGxheWVyU3ByaXRlID0gcGxheWVyU3ByaXRlO1xuICAgIHRoaXMuZnBzSW50ZXJ2YWwgPSAxMDAwLzYwO1xuICAgIHRoaXMudGhldGEgPSAwO1xuICAgIHRoaXMuc3RlcCA9IHRoaXMuc3RlcC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICB0aGlzLnJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnN0ZXApO1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBlbGFwc2VkID0gbm93IC0gdGhpcy50aGVuO1xuICAgIGlmIChlbGFwc2VkID4gdGhpcy5mcHNJbnRlcnZhbCkge1xuICAgICAgY29uc3QgZm9udEZhbWlseSA9IFwiQ291cmllciBOZXdcIjtcbiAgICAgIHRoaXMudGhldGEgKz0gMC4wMTtcbiAgICAgIGNvbnN0IHJlZCA9IE1hdGguZmxvb3IoMTI3ICogTWF0aC5zaW4oMS4xICogdGhpcy50aGV0YSkgKyAxKTtcbiAgICAgIGNvbnN0IGdyZWVuID0gTWF0aC5mbG9vcigxMjcgKiBNYXRoLnNpbigxLjIgKiB0aGlzLnRoZXRhKSArIDEpO1xuICAgICAgY29uc3QgYmx1ZSA9IE1hdGguZmxvb3IoMTI3ICogTWF0aC5zaW4oMS41ICogdGhpcy50aGV0YSkgKyAxKTtcbiAgICAgIGNvbnN0IGNvbG9yID0gYHJnYmEoJHtyZWR9LCR7Z3JlZW59LCR7Ymx1ZX0sIDAuNylgO1xuICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsMCw3MjAsNzIwKTtcbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShHbG9iYWwuQkdfSU1HU1tcIjRETFJVMFwiXSwgMCwgMCk7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsMCw3MjAsNzIwKTtcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmFmNFwiO1xuICAgICAgdGhpcy5jdHguZm9udCA9IGBib2xkIDQ4cHggJHtmb250RmFtaWx5fWA7XG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlByZXNzIEVOVEVSXCIsIDQ4ICogNCwgNDggKiA0KTtcbiAgICAgIHRoaXMuY3R4LmZvbnQgPSBgYm9sZCAyNHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCIuLi50byBiZWdpbiBhIG5ldyBjcmF3bCFcIiwgNDggKiA1LCA0OCAqIDQuNTUpO1xuXG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5wbGF5ZXJTcHJpdGUsIDQ4LCAwLCA0OCwgNDgsIDQ4ICogNywgNDggKiA3LCA0OCwgNDgpO1xuXG4gICAgICBpZiAoR2xvYmFsLktFWVNbXCJFbnRlclwiXSkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZCk7XG4gICAgICAgIGNvbnN0IHJlc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnRcIik7XG4gICAgICAgIHJlc3RhcnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIG5ld0dhbWUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm9tcHQoKSB7XG4gICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnN0ZXAoKTtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZVN0YXJ0OyIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCB7IHJvb21DaGFuZ2UgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHN1cGVyKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSk7XG4gICAgdGhpcy5zcGVlZCA9IDEuMjU7XG4gICAgdGhpcy5ub3JtYWxpemVkU3BlZWQgPSBwYXJzZUZsb2F0KHRoaXMuc3BlZWQpIC8gTWF0aC5zcXJ0KDIpO1xuICAgIHRoaXMucGFjZSA9IDI0L3RoaXMuc3BlZWQ7XG4gICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMTtcbiAgICB0aGlzLnN0YW1pbmEgPSAxMDAwO1xuICAgIHRoaXMuaW52dWxuZXJhYmxlID0gMDtcbiAgICB0aGlzLmhwID0gMjA7XG4gICAgdGhpcy5zdHJpZGUgPSB7XG4gICAgICB1cDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogNixcbiAgICAgIH0sXG4gICAgICBkb3duOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiAwLFxuICAgICAgfSxcbiAgICAgIGxlZnQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDIsXG4gICAgICB9LFxuICAgICAgcmlnaHQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDQsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBuZXdSb29tUG9zKGRpcikge1xuICAgIHN3aXRjaChkaXIpIHtcbiAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICB0aGlzLnBvc1sxXSA9IDcyMC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICB0aGlzLnBvc1sxXSA9IC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICB0aGlzLnBvc1swXSA9IDcyMC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5wb3NbMF0gPSAtMjQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0cmlkZVBhbGV0dGVQb3MoZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5wYWNlID0gMjQgLyAodGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcik7XG4gICAgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSAyICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDMgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDI7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA+IDQgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID0gMDtcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfVxuICB9XG5cbiAgd2FsbENoZWNrKHdhbGxzKSB7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJ0b3BcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMudG9wKSB7XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLnRvcCAtIDMyO1xuICAgICAgfVxuXG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJib3R0b21cIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMuYm90dG9tKSB7XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLmJvdHRvbSAtIDQ4O1xuICAgICAgfVxuXG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJsZWZ0XCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmxlZnQpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMubGVmdCAtIDEyO1xuICAgICAgfVxuXG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJyaWdodFwiLCB3YWxsKSkgYnJlYWsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5yaWdodCkge1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5yaWdodCAtIDM2O1xuICAgICAgfVxuXG4gIH1cblxuICBpbnZ1bENoZWNrKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuaW52dWxuZXJhYmxlIC8gNSkgJSAyID09PSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaW52dWxuZXJhYmxlID0gNjA7XG4gIH1cblxuICBtb3ZlKHdhbGxzKSB7XG4gICAgY29uc3QgW1xuICAgICAgdXAsXG4gICAgICBkb3duLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0LFxuICAgICAgc2hpZnRcbiAgICBdID0gW1xuICAgICAgR2xvYmFsLktFWVNbXCJ3XCJdLFxuICAgICAgR2xvYmFsLktFWVNbXCJzXCJdLFxuICAgICAgR2xvYmFsLktFWVNbXCJhXCJdLFxuICAgICAgR2xvYmFsLktFWVNbXCJkXCJdLFxuICAgICAgR2xvYmFsLktFWVNbXCJTaGlmdFwiXSxcbiAgICBdO1xuICAgIGlmIChzaGlmdCAmJiB0aGlzLnN0YW1pbmEgPiAwKSB7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxLjU7XG4gICAgICB0aGlzLnN0YW1pbmEgLT0gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGFtaW5hIDwgMCkgdGhpcy5zdGFtaW5hID0gMDtcbiAgICBpZiAoIXNoaWZ0ICYmIHRoaXMuc3RhbWluYSA8IDEwMDApIHtcbiAgICAgIGlmICghdXAgJiYgIWRvd24gJiYgIXJpZ2h0ICYmICFsZWZ0KSB7XG4gICAgICAgIHRoaXMuc3RhbWluYSArPSAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFtaW5hICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmludnVsbmVyYWJsZSkgdGhpcy5pbnZ1bG5lcmFibGUtLTtcbiAgICBpZiAodGhpcy5pbnZ1bHZlcmFibGUgPCAwKSB0aGlzLmludnVsbmVyYWJsZSA9IDA7XG5cbiAgICB0aGlzLndhbGxDaGVjayh3YWxscyk7XG5cbiAgICAvLyBXIGtleSBtb3ZlbWVudHMgYW5kIHNwcml0ZSBkaXJlY3Rpb25cbiAgICBpZiAodXApIHtcbiAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0ICYmICF0aGlzLmNvbGxpc2lvbnMudG9wKSB7XG4gICAgICAgIHRoaXMucG9zWzFdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zWzFdICs9IC10aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUudXAucGFsWTtcbiAgICAgIGlmICghbGVmdCAmJiAhcmlnaHQpIHtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwidXBcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUyBrZXkgbW92ZW1lbnRzIGFuZCBzcHJpdGUgZGlyZWN0aW9uXG4gICAgaWYgKGRvd24pIHtcbiAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0KSB7XG4gICAgICAgIHRoaXMucG9zWzFdICs9IHRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gKz0gdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmRvd24ucGFsWTtcbiAgICAgIGlmICghbGVmdCAmJiAhcmlnaHQpIHtcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwiZG93blwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBIGtleSBtb3ZlbWVudFxuICAgIGlmIChsZWZ0KSB7XG4gICAgICBpZiAodXAgfHwgZG93biAmJiAhdGhpcy5jb2xsaXNpb25zLmxlZnQpIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gLXRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gLXRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5sZWZ0LnBhbFk7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIEQga2V5IG1vdmVtZW50XG4gICAgaWYgKHJpZ2h0KSB7XG4gICAgICBpZiAodXAgfHwgZG93bikge1xuICAgICAgICB0aGlzLnBvc1swXSArPSB0aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG9zWzBdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5yaWdodC5wYWxZO1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwicmlnaHRcIik7XG4gICAgfVxuXG4gICAgLy8gaWYgbm9uZSBvZiB0aGUga2V5cyBhcmUgYmVpbmcgcHJlc3NlZCwgZ28gdG8gZGVmYXVsdCBzdGFuY2VcbiAgICBpZiAoIXVwICYmICFkb3duICYmICFyaWdodCAmJiAhbGVmdCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gNDggKiAxO1xuICAgIH1cblxuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgbGV0IGV4aXREaXI7XG4gICAgaWYgKHggPCAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcImxlZnRcIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9IGVsc2UgaWYgKHggPiA3MjAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcInJpZ2h0XCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfSBlbHNlIGlmICh5IDwgLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJ1cFwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH0gZWxzZSBpZiAoeSA+IDcyMC0yNCkge1xuICAgICAgZXhpdERpciA9IFwiZG93blwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pbnZ1bENoZWNrKCkpIHtcbiAgICAgIGRlYnVnZ2VyXG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSA0OCAqIDM7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMuZHJhd09wdGlvbnMueCA9IHRoaXMucG9zWzBdO1xuICAgIHRoaXMuZHJhd09wdGlvbnMueSA9IHRoaXMucG9zWzFdO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IFdhbGwgZnJvbSBcIi4vd2FsbFwiO1xuaW1wb3J0IENvaW4gZnJvbSBcIi4vY29pblwiO1xuaW1wb3J0IEVuZW15IGZyb20gXCIuL2VuZW15XCI7XG5cbmltcG9ydCB7XG4gIHJhbmROdW1QYXRocyxcbiAgYWRkVmFsaWROZWlnaGJvcnMsXG4gIGJ1aWxkUGF0aHMsXG4gIHNodWZmbGUsXG4gIGFzc2lnbkJsb2NrZWRQYXRocyxcbiAgcmFuZE51bUNvaW5zXG59IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuXG5jbGFzcyBSb29tIHtcbiAgY29uc3RydWN0b3IobmVpZ2hib3IpIHtcbiAgICB0aGlzLmdlbmVyYXRlQ29pbnMoKTtcbiAgICB0aGlzLndhbGxzID0gW107XG4gICAgbGV0IHJhbmRJZHg7XG4gICAgdGhpcy5uZWlnaGJvcnMgPSB7XG4gICAgICB1cDogdW5kZWZpbmVkLFxuICAgICAgZG93bjogdW5kZWZpbmVkLFxuICAgICAgbGVmdDogdW5kZWZpbmVkLFxuICAgICAgcmlnaHQ6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGxldCBlbnRyeURpcjtcbiAgICBpZiAobmVpZ2hib3IpIHtcbiAgICAgIGNvbnN0IGV4aXREaXIgPSBPYmplY3Qua2V5cyhuZWlnaGJvcilbMF07XG4gICAgICBjb25zdCBwcmV2Um9vbSA9IE9iamVjdC52YWx1ZXMobmVpZ2hib3IpWzBdO1xuICAgICAgdGhpcy5ub2RlUG9zID0gWy4uLnByZXZSb29tLm5vZGVQb3NdO1xuICAgICAgc3dpdGNoKGV4aXREaXIpIHtcbiAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMuZG93biA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJEXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzFdKys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMudXAgPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiVVwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1sxXS0tO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgIHRoaXMubmVpZ2hib3JzLnJpZ2h0ID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIlJcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMF0tLTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMubGVmdCA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJMXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzBdKys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9kZVBvcyA9IFswLDBdO1xuICAgIH1cbiAgICBcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuXG4gICAgYWRkVmFsaWROZWlnaGJvcnModGhpcyk7XG4gICAgbGV0IHdhbGxzLCBudW1QYXRocywgcmFuZFBhdGhzO1xuICAgIGxldCBuZXdQYXRocyA9IFtdO1xuICAgIGxldCBwYXRocyA9IGJ1aWxkUGF0aHModGhpcyk7XG4gICAgbGV0IHBhdGhzQXJyID0gcGF0aHMuc3BsaXQoXCJcIik7XG4gICAgaWYgKG5laWdoYm9yKSB7XG4gICAgICAvLyBpZiBub3QgaW5pdGlhbCByb29tXG4gICAgICBwYXRoc0FyciA9IHBhdGhzQXJyLmZpbHRlcihwYXRoID0+IHBhdGggIT09IGVudHJ5RGlyKTsgLy8gcmVtb3ZlIGVudHJ5RGlyIGZyb20gcGF0aHNcbiAgICAgIG51bVBhdGhzID0gcmFuZE51bVBhdGhzKHBhdGhzLmxlbmd0aCk7IC8vIHdlaWdodGVkIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLCBwcmVmZXJzIG1vcmUgcGF0aHNcbiAgICAgIGlmIChudW1QYXRocyA9PT0gcGF0aHMubGVuZ3RoKSB7IC8vIGlmIGFsbCA0IHBhdGhzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtwYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBwYXRocyk7XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhwYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9IGVsc2UgeyAvLyBsZXNzIHRoYW4gNCBwYXRocyBhdmFpbGFibGVcbiAgICAgICAgc2h1ZmZsZShwYXRoc0Fycik7IC8vIHJhbmRvbWl6ZSB0aGUgcGF0aCBjaG9pY2VzXG4gICAgICAgIG5ld1BhdGhzLnB1c2goZW50cnlEaXIpOyAvLyBNVVNUIEFMV0FZUyBoYXZlIHRoZSBwYXRoIHlvdSBlbnRlciBmcm9tXG4gICAgICAgIG51bVBhdGhzLS07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGF0aHM7IGkrKykgeyBuZXdQYXRocy5wdXNoKHBhdGhzQXJyLnBvcCgpKSB9XG4gICAgICAgIG5ld1BhdGhzID0gbmV3UGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzKzF9JHtuZXdQYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGlmICghdGhpcy5iYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgYXNzaWduQmxvY2tlZFBhdGhzKHRoaXMsIG5ld1BhdGhzKTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKG5ld1BhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7dGhpcy5ub2RlUG9zfWBdID0gdGhpcztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbnVtUGF0aHMgPSByYW5kTnVtUGF0aHMocGF0aHMubGVuZ3RoKTtcbiAgICAgIGlmIChudW1QYXRocyA9PT0gcGF0aHMubGVuZ3RoKSB7XG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzfSR7cGF0aHN9JHtyYW5kSWR4fWBdO1xuICAgICAgICB3YWxscyA9IHRoaXMuYnVpbGRSb29tV2FsbHMocGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2h1ZmZsZShwYXRoc0Fycik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGF0aHM7IGkrKykgeyBuZXdQYXRocy5wdXNoKHBhdGhzQXJyLnBvcCgpKSB9XG4gICAgICAgIG5ld1BhdGhzID0gbmV3UGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzfSR7bmV3UGF0aHN9JHtyYW5kSWR4fWBdO1xuICAgICAgICBhc3NpZ25CbG9ja2VkUGF0aHModGhpcywgbmV3UGF0aHMpO1xuICAgICAgICB3YWxscyA9IHRoaXMuYnVpbGRSb29tV2FsbHMobmV3UGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmdlbmVyYXRlRW5lbWllcygpO1xuICAgIC8vIHRoaXMuYW5pbWF0ZWRPYmplY3RzID0ge307XG4gICAgLy8gT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKS5mb3JFYWNoKGNvaW4gPT4ge1xuICAgIC8vICAgdGhpcy5hbmltYXRlZE9iamVjdHNbYGNvaW4tJHtjb2luLnBvc31gXSA9IGNvaW47XG4gICAgLy8gfSk7XG5cbiAgfVxuXG4gIGdlbmVyYXRlRW5lbWllcygpIHtcbiAgICBjb25zdCBudW1FbmVtaWVzID0gTWF0aC5mbG9vcihPYmplY3Qua2V5cyhHbG9iYWwuU0VTU0lPTi5yb29tcykubGVuZ3RoLzIpO1xuICAgIHRoaXMuZW5lbWllcyA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtRW5lbWllczsgaSsrKSB7XG4gICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1NTApICsgNjQ7XG4gICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1NTApICsgNjQ7XG4gICAgICBsZXQgcG9zID0gW3gseV07XG4gICAgICBjb25zdCBlbmVteSA9IG5ldyBFbmVteShwb3MsIDQ4LDQ4LEdsb2JhbC5TUFJJVEVTLm1vbnN0ZXJzLCBcImJsb2JcIiwgMjAwICsgKG51bUVuZW1pZXMgKiA1MCkpO1xuICAgICAgdGhpcy5lbmVtaWVzW2Ake2VuZW15LnBvc31gXSA9IGVuZW15O1xuICAgIH1cbiAgfTtcblxuICBnZW5lcmF0ZUNvaW5zKCkge1xuICAgIGNvbnN0IG51bUNvaW5zID0gcmFuZE51bUNvaW5zKCk7XG4gICAgdGhpcy5jb2lucyA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29pbnM7IGkrKykge1xuICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgd2hpbGUgKHggPiAzMzYgJiYgeCA8IDM4NCkgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICB3aGlsZSAoeSA+IDMzNiAmJiB5IDwgMzg0KSB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIGxldCBwb3MgPSBbeCx5XTtcbiAgICAgIGNvbnN0IGNvaW4gPSBuZXcgQ29pbihwb3MsIDE2LDE2LEdsb2JhbC5TUFJJVEVTLmNvaW4pO1xuICAgICAgdGhpcy5jb2luc1tgJHtjb2luLnBvc31gXSA9IGNvaW47XG4gICAgfVxuICB9O1xuXG4gIGFuaW1hdGUoKSB7XG4gICAgdGhpcy5jb2xsZWN0KCk7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKS5mb3JFYWNoKGNvaW4gPT4ge1xuICAgICAgY29pbi5hbmltYXRlKCk7XG4gICAgfSk7XG4gICAgLy8gT2JqZWN0LnZhbHVlcyh0aGlzLmFuaW1hdGVkT2JqZWN0cykuZm9yRWFjaChvYmplY3QgPT4gb2JqZWN0LmFuaW1hdGUoKSk7XG5cbiAgfVxuXG4gIGNvbGxlY3QoKSB7XG4gICAgZm9yIChsZXQgY29pbiBvZiBPYmplY3QudmFsdWVzKHRoaXMuY29pbnMpKSB7XG4gICAgICBpZiAoY29pbi5jb2xsZWN0KCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY29pbnNbYCR7Y29pbi5wb3N9YF07XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLmNvaW5Db3VudCsrO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iYWNrZ3JvdW5kLCAwLCAwKTtcbiAgICAvLyB0aGlzLndhbGxzLmZvckVhY2god2FsbCA9PiB3YWxsLmRyYXcoY3R4KSk7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKS5mb3JFYWNoKGNvaW4gPT4gY29pbi5kcmF3KGN0eCkpO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5lbmVtaWVzKS5mb3JFYWNoKGVuZW15ID0+IGVuZW15LmRyYXcoY3R4KSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmFmNFwiO1xuICAgIGN0eC5mb250ID0gXCIyMHB4IGFyaWFsXCI7XG4gICAgY3R4LmZpbGxUZXh0KGBSb29tIFsgJHt0aGlzLm5vZGVQb3N9IF1gLCAxNSwgMzApO1xuICAgIGN0eC5maWxsVGV4dChgQ29pbnMgeCAke0dsb2JhbC5TRVNTSU9OLmNvaW5Db3VudH1gLCA1OTAsIDMwKTtcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmJiMDBcIjtcbiAgICBjdHgubW92ZVRvKDE1LCA3MDUpO1xuICAgIGN0eC5saW5lV2lkdGggPSA1O1xuICAgIGN0eC5saW5lVG8oMTUgKyAoR2xvYmFsLlNFU1NJT04ucGxheWVyLnN0YW1pbmEvMTAwMCkgKiAxMDAsIDcwNSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzMzZmYwMFwiO1xuICAgIGN0eC5tb3ZlVG8oMTUsIDY5MCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEwO1xuICAgIGN0eC5saW5lVG8oMTUgKyAoR2xvYmFsLlNFU1NJT04ucGxheWVyLmhwLzIwKSAqIDEwMCwgNjkwKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmYwMDAwXCI7XG4gICAgY3R4Lm1vdmVUbygxMTUgLSAoMSAtIEdsb2JhbC5TRVNTSU9OLnBsYXllci5ocC8yMCkgKiAxMDAsIDY5MCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEwO1xuICAgIGN0eC5saW5lVG8oMTE1LCA2OTApO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMGRkZGRcIjtcbiAgICBjdHgubW92ZVRvKDE1LCA2OTkpO1xuICAgIGN0eC5saW5lV2lkdGggPSA1O1xuICAgIGN0eC5saW5lVG8oMTUgKyAoR2xvYmFsLlNFU1NJT04ucGxheWVyLmludnVsbmVyYWJsZS83NSkgKiAxMDAsIDY5OSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIC8vIGN0eC5maWxsVGV4dChgU3RhbWluYSA9ICR7R2xvYmFsLlNFU1NJT04ucGxheWVyLnN0YW1pbmF9YCwgMTUsIDQwMCk7XG4gIH1cblxuICBidWlsZFJvb21XYWxscyhwYXRocykge1xuICAgIGxldCB3YWxscyA9IFtdO1xuICAgIHN3aXRjaChwYXRocykge1xuICAgICAgY2FzZSBcIkRMUlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRMVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiUlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJMUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgfVxuICB9XG5cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFJvb207IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgUm9vbSBmcm9tIFwiLi4vcm9vbVwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2dhbWVcIjtcblxuXG5leHBvcnQgY29uc3QgbmV3R2FtZSA9ICgpID0+IHtcbiAgaWYgKEdsb2JhbC5TRVNTSU9OLmdhbWUpIHtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnJlcXVlc3RTdG9wID0gdHJ1ZTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT05bXCJnYW1lXCJdO1xuICAgIGRlbGV0ZSBHbG9iYWwuU0VTU0lPTltcInBsYXllclwiXTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT05bXCJjb2luQ291bnRcIl07XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wicm9vbXNcIl07XG4gIH1cbiAgbmV3IEdhbWUoLi4uT2JqZWN0LnZhbHVlcyhHbG9iYWwuR0FNRV9PUFRJT05TKSk7XG59O1xuXG5leHBvcnQgY29uc3QgY29sbGlkZWRXaXRoU2lkZSA9IChzaWRlLCB0aGlzU2lkZSwgb3RoZXJTaWRlKSA9PiB7XG4gIGxldCBjb2xsaWRlZCA9IGZhbHNlO1xuICBsZXQgdXBwZXJEaWZmLCBsb3dlckRpZmY7XG4gIGNvbnN0IHVwcGVyQm91bmRzID0gMTA7XG4gIGNvbnN0IGxvd2VyQm91bmRzID0gMDtcbiAgaWYgKHNpZGUgPT09IFwidG9wXCIgfHwgc2lkZSA9PT0gXCJib3R0b21cIikge1xuICAgIGNvbnN0IHRoaXNZVmFsID0gdGhpc1NpZGVbMV07XG4gICAgY29uc3QgW3RoaXNYTWluLCB0aGlzWE1heF0gPSB0aGlzU2lkZVswXTtcbiAgICBjb25zdCBvdGhlcllWYWwgPSBvdGhlclNpZGVbMV07XG4gICAgY29uc3QgW290aGVyWE1pbiwgb3RoZXJYTWF4XSA9IG90aGVyU2lkZVswXTtcbiAgICBcbiAgICBzd2l0Y2ggKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKG90aGVyWVZhbCAtIHRoaXNZVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAob3RoZXJZVmFsIC0gdGhpc1lWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNZVmFsIDwgb3RoZXJZVmFsKSAmJlxuICAgICAgICAgICh0aGlzWE1pbiA8IG90aGVyWE1heCkgJiZcbiAgICAgICAgICAodGhpc1hNYXggPiBvdGhlclhNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIHVwcGVyRGlmZiA9ICh0aGlzWVZhbCAtIG90aGVyWVZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKHRoaXNZVmFsIC0gb3RoZXJZVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWVZhbCA+IG90aGVyWVZhbCkgJiZcbiAgICAgICAgICAodGhpc1hNaW4gPCBvdGhlclhNYXgpICYmXG4gICAgICAgICAgKHRoaXNYTWF4ID4gb3RoZXJYTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvbGxpZGVkKSByZXR1cm4gb3RoZXJZVmFsO1xuXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdGhpc1hWYWwgPSB0aGlzU2lkZVswXTtcbiAgICBjb25zdCBbdGhpc1lNaW4sIHRoaXNZTWF4XSA9IHRoaXNTaWRlWzFdO1xuICAgIGNvbnN0IG90aGVyWFZhbCA9IG90aGVyU2lkZVswXTtcbiAgICBjb25zdCBbb3RoZXJZTWluLCBvdGhlcllNYXhdID0gb3RoZXJTaWRlWzFdO1xuICAgIFxuICAgIHN3aXRjaCAoc2lkZSkge1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKG90aGVyWFZhbCAtIHRoaXNYVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAob3RoZXJYVmFsIC0gdGhpc1hWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNYVmFsIDwgb3RoZXJYVmFsKSAmJlxuICAgICAgICAgICh0aGlzWU1pbiA8IG90aGVyWU1heCkgJiZcbiAgICAgICAgICAodGhpc1lNYXggPiBvdGhlcllNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB1cHBlckRpZmYgPSAodGhpc1hWYWwgLSBvdGhlclhWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9ICh0aGlzWFZhbCAtIG90aGVyWFZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1hWYWwgPiBvdGhlclhWYWwpICYmXG4gICAgICAgICAgKHRoaXNZTWluIDwgb3RoZXJZTWF4KSAmJlxuICAgICAgICAgICh0aGlzWU1heCA+IG90aGVyWU1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvbGxpZGVkKSByZXR1cm4gb3RoZXJYVmFsO1xuICAgIFxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xuXG59O1xuXG5leHBvcnQgY29uc3Qgcm9vbUNoYW5nZSA9IChleGl0RGlyLCBjdXJyUm9vbSkgPT4ge1xuICBsZXQgbmV4dE5vZGVQb3MgPSBbLi4uY3VyclJvb20ubm9kZVBvc107XG4gIHN3aXRjaChleGl0RGlyKSB7XG4gICAgY2FzZSBcInVwXCI6XG4gICAgICBuZXh0Tm9kZVBvc1sxXSArPSAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd25cIjpcbiAgICAgIG5leHROb2RlUG9zWzFdIC09IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMF0gLT0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMF0gKz0gMTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHtuZXh0Tm9kZVBvc31gXSkge1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake25leHROb2RlUG9zfWBdO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG5laWdoYm9yID0geyBbZXhpdERpcl06IGN1cnJSb29tIH07XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tID0gbmV3IFJvb20obmVpZ2hib3IpO1xuICAgIGFkZFZhbGlkTmVpZ2hib3JzKGN1cnJSb29tKTtcbiAgICBhZGRWYWxpZE5laWdoYm9ycyhHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZE51bVBhdGhzID0gbWF4ID0+IHtcbiAgbGV0IHBhdGhzID0gW107XG4gIGlmIChtYXggPiAzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzRdOyBpKyspIHsgcGF0aHMucHVzaCg0KSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzNdOyBpKyspIHsgcGF0aHMucHVzaCgzKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzJdOyBpKyspIHsgcGF0aHMucHVzaCgyKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzFdOyBpKyspIHsgcGF0aHMucHVzaCgxKSB9XG4gIH0gZWxzZSBpZiAobWF4ID4gMikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVszXTsgaSsrKSB7IHBhdGhzLnB1c2goMykgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsyXTsgaSsrKSB7IHBhdGhzLnB1c2goMikgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsxXTsgaSsrKSB7IHBhdGhzLnB1c2goMSkgfVxuICB9IGVsc2UgaWYgKG1heCA+IDEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMl07IGkrKykgeyBwYXRocy5wdXNoKDIpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMV07IGkrKykgeyBwYXRocy5wdXNoKDEpIH1cbiAgfSBlbHNlIHtcbiAgICBwYXRocy5wdXNoKDEpO1xuICB9XG5cbiAgc2h1ZmZsZShwYXRocyk7XG5cbiAgcmV0dXJuIHBhdGhzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpwYXRocy5sZW5ndGgpXTtcbiAgXG59O1xuXG5leHBvcnQgY29uc3QgYWRkVmFsaWROZWlnaGJvcnMgPSByb29tID0+IHtcbiAgbGV0IHVwID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHVwWzFdICs9IDE7XG4gIHVwID0gdXAudG9TdHJpbmcoKTtcbiAgbGV0IGRvd24gPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgZG93blsxXSAtPSAxO1xuICBkb3duID0gZG93bi50b1N0cmluZygpO1xuICBsZXQgbGVmdCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBsZWZ0WzBdIC09IDE7XG4gIGxlZnQgPSBsZWZ0LnRvU3RyaW5nKCk7XG4gIGxldCByaWdodCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICByaWdodFswXSArPSAxO1xuICByaWdodCA9IHJpZ2h0LnRvU3RyaW5nKCk7XG4gIGlmIChcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0gJiYgXG4gICAgKEdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXS5uZWlnaGJvcnMuZG93biAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy51cFxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy51cCA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXTtcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0ubmVpZ2hib3JzLmRvd24gPSByb29tO1xuICB9XG4gIGlmIChcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXSAmJiBcbiAgICAoR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl0ubmVpZ2hib3JzLnVwICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLmRvd25cbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMuZG93biA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dO1xuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dLm5laWdoYm9ycy51cCA9IHJvb207XG4gIH1cbiAgaWYgKFxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdICYmIFxuICAgIChHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XS5uZWlnaGJvcnMucmlnaHQgIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMubGVmdFxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy5sZWZ0ID0gR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF07XG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF0ubmVpZ2hib3JzLnJpZ2h0ID0gcm9vbTtcbiAgfVxuICBpZiAoXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdICYmIFxuICAgIChHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF0ubmVpZ2hib3JzLmxlZnQgIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMucmlnaHRcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMucmlnaHQgPSBHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF07XG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdLm5laWdoYm9ycy5sZWZ0ID0gcm9vbTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkUGF0aHMgPSByb29tID0+IHtcbiAgbGV0IHBhdGhzID0gW107XG4gIGxldCB1cCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICB1cFsxXSArPSAxO1xuICB1cCA9IHVwLnRvU3RyaW5nKCk7XG4gIGxldCBkb3duID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGRvd25bMV0gLT0gMTtcbiAgZG93biA9IGRvd24udG9TdHJpbmcoKTtcbiAgbGV0IGxlZnQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgbGVmdFswXSAtPSAxO1xuICBsZWZ0ID0gbGVmdC50b1N0cmluZygpO1xuICBsZXQgcmlnaHQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgcmlnaHRbMF0gKz0gMTtcbiAgcmlnaHQgPSByaWdodC50b1N0cmluZygpO1xuICBpZiAoIUdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXSB8fCAoR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdLm5laWdoYm9ycy5kb3duICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiVVwiKTtcbiAgfVxuICBpZiAoIUdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dIHx8IChHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXS5uZWlnaGJvcnMudXAgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJEXCIpO1xuICB9XG4gIGlmICghR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF0gfHwgKEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdLm5laWdoYm9ycy5yaWdodCAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIkxcIik7XG4gIH1cbiAgaWYgKCFHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF0gfHwgKEdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XS5uZWlnaGJvcnMubGVmdCAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIlJcIik7XG4gIH1cbiAgcmV0dXJuIHBhdGhzLnNvcnQoKS5qb2luKFwiXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJsb2NrZWRQYXRocyA9IChyb29tLCBwYXRocykgPT4ge1xuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiVVwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLnVwID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIkRcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5kb3duID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIkxcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5sZWZ0ID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIlJcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5yaWdodCA9IFwiWFwiO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZE51bUNvaW5zID0gKCkgPT4ge1xuICBsZXQgd2VpZ2h0ZWROdW1Db2lucyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5DT0lOX1dFSUdIVFNbM107IGkrKykgeyB3ZWlnaHRlZE51bUNvaW5zLnB1c2goMykgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5DT0lOX1dFSUdIVFNbMl07IGkrKykgeyB3ZWlnaHRlZE51bUNvaW5zLnB1c2goMikgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5DT0lOX1dFSUdIVFNbMV07IGkrKykgeyB3ZWlnaHRlZE51bUNvaW5zLnB1c2goMSkgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5DT0lOX1dFSUdIVFNbMF07IGkrKykgeyB3ZWlnaHRlZE51bUNvaW5zLnB1c2goMCkgfVxuICBjb25zdCByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd2VpZ2h0ZWROdW1Db2lucy5sZW5ndGgpO1xuICBzaHVmZmxlKHdlaWdodGVkTnVtQ29pbnMpO1xuICByZXR1cm4gd2VpZ2h0ZWROdW1Db2luc1tyYW5kSWR4XTtcbn07XG5cbmV4cG9ydCBjb25zdCByYW5kQ29pblNvdW5kID0gKCkgPT4ge1xuICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY29pbiR7aX1gKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaHVmZmxlID0gYXJyID0+IHtcbiAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICBbYXJyW2ldLCBhcnJbal1dID0gW2FycltqXSwgYXJyW2ldXTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZWRNb3ZlbWVudCA9IChteXNlbGYsIGVudGl0eSwgY2hhc2luZ1BsYXllcikgPT4geyBcbiAgY29uc3QgbXggPSBteXNlbGYuY2VudGVyWzBdO1xuICBjb25zdCBteSA9IG15c2VsZi5jZW50ZXJbMV07XG4gIGNvbnN0IGV4ID0gZW50aXR5LmNlbnRlclswXTtcbiAgY29uc3QgZXkgPSBlbnRpdHkuY2VudGVyWzFdO1xuICBsZXQgZHggPSBteCAtIGV4O1xuICBsZXQgZHkgPSBteSAtIGV5O1xuICBcbiAgaWYgKCFjaGFzaW5nUGxheWVyKSB7XG4gICAgY29uc3QgcmFuZEFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJO1xuICAgIGR4ID0gTWF0aC5jb3MocmFuZEFuZ2xlKSAqIG15c2VsZi5zcGVlZDtcbiAgICBkeSA9IE1hdGguc2luKHJhbmRBbmdsZSkgKiBteXNlbGYuc3BlZWQ7XG4gIH1cbiAgXG4gIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuKGR5L2R4KTtcbiAgY29uc3QgbnkgPSBNYXRoLnNpbihhbmdsZSkgKiBteXNlbGYuc3BlZWQ7XG4gIGNvbnN0IG54ID0gTWF0aC5jb3MoYW5nbGUpICogbXlzZWxmLnNwZWVkO1xuXG4gIHJldHVybiB7XG4gICAgZHgsXG4gICAgZHksXG4gICAgbngsXG4gICAgbnksXG4gICAgdXA6IChkeSA+IDApICYmIChNYXRoLmFicyhkeSkgPiBNYXRoLmFicyhkeCkpLFxuICAgIGRvd246IChkeSA8IDApICYmIChNYXRoLmFicyhkeSkgPiBNYXRoLmFicyhkeCkpLFxuICAgIGxlZnQ6IChkeCA+IDApICYmIChNYXRoLmFicyhkeCkgPiBNYXRoLmFicyhkeSkpLFxuICAgIHJpZ2h0OiAoZHggPCAwKSAmJiAoTWF0aC5hYnMoZHgpID4gTWF0aC5hYnMoZHkpKSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXN0YW5jZVRvUGxheWVyID0gKG15c2VsZiwgcGxheWVyKSA9PiB7XG4gIGNvbnN0IG14ID0gbXlzZWxmLmNlbnRlclswXTtcbiAgY29uc3QgbXkgPSBteXNlbGYuY2VudGVyWzFdO1xuICBjb25zdCBweCA9IHBsYXllci5jZW50ZXJbMF07XG4gIGNvbnN0IHB5ID0gcGxheWVyLmNlbnRlclsxXTtcbiAgbGV0IGR4ID0gcHggLSBteDtcbiAgbGV0IGR5ID0gcHkgLSBteTtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhkeCwgMikgKyBNYXRoLnBvdyhkeSwgMikpO1xufTsiLCJleHBvcnQgY29uc3QgV0lEVEggPSA3MjA7XG5leHBvcnQgY29uc3QgSEVJR0hUID0gNzIwO1xuZXhwb3J0IGNvbnN0IFNQUklURV9ESU1TID0gWzQ4LDQ4XTtcbmV4cG9ydCBjb25zdCBGUFMgPSAxMDAwLzYwO1xuZXhwb3J0IGNvbnN0IEtFWVMgPSB7XG4gIDg3OiBmYWxzZSwgLy8gV1xuICA2NTogZmFsc2UsIC8vIEFcbiAgODM6IGZhbHNlLCAvLyBTXG4gIDY4OiBmYWxzZSwgLy8gRFxuICAxNjogZmFsc2UsIC8vIEwtU2hpZnRcbn07XG5leHBvcnQgY29uc3QgRk9OVCA9IHt9O1xuXG5leHBvcnQgY29uc3QgU0VTU0lPTiA9IHt9O1xuZXhwb3J0IGNvbnN0IFNQUklURVMgPSB7fTtcbmV4cG9ydCBjb25zdCBCR19JTUdTID0ge307XG5cbmV4cG9ydCBjb25zdCBDT0lOX1dFSUdIVFMgPSB7XG4gIDM6IDIsXG4gIDI6IDgsXG4gIDE6IDMwLFxuICAwOiA1MCwgXG59O1xuXG5leHBvcnQgY29uc3QgQUxMX1BBVEhTID0gW1xuICBcIkRMUlVcIixcbiAgXCJETFJcIixcbiAgXCJETFVcIixcbiAgXCJMUlVcIixcbiAgXCJEUlVcIixcbiAgXCJETFwiLFxuICBcIkRSXCIsXG4gIFwiRFVcIixcbiAgXCJMUlwiLFxuICBcIkxVXCIsXG4gIFwiUlVcIixcbiAgXCJEXCIsXG4gIFwiTFwiLFxuICBcIlJcIixcbiAgXCJVXCIsXG5dO1xuXG5leHBvcnQgY29uc3QgV0VJR0hUUyA9IHtcbiAgNDoge1xuICAgIDQ6IDU1LFxuICAgIDM6IDQ1LFxuICAgIDI6IDksXG4gICAgMTogMSxcbiAgfSxcbiAgMzoge1xuICAgIDM6IDgwLFxuICAgIDI6IDIwLFxuICAgIDE6IDMsXG4gIH0sXG4gIDI6IHtcbiAgICAyOiA5MCxcbiAgICAxOiAxMCxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBHQU1FX09QVElPTlMgPSB7fTtcbmV4cG9ydCBjb25zdCBSRVFVRVNUID0ge307IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChLRVlTKSA9PiB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xuICAgIFxuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcIndcIiAmJiAhS0VZU1tcIndcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImFcIiAmJiAhS0VZU1tcImFcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcInNcIiAmJiAhS0VZU1tcInNcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImRcIiAmJiAhS0VZU1tcImRcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGlmIChlLmtleSA9PT0gXCJTaGlmdFwiICYmICFLRVlTW1wiU2hpZnRcIl0pIEtFWVNbZS5rZXldID0gdHJ1ZTtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiAhS0VZU1tcIkVudGVyXCJdKSBLRVlTW2Uua2V5XSA9IHRydWU7XG5cbiAgfSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJ3XCIgJiYgS0VZU1tcIndcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJhXCIgJiYgS0VZU1tcImFcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJzXCIgJiYgS0VZU1tcInNcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJkXCIgJiYgS0VZU1tcImRcIl0pIEtFWVNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIiAmJiBLRVlTW1wiU2hpZnRcIl0pIEtFWVNbZS5rZXldID0gZmFsc2U7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgJiYgS0VZU1tcIkVudGVyXCJdKSBLRVlTW2Uua2V5XSA9IGZhbHNlO1xuICB9KTtcblxuICBjb25zdCBob3dUbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpO1xuICBcbiAgaG93VG8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tcG9pbnRlclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvLXNvdW5kXCIpLnBsYXkoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10b1wiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG93LXRvID4gdWxcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIGhvd1RvLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tcG9pbnRlclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG93LXRvID4gdWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKTtcbiAgcmVzdGFydC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnQtc291bmRcIikucGxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1wb2ludGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1wb2ludGVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbmV3R2FtZSgpO1xuICB9KTtcblxufVxuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3RoaXMud2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt0aGlzLndpZHRoLHkrdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K3RoaXMuaGVpZ2h0XTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiN0cmFuc3BhcmVudFwiO1xuICAgIGN0eC5maWxsUmVjdCguLi50aGlzLnBvcywgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBpbnN0YWxsTGlzdGVuZXJzIGZyb20gXCIuL3NjcmlwdHMvdXRpbHMvaW5zdGFsbF9saXN0ZW5lcnNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgR2FtZVN0YXJ0IGZyb20gXCIuL3NjcmlwdHMvZ2FtZV9zdGFydFwiO1xuXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKTtcbiAgY2FudmFzLndpZHRoID0gR2xvYmFsLldJRFRIO1xuICBjYW52YXMuaGVpZ2h0ID0gR2xvYmFsLkhFSUdIVDtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBpbnN0YWxsTGlzdGVuZXJzKEdsb2JhbC5LRVlTKTtcblxuICAvLyBsZXQgZm9udCA9IG5ldyBGb250RmFjZShcIlByZXNzIFN0YXJ0IDJQXCIsICd1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QcmVzcytTdGFydCsyUCZkaXNwbGF5PXN3YXApJyk7XG4gIC8vIGZvbnQubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAvLyAgIEdsb2JhbC5GT05UID0gZm9udDtcbiAgLy8gfSk7XG5cbiAgLy8gY29uc3QgZm9udCA9IG5ldyBGb250RmFjZShcIlByZXNzIFN0YXJ0IDJQXCIsICd1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1QcmVzcytTdGFydCsyUCZkaXNwbGF5PXN3YXApJyk7XG4gIC8vIGZvbnQubG9hZCgpLnRoZW4oR2xvYmFsLkZPTlRbXCJmb250XCJdID0gZm9udCk7XG5cbiAgbGV0IGNvaW5TcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbiAgY29pblNwcml0ZS5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL2NvaW4vY29pbi5wbmdcIjtcbiAgY29pblNwcml0ZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgR2xvYmFsLlNQUklURVMuY29pbiA9IGNvaW5TcHJpdGU7XG4gIH07XG5cbiAgbGV0IG1vbnN0ZXJzU3ByaXRlcyA9IG5ldyBJbWFnZSgpO1xuICBtb25zdGVyc1Nwcml0ZXMuc3JjID0gXCIuL2Rpc3QvYXNzZXRzL2ltYWdlcy9lbmVtaWVzL21vbnN0ZXJzLnBuZ1wiO1xuICBtb25zdGVyc1Nwcml0ZXMub25sb2FkID0gKCkgPT4ge1xuICAgIEdsb2JhbC5TUFJJVEVTLm1vbnN0ZXJzID0gbW9uc3RlcnNTcHJpdGVzO1xuICB9O1xuICBcbiAgZm9yIChsZXQgcGF0aCBvZiBHbG9iYWwuQUxMX1BBVEhTKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCJcIikuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGJhY2tncm91bmQuc3JjID0gYC4vZGlzdC9hc3NldHMvaW1hZ2VzL21hcF9pbWdzLyR7cGF0aC5sZW5ndGh9LyR7cGF0aH0vbWFwJHtpfS5wbmdgO1xuICAgICAgXG4gICAgICBiYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgR2xvYmFsLkJHX0lNR1NbYCR7cGF0aC5sZW5ndGh9JHtwYXRofSR7aX1gXSA9IGJhY2tncm91bmQ7XG4gICAgICAgIC8vIEdsb2JhbC5HQl9JTUdTW1wiNERMUlUwXCJdID0gYmFja2dyb3VuZFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBsZXQgcGxheWVyU3ByaXRlID0gbmV3IEltYWdlKCk7XG4gIHBsYXllclNwcml0ZS5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL3JvZ3VlL3JvZ3VlX3dhbGsucG5nXCI7XG4gIFxuICBwbGF5ZXJTcHJpdGUub25sb2FkID0gKCkgPT4ge1xuICAgIGxldCBnYW1lU3RhcnQgPSBuZXcgR2FtZVN0YXJ0KGN0eCwgcGxheWVyU3ByaXRlKTtcbiAgICBHbG9iYWwuR0FNRV9PUFRJT05TW1wiY3R4XCJdID0gY3R4O1xuICAgIEdsb2JhbC5HQU1FX09QVElPTlNbXCJwbGF5ZXJTcHJpdGVcIl0gPSBwbGF5ZXJTcHJpdGU7XG4gICAgZ2FtZVN0YXJ0LnByb21wdCgpO1xuICAgIFxuICB9XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=