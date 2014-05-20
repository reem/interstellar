var SplitTree = function (box, max) {
  this.box = box;
  this.max = max;

  this.children = [];
  this.points = [];
};

var boxContains = function (box, point) {
  return box.high.gt(point) && box.low.lt(point);
};

SplitTree.prototype.isLeaf = function () {
  return this.children.length === 0;
};

SplitTree.prototype.insert = function (point) {
  if (!boxContains(this.box, point)) {
    return this;
  }

  if (this.isLeaf()) {
    if (this.points === null) {
      this.points = [point];
    } else {
      if (this.points.length < this.max) {
        this.points.push(point);
      } else {
        this.points.push(point); // Go over max to simplify logic.
        this.divide();
      }
    }
  } else {
    _.each(this.children, function (child) {
      child.insert(point);
    });
  }
  return this;
};

SplitTree.prototype.divide = function () {
  this.children = this.box.split();
  _.each(this.points, function (point) {
    _.each(this.children, function (child) {
      child.insert(point);
    });
  });
  this.values = [];
};

SplitTree.prototype.near = function (point) {
  if (!boxContains(this.box, point)) {
    return null;
  }

  if (this.isLeaf()) {
    return this.values;
  } else {
    _.find(this.children, function (child) {
      return boxContains(child.box, point);
    }).near(point);
  }
};

exports.SplitTree = SplitTree;