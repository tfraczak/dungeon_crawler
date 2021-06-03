/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    this.bottom = [bottomLeft, bottomRight];
    this.right = [topRight, bottomRight];
    this.left = [topLeft, bottomLeft];
    this.sides = [this.top, this.bottom, this.right, this.left];
  }

  _createClass(ColBox, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.strokeStyle = "red";
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
    _utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SESSION.coins = 0;
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

 // import GameCoin from "./game_coin";



var Room = /*#__PURE__*/function () {
  function Room(neighbor) {
    _classCallCheck(this, Room);

    this.coins = [];
    this.walls = [];
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
    (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.addValidNeighbors)(this);
    var walls, numPaths, randPaths;
    var newPaths = [];
    var paths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.buildPaths)(this);
    var pathsArr = paths.split("");

    if (neighbor) {
      // if not initial room
      pathsArr = pathsArr.filter(function (path) {
        return path !== entryDir;
      }); // remove entryDir from paths

      numPaths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.randNumPaths)(paths.length); // weighted random number generator, prefers more paths

      if (numPaths === paths.length) {
        var _this$walls;

        // if all 4 paths are available
        walls = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.buildRoomWalls)(paths);

        (_this$walls = this.walls).push.apply(_this$walls, _toConsumableArray(walls));
      } else {
        var _this$walls2;

        // less than 4 paths available
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.shuffle)(pathsArr); // randomize the path choices

        newPaths.push(entryDir); // MUST ALWAYS have the path you enter from

        for (var i = 0; i < numPaths; i++) {
          newPaths.push(pathsArr.pop());
        }

        newPaths = newPaths.sort().join("");
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.assignBlockedPaths)(this, newPaths);
        walls = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.buildRoomWalls)(newPaths);

        (_this$walls2 = this.walls).push.apply(_this$walls2, _toConsumableArray(walls));
      }
    } else {
      numPaths = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.randNumPaths)(paths.length);

      if (numPaths === paths.length) {
        var _this$walls3;

        walls = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.buildRoomWalls)(paths);

        (_this$walls3 = this.walls).push.apply(_this$walls3, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(this.nodePos)];
      } else {
        var _this$walls4;

        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.shuffle)(pathsArr);

        for (var _i = 0; _i < numPaths; _i++) {
          newPaths.push(pathsArr.pop());
        }

        newPaths = newPaths.sort().join("");
        (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.assignBlockedPaths)(this, newPaths);
        walls = (0,_utils_func_utils__WEBPACK_IMPORTED_MODULE_1__.buildRoomWalls)(newPaths);

        (_this$walls4 = this.walls).push.apply(_this$walls4, _toConsumableArray(walls));

        _utils_global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS["".concat(this.nodePos)];
      }
    }
  }

  _createClass(Room, [{
    key: "generateCoins",
    value: function generateCoins() {}
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.walls.forEach(function (object) {
        return object.draw(ctx);
      });
      ctx.fillStyle = "#333333";
      ctx.font = "20px arial";
      ctx.fillText("Room [ ".concat(this.nodePos, " ]"), 15, 30);
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
/* harmony export */   "buildRoomWalls": () => (/* binding */ buildRoomWalls),
/* harmony export */   "shuffle": () => (/* binding */ shuffle)
/* harmony export */ });
/* harmony import */ var _global_vars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global_vars */ "./src/scripts/utils/global_vars.js");
/* harmony import */ var _wall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wall */ "./src/scripts/wall.js");
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../room */ "./src/scripts/room.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game */ "./src/scripts/game.js");
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

    for (var room in _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS) {
      delete _global_vars__WEBPACK_IMPORTED_MODULE_0__.ROOMS[room];
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
var buildRoomWalls = function buildRoomWalls(paths) {
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
  }
}; // export const generateCoins = () => {
//   const numCoins = Math.floor(Math.random()*4);
//   for (let i = 0; i < numCoins; i++) {
//     let x = Math.floor(Math.random()*624) + 48;
//     while (x > 336 && x < 384) x = Math.floor(Math.random()*624) + 48;
//     let y = Math.floor(Math.random()*624) + 48;
//     while (y > 336 && y < 384) y = Math.floor(Math.random()*624) + 48;
//     let pos = [x,y];
//     Global.SESSION.game.room.coins.push(new Coin(pos, 16,16,))
//   }
// };

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
      ctx.fillStyle = "#FF2222";
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




