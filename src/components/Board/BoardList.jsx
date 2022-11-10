import { useBoardCardContext } from "../../context/BoardCardContext";
import { AddBtn, Card, BoardListSettingDropDown } from ".";
import { addCardIntoBoardList } from "../../hooks/useFetch";
import { DotsSingle } from "../../assets/icons";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dropdown from "../Dropdown";
import Tippy from "@tippyjs/react";
import useAxios from "../../api";
import "tippy.js/dist/tippy.css";

const BoardList = ({ boardList }) => {

  const dropDownRef = useRef();
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  const { addCard } = useBoardCardContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // GET Method ==> Card --- under specific Space reference ID + board list reference
        const { data } = await useAxios.get(
          `/spaces/${selectedSpaceId}/board/${boardList?._id}/card`
        );

        // get updated card all the time...
        // console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedSpaceId]);

  // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
  // POST Method || add card inside board list...
  const handleCardCreation = async (text) => {
    const cardObject = { name: text };

    try {
      // its a POST method | object send into backend/server
      const { data } = await addCardIntoBoardList(
        selectedSpaceId,
        boardList?._id,
        cardObject
      );

      // update user UI...
      addCard(data?.card, boardList?._id);

      // display a notification for user
      toast.success(`${data?.card?.name} - card created`, { autoClose: 3000 });
    } catch (error) {
      // error for developer for deBugging...
      console.log(error);

      // error for user at notification...
      toast.error(error?.response?.data?.issue?.message, { autoClose: 3000 });
    }
  };


  return (
    <div className={`w-[300px] min-h-full rounded-lg mb-2 mr-3 flex flex-col`}>
      <div
        className="overflow-hidden bg-gray-100 flex items-center justify-between p-4 rounded-t-lg"
        ref={dropDownRef}
      >
        {/* <Tippy
          placement="center"
          content={`${boardList?.cards?.length} cards`}
          className="bg-gray-600/70 text-[10px] w-40"
        >

        </Tippy> */}

        <div className="text-gray-500 text-lg flex-1">
          {boardList?.name || "New List"}
        </div>

        <Dropdown
          button={
            <DotsSingle className="text-gray-500 cursor-pointer w-8 h-8 p-2 rounded-lg hover:bg-gray-200 duration-200" />
          }
          width={260}
          menu={({ closePopup }) => (
            <BoardListSettingDropDown
              close={closePopup}
              boardListID={boardList?._id}
            />
          )}
        />
      </div>

      <div className="bg-gray-100 pb-4 flex flex-col items-center gap-3 overflow-y-auto customScroll">
        {boardList?.cards?.map((card) => (
          <Card key={card._id} card={card} listID={boardList?._id} />
        ))}
      </div>

      <AddBtn
        placeHolder="Add card name..."
        btnText="card"
        onSubmit={(text) => handleCardCreation(text)}
      />
    </div>
  );
};

export default BoardList;