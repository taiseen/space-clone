import { Copy, Delete, LinkingChain, RightOK } from '../../assets/icons'
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';


// This <Component /> called by 🟨🟨🟨 Card.jsx 🟨🟨🟨
const CardSettingDropDown = ({ right, progress, setProgress, noteDone, setNoteDone, setCardSettingDropDownToggle, cardID, listID, cardModal }) => {

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    // if cardModal Open by user click, then hide this Card-Setting-DropDown-Toggle window 
    if (cardModal === true) setCardSettingDropDownToggle(false);


    const handleActionDropDownClick = (e) => {
        e.stopPropagation();


        setNoteDone(pre => {

            if (pre) {
                setProgress(4)
            } else {
                setProgress(0)
            }

            return !pre
        });

        setCardSettingDropDownToggle(false)
    }


    return (
        <div className='w-fit'>
            {/* <div className='boardActionDropDown group line-through relative'>
                <Copy className='group-hover:text-teal-500' /> <span>Copy Card</span>
            </div>

            <div className='boardActionDropDown group line-through'>
                <LinkingChain className='group-hover:text-teal-500' /> <span>Copy Card link</span>
            </div> */}

            <div className='boardActionDropDown group w-fit' onClick={handleActionDropDownClick}>
                <RightOK className='group-hover:text-teal-500' /> <span>Make as {noteDone ? '' : 'not'} done</span>
            </div>

            <div
                className='boardActionDropDown group'
                onClick={(e) => { e.stopPropagation(); setConfirmModalOpen(true) }}
            >
                <Delete className='group-hover:text-teal-500' /> <span>Delete Card</span>
            </div>

            {
                // confirm dialog open for delete operation...
                confirmModalOpen &&
                <ConfirmDialog
                    listID={listID}
                    cardID={cardID}
                    setConfirmModalOpen={setConfirmModalOpen}
                    setCardSettingDropDownToggle={setCardSettingDropDownToggle}
                />
            }
        </div>
    )
}

export default CardSettingDropDown