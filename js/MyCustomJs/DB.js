function initDB() {
      readFile('./js/MyCustomJs/NFTDB.json');
}

var allData;

class NFT {
      constructor(tokenId, name, description, imageUrl) {
            this.tokenId = tokenId;
            this.name = name;
            this.description = description;
            this.image = imageUrl;
      }
}

function setListed() {
      //var liste = new NFT[8];
}


function readFile(file) {
      var dataFile;
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                  if (rawFile.status === 200 || rawFile.status == 0) {
                        var allText = rawFile.responseText;
                        //console.log('allText: ' + allText)
                        var value = JSON.stringify;
                        // now display on browser :)
                        allData = JSON.parse(allText);
                  }
            }
      }
      rawFile.send(null);
}


function getMyNFTs(){
      return allData[0].asset;
}

function writeJson(){
      var t1 = new NFT(2102,'Alexa','A photo of Alexa','https://i.guim.co.uk/img/media/117fb0d94960b88fe2704b8232c0d280881058b6/788_650_3705_2223/master/3705.jpg?width=620&quality=85&auto=format&fit=max&s=df52b3e959fc3227183f265657eff284')
      var t2 = new NFT(2103,'Marine','Big photo of Marine','https://images02.military.com/sites/default/files/styles/full/public/2021-06/mil-eric-john-niss-de-jesus-1800.jpg?itok=TDGZsoAj')
      var t3 = new NFT(2104,'SkyRocket','SkyRocket and nothing else','https://i.pinimg.com/564x/d3/28/cd/d328cde06c7113f4e24d32d4d6d0d4d9.jpg')
      var t4 = new NFT(2105,'Ploto','Ploto is awesome','https://cdn.mos.cms.futurecdn.net/KFN2xvGa93uyDvrvRRFL3B-970-80.jpg.webp')
      var t5 = new NFT(2106,'Lighter','a photo of Lighter','https://image.made-in-china.com/2f0j00ZSVRuPmchfbt/Wholesale-Stock-Metal-Pocket-Mini-Cigarette-Lighter.webp')
      var t6 = new NFT(2107,'Bridge','a photo of Bridge','https://www.w3schools.com/css/img_forest.jpg')
      var t7 = new NFT(2108,'Village','this Village is nice','https://www.w3schools.com/css/img_5terre.jpg')
      var t8 = new NFT(2109,'mountains','how great this mountains is','https://www.w3schools.com/css/img_mountains.jpg')
      var t9 = new NFT(2110,'light','the beauty of night light','https://www.w3schools.com/css/img_lights.jpg')
      var t0 = new NFT(2111,'Hard drive','What is in a hard drive?','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Laptop-hard-drive-exposed.jpg/220px-Laptop-hard-drive-exposed.jpg')
class Collection {
      constructor(name,NFTs)
      {this.name = name,
            this.asset = NFTs
      }
}
      var myNFTs = new Collection('myNFTs',[t1,t2,t3,t4]);
      var listed = new Collection('listed',[t5,t6,t7,t8,t9]);
      var sold = new Collection('sold',[t1,t6,,t0]);
      var auction = new Collection('auction',[t2,t3,,t8]);
  


      var all = [myNFTs,listed,sold,auction]
      console.log(all);
      
}

// readTextFile('./NFTDB.json');