import { addWorkSpace } from '../../store/slice/workspace';
import { workspaceCreation } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Close } from '../../assets/icons';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const ModalWorkSpaceCreate = ({ setNewWorkSpace }) => {

    const dispatch = useDispatch();
    const [workSpaceName, setWorkSpaceName] = useState('');

    // user esc key press Event Listener for closing modal... 
    useEffect(() => {
        const handleEscapeKeyPress = e => {
            if (e.code === 'Escape') setNewWorkSpace(false);
        }

        document.addEventListener('keydown', handleEscapeKeyPress);
        return () => document.removeEventListener('keydown', handleEscapeKeyPress);
    }, [setNewWorkSpace]);


    // work space create...
    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // its a POST method | object send into backend/server
            const { data } = await workspaceCreation({ name: workSpaceName });

            // get all Work-Space data & send into redux store...
            // for live re-fetching/load data at SideBar for navigation... 
            dispatch(addWorkSpace(data.workspaces));

            // display a success notification for user...
            toast.success(`${data?.workspace?.name} : work space create successfully`, { autoClose: 3000 });

        } catch (error) {
            // display error notification for developers...
            console.log(error?.response?.data?.issue);

            // display error notification for users...
            toast.error(error?.response?.data?.issue?.name, { autoClose: 3000 });
            toast.error(error?.response?.data?.issue?.message, { autoClose: 3000 });
        }

        // after submit data... auto close this Modal UI...
        setNewWorkSpace(false)
    }




    return (
        <section className='fixed top-0 left-0 right-0 bottom-0   bg-black/70 grid place-items-center'>

            <div className='relative bg-white w-[620px] h-[300px] rounded-2xl p-3 '>

                <div
                    onClick={() => setNewWorkSpace(false)}
                    className='absolute top-2 right-2 w-8 h-8 rounded-lg group hover:bg-gray-200 grid place-items-center cursor-pointer duration-200'
                >
                    <Close width="14" height="14" className='text-gray-400 group-hover:text-themeColor' />
                </div>


                <h1 className='text-center mt-6 text-2xl font-bold text-slate-500'>Set up your new workspace</h1>

                <p className='px-3 text-sm text-slate-500 py-4'>Add your workspace name. For most people this is the name of their company. You can always change it later.</p>

                <form className='text-sm px-3 space-y-2' onSubmit={handleSubmit}>
                    <label htmlFor="name">Workspace name:</label>
                    <input
                        autoFocus
                        required
                        type="text"
                        placeholder='Company name'
                        onChange={e => setWorkSpaceName(e.target.value)}
                        className='w-full border border-gray-200 focus:border-blue-300 duration-200 rounded-lg px-2 py-1 outline-none'
                    />

                    <div className='text-right pt-2'>
                        <button type='submit' className='px-4 py-2 rounded-lg bg-themeColor text-gray-100 hover:bg-themeColor/80 duration-200'>Continue to invitations</button>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default ModalWorkSpaceCreate