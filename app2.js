// mods by Patrick OReilly 
// Twitter: @pato_reilly Web: http://patricko.byethost9.com
var DEBUG=false;
var game = new Phaser.Game(700, 500, Phaser.AUTO, 'pang-example', { preload: preload, create: create, update: update, render: render });
var scake=1;
var gravity=600;
function preload() {
 game.load.image('sky', 'assets/sky2.jpg');
    game.load.image('dude', 'assets/a.png');
    game.load.spritesheet('ball', 'assets/pang1.png',98,98);
	 game.load.spritesheet('ball1', 'assets/pang2.png',98,98);
	  game.load.spritesheet('ball2', 'assets/pang3.png',98,98);
	   game.load.spritesheet('ball3', 'assets/pang4.png',98,98);
	    game.load.spritesheet('ball4', 'assets/pang5.png',98,98);
      game.load.image('lace', 'assets/lace.png');  game.load.image('ground', 'assets/platform.png');
	  game.load.spritesheet('bam', 'assets/bam.png', 98,98);
}

var image;
var timerEvent=0;var timerEvent2=0;
var timerStart;
var explosions;
var score=0;
var lower;
var explosionAnimation;
var timerEvents;
var secondtime=0;
function create() {
 sky= game.add.sprite(0, 0, 'sky');
    cursors = game.input.keyboard.createCursorKeys();
      //  Set the world (global) gravity
scoreText = game.add.text(
      10,
         10,      
        '0',
        {
            font: '14px "Arial"',
            fill: '#fff',
            strokeThickness: 5,
            align: 'center', stroke:'#111'
        }
    );
	      //  Set the world (global) gravity
eventText = game.add.text(
      300,
         30,      
        'Next Event',
        {
            font: '14px "Georgia"',
            fill: '#fff',
            strokeThickness: 1,
            align: 'center', stroke:'red'
        }
    );
   lineButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a vaiable
	balls = game.add.group();   
    laces =game.add.group();
	platforms=game.add.group();
	   // Here we create the ground.
     ground = platforms.create(0, -20, 'ground');
	 ground.body.allowGravity = false;
	 sky.body.allowGravity = false;
	 ground.body.immovable = true;
  //  ball = game.add.sprite(400, 200, 'ball');
//	lace = game.add.sprite(0, game.world.height-880, 'lace');
	
 ball = balls.create(
        400,
        200,
        'ball',
        1
    );
	

lace = laces.create(
        0,
         game.world.height-880,
        'lace',
        1
    );lace2 = laces.create(
        0,
         game.world.height-880,
        'lace',
        1
    );

    knocker = game.add.sprite(200, game.world.height, 'dude');
    ball.scale.setTo(scake,scake);
	
//	lace.body.gravity.setTo(0, -180);
    //  This gets it moving
  
    //  This makes the game world bounce-able
    ball.body.collideWorldBounds = true;
	// lace.body.collideWorldBounds = true;
    knocker.body.collideWorldBounds=true;
     knocker.scale.setTo(0.6,0.6);
// cop = platforms.create(120, 230, 'ground');
 //cop.body.immovable = true;

    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return

    ball.body.bounce.setTo(1, 1);
ball.body.velocity.setTo(100, 100);
    //  This sets the gravity the sprite responds to in the world, as a point
    //  Here we leave x=0 and set y=80 to simulate falling
    ball.body.gravity.setTo(0, gravity);
    knocker.body.gravity.setTo(0, gravity*40);
	
 knocker.reset(200,game.world.height-120);
	
	//pang
	
	explosions = game.add.group();

       var explosionAnimation = explosions.create(-100, -100, 'bam', false);

       // explosionAnimation.anchor.setTo(0.5, 0.5);

        explosionAnimation.animations.add('bam',[0,1],4,true);



  timerEvents=  game.time.events.loop(Phaser.Timer.SECOND * 20, nextball, this);


}
function nextball(){

		
 ball2 = balls.create(
        400,
       10,
        'ball'+Math.round(scake,1),
        1
    );
	
	gravity=(-1)*gravity;
	  ball2.body.collideWorldBounds = true;
  if(gravity<0){ball2.body.velocity.setTo(110,700);
  }else{
  
ball2.body.velocity.setTo(110,100);
  }
  //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
  scake=scake+0.2;
  ball2.scale.setTo(scake,scake);

    ball2.body.bounce.setTo(0.96,1);
	
 ball2.body.gravity.setTo(0,gravity);
}

