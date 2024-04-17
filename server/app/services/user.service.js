const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");

class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  extractUserData(payload) {
    const user = {
      name: payload.name,
      password: payload.password,
      dob: payload.dob,
      gender: payload.gender,
      address: payload.address,
      phone: payload.phone,
    };

    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }

  async register(payload) {
    const { name } = payload;

    const existingUser = await this.User.findOne({ name });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const newUser = { ...payload };

    const result = await this.User.insertOne(newUser);
    return result;
  }

  async login(name, password) {
    const user = await this.Staff.findOne({ name });
    const bytes = CryptoJS.AES.decrypt(user.password, "taimai");
    const originalPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (!user) {
      throw new Error("Invalid username");
    }

    if (originalPassword != password) {
      throw new Error("Invalid password");
    }

    return user;
  }

  async create(payload) {
    const user = this.extractUserData(payload);
    const result = await this.User.findOneAndUpdate(
      user,
      { $set: { name: user.name } },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async find(filter) {
    const cusor = await this.User.find(filter);
    return await cusor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractUserData(payload);
    const result = await this.User.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.User.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.User.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = UserService;
