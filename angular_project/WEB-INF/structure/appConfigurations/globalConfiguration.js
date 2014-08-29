var conf = {
	"pages" : [ {
		url : '/',
		templateUrl : 'pages/html/welcome.html',
		authorized : false

	}, {
		url : '/first',
		templateUrl : 'pages/html/first.html',
		authorized : true
	}, {
		url : '/second',
		templateUrl : 'pages/html/second.html',
		authorized : true
	} ],
	"languages" : [ {
		"label" : "English",
		"value" : "EN",
		"default" : true
	}, {
		"label" : "Francaise",
		"value" : "FR"
	}, {
		"label" : "Italiano",
		"value" : "IT"
	} ]
}