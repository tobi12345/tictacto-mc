export type TicTacToGameState = {
	size: number;
	board: string[][];
	playerChar: string;
	computerChar: string;
	winner?: string;
};

export const TicTacToGame = () => {
	const initGame = ({ size, playerChar }: { size: number; playerChar: string }): TicTacToGameState => {
		return {
			board: new Array(size).fill('').map(() => new Array(size).fill('')),
			size,
			playerChar,
			computerChar: playerChar === 'x' ? 'o' : 'x',
		};
	};

	const playerMove = (state: TicTacToGameState, y: number, x: number) => {
		if (state.board[y][x] !== '') {
			//todo: throw error?
			return;
		}
		state.board[y][x] = state.playerChar;
	};

	const computerMove = (state: TicTacToGameState) => {
		const free: [number, number][] = [];
		state.board.forEach((row, y) =>
			row.forEach((cell, x) => {
				if (cell === '') {
					free.push([y, x]);
				}
			})
		);

		const pos = randomElement(free);
		state.board[pos[0]][pos[1]] = state.computerChar;
	};

	const evaluateBoard = (state: TicTacToGameState) => {
		let emptySpaces = false;
		let rowWin = true;
		let colWin = true;
		//rows and cols
		for (let y = 0; y < state.size; y++) {
			const rowFirst = state.board[y][0];
			const colFirst = state.board[0][y];
			for (let x = 0; x < state.size; x++) {
				if (state.board[y][x] !== rowFirst || state.board[y][x] === '') {
					rowWin = false;
				}
				if (state.board[x][y] !== colFirst || state.board[x][y] === '') {
					colWin = false;
				}

				if (state.board[y][x] === '') emptySpaces = true;
				if (state.board[x][y] === '') emptySpaces = true;
			}
			if (rowWin && rowFirst !== '') state.winner = rowFirst;
			if (colWin && colFirst !== '') state.winner = colFirst;
		}

		let diag1Win = true;
		let diag2Win = true;
		let diag1First = state.board[0][0];
		let diag2First = state.board[0][state.size - 1];

		for (let i = 1; i < state.size; i++) {
			if (state.board[i][i] !== diag1First || state.board[i][i] === '') diag1Win = false;
			if (state.board[i][state.size - 1 - i] !== diag2First || state.board[i][state.size - 1 - i] === '') diag2Win = false;
		}

		if (diag1Win && diag1First !== '') state.winner = diag1First;
		if (diag2Win && diag2First !== '') state.winner = diag2First;

		// Check for game status
		if (!emptySpaces) state.winner = 'draw';
	};

	return {
		initGame,
		playerMove,
		computerMove,
		evaluateBoard,
	};
};

const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
