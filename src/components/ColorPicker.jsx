import { boxHexColorCodes } from "../constant/data";
import { RightOK } from "../assets/icons";

const ColorPicker = ({ value, onChange }) => {
  return (
    <div className="flex align-middle flex-wrap">
      {boxHexColorCodes.map((hexColorCode, i) => (
        <div className="w-12 h-12 flex justify-center" key={i}>
          <div
            key={hexColorCode}
            style={{ backgroundColor: hexColorCode }}
            className={`${value === hexColorCode ? "w-full h-full" : "w-7 h-7"
              } transition duration-200 rounded-full cursor-pointer my-auto`}
            onClick={() => onChange(hexColorCode)}
          >
            <div className={`grid place-items-center w-full h-full text-white`}>
              {value === hexColorCode && <RightOK />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
