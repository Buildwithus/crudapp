const express=require('express')
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());
const port=process.env.PORT || 4000;
const url="mongodb+srv://anuj321:anuj321@cluster0.zzudzw1.mongodb.net/test";
mongoose.connect(url,{useNewUrlParser:true});
const myschema=mongoose.Schema({
    name:String,
    email:String,
    father:String,
    mobile:Number
});
const Data=mongoose.model("crudapplication",myschema)
app.post("/",async(req,res)=>{
    const data=new Data({
        name:req.body.name,
        email:req.body.email,
        father:req.body.father,
        mobile:req.body.mobile
    })
    await data.save();
})
app.get("/",async(req,res)=>{
    const d=await Data.find();
    res.send(d);
})
app.get("/:id",async(req,res)=>{
    const id=req.params.id;
    const d=await Data.findById(id);
    res.send(d);
})
app.put("/:id",async(req,res)=>{
    const id =req.params.id;
    const d=await Data.findByIdAndUpdate(id,{
        name:req.body.name,
        email:req.body.email,
        father:req.body.father,
        mobile:req.body.mobile
    });
    await d.save();
    res.send(d);
})
app.delete("/:id",async(req,res)=>{
    const id =req.params.id;
    const d=await Data.findByIdAndRemove(id);
    res.send(d);
})
app.listen(port,function(){
    console.log("the server is running on port 4000")
})