document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("display");
  canvas.width = _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.WIDTH;
  canvas.height = _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.HEIGHT;
  var ctx = canvas.getContext("2d");
  (0,_scripts_utils_install_listeners__WEBPACK_IMPORTED_MODULE_1__.default)(_scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.KEYS);
  var coinSprite = new Image();
  coinSprite.src = "../src/assets/images/coin/coin.png";

  coinSprite.onload = function () {
    _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.SPRITES.coin = coinSprite;
  };

  var playerSprite = new Image();
  playerSprite.src = "../src/assets/images/rogue/rogue_walk.png";

  playerSprite.onload = function () {
    _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.GAME_OPTIONS.ctx = ctx;
    _scripts_utils_global_vars__WEBPACK_IMPORTED_MODULE_2__.GAME_OPTIONS.playerSprite = playerSprite;
    (0,_scripts_utils_func_utils__WEBPACK_IMPORTED_MODULE_3__.newGame)();
  };
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9jb2xsaXNpb25fYm94LmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9nYW1lLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc2NyaXB0cy9yb29tLmpzIiwid2VicGFjazovL2R1bmdlb25fY3Jhd2xlci8uL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmNfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvdXRpbHMvZ2xvYmFsX3ZhcnMuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvdXRpbHMvaW5zdGFsbF9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyLy4vc3JjL3NjcmlwdHMvd2FsbC5qcyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvc3R5bGVzL2luZGV4LnNjc3M/ODU1OSIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHVuZ2Vvbl9jcmF3bGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kdW5nZW9uX2NyYXdsZXIvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ29sQm94IiwiZW50aXR5Iiwid2lkdGgiLCJoZWlnaHQiLCJwb3MiLCJvcmlnaW5Qb3MiLCJ4IiwieSIsInRvcExlZnQiLCJ0b3BSaWdodCIsImJvdHRvbVJpZ2h0IiwiYm90dG9tTGVmdCIsImNlbnRlciIsInRvcCIsImJvdHRvbSIsInJpZ2h0IiwibGVmdCIsInNpZGVzIiwiY3R4Iiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0IiwiZXgiLCJleSIsImV3IiwiZWgiLCJ0dyIsInRoIiwiY29sQm94SG9vayIsInVwZGF0ZVNpZGVzIiwiRW50aXR5Iiwic3ByaXRlUGFsZXR0ZSIsImNvbEJveFdpZHRoIiwiY29sQm94SGVpZ2h0IiwiZHJhd09wdGlvbnMiLCJpbWFnZSIsInBhbFgiLCJwYWxZIiwiX3NXaWR0aCIsIl9zSGVpZ2h0IiwiX2RXaWR0aCIsIl9kSGVpZ2h0IiwiY29sQm94IiwiY29sbGlzaW9ucyIsImN4IiwiY3kiLCJzaWRlIiwib3RoZXJPYmplY3QiLCJvdGhlclNpZGUiLCJjb2xsaWRlZFdpdGhTaWRlIiwiZHJhd0ltYWdlIiwiT2JqZWN0IiwidmFsdWVzIiwiY2VudGVyT25FbnRpdHkiLCJkcmF3IiwiR2FtZSIsInBsYXllclNwcml0ZSIsInN0YXJ0aW5nUG9zIiwicGxheWVyIiwiUGxheWVyIiwiR2xvYmFsIiwic3RhcnRpbmdSb29tIiwiUm9vbSIsInJvb20iLCJnYW1lU3RlcCIsImJpbmQiLCJzdG9wIiwicmVxdWVzdElkIiwicmVxdWVzdFN0b3AiLCJ1bmRlZmluZWQiLCJjbGVhclJlY3QiLCJtb3ZlIiwid2FsbHMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInNwZWVkIiwibm9ybWFsaXplZFNwZWVkIiwicGFyc2VGbG9hdCIsIk1hdGgiLCJzcXJ0IiwicGFjZSIsInNwZWVkTW9kaWZpZXIiLCJzdHJpZGUiLCJ1cCIsInN0ZXBDb3VudCIsImRvd24iLCJkaXIiLCJkaXJlY3Rpb24iLCJzaGlmdCIsIndhbGwiLCJjb2xsaWRlZE9uU2lkZSIsInN0cmlkZVBhbGV0dGVQb3MiLCJleGl0RGlyIiwibmV3Um9vbVBvcyIsInJvb21DaGFuZ2UiLCJuZWlnaGJvciIsImNvaW5zIiwibmVpZ2hib3JzIiwiZW50cnlEaXIiLCJrZXlzIiwicHJldlJvb20iLCJub2RlUG9zIiwiYWRkVmFsaWROZWlnaGJvcnMiLCJudW1QYXRocyIsInJhbmRQYXRocyIsIm5ld1BhdGhzIiwicGF0aHMiLCJidWlsZFBhdGhzIiwicGF0aHNBcnIiLCJzcGxpdCIsImZpbHRlciIsInBhdGgiLCJyYW5kTnVtUGF0aHMiLCJsZW5ndGgiLCJidWlsZFJvb21XYWxscyIsInB1c2giLCJzaHVmZmxlIiwiaSIsInBvcCIsInNvcnQiLCJqb2luIiwiYXNzaWduQmxvY2tlZFBhdGhzIiwiZm9yRWFjaCIsIm9iamVjdCIsImZpbGxTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsIm5ld0dhbWUiLCJ0aGlzU2lkZSIsImNvbGxpZGVkIiwidXBwZXJEaWZmIiwibG93ZXJEaWZmIiwidXBwZXJCb3VuZHMiLCJsb3dlckJvdW5kcyIsInRoaXNZVmFsIiwidGhpc1hNaW4iLCJ0aGlzWE1heCIsIm90aGVyWVZhbCIsIm90aGVyWE1pbiIsIm90aGVyWE1heCIsInRoaXNYVmFsIiwidGhpc1lNaW4iLCJ0aGlzWU1heCIsIm90aGVyWFZhbCIsIm90aGVyWU1pbiIsIm90aGVyWU1heCIsImN1cnJSb29tIiwibmV4dE5vZGVQb3MiLCJtYXgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwiaW5jbHVkZXMiLCJXYWxsIiwiYXJyIiwiaiIsIldJRFRIIiwiSEVJR0hUIiwiU1BSSVRFX0RJTVMiLCJGUFMiLCJLRVlTIiwiUk9PTVMiLCJTRVNTSU9OIiwiU1BSSVRFUyIsIldFSUdIVFMiLCJHQU1FX09QVElPTlMiLCJSRVFVRVNUIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJob3dUbyIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwiYWRkIiwicGxheSIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmUiLCJyZXN0YXJ0IiwicHJldmVudERlZmF1bHQiLCJiZWdpblBhdGgiLCJmaWxsUmVjdCIsImNhbnZhcyIsImdldENvbnRleHQiLCJpbnN0YWxsTGlzdGVuZXJzIiwiY29pblNwcml0ZSIsIkltYWdlIiwic3JjIiwib25sb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxNO0FBQ0osa0JBQVlDLE1BQVosRUFBb0JDLEtBQXBCLEVBQTJCQyxNQUEzQixFQUFtQztBQUFBOztBQUNqQyxTQUFLRixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS0MsU0FBTCxFQUFYOztBQUVBLG1DQUFjLEtBQUtELEdBQW5CO0FBQUEsUUFBT0UsQ0FBUDtBQUFBLFFBQVNDLENBQVQ7O0FBQ0EsUUFBTUMsT0FBTyxHQUFHLEtBQUtKLEdBQXJCO0FBQ0EsUUFBTUssUUFBUSxHQUFHLENBQUNILENBQUMsR0FBQ0osS0FBSCxFQUFTSyxDQUFULENBQWpCO0FBQ0EsUUFBTUcsV0FBVyxHQUFHLENBQUNKLENBQUMsR0FBQ0osS0FBSCxFQUFTSyxDQUFDLEdBQUNKLE1BQVgsQ0FBcEI7QUFDQSxRQUFNUSxVQUFVLEdBQUcsQ0FBQ0wsQ0FBRCxFQUFHQyxDQUFDLEdBQUNKLE1BQUwsQ0FBbkI7QUFFQSxTQUFLUyxNQUFMLEdBQWMsQ0FBQ04sQ0FBQyxHQUFFSixLQUFLLEdBQUMsQ0FBVixFQUFhSyxDQUFDLEdBQUVKLE1BQU0sR0FBQyxDQUF2QixDQUFkO0FBQ0EsU0FBS1UsR0FBTCxHQUFXLENBQUMsQ0FBQ0wsT0FBTyxDQUFDLENBQUQsQ0FBUixFQUFhQyxRQUFRLENBQUMsQ0FBRCxDQUFyQixDQUFELEVBQTJCRCxPQUFPLENBQUMsQ0FBRCxDQUFsQyxDQUFYO0FBQ0EsU0FBS00sTUFBTCxHQUFjLENBQUNILFVBQUQsRUFBWUQsV0FB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QUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUlBYyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBRWxELE1BQU1jLE1BQU0sR0FBR2YsUUFBUSxDQUFDSyxjQUFULENBQXdCLFNBQXhCLENBQWY7QUFDQVUsUUFBTSxDQUFDbkwsS0FBUCxHQUFleUQsNkRBQWY7QUFDQTBILFFBQU0sQ0FBQ2xMLE1BQVAsR0FBZ0J3RCw4REFBaEI7QUFDQSxNQUFNekMsR0FBRyxHQUFHbUssTUFBTSxDQUFDQyxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFFQUMsMkVBQWdCLENBQUM1SCw0REFBRCxDQUFoQjtBQUVBLE1BQUk2SCxVQUFVLEdBQUcsSUFBSUMsS0FBSixFQUFqQjtBQUNBRCxZQUFVLENBQUNFLEdBQVgsR0FBaUIsb0NBQWpCOztBQUNBRixZQUFVLENBQUNHLE1BQVgsR0FBb0IsWUFBTTtBQUN4QmhJLHdFQUFBLEdBQXNCNkgsVUFBdEI7QUFDRCxHQUZEOztBQUdBLE1BQUlqSSxZQUFZLEdBQUcsSUFBSWtJLEtBQUosRUFBbkI7QUFDQWxJLGNBQVksQ0FBQ21JLEdBQWIsR0FBbUIsMkNBQW5COztBQUdBbkksY0FBWSxDQUFDb0ksTUFBYixHQUFzQixZQUFNO0FBQzFCaEksNEVBQUEsR0FBNkJ6QyxHQUE3QjtBQUNBeUMscUZBQUEsR0FBc0NKLFlBQXRDO0FBQ0F1RSxzRUFBTztBQUNSLEdBSkQ7QUFNRCxDQXhCRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY2xhc3MgQ29sQm94IHtcbiAgY29uc3RydWN0b3IoZW50aXR5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbnRpdHkgPSBlbnRpdHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucG9zID0gdGhpcy5vcmlnaW5Qb3MoKTtcblxuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grd2lkdGgseV07XG4gICAgY29uc3QgYm90dG9tUmlnaHQgPSBbeCt3aWR0aCx5K2hlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkraGVpZ2h0XTtcbiAgICBcbiAgICB0aGlzLmNlbnRlciA9IFt4Kyh3aWR0aC8yKSx5KyhoZWlnaHQvMildO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLCB0b3BSaWdodFswXV0sdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbYm90dG9tTGVmdCxib3R0b21SaWdodF07XG4gICAgdGhpcy5yaWdodCA9IFt0b3BSaWdodCxib3R0b21SaWdodF07XG4gICAgdGhpcy5sZWZ0ID0gW3RvcExlZnQsYm90dG9tTGVmdF07XG4gICAgdGhpcy5zaWRlcyA9IFt0aGlzLnRvcCwgdGhpcy5ib3R0b20sIHRoaXMucmlnaHQsIHRoaXMubGVmdF07XG4gICAgXG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgY3R4LnN0cm9rZVJlY3QoXG4gICAgICB0aGlzLnBvc1swXSxcbiAgICAgIHRoaXMucG9zWzFdLFxuICAgICAgdGhpcy53aWR0aCxcbiAgICAgIHRoaXMuaGVpZ2h0LFxuICAgIClcbiAgfVxuXG4gIHVwZGF0ZVNpZGVzKCkge1xuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grdGhpcy53aWR0aCx5XTtcbiAgICBjb25zdCBib3R0b21SaWdodCA9IFt4K3RoaXMud2lkdGgseSt0aGlzLmhlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkrdGhpcy5oZWlnaHRdO1xuICAgIHRoaXMuY2VudGVyID0gW3grKHRoaXMud2lkdGgvMikseSsodGhpcy5oZWlnaHQvMildO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICB9XG5cbiAgb3JpZ2luUG9zKCkge1xuICAgIGNvbnN0IFtleCxleV0gPSBbdGhpcy5lbnRpdHkucG9zWzBdLCB0aGlzLmVudGl0eS5wb3NbMV1dO1xuICAgIGNvbnN0IFtldyxlaF0gPSBbdGhpcy5lbnRpdHkud2lkdGgsIHRoaXMuZW50aXR5LmhlaWdodF07XG4gICAgY29uc3QgW3R3LHRoXSA9IFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF07XG4gICAgY29uc3QgeCA9IGV4ICsgKChldy10dykvMik7XG4gICAgY29uc3QgeSA9IGV5ICsgZWggLSB0aDtcbiAgICByZXR1cm4gW3gseV07XG4gIH1cblxuICBjZW50ZXJPbkVudGl0eSgpIHtcbiAgICB0aGlzLnBvcyA9IHRoaXMuZW50aXR5LmNvbEJveEhvb2soKTtcbiAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xCb3g7IiwiaW1wb3J0IENvbEJveCBmcm9tIFwiLi9jb2xsaXNpb25fYm94XCI7XG5pbXBvcnQgeyBjb2xsaWRlZFdpdGhTaWRlIH0gZnJvbSBcIi4vdXRpbHMvZnVuY191dGlsc1wiO1xuXG5jbGFzcyBFbnRpdHkge1xuICBjb25zdHJ1Y3Rvcihwb3Msd2lkdGgsaGVpZ2h0LHNwcml0ZVBhbGV0dGUpIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29sQm94V2lkdGggPSB3aWR0aC8yO1xuICAgIGNvbnN0IGNvbEJveEhlaWdodCA9IGhlaWdodC8zO1xuICAgIFxuICAgIHRoaXMuc3ByaXRlUGFsZXR0ZSA9IHNwcml0ZVBhbGV0dGU7XG4gICAgdGhpcy5kcmF3T3B0aW9ucyA9IHtcbiAgICAgIGltYWdlOiBzcHJpdGVQYWxldHRlLFxuICAgICAgcGFsWDogMCxcbiAgICAgIHBhbFk6IDAsXG4gICAgICBfc1dpZHRoOiB3aWR0aCxcbiAgICAgIF9zSGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiBwb3NbMF0sXG4gICAgICB5OiBwb3NbMV0sXG4gICAgICBfZFdpZHRoOiB3aWR0aCxcbiAgICAgIF9kSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICB0aGlzLmNvbEJveCA9IG5ldyBDb2xCb3godGhpcyxjb2xCb3hXaWR0aCxjb2xCb3hIZWlnaHQpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICAgIHRoaXMuY29sbGlzaW9ucyA9IHtcbiAgICAgIHRvcDogZmFsc2UsXG4gICAgICBib3R0b206IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICByaWdodDogZmFsc2UsXG4gICAgfTtcbiAgICBcbiAgfVxuXG4gIGNvbEJveEhvb2soKSB7IC8vIHRoaXMgd2lsbCBjZW50ZXIgdGhlIGNvbEJveCBvbiB0aGUgYm90dG9tXG4gICAgbGV0IFt4LHldID0gW3RoaXMucG9zWzBdLHRoaXMucG9zWzFdXTtcbiAgICBsZXQgW2N4LGN5XSA9IFtcbiAgICAgIHgrKCh0aGlzLndpZHRoIC0gdGhpcy5jb2xCb3gud2lkdGgpLzIpLFxuICAgICAgeSsodGhpcy5oZWlnaHQgLSB0aGlzLmNvbEJveC5oZWlnaHQpLFxuICAgIF07XG4gICAgcmV0dXJuIFtjeCxjeV07XG4gIH1cblxuICB1cGRhdGVTaWRlcygpIHtcbiAgICB0aGlzLmNvbEJveC51cGRhdGVTaWRlcygpO1xuICAgIHRoaXMudG9wID0gdGhpcy5jb2xCb3gudG9wO1xuICAgIHRoaXMuYm90dG9tID0gdGhpcy5jb2xCb3guYm90dG9tO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuY29sQm94LmxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuY29sQm94LnJpZ2h0O1xuICB9XG5cbiAgY29sbGlkZWRPblNpZGUoc2lkZSwgb3RoZXJPYmplY3QpIHtcbiAgICBsZXQgb3RoZXJTaWRlO1xuICAgIHN3aXRjaChzaWRlKSB7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwiYm90dG9tXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBvdGhlclNpZGUgPSBcInRvcFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIG90aGVyU2lkZSA9IFwicmlnaHRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgb3RoZXJTaWRlID0gXCJsZWZ0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3RoZXJTaWRlID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY29sbGlzaW9uc1tzaWRlXSA9IGNvbGxpZGVkV2l0aFNpZGUoc2lkZSwgdGhpc1tzaWRlXSwgb3RoZXJPYmplY3Rbb3RoZXJTaWRlXSk7XG4gICAgcmV0dXJuIHRoaXMuY29sbGlzaW9uc1tzaWRlXTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZSguLi5PYmplY3QudmFsdWVzKHRoaXMuZHJhd09wdGlvbnMpKTtcbiAgICB0aGlzLmNvbEJveC5jZW50ZXJPbkVudGl0eSgpO1xuICAgIHRoaXMuY29sQm94LmRyYXcoY3R4KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHk7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBSb29tIGZyb20gXCIuL3Jvb21cIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi91dGlscy9nbG9iYWxfdmFyc1wiO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoY3R4LCBwbGF5ZXJTcHJpdGUpIHtcbiAgICBjb25zdCBzdGFydGluZ1BvcyA9IFs0OCo3LCA0OCo3XTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoc3RhcnRpbmdQb3MsIC4uLkdsb2JhbC5TUFJJVEVfRElNUywgcGxheWVyU3ByaXRlKTtcbiAgICBHbG9iYWwuU0VTU0lPTi5wbGF5ZXIgPSB0aGlzLnBsYXllcjtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAvLyBjb25zdCByb29tID0geyBcImxlZnRcIjogbmV3IFJvb20oKSB9OyAvLyB0ZXN0aW5nIG5ldyBSb29tKHJvb20pXG4gICAgdGhpcy5zdGFydGluZ1Jvb20gPSBuZXcgUm9vbSgpO1xuICAgIHRoaXMucm9vbSA9IHRoaXMuc3RhcnRpbmdSb29tO1xuICAgIHRoaXMucGxheWVyLmRyYXcoY3R4KTtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lID0gdGhpcztcbiAgICBHbG9iYWwuU0VTU0lPTi5zdG9wID0gZmFsc2U7XG4gICAgR2xvYmFsLlNFU1NJT04uY29pbnMgPSAwO1xuICAgIHRoaXMuZ2FtZVN0ZXAgPSB0aGlzLmdhbWVTdGVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdG9wID0gdGhpcy5zdG9wLmJpbmQodGhpcyk7XG4gICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5wbGF5KCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLnJlcXVlc3RJZCkge1xuICAgICAgdGhpcy5yZXF1ZXN0U3RvcCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2FtZVN0ZXAoKSB7XG4gICAgdGhpcy5yZXF1ZXN0SWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKCF0aGlzLnJlcXVlc3RJZCkge1xuICAgICAgY29uc3QgcGxheWVyID0gR2xvYmFsLlNFU1NJT04ucGxheWVyO1xuICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsMCwgR2xvYmFsLldJRFRILCBHbG9iYWwuSEVJR0hUKTtcbiAgICAgIHBsYXllci5tb3ZlKHRoaXMucm9vbS53YWxscyk7XG4gICAgICB0aGlzLnJvb20uZHJhdyh0aGlzLmN0eCk7XG4gICAgICBwbGF5ZXIuZHJhdyh0aGlzLmN0eCk7XG4gICAgICB0aGlzLnJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVTdGVwKTtcbiAgICAgIGlmICh0aGlzLnJlcXVlc3RTdG9wKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5nYW1lU3RlcCgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVTdGVwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5pbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCB7IHJvb21DaGFuZ2UgfSBmcm9tIFwiLi91dGlscy9mdW5jX3V0aWxzXCI7XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEVudGl0eSB7XG4gIGNvbnN0cnVjdG9yKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSkge1xuICAgIHN1cGVyKHBvcyx3aWR0aCxoZWlnaHQsc3ByaXRlUGFsZXR0ZSk7XG4gICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgdGhpcy5ub3JtYWxpemVkU3BlZWQgPSBwYXJzZUZsb2F0KHRoaXMuc3BlZWQpIC8gTWF0aC5zcXJ0KDIpO1xuICAgIHRoaXMucGFjZSA9IDI0L3RoaXMuc3BlZWQ7XG4gICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gMTtcbiAgICB0aGlzLnN0cmlkZSA9IHtcbiAgICAgIHVwOiB7XG4gICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgcGFsWTogNDggKiA2LFxuICAgICAgfSxcbiAgICAgIGRvd246IHtcbiAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICBwYWxZOiA0OCAqIDAsXG4gICAgICB9LFxuICAgICAgbGVmdDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogMixcbiAgICAgIH0sXG4gICAgICByaWdodDoge1xuICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgIHBhbFk6IDQ4ICogNCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG5ld1Jvb21Qb3MoZGlyKSB7XG4gICAgc3dpdGNoKGRpcikge1xuICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgIHRoaXMucG9zWzFdID0gNzIwLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgIHRoaXMucG9zWzFdID0gLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHRoaXMucG9zWzBdID0gNzIwLTI0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB0aGlzLnBvc1swXSA9IC0yNDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RyaWRlUGFsZXR0ZVBvcyhkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnBhY2UgPSAyNCAvICh0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyKTtcbiAgICBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50IDw9IDIgKiB0aGlzLnBhY2UpIHtcbiAgICAgIHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50Kys7XG4gICAgICByZXR1cm4gNDggKiAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPD0gMyAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQrKztcbiAgICAgIHJldHVybiA0OCAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCA8PSA0ICogdGhpcy5wYWNlKSB7XG4gICAgICB0aGlzLnN0cmlkZVtkaXJlY3Rpb25dLnN0ZXBDb3VudCsrO1xuICAgICAgcmV0dXJuIDQ4ICogMjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RyaWRlW2RpcmVjdGlvbl0uc3RlcENvdW50ID4gNCAqIHRoaXMucGFjZSkge1xuICAgICAgdGhpcy5zdHJpZGVbZGlyZWN0aW9uXS5zdGVwQ291bnQgPSAwO1xuICAgICAgcmV0dXJuIDQ4ICogMTtcbiAgICB9XG4gIH1cblxuICBtb3ZlKHdhbGxzKSB7XG4gICAgY29uc3QgW1xuICAgICAgdXAsXG4gICAgICBkb3duLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0LFxuICAgICAgc2hpZnRcbiAgICBdID0gW1xuICAgICAgR2xvYmFsLktFWVNbODddLFxuICAgICAgR2xvYmFsLktFWVNbODNdLFxuICAgICAgR2xvYmFsLktFWVNbNjVdLFxuICAgICAgR2xvYmFsLktFWVNbNjhdLFxuICAgICAgR2xvYmFsLktFWVNbMTZdLFxuICAgIF07XG4gICAgaWYgKHNoaWZ0KSB7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSAxO1xuICAgIH1cblxuICAgIFxuXG4gICAgLy8gVyBrZXkgbW92ZW1lbnRzIGFuZCBzcHJpdGUgZGlyZWN0aW9uXG4gICAgaWYgKHVwKSB7XG4gICAgICBpZiAobGVmdCB8fCByaWdodCkge1xuICAgICAgICB0aGlzLmNvbEJveC5wb3NbMV0gKz0gLXRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzFdICs9IC10aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwidG9wXCIsIHdhbGwpKSBicmVhayB9XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25zLnRvcCkge1xuICAgICAgICB0aGlzLnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy50b3AgLSAodGhpcy5oZWlnaHQtdGhpcy5jb2xCb3guaGVpZ2h0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0ICYmICF0aGlzLmNvbGxpc2lvbnMudG9wKSB7XG4gICAgICAgICAgdGhpcy5wb3NbMV0gKz0gLXRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBvc1sxXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLnVwLnBhbFk7XG4gICAgICBpZiAoIWxlZnQgJiYgIXJpZ2h0KSB7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcInVwXCIpO1xuICAgICAgICBcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTIGtleSBtb3ZlbWVudHMgYW5kIHNwcml0ZSBkaXJlY3Rpb25cbiAgICBpZiAoZG93bikge1xuICAgICAgaWYgKGxlZnQgfHwgcmlnaHQpIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzFdICs9IHRoaXMubm9ybWFsaXplZFNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzFdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZVNpZGVzKCk7XG4gICAgICBmb3IobGV0IHdhbGwgb2Ygd2FsbHMpIHsgaWYgKHRoaXMuY29sbGlkZWRPblNpZGUoXCJib3R0b21cIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMuYm90dG9tKSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1sxXSA9IHRoaXMuY29sbGlzaW9ucy5ib3R0b207XG4gICAgICAgIHRoaXMucG9zWzFdID0gdGhpcy5jb2xsaXNpb25zLmJvdHRvbS00ODtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsZWZ0IHx8IHJpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5wb3NbMV0gKz0gdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucG9zWzFdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5kb3duLnBhbFk7XG4gICAgICBpZiAoIWxlZnQgJiYgIXJpZ2h0KSB7XG4gICAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImRvd25cIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQSBrZXkgbW92ZW1lbnRcbiAgICBpZiAobGVmdCkge1xuICAgICAgaWYgKHVwIHx8IGRvd24pIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzBdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1swXSArPSAtdGhpcy5zcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICAgIGZvcihsZXQgd2FsbCBvZiB3YWxscykgeyBpZiAodGhpcy5jb2xsaWRlZE9uU2lkZShcImxlZnRcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICB0aGlzLmNvbEJveC5wb3NbMF0gPSB0aGlzLmNvbGxpc2lvbnMubGVmdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1cCB8fCBkb3duICYmICF0aGlzLmNvbGxpc2lvbnMubGVmdCkge1xuICAgICAgICAgIHRoaXMucG9zWzBdICs9IC10aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucG9zWzBdICs9IC10aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWSA9IHRoaXMuc3RyaWRlLmxlZnQucGFsWTtcbiAgICAgIHRoaXMuZHJhd09wdGlvbnMucGFsWCA9IHRoaXMuc3RyaWRlUGFsZXR0ZVBvcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gRCBrZXkgbW92ZW1lbnRcbiAgICBpZiAocmlnaHQpIHtcbiAgICAgIGlmICh1cCB8fCBkb3duKSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1swXSArPSB0aGlzLm5vcm1hbGl6ZWRTcGVlZCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sQm94LnBvc1swXSArPSB0aGlzLnNwZWVkICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgZm9yKGxldCB3YWxsIG9mIHdhbGxzKSB7IGlmICh0aGlzLmNvbGxpZGVkT25TaWRlKFwicmlnaHRcIiwgd2FsbCkpIGJyZWFrIH1cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMucmlnaHQpIHtcbiAgICAgICAgdGhpcy5jb2xCb3gucG9zWzBdID0gdGhpcy5jb2xsaXNpb25zLnJpZ2h0O1xuICAgICAgICB0aGlzLnBvc1swXSA9IHRoaXMuY29sbGlzaW9ucy5yaWdodC0odGhpcy5jb2xCb3gud2lkdGggKyB0aGlzLmNvbEJveC53aWR0aC8yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1cCB8fCBkb3duKSB7XG4gICAgICAgICAgdGhpcy5wb3NbMF0gKz0gdGhpcy5ub3JtYWxpemVkU3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucG9zWzBdICs9IHRoaXMuc3BlZWQgKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgICAgICAgdGhpcy51cGRhdGVTaWRlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdPcHRpb25zLnBhbFkgPSB0aGlzLnN0cmlkZS5yaWdodC5wYWxZO1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gdGhpcy5zdHJpZGVQYWxldHRlUG9zKFwicmlnaHRcIik7XG4gICAgfVxuXG4gICAgLy8gaWYgbm9uZSBvZiB0aGUga2V5cyBhcmUgYmVpbmcgcHJlc3NlZCwgZ28gdG8gZGVmYXVsdCBzdGFuY2VcbiAgICBpZiAoIXVwICYmICFkb3duICYmICFyaWdodCAmJiAhbGVmdCkge1xuICAgICAgdGhpcy5kcmF3T3B0aW9ucy5wYWxYID0gNDggKiAxO1xuICAgIH1cblxuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgbGV0IGV4aXREaXI7XG4gICAgaWYgKHggPCAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcImxlZnRcIjtcbiAgICAgIHRoaXMubmV3Um9vbVBvcyhleGl0RGlyKTtcbiAgICAgIHJvb21DaGFuZ2UoZXhpdERpciwgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgICB9IGVsc2UgaWYgKHggPiA3MjAtMjQpIHtcbiAgICAgIGV4aXREaXIgPSBcInJpZ2h0XCI7XG4gICAgICB0aGlzLm5ld1Jvb21Qb3MoZXhpdERpcik7XG4gICAgICByb29tQ2hhbmdlKGV4aXREaXIsIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSk7XG4gICAgfSBlbHNlIGlmICh5IDwgLTI0KSB7XG4gICAgICBleGl0RGlyID0gXCJ1cFwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH0gZWxzZSBpZiAoeSA+IDcyMC0yNCkge1xuICAgICAgZXhpdERpciA9IFwiZG93blwiO1xuICAgICAgdGhpcy5uZXdSb29tUG9zKGV4aXREaXIpO1xuICAgICAgcm9vbUNoYW5nZShleGl0RGlyLCBHbG9iYWwuU0VTU0lPTi5nYW1lLnJvb20pO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU2lkZXMoKTtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnggPSB0aGlzLnBvc1swXTtcbiAgICB0aGlzLmRyYXdPcHRpb25zLnkgPSB0aGlzLnBvc1sxXTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vdXRpbHMvZ2xvYmFsX3ZhcnNcIjtcbi8vIGltcG9ydCBHYW1lQ29pbiBmcm9tIFwiLi9nYW1lX2NvaW5cIjtcbmltcG9ydCB7XG4gIHJhbmROdW1QYXRocyxcbiAgYWRkVmFsaWROZWlnaGJvcnMsXG4gIGJ1aWxkUGF0aHMsXG4gIGJ1aWxkUm9vbVdhbGxzLFxuICBzaHVmZmxlLFxuICBhc3NpZ25CbG9ja2VkUGF0aHMsXG59IGZyb20gXCIuL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuY2xhc3MgUm9vbSB7XG4gIGNvbnN0cnVjdG9yKG5laWdoYm9yKSB7XG4gICAgdGhpcy5jb2lucyA9IFtdO1xuICAgIHRoaXMud2FsbHMgPSBbXTtcbiAgICB0aGlzLm5laWdoYm9ycyA9IHtcbiAgICAgIHVwOiB1bmRlZmluZWQsXG4gICAgICBkb3duOiB1bmRlZmluZWQsXG4gICAgICBsZWZ0OiB1bmRlZmluZWQsXG4gICAgICByaWdodDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgbGV0IGVudHJ5RGlyO1xuICAgIGlmIChuZWlnaGJvcikge1xuICAgICAgY29uc3QgZXhpdERpciA9IE9iamVjdC5rZXlzKG5laWdoYm9yKVswXTtcbiAgICAgIGNvbnN0IHByZXZSb29tID0gT2JqZWN0LnZhbHVlcyhuZWlnaGJvcilbMF07XG4gICAgICB0aGlzLm5vZGVQb3MgPSBbLi4ucHJldlJvb20ubm9kZVBvc107XG4gICAgICBzd2l0Y2goZXhpdERpcikge1xuICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5kb3duID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIkRcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMV0rKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy51cCA9IHByZXZSb29tO1xuICAgICAgICAgIGVudHJ5RGlyID0gXCJVXCI7XG4gICAgICAgICAgdGhpcy5ub2RlUG9zWzFdLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgdGhpcy5uZWlnaGJvcnMucmlnaHQgPSBwcmV2Um9vbTtcbiAgICAgICAgICBlbnRyeURpciA9IFwiUlwiO1xuICAgICAgICAgIHRoaXMubm9kZVBvc1swXS0tO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICB0aGlzLm5laWdoYm9ycy5sZWZ0ID0gcHJldlJvb207XG4gICAgICAgICAgZW50cnlEaXIgPSBcIkxcIjtcbiAgICAgICAgICB0aGlzLm5vZGVQb3NbMF0rKztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub2RlUG9zID0gWzAsMF07XG4gICAgfVxuICAgIFxuICAgIEdsb2JhbC5ST09NU1tgJHt0aGlzLm5vZGVQb3N9YF0gPSB0aGlzO1xuXG4gICAgYWRkVmFsaWROZWlnaGJvcnModGhpcyk7XG4gICAgbGV0IHdhbGxzLCBudW1QYXRocywgcmFuZFBhdGhzO1xuICAgIGxldCBuZXdQYXRocyA9IFtdO1xuICAgIGxldCBwYXRocyA9IGJ1aWxkUGF0aHModGhpcyk7XG4gICAgbGV0IHBhdGhzQXJyID0gcGF0aHMuc3BsaXQoXCJcIik7XG4gICAgaWYgKG5laWdoYm9yKSB7XG4gICAgICAvLyBpZiBub3QgaW5pdGlhbCByb29tXG4gICAgICBwYXRoc0FyciA9IHBhdGhzQXJyLmZpbHRlcihwYXRoID0+IHBhdGggIT09IGVudHJ5RGlyKTsgLy8gcmVtb3ZlIGVudHJ5RGlyIGZyb20gcGF0aHNcbiAgICAgIG51bVBhdGhzID0gcmFuZE51bVBhdGhzKHBhdGhzLmxlbmd0aCk7IC8vIHdlaWdodGVkIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLCBwcmVmZXJzIG1vcmUgcGF0aHNcbiAgICAgIGlmIChudW1QYXRocyA9PT0gcGF0aHMubGVuZ3RoKSB7IC8vIGlmIGFsbCA0IHBhdGhzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgd2FsbHMgPSBidWlsZFJvb21XYWxscyhwYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICB9IGVsc2UgeyAvLyBsZXNzIHRoYW4gNCBwYXRocyBhdmFpbGFibGVcbiAgICAgICAgc2h1ZmZsZShwYXRoc0Fycik7IC8vIHJhbmRvbWl6ZSB0aGUgcGF0aCBjaG9pY2VzXG4gICAgICAgIG5ld1BhdGhzLnB1c2goZW50cnlEaXIpOyAvLyBNVVNUIEFMV0FZUyBoYXZlIHRoZSBwYXRoIHlvdSBlbnRlciBmcm9tXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGF0aHM7IGkrKykgeyBuZXdQYXRocy5wdXNoKHBhdGhzQXJyLnBvcCgpKSB9XG4gICAgICAgIG5ld1BhdGhzID0gbmV3UGF0aHMuc29ydCgpLmpvaW4oXCJcIik7XG4gICAgICAgIGFzc2lnbkJsb2NrZWRQYXRocyh0aGlzLCBuZXdQYXRocyk7XG4gICAgICAgIHdhbGxzID0gYnVpbGRSb29tV2FsbHMobmV3UGF0aHMpO1xuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBudW1QYXRocyA9IHJhbmROdW1QYXRocyhwYXRocy5sZW5ndGgpO1xuICAgICAgaWYgKG51bVBhdGhzID09PSBwYXRocy5sZW5ndGgpIHtcbiAgICAgICAgd2FsbHMgPSBidWlsZFJvb21XYWxscyhwYXRocyk7XG4gICAgICAgIHRoaXMud2FsbHMucHVzaCguLi53YWxscyk7XG4gICAgICAgIEdsb2JhbC5ST09NU1tgJHt0aGlzLm5vZGVQb3N9YF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaHVmZmxlKHBhdGhzQXJyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1QYXRoczsgaSsrKSB7IG5ld1BhdGhzLnB1c2gocGF0aHNBcnIucG9wKCkpIH1cbiAgICAgICAgbmV3UGF0aHMgPSBuZXdQYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbiAgICAgICAgYXNzaWduQmxvY2tlZFBhdGhzKHRoaXMsIG5ld1BhdGhzKTtcbiAgICAgICAgd2FsbHMgPSBidWlsZFJvb21XYWxscyhuZXdQYXRocyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLndhbGxzLnB1c2goLi4ud2FsbHMpO1xuICAgICAgICBHbG9iYWwuUk9PTVNbYCR7dGhpcy5ub2RlUG9zfWBdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlQ29pbnMoKSB7XG5cbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgdGhpcy53YWxscy5mb3JFYWNoKG9iamVjdCA9PiBvYmplY3QuZHJhdyhjdHgpKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMzMzMzMzXCI7XG4gICAgY3R4LmZvbnQgPSBcIjIwcHggYXJpYWxcIjtcbiAgICBjdHguZmlsbFRleHQoYFJvb20gWyAke3RoaXMubm9kZVBvc30gXWAsIDE1LCAzMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9vbTsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCBXYWxsIGZyb20gXCIuLi93YWxsXCI7XG5pbXBvcnQgUm9vbSBmcm9tIFwiLi4vcm9vbVwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2dhbWVcIjtcblxuXG5leHBvcnQgY29uc3QgbmV3R2FtZSA9ICgpID0+IHtcbiAgaWYgKEdsb2JhbC5TRVNTSU9OLmdhbWUpIHtcbiAgICBHbG9iYWwuU0VTU0lPTi5nYW1lLnN0b3AoKTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT04uZ2FtZTtcbiAgICBkZWxldGUgR2xvYmFsLlNFU1NJT04ucGxheWVyO1xuICAgIGZvciAobGV0IHJvb20gaW4gR2xvYmFsLlJPT01TKSB7XG4gICAgICBkZWxldGUgR2xvYmFsLlJPT01TW3Jvb21dO1xuICAgIH07XG4gIH1cbiAgbmV3IEdhbWUoLi4uT2JqZWN0LnZhbHVlcyhHbG9iYWwuR0FNRV9PUFRJT05TKSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb2xsaWRlZFdpdGhTaWRlID0gKHNpZGUsIHRoaXNTaWRlLCBvdGhlclNpZGUpID0+IHtcbiAgbGV0IGNvbGxpZGVkID0gZmFsc2U7XG4gIGxldCB1cHBlckRpZmYsIGxvd2VyRGlmZjtcbiAgY29uc3QgdXBwZXJCb3VuZHMgPSAxMDtcbiAgY29uc3QgbG93ZXJCb3VuZHMgPSAwO1xuICBpZiAoc2lkZSA9PT0gXCJ0b3BcIiB8fCBzaWRlID09PSBcImJvdHRvbVwiKSB7XG4gICAgY29uc3QgdGhpc1lWYWwgPSB0aGlzU2lkZVsxXTtcbiAgICBjb25zdCBbdGhpc1hNaW4sIHRoaXNYTWF4XSA9IHRoaXNTaWRlWzBdO1xuICAgIGNvbnN0IG90aGVyWVZhbCA9IG90aGVyU2lkZVsxXTtcbiAgICBjb25zdCBbb3RoZXJYTWluLCBvdGhlclhNYXhdID0gb3RoZXJTaWRlWzBdO1xuICAgIFxuICAgIHN3aXRjaCAoc2lkZSkge1xuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICB1cHBlckRpZmYgPSAob3RoZXJZVmFsIC0gdGhpc1lWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9IChvdGhlcllWYWwgLSB0aGlzWVZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1lWYWwgPCBvdGhlcllWYWwpICYmXG4gICAgICAgICAgKHRoaXNYTWluIDwgb3RoZXJYTWF4KSAmJlxuICAgICAgICAgICh0aGlzWE1heCA+IG90aGVyWE1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgdXBwZXJEaWZmID0gKHRoaXNZVmFsIC0gb3RoZXJZVmFsKSA8IHVwcGVyQm91bmRzO1xuICAgICAgICBsb3dlckRpZmYgPSAodGhpc1lWYWwgLSBvdGhlcllWYWwpID4gbG93ZXJCb3VuZHM7XG4gICAgICAgIGNvbGxpZGVkID0gXG4gICAgICAgICAgKHRoaXNZVmFsID4gb3RoZXJZVmFsKSAmJlxuICAgICAgICAgICh0aGlzWE1pbiA8IG90aGVyWE1heCkgJiZcbiAgICAgICAgICAodGhpc1hNYXggPiBvdGhlclhNaW4pICYmXG4gICAgICAgICAgdXBwZXJEaWZmICYmIGxvd2VyRGlmZjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29sbGlkZWQpIHJldHVybiBvdGhlcllWYWw7XG5cbiAgfSBlbHNlIHtcbiAgICBjb25zdCB0aGlzWFZhbCA9IHRoaXNTaWRlWzBdO1xuICAgIGNvbnN0IFt0aGlzWU1pbiwgdGhpc1lNYXhdID0gdGhpc1NpZGVbMV07XG4gICAgY29uc3Qgb3RoZXJYVmFsID0gb3RoZXJTaWRlWzBdO1xuICAgIGNvbnN0IFtvdGhlcllNaW4sIG90aGVyWU1heF0gPSBvdGhlclNpZGVbMV07XG4gICAgXG4gICAgc3dpdGNoIChzaWRlKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICB1cHBlckRpZmYgPSAob3RoZXJYVmFsIC0gdGhpc1hWYWwpIDwgdXBwZXJCb3VuZHM7XG4gICAgICAgIGxvd2VyRGlmZiA9IChvdGhlclhWYWwgLSB0aGlzWFZhbCkgPiBsb3dlckJvdW5kcztcbiAgICAgICAgY29sbGlkZWQgPSBcbiAgICAgICAgICAodGhpc1hWYWwgPCBvdGhlclhWYWwpICYmXG4gICAgICAgICAgKHRoaXNZTWluIDwgb3RoZXJZTWF4KSAmJlxuICAgICAgICAgICh0aGlzWU1heCA+IG90aGVyWU1pbikgJiZcbiAgICAgICAgICB1cHBlckRpZmYgJiYgbG93ZXJEaWZmO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIHVwcGVyRGlmZiA9ICh0aGlzWFZhbCAtIG90aGVyWFZhbCkgPCB1cHBlckJvdW5kcztcbiAgICAgICAgbG93ZXJEaWZmID0gKHRoaXNYVmFsIC0gb3RoZXJYVmFsKSA+IGxvd2VyQm91bmRzO1xuICAgICAgICBjb2xsaWRlZCA9IFxuICAgICAgICAgICh0aGlzWFZhbCA+IG90aGVyWFZhbCkgJiZcbiAgICAgICAgICAodGhpc1lNaW4gPCBvdGhlcllNYXgpICYmXG4gICAgICAgICAgKHRoaXNZTWF4ID4gb3RoZXJZTWluKSAmJlxuICAgICAgICAgIHVwcGVyRGlmZiAmJiBsb3dlckRpZmY7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29sbGlkZWQpIHJldHVybiBvdGhlclhWYWw7XG4gICAgXG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG5cbn07XG5cbmV4cG9ydCBjb25zdCByb29tQ2hhbmdlID0gKGV4aXREaXIsIGN1cnJSb29tKSA9PiB7XG4gIGxldCBuZXh0Tm9kZVBvcyA9IFsuLi5jdXJyUm9vbS5ub2RlUG9zXTtcbiAgc3dpdGNoKGV4aXREaXIpIHtcbiAgICBjYXNlIFwidXBcIjpcbiAgICAgIG5leHROb2RlUG9zWzFdICs9IDE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZG93blwiOlxuICAgICAgbmV4dE5vZGVQb3NbMV0gLT0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICBuZXh0Tm9kZVBvc1swXSAtPSAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICBuZXh0Tm9kZVBvc1swXSArPSAxO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKEdsb2JhbC5ST09NU1tgJHtuZXh0Tm9kZVBvc31gXSkge1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSA9IEdsb2JhbC5ST09NU1tgJHtuZXh0Tm9kZVBvc31gXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBuZWlnaGJvciA9IHsgW2V4aXREaXJdOiBjdXJyUm9vbSB9O1xuICAgIEdsb2JhbC5TRVNTSU9OLmdhbWUucm9vbSA9IG5ldyBSb29tKG5laWdoYm9yKTtcbiAgICBhZGRWYWxpZE5laWdoYm9ycyhjdXJyUm9vbSk7XG4gICAgYWRkVmFsaWROZWlnaGJvcnMoR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJhbmROdW1QYXRocyA9IG1heCA9PiB7XG4gIGxldCBwYXRocyA9IFtdO1xuICBpZiAobWF4ID4gMykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVs0XTsgaSsrKSB7IHBhdGhzLnB1c2goNCkgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVszXTsgaSsrKSB7IHBhdGhzLnB1c2goMykgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsyXTsgaSsrKSB7IHBhdGhzLnB1c2goMikgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2xvYmFsLldFSUdIVFNbbWF4XVsxXTsgaSsrKSB7IHBhdGhzLnB1c2goMSkgfVxuICB9IGVsc2UgaWYgKG1heCA+IDIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bM107IGkrKykgeyBwYXRocy5wdXNoKDMpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMl07IGkrKykgeyBwYXRocy5wdXNoKDIpIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdsb2JhbC5XRUlHSFRTW21heF1bMV07IGkrKykgeyBwYXRocy5wdXNoKDEpIH1cbiAgfSBlbHNlIGlmIChtYXggPiAxKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzJdOyBpKyspIHsgcGF0aHMucHVzaCgyKSB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuV0VJR0hUU1ttYXhdWzFdOyBpKyspIHsgcGF0aHMucHVzaCgxKSB9XG4gIH0gZWxzZSB7XG4gICAgcGF0aHMucHVzaCgxKTtcbiAgfVxuXG4gIHJldHVybiBwYXRoc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcGF0aHMubGVuZ3RoKV07XG4gIFxufTtcblxuZXhwb3J0IGNvbnN0IGFkZFZhbGlkTmVpZ2hib3JzID0gcm9vbSA9PiB7XG4gIGxldCB1cCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICB1cFsxXSArPSAxO1xuICB1cCA9IHVwLnRvU3RyaW5nKCk7XG4gIGxldCBkb3duID0gWy4uLnJvb20ubm9kZVBvc107XG4gIGRvd25bMV0gLT0gMTtcbiAgZG93biA9IGRvd24udG9TdHJpbmcoKTtcbiAgbGV0IGxlZnQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgbGVmdFswXSAtPSAxO1xuICBsZWZ0ID0gbGVmdC50b1N0cmluZygpO1xuICBsZXQgcmlnaHQgPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgcmlnaHRbMF0gKz0gMTtcbiAgcmlnaHQgPSByaWdodC50b1N0cmluZygpO1xuICBpZiAoXG4gICAgR2xvYmFsLlJPT01TW3VwXSAmJiBcbiAgICAoR2xvYmFsLlJPT01TW3VwXS5uZWlnaGJvcnMuZG93biAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy51cFxuICApIHtcbiAgICByb29tLm5laWdoYm9ycy51cCA9IEdsb2JhbC5ST09NU1t1cF07XG4gICAgR2xvYmFsLlJPT01TW3VwXS5uZWlnaGJvcnMuZG93biA9IHJvb207XG4gIH1cbiAgaWYgKFxuICAgIEdsb2JhbC5ST09NU1tkb3duXSAmJiBcbiAgICAoR2xvYmFsLlJPT01TW2Rvd25dLm5laWdoYm9ycy51cCAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy5kb3duXG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLmRvd24gPSBHbG9iYWwuUk9PTVNbZG93bl07XG4gICAgR2xvYmFsLlJPT01TW2Rvd25dLm5laWdoYm9ycy51cCA9IHJvb207XG4gIH1cbiAgaWYgKFxuICAgIEdsb2JhbC5ST09NU1tsZWZ0XSAmJiBcbiAgICAoR2xvYmFsLlJPT01TW2xlZnRdLm5laWdoYm9ycy5yaWdodCAhPT0gXCJYXCIpICYmIFxuICAgICFyb29tLm5laWdoYm9ycy5sZWZ0XG4gICkge1xuICAgIHJvb20ubmVpZ2hib3JzLmxlZnQgPSBHbG9iYWwuUk9PTVNbbGVmdF07XG4gICAgR2xvYmFsLlJPT01TW2xlZnRdLm5laWdoYm9ycy5yaWdodCA9IHJvb207XG4gIH1cbiAgaWYgKFxuICAgIEdsb2JhbC5ST09NU1tyaWdodF0gJiYgXG4gICAgKEdsb2JhbC5ST09NU1tyaWdodF0ubmVpZ2hib3JzLmxlZnQgIT09IFwiWFwiKSAmJiBcbiAgICAhcm9vbS5uZWlnaGJvcnMucmlnaHRcbiAgKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMucmlnaHQgPSBHbG9iYWwuUk9PTVNbcmlnaHRdO1xuICAgIEdsb2JhbC5ST09NU1tyaWdodF0ubmVpZ2hib3JzLmxlZnQgPSByb29tO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRQYXRocyA9IHJvb20gPT4ge1xuICBsZXQgcGF0aHMgPSBbXTtcbiAgbGV0IHVwID0gWy4uLnJvb20ubm9kZVBvc107XG4gIHVwWzFdICs9IDE7XG4gIHVwID0gdXAudG9TdHJpbmcoKTtcbiAgbGV0IGRvd24gPSBbLi4ucm9vbS5ub2RlUG9zXTtcbiAgZG93blsxXSAtPSAxO1xuICBkb3duID0gZG93bi50b1N0cmluZygpO1xuICBsZXQgbGVmdCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICBsZWZ0WzBdIC09IDE7XG4gIGxlZnQgPSBsZWZ0LnRvU3RyaW5nKCk7XG4gIGxldCByaWdodCA9IFsuLi5yb29tLm5vZGVQb3NdO1xuICByaWdodFswXSArPSAxO1xuICByaWdodCA9IHJpZ2h0LnRvU3RyaW5nKCk7XG4gIGlmICghR2xvYmFsLlJPT01TW3VwXSB8fCAoR2xvYmFsLlJPT01TW3VwXS5uZWlnaGJvcnMuZG93biAhPT0gXCJYXCIpKSB7XG4gICAgcGF0aHMucHVzaChcIlVcIik7XG4gIH1cbiAgaWYgKCFHbG9iYWwuUk9PTVNbZG93bl0gfHwgKEdsb2JhbC5ST09NU1tkb3duXS5uZWlnaGJvcnMudXAgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJEXCIpO1xuICB9XG4gIGlmICghR2xvYmFsLlJPT01TW2xlZnRdIHx8IChHbG9iYWwuUk9PTVNbbGVmdF0ubmVpZ2hib3JzLnJpZ2h0ICE9PSBcIlhcIikpIHtcbiAgICBwYXRocy5wdXNoKFwiTFwiKTtcbiAgfVxuICBpZiAoIUdsb2JhbC5ST09NU1tyaWdodF0gfHwgKEdsb2JhbC5ST09NU1tyaWdodF0ubmVpZ2hib3JzLmxlZnQgIT09IFwiWFwiKSkge1xuICAgIHBhdGhzLnB1c2goXCJSXCIpO1xuICB9XG4gIHJldHVybiBwYXRocy5zb3J0KCkuam9pbihcIlwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25CbG9ja2VkUGF0aHMgPSAocm9vbSwgcGF0aHMpID0+IHtcbiAgaWYgKCFwYXRocy5pbmNsdWRlcyhcIlVcIikpIHtcbiAgICByb29tLm5laWdoYm9ycy51cCA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJEXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMuZG93biA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJMXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMubGVmdCA9IFwiWFwiO1xuICB9XG4gIGlmICghcGF0aHMuaW5jbHVkZXMoXCJSXCIpKSB7XG4gICAgcm9vbS5uZWlnaGJvcnMucmlnaHQgPSBcIlhcIjtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkUm9vbVdhbGxzID0gcGF0aHMgPT4ge1xuICBsZXQgd2FsbHMgPSBbXTtcbiAgc3dpdGNoKHBhdGhzKSB7XG4gICAgY2FzZSBcIkRMUlVcIjpcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgcmV0dXJuIHdhbGxzO1xuICAgIGNhc2UgXCJETFVcIjpcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDcyMCkpOyAvLyByaWdodCBibG9ja2VkXG4gICAgICByZXR1cm4gd2FsbHM7XG4gICAgY2FzZSBcIkxSVVwiOlxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDcyMCwgNDgpKTsgLy8gZG93biBibG9ja2VkXG4gICAgICByZXR1cm4gd2FsbHM7XG4gICAgY2FzZSBcIkRSVVwiOlxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgIHJldHVybiB3YWxscztcbiAgICBjYXNlIFwiRExSXCI6XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICByZXR1cm4gd2FsbHM7XG4gICAgY2FzZSBcIkxVXCI6XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIGxlZnRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksMF0sIDQ4KjYsIDQ4KSk7IC8vIHVwIHJpZ2h0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgcmV0dXJuIHdhbGxzO1xuICAgIGNhc2UgXCJEVVwiOlxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgbGVmdFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSwwXSwgNDgqNiwgNDgpKTsgLy8gdXAgcmlnaHRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biBsZWZ0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gcmlnaHRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA3MjApKTsgLy8gbGVmdCBibG9ja2VkXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgcmV0dXJuIHdhbGxzO1xuICAgIGNhc2UgXCJSVVwiOlxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCo2LCA0OCkpOyAvLyB1cCBsZWZ0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs0OCo5LDBdLCA0OCo2LCA0OCkpOyAvLyB1cCByaWdodFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNDgsIDcyMCkpOyAvLyBsZWZ0IGJsb2NrZWRcbiAgICAgIHJldHVybiB3YWxscztcbiAgICBjYXNlIFwiRExcIjpcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsMF0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgdXBcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzAsNDgqOV0sIDQ4LCA0OCo2KSk7IC8vIGxlZnQgZG93blxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIGxlZnRcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzQ4KjksNzIwLTQ4XSwgNDgqNiwgNDgpKTsgLy8gZG93biByaWdodFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFs3MjAtNDgsMF0sIDQ4LCA3MjApKTsgLy8gcmlnaHQgYmxvY2tlZFxuICAgICAgcmV0dXJuIHdhbGxzO1xuICAgIGNhc2UgXCJEUlwiOlxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDBdLCA0OCwgNDgqNikpOyAvLyByaWdodCB1cFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNzIwLTQ4LDQ4KjldLCA0OCwgNDgqNikpOyAvLyByaWdodCBkb3duXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDcyMC00OF0sIDQ4KjYsIDQ4KSk7IC8vIGRvd24gbGVmdFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbNDgqOSw3MjAtNDhdLCA0OCo2LCA0OCkpOyAvLyBkb3duIHJpZ2h0XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNzIwKSk7IC8vIGxlZnQgYmxvY2tlZFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICByZXR1cm4gd2FsbHM7XG4gICAgY2FzZSBcIkxSXCI6XG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDBdLCA0OCwgNDgqNikpOyAvLyBsZWZ0IHVwXG4gICAgICB3YWxscy5wdXNoKG5ldyBXYWxsKFswLDQ4KjldLCA0OCwgNDgqNikpOyAvLyBsZWZ0IGRvd25cbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCwwXSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgdXBcbiAgICAgIHdhbGxzLnB1c2gobmV3IFdhbGwoWzcyMC00OCw0OCo5XSwgNDgsIDQ4KjYpKTsgLy8gcmlnaHQgZG93blxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCw3MjAtNDhdLCA3MjAsIDQ4KSk7IC8vIGRvd24gYmxvY2tlZFxuICAgICAgd2FsbHMucHVzaChuZXcgV2FsbChbMCwwXSwgNzIwLCA0OCkpOyAvLyB1cCBibG9ja2VkXG4gICAgICByZXR1cm4gd2FsbHM7XG4gIH1cbn07XG5cbi8vIGV4cG9ydCBjb25zdCBnZW5lcmF0ZUNvaW5zID0gKCkgPT4ge1xuLy8gICBjb25zdCBudW1Db2lucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo0KTtcbi8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db2luczsgaSsrKSB7XG4vLyAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNjI0KSArIDQ4O1xuLy8gICAgIHdoaWxlICh4ID4gMzM2ICYmIHggPCAzODQpIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNjI0KSArIDQ4O1xuLy8gICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYyNCkgKyA0ODtcbi8vICAgICB3aGlsZSAoeSA+IDMzNiAmJiB5IDwgMzg0KSB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYyNCkgKyA0ODtcbi8vICAgICBsZXQgcG9zID0gW3gseV07XG4vLyAgICAgR2xvYmFsLlNFU1NJT04uZ2FtZS5yb29tLmNvaW5zLnB1c2gobmV3IENvaW4ocG9zLCAxNiwxNiwpKVxuXG4vLyAgIH1cbi8vIH07XG5cbmV4cG9ydCBjb25zdCBzaHVmZmxlID0gYXJyID0+IHtcbiAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICBbYXJyW2ldLCBhcnJbal1dID0gW2FycltqXSwgYXJyW2ldXTtcbiAgfVxufTsiLCJleHBvcnQgY29uc3QgV0lEVEggPSA3MjA7XG5leHBvcnQgY29uc3QgSEVJR0hUID0gNzIwO1xuZXhwb3J0IGNvbnN0IFNQUklURV9ESU1TID0gWzQ4LDQ4XTtcbmV4cG9ydCBjb25zdCBGUFMgPSAxMDAwLzYwO1xuZXhwb3J0IGNvbnN0IEtFWVMgPSB7XG4gIDg3OiBmYWxzZSwgLy8gV1xuICA2NTogZmFsc2UsIC8vIEFcbiAgODM6IGZhbHNlLCAvLyBTXG4gIDY4OiBmYWxzZSwgLy8gRFxuICAxNjogZmFsc2UsIC8vIEwtU2hpZnRcbn07XG5leHBvcnQgY29uc3QgUk9PTVMgPSB7fTtcblxuZXhwb3J0IGNvbnN0IFNFU1NJT04gPSB7fTtcbmV4cG9ydCBjb25zdCBTUFJJVEVTID0ge307XG5cbmV4cG9ydCBjb25zdCBXRUlHSFRTID0ge1xuICA0OiB7XG4gICAgNDogNDUsXG4gICAgMzogNDUsXG4gICAgMjogOSxcbiAgICAxOiAxLFxuICB9LFxuICAzOiB7XG4gICAgMzogNzAsXG4gICAgMjogMjUsXG4gICAgMTogNSxcbiAgfSxcbiAgMjoge1xuICAgIDI6IDYwLFxuICAgIDE6IDQwLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IEdBTUVfT1BUSU9OUyA9IHt9O1xuZXhwb3J0IGNvbnN0IFJFUVVFU1QgPSB7fTsiLCJpbXBvcnQgKiBhcyBHbG9iYWwgZnJvbSBcIi4vZ2xvYmFsX3ZhcnNcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9nYW1lXCI7XG5pbXBvcnQgeyBuZXdHYW1lIH0gZnJvbSBcIi4uL3V0aWxzL2Z1bmNfdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKEtFWVMpID0+IHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gODcgJiYgIUtFWVNbODddKSBLRVlTW2Uua2V5Q29kZV0gPSB0cnVlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDY1ICYmICFLRVlTWzY1XSkgS0VZU1tlLmtleUNvZGVdID0gdHJ1ZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA4MyAmJiAhS0VZU1s4M10pIEtFWVNbZS5rZXlDb2RlXSA9IHRydWU7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gNjggJiYgIUtFWVNbNjhdKSBLRVlTW2Uua2V5Q29kZV0gPSB0cnVlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDE2ICYmICFLRVlTWzE2XSkgS0VZU1tlLmtleUNvZGVdID0gdHJ1ZTtcblxuICB9KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDg3ICYmIEtFWVNbODddKSBLRVlTW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA2NSAmJiBLRVlTWzY1XSkgS0VZU1tlLmtleUNvZGVdID0gZmFsc2U7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gODMgJiYgS0VZU1s4M10pIEtFWVNbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDY4ICYmIEtFWVNbNjhdKSBLRVlTW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxNiAmJiBLRVlTWzE2XSkgS0VZU1tlLmtleUNvZGVdID0gZmFsc2U7XG4gIH0pO1xuXG4gIGNvbnN0IGhvd1RvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG9cIik7XG4gIFxuICBob3dUby5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10by1wb2ludGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG8tc291bmRcIikucGxheSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG93LXRvXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3ctdG8gPiB1bFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9KTtcbiAgaG93VG8uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ctdG9cIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdy10by1wb2ludGVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3ctdG8gPiB1bFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9KTtcblxuICBjb25zdCByZXN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpO1xuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdGFydC1zb3VuZFwiKS5wbGF5KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0LXBvaW50ZXJcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIHJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN0YXJ0LXBvaW50ZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIHJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBuZXdHYW1lKCk7XG4gIH0pO1xuXG59XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IocG9zLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIGNvbnN0IFt4LHldID0gdGhpcy5wb3M7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMucG9zO1xuICAgIGNvbnN0IHRvcFJpZ2h0ID0gW3grdGhpcy53aWR0aCx5XTtcbiAgICBjb25zdCBib3R0b21SaWdodCA9IFt4K3RoaXMud2lkdGgseSt0aGlzLmhlaWdodF07XG4gICAgY29uc3QgYm90dG9tTGVmdCA9IFt4LHkrdGhpcy5oZWlnaHRdO1xuICAgIHRoaXMudG9wID0gW1t0b3BMZWZ0WzBdLHRvcFJpZ2h0WzBdXSwgdG9wTGVmdFsxXV07XG4gICAgdGhpcy5ib3R0b20gPSBbW2JvdHRvbUxlZnRbMF0sYm90dG9tUmlnaHRbMF1dLCBib3R0b21MZWZ0WzFdXTtcbiAgICB0aGlzLnJpZ2h0ID0gW3RvcFJpZ2h0WzBdLCBbdG9wUmlnaHRbMV0sYm90dG9tUmlnaHRbMV1dXTtcbiAgICB0aGlzLmxlZnQgPSBbdG9wTGVmdFswXSwgW3RvcExlZnRbMV0sYm90dG9tTGVmdFsxXV1dO1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGMjIyMlwiO1xuICAgIGN0eC5maWxsUmVjdCguLi50aGlzLnBvcywgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBpbnN0YWxsTGlzdGVuZXJzIGZyb20gXCIuL3NjcmlwdHMvdXRpbHMvaW5zdGFsbF9saXN0ZW5lcnNcIjtcbmltcG9ydCAqIGFzIEdsb2JhbCBmcm9tIFwiLi9zY3JpcHRzL3V0aWxzL2dsb2JhbF92YXJzXCI7XG5pbXBvcnQgeyBuZXdHYW1lIH0gZnJvbSBcIi4vc2NyaXB0cy91dGlscy9mdW5jX3V0aWxzXCI7XG5cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5XCIpO1xuICBjYW52YXMud2lkdGggPSBHbG9iYWwuV0lEVEg7XG4gIGNhbnZhcy5oZWlnaHQgPSBHbG9iYWwuSEVJR0hUO1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gIGluc3RhbGxMaXN0ZW5lcnMoR2xvYmFsLktFWVMpO1xuICBcbiAgbGV0IGNvaW5TcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbiAgY29pblNwcml0ZS5zcmMgPSBcIi4uL3NyYy9hc3NldHMvaW1hZ2VzL2NvaW4vY29pbi5wbmdcIjtcbiAgY29pblNwcml0ZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgR2xvYmFsLlNQUklURVMuY29pbiA9IGNvaW5TcHJpdGU7XG4gIH07XG4gIGxldCBwbGF5ZXJTcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbiAgcGxheWVyU3ByaXRlLnNyYyA9IFwiLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcm9ndWUvcm9ndWVfd2Fsay5wbmdcIjtcbiAgXG4gIFxuICBwbGF5ZXJTcHJpdGUub25sb2FkID0gKCkgPT4ge1xuICAgIEdsb2JhbC5HQU1FX09QVElPTlNbXCJjdHhcIl0gPSBjdHg7XG4gICAgR2xvYmFsLkdBTUVfT1BUSU9OU1tcInBsYXllclNwcml0ZVwiXSA9IHBsYXllclNwcml0ZTtcbiAgICBuZXdHYW1lKCk7XG4gIH1cblxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==