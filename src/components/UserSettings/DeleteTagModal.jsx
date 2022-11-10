import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { delete_tag } from "../../api/tags";
import { useSelector } from "react-redux";
import Button from "../Button";


const DeleteTagModal = ({ setCreateSpaceModal, onUpdate, tag }) => {

  const [loading, setLoading] = useState(false);
  const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.code === "Escape") setCreateSpaceModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setCreateSpaceModal]);

  const onDelete = async (e) => {
    try {
      setLoading(true);
      await delete_tag({ workSpaceId: userSelectedWorkSpaceId, tagId: tag.tagId });
      onUpdate();
      toast.success('Tag Deleted...', { autoClose: 2000 });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.issue?.name, { autoClose: 3000 });
    }
    setCreateSpaceModal(false);
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black/70 grid place-items-center   duration-700">
      <div className="relative bg-white rounded-xl shadow-2xl p-5 ">
        <p className="text-lg font-bolder text-themeColor uppercase mb-1">
          DELETE TAG
        </p>
        <p>Are you sure you want to delete this tag? This cannot be undone.</p>
        <div className="flex">
          <Button loading={loading} onClick={onDelete}>
            Delete
          </Button>
          {!loading && (
            <Button
              className="ml-2"
              text
              loading={loading}
              onClick={() => setCreateSpaceModal(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DeleteTagModal;
