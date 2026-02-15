const CrudRepository = require("./crud_repository");
const { Ticket } = require("../models");

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTickets() {}
}

module.exports = TicketRepository;
