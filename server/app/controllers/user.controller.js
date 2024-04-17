const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const password = CryptoJS.AES.encrypt(
      JSON.stringify(req.body.password),
      "taimai"
    ).toString();

    const user = { ...req.body, password: password };

    const userService = new UserService(MongoDB.client);
    const document = await userService.register(user);
    return res.send({ message: "Register Successfully" }, document);
  } catch (Error) {
    return next(new ApiError(500, Error));
  }
};

exports.login = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const userService = new UserService(MongoDB.client);

    const encryptpassword = CryptoJS.AES.encrypt(password, "taimai").toString();

    const result = await userService.login(name, password);
    const token = jwt.sign({ id: result._id }, "taimai", {
      expiresIn: "1h",
    });

    return res.send({ result, token });
  } catch (error) {
    console.error(error);

    if (error.message === "Invalid username") {
      return res.status(401).send({ message: "Invalid username" });
    } else if (error.message === "Invalid password") {
      return res.status(401).send({ message: "Invalid password" });
    }
  }
};
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const userService = new UserService(MongoDB.client);

    const document = await userService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating the user"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const userService = new UserService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await userService.findByName(name);
    } else {
      documents = await userService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving the users")
    );
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "user not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving user with id = ${req.params.id}`)
    );
  }
};

exports.update = (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const document = userService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "user not found"));
    }
    return res.send({ message: "user was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating user with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "user not found"));
    }
    return res.send({ message: "user was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Cound not delete user with id=${req.params.id}`)
    );
  }
};

exports.deleteALL = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const deletedCount = await userService.deleteAll();
    return res.send({
      message: `${deletedCount} users were deleted successfullty`,
    });
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while removing all users`)
    );
  }
};

exports.findALLFavorite = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const documents = await userService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while retrieving favorite users`)
    );
  }
};
