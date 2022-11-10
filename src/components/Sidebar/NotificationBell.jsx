import { useStyleContext } from "../../context/StyleContext";
import asserts from "../../assets";

const NotificationBell = ({ userNotificationBell }) => {
  return (
    <section>
      <div className="flex justify-between text-sm text-gray-500">
        <span className="px-3 py-2 hover:bg-gray-300 duration-200 rounded-lg hover:text-fuchsia-600 cursor-pointer font-bold">
          Notifications
        </span>

        <div className="flex">
          <span className="px-3 py-2 hover:bg-gray-300 duration-200 rounded-lg hover:text-fuchsia-600 cursor-pointer font-bold">
            Archive all
          </span>

          <span className="px-3 py-2 hover:bg-gray-300 duration-200 rounded-lg hover:text-fuchsia-600 cursor-pointer font-bold">
            Mark all as read
          </span>
        </div>
      </div>
      {Array.from({ length: 5 }).map(() => (
        <div className="flex items-center gap-3 p-2 border-b border-gray-300 text-sm mt-2">
          <img src={asserts.Mahbub} className="w-11 h-11 rounded-full" alt="" />
          <div>
            <p>
              Mahbub invited you to the private space{" "}
              <span className="underline">Space Clone: </span>
            </p>
            <p className="text-gray-400 text-xs pt-1">Jun 25 at 3:30 PM</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default NotificationBell;
