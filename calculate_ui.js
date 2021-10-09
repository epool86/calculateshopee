javascript:(function(){

var navbar = document.getElementsByClassName("navbar__links")[0]; 
var navbarLink = document.createElement("li"); 
navbar.appendChild(navbarLink);
navbarLink.className = "navbar__link";
	
var total = 0;
var order = 0;
function calculate(next){
	var opts = {
		method: 'GET',      
		headers: {}
	};
	fetch('https://shopee.com.my/api/v4/order/get_order_list?limit=5&list_type=3&offset='+next, opts).then(function (response) {
		return response.json();
	})
	.then(function (body) {
		var next_offset = body.data.next_offset;
		if(next_offset >= 0){
			for (let [key, value] of Object.entries(body.data.details_list)) {
				var total_temp = value.info_card.final_total / 100000;
				total += total_temp;
				order++;
	    		console.log(order + ":", "RM " + total_temp + " - ", value.info_card.order_list_cards[0].items[0].name);
				navbarLink.innerHTML="Calculating: RM " + Math.round(total * 100) / 100;

			}
			calculate(next_offset);
		} else {
			console.log('Calculation completed!');
			var grandTotal = Math.round(total * 100) / 100;
			console.log('GRAND TOTAL: RM ' + grandTotal);

			navbarLink.innerHTML="Grand Total: RM " + grandTotal;
		}
	});
}
calculate(0);

})();