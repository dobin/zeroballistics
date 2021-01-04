function makeLine(item) {
    // TODO
}


function makeEnemy(item) {
    var enemy = game.add.image(
        uiConfig.scale * ((item * 100) - 20), 
        uiConfig.enemyOffset,
        'enemy');
    enemy.setInteractive();
    enemy.on('pointerup', function (pointer) {
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

    var closestX = closest(pointer.worldX/10, enemyLocations);
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
