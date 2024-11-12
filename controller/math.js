class Math{
    a = null;
    b = null;
    c = null;
    MUltiplication(req, res){
        if(req.method == 'GET'){
            res.render('multiply');
            res.end();
        }
        else{
            this.a = req.body.a;
            this.b = req.body.b;
            this.c = parseInt(this.a) * parseInt(this.b);
            res.render('multiply', {message : 'Result is : ' + this.c});
            res.end();
        }
    }

    

    Bootstrap_Page(req, res){
        res.render('test');
        res.end();
    }
}

const obj = new Math();

module.exports = obj;