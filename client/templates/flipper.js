Template.flipper.rendered=function(){
	var Engine = famous.core.Engine;
	var Surface = famous.core.Surface;
	var Modifier = famous.core.Modifier;
	var Transform = famous.core.Transform;
	var Easing = famous.transitions.Easing;

	var flipperContext = Engine.createContext(document.getElementById('surface-holder'));
	var Flipper = famous.views.Flipper;

	var front = new Surface({
		size:[200,200],
		content:'front side',
		properties:{
			backgroundColor:'darksalmon'
		}
	});

	var back = new Surface({
		size:[200,200],
		content:'backside',
		properties:{
			backgroundColor:'darkgrey'
		}
	});

	var flipper = new Flipper({direction:1});
	flipper.setFront(front);
	flipper.setBack(back);

	var centerMod = new Modifier({
		align:[0.5, 0.5],
        origin: [0.5, 0.5]
	});

	flipperContext.setPerspective(1000);
	flipperContext.add(centerMod).add(flipper);

	var toggle = false;
	$('#surface-holder').on('click', function(e){
        var angle = toggle ? 0 : Math.PI;
        flipper.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
        toggle = !toggle;
    });
};
