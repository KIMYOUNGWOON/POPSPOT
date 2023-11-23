import React from "react";
import "./waiting.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// 임시 예약 데이터

export default function Waiting({ reservations, onCompleted }) {
  return (
    <div className="reservationContainer">
      <div className="reservationList">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservationBox">
            <div className="reservationDetails">
              <div>
                <span>웨이팅 번호: {reservation.id}</span>
                <span>{reservation.name}</span>
                <span>{reservation.count}명</span>
                <span>{reservation.phone}</span>
              </div>
              <div className="reservationTime">
                예약시간: {reservation.time}
              </div>
              <div className="buttonContainer">
                <button onClick={() => onCompleted(reservation.id)}>
                  <FontAwesomeIcon icon={faCheck} className="icon" />
                  입장
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
