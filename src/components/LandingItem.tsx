const LandingItem = ({ title, description, image, link }) => {
  return (
    <div className="border h-[200px] w-[32%] overflow-hidden rounded-[10px] flex">
      <img
        src={image}
        alt="star scanner"
        className="w-[200px] h-[200px] border-b border-white border-r object-cover"
      />

      <div className="p-4 h-[200px]">
        <div className="h-[110px]">
          <div className="text-white text-[30px] font-bold">{title}</div>
          <div className="text-[#A0A0A0] text-[16px] overflow-hidden text-ellipsis">
            <p className="line-clamp-3">{description}</p>
          </div>
        </div>
        <button
          className="mt-4 bg-primary-color text-black font-bold rounded-[10px] px-4 py-1 text-[18px]"
          onClick={() => (window.location.href = link)}
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default LandingItem;
