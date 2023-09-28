import { Radio } from "antd";
import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;
  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <Radio.Group
      defaultValue="a"
      size="small"
      style={{
        marginTop: 16,
      }}
    >
      {options.map((option) => (
        <Radio.Button
          key={option.value}
          value={option.value}
          onClick={() => handleClick(option.value)}
          checked={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}

export default Filter;
