var jvects = require('../.');
var assert = require('should');

describe('fixtures', function() {
  var v0_0 = jvects.create(0, 0);
  var v10_0 = jvects.create(10, 0);
  var v10_10 = jvects.create(10, 10);
  var v0_10 = jvects.create(0, 10);

  it('jvects properties check', function() {
    jvects.should.have.properties([
      'create', 'from'
    ]);
  });

  it('jvects.create', function() {
    assert.equal(jvects.create(1, 2).x, 1);
    assert.equal(jvects.create(1, 2).y, 2);
  });

  it('instance properties check', function() {
    var instance = jvects.create(0, 0);
    instance.should.have.properties([
      'x', 'y', 'equals', 'angle', 'distance', 'clone', 'project', 'length', 'mult',
      'add', 'inverse', 'scale', 'rotate', 'move', 'transform'
    ]);
  });

  it('move() check', function() {
    var moveBefore = jvects.create(0, 0);
    var moveAfter = moveBefore.move(8, 16);
    moveBefore.should.equal(moveAfter);
    moveAfter.x.should.be.exactly(8);
    moveAfter.y.should.be.exactly(16);
  });

  it('clone() check', function() {
    var cloneBefore = jvects.create(0, 0);
    var cloneAfter = cloneBefore.clone(8, 16);
    cloneBefore.should.not.equal(cloneAfter);
  });

  it('scale() check', function() {
    var scaleBefore = jvects.create(1, 1);
    var scaleAfter = scaleBefore.scale(4);
    scaleBefore.should.equal(scaleAfter);
    scaleAfter.x.should.be.exactly(1 * 4);
    scaleAfter.y.should.be.exactly(1 * 4);
    scaleAfter.scale(1, 2);
    scaleAfter.x.should.be.exactly(1 * 4);
    scaleAfter.y.should.be.exactly(1 * 4 * 2);
  });
});