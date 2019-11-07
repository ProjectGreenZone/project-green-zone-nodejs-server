module.exports = {
    apps : [{
      name: "server",
      script: "./server.js",
      error_file: '/home/ubuntu/www/err.log',
        out_file: '/home/ubuntu/www/out.log',
        log_file: '/home/ubuntu/www/combined.log',
    //   env: {
    //     NODE_ENV: "development",
    //   },
    //   env_production: {
    //     NODE_ENV: "production",
    //   }
    }]
  }