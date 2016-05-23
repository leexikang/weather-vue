var defaultUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Mandalay&units=metric&cnt=8&appid=0735b20d06cac558720dcbb29ff1fcf7";
var defaultCity = "Mandalay" 

Vue.filter('toDate', function(val){
	var date = new Date(val*1000);
	var week = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	return week[date.getDay()];
});

var vue = new Vue({
	el: "#weather-app",
	data: {
		message: "Hello Vue",
		city: "",
		forecast: {}
	},
	methods: {
		fetchImage: function(name){
			return "http://openweathermap.org/img/w/" + name + ".png";
		},
		fetchForecasts: function(city){

			var Url = "//api.openweathermap.org/data/2.5/forecast/daily?q="
			+ city + "&units=metric&cnt=8&appid=0735b20d06cac558720dcbb29ff1fcf7";
			this.$http.get(Url).then(
				function(response){
					this.forecast = response.data;
				});
		},
		refreshForecast: function(){
			this.fetchForecasts();
		}
	},
	created: function() {
		this.fetchForecasts(defaultCity)
	},
	computed: {
		forecasts: function(){
			return this.forecast.list;	
		},
		location: function(){
			return this.forecast.city.name;
		}
	},
});

