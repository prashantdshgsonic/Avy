
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const { Keypair, Connection } = require('@solana/web3.js'); // Add this line
const { PublicKey } = require('@solana/web3.js');
const { fetchDigitalAsset, verifyCollectionV1 } = require('@metaplex-foundation/mpl-token-metadata');
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { publicKey, base58 } = require('@metaplex-foundation/umi');
const { mplTokenMetadata, createNft, updateV1,fetchMetadataFromSeeds, findMetadataPda , createFungible} = require('@metaplex-foundation/mpl-token-metadata');
const { fetchAssetsByCollection, fetchCollection, createCollection } = require('@metaplex-foundation/mpl-core');
const { generateSigner, createSignerFromKeypair, signerIdentity, percentAmount } = require('@metaplex-foundation/umi');
const { irysUploader } = require("@metaplex-foundation/umi-uploader-irys");
const { Metaplex, keypairIdentity, bundlrStorage } = require('@metaplex-foundation/js'); // Ensure this line is correct
const { dasApi } = require("@metaplex-foundation/digital-asset-standard-api");
const { createMint, getOrCreateAssociatedTokenAccount, mintTo,transferChecked } = require('@solana/spl-token');
const multer = require('multer');
const { createGenericFileFromBrowserFile ,createGenericFile} = require("@metaplex-foundation/umi");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Setup Umi with RPC and plugins
const umi = createUmi(process.env.RPC_URL || 'https://api.devnet.solana.com', 'finalized')
  .use(mplTokenMetadata())
  .use(
    irysUploader({
      address: "https://devnet.irys.xyz",
    })
  );

// Load the main wallet from your secret key
const wallet = JSON.parse(process.env.WALLET_SECRET_KEY || "[]");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const adminSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(adminSigner));
// console.log("Admin Public Key:", adminSigner.publicKey.toString());

// Load the collection authority keypair
const collectionAuthoritySecretKey = JSON.parse(process.env.WALLET_SECRET_KEY || "[]");
const collectionAuthorityKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(collectionAuthoritySecretKey));
const collectionAuthoritySigner = createSignerFromKeypair(umi, collectionAuthorityKeypair);

// Set the collection authority as the current identity
umi.use(signerIdentity(collectionAuthoritySigner));

// Helper function to safely stringify BigInt values
function safeStringify(key, value) {
  return typeof value === 'bigint' ? value.toString() : value;
}

// Helper function for verifying a collection association
const verifyCollectionF = async (umi, assetPublicKey, collectionMintAddress) => {
    try {
        const metadata = findMetadataPda(umi, { mint: assetPublicKey });

        const verifyTx = await verifyCollectionV1(umi, {
            metadata,
            collectionMint: publicKey(collectionMintAddress),
            authority: umi.identity,
        }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

        const txSignature = base58.deserialize(verifyTx.signature)[0];
        console.log('Collection Verified: https://solana.fm/tx/' + txSignature + '?cluster=devnet-alpha');

        return verifyTx;
    } catch (error) {
        console.error("Collection verification error details:", error);
        throw error;
    }
};

// Initialize Metaplex
const connection = new Connection(process.env.RPC_URL || 'https://api.devnet.solana.com', 'finalized');
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))

// const collectionMint = new PublicKey("2XRHRHuu9RY2kFB489YeJRftZz9PiLG1GLr2oKA3uc7b");

function bigIntToString(obj) {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
  ));
}

// Endpoint to fetch all collection data
// app.post('/api/all-collections', async (req, res) => {
//   try {
//     const umi = createUmi(
//       "https://devnet.helius-rpc.com/?api-key=cd7f78c9-15e8-4246-88a0-67d10d22b07a"
//     );
    
//     umi.use(dasApi());
    
//     // Fetch all assets owned by the admin wallet
//     const assets = await umi.rpc.getAssetsByOwner({
//       owner: adminSigner.publicKey.toString()
//     });
    
