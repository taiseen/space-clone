const AddCardMini = ({ setAddCard }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('click');
    }


    return (
        <div className='w-fit rounded-b-2xl px-3 py-1 relative bg-gray-100 shadow-xl border-t-[6px] border-teal-600'>

            <h2 className='text-teal-600/70 font-bold w-fit'>Create a card</h2>

            <form action="" className='py-1.5 text-gray-300' onSubmit={handleSubmit}>
                <label htmlFor="cardName" className='text-[12px]'>Card name</label>
                <input id='cardName' type="text" placeholder='Type in a card name...' className='w-[100%] py-1 px-2 border rounded-xl outline-none focus:border-blue-300 duration-200 text-sm placeholder:text-sm' />

                <label htmlFor="space" className='text-[12px] block'>Space</label>
                <select name="" id="space" className='w-[100%] block px-1 py-1 mt-2 border rounded-lg cursor-pointer outline-none font-bold hover:text-purple-900/70 duration-200 text-sm'>
                    <option value="">Developer Space</option>
                    <option value="">Space Clone</option>
                </select>

                <label htmlFor="list" className='text-[12px] block'>List</label>
                <select name="" id="list" className='w-[100%] block px-1 py-1 mt-2 border rounded-lg cursor-pointer outline-none font-bold hover:text-purple-900/70 duration-200 text-sm'>
                    <option value="">Taiseen Vai</option>
                    <option value="">Mitu Apu</option>
                </select>

                <div className='my-3 flex space-x-1 items-center'>
                    <label htmlFor="" className='mr-4'>Start</label>
                    <input type="text" placeholder='DD-MM-YYYY' className='w-[117px] px-2 py-1 border rounded-lg outline-none focus:border-blue-300 duration-200 placeholder:text-xs' />
                    <input type="text" placeholder='00:00' className='w-[80px] px-2 py-1 border rounded-lg outline-none focus:border-blue-300 duration-200 placeholder:text-xs placeholder:text-black' />
                </div>

                <div className='my-3 flex space-x-1 items-center'>
                    <label htmlFor="" className='mr-[22px]'>Due</label>
                    <input type="text" placeholder='DD-MM-YYYY' className='w-[117px] px-2 py-1 border rounded-lg outline-none focus:border-blue-300 duration-200 placeholder:text-xs' />
                    <input type="text" placeholder='00:00' className='w-[80px] px-2 py-1 border rounded-lg outline-none focus:border-blue-300 duration-200 placeholder:text-xs placeholder:text-black' />
                </div>

                <div className='space-x-1 w-fit ml-auto'>
                    <button onClick={() => setAddCard(false)} className='px-2 py-2 duration-200 hover:bg-gray-100 hover:text-purple-900/70 rounded-xl'>Cancel</button>
                    <button className='px-5 py-1.5 duration-200 text-white bg-purple-900/70 hover:text-white rounded-xl'>Add Card</button>
                </div>
            </form>
        </div>
    )
}

export default AddCardMini;

// git ls-files -z -d | xargs -0 git checkout --