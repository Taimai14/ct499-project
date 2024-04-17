const { ObjectId } = require("mongodb");

class BorrowService {
  constructor(client) {
    this.Borrow = client.db().collection("borrows");
  }

  extractborrowData(payload) {
    const borrow = {
      bookId: payload.bookId,
      userId: payload.userId,
      borrowDate: payload.borrowDate,
      returnDate: payload.returnDate,
    };

    Object.keys(borrow).forEach(
      (key) => borrow[key] === undefined && delete borrow[key]
    );
    return borrow;
  }

  async create(payload) {
    const borrow = this.extractborrowData(payload);
    borrow.borrowDate = new Date();
    const result = await this.Borrow.findOneAndUpdate(
      borrow,
      {
        $set: {
          returnDate: "Borrowing",
        },
      },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async find(filter) {
    const cusor = await this.Borrow.find(filter);
    return await cusor.toArray();
  }

  async findByBookId(bookId) {
    return await this.find({
      bookId: { $regex: new RegExp(bookId), $options: "i" },
    });
  }
  async findByUserId(userId) {
    return await this.find({
      userId: { $regex: new RegExp(userId), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Borrow.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractborrowData(payload);
    const result = await this.Borrow.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Borrow.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Borrow.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = BorrowService;
