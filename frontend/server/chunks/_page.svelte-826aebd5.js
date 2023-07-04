import { c as create_ssr_component, s as subscribe, g as escape, b as add_attribute, v as validate_component, k as each, z as is_promise, y as noop, q as onDestroy } from './handler-5880edf8.js';
import { E as Eye$1 } from './eye-cbb9ddb5.js';
import { f as formatDate, a as Hash$1, H as Heart$1 } from './utilities-2c60c4f2.js';
import { p as page } from './stores2-fc3510c9.js';
import { L as Loader2 } from './loader-2-ae42cf53.js';
import { I as Icon$1 } from './Icon-e8a169f2.js';
import { s as site_img, t as title, b as twitter } from './config-1f567595.js';
import { A as Avatar } from './Avatar-3a0f535e.js';

const cLabel = "p-4 pt-0";
const cList = "list-none space-y-1";
const cListItem = "px-4 py-2 cursor-pointer";
function setHeadingClasses(headingElem) {
  if (headingElem.tagName === "H3")
    return "ml-3";
  if (headingElem.tagName === "H4")
    return "ml-6";
  if (headingElem.tagName === "H5")
    return "ml-9";
  if (headingElem.tagName === "H6")
    return "ml-12";
  return "";
}
const TableOfContents = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesLabel;
  let classesList;
  let classesListItem;
  let { scrollParent = "#page" } = $$props;
  let { target = "#page" } = $$props;
  let { allowedHeadings = "h2, h3" } = $$props;
  let { label = "On This Page" } = $$props;
  let { width = "w-[240px]" } = $$props;
  let { spacing = "space-y-4" } = $$props;
  let { text = "text-surface-600-300-token" } = $$props;
  let { hover = "hover:bg-primary-hover-token" } = $$props;
  let { active = "bg-primary-active-token !text-on-primary-token" } = $$props;
  let { rounded = "rounded-token" } = $$props;
  let { regionLabel = "font-bold" } = $$props;
  let { regionList = "" } = $$props;
  let filteredHeadingsList = [];
  let activeHeaderId;
  onDestroy(() => {
  });
  if ($$props.scrollParent === void 0 && $$bindings.scrollParent && scrollParent !== void 0)
    $$bindings.scrollParent(scrollParent);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.allowedHeadings === void 0 && $$bindings.allowedHeadings && allowedHeadings !== void 0)
    $$bindings.allowedHeadings(allowedHeadings);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.regionLabel === void 0 && $$bindings.regionLabel && regionLabel !== void 0)
    $$bindings.regionLabel(regionLabel);
  if ($$props.regionList === void 0 && $$bindings.regionList && regionList !== void 0)
    $$bindings.regionList(regionList);
  classesBase = `${width} ${spacing} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel} ${regionLabel}`;
  classesList = `${cList} ${regionList}`;
  classesListItem = `${cListItem} ${text} ${hover} ${rounded}`;
  return ` ${filteredHeadingsList.length > 0 ? `<div class="${"toc " + escape(classesBase, true)}"><nav class="${"toc-list " + escape(classesList, true)}"><div class="${"toc-label " + escape(classesLabel, true)}">${escape(label)}</div> ${each(filteredHeadingsList, (headingElem) => {
    return ` <li class="${"toc-list-item " + escape(classesListItem, true) + " " + escape(setHeadingClasses(headingElem), true) + " " + escape(headingElem.id === activeHeaderId ? active : "", true)}"> ${escape(headingElem.firstChild?.nodeValue)} </li>`;
  })}</nav></div>` : ``}`;
});
const Message_square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "message-square" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const MessageSquare = Message_square;
const Messages_square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"
      }
    ],
    [
      "path",
      {
        "d": "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "messages-square" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const MessagesSquare = Messages_square;
const Trash_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      {
        "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      }
    ],
    [
      "path",
      {
        "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "10",
        "y1": "11",
        "y2": "17"
      }
    ],
    [
      "line",
      {
        "x1": "14",
        "x2": "14",
        "y1": "11",
        "y2": "17"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "trash-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trash2 = Trash_2;
const LikeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isLoading;
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  isLoading = false;
  return `<div class="flex border-e border-gray-500/50 px-2"><span class="hidden">${post.liked ? `<style data-svelte-h="svelte-ijjf54">.lucide-heart {
					fill: rgb(var(--color-secondary-500));
					--tw-text-opacity: 1;
					color: rgb(var(--color-secondary-500) / var(--tw-text-opacity));
				}</style>` : ``}</span> <form method="POST" action="?/like"><button type="submit" class="flex">${isLoading ? `${validate_component(Loader2, "Loader2").$$render($$result, { class: "animate-spin" }, {}, {})}` : `${validate_component(Heart$1, "Heart").$$render($$result, { "stroke-width": "1.25", size: "16px" }, {}, {})}`} <p class="ps-1 text-sm leading-4">${escape(post.like_count)}</p></button></form></div>`;
});
const AuthorPopup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="card p-4shadow-xl w-60 variant-glass-surface" data-popup="author-popup" data-svelte-h="svelte-kni9ah"><div class="space-4 p-4 flex flex-col w-full items-center"><figure class="avatar aspect-square overflow-hidden isolate w-16 rounded-full" data-testid="avatar"><img class="avatar-image w-full h-full object-cover" style="" src="/md-self.png" alt="Avishka Kavinda"></figure> <div class="text-center"><p class="font-bold">Avishka Kavinda</p> <a href="https://www.instagram.com/acekavi/" class="opacity-50" target="_blank">@acekavi</a></div> <p class="my-2">Meet the &quot;Full Stack Design Ninja&quot;! I bring the best of both worlds—killer coding skills and a
			flair for stunning graphic design. Ready to create some tech magic? Let&#39;s rock and roll! 🚀</p> <div class="flex gap-4 felx flex-row mb-2"><small><strong>100</strong> <span class="opacity-50">Following</span></small> <small><strong>1M</strong> <span class="opacity-50">Followers</span></small></div> <a class="btn btn-sm variant-soft w-full" href="https://www.linkedin.com/in/acekavi/" target="_blank" rel="noreferrer">View on Linkedin</a></div> <div class="arrow variant-glass-surface" style="left: 140px; top: -4px;"></div></div>`;
});
const BlogContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { postContent } = $$props;
  if ($$props.postContent === void 0 && $$bindings.postContent && postContent !== void 0)
    $$bindings.postContent(postContent);
  return `<article class="prose md:prose-lg lg:prose-xl dark:prose-invert my-8 min-w-full"><div class="prose-pre:m-0 prose-a:no-underline lg:prose-pre:w-full prose-pre:rounded-none prose-pre:bg-neutral-900/70">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div class="shadow rounded-md p-4 w-3/5 mx-auto" data-svelte-h="svelte-ldetyz"><div class="animate-pulse flex space-x-4"><div class="flex-1 space-y-6 py-1"><div class="h-2 bg-slate-700 rounded"></div> <div class="space-y-3"><div class="grid grid-cols-3 gap-4"><div class="h-2 bg-slate-700 rounded col-span-2"></div> <div class="h-2 bg-slate-700 rounded col-span-1"></div></div> <div class="h-2 bg-slate-700 rounded"></div></div> <div class="h-2 bg-slate-700 rounded"></div> <div class="space-y-3"><div class="h-2 bg-slate-700 rounded"></div></div> <div class="h-2 bg-slate-700 rounded"></div> <div class="space-y-3"><div class="h-2 bg-slate-700 rounded"></div></div> <div class="h-2 bg-slate-700 rounded"></div> <div class="space-y-3"><div class="h-2 bg-slate-700 rounded"></div></div></div></div></div> `;
    }
    return function(value) {
      return ` <aside class="lg:w-80 lg:fixed lg:top-1/2 lg:bottom-1/2 lg:translate-y-1/2 lg:ms-6 mb-8 lg:m-0">${validate_component(TableOfContents, "TableOfContents").$$render(
        $$result,
        {
          target: "#postContent",
          allowedHeadings: "h1, h2, h3",
          regionLabel: "text-2xl uppercase font-semibold",
          rounded: "rounded-none",
          active: "",
          text: "text-neutral-900 dark:text-neutral-100 font-medium text-sm",
          scrollParent: "#postContent"
        },
        {},
        {}
      )}</aside> <script lang="ts" data-svelte-h="svelte-10m1a7q">function copyCode(button) {
  const codeBlock = button.parentNode?.nextElementSibling;
  const code = codeBlock?.textContent;
  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1e3);
    });
  }
}<\/script> <div id="postContent" class="lg:ms-80 lg:w-5/6"><!-- HTML_TAG_START -->${value}<!-- HTML_TAG_END --></div> `;
    }(__value);
  }(postContent)}</div></article>`;
});
const CommentBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { comment } = $$props;
  let { current_user } = $$props;
  let deleteButton;
  const current_user_id = current_user?.id || "";
  if ($$props.comment === void 0 && $$bindings.comment && comment !== void 0)
    $$bindings.comment(comment);
  if ($$props.current_user === void 0 && $$bindings.current_user && current_user !== void 0)
    $$bindings.current_user(current_user);
  return `<div class="my-auto">${validate_component(Avatar, "Avatar").$$render(
    $$result,
    {
      initials: comment.author.substring(0, 2),
      background: "variant-glass-primary",
      width: "w-10"
    },
    {},
    {}
  )}</div> <div class="flex flex-col variant-glass-surface p-2 ms-4 w-full"><div class="w-full inline-flex"><p class="font-sans text-xs capitalize border-e border-gray-500/50 pe-2">${escape(comment.author)}</p> <p class="font-sans text-xs ps-2">${escape(formatDate(comment.created_at))}</p> ${current_user_id == comment.user_id ? `<button class="flex text-secondary-400 hover:text-secondary-500 ms-4">${validate_component(Trash2, "Trash2").$$render($$result, { "stroke-width": "1.25", size: "16px" }, {}, {})}</button> <form action="?/delete_comment" method="POST"><input type="hidden" name="comment_id" id="comment_id"${add_attribute("value", comment.id, 0)}> <button type="submit" class="hidden"${add_attribute("this", deleteButton, 0)}></button></form>` : ``}</div> <div><p class="font-serif">${escape(comment.content)}</p></div></div>`;
});
const CommentSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let commentLoading;
  let replyLoading;
  let { comments } = $$props;
  let { current_user } = $$props;
  if ($$props.comments === void 0 && $$bindings.comments && comments !== void 0)
    $$bindings.comments(comments);
  if ($$props.current_user === void 0 && $$bindings.current_user && current_user !== void 0)
    $$bindings.current_user(current_user);
  commentLoading = false;
  replyLoading = false;
  return `<div class="mb-4"><p class="text-3xl pt-8 border-t border-gray-500/50 mb-2" data-svelte-h="svelte-c4du3r">Leave a comment...</p> <form action="?/comment" method="post"><label class="label" data-svelte-h="svelte-11e3qiq"><textarea class="textarea variant-form-material leading-5 resize-none" rows="4" placeholder="Write your comment here..." name="content"></textarea></label> <button type="submit" class="btn variant-glass-primary mt-2 btn-sm font-semibold"><span data-svelte-h="svelte-1pkkat1">Comment</span> ${commentLoading ? `${validate_component(Loader2, "Loader2").$$render($$result, { class: "animate-spin" }, {}, {})}` : `<span>${validate_component(MessageSquare, "MessageSquare").$$render($$result, { "stroke-width": "1.25", size: "16px" }, {}, {})}</span>`}</button></form></div> ${each(comments, (comment) => {
    return `<div class="p-2 ps-0 mb-2 rounded-none"><div class="flex flex-row">${validate_component(CommentBox, "CommentBox").$$render($$result, { comment, current_user }, {}, {})}</div> ${each(comment.replies, (reply) => {
      return `<div class="flex flex-row ms-8 mt-2">${validate_component(CommentBox, "CommentBox").$$render($$result, { comment: reply, current_user }, {}, {})} </div>`;
    })} ${current_user != void 0 ? `<div class="ms-14 mt-2"><form action="?/comment" method="post"><label class="label" data-svelte-h="svelte-2d2dt0"><textarea class="textarea variant-form-material leading-5 resize-none" rows="2" placeholder="Write your reply here..." name="content"></textarea></label> <input type="hidden" name="parent_id" id="parent_id"${add_attribute("value", comment.id, 0)}> <button type="submit" class="btn variant-glass-primary mt-2 btn-sm font-semibold"><span data-svelte-h="svelte-tfrom2">Reply</span> ${replyLoading ? `${validate_component(Loader2, "Loader2").$$render($$result, { class: "animate-spin" }, {}, {})}` : `<span>${validate_component(MessagesSquare, "MessagesSquare").$$render($$result, { "stroke-width": "1.25", size: "16px" }, {}, {})}</span>`} </button></form> </div>` : ``} </div>`;
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let updated_at;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  updated_at = formatDate(data.props?.post?.updated_at);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-lo7m35_START -->${$$result.title = `<title>${escape(data.props.post?.title.substring(0, 60))}</title>`, ""}<meta name="description"${add_attribute("content", data.props.post?.description.substring(0, 155) + "...", 0)}><meta property="og:type" content="article"><meta property="og:title"${add_attribute("content", data.props.post?.title, 0)}><meta property="og:description"${add_attribute("content", data.props.post?.description, 0)}><meta property="og:image"${add_attribute("content", site_img, 0)}><meta property="og:url"${add_attribute("content", $page.url.href, 0)}><meta property="og:site_name"${add_attribute("content", title, 0)}><meta name="twitter:title"${add_attribute("content", data.props.post?.title, 0)}><meta name="twitter:description"${add_attribute("content", data.props.post?.description, 0)}><meta name="twitter:image"${add_attribute("content", site_img, 0)}><meta name="twitter:site"${add_attribute("content", $page.url.href, 0)}><meta name="twitter:creator"${add_attribute("content", twitter, 0)}><style data-svelte-h="svelte-7lvawk">html {
			scroll-behavior: smooth;
		}</style><!-- HEAD_svelte-lo7m35_END -->`, ""} <div class="flex lg:flex-row"><main class="flex flex-col lg:w-full w-4/5 mx-auto">${data.props.post != void 0 ? `<p class="lg:text-9xl text-3xl font-heading-token font-extrabold lg:text-center">${escape(data.props.post.title)}</p> <div class="flex lg:flex-row flex-col gap-2 lg:gap-0 justify-between mb-2 mt-6 lg:w-4/5 lg:mx-auto"><p class="text-sm px-2 leading-4 my-2">Published by <button class="border-b border-primary-500" data-svelte-h="svelte-1oykyjy">Avishka Kavinda</button>
					on ${escape(updated_at)}</p> ${validate_component(AuthorPopup, "AuthorPopup").$$render($$result, {}, {}, {})} <div class="flex">${each(data.props.post.tags, (tag) => {
    return `<span class="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-blue-700/10 mx-1">${validate_component(Hash$1, "Hash").$$render($$result, { size: "12px" }, {}, {})}${escape(tag)}</span>`;
  })}</div> <div class="flex flex-wrap gap-2 lg:gap-0 my-2 me-4"><div class="flex border-e border-gray-500/50 pe-2">${validate_component(Eye$1, "Eye").$$render($$result, { size: "16px" }, {}, {})} <p class="ps-1 text-sm leading-4">${escape(data.props.post.views)}</p></div> ${validate_component(LikeButton, "LikeButton").$$render($$result, { post: data.props.post }, {}, {})} <p class="text-sm px-2 leading-4">${escape(data.props.post.category)}</p></div></div> <div class="text-xl font-serif py-8 border-b border-gray-500/50"><h1 class="h1 mb-2 font-extrabold lg:mx-16" data-svelte-h="svelte-1s8gr3q">Overview</h1> <div class="mt-4 lg:mx-16">${escape(data.props.post.description)}</div></div> ${validate_component(BlogContent, "BlogContent").$$render($$result, { postContent: data.props.post.html }, {}, {})} <div class="lg:ms-80 lg:w-5/6">${validate_component(CommentSection, "CommentSection").$$render(
    $$result,
    {
      comments: data.props.comments,
      current_user: data.props.user
    },
    {},
    {}
  )}</div>` : `<div class="flex flex-row h-screen justify-center text-center" data-svelte-h="svelte-o6abq2"><p class="text-5xl font-sans my-auto">Oops, No blog data.props.post found. <br> Please try again later.</p></div>`}</main></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-826aebd5.js.map
