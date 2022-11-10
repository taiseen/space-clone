import { removeSpace, setSelectedSpaceId, setSelectedSpaceObject, updateSpace } from "../../store/slice/space";
import { delete_space, update_space } from "../../api/space";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PRIVACY } from '../../constant/enums'
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { toast } from "react-toastify";
import ColorPicker from "../ColorPicker";
import Button from "../Button";


const Setting = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { selectedSpace, allSpaces } = useSelector(state => state.space);
  const [deletingSpaceModal, setDeletingSpaceModal] = useState(false)
  const [space, setSpace] = useState({
    name: "",
    description: "",
    color: "",
    privacy: "",
  });

  useEffect(() => {
    const currentSpace = allSpaces?.find(({ _id }) => _id === selectedSpace);
    if (currentSpace) {
      setSpace(currentSpace);
    } else {
      // when space deleting... by default select it...
      setSpace(allSpaces[0]);
      dispatch(setSelectedSpaceId(allSpaces[0]._id));
    }
  }, [selectedSpace, allSpaces]);


  const onChange = (e) => setSpace({ ...space, [e.target.name]: e.target.value })


  const onSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await update_space(selectedSpace, space);
      dispatch(updateSpace(space));
      dispatch(setSelectedSpaceObject(space));
      toast.success(data.message, { autoClose: 1000 });
      setLoading(false);
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      setLoading(false);
      console.log(error);
    }
  };


  const handleDeletingSpace = async () => {
    try {
      const { data } = await delete_space(selectedSpace)
      dispatch(removeSpace(selectedSpace))
      toast.success(data.message, { autoClose: 1000 });
    } catch (error) {
      toast.error(error.workspaceId, { autoClose: 1000 });
    }
  }

  return (
    <section className="p-2 pb-[100px] customScroll">
      <div className="flex text-teal-600 text-sm">
        <FiSettings className="my-auto" />{" "}
        <span className="my-auto pl-2">Setting</span>
      </div>

      {/* <p className="text-sm text-gray-400 p-3">
        Note that only Space manager can fully modify space settings.
      </p> */}

      <div className="mt-5 bg-white p-3.5 rounded-md">
        <div className="flex text-gray-600">
          <AiOutlineInfoCircle className="my-auto" />
          <h6 className="pl-3"> Details</h6>
        </div>

        <div className="py-3">
          <label className="text-gray-700">Space Name</label>
          <input
            name="name"
            value={space?.name}
            onChange={onChange}
            type="text"
            placeholder="Space clone"
            className="border w-full bg-slate-100 rounded-md p-1 mt-2"
          />
        </div>

        <div>
          <label className="pb-1.5 text-gray-700">Purpose</label>
          <textarea
            value={space?.description || ""}
            name="description"
            onChange={onChange}
            id=""
            rows="3"
            className="border w-full bg-slate-100 rounded-md p-1 mt-2"
          ></textarea>
        </div>
      </div>
      <div className="mt-5 bg-white p-3.5 rounded-md">
        <div className="flex text-gray-600 mb-3">
          <AiOutlineInfoCircle className="my-auto" />
          <h6 className="pl-3">Color</h6>
        </div>
        <ColorPicker
          value={space?.color}
          onChange={(c) => setSpace((prev) => ({ ...prev, color: c }))}
        />
      </div>

      <div className="my-5 bg-white p-3.5 rounded-md">
        <div className="flex justify-between text-gray-600">
          <div className="flex text-gray-700">
            <AiOutlineInfoCircle className="my-auto" />
            <h6 className="pl-3">Space privacy</h6>
          </div>
        </div>

        <div className="py-3">
          <div className="flex items-center gap-3 mb-1">
            <input
              id="public"
              type="radio"
              value="public"
              className="radioButton"
              checked={space?.privacy === PRIVACY.PUBLIC}
              onChange={(e) =>
                setSpace((pre) => ({
                  ...pre,
                  privacy: e.target.value,
                }))
              }
            />
            <label htmlFor="public" className="cursor-pointer">
              Public to team
            </label>
          </div>
          <p className="pl-7 text-xs text-gray-400">
            Space is visible to members of your team. Only people added to the
            space can edit it.
          </p>

          <div className="flex items-center gap-3 mb-1 mt-4">
            <input
              id="private"
              type="radio"
              value="private"
              className="radioButton"
              checked={space?.privacy === PRIVACY.PRIVATE}
              onChange={(e) =>
                setSpace((pre) => ({
                  ...pre,
                  privacy: e.target.value,
                }))
              }
            />
            <label htmlFor="private" className="cursor-pointer">
              Private
            </label>
          </div>

          <p className="pl-7 text-xs text-gray-400">
            Space is private. Only people added to the space can view it and
            edit.
          </p>
        </div>
      </div>
      <Button onClick={onSubmit} loading={loading} block className="mt-5">
        Save
      </Button>

      <button
        className="mt-5 text-gray-600 w-full bg-gray-300 py-2 rounded-md duration-200 hover:text-red-400"
        onClick={() => setDeletingSpaceModal(true)}
      >
        Delete this space
      </button>

      {
        deletingSpaceModal &&
        <div className="bg-black/70 fixed right-0 top-0 left-0 bottom-0 z-30 grid place-items-center" onClick={() => setDeletingSpaceModal(false)}>

          <div className="text-center bg-white p-8 rounded-md text-gray-800">
            <h2 className="text-xl">Are you sure to delete this space?</h2>
            <p className="text-sm text-red-500">By deleting you will lost all of your working data associated with this space.</p>
            <div className="space-x-4 mt-4">

              <button className="w-12 py-1 bg-red-400 hover:bg-red-500 rounded-md duration-200 hover:text-gray-900"
                onClick={handleDeletingSpace}>
                Yes
              </button>

              <button className="w-12 py-1 bg-green-400 hover:bg-green-500 rounded-md duration-200 hover:text-gray-900"
                onClick={() => setDeletingSpaceModal(false)}
              >No
              </button>
            </div>
          </div>
        </div>
      }

    </section>
  );
};

export default Setting;
