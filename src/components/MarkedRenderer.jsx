import DOMPurify from "dompurify";
import * as marked from "marked";


const renderer = new marked.Renderer();


// ===== CONVERT MARKDOWN TO HTML =====
renderer.heading = (text) => {
    if(text.type=='heading'){
      return `<h${text.depth}>${text.text}</h${text.depth}>`;
    }
    return ''
    
  };

  renderer.link = (linkobj) => {
    const safeHref = typeof linkobj === 'object' ? linkobj.href : "";
    const safeTitle = linkobj.title ? ` title="${linkobj.title}"` : '';
    const safeText = linkobj.text || safeHref;
    return `<a class="message-link" href="${safeHref}"${safeTitle}  rel="noopener noreferrer">${safeText}</a>`;
    
  };

  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    langPrefix: 'language-',
    renderer: renderer,
  });

  export const renderMessage = (text) => {
    if (!text) return { __html: "" };
    return { __html: DOMPurify.sanitize(marked.parse(text)) };
  };