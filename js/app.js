
define('init', ['ember', 'handlebars'], function (INIT) {
    var App = Ember.Application.create({
        LOG_TRANSITIONS: true
    });

    return App;
});


require(['init'], function(App) {

    App.Router.map(function(){
       this.resource('application', { path: '/'});
    });


    App.ApplicationRoute = Ember.Route.extend({

        model: function(){
             var local = $.ajax({
                 url: 'http://0.0.0.0',

             }).done(function(data){
                console.log(data);
                 return data;
             });

            return local
        },

        renderTemplate: function() {
            this.render('application');
        }

    });

    App.List = Ember.Object.extend({
        name: null
    });

    App.ApplicationController = Ember.Controller.extend({

        hello: "Hello to you",

        list: Ember.computed.alias('model'),

        items: null,

        updateList: function(){

            var controller = this;
            var model = controller.get('model');

        //    controller.set('list', model);

        }.observes('model'),

        dynoForm: null,

        init: function() {
            var controller = this;

            var newHello = controller.get('hello');
            console.log(newHello);
        },

        actions: {
            getDyno: function(inputVal) {
                var controller = this;
                var dynoValue = controller.get('dynoForm');
                console.log(dynoValue);
            },

            createUser: function() {
                var username = $('#username').val();
                var password = $('#password').val();
                var controller = this;

                var payload = {
                    username: username,
                    password: password
                };

                $.ajax({
                     url: 'http://0.0.0.0/',
                     type: 'POST',
                     data: payload,
                 }).done(function(data){
                    console.log('Posted');
                    console.log(data);

                    $('#status').html(data.created);

                 });

                console.log(username, password);
            },

            search: function() {
                var controller = this;
                var query = $('#search').val();

                var payload = {
                    query: query,
                };

                $.ajax({
                     url: 'http://0.0.0.0/search',
                     type: 'POST',
                     data: payload,
                 }).done(function(data){
                    console.log('Posted');
                    console.log(data);

                    $('#status').html(data.created);

                 });

            },

            newItem: function(){
                var controller = this;
                var list = controller.get('model');


                list.push('My string');

                console.log(list);



            },

             natural: function() {
               var controller = this;
               var contents = $('div.natural').html();
               var payload = {
                   natural: contents
               };

               $.ajax({
                   url: 'http://0.0.0.0/natural',
                   type: 'POST',
                   data: payload,
               }).done(function(data){
                   console.log('Posted');
                   console.log(data);
                   $('#status').html(data.created); 

               });
            }
        }
    });
});


