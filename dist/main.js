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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9jb2luLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2NvbGxpc2lvbl9ib3guanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW50aXR5LmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZ2FtZV9zdGFydC5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvcm9vbS5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9mdW5jX3V0aWxzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2luc3RhbGxfbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3dhbGwuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwb3MiLCJ3aWR0aCIsImhlaWdodCIsInNwcml0ZVBhbGV0dGUiLCJjb2xCb3hXaWR0aCIsImNvbEJveEhlaWdodCIsImRyYXdPcHRpb25zIiwiaW1hZ2UiLCJwYWxYIiwicGFsWSIsIl9zV2lkdGgiLCJfc0hlaWdodCIsIngiLCJ5IiwiX2RXaWR0aCIsIl9kSGVpZ2h0IiwiY29sQm94IiwiQ29sQm94IiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiY29sbGlzaW9ucyIsImN4IiwiY3kiLCJ1cGRhdGVTaWRlcyIsInNpZGUiLCJvdGhlck9iamVjdCIsIm90aGVyU2lkZSIsImNvbGxpZGVkV2l0aFNpZGUiLCJjdHgiLCJkcmF3SW1hZ2UiLCJPYmplY3QiLCJ2YWx1ZXMiLCJjZW50ZXJPbkVudGl0eSIsImRyYXciLCJDb2luIiwiZnJhbWVJbnRlcnZhbCIsImZyYW1lQ291bnQiLCJjb2xsaWRlZE9uU2lkZSIsIkdsb2JhbCIsInJhbmRDb2luU291bmQiLCJwbGF5IiwiaSIsImMiLCJ3IiwiZW50aXR5Iiwib3JpZ2luUG9zIiwidG9wTGVmdCIsInRvcFJpZ2h0IiwiYm90dG9tUmlnaHQiLCJib3R0b21MZWZ0IiwiY2VudGVyIiwic2lkZXMiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsInN0cm9rZVJlY3QiLCJleCIsImV5IiwiZXciLCJlaCIsInR3IiwidGgiLCJjb2xCb3hIb29rIiwiRW5lbXkiLCJ0eXBlIiwiZGV0ZWN0RGlzdCIsInNwZWVkIiwic3BlZWRNb2RpZmllciIsInBhY2UiLCJjaGFzaW5nUGxheWVyIiwiaWRsZUNvdW50IiwiaWRsZU1heCIsIm1vdmVtZW50IiwidXAiLCJkb3duIiwicGFsWE9mZnNldCIsInN0cmlkZSIsInN0ZXBDb3VudCIsImRpcmVjdGlvbiIsIm14IiwibXkiLCJkeCIsImR5IiwiZGlzdCIsIk1hdGgiLCJzcXJ0IiwicG93IiwicmFuZEFuZ2xlIiwicmFuZG9tIiwiUEkiLCJjb3MiLCJzaW4iLCJhbmdsZSIsImF0YW4iLCJueSIsIm54IiwiYWJzIiwic3ByaXRlRGlyIiwiZmxvb3IiLCJ3YWxscyIsInBsYXllciIsImRpc3RUb1BsYXllciIsIndhbGxDaGVjayIsImhwIiwiZGFtYWdlIiwiaGl0Iiwid2FsbCIsIm5ld1ZlY3RvcnMiLCJub3JtYWxpemVkVmVjdG9yUG9zIiwic3RyaWRlUGFsZXR0ZVBvcyIsImhpdFBsYXllciIsIkdhbWUiLCJwbGF5ZXJTcHJpdGUiLCJmcHNJbnRlcnZhbCIsInRvUGxheWVyIiwic3RhcnRpbmdQb3MiLCJQbGF5ZXIiLCJzdGFydGluZ1Jvb20iLCJSb29tIiwicm9vbSIsImdhbWVTdGVwIiwiYmluZCIsInN0b3AiLCJ3aW4iLCJsb3NlIiwiZ2FtZU92ZXIiLCJyZXF1ZXN0U3RvcCIsInJlcXVlc3RJZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm5vdyIsIkRhdGUiLCJlbGFwc2VkIiwidGhlbiIsImNsZWFyUmVjdCIsIm1vdmUiLCJlbmVtaWVzIiwiZm9yRWFjaCIsImVuZW15IiwiYW5pbWF0ZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZm9udEZhbWlseSIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZm9udCIsImZpbGxUZXh0IiwiR2FtZVN0YXJ0IiwidGhldGEiLCJzdGVwIiwicmVkIiwiZ3JlZW4iLCJibHVlIiwiY29sb3IiLCJyZXN0YXJ0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZUF0dHJpYnV0ZSIsIm5ld0dhbWUiLCJub3JtYWxpemVkU3BlZWQiLCJwYXJzZUZsb2F0Iiwic3RhbWluYSIsImludnVsbmVyYWJsZSIsImRpciIsInNoaWZ0IiwiaW52dWx2ZXJhYmxlIiwiZXhpdERpciIsIm5ld1Jvb21Qb3MiLCJyb29tQ2hhbmdlIiwiaW52dWxDaGVjayIsIm5laWdoYm9yIiwiZ2VuZXJhdGVDb2lucyIsInJhbmRJZHgiLCJuZWlnaGJvcnMiLCJ1bmRlZmluZWQiLCJlbnRyeURpciIsImtleXMiLCJwcmV2Um9vbSIsIm5vZGVQb3MiLCJhZGRWYWxpZE5laWdoYm9ycyIsIm51bVBhdGhzIiwicmFuZFBhdGhzIiwibmV3UGF0aHMiLCJwYXRocyIsImJ1aWxkUGF0aHMiLCJwYXRoc0FyciIsInNwbGl0IiwiZmlsdGVyIiwicGF0aCIsInJhbmROdW1QYXRocyIsImxlbmd0aCIsImJhY2tncm91bmQiLCJhc3NpZ25CbG9ja2VkUGF0aHMiLCJidWlsZFJvb21XYWxscyIsInB1c2giLCJzaHVmZmxlIiwicG9wIiwic29ydCIsImpvaW4iLCJnZW5lcmF0ZUVuZW1pZXMiLCJudW1FbmVtaWVzIiwibnVtQ29pbnMiLCJyYW5kTnVtQ29pbnMiLCJjb2lucyIsImNvaW4iLCJjb2xsZWN0IiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiV2FsbCIsInRoaXNTaWRlIiwiY29sbGlkZWQiLCJ1cHBlckRpZmYiLCJsb3dlckRpZmYiLCJ1cHBlckJvdW5kcyIsImxvd2VyQm91bmRzIiwidGhpc1lWYWwiLCJ0aGlzWE1pbiIsInRoaXNYTWF4Iiwib3RoZXJZVmFsIiwib3RoZXJYTWluIiwib3RoZXJYTWF4IiwidGhpc1hWYWwiLCJ0aGlzWU1pbiIsInRoaXNZTWF4Iiwib3RoZXJYVmFsIiwib3RoZXJZTWluIiwib3RoZXJZTWF4IiwiY3VyclJvb20iLCJuZXh0Tm9kZVBvcyIsIm1heCIsInRvU3RyaW5nIiwiaW5jbHVkZXMiLCJ3ZWlnaHRlZE51bUNvaW5zIiwiYXJyIiwiaiIsIm5vcm1hbGl6ZWRNb3ZlbWVudCIsIm15c2VsZiIsImRpc3RhbmNlVG9QbGF5ZXIiLCJweCIsInB5IiwiV0lEVEgiLCJIRUlHSFQiLCJTUFJJVEVfRElNUyIsIkZQUyIsIktFWVMiLCJGT05UIiwiU0VTU0lPTiIsIlNQUklURVMiLCJCR19JTUdTIiwiQ09JTl9XRUlHSFRTIiwiQUxMX1BBVEhTIiwiV0VJR0hUUyIsIkdBTUVfT1BUSU9OUyIsIlJFUVVFU1QiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleSIsInRvTG93ZXJDYXNlIiwiaG93VG8iLCJjbGFzc0xpc3QiLCJhZGQiLCJxdWVyeVNlbGVjdG9yIiwicmVtb3ZlIiwicHJldmVudERlZmF1bHQiLCJjYW52YXMiLCJnZXRDb250ZXh0IiwiaW5zdGFsbExpc3RlbmVycyIsImNvaW5TcHJpdGUiLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsIm1vbnN0ZXJzU3ByaXRlcyIsImdhbWVTdGFydCIsInByb21wdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtDQUVBOztJQUVNQSxNO0FBQ0osa0JBQVlDLEdBQVosRUFBZ0JDLEtBQWhCLEVBQXNCQyxNQUF0QixFQUE2QkMsYUFBN0IsRUFBNEM7QUFBQTs7QUFDMUMsU0FBS0gsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsUUFBTUUsV0FBVyxHQUFHSCxLQUFwQjtBQUNBLFFBQU1JLFlBQVksR0FBR0gsTUFBckI7QUFFQSxTQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtHLFdBQUwsR0FBbUI7QUFDakJDLFdBQUssRUFBRUosYUFEVTtBQUVqQkssVUFBSSxFQUFFLENBRlc7QUFHakJDLFVBQUksRUFBRSxDQUhXO0FBSWpCQyxhQUFPLEVBQUVULEtBSlE7QUFLakJVLGNBQVEsRUFBRVQsTUFMTztBQU1qQlUsT0FBQyxFQUFFWixHQUFHLENBQUMsQ0FBRCxDQU5XO0FBT2pCYSxPQUFDLEVBQUViLEdBQUcsQ0FBQyxDQUFELENBUFc7QUFRakJjLGFBQU8sRUFBRWIsS0FSUTtBQVNqQmMsY0FBUSxFQUFFYjtBQVRPLEtBQW5CO0FBV0EsU0FBS2MsTUFBTCxH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WUFBTW1KLFVBQVUsR0FBRyxJQUFJK0UsS0FBSixFQUFuQjtBQUNBL0Usa0JBQVUsQ0FBQ2dGLEdBQVgsMkNBQWtEbkYsSUFBSSxDQUFDRSxNQUF2RCxjQUFpRUYsSUFBakUsaUJBQTRFaEosQ0FBNUU7O0FBRUFtSixrQkFBVSxDQUFDaUYsTUFBWCxHQUFvQixZQUFNO0FBQ3hCdk8seUVBQUEsV0FBa0JtSixJQUFJLENBQUNFLE1BQXZCLFNBQWdDRixJQUFoQyxTQUF1Q2hKLENBQXZDLEtBQThDbUosVUFBOUMsQ0FEd0IsQ0FFeEI7QUFDRCxTQUhEO0FBbkM4Qzs7QUErQmhELFdBQUssSUFBSW5KLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFBQSxlQUFuQkEsQ0FBbUI7QUFRM0I7QUF2QytDOztBQTZCbEQsd0RBQW1DO0FBQUE7QUFXbEM7QUF4Q2lEO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBMENsRCxNQUFJc0UsWUFBWSxHQUFHLElBQUk0SixLQUFKLEVBQW5CO0FBQ0E1SixjQUFZLENBQUM2SixHQUFiLEdBQW1CLDJDQUFuQjs7QUFFQTdKLGNBQVksQ0FBQzhKLE1BQWIsR0FBc0IsWUFBTTtBQUMxQixRQUFJRSxTQUFTLEdBQUcsSUFBSS9ILHdEQUFKLENBQWNwSCxHQUFkLEVBQW1CbUYsWUFBbkIsQ0FBaEI7QUFDQXpFLDRFQUFBLEdBQTZCVixHQUE3QjtBQUNBVSxxRkFBQSxHQUFzQ3lFLFlBQXRDO0FBQ0FnSyxhQUFTLENBQUNDLE1BQVY7QUFFRCxHQU5EO0FBUUQsQ0FyREQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbEJveCBmcm9tIFwiLi9jb2xsaXNpb25fYm94XCI7XG5pbXBvcnQgeyBjb2xsaWRlZFdpdGhTaWRlLCByYW5kQ29pblNvdW5kIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG4vLyBpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiO1xuXG5jbGFzcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29sQm94V2lkdGggPSB3aWR0aDtcbiAgICBjb25zdCBjb2xCb3hIZWlnaHQgPSBoZWlnaHQ7XG4gICAgXG4gICAgdGhpcy5zcHJpdGVQYWxldHRlID0gc3ByaXRlUGFsZXR0ZTtcbiAgICB0aGlzLmRyYXdPcHRpb25zID0ge1xuICAgICAgaW1hZ2U6IHNwcml0ZVBhbGV0dGUsXG4gICAgICBwYWxYOiAwLFxuICAgICAgcGFsWTogMCxcbiAgICAgIF9zV2lkdGg6IHdpZHRoLFxuICAgICAgX3NIZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHBvc1swXSxcbiAgICAgIHk6IHBvc1sxXSxcbiAgICAgIF9kV2lkdGg6IHdpZHRoLFxuICAgICAgX2RIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIHRoaXMuY29sQm94ID0gbmV3IENvbEJveCh0aGlzLGNvbEJveFdpZHRoLGNvbEJveEhlaWdodCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jb2xsaXNpb25zID0ge1xuICAgICAgdG9wOiBmYWxzZSxcbiAgICAgIGJvdHRvbTogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuICAgIFxuICB9XG5cbiAgY29sQm94SG9vaygpIHsgLy8gdGhpcyB3aWxsIGNlbnRlciB0aGUgY29sQm94IG9uIHRoZSBib3R0b21cbiAgICBsZXQgW3gseV0gPSBbdGhpcy5wb3NbMF0sdGhpcy5wb3NbMV1dO1xuICAgIGxldCBbY3gsY3ldID0gW1xuICAgICAgeCsoKHRoaXMud2lkdGggLSB0aGlzLmNvbEJveC53aWR0aCkvMiksXG4gICAgICB5Kyh0aGlzLmhlaWdodCAtIHRoaXMuY29sQm94LmhlaWdodCksXG4gICAgXTtcbiAgICByZXR1cm4gW2N4LGN5XTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIHRoaXMuY29sQm94LnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gIH1cblxuICBjb2xsaWRlZE9uU2lkZShzaWRlLCBvdGhlck9iamVjdCkge1xuICAgIGxldCBvdGhlclNpZGU7XG4gICAgc3dpdGNoKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJib3R0b21cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwidG9wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJyaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImxlZnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvdGhlclNpZGUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb25zW3NpZGVdID0gY29sbGlkZWRXaXRoU2lkZShzaWRlLCB0aGlzW3NpZGVdLCBvdGhlck9iamVjdFtvdGhlclNpZGVdKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zW3NpZGVdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKC4uLk9iamVjdC52YWx1ZXModGhpcy5kcmF3T3B0aW9ucykpO1xuICAgIHRoaXMuY29sQm94LmNlbnRlck9uRW50aXR5KCk7XG4gICAgdGhpcy5jb2xCb3guZHJhdyhjdHgpO1xuICB9XG59XG5cbmNsYXNzIENvaW4gZXh0ZW5kcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3MsIHdpZHRoLCBoZWlnaHQsIHNwcml0ZVBhbGV0dGUpIHtcbiAgICBzdXBlcihwb3MsIHdpZHRoLCBoZWlnaHQsIHNwcml0ZVBhbGV0dGUpO1xuICAgIHRoaXMuZnJhbWVJbnRlcnZhbCA9IDEyO1xuICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XG4gICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gMDtcbiAgfVxuXG4gIGNvbGxlY3QoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcInRvcFwiLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXllcikgfHxcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJib3R0b21cIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpIHx8XG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwibGVmdFwiLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXllcikgfHxcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJyaWdodFwiLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXllcilcbiAgICApIHtcbiAgICAgIHJhbmRDb2luU291bmQoKS5wbGF5KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICBjb25zdCBpID0gdGhpcy5mcmFtZUludGVydmFsO1xuICAgIGNvbnN0IGMgPSB0aGlzLmZyYW1lQ291bnQ7XG4gICAgY29uc3QgdyA9IHRoaXMud2lkdGg7XG4gICAgaWYgKGMgPCBpKSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMDtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqMikge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDE7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjMpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAyO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo0KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMztcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNSkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDQ7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjYpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA1O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo3KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNjtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqOCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDc7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDA7XG4gICAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2luOyIsIlxuXG5jbGFzcyBDb2xCb3gge1xuICBjb25zdHJ1Y3RvcihlbnRpdHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVudGl0eSA9IGVudGl0eTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5wb3MgPSB0aGlzLm9yaWdpblBvcygpO1xuXG4gICAgY29uc3QgW3gseV0gPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BMZWZ0ID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wUmlnaHQgPSBbeCt3aWR0aCx5XTtcbiAgICBjb25zdCBib3R0b21SaWdodCA9IFt4K3dpZHRoLHkraGVpZ2h0XTtcbiAgICBjb25zdCBib3R0b21MZWZ0ID0gW3gseStoZWlnaHRdO1xuICAgIFxuICAgIHRoaXMuY2VudGVyID0gW3grKHdpZHRoLzIpLHkrKGhlaWdodC8yKV07XG4gICAgdGhpcy50b3AgPSBbW3RvcExlZnRbMF0sdG9wUmlnaHRbMF1dLCB0b3BMZWZ0WzFdXTtcbiAgICB0aGlzLmJvdHRvbSA9IFtbYm90dG9tTGVmdFswXSxib3R0b21SaWdodFswXV0sIGJvdHRvbUxlZnRbMV1dO1xuICAgIHRoaXMucmlnaHQgPSBbdG9wUmlnaHRbMF0sIFt0b3BSaWdodFsxXSxib3R0b21SaWdodFsxXV1dO1xuICAgIHRoaXMubGVmdCA9IFt0b3BMZWZ0WzBdLCBbdG9wTGVmdFsxXSxib3R0b21MZWZ0WzFdXV07XG4gICAgdGhpcy5zaWRlcyA9IFt0aGlzLnRvcCwgdGhpcy5ib3R0b20sIHRoaXMucmlnaHQsIHRoaXMubGVmdF07XG4gICAgXG4gIH1cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgY3R4LnN0cm9rZVJlY3QoXG4gICAgICB0aGlzLnBvc1swXSxcbiAgICAgIHRoaXMucG9zWzFdLFxuICAgICAgdGhpcy53aWR0aCxcbiAgICAgIHRoaXMuaGVpZ2h0LFxuICAgIClcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grdGhpcy53aWR0aCx5XTtcbiAgICBjb25zdCBib3R0b21SaWdodCA9IFt4K3RoaXMud2lkdGgseSt0aGlzLmhlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkrdGhpcy5oZWlnaHRdO1xuICAgIHRoaXMuY2VudGVyID0gW3grKHRoaXMud2lkdGgvMikseSsodGhpcy5oZWlnaHQvMildO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICB9XG5cbiAgb3JpZ2luUG9zKCkge1xuICAgIGNvbnN0IFtleCxleV0gPSBbdGhpcy5lbnRpdHkucG9zWzBdLCB0aGlzLmVudGl0eS5wb3NbMV1dO1xuICAgIGNvbnN0IFtldyxlaF0gPSBbdGhpcy5lbnRpdHkud2lkdGgsIHRoaXMuZW50aXR5LmhlaWdodF07XG4gICAgY29uc3QgW3R3LHRoXSA9IFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07XG4gICAgY29uc3QgeCA9IGV4ICsgKChldy10dykvMik7XG4gICAgY29uc3QgeSA9IGV5ICsgZWggLSB0aDtcbiAgICByZXR1cm4gW3gseV07XG4gIH1cblxuICBjZW50ZXJPbkVudGl0eSgpIHtcbiAgICB0aGlzLnBvcyA9IHRoaXMuZW50aXR5LmNvbEJveEhvb2soKTtcbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xCb3g7IiwiLy8gaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcbmltcG9ydCBDb2xCb3ggZnJvbSAnLi9jb2xsaXNpb25fYm94JztcbmltcG9ydCB7XG4gIG5vcm1hbGl6ZWRNb3ZlbWVudCxcbiAgY29sbGlkZWRXaXRoU2lkZSxcbn0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5cbmNsYXNzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb2xCb3hXaWR0aCA9IHdpZHRoLzI7XG4gICAgY29uc3QgY29sQm94SGVpZ2h0ID0gaGVpZ2h0LzM7XG4gICAgXG4gICAgdGhpcy5zcHJpdGVQYWxldHRlID0gc3ByaXRlUGFsZXR0ZTtcbiAgICB0aGlzLmRyYXdPcHRpb25zID0ge1xuICAgICAgaW1hZ2U6IHNwcml0ZVBhbGV0dGUsXG4gICAgICBwYWxYOiAwLFxuICAgICAgcGFsWTogMCxcbiAgICAgIF9zV2lkdGg6IHdpZHRoLFxuICAgICAgX3NIZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHBvc1swXSxcbiAgICAgIHk6IHBvc1sxXSxcbiAgICAgIF9kV2lkdGg6IHdpZHRoLFxuICAgICAgX2RIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIHRoaXMuY29sQm94ID0gbmV3IENvbEJveCh0aGlzLGNvbEJveFdpZHRoLGNvbEJveEhlaWdodCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNvbEJveC5jZW50ZXI7XG4gICAgdGhpcy5jb2xsaXNpb25zID0ge1xuICAgICAgdG9wOiBmYWxzZSxcbiAgICAgIGJvdHRvbTogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuXG4gIH1cblxuICBjb2xCb3hIb29rKCkgeyAvLyB0aGlzIHdpbGwgY2VudGVyIHRoZSBjb2xCb3ggb24gdGhlIGJvdHRvbVxuICAgIGxldCBbeCx5XSA9IFt0aGlzLnBvc1swXSx0aGlzLnBvc1sxXV07XG4gICAgbGV0IFtjeCxjeV0gPSBbXG4gICAgICB4KygodGhpcy53aWR0aCAtIHRoaXMuY29sQm94LndpZHRoKS8yKSxcbiAgICAgIHkrKHRoaXMuaGVpZ2h0IC0gdGhpcy5jb2xCb3guaGVpZ2h0KSxcbiAgICBdO1xuICAgIHJldHVybiBbY3gsY3ldO1xuICB9XG5cbiAgdXBkYXRlU2lkZXMoKSB7XG4gICAgdGhpcy5jb2xCb3gudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgICB0aGlzLmNlbnRlciA9IHRoaXMuY29sQm94LmNlbnRlcjtcbiAgfVxuXG4gIGNvbGxpZGVkT25TaWRlKHNpZGUsIG90aGVyT2JqZWN0KSB7XG4gICAgbGV0IG90aGVyU2lkZTtcbiAgICBzd2l0Y2goc2lkZSkge1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImJvdHRvbVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJ0b3BcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInJpZ2h0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwibGVmdFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG90aGVyU2lkZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNvbGxpc2lvbnNbc2lkZV0gPSBjb2xsaWRlZFdpdGhTaWRlKHNpZGUsIHRoaXNbc2lkZV0sIG90aGVyT2JqZWN0W290aGVyU2lkZV0pO1xuICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbnNbc2lkZV07XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UoLi4uT2JqZWN0LnZhbHVlcyh0aGlzLmRyYXdPcHRpb25zKSk7XG4gICAgdGhpcy5jb2xCb3guY2VudGVyT25FbnRpdHkoKTtcbiAgICB0aGlzLmNvbEJveC5kcmF3KGN0eCk7XG4gIH1cbn1cblxuY2xhc3MgRW5lbXkgZXh0ZW5kcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUsIHR5cGUsIGRldGVjdERpc3QpIHtcbiAgICBzdXBlcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpO1xuICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDAuNzU7XG4gICAgdGhpcy5wYWNlID0gMjQvdGhpcy5zcGVlZDtcbiAgICB0aGlzLmNoYXNpbmdQbGF5ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmRldGVjdERpc3QgPSBkZXRlY3REaXN0O1xuICAgIHRoaXMuaWRsZUNvdW50ID0gMDtcbiAgICB0aGlzLmlkbGVNYXggPSA2MDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMubW92ZW1lbnQgPSB7XG4gICAgICB1cDogZmFsc2UsXG4gICAgICBkb3duOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgIH07XG4gICAgbGV0IHgsIHk7XG4gICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgIHggPSA0OCAqIDM7XG4gICAgICAgIHkgPSA0OCAqIDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJhdFwiOlxuICAgICAgICB4ID0gNDggKiAwO1xuICAgICAgICB5ID0gNDggKiAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJnaG9zdFwiOlxuICAgICAgICB4ID0gNDggKiA2O1xuICAgICAgICB5ID0gNDggKiA0O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5wYWxYT2Zmc2V0ID0geDtcbiAgICB0aGlzLnN0cmlkZSA9IHtcbiAgICAgIHVwOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogKDQ4ICogMykgKyB5LFxuICAgICAgfSxcbiAgICAgIGRvd246IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiAoNDggKiAwKSArIHksXG4gICAgICB9LFxuICAgICAgbGVmdDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6ICg0OCAqIDEpICsgeSxcbiAgICAgIH0sXG4gICAgICByaWdodDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6ICg0OCAqIDIpICsgeSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHN0cmlkZVBhbGV0dGVQb3MoZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5wYWNlID0gMjQgLyAodGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcik7XG4gICAgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiAoNDggKiAxKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDIgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gKDQ4ICogMCkgKyB0aGlzLnBhbFhPZmZzZXQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSAzICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuICg0OCAqIDEpICsgdGhpcy5wYWxYT2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiAoNDggKiAyKSArIHRoaXMucGFsWE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID4gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPSAwO1xuICAgICAgcmV0dXJuICg0OCAqIDEpICsgdGhpcy5wYWxYT2Zmc2V0O1xuICAgIH1cbiAgfVxuXG4gIGRpc3RUb1BsYXllcigpIHtcbiAgICBjb25zdCBteCA9IHRoaXMuY2VudGVyWzBdO1xuICAgIGNvbnN0IG15ID0gdGhpcy5jZW50ZXJbMV07XG4gICAgY29uc3QgZXggPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuY2VudGVyWzBdO1xuICAgIGNvbnN0IGV5ID0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmNlbnRlclsxXTtcbiAgICBsZXQgZHggPSBteCAtIGV4O1xuICAgIGxldCBkeSA9IG15IC0gZXk7XG4gICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChNYXRoLnBvdyhkeCwgMikgKyBNYXRoLnBvdyhkeSwgMikpO1xuICAgIHJldHVybiBkaXN0O1xuICB9XG5cbiAgbm9ybWFsaXplZFZlY3RvclBvcygpIHtcbiAgICBjb25zdCBteCA9IHRoaXMuY2VudGVyWzBdO1xuICAgIGNvbnN0IG15ID0gdGhpcy5jZW50ZXJbMV07XG4gICAgY29uc3QgZXggPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuY2VudGVyWzBdO1xuICAgIGNvbnN0IGV5ID0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmNlbnRlclsxXTtcbiAgICBsZXQgZHggPSBteCAtIGV4O1xuICAgIGxldCBkeSA9IG15IC0gZXk7XG5cbiAgICBpZiAoIXRoaXMuY2hhc2luZ1BsYXllciAmJiAhdGhpcy5pZGxlQ291bnQpIHtcbiAgICAgIGNvbnN0IHJhbmRBbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAyICogTWF0aC5QSTtcbiAgICAgIHRoaXMuZHggPSBNYXRoLmNvcyhyYW5kQW5nbGUpICogdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIHRoaXMuZHkgPSBNYXRoLnNpbihyYW5kQW5nbGUpICogdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIHRoaXMuaWRsZUNvdW50ID0gMTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCF0aGlzLmNoYXNpbmdQbGF5ZXIgJiYgdGhpcy5pZGxlQ291bnQpIHRoaXMuaWRsZUNvdW50Kys7XG4gICAgXG4gICAgaWYgKHRoaXMuY2hhc2luZ1BsYXllcikge1xuICAgICAgdGhpcy5keCA9IGR4O1xuICAgICAgdGhpcy5keSA9IGR5O1xuICAgIH1cblxuXG4gICAgaWYodGhpcy5pZGxlQ291bnQgPj0gdGhpcy5pZGxlTWF4KSB0aGlzLmlkbGVDb3VudCA9IDA7XG5cbiAgICB0aGlzLmFuZ2xlID0gTWF0aC5hdGFuKHRoaXMuZHkvdGhpcy5keCk7XG4gICAgY29uc3QgbnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgY29uc3QgbnggPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgaWYgKHRoaXMuZHkgPiAwKSB7XG4gICAgICB0aGlzLm1vdmVtZW50W1widXBcIl0gPSB0cnVlO1xuICAgICAgdGhpcy5tb3ZlbWVudFtcImRvd25cIl0gPSBmYWxzZTtcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmR5KSA+IE1hdGguYWJzKHRoaXMuZHgpKSB0aGlzLnNwcml0ZURpciA9IFwidXBcIjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuZHkgPCAwKSB7XG4gICAgICB0aGlzLm1vdmVtZW50W1wiZG93blwiXSA9IHRydWU7XG4gICAgICB0aGlzLm1vdmVtZW50W1widXBcIl0gPSBmYWxzZTtcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLmR5KSA+IE1hdGguYWJzKHRoaXMuZHgpKSB0aGlzLnNwcml0ZURpciA9IFwiZG93blwiO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5keCA+IDApIHtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJsZWZ0XCJdID0gdHJ1ZTtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJyaWdodFwiXSA9IGZhbHNlO1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuZHgpID4gTWF0aC5hYnModGhpcy5keSkpIHRoaXMuc3ByaXRlRGlyID0gXCJsZWZ0XCI7XG4gICAgfVxuICAgIFxuICAgIGlmICh0aGlzLmR4IDwgMCkge1xuICAgICAgdGhpcy5tb3ZlbWVudFtcInJpZ2h0XCJdID0gdHJ1ZTtcbiAgICAgIHRoaXMubW92ZW1lbnRbXCJsZWZ0XCJdID0gZmFsc2U7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5keCkgPiBNYXRoLmFicyh0aGlzLmR5KSkgdGhpcy5zcHJpdGVEaXIgPSBcInJpZ2h0XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtueCxueV07XG4gIH1cblxuICBkYW1hZ2UoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkqNCkrMSk7XG4gIH1cblxuICBoaXRQbGF5ZXIod2FsbHMpIHtcblxuICAgIGNvbnN0IHBsYXllciA9IEdsb2JhbC5TRVNTSU9OLnBsYXllcjtcblxuICAgIGlmICh0aGlzLmRpc3RUb1BsYXllcigpIDwgMzIgJiYgIUdsb2JhbC5TRVNTSU9OLnBsYXllci5pbnZ1bG5lcmFibGUpIHtcbiAgICAgIHBsYXllci5wb3NbMF0gLT0gKDAuNCAqIHRoaXMuZHgpO1xuICAgICAgcGxheWVyLnBvc1sxXSAtPSAoMC40ICogdGhpcy5keSk7XG4gICAgICBwbGF5ZXIudXBkYXRlU2lkZXMoKTtcbiAgICAgIHBsYXllci53YWxsQ2hlY2sod2FsbHMpO1xuICAgICAgcGxheWVyLnVwZGF0ZVNpZGVzKCk7XG4gICAgICBwbGF5ZXIuaHAgLT0gdGhpcy5kYW1hZ2UoKTtcbiAgICAgIGlmIChwbGF5ZXIuaHAgPCAwKSBwbGF5ZXIuaHAgPSAwO1xuICAgICAgcGxheWVyLmhpdCgpO1xuICAgIH1cblxuICB9XG5cbiAgd2FsbENoZWNrKHdhbGxzKSB7XG4gICAgY29uc3Qge1xuICAgICAgdXAsXG4gICAgICBkb3duLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0XG4gICAgfSA9IHRoaXMubW92ZW1lbnQ7XG5cbiAgICBpZiAodXApIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInRvcFwiLCB3YWxsKSkgYnJlYWs7IH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMudG9wKSB7XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLnRvcCAtICh0aGlzLmhlaWdodC10aGlzLmNvbEJveC5oZWlnaHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb3duKSB7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJib3R0b21cIiwgd2FsbCkpIGJyZWFrOyB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmJvdHRvbSkge1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy5ib3R0b20gLSA0ODtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobGVmdCkge1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwibGVmdFwiLCB3YWxsKSkgYnJlYWs7IH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5sZWZ0IC0gKHRoaXMuY29sQm94LndpZHRoLzIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyaWdodCkge1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwicmlnaHRcIiwgd2FsbCkpIGJyZWFrOyB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnJpZ2h0KSB7XG4gICAgICAgIHRoaXMucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLnJpZ2h0IC0gKHRoaXMuY29sQm94LndpZHRoICsgKHRoaXMuY29sQm94LndpZHRoLzIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG5cblxuICBtb3ZlKHdhbGxzKSB7XG5cbiAgICBpZiAodGhpcy5kaXN0VG9QbGF5ZXIoKSA8IHRoaXMuZGV0ZWN0RGlzdCkge1xuICAgICAgdGhpcy5jaGFzaW5nUGxheWVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhc2luZ1BsYXllciA9IGZhbHNlO1xuICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMC43NTtcbiAgICB9XG4gICAgXG4gICAgbGV0IG5ld1ZlY3RvcnMgPSB0aGlzLm5vcm1hbGl6ZWRWZWN0b3JQb3MoKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIHVwLFxuICAgICAgZG93bixcbiAgICAgIGxlZnQsXG4gICAgICByaWdodFxuICAgIH0gPSB0aGlzLm1vdmVtZW50O1xuXG4gICAgaWYgKGxlZnQgJiYgdXApIHtcbiAgICAgIHRoaXMucG9zWzBdIC09IG5ld1ZlY3RvcnNbMF07XG4gICAgICB0aGlzLnBvc1sxXSAtPSBuZXdWZWN0b3JzWzFdO1xuICAgIH0gXG4gICAgXG4gICAgaWYgKGxlZnQgJiYgZG93bikge1xuICAgICAgdGhpcy5wb3NbMF0gLT0gbmV3VmVjdG9yc1swXTtcbiAgICAgIHRoaXMucG9zWzFdIC09IG5ld1ZlY3RvcnNbMV07XG4gICAgfVxuICAgIFxuICAgIGlmIChyaWdodCAmJiB1cCkge1xuICAgICAgdGhpcy5wb3NbMF0gKz0gbmV3VmVjdG9yc1swXTtcbiAgICAgIHRoaXMucG9zWzFdICs9IG5ld1ZlY3RvcnNbMV07XG4gICAgfSBcbiAgICBcbiAgICBpZiAocmlnaHQgJiYgZG93bikge1xuICAgICAgdGhpcy5wb3NbMF0gKz0gbmV3VmVjdG9yc1swXTtcbiAgICAgIHRoaXMucG9zWzFdICs9IG5ld1ZlY3RvcnNbMV07XG4gICAgfVxuXG4gICAgdGhpcy53YWxsQ2hlY2sod2FsbHMpO1xuXG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuXG4gICAgc3dpdGNoICh0aGlzLnNwcml0ZURpcikge1xuICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLnVwLnBhbFk7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcInVwXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5kb3duLnBhbFk7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImRvd25cIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUubGVmdC5wYWxZO1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJsZWZ0XCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5yaWdodC5wYWxZO1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJyaWdodFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSA0OCAqIDE7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIFxuICAgIHRoaXMuaGl0UGxheWVyKHdhbGxzKTtcbiAgICBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIud2FsbENoZWNrKHdhbGxzKTtcbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy5kcmF3T3B0aW9ucy54ID0gdGhpcy5wb3NbMF07XG4gICAgdGhpcy5kcmF3T3B0aW9ucy55ID0gdGhpcy5wb3NbMV07XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmVteTsiLCJpbXBvcnQgQ29sQm94IGZyb20gXCIuL2NvbGxpc2lvbl9ib3hcIjtcbmltcG9ydCB7IGNvbGxpZGVkV2l0aFNpZGUgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmNsYXNzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb2xCb3hXaWR0aCA9IHdpZHRoLzI7XG4gICAgY29uc3QgY29sQm94SGVpZ2h0ID0gaGVpZ2h0LzM7XG4gICAgXG4gICAgdGhpcy5zcHJpdGVQYWxldHRlID0gc3ByaXRlUGFsZXR0ZTtcbiAgICB0aGlzLmRyYXdPcHRpb25zID0ge1xuICAgICAgaW1hZ2U6IHNwcml0ZVBhbGV0dGUsXG4gICAgICBwYWxYOiAwLFxuICAgICAgcGFsWTogMCxcbiAgICAgIF9zV2lkdGg6IHdpZHRoLFxuICAgICAgX3NIZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHBvc1swXSxcbiAgICAgIHk6IHBvc1sxXSxcbiAgICAgIF9kV2lkdGg6IHdpZHRoLFxuICAgICAgX2RIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIHRoaXMuY29sQm94ID0gbmV3IENvbEJveCh0aGlzLGNvbEJveFdpZHRoLGNvbEJveEhlaWdodCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNvbEJveC5jZW50ZXI7XG4gICAgdGhpcy5jb2xsaXNpb25zID0ge1xuICAgICAgdG9wOiBmYWxzZSxcbiAgICAgIGJvdHRvbTogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuICAgIFxuICB9XG5cbiAgY29sQm94SG9vaygpIHsgLy8gdGhpcyB3aWxsIGNlbnRlciB0aGUgY29sQm94IG9uIHRoZSBib3R0b21cbiAgICBsZXQgW3gseV0gPSBbdGhpcy5wb3NbMF0sdGhpcy5wb3NbMV1dO1xuICAgIGxldCBbY3gsY3ldID0gW1xuICAgICAgeCsoKHRoaXMud2lkdGggLSB0aGlzLmNvbEJveC53aWR0aCkvMiksXG4gICAgICB5Kyh0aGlzLmhlaWdodCAtIHRoaXMuY29sQm94LmhlaWdodCksXG4gICAgXTtcbiAgICByZXR1cm4gW2N4LGN5XTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIHRoaXMuY29sQm94LnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNvbEJveC5jZW50ZXI7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gIH1cblxuICBjb2xsaWRlZE9uU2lkZShzaWRlLCBvdGhlck9iamVjdCkge1xuICAgIGxldCBvdGhlclNpZGU7XG4gICAgc3dpdGNoKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJib3R0b21cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwidG9wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJyaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImxlZnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvdGhlclNpZGUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb25zW3NpZGVdID0gY29sbGlkZWRXaXRoU2lkZShzaWRlLCB0aGlzW3NpZGVdLCBvdGhlck9iamVjdFtvdGhlclNpZGVdKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zW3NpZGVdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKC4uLk9iamVjdC52YWx1ZXModGhpcy5kcmF3T3B0aW9ucykpO1xuICAgIHRoaXMuY29sQm94LmNlbnRlck9uRW50aXR5KCk7XG4gICAgdGhpcy5jb2xCb3guZHJhdyhjdHgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudGl0eTsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4vcm9vbVwiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihjdHgsIHBsYXllclNwcml0ZSkge1xuICAgIHRoaXMuZnBzSW50ZXJ2YWwgPSAxMDAwLzYwO1xuICAgIHRoaXMudG9QbGF5ZXIgPSAxMDA7XG4gICAgY29uc3Qgc3RhcnRpbmdQb3MgPSBbNDgqNywgNDgqN107XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHN0YXJ0aW5nUG9zLCAuLi5HbG9iYWwuU1BSSVRFX0RJTVMsIHBsYXllclNwcml0ZSk7XG4gICAgR2xvYmFsLlNFU1NJT04ucGxheWVyID0gdGhpcy5wbGF5ZXI7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgLy8gY29uc3Qgcm9vbSA9IHsgXCJsZWZ0XCI6IG5ldyBSb29tKCkgfTsgLy8gdGVzdGluZyBuZXcgUm9vbShyb29tKVxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zID0ge307XG4gICAgdGhpcy5zdGFydGluZ1Jvb20gPSBuZXcgUm9vbSgpO1xuICAgIHRoaXMucm9vbSA9IHRoaXMuc3RhcnRpbmdSb29tO1xuICAgIHRoaXMucGxheWVyLmRyYXcoY3R4KTtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lID0gdGhpcztcbiAgICBHbG9iYWwuU0VTU0lPTi5zdG9wID0gZmFsc2U7XG4gICAgR2xvYmFsLlNFU1NJT04uY29pbkNvdW50ID0gMDtcbiAgICB0aGlzLmdhbWVTdGVwID0gdGhpcy5nYW1lU3RlcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcCA9IHRoaXMuc3RvcC5iaW5kKHRoaXMpO1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheSgpO1xuICB9XG5cbiAgZ2FtZU92ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMud2luKCkgfHwgdGhpcy5sb3NlKCk7XG4gIH1cblxuICB3aW4oKXtcbiAgICByZXR1cm4gR2xvYmFsLlNFU1NJT04uY29pbkNvdW50ID4gOTtcbiAgfVxuXG4gIGxvc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWVyLmhwIDw9IDA7XG4gIH1cblxuXG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5nYW1lT3ZlcigpKSB7XG4gICAgICB0aGlzLnJlcXVlc3RTdG9wID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnYW1lU3RlcCgpIHtcbiAgICB0aGlzLnJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVTdGVwKTtcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZWxhcHNlZCA9IG5vdyAtIHRoaXMudGhlbjtcblxuICAgIGlmIChlbGFwc2VkID4gdGhpcy5mcHNJbnRlcnZhbCkge1xuICAgICAgdGhpcy50aGVuID0gbm93IC0gKGVsYXBzZWQgJSB0aGlzLmZwc0ludGVydmFsKTtcbiAgICAgIGNvbnN0IHBsYXllciA9IEdsb2JhbC5TRVNTSU9OLnBsYXllcjtcbiAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLDAsIEdsb2JhbC5XSURUSCwgR2xvYmFsLkhFSUdIVCk7XG4gICAgICBwbGF5ZXIubW92ZSh0aGlzLnJvb20ud2FsbHMpO1xuICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLnJvb20uZW5lbWllcykuZm9yRWFjaChlbmVteSA9PiBlbmVteS5tb3ZlKHRoaXMucm9vbS53YWxscykpO1xuICAgICAgdGhpcy5yb29tLmFuaW1hdGUoKTtcbiAgICAgIHRoaXMucm9vbS5kcmF3KHRoaXMuY3R4KTtcbiAgICAgIHBsYXllci5kcmF3KHRoaXMuY3R4KTtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgaWYgKHRoaXMucmVxdWVzdFN0b3ApIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZXF1ZXN0SWQpO1xuICAgICAgICBjb25zdCBmb250RmFtaWx5ID0gXCJDb3VyaWVyIE5ld1wiO1xuICAgICAgICBpZiAodGhpcy53aW4oKSkge1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgwLDAsMCwwLjUpXCI7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwwLDcyMCw3MjApO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmFmNFwiO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgNDhweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNvbmdyYXR1bGF0aW9ucyFcIiwgNDgqMywgNDgqNCk7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGAyNHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiWW91IGxlYXZlIHdpdGggeW91ciBsaWZlLFwiLCA0OCo0LDQ4KjUpO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiYW5kIHlvdXIgcG9ja2V0cyBmdWxsIVwiLCA0OCo0LjUsNDgqNS41KTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkNsaWNrICdSZXN0YXJ0JyB1cCB0b3AgaWZcIiwgNDgqNCw0OCo3KTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcInlvdSdkIGxpa2UgdG8gcGxheSBhZ2FpblwiLCA0OCo0LjIsNDgqNy41KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sb3NlKCkpIHtcbiAgICAgICAgICBjb25zdCBmb250ID0gR2xvYmFsLkZPTlQuZm9udDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDAsMC41KVwiO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsMCw3MjAsNzIwKTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZhZjRcIjtcbiAgICAgICAgICB0aGlzLmN0eC5mb250ID0gYDQ4cHggJHtmb250RmFtaWx5fWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJHQU1FIE9WRVJcIiwgNDggKiA0Ljc1LCA0OCAqIDQpO1xuICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgMzZweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcInlvdSBsb3NlIVwiLCA0OCAqIDUuNjUsIDQ4ICogNSk7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGA5NnB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwi8J+SgFwiLCA0OCAqIDYuMjUsIDQ4ICogNyk7XG4gICAgICAgICAgdGhpcy5jdHguZm9udCA9IGAyNHB4ICR7Zm9udEZhbWlseX1gO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiQ2xpY2sgJ1Jlc3RhcnQnIHVwIHRvcCBpZlwiLCA0OCo0LDQ4KjkpO1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwieW91J2QgbGlrZSB0byBwbGF5IGFnYWluXCIsIDQ4KjQuMiw0OCo5LjUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgdGhpcy5nYW1lU3RlcCgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVTdGVwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcbmNsYXNzIEdhbWVTdGFydCB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgcGxheWVyU3ByaXRlKSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5wbGF5ZXJTcHJpdGUgPSBwbGF5ZXJTcHJpdGU7XG4gICAgdGhpcy5mcHNJbnRlcnZhbCA9IDEwMDAvNjA7XG4gICAgdGhpcy50aGV0YSA9IDA7XG4gICAgdGhpcy5zdGVwID0gdGhpcy5zdGVwLmJpbmQodGhpcyk7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIHRoaXMucmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc3RlcCk7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGVsYXBzZWQgPSBub3cgLSB0aGlzLnRoZW47XG4gICAgaWYgKGVsYXBzZWQgPiB0aGlzLmZwc0ludGVydmFsKSB7XG4gICAgICBjb25zdCBmb250RmFtaWx5ID0gXCJDb3VyaWVyIE5ld1wiO1xuICAgICAgdGhpcy50aGV0YSArPSAwLjAxO1xuICAgICAgY29uc3QgcmVkID0gTWF0aC5mbG9vcigxMjcgKiBNYXRoLnNpbigxLjEgKiB0aGlzLnRoZXRhKSArIDEpO1xuICAgICAgY29uc3QgZ3JlZW4gPSBNYXRoLmZsb29yKDEyNyAqIE1hdGguc2luKDEuMiAqIHRoaXMudGhldGEpICsgMSk7XG4gICAgICBjb25zdCBibHVlID0gTWF0aC5mbG9vcigxMjcgKiBNYXRoLnNpbigxLjUgKiB0aGlzLnRoZXRhKSArIDEpO1xuICAgICAgY29uc3QgY29sb3IgPSBgcmdiYSgke3JlZH0sJHtncmVlbn0sJHtibHVlfSwgMC43KWA7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwwLDcyMCw3MjApO1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEdsb2JhbC5CR19JTUdTW1wiNERMUlUwXCJdLCAwLCAwKTtcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwwLDcyMCw3MjApO1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjZmZmYWY0XCI7XG4gICAgICB0aGlzLmN0eC5mb250ID0gYGJvbGQgNDhweCAke2ZvbnRGYW1pbHl9YDtcbiAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUHJlc3MgRU5URVJcIiwgNDggKiA0LCA0OCAqIDQpO1xuICAgICAgdGhpcy5jdHguZm9udCA9IGBib2xkIDI0cHggJHtmb250RmFtaWx5fWA7XG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChcIi4uLnRvIGJlZ2luIGEgbmV3IGNyYXdsIVwiLCA0OCAqIDUsIDQ4ICogNC41NSk7XG5cbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLnBsYXllclNwcml0ZSwgNDgsIDAsIDQ4LCA0OCwgNDggKiA3LCA0OCAqIDcsIDQ4LCA0OCk7XG5cbiAgICAgIGlmIChHbG9iYWwuS0VZU1tcIkVudGVyXCJdKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElkKTtcbiAgICAgICAgY29uc3QgcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKTtcbiAgICAgICAgcmVzdGFydC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgbmV3R2FtZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb21wdCgpIHtcbiAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuc3RlcCgpO1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lU3RhcnQ7IiwiaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IHsgcm9vbUNoYW5nZSB9IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKSB7XG4gICAgc3VwZXIocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKTtcbiAgICB0aGlzLnNwZWVkID0gMS4yNTtcbiAgICB0aGlzLm5vcm1hbGl6ZWRTcGVlZCA9IHBhcnNlRmxvYXQodGhpcy5zcGVlZCkgLyBNYXRoLnNxcnQoMik7XG4gICAgdGhpcy5wYWNlID0gMjQvdGhpcy5zcGVlZDtcbiAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxO1xuICAgIHRoaXMuc3RhbWluYSA9IDEwMDA7XG4gICAgdGhpcy5pbnZ1bG5lcmFibGUgPSAwO1xuICAgIHRoaXMuaHAgPSAyMDtcbiAgICB0aGlzLnN0cmlkZSA9IHtcbiAgICAgIHVwOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiA2LFxuICAgICAgfSxcbiAgICAgIGRvd246IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDAsXG4gICAgICB9LFxuICAgICAgbGVmdDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogMixcbiAgICAgIH0sXG4gICAgICByaWdodDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogNCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG5ld1Jvb21Qb3MoZGlyKSB7XG4gICAgc3dpdGNoKGRpcikge1xuICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgIHRoaXMucG9zWzFdID0gNzIwLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgIHRoaXMucG9zWzFdID0gLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHRoaXMucG9zWzBdID0gNzIwLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB0aGlzLnBvc1swXSA9IC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RyaWRlUGFsZXR0ZVBvcyhkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnBhY2UgPSAyNCAvICh0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyKTtcbiAgICBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDIgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gMyAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSA0ICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID4gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPSAwO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9XG4gIH1cblxuICB3YWxsQ2hlY2sod2FsbHMpIHtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInRvcFwiLCB3YWxsKSkgYnJlYWsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy50b3ApIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMudG9wIC0gMzI7XG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImJvdHRvbVwiLCB3YWxsKSkgYnJlYWsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMuYm90dG9tIC0gNDg7XG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5sZWZ0IC0gMTI7XG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInJpZ2h0XCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnJpZ2h0KSB7XG4gICAgICAgIHRoaXMucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLnJpZ2h0IC0gMzY7XG4gICAgICB9XG5cbiAgfVxuXG4gIGludnVsQ2hlY2soKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5pbnZ1bG5lcmFibGUgLyA1KSAlIDIgPT09IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5pbnZ1bG5lcmFibGUgPSA2MDtcbiAgfVxuXG4gIG1vdmUod2FsbHMpIHtcbiAgICBjb25zdCBbXG4gICAgICB1cCxcbiAgICAgIGRvd24sXG4gICAgICBsZWZ0LFxuICAgICAgcmlnaHQsXG4gICAgICBzaGlmdFxuICAgIF0gPSBbXG4gICAgICBHbG9iYWwuS0VZU1tcIndcIl0sXG4gICAgICBHbG9iYWwuS0VZU1tcInNcIl0sXG4gICAgICBHbG9iYWwuS0VZU1tcImFcIl0sXG4gICAgICBHbG9iYWwuS0VZU1tcImRcIl0sXG4gICAgICBHbG9iYWwuS0VZU1tcIlNoaWZ0XCJdLFxuICAgIF07XG4gICAgaWYgKHNoaWZ0ICYmIHRoaXMuc3RhbWluYSA+IDApIHtcbiAgICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDEuNTtcbiAgICAgIHRoaXMuc3RhbWluYSAtPSA0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YW1pbmEgPCAwKSB0aGlzLnN0YW1pbmEgPSAwO1xuICAgIGlmICghc2hpZnQgJiYgdGhpcy5zdGFtaW5hIDwgMTAwMCkgdGhpcy5zdGFtaW5hICs9IDE7XG4gICAgaWYgKHRoaXMuaW52dWxuZXJhYmxlKSB0aGlzLmludnVsbmVyYWJsZS0tO1xuICAgIGlmICh0aGlzLmludnVsdmVyYWJsZSA8IDApIHRoaXMuaW52dWxuZXJhYmxlID0gMDtcblxuICAgIHRoaXMud2FsbENoZWNrKHdhbGxzKTtcblxuICAgIC8vIFcga2V5IG1vdmVtZW50cyBhbmQgc3ByaXRlIGRpcmVjdGlvblxuICAgIGlmICh1cCkge1xuICAgICAgaWYgKGxlZnQgfHwgcmlnaHQgJiYgIXRoaXMuY29sbGlzaW9ucy50b3ApIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gKz0gLXRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gKz0gLXRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS51cC5wYWxZO1xuICAgICAgaWYgKCFsZWZ0ICYmICFyaWdodCkge1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJ1cFwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTIGtleSBtb3ZlbWVudHMgYW5kIHNwcml0ZSBkaXJlY3Rpb25cbiAgICBpZiAoZG93bikge1xuICAgICAgaWYgKGxlZnQgfHwgcmlnaHQpIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gKz0gdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc1sxXSArPSB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUuZG93bi5wYWxZO1xuICAgICAgaWYgKCFsZWZ0ICYmICFyaWdodCkge1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJkb3duXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEEga2V5IG1vdmVtZW50XG4gICAgaWYgKGxlZnQpIHtcbiAgICAgIGlmICh1cCB8fCBkb3duICYmICF0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICB0aGlzLnBvc1swXSArPSAtdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc1swXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmxlZnQucGFsWTtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gRCBrZXkgbW92ZW1lbnRcbiAgICBpZiAocmlnaHQpIHtcbiAgICAgIGlmICh1cCB8fCBkb3duKSB7XG4gICAgICAgIHRoaXMucG9zWzBdICs9IHRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3NbMF0gKz0gdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLnJpZ2h0LnBhbFk7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJyaWdodFwiKTtcbiAgICB9XG5cbiAgICAvLyBpZiBub25lIG9mIHRoZSBrZXlzIGFyZSBiZWluZyBwcmVzc2VkLCBnbyB0byBkZWZhdWx0IHN0YW5jZVxuICAgIGlmICghdXAgJiYgIWRvd24gJiYgIXJpZ2h0ICYmICFsZWZ0KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSA0OCAqIDE7XG4gICAgfVxuXG4gICAgY29uc3QgW3gseV0gPSB0aGlzLnBvcztcbiAgICBsZXQgZXhpdERpcjtcbiAgICBpZiAoeCA8IC0yNCkge1xuICAgICAgZXhpdERpciA9IFwibGVmdFwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH0gZWxzZSBpZiAoeCA+IDcyMC0yNCkge1xuICAgICAgZXhpdERpciA9IFwicmlnaHRcIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9IGVsc2UgaWYgKHkgPCAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcInVwXCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfSBlbHNlIGlmICh5ID4gNzIwLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJkb3duXCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmludnVsQ2hlY2soKSkge1xuICAgICAgZGVidWdnZXJcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IDQ4ICogMztcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy5kcmF3T3B0aW9ucy54ID0gdGhpcy5wb3NbMF07XG4gICAgdGhpcy5kcmF3T3B0aW9ucy55ID0gdGhpcy5wb3NbMV07XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgV2FsbCBmcm9tIFwiLi93YWxsXCI7XG5pbXBvcnQgQ29pbiBmcm9tIFwiLi9jb2luXCI7XG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vZW5lbXlcIjtcblxuaW1wb3J0IHtcbiAgcmFuZE51bVBhdGhzLFxuICBhZGRWYWxpZE5laWdoYm9ycyxcbiAgYnVpbGRQYXRocyxcbiAgc2h1ZmZsZSxcbiAgYXNzaWduQmxvY2tlZFBhdGhzLFxuICByYW5kTnVtQ29pbnNcbn0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5cbmNsYXNzIFJvb20ge1xuICBjb25zdHJ1Y3RvcihuZWlnaGJvcikge1xuICAgIHRoaXMuZ2VuZXJhdGVDb2lucygpO1xuICAgIHRoaXMud2FsbHMgPSBbXTtcbiAgICBsZXQgcmFuZElkeDtcbiAgICB0aGlzLm5laWdoYm9ycyA9IHtcbiAgICAgIHVwOiB1bmRlZmluZWQsXG4gICAgICBkb3duOiB1bmRlZmluZWQsXG4gICAgICBsZWZ0OiB1bmRlZmluZWQsXG4gICAgICByaWdodDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgbGV0IGVudHJ5RGlyO1xuICAgIGlmIChuZWlnaGJvcikge1xuICAgICAgY29uc3QgZXhpdERpciA9IE9iamVjdC5rZXlzKG5laWdoYm9yKVswXTtcbiAgICAgIGNvbnN0IHByZXZSb29tID0gT2JqZWN0LnZhbHVlcyhuZWlnaGJvcilbMF07XG4gICAgICB0aGlzLm5vZGVQb3MgPSBbLi4ucHJldlJvb20ubm9kZVBvc107XG4gICAgICBzd2l0Y2goZXhpdERpcikge1xuICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5kb3duID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIkRcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMV0rKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy51cCA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJVXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzFdLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMucmlnaHQgPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiUlwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1swXS0tO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5sZWZ0ID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIkxcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMF0rKztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub2RlUG9zID0gWzAsMF07XG4gICAgfVxuICAgIFxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG5cbiAgICBhZGRWYWxpZE5laWdoYm9ycyh0aGlzKTtcbiAgICBsZXQgd2FsbHMsIG51bVBhdGhzLCByYW5kUGF0aHM7XG4gICAgbGV0IG5ld1BhdGhzID0gW107XG4gICAgbGV0IHBhdGhzID0gYnVpbGRQYXRocyh0aGlzKTtcbiAgICBsZXQgcGF0aHNBcnIgPSBwYXRocy5zcGxpdChcIlwiKTtcbiAgICBpZiAobmVpZ2hib3IpIHtcbiAgICAgIC8vIGlmIG5vdCBpbml0aWFsIHJvb21cbiAgICAgIHBhdGhzQXJyID0gcGF0aHNBcnIuZmlsdGVyKHBhdGggPT4gcGF0aCAhPT0gZW50cnlEaXIpOyAvLyByZW1vdmUgZW50cnlEaXIgZnJvbSBwYXRoc1xuICAgICAgbnVtUGF0aHMgPSByYW5kTnVtUGF0aHMocGF0aHMubGVuZ3RoKTsgLy8gd2VpZ2h0ZWQgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IsIHByZWZlcnMgbW9yZSBwYXRoc1xuICAgICAgaWYgKG51bVBhdGhzID09PSBwYXRocy5sZW5ndGgpIHsgLy8gaWYgYWxsIDQgcGF0aHMgYXJlIGF2YWlsYWJsZVxuICAgICAgICByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBHbG9iYWwuQkdfSU1HU1tgJHtudW1QYXRoc30ke3BhdGhzfSR7cmFuZElkeH1gXTtcbiAgICAgICAgYXNzaWduQmxvY2tlZFBhdGhzKHRoaXMsIHBhdGhzKTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKHBhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7dGhpcy5ub2RlUG9zfWBdID0gdGhpcztcbiAgICAgIH0gZWxzZSB7IC8vIGxlc3MgdGhhbiA0IHBhdGhzIGF2YWlsYWJsZVxuICAgICAgICBzaHVmZmxlKHBhdGhzQXJyKTsgLy8gcmFuZG9taXplIHRoZSBwYXRoIGNob2ljZXNcbiAgICAgICAgbmV3UGF0aHMucHVzaChlbnRyeURpcik7IC8vIE1VU1QgQUxXQVlTIGhhdmUgdGhlIHBhdGggeW91IGVudGVyIGZyb21cbiAgICAgICAgbnVtUGF0aHMtLTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXRoczsgaSsrKSB7IG5ld1BhdGhzLnB1c2gocGF0aHNBcnIucG9wKCkpIH1cbiAgICAgICAgbmV3UGF0aHMgPSBuZXdQYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHMrMX0ke25ld1BhdGhzfSR7cmFuZElkeH1gXTtcbiAgICAgICAgaWYgKCF0aGlzLmJhY2tncm91bmQpIHtcbiAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBhc3NpZ25CbG9ja2VkUGF0aHModGhpcywgbmV3UGF0aHMpO1xuICAgICAgICB3YWxscyA9IHRoaXMuYnVpbGRSb29tV2FsbHMobmV3UGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBudW1QYXRocyA9IHJhbmROdW1QYXRocyhwYXRocy5sZW5ndGgpO1xuICAgICAgaWYgKG51bVBhdGhzID09PSBwYXRocy5sZW5ndGgpIHtcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtwYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhwYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaHVmZmxlKHBhdGhzQXJyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXRoczsgaSsrKSB7IG5ld1BhdGhzLnB1c2gocGF0aHNBcnIucG9wKCkpIH1cbiAgICAgICAgbmV3UGF0aHMgPSBuZXdQYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtuZXdQYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBuZXdQYXRocyk7XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhuZXdQYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZ2VuZXJhdGVFbmVtaWVzKCk7XG4gICAgLy8gdGhpcy5hbmltYXRlZE9iamVjdHMgPSB7fTtcbiAgICAvLyBPYmplY3QudmFsdWVzKHRoaXMuY29pbnMpLmZvckVhY2goY29pbiA9PiB7XG4gICAgLy8gICB0aGlzLmFuaW1hdGVkT2JqZWN0c1tgY29pbi0ke2NvaW4ucG9zfWBdID0gY29pbjtcbiAgICAvLyB9KTtcblxuICB9XG5cbiAgZ2VuZXJhdGVFbmVtaWVzKCkge1xuICAgIGNvbnN0IG51bUVuZW1pZXMgPSBNYXRoLmZsb29yKE9iamVjdC5rZXlzKEdsb2JhbC5TRVNTSU9OLnJvb21zKS5sZW5ndGgvMik7XG4gICAgdGhpcy5lbmVtaWVzID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1FbmVtaWVzOyBpKyspIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU1MCkgKyA2NDtcbiAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU1MCkgKyA2NDtcbiAgICAgIGxldCBwb3MgPSBbeCx5XTtcbiAgICAgIGNvbnN0IGVuZW15ID0gbmV3IEVuZW15KHBvcywgNDgsNDgsR2xvYmFsLlNQUklURVMubW9uc3RlcnMsIFwiYmxvYlwiLCAyMDAgKyAobnVtRW5lbWllcyAqIDUwKSk7XG4gICAgICB0aGlzLmVuZW1pZXNbYCR7ZW5lbXkucG9zfWBdID0gZW5lbXk7XG4gICAgfVxuICB9O1xuXG4gIGdlbmVyYXRlQ29pbnMoKSB7XG4gICAgY29uc3QgbnVtQ29pbnMgPSByYW5kTnVtQ29pbnMoKTtcbiAgICB0aGlzLmNvaW5zID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db2luczsgaSsrKSB7XG4gICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgICB3aGlsZSAoeCA+IDMzNiAmJiB4IDwgMzg0KSB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICAgIHdoaWxlICh5ID4gMzM2ICYmIHkgPCAzODQpIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgICAgbGV0IHBvcyA9IFt4LHldO1xuICAgICAgY29uc3QgY29pbiA9IG5ldyBDb2luKHBvcywgMTYsMTYsR2xvYmFsLlNQUklURVMuY29pbik7XG4gICAgICB0aGlzLmNvaW5zW2Ake2NvaW4ucG9zfWBdID0gY29pbjtcbiAgICB9XG4gIH07XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB0aGlzLmNvbGxlY3QoKTtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuY29pbnMpLmZvckVhY2goY29pbiA9PiB7XG4gICAgICBjb2luLmFuaW1hdGUoKTtcbiAgICB9KTtcbiAgICAvLyBPYmplY3QudmFsdWVzKHRoaXMuYW5pbWF0ZWRPYmplY3RzKS5mb3JFYWNoKG9iamVjdCA9PiBvYmplY3QuYW5pbWF0ZSgpKTtcblxuICB9XG5cbiAgY29sbGVjdCgpIHtcbiAgICBmb3IgKGxldCBjb2luIG9mIE9iamVjdC52YWx1ZXModGhpcy5jb2lucykpIHtcbiAgICAgIGlmIChjb2luLmNvbGxlY3QoKSkge1xuICAgICAgICBkZWxldGUgdGhpcy5jb2luc1tgJHtjb2luLnBvc31gXTtcbiAgICAgICAgR2xvYmFsLlNFU1NJT04uY29pbkNvdW50Kys7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmQsIDAsIDApO1xuICAgIC8vIHRoaXMud2FsbHMuZm9yRWFjaCh3YWxsID0+IHdhbGwuZHJhdyhjdHgpKTtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuY29pbnMpLmZvckVhY2goY29pbiA9PiBjb2luLmRyYXcoY3R4KSk7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLmVuZW1pZXMpLmZvckVhY2goZW5lbXkgPT4gZW5lbXkuZHJhdyhjdHgpKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmYWY0XCI7XG4gICAgY3R4LmZvbnQgPSBcIjIwcHggYXJpYWxcIjtcbiAgICBjdHguZmlsbFRleHQoYFJvb20gWyAke3RoaXMubm9kZVBvc30gXWAsIDE1LCAzMCk7XG4gICAgY3R4LmZpbGxUZXh0KGBDb2lucyB4ICR7R2xvYmFsLlNFU1NJT04uY29pbkNvdW50fWAsIDU5MCwgMzApO1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmYmIwMFwiO1xuICAgIGN0eC5tb3ZlVG8oMTUsIDcwNSk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDU7XG4gICAgY3R4LmxpbmVUbygxNSArIChHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuc3RhbWluYS8xMDAwKSAqIDEwMCwgNzA1KTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMzNmZjAwXCI7XG4gICAgY3R4Lm1vdmVUbygxNSwgNjkwKTtcbiAgICBjdHgubGluZVdpZHRoID0gMTA7XG4gICAgY3R4LmxpbmVUbygxNSArIChHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuaHAvMjApICogMTAwLCA2OTApO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZjAwMDBcIjtcbiAgICBjdHgubW92ZVRvKDExNSAtICgxIC0gR2xvYmFsLlNFU1NJT04ucGxheWVyLmhwLzIwKSAqIDEwMCwgNjkwKTtcbiAgICBjdHgubGluZVdpZHRoID0gMTA7XG4gICAgY3R4LmxpbmVUbygxMTUsIDY5MCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwZGRkZFwiO1xuICAgIGN0eC5tb3ZlVG8oMTUsIDY5OSk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDU7XG4gICAgY3R4LmxpbmVUbygxNSArIChHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuaW52dWxuZXJhYmxlLzc1KSAqIDEwMCwgNjk5KTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gY3R4LmZpbGxUZXh0KGBTdGFtaW5hID0gJHtHbG9iYWwuU0VTU0lPTi5wbGF5ZXIuc3RhbWluYX1gLCAxNSwgNDAwKTtcbiAgfVxuXG4gIGJ1aWxkUm9vbVdhbGxzKHBhdGhzKSB7XG4gICAgbGV0IHdhbGxzID0gW107XG4gICAgc3dpdGNoKHBhdGhzKSB7XG4gICAgICBjYXNlIFwiRExSVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRExVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJMUlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEUlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRMUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJMVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJSVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRMXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRSXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxSXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJMXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJSXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICB9XG4gIH1cblxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgUm9vbTsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCBSb29tIGZyb20gXCIuLi9yb29tXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi4vZ2FtZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBuZXdHYW1lID0gKCkgPT4ge1xuICBpZiAoR2xvYmFsLlNFU1NJT04uZ2FtZSkge1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucmVxdWVzdFN0b3AgPSB0cnVlO1xuICAgIGRlbGV0ZSBHbG9iYWwuU0VTU0lPTltcImdhbWVcIl07XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wicGxheWVyXCJdO1xuICAgIGRlbGV0ZSBHbG9iYWwuU0VTU0lPTltcImNvaW5Db3VudFwiXTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT05bXCJyb29tc1wiXTtcbiAgfVxuICBuZXcgR2FtZSguLi5PYmplY3QudmFsdWVzKEdsb2JhbC5HQU1FX09QVElPTlMpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjb2xsaWRlZFdpdGhTaWRlID0gKHNpZGUsIHRoaXNTaWRlLCBvdGhlclNpZGUpID0+IHtcbiAgbGV0IGNvbGxpZGVkID0gZmFsc2U7XG4gIGxldCB1cHBlckRpZmYsIGxvd2VyRGlmZjtcbiAgY29uc3QgdXBwZXJCb3VuZHMgPSAxMDtcbiAgY29uc3QgbG93ZXJCb3VuZHMgPSAwO1xuICBpZiAoc2lkZSA9PT0gXCJ0b3BcIiB8fCBzaWRlID09PSBcImJvdHRvbVwiKSB7XG4gICAgY29uc3QgdGhpc1lWYWwgPSB0aGlzU2lkZVsxXTtcbiAgICBjb25zdCBbdGhpc1hNaW4sIHRoaXNYTWF4XSA9IHRoaXNTaWRlWzBdO1xuICAgIGNvbnN0IG90aGVyWVZhbCA9IG90aGVyU2lkZVsxXTtcbiAgICBjb25zdCBbb3RoZXJYTWluLCBvdGhlclhNYXhdID0gb3RoZXJTaWRlWzBdO1xuICAgIFxuICAgIHN3aXRjaCAoc2lkZSkge1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICB1cHBlckRpZmYgPSAob3RoZXJZVmFsIC0gdGhpc1lWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9IChvdGhlcllWYWwgLSB0aGlzWVZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1lWYWwgPCBvdGhlcllWYWwpICYmXG4gICAgICAgICAgKHRoaXNYTWluIDwgb3RoZXJYTWF4KSAmJlxuICAgICAgICAgICh0aGlzWE1heCA+IG90aGVyWE1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKHRoaXNZVmFsIC0gb3RoZXJZVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAodGhpc1lWYWwgLSBvdGhlcllWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNZVmFsID4gb3RoZXJZVmFsKSAmJlxuICAgICAgICAgICh0aGlzWE1pbiA8IG90aGVyWE1heCkgJiZcbiAgICAgICAgICAodGhpc1hNYXggPiBvdGhlclhNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29sbGlkZWQpIHJldHVybiBvdGhlcllWYWw7XG5cbiAgfSBlbHNlIHtcbiAgICBjb25zdCB0aGlzWFZhbCA9IHRoaXNTaWRlWzBdO1xuICAgIGNvbnN0IFt0aGlzWU1pbiwgdGhpc1lNYXhdID0gdGhpc1NpZGVbMV07XG4gICAgY29uc3Qgb3RoZXJYVmFsID0gb3RoZXJTaWRlWzBdO1xuICAgIGNvbnN0IFtvdGhlcllNaW4sIG90aGVyWU1heF0gPSBvdGhlclNpZGVbMV07XG4gICAgXG4gICAgc3dpdGNoIChzaWRlKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICB1cHBlckRpZmYgPSAob3RoZXJYVmFsIC0gdGhpc1hWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9IChvdGhlclhWYWwgLSB0aGlzWFZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1hWYWwgPCBvdGhlclhWYWwpICYmXG4gICAgICAgICAgKHRoaXNZTWluIDwgb3RoZXJZTWF4KSAmJlxuICAgICAgICAgICh0aGlzWU1heCA+IG90aGVyWU1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIHVwcGVyRGlmZiA9ICh0aGlzWFZhbCAtIG90aGVyWFZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKHRoaXNYVmFsIC0gb3RoZXJYVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWFZhbCA+IG90aGVyWFZhbCkgJiZcbiAgICAgICAgICAodGhpc1lNaW4gPCBvdGhlcllNYXgpICYmXG4gICAgICAgICAgKHRoaXNZTWF4ID4gb3RoZXJZTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29sbGlkZWQpIHJldHVybiBvdGhlclhWYWw7XG4gICAgXG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG5cbn07XG5cbmV4cG9ydCBjb25zdCByb29tQ2hhbmdlID0gKGV4aXREaXIsIGN1cnJSb29tKSA9PiB7XG4gIGxldCBuZXh0Tm9kZVBvcyA9IFsuLi5jdXJyUm9vbS5ub2RlUG9zXTtcbiAgc3dpdGNoKGV4aXREaXIpIHtcbiAgICBjYXNlIFwidXBcIjpcbiAgICAgIG5leHROb2RlUG9zWzFdICs9IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZG93blwiOlxuICAgICAgbmV4dE5vZGVQb3NbMV0gLT0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICBuZXh0Tm9kZVBvc1swXSAtPSAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICBuZXh0Tm9kZVBvc1swXSArPSAxO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKEdsb2JhbC5TRVNTSU9OLnJvb21zW2Ake25leHROb2RlUG9zfWBdKSB7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tID0gR2xvYmFsLlNFU1NJT04ucm9vbXNbYCR7bmV4dE5vZGVQb3N9YF07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbmVpZ2hib3IgPSB7IFtleGl0RGlyXTogY3VyclJvb20gfTtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20gPSBuZXcgUm9vbShuZWlnaGJvcik7XG4gICAgYWRkVmFsaWROZWlnaGJvcnMoY3VyclJvb20pO1xuICAgIGFkZFZhbGlkTmVpZ2hib3JzKEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByYW5kTnVtUGF0aHMgPSBtYXggPT4ge1xuICBsZXQgcGF0aHMgPSBbXTtcbiAgaWYgKG1heCA+IDMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bNF07IGkrKykgeyBwYXRocy5wdXNoKDQpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bM107IGkrKykgeyBwYXRocy5wdXNoKDMpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMl07IGkrKykgeyBwYXRocy5wdXNoKDIpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMV07IGkrKykgeyBwYXRocy5wdXNoKDEpIH1cbiAgfSBlbHNlIGlmIChtYXggPiAyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzNdOyBpKyspIHsgcGF0aHMucHVzaCgzKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzJdOyBpKyspIHsgcGF0aHMucHVzaCgyKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzFdOyBpKyspIHsgcGF0aHMucHVzaCgxKSB9XG4gIH0gZWxzZSBpZiAobWF4ID4gMSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsyXTsgaSsrKSB7IHBhdGhzLnB1c2goMikgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsxXTsgaSsrKSB7IHBhdGhzLnB1c2goMSkgfVxuICB9IGVsc2Uge1xuICAgIHBhdGhzLnB1c2goMSk7XG4gIH1cblxuICBzaHVmZmxlKHBhdGhzKTtcblxuICByZXR1cm4gcGF0aHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnBhdGhzLmxlbmd0aCldO1xuICBcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRWYWxpZE5laWdoYm9ycyA9IHJvb20gPT4ge1xuICBsZXQgdXAgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgdXBbMV0gKz0gMTtcbiAgdXAgPSB1cC50b1N0cmluZygpO1xuICBsZXQgZG93biA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBkb3duWzFdIC09IDE7XG4gIGRvd24gPSBkb3duLnRvU3RyaW5nKCk7XG4gIGxldCBsZWZ0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGxlZnRbMF0gLT0gMTtcbiAgbGVmdCA9IGxlZnQudG9TdHJpbmcoKTtcbiAgbGV0IHJpZ2h0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHJpZ2h0WzBdICs9IDE7XG4gIHJpZ2h0ID0gcmlnaHQudG9TdHJpbmcoKTtcbiAgaWYgKFxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXSAmJiBcbiAgICAoR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdLm5laWdoYm9ycy5kb3duICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLnVwXG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLnVwID0gR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdO1xuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW3VwXS5uZWlnaGJvcnMuZG93biA9IHJvb207XG4gIH1cbiAgaWYgKFxuICAgIEdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dICYmIFxuICAgIChHbG9iYWwuU0VTU0lPTi5yb29tc1tkb3duXS5uZWlnaGJvcnMudXAgIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMuZG93blxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy5kb3duID0gR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl07XG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl0ubmVpZ2hib3JzLnVwID0gcm9vbTtcbiAgfVxuICBpZiAoXG4gICAgR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF0gJiYgXG4gICAgKEdsb2JhbC5TRVNTSU9OLnJvb21zW2xlZnRdLm5laWdoYm9ycy5yaWdodCAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy5sZWZ0XG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLmxlZnQgPSBHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XTtcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XS5uZWlnaGJvcnMucmlnaHQgPSByb29tO1xuICB9XG4gIGlmIChcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF0gJiYgXG4gICAgKEdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XS5uZWlnaGJvcnMubGVmdCAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy5yaWdodFxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy5yaWdodCA9IEdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XTtcbiAgICBHbG9iYWwuU0VTU0lPTi5yb29tc1tyaWdodF0ubmVpZ2hib3JzLmxlZnQgPSByb29tO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRQYXRocyA9IHJvb20gPT4ge1xuICBsZXQgcGF0aHMgPSBbXTtcbiAgbGV0IHVwID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHVwWzFdICs9IDE7XG4gIHVwID0gdXAudG9TdHJpbmcoKTtcbiAgbGV0IGRvd24gPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgZG93blsxXSAtPSAxO1xuICBkb3duID0gZG93bi50b1N0cmluZygpO1xuICBsZXQgbGVmdCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBsZWZ0WzBdIC09IDE7XG4gIGxlZnQgPSBsZWZ0LnRvU3RyaW5nKCk7XG4gIGxldCByaWdodCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICByaWdodFswXSArPSAxO1xuICByaWdodCA9IHJpZ2h0LnRvU3RyaW5nKCk7XG4gIGlmICghR2xvYmFsLlNFU1NJT04ucm9vbXNbdXBdIHx8IChHbG9iYWwuU0VTU0lPTi5yb29tc1t1cF0ubmVpZ2hib3JzLmRvd24gIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJVXCIpO1xuICB9XG4gIGlmICghR2xvYmFsLlNFU1NJT04ucm9vbXNbZG93bl0gfHwgKEdsb2JhbC5TRVNTSU9OLnJvb21zW2Rvd25dLm5laWdoYm9ycy51cCAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIkRcIik7XG4gIH1cbiAgaWYgKCFHbG9iYWwuU0VTU0lPTi5yb29tc1tsZWZ0XSB8fCAoR2xvYmFsLlNFU1NJT04ucm9vbXNbbGVmdF0ubmVpZ2hib3JzLnJpZ2h0ICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiTFwiKTtcbiAgfVxuICBpZiAoIUdsb2JhbC5TRVNTSU9OLnJvb21zW3JpZ2h0XSB8fCAoR2xvYmFsLlNFU1NJT04ucm9vbXNbcmlnaHRdLm5laWdoYm9ycy5sZWZ0ICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiUlwiKTtcbiAgfVxuICByZXR1cm4gcGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG59O1xuXG5leHBvcnQgY29uc3QgYXNzaWduQmxvY2tlZFBhdGhzID0gKHJvb20sIHBhdGhzKSA9PiB7XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJVXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMudXAgPSBcIlhcIjtcbiAgfVxuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiRFwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLmRvd24gPSBcIlhcIjtcbiAgfVxuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiTFwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLmxlZnQgPSBcIlhcIjtcbiAgfVxuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiUlwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLnJpZ2h0ID0gXCJYXCI7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByYW5kTnVtQ29pbnMgPSAoKSA9PiB7XG4gIGxldCB3ZWlnaHRlZE51bUNvaW5zID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLkNPSU5fV0VJR0hUU1szXTsgaSsrKSB7IHdlaWdodGVkTnVtQ29pbnMucHVzaCgzKSB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLkNPSU5fV0VJR0hUU1syXTsgaSsrKSB7IHdlaWdodGVkTnVtQ29pbnMucHVzaCgyKSB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLkNPSU5fV0VJR0hUU1sxXTsgaSsrKSB7IHdlaWdodGVkTnVtQ29pbnMucHVzaCgxKSB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLkNPSU5fV0VJR0hUU1swXTsgaSsrKSB7IHdlaWdodGVkTnVtQ29pbnMucHVzaCgwKSB9XG4gIGNvbnN0IHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3ZWlnaHRlZE51bUNvaW5zLmxlbmd0aCk7XG4gIHNodWZmbGUod2VpZ2h0ZWROdW1Db2lucyk7XG4gIHJldHVybiB3ZWlnaHRlZE51bUNvaW5zW3JhbmRJZHhdO1xufTtcblxuZXhwb3J0IGNvbnN0IHJhbmRDb2luU291bmQgPSAoKSA9PiB7XG4gIGNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjb2luJHtpfWApO1xufTtcblxuZXhwb3J0IGNvbnN0IHNodWZmbGUgPSBhcnIgPT4ge1xuICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICBsZXQgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgIFthcnJbaV0sIGFycltqXV0gPSBbYXJyW2pdLCBhcnJbaV1dO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplZE1vdmVtZW50ID0gKG15c2VsZiwgZW50aXR5LCBjaGFzaW5nUGxheWVyKSA9PiB7IFxuICBjb25zdCBteCA9IG15c2VsZi5jZW50ZXJbMF07XG4gIGNvbnN0IG15ID0gbXlzZWxmLmNlbnRlclsxXTtcbiAgY29uc3QgZXggPSBlbnRpdHkuY2VudGVyWzBdO1xuICBjb25zdCBleSA9IGVudGl0eS5jZW50ZXJbMV07XG4gIGxldCBkeCA9IG14IC0gZXg7XG4gIGxldCBkeSA9IG15IC0gZXk7XG4gIFxuICBpZiAoIWNoYXNpbmdQbGF5ZXIpIHtcbiAgICBjb25zdCByYW5kQW5nbGUgPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gICAgZHggPSBNYXRoLmNvcyhyYW5kQW5nbGUpICogbXlzZWxmLnNwZWVkO1xuICAgIGR5ID0gTWF0aC5zaW4ocmFuZEFuZ2xlKSAqIG15c2VsZi5zcGVlZDtcbiAgfVxuICBcbiAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4oZHkvZHgpO1xuICBjb25zdCBueSA9IE1hdGguc2luKGFuZ2xlKSAqIG15c2VsZi5zcGVlZDtcbiAgY29uc3QgbnggPSBNYXRoLmNvcyhhbmdsZSkgKiBteXNlbGYuc3BlZWQ7XG5cbiAgcmV0dXJuIHtcbiAgICBkeCxcbiAgICBkeSxcbiAgICBueCxcbiAgICBueSxcbiAgICB1cDogKGR5ID4gMCkgJiYgKE1hdGguYWJzKGR5KSA+IE1hdGguYWJzKGR4KSksXG4gICAgZG93bjogKGR5IDwgMCkgJiYgKE1hdGguYWJzKGR5KSA+IE1hdGguYWJzKGR4KSksXG4gICAgbGVmdDogKGR4ID4gMCkgJiYgKE1hdGguYWJzKGR4KSA+IE1hdGguYWJzKGR5KSksXG4gICAgcmlnaHQ6IChkeCA8IDApICYmIChNYXRoLmFicyhkeCkgPiBNYXRoLmFicyhkeSkpLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGRpc3RhbmNlVG9QbGF5ZXIgPSAobXlzZWxmLCBwbGF5ZXIpID0+IHtcbiAgY29uc3QgbXggPSBteXNlbGYuY2VudGVyWzBdO1xuICBjb25zdCBteSA9IG15c2VsZi5jZW50ZXJbMV07XG4gIGNvbnN0IHB4ID0gcGxheWVyLmNlbnRlclswXTtcbiAgY29uc3QgcHkgPSBwbGF5ZXIuY2VudGVyWzFdO1xuICBsZXQgZHggPSBweCAtIG14O1xuICBsZXQgZHkgPSBweSAtIG15O1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KGR4LCAyKSArIE1hdGgucG93KGR5LCAyKSk7XG59OyIsImV4cG9ydCBjb25zdCBXSURUSCA9IDcyMDtcbmV4cG9ydCBjb25zdCBIRUlHSFQgPSA3MjA7XG5leHBvcnQgY29uc3QgU1BSSVRFX0RJTVMgPSBbNDgsNDhdO1xuZXhwb3J0IGNvbnN0IEZQUyA9IDEwMDAvNjA7XG5leHBvcnQgY29uc3QgS0VZUyA9IHtcbiAgODc6IGZhbHNlLCAvLyBXXG4gIDY1OiBmYWxzZSwgLy8gQVxuICA4MzogZmFsc2UsIC8vIFNcbiAgNjg6IGZhbHNlLCAvLyBEXG4gIDE2OiBmYWxzZSwgLy8gTC1TaGlmdFxufTtcbmV4cG9ydCBjb25zdCBGT05UID0ge307XG5cbmV4cG9ydCBjb25zdCBTRVNTSU9OID0ge307XG5leHBvcnQgY29uc3QgU1BSSVRFUyA9IHt9O1xuZXhwb3J0IGNvbnN0IEJHX0lNR1MgPSB7fTtcblxuZXhwb3J0IGNvbnN0IENPSU5fV0VJR0hUUyA9IHtcbiAgMzogMixcbiAgMjogOCxcbiAgMTogMzAsXG4gIDA6IDUwLCBcbn07XG5cbmV4cG9ydCBjb25zdCBBTExfUEFUSFMgPSBbXG4gIFwiRExSVVwiLFxuICBcIkRMUlwiLFxuICBcIkRMVVwiLFxuICBcIkxSVVwiLFxuICBcIkRSVVwiLFxuICBcIkRMXCIsXG4gIFwiRFJcIixcbiAgXCJEVVwiLFxuICBcIkxSXCIsXG4gIFwiTFVcIixcbiAgXCJSVVwiLFxuICBcIkRcIixcbiAgXCJMXCIsXG4gIFwiUlwiLFxuICBcIlVcIixcbl07XG5cbmV4cG9ydCBjb25zdCBXRUlHSFRTID0ge1xuICA0OiB7XG4gICAgNDogNTUsXG4gICAgMzogNDUsXG4gICAgMjogOSxcbiAgICAxOiAxLFxuICB9LFxuICAzOiB7XG4gICAgMzogODAsXG4gICAgMjogMjAsXG4gICAgMTogMyxcbiAgfSxcbiAgMjoge1xuICAgIDI6IDkwLFxuICAgIDE6IDEwLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IEdBTUVfT1BUSU9OUyA9IHt9O1xuZXhwb3J0IGNvbnN0IFJFUVVFU1QgPSB7fTsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9nYW1lXCI7XG5pbXBvcnQgeyBuZXdHYW1lIH0gZnJvbSBcIi4uL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKEtFWVMpID0+IHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XG4gICAgXG4gICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwid1wiICYmICFLRVlTW1wid1wiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwiYVwiICYmICFLRVlTW1wiYVwiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwic1wiICYmICFLRVlTW1wic1wiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgaWYgKGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwiZFwiICYmICFLRVlTW1wiZFwiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgaWYgKGUua2V5ID09PSBcIlNoaWZ0XCIgJiYgIUtFWVNbXCJTaGlmdFwiXSkgS0VZU1tlLmtleV0gPSB0cnVlO1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiICYmICFLRVlTW1wiRW50ZXJcIl0pIEtFWVNbZS5rZXldID0gdHJ1ZTtcblxuICB9KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT4ge1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcIndcIiAmJiBLRVlTW1wid1wiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImFcIiAmJiBLRVlTW1wiYVwiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcInNcIiAmJiBLRVlTW1wic1wiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleS50b0xvd2VyQ2FzZSgpID09PSBcImRcIiAmJiBLRVlTW1wiZFwiXSkgS0VZU1tlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleSA9PT0gXCJTaGlmdFwiICYmIEtFWVNbXCJTaGlmdFwiXSkgS0VZU1tlLmtleV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiBLRVlTW1wiRW50ZXJcIl0pIEtFWVNbZS5rZXldID0gZmFsc2U7XG4gIH0pO1xuXG4gIGNvbnN0IGhvd1RvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG9cIik7XG4gIFxuICBob3dUby5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10by1wb2ludGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tc291bmRcIikucGxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3ctdG8gPiB1bFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9KTtcbiAgaG93VG8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10by1wb2ludGVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3ctdG8gPiB1bFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9KTtcblxuICBjb25zdCByZXN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1zb3VuZFwiKS5wbGF5KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0LXBvaW50ZXJcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIHJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0LXBvaW50ZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIHJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBuZXdHYW1lKCk7XG4gIH0pO1xuXG59XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IocG9zLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grdGhpcy53aWR0aCx5XTtcbiAgICBjb25zdCBib3R0b21SaWdodCA9IFt4K3RoaXMud2lkdGgseSt0aGlzLmhlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkrdGhpcy5oZWlnaHRdO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI3RyYW5zcGFyZW50XCI7XG4gICAgY3R4LmZpbGxSZWN0KC4uLnRoaXMucG9zLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IGluc3RhbGxMaXN0ZW5lcnMgZnJvbSBcIi4vc2NyaXB0cy91dGlscy9pbnN0YWxsX2xpc3RlbmVyc1wiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3NjcmlwdHMvdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCBHYW1lU3RhcnQgZnJvbSBcIi4vc2NyaXB0cy9nYW1lX3N0YXJ0XCI7XG5cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5XCIpO1xuICBjYW52YXMud2lkdGggPSBHbG9iYWwuV0lEVEg7XG4gIGNhbnZhcy5oZWlnaHQgPSBHbG9iYWwuSEVJR0hUO1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gIGluc3RhbGxMaXN0ZW5lcnMoR2xvYmFsLktFWVMpO1xuXG4gIC8vIGxldCBmb250ID0gbmV3IEZvbnRGYWNlKFwiUHJlc3MgU3RhcnQgMlBcIiwgJ3VybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVByZXNzK1N0YXJ0KzJQJmRpc3BsYXk9c3dhcCknKTtcbiAgLy8gZm9udC5sb2FkKCkudGhlbigoKSA9PiB7XG4gIC8vICAgR2xvYmFsLkZPTlQgPSBmb250O1xuICAvLyB9KTtcblxuICAvLyBjb25zdCBmb250ID0gbmV3IEZvbnRGYWNlKFwiUHJlc3MgU3RhcnQgMlBcIiwgJ3VybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVByZXNzK1N0YXJ0KzJQJmRpc3BsYXk9c3dhcCknKTtcbiAgLy8gZm9udC5sb2FkKCkudGhlbihHbG9iYWwuRk9OVFtcImZvbnRcIl0gPSBmb250KTtcblxuICBsZXQgY29pblNwcml0ZSA9IG5ldyBJbWFnZSgpO1xuICBjb2luU3ByaXRlLnNyYyA9IFwiLi9kaXN0L2Fzc2V0cy9pbWFnZXMvY29pbi9jb2luLnBuZ1wiO1xuICBjb2luU3ByaXRlLm9ubG9hZCA9ICgpID0+IHtcbiAgICBHbG9iYWwuU1BSSVRFUy5jb2luID0gY29pblNwcml0ZTtcbiAgfTtcblxuICBsZXQgbW9uc3RlcnNTcHJpdGVzID0gbmV3IEltYWdlKCk7XG4gIG1vbnN0ZXJzU3ByaXRlcy5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL2VuZW1pZXMvbW9uc3RlcnMucG5nXCI7XG4gIG1vbnN0ZXJzU3ByaXRlcy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgR2xvYmFsLlNQUklURVMubW9uc3RlcnMgPSBtb25zdGVyc1Nwcml0ZXM7XG4gIH07XG4gIFxuICBmb3IgKGxldCBwYXRoIG9mIEdsb2JhbC5BTExfUEFUSFMpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIlwiKS5zb3J0KCkuam9pbihcIlwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xuICAgICAgYmFja2dyb3VuZC5zcmMgPSBgLi9kaXN0L2Fzc2V0cy9pbWFnZXMvbWFwX2ltZ3MvJHtwYXRoLmxlbmd0aH0vJHtwYXRofS9tYXAke2l9LnBuZ2A7XG4gICAgICBcbiAgICAgIGJhY2tncm91bmQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBHbG9iYWwuQkdfSU1HU1tgJHtwYXRoLmxlbmd0aH0ke3BhdGh9JHtpfWBdID0gYmFja2dyb3VuZDtcbiAgICAgICAgLy8gR2xvYmFsLkdCX0lNR1NbXCI0RExSVTBcIl0gPSBiYWNrZ3JvdW5kXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGxldCBwbGF5ZXJTcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbiAgcGxheWVyU3ByaXRlLnNyYyA9IFwiLi9kaXN0L2Fzc2V0cy9pbWFnZXMvcm9ndWUvcm9ndWVfd2Fsay5wbmdcIjtcbiAgXG4gIHBsYXllclNwcml0ZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgbGV0IGdhbWVTdGFydCA9IG5ldyBHYW1lU3RhcnQoY3R4LCBwbGF5ZXJTcHJpdGUpO1xuICAgIEdsb2JhbC5HQU1FX09QVElPTlNbXCJjdHhcIl0gPSBjdHg7XG4gICAgR2xvYmFsLkdBTUVfT1BUSU9OU1tcInBsYXllclNwcml0ZVwiXSA9IHBsYXllclNwcml0ZTtcbiAgICBnYW1lU3RhcnQucHJvbXB0KCk7XG4gICAgXG4gIH1cblxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==