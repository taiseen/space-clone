import { useBoardCardContext } from '../../context/BoardCardContext';
import { boardListDelete, cardDeleteApiCall, cardUpdateApiCall } from '../../hooks/useFetch';
import { useSelector } from "react-redux";
import { Close } from '../../assets/icons'
import { toast } from 'react-toastify';


// This <Component /> called by 🟨🟨🟨 BoardListSettingDropDown.jsx 🟨🟨🟨
// This <Component /> called by 🟨🟨🟨 CardSettingDropDown.jsx 🟨🟨🟨
const ConfirmDialog = ({ listID, cardID, setCardSettingDropDownToggle, setConfirmModalOpen, setDeleteAttachFileLoading, deleteAttachment, setLocalCard, deleteAttachFile }) => {

  const { removeBoardList, removeCard } = useBoardCardContext();

  const selectedSpaceId = useSelector(state => state.space.selectedSpace);

  // console.log('list id =>', listID);
  // console.log('card id =>', cardID);


  //🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
  const handleCancel = (e) => {
    e.stopPropagation();


    // if (deleteAttachment) {
    //   // close modal for delete attachment file...
    //   setDeleteAttachFileLoading(false);
    // } else {
    //   // for closing confirm modal window
    //   setConfirmModalOpen(false);
    // }


    if (cardID !== undefined && deleteAttachment === false) {
      setCardSettingDropDownToggle(false);
    } else if (deleteAttachment) {
      setDeleteAttachFileLoading(false); // close modal for delete attachment file...
    } else {
      setConfirmModalOpen(false); // for closing confirm modal window
    }

  }


  //🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
  const handleDelete = async (e) => {
    e.stopPropagation();

    // for closing confirm modal window
    // setConfirmModalOpen(false);

    try {

      // if no card id is present, its mean list delete operation happening by user
      if (cardID === undefined) {

        const { data } = await boardListDelete(selectedSpaceId, listID);

        // list delete
        removeBoardList(listID);

        // dispatch(deleteList(listID));

        // display a notification for user
        toast.success(`${data?.message}`, { autoClose: 3000 });
      }


      // card delete functionality...
      if (cardID !== undefined && deleteAttachment !== true) {

        const { data } = await cardDeleteApiCall(selectedSpaceId, listID, cardID);

        // card delete
        removeCard(listID, cardID);
        // dispatch(deleteCard({ listID, cardID }));

        // display a notification for user
        toast.success(`${data?.message}`, { autoClose: 3000 });
      }


      // attachment delete functionality...
      if (deleteAttachment) {

        const { data } = await cardUpdateApiCall(selectedSpaceId, listID, cardID, { removeAttachmentUrl: deleteAttachFile });

        // after delete attach file update UI + auto close modal
        setLocalCard(pre => ({ ...pre, attachments: data.updatedCard.attachments }));
        setDeleteAttachFileLoading(false);
      }
      
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
      toast.error(`${error?.response?.data?.issue?.message}`, { autoClose: 3000 });
    }

  }



  return (
    <div
      onClick={e => e.stopPropagation()}
      className='fixed top-0 left-0 right-0 bottom-0   bg-black/50 grid place-items-center cursor-default'
    >

      <div className='bg-white rounded-lg p-4 space-y-2 relative'>

        {/* ❌❌❌❌❌❌❌❌❌ button */}
        <Close
          onClick={handleCancel}
          className='absolute top-4 right-4 w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 duration-200'
        />

        { }
        <p className='font-bold text-teal-500'>DELETE {`${deleteAttachment ? 'FILE' : cardID === undefined ? 'LIST' : 'CARD'}`}</p>

        <p className='pb-3'>Are you sure you want to delete this {`${deleteAttachment ? 'file' : cardID === undefined ? 'list' : 'card'}`} ?</p>

        <div className='flex items-center justify-end gap-3'>
          <div
            onClick={handleCancel}
            className='px-4 py-2 rounded-lg bg-gray-300 text-white cursor-pointer hover:text-black duration-200 ease-in-out'
          >Cancel</div>

          <div className='px-4 py-2 rounded-lg bg-teal-500 text-white cursor-pointer hover:text-black duration-200 ease-in-out'
            onClick={handleDelete}
          >Delete </div>
        </div>
      </div>

    </div>
  )
}

export default ConfirmDialog