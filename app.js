// mods by Patrick OReilly 
// Twitter: @pato_reilly Web: http://patricko.byethost9.com
var DEBUG=0;
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'pang-example', { preload: preload, create: create, update: update, render: render });

function preload() {
 game.load.image('sky', 'assets/sky.jpg');
    game.load.image('dude', 'assets/sprites/pang-dude.png');
    game.load.spritesheet('ball', 'assets/pang.png',98,98);
      game.load.image('lace', 'assets/lace2.png'); 
      // game.load.image('ground', 'assets/platform.png');
	  game.load.spritesheet('bam', 'assets/bam.png', 98,98);
         game.load.tilemap('map', 'assets/tilemaps/maps/features_test.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    game.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
    game.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');

    game.load.image('phaser', 'assets/sprites/arrow.png');
    game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
}

var image;
var timerEvent=0;
var timerStart;var jumpTimer = 0;
var explosions;
var explosionAnimation;
var map;
var layer;
function create() {

     map = game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');
    map.addTilesetImage('walls_1x2');
    map.addTilesetImage('tiles2');

    map.setCollisionBetween(1, 12);

    layer = map.createLayer('Tile Layer 1');

    layer.debug = true;

 
    layer.resizeWorld();

    game.physics.gravity.y =450;
    game.physics.setBoundsToWorld();
    //  Here we create our coins group
    coins = game.add.group();

    cursors = game.input.keyboard.createCursorKeys();


   lineButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	balls = game.add.group();   
    laces =game.add.group();

	
 ball = balls.create(
        400,
        200,
        'ball',
        1
    );
	       


    knocker = game.add.sprite(120,120, 'dude');
    ball.scale.setTo(1,1);
	knocker.scale.setTo(1,1);
        knocker.body.velocity.y = 190;
        knocker.body.minVelocity.y = 5;

	
    //  This gets it moving
 knocker.body.bounce.setTo(0, 0.2);
    //  This makes the game world bounce-able
    ball.body.collideWorldBounds = true;
	// lace.body.collideWorldBounds = true;
   knocker.body.collideWorldBounds=true;
// cop = platforms.create(120, 230, 'ground');
 //cop.body.immovable = true;
console.log(knocker);
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return

    ball.body.bounce.setTo(0.98, 0.97);
//ball.body.velocity.setTo(100, 100);
    //  This sets the gravity the sprite responds to in the world, as a point
    //  Here we leave x=0 and set y=80 to simulate falling
  // ball.body.gravity.setTo(0, 680);
   //knocker.body.gravity.setTo(0, 15600);
	//knocker.scale.setTo(1,1);

    game.camera.follow(knocker);
        
            lace = laces.create(
                    knocker.x,
                     knocker.y,
                    'lace',
                    1
                );
	//pang
	
	explosions = game.add.group();

       var explosionAnimation = explosions.create(-100, -100, 'bam', false);

       // explosionAnimation.anchor.setTo(0.5, 0.5);

        explosionAnimation.animations.add('bam',[0,1,2,3],4,true);


   


}

//  Move the knocker with the arrow keys
function update () {

    knocker.body.velocity.x = 0;
    //  Enable physics between the knocker and the ball
	 game.physics.collide(layer, balls);
    game.physics.collide(knocker,layer);
    //game.physics.collide(laces,layer);

    game.physics.overlap(laces, layer,killit,null,this);
    game.physics.overlap(knocker, balls,function(){});
	game.physics.overlap(laces, balls,dostuff,null,this);

    if (cursors.up.isDown && knocker.body.onFloor() && game.time.now > jumpTimer)
    {
       knocker.body.velocity.y = -350;
        jumpTimer = game.time.now + 250;
    }

    else if (cursors.left.isDown)
    {
        knocker.body.velocity.x = -100;
    }
    else if (cursors.right.isDown)
    {
        knocker.body.velocity.x = 100;
    } 
    else
    {
  //      knocker.body.velocity.setTo(0, 0);
    }
        if (lineButton.isDown){
			if(timerEvent==0){
				
          lace.reset(knocker.x+10,knocker.y);
             countTime();
				lace.body.velocity.setTo(0, -400);lace.body.gravity.setTo(0, -180);
			}
		}
}
function countTime(){
timerEvent++;
}
function killit(lace, layer) {
lace.kill();
timerEvent=0;
//timerStart.remove();
}
function dostuff(lace, ball) {
	var lacex=lace.x;
	var lacey=lace.y;
	var x=ball.x;
	var y=ball.y;
	var scalex=ball.scale.x;
	var scaley=ball.scale.y;
	var velox=Math.abs(ball.body.velocity.x);
	var veloy=Math.abs(ball.body.velocity.y);



var explosionAnimation= explosions.getFirstAlive();
explosionAnimation.scale.x=ball.scale.x;
explosionAnimation.scale.y=ball.scale.y;
explosionAnimation.reset(lacex,y);
       explosionAnimation.play('bam',20, false,true);
	
	if(ball.scale.x==0.125){ 
ball.kill();
	//	ball.animations.onComplete(function(){);  
		lace.kill();
	}else{
  	//ball.animations.onComplete(function(){ball.kill()});  
	
	lace.kill();
	ball.kill();
   
		for (var i = 0; i <=2; i++) {
			//  Create a star inside of the 'stars' group
		   if(i==1){
		   ball = balls.create((lacex+20),y, 'ball');ball.body.velocity.setTo(10+velox, 110-veloy);
		
		  }else if(i==2){
			   ball = balls.create(lacex-20,y, 'ball');ball.body.velocity.setTo(-20-velox, 110-veloy);
			
		  }
		   
	/**/
			//  This just gives each star a slightly random bounce value
			 ball.body.bounce.setTo(0.99, 0.98);
			
			ball.scale.setTo(scalex/2, scaley/2); // ball.body.gravity.setTo(0,680);
		//  This sets the gravity the sprite responds to in the world, as a point
		//  Here we leave x=0 and set y=80 to simulate falling
		ball.body.collideWorldBounds = true;
		
     
		}
	} var explosionAnimation = explosions.create(-100, -100, 'bam', false);

       // explosionAnimation.anchor.setTo(0.5, 0.5);

        explosionAnimation.animations.add('bam',[0,1,2,3],60,true);
	timerEvent=0;
	//timerStart.remove();
}
function render () {
if(DEBUG==true){
    //debug helper
 game.debug.renderSpriteInfo(ball, 32, 32);

        game.debug.renderPhysicsBody(ball.body)
        balls.forEachAlive(function(ball) {
            game.debug.renderPhysicsBody(ball.body);
            game.debug.renderSpriteBody(ball);
        });
}
}
