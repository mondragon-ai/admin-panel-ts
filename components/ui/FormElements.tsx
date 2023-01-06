import { FC } from "react";
import styles from "../../styles/Main.module.css";

interface SelectOption {
    value: string;
    label: string;
}
  
interface Props {
    options: SelectOption[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}




  export const CustomSelect: FC<Props> = ({ options, onChange }) => {
    return (
      <select onChange={onChange}
        className={`${styles.row}`}
        style={{
            width:"100%",
            padding: "5px 5px",
            color: "white",
            fontSize: "20px",
            lineHeight: "20px",
        }}>
        {options.map(option => (
          <option key={option.value}
            value={option.value}
            style={{
                width:"100%",
                padding: "0px",
                color: "white",
                fontSize: "20px",
                lineHeight: "20px"
            }}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };