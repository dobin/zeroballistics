
// Dynamic Config
var UiConfig = function() {
    this.reload = false;

    this.traj0 = false;
    this.traj1 = false;
    this.traj2 = true;
    this.traj3 = false;
    this.trajColor = [ 0xFF, 0x00, 0x00 ];
    this.trajColorG = 0xFF0000;
    this.show2ndDotTraj = false;

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
    gui.remember(uiConfig);
    gui.add(uiConfig, 'scaleUi', 1, 100).name('Horicontal scale factor in percent').min(1).max(100).onFinishChange(function(value) {
        value = value / 100;
        uiConfig.scale = value;
        resetGfx();
    }.bind(this));

    var f1 = gui.addFolder("Select trajectory based on zero distance and calibre")

    f1.add(uiConfig, 'traj0').name(trajcetories[0].title).onChange(function(value) {
        resetGfx();
    }.bind(this));
    f1.add(uiConfig, 'traj1').name(trajcetories[1].title).onChange(function(value) {
        resetGfx();
    }.bind(this));
    f1.add(uiConfig, 'traj2').name(trajcetories[2].title).onChange(function(value) {
        resetGfx();
    }.bind(this));
    f1.add(uiConfig, 'traj3').name(trajcetories[3].title).onChange(function(value) {
        resetGfx();
    }.bind(this));

    f1.add(uiConfig, 'show2ndDotTraj').name("Also show interpolated trajectory of the 2nd dot").onChange(function(value) {
        resetGfx();
    }.bind(this));

    var f2 = gui.addFolder("Select optic options")

    f2.add(uiConfig, 'showLos').name("Line Of Sight (LOS) indicator enabled?").onChange(function(value) {
        resetGfx();
    }.bind(this));
    f2.addColor(uiConfig, 'colorLos').name("Line Of Sight (LOS) color").onChange(function(value) {
        uiConfig.colorLosG = rgbToHex(uiConfig.colorLos[0], uiConfig.colorLos[1], uiConfig.colorLos[2]);
        resetGfx();
    }.bind(this));

    f2.add(uiConfig, 'showRing').name("68MOA Eotech reticle enabled?").onChange(function(value) {
        resetGfx();
    }.bind(this));
    f2.addColor(uiConfig, 'colorRing').name("68MOA Eotech reticle color").onChange(function(value) {
        uiConfig.colorRingG = rgbToHex(uiConfig.colorRing[0], uiConfig.colorRing[1], uiConfig.colorRing[2]);
        resetGfx();
    }.bind(this));

    f2.add(uiConfig, 'showTwo').name("Eotech EXPS2-2 2nd dot (15MOA distance) enabled?").onChange(function(value) {
        resetGfx();
    }.bind(this));
    f2.addColor(uiConfig, 'colorTwo').name("Eotech EXPS2-2 2nd dot color").onChange(function(value) {
        uiConfig.colorTwoG = rgbToHex(uiConfig.colorTwo[0], uiConfig.colorTwo[1], uiConfig.colorTwo[2]);
        resetGfx();
    }.bind(this));
    f2.add(uiConfig, 'topDotZero').name("Eotech EXPS2-2 is top dot zeroed?").onChange(function(value) {
        resetGfx();
    }.bind(this));

    var f2 = gui.addFolder("Other")

    f2.add(uiConfig, 'show10m').name("Show enemy at 10m distance?").onChange(function(value) {
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