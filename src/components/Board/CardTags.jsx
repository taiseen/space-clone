import { useBoardCardContext } from '../../context/BoardCardContext';
import { create_tag, get_tags } from '../../api/tags';
import { cardUpdateApiCall } from '../../hooks/useFetch';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tag } from '../../assets/icons';
import { toast } from "react-toastify";


const CardTags = (props) => {

    const { localCard, setLocalCard, selectedSpaceId, listID, handleDataChange } = props || {}

    const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);

    const { updateCard } = useBoardCardContext();
    const [showTags, setShowTags] = useState(false);
    const [tagsFromAPI, setTagsFromAPI] = useState([]);
    const [createNewTag, setCreateNewTag] = useState({
        name: "",
        color: "#47b9ea",
    });



    // 🟩🟩🟩
    const handle_add_tags = async (tag) => {
        // add for display at UI
        setLocalCard((pre) => ({ ...pre, tags: [...pre.tags, tag] }));

        // remove from drop-down ui of tag's list
        setTagsFromAPI((pre) => pre.filter((data) => data?._id !== tag?._id));

        const cardTagObject = { ...localCard, tagId: tag._id }

        try {
            const { data } = await cardUpdateApiCall(selectedSpaceId, listID, localCard._id, cardTagObject)
            handleDataChange()

            updateCard(listID, localCard._id, data.updatedCard);
        } catch (error) {
            console.log(error?.response?.data?.issue);
        }
    };

    // 🟥🟥🟥
    const handle_delete_tags = async (tag) => {

        // add for display at UI
        setLocalCard((pre) => ({ ...pre, tags: pre.tags.filter(({ _id }) => _id !== tag._id) }));

        // remove from drop-down ui of tag's list
        setTagsFromAPI((pre) => [...pre, tag]);

        const tempTagObject = { ...localCard }
        const cardTagRemoved = { ...tempTagObject, removeTagId: tag._id }

        try {
            const { data } = await cardUpdateApiCall(selectedSpaceId, listID, localCard._id, cardTagRemoved)

            updateCard(listID, localCard._id, data.updatedCard);
            handleDataChange()

        } catch (error) {
            // error for user at notification...
            toast.error(error?.response?.data?.issue, { autoClose: 3000 });
            console.log(error?.response?.data?.issue);
        }

    };

    // 🟩🟩🟩
    const handle_new_tag_creation = async (e) => {
        e.preventDefault();

        try {
            // POST Method for creating tag's inside a specific workSpace
            const { data } = await create_tag({ workSpaceId: userSelectedWorkSpaceId, ...createNewTag });
            const { data: updateCard } = await cardUpdateApiCall(selectedSpaceId, listID, localCard._id, { tagId: data.tag._id });
            // console.log(updateCard.updatedCard);
            setLocalCard(updateCard.updatedCard);
            setTagsFromAPI((pre) => pre.filter((data) => data?._id !== data?.tag?._id));
            handleDataChange()
        } catch (error) {
            console.log(error)
        }

        // close drop down tag container...
        setShowTags(false);

        // clear input field
        setCreateNewTag((pre) => ({ ...pre, name: "" }));
    };


    useEffect(() => {
        const getTags = async () => {
            try {
                // GET Method || For fetching all tag's under specific workShop
                const { data } = await get_tags(userSelectedWorkSpaceId);

                // tags
                const remainTag = data?.tags.filter(({ _id }) => !localCard?.tags?.some(tag => tag._id === _id));

                setTagsFromAPI(remainTag);
            } catch (error) {
                console.log(error);
            }
        };

        getTags();
    }, [userSelectedWorkSpaceId, createNewTag]);




    return (
        <div className="p-3 flex relative">
            <div
                className="ml-2 w-10 h-10 grid place-items-center cursor-pointer hover:bg-gray-100 rounded-md duration-200 group"
                onClick={() => setShowTags((pre) => !pre)}
            >
                <Tag className="text-[#B9C3CE] group-hover:text-teal-400" />
            </div>

            <div className="flex items-center flex-wrap gap-2 border border-transparent w-full rounded-md px-2 hover:border-gray-300 customScroll">
                {
                    // 🟨🟨🟨 Just Tag Display at Capsule Formate...
                    localCard?.tags?.map(tag => (
                        <span
                            key={tag?._id}
                            style={{ backgroundColor: tag.color }}
                            className={`px-2 py-1 text-white cursor-pointer rounded-full`}
                            onClick={() => handle_delete_tags(tag)}
                        >
                            {tag.name}
                        </span>
                    ))
                }
                {
                    tagsFromAPI.length > 0 ? (
                        <form onSubmit={handle_new_tag_creation}>
                            <input
                                type="text"
                                placeholder="Add a tag..."
                                className="ml-2 py-2 outline-none bg-gray-50"
                                value={createNewTag.name}
                                onChange={(e) =>
                                    setCreateNewTag((pre) => ({
                                        ...pre,
                                        name: e.target.value,
                                    }))
                                }
                                onClick={() => setShowTags(true)}
                            />
                        </form>
                    ) : null
                }
            </div>

            {
                // 🟨🟨🟨 all tags 🟨🟨🟨
                showTags && (
                    <div className="max-h-[255px] overflow-y-auto absolute top-[60px] left-[60px] right-0 flex flex-col text-gray-100 shadow-2xl bg-white customScroll">
                        {tagsFromAPI.map((tag, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setShowTags(false);
                                    handle_add_tags(tag);
                                }}
                                className="pl-3 py-2 hover:bg-gray-300 flex items-center cursor-pointer"
                            >
                                <span
                                    className={`px-2 py-1 w-fit rounded-full`}
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag?.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default CardTags