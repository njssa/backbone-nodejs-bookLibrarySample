var app = app || {};

$(function() {
    $( '#releaseDate' ).datepicker();
    /* var books = [
        { coverImage: 'img/dubliners.jpg', title: 'Dubliners', author: 'James Joyce', releaseDate: '1914', price: '9 $', description: 'A collection of fifteen short stories that form a naturalistic depiction of Irish middle class life in and around Dublin in the early years of the 20th cent' },
        { coverImage:'img/bl.jpg', title: 'Blindness', author: 'Jose Saramago', releaseDate: '1995', price: '10 $', description: 'Saramago uses blindness as a metaphor for both personal misfortune and social catastrophe.' },
        
    ]; */
    
    new app.LibraryView();
});