//     console.log('Total assets found:', assets.items.length);
//     const filePath = path.join(__dirname, 'assets_items.txt');
//     fs.writeFileSync(filePath, JSON.stringify(assets.items, null, 2), 'utf8');

//     console.log('Assets saved to:', filePath);
    
//     // Look for assets that might be collections
//     const collections = assets.items
//       .filter(asset => {
//         // Check if any part of the metadata suggests it's a collection
//         const metadata = asset.content?.metadata;
//         const isCollectionExplicit = metadata?.isCollection === true;
        
//         // Check for any properties that might indicate a collection
//         const properties = metadata?.properties || {};
//         const isCollectionInProps = properties.isCollection === true;
        
//         return isCollectionExplicit || isCollectionInProps;
//       })
//       .map(asset => ({
//         address: asset.id,
//         name: asset.content?.metadata?.name || "Unknown"
//       }));
    
//     res.json({ collections });
//   } catch (error) {
//     console.error('Error fetching collections:', error);
//     res.status(500).json({ error: 'Failed to fetch collections' });
//   }
// });
app.post('/api/all-collections', async (req, res) => {
  try {
    const umi = createUmi(
      "https://devnet.helius-rpc.com/?api-key=cd7f78c9-15e8-4246-88a0-67d10d22b07a"
    );
    
    umi.use(dasApi());
    
    // Fetch all assets owned by the admin wallet
    const assets = await umi.rpc.getAssetsByOwner({
      owner: adminSigner.publicKey.toString()
    });
    
    console.log('Total assets found:', assets.items.length);
    
    // Fetch each asset's full metadata JSON
    const collections = [];
    const promises = assets.items.map(async (asset) => {
      if (asset.content?.json_uri) {
        try {
          const response = await fetch(asset.content.json_uri);
          if (response.ok) {
            const fullMetadata = await response.json();
            // Check if this is a collection
            if (fullMetadata.isCollection === true) {
              collections.push({
                address: asset.id,
                name: asset.content?.metadata?.name || fullMetadata.name || "Unknown"
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching metadata for ${asset.id}:`, error.message);
        }
      }
    });
    
    // Wait for all metadata fetches to complete
    await Promise.all(promises);
    
    res.json({ collections });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});





// Endpoint to fetch collection data
app.post('/api/collection-data', async (req, res) => {
  const { collectionMintAddress } = req.body;
  if (!collectionMintAddress) {
      return res.status(400).json({ error: 'collectionMintAddress is required.' });
  }

  try {
      // Fetch the collection asset
      const asset = await fetchDigitalAsset(umi, collectionMintAddress);
      console.log("Asset:", asset);

      // Fetch the NFTs inside the collection
      const umi2 = createUmi(
        "https://devnet.helius-rpc.com/?api-key=cd7f78c9-15e8-4246-88a0-67d10d22b07a"
      );
      
      // Add the DAS API plugin
      umi2.use(dasApi());
      
      // Get assets by group (collection)
      const assets = await umi2.rpc.getAssetsByGroup({
        groupKey: "collection",
        groupValue: collectionMintAddress 
      });
      const safeAssets = JSON.parse(JSON.stringify(assets, (key, value) => 
        typeof value === 'bigint' ? value.toString() : value
      ));
      console.log("Assets in Collection:", safeAssets);

      res.json({  collectionData: bigIntToString(asset),
        assets: bigIntToString(assets), });
  } catch (error) {
      console.error('Error fetching collection data:', error);
      res.status(500).json({ error: 'Failed to fetch collection data' });
  }
});

// endpoint for collection creation
app.post('/api/create-collection', asyncHandler(async (req, res) => {
  const { name, symbol, description,imageUri,  externalUrl, attributes } = req.body;
  console.log('Request:', req.body);
  
  console.log('imageUri ',imageUri)

  if (!name || !symbol || !description ) {
    return res.status(400).json({ error: 'Name, symbol, description, and imageFile are required.' });
  }
  try {

    const path = require("path");
 
    // If running in WSL, convert the path
    if (process.platform !== "win32") {
      imageUri2 = imageUri.replace(/^H:\\/, "/mnt/h/").replace(/\\/g, "/");
    }
    
    console.log("Final file path:", imageUri2);
    
    const fs = require("fs");
   
      const fileContent = fs.readFileSync(imageUri2);
      console.log("File read successfully");

    const file = createGenericFile(fileContent, 'my-image.jpg', { tags: [{ name: 'Content-Type', value: 'image/jpeg' }] });
    const [imageUri3] = await umi.uploader.upload([file]);
    console.log('Image URI:', imageUri3);
  
    // Generate a new keypair for the collection
    const collection = generateSigner(umi);
    console.log('Collection address:', collection.publicKey.toString());

    // Prepare metadata for the collection NFT
    const metadata = {
      name,
      symbol,
      description,
      image: imageUri3,
      external_url: externalUrl,
      attributes: (() => {
        const parsedAttributes = typeof attributes === "string" ? JSON.parse(attributes) : attributes;
        if (Array.isArray(parsedAttributes) && parsedAttributes.every(attr => typeof attr === "string")) {
          return parsedAttributes.map((attr, index) => ({
            trait_type: index === 0 ? "course" : "level", // Adjust labels dynamically
            value: attr
          }));
        }
        return parsedAttributes; // Return as-is if already correctly structured
      })(),
      properties: {
        files: [
          {
            uri: imageUri3,
            type: 'image/jpeg',
          },
        ],
        category: 'image',
      },
      isCollection: true,
    };

    console.log('Uploading metadata...');
    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
      throw new Error(err);
    });
    console.log('Metadata URI:', metadataUri);

    // Optionally log the Metadata PDA
    try {
      const metadataPda = findMetadataPda(umi, { mint: collection.publicKey });
      console.log('Metadata PDA:', metadataPda.toString());
    } catch (error) {
      console.error('Error finding metadata PDA:', error);
    }

    // Create the collection using mpl-core's createCollection
    const tx = await createNft(umi, {
        mint: collection,
        name,
        uri: metadataUri,
        sellerFeeBasisPoints: percentAmount(0),
        isCollection: true,
      }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

    // Deserialize the transaction signature
    const txSignature = base58.deserialize(tx.signature)[0];
    console.log('Collection Created: https://solana.fm/tx/' + txSignature + '?cluster=devnet-alpha');

    res.json({
      message: 'Collection created successfully.',
      collectionAddress: collection.publicKey.toString(),
      transactionUrl: `https://solana.fm/tx/${txSignature}?cluster=devnet-alpha`,
      metadataUri,
    });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'Failed to create collection' });
  }
}));





// Endpoint to edit a collection NFT
app.post('/api/edit-collection', asyncHandler(async (req, res) => {
  const { collectionAddress, name, description, imageUri, externalUrl, attributes } = req.body;
  if (!collectionAddress) {
    return res.status(400).json({ error: 'Collection address is required.' });
  }
  
  try {
    const collectionPublicKey = new PublicKey(collectionAddress);
    
    // Prepare the updated metadata
    const updatedMetadata = {
      name, 
      description, 
      image: imageUri, 
      external_url: externalUrl, 
      attributes,
      // Optionally update properties if needed
    };
    
    // Call the update function provided by your library (updateNft or updateMetadata)
    const initialMetadata = await fetchMetadataFromSeeds(umi, { mint: collectionPublicKey })
    console.log('Initial Metadata:', initialMetadata.updateAuthority.toString());
    const tx = await updateV1(umi, {
      mint: collectionPublicKey,
      authority: initialMetadata.updateAuthority.toString(),
      data: { ...initialMetadata, name: 'Updated Asset' },
      isMutable: true,
      // ...
    }).sendAndConfirm(umi)
    // const tx = await updateNft(umi, {
    //   mint: collectionPublicKey,
    //   ...updatedMetadata,
    // }).sendAndConfirm(umi, { send: { commitment: "finalized" } });
    
    res.json({
      message: 'Collection updated successfully.',
      transactionUrl: `https://solana.fm/tx/${tx.signature}?cluster=devnet-alpha`,
    });
  } catch (error) {
    console.error('Error updating collection:', error);
    res.status(500).json({ error: 'Failed to update collection',error });
  }
}));

app.get('/api/get', (req, res) => {
  res.send('hello');
});

// Endpoint to create an asset (NFT) within a collection
app.post('/api/create-asset', asyncHandler(async (req, res) => {
  const { holderEmail, level,  courseCode,nftImage, holder, collectionMintAddress,category,titleCourse,description } = req.body;
  console.log('req ',req.body)
  console.log('Collection Mint Address:', collectionMintAddress);
  const path = require("path");

  if (process.platform !== "win32") {
    imageUri2 = nftImage.replace(/^H:\\/, "/mnt/h/").replace(/\\/g, "/");
  }

  const fs = require("fs");
    
      const fileContent = fs.readFileSync(imageUri2);
      console.log("File read successfully");
   
    const file = createGenericFile(fileContent, 'my-image.jpg', { tags: [{ name: 'Content-Type', value: 'image/jpeg' }] });
    console.log('File:', file);
    const [imageUri3] = await umi.uploader.upload([file]);
  
  try {
    // Prepare metadata for the asset
    const metadata = {
      name:titleCourse,
      description,
      image: imageUri3,
      attributes: [
        { "trait_type": "holderEmail", "value": holderEmail },
        { "trait_type": "level", "value": level },
        { "trait_type": "courseCode", "value": courseCode },
        { "trait_type": "description", "value": description },
        { "trait_type": "holder", "value": holder },
        { "trait_type": "category", "value": category },
        { "trait_type": "titleCourse", "value": titleCourse }
      ],
      properties: {
        files: [
          {
            uri: imageUri3,
            type: 'image/jpeg',
          },
        ],
        category: 'image',
      },
      collection:{
        key: publicKey(collectionMintAddress),
        verified: false,
      }
      
    };

    console.log('Uploading metadata...');
    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
      throw new Error(err);
    });
    console.log('Metadata URI:', metadataUri);

    // Generate a new keypair for the asset
    const asset = generateSigner(umi);
    console.log("Asset address:", asset.publicKey.toString());

    // Create the asset NFT with the collection field set
    const tx = await createNft(umi, {
        mint: asset,
        name: metadata.name,
        symbol: "ByAni",
        uri: metadataUri,
        sellerFeeBasisPoints: percentAmount(0), // for 0% royalties
        updateAuthority: umi.identity.publicKey,
        isMutable:false,
        collection: {                     
            key: publicKey(collectionMintAddress),
            verified: false
        },
    }).sendAndConfirm(umi, { send: { commitment: "finalized" } });
    
    // Deserialize the transaction signature
    const txSignature = base58.deserialize(tx.signature)[0];
    console.log('Asset Created: https://solana.fm/tx/' + txSignature + '?cluster=devnet-alpha');
    
    // Verify the collection association on-chain in a separate transaction
    await verifyCollectionF(umi, asset.publicKey, collectionMintAddress);
    
    // Fetch the created asset to verify association with the collection
    const createdAsset = await fetchDigitalAsset(umi, asset.publicKey);
    console.log('Created Asset:', createdAsset);

    res.json({
      message: 'Asset created successfully.',
      assetAddress: asset.publicKey.toString(),
      transactionUrl: `https://solana.fm/tx/${txSignature}?cluster=devnet-alpha`,
      tx,
      metadataUri,
    });
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
}));


// Endpoint to mint tokens
app.post('/api/mint-tokens', asyncHandler(async (req, res) => {
  const { name, symbol, decimals, amount } = req.body;
  if (!name || !symbol || !decimals || !amount) {
    return res.status(400).json({ error: 'Name, symbol, decimals, and amount are required.' });
  }

  try {
    console.log("Creating Token...");

    // Create the Token mint
    const tokenMint = generateSigner(umi);

    const mintTx = await createFungible(umi, {
      mint: tokenMint,
      name,
      symbol,
      decimals,
      uri: "", // Optional metadata link
      sellerFeeBasisPoints: percentAmount(0),
    }).sendAndConfirm(umi);

    const txSignature = base58.deserialize(mintTx.signature)[0];
    console.log("Token Created: https://solana.fm/tx/" + txSignature);
    console.log("Token Mint Address:", tokenMint.publicKey.toString());

    const tokenMintPublicKey = new PublicKey(tokenMint.publicKey.toString());

    // Mint tokens to Admin Wallet
    console.log(`Minting ${amount} ${symbol} to Admin Wallet...`);
    const adminWalletPubkey = new PublicKey(keypair.publicKey.toString());

    // Get or create an associated token account for admin
    const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      Keypair.fromSecretKey(new Uint8Array(wallet)), // Admin wallet
      tokenMintPublicKey, // Token Mint Address
      adminWalletPubkey // Owner of the token account
    );

    console.log(`Minting ${amount} ${symbol} to Admin Wallet...adminTokenAccount`, adminTokenAccount);

    // Mint tokens to admin's token account
    await mintTo(
      connection,
      Keypair.fromSecretKey(new Uint8Array(wallet)), // Admin wallet
      tokenMintPublicKey, // Token Mint Address
      adminTokenAccount.address, // Admin's Token Account
      adminWalletPubkey, // Authority that can mint tokens
      amount * 10 ** decimals // Mint the specified amount of tokens
    );

    console.log(`✅ Successfully minted ${amount} ${symbol} to Admin!`);
    console.log("Admin Token Account:", adminTokenAccount.address.toString());

    res.json({
      message: `Successfully minted ${amount} ${symbol} to Admin!`,
      tokenMintAddress: tokenMint.publicKey.toString(),
      adminTokenAccount: adminTokenAccount.address.toString(),
      transactionUrl: `https://solana.fm/tx/${txSignature}?cluster=devnet-alpha`
    });
  } catch (error) {
    console.error('Error minting tokens:', error);
    res.status(500).json({ error: 'Failed to mint tokens' });
  }
}));


// Endpoint to transfer tokens
app.post('/api/transfer-tokens', asyncHandler(async (req, res) => {
  const { recipientAddress, mintAddress, amount } = req.body;
  if (!recipientAddress || !mintAddress || !amount) {
    return res.status(400).json({ error: 'Recipient address, mint address, and amount are required.' });
  }

  try {
    // Connect to the Solana Devnet
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Load the admin's keypair from the wallet file
    const adminKeypair = Keypair.fromSecretKey(new Uint8Array(wallet));

    // Define the recipient's public key
    const recipientPublicKey = new PublicKey(recipientAddress);

    // Define the mint address of the token
    const tokenMintAddress = new PublicKey(mintAddress);

    // Define the amount to transfer (convert to smallest unit)
    const amountToTransfer = amount * 10 ** 6; // Assuming 6 decimals



     // Get the admin's token account
     const adminTokenAccount1 = await getOrCreateAssociatedTokenAccount(
      connection,
      adminKeypair,
      tokenMintAddress,
      adminKeypair.publicKey
    );

    // Check admin's token balance before transfer
    const balance = await connection.getTokenAccountBalance(adminTokenAccount1.address);
    const availableBalance = Number(balance.value.amount);

    if (availableBalance < amountToTransfer) {
      return res.status(400).json({ 
        error: 'Insufficient funds', 
        available: availableBalance / 10 ** 6,
        requested: amount 
      });
    }


    // Get or create the associated token account for the recipient
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      adminKeypair, // Payer
      tokenMintAddress, // Mint address
      recipientPublicKey // Owner of the token account
    );

    // Get or create the associated token account for the admin
    const umi = createUmi("https://api.devnet.solana.com", "finalized");
    const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
    const adminWalletPubkey = new PublicKey(keypair.publicKey.toString());
    const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      Keypair.fromSecretKey(new Uint8Array(wallet)), // Admin wallet
      tokenMintAddress, // Token Mint Address
      adminWalletPubkey // Owner of the token account
    );

    // Transfer tokens to the recipient's token account
    const transactionSignature = await transferChecked(
      connection,
      adminKeypair, // Payer and signer
      adminTokenAccount.address, // Sender's token account
      tokenMintAddress, // Mint address
      recipientTokenAccount.address, // Recipient's token account
      adminKeypair, // Owner of the sender's token account
      amountToTransfer, // Amount to transfer (in the smallest unit)
      6 // Decimals of the token
    );

    console.log('✅ Successfully transferred tokens!');
    console.log('Transaction Signature:', transactionSignature);

    res.json({
      message: `Successfully transferred ${amount} tokens to ${recipientAddress}!`,
      transactionSignature: transactionSignature,
      recipientTokenAccount: recipientTokenAccount.address.toString(),
      adminTokenAccount: adminTokenAccount.address.toString(),
    });
  } catch (error) {
    console.error('Error transferring tokens:', error);
    res.status(500).json({ error: 'Failed to transfer tokens' });
  }
}));

