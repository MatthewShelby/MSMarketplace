const myNFTListId = 'my-nfts-list';
const myNFTBarId = 'my-nfts-bar';
const allNFTListId = 'all-nfts-list';
const allNFTBarId = 'all-nfts-bar';
const sellNFTListId = 'sell-nfts-list';
const sellNFTBarId = 'sell-nfts-bar';
const auctionNFTListId = 'auction-nfts-list';
const auctionlNFTBarId = 'auction-nfts-bar';
const instructionId = 'instruction';

var pageNFTs = [];

function hideLists() {
      document.getElementById(myNFTBarId).style.display = "none";
      document.getElementById(allNFTBarId).style.display = "none";
      document.getElementById(sellNFTBarId).style.display = "none";
      document.getElementById(auctionlNFTBarId).style.display = "none";
}

function hideInstruction() {
      document.getElementById(instructionId).style.display = "none";
}



async function setPageMyNFTs(nft) {
      await addNFTCardTo(nft, 'my-nfts-list', 'my-nfts-bar');
}

async function setPageAllNFTs(nft) {
      await addNFTCardTo(nft, 'all-nfts-list', 'all-nfts-bar');
}

async function setPageSellNFTs(nft) {
      await addSellNFTCardTo(nft, 'sell-nfts-list', 'sell-nfts-bar');

}

async function setPageAuctionNFTs(nft) {
      await addAuctionNFTCardTo(nft, 'auction-nfts-list', 'auction-nfts-bar');

}

async function addNFTCardTo(nft, pageListElement, pageBarElement) {
      let c1 = '<div class="col-6 col-sm-4 col-md-4 col-lg-3  col-xl-2 col-xl-2  mycard"><div class="my-card-style"> <img   class="card-image" src="';
      let c2 = '" alt="NFT Not Found" style="  opacity: 1;"><div class="card-ro ">'
      let c3 = '<p class="titleText">';
      let c4 = '</p><p class="titleText">';
      let c5 = '</p></div></div></div>';
      var newR = document.getElementById(pageListElement).innerHTML;
      var des = nft.description;
      if (des.length>40) {
            des = des.substring(0,40)+'....';
      }
      newR += c1 + nft.image + c2 + c3 + nft.name + c4 + des + c5;
      document.getElementById(pageListElement).innerHTML = newR;
      document.getElementById(pageBarElement).style.display = "block";
      hideInstruction();

}

async function addSellNFTCardTo(nft, pageListElement, pageBarElement) {
      let c1 = '<div onclick="goToSellCard(' + nft.tokenId + ')" class="col-6 col-sm-4 col-md-4 col-lg-3  col-xl-2 col-xl-2  mycard pointer"><div class="my-card-style"> <img   class="card-image" src="';
      let c2 = '" alt="NFT Not Found" style="  opacity: 1;"><div class="card-row  d-flex justify-content-between">'
      let c3 = '<span class="card-token-id">#';
      let c4 = '</span><span class="card-price">';
      let c5 = '<span class="card-price-unit"> "MRY"</span></span></div></div></div>';
      var newR = document.getElementById(pageListElement).innerHTML;
      newR += c1 + nft.image + c2 + c3 + nft.tokenId + c4 + nft.price + c5;
      document.getElementById(pageListElement).innerHTML = newR;
      document.getElementById(pageBarElement).style.display = "block";
      pageNFTs[nft.tokenId] = nft;
      console.log(pageNFTs[nft.tokenId]);
      hideInstruction();
}



async function addAuctionNFTCardTo(nft, pageListElement, pageBarElement) {
      //let c1 = '<div class="col-6 col-sm-4 col-md-4 col-lg-3  col-xl-2 col-xl-2  mycard"><div class="my-card-style"> <img   class="card-image" src="';
      let c1 = '<div onclick="goToAuctionCard(' + nft.tokenId + ')" class="col-6 col-sm-4 col-md-4 col-lg-3  col-xl-2 col-xl-2  mycard pointer"><div class="my-card-style"> <img   class="card-image" src="';
      let c2 = '" alt="NFT Not Found" style="  opacity: 1;"><div class="card-row  d-flex justify-content-between">'
      let c3 = '<span class="card-token-id">#';
      let c4 = '</span><span class="card-price">';
      let c5 = '<span class="card-price-unit"> "MRY"</span></span></div></div></div>';
      var newR = document.getElementById(pageListElement).innerHTML;
      var price = nft.basePrice;
      if (nft.highestBid > price) {
            price = nft.highestBid;
      }
      newR += c1 + nft.image + c2 + c3 + nft.tokenId + c4 + price + c5;
      document.getElementById(pageListElement).innerHTML = newR;
      document.getElementById(pageBarElement).style.display = "block";
      pageNFTs[nft.tokenId] = nft;
      hideInstruction();
}


function goToSellCard(tokenId) {
      var newNFT = pageNFTs[tokenId];
      console.info(newNFT);
      var now = new Date();
      var exp = new Date(now.setDate(now.getDate() + 18));
      docCookies.setItem('sell_detail', JSON.stringify(newNFT), exp);
      window.location.href = ('sell-card-detail.html')
}


function goToAuctionCard(tokenId) {
      var newNFT = pageNFTs[tokenId];
      console.info(newNFT);
      var now = new Date();
      var exp = new Date(now.setDate(now.getDate() + 18));
      docCookies.setItem('auction_detail', JSON.stringify(newNFT), exp);
      window.location.href = ('auction-card-detail.html')
}
