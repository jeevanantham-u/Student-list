import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import env from "dotenv";

const app = express();
const port = 3000;
env.config();
const connectionString = process.env.DB_STRING ;

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, { autoIndex: true });
        console.log('Connected to Mongodb Atlas');
    } catch (error) {
        console.error(error);
    }
};

connectToDB();

const studentListSchima = new mongoose.Schema({
    name: String,
    dob: String,
    class: Number,
    phone: Number,
    address: String
});

const Student = mongoose.model('Student', studentListSchima);

const student = new Student({
    name: 'jeeva',
    dob: '10/02/2002',
    class: '10',
    phone: '7603982326',
    address: 'madurai'
});

// student.save();

const stud = await Student.find({});
console.log(stud);


app.get('/students', (req, res) => {
    res.json(list);
});

app.post('/students', (req, res) => {
    const newStudent = {
        id: list.length + 1,
        name: req.body.name,
        dob: req.body.dob,
        class: req.body.class,
        phone: req.body.phone,
        address: req.body.address
    }
    list.push(newStudent);
    res.json(newStudent);
});

app.put('/students/:id', (req, res) => {
   const id = parseInt(req.params.id); 
   const replacementData = {
    id: id,
    name: req.body.name,
    dob: req.body.dob,
    class: req.body.class,
    phone: req.body.phone,
    address: req.body.address,
   };
   const searchIndex = list.findIndex((data) => { data.id === id });
   list[searchIndex] = replacementData ;
   res.json(replacementData);
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = list.findIndex(data => data.id === id );
    if (searchIndex > -1){
        list.splice(searchIndex, 1);
        res.sendStatus(200);
    } else {
        res.status(404).json({
            error: `Student with id: ${id} not found. No student were deledted`
        });
    }
});

app.listen(port, () => {
    console.log(`server running on port:${port}`);
});

const list = [
    {
        id: 1,
        name: 'jeeva',
        dob: '10/02/2002',
        class: '10',
        phone: '7603982326',
        address: 'madurai'
    },
    {
        id: 2,
        name: 'mari',
        dob: '12/05/2002',
        class: '10',
        phone: '7603982326',
        address: 'madurai'
    },
    {
        id: 3,
        name: 'arun',
        dob: '29/02/2001',
        class: '11',
        phone: '7603982326',
        address: 'madurai'
    },
    {
        id: 4,
        name: 'vicky',
        dob: '05/02/2000',
        class: '12',
        phone: '7603982326',
        address: 'madurai'
    },
    {
        id: 5,
        name: 'Praveen',
        dob: '18/08/2002',
        phone: '7603982326',
        address: 'madurai'
    },
];

//JQQfyK3aAn9me7xs
//ip: 115.97.1.144
//mongodb+srv://jeevauj:BhMEo1rgwxP2jdTf@student-list.7hxkbml.mongodb.net/?retryWrites=true&w=majority&appName=Student-list

//mongodb+srv://jeeva:<password>@student-list.fuxg6lc.mongodb.net/?retryWrites=true&w=majority&appName=Student-list