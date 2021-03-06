var log = require('./');

log.config = {name: 'test'};
log.error('type=error name=test color=red');
log.warn('type=warn name=test color=yellow');
log.success('type=success name=test color=green');
log.info('type=info name=test color=default');
log.debug('type=debug name=test color=grey');
log.mark('mark_metric');
log.gauge('gauge_metric', 10);
log.duration('duration_metric', 100);
log.time(done => done('time_metric'));

log.config = {name: 'test2', level: 'error', colors: false, metrics: false};
log.error('type=error name=test2 color=default');
log.warn('SHOULD NOT SHOW');
log.time(done => done('SHOULD NOT SHOW'));

log.config = {name: 'test3', dir: 'log'};
log.error('type=error name=test color=red');
log.warn('type=warn name=test color=yellow');
log.success('type=success name=test color=green');
log.info('type=info name=test color=default');
log.debug('type=debug name=test color=grey');
log.mark('mark_metric');
log.gauge('gauge_metric', 10);
log.duration('duration_metric', 100);
log.time(done => done('time_metric'));

log.config = {name: 'test4', json: true};
log.error('type=error name=test color=red');
log.warn('type=warn name=test color=yellow');
log.success('type=success name=test color=green');
log.info('type=info name=test color=default');
log.debug('type=debug name=test color=grey');

// Make sure we can write to a file in the exit callback.
process.on('exit', () => log.info('exit test'));
process.on('uncaughtException', er => {
  log.error(er.toString());
  log.close(process.exit.bind(process));
});
throw new Error('Test');
