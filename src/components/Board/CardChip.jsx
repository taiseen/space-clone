
const CardChip = ({ tag, close }) => {

    return (
        <div
            className={`text-xs py-1 px-2 rounded-full relative duration-150 ${close && 'before:content-["X"] before:absolute before:top-1 before:right-1 before:px-[3px] before:font-bold before:bg-green-600 before:rounded-full before:hover:cursor-pointer before:invisible hover:before:visible'}`}
            style={{ backgroundColor: tag?.color }}
        >
            {
                tag?.name
            }
        </div>
    )
}

export default CardChip