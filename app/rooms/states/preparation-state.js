const GameUser = require('../../models/colyseus-models/game-user');
const schema = require('@colyseus/schema');

class PreparationState extends schema.Schema {
  constructor() {
    super();
    this.users = new schema.MapSchema();
    this.assign({
      gameStarted: false
    });
  }

  getNumberOfPlayers(){
    let p = 0;
    this.users.forEach(u=>{
      if (u.isPlayer){
        p++;
      }
    });
    return p;
  }

  getNumberOfObservers(){
    let p = 0;
    this.users.forEach(u=>{
      if (!u.isPlayer){
        p++;
      }
    });
    return p;
  }
}

schema.defineTypes(PreparationState, {
  users: {map: GameUser},
  gameStarted: 'boolean'
});

module.exports = PreparationState;
