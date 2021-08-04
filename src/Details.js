import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  let { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [date, setDate] = useState("");
  useEffect(() => {
    async function getDetails() {
      const response = await fetch(`/api/list/${id}`);
      const payload = await response.json();
      setDetail(payload);
    }
    getDetails();
  }, []);

  useEffect(() => {
    console.log(detail.release_date);
    var dateString = detail.release_date;
    if (dateString) {
      console.log(dateString.slice(0, 2));
      console.log(dateString.slice(3, 5));
      console.log(dateString.slice(6, 8));
      var day = parseInt(dateString.slice(0, 2));
      var month = parseInt(dateString.slice(3, 5));
      var yy = parseInt(dateString.slice(6, 8));
      var eventDate = new Date(yy, month, day);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDate(eventDate.toLocaleDateString(undefined, options));
    }
  }, [detail]);
  return (
    <div>
      <h1>{detail.title}</h1>
      <h3>{detail.tagline}</h3>
      <p>{detail.overview}</p>
      <h5>Release Data: {date}</h5>
      <h5>Run Time: {detail.runtime} Minutes</h5>
      <h5>Status: {detail.status}</h5>
      <h5>Vote Average : {detail.vote_average} /10</h5>
      <h5>Vote Count: {detail.vote_count}</h5>
    </div>
  );
}
