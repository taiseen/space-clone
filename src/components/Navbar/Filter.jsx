import React, { useEffect, useState } from "react";
import { TbFilter } from "react-icons/tb";
import { capitalize } from "lodash";
import color from "../../colors.json";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { setBoardFilter, setAssignedFilter } from "../../store/slice/board";
import { get_space_members } from "../../api/space";
import { Loader, PageLoader } from "../Loader";

const Option = ({
  value,
  onChange,
  label,
  state,
  parent,
  background,
  multiselect,
}) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.board);

  const update = (data) => {
    dispatch(setBoardFilter(data));
  };
  return (
    <div className="flex items-center gap-3 mb-3">
      <input
        type={multiselect ? "checkbox" : "radio"}
        value={value}
        className={multiselect ? "checkBox" : "radioButton"}
        checked={
          multiselect
            ? filter[parent].includes(value)
            : value === filter[parent]
        }
        onChange={(v) => {
          const vl = v.target.value;
          if (multiselect) {
            const prevClone = [...filter[parent]];
            const isSelected = prevClone.some((s) => s === vl);
            if (isSelected) {
              const newSelects = prevClone.filter((s) => s !== vl);
              update({ ...filter, [parent]: newSelects });
            } else {
              update({ ...filter, [parent]: [...prevClone, vl] });
            }
          } else {
            update({ ...filter, [parent]: vl });
          }
        }}
      />
      <label
        htmlFor="public"
        className={` font-bold cursor-pointer ${
          background ? "text-white px-3 py-1 text-sm" : "text-gray-400"
        } bg-${background}-500 rounded-full`}
      >
        {label}
      </label>
    </div>
  );
};

const Filter = () => {
  const { filterObject } = useSelector((state) => state.board);
  const { selectedSpace } = useSelector((state) => state.space);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getMembers();
  }, [selectedSpace]);
  const getMembers = async () => {
    try {
      setLoader(true);
      const { data } = await get_space_members(selectedSpace);
      dispatch(setAssignedFilter(data.members));
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  return (
    <section className="p-2 pb-[100px]">
      <div className="flex justify-between">
        <div className="flex text-teal-600 text-sm">
          <TbFilter className="my-auto" />{" "}
          <span className="my-auto pl-2">Filter</span>
        </div>
        <Button className="mt-0" text sm>
          Clear filters
        </Button>
      </div>
      {loader ? (
        <PageLoader size={15} className="mt-10" />
      ) : (
        filterObject.map((item) => (
          <div className="my-5 bg-white p-3.5 rounded-md">
            <h6 className="font-bold text-gray-500 ">
              {capitalize(item.parent)}
            </h6>
            <div className="py-3">
              {item.options.map((option) => (
                <Option
                  multiselect={item.multiselect}
                  background={option.tag?.color}
                  label={option.tag?.name || option.label}
                  value={option.value}
                  parent={item.parent}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Filter;
