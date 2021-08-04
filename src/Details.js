import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  let { id } = useParams();
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    async function getDetails() {
      const response = await fetch(`/api/list/${id}`);
      const payload = await response.json();
      setDetail(payload);
    }
    getDetails();
  }, []);
  return (
    <div>
      <h1>{detail.title}</h1>
      <h3>{detail.tagline}</h3>
      <p>{detail.overview}</p>
      <h5>Release Data: {detail.release_date}</h5>
      <h5>Run Time: {detail.runtime} Minutes</h5>
      <h5>Status: {detail.status}</h5>
      <h5>Vote Average : {detail.vote_average} /10</h5>
      <h5>Vote Count: {detail.vote_count}</h5>
    </div>
  );
}
