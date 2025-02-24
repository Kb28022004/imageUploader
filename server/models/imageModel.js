const mongoose =require('mongoose')

const ImageSchema=new mongoose.Schema(
    {
        image: {
          public_id: String,
          url: String,
        },
        category: {
          type: String,
          required:[true,'Category is required']
        },
        description:{
            type:String
        }
      },
      {
        timestamps: true,
      }
)


module.exports = mongoose.model("Image", ImageSchema);