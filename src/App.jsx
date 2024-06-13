import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const board = [
    [
      { id: 1, value: "" },
      { id: 2, value: "" },
      { id: 3, value: "" },
    ],
    [
      { id: 4, value: "" },
      { id: 5, value: "" },
      { id: 6, value: "" },
    ],
    [
      { id: 7, value: "" },
      { id: 8, value: "" },
      { id: 9, value: "" },
    ],
  ];

  const [turn, setTurn] = useState(true);
  const [boardGame, setBoardGame] = useState(board);
  const [position, setPosition] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log('POSITION', position)
console.log('TURNO', turn)

  const playUserFuction = (element, index, keyValue) => {
    console.log('ELEMENT.ID', element.id)
    const modifiedBoard = [...boardGame];
    //console.log("modifiedBOARD", modifiedBoard);
    //console.log("index", index);
    //console.log("keyvalue", keyValue);

    if (turn) {
      if (modifiedBoard[index][keyValue].value === "") {
        modifiedBoard[index][keyValue].value = "X";
        const availablePositions = position.filter((item) => item !== element.id)
        setPosition(availablePositions);
        setTurn(false);
      }
    }
    return setBoardGame(modifiedBoard);
  };

  const playCpuFunction = () => {
    //const modifiedBoard = [...boardGame];
      const ramdomPosition = Math.floor(Math.random()* position.length)
      console.log('ramdomPosition', ramdomPosition)

      const findingIndexAndKeyValue= (arrays, ramdomPosition) => {
        for (let i = 0; i < arrays.length; i++) {
          for (let j = 0; j < arrays[i].length; j++) {
            if (arrays[i][j].id === ramdomPosition) {
              return { arrayIndex: i, elementIndex: j };
            }
          }
        }
      };

      const index = findingIndexAndKeyValue(boardGame,ramdomPosition)
      console.log('index', index)

     /* if (modifiedBoard[index][keyValue] === "") {
        modifiedBoard[index][keyValue].value = "O";
        const availablePositions = position.filter((item) => item == !element.id);
        setPosition(availablePositions);
      }*/
    
  };


  useEffect(() => {
    if(turn === false){
      playCpuFunction()
    }
    }, [turn]);

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
