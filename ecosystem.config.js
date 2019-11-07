// module.exports = {
//     apps : [{
      
//     //   env: {
//     //     NODE_ENV: "development",
//     //   },
//     //   env_production: {
//     //     NODE_ENV: "production",
//     //   }
//     }]
//   }

  modules.exports = [{
    name: "server",
    script: "./server.js",
    error_file: '/home/ubuntu/www/err.log',
    out_file: '/home/ubuntu/www/out.log',
    log_file: '/home/ubuntu/www/combined.log',
    time: true
  }]