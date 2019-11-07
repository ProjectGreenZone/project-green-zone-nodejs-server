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

  module.exports = [{
    name: "server",
    script: "./server.js",
    error_file: '/home/ubuntu/www/logs/err.log',
    out_file: '/home/ubuntu/www/logs/out.log',
    log_file: '/home/ubuntu/www/logs/combined.log',
    time: true
  }]