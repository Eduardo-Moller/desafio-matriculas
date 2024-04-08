import React from "react";
import SelectComponent from "../general/Select";

export default function DayItem({ day, handleSelect, values }) {
  return (
    <div className="col col-12 col-sm-6 p-2">
      <div className="w-100 rounded bg-light p-3">
        <h1 className="fs-4 text-center fw-bold ">{day.day}</h1>
        <div className="w-100">
          <SelectComponent
            label={"Selecione as turmas"}
            placeholder={""}
            options={day.hours}
            handleChange={(item) => handleSelect(item, day.day)}
            isMulti={true}
            value={values[day.day]}
          />
        </div>
      </div>
    </div>
  );
}
