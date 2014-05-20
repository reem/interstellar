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
  this.children = _.map(this.box.split(), function (split) {
    return new SplitTree(split, this.max);
  }.bind(this));
  _.each(this.points, function (point) {
    _.each(this.children, function (child) {
      child.insert(point);
    }.bind(this));
  }.bind(this));
  this.values = [];
};

SplitTree.prototype.near = function (point) {
  if (!boxContains(this.box, point)) {
    return null;
  }

  if (this.isLeaf()) {
    return this.values;
  } else {
    var found = _.find(this.children, function (child) {
      return boxContains(child.box, point);
    });
    if (!found) { return null; }
    return found.near(point);
  }
};

exports.SplitTree = SplitTree;