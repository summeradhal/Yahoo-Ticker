$(document).ready(function(){

	// add a submit handler for our form
	$('.yahoo-form').submit(function(){
		// Stop the form from submitting when the user clicks or pushes enter
		event.preventDefault();
		// Get whatever the user put in the input field
		var symbol = $('#symbol').val();

		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + symbol + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		console.log(url);

		$.getJSON(url, function(theDataJsFoundIfAny){
			console.log(theDataJsFoundIfAny);
			var stockInfo = theDataJsFoundIfAny.query.results.quote;
			var stockCount = theDataJsFoundIfAny.query.count;
			var newHTML = '';
			if(stockCount > 1){
				for(var i=0; i<stockInfo.length; i++){
					newHTML += buildNewTable(stockInfo[i]);
				}
			}else{
				newHTML += buildNewTable(stockInfo);
			}
			$('.yahoo-body').html(newHTML);	
			$('.table').DataTable();

$('.table').on( 'column-visibility.dt', function ( e, settings, column, state ) {
    console.log(
        'Column '+ column +' has changed to '+ (state ? 'visible' : 'hidden')
    );
} );

var arr=[];
$('.addButton').on('click',function(){
		console.log("it worked!");
		 localStorage.setItem("stuff", arr);
		
		
});

$('.retButton').on('click',function(){

console.log("hi");
document.getElementById("yahooTable").innerHTML = localStorage.getItem("stuff");

});
;;;;;
		 $(".table").find('.yahoo-body tr').each(function(index,item){

        var stockName=$(item).find('td').eq(0).text();
        var stockCompName=$(item).find('td').eq(1).text();
        var stockAsk=$(item).find('td').eq(2).text();
        var stockBid=$(item).find('td').eq(3).text();
         var stockChange=$(item).find('td').eq(4).text();
         console.log(stockAsk);
        arr.push(stockName,stockCompName,stockAsk,stockBid,stockChange);
    });


  localStorage.setItem("stockStuff",arr);
  console.log(arr);
  console.log(localStorage);
		

});


		});	
});






function buildNewTable(stockInfo){

	if(stockInfo.Change[0] == '+'){
		var upDown = "success";
	}else if(stockInfo.Change[0] == '-'){
		var upDown = "danger";
	}

	var htmlString = '';
	htmlString = '<tr><td class="symbol"><button type="button" class="addButton btn-default ">+</button>' + stockInfo.Symbol + '</td>';
	htmlString += '<td class="name">' + stockInfo.Name  + '</td>';
	htmlString += '<td class="ask">' + stockInfo.Ask + '</td>';
	htmlString += '<td class="bid">' + stockInfo.Bid + '</td>';
	htmlString += '<td class="'+upDown+'">' + stockInfo.Change + '</td></tr>';
	return htmlString;
}

// data-value:'+i+'"



