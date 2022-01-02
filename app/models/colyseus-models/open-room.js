const schema = require('@colyseus/schema');
const Schema = schema.Schema;

class OpenRoom extends Schema {
  constructor(id, name, fill) {
    super();
    this.assign({
      name: name,
      id: id,
      fill: fill
    });
  }
}

schema.defineTypes(OpenRoom, {
  id: 'string',
  name: 'string',
  fill: 'uint8'
});

module.exports = OpenRoom;
