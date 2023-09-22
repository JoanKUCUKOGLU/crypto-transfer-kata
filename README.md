# Kata to practice the web3 js library in vue3 and typescript

The code is organised with a front and a back end

The front end is a vue3 app with typescript and the back end is a nodejs app with typescript

To run the front end you need to run the following commands:

```bash
cd front
npm install
npm run dev
```

it will listen on port 5173

To run the back end you need to run the following commands:

```bash
cd back
npm install
npm run dev
```

it will listen on port 3000

The front has hardcoded constants to connect to the back end on localhost:3000

The back end has hardcoded constants to connect to the EVM blockchain on the kerleano network

An initial wallet private key is set in the back end with a few CRC (the kerleano network token) to be able to send transactions

## The work

Find all the TODOs in the code and implement the missing parts