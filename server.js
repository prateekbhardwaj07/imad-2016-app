var express = require('express');   //to start and handle server events
var morgan = require('morgan');   //to put logws of the server
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articlesOne = {
    /*'article-one': {*/
    
    title: 'Article One |Prateek',
    heading: 'Article-One',
    date: 'sep 5 2016',
    content:`
     <p>
                This is my first Article.This is my first Article.This is my first Article.This is my first Article.
                This is my first Article.This is my first Article.This is my first Article.
                
            </p>
            <p>
                This is my first Article.This is my first Article.This is my first Article.This is my first Article.
                This is my first Article.This is my first Article.This is my first Article.
                
            </p>
            <p>
                This is my first Article.This is my first Article.This is my first Article.This is my first Article.
                This is my first Article.This is my first Article.This is my first Article.
                
            </p>`
    /*},
    /*'article-two':{
     
    title: 'Article Two |Prateek',
    heading: 'Article-Two',
    date: 'sep 10 2016',
    content:`
     <p>This is my second article for imad app.
    </p>`  
    },
    'article-three':{
    title: 'Article Three |Prateek',
    heading: 'Article-Three',
    date: 'sep 15 2016',
    content:`
     <p>This is my third article for imad app.
    </p>`  
    
    }*/
};

function  createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate=
        `<html>
    <head>
      <title>
          ${title}
      </title>
        <meta name="viewport" content="width=device-width , initial-scale= 1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
        ${date}             
         </div>
        <div>
        ${content}
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
    
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articleName',function(req,res){
    //articleName=article-one
    //aticles[aticleName]={} create content object for articles;
    //var articleName=req.params.articleName;
    res.send(createTemplate(articleOne));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
