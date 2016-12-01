var express = require('express');   //to start and handle server events
var morgan = require('morgan');   //to put logws of the server
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user : 'prateekbhardwaj07',
    database : 'prateekbhardwaj07',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
/*app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));
*/

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
app.get('/form',function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'form.html'));
});

function hash(input,salt){
    // how to vreate a new hash
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
    var hashedString =  hash(req.params.input,'this is some random string ');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString], function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('User Sucessfully Created'+username);
        }
    });
    
});



app.post('/Login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username = $1', [username] , function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else {
           if(result.rows.length === 0){
               res.status(403).send('The User Name Does not Exist');
           }
           else
           {
               var dbString = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var hashedPassword = hash(password, salt);
              if (hashedPassword === dbString) {
                //req.session.auth = {userId: result.rows[0].id};
                res.send('credentials are Right!');
              } 
              else 
              {
                res.status(403).send('username/password is invalid');
              }
               
           }
       }
    }); 
});

/*
app.get('/Check-login',function(req,res){
    var  username=req.body.username;
    var password=req.body.password;
   
   pool.query('SELECT * FROM "user" ') 
});
*/


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
    pool.query("SELECT * FROM articles WHERE title = $1", [req.params.articleName] , function(err,result){
        if(err)
        {
            res.status(500).send('Error in code');
        }
        else
        {
            if(result.rows.length === 0)
            {
                res.status(404).send('Article Not Found');
                
            }
            else
            {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData)); 
            }
        }
    });
    
});
app.get('/ui/jquery-1.10.2.min.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','jquery-1.10.2.min.js'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/Personalised.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Personalised.jpg'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/audience.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'audience.png'));
});

app.get('/ui/blog_bar.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog_bar.png'));
});

app.get('/ui/blogview.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blogview.png'));
});

app.get('/ui/experience.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'experience.jpg'));
});

app.get('/ui/getstarted.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'getstarted.jpg'));
});

app.get('/ui/getstarted3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'getstarted3.jpg'));
});

app.get('/ui/header.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'header.jpg'));
});

app.get('/ui/pie.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pie.png'));
});

app.get('/ui/privacy.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'privacy.jpg'));
});


app.get('/ui/profile.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.png'));
});


app.get('/ui/rf.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rf.jpg'));
});


app.get('/ui/sl.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sl.jpg'));
});


app.get('/ui/vr.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'vr.png'));
});


app.get('/ui/form.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'form.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});