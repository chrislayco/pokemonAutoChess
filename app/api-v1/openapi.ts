/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/history/gameById/{id}": {
    get: operations["getGameById"];
  };
  "/history/gamesByName/{name}": {
    get: operations["getGamesByName"];
  };
  "/history/gamesByTime": {
    get: operations["getGamesByTime"];
  };
  "/game/create/{name}": {
    get: operations["createGame"];
  };
  "/game/status/{id}": {
    get: operations["getGameStatus"];
  };
}

export interface components {
  schemas: {
    Pokemon: {
      /** @description the name of the pokemon */
      name?: string;
      /** @description the avatar of the pokemon (path including emotes/shiny user configuration) */
      avatar?: string;
      /** @description All the items of the pokemons */
      inventory?: string[];
    };
    GameHistory: {
      /** @description the game id (same as you sent) */
      id?: string;
      /** @description the game name (Name is specified by owner of preparation room) */
      name?: string;
      /** @description the start time of the game (in UNIX Epoch) */
      startTime?: number;
      /** @description the end time of the game (in UNIX Epoch) */
      endTime?: number;
      /** @description All the game informations related to players */
      players?: {
        /** @description The player id */
        id?: string;
        /** @description The player avatar when the game was played */
        avatar?: string;
        /** @description The player name when the game was played */
        name?: string;
        /** @description The elo of the player at the end of the game */
        elo?: number;
        /** @description The rank of the player at the end of the game */
        rank?: number;
        pokemons?: components["schemas"]["Pokemon"][];
      }[];
    };
    Player: {
      /** @description The player id */
      id?: string;
      /** @description The player avatar */
      avatar?: string;
      /** @description The player name */
      name?: string;
      /** @description The player elo */
      elo?: number;
    };
  };
}

export interface operations {
  getGameById: {
    parameters: {
      path: {
        /** The ID of the game to return. */
        id: string;
      };
    };
    responses: {
      /** Game informations about the request game id */
      200: {
        content: {
          "application/json": components["schemas"]["GameHistory"];
        };
      };
      /** The specified id is invalid (not a string). */
      400: unknown;
      /** No game found with the specific id. */
      404: unknown;
      /** Unexpected error */
      default: unknown;
    };
  };
  getGamesByName: {
    parameters: {
      path: {
        /** The name of the game to return. */
        name: string;
      };
    };
    responses: {
      /** Game informations about the request game id */
      200: {
        content: {
          "application/json": components["schemas"]["GameHistory"][];
        };
      };
      /** The specified name is invalid (not a string). */
      400: unknown;
      /** A user with the specified ID was not found. */
      404: unknown;
      /** Unexpected error */
      default: unknown;
    };
  };
  getGamesByTime: {
    parameters: {
      query: {
        /** The startTime (in UNIX Epoch) threshold */
        startTime: number;
        /** The endtime (in UNIX Epoch) threshold */
        endTime: number;
      };
    };
    responses: {
      /** Game informations about the request game id */
      200: {
        content: {
          "application/json": components["schemas"]["GameHistory"][];
        };
      };
      /** The specified startTime or endTime is invalid */
      400: unknown;
      /** No games found between startTime and endTime */
      404: unknown;
      /** Unexpected error */
      default: unknown;
    };
  };
  createGame: {
    parameters: {
      path: {
        /** The name of the room */
        name: string;
      };
    };
    responses: {
      /** Game informations about the request game id */
      200: {
        content: {
          "application/json": {
            /** @description the name of the created preparation room */
            name?: string;
            /** @description the id of the created preparation room */
            id?: string;
          };
        };
      };
      /** The specified name was invalid. */
      400: unknown;
      /** The preparation room was not created. */
      404: unknown;
    };
  };
  getGameStatus: {
    parameters: {
      path: {
        /** The id of the room (same as the one returned in  /game/create) */
        id: string;
      };
    };
    responses: {
      /** Game informations about the request game id */
      200: {
        content: {
          "application/json": {
            /** @description the name of the created preparation room */
            name?: string;
            /** @description the id of the created preparation room */
            id?: string;
            /** @description The current list of players */
            players?: components["schemas"]["Player"][];
          };
        };
      };
      /** The specified name was invalid. */
      400: unknown;
      /** The preparation room was not created. */
      404: unknown;
    };
  };
}