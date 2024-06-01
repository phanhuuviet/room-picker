import Room from "../models/room.js";
import Order from "../models/order.js";
import dateOrder from "../models/dateOrder.js";

export const roomController = {
  createRoom: async (req, res) => {
    try {
      const data = req.body;
      const newRoom = await Room.create({
        name: data.name,
        desc: data.desc,
        type: data.type,
        status: "0",
        image: data.image,
        countPeople: data.countPeople,
        price: data.price,
        active: data.active,
      });
      return res.status(201).json({
        message: "Room created successfully",
        data: newRoom,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getALlRoom: async (req, res) => {
    try {
      const searchRoom = req.body;
      if (searchRoom.search) {
        const dataSearch = await Order.find({
          $or: [
            {
              startDate: {
                $gte: searchRoom.startDate,
                $lte: searchRoom.endDate,
              },
            },
            {
              endDate: { $gte: searchRoom.startDate, $lte: searchRoom.endDate },
            },
          ],
        });
        var bookedRoomIds = dataSearch.map(function (booking) {
          return booking._id;
        });
        var availableRoomsFiltered = availableRooms.filter(function (room) {
          return !bookedRoomIds.includes(room._id);
        });
        console.log(dataSearch);
      } else {
        const data = await Room.find({ active: "Active" }).select("-evaluate");
        return res.status(200).json({ message: "ok", data: data });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getIdRoom: async (req, res) => {
    try {
      const data = await Room.findById(req.params.id);
      const dateBooked = await dateOrder.find({ idRoom: req.params.id });
      if (!data) return res.status(404).json({ message: "not found" });
      return res.status(200).json({ message: "ok", data: data, booked: dateBooked });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  removeRoom: async (req, res) => {
    try {
      const data = await Room.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            active: "InActive",
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({ message: "ok", data: data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  editRoom: async (req, res) => {
    try {
      const editData = req.body;
      const data = await Room.findById(req.params.id);
      if (!data) return res.status(404).json({ message: "not found" });
      (data.name = editData.name),
        (data.desc = editData.desc),
        (data.type = editData.type),
        (data.image = editData.image),
        (data.countPeople = editData.countPeople),
        (data.price = editData.price),
        (data.active = editData.active);
      await data.save();
      return res.json({
        message: "updated",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  searchRoom: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  evaluateRoom: async (req, res) => {
    try {
      const evaluateData = req.body;
      const data = await Room.findById(req.params.id);
      if (Number(evaluateData.star > 5 || evaluateData.star < 1)) {
        return res.status(500).json({ message: "min star 1 max 5  " });
      }
      if (!evaluateData.idUser) {
        return res.status(500).json({ message: "idUser is requird" });
      }
      if (!data) return res.status(404).json({ message: "not found" });
      data.evaluate.push({
        star: Number(evaluateData.star),
        idUser: evaluateData.idUser,
        content: evaluateData.content,
        image: evaluateData.image,
      });
      await data.save();
      return res.status(201).json({
        message: "ok",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  removeEvaluateRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Room.findById(id);
      const { idEvalue } = req.query;
      if (!data) return res.status(404).json({ message: "not found" });
      const index = data.evaluate.findIndex((db) => db._id == idEvalue);
      data.evaluate.splice(index);
      await data.save();
      return res.status(200).json({
        message: "ok",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  editEvaluateRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Room.findById(id);
      const { idEvalue, content, star, image } = req.body;
      if (!data) return res.status(404).json({ message: "not found" });
      const index = data.evaluate.findIndex((db) => db._id == idEvalue);
      (data.evaluate[index].content = content),
        (data.evaluate[index].star = star),
        (data.evaluate[index].image = image),
        await data.save();
      return res.status(200).json({
        message: "ok",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
