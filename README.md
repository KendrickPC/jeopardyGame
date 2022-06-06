# Jeopardy Assessment

1. [Bootstrap Bordered Tables](https://getbootstrap.com/docs/4.0/content/tables/)

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy" crossorigin="anonymous"></script>
```

2. 
[jService Documentation](https://jservice.io/)
[jService API Help](https://www.reddit.com/r/javascript/comments/2q6kbz/jservice_108000_trivia_questions/)
```js
// http://jservice.io/api/categories?count=100
```

3. Generate Non repeating random nums
[generate random value from my array, without repeating itself [duplicate]](https://stackoverflow.com/questions/27431187/cannot-find-module-lodash)
```js
$ npm install lodash --save
// https://lodash.com/docs#shuffle
const colors = ['blue','red','orange','purple','gray','yellow'];
const selectedColors = _.shuffle(colors).splice(0, 3);  // 3 random colors
console.log(selectedColors);
```

4. HTML Framework
```html
<h1 class="h1 text-center m-3">Kenneth's Jeopardy</h1>
<div class="container">
<table id="jeopardy">
    <thead></thead>
    <tbody></tbody>
</table>
</div>
```

