const mongoose = require('mongoose');
module.exports.dbconnection=function(){
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://Ankita1207:Ankita%401207@cluster0.4r9tzk8.mongodb.net/E-Voting?retryWrites=true&w=majority',

// mongodb://Ankita1207:Ankita%401207@ac-mjlzatw-shard-00-00.4r9tzk8.mongodb.net:27017,ac-mjlzatw-shard-00-01.4r9tzk8.mongodb.net:27017,ac-mjlzatw-shard-00-02.4r9tzk8.mongodb.net:27017/E-Voting?ssl=true&replicaSet=atlas-1zh8tw-shard-0&authSource=admin&retryWrites=true&w=majority
{
      useNewUrlParser: true,
      // useCreateIndex:true,
      useUnifiedTopology: true
   }
).then(() => { console.warn("Node js connected to MongoDB Atlas Successfully..!") })
   .catch((err) => {
      console.log('error occured : ', err);
   })
}

