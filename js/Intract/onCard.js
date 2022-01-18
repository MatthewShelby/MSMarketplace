function setSellData() {
      var nftSell = JSON.parse(docCookies.getItem('sell_detail'));
      document.getElementById('tokenId').innerHTML = nftSell.tokenId;
      document.getElementById('price').innerHTML = nftSell.price;
      document.getElementById('description').innerHTML = nftSell.description;
      document.getElementById('name').innerHTML = nftSell.name;
      document.getElementById('image').src = nftSell.image;
}


function setAuctionData() {
      var nftAuction = JSON.parse(docCookies.getItem('auction_detail'));
      document.getElementById('tokenId').innerHTML = nftAuction.tokenId;
      document.getElementById('basePrice').innerHTML = nftAuction.basePrice;
      document.getElementById('description').innerHTML = nftAuction.description;
      document.getElementById('name').innerHTML = nftAuction.name;
      document.getElementById('image').src = nftAuction.image;
      document.getElementById('currentOwnre').innerHTML = nftAuction.currentOwnre;
      document.getElementById('highestBid').innerHTML = nftAuction.highestBid;
      setAuctionTimer(nftAuction.auctionMaturity);

}

function setAuctionTimer(am) {



      var date = new Date(am * 1000); // regular time from auction data
      //var sec = date - new Date();  //regular local time


      console.log(date)
      console.log(am)
      // Set the date we're counting down to
      var countDownDate = am;//new Date("Jan 5, 2022 15:37:25").getTime();
      console.log(countDownDate)

      // Update the count down every 1 second
      var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("timeLeft").innerHTML = days + "d " + hours + "h "
                  + minutes + "m " + seconds + "s ";

            // If the count down is over, write some text 
            if (distance < 0) {
                  clearInterval(x);
                  document.getElementById("timeLeft").innerHTML = "EXPIRED";
            }
      }, 1000);


      /*
      var duration = 3660;
      var timer = duration, hour, minutes, seconds;

      hour = parseInt(timer / 3600, 10);
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hour = hour < 10 ? "0" + hour : hour;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

     var  textContent = hour + ":" +  minutes + ":" + seconds;
     console.log(textContent);

      if (--timer < 0) {
            timer = duration;
      }
      console.log(timer);*/



      /*console.log(new Date());
      console.log(date);
      var def2 = date - new Date();
      var def1 = new Date(def2)

      console.log(new Date(71000)
      );


      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      // var minutes = "0" + sec.getMinutes();
      var minutes = "0" + sec / 60000;
      // Seconds part from the timestamp
      var seconds = "0" + sec / 1000;

      console.log('sec: ' + sec + '  -- min:   ' + Math.floor(minutes, 0) + '    --  sec:  ' + Math.floor(seconds, 0));

      //document.getElementById('highestBid').innerHTML = nftAuction.highestBid;*/
}