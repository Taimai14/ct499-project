const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");

class StaffService {
  constructor(client) {
    this.Staff = client.db().collection("staffs");
  }

  extractStaffData(payload) {
    const staff = {
      name: payload.name,
      password: payload.password,
      duty: payload.duty,
      address: payload.address,
      phone: payload.phone,
    };

    Object.keys(staff).forEach(
      (key) => staff[key] === undefined && delete staff[key]
    );
    return staff;
  }

  async register(payload) {
    const { name } = payload;

    const existingUser = await this.Staff.findOne({ name });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const newUser = { ...payload };

    const result = await this.Staff.insertOne(newUser);
    return result;
  }

  async login(name, password) {
    const staff = await this.Staff.findOne({ name });
    const bytes = CryptoJS.AES.decrypt(staff.password, "taimai");
    const originalPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (!staff) {
      throw new Error("Invalid username");
    }

    if (originalPassword != password) {
      throw new Error("Invalid password");
    }

    return staff;
  }
  async create(payload) {
    const staff = this.extractStaffData(payload);
    const result = await this.Staff.findOneAndUpdate(
      staff,
      { $set: { name: staff.name } },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async find(filter) {
    const cusor = await this.Staff.find(filter);
    return await cusor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Staff.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractStaffData(payload);
    const result = await this.Staff.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Staff.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Staff.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = StaffService;
