Template.famoBallz.rendered=function(){
	var Surface = famous.core.Surface;
    var Engine = require('famous/core/Engine');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Transform = require('famous/core/Transform');
	var mainContext = Engine.createContext(document.getElementById('ballz'));
	var View = require('famous/core/View');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Circle = require('famous/physics/bodies/Circle');
    var Wall = require('famous/physics/constraints/Wall');
    var Repulsion = require('famous/physics/forces/Repulsion');
    var Distance = require('famous/physics/constraints/Distance');

    var peeps = Peeps.find().fetch();
    var count = 0;

    _.each(peeps,function(peep){
        var famoMod = new StateModifier({
            align:[0.5,0.5],
            origin:[0.5,0.5],
            transform:Transform.translate(count*120,0,0)
        });

        var famoMod2 = new StateModifier({
            align:[0.5,0.5],
            origin:[0.5,0.5],
            transform:Transform.translate(count*120,0,0)
        });

        var famoBG = new Surface({
            size:[100,100],
            properties:{
                backgroundColor:'blanchedalmond',
                borderRadius:'50px',
                textAlign:'center'
            }
        });

        var famoContent = new Surface({
            content:'<h1>'+peep.state+'</h1>',
            origin:[0.5,0.5],
            align:[0.5,0.5],
            size:[true,true],
            properties:{
                backgroundColor:'transparent'
            }
        });


        mainContext.add(famoMod).add(famoBG);
        mainContext.add(famoMod2).add(famoContent);
        count++;
    });

    var phys = new PhysicsEngine();
    var balls = [];
    for (var i=0;i<4;i++){
        var ball = new Surface({
            size: [40,40],
            properties: {
                backgroundColor: 'red',
                borderRadius: '100px'
            }
        });
        ball.state = new StateModifier({
            align:[0.5,0.5],
            origin:[0.5,0.5],
            transform:Transform.translate(Math.random()*window.innerWidth,Math.random()*window.innerHeight,0)
        });

        ball.particle = new Circle({radius:20});
        
        phys.addBody(ball.particle);
        mainContext.add(ball.state).add(ball);

        ball.particle.setVelocity([Math.random(),Math.random(),0]);
        balls.push(ball);
    }

    var _addRepulsion = function(){
        var particles = _.pluck(balls,'particle');
        _.each(balls,function(ball){
            var replusion = new Repulsion({strength: 90});
            phys.attach(replusion, particles, ball.particle);
        });
    };

    var _addAttraction = function(){
        var particles = _.pluck(balls,'particle');
        var distance = new Distance({anchor:[0.5,0.5],length:70, dampingRatio:2.1});
        phys.attach(distance, particles, particles[0]);
    };
    

    var leftWall    = new Wall({normal : [1,0,0],  distance : window.innerWidth/2.0, restitution : 0.5});
    var rightWall   = new Wall({normal : [-1,0,0], distance : window.innerWidth/2.0, restitution : 0.5});
    var topWall     = new Wall({normal : [0,1,0],  distance : window.innerHeight/2.0, restitution : 0.5});
    var bottomWall  = new Wall({normal : [0,-1,0], distance : window.innerHeight/2.0, restitution : 0.5});

    var particles = _.pluck(balls,'particle');
    phys.attach( leftWall,  particles);
    phys.attach( rightWall, particles);
    phys.attach( topWall, particles);
    phys.attach( bottomWall,particles);

    //_addRepulsion();
    //_addAttraction();

    Engine.on('prerender', function(){
        _.each(balls,function(ball){
            ball.state.setTransform(ball.particle.getTransform());
        });
    });


};

