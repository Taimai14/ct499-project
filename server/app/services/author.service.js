const { ObjectId } = require("mongodb");

class AuthorService {
  constructor(client) {
    this.Author = client.db().collection("authors");
  }

  extractAuthorData(payload) {
    const author = {
      name: payload.name,
      address: payload.address,
    };

    Object.keys(author).forEach(
      (key) => author[key] === undefined && delete author[key]
    );
    return author;
  }

  async create(payload) {
    const author = this.extractAuthorData(payload);
    const result = await this.Author.findOneAndUpdate(
      author,
      { $set: { name: author.name } },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async find(filter) {
    const cusor = await this.Author.find(filter);
    return await cusor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Author.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractAuthorData(payload);
    const result = await this.Author.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Author.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Author.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = AuthorService;
