

	var sound = new Pizzicato.Sound({ 
    	source: 'file',
    	options: { 
    		path: musicpath,
    		loop:true,
    		volume:1 
    	},
	}, function() {

		sound.play();
	});
	/*var reverb = new Pizzicato.Effects.Reverb({
	    time: 0,
	    decay: 0,
	    reverse: false,
	    mix: 0
	});*/
	//sound.addEffect(reverb);


	/*$(".colorPicker").bind('click', function(){
		reverb.time=color[0]/100;
		reverb.decay=color[1]/100;
		reverb.mix=(1-color[2]/255)/1.6;
		//console.log(reverb.time,reverb.decay,reverb.mix);
	});*/
	var sound1 = new Pizzicato.Sound({ 
    	source: 'file',
    	options: { 
    		path: "source/audio/bgm/001bg.mp3" ,
    		loop:true,
    		volume:0.05

    	},
	}, function() {
		//sound1.play();
	});
	
	var sound2 = new Pizzicato.Sound({ 
    	source: 'file',
    	options: { 
    		path: "source/audio/bgm/002bg.mp3" ,
    		loop:true,
    		volume:0.1
    	},
	}, function() {
		//sound2.addEffect(lowPassFilter);
		 //sound2.play();

	});
	var sound3 = new Pizzicato.Sound({ 
		source: 'file',
		options: { 
			path: "source/audio/bgm/003bg.mp3" ,
			loop:true,
			volume:0.1
		},
	}, function() {

		//sound3.play();
	});
	var sound4 = new Pizzicato.Sound({ 
		source: 'file',
		options: { 
			path: "source/audio/bgm/004bg.mp3" ,
			loop:true,
			volume:0.1
		},
	}, function() {

		//sound4.play();
	});
	var sound5 = new Pizzicato.Sound({ 
		source: 'file',
		options: { 
			path: "source/audio/bgm/005bg.mp3" ,
			loop:true,
			volume:0.1
		},
	}, function() {

		//sound5.play();
	});
	var sound6 = new Pizzicato.Sound({ 
		source: 'file',
		options: { 
			path: "source/audio/bgm/006bg.mp3" ,
			loop:true,
			volume:0.1
		},
	}, function() {

		//sound6.play();
	});
	var sound7 = new Pizzicato.Sound({ 
		source: 'file',
		options: { 
			path: "source/audio/bgm/007bg.mp3" ,
			loop:true,
			volume:0.1
		},
	}, function() {

		// sound7.play();
	});
	var fr=(3-sound1.volume-sound2.volume-sound3.volume-sound4.volume-sound5.volume)*1000;

	var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
	    frequency: fr,
	    peak: 10
	});

	//sound.addEffect(lowPassFilter);
	
	/*var chop = new Pizzicato.Effects.Convolver({
	    impulse: 'source/audio/duanxin/002.mp3',
	    mix: 0.1
	}, function(error) {
	    sound.addEffect(chop);  
	});*/
/*	var guitar = new Pizzicato.Effects.Convolver({
	    impulse: 'source/audio/6884.wav',
	    mix: 0.05
	}, function(error) {
	    sound.addEffect(guitar);  
	});*/
	
	/*var sound1 = new Pizzicato.Sound({ 
    	source: 'file',
    	options: { 
    		path: "source/audio/scala-milan.wav" ,
    		loop:true,
    		volume:0 
    	},
	}, function() {
		sound1.play();
	});*/
