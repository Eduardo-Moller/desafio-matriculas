import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth";
import { getEnrollments } from "../../services/classes";
import { useNavigate } from "react-router-dom";
import DaySchedule from "./DaySchedule";
import { isEmpty } from "../../services/utils";

export default function ScheduleList() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [enrollments, setEnrollments] = useState([]);

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
    const user = await getUser();
    const enroll = await getEnrollments({ users_id: user.id });

    if (!enroll || enroll.length === 0) return;

    const data = [];
    possibleDays.forEach((day) => {
      const enrollForDay = enroll.filter((e) => e.day === day);
      data.push({
        day,
        enrollments: enrollForDay,
      });
    });

    setUser(user);
    setEnrollments(data);
  };

  return (
    <>
      <div className="container-fluid p-5 py-5">
        <div className="row">
          <div className="col col-12">
            <h1 className="fs-1 fw-bold text-center">Horário de aulas</h1>
          </div>
        </div>
        <div className="row">
          {enrollments.map((day) => (
            <DaySchedule key={day.day} data={day} />
          ))}
        </div>
      </div>
    </>
  );
}
