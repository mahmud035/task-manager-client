const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('colors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//* Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('TaskManager server is running');
});

//* Mongodb Atlas

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yeflywl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const dbConnect = async () => {
  try {
    await client.connect();
    console.log('Database connected'.yellow.italic);
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold);
  }
};

dbConnect();

//* Collections
const allTaskCollection = client.db('taskManagerDBUser').collection('allTask');

//* -------------------------GET(READ)-------------------------
// get specific user all task
app.get('/mytasks', async (req, res) => {
  try {
    const email = req.query.email;
    const query = {
      userEmail: email,
    };
    const myTasks = await allTaskCollection.find(query).toArray();
    res.send(myTasks);
  } catch (error) {
    console.log(error.message.bold);
  }
});

// get a specific task for editing
app.get('/editReview/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const task = await allTaskCollection.findOne(query);
    res.send(task);
  } catch (error) {
    console.log(error.message.bold);
  }
});

// get a specific task for comment or commented task using id
app.get('/commentTask/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const commentTask = await allTaskCollection.findOne(query);
    res.send(commentTask);
  } catch (error) {
    console.log(error.message.bold);
  }
});

// get a specific user's all incomplete task
app.get('/incompleteTasks/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const query = {
      userEmail: email,
      status: 'incomplete',
    };
    const incompleteTasks = await allTaskCollection.find(query).toArray();
    res.send(incompleteTasks);
  } catch (error) {
    console.log(error.message.bold);
  }
});

// get a specific user's all completed task
app.get('/completedTasks/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const query = {
      userEmail: email,
      status: 'complete',
    };
    const completedTasks = await allTaskCollection.find(query).toArray();
    res.send(completedTasks);
  } catch (error) {
    console.log(error.message.bold);
  }
});

//* -------------------------POST(CREATE)-------------------------
// post a task to database
app.post('/alltask', async (req, res) => {
  try {
    const taskObject = req.body;
    const result = await allTaskCollection.insertOne(taskObject);
    res.send(result);
  } catch (error) {
    console.log(error.message.bold);
  }
});

//* -------------------------PUT/PATCH(UPDATE)-------------------------
// add comment to a specific task
app.put('/addComment/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const comment = req.body;
    const options = { upsert: true };
    const updatedTaskObject = {
      $set: {
        comment: comment.comment,
      },
    };
    const result = await allTaskCollection.updateOne(
      filter,
      updatedTaskObject,
      options
    );
    res.send(result);
  } catch (error) {
    console.log(error.message.bold);
  }
});

// update specific task
app.patch('/updateReview/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const updateTask = req.body;
    const updatedTaskObject = {
      $set: {
        taskName: updateTask.taskName,
      },
    };
    const result = await allTaskCollection.updateOne(filter, updatedTaskObject);
    res.send(result);
  } catch (error) {
    console.log(error.message.bold);
  }
});

// update specific task status
app.patch('/updateStatus/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const updatedTaskObject = {
      $set: {
        status: 'complete',
      },
    };
    const result = await allTaskCollection.updateOne(filter, updatedTaskObject);
    res.send(result);
  } catch (error) {
    console.log(error.message.bold);
  }
});

//* -------------------------DELETE(DELETE)-------------------------
app.delete('/deleteTask/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await allTaskCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    console.log(error.message.bold);
  }
});

app.listen(port, () => {
  console.log('Server up and running'.cyan.bold);
});
