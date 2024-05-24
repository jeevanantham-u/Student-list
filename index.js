import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import env from "dotenv";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
env.config();

const connectionString = process.env.DB_STRING ;

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

app.get('/students', async(req, res) => {
    const students = await Student.find({});
    res.json(students);
});

app.post('/students', (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        dob: req.body.dob,
        class: req.body.class,
        phone: req.body.phone,
        address: req.body.address
    });
    list.push(newStudent);
    newStudent.save();
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
