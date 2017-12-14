module.exports = {
	mongo: {
		'development': {
			connectionString: 'mongodb://127.0.0.1/up2cdn'
		},
		'production': {
			connectionString: 'mongodb://127.0.0.1/up2cdn'
		},
		options: {
			useMongoClient: true
		}
	}
}