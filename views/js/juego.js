var bg;
var tubos;
var pajaro;
var salto;
var timer;
var puntos;
var txtPuntos;

var Juego = {

	preload: function(){
		juego.load.image('bg', 'img/backgroundday.png');
		juego.load.spritesheet('pajaro', 'img/pokemon.png', 75, 42);
		juego.load.image('tubo', 'img/pipe-green.png');

		juego.forceSingleUpdate = true;
	},

	create: function(){
		bg = juego.add.tileSprite(0,0, 800, 450, 'bg');
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		
		tubos = juego.add.group();
		tubos.enableBody = true;
		tubos.createMultiple(20, 'tubo');

		pajaro = juego.add.sprite(juego.width/2 - 50,juego.height/2,'pajaro');
		pajaro.frame = 1;//al ser sprite, indica que cuadro mostrar
		pajaro.animations.add('vuelo', [0,1], 5, true);

		
		pajaro.anchor.setTo(0,0.5);//punto de anclaje al medio y escalar tamaño
		pajaro.scale.setTo(1,1);

		

		juego.physics.arcade.enable(pajaro);//controles habilitados
		pajaro.body.gravity.y = 1200;
		salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		salto.onDown.add(this.saltar, this);

		timer = juego.time.events.loop(1500, this.crearColumna, this);//crear bucle cada 1500 ms

		puntos = -1;
		txtPuntos = juego.add.text(20, 20, "0", {
			font: "30px Arial", fill: "#fff"
		})

	},

	update: function(){
		if(pajaro.inWorld == false){
			this.state.start('Game_Over');
		}else if(pajaro.position.y > 460){
			pajaro.alive = false;
			tubos.forEachAlive(function(t){
				t.body.velocity.x = 0;
			}, this);
		}else{
			bg.tilePosition.x -= 1;
		}
		juego.physics.arcade.overlap(pajaro, tubos, this.tocoTubo, null, this);
		pajaro.animations.play('vuelo');
		if(pajaro.angle < 20){
			pajaro.angle += 1;
		}

	},

	saltar: function (){
		pajaro.body.velocity.y = -350;
		juego.add.tween(pajaro).to({angle: -20}, 100).start();
	},

	crearColumna: function(){
		var hueco = Math.floor(Math.random()*5)+1;
		for(var i=0;i<8;i++){
			if (i != hueco && i != hueco+1){
				this.crearUnTubo(800, i*55+20);
			}
		}
		puntos += 1;
		txtPuntos.text = puntos;
	},

	crearUnTubo: function (x, y){
		var tubo = tubos.getFirstDead(); //si un tubo se sale de pantalla, se reusa

		tubo.reset(x, y);
		tubo.body.velocity.x = -300;
		tubo.checkWorldBounds = true;
		tubo.outOfBoundsKill = true;
	},

	tocoTubo: function (){
		if(pajaro.alive = false){
			return;
		}else{
			pajaro.alive = false;
			juego.time.events.remove(timer);
			tubos.forEachAlive(function(t){
				t.body.velocity.x = 0;
			}, this);

		}
	}











}