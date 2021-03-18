/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Cell } from './components/cell';

const createCells = (width: number, height: number) => (
  new Array(width).fill(null).map(_ => new Array(height).fill(null).map(_ => Math.random() * 2 > 1))
);

const nextCells = (cells: Array<Array<boolean>>) => {
  return cells.map((crow, y) => {
    return crow.map((c, x) => {
      const px = x - 1 === -1 ? crow.length - 1 : x - 1;
      const nx = x + 1 === crow.length ? 0 : x + 1;
      const py = y - 1 === -1 ? cells.length - 1 : y - 1;
      const ny = y + 1 === cells.length ? 0 : y + 1;

      const aroundCellsAliveNumber = [
        cells[py][px], cells[py][x], cells[py][nx],
        cells[y][px],                 cells[y][nx],
        cells[ny][px], cells[ny][x], cells[ny][nx],
      ].reduce((a, b) => a + (b ? 1 : 0), 0);

      if (!c && aroundCellsAliveNumber === 3) {
        return true;
      } else if(c) {
        if ([2, 3].includes(aroundCellsAliveNumber)) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    })
  })
}

type Props = {
  width: number;
  height: number;
};

const App = ({ width = 50, height = 50 }: Props) => {
  const [state, setState] = useState(() => createCells(width, height));

  useEffect(() => {
    const interval = setInterval(() => {
      setState(nextCells(state));
    }, 50);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      {state.map((s, i) => (
        <div style={{ display: 'flex' }}>
          {s.map( c => <Cell alive={c} />)}
        </div>
      ))}
    </div>
  );
}

export default App;
