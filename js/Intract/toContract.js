

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






//#region   =====================   BUY   =====================

async function InitContractToBuy(sellTokenId) {

      console.log('Start Contract');
      //hideLists();


      // Step 1: get connect to metamask
      checkForMetamask().then(step1 => {
            if (step1) {
                  // step 2: init contract
                  tryInitContract().then(step2 => {
                        if (step2) {

                              var sellNFT;
                              myContract.getAllSells().then(x => {
                                    if (x.length > 0) {
                                          //sellNFTs = [];
                                          for (let i = 0; i < x.length; i++) {
                                                var tokenId = _hexToInt(x[i].tokenId._hex);
                                                var price = _hexToInt(x[i].price._hex);

                                                sellNFT = new NFTRawSellTicket(tokenId, Math.floor(price));

                                          }
                                          var ask = window.confirm(' Are you sure you want to buy the NFT #' + sellNFT.tokenId + ' with the price of ' + sellNFT.price + ' "MRY"')
                                          if (ask) {
                                                myContract._buyNFTRequest(sellNFT.tokenId).then(res => {
                                                      if (res) {
                                                            window.alert('Buy request has been transact.')
                                                      }
                                                });
                                          }
                                    }
                              }
                              )

                        }
                  })
            }
      })
}

//#endregion




//#region   =====================   BID   =====================

async function InitContractToBid(sellTokenId, bidAmount) {

      console.log('Start Contract');


      checkForMetamask().then(step1 => {
            if (step1) {
                  tryInitContract().then(step2 => {
                        if (step2) {
                              myContract.getAllAuctions().then(x => {  // Should have chage to getAuctionById(tokenId)
                                    if (x.length > 0) {
                                          var auctionNFT;
                                          for (let i = 0; i < x.length; i++) {
                                                console.log(x[i]);
                                                var tokenId = _hexToInt(x[i].tokenId._hex);
                                                var basePrice = _hexToInt(x[i].basePrice._hex);
                                                var auctionMaturity = _hexToInt(x[i].auctionMaturity._hex);
                                                var highestBid = _hexToInt(x[i].highestBid._hex);
                                                var currentOwner = x[i].currentOwner;

                                                auctionNFT = new Auction(tokenId, basePrice, auctionMaturity, Math.floor(highestBid), currentOwner);

                                          }

                                          if (bidAmount <= auctionNFT.highestBid) {
                                                window.alert('Your Bid amount must be more than current highest bid.');
                                          } else {
                                                if (bidAmount <= auctionNFT.basePrice) {
                                                      window.alert('The bid amount must be more than base price.');
                                                } else {


                                                      var ask = window.confirm(' Are you sure you want to place a bid for the NFT #' + auctionNFT.tokenId +
                                                            ' with the amount of ' + bidAmount + ' "MRY"')
                                                      if (ask) {
                                                            myContract.placeBid(auctionNFT.tokenId, bidAmount).then(res => {
                                                                  if (res) {
                                                                        window.alert('Buy request has been transact.')
                                                                  } else {
                                                                        window.alert('Bid failed.   error: ' + res);

                                                                  }
                                                            });
                                                      }
                                                }
                                          }
                                    }
                              }
                              )

                        }
                  })
            }
      })
}

//#endregion





//#region   =====================   SELL   =====================

async function InitContractToSell(tokenId, sellPrice) {

      console.log('Start InitContractToSell');
      //hideLists();


      // Step 1: get connect to metamask
      checkForMetamask().then(step1 => {
            if (step1) {
                  // step 2: init contract
                  tryInitContract().then(step2 => {
                        if (step2) {

                              var ask = window.confirm('Are you sure you want to sell the NFT #' + tokenId + ' for ' + sellPrice + ' "MRY" ?');

                              if (ask) {
                                    myContract.listNFTSell(tokenId, sellPrice).then(x => {
                                          if (x) {
                                                window.alert('Sell offer has been listed.')
                                          }
                                    }
                                    )
                              }




                        }
                  })
            }
      })
}

//#endregion






//#region   =====================   AUCTION   =====================

