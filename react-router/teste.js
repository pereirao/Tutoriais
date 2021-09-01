(() => {
    global.x = 1;
    global.y = 2;
    
    const teste = {
        x: 10,
        y: 20,
        printCoord: function() {
            console.log(this.x, this.y);
        }
    };

    teste.printCoord();
    
    let t = teste.printCoord;
    
    t();
})();
