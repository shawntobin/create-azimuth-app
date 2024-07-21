const Checkbox = (props) => {
  const { checked, onChange, label, isBold } = props;

  return (
    <label htmlFor={label} className="flex items-center cursor-pointer pl-1">
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={onChange}
        className="opacity-0 absolute h-4 w-4"
      />
      <span
        className={`block w-4 h-4 border border-primary-color rounded-[3px] relative bg-transparent`}
      >
        {checked && (
          <span className="absolute inset-0 flex items-center justify-center bg-white text-black font-[800]">
            &#10003;
          </span>
        )}
      </span>
      {label && (
        <span className={`ml-3 text-[20px] ${isBold && "font-bold"}`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
