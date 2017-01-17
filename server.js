var app= require("express")();
var formidable = require("formidable");
 var resp = [];

app.get('/', function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/upload/', function(req,res){
   var form = new formidable.IncomingForm();
   
   form.on('file', function(field, file) {
    console.log("field: "+field);
    console.log("file: "+file.name);
    
    resp.push({
        "name" : file.name,
        "size" : file.size,
        "type" : file.type    
    });
    
  });
  
  form.parse(req);
  
  form.on('end', function() {
    res.writeHead(200);   
    console.log("returning: " + JSON.stringify(resp));
    res.write(JSON.stringify(resp));
    resp = []; // now that response is returned empty it.
    res.end();
  });
  
});

app.listen(process.env.PORT || 8080);

