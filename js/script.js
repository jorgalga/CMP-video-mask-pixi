document.addEventListener("DOMContentLoaded", function(event) {
    //launch component 
    init_pixi_video();


});

function init_pixi_video() {
    var video_w = 2400;
    var video_h = 1280;
    var ratio = video_h / video_w;
    console.log(ratio);

    var app = new PIXI.Application(window.innerWidth, window.innerWidth * ratio, { transparent: true });
    document.getElementById("cmp-video-mask").appendChild(app.view);
    app.stage.interactive = true;


    // Create play button that can be used to trigger the video
    var button = new PIXI.Graphics()
        .beginFill(0x0, 0.5)
        .drawRoundedRect(0, 0, 100, 100, 10)
        .endFill()
        .beginFill(0xffffff)
        .moveTo(36, 30)
        .lineTo(36, 70)
        .lineTo(70, 50);

    // Position the button
    button.x = (app.renderer.width - button.width) / 2;
    button.y = (app.renderer.height - button.height) / 2;

    // Enable interactivity on the button
    button.interactive = true;
    button.buttonMode = true;

    // Add to the stage
    app.stage.addChild(button);

    var container = new PIXI.Container();

    // Listen for a click/tap event to start playing the video
    // this is useful for some mobile platforms. For example:
    // ios9 and under cannot render videos in PIXI without a 
    // polyfill - https://github.com/bfred-it/iphone-inline-video
    // ios10 and above require a click/tap event to render videos 
    // that contain audio in PIXI. Videos with no audio track do 
    // not have this requirement
    button.on('pointertap', onPlayVideo);

    function onPlayVideo() {

        // Don't need the button anymore
        button.destroy();

        // create a video texture from a path
        var video = document.createElement("video");
        video.preload = "auto";
        video.loop = true; // enable looping
        video.src = "video/test.m4v";

        var texture = PIXI.Texture.fromVideo(video);

        // create a new Sprite using the video texture (yes it's that easy)
        var videoSprite = new PIXI.Sprite(texture);
        // Stetch the fullscreen
        videoSprite.width = app.renderer.width;
        videoSprite.height = app.renderer.height;

        container.addChild(videoSprite);
        app.stage.addChild(container);

        // let's create a moving shape
        var thing = new PIXI.Graphics();
        app.stage.addChild(thing);
        thing.x = app.renderer.width / 2;
        thing.y = app.renderer.height / 2;

        thing.x = 0;
        thing.y = 0;

        thing.lineStyle(0);
        container.mask = thing;

        var multi_DEST = [0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.0];

        var multi_ALIG = [0.80, 0.85, 0.85, 0.90, 0.90, 0.95, 0.95, 1.0];


        var sizing = 200;
        var count = 0;
        app.ticker.add(function() {
            count += 0.1;

            thing.clear();
            thing.beginFill(0x8bc5ff, 0.4);
            /*thing.moveTo(-sizing + Math.sin(count) * 20, -sizing + Math.cos(count) * 20);
            thing.lineTo(sizing + Math.cos(count) * 20, -sizing + Math.sin(count) * 20);
            thing.lineTo(sizing + Math.sin(count) * 20, sizing + Math.cos(count) * 20);
            thing.lineTo(-sizing + Math.cos(count) * 20, sizing + Math.sin(count) * 20);
            */

            thing.moveTo(0, 0);
            thing.lineTo(app.renderer.width, 0);

            //DEFAULT
            /*
            thing.lineTo(app.renderer.width, app.renderer.height * 0.65);
            thing.lineTo(app.renderer.width * 0.75, app.renderer.height * 0.70);
            thing.lineTo(app.renderer.width * 0.75, app.renderer.height * 0.75);
            thing.lineTo(app.renderer.width * 0.50, app.renderer.height * 0.80);
            thing.lineTo(app.renderer.width * 0.50, app.renderer.height * 0.85);
            thing.lineTo(app.renderer.width * 0.25, app.renderer.height * 0.90);
            thing.lineTo(app.renderer.width * 0.25, app.renderer.height * 0.95);
            */
            //AFTER SCROLL

            thing.lineTo(app.renderer.width, app.renderer.height * multi_ALIG[0]);
            thing.lineTo(app.renderer.width * 0.75, app.renderer.height * multi_ALIG[1]);
            thing.lineTo(app.renderer.width * 0.75, app.renderer.height * multi_ALIG[2]);
            thing.lineTo(app.renderer.width * 0.50, app.renderer.height * multi_ALIG[3]);
            thing.lineTo(app.renderer.width * 0.50, app.renderer.height * multi_ALIG[4]);
            thing.lineTo(app.renderer.width * 0.25, app.renderer.height * multi_ALIG[5]);
            thing.lineTo(app.renderer.width * 0.25, app.renderer.height * multi_ALIG[6]);
            thing.lineTo(app.renderer.width * 0, app.renderer.height * multi_ALIG[7]);

            //thing.lineTo(-sizing + Math.cos(count) * 20, sizing + Math.sin(count) * 20);
            //thing.rotation = count * 0.1;

        });
    }
    document.addEventListener("scroll", function(e) {
        console.log(window.scrollY);
    });
}