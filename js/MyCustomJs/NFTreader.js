function getNFTuri() {
      return Promise.resolve(myContract._uriOf(2101));
}


function getNFTData(nftUri, elementID) {
      var data;
      var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
      request.open('GET', nftUri); // Open a new connection, using the GET request on the URL endpoint
      request.send();

      request.onload = async function () {
            data = JSON.parse(this.response);
            console.log('on NFT DATA: ' + data)
            document.getElementById(elementID).src = data.image;
      }
      //return Promise.resolve(data);

}


