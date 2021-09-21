"use strict";

var crypto = require("crypto");


var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	Blockchain.blocks.push(createBlock(line, Blockchain.blocks[Blockchain.blocks.length -1]))

}

function verifyChain(blockchn){
	var trutharray = []
	// ensuring genesis block starts with hash '000000'
	var gen = blockchn.blocks[0]
	if (gen.hash === '000000'){
		trutharray.push(true)
	}else {
		trutharray.push(false)
	}

	for(let i = 1, l = blockchn.blocks.length; i<l; i++){
		// starting loop from 1 to remove the genesis block
		var block = blockchn.blocks[i]

		var verify = block['data'] && block['prevHash'] && block.index >= 0 && block.hash === blockHash(block) && block.hash !== '000000'

		// verifying the linkage between one block and the next
		if (i >= 2){
			var prevblock = blockchn.blocks[i-1]
			var verifychain = block.prevHash === prevblock.hash
			trutharray.push(verifychain)
		}
		trutharray.push(verify)
	}
	var result = trutharray.every(t => t === true)
	return result
}

function createBlock(text, prevblock){
	var block = {
		index : prevblock.index + 1,
		prevHash : prevblock.hash,
		data : text,
		timestamp : Date.now(),
	}
	block.hash = blockHash(block)
	// console.log(block)
	return block
}


console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		`${bl.index};${bl.prevHash};${bl.data};${bl.timestamp}`
	).digest("hex");
}
