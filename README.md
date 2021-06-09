# phidex Interface

[![Unit Tests](https://github.com/phidex/phidex-interface/actions/workflows/unit-tests.yaml/badge.svg)](https://github.com/phidex/phidex-interface/actions/workflows/unit-tests.yaml)
[![Integration Tests](https://github.com/phidex/phidex-interface/actions/workflows/integration-tests.yaml/badge.svg)](https://github.com/phidex/phidex-interface/actions/workflows/integration-tests.yaml)
[![Lint](https://github.com/phidex/phidex-interface/actions/workflows/lint.yml/badge.svg)](https://github.com/phidex/phidex-interface/actions/workflows/lint.yml)
[![Release](https://github.com/phidex/phidex-interface/actions/workflows/release.yaml/badge.svg)](https://github.com/phidex/phidex-interface/actions/workflows/release.yaml)

An open source interface for phidex -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [phidex.org](https://phidex.io/)
- Interface: [app.phidex.org](https://app.phidex.io)
- Docs: [phidex.org/docs/](https://phidex.io/docs/)
- Twitter: [@phidexProtocol](https://twitter.com/phidex2)
- Reddit: [/r/phidex](https://www.reddit.com/r/phidex/)
- Email: [contact@phidex.org](mailto:contact@phidex.org)
- Discord: [phidex](https://discord.gg/yYBbvBYH)
- Whitepaper: [Link](https://phidex.io/whitepaper/)

## Accessing the phidex Interface

To access the phidex Interface, use an IPFS gateway link from the
[latest release](https://github.com/phidex/phidex-interface/releases/latest), 
or visit [app.phidex.io](https://app.phidex.io).

## Listing a token

Please see the
[@phidex/default-token-list](https://github.com/phidex/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[phidex V2](https://phidex.io/docs/v2/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `main` branch.** 
CI checks will run against all PRs.

## Accessing phidex Interface V1

The phidex Interface supports swapping against, and migrating or removing liquidity from phidex V1. However,
if you would like to use phidex V1, the phidex V1 interface for mainnet and testnets is accessible via IPFS gateways 
linked from the [v1.0.0 release](https://github.com/phidex/phidex-interface/releases/tag/v1.0.0).
