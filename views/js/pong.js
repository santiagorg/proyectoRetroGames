var bg;
var paddle;
var paddle1;
var paddle2;
var ball;

var ball_launched = false;
var ball_velocity = 600;

var score1;
var score2;
var score1_text;
var socre2_text;

var audio;


var juego = new Phaser.Game(800, 450, Phaser.CANVAS, 'bloque_juego');

var estadoPrincipal = {

	preload: function(){
    juego.load.image('bg', 'img/mesa.png');
		juego.load.image('paddle', 'img/playerpong.png');
		juego.load.image('ball', 'img/ball.png');

		juego.load.audio('hit',['assets/hit.wav']);
		juego.load.audio('hit_1',['assets/hit.wav']);
	},

	create: function(){
    bg = juego.add.tileSprite(0,0, 800, 450, 'bg');
		audio = juego.add.audio('hit');
		audio.play();

		paddle1 = create_paddle(0,juego.world.centerY);
		paddle2 = create_paddle(juego.world.width - 8,juego.world.centerY);
		ball = create_ball(juego.world.centerX, juego.world.centerY);

		juego.input.onDown.add(launch_ball, this);

		score1_text = juego.add.text(128,128, '0',{
			font: "64px Gabriella",
			fill: "#fff",
			align: "center"
		});
		score2_text = juego.add.text(juego.world.width - 158,128, '0',{
			font: "64px Impact Times",
			fill: "#fff",
			align: "center"
		});
		score1 = 0;
		score2 = 0;
	},

	update: function(){
		score1_text.text = score1;
		score2_text.text = score2;
		control_paddle(paddle1,juego.input.y);
    //sonido al chocar pala y bola
		juego.physics.arcade.collide(paddle1, ball, function(){
			juego.sound.play('hit');
		});
		juego.physics.arcade.collide(paddle2, ball, function(){
			juego.sound.play('hit_1');
		});
		//bola choca en fondo
		if(ball.body.blocked.left){
			score2 +=1;
		}else if(ball.body.blocked.right){
			score1 +=1;
		}

		paddle2.body.velocity.setTo(ball.body.velocity.y);
		paddle2.body.velocity.x = 0;
		paddle2.body.maxVelocity.y = 400;
	}

};

function create_paddle(x,y){
	paddle = juego.add.sprite(x,y, 'paddle');
	paddle.anchor.setTo(0.5,0.5);
	juego.physics.arcade.enable(paddle);
	paddle.body.collideWorldBounds = true;
	paddle.body.immovable = true;
	paddle.scale.setTo(1.5,1.5);

	return paddle;
}

function control_paddle(paddle,y){
	paddle.y = y;
	if(paddle.y < paddle.height/2){
		paddle.y = paddle.height/2;
	}else if(paddle.y > juego.world.height - paddle.height/2){
		paddle.y - juego.world.height - paddle.height/2;
	}

}

function create_ball(x,y){
	ball = juego.add.sprite(x,y,'ball');
	ball.anchor.setTo(0.5,0.5);
	juego.physics.arcade.enable(ball);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.setTo(1,1);

	return ball;
}

function launch_ball(){
	if(ball_launched){
		ball.x = juego.world.centerX;
		ball.y = juego.world.centerY;
		ball.body.velocity.setTo(0,0);
		ball_launched = false;

	}else{
		ball.body.velocity.x = -ball_velocity;
		ball.body.velocity.y = ball_velocity;
		ball_launched = true;
	}
}

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');