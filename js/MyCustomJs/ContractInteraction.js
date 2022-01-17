

//#region ============================   NFT  ===============================
function MintNFT() {
      if (!checkBCC()) { return }
      if (balance < 200) {
            window.alert('Your balance is not enough!')
            return
      }


      console.log('try to Mint NFT ');
      avoidCall('mintNFTBTN');

      var tokenUri = document.getElementById('NFT-mintTokenUri').value
      let myAddress = signer.getAddress()
      myContract._safeMintNFT(myAddress, tokenUri);
}


function BuyNFT() {
      if (!checkBCC()) { return }

      console.log('try to Buy NFT ');
      avoidCall('requestByuNft');

      var seller = document.getElementById('nft-seller').value
      var price = document.getElementById('nft-buy-price').value
      var tokenId = document.getElementById('nft-buy-TokenId').value
      myContract._buyNFTRequest(seller, price, tokenId);
}


function SellNFTAccept() {
      if (!checkBCC()) { return }

      console.log('try to Sell NFT ');
      avoidCall('acceptNFTSell');

      var buyer = document.getElementById('nft-buyer-address').value
      var price = document.getElementById('nft-price-acceptance').value
      var tokenId = document.getElementById('nft-TokenId-acceptance').value
      myContract._sellNFTAcception(buyer, tokenId, price);
}


//#endregion



//#region ============================  MINE APPLE   ============================

function MineApple() {
      if (!checkBCC()) { return }
      if (balance < 1000) {
            window.alert('Your balance is not enough!')
            return
      }


      console.log('try to Mine Apple ');
      avoidCall('mineApple');

      myContract._mineApple();
}



function BuyApple() {
      if (!checkBCC()) { return }

      console.log('try to Buy APL ');
      avoidCall('request-apl-buy');

      var seller = document.getElementById('apl-seller-address').value
      var price = document.getElementById('apl-buy-price').value
      myContract._buyAppleRequest(seller, price);
}


function SellAppleAccept() {
      if (!checkBCC()) { return }

      console.log('try to Sell APL ');
      avoidCall('accept-apl-sell');

      var buyer = document.getElementById('apl-sell-acceptance').value
      var price = document.getElementById('apl-sell-price-acceptance').value
      myContract._sellAppleAcception(buyer, price);
}


//#endregion





//#region ============================  Sign In  ============================
var isSignedIn = false;
function trySingIn() {
      checkForMetamask().then(() => {
            if (hasMetamask) {
                  tryInitContract().then(() => {
                        if (isContractInit) {
                              tryGetBalance().then(() => {
                                    if (balanceFetched) {
                                          //const loginButton = document.getElementById('signInBTN')
                                          // document.getElementById('signInBTN').style.display = "none";
                                          // document.getElementById('userBalance').style.display = "block";
                                          // printBalance();
                                          isSignedIn = true;
                                    }
                              })
                        }
                  })
            }
      }
      );

}


var balance = 0;
var balanceFetched = false;
async function tryGetBalance() {

      myContract.balanceOf(signer.getAddress()).then(function (value) {
            balance = BigInt(value._hex).toString();
            console.log('balance: ' + balance);
            printBalance();

      });

      balanceFetched = true;
      return Promise.resolve(true);

}

function printBalance() {
      setTimeout(() => {
            // document.getElementById('balanceAmount').innerHTML = balance;
      }, 500)
}

//#endregion


function checkBCC() {
      if (!hasMetamask) {
            sendAlert('You need to install MetaMask Extention.');
            return false
      }
      if (!isSignedIn) {
            sendAlert('You are not signed in. please try later');
            return false
      }
      if (!isContractInit) {
            sendAlert('You are not connected to caontract. please try later');
            return false
      } else {
            return true
      }
}


//#region ============================  TRANSFER  ============================

function transfer() {
      if (!checkBCC()) { return }

      var transferDestination = document.getElementById('transfer-destination').value
      var transferAmount = document.getElementById('transfer-amount').value

      console.log('try to transfer ' + transferAmount + ' MRY to: ' + transferDestination);
      avoidCall('transferBTN');

      myContract.transfer(transferDestination, transferAmount);

}

var canTransfer = true;
function avoidCall(id) {
      document.getElementById(id).disabled = true;

      setTimeout(() => {
            document.getElementById(id).disabled = false;

      }, 8000)
}


//#endregion



// var Abal = myContract.appleBalanceOf(signer.getAddress()).then(function (value) {
//       console.log(BigInt(value._hex).toString());
// });











function test2() {
      console.log('test is ok for C I .js');
}









