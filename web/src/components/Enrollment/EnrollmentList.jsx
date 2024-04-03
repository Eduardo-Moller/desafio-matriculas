import React, { useState, useEffect } from "react";
import { getClasses, postEnroll } from "../../services/classes";
import { isEmpty } from "../../services/utils";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/auth";
import toast from "react-hot-toast";
import DayItem from "./DayItem";
import Button from "../General/Button";
import { getUsers } from "../../services/users";

export default function EnrollmentList() {
  const navigate = useNavigate();
  const [classesHours, setClassesHours] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const possibleDays = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
  ];

  const fetchData = async () => {
    const classes = await getClasses();
    if (isEmpty(classes)) toast.error("Nenhuma turma aberta encontrada");

    const dataClasses = [];

    possibleDays.forEach((day) => {
      var classesForDay = classes.filter((c) => c.day === day);
      classesForDay.forEach((c) => {
        c.value = c.id;
        c.label = `${c.name} - ${c.begin_time} - ${c.end_time}`;
      });
      dataClasses.push({
        day,
        hours: classesForDay,
      });
    });

    setClassesHours(dataClasses);

    const selectedClasses = [];

    possibleDays.map((day) => {
      selectedClasses[day] = [];
    });

    setSelectedClasses(selectedClasses);
  };

  const handleSelect = (item, day) => {
    const newSelectedClasses = { ...selectedClasses };
    newSelectedClasses[day] = item;
    setSelectedClasses(newSelectedClasses);
  };

  const save = async () => {
    let error = false;

    const ids = [];

    possibleDays.forEach((day) => {
      selectedClasses[day].forEach((item) => {
        if (ids.includes(item.subjects_id)) {
          toast.error("Turma duplicada detectada!");
          error = true;
          return;
        } else {
          ids.push(item.subjects_id);
        }
      });
    });

    if (error) return;

    possibleDays.forEach((day) => {
      selectedClasses[day].forEach((item, index) => {
        for (
          let indexInside = index + 1;
          indexInside < selectedClasses[day].length;
          indexInside++
        ) {
          const itemInside = selectedClasses[day][indexInside];

          if (
            (item.begin_time >= itemInside.begin_time &&
              item.begin_time < itemInside.end_time) ||
            (item.end_time > itemInside.begin_time &&
              item.end_time <= itemInside.end_time) ||
            (item.begin_time <= itemInside.begin_time &&
              item.end_time >= itemInside.end_time)
          ) {
            toast.error("Conflito de horário detectado!");
            error = true;
            return;
          }
        }
      });
    });

    if (error) return;

    const rows = [];

    possibleDays.forEach((day) => {
      selectedClasses[day].forEach((item) => {
        rows.push(item);
      });
    });

    const user = await getUser();

    const data = {
      user,
      rows,
    };

    try {
      await postEnroll(data);

      const updateUser = await getUsers({ id: user.id });
      if (updateUser[0]) {
        sessionStorage.setItem("user", JSON.stringify(updateUser[0]));
      }

      toast.success("Matrícula realizada com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      switch (error.response.status) {
        case 500:
          toast.error(
            "Erro ao realizar matrícula, verifique os campos e tente novamente"
          );
          break;
        default:
          toast.error(
            "Erro desconhecido, verifique os campos e tente novamente"
          );
          break;
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-5 py-5">
        <div className="row">
          {classesHours.map((day) => (
            <DayItem
              key={day.day}
              day={day}
              handleSelect={handleSelect}
              values={selectedClasses}
            />
          ))}
        </div>
        <div className="row">
          <div className="col col-12 py-5">
            <Button label={"Salvar"} action={save} />
          </div>
        </div>
      </div>
    </>
  );
}
