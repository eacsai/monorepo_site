import { Marked, Renderer } from "@ts-stack/markdown";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

const renderer = new Renderer();
Marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

export default Marked;
