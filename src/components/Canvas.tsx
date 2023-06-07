import { useState } from "react";
import { ChromePicker } from "react-color";

const Canvas: React.FC = () => {
	// Define the type for square state
	interface SquareState {
		bgColor: string;
		border: string;
	}

	// Initialize the state for squares
	const [squares, setSquares] = useState<SquareState[][]>(
		[...Array(10)].map(() =>
			[...Array(10)].map(() => ({
				bgColor: "white",
				border: "1px solid black",
			}))
		)
	);

	// Initialize the state for selected color and color picker visibility
	const [selectedColor, setSelectedColor] = useState<string>("black");
	const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);

	// Handler for square click event
	const handleSquareClick = (row: number, col: number) => {
		const updatedSquares = [...squares];
		if (updatedSquares[row][col].bgColor === selectedColor) {
			updatedSquares[row][col] = {
				bgColor: "white",
				border: "1px solid black",
			};
		} else {
			updatedSquares[row][col] = {
				bgColor: selectedColor,
				border: "none",
			};
		}
		setSquares(updatedSquares);
	};

	// Handler for square mouse enter event
	const handleSquareMouseEnter = (row: number, col: number) => {
		if (squares[row][col].bgColor === "white") {
			const updatedSquares = [...squares];
			updatedSquares[row][col] = {
				bgColor: "gray",
				border: "1px solid black",
			};
			setSquares(updatedSquares);
		}
	};

	// Handler for square mouse leave event
	const handleSquareMouseLeave = (row: number, col: number) => {
		if (squares[row][col].bgColor === "gray") {
			const updatedSquares = [...squares];
			updatedSquares[row][col] = {
				bgColor: "white",
				border: "1px solid black",
			};
			setSquares(updatedSquares);
		}
	};

	// Handler for clean canvas button click event
	const handleCleanCanvas = () => {
		const cleanedSquares = [
			...squares.map((row) =>
				row.map(() => ({
					bgColor: "white",
					border: "1px solid black",
				}))
			),
		];
		setSquares(cleanedSquares);
		setSelectedColor("black");
	};

	// Handler for color change in color picker
	const handleColorChange = (color: any) => {
		setSelectedColor(color.hex);
	};

	// Handler for pick color button click event
	const handlePickColor = () => {
		setIsColorPickerOpen(true);
	};

	// Handler for close color picker button click event
	const handleCloseColorPicker = () => {
		setIsColorPickerOpen(false);
	};

	return (
		<div className="canvas-container">
			<h2>Pixel Art</h2>
			<div className="canvas">
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
				<button className="btn btn-secondary" onClick={handlePickColor}>
					Pick a Color
				</button>
				<button className="btn btn-secondary" onClick={handleCleanCanvas}>
					Clean Canvas
				</button>
			</div>
			{isColorPickerOpen && (
				<div className="color-picker-dialog">
					<ChromePicker
						color={selectedColor}
						onChange={handleColorChange}
						disableAlpha
					/>
					<button
						className="btn btn-primary close-button"
						onClick={handleCloseColorPicker}
					>
						Close
					</button>
				</div>
			)}
			<p className="selected-color-text">
				Selected Color:{" "}
				<span className="selected-color" style={{ color: selectedColor }}>
					{selectedColor}
				</span>
			</p>
			<style>
				{`
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
            border: 1px solid black;
            cursor: pointer;
          }

          .square:hover {
            background-color: gray;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            margin-bottom: 10px;
          }

          .btn {
            margin: 10px;
          }

          .color-picker-dialog {
            position: fixed;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            border: none;
            borderRadius: 8px;
            background: transparent;
            boxShadow: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 30%;
            height: 100px;
            margin-top: 10px;
          }

          .close-button {
            margin-top: 10px;
          }

          .selected-color-text {
            margin-top: 10px;
          }

          .selected-color {
            font-weight: bold;
            color: ${selectedColor};
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
