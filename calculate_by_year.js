var total = 0;
var order = 0;
var undefinedTimestamp = 0;

function calculate(next, year) {
  var opts = {
    method: 'GET',
    headers: {},
  };
  fetch(
    'https://shopee.com.my/api/v4/order/get_order_list?limit=5&list_type=3&offset=' +
      next,
    opts
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (body) {
      var next_offset = body.data.next_offset;
      if (next_offset >= 0) {
        for (let [key, value] of Object.entries(body.data.details_list)) {
          var timestamp = value.shipping.hasOwnProperty('tracking_info')
            ? value.shipping.tracking_info.ctime
            : null;

          if (!timestamp) {
            undefinedTimestamp++;
            continue;
          }

          if (year != new Date(timestamp * 1000).getFullYear()) continue;

          var total_temp = value.info_card.final_total / 100000;
          total += total_temp;
          order++;

          console.log(
            order + ':',
            'RM ' + total_temp + ' - ',
            value.info_card.order_list_cards[0].items[0].name
          );
        }
        calculate(next_offset, year);
      } else {
        console.info(`Unable to fetch ${undefinedTimestamp} item(s) date.`);
        console.log('Calculation completed!');
        console.log(
          `GRAND TOTAL (${year}): RM ${Math.round(total * 100) / 100}`
        );
      }
    });
}

calculate(0, 2021);
