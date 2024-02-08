import type { Component } from 'solid-js';
import { createResource, For } from "solid-js";

// Get the canvas token from the .env file
const canvas_token: string = import.meta.env.VITE_CANVAS_TOKEN;

const canvas_link: string = "https://canvas.instructure.com/api/v1/courses?access_token=" + canvas_token;

// Fetch the data from the canvas API
async function fetchCanvasData() {
  const res = await fetch(canvas_link);
  return res.json();
}

const App: Component = () => {

  // Create a resource to fetch the data from the canvas API include headers
  const [canvasData] = createResource(fetchCanvasData);
  
  return (
    <div>
      <header>
        <h1>Canvas API</h1>
        <For each={canvasData()} fallback={<div>Loading...</div>}>
          {(course: any) => (
            <div>
              <h2>{course.name}</h2>
              <p>{course.course_code}</p>
            </div>
          )}
        </For>
      </header>
    </div>
  );
};

export default App;
