import { cardUpdateApiCall, getCardAsList } from "../../hooks/useFetch";
import { useStyleContext } from "../../context/StyleContext";
import { create_tag, get_tags } from "../../api/tags";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CardModal } from "../Board";
import { AddCardButton } from "..";
import AssigneeUser from "../AssigneeUser/AssigneeUser";
import CardProgress from "../Board/CardProgress";
import images from "../../assets";
import Dropdown from "../Dropdown";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { RightOK } from "../../assets/icons";

const CardAsList = ({ selectedSpaceId }) => {
  const userSelectedWorkSpaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const { updateCard } = useBoardCardContext();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [allCardAsList, setAllCardAsList] = useState([]);
  const [cardModal, setCardModal] = useState(false);
  const [localCard, setLocalCard] = useState({});
  const [progress, setProgress] = useState(0);
  const { margin } = useStyleContext();
  const [tagsFromAPI, setTagsFromAPI] = useState([]);

  const [openAssigneeUserModal, setOpenAssigneeUserModal] = useState({
    isOpen: false,
    index: 0,
  });

  const [openCardProgress, setOpenCardProgress] = useState({
    isOpen: false,
    index: 0,
  });

  const [openTagModal, setOpenTagModal] = useState({
    isOpen: false,
    index: 0,
  });

  const [createNewTag, setCreateNewTag] = useState({
    name: "",
    color: "#47b9ea",
  });

  const [showTagsDropDown, setShowTagsDropDown] = useState(false);

  const cardsList = async () => {
    try {
      const { data } = await getCardAsList(selectedSpaceId);
      setAllCardAsList(data?.cards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cardsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpaceId]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await get_tags(userSelectedWorkSpaceId);
        setTagsFromAPI(data.tags);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [showTagsDropDown, userSelectedWorkSpaceId]);

  const filterTags = (tagsOfArray) => {
    const tagsID = tagsOfArray.map((tag) => tag._id);

    const remainTag = tagsFromAPI?.filter(({ _id }) => !tagsID?.includes(_id));

    return remainTag;
  };

  const handle_new_tag_creation = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { data } = await create_tag({
        workSpaceId: userSelectedWorkSpaceId,
        ...createNewTag,
      });
      await cardUpdateApiCall(
        selectedSpaceId,
        localCard?.listRef?._id,
        localCard?._id,
        { tagId: data?.tag?._id }
      );
      toast.success("New tag create + add successful");

      // refetch all Card-as-List info
      cardsList();
    } catch (error) {
      console.log(error.response.data.issue);
      toast.error(error.response.data.issue.message);
    }
    setCreateNewTag((pre) => ({ ...pre, name: "" }));
  };

  const handle_add_tags = async (tag, i) => {
    setTagsFromAPI((pre) => pre.filter((data) => data?._id !== tag?._id));

    setAllCardAsList((pre) =>
      pre.map((oldTag, idx) =>
        idx === i ? { ...oldTag, tags: [...oldTag.tags, tag] } : oldTag
      )
    );

    try {
      await cardUpdateApiCall(
        selectedSpaceId,
        localCard?.listRef?._id,
        localCard?._id,
        { tagId: tag?._id }
      );
      cardsList();
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
  };

  const handle_delete_tags = async (tagDelete, cardIdx) => {
    setAllCardAsList((pre) =>
      pre.map((cardList, idx) =>
        idx === cardIdx
          ? {
              ...cardList,
              tags: cardList.tags.filter((tag) => tag?._id !== tagDelete._id),
            }
          : cardList
      )
    );

    try {
      await cardUpdateApiCall(
        selectedSpaceId,
        localCard?.listRef?._id,
        localCard?._id,
        { removeTagId: tagDelete._id }
      );
      cardsList();
    } catch (error) {
      toast.error(error?.response?.data?.issue, { autoClose: 3000 });
      console.log(error?.response?.data?.issue);
    }
  };

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
  };

  const cardProgressUpdate = async (p, cardData) => {
    const cardTagObject = { ...cardData, progress: p };
    try {
      setAllCardAsList((pre) =>
        pre.map((card) =>
          card._id === cardData._id ? { ...card, progress: p } : card
        )
      );
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        cardData?.listRef?._id,
        cardData._id,
        cardTagObject
      );
      updateCard(cardData?.listRef?._id, cardData._id, data.updatedCard);
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
  };

  return allCardAsList?.length === 0 ? (
    <div
      className={`${
        margin ? "ml-[325px] w-[81vw]" : "ml-[50px] w-[95vw]"
      } w-full h-screen flex items-center justify-center flex-col text-center gap-3`}
    >
      <img src={images.cardAsList} alt="cardAsList" className="w-28" />
      <p className="text-2xl font-bold text-slate-400">
        There are no tasks assigned to <br /> you
      </p>

      <p className="text-slate-400 text-sm">
        We’ve searched everything but still no result. Maybe a <br /> little
        spelling mistake?
      </p>
    </div>
  ) : (
    <section className={`pt-20 px-3 bg-gray-100 h-screen `}>
      <table
        className={`
          ${margin ? "ml-[325px] w-[81vw]" : "ml-[50px] w-[95vw]"} 
          duration-200 text-left  `}
      >
        <thead className="sticky top-0 left-0 right-0 z-50">
          <tr className="bg-white p-8 text-gray-400 font-thin font-[Signika]">
            <th className="py-3 px-4">Card Name</th>
            <th className="py-3 px-4 mx-auto">Assign</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Progress</th>
            <th className="py-3 px-4">List</th>
            <th className="py-3 px-4">Tags</th>
          </tr>
        </thead>

        <tbody className="bg-gray-200/70 ">
          {allCardAsList?.length > 0 &&
            allCardAsList.map((card, i) => (
              <tr
                key={card?._id}
                className={`${i % 2 && "bg-slate-100"}`}
                onClick={() => setLocalCard(card)}
              >
                {/* Card Name */}
                <td
                  className="p-1 cursor-pointer"
                  onClick={() => setCardModal(true)}
                >
                  <div className="p-3 hover:bg-gray-300 duration-200 rounded-lg">
                    {card?.name}
                  </div>
                </td>

                {/* Assignee User */}
                <td className="p-1">
                  <div
                    className={`cursor-pointer ${
                      card?.assignee?.length > 0 ? "w-fit" : "w-10 "
                    } 
                    relative h-10 flex justify-center items-center rounded-md duration-200 hover:bg-gray-200 group mx-auto`}
                  >
                    {card?.assignee?.length > 0 ? (
                      card?.assignee?.slice(0, 2)?.map((user) => (
                        <div
                          key={user?._id}
                          className={`flex justify-center  relative ${
                            i !== 0 && `-left-${i}`
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocalCard(card);
                            setOpenAssigneeUserModal((pre) => ({
                              ...pre,
                              isOpen: !pre.isOpen,
                              index: i,
                            }));
                          }}
                        >
                          {user?.avatar ? (
                            <img
                              src={user?.avatar}
                              alt=""
                              className={`w-6 h-6 rounded-full`}
                              style={{ aspectRatio: "1:1" }}
                            />
                          ) : (
                            <p className="w-6 h-6 rounded-full bg-gray-400 leading-6 text-center">
                              {user?.fullName.charAt(0).toUpperCase()}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div
                        className="relative"
                        onClick={() => {
                          setLocalCard(card);
                          setOpenAssigneeUserModal((pre) => ({
                            ...pre,
                            isOpen: !pre.isOpen,
                            index: i,
                          }));
                        }}
                      >
                        <HiOutlineUserAdd className="text-xl text-gray-600 group-hover:text-teal-500" />
                      </div>
                    )}
                    <div>
                      {card?.assignee?.length > 2 && (
                        <p className="w-6 h-6 rounded-full bg-gray-400 leading-6 text-center relative -left-5">
                          {card.assignee.length}+
                        </p>
                      )}
                    </div>
                    {openAssigneeUserModal.isOpen &&
                      openAssigneeUserModal.index === i && (
                        <AssigneeUser
                          className="absolute"
                          listID={localCard?.listRef?._id}
                          localCard={localCard}
                          spaceID={localCard?.spaceRef}
                          setLocalCard={setLocalCard}
                          handleDataChange={cardsList}
                          openAssigneeModal={openAssigneeUserModal.isOpen}
                        />
                      )}
                  </div>
                </td>

                {/* Date */}
                <td className="p-1">
                  <span className="p-2 cursor-pointer rounded-lg duration-200 hover:bg-gray-300 hover:text-teal-500">
                    Set Dates
                  </span>
                </td>

                {/* Progress */}
                <td className="p-1">
                  <Dropdown
                    width={330}
                    button={
                      // <div
                      // onClick={() =>
                      //   setOpenCardProgress((pre) => ({ ...pre, index: i }))
                      // }
                      //   className={`w-12 h-12 m-auto text-center leading-[48px] cursor-pointer rounded-full text-sm bg-white hover:bg-gray-200 hover:text-purple-900 duration-200 relative ${
                      //     card?.progress === 4 ? "bg-teal-400" : " bg-gray-400"
                      //   }`}
                      // >
                      //   {card?.progress === 4 ? (
                      //     <RightOK />
                      //   ) : (
                      //     progressStatus(card?.progress) + "%"
                      //   )}
                      // </div>
                      <div
                        onClick={() =>
                          setOpenCardProgress((pre) => ({ ...pre, index: i }))
                        }
                        className={`cursor-pointer m-auto flex items-center justify-center w-10 h-10 rounded-full text-white
                        ${
                          card?.progress === 4 ? "bg-teal-400" : " bg-gray-400"
                        }`}
                      >
                        {card?.progress === 4 ? (
                          <RightOK />
                        ) : (
                          <span className="text-xs text-center">
                            {progressStatus(card?.progress)}%
                          </span>
                        )}
                      </div>
                    }
                    menu={() => (
                      <CardProgress
                        setProgress={(v) => {
                          // console.log(v,);
                          cardProgressUpdate(v, card);
                        }}
                        progress={card?.progress}
                      />
                    )}
                  />
                </td>

                {/* user name */}
                <td className="p-1">
                  <span className="p-3 cursor-pointer hover:text-teal-300 duration-200">
                    {userInfo.fullName}
                  </span>
                </td>

                {/* Tags */}
                <td className="p-1 space-x-1 flex items-center">
                  {card?.tags?.length > 0 &&
                    card?.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag?._id}
                        style={{ backgroundColor: tag.color }}
                        className="cursor-pointer text-sm rounded-full px-2 py-1 text-white self-center"
                      >
                        {tag.name}
                      </span>
                    ))}
                  <div
                    className="relative px-3 text-white bg-gray-500 rounded-full cursor-pointer w-fit"
                    onClick={() =>
                      setOpenTagModal((pre) => ({
                        ...pre,
                        isOpen: !pre.isOpen,
                        index: i,
                      }))
                    }
                  >
                    ...
                    {openTagModal.isOpen && openTagModal.index === i && (
                      <div className="absolute w-64 p-2 bg-white top-8 left-[50%] translate-x-[-50%] rounded-md z-50 flex flex-wrap gap-2 items-center">
                        {card?.tags?.length > 0 &&
                          card?.tags?.map((tag, tagIdx) => (
                            <span
                              key={tag?._id}
                              style={{ backgroundColor: tag.color }}
                              className="cursor-pointer text-sm rounded-full px-2 py-1"
                              onClick={() => handle_delete_tags(tag, tagIdx, i)}
                            >
                              {tag.name}
                            </span>
                          ))}
                        <form onSubmit={handle_new_tag_creation}>
                          <input
                            type="text"
                            placeholder="Add a tag"
                            className="ml-2 py-1 px-2 outline-none bg-gray-100 w-24 rounded-md text-black"
                            value={createNewTag.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTagsDropDown((pre) => !pre);
                            }}
                            onChange={(e) =>
                              setCreateNewTag((pre) => ({
                                ...pre,
                                name: e.target.value,
                              }))
                            }
                          />
                        </form>
                        {showTagsDropDown && (
                          <div className="bg-white text-black flex flex-col pr-2 h-64 overflow-auto w-full customScroll">
                            {filterTags(card?.tags)?.length > 0 &&
                              filterTags(card?.tags)?.map((tag) => (
                                <p
                                  key={tag?._id}
                                  className="cursor-pointer my-1 text-white"
                                  onClick={() => handle_add_tags(tag, i)}
                                >
                                  <span
                                    style={{ backgroundColor: tag.color }}
                                    className="text-sm rounded-full px-2 py-1"
                                  >
                                    {tag.name}
                                  </span>
                                </p>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <AddCardButton />

      {
        // When Task Click >>> then Modal Open
        cardModal && (
          <CardModal
            card={localCard}
            listID={localCard?.listRef?._id}
            progress={progress}
            setProgress={setProgress}
            setBoardModal={setCardModal}
            handleDataChange={cardsList}
            // noteDone={noteDone}
            // setNoteDone={setNoteDone}
          />
        )
      }
    </section>
  );
};

export default CardAsList;
