const BASE_URL = "https://zagster-service.herokuapp.com"

$(updateView)

function updateView() {
  $.getJSON(BASE_URL + "/rides/count" , updateRideCount)

  $.when ($.getJSON(BASE_URL + "/rides/count/per_month", perMonth),
    ).then(updateGraph);
}

let dataByMonths = []

function perMonth(data){ //Loads up dataByMonths with data so that each month is represented by an index in dataByMonths, so that the 0th index is January and so on.
  for(var index = 0, month = 9; index <= 3, month <=12; ++index, ++month){ // for 2016
    dataByMonths[month - 1] = data[2016] [index] [month] // month - 1 so that the indexes of databyMonths represents the month
  }

  console.log(dataByMonths)

  for(var index = 0, month = 1; index <= 11, month <=12; ++index, ++month){ // for 2017
    if(dataByMonths[month - 1] == null){
      dataByMonths[month - 1] = data[2017] [index] [month]
    }else{
      dataByMonths[month - 1] += data[2017] [index] [month]
    }
  }

  console.log(dataByMonths)

  for(var index = 0, month = 1; index <= data.length, month <=10; ++index, ++month){ // for 2018
    if(dataByMonths[month - 1] == null){
      dataByMonths[month - 1] = data[2018] [index] [month]
    }else{
      dataByMonths[month - 1] += data[2018] [index] [month]
    }  
  }

  console.log(dataByMonths)
}

function updateRideCount(data) {
  numberOfRides = data.count
  $("h2#rideCount").html("Total Number of Rides: " + numberOfRides)
  console.log(numberOfRides)
}

function updateGraph(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
              label: '',
              backgroundColor: 'rgb(0, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: dataByMonths
          }]
      },
      // Configuration options go here
      options:{}
  });
} 