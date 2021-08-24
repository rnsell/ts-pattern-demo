// Website
import { match, select } from "ts-pattern";

type Data = { type: "text"; content: string } | { type: "img"; src: string };

type Result = { type: "ok"; data: Data } | { type: "error"; error: Error };

const resultInput: Result = {
  type: "ok",
  data: {
    type: "text",
    content: "hello world",
  },
};

// Note the type matching here. if its an error you cant have a data propery
match<Result, string>(resultInput)
  .with({ type: "error" }, (res) => `<p>Oups! An error occured</p>`)
  .with(
    { type: "ok", data: { type: "text" } },
    (res) => `<p>${res.data.content}</p>`
  )
  .with(
    { type: "ok", data: { type: "img", src: select() } },
    (src) => `<img src=${src} />`
  )
  // .with(
  //   { type: "error", data: { type: "text" } },
  //   (res) => `<p>${res.error}</p>`
  // )
  .exhaustive();

// *************************************************
export enum BoardDescription {
  TURN_X = "X's Turn",
  WIN_X = "X Wins",
  TURN_O = "O's Turn",
  WIN_O = "O Wins",
  TIE = "Tie",
  IMPOSSIBLE = "Impossible",
}

const { difference } = { difference: 0 }; //numberOfXandOs(board);
const hasDoubleMoved = false; //doubleMoved(board);
const xWin = true; //playerHasWon(Player.X)(board);
const oWin = false; // playerHasWon(Player.O)(board);
const noMoreMovesExists = true; //noMoreSpots(board);

const pattern = { hasDoubleMoved, xWin, oWin, noMoreMovesExists, difference };
const noWinner = {
  xWin: false,
  oWin: false,
};

match<any, any>(pattern)
  .with({ hasDoubleMoved: true }, () => BoardDescription.IMPOSSIBLE)
  .with({ xWin: true, oWin: true }, () => BoardDescription.IMPOSSIBLE)
  .with(
    { hasDoubleMoved: false, xWin: true, oWin: false },
    () => BoardDescription.WIN_X
  )
  .with(
    { hasDoubleMoved: false, xWin: false, oWin: true },
    () => BoardDescription.WIN_O
  )
  .with(
    {
      hasDoubleMoved: false,
      xWin: false,
      oWin: false,
      noMoreMovesExists: true,
    },
    () => BoardDescription.TIE
  )
  .with(
    {
      hasDoubleMoved: false,
      ...noWinner,
      noMoreMovesExists: false,
      difference: 0,
    },
    () => BoardDescription.TURN_X
  )
  .otherwise(() => {
    return BoardDescription.TURN_O;
  });
