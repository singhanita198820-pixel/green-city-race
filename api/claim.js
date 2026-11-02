// api/claim.js - Real TURBO26 Airdrop Backend on BSC
import { ethers } from "ethers";

const CONTRACT = "0x5a11075C985404288497c59778179b8fE2559d6d";
const ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function balanceOf(address) view returns (uint)",
  "function decimals() view returns (uint8)"
];

// Simple in-memory rate limit - use Upstash Redis for production
const claimed = new Map();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({error:"Use POST"});

  try {
    const { wallet, chain } = req.body;
    
    if (!wallet || !ethers.isAddress(wallet)) {
      return res.status(400).json({error:"Invalid wallet address"});
    }

    // Anti-spam: 1 claim per wallet per 24h
    if (claimed.has(wallet.toLowerCase())) {
      const last = claimed.get(wallet.toLowerCase());
      if (Date.now() - last < 24*60*60*1000) {
        return res.status(429).json({error:"Already claimed in last 24h", code:"TURBO26"});
      }
    }

    // Setup signer - PUT YOUR PRIVATE KEY IN VERCEL ENV!
    const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    const signer = new ethers.Wallet(process.env.AIRDROP_PRIVATE_KEY, provider);
    const token = new ethers.Contract(CONTRACT, ABI, signer);
    
    const decimals = await token.decimals();
    const amount = ethers.parseUnits("26", decimals); // 26 TURBO26 per claim

    // Check balance
    const bal = await token.balanceOf(signer.address);
    if (bal < amount) {
      return res.status(500).json({error:"Airdrop wallet empty, top up TURBO26"});
    }

    // Send token
    const tx = await token.transfer(wallet, amount);
    claimed.set(wallet.toLowerCase(), Date.now());

    return res.status(200).json({
      success:true,
      code:"TURBO26",
      txHash: tx.hash,
      amount:"26",
      bscscan:`https://bscscan.com/tx/${tx.hash}`,
      message:"26 TURBO26 sent on BSC!"
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({error:e.message});
  }
}
