doIt = new Mongo.Collection('doIt');

if(Meteor.isClient){
    // client code goes here
    
Template.doIt.helpers({
    'doIt' : function(){
        return doIt.find({},{sort:{createdAt:-1}});
    }
});    

Template.addField.events({
    'submit form': function(event){
        event.preventDefault();
        var doItName = $('[name="doItName"]').val();
        var newDate = new Date();
        var month = newDate.getMonth()+1;
        var day = newDate.getDate();
        var year = newDate.getFullYear();
        var date = month + "/" +day + "/"+ year;
        doIt.insert({
            name:doItName,
            completed:false,
            createdAt: date
        });
        $('[name="doItName"]').val('');
    }
    
}); 

Template.items.events({
    'click .delete-doIt':function(event){
        event.preventDefault();
        var documentId = this._id;
        var confirm = window.confirm("Yesterday, you said tomorrow. Just do it?");
        if (confirm){
        doIt.remove({ _id: documentId}); 
        }
        
    },
    
'keyup [name=items]': function(event){

    if(event.which == 13|| event.which == 27){
        console.log("Some people dream of success");
    }else{
    
    var documentId = this._id;
    var items= $(event.target).val();
    doIt.update({_id: documentId},{$set: { name: items}});
    console.log(event.which);
    }
  },

'change [type=checkbox]': function(){
    var documentId = this._id;
    var isCompleted = this.completed;
    if(isCompleted){
    doIt.update({_id: documentId}, {$set:{completed:false}});
        console.log("incomplete");
}else{
    doIt.update({_id:documentId}, {$set:{completed:true}});
    console.log("complete");
}
}
                          
});    
 
    
Template.items.helpers({
    'checked':function(){
        var isCompleted = this.completed;
        if(isCompleted){
            return "checked";
        }else{
            return "";
        }
    }
    
});
}

if(Meteor.isServer){
    // server code goes here
}
