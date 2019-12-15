const express = require('express');
const bodyParser = require('body-parser');
const PORT = 4000;
const schema = require('./routes/model');
const mongoose = require('mongoose');
const app = express();



mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true })
.then( (db)=>{
     console.info('db connected');
 }).catch(error => {
     console.info("db error", error);
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get(('/'), (req, res) => {
    res.status(200).send({
        message: 'trivia MS app is starting'
    });
});

app.post('/users', (req, res) => {
    const requestData = req.body;
    console.log("got the following data from the user", requestData)
    if (!requestData.answer || !requestData.options || !requestData.question) {
        return res.send({
            error: true,
            message: "You must pass question, option and answer before this request can be successful",
            code: 400 
        })
    }
    let newquestion = schema({
        question: req.body.question,
        options: req.body.options,
        answer: req.body.answer
    });
    
    newquestion.save().then(data => {
        console.log("successfully saved user");
        return res.send({
            error: false,
            message: "user answer succesfully saved",
            user_id: data._id     
        })
    })
    .catch( err =>{
        console.error(err);
        return res.send({
            error: true,
            message: "error occured while saving user questions",
            response: err   
        })
    });
});

app.get('/userid', (req, res)=>{
    schema.find({}).select({"question":0, "options":0, "answer":0, "__v":0})
    .then(id=>{res.send(id)});
});

app.get('/admin', (req, res)=>{
    schema.find({}).select({"__v": 0})
    .then((admin)=>{
        res.send(admin)
    });
});

app.delete('/id/:id', (req,res)=>{
    const id = req.params.id;
    schema.findByIdAndRemove({_id: id }).then(qanda=>{
        res.send("id deleted")
    });
});

app.patch('/patchit/:id', (req, res) =>{
    const {id} = req.params;
    schema.findOneAndUpdate({_id: id}, {
        question: req.body.question,
        options: req.body.options,
        answer: req.body.answer
    })
        .then(updat =>{
        res.send(updat)
    });
});


app.get('/questions', (req,res)=>{
    schema.find({})
    .select({"answer":0, "__v": 0, "options":0})
    .then(quest =>{
        res.send(quest)
    });
});

app.get('/user/:id', (req, res)=>{
    const id = req.params.id;
    schema.findById({_id: id}).select({"__v":0}).then(byId=>{
        res.send(byId)
    })
})




app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    schema.deleteOne({_id: id})
    .then(data =>{
        res.send({
            error: false,
            message: 'stuff deleted'
        })
        console.log('stuff deleted');
    });
});


// users authentication routes
app.post('/signup', (req, res)=>{

    let newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
    .then((admin)=>{
        res.send({
            error: false,
            message: 'user successfully registered'
        })
    }).catch( err=>{
        res.send({
            error: true,
            message: 'error while registering',
            response: err
        })
    });
});

app.get('/signin', (req, res)=>{
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(data=>{
        if(data){
            if(data.password === password){
                return res.send({
                    error: false,
                    message: 'you are signed in'
                });
            }
            return res.send({
                error: true,
                message: 'incorrect password'
            });

        }
        return res.send({
            error: false,
            message: 'kindly sign up, you are not a user'
        });

    })
})



app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
});
