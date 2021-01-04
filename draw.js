
/*
    Currently: Drawing lots of stuff on runtime
*/

function drawReticle(graphics) {
    var centerX = uiConfig.scale * config.reticleOffsetX;
    var centerY = config.recicleOffsetY;
    var dotOffset = 38; // 15moa in cm

    var color = 0xffff00;
    var thickness = 4;
    var alpha = 1;

    /* 68moa ring */
    graphics.lineStyle(thickness, uiConfig.colorRingG, alpha);
    var a = new Phaser.Geom.Point(centerX, centerY);
    var radius = 86; // 68 moa / 2 in cm
    graphics.strokeCircle(a.x, a.y, radius*data.reticleEnemyScale);

    /* center dot */
    graphics.fillStyle(uiConfig.colorLosG, 1.0);
    graphics.fillRect(centerX-2, centerY-2, 4, 4);

    /* 2nd dot */
    if (uiConfig.showTwo) {
        graphics.fillStyle(uiConfig.colorTwoG, 1.0);
        graphics.fillRect(centerX-2, centerY-2 + data.reticleEnemyScale*dotOffset, 4, 4);
    }

    /* impact dot */
    if (data.trajImpactShow) {
        var r1 = 8;
        var r2 = 4;

        /* on trajectory */
        graphics.fillStyle(uiConfig.trajColorG, 1.0);
        graphics.fillRect(
            uiConfig.scale * ((data.trajImpactX*100)) - (r1/2), 
            (data.trajImpactY * -1 + config.offset) - (r1/2), 
            r1, 
            r1);

        /* on reticle */
        graphics.fillStyle(uiConfig.trajColorG, 1.0);
        graphics.fillRect(
            centerX - (r2/2), 
            centerY - (r2/2) - data.trajImpactY, 
            r2, 
            r2);
    }
}

function drawLines(graphics) {
    if (uiConfig.showDebug) {
        for (var i = 0; i < data.points.length; i++)
        {
            graphics.fillStyle(0x00ff00, 1);
            graphics.fillCircle(data.points[i].x, data.points[i].y, 4);
        }
    }

    // los, white
    if (data.lineLos != null) {
        graphics.lineStyle(2, uiConfig.colorLosG, 1);
        graphics.strokeLineShape(data.lineLos);
        //graphics.lineBetween(0, config.offset, 
        //    uiConfig.scale * (60000), config.offset);
    }

    // exps, grey-yellow
    if (data.lineExps != null) {
        graphics.lineStyle(2, uiConfig.colorTwoG, 1);
        graphics.strokeLineShape(data.lineExps);
        //graphics.lineBetween(0, config.offset, 
        //    uiConfig.scale * (10000), config.offset+38);
    }

    // ring, grey
    if (data.lineRing1 != null) {
        graphics.lineStyle(2, uiConfig.colorRingG, 1);
        graphics.strokeLineShape(data.lineRing1);
        //graphics.lineBetween(0, config.offset, 
        //    uiConfig.scale * (10000), config.offset+96);
        graphics.strokeLineShape(data.lineRing2);
        //graphics.lineBetween(0, config.offset, 
        //    uiConfig.scale * (10000), config.offset-96);
    }

    // trajectories, red
    graphics.lineStyle(2, uiConfig.trajColorG, 1);
    for(var i=0; i<data.trajCurves.length; i++) {
        data.trajCurves[i].draw(graphics);
    }
}
