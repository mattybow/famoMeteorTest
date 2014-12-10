Template.page1.rendered=function(){
    var mainContext = famous.core.Engine.createContext(document.getElementById('surface-holder'));
    var renderController = new famous.views.RenderController();
    var Surface = famous.core.Surface;
    var surfaces = [];
    var counter = 0;

    for (var i = 0; i < 10; i++) {
        surfaces.push(new Surface({
             content: "Surface: " + (i + 1),
             size: [undefined, undefined],
             properties: {
                 backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 50%)",
                 lineHeight: "200px",
                 textAlign: 'center'
             }
        }));
    }

    renderController.show(surfaces[0]);

    famous.core.Engine.on("click", function() {
        var next = (counter++ + 1) % surfaces.length;
        this.show(surfaces[next]);
    }.bind(renderController));

    var rcModifier = new famous.core.Modifier({
                                align: [0.5, 0.5],
                                origin: [0.5, 0.5]
                            });

    mainContext.add(rcModifier).add(renderController);
};