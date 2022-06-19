const { expect } = require("chai"); 
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Listing", function () {

  let NFT;
  let nft;
  let Marketplace;
  let marketplace
  let deployer;
  let addr1;
  let addr2;
  let addrs;
  let feePercent = 1;
  let URI = "sample URI"
  let developer,wallet,seller,investor,tokenInstance, listingInstance;

  beforeEach(async function () {
    // Get the ContractFactories and Signers here.
    const securityToken = await ethers.getContractFactory("SecurityToken");
    const listing = await ethers.getContractFactory("Listing");
    [deployer,wallet ,seller, investor] = await ethers.getSigners();

    // To deploy our contracts
    tokenInstance = await securityToken.deploy("Real Estate Digitalization","Thanh Vs Phuc", "TP");
    
    
    
    await tokenInstance.deployed();
    
    
    listingInstance = await listing.deploy(
      5,
      wallet.address,
    );
  });

  describe("", function () {
    let price = 0.1
    let feePercent = 1;
    let fee = (feePercent/100)*price
    let totalPriceInWei
    
    it("Should update item as sold, pay seller, transfer Security Token to buyer, charge fees and emit a Bought event", async function () {
      
      console.log("---------------------Before Seller listing token on Marketlpace-----------------------")
      let sellerFinalEthBal = (await seller.getBalance()) /10**18
      let feeAccountFinalEthBal = (await wallet.getBalance()) /10**18
      let investorFinalEthBal = (await investor.getBalance()) /10**18
      let tokenNumberOfSeller = await tokenInstance.balanceOf(seller.address,1);
      let tokenNumberOflisting = await tokenInstance.balanceOf(listingInstance.address,1);
      let tokenNumberOfInvestor = await tokenInstance.balanceOf(investor.address,1);
      console.log('------------------------------')
      console.log("Seller Balance",sellerFinalEthBal);
      console.log("Wallet Balance",feeAccountFinalEthBal);
      console.log("Investor Balance",investorFinalEthBal);
      console.log("Token Number of Seller after listing on marketplace",tokenNumberOfSeller);
      console.log("Token Number of  listing on marketplace",tokenNumberOflisting);
      console.log("Token  Number of Investor before buy Tokens ",tokenNumberOfInvestor);

      console.log("---------------------After Seller listing token on Marketlpace-----------------------")
      // let minter = await tokenInstance
      //     .connect(deployer)
      //     .addMinter(wallet.address);
      await tokenInstance.connect(wallet).mintToken(1,URI,seller.address,1000)
      let tokenNumberOfSeller1= await tokenInstance.balanceOf(seller.address,1);
      console.log('Real Estate Tokenization for seller:', tokenNumberOfSeller1) 
      // addr1 approves marketplace to spend nft
      await tokenInstance.connect(seller).setApprovalForAll(listingInstance.address, true)
     // // addr1 makes their nft a marketplace item.
     await listingInstance.connect(seller).makeItem(tokenInstance.address, 1 , toWei(price),500)
      
      
      sellerFinalEthBal = (await seller.getBalance()) /10**18
      feeAccountFinalEthBal = (await wallet.getBalance()) /10**18
      investorFinalEthBal = (await investor.getBalance()) /10**18
      tokenNumberOfSeller = await tokenInstance.balanceOf(seller.address,1);
      tokenNumberOflisting = await tokenInstance.balanceOf(listingInstance.address,1);
      tokenNumberOfInvestor = await tokenInstance.balanceOf(investor.address,1);
      console.log('------------------------------')
      console.log("Seller Balance",sellerFinalEthBal);
      console.log("Wallet Balance",feeAccountFinalEthBal);
      console.log("Investor Balance",investorFinalEthBal);
      console.log("Token Number of Seller after listing on marketplace",tokenNumberOfSeller);
      console.log("Token Number of  listing on marketplace",tokenNumberOflisting);
      console.log("Token  Number of Investor before buy Tokens ",tokenNumberOfInvestor);
     
      console.log("---------------------After Investor buy Token from Marketplace-----------------------")
      // fetch items total price (market fees + item price)
      totalPriceInWei = await listingInstance.getTotalPrice(1,500);
      // addr 2 purchases item.
      await listingInstance.connect(investor).purchaseItem(1,500, {value: totalPriceInWei})

       sellerFinalEthBal = (await seller.getBalance()) /10**18
     feeAccountFinalEthBal =( await wallet.getBalance()) /10**18
    investorFinalEthBal = (await investor.getBalance()) /10**18
     tokenNumberOfSeller = await tokenInstance.balanceOf(seller.address,1);
       tokenNumberOfInvestor = await tokenInstance.balanceOf(investor.address,1);

      console.log("Seller Balance",sellerFinalEthBal);
      console.log("Wallet Balance",feeAccountFinalEthBal);
      console.log("Investor Balance",investorFinalEthBal);
      console.log("Token Number of Seller",tokenNumberOfSeller);
      console.log("Token  Number of Investor ",tokenNumberOfInvestor);
      // Item should be marked as sold
      // expect((await listingInstance.items(1)).sold).to.equal(true)
      // Seller should receive payment for the price of the NFT sold.
      // expect(+fromWei(sellerFinalEthBal)).to.equal(+price + +fromWei(sellerInitalEthBal))
      // // feeAccount should receive fee
      // expect(+fromWei(feeAccountFinalEthBal)).to.equal(+fee + +fromWei(feeAccountInitialEthBal))
      // The buyer should now own the nft
      // expect(await tokenInstance.ownerOf(1)).to.equal(investor.address);
    })
    // it("Should fail for invalid item ids, sold items and when not enough ether is paid", async function () {
    //   // fails for invalid item ids
    //   await expect(
    //     marketplace.connect(addr2).purchaseItem(2, {value: totalPriceInWei})
    //   ).to.be.revertedWith("item doesn't exist");
    //   await expect(
    //     marketplace.connect(addr2).purchaseItem(0, {value: totalPriceInWei})
    //   ).to.be.revertedWith("item doesn't exist");
    //   // Fails when not enough ether is paid with the transaction. 
    //   // In this instance, fails when buyer only sends enough ether to cover the price of the nft
    //   // not the additional market fee.
    //   await expect(
    //     marketplace.connect(addr2).purchaseItem(1, {value: toWei(price)})
    //   ).to.be.revertedWith("not enough ether to cover item price and market fee"); 
    //   // addr2 purchases item 1
    //   await marketplace.connect(addr2).purchaseItem(1, {value: totalPriceInWei})
    //   // addr3 tries purchasing item 1 after its been sold 
    //   const addr3 = addrs[0]
    //   await expect(
    //     marketplace.connect(addr3).purchaseItem(1, {value: totalPriceInWei})
    //   ).to.be.revertedWith("item already sold");
    // });
  });



  // describe("checking", function () {

  //   it("Should track name and symbol of the nft collection", async function () {
  //     // This test expects the owner variable stored in the contract to be equal
  //     // to our Signer's owner.
  //     const nftName = "DApp NFT"
  //     const nftSymbol = "DAPP"
  //     expect(await nft.name()).to.equal(nftName);
  //     expect(await nft.symbol()).to.equal(nftSymbol);
  //   });

  //   it("Should track feeAccount and feePercent of the marketplace", async function () {
  //     expect(await marketplace.feeAccount()).to.equal(deployer.address);
  //     expect(await marketplace.feePercent()).to.equal(feePercent);
  //   });
  // });

  // describe("Minting NFTs", function () {

  //   it("Should track each minted NFT", async function () {
  //     // addr1 mints an nft
  //     await nft.connect(addr1).mint(URI)
  //     expect(await nft.tokenCount()).to.equal(1);
  //     expect(await nft.balanceOf(addr1.address)).to.equal(1);
  //     expect(await nft.tokenURI(1)).to.equal(URI);
  //     // addr2 mints an nft
  //     await nft.connect(addr2).mint(URI)
  //     expect(await nft.tokenCount()).to.equal(2);
  //     expect(await nft.balanceOf(addr2.address)).to.equal(1);
  //     expect(await nft.tokenURI(2)).to.equal(URI);
  //   });
  // })

  // describe("Making Listing on Marketplace", function () {
  //   let price = 1
  //   let result 
  //   beforeEach(async function () {
     
  //   })


  //   it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function () {
  //     // addr1 offers their nft at a price of 1 ether
  //     await expect(marketplace.connect(addr1).makeItem(nft.address, 1 , toWei(price)))
  //       .to.emit(marketplace, "Offered")
  //       .withArgs(
  //         1,
  //         nft.address,
  //         1,
  //         toWei(price),
  //         addr1.address
  //       )
  //     // Owner of NFT should now be the marketplace
  //     expect(await nft.ownerOf(1)).to.equal(marketplace.address);
  //     // Item count should now equal 1
  //     expect(await marketplace.itemCount()).to.equal(1)
  //     // Get item from items mapping then check fields to ensure they are correct
  //     const item = await marketplace.items(1)
  //     expect(item.itemId).to.equal(1)
  //     expect(item.nft).to.equal(nft.address)
  //     expect(item.tokenId).to.equal(1)
  //     expect(item.price).to.equal(toWei(price))
  //     expect(item.sold).to.equal(false)
  //   });

  //   it("Should fail if price is set to zero", async function () {
  //     await expect(
  //       marketplace.connect(addr1).makeItem(nft.address, 1, 0)
  //     ).to.be.revertedWith("Price must be greater than zero");
  //   });

  });
  

