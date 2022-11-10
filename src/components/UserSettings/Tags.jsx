import { Delete, EditPen } from "../../assets/icons";
import { sortByAlphabet } from "../../util/helpers";
import { useSelector } from "react-redux";
import { get_tags } from "../../api/tags";
import { BsTag } from "react-icons/bs";
import { PageLoader } from "../Loader";
import CreateTagModal from "./CreateTagModal";
import DeleteTagModal from "./DeleteTagModal";
import Button from "../Button";
import { useEffect, useState } from "react";


export const Tag = ({ children, color, className }) => {

  return (
    <div
      style={{ backgroundColor: color }}
      className={`text-white w-fit p-1.5 rounded-full ${className}`}
    >
      <p className="text-xs mx-2">{children}</p>
    </div>
  );
};

const Tags = () => {

  const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tagInfo, setTagInfo] = useState({
    spaceId: userSelectedWorkSpaceId,
    tagId: "",
    name: "",
    color: "",
  });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags();
  }, [userSelectedWorkSpaceId]);

  const getTags = async () => {
    try {
      setLoading(true);
      const { data } = await get_tags(userSelectedWorkSpaceId);
      const sortData = sortByAlphabet(data.tags, (item) => item.name);
      setTags(sortData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openEditModal = (item, toDelete) => {
    toDelete ? setDeleteModal(true) : setModal(true);

    setTagInfo((prev) => ({
      ...prev,
      name: item.name,
      tagId: item._id,
      color: item.color,
    }));
  };

  const openModal = () => {
    setModal(true);
    setTagInfo((prev) => ({
      ...prev,
      name: "",
      tagId: "",
      color: "",
    }));
  };



  return (
    <>
      <div className=" min-h-screen  w-[820px] p-5 space-y-4 h-screen ">
        <div className="text-[#7088A1] text-lg font-bold flex ">
          <BsTag className="my-auto mr-2" />
          <h6>Tags overview</h6>
        </div>

        <div className="bg-white p-5 flex justify-between align-middle">
          <h4 className="my-auto">Tags</h4>
          <Button onClick={openModal} className="mt-0">
            Add New Tag
          </Button>
        </div>
        <div className="bg-white p-5 relative rounded-md h-[calc(100%-8.5rem)] overflow-auto">
          {loading ? (
            <PageLoader />
          ) : (
            Object.entries(tags).map(([key, value]) => (
              <div className="mb-10" key={key}>
                <h4 className="uppercase">{key}</h4>
                <hr />
                {value.map((item, i) => (
                  <>
                    <div className="flex justify-between mt-3" key={i}>
                      <Tag className="mb-3" color={item.color}>
                        {item.name}
                      </Tag>
                      <div className="flex align-middle justify-center">
                        <Delete
                          onClick={() => openEditModal(item, true)}
                          className="mr-5 opacity-30 cursor-pointer hove:text-red-500"
                        />
                        <EditPen
                          onClick={() => openEditModal(item)}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <hr className="my-1" />
                  </>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
      {modal && (
        <CreateTagModal
          tag={tagInfo}
          setTag={setTagInfo}
          onUpdate={getTags}
          setCreateSpaceModal={setModal}
        />
      )}
      {deleteModal && (
        <DeleteTagModal
          tag={tagInfo}
          setTag={setTagInfo}
          onUpdate={getTags}
          setCreateSpaceModal={setDeleteModal}
        />
      )}
    </>
  );
};

export default Tags;
