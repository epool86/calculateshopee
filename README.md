# calculateshopee

Just open shopee web and login, then copy & paste this javascript, lastly simply run calculate(0);

- Use calculate.js to calculate in console
- Use calculate_with_csv.js to calculate in console & generate CSV

**Calculate Bookmarklet**

- Drag this link -> [Shopee Total](javascript:(function()%7Bjavascript%3A(function()%7B%0A%0Avar%20navbar%20%3D%20document.getElementsByClassName(%22navbar__links%22)%5B0%5D%3B%20%0Avar%20navbarLink%20%3D%20document.createElement(%22li%22)%3B%20%0Anavbar.appendChild(navbarLink)%3B%0AnavbarLink.className%20%3D%20%22navbar__link%22%3B%0A%09%0Avar%20total%20%3D%200%3B%0Avar%20order%20%3D%200%3B%0Afunction%20calculate(next)%7B%0A%09var%20opts%20%3D%20%7B%0A%09%09method%3A%20'GET'%2C%20%20%20%20%20%20%0A%09%09headers%3A%20%7B%7D%0A%09%7D%3B%0A%09fetch('https%3A%2F%2Fshopee.com.my%2Fapi%2Fv4%2Forder%2Fget_order_list%3Flimit%3D5%26list_type%3D3%26offset%3D'%2Bnext%2C%20opts).then(function%20(response)%20%7B%0A%09%09return%20response.json()%3B%0A%09%7D)%0A%09.then(function%20(body)%20%7B%0A%09%09var%20next_offset%20%3D%20body.data.next_offset%3B%0A%09%09if(next_offset%20%3E%3D%200)%7B%0A%09%09%09for%20(let%20%5Bkey%2C%20value%5D%20of%20Object.entries(body.data.details_list))%20%7B%0A%09%09%09%09var%20total_temp%20%3D%20value.info_card.final_total%20%2F%20100000%3B%0A%09%09%09%09total%20%2B%3D%20total_temp%3B%0A%09%09%09%09order%2B%2B%3B%0A%09%20%20%20%20%09%09console.log(order%20%2B%20%22%3A%22%2C%20%22RM%20%22%20%2B%20total_temp%20%2B%20%22%20-%20%22%2C%20value.info_card.order_list_cards%5B0%5D.items%5B0%5D.name)%3B%0A%09%09%09%09navbarLink.innerHTML%3D%22Calculating%3A%20RM%20%22%20%2B%20Math.round(total%20*%20100)%20%2F%20100%3B%0A%0A%09%09%09%7D%0A%09%09%09calculate(next_offset)%3B%0A%09%09%7D%20else%20%7B%0A%09%09%09console.log('Calculation%20completed!')%3B%0A%09%09%09var%20grandTotal%20%3D%20Math.round(total%20*%20100)%20%2F%20100%3B%0A%09%09%09console.log('GRAND%20TOTAL%3A%20RM%20'%20%2B%20grandTotal)%3B%0A%0A%09%09%09navbarLink.innerHTML%3D%22Grand%20Total%3A%20RM%20%22%20%2B%20grandTotal%3B%0A%09%09%7D%0A%09%7D)%3B%0A%7D%0Acalculate(0)%3B%0A%0A%7D)()%3B%7D)()%3B) <- to your bookmarkbar bar.
- Go to shopee website. Click "Shopee Total" on your bookmark bar.

NOTE
1. Only calculate order in "Completed" section
2. Doesn't count order in "To Ship", "To Receive" section
3. Only display 1st item (if more than 1 item in single order)

Credit (for CSV file generator)
https://stackoverflow.com/a/24922761
