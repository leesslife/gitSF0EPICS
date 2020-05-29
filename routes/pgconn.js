var pg = require('pg');
var client = new pg.Client();
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'zhangliyuan', //env var: PGDATABASE
  password: '123456', //env var: PGPASSWORD
	host: '127.0.0.1', // Server hosting the postgres database
	// host: '192.168.10.9',
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);
var query=function(sql,callback){
					pool.connect(function(err, client, done) {
	 							 if(err) {
										return console.error('error fetching client from pool', err);
	 								 }
				  client.query(sql, function(err, result) {
		//call `done()` to release the client back to the pool
					done();
									if(err) {
											  return console.error('error running query', err);
									}
		//console.log(result);
		callback(result);
	  });
	});
};

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})
exports.query = query;
