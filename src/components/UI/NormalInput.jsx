export default function NormalInput({
  dataRef,
  inputValue,
  changeHandler,
  focusHandler,
  blurHandler,
  isFocused,
  placeHolder,
}) {
  return (
    <input
      ref={dataRef}
      type="text"
      value={inputValue}
      onChange={changeHandler}
      placeholder={placeHolder}
      className={`w-full p-2 rounded-full bg-search text-text  lg:block focus:outline-none focus:ring-0 transition-all duration-200 ${
        isFocused ? "pl-4 shadow-lg bg-white block" : "pl-10 hidden"
      }`}
      onFocus={focusHandler}
      onBlur={blurHandler}
    />
  );
}
