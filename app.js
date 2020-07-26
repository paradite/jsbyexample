const arrayItems = [
  {
    name: "includes",
    examples: [
      `['apple', 'banana', 'cake'].includes('apple')`,
      `['apple', 'banana', 'cake'].includes('orange')`,
      `['apple', 'banana', 'cake'].includes('')`,
    ],
  },
  {
    name: "indexOf",
    examples: [
      `['apple', 'banana', 'cake', 'apple'].indexOf('apple')`,
      `['apple', 'banana', 'cake', 'apple'].indexOf('apple', 1)`,
      `['apple', 'banana', 'cake', 'apple'].indexOf('orange')`,
    ],
  },
  {
    name: "slice",
    examples: [
      `['apple', 'banana', 'cake'].slice(1)`,
      `['apple', 'banana', 'cake'].slice(1, 2)`,
      `['apple', 'banana', 'cake'].slice(4)`,
    ],
  },
  {
    name: "sort",
    examples: [
      `['apple', 'cake', 'banana', 'apple'].sort()`,
      `['apple', 'cake', 'banana', 'apple'].sort().reverse()`,
      `[3, 1, 4, 1].sort((a, b) => a - b)`,
      `[3, 1, 4, 1].sort((a, b) => b - a)`,
    ],
  },
  {
    name: "splice",
    examples: [
      `items = ['apple', 'banana', 'cake'];\nitems.splice(1);`,
      `items`,
      `items = ['apple', 'banana', 'cake'];\nitems.splice(1, 1);`,
      `items`,
      `items = ['apple', 'banana', 'cake'];\nitems.splice(1, 0, 'avocado');`,
      `items`,
    ],
  },
];

const objectItems = [
  {
    name: "entries",
    examples: [
      `obj = { a: 1, b: 's' };\nObject.entries(obj);`,
      `obj = { a: 1, b: 's' };
var arr=[];
for (const [key, value] of Object.entries(obj)) {
  arr.push(\`\${key}: \${value}\`);
}
arr.join(', ');`,
    ],
  },
];

const stringItems = [
  {
    name: "includes",
    examples: [
      `'apple'.includes('a')`,
      `'apple'.includes('z')`,
      `'apple'.includes('')`,
    ],
  },
  {
    name: "indexOf",
    examples: [
      `'architecture'.indexOf('r')`,
      `'architecture'.indexOf('r', 3)`,
      `'architecture'.indexOf('r', 11)`,
      `'architecture'.indexOf('z')`,
    ],
  },
  {
    name: "split",
    examples: [
      `'apple'.split('')`,
      `'apple'.split('p')`,
      `'apple'.split('l')`,
      `'apple'.split('d')`,
    ],
  },
];

const categories = [
  {
    name: "Array",
    items: arrayItems,
  },
  {
    name: "Object",
    items: objectItems,
  },
  {
    name: "String",
    items: stringItems,
  },
];

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function prettierPrint(obj) {
  if (!obj) {
    return obj;
  }
  return JSON.stringify(obj, null, "").replace(/"/g, "'").replace(/,/g, ", ");
}

const svgIn = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle" width='10' height='12'><polygon fill="#f0f0f0" points="10,6 0,12 0,10 6,6 0,2 0,0"/></svg>`;
const svgOut = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle" width='10' height='12'><polygon fill="#f0f0f0" points="0,6 10,0 10,2 4,6 10,10 10,12"/></svg>`;

const sidebarElmenet = document.getElementById("sidebar");
const mainElmenet = document.getElementById("main");
for (const category of categories) {
  const sidebarTypeElementText = htmlToElement(
    `<div class="sidebarCategory"><div class="sidebarCategoryTitle">${category.name}</div></div>`
  );
  for (const item of category.items) {
    sidebarTypeElementText.insertAdjacentHTML(
      "beforeend",
      `<div class="sidebarItemTitle"><a href="#${category.name}-${item.name}">${item.name}</a></div>`
    );
    mainElmenet.insertAdjacentHTML(
      "beforeend",
      `<div class="mainItemTitlePrefix" id="${category.name}-${item.name}"><a href="#${category.name}-${item.name}">#</div><div class="mainItemTitle"><span class="mainItemTitleCategory">${category.name} ></span> ${item.name}</a></div>`
    );
    const itemExampleBlock = htmlToElement(
      `<div class="mainItemExampleBlock"></div>`
    );
    for (const example of item.examples) {
      itemExampleBlock.insertAdjacentHTML(
        "beforeend",
        `<div><div class="mainExamplePrefix">${svgIn}</div><div class="mainExampleTitle">${example}</div></div>`
      );

      // TODO: move `eval` to CI or build stage
      const result = prettierPrint(eval(example));
      itemExampleBlock.insertAdjacentHTML(
        "beforeend",
        `<div class="mainExampleResultContainer"><div class="mainExamplePrefix">${svgOut}</div><div class="mainExampleResult">${result}</div></div>`
      );
      mainElmenet.insertAdjacentElement("beforeend", itemExampleBlock);
    }
  }
  sidebarElmenet.insertAdjacentElement("beforeend", sidebarTypeElementText);
}
