// console.log('hello')
let fetchData = [];

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
        .then(data => {
                fetchData = data.data ;
                allNewsShow(data.data,category_name)
        })
}
// fetchCategoryId()
const allNewsShow = (data, category_name) => {
        // console.log(data, category_name)
        document.getElementById('category-count').innerText = data.length ;
        document.getElementById('news-category').innerText = category_name ;

        const allNews = document.getElementById('all-news');
        allNews.innerHTML = '';
        data.forEach(singleNews => {
                // console.log(singleNews)
          const  {image_url,title, details, author, total_view,_id } = singleNews;
        const card = document.createElement('div');
        card.classList.add('row');
        card.innerHTML = `
        
        <div class="row g-0 mt-3">
        <div class="col-md-4">
          <img src="${image_url}" class=" img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8  d-flex flex-column ">
          <div class="card-body ms-3 ">
             
                 <h6>${title}</h6>
            <p>${details.slice(0, 200)}</p>
            
          </div>
          <div class = "card-footer d-flex justify-content-between ms-3 mb-2">
          
          <div class = "d-flex align-items-center">
         
          <div>
          <img class="rounded-circle height = "40" width="40" img-fluid  " src="${author.img
          }"  alt="...">
          </div>
          
          <div>
          <p class = "m-0 p-0"> ${author.name}</p>
          <p class = "m-0 p-0">${author.published_date}</p>
          </div>
          </div>
           

          <div class = "d-flex gap-1 align-items-center">
          
          <p><i class = "fas fa-eye"></i></p>
          <p> ${total_view}</p>
          </div>
          
          
<div  class = "d-flex gap-1 align-items-center" >
        <div class="d-flex">
          <p><i class="text-warning fa-solid fa-star"></i></p>
          <p><i class="text-warning fa-solid fa-star"></i></p>
          <p><i class="text-warning fa-solid fa-star"></i></p>
          <p><i class="text-warning fa-solid fa-star"></i></p>
          <p><i class="text-warning fa-regular fa-star-half-stroke"></i></p>
        </div>
          
        <div>
          <p>4.5</p>
       </div>

</div>
           
          
        <div>
         <i class="fa-solid bg-warning fa-arrow-right" onclick = "newsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ></i>
        </div>

          
         
         

        </div>
      </div>
        
        `;
        allNews.appendChild(card);

        });


};

const newsDetails = (news_id) => {
        const url = ` https://openapi.programming-hero.com/api/news/${news_id}`
        // console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(data => {
                showNewsDetail(data.data[0])
        })
};

// detail show all----

const showNewsDetail = (showNews) => {
//  console.log(showNews)
const  {image_url,title, details, author, total_view,_id ,others_info} =  showNews;
       
        document.getElementById('modal-body').innerHTML = `
        
        <div class="row g-0 mt-3">
        <div class="col-md-12">
          <img src="${image_url}" class=" img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-12  d-flex flex-column ">
          <div class="card-body ms-3 ">
             
                 <h6>${title} <span class="badge text-bg-warning">
                 ${others_info.is_trending ? "trending" : "not trending"}</span></h6>
            <p>${details}</p>
            
          </div>
          <div class = "card-footer d-flex justify-content-between ms-3 mb-2">
          
          <div class = "d-flex align-items-center">
         
          <div>
          <img class="rounded-circle height = "40" width="40" img-fluid  " src="${author.img
          }"  alt="...">
          </div>
          
          <div>
          <p class = "m-0 p-0"> ${author.name}</p>
          <p class = "m-0 p-0">${author.published_date}</p>
          </div>
          </div>
           

          <div class = "d-flex gap-1 align-items-center">
          
          <p><i class = "fas fa-eye"></i></p>
          <p> ${total_view}</p>
          </div>
          
          
   <div  class = "d-flex gap-1 align-items-center" >
        <div class="d-flex">
          <p><i class="text-warning fa-solid fa-star"></i></p>
           
        </div>
       
   </div>
    
        </div>
      </div>
 `
        };
const trendingNews = () => {
        let trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true)
        const newsCategory = document.getElementById('news-category').innerText ;
        allNewsShow( trendingNews, newsCategory)
}
