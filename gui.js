
// Dynamic Config
var UiConfig = function() {
    this.reload = false;

    this.traj0 = false;
    this.traj1 = false;
    this.traj2 = true;
    this.traj3 = false;

    this.scaleUi = 10;
    this.scale = 0.1;

    this.show10m = false;

    this.showLos = true;
    this.colorLos = [ 0xFF, 0xFF, 0xFF ];
    this.colorLosG = 0xFFFFFF;

    this.showRing = false;
    this.colorRing = [ 0x68, 0x68, 0x68 ];
    this.colorRingG = 0x686868;

    this.showTwo = false;
    this.colorTwo = [0xff, 0xff, 0x99 ];
    this.colorTwoG = 0xffff99;

    this.topDotZero = true;
    this.showEnemies = true;
}
var uiConfig = new UiConfig();


function initGui() {
    var gui = new dat.GUI({ 
        width: 600,
        closed: false,
    });
    //var guiLevel = gui.addFolder('defaults');
    scaleCtrl = gui.add(uiConfig, 'scaleUi', 1, 100).name('Horicontal scale factor in percent').min(1).max(100);
    scaleCtrl.onFinishChange(function(value) {
        value = value / 100;
        uiConfig.scale = value;
        resetGfx();
    }.bind(this));

    var f1 = gui.addFolder("Select trajectory based on zero distance and calibre")

    uiConfig.traj0 = false;
    traj0ctrl = f1.add(uiConfig, 'traj0').name(trajcetories[0].title);
    traj0ctrl.onChange(function(value) {
        resetGfx();
    }.bind(this));

    uiConfig.traj1 = false;
    traj1ctrl = f1.add(uiConfig, 'traj1').name(trajcetories[1].title);
    traj1ctrl.onChange(function(value) {
        resetGfx();
    }.bind(this));

    uiConfig.traj2 = true;
    traj2ctrl = f1.add(uiConfig, 'traj2').name(trajcetories[2].title);
    traj2ctrl.onChange(function(value) {
        resetGfx();
    }.bind(this));

    uiConfig.traj3 = false;
    traj3ctrl = f1.add(uiConfig, 'traj3').name(trajcetories[3].title);
    traj3ctrl.onChange(function(value) {
        resetGfx();
    }.bind(this));

    var f2 = gui.addFolder("Select optic options")

    showLosCtrl = f2.add(uiConfig, 'showLos').name("Line Of Sight (LOS) indicator enabled?");
    showLosCtrl.onChange(function(value) {
        resetGfx();
    }.bind(this));
    colorLosCtrl = f2.addColor(uiConfig, 'colorLos').name("Line Of Sight (LOS) color");
    colorLosCtrl.onChange(function(value) {
        uiConfig.colorLosG = rgbToHex(uiConfig.colorLos[0], uiConfig.colorLos[1], uiConfig.colorLos[2]);
        resetGfx();
    }.bind(this));

    showRingCtrl = f2.add(uiConfig, 'showRing').name("68MOA EOTECH reticle enabled?");
    showRingCtrl.onChange(function(value) {
        resetGfx();
    }.bind(this));
    colorRingCtrl = f2.addColor(uiConfig, 'colorRing').name("68MOA EOTECH reticle color");
    colorRingCtrl.onChange(function(value) {
        uiConfig.colorRingG = rgbToHex(uiConfig.colorRing[0], uiConfig.colorRing[1], uiConfig.colorRing[2]);
        resetGfx();
    }.bind(this));

    showTwoCtrl = f2.add(uiConfig, 'showTwo').name("EOTECH EXPS2-2 2nd dot (15MOA distance) enabled?");
    showTwoCtrl.onChange(function(value) {
        resetGfx();
    }.bind(this));
    colorTwoCtrl = f2.addColor(uiConfig, 'colorTwo').name("EOTECH EXPS2-2 2nd dot color");
    colorTwoCtrl.onChange(function(value) {
        uiConfig.colorTwoG = rgbToHex(uiConfig.colorTwo[0], uiConfig.colorTwo[1], uiConfig.colorTwo[2]);
        resetGfx();
    }.bind(this));
    topDotZeroCtrl = f2.add(uiConfig, 'topDotZero').name("EOTECH EXPS2-2 is center dot zeroed?");
    topDotZeroCtrl.onChange(function(value) {
        resetGfx();
    }.bind(this));

    var f2 = gui.addFolder("Other")

    show10mCtrl = f2.add(uiConfig, 'show10m').name("Show enemy at 10m distance?");
    show10mCtrl.onChange(function(value) {
        resetGfx();
    }.bind(this));
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    var res = "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    res = parseInt(res);
    return res;
}