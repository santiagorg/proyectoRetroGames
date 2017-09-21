var Game_Over = {


	preload: function(){
		juego.stage.backgroundColor = '#333';
		juego.load.image('boton','img/btn.png');
	},

	create: function(){
		var boton = this.add.button(juego.width/2, juego.height/2, 'boton', this.iniciarJuego, this);
		boton.anchor.setTo(0.5,0.5);

		var txtPuntosEtiqueta = juego.add.text(juego.width/2 - 10, juego.height/2 - 85, "Puntos: ", {
			font: "bold 20px sans-serif", fill:"cyan", align:"center"
		});
		txtPuntosEtiqueta.anchor.setTo(0.5,0.5);
		if(puntos<0){
			puntos = 0;
		}
		var txtPuntosNumero = juego.add.text(juego.width/2 + 50, juego.height/2 - 85, puntos.toString(), {
			font: "bold 20px sans-serif", fill:"cyan", align:"center"
		});
		txtPuntosNumero.anchor.setTo(0.5,0.5);

		var txtTitulo = juego.add.text(juego.width/2, juego.height/2 - 155, "Majestic Flight", {
			font: "bold 34px sans-serif", fill:"cyan", align:"center"
		});
		txtTitulo.anchor.setTo(0.5,0.5);
	},

	iniciarJuego: function(){
		this.state.start('Juego');
	}


};