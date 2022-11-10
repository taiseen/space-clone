import { useState } from "react";


const GIF = () => {
  const [text, setText] = useState("");

  return (
    <div className="overflow-y-auto h-full">
      <input
        className="border border-blue-200 p-2 w-full text-base outline-none rounded-lg text-gray-800"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search GIFs"
      />
      {/* <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button> */}
      {/* <div className="flex">
        {results.map((item) => (
          <div className="flex">
            <img src={item.url} alt="pic" />
          </div>
        ))}
      </div> */}
      {/* <GridDemo /> */}
    </div>
  );
};

export default GIF;
