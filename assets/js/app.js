const array = [

    fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple'),
    fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple'),
    fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple')
]

Promise.all (array)
.then ((res) => {
    Promise.all (res.map((item)=> { return item.json();
    }))
.then (data => console.log (data));
})
.catch(error => console.error ("fetch failed:", error));
    