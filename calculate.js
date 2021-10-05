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
	    		console.log("Order no " + order + ": ", "RM " + total_temp);
			}
			calculate(next_offset);
		} else {
			console.log('Calculation completed!');
			console.log('GRAND TOTAL: RM ' + total);
		}
	});
}
calculate(0);
