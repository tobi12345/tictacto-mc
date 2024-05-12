import { ComponentSettings, Manager } from "@managed-components/types"
import { TicTacToUi } from "./TicTacToUi"

export type TicTacToGameState = {
	size: number
	board: string[][]
	playerChar: string
	computerChar: string
	winner?: string
}

const ticTacToUi = TicTacToUi()
export default async function (manager: Manager, _settings: ComponentSettings) {
	manager.addEventListener("clientcreated", async (event) => {
		console.log("clientcreated!")
		const id = String(Math.floor(Math.random() * 10000))
		event.client.set("id", id)
		event.client.execute(`console.log('Hello Client ${id}')`)
	})

	manager.addEventListener("pageview", async (event) => {
		const id = event.client.get("id")
		console.log("pageview!")
		event.client.execute(`console.log('Hello Client ${id}, again')`)
	})

	manager.registerWidget(async () => {
		return `
			${ticTacToUi.renderScript()}
			${ticTacToUi.renderStyle()}
			${ticTacToUi.renderStartUi()}
		`
	})

	manager.addEventListener("event", async (event) => {
		console.log(event.payload)
		if (event.payload.kind === "start") {
			let state = await (
				await manager.fetch("http://localhost:8787", {
					method: "POST",
					body: JSON.stringify({
						payload: event.payload,
					}),
				})
			)?.json()
			event.client.set("game", JSON.stringify(state))
			event.client.execute(`
				let container = document.getElementById("game-cell-container");
				let content = "${ticTacToUi.renderGrid(state)}";
				container.innerHTML = content;
			`)
		} else if (event.payload.kind === "player-move") {
			let state = JSON.parse(event.client.get("game") ?? "")
			state = await (
				await manager.fetch("http://localhost:8787", {
					method: "POST",
					body: JSON.stringify({
						state: state,
						payload: event.payload,
					}),
				})
			)?.json()
			event.client.set("game", JSON.stringify(state))
			if (state.winner) {
				event.client.execute(`
					let container = document.getElementById("game-cell-container");
					let content = \`${ticTacToUi.renderEnd(state.winner)}\`;
					container.innerHTML = content;
				`)
				return
			}
			event.client.execute(`
				let container = document.getElementById("game-cell-container");
				let content = "${ticTacToUi.renderGrid(state)}";
				container.innerHTML = content;
			`)
		}
	})
}
