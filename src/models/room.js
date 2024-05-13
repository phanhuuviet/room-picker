import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const roomSchema = new mongoose.Schema(
  {
    name: String,
    desc: {
      type: String,
      require: true,
    },
    image: [
      {
        url: String,
      },
    ],
    evaluate: [
      {
        star: Number,
        idUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
        content: String,
        image: [
          {
            url: String,
          },
        ],
      },
    ],
    type: {
      type: String,
      enum: ["Normal", "Vip"],
    },
    status: {
      type: String,
      enum: ["0", "1"], // 0 ok // 1 no ok
      default: "0",
    },
    countPeople: {
      type: Number,
    },
    price: {
      type: Number,
    },
    active: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
    },
  },
  { timestamps: true, versionKey: false }
);
roomSchema.plugin(mongoosePaginate);
export default mongoose.model("Room", roomSchema);
