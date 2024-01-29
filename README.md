# Klip NFT Minter - Frontend
---

# WARNING

This tool provides features of log-in and minting via Klip, but the minted NFT tokens will not be shown in Klip.
To be shown them in Klip, please consult klip-partners@groundx.xyz.

# Getting Started

If you find this repo first, please visit [Klip NFT Minter - Backend](https://github.com/kjhman21/klip-nft-minter-backend).
The backend server must run before this frontend.

## Installing Packages

Install packages that this repo depends on.

```
$ npm install
```

## Setting up .env

`.env` is the file having all the environment variables for the frontend.
Create it by copying [.env.template](./.env.template)

```
$ cp .env.template .env
```

The below table show the description of each variable in `.env.template`.

| Variable | Description | Default Value |
|---|---|---|
| REACT_APP_BAPP_NAME | The name of this frontend | Klaytn NFT Minter |
| REACT_APP_SCOPE_URL | The URL of the Klaytn Scope. If you want to run it on Baobab, set this value to https://baobab.scope.klaytn.com. | https://scope.klaytn.com |
| REACT_APP_BACKEND_URL | The URL of the [backend](https://github.com/klaytn/klaytn-nft-minter-backend) | http://localhost:4500 |
| REACT_APP_CHAIN_ID | Chain ID of the Klaytn Network| 8217 |
