// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids 
 */

async function getCategoryIds() {
  const response = await axios.get('https://jservice.io/api/categories?count=100')
  const categoryIds = response.data.map(item => {
    return item.id;
  })
  const selectedCategoryIds = _.shuffle(categoryIds).splice(0, 6);
  // for (let categoryId of selectedCategoryIds) {
  //   console.log(categoryId);
  // }
  return selectedCategoryIds;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const response = await axios.get(`https://jservice.io/api/category?id=${catId}`);
  const category = response.data;
  // const clues = category.map(item => {
  //   return {item.questions, item.}
  // })

  // console.log(category.title);

  const cluesArray = category.clues.map(item => {
    return {
      questions: item.question,
      answer: item.answer,
      showing: null,
    }
  })
  // console.log(cluesArray);
  return {title: category.title, clues: cluesArray}

}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  $("#table-head").empty();
  // Creating new table row:
  let $tr = $("<tr>");
  for (let category of categories) {
    $tr.append($('<th scope="col">').text(category.title));
  }
  $("#table-head").append($tr);

  // Creating questions board (literally, with just question marks):
  $("#table-body").empty();
  for (let clueIndex = 0; clueIndex < 5; clueIndex++) {
    let $tr = $("<tr>");
    for (let categoryIndex = 0; categoryIndex < 6; categoryIndex++) {
      $tr.append($("<td>").attr("id", `${categoryIndex}-${clueIndex}`).text("?"));
    }
    $("#table-body").append($tr);
  }
  hideLoadingView();
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  // typeof === "string"
  const fullId = evt.target.id;
  // Array deconstruction to get unique categoryId and clueId:
  const [categoryId, clueId] = fullId.split("-");
  const clue = categories[categoryId].clues[clueId];
  console.log(clue);
  let stateManagement;
  // console.log(stateManagement);
  if (clue.showing === null) {
    stateManagement = clue.questions;
    clue.showing = "questions";
  } else if (clue.showing === "questions") {
    stateManagement = "What is " + clue.answer + "?";
    clue.showing = "answer";
  } else {
    return;
  }
  
  // Updating table cell:
  $(`#${categoryId}-${clueId}`).html(stateManagement);

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $('.loading').text("Loading...")
  console.log("loading")
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $('.loading').remove();
  console.log("REMOVING")
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  showLoadingView();
  const categoryIds = await getCategoryIds();
  // For restart button click:
  categories = [];
  for (let categoryId of categoryIds) {
    categories.push(await getCategory(categoryId));
  }
  // console.log("setupAndStart: " + JSON.stringify(categories));
  fillTable();
}



$(async function() {
  showLoadingView();
  setupAndStart();
  $("#table-body").on("click", "td", handleClick);
})

$(document).ready(function() {
  $(".restart").click(function() {
    location.reload(true);
  })
})

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO