import { useEffect, useState } from 'react';
import { Close, SpaceLogo, SpaceLogoLock } from '../../assets/icons';



const ModalSearchSpace = ({ setSpaceSearchModal, allSpace, setCreateSpaceModal }) => {


    const [searchSpace, setSearchSpace] = useState('')

    // user esc key press Event Listener for closing modal... 
    useEffect(() => {
        const handleEscapeKeyPress = e => {
            if (e.code === 'Escape') setSpaceSearchModal(false);
        }

        document.addEventListener('keydown', handleEscapeKeyPress);
        return () => document.removeEventListener('keydown', handleEscapeKeyPress);
    }, [setSpaceSearchModal]);


    return (
        <section className='fixed z-10 top-0 right-0 left-0 bottom-0 bg-black/70 grid place-items-center  '>

            <form className='relative w-[670px] h-fit bg-white rounded-xl shadow-2xl p-3 '  >

                {/* 🟨🟨🟨 UI For Close Button */}
                <div
                    className='absolute top-2 right-2 w-8 h-8 rounded-lg group hover:bg-gray-200 grid place-items-center cursor-pointer duration-200'
                    onClick={() => setSpaceSearchModal(false)}
                >
                    <Close width="14" height="14" className='text-gray-400 group-hover:text-themeColor duration-200' />
                </div>



                <div className='py-8 px-6'>

                    <div className='flex justify-between items-center'>
                        <h2 className='text-themeColor tracking-tight text-sm font-bold'>BROWSE SPACES</h2>
                        <h2 className='px-2 py-1 hover:bg-gray-200 text-gray-400 hover:text-themeColor duration-200 rounded-lg cursor-pointer font-bold' onClick={() => { setSpaceSearchModal(false); setCreateSpaceModal(true) }}>Create Space</h2>
                    </div>

                    <div className='mt-4'>
                        <input
                            autoFocus
                            type="text"
                            placeholder='Search Spaces'
                            className='w-full border border-gray-200 rounded-xl px-3 py-1 outline-none mt-1 focus:border-blue-300 duration-200'
                            onChange={e => setSearchSpace(e.target.value)}
                        />
                    </div>


                    <div></div>

                    {
                        allSpace.length > 0 &&
                        <div className='mt-6 '>
                            <p>Spaces you belong to</p>

                            {/* all space list --- those belong to the login user */}
                            <div>
                                {
                                    // display + searching...
                                    allSpace.filter(space =>
                                        space.name?.toLowerCase()?.includes(searchSpace)
                                    ).map(space => (
                                        <div
                                            key={space.name}
                                            className="relative flex items-center px-2.5 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg hover:after:content-['Go_to_space'] after:absolute after:text-themeColor after:right-2"
                                        >
                                            {
                                                space?.privacy.includes('private')
                                                    ? <SpaceLogoLock color={space.color || '#57BEC7'} />
                                                    : <SpaceLogo color={space.color || '#57BEC7'} />
                                            }
                                            <p>{space.name}</p>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }

                </div>

            </form>

        </section >
    )
}

export default ModalSearchSpace