async function InitContractToStartAuction(tokenId, basePrice, duration) {

      console.log('Start Auction');
      //hideLists();

      var ask = window.confirm('Are you sure you want to start an auction for the NFT #' + tokenId + 'with the base price of '+basePrice+ 'and duration of '+duration+' days?');

      if (ask) {

            // Step 1: get connect to metamask
            checkForMetamask().then(step1 => {
                  if (step1) {
                        // step 2: init contract
                        tryInitContract().then(step2 => {
                              if (step2) {


                                    myContract.listAuction(tokenId,basePrice,duration).then(x => {
                                          if (x) {
                                                window.alert('Auction has been listed.')
                                          }
                                    }
                                    )





                              }
                        })
                  }
            });
      }
}


async function InitContractToRedeem(tokenId) {

      console.log('Redeem Auction');
      //hideLists();

      var ask = window.confirm('Are you sure you want to Redeem the NFT #' + tokenId  +' ?');

      if (ask) {

            // Step 1: get connect to metamask
            checkForMetamask().then(step1 => {
                  if (step1) {
                        // step 2: init contract
                        tryInitContract().then(step2 => {
                              if (step2) {


                                    myContract.redeemAuction(tokenId ).then(x => {
                                          if (x) {
                                                window.alert('Auction has been redeemed.')
                                          }
                                    }
                                    )





                              }
                        })
                  }
            });
      }
}

//#endregion






//#region   =====================   CANCEL SELL   =====================

async function InitContractToCancelSell(tokenId) {

      console.log('Start InitContractTo CancelSell');
      //hideLists();
      var ask = window.confirm('Are you sure you want to cancel the sell for the NFT #' + tokenId + ' ?');

      if (ask) {

            // Step 1: get connect to metamask
            checkForMetamask().then(step1 => {
                  if (step1) {
                        // step 2: init contract
                        tryInitContract().then(step2 => {
                              if (step2) {


                                    myContract.cancelNFTSell(tokenId).then(x => {
                                          if (x) {
                                                window.alert('Sell offer has been removed.')
                                          }
                                    }
                                    )





                              }
                        })
                  }
            });
      }
}

//#endregion





//#region   =====================   Fetch Auction   =====================

async function fetchAuctionById(tokenId) {

      console.log('fetch auction');


      checkForMetamask().then(step1 => {
            if (step1) {
                  tryInitContract().then(step2 => {
                        if (step2) {

                              myContract.getAuctionbyId(tokenId).then(x => {  // Should have chage to getAuctionById(tokenId)
                                    console.log(x);
                                    var tokenId = _hexToInt(x.tokenId._hex);
                                    var basePrice = _hexToInt(x.basePrice._hex);
                                    var auctionMaturity = _hexToInt(x.auctionMaturity._hex);
                                    var highestBid = _hexToInt(x.highestBid._hex);
                                    var currentOwner = x.currentOwner;

                                    //var auction = new Auction(tokenId, basePrice, auctionMaturity, Math.floor(highestBid), currentOwner);


                                    myContract._uriOf(tokenId).then(x => {
                                          var data;
                                          var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
                                          request.open('GET', x); // Open a new connection, using the GET request on the URL endpoint
                                          request.send();
                                          request.onload = async function () {
                                                data = JSON.parse(this.response);
                                                var auctionNFT = new NFTAuction(tokenId, basePrice, auctionMaturity, Math.floor(highestBid), currentOwner, data.name, data.description, data.image)
                                                setAuctionPage(auctionNFT);

                                                /*
                                                                                                setPageAuctionNFTs(newNFTA);
                                                                                                var now = new Date();
                                                                                                var exp = new Date(now.setDate(now.getDate() + 18));
                                                                                                docCookies.setItem('A_' + newNFTA.tokenId, JSON.stringify(newNFTA), exp);*/
                                          }
                                    })


                              });
                        }
                  }
                  )

            }
      });
}



//#endregion




//#region   =====================   Fetch My NFT   =====================

