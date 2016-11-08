var express = require('express');   //to start and handle server events
var morgan = require('morgan');   //to put logws of the server
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user : 'prateekbhardwaj07',
    database : 'prateekbhardwaj07',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one': {
    
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
    },
    'article-two':{
     
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
    
    }
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

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select  request
    //return some response with the results
    pool.query('SELECT * FROM test',function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});
var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString())
});

var names = [];
app.get('/submit-name',function(req,res){ // /submit-name?name=dfs
//Get the names from the request
var name = req.query.name;

names.push(name);
//JSON JavaScript object notation
res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
    //articleName=article-one
    //aticles[aticleName]={} create content object for articles;
    pool.query("SELECT * FROM article WHERE title = "+req.params.articleName , function(err,result){
        if(err)
        {
            res.status(500).send(err.toString);
        }
        else
        {
            if(result.rows.length===0)
            {res.status(404).send('Article Not Found');}
            else
            {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData)); 
            }
        }
    });
    
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
