const Message = ({ displayName, photoURL, createAt, text }) => {
    return (
      <div>
        <div className="flex my-2">
          <div className="w-8 h-8 overflow-hidden rounded-full mr-2">
            <img src={photoURL} alt="" />
          </div>
          <div className="text-[#444]">
            <h2 className="text-sm font-medium">
              {displayName}{" "}
            </h2>
            <span className="text-xs font-normal opacity-80 mt-[-1px] block">{createAt}</span>
            <p className="">{text}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Message;
  