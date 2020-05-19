// site/js/views/library.js

var app = app || {};
var image;
app.LibraryView = Backbone.View.extend({
    el: '#books',
    events:{
        'click #add':'addBook',
        'keypress #books': 'createOnEnter',
        'change #coverImage': 'fileSelected'
    },

    initialize: function(  ) {
        this.image = this.$('#coverImage');
        this.collection = new app.Library();
        this.collection.fetch({reset:true});
        this.render();
        this.listenTo(this.collection, 'add', this.renderBook);
        this.listenTo(this.collection, 'reset', this.render);
        
        
    },
   
    showSelectFileDialog:function(){
       $('#coverImage').trigger('click');
    },

    fileSelected:function(event){
        var img = this.$('#image');
        var fileInput = this.$('#coverImage')[0];
        var fileBlob = fileInput.files[0];
        var fileReader = new FileReader();
        fileReader.onload = event=>{
            img.attr('src', event.target.result);
        };
        fileReader.readAsDataURL(fileBlob);
    },
    addBook:function(e){
         e.preventDefault();

        
        var formData = {};
        if( !$('#coverImage').val() || !$('#title').val()|| !$('#author').val() ||  !$( '#releaseDate' ).val() || !$('#price').val() || !$('#description').val()){
            return;
        }
        
        book = new app.Book({
            coverImage: $('#image').attr('src'),
            title: $('#title').val(),
            author: $('#author').val(),
            releaseDate: $( '#releaseDate' ).datepicker( 'getDate' ).getTime(),
            price: $('#price').val(),
            description: $('#description').val(),
        });
        
        this.setEmptyValues();
        this.collection.add(book);

        book.save(null,{
            success:function(response){
                console.log('Successfully SAVED book with _id: ' + response.toJSON()._id);
            },
            error:function(){
                console.log('Failed to save book');
            }
        });
       
        
    },
    newAttributes: function(){
        return{
            coverImage: $('#image').attr('src'),
            title: $('#title').val(),
            author: $('#author').val(),
            releaseDate: $( '#releaseDate' ).datepicker( 'getDate' ).getTime(),
            price: $('#price').val(),
            description: $('#description').val(),
        };
    },

    //create new book
    createOnEnter: function(event){
        if(event.which !== ENTER_KEY ){
            
            return;
        }

        this. setEmptyValues();
        app.Todos.add(this.newAttributes());
        
    },
    
    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function( item ) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    },

    setEmptyValues:function(){
        $('#coverImage').val('');
        $('#title').val('');
        $('#author').val('');
        $( '#releaseDate' ).val('');
        $('#price').val('');
        $('#description').val('');
    }
   
});