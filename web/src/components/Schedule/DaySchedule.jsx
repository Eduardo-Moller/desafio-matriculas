import React from "react";
import { formatTimeStamp } from "../../services/utils";

export default function DaySchedule({ data }) {
  return (
    <div className="col col-12 col-sm-4 p-sm-5 py-5">
      <div className="accordion" id="accordion">
        <div className="accordion-item bgTopAccordion">
          <h2 className="accordion-header text-center fs-4 p-3">{data.day}</h2>
        </div>
        {data.enrollments.length > 0 ? (
          data.enrollments.map((hour) => (
            <div className="accordion-item" key={hour.id}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${hour.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${hour.id}`}
                >
                  {hour.subject_name} - {formatTimeStamp(hour.begin_time)} às{" "}
                  {formatTimeStamp(hour.end_time)}
                </button>
              </h2>
              <div
                id={`collapse-${hour.id}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordion"
              >
                <div className="accordion-body">
                  <p>
                    <strong>Nome da turma:</strong> {hour.class_name}
                  </p>
                  <p>
                    <strong>Estado:</strong> Cursando
                  </p>
                  <p>
                    <strong>Professor:</strong> {hour.teacher_name}
                  </p>
                  <p>
                    <strong>Turno:</strong> {hour.schedule}
                  </p>
                  <p>
                    <strong>Horário:</strong> {formatTimeStamp(hour.begin_time)}{" "}
                    às {formatTimeStamp(hour.end_time)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="accordion-item">
            <p className="accordion-header p-3">
              Você não possui aulas este dia
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
