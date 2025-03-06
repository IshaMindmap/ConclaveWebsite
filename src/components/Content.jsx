
export const DashboardChatContent = ({img, userName, chatPreview, date, onClick}) => {
  return (
    <div className="flex flex-col mb-[0.5rem] gap-[0.5rem]">
        <div className='flex gap-[0.8rem]' onClick={onClick}>
            <img className=' my-[0.219rem] w-[28px] h-[28px]' src={img} alt="user" />
            <div className='flex'>
                <div>
                    <p className='text-[0.75rem] text-[#1C1C1E] font-[500] font-poppins'>{userName}</p>
                    <p className='text-[0.65rem] text-[#8E8E93] font-[400] font-poppins'>{chatPreview}</p>
                </div>
                <p className='text-[0.68rem] flex items-center text-[#8E8E93] font-[300] font-poppins'>{date}</p>           
            </div>
        </div>
        <div className="w-full h-[0.5px] bg-[#EBEBF0]"></div>

    </div>
    
  )
}
