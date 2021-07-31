# EthDrop
An webapp &amp; smart contracts for airdropping ether

<br/>

Live Demo: [https://tdd-solidity.github.io/EthDrop/](https://tdd-solidity.github.io/EthDrop/)

<br/>

# Local Development

First, clone this repo.

We recommend node v14.

Open one terminal for the smart contracts and development server in the root directory of the repo.

Open another terminal for the react frontend in the "client" directory of the repo.

<br/>

# Running Smart Contracts Locally

Note the port you have set in your `truffle.config.js` file. By default it is `8545`.

Before running the develop command, it's a good idea to run this and make sure nothing is running on the specific oprt you are about to use:
```
lsof -i :8545
```

If there is any output for the above command that's bad becuase it means you already have something running on that port. Try closing other running teminals windows, and close down ganache if you have it open.

Once you can run the lsof command and get nothing as the output, you're ready to build and deploy the smart contracts to your local blockchain.

Build the solidity code for your smart contracts:
```
truffle build
```

Then run a local blockchain:
```
truffle develop
```

Once it starts up, migrate your newly compiled contracts:
```
migrate
```

<br/>

## Configuring MetaMask

Metamask is great for development, but it can be tricky to understand at first.

The key is that you need to have both the _network_ selected to your locally running network (eg. localhost:8545), **AND** a user connected to that network with either.

Look in the output from running `truffle develop`. It should be something like this:
```
Truffle Develop started at http://127.0.0.1:8545/

Accounts:
(0) 0x5fcb28adbbec951473e9f30d9de0cb49709a94a8
(1) 0x92c459e1092ff73a17322460c332875be9f9130e
(2) 0xd4eafaad9a37b2af145ca1a160cc9e6204e59812
(3) 0xf5479fbc6f4f0c681da4c07f1cac45326be6e7ed
(4) 0xa950396e3a6e26e2c3596d8fc75f83df19d10595
(5) 0x0efcfbe517a3db31d1a8a78a5dc9d42aa50f0796
(6) 0x58718e54ddee7f27895b53859549c146e0df5cbb
(7) 0x6cc9966b3fcdc42208b82d849e16ac5b47f5a460
(8) 0xa9e5c2da408875be328be00c9959fd195fa4b63a
(9) 0xbb400722badf463e380884bae509d7b3d5c5897e

Private Keys:
(0) c691fb7c424b8815f6aeb02612bb0fa025f58730db3966f22d1af6cb39e1f38d
(1) 9b3cb23bf2ea4c680f5b8aba672c5ae9216737cac913b22c0cf34cca04b8015a
(2) 86e1d44e7f2b02f7e9eeef5373c456e071fac1039a8a59c6f1feba5232e8b73d
(3) 480f172dddb74a1e1469ea36a146c124fcdec2f9a2d6dab0794284af3d04e2e0
(4) 105a53bb8dfd7d578fe52e8ce37d17d5a15bc9b07f3101c3d5be59b4d5f4c6a6
(5) f52df0d6f6e2513873f7c200652cd4e72e1cedfa665f6d8e8f5085f226121e48
(6) e8fa829280f5771183fc6f02c02d9a67d81035b90925437d2c506468d6ea82db
(7) 9fe36532b3d32d4c726ecac40da2f9835433a353378cfd27f8b38133176ed151
(8) 7317a7bf068430ad3c2f9b5daa9594fd15baee358c6b4669b1332d00b74df8ae
(9) 4c199901c648cdc3ba947f2ab2c3b56f308270bce81dd40450c449e6c5a1cc77

Mnemonic: control walk normal basic expose charge meadow forum broom same dust damage

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.
```

In Metamask, we can add out local network by clicking "Custom RPC" and then entering the desired network details.


We can use the private key of the first account, `c691fb7c424b8815f6aeb02612bb0fa025f58730db3966f22d1af6cb39e1f38d`, and paste that into the input when adding a new user (by clicking on the user circle in the upper-right hand corner and then clicking "import account").


Check that you have the correct user selected in MetaMask by ensuring the first and last four characters match up in metamask and your truffle develop output, in this case it should be: `0x5fcb...94a8`.

If in Metamask to the left of the address is says "Not connected", click on the Not Connected button and connect with that account.


<br/>

## If you see the error, "This contract object doesn't have address set yet, please set an address first."

// TODO

<br/>

# Scaffolded from the [react truffle box](https://www.trufflesuite.com/boxes/react).

