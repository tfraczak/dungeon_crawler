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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9jb2luLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2NvbGxpc2lvbl9ib3guanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvZW50aXR5LmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3Jvb20uanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvdXRpbHMvZnVuY191dGlscy5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9nbG9iYWxfdmFycy5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy91dGlscy9pbnN0YWxsX2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy93YWxsLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRW50aXR5IiwicG9zIiwid2lkdGgiLCJoZWlnaHQiLCJzcHJpdGVQYWxldHRlIiwiY29sQm94V2lkdGgiLCJjb2xCb3hIZWlnaHQiLCJkcmF3T3B0aW9ucyIsImltYWdlIiwicGFsWCIsInBhbFkiLCJfc1dpZHRoIiwiX3NIZWlnaHQiLCJ4IiwieSIsIl9kV2lkdGgiLCJfZEhlaWdodCIsImNvbEJveCIsIkNvbEJveCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNvbGxpc2lvbnMiLCJjeCIsImN5IiwidXBkYXRlU2lkZXMiLCJzaWRlIiwib3RoZXJPYmplY3QiLCJvdGhlclNpZGUiLCJjb2xsaWRlZFdpdGhTaWRlIiwiY3R4IiwiZHJhd0ltYWdlIiwiT2JqZWN0IiwidmFsdWVzIiwiY2VudGVyT25FbnRpdHkiLCJkcmF3IiwiQ29pbiIsImZyYW1lSW50ZXJ2YWwiLCJmcmFtZUNvdW50IiwiY29sbGlkZWRPblNpZGUiLCJHbG9iYWwiLCJyYW5kQ29pblNvdW5kIiwicGxheSIsImkiLCJjIiwidyIsImVudGl0eSIsIm9yaWdpblBvcyIsInRvcExlZnQiLCJ0b3BSaWdodCIsImJvdHRvbVJpZ2h0IiwiYm90dG9tTGVmdCIsImNlbnRlciIsInNpZGVzIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0IiwiZXgiLCJleSIsImV3IiwiZWgiLCJ0dyIsInRoIiwiY29sQm94SG9vayIsIkdhbWUiLCJwbGF5ZXJTcHJpdGUiLCJzdGFydGluZ1BvcyIsInBsYXllciIsIlBsYXllciIsInN0YXJ0aW5nUm9vbSIsIlJvb20iLCJyb29tIiwiZ2FtZVN0ZXAiLCJiaW5kIiwic3RvcCIsInJlcXVlc3RJZCIsInJlcXVlc3RTdG9wIiwidW5kZWZpbmVkIiwiY2xlYXJSZWN0IiwibW92ZSIsIndhbGxzIiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwic3BlZWQiLCJub3JtYWxpemVkU3BlZWQiLCJwYXJzZUZsb2F0IiwiTWF0aCIsInNxcnQiLCJwYWNlIiwic3BlZWRNb2RpZmllciIsInN0cmlkZSIsInVwIiwic3RlcENvdW50IiwiZG93biIsImRpciIsImRpcmVjdGlvbiIsInNoaWZ0Iiwid2FsbCIsInN0cmlkZVBhbGV0dGVQb3MiLCJleGl0RGlyIiwibmV3Um9vbVBvcyIsInJvb21DaGFuZ2UiLCJuZWlnaGJvciIsImNvaW5zIiwiZ2VuZXJhdGVDb2lucyIsInJhbmRJZHgiLCJuZWlnaGJvcnMiLCJlbnRyeURpciIsImtleXMiLCJwcmV2Um9vbSIsIm5vZGVQb3MiLCJhZGRWYWxpZE5laWdoYm9ycyIsIm51bVBhdGhzIiwicmFuZFBhdGhzIiwibmV3UGF0aHMiLCJwYXRocyIsImJ1aWxkUGF0aHMiLCJwYXRoc0FyciIsInNwbGl0IiwiZmlsdGVyIiwicGF0aCIsInJhbmROdW1QYXRocyIsImxlbmd0aCIsImZsb29yIiwicmFuZG9tIiwiYmFja2dyb3VuZCIsImFzc2lnbkJsb2NrZWRQYXRocyIsImJ1aWxkUm9vbVdhbGxzIiwicHVzaCIsInNodWZmbGUiLCJwb3AiLCJzb3J0Iiwiam9pbiIsImFuaW1hdGVkT2JqZWN0cyIsImZvckVhY2giLCJjb2luIiwiY29sbGVjdCIsIm9iamVjdCIsImZpbGxTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsIldhbGwiLCJuZXdHYW1lIiwidGhpc1NpZGUiLCJjb2xsaWRlZCIsInVwcGVyRGlmZiIsImxvd2VyRGlmZiIsInVwcGVyQm91bmRzIiwibG93ZXJCb3VuZHMiLCJ0aGlzWVZhbCIsInRoaXNYTWluIiwidGhpc1hNYXgiLCJvdGhlcllWYWwiLCJvdGhlclhNaW4iLCJvdGhlclhNYXgiLCJ0aGlzWFZhbCIsInRoaXNZTWluIiwidGhpc1lNYXgiLCJvdGhlclhWYWwiLCJvdGhlcllNaW4iLCJvdGhlcllNYXgiLCJjdXJyUm9vbSIsIm5leHROb2RlUG9zIiwibWF4IiwidG9TdHJpbmciLCJpbmNsdWRlcyIsInJhbmROdW1Db2lucyIsIndlaWdodGVkTnVtQ29pbnMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibnVtQ29pbnMiLCJhcnIiLCJqIiwiV0lEVEgiLCJIRUlHSFQiLCJTUFJJVEVfRElNUyIsIkZQUyIsIktFWVMiLCJST09NUyIsIlNFU1NJT04iLCJTUFJJVEVTIiwiQkdfSU1HUyIsIkNPSU5fV0VJR0hUUyIsIkFMTF9QQVRIUyIsIldFSUdIVFMiLCJHQU1FX09QVElPTlMiLCJSRVFVRVNUIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlDb2RlIiwiaG93VG8iLCJjbGFzc0xpc3QiLCJhZGQiLCJxdWVyeVNlbGVjdG9yIiwicmVtb3ZlIiwicmVzdGFydCIsInByZXZlbnREZWZhdWx0IiwiYmVnaW5QYXRoIiwiZmlsbFJlY3QiLCJjYW52YXMiLCJnZXRDb250ZXh0IiwiaW5zdGFsbExpc3RlbmVycyIsImNvaW5TcHJpdGUiLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7SUFFTUEsTTtBQUNKLGtCQUFZQyxHQUFaLEVBQWdCQyxLQUFoQixFQUFzQkMsTUFBdEIsRUFBNkJDLGFBQTdCLEVBQTRDO0FBQUE7O0FBQzFDLFNBQUtILEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFFBQU1FLFdBQVcsR0FBR0gsS0FBcEI7QUFDQSxRQUFNSSxZQUFZLEdBQUdILE1BQXJCO0FBRUEsU0FBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CO0FBQ2pCQyxXQUFLLEVBQUVKLGFBRFU7QUFFakJLLFVBQUksRUFBRSxDQUZXO0FBR2pCQyxVQUFJLEVBQUUsQ0FIVztBQUlqQkMsYUFBTyxFQUFFVCxLQUpRO0FBS2pCVSxjQUFRLEVBQUVULE1BTE87QUFNakJVLE9BQUMsRUFB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RyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFBQSxlQUFuQkEsQ0FBbUI7QUFRM0I7QUEzQitDOztBQWlCbEQsd0RBQW1DO0FBQUE7QUFXbEM7QUE1QmlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBOEJsRCxNQUFJcUIsWUFBWSxHQUFHLElBQUkySSxLQUFKLEVBQW5CO0FBQ0EzSSxjQUFZLENBQUM0SSxHQUFiLEdBQW1CLDJDQUFuQjs7QUFFQTVJLGNBQVksQ0FBQzZJLE1BQWIsR0FBc0IsWUFBTTtBQUMxQkMsY0FBVSxDQUFDLFlBQU07QUFDZnRLLDhFQUFBLEdBQTZCVixHQUE3QjtBQUNGVSx1RkFBQSxHQUFzQ3dCLFlBQXRDO0FBQ0E4RSx3RUFBTztBQUNOLEtBSlMsRUFJUixJQUpRLENBQVY7QUFNRCxHQVBEO0FBU0QsQ0ExQ0QsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbEJveCBmcm9tIFwiLi9jb2xsaXNpb25fYm94XCI7XG5pbXBvcnQgeyBjb2xsaWRlZFdpdGhTaWRlLCByYW5kQ29pblNvdW5kIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5cbmNsYXNzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb2xCb3hXaWR0aCA9IHdpZHRoO1xuICAgIGNvbnN0IGNvbEJveEhlaWdodCA9IGhlaWdodDtcbiAgICBcbiAgICB0aGlzLnNwcml0ZVBhbGV0dGUgPSBzcHJpdGVQYWxldHRlO1xuICAgIHRoaXMuZHJhd09wdGlvbnMgPSB7XG4gICAgICBpbWFnZTogc3ByaXRlUGFsZXR0ZSxcbiAgICAgIHBhbFg6IDAsXG4gICAgICBwYWxZOiAwLFxuICAgICAgX3NXaWR0aDogd2lkdGgsXG4gICAgICBfc0hlaWdodDogaGVpZ2h0LFxuICAgICAgeDogcG9zWzBdLFxuICAgICAgeTogcG9zWzFdLFxuICAgICAgX2RXaWR0aDogd2lkdGgsXG4gICAgICBfZEhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgdGhpcy5jb2xCb3ggPSBuZXcgQ29sQm94KHRoaXMsY29sQm94V2lkdGgsY29sQm94SGVpZ2h0KTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSB7XG4gICAgICB0b3A6IGZhbHNlLFxuICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgIH07XG4gICAgXG4gIH1cblxuICBjb2xCb3hIb29rKCkgeyAvLyB0aGlzIHdpbGwgY2VudGVyIHRoZSBjb2xCb3ggb24gdGhlIGJvdHRvbVxuICAgIGxldCBbeCx5XSA9IFt0aGlzLnBvc1swXSx0aGlzLnBvc1sxXV07XG4gICAgbGV0IFtjeCxjeV0gPSBbXG4gICAgICB4KygodGhpcy53aWR0aCAtIHRoaXMuY29sQm94LndpZHRoKS8yKSxcbiAgICAgIHkrKHRoaXMuaGVpZ2h0IC0gdGhpcy5jb2xCb3guaGVpZ2h0KSxcbiAgICBdO1xuICAgIHJldHVybiBbY3gsY3ldO1xuICB9XG5cbiAgdXBkYXRlU2lkZXMoKSB7XG4gICAgdGhpcy5jb2xCb3gudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuY29sQm94LnRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMuY29sQm94LmJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmNvbEJveC5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSB0aGlzLmNvbEJveC5yaWdodDtcbiAgfVxuXG4gIGNvbGxpZGVkT25TaWRlKHNpZGUsIG90aGVyT2JqZWN0KSB7XG4gICAgbGV0IG90aGVyU2lkZTtcbiAgICBzd2l0Y2goc2lkZSkge1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImJvdHRvbVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJ0b3BcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInJpZ2h0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwibGVmdFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG90aGVyU2lkZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNvbGxpc2lvbnNbc2lkZV0gPSBjb2xsaWRlZFdpdGhTaWRlKHNpZGUsIHRoaXNbc2lkZV0sIG90aGVyT2JqZWN0W290aGVyU2lkZV0pO1xuICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbnNbc2lkZV07XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UoLi4uT2JqZWN0LnZhbHVlcyh0aGlzLmRyYXdPcHRpb25zKSk7XG4gICAgdGhpcy5jb2xCb3guY2VudGVyT25FbnRpdHkoKTtcbiAgICB0aGlzLmNvbEJveC5kcmF3KGN0eCk7XG4gIH1cbn1cblxuY2xhc3MgQ29pbiBleHRlbmRzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCwgc3ByaXRlUGFsZXR0ZSkge1xuICAgIHN1cGVyKHBvcywgd2lkdGgsIGhlaWdodCwgc3ByaXRlUGFsZXR0ZSk7XG4gICAgdGhpcy5mcmFtZUludGVydmFsID0gMTI7XG4gICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSAwO1xuICB9XG5cbiAgY29sbGVjdCgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbGxpZGVkT25TaWRlKFwidG9wXCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKSB8fFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcImJvdHRvbVwiLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnBsYXllcikgfHxcbiAgICAgIHRoaXMuY29sbGlkZWRPblNpZGUoXCJsZWZ0XCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKSB8fFxuICAgICAgdGhpcy5jb2xsaWRlZE9uU2lkZShcInJpZ2h0XCIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucGxheWVyKVxuICAgICkge1xuICAgICAgcmFuZENvaW5Tb3VuZCgpLnBsYXkoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIGNvbnN0IGkgPSB0aGlzLmZyYW1lSW50ZXJ2YWw7XG4gICAgY29uc3QgYyA9IHRoaXMuZnJhbWVDb3VudDtcbiAgICBjb25zdCB3ID0gdGhpcy53aWR0aDtcbiAgICBpZiAoYyA8IGkpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAwO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSoyKSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMTtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqMykge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDI7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjQpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiAzO1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo1KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNDtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSBpZiAoYyA8IGkqNikge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdyAqIDU7XG4gICAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB9IGVsc2UgaWYgKGMgPCBpKjcpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHcgKiA2O1xuICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjIDwgaSo4KSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogNztcbiAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB3ICogMDtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvaW47IiwiXG5cbmNsYXNzIENvbEJveCB7XG4gIGNvbnN0cnVjdG9yKGVudGl0eSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZW50aXR5ID0gZW50aXR5O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnBvcyA9IHRoaXMub3JpZ2luUG9zKCk7XG5cbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcExlZnQgPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BSaWdodCA9IFt4K3dpZHRoLHldO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gW3grd2lkdGgseStoZWlnaHRdO1xuICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBbeCx5K2hlaWdodF07XG4gICAgXG4gICAgdGhpcy5jZW50ZXIgPSBbeCsod2lkdGgvMikseSsoaGVpZ2h0LzIpXTtcbiAgICB0aGlzLnRvcCA9IFtbdG9wTGVmdFswXSx0b3BSaWdodFswXV0sIHRvcExlZnRbMV1dO1xuICAgIHRoaXMuYm90dG9tID0gW1tib3R0b21MZWZ0WzBdLGJvdHRvbVJpZ2h0WzBdXSwgYm90dG9tTGVmdFsxXV07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodFswXSwgW3RvcFJpZ2h0WzFdLGJvdHRvbVJpZ2h0WzFdXV07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnRbMF0sIFt0b3BMZWZ0WzFdLGJvdHRvbUxlZnRbMV1dXTtcbiAgICB0aGlzLnNpZGVzID0gW3RoaXMudG9wLCB0aGlzLmJvdHRvbSwgdGhpcy5yaWdodCwgdGhpcy5sZWZ0XTtcbiAgICBcbiAgfVxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICBjdHguc3Ryb2tlUmVjdChcbiAgICAgIHRoaXMucG9zWzBdLFxuICAgICAgdGhpcy5wb3NbMV0sXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5oZWlnaHQsXG4gICAgKVxuICB9XG5cbiAgdXBkYXRlU2lkZXMoKSB7XG4gICAgY29uc3QgW3gseV0gPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BMZWZ0ID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wUmlnaHQgPSBbeCt0aGlzLndpZHRoLHldO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gW3grdGhpcy53aWR0aCx5K3RoaXMuaGVpZ2h0XTtcbiAgICBjb25zdCBib3R0b21MZWZ0ID0gW3gseSt0aGlzLmhlaWdodF07XG4gICAgdGhpcy5jZW50ZXIgPSBbeCsodGhpcy53aWR0aC8yKSx5Kyh0aGlzLmhlaWdodC8yKV07XG4gICAgdGhpcy50b3AgPSBbW3RvcExlZnRbMF0sdG9wUmlnaHRbMF1dLCB0b3BMZWZ0WzFdXTtcbiAgICB0aGlzLmJvdHRvbSA9IFtbYm90dG9tTGVmdFswXSxib3R0b21SaWdodFswXV0sIGJvdHRvbUxlZnRbMV1dO1xuICAgIHRoaXMucmlnaHQgPSBbdG9wUmlnaHRbMF0sIFt0b3BSaWdodFsxXSxib3R0b21SaWdodFsxXV1dO1xuICAgIHRoaXMubGVmdCA9IFt0b3BMZWZ0WzBdLCBbdG9wTGVmdFsxXSxib3R0b21MZWZ0WzFdXV07XG4gIH1cblxuICBvcmlnaW5Qb3MoKSB7XG4gICAgY29uc3QgW2V4LGV5XSA9IFt0aGlzLmVudGl0eS5wb3NbMF0sIHRoaXMuZW50aXR5LnBvc1sxXV07XG4gICAgY29uc3QgW2V3LGVoXSA9IFt0aGlzLmVudGl0eS53aWR0aCwgdGhpcy5lbnRpdHkuaGVpZ2h0XTtcbiAgICBjb25zdCBbdHcsdGhdID0gW3RoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XTtcbiAgICBjb25zdCB4ID0gZXggKyAoKGV3LXR3KS8yKTtcbiAgICBjb25zdCB5ID0gZXkgKyBlaCAtIHRoO1xuICAgIHJldHVybiBbeCx5XTtcbiAgfVxuXG4gIGNlbnRlck9uRW50aXR5KCkge1xuICAgIHRoaXMucG9zID0gdGhpcy5lbnRpdHkuY29sQm94SG9vaygpO1xuICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbEJveDsiLCJpbXBvcnQgQ29sQm94IGZyb20gXCIuL2NvbGxpc2lvbl9ib3hcIjtcbmltcG9ydCB7IGNvbGxpZGVkV2l0aFNpZGUgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmNsYXNzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb2xCb3hXaWR0aCA9IHdpZHRoLzI7XG4gICAgY29uc3QgY29sQm94SGVpZ2h0ID0gaGVpZ2h0LzM7XG4gICAgXG4gICAgdGhpcy5zcHJpdGVQYWxldHRlID0gc3ByaXRlUGFsZXR0ZTtcbiAgICB0aGlzLmRyYXdPcHRpb25zID0ge1xuICAgICAgaW1hZ2U6IHNwcml0ZVBhbGV0dGUsXG4gICAgICBwYWxYOiAwLFxuICAgICAgcGFsWTogMCxcbiAgICAgIF9zV2lkdGg6IHdpZHRoLFxuICAgICAgX3NIZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHBvc1swXSxcbiAgICAgIHk6IHBvc1sxXSxcbiAgICAgIF9kV2lkdGg6IHdpZHRoLFxuICAgICAgX2RIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIHRoaXMuY29sQm94ID0gbmV3IENvbEJveCh0aGlzLGNvbEJveFdpZHRoLGNvbEJveEhlaWdodCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gICAgdGhpcy5jb2xsaXNpb25zID0ge1xuICAgICAgdG9wOiBmYWxzZSxcbiAgICAgIGJvdHRvbTogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICB9O1xuICAgIFxuICB9XG5cbiAgY29sQm94SG9vaygpIHsgLy8gdGhpcyB3aWxsIGNlbnRlciB0aGUgY29sQm94IG9uIHRoZSBib3R0b21cbiAgICBsZXQgW3gseV0gPSBbdGhpcy5wb3NbMF0sdGhpcy5wb3NbMV1dO1xuICAgIGxldCBbY3gsY3ldID0gW1xuICAgICAgeCsoKHRoaXMud2lkdGggLSB0aGlzLmNvbEJveC53aWR0aCkvMiksXG4gICAgICB5Kyh0aGlzLmhlaWdodCAtIHRoaXMuY29sQm94LmhlaWdodCksXG4gICAgXTtcbiAgICByZXR1cm4gW2N4LGN5XTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIHRoaXMuY29sQm94LnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLmNvbEJveC50b3A7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmNvbEJveC5ib3R0b207XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5jb2xCb3gubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5jb2xCb3gucmlnaHQ7XG4gIH1cblxuICBjb2xsaWRlZE9uU2lkZShzaWRlLCBvdGhlck9iamVjdCkge1xuICAgIGxldCBvdGhlclNpZGU7XG4gICAgc3dpdGNoKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJib3R0b21cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwidG9wXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJyaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcImxlZnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvdGhlclNpZGUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb25zW3NpZGVdID0gY29sbGlkZWRXaXRoU2lkZShzaWRlLCB0aGlzW3NpZGVdLCBvdGhlck9iamVjdFtvdGhlclNpZGVdKTtcbiAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zW3NpZGVdO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlKC4uLk9iamVjdC52YWx1ZXModGhpcy5kcmF3T3B0aW9ucykpO1xuICAgIHRoaXMuY29sQm94LmNlbnRlck9uRW50aXR5KCk7XG4gICAgdGhpcy5jb2xCb3guZHJhdyhjdHgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudGl0eTsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4vcm9vbVwiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihjdHgsIHBsYXllclNwcml0ZSkge1xuICAgIGNvbnN0IHN0YXJ0aW5nUG9zID0gWzQ4KjcsIDQ4KjddO1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihzdGFydGluZ1BvcywgLi4uR2xvYmFsLlNQUklURV9ESU1TLCBwbGF5ZXJTcHJpdGUpO1xuICAgIEdsb2JhbC5TRVNTSU9OLnBsYXllciA9IHRoaXMucGxheWVyO1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIC8vIGNvbnN0IHJvb20gPSB7IFwibGVmdFwiOiBuZXcgUm9vbSgpIH07IC8vIHRlc3RpbmcgbmV3IFJvb20ocm9vbSlcbiAgICB0aGlzLnN0YXJ0aW5nUm9vbSA9IG5ldyBSb29tKCk7XG4gICAgdGhpcy5yb29tID0gdGhpcy5zdGFydGluZ1Jvb207XG4gICAgdGhpcy5wbGF5ZXIuZHJhdyhjdHgpO1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUgPSB0aGlzO1xuICAgIEdsb2JhbC5TRVNTSU9OLnN0b3AgPSBmYWxzZTtcbiAgICBHbG9iYWwuU0VTU0lPTi5jb2luQ291bnQgPSAwO1xuICAgIHRoaXMuZ2FtZVN0ZXAgPSB0aGlzLmdhbWVTdGVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdG9wID0gdGhpcy5zdG9wLmJpbmQodGhpcyk7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5KCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLnJlcXVlc3RJZCkge1xuICAgICAgdGhpcy5yZXF1ZXN0U3RvcCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2FtZVN0ZXAoKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKCF0aGlzLnJlcXVlc3RJZCkge1xuICAgICAgY29uc3QgcGxheWVyID0gR2xvYmFsLlNFU1NJT04ucGxheWVyO1xuICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsMCwgR2xvYmFsLldJRFRILCBHbG9iYWwuSEVJR0hUKTtcbiAgICAgIHBsYXllci5tb3ZlKHRoaXMucm9vbS53YWxscyk7XG4gICAgICB0aGlzLnJvb20uYW5pbWF0ZSgpO1xuICAgICAgdGhpcy5yb29tLmRyYXcodGhpcy5jdHgpO1xuICAgICAgcGxheWVyLmRyYXcodGhpcy5jdHgpO1xuICAgICAgdGhpcy5yZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lU3RlcCk7XG4gICAgICBpZiAodGhpcy5yZXF1ZXN0U3RvcCkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuZ2FtZVN0ZXAoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lU3RlcCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiO1xuaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgeyByb29tQ2hhbmdlIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICBzdXBlcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpO1xuICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgIHRoaXMubm9ybWFsaXplZFNwZWVkID0gcGFyc2VGbG9hdCh0aGlzLnNwZWVkKSAvIE1hdGguc3FydCgyKTtcbiAgICB0aGlzLnBhY2UgPSAyNC90aGlzLnNwZWVkO1xuICAgIHRoaXMuc3BlZWRNb2RpZmllciA9IDE7XG4gICAgdGhpcy5zdHJpZGUgPSB7XG4gICAgICB1cDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogNixcbiAgICAgIH0sXG4gICAgICBkb3duOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiAwLFxuICAgICAgfSxcbiAgICAgIGxlZnQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDIsXG4gICAgICB9LFxuICAgICAgcmlnaHQ6IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDQsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBuZXdSb29tUG9zKGRpcikge1xuICAgIHN3aXRjaChkaXIpIHtcbiAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICB0aGlzLnBvc1sxXSA9IDcyMC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICB0aGlzLnBvc1sxXSA9IC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICB0aGlzLnBvc1swXSA9IDcyMC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5wb3NbMF0gPSAtMjQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0cmlkZVBhbGV0dGVQb3MoZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5wYWNlID0gMjQgLyAodGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcik7XG4gICAgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSAyICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDMgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDI7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA+IDQgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID0gMDtcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfVxuICB9XG5cbiAgbW92ZSh3YWxscykge1xuICAgIGNvbnN0IFtcbiAgICAgIHVwLFxuICAgICAgZG93bixcbiAgICAgIGxlZnQsXG4gICAgICByaWdodCxcbiAgICAgIHNoaWZ0XG4gICAgXSA9IFtcbiAgICAgIEdsb2JhbC5LRVlTWzg3XSxcbiAgICAgIEdsb2JhbC5LRVlTWzgzXSxcbiAgICAgIEdsb2JhbC5LRVlTWzY1XSxcbiAgICAgIEdsb2JhbC5LRVlTWzY4XSxcbiAgICAgIEdsb2JhbC5LRVlTWzE2XSxcbiAgICBdO1xuICAgIGlmIChzaGlmdCkge1xuICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMTtcbiAgICB9XG5cbiAgICBcblxuICAgIC8vIFcga2V5IG1vdmVtZW50cyBhbmQgc3ByaXRlIGRpcmVjdGlvblxuICAgIGlmICh1cCkge1xuICAgICAgaWYgKGxlZnQgfHwgcmlnaHQpIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzFdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1sxXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInRvcFwiLCB3YWxsKSkgYnJlYWsgfVxuICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucy50b3ApIHtcbiAgICAgICAgdGhpcy5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMudG9wIC0gKHRoaXMuaGVpZ2h0LXRoaXMuY29sQm94LmhlaWdodCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobGVmdCB8fCByaWdodCAmJiAhdGhpcy5jb2xsaXNpb25zLnRvcCkge1xuICAgICAgICAgIHRoaXMucG9zWzFdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wb3NbMV0gKz0gLXRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS51cC5wYWxZO1xuICAgICAgaWYgKCFsZWZ0ICYmICFyaWdodCkge1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJ1cFwiKTtcbiAgICAgICAgXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUyBrZXkgbW92ZW1lbnRzIGFuZCBzcHJpdGUgZGlyZWN0aW9uXG4gICAgaWYgKGRvd24pIHtcbiAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0KSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1sxXSArPSB0aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1sxXSArPSB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwiYm90dG9tXCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmJvdHRvbSkge1xuICAgICAgICB0aGlzLmNvbEJveC5wb3NbMV0gPSB0aGlzLmNvbGxpc2lvbnMuYm90dG9tO1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy5ib3R0b20tNDg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobGVmdCB8fCByaWdodCkge1xuICAgICAgICAgIHRoaXMucG9zWzFdICs9IHRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBvc1sxXSArPSB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUuZG93bi5wYWxZO1xuICAgICAgaWYgKCFsZWZ0ICYmICFyaWdodCkge1xuICAgICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJkb3duXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEEga2V5IG1vdmVtZW50XG4gICAgaWYgKGxlZnQpIHtcbiAgICAgIGlmICh1cCB8fCBkb3duKSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1swXSArPSAtdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbEJveC5wb3NbMF0gKz0gLXRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJsZWZ0XCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLmxlZnQpIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLmxlZnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodXAgfHwgZG93biAmJiAhdGhpcy5jb2xsaXNpb25zLmxlZnQpIHtcbiAgICAgICAgICB0aGlzLnBvc1swXSArPSAtdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBvc1swXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5sZWZ0LnBhbFk7XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFggPSB0aGlzLnN0cmlkZVBhbGV0dGVQb3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIEQga2V5IG1vdmVtZW50XG4gICAgaWYgKHJpZ2h0KSB7XG4gICAgICBpZiAodXAgfHwgZG93bikge1xuICAgICAgICB0aGlzLmNvbEJveC5wb3NbMF0gKz0gdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbEJveC5wb3NbMF0gKz0gdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcInJpZ2h0XCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnJpZ2h0KSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5yaWdodDtcbiAgICAgICAgdGhpcy5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMucmlnaHQtKHRoaXMuY29sQm94LndpZHRoICsgdGhpcy5jb2xCb3gud2lkdGgvMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodXAgfHwgZG93bikge1xuICAgICAgICAgIHRoaXMucG9zWzBdICs9IHRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBvc1swXSArPSB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxZID0gdGhpcy5zdHJpZGUucmlnaHQucGFsWTtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcInJpZ2h0XCIpO1xuICAgIH1cblxuICAgIC8vIGlmIG5vbmUgb2YgdGhlIGtleXMgYXJlIGJlaW5nIHByZXNzZWQsIGdvIHRvIGRlZmF1bHQgc3RhbmNlXG4gICAgaWYgKCF1cCAmJiAhZG93biAmJiAhcmlnaHQgJiYgIWxlZnQpIHtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IDQ4ICogMTtcbiAgICB9XG5cbiAgICBjb25zdCBbeCx5XSA9IHRoaXMucG9zO1xuICAgIGxldCBleGl0RGlyO1xuICAgIGlmICh4IDwgLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJsZWZ0XCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfSBlbHNlIGlmICh4ID4gNzIwLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJyaWdodFwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH0gZWxzZSBpZiAoeSA8IC0yNCkge1xuICAgICAgZXhpdERpciA9IFwidXBcIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9IGVsc2UgaWYgKHkgPiA3MjAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcImRvd25cIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgdGhpcy5kcmF3T3B0aW9ucy54ID0gdGhpcy5wb3NbMF07XG4gICAgdGhpcy5kcmF3T3B0aW9ucy55ID0gdGhpcy5wb3NbMV07XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiaW1wb3J0ICogYXMgR2xvYmFsIGZyb20gXCIuL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgV2FsbCBmcm9tIFwiLi93YWxsXCI7XG5cbmltcG9ydCB7XG4gIHJhbmROdW1QYXRocyxcbiAgYWRkVmFsaWROZWlnaGJvcnMsXG4gIGJ1aWxkUGF0aHMsXG4gIHNodWZmbGUsXG4gIGFzc2lnbkJsb2NrZWRQYXRocyxcbiAgZ2VuZXJhdGVDb2lucyxcbn0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5jbGFzcyBSb29tIHtcbiAgY29uc3RydWN0b3IobmVpZ2hib3IpIHtcbiAgICB0aGlzLmNvaW5zID0gZ2VuZXJhdGVDb2lucygpO1xuICAgIHRoaXMud2FsbHMgPSBbXTtcbiAgICBsZXQgcmFuZElkeDtcbiAgICB0aGlzLm5laWdoYm9ycyA9IHtcbiAgICAgIHVwOiB1bmRlZmluZWQsXG4gICAgICBkb3duOiB1bmRlZmluZWQsXG4gICAgICBsZWZ0OiB1bmRlZmluZWQsXG4gICAgICByaWdodDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgbGV0IGVudHJ5RGlyO1xuICAgIGlmIChuZWlnaGJvcikge1xuICAgICAgY29uc3QgZXhpdERpciA9IE9iamVjdC5rZXlzKG5laWdoYm9yKVswXTtcbiAgICAgIGNvbnN0IHByZXZSb29tID0gT2JqZWN0LnZhbHVlcyhuZWlnaGJvcilbMF07XG4gICAgICB0aGlzLm5vZGVQb3MgPSBbLi4ucHJldlJvb20ubm9kZVBvc107XG4gICAgICBzd2l0Y2goZXhpdERpcikge1xuICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5kb3duID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIkRcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMV0rKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy51cCA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJVXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzFdLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMucmlnaHQgPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiUlwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1swXS0tO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5sZWZ0ID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIkxcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMF0rKztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub2RlUG9zID0gWzAsMF07XG4gICAgfVxuICAgIFxuICAgIEdsb2JhbC5ST09NU1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuXG4gICAgYWRkVmFsaWROZWlnaGJvcnModGhpcyk7XG4gICAgbGV0IHdhbGxzLCBudW1QYXRocywgcmFuZFBhdGhzO1xuICAgIGxldCBuZXdQYXRocyA9IFtdO1xuICAgIGxldCBwYXRocyA9IGJ1aWxkUGF0aHModGhpcyk7XG4gICAgbGV0IHBhdGhzQXJyID0gcGF0aHMuc3BsaXQoXCJcIik7XG4gICAgaWYgKG5laWdoYm9yKSB7XG4gICAgICAvLyBpZiBub3QgaW5pdGlhbCByb29tXG4gICAgICBwYXRoc0FyciA9IHBhdGhzQXJyLmZpbHRlcihwYXRoID0+IHBhdGggIT09IGVudHJ5RGlyKTsgLy8gcmVtb3ZlIGVudHJ5RGlyIGZyb20gcGF0aHNcbiAgICAgIG51bVBhdGhzID0gcmFuZE51bVBhdGhzKHBhdGhzLmxlbmd0aCk7IC8vIHdlaWdodGVkIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLCBwcmVmZXJzIG1vcmUgcGF0aHNcbiAgICAgIGlmIChudW1QYXRocyA9PT0gcGF0aHMubGVuZ3RoKSB7IC8vIGlmIGFsbCA0IHBhdGhzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtwYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBwYXRocyk7XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhwYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5ST09NU1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfSBlbHNlIHsgLy8gbGVzcyB0aGFuIDQgcGF0aHMgYXZhaWxhYmxlXG4gICAgICAgIHNodWZmbGUocGF0aHNBcnIpOyAvLyByYW5kb21pemUgdGhlIHBhdGggY2hvaWNlc1xuICAgICAgICBuZXdQYXRocy5wdXNoKGVudHJ5RGlyKTsgLy8gTVVTVCBBTFdBWVMgaGF2ZSB0aGUgcGF0aCB5b3UgZW50ZXIgZnJvbVxuICAgICAgICBudW1QYXRocy0tO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVBhdGhzOyBpKyspIHsgbmV3UGF0aHMucHVzaChwYXRoc0Fyci5wb3AoKSkgfVxuICAgICAgICBuZXdQYXRocyA9IG5ld1BhdGhzLnNvcnQoKS5qb2luKFwiXCIpO1xuICAgICAgICByYW5kSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBHbG9iYWwuQkdfSU1HU1tgJHtudW1QYXRocysxfSR7bmV3UGF0aHN9JHtyYW5kSWR4fWBdO1xuICAgICAgICBpZiAoIXRoaXMuYmFja2dyb3VuZCkge1xuICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBuZXdQYXRocyk7XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhuZXdQYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5ST09NU1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBudW1QYXRocyA9IHJhbmROdW1QYXRocyhwYXRocy5sZW5ndGgpO1xuICAgICAgaWYgKG51bVBhdGhzID09PSBwYXRocy5sZW5ndGgpIHtcbiAgICAgICAgcmFuZElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gR2xvYmFsLkJHX0lNR1NbYCR7bnVtUGF0aHN9JHtwYXRoc30ke3JhbmRJZHh9YF07XG4gICAgICAgIHdhbGxzID0gdGhpcy5idWlsZFJvb21XYWxscyhwYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5ST09NU1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2h1ZmZsZShwYXRoc0Fycik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGF0aHM7IGkrKykgeyBuZXdQYXRocy5wdXNoKHBhdGhzQXJyLnBvcCgpKSB9XG4gICAgICAgIG5ld1BhdGhzID0gbmV3UGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IEdsb2JhbC5CR19JTUdTW2Ake251bVBhdGhzfSR7bmV3UGF0aHN9JHtyYW5kSWR4fWBdO1xuICAgICAgICBhc3NpZ25CbG9ja2VkUGF0aHModGhpcywgbmV3UGF0aHMpO1xuICAgICAgICB3YWxscyA9IHRoaXMuYnVpbGRSb29tV2FsbHMobmV3UGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuUk9PTVNbYCR7dGhpcy5ub2RlUG9zfWBdID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hbmltYXRlZE9iamVjdHMgPSB7fTtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuY29pbnMpLmZvckVhY2goY29pbiA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGVkT2JqZWN0c1tgY29pbi0ke2NvaW4ucG9zfWBdID0gY29pbjtcbiAgICB9KTtcblxuICAgIFxuXG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIHRoaXMuY29sbGVjdCgpO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5hbmltYXRlZE9iamVjdHMpLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5hbmltYXRlKCkpXG4gIH1cblxuICBjb2xsZWN0KCkge1xuICAgIGZvciAobGV0IGNvaW4gb2YgT2JqZWN0LnZhbHVlcyh0aGlzLmNvaW5zKSkge1xuICAgICAgaWYgKGNvaW4uY29sbGVjdCgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmFuaW1hdGVkT2JqZWN0c1tgY29pbi0ke2NvaW4ucG9zfWBdO1xuICAgICAgICBkZWxldGUgdGhpcy5jb2luc1tgJHtjb2luLnBvc31gXTtcbiAgICAgICAgR2xvYmFsLlNFU1NJT04uY29pbkNvdW50Kys7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmQsIDAsIDApO1xuICAgIC8vIHRoaXMud2FsbHMuZm9yRWFjaCh3YWxsID0+IHdhbGwuZHJhdyhjdHgpKTtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuYW5pbWF0ZWRPYmplY3RzKS5mb3JFYWNoKG9iamVjdCA9PiBvYmplY3QuZHJhdyhjdHgpKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmYWY0XCI7XG4gICAgY3R4LmZvbnQgPSBcIjIwcHggYXJpYWxcIjtcbiAgICBjdHguZmlsbFRleHQoYFJvb20gWyAke3RoaXMubm9kZVBvc30gXWAsIDE1LCAzMCk7XG4gICAgY3R4LmZpbGxUZXh0KGBDb2lucyB4ICR7R2xvYmFsLlNFU1NJT04uY29pbkNvdW50fWAsIDU5MCwgMzApO1xuICB9XG5cbiAgYnVpbGRSb29tV2FsbHMocGF0aHMpIHtcbiAgICBsZXQgd2FsbHMgPSBbXTtcbiAgICBzd2l0Y2gocGF0aHMpIHtcbiAgICAgIGNhc2UgXCJETFJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJETFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxSVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNzIwLCA0OCkpOyAvLyBkb3duIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkRSVVwiOlxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRExSXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IHVwXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlJVXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRExcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiRFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDcyMCwgNDgpKTsgLy8gdXAgYmxvY2tlZFxuICAgICAgICByZXR1cm4gd2FsbHM7XG4gICAgICBjYXNlIFwiTFJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIkxcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDQ4KjYpKTsgLy8gbGVmdCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNzIwKSk7IC8vIHJpZ2h0IGJsb2NrZWRcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlJcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIHJpZ2h0IGRvd25cbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgICAgY2FzZSBcIlVcIjpcbiAgICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICAgIHJldHVybiB3YWxscztcbiAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA3MjAsIDQ4KSk7IC8vIHVwIGJsb2NrZWRcbiAgICAgICAgcmV0dXJuIHdhbGxzO1xuICAgIH1cbiAgfVxuXG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBSb29tOyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IFdhbGwgZnJvbSBcIi4uL3dhbGxcIjtcbmltcG9ydCBSb29tIGZyb20gXCIuLi9yb29tXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi4vZ2FtZVwiO1xuaW1wb3J0IEVudGl0eSBmcm9tIFwiLi4vZW50aXR5XCI7XG5pbXBvcnQgQ29pbiBmcm9tIFwiLi4vY29pblwiO1xuXG5cbmV4cG9ydCBjb25zdCBuZXdHYW1lID0gKCkgPT4ge1xuICBpZiAoR2xvYmFsLlNFU1NJT04uZ2FtZSkge1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUuc3RvcCgpO1xuICAgIGRlbGV0ZSBHbG9iYWwuU0VTU0lPTltcImdhbWVcIl07XG4gICAgZGVsZXRlIEdsb2JhbC5TRVNTSU9OW1wicGxheWVyXCJdO1xuICAgIGRlbGV0ZSBHbG9iYWwuU0VTU0lPTltcImNvaW5Db3VudFwiXTtcbiAgICBmb3IgKGxldCByb29tIGluIEdsb2JhbC5ST09NUykge1xuICAgICAgZGVsZXRlIEdsb2JhbC5ST09NU1tgJHtyb29tLm5vZGVQb3N9YF07XG4gICAgfTtcbiAgfVxuICBuZXcgR2FtZSguLi5PYmplY3QudmFsdWVzKEdsb2JhbC5HQU1FX09QVElPTlMpKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbGxpZGVkV2l0aFNpZGUgPSAoc2lkZSwgdGhpc1NpZGUsIG90aGVyU2lkZSkgPT4ge1xuICBsZXQgY29sbGlkZWQgPSBmYWxzZTtcbiAgbGV0IHVwcGVyRGlmZiwgbG93ZXJEaWZmO1xuICBjb25zdCB1cHBlckJvdW5kcyA9IDEwO1xuICBjb25zdCBsb3dlckJvdW5kcyA9IDA7XG4gIGlmIChzaWRlID09PSBcInRvcFwiIHx8IHNpZGUgPT09IFwiYm90dG9tXCIpIHtcbiAgICBjb25zdCB0aGlzWVZhbCA9IHRoaXNTaWRlWzFdO1xuICAgIGNvbnN0IFt0aGlzWE1pbiwgdGhpc1hNYXhdID0gdGhpc1NpZGVbMF07XG4gICAgY29uc3Qgb3RoZXJZVmFsID0gb3RoZXJTaWRlWzFdO1xuICAgIGNvbnN0IFtvdGhlclhNaW4sIG90aGVyWE1heF0gPSBvdGhlclNpZGVbMF07XG4gICAgXG4gICAgc3dpdGNoIChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIHVwcGVyRGlmZiA9IChvdGhlcllWYWwgLSB0aGlzWVZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKG90aGVyWVZhbCAtIHRoaXNZVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWVZhbCA8IG90aGVyWVZhbCkgJiZcbiAgICAgICAgICAodGhpc1hNaW4gPCBvdGhlclhNYXgpICYmXG4gICAgICAgICAgKHRoaXNYTWF4ID4gb3RoZXJYTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICB1cHBlckRpZmYgPSAodGhpc1lWYWwgLSBvdGhlcllWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9ICh0aGlzWVZhbCAtIG90aGVyWVZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1lWYWwgPiBvdGhlcllWYWwpICYmXG4gICAgICAgICAgKHRoaXNYTWluIDwgb3RoZXJYTWF4KSAmJlxuICAgICAgICAgICh0aGlzWE1heCA+IG90aGVyWE1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2xsaWRlZCkgcmV0dXJuIG90aGVyWVZhbDtcblxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHRoaXNYVmFsID0gdGhpc1NpZGVbMF07XG4gICAgY29uc3QgW3RoaXNZTWluLCB0aGlzWU1heF0gPSB0aGlzU2lkZVsxXTtcbiAgICBjb25zdCBvdGhlclhWYWwgPSBvdGhlclNpZGVbMF07XG4gICAgY29uc3QgW290aGVyWU1pbiwgb3RoZXJZTWF4XSA9IG90aGVyU2lkZVsxXTtcbiAgICBcbiAgICBzd2l0Y2ggKHNpZGUpIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHVwcGVyRGlmZiA9IChvdGhlclhWYWwgLSB0aGlzWFZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKG90aGVyWFZhbCAtIHRoaXNYVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWFZhbCA8IG90aGVyWFZhbCkgJiZcbiAgICAgICAgICAodGhpc1lNaW4gPCBvdGhlcllNYXgpICYmXG4gICAgICAgICAgKHRoaXNZTWF4ID4gb3RoZXJZTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKHRoaXNYVmFsIC0gb3RoZXJYVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAodGhpc1hWYWwgLSBvdGhlclhWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNYVmFsID4gb3RoZXJYVmFsKSAmJlxuICAgICAgICAgICh0aGlzWU1pbiA8IG90aGVyWU1heCkgJiZcbiAgICAgICAgICAodGhpc1lNYXggPiBvdGhlcllNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2xsaWRlZCkgcmV0dXJuIG90aGVyWFZhbDtcbiAgICBcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcblxufTtcblxuZXhwb3J0IGNvbnN0IHJvb21DaGFuZ2UgPSAoZXhpdERpciwgY3VyclJvb20pID0+IHtcbiAgbGV0IG5leHROb2RlUG9zID0gWy4uLmN1cnJSb29tLm5vZGVQb3NdO1xuICBzd2l0Y2goZXhpdERpcikge1xuICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgbmV4dE5vZGVQb3NbMV0gKz0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICBuZXh0Tm9kZVBvc1sxXSAtPSAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIG5leHROb2RlUG9zWzBdIC09IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgIG5leHROb2RlUG9zWzBdICs9IDE7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoR2xvYmFsLlJPT01TW2Ake25leHROb2RlUG9zfWBdKSB7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tID0gR2xvYmFsLlJPT01TW2Ake25leHROb2RlUG9zfWBdO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG5laWdoYm9yID0geyBbZXhpdERpcl06IGN1cnJSb29tIH07XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tID0gbmV3IFJvb20obmVpZ2hib3IpO1xuICAgIGFkZFZhbGlkTmVpZ2hib3JzKGN1cnJSb29tKTtcbiAgICBhZGRWYWxpZE5laWdoYm9ycyhHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmFuZE51bVBhdGhzID0gbWF4ID0+IHtcbiAgbGV0IHBhdGhzID0gW107XG4gIGlmIChtYXggPiAzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzRdOyBpKyspIHsgcGF0aHMucHVzaCg0KSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzNdOyBpKyspIHsgcGF0aHMucHVzaCgzKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzJdOyBpKyspIHsgcGF0aHMucHVzaCgyKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzFdOyBpKyspIHsgcGF0aHMucHVzaCgxKSB9XG4gIH0gZWxzZSBpZiAobWF4ID4gMikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVszXTsgaSsrKSB7IHBhdGhzLnB1c2goMykgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsyXTsgaSsrKSB7IHBhdGhzLnB1c2goMikgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsxXTsgaSsrKSB7IHBhdGhzLnB1c2goMSkgfVxuICB9IGVsc2UgaWYgKG1heCA+IDEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMl07IGkrKykgeyBwYXRocy5wdXNoKDIpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMV07IGkrKykgeyBwYXRocy5wdXNoKDEpIH1cbiAgfSBlbHNlIHtcbiAgICBwYXRocy5wdXNoKDEpO1xuICB9XG5cbiAgc2h1ZmZsZShwYXRocyk7XG5cbiAgcmV0dXJuIHBhdGhzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpwYXRocy5sZW5ndGgpXTtcbiAgXG59O1xuXG5leHBvcnQgY29uc3QgYWRkVmFsaWROZWlnaGJvcnMgPSByb29tID0+IHtcbiAgbGV0IHVwID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHVwWzFdICs9IDE7XG4gIHVwID0gdXAudG9TdHJpbmcoKTtcbiAgbGV0IGRvd24gPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgZG93blsxXSAtPSAxO1xuICBkb3duID0gZG93bi50b1N0cmluZygpO1xuICBsZXQgbGVmdCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBsZWZ0WzBdIC09IDE7XG4gIGxlZnQgPSBsZWZ0LnRvU3RyaW5nKCk7XG4gIGxldCByaWdodCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICByaWdodFswXSArPSAxO1xuICByaWdodCA9IHJpZ2h0LnRvU3RyaW5nKCk7XG4gIGlmIChcbiAgICBHbG9iYWwuUk9PTVNbdXBdICYmIFxuICAgIChHbG9iYWwuUk9PTVNbdXBdLm5laWdoYm9ycy5kb3duICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLnVwXG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLnVwID0gR2xvYmFsLlJPT01TW3VwXTtcbiAgICBHbG9iYWwuUk9PTVNbdXBdLm5laWdoYm9ycy5kb3duID0gcm9vbTtcbiAgfVxuICBpZiAoXG4gICAgR2xvYmFsLlJPT01TW2Rvd25dICYmIFxuICAgIChHbG9iYWwuUk9PTVNbZG93bl0ubmVpZ2hib3JzLnVwICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLmRvd25cbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMuZG93biA9IEdsb2JhbC5ST09NU1tkb3duXTtcbiAgICBHbG9iYWwuUk9PTVNbZG93bl0ubmVpZ2hib3JzLnVwID0gcm9vbTtcbiAgfVxuICBpZiAoXG4gICAgR2xvYmFsLlJPT01TW2xlZnRdICYmIFxuICAgIChHbG9iYWwuUk9PTVNbbGVmdF0ubmVpZ2hib3JzLnJpZ2h0ICE9PSBcIlhcIikgJiYgXG4gICAgIXJvb20ubmVpZ2hib3JzLmxlZnRcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMubGVmdCA9IEdsb2JhbC5ST09NU1tsZWZ0XTtcbiAgICBHbG9iYWwuUk9PTVNbbGVmdF0ubmVpZ2hib3JzLnJpZ2h0ID0gcm9vbTtcbiAgfVxuICBpZiAoXG4gICAgR2xvYmFsLlJPT01TW3JpZ2h0XSAmJiBcbiAgICAoR2xvYmFsLlJPT01TW3JpZ2h0XS5uZWlnaGJvcnMubGVmdCAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy5yaWdodFxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy5yaWdodCA9IEdsb2JhbC5ST09NU1tyaWdodF07XG4gICAgR2xvYmFsLlJPT01TW3JpZ2h0XS5uZWlnaGJvcnMubGVmdCA9IHJvb207XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZFBhdGhzID0gcm9vbSA9PiB7XG4gIGxldCBwYXRocyA9IFtdO1xuICBsZXQgdXAgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgdXBbMV0gKz0gMTtcbiAgdXAgPSB1cC50b1N0cmluZygpO1xuICBsZXQgZG93biA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBkb3duWzFdIC09IDE7XG4gIGRvd24gPSBkb3duLnRvU3RyaW5nKCk7XG4gIGxldCBsZWZ0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGxlZnRbMF0gLT0gMTtcbiAgbGVmdCA9IGxlZnQudG9TdHJpbmcoKTtcbiAgbGV0IHJpZ2h0ID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHJpZ2h0WzBdICs9IDE7XG4gIHJpZ2h0ID0gcmlnaHQudG9TdHJpbmcoKTtcbiAgaWYgKCFHbG9iYWwuUk9PTVNbdXBdIHx8IChHbG9iYWwuUk9PTVNbdXBdLm5laWdoYm9ycy5kb3duICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiVVwiKTtcbiAgfVxuICBpZiAoIUdsb2JhbC5ST09NU1tkb3duXSB8fCAoR2xvYmFsLlJPT01TW2Rvd25dLm5laWdoYm9ycy51cCAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIkRcIik7XG4gIH1cbiAgaWYgKCFHbG9iYWwuUk9PTVNbbGVmdF0gfHwgKEdsb2JhbC5ST09NU1tsZWZ0XS5uZWlnaGJvcnMucmlnaHQgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJMXCIpO1xuICB9XG4gIGlmICghR2xvYmFsLlJPT01TW3JpZ2h0XSB8fCAoR2xvYmFsLlJPT01TW3JpZ2h0XS5uZWlnaGJvcnMubGVmdCAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIlJcIik7XG4gIH1cbiAgcmV0dXJuIHBhdGhzLnNvcnQoKS5qb2luKFwiXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJsb2NrZWRQYXRocyA9IChyb29tLCBwYXRocykgPT4ge1xuICBpZiAoIXBhdGhzLmluY2x1ZGVzKFwiVVwiKSkge1xuICAgIHJvb20ubmVpZ2hib3JzLnVwID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIkRcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5kb3duID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIkxcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5sZWZ0ID0gXCJYXCI7XG4gIH1cbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIlJcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy5yaWdodCA9IFwiWFwiO1xuICB9XG59O1xuXG5jb25zdCByYW5kTnVtQ29pbnMgPSAoKSA9PiB7XG4gIGxldCB3ZWlnaHRlZE51bUNvaW5zID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLkNPSU5fV0VJR0hUU1szXTsgaSsrKSB7IHdlaWdodGVkTnVtQ29pbnMucHVzaCgzKSB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLkNPSU5fV0VJR0hUU1syXTsgaSsrKSB7IHdlaWdodGVkTnVtQ29pbnMucHVzaCgyKSB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLkNPSU5fV0VJR0hUU1sxXTsgaSsrKSB7IHdlaWdodGVkTnVtQ29pbnMucHVzaCgxKSB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLkNPSU5fV0VJR0hUU1swXTsgaSsrKSB7IHdlaWdodGVkTnVtQ29pbnMucHVzaCgwKSB9XG4gIGNvbnN0IHJhbmRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3ZWlnaHRlZE51bUNvaW5zLmxlbmd0aCk7XG4gIHNodWZmbGUod2VpZ2h0ZWROdW1Db2lucyk7XG4gIHJldHVybiB3ZWlnaHRlZE51bUNvaW5zW3JhbmRJZHhdO1xufTtcblxuZXhwb3J0IGNvbnN0IHJhbmRDb2luU291bmQgPSAoKSA9PiB7XG4gIGNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjb2luJHtpfWApO1xufVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVDb2lucyA9ICgpID0+IHtcbiAgY29uc3QgbnVtQ29pbnMgPSByYW5kTnVtQ29pbnMoKTtcbiAgbGV0IGNvaW5zID0ge307XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29pbnM7IGkrKykge1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICB3aGlsZSAoeCA+IDMzNiAmJiB4IDwgMzg0KSB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjU5MikgKyA2NDtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgd2hpbGUgKHkgPiAzMzYgJiYgeSA8IDM4NCkgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1OTIpICsgNjQ7XG4gICAgbGV0IHBvcyA9IFt4LHldO1xuICAgIGNvbnN0IGNvaW4gPSBuZXcgQ29pbihwb3MsIDE2LDE2LEdsb2JhbC5TUFJJVEVTLmNvaW4pO1xuICAgIGNvaW5zW2Ake2NvaW4ucG9zfWBdID0gY29pbjtcbiAgfVxuICByZXR1cm4gY29pbnM7XG59O1xuXG5leHBvcnQgY29uc3Qgc2h1ZmZsZSA9IGFyciA9PiB7XG4gIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgW2FycltpXSwgYXJyW2pdXSA9IFthcnJbal0sIGFycltpXV07XG4gIH1cbn07IiwiZXhwb3J0IGNvbnN0IFdJRFRIID0gNzIwO1xuZXhwb3J0IGNvbnN0IEhFSUdIVCA9IDcyMDtcbmV4cG9ydCBjb25zdCBTUFJJVEVfRElNUyA9IFs0OCw0OF07XG5leHBvcnQgY29uc3QgRlBTID0gMTAwMC82MDtcbmV4cG9ydCBjb25zdCBLRVlTID0ge1xuICA4NzogZmFsc2UsIC8vIFdcbiAgNjU6IGZhbHNlLCAvLyBBXG4gIDgzOiBmYWxzZSwgLy8gU1xuICA2ODogZmFsc2UsIC8vIERcbiAgMTY6IGZhbHNlLCAvLyBMLVNoaWZ0XG59O1xuZXhwb3J0IGNvbnN0IFJPT01TID0ge307XG5cbmV4cG9ydCBjb25zdCBTRVNTSU9OID0ge307XG5leHBvcnQgY29uc3QgU1BSSVRFUyA9IHt9O1xuZXhwb3J0IGNvbnN0IEJHX0lNR1MgPSB7fTtcblxuZXhwb3J0IGNvbnN0IENPSU5fV0VJR0hUUyA9IHtcbiAgMzogMTAsXG4gIDI6IDIwLFxuICAxOiAzMCxcbiAgMDogMjAsIFxufTtcblxuZXhwb3J0IGNvbnN0IEFMTF9QQVRIUyA9IFtcbiAgXCJETFJVXCIsXG4gIFwiRExSXCIsXG4gIFwiRExVXCIsXG4gIFwiTFJVXCIsXG4gIFwiRFJVXCIsXG4gIFwiRExcIixcbiAgXCJEUlwiLFxuICBcIkRVXCIsXG4gIFwiTFJcIixcbiAgXCJMVVwiLFxuICBcIlJVXCIsXG4gIFwiRFwiLFxuICBcIkxcIixcbiAgXCJSXCIsXG4gIFwiVVwiLFxuXTtcblxuZXhwb3J0IGNvbnN0IFdFSUdIVFMgPSB7XG4gIDQ6IHtcbiAgICA0OiA0NSxcbiAgICAzOiA0NSxcbiAgICAyOiA5LFxuICAgIDE6IDEsXG4gIH0sXG4gIDM6IHtcbiAgICAzOiA3MCxcbiAgICAyOiAyNSxcbiAgICAxOiA1LFxuICB9LFxuICAyOiB7XG4gICAgMjogNjAsXG4gICAgMTogNDAsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgR0FNRV9PUFRJT05TID0ge307XG5leHBvcnQgY29uc3QgUkVRVUVTVCA9IHt9OyIsImltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2dhbWVcIjtcbmltcG9ydCB7IG5ld0dhbWUgfSBmcm9tIFwiLi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoS0VZUykgPT4ge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA4NyAmJiAhS0VZU1s4N10pIEtFWVNbZS5rZXlDb2RlXSA9IHRydWU7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gNjUgJiYgIUtFWVNbNjVdKSBLRVlTW2Uua2V5Q29kZV0gPSB0cnVlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDgzICYmICFLRVlTWzgzXSkgS0VZU1tlLmtleUNvZGVdID0gdHJ1ZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA2OCAmJiAhS0VZU1s2OF0pIEtFWVNbZS5rZXlDb2RlXSA9IHRydWU7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTYgJiYgIUtFWVNbMTZdKSBLRVlTW2Uua2V5Q29kZV0gPSB0cnVlO1xuXG4gIH0pO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gODcgJiYgS0VZU1s4N10pIEtFWVNbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDY1ICYmIEtFWVNbNjVdKSBLRVlTW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA4MyAmJiBLRVlTWzgzXSkgS0VZU1tlLmtleUNvZGVdID0gZmFsc2U7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gNjggJiYgS0VZU1s2OF0pIEtFWVNbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDE2ICYmIEtFWVNbMTZdKSBLRVlTW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgfSk7XG5cbiAgY29uc3QgaG93VG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10b1wiKTtcbiAgXG4gIGhvd1RvLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvLXBvaW50ZXJcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10by1zb3VuZFwiKS5wbGF5KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG9cIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvdy10byA+IHVsXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH0pO1xuICBob3dUby5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10b1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvLXBvaW50ZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvdy10byA+IHVsXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH0pO1xuXG4gIGNvbnN0IHJlc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnRcIik7XG4gIHJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0LXNvdW5kXCIpLnBsYXkoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnRcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnQtcG9pbnRlclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9KTtcbiAgcmVzdGFydC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnRcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3RhcnQtcG9pbnRlclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9KTtcbiAgcmVzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG5ld0dhbWUoKTtcbiAgfSk7XG5cbn1cbiIsImNsYXNzIFdhbGwge1xuICBjb25zdHJ1Y3Rvcihwb3MsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgY29uc3QgW3gseV0gPSB0aGlzLnBvcztcbiAgICBjb25zdCB0b3BMZWZ0ID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wUmlnaHQgPSBbeCt0aGlzLndpZHRoLHldO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gW3grdGhpcy53aWR0aCx5K3RoaXMuaGVpZ2h0XTtcbiAgICBjb25zdCBib3R0b21MZWZ0ID0gW3gseSt0aGlzLmhlaWdodF07XG4gICAgdGhpcy50b3AgPSBbW3RvcExlZnRbMF0sdG9wUmlnaHRbMF1dLCB0b3BMZWZ0WzFdXTtcbiAgICB0aGlzLmJvdHRvbSA9IFtbYm90dG9tTGVmdFswXSxib3R0b21SaWdodFswXV0sIGJvdHRvbUxlZnRbMV1dO1xuICAgIHRoaXMucmlnaHQgPSBbdG9wUmlnaHRbMF0sIFt0b3BSaWdodFsxXSxib3R0b21SaWdodFsxXV1dO1xuICAgIHRoaXMubGVmdCA9IFt0b3BMZWZ0WzBdLCBbdG9wTGVmdFsxXSxib3R0b21MZWZ0WzFdXV07XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjdHJhbnNwYXJlbnRcIjtcbiAgICBjdHguZmlsbFJlY3QoLi4udGhpcy5wb3MsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhbGw7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQgaW5zdGFsbExpc3RlbmVycyBmcm9tIFwiLi9zY3JpcHRzL3V0aWxzL2luc3RhbGxfbGlzdGVuZXJzXCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vc2NyaXB0cy91dGlscy9nbG9iYWxfdmFyc1wiO1xuaW1wb3J0IHsgbmV3R2FtZSB9IGZyb20gXCIuL3NjcmlwdHMvdXRpbHMvZnVuY191dGlsc1wiO1xuXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKTtcbiAgY2FudmFzLndpZHRoID0gR2xvYmFsLldJRFRIO1xuICBjYW52YXMuaGVpZ2h0ID0gR2xvYmFsLkhFSUdIVDtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBpbnN0YWxsTGlzdGVuZXJzKEdsb2JhbC5LRVlTKTtcblxuICBcblxuICBsZXQgY29pblNwcml0ZSA9IG5ldyBJbWFnZSgpO1xuICBjb2luU3ByaXRlLnNyYyA9IFwiLi9kaXN0L2Fzc2V0cy9pbWFnZXMvY29pbi9jb2luLnBuZ1wiO1xuICBjb2luU3ByaXRlLm9ubG9hZCA9ICgpID0+IHtcbiAgICBHbG9iYWwuU1BSSVRFUy5jb2luID0gY29pblNwcml0ZTtcbiAgfTtcbiAgXG4gIGZvciAobGV0IHBhdGggb2YgR2xvYmFsLkFMTF9QQVRIUykge1xuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiXCIpLnNvcnQoKS5qb2luKFwiXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBjb25zdCBiYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XG4gICAgICBiYWNrZ3JvdW5kLnNyYyA9IGAuL2Rpc3QvYXNzZXRzL2ltYWdlcy9tYXBfaW1ncy8ke3BhdGgubGVuZ3RofS8ke3BhdGh9L21hcCR7aX0ucG5nYDtcbiAgICAgIFxuICAgICAgYmFja2dyb3VuZC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIEdsb2JhbC5CR19JTUdTW2Ake3BhdGgubGVuZ3RofSR7cGF0aH0ke2l9YF0gPSBiYWNrZ3JvdW5kO1xuICAgICAgICAvLyBHbG9iYWwuR0JfSU1HU1tcIjRETFJVMFwiXSA9IGJhY2tncm91bmRcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbGV0IHBsYXllclNwcml0ZSA9IG5ldyBJbWFnZSgpO1xuICBwbGF5ZXJTcHJpdGUuc3JjID0gXCIuL2Rpc3QvYXNzZXRzL2ltYWdlcy9yb2d1ZS9yb2d1ZV93YWxrLnBuZ1wiO1xuICBcbiAgcGxheWVyU3ByaXRlLm9ubG9hZCA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIEdsb2JhbC5HQU1FX09QVElPTlNbXCJjdHhcIl0gPSBjdHg7XG4gICAgR2xvYmFsLkdBTUVfT1BUSU9OU1tcInBsYXllclNwcml0ZVwiXSA9IHBsYXllclNwcml0ZTtcbiAgICBuZXdHYW1lKCk7XG4gICAgfSwxMDAwKTtcbiAgICBcbiAgfVxuXG59KTsiXSwic291cmNlUm9vdCI6IiJ9