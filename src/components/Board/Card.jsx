import { DotsSingle, Plus, RightOK, Smile, UserPlus } from "../../assets/icons";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { CardModal, CardSettingDropDown, CardChip } from ".";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import ConfirmDialog from "./ConfirmDialog";
import { useSelector } from "react-redux";
import { cardUpdateApiCall } from "../../hooks/useFetch";

// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const Card = ({ card, listID }) => {

  const dropDownRef = useRef();
  const [cardSettingDropDownToggle, setCardSettingDropDownToggle] = useState(false);
  const { handleDragEnd, handleDragEnter, updateCard } = useBoardCardContext();
  const [cardModal, setCardModal] = useState(false);
  const [noteDone, setNoteDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [progress, setProgress] = useState(0 || card.progress);
  const selectedSpaceObj = useSelector(state => state.space.selectedSpaceObj);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);


  const progressStatus = (progress) => {
    switch (progress) {
      case 4:
        return 100;
      case 3:
        return 75;
      case 2:
        return 50;
      case 1:
        return 25;
      default:
        return 0;
    }
  }


  const handleClick = (e) => {
    // track out-side of click... & close setting drop down div...
    if (!dropDownRef?.current?.contains(e.target))
      setCardSettingDropDownToggle(false);
  };


  useEffect(() => {
    const cardProgressUpdate = async () => {
      const cardTagObject = { ...card, progress: progress }
      try {
        const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardTagObject)
        updateCard(listID, card._id, data.updatedCard);
      } catch (error) {
        console.log(error?.response?.data?.issue);
      }
    }
    cardProgressUpdate()
    // when progress change, call this update function... 
  }, [progress])


  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);



  return (
    <>
      <div
        draggable
        ref={dropDownRef}
        onClick={() => setCardModal(true)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onDragEnd={() => handleDragEnd(listID, card._id)}
        onDragEnter={() => handleDragEnter(listID, card._id)}
        className="relative w-[275px] h-fit bg-white px-3 py-3 rounded-md border-t-4 cursor-grab hover:bg-gray-200 "
        style={{ borderColor: selectedSpaceObj?.color }}

      >
        {(noteDone || progressStatus(progress) !== 0) && (
          <div className="px-1 pb-2">
            <div
              className={`w-8 h-8 grid place-items-center rounded-md cursor-pointer hover:bg-gray-300 hover:text-teal-400 text-[#B9C3CE]  ${visible ? "visible" : "invisible"
                }`}
            >
              <UserPlus />
            </div>


            <div
              className={`absolute top-4 right-10 flex items-center justify-center w-8 h-8 rounded-full text-white
              ${progressStatus(progress) === 100 ? 'bg-teal-400' : ' bg-gray-400'}`}
            >
              {
                progressStatus(progress) === 100
                  ? <RightOK />
                  : <span className="text-xs text-center">{progressStatus(progress)}%</span>
              }
            </div>
          </div>
        )}

        <p className="text-lg mr-4 text-gray-800">{card.name}</p>

        {/* For Tag's / Card Chip's */}
        <div className="p-1 text-white flex gap-2 flex-wrap">
          {
            card?.tags?.length
              ? card?.tags?.map(tag => <CardChip tag={tag} key={tag?.name} />)
              : null
          }
        </div>

        <div className="absolute top-4 right-3">
          {
            // ⚪⚪⚪ For 3 Dots, Menu toggling...
            visible && (
              <Dropdown
              width={220}
                button={
                  <DotsSingle
                    className={`cursor-pointer py-1.5 w-6 h-8 rounded-lg hover:bg-gray-300 duration-200 text-gray-400 active:bg-gray-300`}
                  />
                }
                menu={({ closePopup }) => (
                  <CardSettingDropDown
                    close={closePopup}
                    right={true}
                    cardID={card._id}
                    listID={listID}
                    progress={progress}
                    setProgress={setProgress}
                    noteDone={noteDone}
                    cardModal={cardModal}
                    setNoteDone={setNoteDone}
                    setCardSettingDropDownToggle={setCardSettingDropDownToggle}
                  />
                )}
              />
            )
          }
        </div>

        {/* ➕🙂 plus smile face emoji ➕🙂 */}

        <div className="relative flex items-center justify-end">
          {/* <div className='mr-1 bg-slate-200/50 rounded-md py-[2px] px-1 border border-teal-500'>
                    👍 <span className='text-black'>1</span>
                </div> */}

          <div
            className='flex items-center text-gray-400 p-1.5 rounded-md cursor-pointer hover:bg-gray-300 duration-200'
            onClick={e => { e.stopPropagation(); setShowEmoji(pre => !pre) }}
          >
            <Plus width="12" height="12" className='mr-[2px]' />
            <Smile />
          </div>

          {
            showEmoji &&
            <div
              className="z-20 absolute top-10 right-[-2px] flex gap-2 items-center p-1 bg-gray-300 rounded-md after:content-[''] after:absolute after:top-[-5px] after:right-2 after:w-5 after:h-5 after:bg-gray-300 after:rotate-45 after:-z-10 cursor-pointer"
              onClick={e => { e.stopPropagation() }}
            >
              <p
                className="p-1 bg-gray-100 rounded-md hover:bg-gray-400 duration-150"
                onClick={() => setShowEmoji(false)}
              >
                👍
              </p>
              <p
                className="p-1 bg-gray-100 rounded-md hover:bg-gray-400 duration-150"
                onClick={() => setShowEmoji(false)}
              >
                😊
              </p>
              <p
                className="p-1 bg-gray-100 rounded-md hover:bg-gray-400 duration-150"
                onClick={() => setShowEmoji(false)}
              >
                👎
              </p>
              <p
                className="p-1 bg-gray-100 rounded-md hover:bg-gray-400 duration-150"
                onClick={() => setShowEmoji(false)}
              >
                😎
              </p>
            </div>
          }
        </div>

        {
          // When Task Click >>> then Modal Open
          cardModal &&
          <CardModal
            card={card}
            listID={listID}
            noteDone={noteDone}
            progress={progress}
            setProgress={setProgress}
            setBoardModal={setCardModal}
            setNoteDone={setNoteDone}
          />
        }

      </div>
    </>
  );
};

export default Card;
