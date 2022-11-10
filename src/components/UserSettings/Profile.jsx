import { useUserInfoContext } from "../../context/UserInfoContext";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useState } from "react";
import Button from "../Button";
import { updateProfile } from "../../api/settings";
import { toast } from "react-toastify";
import { delete_my_account, get_my_profile } from "../../api/auth";
import { Loader } from "../Loader";
import Input from "../Input";
import { parseError } from "../../util/helpers";
import ConfirmModal from "../ConfirmModal";

const Profile = () => {
  const { loginUserInfo, setLoginUserInfo } = useUserInfoContext();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changePasswordBox, setChangePasswordBox] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [passwordLoader, setPasswordLoader] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLocalUserInfo(loginUserInfo);
    setImage(loginUserInfo.avatar);
  }, [loginUserInfo]);

  const uploadData = async (e) => {
    try {
      setLoading(true);
      await updateProfile(localUserInfo);
      const { data } = await get_my_profile();
      setLoginUserInfo(data.user);
      setLoading(false);
      toast.success("Your profile has been updated!", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const uploadPassword = async (e) => {
    if (password.newPassword !== password.confirmPassword) {
      toast.error("Password do not match!", {
        autoClose: 1000,
      });
      return;
    }
    try {
      setPasswordLoader(true);
      await updateProfile({
        currentPassword: password.oldPassword,
        newPassword: password.newPassword,
      });
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordLoader(false);
      toast.success("Password has been updated!", { autoClose: 1000 });
    } catch (e) {
      const error = parseError(e);
      toast.error(error, { autoClose: 2000 });
      setPasswordLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserInfo({ ...localUserInfo, [name]: value });
  };

  const handleImageChange = async (e) => {
    try {
      setImageLoader(true);
      const file = e.target.files[0];
      await updateProfile({
        avatar: file,
      });
      const { data } = await get_my_profile();
      setLoginUserInfo(data.user);
      setImageLoader(false);
    } catch (e) {
      setImageLoader(false);
    }
  };

  return (
    <>
      <div className=" min-h-screen  w-[820px] p-5 space-y-4 h-screen ">
        <div className="text-[#7088A1] text-lg font-bold flex ">
          <AiOutlineSetting className="my-auto mr-2" />
          <h6>Your Profile</h6>
        </div>

        <div className="h-full overflow-y-auto pb-8">
          <div className="flex gap-4 mt-4">
            {/* user info */}
            <div className="w-[450px] bg-white rounded-md p-4">
              <h6 className="text-[#7088A1] pb-4 text-[18px] font-bold">
                Profile
              </h6>
              <form className="w-[250px]  text-sm text-gray-600 space-y-3">
                <div>
                  <label htmlFor="name">Full name</label>
                  <input
                    type="text"
                    value={localUserInfo?.fullName}
                    name="fullName"
                    onChange={handleChange}
                    className="w-full border p-1.5 rounded-md outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="nickname">Nickname</label>
                  <input
                    type="text"
                    value={localUserInfo?.username}
                    name="username"
                    onChange={handleChange}
                    className="w-full border p-1.5 rounded-md outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    value={localUserInfo?.email}
                    name="email"
                    onChange={handleChange}
                    className="w-full border p-1.5 rounded-md outline-none"
                  />
                </div>
              </form>
              <Button loading={loading} onClick={uploadData} className="mt-5">
                Update
              </Button>
            </div>

            {/* user avatar */}
            <div className=" flex-1 bg-white rounded-md p-4">
              <h6 className="text-[#7088A1] pb-4 text-[18px] font-bold">
                Your avatar
              </h6>

              <div className="w-32 h-32 flex justify-center align-middle mx-auto rounded-full border overflow-hidden">
                {imageLoader ? (
                  <Loader className="my-auto" />
                ) : (
                  <img
                    src={
                      image ||
                      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt="user"
                  />
                )}
              </div>

              <label htmlFor="fileInput">
                <Button className="flex mx-auto">Update your avatar</Button>
              </label>
            </div>
          </div>

          <div className="bg-white p-3 mt-3 rounded-md">
            <h6 className="text-[#7088A1] text-base font-bold"> Language</h6>
            <Button text>English</Button>
          </div>

          <div className="bg-white p-3 mt-3 rounded-md">
            <h6 className="text-[#7088A1] text-base font-bold">Password</h6>

            {!changePasswordBox ? (
              <Button onClick={() => setChangePasswordBox(true)} text>
                Change password
              </Button>
            ) : (
              <div className="w-[450px] bg-white rounded-md mt-5">
                <Input
                  title="Old Password"
                  value={password?.oldPassword}
                  name="oldPassword"
                  onChange={handlePasswordChange}
                  className="mb-3"
                />
                <Input
                  title="New Password"
                  value={password?.newPassword}
                  name="newPassword"
                  onChange={handlePasswordChange}
                  className="mb-3"
                />
                <Input
                  title="Confirm Password"
                  value={password?.confirmPassword}
                  name="confirmPassword"
                  onChange={handlePasswordChange}
                  className="mb-3"
                />
                <div className="flex mt-5">
                  <Button loading={passwordLoader} onClick={uploadPassword}>
                    Update
                  </Button>
                  <Button
                    text
                    loading={loading}
                    onClick={() => setChangePasswordBox(false)}
                    className="ml-3"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-3 rounded-md">
            <h6 className="text-[#7088A1] text-base font-bold">
              Delete your account
            </h6>
            <p className="text-gray-500 text-sm py-2">
              You can delete your account with all your spaces, cards, notes,
              chats etc. Please notice thet your account will be permanently
              removed.
            </p>
            <Button onClick={() => setDeleteModal(true)} text>Delete Account</Button>
          </div>
        </div>
      </div>
      <input
        className="hidden"
        id="fileInput"
        type="file"
        onChange={handleImageChange}
      />
      <ConfirmModal
        title="Delete account"
        description="Are you sure you want to delete your account? This cannot be undone."
        isVisible={deleteModal}
        setVisibility={setDeleteModal}
        api={() => delete_my_account()}
        onComplete={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      />
    </>
  );
};

export default Profile;
