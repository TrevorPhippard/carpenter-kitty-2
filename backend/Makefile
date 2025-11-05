requirements: 5mins

	- functional requirements
		create posts
		create edit and delete posts
		follow other userse
		view a timeline of post from following
		like, replay, share
		search for posts
		direct mesage, sockets


 - functional requirements
		security

		realiblity
			sacle to 100+ million users
			handle high volume
		performacnce
				-high avalilablity 99.999%
				- low latency


	security
		auth(2)
		data encryption
				transit + at rest
		rate limiting
		input validation

	monitoring
		- health checks: prom + grafana
		- logging
		- ELK stack
		- alerts
			alert mngr, pager duty

	testing
		- load testing
		- automated testing, CI/CD testing
		- backups/recovery

clients
	-> load balancer
					routing algorithm (there are a few)
					layer, tcp or https

	-> api gateway


key services
	post:
		crud service
		store meta data, media, timestamps
		high throughput, rate limiter

		cdn
		redis
		mongodb

	comments: crud service
		ratelimiter
		redis

	search
			- elastic search

	media service:
			- stoarge: blob storage like s3

	timeline/feed
			- fanout-on-read: message queue.

	profile service

		- sql database: postgres

	connections: graph database

	auth