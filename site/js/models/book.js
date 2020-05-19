var app = app || {};

Backbone.Model.prototype.idAttribute = '_id';

app.Book = Backbone.Model.extend({
    defaults:{
        coverImage:'img/dubliners.jpg',
        title:'No title',
        author: 'Unknown',
        releaseDate:'Unknown',
        price:'0.0',
        description: 'This is a sample description'
    }
});

