import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: '10s'
}

export default function() {
  let id = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);
  http.get(`http://localhost:4000/homes/${id}`);
};