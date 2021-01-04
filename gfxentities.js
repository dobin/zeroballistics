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
        //data.pointerWorldX = pointer.worldX;
        var a = getTrajY(pointer);
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
/*
    // head
    data.gfxGroup.push(game.add.rectangle(
        uiConfig.scale * (item * 100), -80, // xy
        enemyWidthScale * (20), 40,  // width, height
        0x666622));
    // legs
    data.gfxGroup.push(game.add.rectangle(
        uiConfig.scale * (item * 100), 60, // xy
        enemyWidthScale * (30), 80,  // width, height
        0x1166ff));
    // body
    data.gfxGroup.push(game.add.rectangle(
        uiConfig.scale * (item * 100), -20, // xy
        enemyWidthScale * (50), 100,  // width, height
        0x6622ff));*/
}


function getTrajY(pointer) {
    var traj = getTraj();
    var closestX = closest(pointer.worldX/10, enemyLocations);
    var trajY = traj[closestX];
    return [closestX, trajY];
}

function getTraj() {
    return trajcetories[1].data;
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
