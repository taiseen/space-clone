import { useBoardCardContext } from "../../context/BoardCardContext";
import { useStyleContext } from "../../context/StyleContext";
import { addBoardListApiCall } from "../../hooks/useFetch";
import { AddBtn, BoardList } from ".";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useAxios from "../../api/index";


const Board = ({ selectedSpaceId }) => {

  // ContextAPI | Read + Write Operation For Board Section
  const { boardLists, setBoardList, addBoardList } = useBoardCardContext();

  // Globally Left side margin maintain
  const { margin } = useStyleContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedSpaceId) {
          // GET Method ==> for all Board List --- under specific Space reference ID
          const { data } = await useAxios.get(
            `/spaces/${selectedSpaceId}/board?getCards=true`
          );

          // update Context API for UI
          setBoardList(data.lists);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedSpaceId]);

  // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
  // POST Method ➕ add list inside board...
  const handleBoardListCreation = async (selectedSpaceId, text) => {
    const listObject = { name: text };

    try {
      // its a POST method | object send into backend/server
      const { data } = await addBoardListApiCall(selectedSpaceId, listObject);

      // update user UI... by ContextAPI
      addBoardList(data.list);

      // display a notification for user
      toast.success(`${data?.list?.name} - list create successfully`, {
        autoClose: 3000,
      });
    } catch (error) {
      // error for developer for deBugging...
      console.log(error.response.data);

      // error for user at notification...
      toast.error(error?.response?.data?.issue?.message, { autoClose: 3000 });
    }
  };

  return (
    <section
      className={`${margin ? "ml-[325px]" : "ml-[50px]"
        } duration-200 w-full overflow-x-auto customScroll`}
    >
      <div className="pt-[85px] px-4 flex gap-3 items-start  min-w-fit h-[98vh]">
        {
          // all board list print at UI by this loop...
          boardLists
            ?.slice(0)
            ?.reverse()
            ?.map(boardList => (
              <BoardList key={boardList._id} boardList={boardList} />
            ))
        }

        {/*  + Add a list | Button UI */}
        <AddBtn
          placeHolder="Add list name..."
          btnText="list"
          onSubmit={(text) => handleBoardListCreation(selectedSpaceId, text)}
        />
      </div>
    </section>
  );
};

export default Board;
