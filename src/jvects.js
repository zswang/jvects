(function(exportName) {
  /*<remove>*/
  'use strict';
  /*</remove>*/

  var exports = exports || {};

  /**
   * 矢量数据处理
   *
   * @author
   *   王集鹄(wangjihu,http://weibo.com/zswang)
   *   刘家鸣(liujiaming,http://weibo.com/techird)
   * @version 2015-05-18
   */

  /**
   * 创建一个 2D 适量对象
   *
   * @param {number} x
   * @param {number} y
   * @return {Object} 返回适量对象
   */
  function create(x, y) {
    var instance = {
      x: x,
      y: y
    };

    /**
     * 矩阵变化
     *
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @param {number} e
     * @param {number} f
     * @return {Object} 返回适量对象自身
     */
    function transform(a, b, c, d, e, f) {
      var x0 = instance.x;
      var y0 = instance.y;

      instance.x = a * x0 + c * y0 + e;
      instance.y = b * x0 + d * y0 + f;
      return instance;
    }
    instance.transform = transform;

    /**
     * 位移
     *
     * @param {number} dx 横向偏移
     * @param {number} dy 纵向便宜
     * @return {Object} 返回适量对象自身
     */
    function move(dx, dy) {
      return transform(1, 0, 0, 1, dx, dy);
    }
    instance.move = move;

    /**
     * 位移
     *
     * @param {number} angle 旋转角度，单位: 弧度
     * @return {Object} 返回适量对象自身
     */
    function rotate(angle) {
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);

      return transform(cos, sin, -sin, cos, 0, 0);
    }
    instance.rotate = rotate;

    /**
     * 缩放
     *
     * @param {number} sx 横向缩放比
     * @param {number?} sy 横向缩放比，如果没有指定则取 sx
     * @return {Object} 返回适量对象自身
     */
    function scale(sx, sy) {
      if (arguments.length === 1) {
        sy = sx;
      }
      return transform(sx, 0, 0, sy, 0, 0);
    }
    instance.scale = scale;

    /**
     * 生成反向适量
     *
     * @return {Object} 返回反向适量对象
     */
    function inverse() {
      return create(-instance.x, -instance.y);
    }
    instance.inverse = inverse;

    /**
     * 适量累加
     *
     * @param {number|Object} v 累加的部分
     * @return {Object} 返回适量对象自身
     */
    function add(v) {
      if (typeof v === 'number') {
        instance.x += v;
        instance.y += v;
      }
      else {
        instance.x += v.x;
        instance.y += v.y;
      }
      return instance;
    }
    instance.add = add;

    /**
     * 适量减
     *
     * @param {number|Object} v 减掉的部分
     * @return {Object} 返回适量对象自身
     */
    function subtract(v) {
      if (typeof v === 'number') {
        instance.x -= v;
        instance.y -= v;
      }
      else {
        instance.x -= v.x;
        instance.y -= v.y;
      }
      return instance;
    }
    instance.subtract = subtract;

    /**
     * 适量乘积
     *
     * @param {number|Object} v 累加的部分
     * @return {Object} 返回适量对象自身
     */
    function mult(v) {
      if (typeof v === 'number') {
        instance.x *= v;
        instance.y *= v;
      }
      else {
        instance.x *= v.x;
        instance.y *= v.y;
      }
      return instance;
    }
    instance.mult = mult;

    /**
     * 获取向量长度
     *
     * @return {number} 返回向量长度
     */
    function length() {
      var square = instance.x * instance.x + instance.y * instance.y;
      return Math.sqrt(square);
    }
    instance.length = length;

    /**
     * the dot product of this and q.
     *
     * @param {Object} q
     * @return {Object} 返回适量对象自身
     */
    function dot(q) {
        return instance.x * q.x + instance.y * q.y;
    }
    instance.dot = dot;

    /**
     * 计算纵横坐标的平分和
     *
     * @return {number} 返回平分和
     */
    function square() {
        return instance.x * instance.x + instance.y * instance.y;
    }
    instance.square = square;

    /**
     * 创建当前向量在 q 上的投影
     *
     * @param {Object} 参考向量
     * @return {Object} 返回投影适量对象
     */
    function project(q) {
      return q.clone().mult(instance.dot(q) / q.square());
    }
    instance.project = project;

    /**
     * 克隆当前对象并返回
     *
     * @return {Object} 返回新的适量对象
     */
    function clone() {
      return create(instance.x, instance.y);
    }
    instance.clone = clone;

    /**
     * 计算两点间的距离
     *
     * @param {Object} q 另一个向量
     * @return {number} 返回两个向量的距离
     */
    function distance(q) {
      return Math.sqrt(Math.pow(instance.x - q.x, 2) +
        Math.pow(instance.y - q.y, 2));
    }
    instance.distance = distance;

    /**
     * 计算到另一向量的角度
     *
     * @param {Object?} q 另一个向量
     * @return {number} 返回角度，单位：弧度
     */
    function angle(q) {
      if (arguments.length < 1) {
        return Math.atan2(instance.y, instance.y);
      }
      return Math.atan2(q.y - instance.y, q.x - instance.y);
    }
    instance.angle = angle;

    /**
     * 两个向量是否等
     *
     * @param {Object} q 另一个向量
     * @return {boolean} 返回两个向量是否等
     */
    function equals(q) {
      return instance.x === q.x && instance.y === q.y;
    }
    instance.equals = equals;

    return instance;
  }
  exports.create = create;

  function from(q) {
    return {
      to: function(p) {
        return create(p.x - q.x, p.y - q.y);
      }
    };
  }
  exports.from = from;

  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function() {
        return exports;
      });
    }
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  }
  else {
    window[exportName] = exports;
  }

})('jvects');