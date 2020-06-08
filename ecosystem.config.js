module.exports = {
    apps: [{
      name: 'API',
      script: 'index.js',
  
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }],
  
    deploy: {
      production: {
        user: 'pi',
        host: '192.168.1.116',
        ref: 'origin/master',
        repo: 'https://github.com/vladromila/smartlighting.git',
        path: '/var/app/repositories',
        'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
      }
    }
  };
  