const { transferV1 } = require('@metaplex-foundation/mpl-core');
const { transfer } = require('@metaplex-foundation/mpl-bubblegum');
const {
    fetchDigitalAssetWithAssociatedToken,
    findTokenRecordPda,
    TokenStandard,
    // getMplTokenAuthRulesProgramId  <-- REMOVE THIS LINE
} = require('@metaplex-foundation/mpl-token-metadata');
const { getMplCandyMachineId } = require('@metaplex-foundation/mpl-candy-machine'); // <-- ADD THIS LINE
const { findAssociatedTokenPda } = require('@metaplex-foundation/mpl-toolbox');
const { unwrapOptionRecursively } = require('@metaplex-foundation/umi');

// Endpoint to transfer an NFT
// Endpoint to transfer an asset (NFT) to a new wallet
app.post('/api/transfer-nft', asyncHandler(async (req, res) => {
  const { assetAddress, destinationWallet } = req.body;
  
  if (!assetAddress || !destinationWallet) {
    return res.status(400).json({ error: 'Asset address and destination wallet are required.' });
  }
  
  console.log('Transferring asset:', assetAddress, 'to wallet:', destinationWallet);
  
  try {
    // Fetch the asset
    const asset = await fetchDigitalAsset(umi, publicKey(assetAddress));
    console.log('Asset:', asset);
    
    // Find the current owner by checking the token account
    // We need to find the associated token account for this mint
    const tokenAccount = findAssociatedTokenPda(umi, {
      mint: publicKey(assetAddress),
      owner: umi.identity.publicKey, // Assuming the current wallet is the owner
    });
    
    console.log('Token account:', tokenAccount.toString());
    
    // Get token account info to verify ownership
    const tokenInfo = await getAccount(umi.rpc.getConnection(), tokenAccount);
    console.log('Token info:', tokenInfo);
    
    // Create a transfer instruction
    const transferIx = await transferV1(umi, {
      source: tokenAccount,
      destination: getAssociatedTokenAddressSync(
        publicKey(assetAddress),
        publicKey(destinationWallet),
        true // allowOwnerOffCurve
      ),
      asset: publicKey(assetAddress),
      amount: 1, // For NFTs, amount is always 1
      authority: umi.identity, // The current wallet must be the authority
    });
    
    // Execute the transfer transaction
    const tx = await transferIx.sendAndConfirm(umi, { 
      send: { commitment: "finalized" } 
    });
    
    // Deserialize the transaction signature
    const txSignature = base58.deserialize(tx.signature)[0];
    console.log('Asset Transferred: https://solana.fm/tx/' + txSignature + '?cluster=devnet-alpha');
    
    res.json({
      message: 'Asset transferred successfully.',
      assetAddress: assetAddress,
      newOwner: destinationWallet,
      transactionUrl: `https://solana.fm/tx/${txSignature}?cluster=devnet-alpha`,
      tx
    });
  } catch (error) {
    console.error('Error transferring asset:', error);
    
    // Handle common transfer errors
    if (error.message?.includes('insufficient funds')) {
      return res.status(400).json({ error: 'Insufficient funds for transaction' });
    } else if (error.message?.includes('owner mismatch') || error.message?.includes('not owned')) {
      return res.status(403).json({ error: 'Current wallet does not own this asset' });
    } else if (error.message?.includes('account not found')) {
      return res.status(404).json({ error: 'Token account not found, asset may not belong to current wallet' });
    }
    
    res.status(500).json({ error: 'Failed to transfer asset: ' + error.message });
  }
}));

