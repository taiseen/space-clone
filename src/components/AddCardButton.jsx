import { useStyleContext } from "../context/StyleContext";
import { RiAddCircleFill } from "react-icons/ri";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
import { AddCard } from ".";


const AddCardButton = () => {

    // const location = useLocation();
    const { margin } = useStyleContext();
    const [addCard, setAddCard] = useState(false);


    return (
        // <div className={`${margin ? location.pathname === '/timeline' ? 'ml-[325px] w-[83%]' : 'ml-[312px] w-[83%]' : location.pathname === '/timeline' ? 'ml-[45px] w-[97.7%]' : 'ml-[35px] w-[97.7%]'} fixed bottom-0 p-4 bg-gray-200 duration-200`}>

        <div className={`${margin ? 'ml-[325px]' : 'ml-[50px] '} fixed bottom-0 left-0 right-0 p-4 bg-gray-200 duration-200`}>
            <div
                onClick={() => setAddCard(true)}
                className="flex gap-3 items-center border border-dashed border-black p-3 rounded bg-white text-gray-500 cursor-pointer duration-300 hover:bg-gray-200"
            >
                <RiAddCircleFill className="text-2xl" />
                <h1>ADD A CARD</h1>
            </div>

            {
                addCard &&
                <AddCard setAddCard={setAddCard} />
            }
        </div>
    )
}

export default AddCardButton