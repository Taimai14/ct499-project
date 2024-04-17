const ApiError = require("../api-error");
const BorrowService = require("../services/borrow.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  try {
    const borrowService = new BorrowService(MongoDB.client);
    const document = await borrowService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the borrow")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const borrowService = new BorrowService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await borrowService.findByBookId(name);
    } else {
      documents = await borrowService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving the borrows")
    );
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const borrowService = new BorrowService(MongoDB.client);
    const document = await borrowService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "borrow not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving borrow with id = ${req.params.id}`)
    );
  }
};

exports.update = (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const borrowService = new BorrowService(MongoDB.client);
    const document = borrowService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "borrow not found"));
    }
    return res.send({ message: "borrow was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating borrow with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const borrowService = new BorrowService(MongoDB.client);
    const document = await borrowService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "borrow not found"));
    }
    return res.send({ message: "borrow was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Cound not delete borrow with id=${req.params.id}`)
    );
  }
};

exports.deleteALL = async (req, res, next) => {
  try {
    const borrowService = new BorrowService(MongoDB.client);
    const deletedCount = await borrowService.deleteAll();
    return res.send({
      message: `${deletedCount} borrows were deleted successfullty`,
    });
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while removing all borrows`)
    );
  }
};

exports.findALLFavorite = async (req, res, next) => {
  try {
    const borrowService = new BorrowService(MongoDB.client);
    const documents = await borrowService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while retrieving favorite borrows`)
    );
  }
};
