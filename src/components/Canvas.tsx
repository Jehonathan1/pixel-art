import { useState } from "react";

const Canvas: React.FC = () => {
	// Define an interface for the state of each square
	interface SquareState {
		bgColor: string;
		border: string;
	}

	// Create a state variable for the squares using the useState hook
	const [squares, setSquares] = useState<SquareState[][]>(
		[...Array(10)].map(() =>
			[...Array(10)].map(() => ({
				bgColor: "white",
				border: "1px solid black",
			}))
		)
	);

	// Function to handle square click event
	const handleSquareClick = (row: number, col: number) => {
		// Create a copy of the squares array using the spread operator
		const updatedSquares = [...squares];

		// Check the current background color of the clicked square
		if (updatedSquares[row][col].bgColor === "black") {
			// If it's black, change it back to white with a black border
			updatedSquares[row][col] = {
				bgColor: "white",
				border: "1px solid black",
			};
		} else {
			// Otherwise, change it to black with no border
			updatedSquares[row][col] = {
				bgColor: "black",
				border: "none",
			};
		}

		// Update the squares state with the modified array
		setSquares(updatedSquares);
	};

	// Function to handle mouse enter event on a square
	const handleSquareMouseEnter = (row: number, col: number) => {
		// Check the current background color of the square
		if (squares[row][col].bgColor === "white") {
			// If it's white, change it to gray with a black border
			const updatedSquares = [...squares];
			updatedSquares[row][col] = {
				bgColor: "gray",
				border: "1px solid black",
			};
			setSquares(updatedSquares);
		}
	};

	// Function to handle mouse leave event on a square
	const handleSquareMouseLeave = (row: number, col: number) => {
		// Check the current background color of the square
		if (squares[row][col].bgColor === "gray") {
			// If it's gray, change it back to white with a black border
			const updatedSquares = [...squares];
			updatedSquares[row][col] = {
				bgColor: "white",
				border: "1px solid black",
			};
			setSquares(updatedSquares);
		}
	};

	// Function to handle the clean canvas button click event
	const handleCleanCanvas = () => {
		// Create a cleaned version of the squares array by mapping over each row and square
		const cleanedSquares = [
			...squares.map((row) =>
				row.map(() => ({
					bgColor: "white",
					border: "1px solid black",
				}))
			),
		];

		// Update the squares state with the cleaned version
		setSquares(cleanedSquares);
	};

	// Render the canvas component
	return (
		<div className="canvas-container">
			<h2>Pixel Art</h2>
			<div className="canvas">
				{/* Map over the squares array to render each row and square */}
				{squares.map((row, rowIndex) => (
					<div className="row" key={rowIndex}>
						{row.map((square, colIndex) => (
							<div
								className="square"
								key={colIndex}
								style={{
									backgroundColor: square.bgColor,
									border: square.border,
								}}
								onClick={() => handleSquareClick(rowIndex, colIndex)}
								onMouseEnter={() => handleSquareMouseEnter(rowIndex, colIndex)}
								onMouseLeave={() => handleSquareMouseLeave(rowIndex, colIndex)}
							/>
						))}
					</div>
				))}
			</div>
			<div className="button-container">
				{/* Render the clean canvas button */}
				<button className="btn btn-secondary" onClick={handleCleanCanvas}>
					Clean Canvas
				</button>
			</div>
			{/* Add inline styles using the style tag */}
			<style>
				{`
          /* CSS styles for the canvas and squares */
          .canvas-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .canvas {
            display: flex;
            flex-direction: column;
          }

          .row {
            display: flex;
          }

          .square {
            width: 50px;
            height: 50px;
            background-color: white;
            border: 1px solid black;
          }

          .square:hover {
            background-color: gray;
            cursor: pointer;
          }

          .square.clicked {
            background-color: black;
            border: none;
          }

          /* CSS styles for the clean canvas button */
          .button-container {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
          }

          @media (max-width: 600px) {
            .canvas-container {
              padding: 10px;
            }
          
            .square {
              width: 30px;
              height: 30px;
            }
          }
        `}
			</style>
		</div>
	);
};

export default Canvas;
