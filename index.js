import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import env from "dotenv";
import cors from "cors";

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
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
    gender: String,
    email: String,
});

const Student = mongoose.model('Student', studentListSchima);

app.get('/students', async(req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post('/students', async (req, res) => {
    try {
        // Check if request body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error('Request body is empty');
        }
    
        const newStudent = new Student({
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            email: req.body.email
        });
        
        newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: `Document not created. ${err.message}` });
    }
});
    
app.put('/students/:id', async(req, res) => {
   const id = req.params.id; 
   try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error('Request body is empty');
        }

        const replacementData = {
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            email: req.body.email
           };

        const updatedData = await Student.findByIdAndUpdate(id, replacementData, { new: true });

        if (!updatedData) {
            throw new Error('Document not found');
        }

        res.json(updatedData);
    } catch (err) {
        res.status(400).json({ error: `Document not updated. ${err.message}` });
    }
});

app.delete('/students/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const deleteData = await Student.findByIdAndDelete(id);
       
        if (!deleteData) {
          return res.status(404).json({ message: 'Id not found' });
        }

        res.status(200).json({ message: 'data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});    


app.listen(port, () => {
    console.log(`server running on port:${port}`);
});

