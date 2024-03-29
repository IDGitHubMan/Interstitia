export class Star {
  constructor(s, sf) {
    this.sketch = s;
    this.parent = sf;
    this.loc = this.sketch.createVector(
      this.sketch.random(1),
      this.sketch.random(1)
    );
    this.points = this.sketch.int(
      this.sketch.random(this.parent.pointsMin, this.parent.pointsMax)
    );
    this.rotation = this.sketch.random(this.sketch.TWO_PI);
    this.starType = this.sketch.random(1);
    this.growth = 0;
    this.intensity = this.sketch.random(1);
    this.twinkling = false;
    this.timing = 0;
    this.rotationIncrement = this.sketch.random(0.01, 0.1);
    if (this.starType <= this.parent.t1) {
      this.startCol = this.sketch.color(
        this.parent.c1[0],
        this.parent.c1[1],
        this.parent.c1[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c2[0],
        this.parent.c2[1],
        this.parent.c2[2]
      );
    } else if (this.starType <= this.parent.t2) {
      this.startCol = this.sketch.color(
        this.parent.c1[0],
        this.parent.c1[1],
        this.parent.c1[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c2[0],
        this.parent.c2[1],
        this.parent.c2[2]
      );
    } else if (this.starType <= this.parent.t3) {
      this.startCol = this.sketch.color(
        this.parent.c1[0],
        this.parent.c1[1],
        this.parent.c1[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c2[0],
        this.parent.c2[1],
        this.parent.c2[2]
      );
    } else if (this.starType <= this.parent.t4) {
      this.startCol = this.sketch.color(
        this.parent.c1[0],
        this.parent.c1[1],
        this.parent.c1[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c2[0],
        this.parent.c2[1],
        this.parent.c2[2]
      );
    } else if (this.starType <= this.parent.t5) {
      this.startCol = this.sketch.color(
        this.parent.c1[0],
        this.parent.c1[1],
        this.parent.c1[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c2[0],
        this.parent.c2[1],
        this.parent.c2[2]
      );
    } else {
      this.startCol = this.sketch.color(
        this.parent.c1[0],
        this.parent.c1[1],
        this.parent.c1[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c2[0],
        this.parent.c2[1],
        this.parent.c2[2]
      );
    }
  }

  twinkle() {
    if (this.starType <= this.parent.t1) {
      this.startCol = this.sketch.color(
        this.parent.c1[0],
        this.parent.c1[1],
        this.parent.c1[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c2[0],
        this.parent.c2[1],
        this.parent.c2[2]
      );
    } else if (this.starType <= this.parent.t2) {
      this.startCol = this.sketch.color(
        this.parent.c2[0],
        this.parent.c2[1],
        this.parent.c2[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c3[0],
        this.parent.c3[1],
        this.parent.c3[2]
      );
    } else if (this.starType <= this.parent.t3) {
      this.startCol = this.sketch.color(
        this.parent.c3[0],
        this.parent.c3[1],
        this.parent.c3[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c4[0],
        this.parent.c4[1],
        this.parent.c4[2]
      );
    } else if (this.starType <= this.parent.t4) {
      this.startCol = this.sketch.color(
        this.parent.c4[0],
        this.parent.c4[1],
        this.parent.c4[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c5[0],
        this.parent.c5[1],
        this.parent.c5[2]
      );
    } else if (this.starType <= this.parent.t5) {
      this.startCol = this.sketch.color(
        this.parent.c5[0],
        this.parent.c5[1],
        this.parent.c5[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c6[0],
        this.parent.c6[1],
        this.parent.c6[2]
      );
    } else {
      this.startCol = this.sketch.color(
        this.parent.c6[0],
        this.parent.c6[1],
        this.parent.c6[2]
      );
      this.endCol = this.sketch.color(
        this.parent.c7[0],
        this.parent.c7[1],
        this.parent.c7[2]
      );
    }
    this.rotation += this.rotationIncrement;
    if (this.timing >= this.parent.twinkleInterval) {
      this.twinkling = false;
      this.timing = 0;
      this.rotationIncrement = this.sketch.random(0.01, 0.1);
      this.points = this.sketch.int(
        this.sketch.random(this.parent.pointsMin, this.parent.pointsMax)
      );
      this.growth = 0;
    }
    this.sketch.strokeWeight(this.intensity);
    this.sketch.stroke(
      this.sketch.lerpColor(this.startCol, this.endCol, this.intensity)
    );
    this.sketch.point(
      this.loc.x * this.sketch.width,
      this.loc.y * this.sketch.height
    );
    this.sketch.strokeWeight(1);
    if (!this.twinkling) {
      let choice = this.sketch.random(1);
      if (choice >= 0.999) {
        this.twinkling = true;
      }
    } else {
      this.sketch.beginShape();
      for (let i = 0; i < this.points * 3; i++) {
        if (this.timing <= this.parent.twinkleInterval / 2) {
          this.growth = this.sketch.map(
            this.timing,
            0,
            this.parent.twinkleInterval / 2,
            0,
            10
          );
        } else {
          this.growth = this.sketch.map(
            this.timing,
            this.parent.twinkleInterval / 2,
            this.parent.twinkleInterval,
            10,
            0
          );
        }
        let position = this.sketch.map(
          i,
          0,
          this.points * 3,
          0,
          this.sketch.TWO_PI
        );
        position += this.rotation;
        if (i % 3 === 0) {
          this.sketch.vertex(
            this.sketch.cos(position - 0.01) * this.intensity +
              this.loc.x * this.sketch.width,
            this.sketch.sin(position - 0.01) * this.intensity +
              this.loc.y * this.sketch.height
          );
        } else if (i % 3 === 1) {
          this.sketch.vertex(
            this.sketch.cos(position) * this.growth * this.intensity +
              this.loc.x * this.sketch.width,
            this.sketch.sin(position) * this.growth * this.intensity +
              this.loc.y * this.sketch.height
          );
        } else {
          this.sketch.vertex(
            this.sketch.cos(position + 0.01) * this.intensity +
              this.loc.x * this.sketch.width,
            this.sketch.sin(position + 0.01) * this.intensity +
              this.loc.y * this.sketch.height
          );
        }
      }
      this.sketch.endShape();
      this.timing += 1;
    }
  }
}

export class Starfield {
  constructor(
    s,
    pmin = 4,
    pmax = 7,
    rmin = 0.01,
    rmax = 0.1,
    ti = 200,
    tc = 0.999,
    t1 = 0.7645,
    t2 = 0.8855,
    t3 = 0.9615,
    t4 = 0.9915,
    t5 = 0.9975,
    c1 = [255, 244, 111],
    c2 = [255, 210, 161],
    c3 = [255, 244, 234],
    c4 = [248, 247, 255],
    c5 = [202, 215, 255],
    c6 = [170, 191, 255],
    c7 = [155, 176, 255],
    sc = 500,
    bgA = 50,
    rs
  ) {
    this.sketch = s;
    this.pointsMin = pmin;
    this.pointsMax = pmax;
    this.rotMin = rmin;
    this.rotMax = rmax;
    this.twinkleInterval = ti;
    this.twinkleChance = tc;
    this.t1 = t1;
    this.t2 = t2;
    this.t3 = t3;
    this.t4 = t4;
    this.t5 = t5;
    this.c1 = c1;
    this.c2 = c2;
    this.c4 = c4;
    this.c3 = c3;
    this.c5 = c5;
    this.c6 = c6;
    this.c7 = c7;
    this.count = sc;
    this.bgA = bgA;
    this.stars = [];
    if (rs) {
      this.sketch.randomSeed(rs);
    }
    for (let i = 0; i < this.count; i++) {
      let s = new Star(this.sketch, this);
      this.stars.push(s);
    }
  }

  update() {
    this.sketch.background(0, this.bgA);
    for (let star of this.stars) {
      star.twinkle();
    }
  }
}

export class Storm {
  constructor(s) {
    this.sketch = s;
    this.strikeChance = 0.005;
    class Drop {
      constructor(s) {
        this.sketch = s;
        this.mass = this.sketch.random(0.1, 2.0);
        this.gravity = this.sketch.createVector(0, 9.8 * this.mass * 4);
        this.splashes = this.sketch.int(this.sketch.random(1, 20));
        this.l = this.sketch.map(this.mass, 0.1, 2.0, 25, 75);
        this.loc = this.sketch.createVector(
          this.sketch.random(this.sketch.width),
          this.sketch.random(this.sketch.height)
        );
        this.col = this.sketch.color(255, 50);
      }

      update() {
        if (this.loc.y >= this.sketch.height) {
          this.loc = this.sketch.createVector(
            this.sketch.random(this.sketch.width),
            0
          );
          this.mass = this.sketch.random(0.1, 2.0);
          this.mass = this.sketch.random(0.1, 2.0);
          this.gravity = this.sketch.createVector(0, 9.8 * this.mass * 4);
          this.splashes = this.sketch.int(this.sketch.random(1, 20));
        } else {
          this.loc.add(this.gravity);
        }
        this.sketch.stroke(this.col);
        this.sketch.strokeWeight(1);
        this.sketch.line(
          this.loc.x,
          this.loc.y,
          this.loc.x,
          this.loc.y - this.l
        );
      }
    }
    this.droplets = [];
    for (let i = 0; i < 200; i++) {
      this.droplets[i] = new Drop(this.sketch);
    }
    this.lightnings = [];
  }

  update() {
    this.sketch.background(0, 0, 66);
    class Point {
      constructor(s, x, y) {
        this.sketch = s;
        this.pos = this.sketch.createVector(x, y);
      }

      show() {
        this.sketch.point(this.pos.x, this.pos.y);
      }
    }
    class Lightning {
      constructor(s) {
        this.sketch = s;
        this.stayCounter = 0;
        this.points = [];
        this.splitChance = 0;
        class Header {
          constructor(s) {
            this.sketch = s;
            this.loc = this.sketch.createVector(
              this.sketch.random(10, this.sketch.width - 10),
              0
            );
            this.end = this.sketch.createVector(
              this.sketch.random(this.sketch.width),
              this.sketch.height
            );
          }

          insertPoints() {
            this.split = this.sketch.random(1);
            let behaviorChoice = this.sketch.int(this.sketch.random(3));
            if (behaviorChoice === 0) {
              if (this.loc.x > this.end.x) {
                this.loc.x -= 1;
              } else if (this.loc.x < this.end.x) {
                this.loc.x += 1;
              }
              this.loc.y += 1;
            } else {
              let direct = this.sketch.createVector(
                this.sketch.random(-5, 5),
                this.sketch.random(-2, 5)
              );
              this.loc.add(direct);
            }
            return this.loc;
          }
        }
        var h1 = new Header(this.sketch);
        this.headers = [h1];
        this.points = [];
      }

      update() {
        for (var head of this.headers) {
          var res = head.insertPoints();
          if (
            res.x > this.sketch.width ||
            res.x < 0 ||
            res.y > this.sketch.height
          ) {
            this.stayCounter += 1;
            let a = this.sketch.map(this.stayCounter, 0, 25, 255, 0);
            let w = this.sketch.map(this.stayCounter, 0, 25, 10, 0);
            for (var p of this.points) {
              this.sketch.stroke(255, a);
              this.sketch.strokeWeight(w);
              p.show();
            }
          } else {
            if (head.split <= this.splitChance) {
              this.headers.push(head);
            }
            this.points.push(new Point(this.sketch, res.x, res.y));
          }
        }
      }
    }
    var strike = this.sketch.random(1);
    if (strike <= this.strikeChance) {
      this.lightnings.push(new Lightning(this.sketch));
    }
    for (var d of this.droplets) {
      d.update();
    }
    for (var lightning of this.lightnings) {
      if (lightning.stayCounter > 25) {
        this.lightnings.splice(
          this.lightnings.indexOf(lightning),
          this.lightnings.indexOf(lightning) + 1
        );
      }
      lightning.update();
    }
  }
}

export class Node {
  constructor(s, parent) {
    this.cont = parent;
    this.sketch = s;
    this.preMaxConnections = this.sketch.random();
    this.col1 = this.sketch.random();
    this.col2 = this.sketch.random();
    this.col3 = this.sketch.random();
    this.preRange = this.sketch.random();
    this.drift = this.sketch.createVector(
      this.sketch.random(-this.cont.nodeSpeed, this.cont.nodeSpeed),
      this.sketch.random(-this.cont.nodeSpeed, this.cont.nodeSpeed)
    );

    this.loc = this.sketch.createVector(
      this.sketch.random(this.sketch.width),
      this.sketch.random(this.sketch.height)
    );
  }
  update() {
    if (this.cont.connectAmountMode === 0) {
      this.maxConnections = this.sketch.ceil(
        this.sketch.map(
          this.preMaxConnections,
          0,
          1,
          this.cont.minConnects,
          this.cont.maxConnects
        )
      );
    } else {
      this.maxConnections = this.cont.minConnects;
    }
    if (this.cont.colorMode === 0) {
      this.col = this.sketch.color(
        this.sketch.map(this.col1, 0, 1, this.cont.col1[0], this.cont.col2[0]),
        this.sketch.map(this.col2, 0, 1, this.cont.col1[1], this.cont.col2[1]),
        this.sketch.map(this.col3, 0, 1, this.cont.col1[2], this.cont.col2[2])
      );
    } else if (this.cont.colorMode === 1) {
      this.col = this.sketch.color(
        this.cont.col1[0],
        this.cont.col1[1],
        this.cont.col1[2]
      );
    } else {
      this.col = this.cont.interpColor;
    }
    if (this.cont.rangeMode === 0) {
      this.range = this.sketch.map(
        this.preRange,
        0,
        1,
        this.cont.rangeMin,
        this.cont.rangeMax
      );
    } else if (this.cont.rangeMode === 1) {
      this.range = this.cont.rangeMin;
    } else {
      this.range = this.cont.interpRange;
    }
    if (this.cont.connectionVisibility) {
      let visible = this.cont.nodeStore.filter(
        (node) =>
          this.sketch.dist(node.loc.x, node.loc.y, this.loc.x, this.loc.y) <=
            this.range &&
          this.sketch.dist(node.loc.x, node.loc.y, this.loc.x, this.loc.y) > 0
      );
      this.cont.nearest
        ? visible.sort((n1, n2) => {
            return (
              this.sketch.dist(n1.loc.x, n1.loc.y, this.loc.x, this.loc.y) -
              this.sketch.dist(n2.loc.x, n2.loc.y, this.loc.x, this.loc.y)
            );
          })
        : visible.sort((n1, n2) => {
            return (
              this.sketch.dist(n2.loc.x, n2.loc.y, this.loc.x, this.loc.y) -
              this.sketch.dist(n1.loc.x, n1.loc.y, this.loc.x, this.loc.y)
            );
          });
      if (this.cont.connectionMode === 0) {
        for (let n of visible) {
          let distance = this.sketch.dist(
            n.loc.x,
            n.loc.y,
            this.loc.x,
            this.loc.y
          );
          let a;
          this.cont.nearest
            ? (a = this.sketch.map(distance, 0, this.range, 360, 0))
            : (a = this.sketch.map(distance, 0, this.range, 0, 360));
          this.sketch.strokeWeight(1);
          this.sketch.stroke(
            this.sketch.hue(this.col),
            this.sketch.saturation(this.col),
            this.sketch.brightness(this.col),
            a
          );
          if (distance <= n.range) {
            this.sketch.line(
              this.loc.x,
              this.loc.y,
              (this.loc.x + n.loc.x) / 2,
              (this.loc.y + n.loc.y) / 2
            );
          } else {
            this.sketch.line(this.loc.x, this.loc.y, n.loc.x, n.loc.y);
          }
        }
      } else {
        if (visible.length > 0) {
          for (
            let i = 0;
            i < this.sketch.min(visible.length - 1, this.maxConnections);
            i++
          ) {
            let distance = this.sketch.dist(
              visible[i].loc.x,
              visible[i].loc.y,
              this.loc.x,
              this.loc.y
            );
            let a;
            this.cont.nearest
              ? (a = this.sketch.map(distance, 0, this.range, 360, 0))
              : (a = this.sketch.map(distance, 0, this.range, 0, 360));
            this.sketch.strokeWeight(1);
            this.sketch.stroke(
              this.sketch.hue(this.col),
              this.sketch.saturation(this.col),
              this.sketch.brightness(this.col),
              a
            );
            if (distance <= visible[i].range) {
              this.sketch.line(
                this.loc.x,
                this.loc.y,
                (this.loc.x + visible[i].loc.x) / 2,
                (this.loc.y + visible[i].loc.y) / 2
              );
            } else {
              this.sketch.line(
                this.loc.x,
                this.loc.y,
                visible[i].loc.x,
                visible[i].loc.y
              );
            }
          }
        }
      }
    }
    if (this.cont.sparkles) {
      let visible = this.cont.nodeStore.filter(
        (node) =>
          this.sketch.dist(node.loc.x, node.loc.y, this.loc.x, this.loc.y) <=
            this.range &&
          this.sketch.dist(node.loc.x, node.loc.y, this.loc.x, this.loc.y) >
            0 &&
          this.sketch.dist(node.loc.x, node.loc.y, this.loc.x, this.loc.y) <=
            node.range
      );
      if (this.cont.sparkleWeightMode === 0) {
        this.sketch.strokeWeight(this.cont.sparkleWeightMin);
      } else if (this.cont.sparkleWeightMode === 1) {
        this.sketch.strokeWeight(
          this.sketch.random(
            this.cont.sparkleWeightMin,
            this.cont.sparkleWeightMax
          )
        );
      } else {
        this.sketch.strokeWeight(
          this.sketch.map(
            this.sketch.sin(
              this.sketch.map(
                this.sketch.millis() % (this.cont.sparkleWeightInterval * 1000),
                0,
                this.cont.sparkleWeightInterval * 1000,
                0,
                this.sketch.TWO_PI
              )
            ),
            -1,
            1,
            this.cont.sparkleWeightMin,
            this.cont.sparkleWeightMax
          )
        );
      }
      if (this.cont.sparkleDisplacementMode === 0) {
        this.sparkleDisp = this.cont.sparkleDisplacementMin;
      } else if (this.cont.sparkleDisplacementMode === 1) {
        this.sparkleDisp = this.sketch.random(
          this.cont.sparkleDisplacementMin,
          this.cont.sparkleDisplacementMax
        );
      } else {
        this.sparkleDisp = this.sketch.map(
          this.sketch.sin(
            this.sketch.map(
              this.sketch.millis() %
                (this.cont.sparkleDisplacementInterval * 1000),
              0,
              this.cont.sparkleDisplacementInterval * 1000,
              0,
              this.sketch.TWO_PI
            )
          ),
          -1,
          1,
          this.cont.sparkleDisplacementMin,
          this.cont.sparkleDisplacementMax
        );
      }
      this.cont.nearest
        ? visible.sort((n1, n2) => {
            return (
              this.sketch.dist(n1.loc.x, n1.loc.y, this.loc.x, this.loc.y) -
              this.sketch.dist(n2.loc.x, n2.loc.y, this.loc.x, this.loc.y)
            );
          })
        : visible.sort((n1, n2) => {
            return (
              this.sketch.dist(n2.loc.x, n2.loc.y, this.loc.x, this.loc.y) -
              this.sketch.dist(n1.loc.x, n1.loc.y, this.loc.x, this.loc.y)
            );
          });
      if (this.cont.connectionMode === 0) {
        for (let n of visible) {
          if (this.cont.sparkleColSystem === 0) {
            this.sketch.stroke(this.cont.sparkleCol1);
          } else if (this.cont.sparkleColSystem === 1) {
            this.sketch.stroke(this.sketch.lerpColor(this.col, n.col, 0.5));
          } else if (this.sparkleColSystem === 2) {
            this.sketch.stroke(
              this.sketch.random(
                this.cont.sparkleCol1[0],
                this.cont.sparkleCol2[0]
              ),
              this.sketch.random(
                this.cont.sparkleCol1[1],
                this.cont.sparkleCol2[1]
              ),
              this.sketch.random(
                this.cont.sparkleCol1[2],
                this.cont.sparkleCol2[2]
              )
            );
          } else {
            this.sketch.stroke(
              this.sketch.lerpColor(
                this.sketch.color(
                  this.cont.sparkleCol1[0],
                  this.cont.sparkleCol1[1],
                  this.cont.sparkleCol1[2]
                ),
                this.sketch.color(
                  this.cont.sparkleCol2[0],
                  this.cont.sparkleCol2[1],
                  this.cont.sparkleCol2[2]
                ),
                this.sketch.map(
                  this.sketch.sin(
                    this.sketch.map(
                      this.sketch.millis() %
                        (this.cont.sparkleColInterval * 1000),
                      0,
                      this.cont.sparkleColInterval * 1000,
                      0,
                      this.sketch.TWO_PI
                    )
                  ),
                  -1,
                  1,
                  0,
                  1
                )
              )
            );
          }
          this.sketch.point(
            (n.loc.x + this.loc.x) / 2 +
              this.sketch.random(-this.sparkleDisp, this.sparkleDisp),
            (n.loc.y + this.loc.y) / 2 +
              this.sketch.random(-this.sparkleDisp, this.sparkleDisp)
          );
        }
      } else {
        if (visible.length > 0) {
          for (
            let i = 0;
            i < this.sketch.min(visible.length - 1, this.cont.maxConnections);
            i++
          ) {
            if (this.cont.sparkleColSystem === 0) {
              this.sketch.stroke(this.cont.sparkleCol1);
            } else if (this.cont.sparkleColSystem === 1) {
              this.sketch.stroke(
                this.sketch.lerpColor(this.col, visible[i].col, 0.5)
              );
            } else if (this.sparkleColSystem === 2) {
              this.sketch.stroke(
                this.sketch.random(
                  this.cont.sparkleCol1[0],
                  this.cont.sparkleCol2[0]
                ),
                this.sketch.random(
                  this.cont.sparkleCol1[1],
                  this.cont.sparkleCol2[1]
                ),
                this.sketch.random(
                  this.cont.sparkleCol1[2],
                  this.cont.sparkleCol2[2]
                )
              );
            } else {
              this.sketch.stroke(
                this.sketch.lerpColor(
                  this.sketch.color(
                    this.cont.sparkleCol1[0],
                    this.cont.sparkleCol1[1],
                    this.cont.sparkleCol1[2]
                  ),
                  this.sketch.color(
                    this.cont.sparkleCol2[0],
                    this.cont.sparkleCol2[1],
                    this.cont.sparkleCol2[2]
                  ),
                  this.sketch.map(
                    this.sketch.sin(
                      this.sketch.map(
                        this.sketch.millis() %
                          (this.cont.sparkleColInterval * 1000),
                        0,
                        this.cont.sparkleColInterval * 1000,
                        0,
                        this.sketch.TWO_PI
                      )
                    ),
                    -1,
                    1,
                    0,
                    1
                  )
                )
              );
            }
            this.sketch.point(
              (visible[i].loc.x + this.loc.x) / 2 +
                this.sketch.random(-this.sparkleDisp, this.sparkleDisp),
              (visible[i].loc.y + this.loc.y) / 2 +
                this.sketch.random(-this.sparkleDisp, this.sparkleDisp)
            );
          }
        }
      }
    }
    this.loc.add(this.drift);
    if (this.loc.x > this.sketch.width || this.loc.x < 0) {
      this.drift.x *= -1;
    }
    if (this.loc.y > this.sketch.height || this.loc.y < 0) {
      this.drift.y *= -1;
    }
    if (this.cont.coreVisibility) {
      this.sketch.fill(this.col);
      this.sketch.noStroke();
      this.sketch.ellipse(this.loc.x, this.loc.y, 1, 1);
    }
    if (this.cont.rangeVisibility) {
      this.sketch.noFill();
      this.sketch.stroke(this.col);
      this.sketch.ellipse(this.loc.x, this.loc.y, this.range, this.range);
    }
  }
}

export class Graph {
  constructor(settings) {
    this.sketch = settings.sketch;
    this.nearest = settings.n ?? true;
    this.nodeCount = settings.nc ?? 25;
    this.nodeSpeed = settings.ns ?? 2;
    this.maxConnects = settings.maxc ?? 10;
    this.minConnects = settings.minc ?? 2;
    this.connectAmountMode = settings.cam ?? 0;
    this.coreVisibility = settings.crv ?? true;
    this.connectionVisibility = settings.cnv ?? true;
    this.connectionMode = settings.cnm ?? 0;
    this.rangeVisibility = settings.rv ?? false;
    this.colorMode = settings.cm ?? 0;
    this.colorInterval = settings.ci ?? 5;
    this.col1 = [settings.c1A ?? 0, settings.c1B ?? 360, settings.c1C ?? 360];
    this.col2 = [settings.c2A ?? 360, settings.c2B ?? 0, settings.c2C ?? 0];
    this.rangeMode = settings.rm ?? 0;
    this.rangeInterval = settings.ri ?? 5;
    this.rangeMin = settings.rmin ?? 100;
    this.rangeMax = settings.rmax ?? 300;
    this.sparkles = settings.sparkles ?? true;
    this.sparkleWeightMode = settings.swm ?? 0;
    this.sparkleWeightInterval = settings.swi ?? 5;
    this.sparkleWeightMin = settings.swmin ?? 2;
    this.sparkleWeightMax = settings.swmax ?? 5;
    this.sparkleDisplacementMode = settings.sdm ?? 0;
    this.sparkleDisplacementInterval = settings.sdi ?? 5;
    this.sparkleDisplacementMin = settings.sdmin ?? 0;
    this.sparkleDisplacementMax = settings.sdmax ?? 50;
    this.sparkleColSystem = settings.scs ?? 1;
    this.sparkleColInterval = settings.sci ?? 5;
    this.sparkleCol1 = [
      settings.sc1A ?? 0,
      settings.sc1B ?? 360,
      settings.sc1C ?? 360,
    ];
    this.sparkleCol2 = [
      settings.sc2A ?? 0,
      settings.sc2B ?? 0,
      settings.sc2C ?? 0,
    ];
    this.bg = [
      settings.bgA ?? 0,
      settings.bgB ?? 0,
      settings.bgC ?? 0,
      settings.bgc ?? 50,
    ];
    this.nodeStore = [];
    this.interpColor = this.sketch.color(0, 0, 0);
    if (settings.rs) {
      this.sketch.randomSeed(settings.rs);
    }
    for (let i = 0; i < this.nodeCount; i++) {
      let n = new Node(this.sketch, this);
      this.nodeStore[i] = n;
    }
  }
  update() {
    for (let node of this.nodeStore) {
      node.update();
    }
    this.sketch.background(this.bg);
    if (this.colorMode === 2) {
      this.interpColor = this.sketch.lerpColor(
        this.sketch.color(this.col1[0], this.col1[1], this.col1[2]),
        this.sketch.color(this.col2[0], this.col2[1], this.col2[2]),
        this.sketch.map(
          this.sketch.sin(
            this.sketch.map(
              this.sketch.millis() % (this.colorInterval * 1000),
              0,
              this.colorInterval * 1000,
              0,
              this.sketch.TWO_PI
            )
          ),
          -1,
          1,
          0,
          1
        )
      );
    }
    if (this.rangeMode === 2) {
      this.interpRange = this.sketch.map(
        this.sketch.sin(
          this.sketch.map(
            this.sketch.millis() % (this.rangeInterval * 1000),
            0,
            this.rangeInterval * 1000,
            0,
            this.sketch.TWO_PI
          )
        ),
        -1,
        1,
        this.rangeMin,
        this.rangeMax
      );
    }
  }
}

export class FlowNoise {
  constructor(s, parent) {
    this.sketch = s;
    this.controller = parent;
    this.loc = this.sketch.createVector(
      this.sketch.random(this.sketch.width),
      this.sketch.random(this.sketch.height)
    );
    this.acc = this.sketch.createVector(0, 0);
    this.vel = this.sketch.createVector(0, 0);
    this.col = this.sketch.random();
    this.size = this.sketch.random();
  }

  update() {
    var theta = this.sketch.map(
      this.sketch.noise(
        this.sketch.floor(this.loc.x / this.controller.resolution) *
          this.controller.xInc,
        this.sketch.floor(this.loc.y / this.controller.resolution) *
          this.controller.yInc,
        this.controller.steady
          ? (this.sketch.millis() / this.controller.rate) * 1000
          : this.sketch.floor(
              (this.sketch.millis() / this.controller.rate) * 1000
            )
      ),
      0,
      1,
      this.controller.full ? -this.sketch.TWO_PI : 0,
      this.sketch.TWO_PI
    );
    var flowForce = this.sketch.createVector(
      this.sketch.cos(theta),
      this.sketch.sin(theta)
    );
    flowForce.mult(this.controller.strength);
    this.acc.add(flowForce);
    this.vel.add(this.acc);
    this.vel.limit(this.controller.lim);
    this.loc.add(this.vel);
    if (this.loc.x > this.sketch.width) {
      this.loc.x = 0;
    }
    if (this.loc.x < 0) {
      this.loc.x = this.sketch.width;
    }
    if (this.loc.y > this.sketch.height) {
      this.loc.y = 0;
    }
    if (this.loc.y < 0) {
      this.loc.y = this.sketch.height;
    }
    this.acc.mult(0);
    this.sketch.strokeWeight(this.controller.size);
    if (this.controller.colSystem === 0) {
      this.sketch.stroke(this.controller.col0);
    } else if (this.controller.colSystem === 1) {
      this.sketch.stroke(
        this.sketch.lerpColor(
          this.controller.col0,
          this.controller.col1,
          this.sketch.map(this.loc.x, 0, this.sketch.width, 0, 1)
        )
      );
    } else if (this.controller.colSystem === 2) {
      this.sketch.stroke(
        this.sketch.lerpColor(
          this.controller.col0,
          this.controller.col1,
          this.sketch.map(this.loc.y, 0, this.sketch.height, 0, 1)
        )
      );
    } else if (this.controller.colSystem === 3) {
      this.sketch.stroke(
        this.sketch.lerpColor(
          this.sketch.lerpColor(
            this.controller.col0,
            this.controller.col1,
            this.sketch.map(this.loc.x, 0, this.sketch.width, 0, 1)
          ),
          this.sketch.lerpColor(
            this.controller.col2,
            this.controller.col3,
            this.sketch.map(this.loc.y, 0, this.sketch.height, 0, 1)
          ),
          0.5
        )
      );
    } else {
      this.sketch.stroke(
        this.sketch.lerpColor(
          this.controller.col0,
          this.controller.col1,
          this.col
        )
      );
    }
    if (this.controller.sm === 0) {
      this.sketch.strokeWeight(
        this.sketch.map(
          this.size,
          0,
          1,
          this.controller.minSize,
          this.controller.maxSize
        )
      );
    } else {
      this.sketch.strokeWeight(this.controller.size);
    }
    this.sketch.point(this.loc.x, this.loc.y);
  }
}

export class FlowSetNoise {
  constructor(settings) {
    this.sketch = settings.sketch;
    this.colSystem = settings.cs ?? 3;
    this.resolution = settings.res ?? 5;
    this.xInc = settings.x ?? 0.1;
    this.yInc = settings.y ?? 0.1;
    this.steady = settings.st ?? true;
    this.rate = settings.r ?? 5;
    this.full = settings.f ?? true;
    this.sm = settings.sm ?? 0;
    this.minSize = settings.smin ?? 1;
    this.maxSize = settings.smax ?? 10;
    this.strength = settings.fc ?? 1;
    this.lim = settings.lim ?? 5;
    this.col0 = this.sketch.color(
      settings.c0A ?? 255,
      settings.c0B ?? 255,
      settings.c0C ?? 0
    );
    this.col1 = this.sketch.color(
      settings.c1A ?? 0,
      settings.c1B ?? 0,
      settings.c1C ?? 255
    );
    this.col2 = this.sketch.color(
      settings.c2A ?? 255,
      settings.c2B ?? 0,
      settings.c2C ?? 255
    );
    this.col3 = this.sketch.color(
      settings.c3A ?? 0,
      settings.c3B ?? 255,
      settings.c3C ?? 0
    );
    this.alpha = settings.bga ?? 10;
    this.size = 0;
    this.sizeInterval = settings.si ?? 5;
    if (settings.rs) {
      this.sketch.randomSeed(settings.rs);
    }
    if (settings.ns) {
      this.sketch.noiseSeed(settings.ns);
    }
    this.flows = new Array(250);
    for (let i = 0; i < this.flows.length; i++) {
      this.flows[i] = new FlowNoise(this.sketch, this);
    }
  }

  update() {
    if (this.sm === 1) {
      this.size = this.sketch.map(
        this.sketch.sin(
          this.sketch.map(
            this.sketch.millis() % this.sizeInterval,
            0,
            this.sizeInterval,
            0,
            this.sketch.TWO_PI
          )
        ),
        -1,
        1,
        this.minSize,
        this.maxSize
      );
    } else if (this.sm === 2) {
      this.size = this.minSize;
    }
    this.sketch.background(0, this.alpha);
    for (var flow of this.flows) {
      flow.update();
    }
  }
}

export class FlowPoint {}

export class FlowSetPoint {}

export class NoiseWave {
  constructor(s) {
    this.sketch = s;
    this.size = 25;
    this.noiseInc = 0.0;
    this.colors = [];
    this.cols = this.sketch.width / this.size;
    for (let i = 0; i < this.cols; i++) {
      this.colors[i] = this.sketch.color(
        this.sketch.random(64),
        this.sketch.random(128),
        this.sketch.random(128, 255)
      );
    }
  }

  update() {
    this.sketch.background(0, 60);
    this.noiseInc += 0.001;
    for (let i = 0; i < this.cols; i++) {
      this.sketch.strokeWeight(23);
      this.sketch.stroke(this.colors[i]);
      this.sketch.line(
        i * this.size,
        0,
        i * this.size,
        (this.sketch.noise(i * 0.05, this.noiseInc) * this.sketch.height) / 2
      );
      this.sketch.line(
        i * this.size,
        (this.sketch.noise(i * 0.05, this.noiseInc) * this.sketch.height) / 2 +
          50,
        i * this.size,
        this.sketch.height
      );
    }
  }

  resize() {
    if (this.sketch.width / this.size > this.cols) {
      for (let i = 0; i < this.cols - this.sketch.width / this.size; i++) {
        this.colors.push(
          this.sketch.color(
            this.sketch.random(64),
            this.sketch.random(128),
            this.sketch.random(128, 255)
          )
        );
      }
    }
    this.cols = this.sketch.width / this.size;
  }
}

export class Arc {
  constructor(parent, s) {
    this.sketch = s;
    this.core = parent;
    this.reach = this.core.initVal;
    this.c1 = this.sketch.random();
    this.c2 = this.sketch.random();
    this.c3 = this.sketch.random();
    this.start = this.sketch.random(this.sketch.TWO_PI);
    this.end = this.sketch.random(this.sketch.PI / 3);
    this.pitch = this.sketch.random(this.sketch.TWO_PI); // X Rotation
    this.pitchIncrement = this.sketch.random(-1, 1) / 100;
    this.yaw = this.sketch.random(this.sketch.TWO_PI); // Y Rotation
    this.yawIncrement = this.sketch.random(-1, 1) / 100;
    this.roll = this.sketch.random(this.sketch.TWO_PI); // Z Rotation
    this.rollIncrement = this.sketch.random(-1, 1) / 100;
    this.w = this.sketch.random(5, 25);
  }

  show() {
    this.sketch.stroke(
      this.sketch.map(this.c1, 0, 1, this.core.col1[0], this.core.col2[0]),
      this.sketch.map(this.c2, 0, 1, this.core.col1[1], this.core.col2[1]),
      this.sketch.map(this.c3, 0, 1, this.core.col1[2], this.core.col2[2])
    );
    this.sketch.noFill();
    this.sketch.strokeWeight(
      this.sketch.map(
        this.reach,
        0,
        2 *
          this.sketch.dist(0, 0, this.sketch.width / 2, this.sketch.height / 2),
        0.1,
        this.w
      )
    );
    this.sketch.push();
    if (this.core.rotateZ) {
      this.sketch.rotateZ(this.roll);
    }
    if (this.core.rotateY) {
      this.sketch.rotateY(this.yaw);
    }
    if (this.core.rotateX) {
      this.sketch.rotateX(this.pitch);
    }
    if (this.core.displayShapes) {
      this.sketch.beginShape();
      for (let i = 0; i < this.core.vertices; i++) {
        let theta = this.sketch.map(
          i,
          0,
          this.core.vertices,
          0,
          this.sketch.TWO_PI
        );
        this.sketch.vertex(
          (this.sketch.cos(theta) * this.reach) / 2,
          (this.sketch.sin(theta) * this.reach) / 2
        );
      }
      this.sketch.vertex(
        (this.sketch.cos(0) * this.reach) / 2,
        (this.sketch.sin(0) * this.reach) / 2
      );
      this.sketch.endShape();
    }
    if (this.core.displayAster) {
      for (let i = 0; i < this.core.vertices; i++) {
        let theta = this.sketch.map(
          i,
          0,
          this.core.vertices,
          0,
          this.sketch.TWO_PI
        );
        this.sketch.line(
          (this.sketch.cos(theta) * this.reach) / 2,
          (this.sketch.sin(theta) * this.reach) / 2,
          0,
          0,
          0,
          0
        );
      }
    }
    if (this.core.displayArc) {
      if (this.core.fullArc) {
        this.sketch.ellipse(0, 0, this.reach, this.reach);
      } else {
        this.sketch.arc(0, 0, this.reach, this.reach, this.start, this.end);
      }
    }
    this.sketch.pop();
    this.reach += this.core.rate;
    this.roll += this.rollIncrement;
    this.pitch += this.pitchIncrement;
    this.yaw += this.yawIncrement;
  }
}

export class Core {
  constructor(settings, bg = [0, 0, 0, 360]) {
    this.sketch = settings.sketch;
    this.col1 = [settings.c1A ?? 200, settings.c1B ?? 360, settings.c1C ?? 360];
    this.col2 = [settings.c2A ?? 200, settings.c2B ?? 360, settings.c2C ?? 360];
    this.pulseTime = settings.pt ?? 2;
    this.lastPulse = this.sketch.millis();
    this.arcs = [];
    this.pulseCount = settings.pc ?? 1;
    this.rotateZ = settings.rz ?? true;
    this.rotateY = settings.ry ?? false;
    this.rotateX = settings.rx ?? false;
    this.vertices = settings.v ?? 4;
    this.displayShapes = settings.dp ?? false;
    this.displayAster = settings.ds ?? true;
    this.displayArc = settings.da ?? true;
    this.fullArc = settings.fa ?? true;
    this.initVal = settings.init ?? 100;
    this.rate = settings.r ?? 5;
    this.bg = this.sketch.color(
      settings.bgA ?? 0,
      settings.bgB ?? 0,
      settings.bgC ?? 0,
      settings.bgD ?? 360
    );
    if (settings.rs) {
      this.sketch.randomSeed(settings.rs);
    }
  }

  update() {
    this.sketch.background(this.bg);
    if (this.sketch.millis() - this.lastPulse >= this.pulseTime * 1000) {
      this.lastPulse = this.sketch.millis();
      for (let i = 0; i < this.pulseCount; i++) {
        this.arcs.push(new Arc(this, this.sketch));
      }
    }
    for (let i = 0; i < this.arcs.length; i++) {
      this.arcs[i].show();
      if (
        this.arcs[i].reach >=
          2 *
            this.sketch.dist(
              0,
              0,
              this.sketch.width / 2,
              this.sketch.height / 2
            ) ||
        this.arcs[i].reach < 0
      ) {
        this.arcs.splice(i, 1);
      }
    }
  }
}

export class DirectedGraph {}

export class GrowNode {
  constructor(s, parent, prev, indices) {
    this.sketch = s;
    this.parent = parent;
    this.children = [];
    if (prev) {
      this.col = this.sketch.color(
        this.sketch.red(this.prev.col) +
          this.sketch.random(-this.parent.colorShift, this.parent.colorShift),
        this.sketch.green(this.prev.col) +
          this.sketch.random(-this.parent.colorShift, this.parent.colorShift),
        this.sketch.blue(this.prev.col) +
          this.sketch.random(-this.parent.colorShift, this.parent.colorShift)
      );
      this.size = this.sketch.constrain(
        prev.size - this.parent.decrement,
        -this.parent.maxSize,
        this.parent.maxSize
      );
    } else {
      this.col = this.parent.startColor;
      this.size = -this.parent.maxSize;
    }

    if (indices) {
      this.indices = indices;
    } else {
      this.indices = this.sketch.createVector(
        this.sketch.ceil(this.sketch.width / this.parent.maxSize / 2),
        this.sketch.ceil(this.sketch.height / this.parent.maxSize / 2)
      );
    }
  }

  show() {
    this.size += this.parent.growthRate;
    if (this.size >= this.parent.maxSize) {
      this.size = this.parent.resetSize;
    }
  }
}
