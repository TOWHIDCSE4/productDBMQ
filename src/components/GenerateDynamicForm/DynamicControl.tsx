import { useFormContext } from "react-hook-form";
import { DynamicFieldData } from "./dynamic-control-types";
import { Input, Select } from 'antd';
import Col from "antd/es/grid/col";

// input, textarea, select, a { outline: none; }

// input:focus {
//     outline:none !important;
// }

export const DynamicControl = ({
  inputType,
  fieldName,
  defaultValue,
  options = [],
  config = {}
}: DynamicFieldData) => {
  const { register } = useFormContext();

  switch (inputType) {
    case "text":
      return (
        // <Col xs="item.col.xs" >
         <input
          id={fieldName}
          style={{width: "250px", borderRadius: "9px", padding: "8px", boxShadow: 'none', outline: "0px solid transparent",  border: "1px solid #DCDCDC"  }}
          type="text"
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
        // </Col>
       
      );
    case "select": {
      return (
        <select
          {...register(fieldName, config)}
          defaultValue={defaultValue}
          name={fieldName}
            style={{ width: "200px", padding: "8px"}}
     
          id={fieldName}
        >
          {options.map((o, index) => (
            <option key={index} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }
    case "number":
      return (
        <input
          type="number"
          id={fieldName}
          style={{width: "250px", borderRadius: "9px", padding: "8px",  outline: "0px solid transparent", border: "1px solid #DCDCDC" }}
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    default:
      return <input type="text" />;
  }
};