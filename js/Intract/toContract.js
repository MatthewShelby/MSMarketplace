

/*
User must have memask wallet connected to the chain to intract with contract.


ordet:
0- connect metamask;
      page tells user how to connect to network using metamask.
      if true: hide how to connect and load data

1- load sells;
2- loadauctions;
3- loadrecentSells;
4- loadmyNFTs;
5- functionalities?
*/
async function StartContract() {

      console.log('Start Contract');
      hideLists();


      // Step 1: get connect to metamask
      checkForMetamask().then(step1 => {
            if (step1) {
                  // step 2: init contract
                  tryInitContract().then(step2 => {
                        if (step2) {
                              // step 3: load my nfts;
                              GetMyNFTs();

                              // step 4: load All nfts;
                              GetAllNFTs();

                              GetAllSells();


                              GetAllAuctions();

                        }
                  })
            }
      })
}


//#region contract intraction variables

var allNFTsShow = false;
var myNFTsShow = false;
var sellListedNFTs;
var auctionNFTs;
//#endregion

//#region         step 1: check for metamask
var provider;
var signer;
var hasMetamask = false;
async function checkForMetamask() {

      if (window.ethereum === undefined) {
            sendAlert('You need to install MetaMask Extention.')
            return Promise.resolve(false);

      } else {
            hasMetamask = true;
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []).then(() => {
                  signer = provider.getSigner();
            });
            console.log('step 1 done.')
            return Promise.resolve(true);
      }
}

function sendAlert(msg) {
      setTimeout(() => {
            window.alert(msg);
      }, 1000)
}

//#endregion 


//#region         step 2: init Contract

var myContract;
var isContractInit = false;

function tryInitContract() {
      try {
            myContract = new ethers.Contract(contractAddress, ABI, signer);
            isContractInit = true;
            console.log('step 2 - contract init done.');
            return Promise.resolve(true);
      } catch (error) {
            return Promise.resolve(false);
      }
}

//#endregion


//#region         step 3: Get My NFTs

async function GetMyNFTs() {
      myContract.getMyNFTs().then(x => {
            x.forEach(element => {
                  var data;
                  var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
                  request.open('GET', element); // Open a new connection, using the GET request on the URL endpoint
                  request.send();
                  request.onload = async function () {
                        data = JSON.parse(this.response);
                        await setPageMyNFTs(new NFT(data.name, data.description, data.image));
                  }
            });
            return Promise.resolve(true);
      });
}


//#endregion


//#region         step 4: Get All NFTs



async function GetAllNFTs() {
      myContract.getAllNFTs().then(x => {
            x.forEach(element => {
                  var data;
                  var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
                  request.open('GET', element); // Open a new connection, using the GET request on the URL endpoint
                  request.send();
                  request.onload = async function () {
                        data = JSON.parse(this.response);
                        setPageAllNFTs(new NFT(data.name, data.description, data.image));
                  }
            });
      })
}


//#endregion




//#region         step 5: Get All SELLS

async function GetAllSells() {
      myContract.getAllSells().then(x => {
            for (let i = 0; i < x.length; i++) {
                  var tokenId = _hexToInt(x[i].tokenId._hex);
                  var price = _hexToInt(x[i].price._hex);
                  var sell = new NFTRawSellTicket(tokenId, price);
                  fetchSellData(sell);

            }

      })
}

function fetchSellData(rawSellTicket) {
      console.info(rawSellTicket);

      myContract._uriOf(rawSellTicket.tokenId).then(x => {
            var data;
            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('GET', x); // Open a new connection, using the GET request on the URL endpoint
            request.send();
            request.onload = async function () {
                  data = JSON.parse(this.response);
                  var newNFT = new NFTSell(data.name, data.description, data.image, rawSellTicket.tokenId, rawSellTicket.price);
                  setPageSellNFTs(newNFT);
                  var now = new Date();
                  var exp = new Date(now.setDate(now.getDate() + 18));
                  docCookies.setItem('S_' + newNFT.tokenId, JSON.stringify(newNFT), exp);
            }
      })

}
//#endregion

//#region         step 5: Get All AUCTIONS

async function GetAllAuctions() {
      myContract.getAllAuctions().then(x => {
            for (let i = 0; i < x.length; i++) {
                  var tokenId = _hexToInt(x[i].tokenId._hex);
                  var basePrice = _hexToInt(x[i].basePrice._hex);
                  var auctionMaturity = _hexToInt(x[i].auctionMaturity._hex);
                  var highestBid = _hexToInt(x[i].highestBid._hex);
                  var currentOwner = x[i].currentOwner;
                  var auction = new Auction(tokenId, basePrice, auctionMaturity, highestBid, currentOwner);
                  fetchAuctionData(auction);

            }

      })
}

function fetchAuctionData(rawAuction) {
      console.info(rawAuction);

      myContract._uriOf(rawAuction.tokenId).then(x => {
            var data;
            var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
            request.open('GET', x); // Open a new connection, using the GET request on the URL endpoint
            request.send();
            request.onload = async function () {
                  data = JSON.parse(this.response);
                  var newNFTA = new NFTAuction(rawAuction.tokenId, rawAuction.basePrice, rawAuction.auctionMaturity, rawAuction.highestBid, rawAuction.currentOwner, data.name, data.description, data.image);
                  setPageAuctionNFTs(newNFTA);
                  var now = new Date();
                  var exp = new Date(now.setDate(now.getDate() + 18));
                  docCookies.setItem('A_' + newNFTA.tokenId, JSON.stringify(newNFTA), exp);
            }
      })

}
//#endregion


function _hexToInt(BigNumber) {
      return ethers.utils.formatUnits(BigNumber) * (10 ** 18)
}