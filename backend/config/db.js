import mongoose from "mongoose"

const database = async () => {
     try {
        mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=> console.log("Database is connected..")).catch((err)=> console.log(err))
    
     } catch (error) {
        console.log("something went wrong");
     }
    
}

export default database