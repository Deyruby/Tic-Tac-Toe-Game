import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const board = [
    [ { id: 1, value: "" },{ id: 2, value: "" },{ id: 3, value: "" }, ],
    [ { id: 4, value: "" },{ id: 5, value: "" },{ id: 6, value: "" },],
    [ { id: 7, value: "" },{ id: 8, value: "" },{ id: 9, value: "" }, ],
  ];


  const [turn, setTurn] = useState(true);
  const [boardGame, setBoardGame] = useState(board);
  const [position, setPosition] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  console.log("POSITION", position);
  //console.log("TURNO", turn);
  

  const playUserFuction = (element, index, keyValue) => {
    const modifiedBoard = [...boardGame];
    if (position.length === 0) {
      alert("EMPATE");
      setPosition([1,2,3,4,5,6,7,8,9])
      setBoardGame(board);
      setTurn(true)
    } else {
      if (turn) {
        if (modifiedBoard[index][keyValue].value !== "X") {
          modifiedBoard[index][keyValue].value = "X";
          const availablePositions = position.filter( (item) => item !== element.id );
          setPosition(availablePositions);
          setTurn(false);
        }
      }
      return setBoardGame(modifiedBoard);
    }
  };

  const playCpuFunction = () => {
    const modifiedBoard = [...boardGame];
    const ramdomNumber = Math.floor(Math.random() * position.length);
    console.log("ramdonNUMBER", ramdomNumber);
    const randomId = position[ramdomNumber];
    console.log("randomId", randomId);

    const findingIndexAndKeyValue = (arrays, randomId) => {
      for (let i = 0; i < arrays.length; i++) {
        for (let j = 0; j < arrays[i].length; j++) {
          if (arrays[i][j].id === randomId) {
            return { arrayIndex: i, elementIndex: j };
          }
        }
      }
    };

    const indexandKeyValue = findingIndexAndKeyValue(boardGame, randomId);
    console.log("indexandKEY", indexandKeyValue);
    setTurn(true);
    const index = indexandKeyValue.arrayIndex;
    const keyValue = indexandKeyValue.elementIndex;
    //console.log("index", index);
    //console.log("keyValue", keyValue);

    if (modifiedBoard[index][keyValue].value !== "O") {
      modifiedBoard[index][keyValue].value = "O";
      const availablePositions = position.filter((item) => item !== randomId);
      setTurn(true);
      setPosition(availablePositions);
    }
    return setBoardGame(modifiedBoard);
  };

  const winner = (boardGame) => {
 
 
    const winningCombinations =[

      //filas
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Columnas
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonales
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
 ]
for (let combination of winningCombinations){
 const [a,b,c] = combination
    const cellA = boardGame[a[0]][a[1]].value;
    const cellB = boardGame[b[0]][b[1]].value;
    const cellC = boardGame[c[0]][c[1]].value

    if (cellA && cellA === cellB && cellA === cellC) {
      return cellA; // Devuelve 'X' o 'O'
    }

}

 return null

  };

  useEffect(() => {
    let theWinner = winner(boardGame)
    if(theWinner){
      alert(`The winner is ${theWinner}`)
      setPosition([1,2,3,4,5,6,7,8,9])
      setBoardGame(board)
      setTurn(true)
    }
    else{
      if(!turn && position.length>0){
        playCpuFunction()
      }

    }
    ;
  }, [boardGame]);

  return (
    <>
      <div className="container">
        {boardGame?.map((row, index) => {
          return (
            <div className="row" key={index}>
              {row?.map((element, keyValue) => {
                return (
                  <div
                    className="column"
                    key={keyValue}
                    onClick={() => playUserFuction(element, index, keyValue)}
                  >
                    <p>{element.value}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
