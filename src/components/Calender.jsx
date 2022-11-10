/* eslint-disable react-hooks/exhaustive-deps */
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import { useStyleContext } from '../context/StyleContext';
import { month, oneDayTimes } from '../constant/data';
import { useEffect, useState } from 'react';
import AddCardMini from './AddCardMini';


const Calender = () => {

    const { margin } = useStyleContext();
    const [active, setActive] = useState('');
    const [addCard, setAddCard] = useState(false);

    const timeLine = ['Day', 'Week', 'Month', 'List'];

    useEffect(() => setActive(timeLine[2]), []);


    const addCardVisibility = () => {
        setAddCard(true)
    }

    const DayUI = () => (
        <div className='grid grid-cols-12'>
            <div className=''>
                {
                    oneDayTimes.map(time =>
                        <p key={time} className='w-24 h-10 border-t border-t-white text-gray-400 leading-10'>
                            {time}
                        </p>
                    )
                }
            </div>
            <div className='border-gray-300 border-r border-l border-b col-span-11'>
                {
                    oneDayTimes.map(time =>
                        <p
                            key={time}
                            onClick={addCardVisibility}
                            className={`h-10 bg-sky-50 border-t border-gray-300`}
                        ></p>
                    )
                }
            </div>
        </div>
    )


    const WeekUI = ({ margin }) => (
        <div className='grid grid-cols-customCol '>
            <div className='mt-6 '>
                {
                    oneDayTimes.map(time =>
                        <p key={time} className={`w-24 h-10  text-gray-400 leading-10 relative after:absolute  after:h-[1px] after:bg-gray-300 after:-  ${margin ? 'after:right-[-1450px] after:w-[1450px]' : 'after:right-[-1725px] after:w-[1725px]'}`}>
                            {time}
                        </p>
                    )
                }
            </div>

            <div className='border-l border-b w-full h-full border-gray-300 text-center'>19 Sun</div>
            <div className='border-l border-b w-full h-full border-gray-300 text-center'>20 Mon</div>
            <div className='border-l border-b w-full h-full border-gray-300 text-center'>21 Tue</div>
            <div className='border-l border-b w-full h-full border-gray-300 text-center'>22 Wed</div>
            <div className='border-l border-b w-full h-full border-gray-300 text-center'>23 Thu</div>
            <div className='border-l border-b w-full h-full border-gray-300 text-center'>24 Fri</div>
            <div className='border-l border-r border-b w-full h-full border-gray-300 text-center'>25 Sat</div>

        </div>
    )


    return (
        <section className={`${margin ? 'ml-[325px]' : 'ml-[50px]'} pt-[90px] duration-200`}>

            {/* 🟨🟨🟨 Header Section 🟨🟨🟨 */}
            <div className='flex items-center justify-between text-gray-400 px-2'>

                <div className='calenderSection'>Today</div>

                <div className='flex items-center ml-32'>
                    <div className='arrowSymbol'><FaLessThan /></div>
                    <p className='calenderSection'>June 2022</p>
                    <div className='arrowSymbol'><FaGreaterThan /></div>
                </div>

                <div className='flex'>
                    {
                        timeLine.map(link =>
                            <p
                                key={link}
                                onClick={() => setActive(link)}
                                className={`calenderSection mr-1 ${(link === active) && 'bg-gray-100 text-teal-500'}`}
                            >
                                {link}
                            </p>
                        )
                    }
                </div>
            </div>



            {/* 🟨🟨🟨 Body Section 🟨🟨🟨 */}
            <div className='p-4'>

                <div className={`absolute top-42 right-8`}>
                    {
                        addCard && <AddCardMini setAddCard={setAddCard} />
                    }
                </div>



                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // Day Calender View ==> UI
                    active === 'Day' && <DayUI margin={margin} />

                }


                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // Week Calender View ==> UI  <WeekUI />
                    active === 'Week' && <WeekUI margin={margin} />

                }


                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // Month Calender View ==> UI
                    <div className={`${active !== 'Month' && 'hidden'} grid grid-cols-7 grid-rows-5 gap-px bg-gray-200 border border-gray-200 h-[800px] overflow-y-auto`}>
                        {
                            month.map(day => (
                                <div
                                    key={day}
                                    onClick={addCardVisibility}
                                    className="bg-white pt-2 pl-2 hover:bg-gray-200 duration-200"
                                >
                                    {day}
                                </div>
                            ))
                        }
                    </div>
                }


                {
                    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 
                    // List View ==> UI
                    active === 'List' &&
                    <div className='bg-gray-100 w-full h-[80vh]'>
                        <div className='p-4 text-center bg-white'>
                            <h2 className='text-2xl font-bold'>Hmm… no events in this time <br /> period.</h2>
                            <p className='w-96 mx-auto text-sm pt-3'>It seems there is nothing scheduled for this time. Change the timeframe or simply create some cards.</p>
                        </div>
                    </div>
                }

            </div>

        </section>
    )
}

export default Calender;