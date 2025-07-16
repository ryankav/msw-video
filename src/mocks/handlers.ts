import { http, HttpResponse } from "msw";

const simpleFlowerHandler = http.get("/simple-example", async ({ request }) => {
  console.log(request.headers.get("Range"));
  const easyVideo = await fetch("/flower.mp4").then((response) =>
    response.arrayBuffer(),
  );

  return HttpResponse.arrayBuffer(easyVideo, {
    headers: { "content-type": "video/mp4" },
  });
});

const rangeFlowerOptions = http.options("example", () => {
  return new HttpResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers": "*",
    },
  });
});

const rangeFlowerHandler = http.get("/example", async ({ request }) => {
  console.log(request.headers.get("Range"));
  const easyVideo = await fetch("/flower.mp4").then((response) =>
    response.arrayBuffer(),
  );

  return HttpResponse.arrayBuffer(easyVideo, {
    headers: { "content-type": "video/mp4" },
  });
});

export const handlers = [
  simpleFlowerHandler,
  rangeFlowerOptions,
  rangeFlowerHandler,
];
