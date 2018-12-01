import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 150,
  duration: '5m'
}

export default function() {
  let id = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);
  http.get(`http://localhost:4000/homes/${id}`);
};