import { react } from "react";

const Search = ({ handleSubmit, value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex pt-2">
      <input
        type="text"
        name="value"
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow inline-block"
        placeholder="스터디 계획을 작성해보아요!"
        value={value}
        onChange={handleChange}
      />
      <input
        type="submit"
        value="입력"
        className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200 inline-block"
      />
    </form>
  );
};

export default Search;
