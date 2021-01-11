           var db = firebase.firestore();
           var searchArray = [];


           async function getSearchDocs() {
               const snapshot = await db.collection('search').doc('searchArray').get();
               const searchObject = await snapshot.data();
               const searchTempList = await Object.values(searchObject);
               searchTempList.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));
               searchTempList.forEach(element => searchArray.push(element));
               return searchArray;
           };




           Promise.all([getSearchDocs()]).then(function () {

               var post = new Bloodhound({
                   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('keywords'),
                   queryTokenizer: Bloodhound.tokenizers.whitespace,
                   local: searchArray.filter(item => item.type === 'post'),
               });

               var product = new Bloodhound({
                   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('keywords'),
                   queryTokenizer: Bloodhound.tokenizers.whitespace,
                   local: searchArray.filter(item => item.type === 'product'),
               });

               var productCategory = new Bloodhound({
                   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('keywords'),
                   queryTokenizer: Bloodhound.tokenizers.whitespace,
                   local: searchArray.filter(item => item.type === 'productCategory'),
               });

               var control = new Bloodhound({
                   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('keywords'),
                   queryTokenizer: Bloodhound.tokenizers.whitespace,
                   local: searchArray.filter(item => item.type === 'control'),
               });

               var event = new Bloodhound({
                   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('keywords'),
                   queryTokenizer: Bloodhound.tokenizers.whitespace,
                   local: searchArray.filter(item => item.type === 'event'),
               });

               $('#multiple-datasets .typeahead').typeahead({
                       highlight: true,
                       minlenght: 3,
                       hint: true,
                       accent: true
                   }, {
                       name: 'content',
                       display: 'content',
                       source: post,
                       limit: 4,
                       hint: true,
                       templates: {
                           header: `<div class="search2-tt-header"> <h3 class="search2-tt-header-title">İçerikler<span id="content-count"></span></h3></div>`,
                           suggestion: function (data) {
                               return `<a href="https://www.hortiturkey.com/yazilar${data.slug}" class="search2-result-content w-inline-block"><div class="post-category-container"><div class="post-tag">${data.category}</div><div class="post-tag-dot"></div><div class="post-tag-readin-time">${data.readingTime}</div></div><h4 class="search2-result-title">${data.title}</h4><p class="post-paragraph-mini">${data.description}</p></a>`
                           },
                           empty: function (context) {
                               return `<div class="search2-tt-header"> <h3 class="search2-tt-header-title">İçerikler</h3><a href="#" class="search2-tt-header-link-box">Tümünü Gör →</a></div><div class="search2-empty-text">Bu arama için sonuç bulunamadı.</div>`;
                           }
                       }
                   },

                   {
                       name: 'product',
                       display: 'product',
                       source: product,
                       limit: 8,
                       hint: true,
                       templates: {
                           header: `<div class="search2-tt-header"> <h3 class="search2-tt-header-title">Ürünler</h3><a href="#" class="search2-tt-header-link-box">Tümünü Gör →</a></div>`,
                           suggestion: function (data) {
                               return `<a href="${data.slug}" class="search2-result-product w-inline-block"><img src="${data.imageURL}" loading="lazy" id="w-node-9224dd65e772-4dedb92e" alt class="search2-result-product-image"><div><div class="post-category-container"><div class="post-tag-colored prod">ÜRÜN</div><div class="post-tag-dot"></div><div class="post-tag">${data.subCategory}</div></div><h4 class="search2-result-title">${data.title}</h4><div class="post-category-container"><div class="post-tag">${data.company}</div></div></div></a>`
                           },
                           empty: function (context) {
                               return `<div class="search2-tt-header"> <h3 class="search2-tt-header-title">Ürünler</h3><a href="#" class="search2-tt-header-link-box">Tümünü Gör →</a></div><div class="search2-empty-text">Bu arama için sonuç bulunamadı.</div>`;
                           }
                       }
                   },

                   {
                       name: 'productcategory',
                       display: 'productCategory',
                       source: productCategory,
                       limit: 12,
                       hint: true,
                       templates: {
                           header: function (context) {
                               $(".tt-dataset-productcategory").wrap("<div style='position:relative;'></div>")
                               return `<div class="overflow-overlay"></div>`;
                           },
                           suggestion: function (data) {
                               return `<a href="${data.slug}" class="search2-result-productcategory w-inline-block"><h4 class="search2-result-title small">${data.title}</h4><h4 class="search2-result-description"><span class="search2-result-description-span">${data.companyNumber}</span> firmadan, <span class="search2-result-description-span">${data.productNumber}</span> ürünü gör →</h4></a>`
                           }
                       }
                   },

                   {
                       name: 'control',
                       display: 'control',
                       source: control,
                       limit: 4,
                       hint: true,
                       templates: {
                           header: `<div class="search2-tt-header"> <h3 class="search2-tt-header-title">Zirai Mücadeleler</h3><a href="/zirai-mucadele-kutuphanesi" class="search2-tt-header-link-box">Zirai Mücadele Kütüphanesini Gör →</a></div>`,
                           suggestion: function (data) {
                               return `<a href="${data.slug}" class="search2-result-control w-inline-block"><div class="post-category-container"><div class="post-tag-colored zirai">ZİRAİ&nbsp;MÜCADELE</div></div><h4 class="search2-result-title max-width">${data.title}</h4><div class="post-category-container"><div class="post-tag-colored author">${data.category}</div><div class="post-tag-dot"></div><div class="post-tag">${data.subCategory}</div></div></a>`
                           },
                           empty: function (context) {
                               return `<div class="search2-tt-header"> <h3 class="search2-tt-header-title">Zirai Mücadeleler</h3><a href="/zirai-mucadele-kutuphanesi" class="search2-tt-header-link-box">Zirai Mücadele Kütüphanesini Gör →</a></div><div class="search2-empty-text">Bu arama için sonuç bulunamadı.</div>`;
                           }
                       }
                   },

                   {
                       name: 'event',
                       display: 'event',
                       source: event,
                       limit: 20,
                       hint: true,
                       templates: {
                           header: function (context) {
                               $(".tt-dataset-event").wrap("<div style='position:relative;'></div>");
                               return `<div class="overflow-overlay"></div><div class="search2-tt-header"><h3 class="search2-tt-header-title">Fuarlar</h3><a href="/tarim-fuarlari" class="search2-tt-header-link-box">Fuar Takvimini Gör →</a></div>`;
                           },
                           suggestion: function (data) {
                               return `<a href="${data.slug}" class="search2-result-event w-inline-block"><div class="post-category-container"><div class="post-tag-colored event">FUAR</div><div class="post-tag-dot"></div><div class="post-tag">${data.category}</div><div class="post-tag-dot"></div><div class="post-tag light">${data.year}</div></div><h4 class="search2-result-title max-width">${data.title}</h4><p class="post-paragraph listing search-v2" style="overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2;">${data.description}</p><div class="post-category-container"><div class="post-tag-colored author">${data.fullDate}</div><div class="post-tag-dot"></div><div class="post-tag">${data.location}</div></div></a>`
                           }
                       }
                   }


               );

           })
