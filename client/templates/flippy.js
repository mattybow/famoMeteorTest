Template.flippy.rendered=function(){
    var Engine = famous.core.Engine;
    var mainContext = Engine.createContext(document.getElementById('surface-holder'));
    var Surface = famous.core.Surface;
    var Modifier = famous.core.Modifier;
    var StateModifier = famous.modifiers.StateModifier;
    var Transform = famous.core.Transform;
    var Easing = famous.transitions.Easing;
    var Transitionable = famous.transitions.Transitionable;
    var EventHandler = famous.core.EventHandler;

    var SIZE = 20;
    var COLOR = 'salmon';
    var NEW_COLOR= 'slategrey';
    var DURATION = 200;
    mainContext.setPerspective(1000);
    var transitionable = new Transitionable(0);
    var upperTransitionable = new Transitionable(0);
    var lowerTransitionable = new Transitionable(1);
    var eventHandler = new EventHandler();

    for (var i=0;i<30;i++){
        for (var j=0;j<60;j++){

            var wrapperMod = new Modifier({
                size: [SIZE,SIZE],
                align:[0,0],
                origin:[0,0],
                transform:Transform.translate(i*SIZE*2+30,j*SIZE*2+30,0)
            });

            var upperMod = new Modifier({
                size:[SIZE,SIZE/2],
                align:[0.5,0.5],
                origin:[0,1],
                transform:function(){
                    return Transform.rotateX(upperTransitionable.get() * Math.PI);
                }
            });

            var upperMod2 = new Modifier({
                size:[SIZE,SIZE/2],
                align:[0.5,0.5],
                origin:[0,1],
                opacity:0
            });

            var shadowMod = new Modifier({
                size:[SIZE,SIZE/2],
                align:[0.5,0.5],
                origin:[0,1],
                transform:function(){
                    var state = transitionable.get();
                    //console.log(state);
                    return Transform.rotateX(state*(Math.PI/2));
                },
                opacity:function(){
                    return transitionable.get();
                }
            });

            var lowerMod = new Modifier({
                size:[SIZE,SIZE/2],
                align:[0.5,0.5],
                origin:[0,0]
            });

            var lowerMod2 = new Modifier({
                size:[SIZE,SIZE/2],
                align:[0.5,0.5],
                origin:[0,0],
                transform:function(){
                    return Transform.rotateX(lowerTransitionable.get() * Math.PI);
                }
            });

            var upperSurf = new Surface({
                size:[SIZE,SIZE/2],
                properties:{
                    backgroundColor:COLOR,
                    borderRadius:SIZE +'px '+SIZE+'px 0 0',
                    zIndex:1
                }
            });

            var shadowSurf = new Surface({
                size:[SIZE,SIZE/2],
                properties:{
                    backgroundColor:'rgba(0,0,0,.3)',
                    borderRadius:SIZE +'px '+SIZE+'px 0 0',
                    zIndex:2
                }
            });

            var upperSurf2 = new Surface({
                size:[SIZE,SIZE/2],
                properties:{
                    backgroundColor:NEW_COLOR,
                    borderRadius:SIZE +'px '+SIZE+'px 0 0',
                    zIndex:0
                }
            });

            var lowerSurf = new Surface({
                size:[SIZE,SIZE/2],
                properties:{
                    backgroundColor:COLOR,
                    borderRadius:'0 0 '+SIZE+'px '+SIZE+'px ',
                }
            });

            var lowerSurf2 = new Surface({
                size:[SIZE,SIZE/2],
                properties:{
                    backgroundColor:NEW_COLOR,
                    borderRadius:'0 0 '+SIZE+'px '+SIZE+'px ',
                }
            });

            var flip = function(){
                upperTransitionable.set(1,
                    {duration:DURATION,curve:Easing.inQuad},
                    function(){
                        transitionable.set(0);
                        lowerTransitionable.set(0,
                            {duration:500,curve:Easing.outElastic}
                            );
                    }.bind(this)
                );
                transitionable.set(0,{duration:DURATION,curve:Easing.inQuad});
                this.setOpacity(1);
            }.bind(upperMod2);

            eventHandler.on('flip',flip);

            var outer = mainContext.add(wrapperMod);
            outer.add(upperMod2).add(upperSurf2);
            //outer.add(shadowMod).add(shadowSurf);
            outer.add(upperMod).add(upperSurf);
            outer.add(lowerMod).add(lowerSurf);
            outer.add(lowerMod2).add(lowerSurf2);
        }

    };

    Engine.on('click', function() {
            console.log('flip it');
          eventHandler.emit('flip');
        });
};
