import { CgClose } from 'react-icons/cg';


const AddCard = ({ setAddCard }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('click');
    }


    return (
        <div
            className='fixed top-0 bottom-0 left-0 right-0 w-screen min-h-screen bg-gray-500/60 flex items-center justify-center overflow-hidden'
            onClick={() => setAddCard(false)}
        >
            <div className='w-[500px] bg-white rounded-[16px] px-5 py-3 relative'>

                <h2 className='text-purple-900/70 font-bold'>Create a card</h2>

                {/* 🟨🟨🟨 Close Button */}
                <div onClick={() => setAddCard(false)}
                    className='absolute right-1 top-1 py-2 px-3 rounded-xl cursor-pointer duration-200 hover:bg-gray-100 hover:text-pink-800/70'
                >
                    <CgClose className='text-xl' />
                </div>

                <form action="" className='py-3 text-gray-300' onSubmit={handleSubmit}>
                    <label htmlFor="cardName" className='text-[12px]'>Card name</label>
                    <input id='cardName' type="text" placeholder='Type in a card name...' className='w-full py-1 px-2 border rounded-xl outline-none focus:border-blue-300 duration-200 placeholder:text-sm' />

                    <label htmlFor="space" className='text-[12px]'>Space</label>
                    <select name="" id="space" className='w-[97%] block px-1 py-2 mt-2 border rounded-lg cursor-pointer outline-none font-bold hover:text-purple-900/70 duration-200 text-sm'>
                        <option value="">Developer Space</option>
                        <option value="">Space Clone</option>
                    </select>

                    <label htmlFor="list" className='text-[12px]'>List</label>
                    <select name="" id="list" className='w-[97%] block px-1 py-2 mt-2 border rounded-lg cursor-pointer outline-none font-bold hover:text-purple-900/70 duration-200 text-sm'>
                        <option value="">Taiseen Vai</option>
                        <option value="">Mitu Apu</option>
                    </select>

                    <div className='my-3 flex gap-2 items-center'>
                        <label htmlFor="" className='mr-4'>Start</label>
                        <input type="text" placeholder='DD-MM-YYYY' className='w-[117px] px-2 py-1 border rounded-lg outline-none focus:border-blue-300 duration-200 placeholder:text-xs' />
                        <input type="text" placeholder='00:00' className='w-[80px] px-2 py-1 border rounded-lg outline-none focus:border-blue-300 duration-200 placeholder:text-xs placeholder:text-black' />
                    </div>

                    <div className='my-3 flex gap-2 items-center'>
                        <label htmlFor="" className='mr-[22px]'>Due</label>
                        <input type="text" placeholder='DD-MM-YYYY' className='w-[117px] px-2 py-1 border rounded-lg outline-none focus:border-blue-300 duration-200 placeholder:text-xs' />
                        <input type="text" placeholder='00:00' className='w-[80px] px-2 py-1 border rounded-lg outline-none focus:border-blue-300 duration-200 placeholder:text-xs placeholder:text-black' />
                    </div>

                    <div className='flex justify-end gap-2'>
                        <button type="button" onClick={() => setAddCard(false)} className='px-2 py-2 duration-200 hover:bg-gray-100 hover:text-purple-900/70 rounded-xl'>Cancel</button>
                        <button type="button" className='px-6 py-2 duration-200 text-white bg-purple-900/70 hover:text-white rounded-xl'>Add Card</button>
                        {/* <input type="button" value='Add Card' className='px-6 py-2 duration-200 text-white bg-purple-900/70 hover:text-white rounded-xl' /> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCard;