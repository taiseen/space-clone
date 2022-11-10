import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

const ConfirmModal = ({
  setVisibility,
  isVisible,
  onComplete,
  api,
  title,
  description,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.code === "Escape") setVisibility(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setVisibility]);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await api();
      onComplete();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { autoClose: 1000 });
    }
    setVisibility(false);
  };
  if (!isVisible) {
    return null;
  }
  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black/70 grid place-items-center  duration-700">
      <div className="relative bg-white rounded-xl shadow-2xl p-5 ">
        <p className="text-lg font-bolder text-themeColor uppercase mb-1">
          {title}
        </p>
        <p>{description}</p>
        <div className="flex">
          <Button loading={loading} onClick={onConfirm}>
            Confirm
          </Button>
          {!loading && (
            <Button
              className="ml-2"
              text
              loading={loading}
              onClick={() => setVisibility(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConfirmModal;
