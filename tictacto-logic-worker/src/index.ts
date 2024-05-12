/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { TicTacToGame, TicTacToGameState } from './TicTacToGame';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const data = (await request.json()) as {
			state?: TicTacToGameState;
			payload: any;
		};

		if (data.payload.kind === 'start') {
			let state = TicTacToGame().initGame({
				playerChar: data.payload.char,
				size: 3,
			});
			return new Response(JSON.stringify(state));
		} else if (data.payload.kind === 'player-move') {
			let state = data.state!;
			let game = TicTacToGame();
			if (!game.playerMove(state, data.payload.y, data.payload.x)) {
				return new Response(JSON.stringify(state));
			}
			game.evaluateBoard(state);
			if (state.winner) {
				return new Response(JSON.stringify(state));
			}
			game.computerMove(state);
			game.evaluateBoard(state);
			return new Response(JSON.stringify(state));
		} else {
			//should never happen (in a non real world world :D )
			return new Response('error');
		}
	},
};
