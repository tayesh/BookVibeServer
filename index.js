const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()

const port = process.env.port || 5001


app.use(cors());
app.use(express.json())





const { MongoClient, ServerApiVersion,ObjectId  } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.1xhb2as.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const BookCollection = client.db('Bookshop').collection('BookList');
    const CartCollection = client.db('Bookshop').collection('Cart');
    const WishlistCollection = client.db('Bookshop').collection('Readlist');
    const UserCollection = client.db('Bookshop').collection('UserRolls');


    app.get('/books', async (req, res) => {

          // Filter rooms based on query parameters
          const rooms = await BookCollection.find().toArray();
          res.json(rooms);
        
    });
    app.get('/cart', async (req, res) => {

          // Filter rooms based on query parameters
          const cart = await CartCollection.find().toArray();
          res.json(cart);
        
    });
    app.get('/wishlist', async (req, res) => {

          // Filter rooms based on query parameters
          const wishlist = await WishlistCollection.find().toArray();
          res.json(wishlist);
        
    });
    app.post("/addToCart", async (req, res) => {
        const newBook = req.body;
        // console.log(newPaintings);
        const result = await CartCollection.insertOne(newBook);
        res.send(result);
  
      })
    app.post("/addToWishlist", async (req, res) => {
        const newBook = req.body;
        // console.log(newPaintings);
        const result = await WishlistCollection.insertOne(newBook);
        res.send(result);
  
      })
    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;

      // console.log('cookies : ',req.cookies);
      const query = { _id: new ObjectId(id) };
      const room = await BookCollection.findOne(query);
      res.send(room)
    })



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6bnVsbCwiaWF0IjoxNzE1ODg2MzUyLCJleHAiOjE3MTU4ODk5NTJ9.mn8ov-JQCaMwo1ialDzhRY7li3LdEYzGqovw9UIAlcg