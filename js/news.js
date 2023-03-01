// console.log('hello')
const newsCategory = () => {
        fetch('https://openapi.programming-hero.com/api/news/categories')
         .then(res => res.json())
         .then(data => displayNewsCategory(data.data))
}

// newsDataLoad()
const displayNewsCategory = (data) => {
        // console.log(data.news_category)
        // category capture 
        const categoryContainer = document.getElementById('category-container');
        data.news_category.forEach(singleCategory => {
                // console.log(singleCategory)
                // 
//    categoryContainer.innerHTML += ` <a >${singleCategory.category_name}</a>`;
        const categoryList = document.createElement('p')
        categoryList.innerHTML = `
        <a onclick = "fetchCategoryId('${singleCategory.category_id}', '${singleCategory.category_name}')" >${singleCategory.category_name}</a>
 
 `;
 categoryContainer.appendChild(categoryList)
        });
        
}

// all news detailes click category 
const fetchCategoryId = (category_id,category_name) => {
        const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
        // console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(data =>  allNewsShow(data.data,category_name))
}
// fetchCategoryId()
const allNewsShow = (data, category_name) => {
        console.log(data, category_name)
        document.getElementById('category-count').innerText = data.length ;
        document.getElementById('news-category').innerText = category_name ;
}