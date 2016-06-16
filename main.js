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
			return "//openweathermap.org/img/w/" + name + ".png";
		},
		fetchForecasts: function(city){

			var Url = '//api.openweathermap.org/data/2.5/forecast/daily?q='
			+ city + "&units=metric&cnt=8&appid=0735b20d06cac558720dcbb29ff1fcf7";
			this.$http.get(Url).then(
				function(response){
					this.forecast = response.data;
				});
		},
		toTwoDimentialArray: function(list, howMany){
			var result = []; input = list.slice(0); 
			while(input[0]) { 
				result.push(input.splice(0, howMany)); 
			}
			return result;	

		}
	},
		created: function() {
		this.fetchForecasts(defaultCity)
	},

	computed: {
		forecasts: function(){
			return this.toTwoDimentialArray(this.forecast.list, 3);
		},
		location: function(){
			return this.forecast.city.name;
		},
		error: function(){
			return this.forecast.code;
		}
	},
});

