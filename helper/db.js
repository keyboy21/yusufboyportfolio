const mongoose = require('mongoose')

module.exports= ()=>{
  mongoose.connect('mongodb+srv://Movies:m3D4fAQI10kd8SXZ@cluster0.whpma.mongodb.net/test', 
  {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true},
  )
  const db = mongoose.connection;
  db.on('open',()=>{
  console.log("Connected to Db");
  }),
  db.on('error',(err)=>{
  console.log(err);
  })
}