const express=require("express");

const mongoose=require("mongoose");

const app=express();

// app.use(express.json())


const connectDB=()=>{

    return  mongoose.connect("mongodb://127.0.0.1:27017/banking")
}


const userSchema = new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      age:{type:Number,required: true},
      address:{type:String,required: true},
      createAt:{type:String,required: true},
      updatedAt:{type:String,required: true}
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  );

  const User = mongoose.model("user", userSchema);



  const branchSchema= new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    ifsc:{type:String,required:true},
    micr:{type:String,required:true},
    createAt:{type:String,required: true},
    updatedAt:{type:String,required: true},
    // userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",require:true},
   
   },{
       timestamps:true,
   });
   
   
   const branch= mongoose.model("branch",branchSchema);


  app.get(("/users"),async(req,res)=>{
    try {

        const userdata=await User.find({}).lean().exec();
        return res.status(200).send(userdata);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

app.get(("/branch"),async(req,res)=>{
    try {

        const userdata=await branch.find({}).lean().exec();
        return res.status(200).send(userdata);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

app.post(("/branch"),async(req,res)=>{
    try {
        
        const userpost=await branch.create(req.body)
        return res.status(201).send(userpost);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
        
    }
    
});





app.listen(6267,async()=>{
    try {
    
    await connectDB()
    
    } catch (error) {
        return (error.message)
    }
    console.log("6267")
    
    })