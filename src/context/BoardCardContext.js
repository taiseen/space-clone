import { createContext, useContext, useState } from "react";

const BoardCardItem = createContext();

export const BoardCardContext = ({ children }) => {

  const [target, setTarget] = useState({ bid: "", cid: "" });

  const [boardLists, setBoardList] = useState([]);

  // 🟨🟨🟨 For List's
  const addBoardList = (newListObj) =>
    setBoardList((pre) => [newListObj, ...pre]);

  const removeBoardList = (bid) =>
    setBoardList((pre) => pre.filter(({ _id }) => _id !== bid));

  // 🟨🟨🟨 For Card's
  const addCard = (cardObj, bid) => {
    // 🟩🟩🟩 1st Find 🔎 that specific Board index, for enter ==> the Newly Created Card.
    const boardIndex = boardLists.findIndex(({ _id }) => _id === bid);

    if (boardIndex < 0) return; // IF no board found, return nothing...

    // 🟩🟩🟩 2nd update the Card inside a specific Board
    setBoardList((prev) => {
      const tempBoard = [...prev];

      if (!tempBoard[boardIndex].cards) {
        tempBoard[boardIndex].cards = [];
      }

      tempBoard[boardIndex].cards.push(cardObj);

      return tempBoard;
    });
  };

  const removeCard = (bid, cid) => {
    // 🟥🟥🟥 1st ==> 🔎 Find the Board index
    const boardIndex = boardLists.findIndex(({ _id }) => _id === bid);
    if (boardIndex < 0) return;

    // 🟥🟥🟥 2nd ==> 🔎 Find the Card index
    const cardIndex = boardLists[boardIndex].cards.findIndex(({ _id }) => _id === cid);
    if (cardIndex < 0) return;

    // 🟥🟥🟥 3rd ==> 🔎 Remove the Card index from board
    const tempBoard = [...boardLists];
    tempBoard[boardIndex].cards.splice(cardIndex, 1);

    setBoardList(tempBoard);
  };

  const updateCard = (bid, cid, card) => {
    // 🟧🟧🟧 1st ==> 🔎 Find the Board index
    const boardIndex = boardLists.findIndex(({ _id }) => _id === bid);
    if (boardIndex < 0) return; // IF no card found, return nothing...

    // 🟧🟧🟧 2nd ==> 🔎 Find the Card index
    const cardIndex = boardLists[boardIndex]?.cards?.findIndex(({ _id }) => _id === cid);
    if (cardIndex < 0) return; // IF no card found, return nothing...

    const tempBoard = [...boardLists]; // copy
    tempBoard[boardIndex].cards[cardIndex] = card; // replace / update that specific card
    setBoardList(tempBoard); // update state variable
  };

  // 🟨🟨🟨 For Card's D-&-D
  const handleDragEnter = (bid, cid) => setTarget({ bid, cid });

  const handleDragEnd = (bid, cid) => {
    let s_bIndex, s_cIndex, d_bIndex, d_cIndex;

    s_bIndex = boardLists?.findIndex(({ _id }) => _id === bid);
    if (s_bIndex < 0) return;

    s_cIndex = boardLists[s_bIndex]?.cards?.findIndex(({ _id }) => _id === cid);
    if (s_cIndex < 0) return;

    d_bIndex = boardLists?.findIndex(({ _id }) => _id === target.bid);
    if (d_bIndex < 0) return;

    d_cIndex = boardLists[d_bIndex]?.cards?.findIndex(
      ({ _id }) => _id === target.cid
    );
    if (d_cIndex < 0) return;

    const tempBoard = [...boardLists]; // copy all board's
    const tempCard = tempBoard[s_bIndex].cards[s_cIndex]; // copy of that selected card

    tempBoard[s_bIndex].cards.splice(s_cIndex, 1); // remove that selected card from source board
    tempBoard[d_bIndex].cards.splice(d_cIndex, 0, tempCard); // add that coped card into destination board

    setBoardList(tempBoard); // update boards
  };

  // store all data in local storage
  // useEffect(() => localStorage.setItem('kanban', JSON.stringify(boardLists)), [boardLists]);

  return (
    <BoardCardItem.Provider
      value={{
        boardLists,
        setBoardList,
        addBoardList,
        removeBoardList,
        addCard,
        updateCard,
        removeCard,
        handleDragEnd,
        handleDragEnter,
      }}
    >
      {children}
    </BoardCardItem.Provider>
  );
};

export const useBoardCardContext = () => useContext(BoardCardItem);