async function fetchMyNFT(tokenId) {

      console.log('fetchMyNFT(myNFTTokenId); call tokenId: ' + tokenId);


      checkForMetamask().then(step1 => {
            if (step1) {
                  tryInitContract().then(step2 => {
                        if (step2) {
                              console.log('tokenId:  ' + tokenId)
                              myContract._uriOf(tokenId).then(res => {  // Should have chage to getAuctionById(tokenId)
                                    var data;
                                    var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
                                    request.open('GET', res); // Open a new connection, using the GET request on the URL endpoint
                                    request.send();
                                    request.onload = async function () {
                                          //console.log('---')
                                          //console.log(this.response);
                                          data = JSON.parse(this.response);
                                          var myNFT = new NFT(data.name, data.description, data.image, tokenId)
                                          myContract.getSellById(tokenId).then(s => {
                                                var price = _hexToInt(s.price._hex)
                                                if (price > 0) {
                                                      myNFT.isForSell = true;
                                                      myNFT.price = price;
                                                }
                                                console.log(s);
                                                setMyData(myNFT);

                                          })

                                    }
                              });
                        }
                  }
                  )

            }
      });
}


function setMyPage(myNFT) {
      document.getElementById('name').innerHTML = myNFT.name;
      document.getElementById('description').innerHTML = myNFT.description;
      document.getElementById('image').src = myNFT.image;
}


//#endregion




async function GetDoneSells(sellTokenId) {


      var doneSells = myContract.getDoneSells().then(x => {
            console.info(x);
            for (let i = 0; i < x.length; i++) {

                  var tokenId = _hexToInt(x[i].tokenId._hex);
                  var price = _hexToInt(x[i].price._hex);
                  var timestamp = _hexToInt(x[i].timeStamp._hex);
                  console.log(i + ':  tokenId: ' + tokenId + '   price: ' + price + '   timestamp: ' + timestamp);
            }

      });

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
                  myContract._uriOf(element).then(res => {
                        console.log('ract._uriOf(el).then(res: ' + res);

                        var data;
                        var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
                        request.open('GET', res); // Open a new connection, using the GET request on the URL endpoint
                        request.send();
                        request.onload = async function () {
                              //console.log('---')
                              //console.log(this.response);
                              data = JSON.parse(this.response);
                              var myNFT = new NFT(data.name, data.description, data.image, element)
                              await setPageMyNFTs(myNFT);
                        }
                  });
            });
            return Promise.resolve(true);
      });
}

function goToMyCard(tokenId) {
      console.log('goToMyCard(tokenId):  ' + tokenId);
      var now = new Date();
      var exp = new Date(now.setDate(now.getDate() + 18));
      docCookies.setItem('my_detail_tokenId', tokenId, exp);
      window.location.href = ('my-card-detail.html')
}

//#endregion


//#region         step 4: Get All NFTs



async function GetAllNFTs() {
      myContract.getAllNFTs().then(x => {
            //console.log(x)
            x.forEach(element => {
                  var data;
                  var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.

                  try {
                        request.open('GET', element); // Open a new connection, using the GET request on the URL endpoint
                        request.send();

                        request.onload = async function () {
                              //console.log('^^^')
                              //console.log(this.response);
                              data = JSON.parse(this.response);
                              setPageAllNFTs(new NFT(data.name, data.description, data.image));
                        }
                  } catch (error) {

                  }

            });
      })
}


//#endregion




//#region         step 5: Get All SELLS

async function GetAllSells() {

      myContract.getAllSells().then(x => {
            if (x.length > 0) {
                  for (let i = 0; i < x.length; i++) {
                        var tokenId = _hexToInt(x[i].tokenId._hex);
                        var price = _hexToInt(x[i].price._hex);
                        var sell = new NFTRawSellTicket(tokenId, Math.floor(price));
                        fetchSellData(sell);

                  }
            }
      }
      )
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

//#region         step 6: Get All AUCTIONS

async function GetAllAuctions() {
      myContract.getAllAuctions().then(x => {
            for (let i = 0; i < x.length; i++) {
                  var tokenId = _hexToInt(x[i].tokenId._hex);
                  var basePrice = _hexToInt(x[i].basePrice._hex);
                  var auctionMaturity = _hexToInt(x[i].auctionMaturity._hex);
                  var highestBid = _hexToInt(x[i].highestBid._hex);
                  var currentOwner = x[i].currentOwner;
                  var auction = new Auction(tokenId, Math.floor(basePrice), auctionMaturity, Math.floor(highestBid), currentOwner);
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