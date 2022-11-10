import { Plus } from '../../assets/icons';
import { useState } from 'react';


// This <Component /> called by 🟨🟨🟨 Board.jsx 🟨🟨🟨
// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const AddBtn = ({ onSubmit, btnText, placeHolder }) => {

    const [userInput, setUserInput] = useState('');
    const [inputToggle, setInputToggle] = useState(false);


    const handleSubmit = e => {
        e.preventDefault();

        // value send into caller/Parent component...
        if (onSubmit) onSubmit(userInput);

        // Reset input field + Close User Input Window after user input something
        setUserInput('');
        setInputToggle(false);
    }


    // handle keyBoard enter button press
    const handleEnter = (e) => {
        if (e.key === 'Enter') handleSubmit(e);
    }



    return (
        <div className={`${btnText === 'card' ? 'w-full rounded-b-lg' : 'w-72 rounded-lg'} bg-gray-100 cursor-pointer hover:bg-gray-200`}>
            {
                inputToggle
                    ? (
                        <form className='w-full px-3 py-2' onSubmit={handleSubmit}>
                            <textarea
                                row='3'
                                required
                                autoFocus
                                value={userInput}
                                placeholder={placeHolder}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleEnter}
                                className={`mt-1.5 px-3 py-2 w-full rounded-lg outline-none border border-transparent focus:border-blue-400 ${btnText === 'card' && 'border-t-4 border-teal-400'}`}
                            />
                            <div className='flex justify-end gap-2 mt-3 mb-2'>
                                <div
                                    onClick={() => { setInputToggle(false); setUserInput('') }}
                                    className='px-2 py-2 duration-200 hover:bg-gray-300 hover:text-red-500 rounded-xl select-none cursor-pointer'
                                >
                                    Cancel
                                </div>

                                {/* 🚧🚧🚧 If 2 button tag's use here, interpreter show Form not connected warning in console 🚧🚧🚧 */}

                                <button
                                    primary="true"
                                    type="submit"
                                    className='px-3 py-1 duration-200 text-white bg-teal-500 hover:text-white rounded-xl'
                                >
                                    Add {btnText}
                                </button>
                            </div>
                        </form>
                    )
                    : (
                        <div
                            className='flex items-center space-x-3 px-3 py-2'
                            onClick={() => setInputToggle(true)}
                        >
                            <Plus className={`${btnText === 'card' ? 'text-gray-200 bg-gray-400 p-1 rounded-full' : 'text-gray-500'}`} />
                            <p className='text-gray-500 text-lg'>Add a {btnText}...</p>
                        </div>
                    )
            }
        </div >

    )
}

export default AddBtn