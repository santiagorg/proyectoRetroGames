var fondoJuego;
var nave;
var cursores;
var balas;
var tiempoBala = 0;
var botonDisparo;
var enemigos;

var juego = new Phaser.Game(800, 450, Phaser.CANVAS, 'bloque_juego');


var estadoPrincipal = {
	preload: function(){
		juego.load.image('fondo', 'img/space.jpg');
		juego.load.image('personaje', 'img/dragon.png');
		juego.load.image('bolafuego', 'img/bolafuego.png');
		juego.load.image('enemigo', 'img/angel.png')
	},

	create: function(){
		fondoJuego = juego.add.tileSprite(0, 0, 800, 450, 'fondo');
		nave = juego.add.sprite(juego.width/2,juego.height - 50, 'personaje');
		nave.anchor.setTo(0.5,0.5);

		cursores = juego.input.keyboard.createCursorKeys();
		botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		balas = juego.add.group();//crea grupo de balas
		balas.enableBody = true;
		balas.physicsBodyType = Phaser.Physics.ARCADE;
		balas.createMultiple(20, 'bolafuego');
		balas.setAll('anchor.x', 0.5);
		balas.setAll('anchor.y', 1);
		balas.setAll('outOfBoundsKill', true);
		balas.setAll('checkWorldBounds', true);

		enemigos = juego.add.group();	
		enemigos.enableBody = true;
		enemigos.physicsBodyType = Phaser.Physics.ARCADE;

		//crear enemigo y mostrarlos

		for(y=0;y<5;y++){ 

			for(x=0;x<14;x++){
				var enemigo = enemigos.create(x*53, y*40, 'enemigo');
				enemigo.anchor.setTo(0.5,0.5);
			}
		}
		enemigos.x = 30;
		enemigos.y = 30;

		var animacion = juego.add.tween(enemigos).to({x:70}, 700, Phaser.Easing.Linear.None, true, 0, 1000, true); 
		animacion.onLoop.add(descender, this);
	},

	update: function(){
		if(cursores.right.isDown){
			nave.position.x += 3;
		}else if(cursores.left.isDown){
			nave.position.x -= 3;
		}
		var bala;
		if(botonDisparo.isDown){
			if(juego.time.now > tiempoBala){
				bala = balas.getFirstExists(false); //solo cogemos la primera para disparar del grupo
        
			}
			if(bala){
				bala.reset(nave.x, nave.y);
				bala.body.velocity.y = -200;
				tiempoBala = juego.time.now + 200;
			}
			
		}
		juego.physics.arcade.overlap(balas, enemigos, colision, null, this);// colision de objetos en mismi plano
	}



};


function colision(bala,enemigo){
	bala.kill();
	enemigo.kill();
}

function descender(){
	enemigos.y = enemigos.y + 10;
}


juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');