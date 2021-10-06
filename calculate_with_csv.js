var total_spent = 0;
var order_count = 0;
var datacsv = [];
function calculate(next){
	var opts = {
		method: 'GET',      
		headers: {}
	};
	fetch('https://shopee.com.my/api/v4/order/get_order_list?limit=5&list_type=3&offset='+next, opts)
	.then(function (response) {
		return response.json();
	})
	.then(function (body) {
		var next_offset = body.data.next_offset;
		if(next_offset >= 0){
			for (let [key, value] of Object.entries(body.data.details_list)) {
				var total_temp = value.info_card.final_total / 100000;
				total_spent += total_temp;
				datacsv[order_count] = [order_count + 1, total_temp, value.info_card.order_list_cards[0].items[0].name];
				order_count++;
	    		console.log(order_count + ":", "RM " + total_temp + " - ", value.info_card.order_list_cards[0].items[0].name);
			}
			calculate(next_offset);
		} else {
			exportToCsv('export.csv', datacsv);
			console.log('Calculation completed!');
			console.log('GRAND TOTAL: RM ' + Math.round(total_spent * 100) / 100 );
		}
	});
}
//credit to https://stackoverflow.com/a/24922761
function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };
    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }
    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
calculate(0);
