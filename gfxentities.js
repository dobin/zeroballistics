function makeLine(item) {
    // TODO
}


function makeEnemy(item) {
    var enemyWidthScale = 1.0;  // was: uiConfig.scale

    data.gfxGroup.push(game.add.image(
        uiConfig.scale * ((item * 100) - 20), 
        0,
        'enemy'));
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
            0xff8800));
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