// Alternative transfer approach using SPL Token program directly
app.post('/api/transfer-asset-spl', asyncHandler(async (req, res) => {
  const { assetAddress, destinationWallet } = req.body;
  
  if (!assetAddress || !destinationWallet) {
    return res.status(400).json({ error: 'Asset address and destination wallet are required.' });
  }
  
  try {
    // Use the existing connection instance
    const mintPublicKey = new PublicKey(assetAddress);
    const destinationPublicKey = new PublicKey(destinationWallet);
    const adminKeypair = Keypair.fromSecretKey(new Uint8Array(wallet));
    
    // Get the source token account (current owner)
    const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      adminKeypair,
      mintPublicKey,
      adminKeypair.publicKey
    );
    
    // Get or create the destination token account
    const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      adminKeypair,
      mintPublicKey,
      destinationPublicKey
    );

    // Transfer the NFT
    const signature = await transferChecked(
      connection,
      adminKeypair,
      sourceTokenAccount.address,
      mintPublicKey,
      destinationTokenAccount.address,
      adminKeypair,
      1, // amount (always 1 for NFTs)
      0  // decimals (0 for NFTs)
    );
    
    console.log('Asset Transferred: https://solana.fm/tx/' + signature + '?cluster=devnet-alpha');
    
    res.json({
      message: 'Asset transferred successfully.',
      assetAddress: assetAddress,
      newOwner: destinationWallet,
      transactionUrl: `https://solana.fm/tx/${signature}?cluster=devnet-alpha`,
      signature
    });
  } catch (error) {
    console.error('Error transferring asset:', error);
    res.status(500).json({ error: 'Failed to transfer asset: ' + error.message });
  }
}));


