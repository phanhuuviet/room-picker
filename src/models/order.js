import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const orderSchema = new mongoose.Schema(
  {
    room: {
      idRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        require: true,
      },
      nameRoom: String,
      imageRoom: [],
      desc: String,
      piceRoom: Number,
      typeRoom: {
        type: String,
        enum: ["Normal", "Vip"],
        require: true,
      },
      countPeople: Number,
      people: Number,
      startDate: {
        type: Date,
        require: true,
      },
      endDate: {
        type: Date,
        require: true,
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    typePayment: {
      type: String,
      enum: ["VNPAY", "CASH","EMPTY"],
      require: true,
    },
    price: Number,
    status: {
      type: String,
      enum: ["PAYED", "PENDING", "COMPLETED", "DEPOSIT"],
      require: true,
    },
    noteBooking: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
