const ApiError = require("../api-error");
const AuthorService = require("../services/author.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const authorService = new AuthorService(MongoDB.client);
    const document = await authorService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the author")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const authorService = new AuthorService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await authorService.findByName(name);
    } else {
      documents = await authorService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving the authors")
    );
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const authorService = new AuthorService(MongoDB.client);
    const document = await authorService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "author not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving author with id = ${req.params.id}`)
    );
  }
};

exports.update = (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const authorService = new AuthorService(MongoDB.client);
    const document = authorService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "author not found"));
    }
    return res.send({ message: "author was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating author with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const authorService = new AuthorService(MongoDB.client);
    const document = await authorService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "author not found"));
    }
    return res.send({ message: "author was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Cound not delete author with id=${req.params.id}`)
    );
  }
};

exports.deleteALL = async (req, res, next) => {
  try {
    const authorService = new AuthorService(MongoDB.client);
    const deletedCount = await authorService.deleteAll();
    return res.send({
      message: `${deletedCount} authors were deleted successfullty`,
    });
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while removing all authors`)
    );
  }
};

exports.findALLFavorite = async (req, res, next) => {
  try {
    const authorService = new AuthorService(MongoDB.client);
    const documents = await authorService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while retrieving favorite authors`)
    );
  }
};
