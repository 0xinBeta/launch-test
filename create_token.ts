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


  

  