//  Move the knocker with the arrow keys
function update () {
 game.time.events.duration
 eventText.setText("NEXT EVENT IN \n"+Math.round(game.time.events.duration/1000));

    //  Enable physics between the knocker and the ball
	 game.physics.collide(platforms, balls);
 game.physics.collide(platforms, knocker);
	game.physics.overlap(laces, platforms,killit,null,this);
    game.physics.overlap(knocker, balls,reaset,null,this);
	game.physics.overlap(laces, balls,dostuff,null,this);
    if (cursors.up.isDown)
    {
        //knocker.body.velocity.y = -300;
    }
    else if (cursors.right.isDown)
    {
       knocker.body.velocity.x =  250;
    }
    else if (cursors.left.isDown)
    {
        knocker.body.velocity.x = -250;
    }
    else
    {
        knocker.body.velocity.setTo(0,100);
    }
        if (lineButton.isDown){
		//	if(secondtime==1){
				
				//	lace2.reset(knocker.x,game.world.height);
					//lace2.body.velocity.setTo(0, -400);
				
//				secondtime=0;
	//		}else{
			
			
			if(timerEvent==0){
				lace.reset(knocker.x,game.world.height);
				
			 countTime();
			
				lace.body.velocity.setTo(0, -400);
					
			}
			secondtime=1;
			//}
		}
}
function countTime(){
timerEvent++;
}

function killit(lace, ground) {
lace.kill();
timerEvent=0;
//timerStart.remove();
}
function reaset(knocker,ball){
knocker.kill();
    lace.kill();
    ball.kill();
    score=0;scake=1;
	game.time.events.remove(timerEvents);
	gravity=Math.abs(gravity);
	create();

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
	
    score=score+1000/(Math.round(Math.abs(ball.scale.x))+1);

    scoreText.setText(score);
	if(ball.scale.x<0.25){ 
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
		   ball = balls.create((lacex),y, 'ball'+Math.round(scake-0.2,1));ball.body.velocity.setTo(20+velox, -20-veloy/2);
		
		  }else if(i==2){
			   ball = balls.create(lacex,y, 'ball'+Math.round(scake-0.2,1));ball.body.velocity.setTo(-15-velox,20- veloy/2);
			
		  }
		   
	/**/
			//  This just gives each star a slightly random bounce value
			 ball.body.bounce.setTo(0.99, 1);
			
			ball.scale.setTo(scalex/2, scaley/2); ball.body.gravity.setTo(0,gravity);
		//  This sets the gravity the sprite responds to in the world, as a point
		//  Here we leave x=0 and set y=80 to simulate falling
		ball.body.collideWorldBounds = true;
		
     
		}
	} var explosionAnimation = explosions.create(-100, -100, 'bam', false);

       // explosionAnimation.anchor.setTo(0.5, 0.5);

        explosionAnimation.animations.add('bam',[0,1],20,true);
	timerEvent=0;
	//timerStart.remove();
}
function render () {
if(DEBUG==true){
    //debug helper
 game.debug.renderSpriteInfo(ball, 32, 32);
  game.debug.renderSpriteBody(ground);
        game.debug.renderPhysicsBody(ball.body)
        balls.forEachAlive(function(ball) {
            game.debug.renderPhysicsBody(ball.body);
            game.debug.renderSpriteBody(ball);
        });
}
}
