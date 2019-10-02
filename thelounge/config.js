"use strict";
module.exports = {
  public: true,
  theme: "morning",
  defaults: {
    name: "Čapek",
    host: "ircd",
    port: 6667,
    tls: false,
    rejectUnauthorized: false,
    nick: "human",
    username: "human",
    realname: "An Actual Human",
    join: "#general"
  },
  displayNetwork: false,
  lockNetwork: true,
};