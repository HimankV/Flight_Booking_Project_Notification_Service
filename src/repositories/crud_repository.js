const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app_error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (err) {
      Logger.error(`Something went wrong`, err);
      throw err;
    }
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    console.log(`response_____`, response);
    console.log(StatusCodes.NOT_FOUND);
    if (!response) {
      console.log(`here? - inside if(!response){}`);
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND,
      );
    }
    console.log(`here? - 1`);
    return response;
  }

  // async create(data) {
  //   try {
  //     const response = await this.model.create(data);
  //   } catch (err) {
  //     Logger.error(`Something went wrong`, err);
  //     throw err;
  //   }
  // }

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError(`Not able to find resource`, StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (err) {
      Logger.error(`Something went wrong in CrudRepository`, err);
      throw err;
    }
  }

  async update(id, data) {
    console.log(`Inside repository : `, data);
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (err) {
      Logger.error(`Something went wrong`, err);
      throw err;
    }
  }
}

module.exports = CrudRepository;
