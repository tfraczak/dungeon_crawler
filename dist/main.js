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

    var startingPos = [48 * 7, 48 * 7];
    this.player = _construct(_player__WEBPACK_IMPORTED_MODULE_0__.default, [startingPos].concat(_toConsumableArray(_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SPRITE_DIMS), [playerSprite]));
    _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player = this.player;
    this.ctx = ctx; // const room = { "left": new Room() }; // testing new Room(room)

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
    key: "stop",
    value: function stop() {
      if (this.requestId) {
        this.requestStop = true;
      }
    }
  }, {
    key: "gameStep",
    value: function gameStep() {
      this.requestId = undefined;

      if (!this.requestId) {
        var player = _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.player;
        this.ctx.clearRect(0, 0, _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.WIDTH, _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.HEIGHT);
        player.move(this.room.walls);
        this.room.animate();
        this.room.draw(this.ctx);
        player.draw(this.ctx);
        this.requestId = requestAnimationFrame(this.gameStep);

        if (this.requestStop) {
          cancelAnimationFrame(this.requestId);
          return;
        }
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.gameStep();
      requestAnimationFrame(this.gameStep);
    }
  }]);

  return Game;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

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
    _this.speed = 1;
    _this.normalizedSpeed = parseFloat(_this.speed) / Math.sqrt(2);
    _this.pace = 24 / _this.speed;
    _this.speedModifier = 1;
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
    key: "move",
    value: function move(walls) {
      var _ref = [_utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS[87], _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS[83], _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS[65], _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS[68], _utils_global_vars__WEBPACK_IMPORTED_MODULE_1__.KEYS[16]],
          up = _ref[0],
          down = _ref[1],
          left = _ref[2],
          right = _ref[3],
          shift = _ref[4];

      if (shift) {
        this.speedModifier = 2;
      } else {
        this.speedModifier = 1;
      } // W key movements and sprite direction


      if (up) {
        if (left || right) {
          this.colBox.pos[1] += -this.normalizedSpeed * this.speedModifier;
        } else {
          this.colBox.pos[1] += -this.speed * this.speedModifier;
        }

        this.updateSides();

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
        } else {
          if (left || right && !this.collisions.top) {
            this.pos[1] += -this.normalizedSpeed * this.speedModifier;
            this.updateSides();
          } else {
            this.pos[1] += -this.speed * this.speedModifier;
            this.updateSides();
          }
        }

        this.drawOptions.palY = this.stride.up.palY;

        if (!left && !right) {
          this.drawOptions.palX = this.stridePalettePos("up");
        }
      } // S key movements and sprite direction


      if (down) {
        if (left || right) {
          this.colBox.pos[1] += this.normalizedSpeed * this.speedModifier;
        } else {
          this.colBox.pos[1] += this.speed * this.speedModifier;
        }

        this.updateSides();

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
          this.colBox.pos[1] = this.collisions.bottom;
          this.pos[1] = this.collisions.bottom - 48;
        } else {
          if (left || right) {
            this.pos[1] += this.normalizedSpeed * this.speedModifier;
            this.updateSides();
          } else {
            this.pos[1] += this.speed * this.speedModifier;
            this.updateSides();
          }
        }

        this.drawOptions.palY = this.stride.down.palY;

        if (!left && !right) {
          this.drawOptions.palX = this.stridePalettePos("down");
        }
      } // A key movement


      if (left) {
        if (up || down) {
          this.colBox.pos[0] += -this.normalizedSpeed * this.speedModifier;
        } else {
          this.colBox.pos[0] += -this.speed * this.speedModifier;
        }

        this.updateSides();

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
          this.colBox.pos[0] = this.collisions.left;
        } else {
          if (up || down && !this.collisions.left) {
            this.pos[0] += -this.normalizedSpeed * this.speedModifier;
          } else {
            this.pos[0] += -this.speed * this.speedModifier;
          }
        }

        this.drawOptions.palY = this.stride.left.palY;
        this.drawOptions.palX = this.stridePalettePos("left");
      } // D key movement


      if (right) {
        if (up || down) {
          this.colBox.pos[0] += this.normalizedSpeed * this.speedModifier;
        } else {
          this.colBox.pos[0] += this.speed * this.speedModifier;
        }

        this.updateSides();

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
          this.colBox.pos[0] = this.collisions.right;
          this.pos[0] = this.collisions.right - (this.colBox.width + this.colBox.width / 2);
        } else {
          if (up || down) {
            this.pos[0] += this.normalizedSpeed * this.speedModifier;
            this.updateSides();
          } else {
            this.pos[0] += this.speed * this.speedModifier;
            this.updateSides();
          }
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
/* harmony import */ var _utils_func_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/func_utils */ "./src/scripts/utils/func_utils.js");
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
    var _this = this;

    _classCallCheck(this, Room);

    this.coins = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.generateCoins)();
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

    _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(this.nodePos)] = this;
    (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.addValidNeighbors)(this);
    var walls, numPaths, randPaths;
    var newPaths = [];
    var paths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.buildPaths)(this);
    var pathsArr = paths.split("");

    if (neighbor) {
      // if not initial room
      pathsArr = pathsArr.filter(function (path) {
        return path !== entryDir;
      }); // remove entryDir from paths

      numPaths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.randNumPaths)(paths.length); // weighted random number generator, prefers more paths

      if (numPaths === paths.length) {
        var _this$walls;

        // if all 4 paths are available
        randIdx = Math.floor(Math.random() * 3);
        this.background = _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["".concat(numPaths).concat(paths).concat(randIdx)];
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.assignBlockedPaths)(this, paths);
        walls = this.buildRoomWalls(paths);

        (_this$walls = this.walls).push.apply(_this$walls, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(this.nodePos)] = this;
      } else {
        var _this$walls2;

        // less than 4 paths available
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.shuffle)(pathsArr); // randomize the path choices

        newPaths.push(entryDir); // MUST ALWAYS have the path you enter from

        numPaths--;

        for (var i = 0; i < numPaths; i++) {
          newPaths.push(pathsArr.pop());
        }

        newPaths = newPaths.sort().join("");
        randIdx = Math.floor(Math.random() * 3);
        this.background = _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["".concat(numPaths + 1).concat(newPaths).concat(randIdx)];

        if (!this.background) {}

        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.assignBlockedPaths)(this, newPaths);
        walls = this.buildRoomWalls(newPaths);

        (_this$walls2 = this.walls).push.apply(_this$walls2, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(this.nodePos)] = this;
      }
    } else {
      numPaths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.randNumPaths)(paths.length);

      if (numPaths === paths.length) {
        var _this$walls3;

        randIdx = Math.floor(Math.random() * 3);
        this.background = _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["".concat(numPaths).concat(paths).concat(randIdx)];
        walls = this.buildRoomWalls(paths);

        (_this$walls3 = this.walls).push.apply(_this$walls3, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(this.nodePos)] = this;
      } else {
        var _this$walls4;

        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.shuffle)(pathsArr);

        for (var _i = 0; _i < numPaths; _i++) {
          newPaths.push(pathsArr.pop());
        }

        newPaths = newPaths.sort().join("");
        randIdx = Math.floor(Math.random() * 3);
        this.background = _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.BG_IMGS["".concat(numPaths).concat(newPaths).concat(randIdx)];
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_2__.assignBlockedPaths)(this, newPaths);
        walls = this.buildRoomWalls(newPaths);

        (_this$walls4 = this.walls).push.apply(_this$walls4, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(this.nodePos)] = this;
      }
    }

    this.animatedObjects = {};
    Object.values(this.coins).forEach(function (coin) {
      _this.animatedObjects["coin-".concat(coin.pos)] = coin;
    });
  }

  _createClass(Room, [{
    key: "animate",
    value: function animate() {
      this.collect();
      Object.values(this.animatedObjects).forEach(function (object) {
        return object.animate();
      });
    }
  }, {
    key: "collect",
    value: function collect() {
      for (var _i2 = 0, _Object$values = Object.values(this.coins); _i2 < _Object$values.length; _i2++) {
        var coin = _Object$values[_i2];

        if (coin.collect()) {
          delete this.animatedObjects["coin-".concat(coin.pos)];
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

      Object.values(this.animatedObjects).forEach(function (object) {
        return object.draw(ctx);
      });
      ctx.fillStyle = "#fffaf4";
      ctx.font = "20px arial";
      ctx.fillText("Room [ ".concat(this.nodePos, " ]"), 15, 30);
      ctx.fillText("Coins x ".concat(_utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.coinCount), 590, 30);
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
/* harmony export */   "randCoinSound": () => (/* binding */ randCoinSound),
/* harmony export */   "generateCoins": () => (/* binding */ generateCoins),
/* harmony export */   "shuffle": () => (/* binding */ shuffle)
/* harmony export */ });
/* harmony import */ var _global_vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global_vars */ "./src/scripts/utils/global_vars.js");
/* harmony import */ var _wall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wall */ "./src/scripts/wall.js");
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../room */ "./src/scripts/room.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game */ "./src/scripts/game.js");
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../entity */ "./src/scripts/entity.js");
/* harmony import */ var _coin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../coin */ "./src/scripts/coin.js");
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
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game.stop();
    delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game;
    delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.player;
    delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.coinCount;

    for (var room in _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS) {
      delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(room.nodePos)];
    }

    ;
  }

  _construct(_game__WEBPACK_IMPORTED_MODULE_3__.default, _toConsumableArray(Object.values(_global_vars__WEBPACK_IMPORTED_MODULE_0__.GAME_OPTIONS)));
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

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(nextNodePos)]) {
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game.room = _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(nextNodePos)];
  } else {
    var neighbor = _defineProperty({}, exitDir, currRoom);

    _global_vars__WEBPACK_IMPORTED_MODULE_0__.SESSION.game.room = new _room__WEBPACK_IMPORTED_MODULE_2__.default(neighbor);
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

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[up] && _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[up].neighbors.down !== "X" && !room.neighbors.up) {
    room.neighbors.up = _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[up];
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[up].neighbors.down = room;
  }

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[down] && _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[down].neighbors.up !== "X" && !room.neighbors.down) {
    room.neighbors.down = _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[down];
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[down].neighbors.up = room;
  }

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[left] && _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[left].neighbors.right !== "X" && !room.neighbors.left) {
    room.neighbors.left = _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[left];
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[left].neighbors.right = room;
  }

  if (_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[right] && _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[right].neighbors.left !== "X" && !room.neighbors.right) {
    room.neighbors.right = _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[right];
    _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[right].neighbors.left = room;
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

  if (!_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[up] || _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[up].neighbors.down !== "X") {
    paths.push("U");
  }

  if (!_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[down] || _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[down].neighbors.up !== "X") {
    paths.push("D");
  }

  if (!_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[left] || _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[left].neighbors.right !== "X") {
    paths.push("L");
  }

  if (!_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[right] || _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[right].neighbors.left !== "X") {
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
var generateCoins = function generateCoins() {
  var numCoins = randNumCoins();
  var coins = {};

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
    var coin = new _coin__WEBPACK_IMPORTED_MODULE_5__.default(pos, 16, 16, _global_vars__WEBPACK_IMPORTED_MODULE_0__.SPRITES.coin);
    coins["".concat(coin.pos)] = coin;
  }

  return coins;
};
var shuffle = function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
  }
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
/* harmony export */   "ROOMS": () => (/* binding */ ROOMS),
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
var ROOMS = {};
var SESSION = {};
var SPRITES = {};
var BG_IMGS = {};
var COIN_WEIGHTS = {
  3: 10,
  2: 20,
  1: 30,
  0: 20
};
var ALL_PATHS = ["DLRU", "DLR", "DLU", "LRU", "DRU", "DL", "DR", "DU", "LR", "LU", "RU", "D", "L", "R", "U"];
var WEIGHTS = {
  4: {
    4: 45,
    3: 45,
    2: 9,
    1: 1
  },
  3: {
    3: 70,
    2: 25,
    1: 5
  },
  2: {
    2: 60,
    1: 40
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
    if (e.keyCode === 87 && !KEYS[87]) KEYS[e.keyCode] = true;
    if (e.keyCode === 65 && !KEYS[65]) KEYS[e.keyCode] = true;
    if (e.keyCode === 83 && !KEYS[83]) KEYS[e.keyCode] = true;
    if (e.keyCode === 68 && !KEYS[68]) KEYS[e.keyCode] = true;
    if (e.keyCode === 16 && !KEYS[16]) KEYS[e.keyCode] = true;
  });
  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 87 && KEYS[87]) KEYS[e.keyCode] = false;
    if (e.keyCode === 65 && KEYS[65]) KEYS[e.keyCode] = false;
    if (e.keyCode === 83 && KEYS[83]) KEYS[e.keyCode] = false;
    if (e.keyCode === 68 && KEYS[68]) KEYS[e.keyCode] = false;
    if (e.keyCode === 16 && KEYS[16]) KEYS[e.keyCode] = false;
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
/* harmony import */ var _scripts_utils_func_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/utils/func_utils */ "./src/scripts/utils/func_utils.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("display");
  canvas.width = _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.WIDTH;
  canvas.height = _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.HEIGHT;
  var ctx = canvas.getContext("2d");
  (0,_scripts_utils_install_listeners__WEBPACK_IMPORTED_MODULE_1__.default)(_scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.KEYS);
  var coinSprite = new Image();
  coinSprite.src = "./dist/assets/images/coin/coin.png";

  coinSprite.onload = function () {
    _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SPRITES.coin = coinSprite;
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
    setTimeout(function () {
      _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.GAME_OPTIONS.ctx = ctx;
      _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.GAME_OPTIONS.playerSprite = playerSprite;
      (0,_scripts_utils_func_utils__WEBPACK_IMPORTED_MODULE_3__.newGame)();
    }, 1000);
  };
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9jb2luLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2NvbGxpc2lvbl9ib3guanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW50aXR5LmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3Jvb20uanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvdXRpbHMvZnVuY191dGlscy5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9nbG9iYWxfdmFycy5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9pbnN0YWxsX2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy93YWxsLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz84NTU5Iiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwb3MiLCJ3aWR0aCIsImhlaWdodCIsInNwcml0ZVBhbGV0dGUiLCJjb2xCb3hXaWR0aCIsImNvbEJveEhlaWdodCIsImRyYXdPcHRpb25zIiwiaW1hZ2UiLCJwYWxYIiwicGFsWSIsIl9zV2lkdGgiLCJfc0hlaWdodCIsIngiLCJ5IiwiX2RXaWR0aCIsIl9kSGVpZ2h0IiwiY29sQm94IiwiQ29sQm94IiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiY29sbGlzaW9ucyIsImN4IiwiY3kiLCJ1cGRhdGVTaWRlcyIsInNpZGUiLCJvdGhlck9iamVjdCIsIm90aGVyU2lkZSIsImNvbGxpZGVkV2l0aFNpZGUiLCJjdHgiLCJkcmF3SW1hZ2UiLCJPYmplY3QiLCJ2YWx1ZXMiLCJjZW50ZXJPbkVudGl0eSIsImRyYXciLCJDb2luIiwiZnJhbWVJbnRlcnZhbCIsImZyYW1lQ291bnQiLCJjb2xsaWRlZE9uU2lkZSIsIkdsb2JhbCIsInJhbmRDb2luU291bmQiLCJwbGF5IiwiaSIsImMiLCJ3IiwiZW50aXR5Iiwib3JpZ2luUG9zIiwidG9wTGVmdCIsInRvcFJpZ2h0IiwiYm90dG9tUmlnaHQiLCJib3R0b21MZWZ0IiwiY2VudGVyIiwic2lkZXMiLCJzdHJva2VTdHlsZSIsInN0cm9rZVJlY3QiLCJleCIsImV5IiwiZXciLCJlaCIsInR3IiwidGgiLCJjb2xCb3hIb29rIiwiR2FtZSIsInBsYXllclNwcml0ZSIsInN0YXJ0aW5nUG9zIiwicGxheWVyIiwiUGxheWVyIiwic3RhcnRpbmdSb29tIiwiUm9vbSIsInJvb20iLCJnYW1lU3RlcCIsImJpbmQiLCJzdG9wIiwicmVxdWVzdElkIiwicmVxdWVzdFN0b3AiLCJ1bmRlZmluZWQiLCJjbGVhclJlY3QiLCJtb3ZlIiwid2FsbHMiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJzcGVlZCIsIm5vcm1hbGl6ZWRTcGVlZCIsInBhcnNlRmxvYXQiLCJNYXRoIiwic3FydCIsInBhY2UiLCJzcGVlZE1vZGlmaWVyIiwic3RyaWRlIiwidXAiLCJzdGVwQ291bnQiLCJkb3duIiwiZGlyIiwiZGlyZWN0aW9uIiwic2hpZnQiLCJ3YWxsIiwic3RyaWRlUGFsZXR0ZVBvcyIsImV4aXREaXIiLCJuZXdSb29tUG9zIiwicm9vbUNoYW5nZSIsIm5laWdoYm9yIiwiY29pbnMiLCJnZW5lcmF0ZUNvaW5zIiwicmFuZElkeCIsIm5laWdoYm9ycyIsImVudHJ5RGlyIiwia2V5cyIsInByZXZSb29tIiwibm9kZVBvcyIsImFkZFZhbGlkTmVpZ2hib3JzIiwibnVtUGF0aHMiLCJyYW5kUGF0aHMiLCJuZXdQYXRocyIsInBhdGhzIiwiYnVpbGRQYXRocyIsInBhdGhzQXJyIiwic3BsaXQiLCJmaWx0ZXIiLCJwYXRoIiwicmFuZE51bVBhdGhzIiwibGVuZ3RoIiwiZmxvb3IiLCJyYW5kb20iLCJiYWNrZ3JvdW5kIiwiYXNzaWduQmxvY2tlZFBhdGhzIiwiYnVpbGRSb29tV2FsbHMiLCJwdXNoIiwic2h1ZmZsZSIsInBvcCIsInNvcnQiLCJqb2luIiwiYW5pbWF0ZWRPYmplY3RzIiwiZm9yRWFjaCIsImNvaW4iLCJjb2xsZWN0Iiwib2JqZWN0IiwiZmlsbFN0eWxlIiwiZm9udCIsImZpbGxUZXh0IiwiV2FsbCIsIm5ld0dhbWUiLCJ0aGlzU2lkZSIsImNvbGxpZGVkIiwidXBwZXJEaWZmIiwibG93ZXJEaWZmIiwidXBwZXJCb3VuZHMiLCJsb3dlckJvdW5kcyIsInRoaXNZVmFsIiwidGhpc1hNaW4iLCJ0aGlzWE1heCIsIm90aGVyWVZhbCIsIm90aGVyWE1pbiIsIm90aGVyWE1heCIsInRoaXNYVmFsIiwidGhpc1lNaW4iLCJ0aGlzWU1heCIsIm90aGVyWFZhbCIsIm90aGVyWU1pbiIsIm90aGVyWU1heCIsImN1cnJSb29tIiwibmV4dE5vZGVQb3MiLCJtYXgiLCJ0b1N0cmluZyIsImluY2x1ZGVzIiwicmFuZE51bUNvaW5zIiwid2VpZ2h0ZWROdW1Db2lucyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJudW1Db2lucyIsImFyciIsImoiLCJXSURUSCIsIkhFSUdIVCIsIlNQUklURV9ESU1TIiwiRlBTIiwiS0VZUyIsIlJPT01TIiwiU0VTU0lPTiIsIlNQUklURVMiLCJCR19JTUdTIiwiQ09JTl9XRUlHSFRTIiwiQUxMX1BBVEhTIiwiV0VJR0hUUyIsIkdBTUVfT1BUSU9OUyIsIlJFUVVFU1QiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJob3dUbyIsImNsYXNzTGlzdCIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmUiLCJyZXN0YXJ0IiwicHJldmVudERlZmF1bHQiLCJiZWdpblBhdGgiLCJmaWxsUmVjdCIsImNhbnZhcyIsImdldENvbnRleHQiLCJpbnN0YWxsTGlzdGVuZXJzIiwiY29pblNwcml0ZSIsIkltYWdlIiwic3JjIiwib25sb2FkIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztJQUVNQSxNO0FBQ0osa0JBQVlDLEdBQVosRUFBZ0JDLEtBQWhCLEVBQXNCQyxNQUF0QixFQUE2QkMsYUFBN0IsRUFBNEM7QUFBQTs7QUFDMUMsU0FBS0gsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsUUFBTUUsV0FBVyxHQUFHSCxLQUFwQjtBQUNBLFFBQU1JLFlBQVksR0FBR0gsTUFBckI7QUFFQSxTQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLFNBQUtHLFdBQUwsR0FBbUI7QUFDakJDLFdBQUssRUFBRUosYUFEVTtBQUVqQkssVUFBSSxFQUFFLENBRlc7QUFHakJDLFVBQUksRUFBRSxDQUhXO0FBSWpCQyxhQUFPLEVBQUVULEtBSlE7QUFLakJVLGNBQVEsRUFBRVQsTUFMTztBQU1qQlUsT0FB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QyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUFBLGVBQW5CQSxDQUFtQjtBQVEzQjtBQTNCK0M7O0FBaUJsRCx3REFBbUM7QUFBQTtBQVdsQztBQTVCaUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUE4QmxELE1BQUlxQixZQUFZLEdBQUcsSUFBSTJJLEtBQUosRUFBbkI7QUFDQTNJLGNBQVksQ0FBQzRJLEdBQWIsR0FBbUIsMkNBQW5COztBQUVBNUksY0FBWSxDQUFDNkksTUFBYixHQUFzQixZQUFNO0FBQzFCQyxjQUFVLENBQUMsWUFBTTtBQUNmdEssOEVBQUEsR0FBNkJWLEdBQTdCO0FBQ0ZVLHVGQUFBLEdBQXNDd0IsWUFBdEM7QUFDQThFLHdFQUFPO0FBQ04sS0FKUyxFQUlSLElBSlEsQ0FBVjtBQU1ELEdBUEQ7QUFTRCxDQTFDRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29sQm94IGZyb20gXCIuL2NvbGxpc2lvbl9ib3hcIjtcbmltcG9ydCB7IGNvbGxpZGVkV2l0aFNpZGUsIHJhbmRDb2luU291bmQgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcblxuY2xhc3MgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnN0IGNvbEJveFdpZHRoID0gd2lkdGg7XG4gICAgY29uc3QgY29sQm94SGVpZ2h0ID0gaGVpZ2h0O1xuICAgIFxuICAgIHRoaXMuc3ByaXRlUGFsZXR0ZSA9IHNwcml0ZVBhbGV0dGU7XG4gICAgdGhpcy5kcmF3T3B0aW9ucyA9IHtcbiAgICAgIGltYWdlOiBzcHJpdGVQYWxldHRlLFxuICAgICAgcGFsWDogMCxcbiAgICAgIHBhbFk6IDAsXG4gICAgICBfc1dpZHRoOiB3aWR0aCxcbiAgICAgIF9zSGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiBwb3NbMF0sXG4gICAgICB5OiBwb3NbMV0sXG4gICAgICBfZFdpZHRoOiB3aWR0aCxcbiAgICAgIF9kSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICB0aGlzLmNvbEJveCA9IG5ldyBDb2xCb3godGhpcyxjb2xCb3hXaWR0aCxjb2xCb3hIZWlnaHQpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY29sbGlzaW9ucyA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcbiAgICBcbiAgfVxuXG4gIGNvbEJveEhvb2soKSB7IC8vIHRoaXMgd2lsbCBjZW50ZXIgdGhlIGNvbEJveCBvbiB0aGUgYm90dG9tXG4gICAgbGV0IFt4LHldID0gW3RoaXMucG9zWzBdLHRoaXMucG9zWzFdXTtcbiAgICBsZXQgW2N4LGN5XSA9IFtcbiAgICAgIHgrKCh0aGlzLndpZHRoIC0gdGhpcy5jb2xCb3gud2lkdGgpLzIpLFxuICAgICAgeSsodGhpcy5oZWlnaHQgLSB0aGlzLmNvbEJveC5oZWlnaHQpLFxuICAgIF07XG4gICAgcmV0dXJuIFtjeCxjeV07XG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICB0aGlzLmNvbEJveC51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICB9XG5cbiAgY29sbGlkZWRPblNpZGUoc2lkZSwgb3RoZXJPYmplY3QpIHtcbiAgICBsZXQgb3RoZXJTaWRlO1xuICAgIHN3aXRjaChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwiYm90dG9tXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInRvcFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwicmlnaHRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJsZWZ0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3RoZXJTaWRlID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sbGlzaW9uc1tzaWRlXSA9IGNvbGxpZGVkV2l0aFNpZGUoc2lkZSwgdGhpc1tzaWRlXSwgb3RoZXJPYmplY3Rbb3RoZXJTaWRlXSk7XG4gICAgcmV0dXJuIHRoaXMuY29sbGlzaW9uc1tzaWRlXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSguLi5PYmplY3QudmFsdWVzKHRoaXMuZHJhd09wdGlvbnMpKTtcbiAgICB0aGlzLmNvbEJveC5jZW50ZXJPbkVudGl0eSgpO1xuICAgIHRoaXMuY29sQm94LmRyYXcoY3R4KTtcbiAgfVxufVxuXG5jbGFzcyBDb2luIGV4dGVuZHMgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGVQYWxldHRlKSB7XG4gICAgc3VwZXIocG9zLCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGVQYWxldHRlKTtcbiAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMjtcbiAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IDA7XG4gIH1cblxuICBjb2xsZWN0KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJ0b3BcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpIHx8XG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwiYm90dG9tXCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKSB8fFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpIHx8XG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwicmlnaHRcIiwgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5ZXIpXG4gICAgKSB7XG4gICAgICByYW5kQ29pblNvdW5kKCkucGxheSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgY29uc3QgaSA9IHRoaXMuZnJhbWVJbnRlcnZhbDtcbiAgICBjb25zdCBjID0gdGhpcy5mcmFtZUNvdW50O1xuICAgIGNvbnN0IHcgPSB0aGlzLndpZHRoO1xuICAgIGlmIChjIDwgaSkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDA7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjIpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAxO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSozKSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMjtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDM7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjUpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA0O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo2KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNTtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNykge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDY7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjgpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA3O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAwO1xuICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29pbjsiLCJcblxuY2xhc3MgQ29sQm94IHtcbiAgY29uc3RydWN0b3IoZW50aXR5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbnRpdHkgPSBlbnRpdHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucG9zID0gdGhpcy5vcmlnaW5Qb3MoKTtcblxuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grd2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt3aWR0aCx5K2hlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkraGVpZ2h0XTtcbiAgICBcbiAgICB0aGlzLmNlbnRlciA9IFt4Kyh3aWR0aC8yKSx5KyhoZWlnaHQvMildO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICAgIHRoaXMuc2lkZXMgPSBbdGhpcy50b3AsIHRoaXMuYm90dG9tLCB0aGlzLnJpZ2h0LCB0aGlzLmxlZnRdO1xuICAgIFxuICB9XG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIGN0eC5zdHJva2VSZWN0KFxuICAgICAgdGhpcy5wb3NbMF0sXG4gICAgICB0aGlzLnBvc1sxXSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodCxcbiAgICApXG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3RoaXMud2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt0aGlzLndpZHRoLHkrdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K3RoaXMuaGVpZ2h0XTtcbiAgICB0aGlzLmNlbnRlciA9IFt4Kyh0aGlzLndpZHRoLzIpLHkrKHRoaXMuaGVpZ2h0LzIpXTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgfVxuXG4gIG9yaWdpblBvcygpIHtcbiAgICBjb25zdCBbZXgsZXldID0gW3RoaXMuZW50aXR5LnBvc1swXSwgdGhpcy5lbnRpdHkucG9zWzFdXTtcbiAgICBjb25zdCBbZXcsZWhdID0gW3RoaXMuZW50aXR5LndpZHRoLCB0aGlzLmVudGl0eS5oZWlnaHRdO1xuICAgIGNvbnN0IFt0dyx0aF0gPSBbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IHggPSBleCArICgoZXctdHcpLzIpO1xuICAgIGNvbnN0IHkgPSBleSArIGVoIC0gdGg7XG4gICAgcmV0dXJuIFt4LHldO1xuICB9XG5cbiAgY2VudGVyT25FbnRpdHkoKSB7XG4gICAgdGhpcy5wb3MgPSB0aGlzLmVudGl0eS5jb2xCb3hIb29rKCk7XG4gICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sQm94OyIsImltcG9ydCBDb2xCb3ggZnJvbSBcIi4vY29sbGlzaW9uX2JveFwiO1xuaW1wb3J0IHsgY29sbGlkZWRXaXRoU2lkZSB9IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuY2xhc3MgRW50aXR5IHtcbiAgY29uc3RydWN0b3IocG9zLHdpZHRoLGhlaWdodCxzcHJpdGVQYWxldHRlKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnN0IGNvbEJveFdpZHRoID0gd2lkdGgvMjtcbiAgICBjb25zdCBjb2xCb3hIZWlnaHQgPSBoZWlnaHQvMztcbiAgICBcbiAgICB0aGlzLnNwcml0ZVBhbGV0dGUgPSBzcHJpdGVQYWxldHRlO1xuICAgIHRoaXMuZHJhd09wdGlvbnMgPSB7XG4gICAgICBpbWFnZTogc3ByaXRlUGFsZXR0ZSxcbiAgICAgIHBhbFg6IDAsXG4gICAgICBwYWxZOiAwLFxuICAgICAgX3NXaWR0aDogd2lkdGgsXG4gICAgICBfc0hlaWdodDogaGVpZ2h0LFxuICAgICAgeDogcG9zWzBdLFxuICAgICAgeTogcG9zWzFdLFxuICAgICAgX2RXaWR0aDogd2lkdGgsXG4gICAgICBfZEhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgdGhpcy5jb2xCb3ggPSBuZXcgQ29sQm94KHRoaXMsY29sQm94V2lkdGgsY29sQm94SGVpZ2h0KTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSB7XG4gICAgICB0b3A6IGZhbHNlLFxuICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgIH07XG4gICAgXG4gIH1cblxuICBjb2xCb3hIb29rKCkgeyAvLyB0aGlzIHdpbGwgY2VudGVyIHRoZSBjb2xCb3ggb24gdGhlIGJvdHRvbVxuICAgIGxldCBbeCx5XSA9IFt0aGlzLnBvc1swXSx0aGlzLnBvc1sxXV07XG4gICAgbGV0IFtjeCxjeV0gPSBbXG4gICAgICB4KygodGhpcy53aWR0aCAtIHRoaXMuY29sQm94LndpZHRoKS8yKSxcbiAgICAgIHkrKHRoaXMuaGVpZ2h0IC0gdGhpcy5jb2xCb3guaGVpZ2h0KSxcbiAgICBdO1xuICAgIHJldHVybiBbY3gsY3ldO1xuICB9XG5cbiAgdXBkYXRlU2lkZXMoKSB7XG4gICAgdGhpcy5jb2xCb3gudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgfVxuXG4gIGNvbGxpZGVkT25TaWRlKHNpZGUsIG90aGVyT2JqZWN0KSB7XG4gICAgbGV0IG90aGVyU2lkZTtcbiAgICBzd2l0Y2goc2lkZSkge1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImJvdHRvbVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJ0b3BcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInJpZ2h0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwibGVmdFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG90aGVyU2lkZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNvbGxpc2lvbnNbc2lkZV0gPSBjb2xsaWRlZFdpdGhTaWRlKHNpZGUsIHRoaXNbc2lkZV0sIG90aGVyT2JqZWN0W290aGVyU2lkZV0pO1xuICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbnNbc2lkZV07XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UoLi4uT2JqZWN0LnZhbHVlcyh0aGlzLmRyYXdPcHRpb25zKSk7XG4gICAgdGhpcy5jb2xCb3guY2VudGVyT25FbnRpdHkoKTtcbiAgICB0aGlzLmNvbEJveC5kcmF3KGN0eCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW50aXR5OyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgUm9vbSBmcm9tIFwiLi9yb29tXCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgcGxheWVyU3ByaXRlKSB7XG4gICAgY29uc3Qgc3RhcnRpbmdQb3MgPSBbNDgqNywgNDgqN107XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHN0YXJ0aW5nUG9zLCAuLi5HbG9iYWwuU1BSSVRFX0RJTVMsIHBsYXllclNwcml0ZSk7XG4gICAgR2xvYmFsLlNFU1NJT04ucGxheWVyID0gdGhpcy5wbGF5ZXI7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgLy8gY29uc3Qgcm9vbSA9IHsgXCJsZWZ0XCI6IG5ldyBSb29tKCkgfTsgLy8gdGVzdGluZyBuZXcgUm9vbShyb29tKVxuICAgIHRoaXMuc3RhcnRpbmdSb29tID0gbmV3IFJvb20oKTtcbiAgICB0aGlzLnJvb20gPSB0aGlzLnN0YXJ0aW5nUm9vbTtcbiAgICB0aGlzLnBsYXllci5kcmF3KGN0eCk7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZSA9IHRoaXM7XG4gICAgR2xvYmFsLlNFU1NJT04uc3RvcCA9IGZhbHNlO1xuICAgIEdsb2JhbC5TRVNTSU9OLmNvaW5Db3VudCA9IDA7XG4gICAgdGhpcy5nYW1lU3RlcCA9IHRoaXMuZ2FtZVN0ZXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3AgPSB0aGlzLnN0b3AuYmluZCh0aGlzKTtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXkoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMucmVxdWVzdElkKSB7XG4gICAgICB0aGlzLnJlcXVlc3RTdG9wID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnYW1lU3RlcCgpIHtcbiAgICB0aGlzLnJlcXVlc3RJZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoIXRoaXMucmVxdWVzdElkKSB7XG4gICAgICBjb25zdCBwbGF5ZXIgPSBHbG9iYWwuU0VTU0lPTi5wbGF5ZXI7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwwLCBHbG9iYWwuV0lEVEgsIEdsb2JhbC5IRUlHSFQpO1xuICAgICAgcGxheWVyLm1vdmUodGhpcy5yb29tLndhbGxzKTtcbiAgICAgIHRoaXMucm9vbS5hbmltYXRlKCk7XG4gICAgICB0aGlzLnJvb20uZHJhdyh0aGlzLmN0eCk7XG4gICAgICBwbGF5ZXIuZHJhdyh0aGlzLmN0eCk7XG4gICAgICB0aGlzLnJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVTdGVwKTtcbiAgICAgIGlmICh0aGlzLnJlcXVlc3RTdG9wKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5nYW1lU3RlcCgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVTdGVwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCB7IHJvb21DaGFuZ2UgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHN1cGVyKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSk7XG4gICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgdGhpcy5ub3JtYWxpemVkU3BlZWQgPSBwYXJzZUZsb2F0KHRoaXMuc3BlZWQpIC8gTWF0aC5zcXJ0KDIpO1xuICAgIHRoaXMucGFjZSA9IDI0L3RoaXMuc3BlZWQ7XG4gICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMTtcbiAgICB0aGlzLnN0cmlkZSA9IHtcbiAgICAgIHVwOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiA2LFxuICAgICAgfSxcbiAgICAgIGRvd246IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDAsXG4gICAgICB9LFxuICAgICAgbGVmdDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogMixcbiAgICAgIH0sXG4gICAgICByaWdodDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogNCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG5ld1Jvb21Qb3MoZGlyKSB7XG4gICAgc3dpdGNoKGRpcikge1xuICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgIHRoaXMucG9zWzFdID0gNzIwLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgIHRoaXMucG9zWzFdID0gLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHRoaXMucG9zWzBdID0gNzIwLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB0aGlzLnBvc1swXSA9IC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RyaWRlUGFsZXR0ZVBvcyhkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnBhY2UgPSAyNCAvICh0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyKTtcbiAgICBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDIgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gMyAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSA0ICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID4gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPSAwO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9XG4gIH1cblxuICBtb3ZlKHdhbGxzKSB7XG4gICAgY29uc3QgW1xuICAgICAgdXAsXG4gICAgICBkb3duLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0LFxuICAgICAgc2hpZnRcbiAgICBdID0gW1xuICAgICAgR2xvYmFsLktFWVNbODddLFxuICAgICAgR2xvYmFsLktFWVNbODNdLFxuICAgICAgR2xvYmFsLktFWVNbNjVdLFxuICAgICAgR2xvYmFsLktFWVNbNjhdLFxuICAgICAgR2xvYmFsLktFWVNbMTZdLFxuICAgIF07XG4gICAgaWYgKHNoaWZ0KSB7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxO1xuICAgIH1cblxuICAgIFxuXG4gICAgLy8gVyBrZXkgbW92ZW1lbnRzIGFuZCBzcHJpdGUgZGlyZWN0aW9uXG4gICAgaWYgKHVwKSB7XG4gICAgICBpZiAobGVmdCB8fCByaWdodCkge1xuICAgICAgICB0aGlzLmNvbEJveC5wb3NbMV0gKz0gLXRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzFdICs9IC10aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwidG9wXCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnRvcCkge1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy50b3AgLSAodGhpcy5oZWlnaHQtdGhpcy5jb2xCb3guaGVpZ2h0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0ICYmICF0aGlzLmNvbGxpc2lvbnMudG9wKSB7XG4gICAgICAgICAgdGhpcy5wb3NbMV0gKz0gLXRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBvc1sxXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLnVwLnBhbFk7XG4gICAgICBpZiAoIWxlZnQgJiYgIXJpZ2h0KSB7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcInVwXCIpO1xuICAgICAgICBcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTIGtleSBtb3ZlbWVudHMgYW5kIHNwcml0ZSBkaXJlY3Rpb25cbiAgICBpZiAoZG93bikge1xuICAgICAgaWYgKGxlZnQgfHwgcmlnaHQpIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzFdICs9IHRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzFdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJib3R0b21cIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMuYm90dG9tKSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy5ib3R0b207XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLmJvdHRvbS00ODtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5wb3NbMV0gKz0gdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucG9zWzFdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5kb3duLnBhbFk7XG4gICAgICBpZiAoIWxlZnQgJiYgIXJpZ2h0KSB7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImRvd25cIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQSBrZXkgbW92ZW1lbnRcbiAgICBpZiAobGVmdCkge1xuICAgICAgaWYgKHVwIHx8IGRvd24pIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzBdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1swXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICB0aGlzLmNvbEJveC5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMubGVmdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1cCB8fCBkb3duICYmICF0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICAgIHRoaXMucG9zWzBdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucG9zWzBdICs9IC10aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmxlZnQucGFsWTtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gRCBrZXkgbW92ZW1lbnRcbiAgICBpZiAocmlnaHQpIHtcbiAgICAgIGlmICh1cCB8fCBkb3duKSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1swXSArPSB0aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1swXSArPSB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwicmlnaHRcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMucmlnaHQpIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLnJpZ2h0O1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5yaWdodC0odGhpcy5jb2xCb3gud2lkdGggKyB0aGlzLmNvbEJveC53aWR0aC8yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1cCB8fCBkb3duKSB7XG4gICAgICAgICAgdGhpcy5wb3NbMF0gKz0gdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucG9zWzBdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5yaWdodC5wYWxZO1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwicmlnaHRcIik7XG4gICAgfVxuXG4gICAgLy8gaWYgbm9uZSBvZiB0aGUga2V5cyBhcmUgYmVpbmcgcHJlc3NlZCwgZ28gdG8gZGVmYXVsdCBzdGFuY2VcbiAgICBpZiAoIXVwICYmICFkb3duICYmICFyaWdodCAmJiAhbGVmdCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gNDggKiAxO1xuICAgIH1cblxuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgbGV0IGV4aXREaXI7XG4gICAgaWYgKHggPCAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcImxlZnRcIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9IGVsc2UgaWYgKHggPiA3MjAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcInJpZ2h0XCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfSBlbHNlIGlmICh5IDwgLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJ1cFwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH0gZWxzZSBpZiAoeSA+IDcyMC0yNCkge1xuICAgICAgZXhpdERpciA9IFwiZG93blwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnggPSB0aGlzLnBvc1swXTtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnkgPSB0aGlzLnBvc1sxXTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCBXYWxsIGZyb20gXCIuL3dhbGxcIjtcblxuaW1wb3J0IHtcbiAgcmFuZE51bVBhdGhzLFxuICBhZGRWYWxpZE5laWdoYm9ycyxcbiAgYnVpbGRQYXRocyxcbiAgc2h1ZmZsZSxcbiAgYXNzaWduQmxvY2tlZFBhdGhzLFxuICBnZW5lcmF0ZUNvaW5zLFxufSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmNsYXNzIFJvb20ge1xuICBjb25zdHJ1Y3RvcihuZWlnaGJvcikge1xuICAgIHRoaXMuY29pbnMgPSBnZW5lcmF0ZUNvaW5zKCk7XG4gICAgdGhpcy53YWxscyA9IFtdO1xuICAgIGxldCByYW5kSWR4O1xuICAgIHRoaXMubmVpZ2hib3JzID0ge1xuICAgICAgdXA6IHVuZGVmaW5lZCxcbiAgICAgIGRvd246IHVuZGVmaW5lZCxcbiAgICAgIGxlZnQ6IHVuZGVmaW5lZCxcbiAgICAgIHJpZ2h0OiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICBsZXQgZW50cnlEaXI7XG4gICAgaWYgKG5laWdoYm9yKSB7XG4gICAgICBjb25zdCBleGl0RGlyID0gT2JqZWN0LmtleXMobmVpZ2hib3IpWzBdO1xuICAgICAgY29uc3QgcHJldlJvb20gPSBPYmplY3QudmFsdWVzKG5laWdoYm9yKVswXTtcbiAgICAgIHRoaXMubm9kZVBvcyA9IFsuLi5wcmV2Um9vbS5ub2RlUG9zXTtcbiAgICAgIHN3aXRjaChleGl0RGlyKSB7XG4gICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgIHRoaXMubmVpZ2hib3JzLmRvd24gPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiRFwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1sxXSsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgIHRoaXMubmVpZ2hib3JzLnVwID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIlVcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMV0tLTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5yaWdodCA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJSXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzBdLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgIHRoaXMubmVpZ2hib3JzLmxlZnQgPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiTFwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1swXSsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vZGVQb3MgPSBbMCwwXTtcbiAgICB9XG4gICAgXG4gICAgR2xvYmFsLlJPT01TW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG5cbiAgICBhZGRWYWxpZE5laWdoYm9ycyh0aGlzKTtcbiAgICBsZXQgd2FsbHMsIG51bVBhdGhzLCByYW5kUGF0aHM7XG4gICAgbGV0IG5ld1BhdGhzID0gW107XG4gICAgbGV0IHBhdGhzID0gYnVpbGRQYXRocyh0aGlzKTtcbiAgICBsZXQgcGF0aHNBcnIgPSBwYXRocy5zcGxpdChcIlwiKTtcbiAgICBpZiAobmVpZ2hib3IpIHtcbiAgICAgIC8vIGlmIG5vdCBpbml0aWFsIHJvb21cbiAgICAgIHBhdGhzQXJyID0gcGF0aHNBcnIuZmlsdGVyKHBhdGggPT4gcGF0aCAhPT0gZW50cnlEaXIpOyAvLyByZW1vdmUgZW50cnlEaXIgZnJvbSBwYXRoc1xuICAgICAgbnVtUGF0aHMgPSByYW5kTnVtUGF0aHMocGF0aHMubGVuZ3RoKTsgLy8gd2VpZ2h0ZWQgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IsIHByZWZlcnMgbW9yZSBwYXRoc1xuICAgICAgaWYgKG51bVBhdGhzID09PSBwYXRocy5sZW5ndGgpIHsgLy8gaWYgYWxsIDQgcGF0aHMgYXJlIGF2YWlsYWJsZVxuICAgICAgICByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBHbG9iYWwuQkdfSU1HU1tgJHtudW1QYXRoc30ke3BhdGhzfSR7cmFuZElkeH1gXTtcbiAgICAgICAgYXNzaWduQmxvY2tlZFBhdGhzKHRoaXMsIHBhdGhzKTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKHBhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlJPT01TW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9IGVsc2UgeyAvLyBsZXNzIHRoYW4gNCBwYXRocyBhdmFpbGFibGVcbiAgICAgICAgc2h1ZmZsZShwYXRoc0Fycik7IC8vIHJhbmRvbWl6ZSB0aGUgcGF0aCBjaG9pY2VzXG4gICAgICAgIG5ld1BhdGhzLnB1c2goZW50cnlEaXIpOyAvLyBNVVNUIEFMV0FZUyBoYXZlIHRoZSBwYXRoIHlvdSBlbnRlciBmcm9tXG4gICAgICAgIG51bVBhdGhzLS07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGF0aHM7IGkrKykgeyBuZXdQYXRocy5wdXNoKHBhdGhzQXJyLnBvcCgpKSB9XG4gICAgICAgIG5ld1BhdGhzID0gbmV3UGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzKzF9JHtuZXdQYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGlmICghdGhpcy5iYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgYXNzaWduQmxvY2tlZFBhdGhzKHRoaXMsIG5ld1BhdGhzKTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKG5ld1BhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlJPT01TW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bVBhdGhzID0gcmFuZE51bVBhdGhzKHBhdGhzLmxlbmd0aCk7XG4gICAgICBpZiAobnVtUGF0aHMgPT09IHBhdGhzLmxlbmd0aCkge1xuICAgICAgICByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBHbG9iYWwuQkdfSU1HU1tgJHtudW1QYXRoc30ke3BhdGhzfSR7cmFuZElkeH1gXTtcbiAgICAgICAgd2FsbHMgPSB0aGlzLmJ1aWxkUm9vbVdhbGxzKHBhdGhzKTtcbiAgICAgICAgdGhpcy53YWxscy5wdXNoKC4uLndhbGxzKTtcbiAgICAgICAgR2xvYmFsLlJPT01TW2Ake3RoaXMubm9kZVBvc31gXSA9IHRoaXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaHVmZmxlKHBhdGhzQXJyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXRoczsgaSsrKSB7IG5ld1BhdGhzLnB1c2gocGF0aHNBcnIucG9wKCkpIH1cbiAgICAgICAgbmV3UGF0aHMgPSBuZXdQYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtuZXdQYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBuZXdQYXRocyk7XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhuZXdQYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5ST09NU1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFuaW1hdGVkT2JqZWN0cyA9IHt9O1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5jb2lucykuZm9yRWFjaChjb2luID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0ZWRPYmplY3RzW2Bjb2luLSR7Y29pbi5wb3N9YF0gPSBjb2luO1xuICAgIH0pO1xuXG4gICAgXG5cbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgdGhpcy5jb2xsZWN0KCk7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLmFuaW1hdGVkT2JqZWN0cykuZm9yRWFjaChvYmplY3QgPT4gb2JqZWN0LmFuaW1hdGUoKSlcbiAgfVxuXG4gIGNvbGxlY3QoKSB7XG4gICAgZm9yIChsZXQgY29pbiBvZiBPYmplY3QudmFsdWVzKHRoaXMuY29pbnMpKSB7XG4gICAgICBpZiAoY29pbi5jb2xsZWN0KCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYW5pbWF0ZWRPYmplY3RzW2Bjb2luLSR7Y29pbi5wb3N9YF07XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvaW5zW2Ake2NvaW4ucG9zfWBdO1xuICAgICAgICBHbG9iYWwuU0VTU0lPTi5jb2luQ291bnQrKztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZCwgMCwgMCk7XG4gICAgLy8gdGhpcy53YWxscy5mb3JFYWNoKHdhbGwgPT4gd2FsbC5kcmF3KGN0eCkpO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5hbmltYXRlZE9iamVjdHMpLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5kcmF3KGN0eCkpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZhZjRcIjtcbiAgICBjdHguZm9udCA9IFwiMjBweCBhcmlhbFwiO1xuICAgIGN0eC5maWxsVGV4dChgUm9vbSBbICR7dGhpcy5ub2RlUG9zfSBdYCwgMTUsIDMwKTtcbiAgICBjdHguZmlsbFRleHQoYENvaW5zIHggJHtHbG9iYWwuU0VTU0lPTi5jb2luQ291bnR9YCwgNTkwLCAzMCk7XG4gIH1cblxuICBidWlsZFJvb21XYWxscyhwYXRocykge1xuICAgIGxldCB3YWxscyA9IFtdO1xuICAgIHN3aXRjaChwYXRocykge1xuICAgICAgY2FzZSBcIkRMUlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRMVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiUlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJMUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiUlwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgfVxuICB9XG5cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFJvb207IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vd2FsbFwiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4uL3Jvb21cIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9nYW1lXCI7XG5pbXBvcnQgRW50aXR5IGZyb20gXCIuLi9lbnRpdHlcIjtcbmltcG9ydCBDb2luIGZyb20gXCIuLi9jb2luXCI7XG5cblxuZXhwb3J0IGNvbnN0IG5ld0dhbWUgPSAoKSA9PiB7XG4gIGlmIChHbG9iYWwuU0VTU0lPTi5nYW1lKSB7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5zdG9wKCk7XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wiZ2FtZVwiXTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT05bXCJwbGF5ZXJcIl07XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wiY29pbkNvdW50XCJdO1xuICAgIGZvciAobGV0IHJvb20gaW4gR2xvYmFsLlJPT01TKSB7XG4gICAgICBkZWxldGUgR2xvYmFsLlJPT01TW2Ake3Jvb20ubm9kZVBvc31gXTtcbiAgICB9O1xuICB9XG4gIG5ldyBHYW1lKC4uLk9iamVjdC52YWx1ZXMoR2xvYmFsLkdBTUVfT1BUSU9OUykpO1xufVxuXG5leHBvcnQgY29uc3QgY29sbGlkZWRXaXRoU2lkZSA9IChzaWRlLCB0aGlzU2lkZSwgb3RoZXJTaWRlKSA9PiB7XG4gIGxldCBjb2xsaWRlZCA9IGZhbHNlO1xuICBsZXQgdXBwZXJEaWZmLCBsb3dlckRpZmY7XG4gIGNvbnN0IHVwcGVyQm91bmRzID0gMTA7XG4gIGNvbnN0IGxvd2VyQm91bmRzID0gMDtcbiAgaWYgKHNpZGUgPT09IFwidG9wXCIgfHwgc2lkZSA9PT0gXCJib3R0b21cIikge1xuICAgIGNvbnN0IHRoaXNZVmFsID0gdGhpc1NpZGVbMV07XG4gICAgY29uc3QgW3RoaXNYTWluLCB0aGlzWE1heF0gPSB0aGlzU2lkZVswXTtcbiAgICBjb25zdCBvdGhlcllWYWwgPSBvdGhlclNpZGVbMV07XG4gICAgY29uc3QgW290aGVyWE1pbiwgb3RoZXJYTWF4XSA9IG90aGVyU2lkZVswXTtcbiAgICBcbiAgICBzd2l0Y2ggKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKG90aGVyWVZhbCAtIHRoaXNZVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAob3RoZXJZVmFsIC0gdGhpc1lWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNZVmFsIDwgb3RoZXJZVmFsKSAmJlxuICAgICAgICAgICh0aGlzWE1pbiA8IG90aGVyWE1heCkgJiZcbiAgICAgICAgICAodGhpc1hNYXggPiBvdGhlclhNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIHVwcGVyRGlmZiA9ICh0aGlzWVZhbCAtIG90aGVyWVZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKHRoaXNZVmFsIC0gb3RoZXJZVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWVZhbCA+IG90aGVyWVZhbCkgJiZcbiAgICAgICAgICAodGhpc1hNaW4gPCBvdGhlclhNYXgpICYmXG4gICAgICAgICAgKHRoaXNYTWF4ID4gb3RoZXJYTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvbGxpZGVkKSByZXR1cm4gb3RoZXJZVmFsO1xuXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdGhpc1hWYWwgPSB0aGlzU2lkZVswXTtcbiAgICBjb25zdCBbdGhpc1lNaW4sIHRoaXNZTWF4XSA9IHRoaXNTaWRlWzFdO1xuICAgIGNvbnN0IG90aGVyWFZhbCA9IG90aGVyU2lkZVswXTtcbiAgICBjb25zdCBbb3RoZXJZTWluLCBvdGhlcllNYXhdID0gb3RoZXJTaWRlWzFdO1xuICAgIFxuICAgIHN3aXRjaCAoc2lkZSkge1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKG90aGVyWFZhbCAtIHRoaXNYVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAob3RoZXJYVmFsIC0gdGhpc1hWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNYVmFsIDwgb3RoZXJYVmFsKSAmJlxuICAgICAgICAgICh0aGlzWU1pbiA8IG90aGVyWU1heCkgJiZcbiAgICAgICAgICAodGhpc1lNYXggPiBvdGhlcllNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB1cHBlckRpZmYgPSAodGhpc1hWYWwgLSBvdGhlclhWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9ICh0aGlzWFZhbCAtIG90aGVyWFZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1hWYWwgPiBvdGhlclhWYWwpICYmXG4gICAgICAgICAgKHRoaXNZTWluIDwgb3RoZXJZTWF4KSAmJlxuICAgICAgICAgICh0aGlzWU1heCA+IG90aGVyWU1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvbGxpZGVkKSByZXR1cm4gb3RoZXJYVmFsO1xuICAgIFxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xuXG59O1xuXG5leHBvcnQgY29uc3Qgcm9vbUNoYW5nZSA9IChleGl0RGlyLCBjdXJyUm9vbSkgPT4ge1xuICBsZXQgbmV4dE5vZGVQb3MgPSBbLi4uY3VyclJvb20ubm9kZVBvc107XG4gIHN3aXRjaChleGl0RGlyKSB7XG4gICAgY2FzZSBcInVwXCI6XG4gICAgICBuZXh0Tm9kZVBvc1sxXSArPSAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImRvd25cIjpcbiAgICAgIG5leHROb2RlUG9zWzFdIC09IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMF0gLT0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMF0gKz0gMTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChHbG9iYWwuUk9PTVNbYCR7bmV4dE5vZGVQb3N9YF0pIHtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20gPSBHbG9iYWwuUk9PTVNbYCR7bmV4dE5vZGVQb3N9YF07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbmVpZ2hib3IgPSB7IFtleGl0RGlyXTogY3VyclJvb20gfTtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20gPSBuZXcgUm9vbShuZWlnaGJvcik7XG4gICAgYWRkVmFsaWROZWlnaGJvcnMoY3VyclJvb20pO1xuICAgIGFkZFZhbGlkTmVpZ2hib3JzKEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByYW5kTnVtUGF0aHMgPSBtYXggPT4ge1xuICBsZXQgcGF0aHMgPSBbXTtcbiAgaWYgKG1heCA+IDMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bNF07IGkrKykgeyBwYXRocy5wdXNoKDQpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bM107IGkrKykgeyBwYXRocy5wdXNoKDMpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMl07IGkrKykgeyBwYXRocy5wdXNoKDIpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMV07IGkrKykgeyBwYXRocy5wdXNoKDEpIH1cbiAgfSBlbHNlIGlmIChtYXggPiAyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzNdOyBpKyspIHsgcGF0aHMucHVzaCgzKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzJdOyBpKyspIHsgcGF0aHMucHVzaCgyKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzFdOyBpKyspIHsgcGF0aHMucHVzaCgxKSB9XG4gIH0gZWxzZSBpZiAobWF4ID4gMSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsyXTsgaSsrKSB7IHBhdGhzLnB1c2goMikgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsxXTsgaSsrKSB7IHBhdGhzLnB1c2goMSkgfVxuICB9IGVsc2Uge1xuICAgIHBhdGhzLnB1c2goMSk7XG4gIH1cblxuICBzaHVmZmxlKHBhdGhzKTtcblxuICByZXR1cm4gcGF0aHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnBhdGhzLmxlbmd0aCldO1xuICBcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRWYWxpZE5laWdoYm9ycyA9IHJvb20gPT4ge1xuICBsZXQgdXAgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgdXBbMV0gKz0gMTtcbiAgdXAgPSB1cC50b1N0cmluZygpO1xuICBsZXQgZG93biA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBkb3duWzFdIC09IDE7XG4gIGRvd24gPSBkb3duLnRvU3RyaW5nKCk7XG4gIGxldCBsZWZ0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGxlZnRbMF0gLT0gMTtcbiAgbGVmdCA9IGxlZnQudG9TdHJpbmcoKTtcbiAgbGV0IHJpZ2h0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHJpZ2h0WzBdICs9IDE7XG4gIHJpZ2h0ID0gcmlnaHQudG9TdHJpbmcoKTtcbiAgaWYgKFxuICAgIEdsb2JhbC5ST09NU1t1cF0gJiYgXG4gICAgKEdsb2JhbC5ST09NU1t1cF0ubmVpZ2hib3JzLmRvd24gIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMudXBcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMudXAgPSBHbG9iYWwuUk9PTVNbdXBdO1xuICAgIEdsb2JhbC5ST09NU1t1cF0ubmVpZ2hib3JzLmRvd24gPSByb29tO1xuICB9XG4gIGlmIChcbiAgICBHbG9iYWwuUk9PTVNbZG93bl0gJiYgXG4gICAgKEdsb2JhbC5ST09NU1tkb3duXS5uZWlnaGJvcnMudXAgIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMuZG93blxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy5kb3duID0gR2xvYmFsLlJPT01TW2Rvd25dO1xuICAgIEdsb2JhbC5ST09NU1tkb3duXS5uZWlnaGJvcnMudXAgPSByb29tO1xuICB9XG4gIGlmIChcbiAgICBHbG9iYWwuUk9PTVNbbGVmdF0gJiYgXG4gICAgKEdsb2JhbC5ST09NU1tsZWZ0XS5uZWlnaGJvcnMucmlnaHQgIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMubGVmdFxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy5sZWZ0ID0gR2xvYmFsLlJPT01TW2xlZnRdO1xuICAgIEdsb2JhbC5ST09NU1tsZWZ0XS5uZWlnaGJvcnMucmlnaHQgPSByb29tO1xuICB9XG4gIGlmIChcbiAgICBHbG9iYWwuUk9PTVNbcmlnaHRdICYmIFxuICAgIChHbG9iYWwuUk9PTVNbcmlnaHRdLm5laWdoYm9ycy5sZWZ0ICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLnJpZ2h0XG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLnJpZ2h0ID0gR2xvYmFsLlJPT01TW3JpZ2h0XTtcbiAgICBHbG9iYWwuUk9PTVNbcmlnaHRdLm5laWdoYm9ycy5sZWZ0ID0gcm9vbTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkUGF0aHMgPSByb29tID0+IHtcbiAgbGV0IHBhdGhzID0gW107XG4gIGxldCB1cCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICB1cFsxXSArPSAxO1xuICB1cCA9IHVwLnRvU3RyaW5nKCk7XG4gIGxldCBkb3duID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGRvd25bMV0gLT0gMTtcbiAgZG93biA9IGRvd24udG9TdHJpbmcoKTtcbiAgbGV0IGxlZnQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgbGVmdFswXSAtPSAxO1xuICBsZWZ0ID0gbGVmdC50b1N0cmluZygpO1xuICBsZXQgcmlnaHQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgcmlnaHRbMF0gKz0gMTtcbiAgcmlnaHQgPSByaWdodC50b1N0cmluZygpO1xuICBpZiAoIUdsb2JhbC5ST09NU1t1cF0gfHwgKEdsb2JhbC5ST09NU1t1cF0ubmVpZ2hib3JzLmRvd24gIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJVXCIpO1xuICB9XG4gIGlmICghR2xvYmFsLlJPT01TW2Rvd25dIHx8IChHbG9iYWwuUk9PTVNbZG93bl0ubmVpZ2hib3JzLnVwICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiRFwiKTtcbiAgfVxuICBpZiAoIUdsb2JhbC5ST09NU1tsZWZ0XSB8fCAoR2xvYmFsLlJPT01TW2xlZnRdLm5laWdoYm9ycy5yaWdodCAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIkxcIik7XG4gIH1cbiAgaWYgKCFHbG9iYWwuUk9PTVNbcmlnaHRdIHx8IChHbG9iYWwuUk9PTVNbcmlnaHRdLm5laWdoYm9ycy5sZWZ0ICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiUlwiKTtcbiAgfVxuICByZXR1cm4gcGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG59O1xuXG5leHBvcnQgY29uc3QgYXNzaWduQmxvY2tlZFBhdGhzID0gKHJvb20sIHBhdGhzKSA9PiB7XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJVXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMudXAgPSBcIlhcIjtcbiAgfVxuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiRFwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLmRvd24gPSBcIlhcIjtcbiAgfVxuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiTFwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLmxlZnQgPSBcIlhcIjtcbiAgfVxuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiUlwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLnJpZ2h0ID0gXCJYXCI7XG4gIH1cbn07XG5cbmNvbnN0IHJhbmROdW1Db2lucyA9ICgpID0+IHtcbiAgbGV0IHdlaWdodGVkTnVtQ29pbnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzNdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDMpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzJdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDIpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzFdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDEpIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuQ09JTl9XRUlHSFRTWzBdOyBpKyspIHsgd2VpZ2h0ZWROdW1Db2lucy5wdXNoKDApIH1cbiAgY29uc3QgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdlaWdodGVkTnVtQ29pbnMubGVuZ3RoKTtcbiAgc2h1ZmZsZSh3ZWlnaHRlZE51bUNvaW5zKTtcbiAgcmV0dXJuIHdlaWdodGVkTnVtQ29pbnNbcmFuZElkeF07XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZENvaW5Tb3VuZCA9ICgpID0+IHtcbiAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvaW4ke2l9YCk7XG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUNvaW5zID0gKCkgPT4ge1xuICBjb25zdCBudW1Db2lucyA9IHJhbmROdW1Db2lucygpO1xuICBsZXQgY29pbnMgPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db2luczsgaSsrKSB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgIHdoaWxlICh4ID4gMzM2ICYmIHggPCAzODQpIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTkyKSArIDY0O1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICB3aGlsZSAoeSA+IDMzNiAmJiB5IDwgMzg0KSB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICBsZXQgcG9zID0gW3gseV07XG4gICAgY29uc3QgY29pbiA9IG5ldyBDb2luKHBvcywgMTYsMTYsR2xvYmFsLlNQUklURVMuY29pbik7XG4gICAgY29pbnNbYCR7Y29pbi5wb3N9YF0gPSBjb2luO1xuICB9XG4gIHJldHVybiBjb2lucztcbn07XG5cbmV4cG9ydCBjb25zdCBzaHVmZmxlID0gYXJyID0+IHtcbiAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICBbYXJyW2ldLCBhcnJbal1dID0gW2FycltqXSwgYXJyW2ldXTtcbiAgfVxufTsiLCJleHBvcnQgY29uc3QgV0lEVEggPSA3MjA7XG5leHBvcnQgY29uc3QgSEVJR0hUID0gNzIwO1xuZXhwb3J0IGNvbnN0IFNQUklURV9ESU1TID0gWzQ4LDQ4XTtcbmV4cG9ydCBjb25zdCBGUFMgPSAxMDAwLzYwO1xuZXhwb3J0IGNvbnN0IEtFWVMgPSB7XG4gIDg3OiBmYWxzZSwgLy8gV1xuICA2NTogZmFsc2UsIC8vIEFcbiAgODM6IGZhbHNlLCAvLyBTXG4gIDY4OiBmYWxzZSwgLy8gRFxuICAxNjogZmFsc2UsIC8vIEwtU2hpZnRcbn07XG5leHBvcnQgY29uc3QgUk9PTVMgPSB7fTtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT04gPSB7fTtcbmV4cG9ydCBjb25zdCBTUFJJVEVTID0ge307XG5leHBvcnQgY29uc3QgQkdfSU1HUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgQ09JTl9XRUlHSFRTID0ge1xuICAzOiAxMCxcbiAgMjogMjAsXG4gIDE6IDMwLFxuICAwOiAyMCwgXG59O1xuXG5leHBvcnQgY29uc3QgQUxMX1BBVEhTID0gW1xuICBcIkRMUlVcIixcbiAgXCJETFJcIixcbiAgXCJETFVcIixcbiAgXCJMUlVcIixcbiAgXCJEUlVcIixcbiAgXCJETFwiLFxuICBcIkRSXCIsXG4gIFwiRFVcIixcbiAgXCJMUlwiLFxuICBcIkxVXCIsXG4gIFwiUlVcIixcbiAgXCJEXCIsXG4gIFwiTFwiLFxuICBcIlJcIixcbiAgXCJVXCIsXG5dO1xuXG5leHBvcnQgY29uc3QgV0VJR0hUUyA9IHtcbiAgNDoge1xuICAgIDQ6IDQ1LFxuICAgIDM6IDQ1LFxuICAgIDI6IDksXG4gICAgMTogMSxcbiAgfSxcbiAgMzoge1xuICAgIDM6IDcwLFxuICAgIDI6IDI1LFxuICAgIDE6IDUsXG4gIH0sXG4gIDI6IHtcbiAgICAyOiA2MCxcbiAgICAxOiA0MCxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBHQU1FX09QVElPTlMgPSB7fTtcbmV4cG9ydCBjb25zdCBSRVFVRVNUID0ge307IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChLRVlTKSA9PiB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDg3ICYmICFLRVlTWzg3XSkgS0VZU1tlLmtleUNvZGVdID0gdHJ1ZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA2NSAmJiAhS0VZU1s2NV0pIEtFWVNbZS5rZXlDb2RlXSA9IHRydWU7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gODMgJiYgIUtFWVNbODNdKSBLRVlTW2Uua2V5Q29kZV0gPSB0cnVlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDY4ICYmICFLRVlTWzY4XSkgS0VZU1tlLmtleUNvZGVdID0gdHJ1ZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxNiAmJiAhS0VZU1sxNl0pIEtFWVNbZS5rZXlDb2RlXSA9IHRydWU7XG5cbiAgfSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA4NyAmJiBLRVlTWzg3XSkgS0VZU1tlLmtleUNvZGVdID0gZmFsc2U7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gNjUgJiYgS0VZU1s2NV0pIEtFWVNbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDgzICYmIEtFWVNbODNdKSBLRVlTW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA2OCAmJiBLRVlTWzY4XSkgS0VZU1tlLmtleUNvZGVdID0gZmFsc2U7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTYgJiYgS0VZU1sxNl0pIEtFWVNbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICB9KTtcblxuICBjb25zdCBob3dUbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpO1xuICBcbiAgaG93VG8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tcG9pbnRlclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvLXNvdW5kXCIpLnBsYXkoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10b1wiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG93LXRvID4gdWxcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIGhvd1RvLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tcG9pbnRlclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG93LXRvID4gdWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKTtcbiAgcmVzdGFydC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnQtc291bmRcIikucGxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1wb2ludGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1wb2ludGVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbmV3R2FtZSgpO1xuICB9KTtcblxufVxuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3RoaXMud2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt0aGlzLndpZHRoLHkrdGhpcy5oZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K3RoaXMuaGVpZ2h0XTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiN0cmFuc3BhcmVudFwiO1xuICAgIGN0eC5maWxsUmVjdCguLi50aGlzLnBvcywgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBpbnN0YWxsTGlzdGVuZXJzIGZyb20gXCIuL3NjcmlwdHMvdXRpbHMvaW5zdGFsbF9saXN0ZW5lcnNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgeyBuZXdHYW1lIH0gZnJvbSBcIi4vc2NyaXB0cy91dGlscy9mdW5jX3V0aWxzXCI7XG5cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5XCIpO1xuICBjYW52YXMud2lkdGggPSBHbG9iYWwuV0lEVEg7XG4gIGNhbnZhcy5oZWlnaHQgPSBHbG9iYWwuSEVJR0hUO1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gIGluc3RhbGxMaXN0ZW5lcnMoR2xvYmFsLktFWVMpO1xuXG4gIFxuXG4gIGxldCBjb2luU3ByaXRlID0gbmV3IEltYWdlKCk7XG4gIGNvaW5TcHJpdGUuc3JjID0gXCIuL2Rpc3QvYXNzZXRzL2ltYWdlcy9jb2luL2NvaW4ucG5nXCI7XG4gIGNvaW5TcHJpdGUub25sb2FkID0gKCkgPT4ge1xuICAgIEdsb2JhbC5TUFJJVEVTLmNvaW4gPSBjb2luU3ByaXRlO1xuICB9O1xuICBcbiAgZm9yIChsZXQgcGF0aCBvZiBHbG9iYWwuQUxMX1BBVEhTKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCJcIikuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGJhY2tncm91bmQuc3JjID0gYC4vZGlzdC9hc3NldHMvaW1hZ2VzL21hcF9pbWdzLyR7cGF0aC5sZW5ndGh9LyR7cGF0aH0vbWFwJHtpfS5wbmdgO1xuICAgICAgXG4gICAgICBiYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgR2xvYmFsLkJHX0lNR1NbYCR7cGF0aC5sZW5ndGh9JHtwYXRofSR7aX1gXSA9IGJhY2tncm91bmQ7XG4gICAgICAgIC8vIEdsb2JhbC5HQl9JTUdTW1wiNERMUlUwXCJdID0gYmFja2dyb3VuZFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBsZXQgcGxheWVyU3ByaXRlID0gbmV3IEltYWdlKCk7XG4gIHBsYXllclNwcml0ZS5zcmMgPSBcIi4vZGlzdC9hc3NldHMvaW1hZ2VzL3JvZ3VlL3JvZ3VlX3dhbGsucG5nXCI7XG4gIFxuICBwbGF5ZXJTcHJpdGUub25sb2FkID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgR2xvYmFsLkdBTUVfT1BUSU9OU1tcImN0eFwiXSA9IGN0eDtcbiAgICBHbG9iYWwuR0FNRV9PUFRJT05TW1wicGxheWVyU3ByaXRlXCJdID0gcGxheWVyU3ByaXRlO1xuICAgIG5ld0dhbWUoKTtcbiAgICB9LDEwMDApO1xuICAgIFxuICB9XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=