import React, { useState, useEffect } from "react";
import Button from "../general/Button";
import Input from "../general/Input";
import { useNavigate } from "react-router-dom";
import SelectComponent from "../general/Select";
import { getUsers } from "../../services/users";
import { getSubjects } from "../../services/subjects";
import { postClasses } from "../../services/classes";
import { isEmpty } from "../../services/utils";
import toast from "react-hot-toast";

export default function ClassesForm() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState({});
  const [teacher, setTeacher] = useState({});
  const [students_limit, setStudents_limit] = useState("");
  const [day, setDay] = useState({});
  const [schedule, setSchedule] = useState({});
  const [begin_time, setBegin_time] = useState("");
  const [end_time, setEnd_time] = useState("");

  const days = [
    { value: "Segunda-feira", label: "Segunda-feira" },
    { value: "Terça-feira", label: "Terça-feira" },
    { value: "Quarta-feira", label: "Quarta-feira" },
    { value: "Quinta-feira", label: "Quinta-feira" },
    { value: "Sexta-feira", label: "Sexta-feira" },
  ];

  const schedules = [
    { value: "Manhã", label: "Manhã" },
    { value: "Tarde", label: "Tarde" },
    { value: "Noite", label: "Noite" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTeachers(transformArrayToSelect(await getUsers({ type: "teacher" })));
    setSubjects(transformArrayToSelect(await getSubjects()));
  };

  const transformArrayToSelect = (array) => {
    return array.map((item) => {
      return { value: item.id, label: item.name };
    });
  };

  const save = async () => {
    if (
      !name ||
      !subject ||
      isEmpty(subject) ||
      !teacher ||
      isEmpty(teacher) ||
      !students_limit ||
      !day ||
      isEmpty(day) ||
      !schedule ||
      isEmpty(schedule) ||
      !begin_time ||
      !end_time
    ) {
      toast.error("Preencha todos os campos e tente novamente");
      return;
    }

    if (begin_time >= end_time) {
      toast.error("Horário de início deve ser menor que o horário de término");
      return;
    }

    try {
      const data = {
        name,
        day: day?.value,
        schedule: schedule?.value,
        begin_time,
        end_time,
        students_limit,
        subjects_id: subject?.value,
        teacher_id: teacher?.value,
      };

      await postClasses(data);

      toast.success("Turma cadastrada com sucesso!");

      setName("");
      setSubject({});
      setTeacher({});
      setStudents_limit("");
      setDay({});
      setSchedule({});
      setBegin_time("");
      setEnd_time("");
    } catch (error) {
      switch (error.response.status) {
        case 500:
          toast.error(
            "Erro ao cadastrar turma, verifique os campos e tente novamente"
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

  const back = () => {
    navigate("/");
  };

  return (
    <>
      <form className="container py-5">
        <div className="row">
          <div className="col col-12 pt-5 pt-sm-0">
            <h1 className="fw-bold">Cadastro de Turmas</h1>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-sm-6 pb-3">
            <Input label={"Nome"} handleChange={setName} value={name} />
          </div>
          <div className="col col-12 col-sm-6 pb-3">
            <SelectComponent
              label={"Disciplina"}
              options={subjects}
              handleChange={setSubject}
              value={subject}
            />
          </div>
          <div className="col col-12 col-sm-6 pb-3">
            <SelectComponent
              label={"Professor"}
              options={teachers}
              handleChange={setTeacher}
              value={teacher}
            />
          </div>
          <div className="col col-12 col-sm-6 pb-3">
            <Input
              label={"Limite de alunos matriculados"}
              handleChange={setStudents_limit}
              value={students_limit}
              int
            />
          </div>
          <div className="col col-12 col-sm-6 pb-3">
            <SelectComponent
              label={"Dia da semana"}
              options={days}
              handleChange={setDay}
              value={day}
            />
          </div>
          <div className="col col-12 col-sm-6 pb-3">
            <SelectComponent
              label={"Turno de aula"}
              options={schedules}
              handleChange={setSchedule}
              value={schedule}
            />
          </div>
          <div className="col col-12 col-sm-6 pb-3">
            <Input
              label={"Horário inicial da aula"}
              handleChange={setBegin_time}
              value={begin_time}
              type={"time"}
            />
          </div>
          <div className="col col-12 col-sm-6 pb-5">
            <Input
              label={"Horário final da aula"}
              handleChange={setEnd_time}
              value={end_time}
              type={"time"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-12 my-2">
            <Button label={"Salvar"} action={save} />
          </div>
          <div className="col col-12 my-2">
            <Button label={"Voltar"} action={back} />
          </div>
        </div>
      </form>
    </>
  );
}
