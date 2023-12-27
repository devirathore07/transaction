let blockchain = document.querySelector("blockchain");
let blockCount=1;

let blockID;
let name;
createBlock(2);
function createBlock(
  blockID,
  name = "Block 2",
  sender = "Ram",
  receiver = "Shaam",
  amount = 2000,
  href = ""
)
 {
    const hashValue = generateHash();
    const prevHashValue = getPrevHash();
const blockHref = `newPage.html?blockID=${blockID}&name=${name}&sender=${sender}&receiver=${receiver}&amount=${amount}&hash=${hashValue}&prevHash=${prevHashValue}&nonce=0`;
  let newChain = ` <i class="fas fa-link"></i>`;
  let chain = document.createElement("chain-link");

  chain.innerHTML = newChain;

  let newBlock = `

  <div class="card-header">
    <span class="display-4">Block ${blockID} </span>
    <p>
    <a href="${blockHref}" target="_blank" class="text-info">(${name})</a>
    <br> ${sender}<br>${receiver}<br>${amount}
    </p>

  </div>

  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <h5>Hash</h5>
      <span class="hash"
        >${generateHash()}</span
      >
      <h5>Hash of previous block</h5>
      <span class="text-muted"
        >${getPrevHash()}</span
      >
    </li>


    <li class="list-group-item">
      <h6>Timestamp</h6>
      <span class="text-muted">${blockTimestamp()}</span>
    </li>
  </ul>

    `;
  let block = document.createElement("block");
  block.className = "card block";
  block.innerHTML = newBlock;
  //todo: Add new block to the blockchain
  blockchain.append(block);

  //todo: Add new chain to the blockchain
  blockchain.append(chain);
  // blockchain.prepend(chain);
}

function addNewBlock() {
    // Get values from the form
    const blockID = document.getElementById('blockID').value;
    const blockName = document.getElementById('blockName').value;
    const sendername = document.getElementById('sendername').value;
    const recieverName = document.getElementById('recieverName').value;
    const amount = document.getElementById('amount').value;
    const blockHref = document.getElementById('blockHref').value;
  
    // Add a new block with the user-input values
    createBlock(parseInt(blockID), blockName, sendername, recieverName, parseInt(amount), blockHref);
  
    // Increment block count
    blockCount++;
  
    // Update the block count in the UI
    document.getElementById('nrBlocks').innerText = blockCount;
  
    // Clear the form for the next input
    document.getElementById('blockForm').reset();
  }


// Function to generate a new random Hash

function generateHash() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 256; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getPrevHash() {
    let blocks = blockchain.children;
  
    // Check if there's at least one block in the blockchain
    if (blocks.length > 1) {
      // Get the hash of the last block (previous block)
      let prevBlock = blocks[blocks.length - 2];
      return prevBlock.querySelector('.hash').innerText;
    } else {
      // If there's only one block, return a default value (e.g., genesis block hash)
      return "GenesisBlockHash";
    }
  }
  

//   function mineBlock(blockID, name = "Block 2", sender = "Ram", receiver = "Shaam", amount = 2000, href = "https://github.com/NorbertBM") {
//     let nonce = 0;
//     let hash;
  
//     do {
//       nonce++;
//       hash = generateHashWithNonce(blockID, name, sender, receiver, amount, href, nonce);
//     } while (!hashMeetsCriteria(hash));
  
//     // Once a valid hash is found, create the block
//     createBlock(blockID, name, sender, receiver, amount, href, nonce);
//   }
  
//   function generateHashWithNonce(blockID, name, sender, receiver, amount, href, nonce) {
//     const hashValue = generateHash();
//     const prevHashValue = getPrevHash();
//     const blockHref = `newPage.html?blockID=${blockID}&name=${name}&sender=${sender}&receiver=${receiver}&amount=${amount}&hash=${hashValue}&prevHash=${prevHashValue}&nonce=${nonce}`;
    
//     // Concatenate relevant data and compute the hash
//     const dataToHash = `${blockID}${name}${sender}${receiver}${amount}${href}${nonce}${prevHashValue}`;
//     const computedHash = generateHash(dataToHash);
  
//     return computedHash;
//   }
  


function blockTimestamp() {
  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return (dateString =
    currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear);
}
console.log(blockTimestamp());
