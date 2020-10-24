<template>
    <div>
        <!-- form-->
        <form @submit.prevent="saveArticle" class="my-4">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Title" v-model="article.title">
            </div>
            <div class="form-group">
                <textarea class="form-control" placeholder="Body of the article" v-model="article.body"> </textarea>
            </div>
            <button type="submit" class="btn btn-success">Save</button>
        </form>
         <!-- /form-->
        <h1>Articles</h1>

        <!-- pagination-->
        <nav class="pagination mb-3">
             <li v-bind:class="[{disabled:!pagination.prev_page_url}]" class="page-item">
                 <a href="#" class="page-link" @click="fetchArticles(pagination.prev_page_url)">Prev</a>
            </li>
            <li  class="page-item disabled">
                <a href="#" class="page-link text-dark">Page {{pagination.current_page}} of {{ pagination.last_page }}</a>
            </li>
            <li v-bind:class="[{disabled:!pagination.next_page_url}]" class="page-item">
                <a href="#" class="page-link"  @click="fetchArticles(pagination.next_page_url)">Next</a>
            </li>
        </nav>
        <!-- /pagination-->

        <!-- List -->
        <div class="card card-body mb-2" v-for="article in articles" v-bind:key="article.id">
            <h3>{{article.title}}</h3>
            <p>{{article.body}}</p>
            <button class="btn btn-danger  d-inline-block" @click="deleteArticle(article.id)">Delete</button> 
            <button class="btn btn-info d-inline-block mt-3" @click="editArticle(article)">Edit</button>   
        </div> 
        <!-- /List -->  
    </div>
   
</template>

<script>
    export default {
        data(){
            return{
                articles:[],
                article:{
                    id:'',
                    title:'',
                    body:''
                },
                pagination:{},
                edit:false,
            }
        },
        created(){
            this.fetchArticles();
        },

        methods:{

            fetchArticles(page_url){
                page_url=page_url||'/api/articles';
                fetch(page_url)
                    .then(resp=>resp.json())
                        .then(data=>{
                            this.articles=data.data;
                            this.makePagination(data.meta,data.links);
                        }).catch(err=>console.log(err));
            },

            makePagination(meta,links){
                this.pagination={
                    current_page:meta.current_page,
                    last_page:meta.last_page,
                    next_page_url:links.next,
                    prev_page_url:links.prev,
                }
            },

            deleteArticle(id){
                if(confirm('Are you sure Delete this?')){
                    fetch(`api/article/${id}`,{method:'delete'})
                        .then(resp=>resp.json())
                            .then(data=>{
                                alert("Article Remove");
                                this.fetchArticles();
                            })
                }
            },

            saveArticle(){
                if(this.edit===false){
                    fetch('api/article',{
                        method:'post',
                        body:JSON.stringify(this.article),
                        headers:{
                            'content-type':'application/json'
                        }
                    }).then(resp=>resp.json())
                        .then(data=>{
                            this.article.title='';
                            this.article.body='';
                            alert("Added");
                            this.fetchArticles()
                        })
                }else{
                     fetch('api/article',{
                        method:'put',
                        body:JSON.stringify(this.article),
                        headers:{
                            'content-type':'application/json'
                        }
                    }).then(resp=>resp.json())
                        .then(data=>{
                            this.article.title='';
                            this.article.body='';
                            this.article.id='';
                            this.edit=false;
                            delete this.article.article_id;
                            alert("Updated");
                            this.fetchArticles()
                        }).catch(err=>console.log(err))
                }
            },

            editArticle(article){
                
                this.edit=true;
                this.article.id=article.id;
                this.article.article_id=article.id;
                this.article.title=article.title;
                this.article.body=article.body;    
                
            }

        }
    }
</script>

<style scoped>

</style>

