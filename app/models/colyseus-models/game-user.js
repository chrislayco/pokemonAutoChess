const schema = require('@colyseus/schema');
const MapTileset = require('./map-tileset');
const Schema = schema.Schema;

class GameUser extends Schema {
  constructor(id, name, elo, avatar, isBot, ready, map, isPlayer) {
    super();
    this.assign({
      id: id,
      name: name,
      avatar: avatar,
      ready: ready,
      isBot: isBot,
      elo: elo,
      map: new MapTileset(map),
      isPlayer: isPlayer
    });
  }

  toString() {
    return `id: ${this.id} name:${this.name}`;
  }
}

schema.defineTypes(GameUser, {
  id: 'string',
  name: 'string',
  avatar: 'string',
  ready: 'boolean',
  isBot: 'boolean',
  elo: 'uint16',
  map: MapTileset,
  isPlayer: 'boolean'
});

module.exports = GameUser;
