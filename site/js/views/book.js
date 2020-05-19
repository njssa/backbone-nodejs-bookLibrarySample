var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: _.template( $( '#bookTemplate' ).html() ),
    events:{
        'click .delete': 'deleteBook',
        'click .edit':'editBook',
        'click .cancel': 'cancel',
        'click .update': 'update',
        'change .image-update': 'changeImage'
        
    },
    initialize:function(){
        var self=this;
        this.listenTo(this.model, 'change', function(){
            setTimeout(function(){
                self.render();
            },30); 
        });
        
    },
    changeImage:function(event){
        var img = this.$('.img');
        var fileInput = this.$('.image-update')[0];
        var fileBlob = fileInput.files[0];
        var fileReader = new FileReader();
        fileReader.onload = event=>{
            img.attr('src', event.target.result);
        };
        fileReader.readAsDataURL(fileBlob);
    },
    deleteBook: function() {
        //Delete model
    
        this.model.destroy({
            success: function(response){
                console.log('Succesfully DELETED book with _id: ' + response.toJSON()._id);
            },
            error:function(){
                console.log('Failed to DELETE book!');
            }
        });

        //Delete view
        this.remove();
    },
    editBook:function(){
        this.$('.edit').hide();
        this.$('.delete').hide();
        this.$('.update').show();
        this.$('.cancel').show();
     
        var price = this.$('.price').html();
        var description = this.$('.description').html();
        

        
        this.$('.description').html('<input type="text" class = "description-update" value="' + description + '">');
        this.$('.price').html('<input type="text" class = "price-update" value="' + price + '">');
        //
        this.$('.coverImage').html('<input type="file" class="image-update"/> <img class="img" src="#" style="display:none"/>');
        
  
    },
    cancel:function(){
        this.render();
    },
    update:function(){
      
       this.model.set('price', $('.price-update').val());
       this.model.set('description', $('.description-update').val());
       if(this.$('.image-update').val())
            this.model.set('coverImage',$('.img').attr('src'));
        
       
       
       this.model.save(null, {
           success:response=>{
               console.log('Succesfully UPDATED book with _id: ' + response.toJSON()._id);
           },
           err: ()=>{
               console.log('Failed to UPDATE the book');
           }
       });
        
    },
    
    render: function() {
        //this.el is what we defined in tagName.
        // use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});