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

const rangeFlowerOptions = http.options("/example", () => {
  return new HttpResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers": "*",
    },
  });
});

//const rangeFlowerHandler = http.get("/example", async ({ request }) => {
//  console.log(request.headers.get("Range"));
//  const easyVideo = await fetch("/flower.mp4").then((response) =>
//    response.arrayBuffer(),
//  );
//
//  return HttpResponse.arrayBuffer(easyVideo, {
//    headers: { "content-type": "video/mp4" },
//  });
//});

const rangeFlowerHandler = http.get("/example", async ({ request }) => {
  const easyVideo = await fetch("/flower.mp4").then((response) =>
    response.arrayBuffer(),
  );

  const range = request.headers.get("Range");

  if (!range) {
    throw HttpResponse.text("Missing Range", { status: 400 });
  }

  const ranges = range.replace(/bytes=/, "").split("-");
  const start = +ranges[0];
  const end = ranges[1] ? +ranges[1] : easyVideo.byteLength - 1;
  const content = easyVideo.slice(start, end);

  return HttpResponse.arrayBuffer(content, {
    status: 206,
    headers: {
      "Accept-Range": "bytes",
      "Content-Range": `bytes=${start}-${end}/${easyVideo.byteLength}`,
      "Content-Length": content.byteLength.toString(),
      "Content-Type": "text/plain",
    },
  });
});

export const handlers = [
  simpleFlowerHandler,
  rangeFlowerOptions,
  rangeFlowerHandler,
];