app.post('/api/check-token-balance', asyncHandler(async (req, res) => {
  const { walletAddress, mintAddress } = req.body;
  
  if (!walletAddress || !mintAddress) {
    return res.status(400).json({ 
      error: 'Wallet address and token mint address are required.' 
    });
  }

  try {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const walletPublicKey = new PublicKey(walletAddress);
    const mintPublicKey = new PublicKey(mintAddress);

    // Get the token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      Keypair.fromSecretKey(new Uint8Array(wallet)), // Payer
      mintPublicKey,
      walletPublicKey
    );

    // Get the balance
    const balance = await connection.getTokenAccountBalance(tokenAccount.address);

    res.json({
      mint: mintAddress,
      owner: walletAddress,
      tokenAccount: tokenAccount.address.toString(),
      balance: {
        amount: balance.value.amount,
        decimals: balance.value.decimals,
        uiAmount: balance.value.uiAmount,
        uiAmountString: balance.value.uiAmountString
      }
    });

  } catch (error) {
    console.error('Error checking token balance:', error);
    res.status(500).json({ 
      error: 'Failed to check balance',
      details: error.message 
    });
  }
}));

// Start the Express server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`API server is listening on port ${PORT}`);
// });
app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});

// curl -X POST http://localhost:5000/api/transfer-tokens \
//   -H "Content-Type: application/json" \
//   -d '{
//     "recipientAddress": "CtMjND8bKTwtjSc468PmnuUoj9791YfFLdR7oxW5pS7i",
//     "mintAddress": "CMheYBtxj3enwjSwSKyjhiefH8zXTcLh6ShiSVJf3KRh",
//     "amount": 5
//   }'