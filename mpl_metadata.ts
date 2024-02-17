import {
  Collection,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionDataArgs,
  Creator,
  UpdateMetadataAccountV2InstructionAccounts,
  UpdateMetadataAccountV2InstructionData,
  Uses,
  createMetadataAccountV3,
  updateMetadataAccountV2,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";
import {
  PublicKey,
  createSignerFromKeypair,
  none,
  signerIdentity,
  some,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  fromWeb3JsKeypair,
  fromWeb3JsPublicKey,
} from "@metaplex-foundation/umi-web3js-adapters";
import * as bs58 from "bs58";

export function loadWalletKey(keypairFile: string): web3.Keypair {
  const fs = require("fs");
  const loaded = web3.Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString()))
  );
  return loaded;
}



const INITIALIZE = true;

async function main() {
  console.log("let's name some tokens in 2024!");
  const myKeypair = loadWalletKey("/Users/arefgholami/Desktop/NOAAA/codeWith0xin/spl-token/cybertruckai.json");
  const mint = new web3.PublicKey("2ARa3jb8qSGozwe7uckkmpPoy4rNW2R7wNWeNVh5LTvn");

  const umi = createUmi("https://mainnet.helius-rpc.com/?api-key=b407c362-c02b-46d7-b828-cd12cd7c89c0 ");
  const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(myKeypair));
  umi.use(signerIdentity(signer, true));

  const ourMetadata = {
    "name": "CyberTruck AI",
    "symbol": "$CTAI",
    uri: "https://raw.githubusercontent.com/0xinbeta/launch-test/main/metadata.json",
  };
  const onChainData = {
    ...ourMetadata,
    sellerFeeBasisPoints: 0,
    creators: none<Creator[]>(),
    collection: none<Collection>(),
    uses: none<Uses>(),
  };
  if (INITIALIZE) {
    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint: fromWeb3JsPublicKey(mint),
      mintAuthority: signer,
    };
    const data: CreateMetadataAccountV3InstructionDataArgs = {
      isMutable: false,
      collectionDetails: null,
      data: onChainData,
    };
    const txid = await createMetadataAccountV3(umi, {
      ...accounts,
      ...data,
    }).sendAndConfirm(umi);
    console.log(bs58.encode(txid.signature));
  } 
}

main();
