import { TicTacToGameState } from "."

export const TicTacToUi = () => {
	const renderGrid = (state: TicTacToGameState) => {
		return state.board
			.flatMap((row, y) => {
				return row.map((cell, x) => {
					return `<div class=\\\"game-cell\\\" onclick=\\\"gridClick(${y},${x})\\\">${cell}</div>`
				})
			})
			.join("")
	}

	const renderContainer = () => {
		return `<div id="game-cell-container"></div>`
	}

	const renderEnd = (result: string) => {
		return `<div>
			<div>RESULT ${result}</div>
			<div>
				<div onclick=\\\"start('x')\\\">X</div>
				<div onclick=\\\"start('o')\\\">O</div>
			</div>
		</div>`
	}

	const renderStartUi = () => {
		return `<div id="game-cell-container">
				<div>to start select your char</div>
				<div>
					<div onclick="start('x')">X</div>
					<div onclick="start('o')">O</div>
				</div>
			</div>`
	}
	// <div onclick=\"webcm.track(\"event\", {kind: \"start\", char: \"o\"})\">O</div>

	const renderScript = () => {
		return `
			<script>
				function start(char) {
					webcm.track("event", {kind: "start", char})
				}

				function gridClick(y,x) {
					webcm.track("event", {kind: "player-move", y,x})
				}
			</script>
		`
	}
	const renderStyle = () => {
		return `
			<style>
				.game-cell{
					border: 2px solid black;
					width: 50px;
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 20px;
				}
				#game-cell-container{
					position: fixed;
					bottom: 50px;
					right: 50px;
					display: grid;
					grid-template-columns: repeat(3, auto);
					grid-template-rows: repeat(3,auto);
				}
			</style>
		`
	}

	return {
		renderScript,
		renderStartUi,
		renderContainer,
		renderGrid,
		renderStyle,
		renderEnd,
	}
}
