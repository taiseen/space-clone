import { useStyleContext } from "../../context/StyleContext";
import { boxHexColorCodes } from "../../constant/data";
import { useDispatch, useSelector } from "react-redux";
import { addNewSpace } from "../../store/slice/space";
import { spaceCreation } from "../../hooks/useFetch";
import { RightOK } from "../../assets/icons";
import { useEffect, useState } from "react";
import { Close } from "../../assets/icons";
import { toast } from "react-toastify";

const ModalSpaceCreate = ({ setCreateSpaceModal }) => {
  const dispatch = useDispatch();
  const userSelectedWorkSpaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );

  const { setThemeColor } = useStyleContext();

  const [clickColorBox, setClickColorBox] = useState([]);
  const [createNewSpace, setCreateNewSpace] = useState({
    workspaceId: userSelectedWorkSpaceId,
    name: "",
    color: "",
    privacy: "",
  });

  // user esc key press Event Listener for closing modal...
  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.code === "Escape") setCreateSpaceModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setCreateSpaceModal]);

  // add space function...
  const handleSpaceCreation = async (e) => {
    e.preventDefault();

    try {
      const { data } = await spaceCreation(createNewSpace);

      // display a notification for user
      toast.success(`${data?.space?.name} - space create successfully`, {
        autoClose: 3000,
      });

      // add this space into user allSpace [array]... & send back to parent component...
      dispatch(addNewSpace(data?.space));
    } catch (error) {
      // error for developer for deBugging...
      console.log(error.response.data);

      // error for user at notification...
      toast.error(error?.response?.data?.issue?.name, { autoClose: 3000 });
    }

    // reset all input fields...
    setCreateNewSpace({ name: "", color: "", privacy: "" });

    // close this modal
    setCreateSpaceModal(false);
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black/70 grid place-items-center duration-700 z-50">
      <form
        className="relative w-[670px] h-[520px] bg-white rounded-xl shadow-2xl p-3 "
        onSubmit={handleSpaceCreation}
      >
        {/* 🟨🟨🟨 UI For Close Button */}
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
          <p className="text-sm text-themeColor font-bold">CREATE SPACE</p>
          <div className="my-3 text-sm">
            <label htmlFor="name">Space name</label>
            <input
              autoFocus
              required
              id="name"
              type="text"
              placeholder="Add space name..."
              value={createNewSpace.name}
              onChange={(e) =>
                setCreateNewSpace((pre) => ({ ...pre, name: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-xl px-2 py-1 outline-none mt-1 focus:border-blue-300 duration-200"
            />
          </div>

          <div className="p-3 text-gray-400 text-sm hover:bg-gray-100 hover:text-themeColor duration-200 rounded-lg w-fit cursor-pointer">
            Add purpose
          </div>

          {/* 🟨🟨🟨 UI for taking color as input from user 🟨🟨🟨 */}
          <div className="my-2 text-sm">
            <p>Space color</p>

            <div className="relative px-3 py-2 flex gap-3 items-center justify-between h-12 mt-2 w-3/4">
              {boxHexColorCodes.map((hexColorCode) => (
                <div
                  key={hexColorCode}
                  style={{ backgroundColor: hexColorCode }}
                  className={`${
                    clickColorBox === hexColorCode ? "w-12 h-12" : "w-7 h-7"
                  } transition duration-200 rounded-full cursor-pointer`}
                  // 🟡🟡🟡 all color box are ready to listen user click event... 🟡🟡🟡
                  onClick={() => {
                    setClickColorBox(hexColorCode); // for tracking user click...
                    setThemeColor(hexColorCode); // globally set user selected text color
                    setCreateNewSpace((pre) => ({
                      ...pre,
                      color: hexColorCode,
                    })); // pass text color for object creating key:value
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

          <div className="my-2 text-sm">
            <p>Space privacy</p>

            <div className="px-3 py-3">
              {/* 🔘🔘🔘 Radio Buttons 🔘🔘🔘 */}
              <div className="flex items-center gap-3 mb-1">
                <input
                  required
                  type="radio"
                  id="public"
                  value="public"
                  name="spacePrivacy"
                  className="radioButton"
                  onChange={(e) =>
                    setCreateNewSpace((pre) => ({
                      ...pre,
                      privacy: e.target.value,
                    }))
                  }
                />
                <label htmlFor="public" className="cursor-pointer">
                  Public to team
                </label>
              </div>
              <p className="pl-3 text-gray-400">
                Space is visible to members of your team. Only people added to
                the space can edit it.
              </p>

              {/* 🔘🔘🔘 Radio Buttons 🔘🔘🔘 */}
              <div className="flex items-center gap-3 mb-1 mt-4">
                <input
                  required
                  type="radio"
                  id="private"
                  value="private"
                  name="spacePrivacy"
                  className="radioButton"
                  onChange={(e) =>
                    setCreateNewSpace((pre) => ({
                      ...pre,
                      privacy: e.target.value,
                    }))
                  }
                />
                <label htmlFor="private" className="cursor-pointer">
                  Private
                </label>
              </div>

              <p className="pl-3 text-gray-400">
                Space is private. Only people added to the space can view it and
                edit.
              </p>

              <div className="flex gap-2 items-center justify-end mt-5">
                <button
                  className="px-4 py-2 hover:bg-gray-200 bg-gray-100 rounded-lg text-gray-400 duration-200"
                  onClick={() => setCreateSpaceModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-themeColor hover:bg-themeColor/80 rounded-lg text-gray-100"
                >
                  Create Space
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ModalSpaceCreate;
