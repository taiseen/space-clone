import { useStyleContext } from "../../context/StyleContext";
import { boxHexColorCodes } from "../../constant/data";
import { useSelector } from "react-redux";
import { RightOK } from "../../assets/icons";
import { useEffect, useState } from "react";
import { Close } from "../../assets/icons";
import { toast } from "react-toastify";
import Button from "../Button";
import { create_tag, edit_tag } from "../../api/tags";

const CreateTagModal = ({ setCreateSpaceModal, onUpdate, tag, setTag }) => {
  const { setThemeColor } = useStyleContext();
  const [loading, setLoading] = useState(false);
  const [clickColorBox, setClickColorBox] = useState(tag.color);
  const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.code === "Escape") setCreateSpaceModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setCreateSpaceModal]);

  const handleSpaceCreation = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // tag.tagId
      //   ? await edit_tag({ workSpaceId: userSelectedWorkSpaceId, tagId: tag.tagId, name: tag.name, color: tag.color })
      //   : await create_tag({ workSpaceId: userSelectedWorkSpaceId, name: tag.name, color: tag.color });
      
      setLoading(false);

      if (tag.tagId) {
        await edit_tag({ workSpaceId: userSelectedWorkSpaceId, tagId: tag.tagId, name: tag.name, color: tag.color })
        toast.success('Tag Name Updated...', { autoClose: 2000 });
      } else {
        await create_tag({ workSpaceId: userSelectedWorkSpaceId, name: tag.name, color: tag.color });
        toast.success('New Tag Created...', { autoClose: 2000 });
      }

      onUpdate();

    } catch (error) {
      setLoading(false);
      toast.error(error?.message, { autoClose: 2000 });
    }
    setCreateSpaceModal(false);
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black/70 grid place-items-center   duration-700">
      <div className="relative bg-white rounded-xl shadow-2xl">
        <div
          className="absolute top-2 right-2 w-8 h-8 rounded-lg group hover:bg-gray-200 grid place-items-center cursor-pointer duration-200"
          onClick={() => setCreateSpaceModal(false)}
        >
          <Close
            width="14"
            height="14"
            className="text-gray-400 group-hover:text-themeColor duration-200"
          />
        </div>

        <div className="p-5 py-7 text-gray-600">
          <p className="text-sm text-themeColor font-bold uppercase mb-4 text-center">
            {tag.tagId ? "Update Tag" : "Create New Tag"}
          </p>
          <hr />
          <div className="mt-5 text-sm">
            <label htmlFor="name">Tag Name</label>
            <input
              autoFocus
              required
              id="name"
              type="text"
              placeholder="Add space name..."
              value={tag.name}
              onChange={(e) =>
                setTag((pre) => ({ ...pre, name: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-xl px-2 py-1 outline-none mt-1 focus:border-blue-300 duration-200"
            />
          </div>

          <div className="mt-5 text-sm">
            <p>Tag Color</p>

            <div className="relative px-3 py-2 flex gap-3 items-center justify-between h-12 mt-2">
              {boxHexColorCodes.map((hexColorCode) => (
                <div
                  key={hexColorCode}
                  style={{ backgroundColor: hexColorCode }}
                  className={`${clickColorBox === hexColorCode ? "w-12 h-12" : "w-7 h-7"
                    } transition duration-200 rounded-full cursor-pointer`}
                  onClick={() => {
                    setClickColorBox(hexColorCode);
                    setThemeColor(hexColorCode);
                    setTag((pre) => ({
                      ...pre,
                      color: hexColorCode,
                    }));
                  }}
                >
                  <div
                    className={`grid place-items-center w-full h-full text-white`}
                  >
                    {clickColorBox === hexColorCode && <RightOK />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            loading={loading}
            className="mt-7 mx-auto flex"
            onClick={handleSpaceCreation}
          >
            {tag.tagId ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateTagModal;
