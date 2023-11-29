const express=require('express')
const cors=require('cors')
const port=process.env.PORT || 5000
const app=express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
// NZBiBM7YUM15iorK
// assignment-12


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trqhxan.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();
    const district = client.db("assignment-12").collection("districtsData");
    const upazila = client.db("assignment-12").collection("upazilasData");
    const featured = client.db("assignment-12").collection("featuredData");
    const userinformation = client.db("assignment-12").collection("userInformation");
    const bloodrequest = client.db("assignment-12").collection("bloodRequest");
    const donatdata = client.db("assignment-12").collection("donatData");
    const volunteerdata = client.db("assignment-12").collection("volunteerData");
    const blogdata = client.db("assignment-12").collection("blogData");
    app.post('/blog_data',async(req,res)=>{
      const newuser=req.body
      const result=await blogdata.insertOne(newuser)
      res.send(result)
    })
    app.get('/blog_data',async(req,res)=>{
      const result= await blogdata.find().toArray();
      res.send(result)
    })
    app.post('/volunteer_data',async(req,res)=>{
      const newuser=req.body
      console.log(newuser)
      const result=await volunteerdata.insertOne(newuser)
      res.send(result)
    })
    app.get('/volunteer_data',async(req,res)=>{
      const result= await volunteerdata.find().toArray();
      res.send(result)
    })
    app.post('/donat_data',async(req,res)=>{
      const newuser=req.body;
      console.log(newuser)
      const result=await donatdata.insertOne(newuser)
      res.send(result)
    })
    app.get('/donat_data',async(req,res)=>{
      const result= await donatdata.find().toArray();
      res.send(result)
    })
    
    app.post('/blood_request',async(req,res)=>{
      const newuser=req.body;
      console.log(newuser)
      const result=await bloodrequest.insertOne(newuser)
      res.send(result)
    })
    app.get('/blood_request',async(req,res)=>{
      const result=await bloodrequest.find().toArray();
      res.send(result)
    })
    app.delete('/blood_request/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
      const result=await bloodrequest.deleteOne(query)
      res.send(result)
    })
    app.put('/blood_request/:id',async(req,res)=>{
      const id=req.params.id
      const filter={_id:new ObjectId(id)}
      const option={upsert:true}
      const updaterequest=req.body
      const update={
        $set:{
          pending:updaterequest.pending,
          dontaName:updaterequest.donatName,
          donatEmail:updaterequest.donatEmail
        }
      }
      const result= await bloodrequest.updateOne(filter,update,option)
      res.send(result)
    })
    app.post('/userinformation',async(req,res)=>{
      const newuser=req.body;
      console.log(newuser)
      const result = await userinformation.insertOne(newuser);
      res.send(result)

    })
    app.get('/userinformation',async(req,res)=>{
      const result=await userinformation.find().toArray();
      res.send(result)
    })
    app.delete('/userinformation/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
      const result=await userinformation.deleteOne(query)
      res.send(result)
    })
    app.put('/userinformation/:id',async(req,res)=>{
      const id=req.params.id
      const filter={_id:new ObjectId(id)}
      const option={upsert:true}
      const updaterequest=req.body
      const update={
        $set:{
          img:updaterequest.img,
          name:updaterequest.name,
          active:updaterequest.active,
          blood:updaterequest.blood,
          Singledistrict:updaterequest.Singledistrict,
          Singleupazila:updaterequest.Singleupazila
        }
      }
      const result= await userinformation.updateOne(filter,update,option)
      res.send(result)
    })
    app.get('/districtsData',async(req,res)=>{
        const result = await district.find().toArray();
        res.send(result)
     })
    app.get('/upazilasData',async(req,res)=>{
        const result = await upazila.find().toArray();
        res.send(result)
     })
     app.get('/featuredData',async(req,res)=>{
      const result=await featured.find().toArray()
      res.send(result)
     })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send("server is running")
})
app.listen(port,()=>{
    console.log('server port is :', port)
})