# tic-tac-to

- this is a mc for a tictacto game
- it will create a very basic game ui in the bottom right corner
- with some more css this would look like a little open/closable widged game in the corner
- the mc handles the "rendering of the game"
- a second worker executes the logic
- the state is stored on the client and send with every request
  - in the future this should be moved to a persistent storage on the backend or made in to a JWT so only the backend can modify it


````
#to start
cd ./tictacto-mc
npx webcm ./src/index.ts
cd ../tictacto-logic-worker
npm run dev
````