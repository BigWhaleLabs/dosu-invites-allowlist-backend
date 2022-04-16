# Dosu Invites allowlist backend

- Holds the list of allowed addresses
- Allows to add an address
- Allows to update the merkle tree

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/dosu-invites-allowlist`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn` in the root folder
5. Run `yarn develop`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name                         | Description                              |
| ---------------------------- | ---------------------------------------- |
| `MONGO`                      | URL of the mongo database                |
| `PORT`                       | Port to run server on (defaults to 1337) |
| `CONTRACT_ADDRESS`           | Address of the contract                  |
| `CONTRACT_OWNER_PRIVATE_KEY` | Private key of the contract owner        |

Also, please, consider looking at `.env.sample`.
