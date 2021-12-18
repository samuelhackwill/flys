module.exports = {
  servers: {
    fly16: {
      host: '217.182.252.49',
      username: 'samuel',
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
      opts: {
        port: 11142
      },
    },
  },

  meteor: {
    name: 'fly16',
    path: '../',
    docker: {
      image: 'abernix/meteord:node-12-base', // (optional)
    },
    servers: {
      fly16: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 3007,
      ROOT_URL: 'https://le.tiretdusix.art',
      MONGO_URL: 'mongodb://localhost:27017/fly16'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    servers: {
      fly16: {},
    },
  },
};
