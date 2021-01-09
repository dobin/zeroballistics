
/*
    Create entities we add to the scene
*/

function gfxCreateDebug() {
    // Debug
    if (uiConfig.showDebug) {
        data.gfxGroup.push(game.add.rectangle(
            0, 0, // xy
            1, 200,  // width, height
            0xffffff));
    }
}


function gfxCreateCharacters() {
    // Player
    data.gfxGroup.push(game.add.image(-1 * 71, 0, 'lemming'));

    // Enemy
    if (uiConfig.showEnemies) {
        enemyLocations.forEach(function (item, index) {
            if (item == 10 && !uiConfig.show10m) {
                return;
            }
            makeEnemy(item);
            if (item > 0) {
                makeNr(item);
            }
        }.bind(this));
    }
}


function gfxCreateReticleEnemy() {
    var centerX = config.reticleOffsetX;
    var centerY = config.recicleOffsetY;

    // Reticle Enemy Picture
    data.reticleEnemy = game.add.image(
        (uiConfig.scale * (centerX)) - 10, 
        centerY + uiConfig.enemyOffset - config.offset, 
        'enemy');
    data.gfxGroup.push(data.reticleEnemy);

    // Reticle Distance Text
    if (data.trajImpactX > 0) {
        data.gfxGroup.push(game.add.text(
            uiConfig.scale * (centerX-210), 
            centerY+200, 
            data.trajImpactX)
        );
    }
}


function gfxCreateHeight() {
    // Height indicator
    data.gfxGroup.push(game.add.rectangle(
        -200, 0, // xy
        4, 200,  // width, height
        0xffffff));
    data.gfxGroup.push(game.add.text(
        -250, 110, 
        "2m").setScale(6));

    // Line of sight
    if (uiConfig.showLos) {
        data.lineLos = new Phaser.Geom.Line(
            -50, config.offset, 
            uiConfig.scale * (60000), config.offset);

        arr = {};
        enemyLocations.forEach(element => arr[element] = 0);
        delete(arr[0]);
        makeDots(arr, uiConfig.colorLosG);
    } else {
        data.lineLos = null;
    }
}


function gfxCreateDotTwo() {
    if (uiConfig.showTwo) {
        var reverse = 1;
        if (uiConfig.topDotZero == false) {
            reverse = -1;
        }

        var endDist = 6;
        data.lineExps = new Phaser.Geom.Line(
            0, config.offset, 
            //uiConfig.scale * (60000), config.offset);
            // xy
            uiConfig.scale * (endDist*10000), config.offset+(reverse * (endDist*config.model2offset)));
    } else {
        data.lineExps = null;
    }
}


function gfxCreateRing() {
    if (uiConfig.showRing) {
        data.lineRing1 = new Phaser.Geom.Line(
            0, config.offset, 
            //uiConfig.scale * (60000), config.offset);
            // xy
            uiConfig.scale * (2*10000), config.offset+(2*96)); // 15 moa = 38cm
        data.lineRing2 = new Phaser.Geom.Line(
            0, config.offset, 
            //uiConfig.scale * (60000), config.offset);
            // xy
            uiConfig.scale * (2*10000), config.offset-(2*96));  // 68moa / 2 = 96cm
    } else {
        data.lineRing1 = null;
        data.lineRing2 = null;
    }
}


function gfxCreateTrajectories() {
    // trajectory blocks
    data.trajCurves = [];
    trajs = [
        uiConfig.traj0,
        uiConfig.traj1,
        uiConfig.traj2,
        uiConfig.traj3,
    ];
    for(var i=0; i < trajs.length; i++) {
        if (! trajs[i]) {
            continue;
        }
        makeDots(trajcetories[i].data, uiConfig.trajColorG);

        // trajectory curve
        data.points = [];
        for (var key in trajcetories[i].data) {
            value = trajcetories[i].data[key];

            key = uiConfig.scale * (key * 100);
            value = value * -1 + config.offset;
            data.points.push(new Phaser.Math.Vector2(key, value));
        }
        //data.trajCurves.push(new Phaser.Curves.CubicBezier(data.points));
        data.trajCurves.push(new Phaser.Curves.Spline(data.points));
    }
}


function makeLine(item) {
    // TODO
}


function makeEnemy(item) {
    var enemy = game.add.image(
        uiConfig.scale * ((item * 100) - 20), 
        uiConfig.enemyOffset,
        'enemy');
    enemy.setInteractive();
    enemy.on('pointerdown', function (pointer) {
        if (pointer.rightButtonDown()) {
            return;
        }

        //data.pointerWorldX = pointer.worldX;
        var a = getTrajY(pointer);
        if (a == null) {
            return;
        }
        var closestX = a[0];
        var trajY = a[1];

        if (! data.trajImpactShow) {
            data.trajImpactShow = true;
        }

        if (data.trajImpactX == closestX) {
            data.trajImpactShow = false;
            data.trajImpactY = 0;
            data.trajImpactX = 0;
            return;
        }
        
        data.trajImpactY = trajY;
        data.trajImpactX = closestX;
        data.trajImpactShow = true;

        data.reticleEnemyScale = 1/(100.0 / closestX);
        resetGfx();
    });
    data.gfxGroup.push(enemy);
}


function getTrajY(pointer) {
    var traj = getTraj();
    if (traj == null) {
        return null;
    }
    var realPtr = (pointer.worldX / uiConfig.scale) / 100;
    var closestX = closest(realPtr, enemyLocations);
    var trajY = traj[closestX];
    return [closestX, trajY];
}

function getTraj() {
    var traj = null;
    var trajCount = 0;

    if (uiConfig.traj0) {
        traj = trajcetories[0];
        trajCount++;
    }
    if (uiConfig.traj1) {
        traj = trajcetories[1];
        trajCount++;
    }
    if (uiConfig.traj2) {
        traj = trajcetories[2];
        trajCount++;
    }
    if (uiConfig.traj3) {
        traj = trajcetories[3];
        trajCount++;
    }

    if (trajCount > 1) {
        alert("More than one trajectory selected. Select one max");
        return null;
    } else {
        return traj.data;
    }
}

// https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
function closest (num, arr) {
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}


function makeDots(dotsData, color) {
    for (var key in dotsData) {
        // FIXME - do not do this here, but in caller function
        if (key == 0) {
            continue;
        }
        value = dotsData[key];
        
        // use cm here
        data.gfxGroup.push(game.add.rectangle(
            uiConfig.scale * (key * 100), value * -1 + config.offset, // xy
            uiConfig.scale * (100), 1,  // width, height
            color));
    }
}


function makeNr(item) {
    var s = 0;
        if (uiConfig.scale > 0.5) {
            s = 10;
        } else if (uiConfig.scale >= 0.1) {
            s = 5;
        } else {
            s = 3;
        }
        data.gfxGroup.push(game.add.text(
            uiConfig.scale * ((item*100))-50, 100, 
            item.toString()).setScale(s)
        );
}
