module.exports = {
  apps: [{
    name: 'unioncore-mvp',
    script: 'npx',
    args: 'vite --host 0.0.0.0 --port 5879 client',
    cwd: '/workspace/unioncore-mvp',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5879,
    },
    error_file: '/var/log/unioncore/error.log',
    out_file: '/var/log/unioncore/app.log',
    time: true,
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000,
  }]
};
