.env for blockchain
RPC_URL=
COLLECTION_MINT_ADDRESS=
WALLET_SECRET_KEY = 
COLLECTION_AUTHORITY_SECRET_KEY= 



Creation of wallet/phantom wallet
Enable users to choose nft image(provide them with the 4-5 images to choose from upon a course completion)
This one is more information than a question. Ronnie would like to see at least 2 more levels in the game for diversity and enhanced experience .
 Now we can observe just one town with the same characters and trails in the game.

 minimum viable production should contain wallet, blockchain, tokens, nft, certifications , 2 more levels of game and enhanced LMS. 
 At this point we could launch our tokens and overall system


 If you're already performing these operations, you're already using a wallet -
  specifically, the one associated with the secret key you mentioned using in your code.
  When you execute functions to create collections, mint NFTs, or transfer them, you're signing these transactions with your wallet's secret key.


   {
    "interface": "V1_NFT",
    "id": "4R2LgPXs8NjQd49HoJrKUJvRgxR6ciwjVeoMSRs1Ujs8",
    "content": {
      "$schema": "https://schema.metaplex.com/nft1.0.json",
      "json_uri": "https://gateway.irys.xyz/8FzS8ke6cJCDCDiTQGhaxdjUFfYvUe9ks8RGFaEL7cFf",
      "files": [
        {
          "uri": "https://gateway.irys.xyz/6VuAbe2RwJPD31dYauWUr414iRTqXB6RUFEMUGE5c9dQ",
          "cdn_uri": "https://cdn.helius-rpc.com/cdn-cgi/image//https://gateway.irys.xyz/6VuAbe2RwJPD31dYauWUr414iRTqXB6RUFEMUGE5c9dQ",
          "mime": "image/jpeg"
        }
      ],
      "metadata": {
        "attributes": [
          {
            "value": "machine_learning",
            "trait_type": "course"
          },
          {
            "value": "Intermediate",
            "trait_type": "level"
          }
        ],
        "description": "sa",
        "name": "meet 2 2 2",
        "symbol": "",
        "token_standard": "NonFungible"
      },
      "links": {
        "image": "https://gateway.irys.xyz/6VuAbe2RwJPD31dYauWUr414iRTqXB6RUFEMUGE5c9dQ"
      }
    },
    "authorities": [
      {
        "address": "5EDsLkN8xCH4DAfdXaT5537nxzRVqjyd6v8rEDNhijVf",
        "scopes": [
          "full"
        ]
      }
    ],
    "compression": {
      "eligible": false,
      "compressed": false,
      "data_hash": "",
      "creator_hash": "",
      "asset_hash": "",
      "tree": "",
      "seq": 0,
      "leaf_id": 0
    },
    "grouping": [],
    "royalty": {
      "royalty_model": "creators",
      "target": null,
      "percent": 0,
      "basis_points": 0,
      "primary_sale_happened": false,
      "locked": false
    },
    "creators": [
      {
        "address": "5EDsLkN8xCH4DAfdXaT5537nxzRVqjyd6v8rEDNhijVf",
        "share": 100,
        "verified": true
      }
    ],
    "ownership": {
      "frozen": false,
      "delegated": false,
      "delegate": null,
      "ownership_model": "single",
      "owner": "5EDsLkN8xCH4DAfdXaT5537nxzRVqjyd6v8rEDNhijVf"
    },
    "supply": {
      "print_max_supply": 0,
      "print_current_supply": 0,
      "edition_nonce": 255
    },
    "mutable": true,
    "burnt": false,
    "token_info": {
      "supply": 1,
      "decimals": 0,
      "token_program": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      "associated_token_address": "6JwsyiaRvrEAfejwyN5c5YnGqc3CsZt86xEbMmh35MrN"
    }
  },



  1. if only video in lesson, npc don't prompt you to start the lesson
  2. http://localhost:3000/#/dashboard - ui is confusing, hard to find our courses
  3. http://localhost:3000/#/dashboard - add search course
  4. record voice for signup is confusing
  5. prompt of all lessons are finished in game, prompting to leave
  6. PDF lessonn don't work
  7. loading screen for game doesn't shut down itself
  8. contruct a word and order quest are not finishing
  9. add loader for admin to know video summary is being created
  10. ADd loaders to show collection and course nft are getting created
  11. mark the users who have already gotten thier nft 
  12. link to see that nft admin side

1. we can add external uri to the attributes of certificate, leading to our website ,
to a dynamic page showing the user's details about thier course comletion



curl -X POST http://localhost:5000/api/all-collections \
-H "Content-Type: application/json" \
