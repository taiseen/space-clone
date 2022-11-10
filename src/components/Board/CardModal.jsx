import {
  ArrowRight,
  Attachment,
  CheckList,
  Close,
  Description,
  DotsSingle,
  RightOK,
  UserPlus,
} from "../../assets/icons";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CardSettingDropDown } from ".";
import {
  cardAttachmentUpdateApiCall, cardUpdateApiCall, createChecklistItem,
  deleteChecklistItem, getSingleCard, updateChecklistItem
} from "../../hooks/useFetch";
import { toast } from "react-toastify";
import Dropdown from "../Dropdown";
import ConfirmDialog from "./ConfirmDialog";
import AssigneeUser from "../AssigneeUser/AssigneeUser";
import CardTags from "./CardTags";
import CardProgress from "./CardProgress";



// This <Component /> called by 🟨🟨🟨 Card.jsx 🟨🟨🟨
const CardModal = (prop) => {

  const { setBoardModal, noteDone, setNoteDone, card, listID, progress, setProgress, progressStatus, handleDataChange = () => { } } = prop;

  const [localCard, setLocalCard] = useState({});
  const { updateCard, boardLists } = useBoardCardContext();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const selectedSpace = useSelector((state) => state.space.selectedSpaceObj);
  const nameOfBoardList = boardLists.find(({ _id }) => _id === listID)?.name;
  const [openAssigneeModal, setOpenAssigneeModal] = useState(false);
  const [modalActionToggling, setModalActionToggling] = useState(false);
  const [newCheckListItemJSX, setNewCheckListItemJSX] = useState(false);
  const [attachFileLoading, setAttachFileLoading] = useState(false);
  const [deleteAttachFile, setDeleteAttachFile] = useState('');
  const [deleteAttachFileLoading, setDeleteAttachFileLoading] = useState(false);


  const [checkListItem, setCheckListItem] = useState({
    checked: false,
    content: '',
  })


  useEffect(() => {

    const getCard = async () => {

      const { data } = await getSingleCard(selectedSpaceId, listID, card?._id)
      setLocalCard(data?.card)
    }

    getCard()

  }, [selectedSpaceId, listID, card?._id])


  // 🟩🟩🟩
  // user esc key press Event Listener for closing modal...
  useEffect(() => {
    const handleEscapeKeyPress = e => {
      if (e.code === "Escape") setBoardModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setBoardModal]);


  // 🟩🟩🟩
  // CardInfo Modal Data Update when user input new data...
  useEffect(
    () => updateCard(listID, localCard._id, localCard),
    [listID, card._id, localCard]
  );



  // 🟩🟩🟩
  // const debounceHandler = (fun, delay) => {
  //   let timeOutId;
  //   return (...arg) => {
  //     clearTimeout(timeOutId);
  //     timeOutId = setTimeout(() => {
  //       fun(...arg)
  //     }, delay);
  //   }
  // }

  // const getCardName = (cardName) => {
  //   setLocalCard(pre => ({ ...pre, name: cardName }));

  // }

  // const deBounceGetCardName = debounceHandler(getCardName, 1000);


  // 🟩🟩🟩
  // handle keyBoard enter button press
  const handle_card_name_update_enter_btn = async (e) => {
    console.log(e.target.value)
    // setLocalCard(pre=> ({...pre, name : e.target.value }))
    if (e.key === 'Enter') {
      const cardTagObject = { ...localCard, name: localCard.name };

      try {
        const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardTagObject)
        if (data.updatedCard._id) {
          toast.success(`Card name updated`, { autoClose: 2000 });
          handleDataChange()
        }
      } catch (error) {
        console.log(error?.response?.data?.issue);
      }
    };
  }

  // 🟩🟩🟩
  const handle_card_description_update_enter_btn = async (e) => {
    if (e.key === 'Enter') {
      const cardTagObject = { ...localCard, description: localCard.description };

      try {
        const { data } = await cardUpdateApiCall(selectedSpaceId, listID, card._id, cardTagObject)
        if (data.updatedCard._id) {
          toast.success(`Description updated`, { autoClose: 2000 });
          handleDataChange()
        }
      } catch (error) {
        console.log(error?.response?.data?.issue);
      }
    };
  }

  // ✅✅✅
  const handle_create_check_list = () => setNewCheckListItemJSX(true);

  // ✅✅✅
  const handle_check_list_item_enter_btn = async e => {

    if (e.key === 'Enter') {

      const cardValue = { ...localCard }

      const checkListItemObj = { ...checkListItem }

      const cardCheckList = { ...cardValue, checkList: [...cardValue.checkList, checkListItemObj] }

      setLocalCard(cardCheckList);

      try {
        await createChecklistItem(selectedSpaceId, listID, card._id, checkListItemObj)
        handleDataChange()
      } catch (error) {
        console.log(error.response.data.issue)
      }

      setCheckListItem({ checked: '', content: '' });
    }

  }

  // ✅✅✅
  const handle_check_list_change = e => {
    const { checked, name, value } = e.target;
    setCheckListItem(pre => ({ ...pre, [name]: [name].includes('content') ? value : checked }));
    handleDataChange()
  }

  // ✅✅✅
  const handle_check_list_update_on_change = async (e, itemId) => {

    let updatedCheckList;
    const { type } = e.target;
    const tempCard = { ...localCard };

    if (type === 'checkbox') {
      updatedCheckList = {
        ...tempCard,
        checkList: tempCard.checkList.map(item => item?._id === itemId
          ? { ...item, checked: e.target.checked }
          : item
        )
      }
    } else {
      updatedCheckList = {
        ...tempCard,
        checkList: tempCard.checkList.map(item => item?._id === itemId
          ? { ...item, content: e.target.value }
          : item
        )
      }
    }

    // update UI
    setLocalCard(updatedCheckList);

    // updated object send at server
    const updatedCheckListItemObj = updatedCheckList?.checkList?.find(({ _id }) => _id === itemId)

    try {
      await updateChecklistItem(selectedSpaceId, listID, card._id, itemId, updatedCheckListItemObj);
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
    }

  }

  // 🟥🟥🟥
  const handle_remove_check_list_item = async (itemId) => {
    const tempCard = { ...localCard };

    const updatedCheckList = {
      ...tempCard,
      checkList: tempCard.checkList.filter(item => item._id !== itemId)
    }
    // updating ui...
    setLocalCard(updatedCheckList);

    try {
      const { data } = await deleteChecklistItem(selectedSpaceId, listID, card._id, itemId);
      toast.success(data?.message, { autoClose: 2000 });
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
    }
  }

  // 🟩🟩🟩 📌📌📌📌📌📌📌📌📌📌📌📌📌📌
  const handle_card_attachments = async e => {

    const files = e.target.files;

    const formData = new FormData();

    for (const file of files) {
      formData.append('attachments', file);
    }

    try {
      setAttachFileLoading(true);
      const { data } = await cardAttachmentUpdateApiCall(selectedSpaceId, listID, card._id, formData);
      setLocalCard(pre => ({ ...pre, attachments: data.updatedCard.attachments }))
      setAttachFileLoading(false);
      handleDataChange()

    } catch (error) {
      console.log(error?.response?.data?.issue);
    }

  }

  // 🟥🟥🟥 📌📌📌📌📌📌📌📌📌📌📌📌📌📌
  const handle_attach_delete = file => {
    setDeleteAttachFileLoading(true);
    setDeleteAttachFile(file)
    handleDataChange()
  }

  // 🟩🟩🟩
  const handle_open_assignee_modal = () => setOpenAssigneeModal(pre => !pre)




  return (
    <section
      className="fixed top-0 right-0 left-0 bottom-0 z-[500] bg-black/30 grid place-items-center overflow-visible "
      onClick={() => setBoardModal(false)}
    >

      <div
        className="bg-gray-50 w-[60%] rounded-2xl h-[85vh] overflow-y-auto customScroll"
        onClick={(e) => e.stopPropagation()}
      >

        {/* 🟨🟨🟨 Section 1 ||| Heading area 🟨🟨🟨 */}
        <div className="flex items-center justify-between border-b border-gray-300 p-2">
          <div className="flex flex-wrap items-center pl-4 text-gray-400 text-sm">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200">
              <RightOK />
              <span onClick={() => setProgress(pre => pre === 4 ? 0 : 4)}>Done</span>
            </div>

            <div className="flex items-center space-x-2 px-3 pl-4">
              <span>Progress:</span>
              <CardProgress progress={progress} setProgress={setProgress} />
            </div>

            {/* 🟨🟨🟨🟨🟨🟨 Assignee Section 🟨🟨🟨🟨🟨🟨 */}
            <div className="relative flex items-center space-x-2 cursor-pointer hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl text-gray-400">

              <div onClick={handle_open_assignee_modal} className='flex gap-2 px-3 py-2'>
                <UserPlus />
                <span>Assignee</span>
              </div>


              {
                openAssigneeModal &&
                <AssigneeUser
                  listID={listID}
                  localCard={localCard}
                  spaceID={selectedSpaceId}
                  setLocalCard={setLocalCard}
                  openAssigneeModal={openAssigneeModal}
                />
              }
            </div>

            {/* <div className="flex items-center space-x-2 cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl">
              <EyeOpen width="22" height="22" />
              <span>Follow</span>
            </div>

            <div className="cursor-pointer p-3 hover:bg-gray-200 hover:text-teal-500 duration-200 rounded-xl">
              Start - Due
            </div> */}
          </div>

          <div className="flex items-center p-3 relative">
            <Dropdown
              button={<DotsSingle
                className="text-[#7088A1] cursor-pointer w-8 h-8 p-1 py-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200"
              />}
              menu={
                () => (
                  <CardSettingDropDown
                    cardID={card._id}
                    setProgress={setProgress}
                    listID={listID}
                    noteDone={noteDone}
                    setNoteDone={setNoteDone}
                    setModalActionToggling={setModalActionToggling}
                    setCardSettingDropDownToggle={setModalActionToggling}
                  />
                )
              }
            />

            <Close
              className="text-[#7088A1] cursor-pointer w-8 h-8 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500 duration-200"
              onClick={() => setBoardModal(false)}
            />
          </div>
        </div>


        {/* 🟨🟨🟨 Section 2 ||| Middle area 🟨🟨🟨 */}
        <div className="flex flex-col border-b border-gray-300 ">
          <div className="flex items-center justify-between p-4 text-gray-400 ">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                {selectedSpace.name}
              </span>
              <ArrowRight />
              <span className="text-xs font-bold cursor-pointer hover:text-teal-500">
                {nameOfBoardList}
              </span>
            </div>

            <div className="text-xs font-bold cursor-pointer hover:text-teal-500">
              {/* MOVE TO NEXT LIST */}
            </div>
          </div>

          <div className="p-3">
            <input
              type="text"
              value={localCard?.name}
              // onChange={e => deBounceGetCardName(e.target.value)}
              onChange={e => setLocalCard(pre => ({ ...pre, name: e.target.value }))}
              onKeyDown={handle_card_name_update_enter_btn}
              className="w-full p-3 outline-none border rounded-md text-teal-500 font-bold bg-gray-50"
            />
          </div>


          {/* Tags */}
          <CardTags
            localCard={localCard}
            setLocalCard={setLocalCard}
            selectedSpaceId={selectedSpaceId}
            listID={listID}
            handleDataChange={handleDataChange}

          />

          {/* Description */}
          <div className="mt-4 ml-4 w-full">
            <div className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
              <Description className="text-[#B9C3CE] group-hover:text-teal-400" />{" "}
              <span>Description</span>
            </div>

            <input
              type="text"
              className="w-[85%] px-3 h-14 ml-10 border border-gray-50 hover:border-gray-200 outline-none bg-gray-50 cursor-pointer rounded-md text-gray-600"
              value={localCard?.description}
              onChange={e => setLocalCard(pre => ({ ...pre, description: e.target.value }))}
              onKeyDown={handle_card_description_update_enter_btn}
            />
          </div>


          {/* Checklist */}
          <div className="mt-4 ml-4 ">
            <div className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
              <CheckList className="text-[#B9C3CE] group-hover:text-teal-400" />{" "}
              <span>Checklist</span>
            </div>

            <div className="space-y-2">
              {
                // check list print/display
                // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
                localCard?.checkList?.length > 0 &&
                localCard?.checkList?.map(item => (
                  <div className="flex items-center justify-between px-8" key={item._id}>

                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      defaultChecked={item.checked}
                      onChange={(e) => handle_check_list_update_on_change(e, item._id)}
                    />

                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => handle_check_list_update_on_change(e, item._id)}
                      className="flex-1 mx-2 px-1 py-0.5 rounded-md border outline-none border-gray-300 focus:border-teal-600 duration-200"
                    />

                    <div className="relative group cursor-pointer px-2 hover:text-red-400">
                      <DotsSingle />
                      <div className="absolute top-[-22px] left-5 hidden group-hover:block bg-gray-200 px-3 py-1 rounded-md">

                        <p
                          className="hover:text-red-500 duration-200 hover:underline text-black"
                          onClick={() => handle_remove_check_list_item(item._id)}
                        >
                          Delete
                        </p>

                        <p className="text-black">Assign</p>

                      </div>
                    </div>
                  </div>
                ))
              }

              {
                // check list input
                // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
                newCheckListItemJSX &&
                <div className="flex items-center justify-between px-8">
                  <input
                    type="checkbox"
                    name="check"
                    className="w-4 h-4 cursor-pointer"
                    checked={checkListItem.checked}
                    onChange={handle_check_list_change}
                  />
                  <input
                    type="text"
                    name="content"
                    value={checkListItem.content}
                    onChange={handle_check_list_change}
                    onKeyDown={handle_check_list_item_enter_btn}
                    className="flex-1 mx-2 px-1 py-0.5 rounded-md border outline-none border-gray-300 focus:border-teal-600 duration-200"
                  />
                  <div className="px-2 cursor-pointer hover:text-red-400">
                    <DotsSingle />
                  </div>
                </div>
              }


              <p className="text-[#B9C3CE] px-3 py-2 rounded-md bg-slate-100 inline-block mt-2 ml-4 cursor-pointer hover:bg-slate-200 duration-150" onClick={handle_create_check_list}>
                Add item to check ist
              </p>
            </div>

          </div>

          <div className="mt-4 ml-4 mb-4">
            <label
              // onChange={cardAttachments}
              // 📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌
              htmlFor="file" className="flex items-center gap-2  p-2 px-3 cursor-pointer w-fit rounded-md duration-200 text-gray-400 hover:bg-gray-200  hover:text-teal-400 group">
              <Attachment className="text-[#B9C3CE] group-hover:text-teal-400" />
              Attachments
              <input
                multiple
                id="file"
                type="file"
                className="hidden"
                onChange={handle_card_attachments}
              />
            </label>
          </div>

          <div className="mb-4 mx-8 flex items-center gap-1 flex-wrap">
            {
              // 📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌
              attachFileLoading &&
              <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/70 grid place-items-center">
                <div className="loading_continuous"></div>
              </div>
            }
            {
              // 📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌
              localCard?.attachments?.length > 0 &&
              localCard?.attachments?.map((file, i) =>
                <div
                  key={i}
                  className="relative rounded-md p-2 cursor-pointer hover:bg-gray-200 group"
                >
                  <div
                    className="absolute top-2 right-2 w-5 h-5 bg-gray-500 rounded-full text-center leading-5 hover:text-red-500 hover:bg-white duration-200 invisible group-hover:visible"
                    onClick={() => handle_attach_delete(file)}
                  >
                    x
                  </div>

                  <img src={file} alt="" className=" w-28 h-24" />
                  <div className="text-sm pt-2">
                    {/* <p><b>{getFileName(file)}</b></p> */}
                    {/* <p>Added <b>time</b></p> */}
                    <p>By <b>{userInfo.username}</b></p>
                  </div>
                </div>
              )
            }

            {
              deleteAttachFileLoading &&
              <ConfirmDialog
                listID={listID}
                cardID={localCard?._id}
                deleteAttachment
                setLocalCard={setLocalCard}
                setDeleteAttachFileLoading={setDeleteAttachFileLoading}
                deleteAttachFile={deleteAttachFile}
              />
            }
          </div>

        </div>


        {/* 🟨🟨🟨 Section 3 ||| Bottom Area 🟨🟨🟨 */}
        <div className=" py-4 flex items-center justify-center space-x-1 cursor-pointer text-gray-400 hover:text-gray-500 duration-150">
          <span>Drop files here or </span>
          <label
            htmlFor="file"
            className="text-teal-600 cursor-pointer hover:text-teal-700 duration-150"
          >
            browse
          </label>
          <input type="file" id="file" className="hidden" />
        </div>

      </div>

    </section>
  );
};

export default CardModal;