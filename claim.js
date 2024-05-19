import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK("base");
const contractAddress = "0xE4bCeF51437ab6067f56f2f4c3a8534a33B02Fd0";
const contract = sdk.getContract(contractAddress);

async function connectWallet() {
    const connectOptions = { theme: 'dark', chain: 'base' };
    const walletProvider = await sdk.wallet.connect(connectOptions);
    return walletProvider;
}

async function mintNFT() {
    try {
        const wallet = await connectWallet();
        const address = await wallet.getAddress();
        const balance = await wallet.getBalance();
        console.log(`Connected wallet: ${address} with balance: ${balance}`);

        // Assuming a mint function exists on the contract
        const tx = await contract.call("mintNFT");
        console.log(`Transaction successful: ${tx.hash}`);
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const mintButton = document.getElementById("mintButton");
    if (mintButton) {
        mintButton.addEventListener("click", mintNFT);
    }
});
