
function buy() {

      InitContractToBuy(tokenID)

}



var tokenID;
function setSellData() {
      var nftSell = JSON.parse(docCookies.getItem('sell_detail'));
      tokenID = nftSell.tokenId;
      document.getElementById('tokenId').innerHTML = nftSell.tokenId;
      document.getElementById('price').innerHTML = nftSell.price;
      document.getElementById('description').innerHTML = nftSell.description;
      document.getElementById('name').innerHTML = nftSell.name;
      document.getElementById('image').src = nftSell.image;
}

var nftAuction;
function setAuctionData() {
      nftAuction = JSON.parse(docCookies.getItem('auction_detail'));
      var tokenId = nftAuction.tokenId;

      fetchAuctionById(tokenId);

}

function setAuctionPage(auc) {
      nftAuction = auc;
      console.log('x.currentOwner:  '+nftAuction.currentOwner)

      document.getElementById('basePrice').innerHTML = nftAuction.basePrice;
      document.getElementById('description').innerHTML = nftAuction.description;
      document.getElementById('name').innerHTML = nftAuction.name;
      document.getElementById('image').src = nftAuction.image;
      document.getElementById('highestBid').innerHTML = nftAuction.highestBid;
      document.getElementById('currentOwnre').innerHTML = nftAuction.currentOwner;

      setAuctionTimer(nftAuction.auctionMaturity);
}

function setAuctionTimer(am) {
      var date = new Date(am); // regular time from auction data
      var countDownDate = am * 1000;//new Date("Jan 5, 2022 15:37:25").getTime();
      // Update the count down every 1 second
      var x = setInterval(function () {

            // Get today's date and time
            var now = (new Date().getTime());

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            var remaining = days + "Days and " + hours + ":"
                  + minutes + ":" + seconds;
            if (days == 0) {
                  remaining = hours + ":"
                        + minutes + ":" + seconds;
            }
            document.getElementById("timeLeft").innerHTML = remaining;

            // If the count down is over, write some text 
            if (distance < 0) {
                  clearInterval(x);
                  document.getElementById("timeLeft").innerHTML = "EXPIRED";
            }
      }, 1000);
}