import React from "react";

export type Props = {
  alive: boolean;
};

export const Cell = (props: Props) => {
  return (
    <div style={{
      width: '5px',
      height: '5px',
      backgroundColor: props.alive ? 'green' : 'red',
    }}>
    </div>
  );
}
